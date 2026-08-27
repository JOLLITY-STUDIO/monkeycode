"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchActionService = exports.MatchActionType = void 0;
const match_action_table_1 = require("../../data/tables/match-action-table");
/** 比赛动作类型 */
var MatchActionType;
(function (MatchActionType) {
    /** 移动 */
    MatchActionType[MatchActionType["MOVE"] = 0] = "MOVE";
    /** 传球 */
    MatchActionType[MatchActionType["PASS"] = 1] = "PASS";
    /** 射门 */
    MatchActionType[MatchActionType["SHOOT"] = 2] = "SHOOT";
    /** 抢断 */
    MatchActionType[MatchActionType["TACKLE"] = 3] = "TACKLE";
    /** 必杀 */
    MatchActionType[MatchActionType["SPECIAL"] = 4] = "SPECIAL";
})(MatchActionType || (exports.MatchActionType = MatchActionType = {}));
class MatchActionService {
    constructor(store) {
        this.store = store;
    }
    /**
     * 执行比赛动作：查找动作指针 → 执行。
     */
    executeAction(req) {
        const entry = (0, match_action_table_1.findActionById)(req.actionId);
        const ptr = this.findActionPointer(req.actionId);
        return {
            actionId: req.actionId,
            success: ptr !== 0,
            nextActionId: entry?.nextActionId ?? 0,
            posX: 0,
            posY: 0,
        };
    }
    /**
     * 查找动作指针：BANK28_ACTION_POINTER_TABLE 查表。
     * 结果写入 ram_0032/0033（原版间接指针视图）。
     */
    findActionPointer(actionId) {
        const entry = match_action_table_1.BANK28_ACTION_POINTER_TABLE.find(p => p.actionId === actionId);
        if (!entry)
            return 0;
        const lo = entry.lo ?? (entry.target & 0xff);
        const hi = entry.hi ?? ((entry.target >> 8) & 0xff);
        this.store.write('ram_0032', lo);
        this.store.write('ram_0033', hi);
        return (hi << 8) | lo;
    }
    /**
     * 解析动作参数：$23+ 标记 → 坐标运算（ASL×4）。
     */
    parseActionParam() {
        const value = this.store.read('ram_0032');
        const hi = this.store.read('ram_0033');
        if (value >= 0x23) {
            const adj = value - 0x23;
            this.store.write('ram_0032', adj << 2);
            this.store.write('ram_0033', hi);
            return adj << 2;
        }
        return value;
    }
    /**
     * 动作地址计算：BANK28_ACTION_TABLE 查表。
     */
    computeActionAddr(y) {
        const table = match_action_table_1.BANK28_ACTION_TABLE;
        const entry = table[y];
        if (!entry)
            return 0;
        return entry.offset;
    }
    /**
     * 动作类型判定：CPX #$1F → 类型分发。
     */
    resolveActionType(x) {
        if (x >= 0x1F)
            return -1;
        return x;
    }
    /** 导出表供外部访问 */
    get table() { return match_action_table_1.BANK28_ACTION_TABLE; }
    get pointers() { return match_action_table_1.BANK28_ACTION_POINTER_TABLE; }
}
exports.MatchActionService = MatchActionService;
