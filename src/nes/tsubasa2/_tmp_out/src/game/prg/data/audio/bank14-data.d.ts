/**
 * bank14 — 纯数据 bank (BGM 乐谱)
 * @bank 14 ($8000-$9FFF, MMC3 R6/R7 可切)
 *
 * 从 asm/bank14/{data_tables,data_maps,data_tail}.s 的 .byte 段提取。
 * 共 8192 字节, 含 BGM 乐谱 + 音色表 + 指针表。
 *
 * 消费方: bank00 协程调度器 ($9F0F) 间接切换。
 *   调度器从 $0002+X (R6 bank号) / $0003+X (R7 bank号) 表读取,
 *   运行时动态设值, 非汇编固定常量。
 * 数据含 $E2/$E3/$E0/$E5/$EB/$F4 等音频操作码, 确认是 BGM 乐谱。
 */
/**
 * bank14 原始字节流 (BGM 乐谱数据)。
 * 按 asm 顺序排列, 对应 CPU $8000+ 偏移。
 */
export declare const BANK14_DATA: readonly number[];
export default BANK14_DATA;
