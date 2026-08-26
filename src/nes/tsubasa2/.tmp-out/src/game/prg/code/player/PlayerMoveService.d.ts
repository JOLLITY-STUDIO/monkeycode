/**
 * PlayerMoveService — 球员移动/AI
 *
 * 行为翻译（去 CPU 化 + 具名视图）：
 * - 计算球员移动：方向标志 → 方向运算 → 更新坐标（用 store.playerMove 视图）
 * - 解析移动序列段：间接读取移动数据
 * - 处理方向标志：directionFlag 位域 → 翻转/方向判定
 * - 查询移动模式：findMoveById → pattern
 */
import type { DataStore } from '../../data/store/DataStore';
/** 球员移动请求 */
export interface PlayerMoveRequest {
    readonly playerIdx: number;
    readonly targetX: number;
    readonly targetY: number;
    readonly speed: number;
    readonly direction: number;
}
/** 球员移动结果 */
export interface PlayerMoveResult {
    readonly newPosX: number;
    readonly newPosY: number;
    readonly newDirection: number;
    readonly arrived: boolean;
}
export declare class PlayerMoveService {
    readonly store: DataStore;
    constructor(store: DataStore);
    /**
     * 计算球员移动：方向标志 → 方向运算 → 更新坐标。
     * playerMove.flipX（directionFlag bit6）控制 X 翻转。
     */
    computeMove(req: PlayerMoveRequest): PlayerMoveResult;
    /** 解析移动序列段：间接读取移动数据 */
    parseMoveSegment(): number;
    /** 处理方向标志：directionFlag 位域 → 翻转判定 */
    processDirection(): boolean;
    /** 查询移动模式：findMoveById → pattern */
    findMovePattern(moveId: number): ReadonlyArray<number>;
    /** 导出表供外部访问 */
    get table(): readonly import("../..").PlayerMoveEntry[];
    get directionTable(): readonly number[];
}
