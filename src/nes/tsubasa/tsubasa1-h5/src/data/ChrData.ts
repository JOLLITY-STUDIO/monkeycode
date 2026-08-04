/**
 * ChrData - CHR 图形数据常量
 *
 * v1.1.0: CHR 二进制数据改为从平台加载（public/chr_data.bin），
 * 不再在 TS 源码中嵌入所有 32 个 chr-bank 数组。
 * 此文件仅保留常量定义，供需要时引用。
 * 主要的常量现在由 TileStore 导出。
 *
 * 原 chr-bank 文件（src/data/chr/chr-bank-*.ts）保留作为数据参考，
 * 但不再被运行时代码导入。
 */

/** 每个 MMC1 CHR sub-bank 的字节数 (4KB) */
export const CHR_BANK_SIZE = 0x1000; // 4096

/** MMC1 CHR sub-bank 总数 */
export const CHR_BANK_COUNT = 32;

/** CHR ROM 二进制文件总大小 */
export const CHR_ROM_SIZE = CHR_BANK_COUNT * CHR_BANK_SIZE; // 131072
