/**
 * MatchRoundService — 比赛回合/战术
 *
 * 行为翻译（去 CPU 化 + 具名视图）：
 * - 启动回合：初始化回合状态机（活跃/序列/计数器/类型）→ 用 store.matchRound 视图
 * - 回合状态机更新：活跃 → 计数器递减 → 0 时装载下一段
 * - 解析回合段：从指针读取回合数据，$F0+ 扩展标记 → 标记分发
 * - 回合标记解析：AND #$0F → 标记分发
 * - 查询回合参数：BANK24_ROUND_POINTER_TABLE 查表
 */
import type { DataStore } from '../../data/store/DataStore';
/** 回合类型 */
export declare enum MatchRoundType {
    KICKOFF = 0,
    OFFENSE = 1,
    DEFENSE = 2,
    DEAD_BALL = 3
}
/** 回合请求 */
export interface MatchRoundRequest {
    readonly type: MatchRoundType;
    readonly roundId: number;
}
/** 回合结果 */
export interface MatchRoundResult {
    readonly roundId: number;
    readonly active: boolean;
    readonly nextRoundId: number;
}
export declare class MatchRoundService {
    readonly store: DataStore;
    constructor(store: DataStore);
    /**
     * 启动比赛回合：初始化回合状态机（活跃/序列/计数器）。
     */
    startRound(req: MatchRoundRequest): MatchRoundResult;
    /**
     * 回合状态机更新：活跃 → 计数器递减 → 0 时装载下一段。
     */
    updateRound(): boolean;
    /**
     * 解析回合段：从指针读取回合数据，$F0+ 扩展标记 → 标记分发。
     */
    parseRoundSegment(): number | null;
    /** 回合标记解析：AND #$0F */
    resolveRoundFlag(flag: number): number;
    /** 查询回合参数：BANK24_ROUND_POINTER_TABLE 查表 */
    findRoundParam(typeId: number): number;
    /** 导出表供外部访问 */
    get table(): readonly import("../..").MatchRoundEntry[];
}
