/**
 * Bank 15: Music Sequence Data ($8000-$9FFF 或 $A000-$BFFF)
 *
 * MMC3 可切换 bank。
 * 功能: 音乐序列/曲谱数据（纯数据 bank，供 bank 12 音频引擎消费）
 *
 * ═══════════════════════════════════════
 * 架构角色: Data Provider（音乐资料提供者）
 * ═══════════════════════════════════════
 *   - 被 bank 12（音频引擎）透过 MMC3 切换读取
 *   - 包含 MML-like 的曲谱序列数据
 *   - 字节码: E0(通道), E2(音量), E3(乐器), E8(跳转表),
 *             EB/EC(重复), ED(时值), F3/F4(连音), EF(音符)
 *
 * ═══════════════════════════════════════
 * 翻译状态
 * ═══════════════════════════════════════
 *   ✅ ROM 数据 — 内联常数 bank-15-data.ts
 *
 * 原始 hex: tsubasa-hex2asm/prg_banks/prg_bank_15_data.ts
 */

import { PRG_BANK_15_DATA } from './bank-15-data';

// 注册 ROM 数据
/** ROM 数据直接访问 */
export function rom15(offset: number): number {
  return PRG_BANK_15_DATA[offset & 0x1FFF] ?? 0;
}

/** 读取 16-bit 指针 (little-endian) */
export function rom15Ptr16(offset: number): number {
  const lo = PRG_BANK_15_DATA[offset & 0x1FFF] ?? 0;
  const hi = PRG_BANK_15_DATA[(offset + 1) & 0x1FFF] ?? 0;
  return (hi << 8) | lo;
}

/** 读取整个 bank 数据 */
export function getBank15Data(): readonly number[] {
  return PRG_BANK_15_DATA;
}
