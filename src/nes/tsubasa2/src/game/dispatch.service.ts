/**
 * Dispatch Service — 真实 RESET 分发链 (替代 boot.ts 人工路由层)
 *
 * 【真实 ROM 调度机制 — 按 asm 逐条翻译, 禁止编造】
 *
 *   RESET $FFF0 (bank31/vectors.s):
 *     LDA #$00; STA $8000          ; 选 bank0 到 $8000 窗口 (MMC3 R6)
 *     JMP $C503                    ; → bank30
 *
 *   $C503 (bank30/code_main.s):
 *     JMP $C64E                    ; 硬件初始化
 *
 *   $C64E (bank30): 硬件初始化
 *     STA $2000 = $08              ; PPUCTRL 镜像
 *     SEI / CLD / LDX #$FF; TXS    ; 禁止中断/十进制/设栈
 *     等待 PPU VBlank ×2
 *     LDA #$C0; STA $A001          ; MMC3 PRG-RAM protect (H5: no-op)
 *     清零 $0000-$07FF (8 页)
 *     $20=$08, $21=$06, $2001=$06  ; PPU 镜像
 *     $4010=0, $4017=$40           ; APU (H5: no-op)
 *     等待 VBlank; 清 VRAM ($2006 循环)
 *     $22=0
 *     JSR $CB35 (NT/VRAM 清零)     ; → bank00.ntClear()
 *     JSR $CB8B (OAM 清零)         ; → store.oam.reset()
 *     $0469=0; STA $E000; CLI
 *     LDA #$00; JMP $CEFE          ; A=任务索引=0
 *
 *   $CEFE (bank30/code_sub.s): MMC3+PPU 重置
 *     PHA                          ; 保存任务索引
 *     $0469=0; STA $E000           ; MMC3 R6=bank0 (H5: no-op)
 *     JSR $CB8B (OAM 清零)         ; → store.oam.reset()
 *     JSR $CB35 (NT/VRAM 清零)     ; → bank00.ntClear()
 *     $2000 = ram_0020 & $7F       ; NMI off
 *     PLA                          ; 恢复任务索引
 *     JMP $C400                    ; → 分发器
 *
 *   $C400 (bank30): 场景分发器 (A=任务索引)
 *     TAY                          ; A→Y 暂存
 *     $2000=$08, $2001=$1E         ; NMI on, BG+SPR on
 *     $22=0                        ; 清零 MMC3 bank 选择状态
 *     LDX #$00; JSR $C4B2          ; R6=$8000 窗口 = bank0
 *     LDX #$02; JSR $C4B9          ; R7=$A000 窗口 = bank2
 *     TYA                          ; 恢复任务索引
 *     JMP $A200                    ; → bank2
 *
 *   $A200 (bank2/code_main.s): 跳板 JMP $A21B
 *     → $A21B 按任务索引 A 分发 (Bank02Service.resetEntry)
 *        A==0 → 快速初始化路径; A≠0 → 完整初始化路径
 *
 * H5 转写: 无 MMC3/bank 切换/中断/APU/VRAM, 硬件写为 no-op。
 * 用 taskIndex (对应 A 寄存器) + DispatchService.dispatch() 模拟 $C400。
 */

import { DataStore } from './data/prg/DataStore';
import { Bank02Service } from './service/bank02_scene.service';
import { Bank00Service } from './service/bank00/bank00_core.service';
import { palReset } from './data/prg/ppu/pallete/paletteManager';

// ── RAM 语义键 (对应真实 ram 地址) ──
const KEY_0020 = 'ram_0020'; // PPUCTRL 镜像
const KEY_0021 = 'ram_0021'; // PPUMASK 镜像
const KEY_0022 = 'ram_0022'; // MMC3 bank 选择状态 (位组合)
const KEY_0023 = 'ram_0023'; // 当前 MMC3 选择寄存器 (已写入 $8000 的值)
const KEY_0024 = 'ram_0024'; // R6 窗口 bank 编号 ($8000-$9FFF)
const KEY_0025 = 'ram_0025'; // R7 窗口 bank 编号 ($A000-$BFFF)
const KEY_0469 = 'ram_0469'; // MMC3 R6 写入影子 (bank 状态)

/**
 * 任务索引 (对应 RESET/$C400 时 A 寄存器的值)。
 * 真实 ROM 中 A 由调用方写入后 JMP $C400 重新分发。
 * 0 与 1 为 $A21B 硬件初始化路径; 场景值对应 boot.ts.bak 路由表语义
 * (STORY/PASSWORD/RESULT 等由 $A484 分发器 + 场景控制器驱动)。
 */
export enum TaskIndex {
  /** 初始启动 (RESET A=0) → 走 $A21B 快速初始化路径 */
  BOOT = 0,
  /** 完整初始化 (A≠0 → $826D 设任务参数路径) */
  FULL_INIT = 1,
  /** PASSWORD 密码输入场景 */
  PASSWORD = 2,
  /** MEETING 赛前会议 (Bank01 DataQuery) */
  MEETING = 3,
  /** STORY 剧情场景 (Bank18/19) */
  STORY = 4,
  /** MATCH 比赛 (Bank26 引擎) */
  MATCH = 5,
  /** RESULT 赛果场景 */
  RESULT = 6,
}

/**
 * 场景处理器 (对应一个 taskIndex 的场景)。
 * init = 进入场景 ($C400 分发到该场景); update = 每帧推进;
 * update 返回非 null 的 taskIndex = 请求切换场景 (等价设 A → JMP $C400)。
 */
export interface SceneHandler {
  init(): void;
  update(buttons: number, frameCount: number): number | null;
}

/**
 * Dispatch Service — 真实 RESET 分发链 + 场景路由分发。
 * 暴露与 boot.ts 兼容的 init()/update() 接口, 供 src/index.ts 等引用方逐步迁移。
 */
export class DispatchService {
  constructor(
    private _store: DataStore,
    private _bank00: Bank00Service,
    private _bank02: Bank02Service,
    /** 场景路由器 (SceneRouter 接口, 兼容 BootService 的 init/update 语义) */
    private _sceneRouter?: { init(): void; update(buttons: number, frameCount: number): boolean },
  ) {}

  /** 场景处理器表 (taskIndex → handler), 由调用方 registerScene 注册 */
  private _scenes = new Map<number, SceneHandler>();
  /** 当前场景 (对应 A 寄存器/ram_00ED 语义) */
  private _currentScene: number = TaskIndex.BOOT;
  /** 上一帧按键 (上升沿检测, 防止按键穿透场景) */
  private _prevButtons = 0;

  /**
   * 注册场景处理器 — 由 Tsubasa2 等调用方把 STORY/PASSWORD/RESULT 控制器接入。
   */
  registerScene(taskIndex: number, handler: SceneHandler): void {
    this._scenes.set(taskIndex, handler);
  }

  /** 当前场景索引 */
  get currentScene(): number {
    return this._currentScene;
  }

  // ══════════════════════════════════════════════════════════════
  // 公开接口 (与 boot.ts 兼容)
  // ══════════════════════════════════════════════════════════════

  /**
   * 完整 RESET 初始化 — 对应:
   *   RESET $FFF0 → $C503 → $C64E (硬件初始化) → $CEFE (MMC3+PPU 重置) → $C400 (分发器)
   *
   * @param taskIndex 任务索引 (对应 $C400 时的 A 寄存器, 默认 0)
   */
  init(taskIndex: number = TaskIndex.BOOT): void {
    this._resetC64E();
    this._resetCEFE(taskIndex);
  }

  /**
   * 每帧更新 — 优先驱动当前场景处理器, 否则委托场景路由器。
   * 真实 ROM: $A21B 初始化后 JMP $9EED 进入 Bank00 主循环, 每帧推进。
   *
   * @returns 是否有状态变化 (兼容 boot.ts)
   */
  update(buttons: number, frameCount: number): boolean {
    // 上升沿检测: 场景处理器只收到本帧新按下的按键 (对应 boot.ts 语义)
    const pressed = buttons & ~this._prevButtons;
    this._prevButtons = buttons;

    const handler = this._scenes.get(this._currentScene);
    if (handler) {
      const next = handler.update(pressed, frameCount);
      if (next !== null && next !== this._currentScene) {
        // 场景切换 — 等价真实 ROM: 设 A=next → JMP $C400 重新分发
        this.dispatch(next);
        return true;
      }
      return false;
    }
    if (this._sceneRouter) {
      return this._sceneRouter.update(buttons, frameCount);
    }
    // 无场景路由器: 仍推进 Bank00 主循环 (对应 JMP $9EED)
    this._bank00.mainLoop();
    return false;
  }

  /**
   * $C400 分发器重入 — 场景代码完成后设 A=任务索引再分发。
   * 对应真实: 设 A → JMP $C400 → JMP $A200 → $A21B。
   * 若该 taskIndex 注册了场景处理器, 则调用其 init() 进入场景。
   */
  dispatch(taskIndex: number): void {
    this._currentScene = taskIndex;
    this._c400(taskIndex);
    const handler = this._scenes.get(taskIndex);
    if (handler) {
      handler.init();
    }
  }

  // ══════════════════════════════════════════════════════════════
  // $C64E: 硬件初始化
  // ══════════════════════════════════════════════════════════════

  /**
   * 对应原始 $C64E-$C6BB (RESET 硬件初始化):
   *   $C64E LDA #$08; STA $2000   ; PPUCTRL 镜像 = $08
   *   $C653 SEI / CLD / TXS        ; H5: no-op (无 CPU 中断/十进制/栈)
   *   $C658-$C661 等待 PPU VBlank ×2 ; H5: no-op (无 PPU 硬件轮询)
   *   $C662 LDA #$C0; STA $A001    ; MMC3 PRG-RAM protect (H5: no-op)
   *   $C667-$C678 清零 $0000-$07FF ; store.zp/ram 重置
   *   $C67A $20=$08 / $C67E $21=$06, $2001=$06 ; PPU 镜像
   *   $C685 $4010=0 / $C68A $4017=$40 ; APU (H5: no-op)
   *   $C692-$C69E 清 VRAM          ; store.ntClear()
   *   $C6A0 $22=0
   *   $C6A5 JSR $CB35 (NT 清零)    ; → bank00.ntClear()
   *   $C6A8 JSR $CB8B (OAM 清零)   ; → store.oam.reset()
   *   $C6AB $0469=0; STA $E000; CLI ; MMC3 + 开中断 (H5: no-op)
   *   $C6B9 LDA #$00               ; A = 任务索引 = 0
   *   $C6BB JMP $CEFE
   */
  private _resetC64E(): void {
    const s = this._store;

    // $C64E-$C650: LDA #$08; STA $2000 (PPUCTRL: NMI on, 使用 NT0)
    s.write('ppuctrl', 0x08);

    // $C653-$C657: SEI / CLD / LDX #$FF; TXS → H5: no-op (无 CPU 状态)

    // $C658-$C661: 等待 PPU VBlank ×2 → H5: no-op

    // $C662-$C666: LDA #$C0; STA $A001 (MMC3 PRG-RAM protect) → H5: no-op

    // $C667-$C678: 清零 $0000-$07FF (8 页) → store 重置
    s.zp.fill(0);
    s.ram.clear();

    // $C67A-$C67C: LDA #$08; STA $0020 (ram_0020 = PPUCTRL 镜像)
    s.write(KEY_0020, 0x08);

    // $C67E-$C682: LDA #$06; STA $0021; STA $2001 (PPU 镜像: NMI on, 禁渲染)
    s.write(KEY_0021, 0x06);
    s.write('ppumask', 0x06);

    // $4010=0 / $4017=$40 (APU) → H5: no-op

    // 等待 VBlank + 清 VRAM ($2006 循环) → 对应 NT 清零
    // JSR $CB35 (NT/VRAM 清零)
    this._bank00.ntClear();

    // JSR $CB8B (OAM 清零, LDA #$F8 填充)
    s.oam.reset();

    // 调色板初始化 (H5 渲染层加载默认调色板)
    palReset();

    // $22=0 (MMC3 bank 选择状态清零)
    s.write(KEY_0022, 0);

    // $0469=0; STA $E000 (MMC3 R6=bank0); CLI → H5: no-op
    s.write(KEY_0469, 0);

    // LDA #$00 → 由调用方作为 taskIndex 传给 $CEFE
  }

  // ══════════════════════════════════════════════════════════════
  // $CEFE: MMC3+PPU 重置
  // ══════════════════════════════════════════════════════════════

  /**
   * 对应原始 $CEFE-$CF1C:
   *   PHA                          ; 保存任务索引 A
   *   $0469=0; STA $E000           ; MMC3 R6=bank0 (H5: no-op)
   *   JSR $CB8B (OAM 清零)         ; store.oam.reset()
   *   JSR $CB35 (NT/VRAM 清零)     ; bank00.ntClear()
   *   $2000 = ram_0020 & $7F       ; NMI off
   *   PLA                          ; 恢复任务索引 A
   *   JMP $C400                    ; 分发
   */
  private _resetCEFE(taskIndex: number): void {
    const s = this._store;

    // $0469=0; STA $E000 (MMC3) → H5: no-op, 记录影子
    s.write(KEY_0469, 0);

    // JSR $CB8B — OAM 清零
    s.oam.reset();

    // JSR $CB35 — NT/VRAM 清零
    this._bank00.ntClear();

    // $2000 = ram_0020 & $7F (NMI off)
    const ctrl = (s.read(KEY_0020) & 0x7F) & 0xFF;
    s.write(KEY_0020, ctrl);
    s.write('ppuctrl', ctrl);

    // PLA (恢复任务索引) → 传给 $C400
    this._c400(taskIndex);
  }

  // ══════════════════════════════════════════════════════════════
  // $C400: 场景分发器
  // ══════════════════════════════════════════════════════════════

  /**
   * 对应原始 $C400-$C41E:
   *   TAY                          ; A(任务索引)→Y 暂存
   *   $2000=$08, $2001=$1E         ; NMI on, BG+SPR on
   *   $22=0                        ; 清零 MMC3 bank 选择状态
   *   LDX #$00; JSR $C4B2          ; R6($8000)=bank0
   *   LDX #$02; JSR $C4B9          ; R7($A000)=bank2
   *   TYA                          ; 恢复任务索引
   *   JMP $A200                    ; → bank2 分发
   */
  private _c400(taskIndex: number): void {
    const s = this._store;

    // $2000=$08 (NMI on, NT0), $2001=$1E (BG+SPR on, 允许左8px)
    s.write('ppuctrl', 0x08);
    s.write('ppumask', 0x1E);

    // $22=0 (MMC3 bank 选择状态清零)
    s.write(KEY_0022, 0);

    // LDX #$00; JSR $C4B2 → R6 = bank0 ($8000 窗口)
    this._bankSelectR6(0x00);

    // LDX #$02; JSR $C4B9 → R7 = bank2 ($A000 窗口)
    this._bankSelectR7(0x02);

    // TYA; JMP $A200 → bank2 $A21B 分发 (按任务索引 A)
    this._a200Dispatch(taskIndex);
  }

  // ══════════════════════════════════════════════════════════════
  // $C4B2/$C4B9/$C4BD: MMC3 bank 窗口选择写入
  // ══════════════════════════════════════════════════════════════

  /**
   * $C4B2: STX ram_0024; LDA #$06; JMP $C4BD — 记录 R6, 选 $8000 窗口寄存器
   */
  private _bankSelectR6(x: number): void {
    const s = this._store;
    s.write(KEY_0024, x & 0xFF);           // STX ram_0024
    this._bankSelectWrite(0x06, x);        // LDA #$06; JMP $C4BD
  }

  /**
   * $C4B9: STX ram_0025; LDA #$07; JMP $C4BD — 记录 R7, 选 $A000 窗口寄存器
   */
  private _bankSelectR7(x: number): void {
    const s = this._store;
    s.write(KEY_0025, x & 0xFF);           // STX ram_0025
    this._bankSelectWrite(0x07, x);        // LDA #$07; JMP $C4BD
  }

  /**
   * $C4BD: ORA ram_0022 → ram_0023; STA $8000; STX $8001; RTS
   *   ram_0023 = (A | ram_0022) & 0xFF    // MMC3 bank select 值
   *   $8000 写入选择寄存器, $8001 写入 bank 编号 (H5: no-op)
   */
  private _bankSelectWrite(a: number, x: number): void {
    const s = this._store;
    const v = ((a | s.read(KEY_0022)) & 0xFF);
    s.write(KEY_0023, v);                  // STA ram_0023
    void x; // $8001 bank 编号 — H5 no-op
  }

  // ══════════════════════════════════════════════════════════════
  // $A200 → $A21B: bank2 场景分发
  // ══════════════════════════════════════════════════════════════

  /**
   * 对应原始 $A200 (bank2): JMP $A21B → RESET 后首个业务入口。
   * $A21B 按任务索引 A 分发 (Bank02Service.resetEntry 已翻译):
   *   A==0 → 快速初始化路径; A≠0 → 完整初始化路径。
   */
  private _a200Dispatch(taskIndex: number): void {
    this._bank02.resetEntry(taskIndex & 0xFF);
  }
}
