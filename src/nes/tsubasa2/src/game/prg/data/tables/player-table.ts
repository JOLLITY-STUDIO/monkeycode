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
export const STAMINA_TABLE_16BIT: number[] = [
  0x0000, 0x0060, 0x00D0, 0x0150, 0x0210, 0x0300, 0x03F8, 0x0500, // idx0-7
  0x0628, 0x0780, 0x0900, 0x0A90, 0x0C30, 0x0DE0, 0x0FA0, 0x1170, // idx8-15
  0x1350, 0x1550, 0x1770, 0x19B0, 0x1C00, 0x1E60, 0x20D0, 0x2348, // idx16-23
  0x25C8, 0x2850, 0x2AE0, 0x2D78, 0x3018, 0x32C8, 0x3588, 0x3858, // idx24-31
  0x3B30, 0x3E10, 0x40F8, 0x4440, 0x4790, 0x4AE8, 0x4E48, 0x51B0, // idx32-39
  0x5520, 0x5900, 0x5D20, 0x6150, 0x6590, 0x69E0, 0x6E40, 0x7300, // idx40-47
  0x77E0, 0x7CD0, 0x8200, 0x8780, 0x8D80, 0x93E0, 0x9AD0, 0xA1E0, // idx48-55
  0xA9C0, 0xB1C0, 0xB9D0, 0xC204, 0xCB80, 0xD7A0, 0xE800, 0xFFFF, // idx56-63
];

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
export const PLAYER_STAT_TABLE_16BIT: number[] = [
  0x0052, 0x0054, 0x0056, 0x0058, 0x005A, 0x0000, 0x006D, 0x007B, // 0-7
  0x008E, 0x009A, 0x00A0, 0x0000, 0x00B1, 0x00BD, 0x00D5, 0x0000, // 8-15
  0x00C8, 0x00E7, 0x00EA, 0x00ED, 0x00F0, 0x00F2, 0x00F2, 0x00F5, // 16-23
  0x00F8, 0x00FE, 0x010A, 0x010A, 0x010D, 0x0110, 0x0137, 0x013D, // 24-31
  0x0145, 0x0145, // 32-33 (表尾, 紧邻 $BA90 体力表)
];

/**
 * 球员真实能力查表 (8bit 编码 → 能力值, 原 ROM 0x39E5E 能力表)。
 * TODO: 待从 bank01 asm 对应段确认边界后填充。
 * 编码值 → 真实数值, 用于数值显示链路能力部分。
 */
export const ABILITY_TABLE_8BIT: number[] = [];

/**
 * 球员 ID → 名称 tile 指针表 (原 CPU $BDA8, 2byte LE 指针数组)。
 * TODO: 待提取。
 */
export const PLAYER_NAME_PTR_TABLE: number[] = [];
