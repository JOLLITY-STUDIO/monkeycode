/** 回合类型（asm $003B bit 意义，区分进攻/防守） */
export var MatchTurnType;
(function (MatchTurnType) {
    MatchTurnType[MatchTurnType["Attack"] = 0] = "Attack";
    MatchTurnType[MatchTurnType["Defense"] = 1] = "Defense";
    MatchTurnType[MatchTurnType["DeadBall"] = 2] = "DeadBall";
    MatchTurnType[MatchTurnType["Corner"] = 3] = "Corner";
    MatchTurnType[MatchTurnType["GoalKick"] = 4] = "GoalKick";
    MatchTurnType[MatchTurnType["ThrowIn"] = 5] = "ThrowIn";
    MatchTurnType[MatchTurnType["FreeKick"] = 6] = "FreeKick";
    MatchTurnType[MatchTurnType["Penalty"] = 7] = "Penalty";
})(MatchTurnType || (MatchTurnType = {}));
export class MatchTurnService {
    constructor(store) {
        this.store = store;
    }
    /**
     * 推进一个回合（传球/带球/射门/铲球，V0.5 实现）
     *
     * 对应 asm $8000-$800A 三路跳转表，主调用方（MatchEngineService）按当前
     * 控球方 / 比赛阶段分派到不同入口：
     *   - 球权方 0..3 → $8083（常规回合决策）
     *   - 球权方 = 守门员方 → $84A1（守门员回合）
     *   - 死球 → $814C（死球回合）
     *
     * 当前 stub：保留调用契约 + 说明 bank11 引用，行为由 MatchEngineService
     * update() 在每帧调用。
     */
    advanceTurn() {
        // TODO V0.5: 翻译回合主循环（bank11/code_main.s $8000-$800A 跳转表）
        // 关键依赖：
        //   - 球员遍历推进（MatchEngineService.update 已经做了）
        //   - 回合类型判定（control + flags）
        //   - 回合结果触发动画（MatchEventService.startEvent）
        //   - 回合结果影响比赛状态（MatchAuxService.handleDeadBall）
        void this.store;
    }
    /**
     * 当前回合类型查询（读 ram_003B bit 模式）。
     */
    getCurrentTurnType() {
        const v = this.store.readByte(0x003b) & 0xff;
        if (v < 0 || v > 7)
            return MatchTurnType.DeadBall;
        return v;
    }
    /**
     * 回合计数查询（ram_05D4/ram_05D8）：用于检测重复回合/死循环。
     */
    getTurnMarker() {
        const cur = this.store.readByte(0x05d4) & 0xff;
        const last = this.store.readByte(0x05d8) & 0xff;
        return (cur << 8) | last;
    }
}
