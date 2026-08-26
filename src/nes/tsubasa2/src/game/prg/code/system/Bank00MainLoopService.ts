/**
 * Bank00MainLoopService — PRG $8000 入口 翻译（bank00 主循环 + 5-mode dispatcher）
 *
 * 翻译原则（v2，去 CPU 化）：
 *   - 5 mode dispatcher table 用具名 callback 替代 ROM 的 JMP ($800E,X)
 *   - scheduler 入队由 Bank00SchedulerService 承接（PRG $9FA8 pushState）
 *   - PPU cfg loader 由 PpuTransferService 承接（PRG $8464）
 *
 * 此文件 **专门承接 bank00 $8000-$8282 main loop** 的翻译工作，
 * 不再依赖 BootRouter 这层 wrapper。
 *
 * 对应 PRG 段（docs/BANK00_ANALYSIS.md §2.1）：
 *   $8000: 6-byte dispatcher table jump (LDA $0027 / ASL TAX / LDA $800E,X / PHA / LDA $800D,X / PHA / RTS)
 *   $800D: dispatcher table (5 entries → $A265 / $A28A / $A2AD / $A2B4 / $A2DA)
 *   $8019: main game loop entry (JMP $A203 bank2 main loop body)
 *   $801F: scheduler reset + Start button spin
 *   $8053: boot logo load sequence
 *   $80BC: palette flash helper (EOR #$40 for blink)
 *   $80E6: game enter PPU 启动
 *   $8285: audio request
 *   $8297: wait/spin via $9FA8 (scheduler trampoline)
 *   $8267: mainLoopStep ($0026++ / $0027=0)
 */
import type { DataStore } from '../../data/store/DataStore';
import type { Bank00SchedulerService } from './Bank00SchedulerService';
import type { PpuTransferService } from './PpuTransferService';
import { MainRouterService, StatusMode } from './MainRouterService';

/** Status mode (PRG $0027 状态字节 0..4 翻译) */
export type { StatusMode } from './MainRouterService';

export class Bank00MainLoopService {
  /** MainRouterService 实例 — 5-mode dispatcher */
  readonly router: MainRouterService;

  /** 当前 status mode（$0027） */
  private currentMode: StatusMode = 0;

  /** boot 期 Start 按钮 spin 状态 — true 表示等待 Start */
  private bootStartWaiting: boolean = false;

  /** boot intro 等待帧计数 — 由 mode 0 派发时自检（PRG $9FA8 等帧翻译） */
  private bootIntroFrameCounter: number = 0;

  constructor(
    readonly store: DataStore,
    readonly scheduler: Bank00SchedulerService,
    private readonly ppuTransfer: PpuTransferService,
  ) {
    this.router = new MainRouterService(store);
    this.autoRegisterDispatchActions();
  }

  // ──────────────────────── $8000 dispatcher ────────────────────────

  /**
   * 5 mode dispatcher (PRG $800D table init 翻译)。
   * 替代 GameSystemService.update() 旧硬编码 if-else mode 0/1/2/3/4 dispatch 的 stub。
   *
   *   mode 0: 步进场景 counter; 不切场景, 让 Scene controller 自管
   *   mode 1: 计时比较 ($0028 > $0029) → mainLoopStep
   *   mode 2: 立即 mainLoopStep
   *   mode 3: 计时比较 + mainLoopStep (与 mode 1 等价)
   *   mode 4: 计时比较 + 装载 fade cfg 0x60 + 清 $0027 mode=0
   */
  private autoRegisterDispatchActions(): void {
    const store = this.store;

    // mode 0 — 帧步进 / standby; 装载 counter $0026 += 1
    this.router.registerDispatchAction(0 as StatusMode, () => {
      const step = (store.readByte(0x0026) + 1) & 0xff;
      store.writeByte(0x0026, step);
      // 由 Bank00SchedulerService pushState wait timer 帧 (boot intro path)
      // mode 0 不主动清 counter, 让 scheduler tickDispatch 自动推进
    });
    // mode 1 — 计时比较 ($0028 > $0029) → mainLoopStep
    this.router.registerDispatchAction(1 as StatusMode, () => {
      if (store.readByte(0x0028) > store.readByte(0x0029)) {
        this.mainLoopStep();
      }
    });
    // mode 2 — 立即 mainLoopStep
    this.router.registerDispatchAction(2 as StatusMode, () => {
      this.mainLoopStep();
    });
    // mode 3 — 计时比较 + mainLoopStep (与 mode 1 等价)
    this.router.registerDispatchAction(3 as StatusMode, () => {
      if (store.readByte(0x0028) > store.readByte(0x0029)) {
        this.mainLoopStep();
      }
    });
    // mode 4 — 计时比较 + 装载 fade cfg 0x60 + 清 $0027 mode=0
    this.router.registerDispatchAction(4 as StatusMode, () => {
      const a = store.readByte(0x0028);
      const b = store.readByte(0x0029);
      if (a !== b) {
        // 装载 fade out cfg 0x60 (PRG $8464 多 bank cfg 装载 fallback)
        this.ppuTransfer.loadCfgBlock(0x60);
      }
      // 清 mode → 让下一帧从 mode 0 重新开始
      store.writeByte(0x0027, 0);
    });
  }

  // ──────────────────────── $8267 mainLoopStep ────────────────────────

  /**
   * 主循环步进（PRG $8267 = $0026++ / $0027=0 翻译）。
   * 由 mode 1/2/3 action 调用; 外部亦可主动调。
   *
   * 副作用:
   *   - $0026 (step counter) += 1
   *   - $0027 (status mode) = 0  → 下一帧从 mode 0 重新派发
   */
  mainLoopStep(): void {
    const store = this.store;
    const step = (store.readByte(0x0026) + 1) & 0xff;
    store.writeByte(0x0026, step);
    store.writeByte(0x0027, 0);
  }

  // ──────────────────────── $801F boot + Start button spin ────────────────────────

  /**
   * Boot 期 Start 按钮 spin (PRG $801F-$8030 翻译)。
   *
   * ROM 行为:
   *   1. JSR $9BA0 (scheduler reset)
   *   2. JSR $8464 (PPU transfer cfg(0))
   *   3. 循环: JSR $9FA8 (wait 1 frame) / LDA $001E / AND #$10 / BEQ back
   *      = 等 Start 键按下
   *   4. LDA #$00 / STA $0005..$005B (=清场 11 字节)
   *   5. STA $0700 = 1 (scheduler start marker)
   */
  pollBootStartButton(): boolean {
    const startByte = this.store.readByte(0x001e);
    return (startByte & 0x10) !== 0;
  }

  /** 检查 boot 期 Start 等待状态 */
  isBootWaiting(): boolean {
    return this.bootStartWaiting;
  }

  // ──────────────────────── $8053 boot logo load ────────────────────────

  /**
   * boot logo 装载序列（PRG $8053-$8090 翻译占位）。
   *
   * ROM 行为链:
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
   * H5 占位: 当前 boot logo 装载在 Scene0.onEnter stub; 此入口聚合便于将来切到此归位。
   */
  bootLogoLoad(): void {
    this.bootStartWaiting = true;
    // 由调用方按顺序触发: hideOam / clearNt 等子功能 (已由 RenderingPrimitivesService 提供)
    // 等待 NMI 13 帧后 loadChrConfig(0x17) 等
  }

  // ──────────────────────── $80E6 game enter PPU 启动 ────────────────────────

  /**
   * 进入游戏 PPU 启动（PRG $80E6-$812C 翻译占位）。
   * 由调用方 BootRouter.changeScene(sceneId) 接管实际场景切换。
   */
  enterGame(sceneId: number): void {
    this.bootStartWaiting = false;
    this.store.writeByte(0x00e0, 0xc0);
    void sceneId;
  }

  // ──────────────────────── $8285 audio request ────────────────────────

  /**
   * 音频请求（PRG $8285-$8294 翻译占位）。
   * 实际由 AudioService 处理, 本入口只通知调度器准备。
   */
  prepareAudio(audioCmd: number): void {
    this.store.writeByte(0x0700, audioCmd & 0xff);
  }

  // ──────────────────────── $8297 wait via $9FA8 ────────────────────────

  /**
   * 等待 N 帧（PRG $8297-$82A8 翻译包装）。
   * 真同步等待由 InterruptService 每帧 tick 推进 + scheduler tickDispatch。
   */
  waitFrames(n: number): void {
    const wait = n & 0xff;
    if (wait === 0) return;
    this.store.writeByte(0x0700, wait);
  }

  // ──────────────────────── $9FA8 pushState (boot intro 等帧) ────────────────────────

  /**
   * Boot intro 等帧（PRG $9FA8 pushState wait N 帧 — intro mode 0 path）。
   * 用 scheduler 派发 timer 帧后 callback, 替代 ROM 自减循环。
   *
   * @param timer 等待帧数
   * @param onArrived callback 抵达后执行
   */
  waitIntroFrames(timer: number, onArrived: () => void): number {
    this.bootIntroFrameCounter = timer & 0xff;
    if (!this.scheduler) {
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

  // ──────────────────────── 每帧 tick 入口（由 InterruptService.nmi 调用） ────────────────────────

  /**
   * 每帧派发入口（PRG $8000 LDA $0027 / JMP ($800E,X) 翻译）。
   *
   * 由 InterruptService.nmi() 在 scene router.update() 之后调;
   *   或由 BootRouter.update() 末尾调 (按组合根接线方式).
   *
   * 按当前 $0027 mode 派发对应 callback.
   */
  tickFrame(): void {
    const mode = this.store.readByte(0x0027) & 0x07;
    if (mode >= 0 && mode <= 4) {
      this.currentMode = mode as StatusMode;
      this.router.dispatchByMode(this.currentMode);
    }
  }
}
