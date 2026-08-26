/**
 * 比赛事件数据表（声明式表结构）
 *
 * 从 asm 事件数据段提取真实字节，含：
 * - 事件指针表（lo/hi 拆字节：值为原始字节布局）
 * - 事件参数表
 * - 动作序列
 */
/**
 * 事件动作脚本偏移条目（lo/hi 拆字节时使用）
 * target = (hi << 8) | lo，等价 16-bit LE
 */
export interface MatchEventPointer {
    readonly eventId: number;
    readonly lo: number;
    readonly hi: number;
    readonly target: number;
}
/** 事件表条目 */
export interface MatchEventEntry {
    readonly eventId: number;
    readonly type: number;
    readonly nextEventId: number;
    readonly duration: number;
}
/** 全量数据表（data_tables 原始字节） */
export declare const BANK20_DATA_TABLES: ReadonlyArray<number>;
/**
 * 事件指针表（原 bank20 $88E4 区域）
 * 从 data_tables 中提取（偏移 0x8E4-0x800=0xE4）
 */
export declare const BANK20_EVENT_POINTER_TABLE: ReadonlyArray<MatchEventPointer>;
/** 事件参数表（待结构化解析） */
export declare const BANK20_EVENT_TABLE: ReadonlyArray<MatchEventEntry>;
export declare function findEventById(eventId: number): MatchEventEntry | null;
