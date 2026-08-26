/**
 * MatchActionService — 比赛动作/指令
 *
 * 行为翻译（去 CPU 化）：
 * - 执行动作：查找动作指针 → 执行
 * - 查找动作指针：BANK28_ACTION_POINTER_TABLE 查表
 * - 解析动作参数：$23+ 标记 → 坐标运算（ASL×4）
 * - 动作地址计算：BANK28_ACTION_TABLE 查表
 * - 动作类型判定：CPX #$1F → 类型分发
 *
 * bank 切换 = import MatchActionService + 直接调用，无 MMC3 窗口模拟。
 */
import type { DataStore } from '../../data/store/DataStore';
/** 比赛动作类型 */
export declare enum MatchActionType {
    /** 移动 */
    MOVE = 0,
    /** 传球 */
    PASS = 1,
    /** 射门 */
    SHOOT = 2,
    /** 抢断 */
    TACKLE = 3,
    /** 必杀 */
    SPECIAL = 4
}
/** 动作请求 */
export interface MatchActionRequest {
    readonly type: MatchActionType;
    readonly actionId: number;
    readonly playerIdx: number;
}
/** 动作结果 */
export interface MatchActionResult {
    readonly actionId: number;
    readonly success: boolean;
    readonly nextActionId: number;
    readonly posX: number;
    readonly posY: number;
}
export declare class MatchActionService {
    readonly store: DataStore;
    constructor(store: DataStore);
    /**
     * 执行比赛动作：查找动作指针 → 执行。
     */
    executeAction(req: MatchActionRequest): MatchActionResult;
    /**
     * 查找动作指针：BANK28_ACTION_POINTER_TABLE 查表。
     * 结果写入 ram_0032/0033（原版间接指针视图）。
     */
    findActionPointer(actionId: number): number;
    /**
     * 解析动作参数：$23+ 标记 → 坐标运算（ASL×4）。
     */
    parseActionParam(): number;
    /**
     * 动作地址计算：BANK28_ACTION_TABLE 查表。
     */
    computeActionAddr(y: number): number;
    /**
     * 动作类型判定：CPX #$1F → 类型分发。
     */
    resolveActionType(x: number): number;
    /** 导出表供外部访问 */
    get table(): readonly import("../..").MatchActionEntry[];
    get pointers(): readonly import("../..").MatchActionPointer[];
}
