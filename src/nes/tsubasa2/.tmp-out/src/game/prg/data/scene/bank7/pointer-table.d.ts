/**
 * bank07 CHR 指针表（CPU $A000，106 项 × 16-bit 指针 = 212 字节）
 *
 * 数据源：bank07 偏移 0x0000-0x00D3
 * 消费方：RenderingPrimitivesService.loadChrConfig（取 ptr→读取 6 字节 CHR 配置）
 */
export declare const BANK7_CHR_POINTERS: ReadonlyArray<number>;
