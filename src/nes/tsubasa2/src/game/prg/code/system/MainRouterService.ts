/**
 * MainRouterService — bank00 $8000-$8282 主 dispatcher + boot 链路 翻译
 *
 * 翻译原则（v2，去 CPU 化）：
 *   - 不模拟 6502 RTS 间接 JMP dispatcher table
 *   - 用 jumpTable[5] (action 0..4) 替代 RAM $800D-$8014
 *   - $0027 scene status code 改为 status mode number (0..4)
 *   - 5 个 handler action 改成 method dispatch (table-driven)
 *
 * 对应 PRG 段（docs/BANK00_ANALYSIS.md §2.1）：
 *   $8000: 6-byte dispatcher table jump（LDA $0027 / ASL TAX / LDA $800E,X PHA / RTS）
 *   $800D: dispatcher table (5 entries → $A265 / $A28A / $A2AD / $A2B4 / $A2DA)
 *   $8019: main game loop (JMP $A203 bank2)
 *   $801F: scheduler reset + Start button spin
 *   $8053: boot logo load sequence (CHR load 0x17 + hideOam + clear NT)
 *   $80BC: palette flash helper (EOR #$40 for blink)
 *   $80E6: game enter PPU 启动 (调 bank2 sceneLoad + clear)
 *   $8285: audio request
 *   $8297: wait/spin via $9085 (JSR $9FA8 → scheduler)
 *
 * 来源：BANK00_ANALYSIS.md §7 status 列（✅ 已锚多数），本服务实现业务侧包装。
 *
 * P1 重要：boot 链路 + 主循环 + 标题画面 button polling 翻译
 */
import type { DataStore } from '../../data/store/DataStore';
import type { SceneController } from '../scene/SceneController';
import type { Bank00SchedulerService } from './Bank00SchedulerService';

/**
 * Status mode（PRG $0027 状态字节 0..4 翻译）
 * 0 = mode0 帧步进/装载
 * 1 = mode1 计时比较
 * 2 = mode2 步进场景
 * 3 = mode3 计时比较
 * 4 = mode4 计时 + 装载 + 渐隐
 */
export type StatusMode = 0 | 1 | 2 | 3 | 4;

/**
 * 5 entry dispatcher table (PRG $800D-$8014)
 * 替代 ROM `LDA $0027 / ASL TAX / LDA $800E,X / PHA / LDA $800D,X / PHA / RTS`
 * H5 上下文：每个 entry 调 callback 函数，跳过所有 bank 切换模型
 */
export type DispatchAction = (ctx: { mode: StatusMode; router: MainRouterService }) => void;

export class MainRouterService {
  /** 5 entry dispatcher table — mode 0..4 → action callback */
  private readonly dispatchTable: (DispatchAction | null)[] = new Array(5).fill(null);

  /** 当前 status mode（$0027） */
  private currentMode: StatusMode = 0;

  /** boot 期 Start 按钮 spin 状态 — true 表示等待 Start */
  private bootStartWaiting: boolean = false;

  /** boot logo flash（idle blink）状态 */
  private logoFlashState: number = 0;

  /** 当前 scene 控制器引用 — 直接 dispatch callback */
  private currentScene: SceneController | null = null;

  /** bank00 scheduler（由 Tsubasa2 boot() 注入；PRG $9FA8 pushState 翻译） */
  private scheduler: Bank00SchedulerService | null = null;

  /** boot intro 等待帧计数 — 由 mode 0 派发时自检（PRG $9FA8 等帧翻译） */
  private bootIntroFrameCounter: number = 0;

  constructor(readonly store: DataStore) {}

  // ──────────────────────── $8000 dispatcher ────────────────────────

  /**
   * 注册 dispatcher entry（PRG $800D table init 翻译）。
   *
   * ROM 行为：dispatcherTable[mode] = handler_addr
   * H5 行为：直接覆盖 callback 引用
   *
   * @param mode status mode (0..4)
   * @param action handler callback
   */
  registerDispatchAction(mode: StatusMode, action: DispatchAction | null): void {
    if (mode < 0 || mode > 4) return;
    this.dispatchTable[mode] = action;
  }

  /**
   * 设置当前 status mode 并立即 dispatch（PRG $8000 翻译）。
   *
   * ROM 行为：LDA $0027 → JMP ($800E,X)
   * H5 行为：this.currentMode = mode → 调用对应 callback
   *
   * @param mode 要 dispatch 的 status mode
   */
  dispatchByMode(mode: StatusMode): void {
    this.currentMode = mode;
    const action = this.dispatchTable[mode];
    if (action) action({ mode, router: this });
  }

  // ──────────────────────── $801F boot + Start button spin ────────────────────────

  /**
   * Boot 进入：scheduler reset + Start 按钮等待（PRG $801F-$8030 翻译）。
   *
   * ROM 行为：
   *   1. JSR $9BA0 (scheduler reset)
   *   2. JSR $8464 (PPU transfer cfg(0))
   *   3. 循环: JSR $9FA8 (wait 1 frame) / LDA $001E / AND #$10 / BEQ back
   *      = 等 Start 键按下
   *   4. LDA #$00 / STA $0005..$005B (=清场 11 字节)
   *   5. STA $0700 = 1 (scheduler start marker)
   *
   * H5 语义：占位实现 — 由 InterruptService.nmi 读手柄 + 由 BootRouter.changeScene 决定下一步
   *
   * @returns true 表示已收到 Start 按钮可以进入下一步
   */
  pollBootStartButton(): boolean {
    const startByte = this.store.readByte(0x001e);
    // Start 键对应 NES 控制器 bit 3 ($10)
    return (startByte & 0x10) !== 0;
  }

  // ──────────────────────── $8053 boot logo load ────────────────────────

  /**
   * boot logo 装载序列（PRG $8053-$8090 翻译占位）。
   *
   * ROM 行为链：
   *   JSR $9B11 (clear all state)
   *   JSR $9FA8 (wait 2 frames)
   *   JSR $9B7F (hideOam DMA)
   *   JSR $98A0 (clear NT)
   *   JSR $9FA8 (wait 13 frames)
   *   JSR $8AF7 (scene handler loader = CHR load 0x17)
   *   JSR $890C (sprite Y += 0x30)
   *   JSR $88FB (palette XOR all sprites)
   *   JSR $9A35 (BG palette group 0 + full bright)
   *
   * H5 占位：所有子功能已在现有 Service 中（hideOam, clearNt 等），本入口聚合
   */
  bootLogoLoad(): void {
    this.bootStartWaiting = true;
    // 由调用方按顺序触发:
    //   RenderingPrimitivesService.clearAll() → 调 $9B11 等价
    //   this.store.fade.bg = 0x0F; this.store.fade.spr = 0x0F
    //   this.prim.hideOam()
    //   PpuTransferService.clearNt(ppu)
    //   sleep 13 frames（外层 InterruptService.tick 计数）
    //   loadChrConfig(0x17)  → Bank02 数据由 SceneController 处理
  }

  // ──────────────────────── $80BC palette flash ────────────────────────

  /**
   * Palette flash（PRG $80BC-$80D1 翻译）。
   *
   * ROM 行为：
   *   LDA $00ED / EOR #$40 / STA $00ED / LDY #$03 LDX #$01 / JSR $98E8
   *   = toggle bit 6 of $00ED（每 16 frame 周期）
   *
   * H5 语义：toggles store.scene boot flash flag
   */
  toggleBootFlash(): void {
    const cur = this.store.readByte(0x00ed);
    this.logoFlashState = (cur ^ 0x40) & 0xff;
    this.store.writeByte(0x00ed, this.logoFlashState);
  }

  // ──────────────────────── $80E6 game enter PPU 启动 ────────────────────────

  /**
   * 进入游戏 PPU 启动（PRG $80E6-$812C 翻译占位）。
   *
   * ROM 行为：
   *   JSR $9BA0 (scheduler reset)
   *   JSR $8464 (PPU transfer cfg(1))
   *   JSR $82B5 (clear input state)
   *   LDA #$C0 / STA $00E0 (cmd flag)
   *   JSR $A20F (load scene 0 bytes) (bank2)
   *   ... 等 bank2 scene 装载
   *
   * H5 语义：触发场景切换，由 BootRouter.changeScene() 接管
   */
  enterGame(sceneId: number): void {
    this.bootStartWaiting = false;
    this.store.writeByte(0x00e0, 0xc0);
    // 由调用方 BootRouter.changeScene(sceneId) 接管
    void sceneId;
  }

  // ──────────────────────── $8285 audio request ────────────────────────

  /**
   * 音频请求（PRG $8285-$8294 翻译占位）。
   * 实际由 AudioService 处理，本入口只通知调度器准备
   */
  prepareAudio(audioCmd: number): void {
    this.store.writeByte(0x0700, audioCmd & 0xff);
    // 调用 AudioService.playBgm(audioCmd) 等
  }

  // ──────────────────────── $8297 wait via $9FA8 ────────────────────────

  /**
   * 等待 N 帧（PRG $8297-$82A8 翻译包装）。
   *
   * ROM 行为：JSR $9FA8（A=1 = wait 1 frame / scheduler state push）
   * H5 语义：占位 — 真同步等待由 InterruptService 每帧 tick 推进
   */
  waitFrames(n: number): void {
    const wait = n & 0xff;
    if (wait === 0) return;
    this.store.writeByte(0x0700, wait);
  }

  /** 检查 boot 期 Start 等待状态 */
  isBootWaiting(): boolean {
    return this.bootStartWaiting;
  }

  /** 设置当前 scene controller 引用 */
  setCurrentScene(scene: SceneController | null): void {
    this.currentScene = scene;
  }

  getCurrentScene(): SceneController | null {
    return this.currentScene;
  }

  /** 注入 bank00 scheduler（PRG $9FA8 翻译） */
  attachScheduler(scheduler: Bank00SchedulerService): void {
    this.scheduler = scheduler;
  }

  /**
   * Boot intro 等帧（PRG $9FA8 pushState wait N 帧 — intro mode 0 path）。
   *
   * 用 scheduler 派发 timer 帧后 callback，替代 ROM 自减循环。
   *
   * @param timer 等待帧数
   * @param onArrived callback 抵达后执行
   */
  waitIntroFrames(timer: number, onArrived: () => void): number {
    this.bootIntroFrameCounter = timer & 0xff;
    if (!this.scheduler) {
      // fallback: 立即调 callback
      onArrived();
      return -1;
    }
    return this.scheduler.pushState({
      aReg: 0,
      xReg: 0,
      yReg: this.bootIntroFrameCounter,
      timer: this.bootIntroFrameCounter,
      priority: 0,
      callback: () => { this.bootIntroFrameCounter = 0; onArrived(); },
    });
  }

  /** Boot intro 等待剩余帧数（debug 视图） */
  getBootIntroFrameCounter(): number {
    return this.bootIntroFrameCounter;
  }
}
