/**
 * 球员名字数据表（声明式表结构）
 *
 * 从 asm 名字/文本数据段提取真实字节，含：
 * - 文本编码数据
 * - 文本解析器索引表
 * - 名字段装载表
 */
/** 名字表条目 */
export interface PlayerNameEntry {
    readonly playerId: number;
    readonly name: string;
    readonly shortName: string;
    readonly teamId: number;
}
/** 文本编码数据（data_tables 原始字节） */
export declare const BANK27_TEXT_DATA: ReadonlyArray<number>;
/** bank27 data_tail（名字编码数据） */
export declare const BANK27_NAME_DATA: ReadonlyArray<number>;
/** 球员名字表（待结构化解码） */
export declare const BANK27_NAME_TABLE: ReadonlyArray<PlayerNameEntry>;
/** 文本段表（待结构化分段） */
export declare const BANK27_TEXT_TABLE: ReadonlyArray<string>;
/** 字符映射表（原 bank27 $A1DC 索引表） */
export declare const BANK27_CHAR_MAP: ReadonlyArray<number>;
/** 名字地址表（原 bank27 $A6AE 表） */
export declare const BANK27_NAME_ADDR_TABLE: ReadonlyArray<{
    readonly lo: number;
    readonly hi: number;
}>;
export declare function findNameByPlayerId(playerId: number): PlayerNameEntry | null;
