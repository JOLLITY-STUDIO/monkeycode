/**
 * bank21 — 纯数据 bank
 * @bank 21 ($8000-$9FFF, MMC3 R6/R7 可切)
 *
 * 从 asm/bank21/{data_tables,data_maps,data_tail}.s 的 .byte 段提取。
 * 共 8192 字节。
 *
 * 消费方: bank00 协程调度器 ($9F0F) 间接切换。
 *   调度器从 $0002+X (R6 bank号) / $0003+X (R7 bank号) 表读取,
 *   运行时动态设值, 非汇编固定常量, 无法静态搜索。
 * 数据含 $F0/$F1/$F4/$F5/$F6/$FB 等音频操作码, 可能是 BGM 乐谱 (待确认)。
 */
export declare const BANK21_DATA: readonly number[];
export default BANK21_DATA;
