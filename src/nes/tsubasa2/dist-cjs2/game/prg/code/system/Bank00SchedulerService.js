"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bank00SchedulerService = void 0;
/**
 * 6-slot timer dispatcher
 *
 * 对应 PRG $9EEF-$9F7F（bank0 scheduler tail）+ $9FA8（push trampoline）。
 * ROM 在 bank14 NMI handler 期间调 bank0 这部分，每帧 tick 一次。
 *
 * H5 用法：
 *   scheduler.pushState({ aReg: 0, xReg: 1, yReg: 2, callback: sceneX.onEnter })
 *     → 自动 run state-push → 进入 scheduler tail → 等 timer→0 → 自动 dispatchTail
 */
class Bank00SchedulerService {
    constructor(store) {
        this.store = store;
        /** 6 个固定 slot（ROM $0000-$0019 区间语义布局：每个 slot 占 4 字节） */
        this.slots = [
            { id: 0, timer: 0, priority: 0, callback: null, workPtrs9: new Uint8Array(9), aReg: 0, xReg: 0, yReg: 0, bankR2: 0, bankR3: 0, state: 'IDLE' },
            { id: 1, timer: 0, priority: 1, callback: null, workPtrs9: new Uint8Array(9), aReg: 0, xReg: 0, yReg: 0, bankR2: 0, bankR3: 0, state: 'IDLE' },
            { id: 2, timer: 0, priority: 2, callback: null, workPtrs9: new Uint8Array(9), aReg: 0, xReg: 0, yReg: 0, bankR2: 0, bankR3: 0, state: 'IDLE' },
            { id: 3, timer: 0, priority: 3, callback: null, workPtrs9: new Uint8Array(9), aReg: 0, xReg: 0, yReg: 0, bankR2: 0, bankR3: 0, state: 'IDLE' },
            { id: 4, timer: 0, priority: 4, callback: null, workPtrs9: new Uint8Array(9), aReg: 0, xReg: 0, yReg: 0, bankR2: 0, bankR3: 0, state: 'IDLE' },
            { id: 5, timer: 0, priority: 5, callback: null, workPtrs9: new Uint8Array(9), aReg: 0, xReg: 0, yReg: 0, bankR2: 0, bankR3: 0, state: 'IDLE' },
        ];
    }
    // ──────────────────────── $9FA8 state push trampoline ────────────────────────
    /**
     * 入队新调度任务（PRG $9FA8 翻译）。
     *
     * ROM 行为：
     *   1. 保存 A/X/Y + 9 字节 $E6-$ED → $0100 stack
     *   2. 保存当前 SP + R2 ($24) + R3 ($25)
     *   3. Mark slot as $00 (ready) / $FE (wait) / $FF (init)
     *   4. JMP $9EFB (scheduler tail)
     *
     * H5 语义：直接 allocSlot + 设置 callback + timer。
     *
     * @param req 任务请求
     * @returns 分配的 slot id（0-5），失败返回 -1
     */
    pushState(req) {
        const slot = this.allocateSlot(req.priority ?? 0);
        if (!slot)
            return -1;
        slot.aReg = req.aReg & 0xff;
        slot.xReg = req.xReg & 0xff;
        slot.yReg = req.yReg & 0xff;
        slot.bankR2 = req.bankR2 ?? 0;
        slot.bankR3 = req.bankR3 ?? 0;
        if (req.workPtrs9) {
            for (let i = 0; i < 9; i++)
                slot.workPtrs9[i] = req.workPtrs9[i] ?? 0;
        }
        slot.timer = req.timer & 0xff;
        slot.callback = req.callback;
        // ROM: $FE = wait (timer > 0); $00 = ready (timer == 0)
        slot.state = slot.timer === 0 ? 'READY' : 'WAIT';
        // 同步到 store（$0019 = dispatch flag）
        this.store.writeByte(0x0019, slot.timer === 0 ? 0x00 : 0xfe);
        return slot.id;
    }
    // ──────────────────────── $9EEF scheduler tail ────────────────────────
    /**
     * 每帧 tick 调度（PRG $9EEF-$9F10 翻译）。
     *
     * ROM 行为：iterate 6 slots，DEC timer 当 timer→0 即 dispatch。
     * H5 用法：每帧调一次（建议在 InterruptService.nmi() 末尾），
     *          自动 dispatch 所有 timer==0 的 slot callback。
     */
    tickDispatch() {
        const dispatched = [];
        for (const slot of this.slots) {
            if (slot.state === 'IDLE' || slot.state === 'DONE')
                continue;
            if (slot.timer > 0) {
                slot.timer = (slot.timer - 1) & 0xff;
                if (slot.timer === 0)
                    slot.state = 'READY';
            }
            if (slot.state === 'READY' && slot.callback) {
                // 标记 RUNNING 防重入
                slot.state = 'RUNNING';
                const cb = slot.callback;
                slot.callback = null; // 一次性消费
                try {
                    cb(slot);
                }
                finally {
                    slot.state = 'DONE';
                    dispatched.push(slot);
                }
            }
        }
        // 一帧结束清 $001B bit 7（ROM 中 $9F06 LDA $001B / BPL $9F04 → AND $7F STA $001B / JMP $9EED）
        const b001B = this.store.readByte(0x001b);
        if ((b001B & 0x80) !== 0) {
            this.store.writeByte(0x001b, b001B & 0x7f);
        }
        return dispatched;
    }
    // ──────────────────────── $9F69 slot allocate ────────────────────────
    /**
     * 分配空闲 slot（PRG $9F69 翻译）。
     * 优先复用 state=DONE 的 slot；找不到则失败。
     */
    allocateSlot(priority) {
        // 1. 优先找 IDLE/DONE
        for (const slot of this.slots) {
            if (slot.state === 'IDLE' || slot.state === 'DONE') {
                slot.priority = priority;
                slot.state = 'IDLE'; // 待 pushState 设置为 WAIT/READY
                return slot;
            }
        }
        // 2. 找优先级最低（数字最大）的 RUNNING slot 抢占
        let victim = this.slots[0];
        for (const slot of this.slots) {
            if (slot.priority > victim.priority)
                victim = slot;
        }
        victim.callback = null;
        victim.state = 'IDLE';
        victim.priority = priority;
        return victim;
    }
    // ──────────────────────── $9F7E clear slot ────────────────────────
    /** 清空指定 slot（PRG $9F7E 翻译） */
    clearSlot(id) {
        const slot = this.slots.find((s) => s.id === id);
        if (!slot)
            return;
        slot.state = 'IDLE';
        slot.timer = 0;
        slot.callback = null;
        slot.aReg = 0;
        slot.xReg = 0;
        slot.yReg = 0;
        slot.priority = 0;
        slot.workPtrs9.fill(0);
    }
    /** 清空全部 slots（reset() 调用） */
    clearAll() {
        for (const slot of this.slots) {
            this.clearSlot(slot.id);
        }
    }
    // ──────────────────────── Debug 视图 ────────────────────────
    /** 获取只读 slot 快照（调试） */
    snapshot() {
        return this.slots.map((s) => ({ ...s, workPtrs9: new Uint8Array(s.workPtrs9) }));
    }
    /** 当前活跃 slot 数量 */
    activeCount() {
        return this.slots.filter((s) => s.state !== 'IDLE' && s.state !== 'DONE').length;
    }
}
exports.Bank00SchedulerService = Bank00SchedulerService;
