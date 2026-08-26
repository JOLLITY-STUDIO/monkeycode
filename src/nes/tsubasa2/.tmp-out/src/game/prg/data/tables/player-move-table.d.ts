/**
 * 球员移动数据表（声明式表结构）
 *
 * 从 asm 移动/AI 数据段提取真实字节，含：
 * - 移动指针表
 * - 方向表
 * - 移动模式
 */
/** 移动表条目 */
export interface PlayerMoveEntry {
    readonly moveId: number;
    readonly pattern: ReadonlyArray<number>;
    readonly speed: number;
    readonly duration: number;
}
/** 移动指针表（data_tables 原始字节） */
export declare const BANK22_MOVE_TABLE: ReadonlyArray<PlayerMoveEntry>;
/** 全量数据表（data_tables 原始字节） */
export declare const BANK22_DATA_TABLES: ReadonlyArray<number>;
/** bank22 data_tail（方向表数据） */
export declare const BANK22_DATA_TAIL: ReadonlyArray<number>;
/** 方向表（从 data_tail 提取） */
export declare const BANK22_DIRECTION_TABLE: ReadonlyArray<number>;
export declare function findMoveById(moveId: number): PlayerMoveEntry | null;
