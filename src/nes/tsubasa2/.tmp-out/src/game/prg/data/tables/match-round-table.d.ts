/**
 * 比赛回合数据表（声明式表结构）
 *
 * 从 asm 回合/战术数据段提取真实字节，含：
 * - 回合指针表（lo/hi 拆字节：值为原始字节布局）
 * - 回合参数表
 * - 战术数据
 */
/**
 * 回合动作脚本偏移条目
 * target = 回合动作脚本在 BANK24_DATA_TABLES 中的字节偏移（已合并 16-bit LE，禁 lo/hi 拆分）
 */
export interface MatchRoundPointer {
    readonly typeId: number;
    readonly paramId: number;
    readonly target: number;
}
/** 回合表条目 */
export interface MatchRoundEntry {
    readonly roundId: number;
    readonly type: number;
    readonly nextRoundId: number;
    readonly duration: number;
}
/** 全量数据表（data_tables 原始字节） */
export declare const BANK24_DATA_TABLES: ReadonlyArray<number>;
/**
 * 回合指针表（原 bank24 $86B8 区域）
 * 从 data_tables 中提取（偏移 0x6B8-0x800=... 需相对 $8000）
 */
export declare const BANK24_ROUND_POINTER_TABLE: ReadonlyArray<MatchRoundPointer>;
/** 回合参数表（待结构化解析） */
export declare const BANK24_ROUND_TABLE: ReadonlyArray<MatchRoundEntry>;
export declare function findRoundById(roundId: number): MatchRoundEntry | null;
