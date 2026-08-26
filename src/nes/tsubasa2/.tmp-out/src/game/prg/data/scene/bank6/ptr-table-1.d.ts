/**
 * bank06 二级指针表 #1（CPU $B800 附近，131 字节）
 *
 * 数据源：bank06 偏移 0x1800-0x1882
 * 头 6 字节：0x2A 0xB8 0x38 0xB8 0x4A 0xB8
 * 后续 16-bit 指针 62 项（读取自偏移 6 处）。
 * 消费方：Scene0Controller loadSequence
 */
export declare const BANK6_PTR_TABLE_1: ReadonlyArray<number>;
export declare const BANK6_PTR_TABLE_1_HEADER: ReadonlyArray<number>;
export declare const BANK6_PTR_TABLE_1_RAW: ReadonlyArray<number>;
