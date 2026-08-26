/**
 * Bank00MainLoopService — PRG $C500 6-slot recurring timer dispatcher 翻译
 *
 * ⚠️ 与 Bank00SchedulerService 严格区别 (避免混淆):
 *   - Bank00SchedulerService → bank0 $9EEF-$9FA8 one-shot 倒数 (callback 触发后消费)
 *     用于 Scene0 phase 内 "LDA #$10 / JSR $9FA8" 等 N 帧后调一次的等待
 *   - **Bank00MainLoopService (本类) → bank14 $C500 6-slot recurring 周期触发**
 *     用于 dispatcher 每 NMI frame tick 全部 slot，到 0 → 调 callback + counter=period 重置
 *
 * ROM 行为 (docs/BANK02_ANALYSIS.md §1.2 §6):
 *   - 6 slot × (period, counter, callback)
 *   - 每 NMI frame 调 tickDispatch() 一次
 *   - 每个 slot counter 自减 → 0 → 调 callback + 计数器重置为 period
 *   - **首触发延迟 initialDelay**: slot 注册时 counter=initialDelay, 之后按 period 循环
 *
 * Bank02_ANALYSIS.md v4 trace 实证:
 *   - slot 0 period=12: Scene0 main handler `JSR $A000`, 138 次触发 (f270 起)
 *   - slot 1 不规则 period:  `JSR $A160` slot handler 2, 71 次触发 (f285 起)
 *   - 其他 slot: scene1-23 各 handler
 *
 * H5 用法 (stub v1):
 *   mainLoop.registerSlot(0, 270, 12, () => scene0.onSlotTick());
 *   // slot 0 首次触发 frame 270, 之后每 12 帧
 *
 *   mainLoop.start();                          // boot init 完调
 *   // 每 NMI frame 末尾: mainLoop.tickDispatch();
 *
 * @对应 PRG 段: bank14 $C500-$C5xx 6-slot dispatcher + bank02 Scene0/$A160 handler
 * @v1 stub: 保留 6 slot 框架, registerSlot/registerSlotOnce/start/tickDispatch API,
 *           不绑定具体 slot 配置 (调用方负责 register)
 */
import type { DataStore } from '../../data/store/DataStore';

/**
 * slot 触发回调签名 — H5 替代 ROM 的 `JSR $A000` / `JSR $A160` 入口
 * @param slotIdx 触发的 slot 编号 (0..5)
 * @param tickCount 触发序号 (0=首触发, 1+=周期内触发), 用于观察触发频率
 */
export type SlotCallback = (slotIdx: number, tickCount: number) => void;

interface SlotConfig {
  idx: number;
  initialDelay: number;
  period: number;
  counter: number;
  callback: SlotCallback | null;
  tickCount: number;
  state: 'IDLE' | 'WAIT' | 'READY';
}

/**
 * Bank00MainLoopService — 6-slot recurring timer dispatcher (PRG $C500 翻译)
 */
export class Bank00MainLoopService {
  /** 6 个 slot (PRG $0000-$0019 slot 区语义布局翻译) */
  private readonly slots: SlotConfig[] = [
    { idx: 0, initialDelay: 0, period: 0, counter: 0, callback: null, tickCount: 0, state: 'IDLE' },
    { idx: 1, initialDelay: 0, period: 0, counter: 0, callback: null, tickCount: 0, state: 'IDLE' },
    { idx: 2, initialDelay: 0, period: 0, counter: 0, callback: null, tickCount: 0, state: 'IDLE' },
    { idx: 3, initialDelay: 0, period: 0, counter: 0, callback: null, tickCount: 0, state: 'IDLE' },
    { idx: 4, initialDelay: 0, period: 0, counter: 0, callback: null, tickCount: 0, state: 'IDLE' },
    { idx: 5, initialDelay: 0, period: 0, counter: 0, callback: null, tickCount: 0, state: 'IDLE' },
  ];

  /** boot 完成标志 — start() 之前 tickDispatch() 不触发任何 callback */
  private booted = false;

  constructor(readonly store: DataStore) {}

  /**
   * 注册 slot 配置 (PRG $C5xx slot init 翻译)
   *
   * @param slotIdx  slot 编号 (0..5)
   * @param initialDelay  首次触发前的等待帧数 (0 = 下一帧就触发)
   * @param period  周期帧数 (再次触发的间隔)
   * @param callback  触发回调
   *
   * @example
   *   mainLoop.registerSlot(0, 270, 12, (slot, tick) => scene0.onSlotTick());
   *   // slot 0: 首次触发 frame 270 (counter=270 自减到 0), 之后每 12 帧
   */
  registerSlot(slotIdx: number, initialDelay: number, period: number, callback: SlotCallback): void {
    if (slotIdx < 0 || slotIdx >= 6) return;
    const slot = this.slots[slotIdx];
    slot.initialDelay = initialDelay & 0xff;
    slot.period = period & 0xff;
    slot.counter = initialDelay & 0xff;
    slot.callback = callback;
    slot.tickCount = 0;
    slot.state = slot.counter === 0 ? 'READY' : 'WAIT';
  }

  /**
   * 启动 main loop (boot init 完成后调用)
   */
  start(): void {
    this.booted = true;
  }

  /**
   * 暂停 main loop (boot init 未完成或 debug pause 时调)
   */
  pause(): void {
    this.booted = false;
  }

  /**
   * 是否已启动
   */
  isRunning(): boolean {
    return this.booted;
  }

  /**
   * 每 NMI frame 调一次 (在 InterruptService.nmi() 末尾, 或 gameLoop.update() 末尾)
   *
   * 行为:
   *   - 若!booted → 跳过 (boot init 期间不触发)
   *   - 6 slot 全 tick: counter-- → 到 0 调 callback + counter 重置为 period
   *   - callback 异常不影响其它 slot 推进
   */
  tickDispatch(): void {
    if (!this.booted) return;
    for (const slot of this.slots) {
      if (slot.state === 'IDLE' || !slot.callback) continue;
      if (slot.counter === 0) {
        // 触发
        slot.state = 'READY';
        slot.tickCount++;
        try {
          slot.callback(slot.idx, slot.tickCount - 1);
        } catch (e) {
          // swallow, 不影响其它 slot
          // eslint-disable-next-line no-console
          console.error(`[Bank00MainLoop] slot ${slot.idx} callback error:`, e);
        }
        // 重置 counter
        slot.counter = slot.period === 0 ? 1 : slot.period;
      } else {
        slot.counter = (slot.counter - 1) & 0xff;
      }
    }
  }

  /** 调试快照 */
  snapshot(): ReadonlyArray<SlotConfig> {
    return this.slots.map(s => ({ ...s }));
  }

  /** 当前已激活 slot 数 (state != IDLE) */
  activeCount(): number {
    return this.slots.filter(s => s.state !== 'IDLE').length;
  }
}
