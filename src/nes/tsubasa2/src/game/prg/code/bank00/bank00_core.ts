/**
 * Bank 00 Service — 核心系统服务层 (从真实 ASM 重新翻译)
 *
 * 翻译来源: asm/bank00/*.s (bank00.s + code_main.s + code_scene.s +
 *           code_render.s + code_util.s + data_tail.s)
 * PRG bank 00, MMC3 R6 → CPU $8000-$9FFF.
 * 无硬件 (CPU/NES/MMC3/PPU/APU) 模拟, 直接翻译 PRG 为 TS 方法。
 *
 * 入口清单 (真实 ASM 地址):
 *   $8015  主循环入口 LDX #$02; JSR $C4B9; JMP $A203  → mainLoop(buttons)
 *   $8091  主输入循环 (首帧初始化 + 输入解码 + 菜单状态机) → mainLoop 内部 _mainInputLoop
 *   $801F  场景初始化链入口 → sceneInitEntry()
 *   $8027  等待 VBlank → 首帧完整初始化 → _firstFrameInit
 *   $8AF7  场景描述读取 → sceneLoad()
 *   $890C  VRAM 地址/滚动设置 → vramAddrSetup()
 *   $88FB  PPU 寄存器设置 → ppuRegSetup()
 *   $9A31  mainInitParam(bgGrp, sprGrp)
 *   $9A35  mainLoopInit2() (BG+SPR 调色板 + 渐显)
 *   $9A43  mainLoopInit1() (ram_004A/004B = 0x0F)
 *   $9BA0  waitVBlank() (调度: 渐隐→NT 清→精灵清)
 *   $84C1  bank02EntryDispatch() (bank02 跳转表分发)
 *   $9F69  dataWriteHelper(a, y, x) (调度器栈帧构建)
 *
 * 固定区辅助映射 (bank30/31 共享子程, H5 中已内联/委托):
 *   $C4B9 → _bankSelectR7  (MMC3 R7=$A000 窗口, H5 no-op 记录 ram_0025)
 *   $C4B2 → _bankSelectR6  (MMC3 R6=$8000 窗口, H5 no-op 记录 ram_0024)
 *   $9FA8 → _bankSwitch    (切 bank, H5 no-op 但保留栈帧构建副作用)
 *
 * 渲染/展示已剥离到 view/bank00/Bank00RenderView:
 *   NT 渲染/调色板/OAM 精灵/PPU Buffer/帧同步。
 * Service 保留业务逻辑 (状态机/场景调度/帧循环) 并委托渲染方法。
 */

import { DataStore } from '../../DataStore';
import { getSceneBgGrp } from '../../bank07-data';
import { BANK06_TABLE_LOAD_DATA } from '../../bank06-data';
import { Bank00RenderView } from '../../view/bank00/Bank00RenderView';
import { getScriptBank } from './script-opcodes';
import { getScriptData } from './script-data-loader';
import { CHAR_MAP_DOUBLE } from './char-map';
import { OpeningSceneController } from './scene_opening.controller';
import { SceneRoot, OpeningShot } from '../../data/scene/index';
import { BUTTON } from '../../../../core/types';
import { trace } from '../../../../core/debug/trace';

/* eslint-disable @typescript-eslint/no-unused-vars */

/** 真实 RAM 键 (4 位大写补零, 与全库 ram_XXXX 约定一致) */
function ramKey(addr: number): string {
  return `ram_${addr.toString(16).toUpperCase().padStart(4, '0')}`;
}

/**
 * 手柄"本帧新按下"边沿寄存器 (真实 RAM 地址键)。
 * NMI handler (bank30 $C7E7 → $C982/$C98B) 每帧读取手柄写入:
 *   $C9BC: STA $001E (newly-pressed 边沿) / $C9C1: STA $001C (current)。
 * 位序 (NES 标准): bit0=A, bit1=B, bit2=Select, bit3=Start,
 *   bit4=Up, bit5=Down, bit6=Left, bit7=Right。
 * ⚠️ 不是 VBlank 标志! 真正的 NMI 帧标志是 ram_001B bit7。
 */
const FRAME_FLAG = 'ram_001E';
const SCENE_ID   = 'ram_0026';   // ram_0026: 场景 ID
const RAM_1B     = 'ram_001B';   // ram_001B: 场景状态标志 (bit0=已初始化, bit7=NMI帧标志)
const RAM_0025   = 'ram_0025';   // ram_0025: MMC3 R7 窗口 bank 编号
const RAM_0026   = 'ram_0026';   // 场景 ID
const RAM_004A   = 'ram_004A';   // BG 渐显进度计数器
const RAM_004B   = 'ram_004B';   // SPR 渐显进度计数器
const RAM_0048   = 'ram_0048';   // BG 调色板组号
const RAM_0049   = 'ram_0049';   // SPR 调色板组号

/**
 * 对应 bank00 $9EE2: 精灵 Y 坐标移动增量表 (16 项, 供 $9CE7 查表)。
 * 索引 = ram_001E & 0x0F。X=4 → +$10 (向下), X=8 → $F0 (-$10, 向上)。
 */
const SPR_Y_DELTA_TABLE: readonly number[] = [
  0x00, 0x00, 0x00, 0x00, 0x10, 0x00, 0x00, 0x00, 0xF0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
];

// ═══════════════════════════════════════════════════════════════
// Bank 00 Service
// ═══════════════════════════════════════════════════════════════

export class Bank00Service {
  /** 当前帧计数 */
  private _frameCount = 0;

  /** 主循环是否运行中 */
  private _running = false;

  /** 渲染展示层 (View) — NT/调色板/OAM/PPU Buffer */
  private _render!: Bank00RenderView;

  /** 上一帧按键 (上升沿检测, 对应 $80A2 输入解码) */
  private _prevButtons = 0;

  /** 开场场景控制器 (BOOT 协程驱动; 由 ServiceLoader.setOpening 注入) */
  private _opening!: OpeningSceneController;

  /**
   * 协程槽表 — 对应 ROM bank0 $9EED 主循环遍历的 ram_0001-$0018 (6槽×4字节)。
   * 每帧 _runCoroutineLoop 轮转非空槽, 推进协程 (对应 $9F0F 恢复续跑)。
   */
  private _slots: Array<Generator<number, number | void, number> | null> = [
    null, null, null, null, null, null,
  ];

  /** BOOT 开场已过帧数 */
  private _shotFrame = 0;

  /** BOOT 协程是否已 spawn (首帧只 spawn 一次) */
  private _bootSpawned = false;

  constructor(private _store: DataStore) {
    this._render = new Bank00RenderView(_store);
  }

  /** 注入开场控制器 (由 ServiceLoader 装配时调用) */
  setOpening(opening: OpeningSceneController): void {
    this._opening = opening;
  }

  // ── 公共接口 ──

  get store(): DataStore { return this._store; }
  get frameCount(): number { return this._frameCount; }
  get renderView(): Bank00RenderView { return this._render; }
  get isRunning(): boolean { return this._running; }

  // ══════════════════════════════════════════════════════════════
  // $8015 / $9EED: 主循环入口
  // asm: LDX #$02; JSR $C4B9; JMP $A203  (A203 → bank02 分发生成 $8091 输入循环)
  // ══════════════════════════════════════════════════════════════

  /**
   * 对应原始 $8015 (主循环入口):
   *   LDX #$02; JSR $C4B9   ; R7=$A000 窗口 = bank2
   *   JMP $A203             ; → bank02 $A203 → JMP $8091 (主输入循环)
   *
   * H5: 启动帧循环 → 进入主输入循环 $8091 (每帧推进状态机)。
   * 每帧由 Tsubasa2 调用, buttons = 当前帧按键 bitmask。
   *
   * @param buttons 当前帧按键 bitmask
   */
  mainLoop(buttons: number): void {
    this._running = true;
    this._frameCount++;
    // $9EED 主循环入口 trace (首帧 + 每 60 帧采样, 避免刷屏)
    if (this._frameCount === 1 || this._frameCount % 60 === 0) {
      trace('Bank00', `mainLoop($9EED) frame=${this._frameCount} buttons=0x${buttons.toString(16)}`);
    }
    // 首帧 spawn BOOT 协程 (对应 $C400 分发 A=0 → bank2 $A21B 加载初始协程)
    if (!this._bootSpawned) {
      this._bootSpawned = true;
      this._spawnCoroutine(SceneRoot.BOOT);
    }
    this._mainInputLoop(buttons);
    // 协程调度主循环 (对应 bank0 $9EED 每帧轮转协程槽)
    this._runCoroutineLoop(buttons);
  }

  /**
   * 对应原始 $8091 主输入循环 (每帧一步)。
   * 真实 ROM 是永不返回的循环 (等待手柄事件后推进状态机), H5 改为每帧推进一次。
   * 主要工作:
   *   1. 首帧 (ram_001B bit0 == 0) 执行完整场景初始化 (由 sceneInitEntry 置位后本循环跳过)
   *   2. 等待手柄"新按下"事件 (ram_001E & 0x3C) → 输入解码 → 菜单状态机
   *
   * ⚠️ 语义纠正: ram_001E 是"本帧新按下的按键"(由 NMI 手柄边沿检测写入), 不是 VBlank 标志。
   *   这里不设 VBlank 帧门; H5 的 RAF 每帧调用本身就是帧节奏。
   *
   * @param buttons 当前帧按键 (未使用, 真实 ROM 以 ram_001E 边沿为准)
   */
  private _mainInputLoop(buttons: number): void {
    const s = this._store;

    // ── $8048-$8051: ram_0700=1; 检测 ram_001B bit0 ──
    // ⚠️ BUG-OPEN-07 修正: 真实 asm $802C 等待 START 边沿后才进入本块 (一次性),
    //   bit0 只在场景切换时被场景加载代码清除, 非每帧交替。原实现每 2 帧清 bit0
    //   → 开场每 2 帧重走 _firstFrameInit() 重灌全黑调色板 → 画面卡死黑屏。
    s.write('ram_0700', 1);
    const ram1b = s.read(RAM_1B) ?? 0;
    if ((ram1b & 0x01) === 0) {
      // $8032-$8046: 清零一组状态变量 + 首次完整场景初始化 (一次性)
      this._clearStateVars();
      this._firstFrameInit();
      // sceneInitEntry 语义: 置位 ram_001B bit0 标记已初始化 (场景切换时再清)
      s.write(RAM_1B, ram1b | 0x01);
    }

    // ── $80A2-$80AB: 等待输入事件 (ram_001E & 0x3C != 0) ──
    // 真实 asm: LDA $001E; AND #$3C; BEQ 回 $80A2 循环等待 (新按下任意方向/选/开始键)。
    // H5: ram_001E 已由 NMI 每帧边沿检测写入; 无新按键时本帧空闲 return。
    const ev = s.read(FRAME_FLAG) ?? 0;
    if ((ev & 0x3C) === 0) {
      return; // 本帧无新按键 (边沿检测), 空闲等待
    }

    // ── $80AD-$80B9: 输入解码 → 菜单分支 ──
    const decoded = this._decodeMenuInput(ev);
    this._dispatchMenu(decoded, buttons);
  }

  /** $8032-$8046: 清零一组状态变量 (供首次进入与场景切换复用) */
  private _clearStateVars(): void {
    const s = this._store;
    s.write('ram_0005', 0);
    s.write('ram_0006', 0);
    s.write('ram_0009', 0);
    s.write('ram_000A', 0);
    s.write('ram_0011', 0);
    s.write('ram_0012', 0);
    s.write('ram_000D', 0);
    s.write('ram_000E', 0);
    s.write('ram_004C', 0);
    s.write('ram_005B', 0);
  }

  /**
   * 对应原始 $8053-$8077 (ram_001B bit0==0 时首次完整场景初始化):
   *   JSR $9B11 (NT+Attr 清) → JSR $9B7F (精灵清) → JSR $98A0 (NT 清)
   *   → JSR $8297 (文本 buffer) → ram_007B=0 → JSR $8AF7 (场景 A=0x17)
   *   → JSR $890C (VRAM A=0x30) → JSR $88FB (PPU) → JSR $9A35 (调色板链)
   *   → JSR $8920 (tableLoad 0) → ram_0090=0/0091=2
   *   → ram_00ED=0x0A, ppuFill98EA(0x22 区, Y=1, X=1, A=0x7F)
   */
  private _firstFrameInit(): void {
    // JSR $9B11: NT + Attr 清零
    this.ntAttrClear();
    // JSR $9B7F: 精灵清零
    this.initHelper();
    // JSR $98A0: NT 全屏清零
    this.ntClear();
    // JSR $8297: 文本 buffer 参数设置 (A=0x0D)
    this.paletteInit(0x0D);
    // ram_007B = 0
    this._store.write('ram_007B', 0);
    // ⚠️ BUG-OPEN-06 修复: 首帧加载真实 BOOT 开场数据 (cut_0x00_boot), 而非标题菜单 cut 0x17。
    // 对应原版 BOOT 场景加载链: initBoot 灌入 NT(标题字母)+40 精灵+全黑调色板。
    if (this._opening) {
      this._opening.initBoot();
    }
    // JSR $890C: VRAM 地址/滚动设置 (A=0x30)
    this.vramAddrSetup(0x30);
    // JSR $88FB: PPU 寄存器设置
    this.ppuRegSetup();
    // JSR $9A35: 主循环初始化 part2 (调色板加载 + 渐显)
    this.mainLoopInit2();
    // JSR $8920: tableLoad 0
    this.tableLoad(0);
    // ram_0090=0, ram_0091=2
    this._store.write('ram_0090', 0);
    this._store.write('ram_0091', 2);
    // ram_00ED=0x0A; ram_00E6=0x0A; ram_00E7=0x22; ppuFill98EA(Y=1,X=1,A=0x7F)
    this._store.write('ram_00ED', 0x0A);
    this._store.write('ram_00E6', 0x0A);
    this._store.write('ram_00E7', 0x22);
    this.ppuFill98EA(1, 1, 0x7F);
  }

  /**
   * 对应原始 $80AD-$80B9 输入解码:
   *   ASL; ASL; BMI → bit5 方向(下); ASL; BMI → bit4(右); ASL; AND#$40; ORA#$0A
   * H5: 按 ram_001E 位解码返回一个菜单分支码。
   */
  private _decodeMenuInput(ev: number): number {
    let v = (ev & 0x3C) << 2;   // 模拟 ASL×3 (位 5/4/2 上移到 7/6/4)
    v &= 0xFF;
    if (v & 0x80) return 0x80;   // 下方向
    if (v & 0x40) return 0x40;   // 右方向
    return (v & 0x40) | 0x0A;    // 其它 → A 按钮
  }

  /**
   * 对应原始 $80D4 起的菜单状态机 (场景 ID 分发)。
   * 真实 ROM 按 ram_001C 输入与 sceneId 跳转不同场景处理。
   * H5: 把场景路由的分发落到 Bank02/bank 服务的 resetEntry/场景控制器。
   *
   * @param decoded 输入解码码 (0x80=下 / 0x40=右 / 0x0A=确认)
   * @param buttons 原始按键
   */
  private _dispatchMenu(decoded: number, _buttons: number): void {
    // 场景 ID 由 ram_0026 决定 (Bank02 resetEntry 已翻译, 分发到各场景控制器)。
    const sceneId = this._store.read(SCENE_ID) ?? 0;
    // H5: 场景路由由 Bank02Service.resetEntry 按 sceneId 分发。
    // 本层只记录当前场景 ID (真实 ROM ram_0026 语义)。
    void decoded;
    void sceneId;
  }

  // ── 旧接口兼容: 帧更新 ──

  /**
   * 旧接口兼容 (供 boot/controller 迁移期调用)。
   * 对应 $8091 主输入循环的每帧推进。
   */
  update(buttons: number = 0): boolean {
    if (!this._running) return false;
    this._frameCount++;
    this._mainInputLoop(buttons);
    this._runCoroutineLoop(buttons);
    return false;
  }

  // ══════════════════════════════════════════════════════════════
  // 协程调度器 — 对应 ROM bank0 $9EED-$9F0C + $9FA8(让出) / $9F69(spawn)
  // ══════════════════════════════════════════════════════════════

  /** BOOT 开场持续帧数 (~5 秒 @60fps, 对应 boot.ts.bak SHOT_DURATION) */
  private static readonly BOOT_DURATION = 300;

  /**
   * 启动场景协程到空槽 — 对应 $9F69 spawn (真实: 写 [SP][R6][R7][计数] 到空槽)。
   * H5: 找第一个空槽, 创建场景 Generator 装入。
   * @returns 槽号, -1 表满
   */
  private _spawnCoroutine(scene: SceneRoot): number {
    for (let i = 0; i < this._slots.length; i++) {
      if (this._slots[i] === null) {
        const gen = this._makeCoroutine(scene);
        if (gen) {
          this._slots[i] = gen;
          return i;
        }
        return -1;
      }
    }
    return -1;
  }

  /** 创建场景协程 (Generator)。协程每次 yield 对应 JSR $9FA8 (让出回主循环)。 */
  private *_makeCoroutine(scene: SceneRoot): Generator<number, number | void, number> {
    switch (scene) {
    case SceneRoot.BOOT: return yield* this._bootCoroutine();
    case SceneRoot.TITLE: return yield* this._titleCoroutine();
    default: return;
    }
  }

  /**
   * 协程调度主循环 — 对应 ROM bank0 $9EED-$9F0C。
   * 每帧轮转 6 槽, 对每个非空槽调 gen.next(buttons) 推进一步。
   * 协程 return 非 void 值 = 请求切换场景 (spawn 新协程, 终止旧协程)。
   */
  private _runCoroutineLoop(buttons: number): void {
    for (let i = 0; i < this._slots.length; i++) {
      const gen = this._slots[i];
      if (gen === null) continue;   // 空槽 (对应 $9EF1 BEQ)
      const r = gen.next(buttons);  // 推进一步 (对应 $9F0F 恢复+RTS)
      if (r.done) {
        // 协程结束 → 若返回新场景则 spawn, 然后清空槽
        if (typeof r.value === 'number') {
          this._spawnCoroutine(r.value);
        }
        this._slots[i] = null;
      }
    }
  }

  /** BOOT 协程 — 真实开场画面 (NT + 40 精灵 + 调色板渐显), START 或超时切 TITLE */
  private *_bootCoroutine(): Generator<number, number | void, number> {
    // 首帧数据已由 _firstFrameInit → _opening.initBoot() 灌入; 此处仅推进动画
    this._shotFrame = 0;
    for (;;) {
      const buttons = yield;
      this._shotFrame++;
      // 调色板渐显 (对应 bank0 $9A71 fade + $9A0D 帧等待)
      if (this._opening) this._opening.syncBootFrame(this._shotFrame);
      if ((buttons & BUTTON.START) !== 0 || this._shotFrame >= Bank00Service.BOOT_DURATION) {
        return SceneRoot.TITLE; // 切换到 TITLE (标题菜单)
      }
    }
  }

  /** TITLE 协程 — 标题菜单背景 (Cut 0x17), 每帧 update 推进 */
  private *_titleCoroutine(): Generator<number, number | void, number> {
    if (this._opening) this._opening.init();  // Cut 0x17 标题菜单背景
    for (;;) {
      const buttons = yield;
      if (this._opening) this._opening.update(buttons);  // ⚠️ OpeningSceneController.update 被调 (阶段3验证点)
      // TODO: 标题菜单 KICK OFF/CONTINUE 选择逻辑 (细节后续打磨)
    }
  }

  /**
   * $9FA8 协程让出 — 保存现场到槽并让出 CPU 回主循环。
   * H5: Generator 的 yield 已内建现场保存/恢复, 本方法为语义化占位
   * (对应 bank0 $9FA8 STA $0019.. 保存栈帧到槽)。
   */
  private _coroutineYield(): void {
    // 无硬件栈帧; Generator yield 已等效实现
  }

  /**
   * $9F69 协程 spawn — 构建调度器栈帧装入空槽。
   * H5: 等价 _spawnCoroutine (Generator 创建即装入)。
   */
  private _coroutineSpawn(scene: SceneRoot): number {
    return this._spawnCoroutine(scene);
  }

  // ══════════════════════════════════════════════════════════════
  // $98A0 / $9B11: Nametable 清零
  // ══════════════════════════════════════════════════════════════

  /** 对应 $98A0: NT 全屏清零 (渲染部分, 委托 view) */
  ntClear(): void {
    this._render.ntClear();
  }

  /** 对应 $9B11: NT + 属性表清零 (渲染部分, 委托 view) */
  ntAttrClear(): void {
    this._render.ntAttrClear();
  }

  // ══════════════════════════════════════════════════════════════
  // $8297 / $9085: 文本 buffer 参数
  // ══════════════════════════════════════════════════════════════

  /** 对应 $8297: 文本 buffer 参数设置 (A=palIdx, 非调色板!) */
  paletteInit(palIdx: number): void {
    this._render.paletteInit(palIdx);
  }

  /** 对应 $9085: 文本 buffer 构建入口 (渲染部分, no-op) */
  paletteWriteBuf(data: number[]): void {
    this._render.paletteWriteBuf(data);
  }

  // ══════════════════════════════════════════════════════════════
  // $8AF7: 场景描述读取
  // ══════════════════════════════════════════════════════════════

  /**
   * 对应原始 $8AF7: A=sceneId → 读场景 header h[2]&0x3F → ram_0048 (BG 组号)。
   * 渲染部分 (NT 写入) 委托 view.loadSceneNT()。
   *
   * @param sceneId 场景编号
   */
  sceneLoad(sceneId: number): void {
    this._store.write(SCENE_ID, sceneId & 0xFF);
    const bgGrp = getSceneBgGrp(sceneId & 0xFF);
    this._store.write(RAM_0048, bgGrp & 0xFF);
    this._store.write(RAM_0049, 0);
    this._render.loadSceneNT(sceneId);
  }

  /** 仅渲染部分: 重新写入场景 NT tile + 属性表 (供 ntClear 之后恢复背景用) */
  renderSceneNT(sceneId: number): void {
    this._render.loadSceneNT(sceneId);
  }

  // ══════════════════════════════════════════════════════════════
  // $890C / $88FB: VRAM / PPU 寄存器
  // ══════════════════════════════════════════════════════════════

  /** 对应 $890C: VRAM 地址/滚动设置 (渲染部分, 委托 view) */
  vramAddrSetup(idx: number): void {
    this._render.vramAddrSetup(idx);
  }

  /** 对应 $88FB: PPU 寄存器设置 (渲染部分, 委托 view) */
  ppuRegSetup(): void {
    this._render.ppuRegSetup();
  }

  // ══════════════════════════════════════════════════════════════
  // $9A43 / $9A35 / $9A31: 主循环初始化
  // ══════════════════════════════════════════════════════════════

  /** 对应 $9A43: ram_004A/004B = 0x0F (渐显初始值) */
  mainLoopInit1(): void {
    this._render.setFadeCounters(0x0F, 0x0F);
  }

  /** 对应 $9A35: 调色板加载 + 渐显初始值 (BG/SPR) + 状态清零 */
  mainLoopInit2(): void {
    const bgGrp = this._store.read(RAM_0048) ?? 0;
    const sprGrp = this._store.read(RAM_0049) ?? 0;
    this._render.paletteLoad(bgGrp, sprGrp);
    this._render.setFadeCounters(0x0F, 0x0F);
    const s = this._store;
    s.write('ram_004C', 0x8A);
    s.write('ram_005B', 0);
    s.write('ram_0005', 0);
    s.write('ram_0006', 0);
    s.write('ram_0009', 0);
    s.write('ram_000A', 0);
    s.write('ram_0011', 0);
    s.write('ram_0012', 0);
    s.write('ram_000D', 0);
    s.write('ram_000E', 0);
  }

  /** 对应 $9A31: mainInitParam(bgGrp, sprGrp) → 落到 $9A35 */
  mainInitParam(bgGrp: number, sprGrp: number): void {
    this._store.write(RAM_0048, bgGrp & 0xFF);
    this._store.write(RAM_0049, sprGrp & 0xFF);
    this.mainLoopInit2();
  }

  /** 对应 $9AB8 (BG) + $9ADA (SPR): 调色板组加载 (渲染部分) */
  paletteLoad(bgGrp: number, sprGrp: number): void {
    this._render.paletteLoad(bgGrp, sprGrp);
  }

  // ══════════════════════════════════════════════════════════════
  // $9B7F: 精灵清零 / PPU 初始化
  // ══════════════════════════════════════════════════════════════

  /** 对应 $9B7F: 清空全部精灵 (OAM 复位) */
  initHelper(): void {
    this._render.spriteClear();
  }

  /** 别名: $9B7F PPU 初始化 */
  ppuInit(): void {
    this.initHelper();
  }

  // ══════════════════════════════════════════════════════════════
  // $99F0: 调色板渐隐 (fade-out to black)
  // ══════════════════════════════════════════════════════════════

  /** 对应 $99F0: 调色板渐隐, 递减 ram_004A/004B 直到双 0 */
  unknownInit(): void {
    const s = this._store;
    let a = s.read(RAM_004A);
    let b = s.read(RAM_004B);
    while ((a | b) !== 0) {
      a = (a - 1) & 0xFF;
      if (b !== 0) {
        b = (b - 1) & 0xFF;
      }
      s.write(RAM_004A, a);
      s.write(RAM_004B, b);
      this.waitVBlank();
    }
  }

  // ══════════════════════════════════════════════════════════════
  // $9F69: 数据写入辅助 (调度器栈帧构建)
  // ══════════════════════════════════════════════════════════════

  /**
   * 对应 $9F69: 调度器栈帧构建。
   * 在零页 ($0000,X) 构造"调度器返回帧"并保存到栈区 $0100 段。
   *
   * @param a 待写入 ram_000X+2 的值
   * @param y 初始 Y
   * @param x 零页基址索引
   */
  dataWriteHelper(a: number, y: number, x: number): void {
    const s = this._store;
    const zp = (off: number) => `ram_00${(off & 0xFF).toString(16).padStart(2, '0').toUpperCase()}`;
    s.write(zp(x + 2), a & 0xFF);
    const yy = (y - 2) & 0xFF;
    const v0 = s.read(zp(x));
    const v1 = s.read(zp(x + 1));
    const abs = (off: number) => `ram_${(off & 0xFFFF).toString(16).padStart(4, '0').toUpperCase()}`;
    s.write(abs(0x0101 + yy), v0);
    s.write(abs(0x0102 + yy), v1);
    s.write(zp(x + 1), yy);
    s.write(zp(x), 0xFF);
  }

  // ══════════════════════════════════════════════════════════════
  // $8895 / $8920 / $8976: 场景参数/数据加载 (共享给 bank02 等)
  // ══════════════════════════════════════════════════════════════

  /** 对应 $8895: 设置场景参数 + 数据指针 */
  sceneParamSet(a: number): void {
    const s = this._store;
    s.write('ram_0057', a & 0xFF);
    s.write('ram_000D', 0xA8);
    s.write('ram_000E', 0x88);
    this.dataWriteHelper(0x00, 0xA0, 0x0D);
  }

  /** 对应 $8920: 场景数据加载 (读取 19 字节到 ram_0079/007B..) */
  tableLoad(param: number): void {
    const s = this._store;
    const off = (0x1F00 + (param & 0xFF) * 0x13) & 0x1FFF;
    const idx = off - 0x1F00;
    const readT = (i: number): number => {
      const j = idx + i;
      return j >= 0 && j < BANK06_TABLE_LOAD_DATA.length ? BANK06_TABLE_LOAD_DATA[j] : 0xFF;
    };
    s.write('ram_0079', readT(0));
    s.write('ram_007A', 0);
    for (let y = 1; y <= 0x12; y++) {
      const zpOff = 0x7B + y;
      const key = `ram_00${zpOff.toString(16).padStart(2, '0').toUpperCase()}`;
      s.write(key, readT(y));
    }
  }

  /** 对应 $8976: 数据源切换 */
  dataSourceSwitch(x: number, y: number): void {
    const s = this._store;
    s.write('ram_00EA', s.read('ram_004D'));
    s.write('ram_00EB', s.read('ram_004E'));
    s.write('ram_00E6', 2);
    s.write('ram_00E7', x & 0xFF);
    s.write('ram_00E8', y & 0xFF);
    s.write('ram_004D', 0xE5);
    s.write('ram_004E', 0x00);
    this.paletteWriteBuf([]);
    s.write('ram_004D', s.read('ram_00EA'));
    s.write('ram_004E', s.read('ram_00EB'));
  }

  /** 对应 $9A0D: 帧计数器等待 (调色板渐显推进) */
  waitCounter(): void {
    this._render.fadeWait();
  }

  // ══════════════════════════════════════════════════════════════
  // $997A: 帧等待 + 调色板渐显 (fade-in to full)
  // ══════════════════════════════════════════════════════════════

  /**
   * 对应 $997A: 帧等待 + 调色板渐显循环 (ram_004A/004B 递增至 0x0F)。
   *
   * @param bgGrp  BG 调色板组号 (A)
   * @param sprGrp SPR 调色板组号 (X)
   */
  fadeInFromCurrent(bgGrp: number, sprGrp: number): void {
    const s = this._store;
    s.write(RAM_0048, bgGrp & 0xFF);
    s.write(RAM_0049, sprGrp & 0xFF);
    this._render.paletteLoad(bgGrp & 0xFF, sprGrp & 0xFF);
    s.write('ram_00E9', s.read(RAM_0025));
    let a = s.read(RAM_004A);
    let b = s.read(RAM_004B);
    while (true) {
      if (a < 0x0F) a = (a + 1) & 0xFF;
      if (b < 0x0F) b = (b + 1) & 0xFF;
      s.write(RAM_004A, a);
      s.write(RAM_004B, b);
      this.waitVBlank();
      if ((a + b) >= 0x1E) break;
    }
  }

  // ══════════════════════════════════════════════════════════════
  // $82A9 / $82B5 / $899A: 菜单脚本转移等待与状态复位
  // ══════════════════════════════════════════════════════════════

  /** 对应 $82A9: 等待脚本/文本转移完成 */
  waitScriptTransfer(): void {
    const s = this._store;
    while ((s.read('ram_004D') | s.read('ram_004E')) !== 0) {
      this.waitVBlank();
    }
  }

  /** 对应 $82B5: 等待文本转移完成并复位一组显示状态变量 */
  waitTransferThenReset(): void {
    const s = this._store;
    this.waitScriptTransfer();
    this._clearStateVars();
    s.write('ram_004C', 0);
    s.write('ram_0700', 1);
    this.waitVBlank();
    s.write('ram_0044', 0);
    s.write('ram_0045', 0);
    s.write('ram_007A', 0);
    s.write('ram_007B', 0);
  }

  /** 对应 $899A: 设置 ram_0099 转移控制标志 (保留 bit7, 置 bit6) */
  setTransferFlag99(): void {
    const s = this._store;
    const v = s.read('ram_0099');
    s.write('ram_0099', (v & 0x80) | 0x40);
  }

  // ══════════════════════════════════════════════════════════════
  // $8464: 脚本加载器 (含 $8494 dataWriteHelper(0,0x50,0x05))
  // ══════════════════════════════════════════════════════════════

  /** 对应 $8464: 按脚本 ID 加载脚本 (启动脚本分派器) */
  scriptLoader(id: number): void {
    const s = this._store;
    const bank = getScriptBank(id & 0xFF);
    s.write('ram_0056', bank & 0xFF);
    s.write('ram_00ED', s.read(RAM_0025));
    const script = getScriptData(id & 0xFF);
    const startAddr = script?.entryAddr ?? '$A000';
    const entry = parseInt(startAddr.replace('$', ''), 16) || 0xA000;
    s.write('ram_004D', entry & 0xFF);
    s.write('ram_004E', (entry >> 8) & 0xFF);
    s.write('ram_0005', 0xC5);
    s.write('ram_0006', 0x84);
    this.dataWriteHelper(0x00, 0x50, 0x05);
    s.write('ram_000D', 0);
    s.write('ram_000E', 0);
    s.write('ram_0652', 0);
    s.write('ram_00E6', 0xE0);
    s.write('ram_00E7', 0x23);
    this.ppuFill98EA(1, 0x20, 0x55);
  }

  /** 对应 $98EA: PPU 块填充 (把 A 填充到 ram_00E6/00E7 指向的 VRAM 区域) */
  ppuFill98EA(y: number, x: number, a: number): void {
    const s = this._store;
    const vramAddr = ((s.read('ram_00E7') << 8) | s.read('ram_00E6')) & 0xFFFF;
    this._render.ppuFillRegion(vramAddr, y & 0xFF, x & 0xFF, a & 0xFF);
  }

  /** 对应 $9F89: OAM 终止判定 */
  oamTerm89(x: number): void {
    const s = this._store;
    if (s.read(ramKey(0x0000 + x)) !== 0) {
      if (s.read(ramKey(0x0001 + x)) === 0) {
        s.write(ramKey(0x0000 + x), 1);
      }
    }
  }

  /** 对应 $9F96: OAM 终止处理 */
  oamTerm96(x: number): void {
    const s = this._store;
    s.write(ramKey(0x0000 + x), 0);
  }

  /** 对应 $9B91: OAM 区域标志清零 (渲染部分) */
  oamFlagClear(): void {
    this._render.oamFlagClear();
  }

  // ══════════════════════════════════════════════════════════════
  // $9B6F / $9B74: OAM 精灵起点/终点坐标
  // ══════════════════════════════════════════════════════════════

  /** 对应 $9B6F: 保存精灵起点坐标 (X→ram_009E, Y→ram_009F) */
  oamSetStart(x: number, y: number): void {
    this._render.spriteSetStart(x, y);
  }

  /** 对应 $9B74: 保存精灵终点坐标并闭合区域标志 */
  oamSetEnd(x: number, y: number): void {
    this._render.spriteSetEnd(x, y);
  }

  // ══════════════════════════════════════════════════════════════
  // $9D27/$9D52/$9D58: GFX 图形数据复制
  // ══════════════════════════════════════════════════════════════

  /** 对应 $9D27: GFX 图形数据复制 (含 $9D58 字符段处理) */
  gfxCopy9D27(data: number[]): void {
    let idx = 0;
    while (idx < data.length) {
      let vramLo = (data[idx] ?? 0) & 0xFF;
      let vramHi = (data[idx + 1] ?? 0) & 0xFF;
      idx += 2;
      let wroteAny = false;
      while (idx < data.length) {
        const ch = data[idx];
        idx++;
        if (ch >= 0xFC) break;
        this._writeGfxChar(ch, vramLo, vramHi);
        vramLo = (vramLo + 1) & 0xFF;
        if (vramLo === 0) vramHi = (vramHi + 1) & 0xFF;
        wroteAny = true;
      }
      if (!wroteAny) break;
    }
  }

  /** 对应 $88CA: 写单个文本字符到 PPU Buffer (GFX 复制内部用) */
  private _writeGfxChar(ch: number, vramLo: number, vramHi: number): void {
    const off = this._render.ppuBufAlloc(5);
    if (off < 0) return;
    this._render.ppuBufWrite(off, 0x82);
    this._render.ppuBufWrite(off + 1, vramLo & 0xFF);
    this._render.ppuBufWrite(off + 2, vramHi & 0xFF);
    if (ch < 0xA0) {
      this._render.ppuBufWrite(off + 3, ch & 0xFF);
      this._render.ppuBufWrite(off + 4, 0x00);
    } else {
      const hiTile = ch >= 0xC8 ? 0x95 : 0x94;
      const entry = CHAR_MAP_DOUBLE[ch];
      const loTile = entry?.loTile ?? 0x00;
      this._render.ppuBufWrite(off + 3, hiTile);
      this._render.ppuBufWrite(off + 4, loTile);
    }
    this._render.ppuBufEnd();
  }

  // ══════════════════════════════════════════════════════════════
  // $9C3A / $9C28: 指针表装载 / 间接分发
  // ══════════════════════════════════════════════════════════════

  /** 对应 $9C3A: 指针表装载 (把 5 字节项写入 ram_0468+X 精灵组区) */
  tableLoad0468(data: number[]): number {
    const s = this._store;
    const startX = (data[0] ?? 0) & 0xFF;
    let d1 = (data[1] ?? 0) & 0xFF;
    if (d1 === 0) {
      d1 = (d1 + 0x10) & 0xFF;
    }
    for (let i = 0; i < 5; i++) {
      s.write(ramKey(0x0468 + startX + i), (i === 0 ? d1 : (data[1 + i] ?? 0)) & 0xFF);
    }
    s.write('ram_00E6', (data[5] ?? 0) & 0xFF);
    const yRet = (startX - 4) & 0xFF;
    s.write('ram_00E7', d1);
    return yRet;
  }

  /** 对应 $9C28: 指针表间接分发 (6502 JMP (abs) 翻译), 返回目标地址 */
  tableDispatch(jumpTable: number[], index: number): number {
    const s = this._store;
    const i = (index & 0xFF) * 2;
    const lo = (jumpTable[i] ?? 0) & 0xFF;
    const hi = (jumpTable[i + 1] ?? 0) & 0xFF;
    const target = (hi << 8) | lo;
    s.write('ram_00E6', lo);
    s.write('ram_00E7', hi);
    return target;
  }

  // ══════════════════════════════════════════════════════════════
  // $9BA0: 等待 VBlank
  // ══════════════════════════════════════════════════════════════

  /** 对应 $9BA0: 等待 VBlank (帧同步标记, 渲染部分委托 view) */
  waitVBlank(): void {
    this._render.waitVBlank();
  }

  // ══════════════════════════════════════════════════════════════
  // $9BE3/$9C0D: 帧等待循环 (精灵 Y 移动 + 隐藏)
  // ══════════════════════════════════════════════════════════════

  /** 对应 $9BE3: 帧等待循环 (返回 (原Y-上界)>>3) */
  frameWait(oamIdx: number, hi: number, lo: number): number {
    const s = this._store;
    s.write('ram_00E7', hi & 0xFF);
    s.write('ram_00E6', lo & 0xFF);
    const yIdx = oamIdx & 0xFF;
    while (true) {
      this.waitVBlank();
      const frame = s.read(FRAME_FLAG) ?? 0;
      this._oamYClamp(yIdx, frame);
      if ((frame & 0x80) !== 0) break;
    }
    const yVal = s.read(ramKey(0x0468 + yIdx)) ?? 0;
    let a = (yVal - (hi & 0xFF)) & 0xFF;
    a = (a >> 3) & 0xFF;
    s.write('ram_00E7', a);
    s.write(ramKey(0x0468 + yIdx), 0xF8);
    return a;
  }

  /** 对应 $9C0D: 帧等待循环变体 (返回是否进位 SEC) */
  frameWaitAlt(oamIdx: number, hi: number, lo: number): boolean {
    const s = this._store;
    s.write('ram_00E7', hi & 0xFF);
    s.write('ram_00E6', lo & 0xFF);
    const yIdx = oamIdx & 0xFF;
    while (true) {
      this.waitVBlank();
      const frame = s.read(FRAME_FLAG) ?? 0;
      this._oamYClamp(yIdx, frame);
      if ((frame & 0x90) !== 0) {
        const yVal = s.read(ramKey(0x0468 + yIdx)) ?? 0;
        let a = (yVal - (hi & 0xFF)) & 0xFF;
        a = (a >> 3) & 0xFF;
        s.write('ram_00E7', a);
        s.write(ramKey(0x0468 + yIdx), 0xF8);
        return false;
      }
      if ((frame & 0x40) !== 0) {
        s.write(ramKey(0x0468 + yIdx), 0xF8);
        return true;
      }
    }
  }

  /** 对应 $9CE7: 精灵 Y 坐标钳制移动 (共享渲染原语) */
  private _oamYClamp(oamIdx: number, frame: number): boolean {
    const s = this._store;
    const idx = frame & 0x0F;
    const delta = SPR_Y_DELTA_TABLE[idx] ?? 0;
    if (delta === 0) return false;
    const hi = s.read('ram_00E7') ?? 0;
    const lo = s.read('ram_00E6') ?? 0;
    const newY = (s.read(ramKey(0x0468 + oamIdx)) + delta) & 0xFF;
    const result = newY < hi ? lo : hi;
    s.write(ramKey(0x0468 + oamIdx), result);
    return true;
  }

  // ══════════════════════════════════════════════════════════════
  // $9B28/$9B5E/$97AB: PPU Buffer 操作
  // ══════════════════════════════════════════════════════════════

  /** 对应 $9B28: PPU Buffer 空间分配 (渲染部分) */
  ppuBufAlloc(size: number): number {
    return this._render.ppuBufAlloc(size);
  }

  /** 对应 $9B5E: PPU Buffer 结束标记 (渲染部分) */
  ppuBufEnd(): void {
    this._render.ppuBufEnd();
  }

  /** 写单个字节到 PPU Buffer */
  ppuBufWrite(offset: number, value: number): void {
    this._render.ppuBufWrite(offset, value);
  }

  /** 对应 $97AB: PPU 缓冲数据载入 (共享渲染原语) */
  ppuBufLoad97AB(block: number[]): void {
    const s = this._store;
    const e9 = s.read('ram_00E9') ?? 0;
    let idx = 0;
    while (idx < block.length) {
      const control = block[idx] ?? 0;
      const lo = ((block[idx + 1] ?? 0) + e9) & 0xFF;
      const hi = ((block[idx + 2] ?? 0) + (e9 & 0x80 ? 0xFF : 0)) & 0xFF;
      const count = control & 0x3F;
      const bufOff = this._render.ppuBufAlloc(3 + count);
      if (bufOff < 0) break;
      this._render.ppuBufWrite(bufOff, control & 0xBF);
      this._render.ppuBufWrite(bufOff + 1, lo);
      this._render.ppuBufWrite(bufOff + 2, hi);
      for (let i = 0; i < count; i++) {
        this._render.ppuBufWrite(bufOff + 3 + i, block[idx + 3 + i] ?? 0);
      }
      this._render.ppuBufEnd();
      idx += 3 + count;
      if ((control & 0x40) === 0) break;
    }
  }

  // ══════════════════════════════════════════════════════════════
  // $A721: 屏幕补绘 (归 bank01 实现, 此处仅占位)
  // ══════════════════════════════════════════════════════════════

  /** 对应 $A721: 屏幕补绘 (归 bank01, 由 bank01_data-query 实现) */
  drawScreenA721(): void {
    // eslint-disable-next-line no-empty
  }

  // ══════════════════════════════════════════════════════════════
  // $84C1: Bank 02 跳转表分发
  // ══════════════════════════════════════════════════════════════

  /** 对应 $84C1: Bank 02 跳转表分发 (记录入口索引, 由调用方调 Bank02Service) */
  bank02Dispatch(index: number): void {
    this._store.write('bank02_entry', index);
  }

  // ══════════════════════════════════════════════════════════════
  // $801F: 场景初始化链入口
  // ══════════════════════════════════════════════════════════════

  /** 对应 $801F: 等待 VBlank → 清 PPU Buffer → ram_1B bit0 场景初始化 */
  sceneInitEntry(): void {
    this.waitVBlank();
    this._render.ppuBufClear();
    const ram1b = this._store.read(RAM_1B);
    if ((ram1b & 0x01) === 0) {
      this._firstFrameInit();
      this._store.write(RAM_1B, ram1b | 0x01);
    }
  }

  // ══════════════════════════════════════════════════════════════
  // 辅助: 帧标志 / 场景 ID
  // ══════════════════════════════════════════════════════════════

  /**
   * 设置 NMI 帧标志 = ram_001B bit7 (对应 bank30 NMI handler $C7EA-$C7EE)。
   * ⚠️ 语义纠正: 帧标志是 ram_001B bit7, 不是 ram_001E (那是手柄新按下边沿)。
   * 该标志由 NMI handler 每帧置位 (已由 InterruptService.nmi 处理), 本方法供显式同步用。
   */
  setVBlankFlag(): void {
    const ram1b = this._store.read(RAM_1B) ?? 0;
    this._store.write(RAM_1B, ram1b | 0x80);
  }

  /** 读取当前场景 ID */
  getSceneId(): number {
    return this._store.read(SCENE_ID);
  }
}
