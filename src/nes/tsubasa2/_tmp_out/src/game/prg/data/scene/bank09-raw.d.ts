/**
 * bank09-raw — bank9 原始字节 (8192B, 运行时 $A000-$BFFF 窗口)
 * @bank 09
 *
 * 来源: 从 ROM 提取 (PRG 偏移 = 16 + 9*0x2000), 与 asm/bank09/data_*.s 对照。
 * 消费方: sub9085 场景数据装载器 / sub9148 续段 (数据流 = $A000+idx*2 指针表指向的区域)。
 * 注意: 偏移 0 起是 16 位 LE 指针表 (scene-loader-tables.ts 已提取), 此处为全量原始字节。
 */
export declare const BANK09_RAW: readonly number[];
