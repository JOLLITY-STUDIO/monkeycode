/**
 * Bank 02 数据表结构化解析 — Schema 定义
 * 基于 ASM 代码分析，每张表的每个字节都有明确含义
 */
export interface DataField {
    offset: number;
    size: number;
    name: string;
    desc: string;
    decode?: (v: number | number[]) => string;
}
export interface DataTableDef {
    name: string;
    addr: number;
    length: number;
    recordSize: number;
    fields: DataField[];
    note?: string;
}
/** 有符号 8-bit */
export declare const S8: (v: number) => number;
/** unsigned 8-bit */
export declare const U8: (v: number) => number;
/** 16-bit little-endian (lo, hi) */
export declare const U16LE: (lo: number, hi: number) => number;
/** 16-bit signed LE */
export declare const S16LE: (lo: number, hi: number) => number;
export declare const DATA_TABLES: DataTableDef[];
