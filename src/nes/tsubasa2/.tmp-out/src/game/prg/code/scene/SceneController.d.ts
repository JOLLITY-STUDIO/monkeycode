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
export declare abstract class SceneController {
    protected readonly store: DataStore;
    protected readonly input: InputService;
    /** 场景号（0-23） */
    abstract readonly sceneId: number;
    /** bank00 6-slot timer dispatcher（PRG $9EEF/$9FA8 翻译）；由 Tsubasa2 boot() 注入 */
    protected scheduler: Bank00SchedulerService | null;
    constructor(store: DataStore, input: InputService);
    /**
     * 注入 bank00 scheduler（PRG $9FA8 pushState 翻译）。
     * 由 Tsubasa2 boot() 在 BootRouter 构造之后批量调用；
     * 注入后子类可用 `scheduleAfter(timer, cb)` 替代手写的 `this.counter--` 模式。
     */
    attachScheduler(scheduler: Bank00SchedulerService): void;
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
    protected scheduleAfter(timer: number, callback: () => void): number;
    /** 进入场景 */
    abstract onEnter(): void;
    /**
     * 每帧游戏逻辑。
     * @returns 下一场景号；undefined 表示留在当前场景。
     */
    abstract onUpdate(frame: number): number | undefined;
    /** 每帧渲染（写入渲染缓冲/调色板） */
    onRender(): void;
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
    onSlotTick(_slotIdx: number, _tickCount: number): void;
}
