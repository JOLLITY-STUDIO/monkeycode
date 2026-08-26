/**
 * 比赛动作数据表（声明式表结构）
 *
 * 从 asm 动作/指令数据段提取真实字节，含：
 * - 动作指针表（lo/hi 拆字节：值为原始字节布局）
 * - 动作参数表
 * - 动作类型表
 */
/**
 * 动作脚本偏移条目（lo/hi 拆字节时使用）
 * target = (hi << 8) | lo，等价 16-bit LE
 */
export interface MatchActionPointer {
    readonly actionId: number;
    readonly lo: number;
    readonly hi: number;
    readonly target: number;
}
/** 动作表条目 */
export interface MatchActionEntry {
    readonly actionId: number;
    readonly type: number;
    readonly nextActionId: number;
    readonly offset: number;
}
/** 全量数据表（data_tables 原始字节） */
export declare const BANK28_DATA_TABLES: ReadonlyArray<number>;
/**
 * 动作指针表（原 bank28 $9E4E 区域）
 * 从 data_tables 中提取（偏移 0x9E4E-0x8000=0x1E4E）
 */
export declare const BANK28_ACTION_POINTER_TABLE: ReadonlyArray<MatchActionPointer>;
/** 动作参数表（待结构化解析） */
export declare const BANK28_ACTION_TABLE: ReadonlyArray<MatchActionEntry>;
export declare function findActionById(actionId: number): MatchActionEntry | null;
