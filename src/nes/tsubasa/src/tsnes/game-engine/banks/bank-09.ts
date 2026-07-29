/**
 * Bank 09: Data Bank ($8000-$9FFF 或 $A000-$BFFF)
 *
 * MMC3 可切换 bank。
 * 功能: 纯数据 bank，供其他 bank 透过 MMC3 切换读取
 *
 * ═══════════════════════════════════════
 * 架构角色: Data Provider（静态 ROM 资料）
 * ═══════════════════════════════════════
 *
 * ═══════════════════════════════════════
 * 翻译状态
 * ═══════════════════════════════════════
 *   ✅ ROM 数据 — 内联常数 bank-09-data.ts
 *   ✅ 注册 — registerBankRom(9)
 *
 * 原始 hex: tsubasa-hex2asm/prg_banks/prg_bank_09_data.ts
 */

import { registerBankRom } from './system-state';
import { PRG_BANK_09 } from './bank-09-data';

// 注册 ROM 数据
registerBankRom(9, new Uint8Array(PRG_BANK_09));

/** ROM 数据直接访问 */
export function rom09(offset: number): number {
  return PRG_BANK_09[offset & 0x1FFF] ?? 0;
}

/** 读取 16-bit 指针 (little-endian) */
export function rom09Ptr16(offset: number): number {
  const lo = PRG_BANK_09[offset & 0x1FFF] ?? 0;
  const hi = PRG_BANK_09[(offset + 1) & 0x1FFF] ?? 0;
  return (hi << 8) | lo;
}

/** 读取整个 bank 数据 */
export function getBank09Data(): readonly number[] {
  return PRG_BANK_09;
}
