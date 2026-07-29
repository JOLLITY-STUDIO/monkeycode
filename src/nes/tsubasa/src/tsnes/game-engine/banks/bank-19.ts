/**
 * Bank 19: Lookup Tables ($8000-$9FFF)
 *
 * MMC3 可切换 bank。
 * 功能: 查表/数据 — 包含游戏数据查找表、属性映射
 *
 * ═══════════════════════════════════════
 * 架构角色: Data Provider（查表数据）
 * ═══════════════════════════════════════
 *
 * ═══════════════════════════════════════
 * 翻译状态 (SKELETON — 待完整翻译)
 * ═══════════════════════════════════════
 *
 * 原始 hex: tsubasa-hex2asm/prg_banks/prg_bank_19_lookup_tables.ts
 */

import type { SystemState } from './system-state';
import { registerBankRom } from './system-state';
import { PRG_ROM_BANKS } from '../data/rom-data';

// ── ROM data registration ──
registerBankRom(19, PRG_ROM_BANKS[19]);

// ═════════════════════════════════════════════════
// Entry stubs
// ═════════════════════════════════════════════════

/** $8000: 查表入口 */
export function bank19_entry(sys: SystemState): void {
  console.warn(`[bank19] entry called — not yet implemented`);
}

export const bank19_dispatch: Record<number, (sys: SystemState) => void> = {
  0x00: bank19_entry,
};

console.log('[bank19] ✅ ROM registered — SKELETON (lookup tables)');
