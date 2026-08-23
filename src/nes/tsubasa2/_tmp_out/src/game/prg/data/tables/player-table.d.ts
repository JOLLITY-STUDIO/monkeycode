/**
 * player-table — 球员能力查表 / 体力表 / LOOKUP_16BIT 等声明式数据
 * @bank 01 ($A000-$BFFF 窗口)
 *
 * 从 asm/bank01/data_tables.s 的 .byte 段逐段提取，禁止残留 PRG_BANK 随机访问。
 * 数值显示链路: ROM 编码值 → 查体力表(16bit)/能力表(8bit) → 真实数值
 * → $8C55 循环除10 → 余数+0x33=tile_id → 写 ram_04A8 PPU Buffer。
 *
 * 说明: 本文件只放跨例程共享的声明式表。单例程内联表 (选项菜单 B241/B255、
 * GFX 指针、阵容块等) 后续按需提取。
 */
/**
 * LOOKUP_16BIT 体力表 (原 CPU $BA90, 64×16bit LE)。
 * 由 ROM dump (bank1 偏移 0x1A90) 提取: idx0=0 / idx1=96 / idx2=208 ...
 *
 * ⚠ 2026-08 校准: 旧表从 idx11 起全部错位 (0x0A30/0x0CE0/... 实为相邻项字节
 *   串位), idx62/63 误写 0xE8FF。现以 ROM 权威字节为准:
 *   $BA90 起: 00 00 60 00 D0 00 50 01 10 02 00 03 F8 03 00 05
 *            28 06 80 07 00 09 90 0A 30 0C E0 0D A0 0F 70 11 ...
 *   idx11=0x0A90, idx62=0xE800, idx63=0xFFFF (表尾哨兵)。
 */
export declare const STAMINA_TABLE_16BIT: number[];
/**
 * 球员能力查表 (16bit, 原 CPU $BA4C, 34 项 LE)。
 * 2026-08 校准: 真实起点为 $BA4C (非 $BA48 —— $BA48 处 `14 00 00 00`
 * 是前一个 4 字节组表最后一项), 表尾 $BA8F 后紧邻 $BA90 的体力表。
 * 由 ROM dump (bank1 偏移 0x1A4C) 提取:
 *   $BA4C: 52 00 54 00 56 00 58 00 5A 00 00 00 6D 00 7B 00
 *   $BA5C: 8E 00 9A 00 A0 00 00 00 B1 00 BD 00 D5 00 00 00
 *   $BA6C: C8 00 E7 00 EA 00 ED 00 F0 00 F2 00 F2 00 F5 00
 *   $BA7C: F8 00 FE 00 0A 01 0A 01 0D 01 10 01 37 01 3D 01
 *   $BA8C: 45 01 45 01
 * 共 34 项 16bit 小端。
 */
export declare const PLAYER_STAT_TABLE_16BIT: number[];
/**
 * 球员真实能力查表 (8bit 编码 → 能力值, 原 ROM 0x39E5E 能力表)。
 * 64 项 (编码 0-63), 值从 0x08 递增到 0x2D (8-45)。
 * 编码 0-31 = 低空能力 (Shot/Pass/Dribble/Block/Tackle/Intercept 等),
 * 编码 32-63 = 高空能力 (同字段, 高空版本)。
 * 数值显示链路: ROM 编码值 → 查此表 → 真实数值 → $8C55 循环除10 → tile。
 *
 * 由 ROM dump (docs/roms/Captain Tsubasa II - Super Striker (Japan).nes 0x39E5E) 提取:
 *   08 08 08 09 09 09 09 0A 0A 0A 0B 0B 0B 0C 0C 0C
 *   0D 0D 0D 0E 0E 0E 0F 0F 10 10 11 11 11 12 12 13
 *   14 14 15 15 16 16 17 18 18 19 1A 1A 1B 1C 1D 1D
 *   1E 1F 20 21 22 23 24 25 26 27 28 29 2A 2B 2C 2D
 */
export declare const ABILITY_TABLE_8BIT: number[];
/**
 * 球员 ID → 名称 tile 指针表 (原 CPU $BDA8, 34 项 2byte LE 指针数组)。
 * 每项指向 bank01 内 ($BDxx-$BFxx 区) 的球员名称 tile 数据。
 * 指针值 = bank01 $A000 窗口内的地址 (运行时 $BDF2 等)。
 *
 * 由 ROM dump (bank01 $BDA8, PRG+header 0x3DB8) 提取:
 *   F2 BD F9 BD 00 BE 09 BE 11 BE 1A BE 21 BE 29 BE
 *   30 BE 37 BE 3F BE 48 BE 4F BE 59 BE 5F BE 66 BE
 *   6D BE 74 BE 7D BE 84 BE ...
 * 项 34 起值变为 $4B00/$CD6E (非连续指针, 属其他数据), 故表长 = 34 项。
 */
export declare const PLAYER_NAME_PTR_TABLE: number[];
