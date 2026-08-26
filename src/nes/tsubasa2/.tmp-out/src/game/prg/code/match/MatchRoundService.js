import { BANK24_ROUND_TABLE, BANK24_ROUND_POINTER_TABLE, findRoundById } from '../../data/tables/match-round-table';
/** 回合类型 */
export var MatchRoundType;
(function (MatchRoundType) {
    MatchRoundType[MatchRoundType["KICKOFF"] = 0] = "KICKOFF";
    MatchRoundType[MatchRoundType["OFFENSE"] = 1] = "OFFENSE";
    MatchRoundType[MatchRoundType["DEFENSE"] = 2] = "DEFENSE";
    MatchRoundType[MatchRoundType["DEAD_BALL"] = 3] = "DEAD_BALL";
})(MatchRoundType || (MatchRoundType = {}));
export class MatchRoundService {
    constructor(store) {
        this.store = store;
    }
    /**
     * 启动比赛回合：初始化回合状态机（活跃/序列/计数器）。
     */
    startRound(req) {
        const entry = findRoundById(req.roundId);
        const round = this.store.matchRound;
        round.active = 1;
        round.sequence = 0;
        round.typeId = req.type & 0xff;
        round.counter = 0;
        round.paramId = 0;
        return {
            roundId: req.roundId,
            active: true,
            nextRoundId: entry?.nextRoundId ?? 0,
        };
    }
    /**
     * 回合状态机更新：活跃 → 计数器递减 → 0 时装载下一段。
     */
    updateRound() {
        const round = this.store.matchRound;
        if (round.active === 0)
            return false;
        if (round.counter > 0) {
            round.counter = (round.counter - 1) & 0xff;
            return true;
        }
        round.sequence = (round.sequence + 1) & 0xff;
        return true;
    }
    /**
     * 解析回合段：从指针读取回合数据，$F0+ 扩展标记 → 标记分发。
     */
    parseRoundSegment() {
        const round = this.store.matchRound;
        const y = round.segmentCursor;
        const ptr = this.store.readByte(0x005f);
        const value = this.store.readByte((ptr + y) & 0xff);
        if (value >= 0xF0) {
            return value & 0x0F;
        }
        round.counter = value;
        return value;
    }
    /** 回合标记解析：AND #$0F */
    resolveRoundFlag(flag) {
        return flag & 0x0F;
    }
    /** 查询回合参数：BANK24_ROUND_POINTER_TABLE 查表 */
    findRoundParam(typeId) {
        const table = BANK24_ROUND_POINTER_TABLE;
        const entry = table.find(t => t.typeId === typeId);
        return entry ? entry.paramId : 0;
    }
    /** 导出表供外部访问 */
    get table() { return BANK24_ROUND_TABLE; }
}
