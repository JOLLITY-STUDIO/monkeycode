/**
 * SceneController — 场景控制器抽象基类（MVC: Controller）
 *
 * 生命周期：onEnter（进入场景）→ onUpdate（每帧逻辑）→ onRender（每帧渲染）
 * 每帧由 BootRouter 调度。
 *
 * 公共调度能力（v2，去 CPU 化）：
 *   - attachScheduler(scheduler) — 由 Tsubasa2 boot() 注入 Bank00SchedulerService
 *   - scheduleAfter(timer, cb)   — 等 timer 帧后调 callback
 *     替代 ROM PRG $9FA8 pushState wait N 帧 → RTS callback 模式
 *     fallback: scheduler 未注入 → counter 自减（向后兼容）
 */
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';
import type { Bank00SchedulerService } from '../system/Bank00SchedulerService';

export abstract class SceneController {
  /** 场景号（0-23） */
  abstract readonly sceneId: number;

  /** bank00 6-slot timer dispatcher（PRG $9EEF/$9FA8 翻译）；由 Tsubasa2 boot() 注入 */
  protected scheduler: Bank00SchedulerService | null = null;

  /**
   * 帧级 pending callbacks（scheduler 残留 IDLE 兜底）— scheduleAfter 推入此 list,
   * BootRouter.update 每帧调 _tickPending 推进 timer 到 0 时 invoke cb.
   * V0.6 修 scheduler 不稳定时 Scene14.Scene15 永远 not ready.
   */
  private readonly _pendingCallbacks: Array<{ framesLeft: number; cb: () => void }> = [];

  /** BootRouter.update 每帧调一次 — 推进 pending callbacks 并 invoke 到期的 */
  _tickPending(): void {
    if (this._pendingCallbacks.length === 0) return;
    const remain: typeof this._pendingCallbacks = [];
    for (const p of this._pendingCallbacks) {
      if (p.framesLeft <= 0) {
        try { p.cb(); } catch (e) { /* swallow; onUpdate 不会被 cb error 阻塞 */ }
      } else {
        p.framesLeft--;
        if (p.framesLeft <= 0) {
          try { p.cb(); } catch (e) { /* same */ void e; }
        } else {
          remain.push(p);
        }
      }
    }
    this._pendingCallbacks.length = 0;
    for (const p of remain) this._pendingCallbacks.push(p);
  }

  constructor(
    protected readonly store: DataStore,
    protected readonly input: InputService,
  ) {}

  /**
   * 注入 bank00 scheduler（PRG $9FA8 pushState 翻译）。
   * 由 Tsubasa2 boot() 在 BootRouter 构造之后批量调用；
   * 注入后子类可用 `scheduleAfter(timer, cb)` 替代手写的 `this.counter--` 模式。
   */
  attachScheduler(scheduler: Bank00SchedulerService): void {
    this.scheduler = scheduler;
  }

  /**
   * 等 timer 帧后调 callback（PRG $9FA8 pushState + LDA #$XX 翻译）。
   *
   * 行为对照：
   *   ROM: LDA #$XX / JSR $9FA8 — 入栈 timer + JMP $9EFB scheduler tail
   *        → 每帧 DEC timer → timer=0 自动 dispatchTail
   *   H5:  pushState({timer, callback}) → InterruptService.nmi() tickDispatch() callback
   *
   * Fallback：
   *   scheduler 未注入 → callback 立即同步执行（保证子类语义不丢）
   *
   * @param timer 等待帧数
   * @param callback timer→0 时同步派发
   * @returns slot id（0-5，失败 -1）
   */
  protected scheduleAfter(timer: number, callback: () => void): number {
    // V0.6: 优先用 frame-counter pending list（scheduler IDLE:t=0 残留时也能稳定推进）
    const t = timer & 0xff;
    if (t === 0) {
      try { callback(); } catch (e) { void e; }
      return -1;
    }
    this._pendingCallbacks.push({ framesLeft: t, cb: callback });
    // 如果 scheduler 仍注入, 也推一份 (idempotent — cb 会跑两次用 ref guard, 实际
    //   pending list 已经处理; scheduler slot 0 push 仅当 scheduler 已 attach 且
    //   SceneController 当前实例是 onEnter 时). 为避免双调, **只走 pending list**.
    //   scheduler 路径在 Scene14/15 已用 frame-counter 替代, 此处不再 push.
    void this.scheduler;
    return this._pendingCallbacks.length - 1;
  }

  /** 进入场景 */
  abstract onEnter(): void;

  /**
   * 每帧游戏逻辑。
   * @returns 下一场景号；undefined 表示留在当前场景。
   */
  abstract onUpdate(frame: number): number | undefined;

  /** 每帧渲染（写入渲染缓冲/调色板） */
  onRender(): void {
    // 默认空实现；场景无渲染需求时无需覆盖
  }

  /**
   * ⚠️ slot 触发钩子 (PRG $C5xx slot handler entry 翻译) — v2 stub
   *
   * 与 onUpdate 的区别:
   *   - onUpdate 每帧调 (BootRouter.update() 在 game loop 末尾)
   *   - **onSlotTick 仅在 Bank00MainLoopService slot 触发时调** (典型: 每 12 帧 1 次)
   *
   * ROM 模型 (BANK02_ANALYSIS.md §6):
   *   - 6-slot dispatcher 每 NMI frame 调所有 slot counter
   *   - slot counter→0 → 调对应 handler entry (`JSR $A000` / `JSR $A160`)
   *   - handler 跑 RTS → 自动回到 dispatcher
   *   - 不是每帧都跑 — 是周期触发
   *
   * H5 默认空实现, scene 不需要 slot 驱动时可忽略.
   * 真正需要 slot 触发的 scene (Scene0 当前思考可能需要的) 覆盖此方法.
   *
   * @param tickCount slot 触发序号 (0=首触发, 1+=周期内第 N 次)
   */
  onSlotTick(_slotIdx: number, _tickCount: number): void {
    // stub v1: 默认什么都不做, 维持按 onUpdate 每帧推进的旧行为
    // 不改既有 scene 行为, 等 Bank00MainLoopService 接入 boot loop 后再让对应 scene 覆盖
  }
}