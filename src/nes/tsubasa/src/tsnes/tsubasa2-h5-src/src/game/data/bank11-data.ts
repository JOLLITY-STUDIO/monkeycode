/**
 * Bank 11 数据 (Data/Model 层) — 原始提取, 未结构化
 *
 * 来源: rom-data/prg-bank-11.ts (自动生成, 原始字节, 自动提取)
 * 数据已直接 import，cpuAddr (0x8000-0x9FFF) 仅作数据索引保留
 * PRG offset: 0x016010-0x01800F
 *
 * 逻辑直接翻译自 _tmp_bzk_out/bank_11.asm (CDL C 标记)。
 * 本 bank 为「比赛回合逻辑 (Match Turn Logic) PT1」:
 *   - $8003 入口跳转表 (3 路): $8083 / $84A1 / $814C
 *   - $800C 隐藏入口: 滚动控制循环
 *   - $814C 脚本处理入口 (ram_0524 → $87F6 脚本指针表)
 *   - $81BC 脚本控制码 handler (AND #$0F → $81C6 表B)
 *   - $81A7 脚本道具 handler (→ $81AA 表A)
 *   - $8525/$85C2/$86D3 精灵组写入核心 (调色板组 / block 表 / 窗口 pattern)
 *
 * ⚠ 本文件由脚本自动提取, 不结构化。service 仅通过 readB11/readB11U16
 *   访问本 bank 数据, 不直接引用 rom-data/prg-bank-11.ts。
 */

import PRG_BANK_11 from '../../../../rom-data/prg-bank-11';

/** bank11 CPU 基址 ($8000 窗口) */
export const B11_CPU_BASE = 0x8000;

/** bank11 原始字节 (CPU $8000-$9FFF, 8KB) */
export const B11_DATA: readonly number[] = PRG_BANK_11;

/**
 * 读 bank11 原始字节 (CPU 地址)。
 * 本 bank 为 MMC3 可切换 8KB bank, 仅映射 $8000-$9FFF 窗口;
 * $A000-$BFFF 窗口在运行期由 fn_85C2 切换为 bank 12/13, 不属本 bank。
 */
export function readB11(cpuAddr: number): number {
  let off = cpuAddr - B11_CPU_BASE;
  if (cpuAddr >= 0xa000) off = cpuAddr - 0xa000;
  return off >= 0 && off < B11_DATA.length ? B11_DATA[off] : 0;
}

/** 读 bank11 16bit LE (CPU 地址) */
export function readB11U16(cpuAddr: number): number {
  return readB11(cpuAddr) | (readB11(cpuAddr + 1) << 8);
}

// ═══════════════════════════════════════════════════════════════
// 结构化表访问
// ═══════════════════════════════════════════════════════════════

/**
 * $87F6 脚本指针表 (每项 2B LE)。
 * entry_814C 按 ram_0524 索引 (ram_0524 ≠ $FF, ASL 后查表),
 * 指向脚本流 (字节 ≥ $F0 为控制码, < $F0 为数据)。
 */
export function readB11ScriptPtr(idx: number): number {
  return readB11U16(0x87f6 + ((idx & 0xff) << 1));
}

/**
 * $81AA 表A (9 项小端指针)。
 * fn_81A7 (JSR $C509 表跳转) 按 A 索引:
 *   [0] $8327  [1] $83E7  [2] $83FF  [3] $8358  [4] $8377
 *   [5] $8364  [6] $83D2  [7] $83E7  [8] $83EE
 */
export function readB11TableA(idx: number): number {
  return readB11U16(0x81aa + ((idx & 0x0f) << 1));
}

/**
 * $81C6 表B (3 项小端指针)。
 * entry_81BC (控制码 A&$0F, JSR $C509 表跳转) 索引:
 *   [0] $81CC  [1] $8276  [2] $824D
 * 注: $8276 为隐藏 JSR $82F7 前导 (表中字节 20 F7 82)。
 */
export function readB11TableB(idx: number): number {
  return readB11U16(0x81c6 + ((idx & 0x0f) << 1));
}

/**
 * $86EE T_UNIT_TILE 表 (tile*2 索引, 512B)。
 * fn_8525 按 tile*2 读 2B → ram_0526/0527 (tile 高/低字节, 高位 ORA #$80)。
 */
export function readB11TUnitTile(tile: number): number {
  return readB11U16(0x86ee + ((tile & 0xff) << 1));
}

/**
 * $81D5 位移表 (120B)。
 * entry_81CF: A = $81D5,X → JMP $832B (X 由表B[0] $81CC 的 JSR $82F7 计算)。
 */
export function readB11Disp81D5(idx: number): number {
  return readB11(0x81d5 + (idx & 0xff));
}

/**
 * $827F 位移表 (120B)。
 * entry_827C: A = $827F,X → JMP $832B (X 由 entry_8250 计算)。
 */
export function readB11Disp827F(idx: number): number {
  return readB11(0x827f + (idx & 0xff));
}

/**
 * $8B42 调色板组 attr 表 (34B)。
 * fn_86D3: Y = A>>2; LDA $8B42,Y; 按 X = A&3 循环 2×LSR 取组值 → ram_05CA。
 */
export function readB11Attr(y: number): number {
  return readB11(0x8b42 + (y & 0x3f));
}

/**
 * $8B64 block 表 (每块 $100B, tile>>3 索引块, tile&7 块内行偏移)。
 * fn_812B/fn_8525: 基址 = $8B64 + (tile>>3)*$100 + (tile&7)。
 * 之后 LDA (基址),Y (Y = 位置索引 & $3F)。
 */
export function readB11Block(tile: number): number {
  const t = tile & 0xff;
  return (0x8b64 + ((t >> 3) << 8) + (t & 7)) & 0xffff;
}

/**
 * $9BE4+CA*$100 图案属性表 (CA = 调色板组 0-3, 每页 $100B)。
 * fn_85C2: (0056) = $9BE4 + ram_05CA*$100; LDA (0056),Y (Y = tile) → ram_04C4+X。
 */
export function readB11PatternAttr(ca: number, tile: number): number {
  return readB11(0x9be4 + ((ca & 3) << 8) + (tile & 0xff));
}

/**
 * $9BE4 图案属性表基址 (供验证脚本/分析文档使用)。
 */
export const B11_PATTERN_ATTR_BASE = 0x9be4;

/** $8B64 block 表基址 */
export const B11_BLOCK_BASE = 0x8b64;

/** $86EE T_UNIT_TILE 表基址 */
export const B11_T_UNIT_TILE_BASE = 0x86ee;

/** $87F6 脚本指针表基址 */
export const B11_SCRIPT_PTR_BASE = 0x87f6;
