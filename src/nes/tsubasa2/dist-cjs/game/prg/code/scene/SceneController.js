"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneController = void 0;
class SceneController {
    constructor(store, input) {
        this.store = store;
        this.input = input;
        /** bank00 6-slot timer dispatcher（PRG $9EEF/$9FA8 翻译）；由 Tsubasa2 boot() 注入 */
        this.scheduler = null;
    }
    /**
     * 注入 bank00 scheduler（PRG $9FA8 pushState 翻译）。
     * 由 Tsubasa2 boot() 在 BootRouter 构造之后批量调用；
     * 注入后子类可用 `scheduleAfter(timer, cb)` 替代手写的 `this.counter--` 模式。
     */
    attachScheduler(scheduler) {
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
    scheduleAfter(timer, callback) {
        if (!this.scheduler) {
            // fallback: scheduler 未注入时同步调用，子类自管计数推进
            callback();
            return -1;
        }
        return this.scheduler.pushState({
            aReg: 0,
            xReg: 0,
            yReg: callback.length & 0xff,
            timer: timer & 0xff,
            priority: 0,
            callback: (slot) => {
                void slot;
                callback();
            },
        });
    }
    /** 每帧渲染（写入渲染缓冲/调色板） */
    onRender() {
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
    onSlotTick(_slotIdx, _tickCount) {
        // stub v1: 默认什么都不做, 维持按 onUpdate 每帧推进的旧行为
        // 不改既有 scene 行为, 等 Bank00MainLoopService 接入 boot loop 后再让对应 scene 覆盖
    }
}
exports.SceneController = SceneController;
