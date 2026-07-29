/**
 * Bank 28: Player Attributes ($8000-$9FFF)
 *
 * MMC3 可切换 bank。
 * 功能: 球员属性计算 — 能力值查询、属性修正、成长系统
 *
 * ═══════════════════════════════════════
 * 架构角色: Controller（属性计算引擎）
 * ═══════════════════════════════════════
 *
 * ═══════════════════════════════════════
 * 翻译状态 (SKELETON — 待完整翻译)
 * ═══════════════════════════════════════
 *
 * 原始 hex: tsubasa-hex2asm/prg_banks/prg_bank_28_attributes.ts
 */

import type { SystemState } from './system-state';
import { registerBankRom } from './system-state';
import { PRG_ROM_BANKS } from '../data/rom-data';

// ── ROM data registration ──
registerBankRom(28, PRG_ROM_BANKS[28]);

// ═════════════════════════════════════════════════
// Entry stubs
// ═════════════════════════════════════════════════

/** $8000: 属性计算入口 */
export function bank28_entry(sys: SystemState): void {
  console.warn(`[bank28] entry called — not yet implemented`);
}

export const bank28_dispatch: Record<number, (sys: SystemState) => void> = {
  0x00: bank28_entry,
};

console.log('[bank28] ✅ ROM registered — SKELETON (attributes)');
