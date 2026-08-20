/**
 * Bank 30 数据文件 — 名字区指针表 + 固定区查找表
 *
 * 对应 asm/bank30/code_sub.s 内联数据段:
 *   $CD89  名字区指针表 (32 项 × 16bit LE)
 *   $FB4C  动画偏移/速度表 (固定区, 数据源在 Bank31, 见注释)
 *   $FBCC  调色板表 (固定区, 数据源在 Bank31, 见注释)
 *
 * 纯数据声明式保存, 由 bank30_init.service.ts 消费。
 */

// ═══════════════════════════════════════════════════════════════
// $CD89: 名字区指针表 (32 项 × 16bit LE)
// ═══════════════════════════════════════════════════════════════
//
// asm (code_sub.s $CD89):
//   .byte $00,$03,$0C,$03,$18,$03,$24,$03, ... ,$28,$04,$2C,$04
// 每项 2 字节小端指针 → 各球员名字区基址。
// 规律: 第 idx 项 = $0300 + idx*12 (名字区每球员 12 字节)。
//
// 访问: namePtr 通过 A = ram_05FB ^ $0B (或 $CD7C 直接 A) 查表
//   → 低字节写 ram_0034, 高字节写 ram_0035。
export const NAME_AREA_PTR_TABLE: ReadonlyArray<number> = [
  0x0300, 0x030C, 0x0318, 0x0324, 0x0330, 0x033C, 0x0348, 0x0354,
  0x0360, 0x036C, 0x0378, 0x0384, 0x0390, 0x039C, 0x03A8, 0x03B4,
  0x03C0, 0x03CC, 0x03D8, 0x03E4, 0x03F0, 0x03FC, 0x0408, 0x040C,
  0x0410, 0x0414, 0x0418, 0x041C, 0x0420, 0x0424, 0x0428, 0x042C,
];

/**
 * $CD89 表项数 (名字区槽位数, 22 队 × 依场景 0-31)。
 */
export const NAME_AREA_PTR_TABLE_COUNT = NAME_AREA_PTR_TABLE.length;

// ═══════════════════════════════════════════════════════════════
// $FB4C: 动画偏移/速度表 (固定区 $E000 窗口, 数据源 Bank31)
// ═══════════════════════════════════════════════════════════════
//
// $CE4A/$CE4D 有符号查表目标。asm 以 `$FB4C,X` / `$FB4D,X` 读 2 字节
// 小端, 表基址 $FB4C 位于固定区 (Bank31, CPU $E000-$FFFF)。
// 数组索引 = $FB4C - $E000 = $1B4C (Bank31 原始字节数组偏移)。
//
// 表内容 (动画偏移/速度) 未在 bank30 内联, 数据源在 Bank31 固定区。
// 此处保留空表 stub, 查找逻辑已由 bank30_init.service.ts 的
// tableFB4C() 完整实现; 调用方可注入真实表 (ROM dump 0x1B4C 起)。
export const TABLE_FB4C: ReadonlyArray<number> = [];

/**
 * $FB4C 表基址 (Bank31 原始字节数组索引), 供调用方注入真实数据时定位。
 */
export const TABLE_FB4C_BASE = 0x1B4C;

// ═══════════════════════════════════════════════════════════════
// $FBCC: 调色板表 (固定区 $E000 窗口, 数据源 Bank31)
// ═══════════════════════════════════════════════════════════════
//
// $CC02 调色板查表填充目标。asm 计算表指针 = $FBCC + A*12 (每项 12B),
// 数组索引 = $FBCC - $E000 = $1BCC (Bank31 原始字节数组偏移)。
//
// 真实颜色数据 (NES 颜色索引, 每项 12B) 位于 Bank31 固定区
// (mirror of bank31-data-scripts.ts 的 PALETTE_DATA 区段)。
// 此处保留空表 stub, 查找/填充逻辑已由 bank30_init.service.ts 的
// paletteLoadByIndex() 完整实现; 调用方可注入真实表 (ROM dump 0x1BCC 起)。
export const PALETTE_FBCC: ReadonlyArray<number> = [];

/**
 * $FBCC 调色板表基址 (Bank31 原始字节数组索引), 供注入真实数据时定位。
 */
export const PALETTE_FBCC_BASE = 0x1BCC;

/** 调色板表项大小 (每项 12 字节颜色数据) */
export const PALETTE_ENTRY_SIZE = 12;
