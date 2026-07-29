/**
 * Bank 27: Player Data ($8000-$9FFF)
 *
 * MMC3 可切换 bank。
 * 功能: 球员数据查询 — 球员属性、队伍数据、名称表
 *
 * ═══════════════════════════════════════
 * 架构角色: Data Provider（球员属性数据源）
 * ═══════════════════════════════════════
 *
 * ═══════════════════════════════════════
 * 翻译状态 (SKELETON — 待完整翻译)
 * ═══════════════════════════════════════
 *
 * 原始 hex: tsubasa-hex2asm/prg_banks/prg_bank_27_player_data.ts
 */

import type { SystemState } from './system-state';
import { registerBankRom } from './system-state';
import { PRG_ROM_BANKS } from '../data/rom-data';

// ── ROM data registration ──
registerBankRom(27, PRG_ROM_BANKS[27]);

// ═════════════════════════════════════════════════
// Entry stubs
// ═════════════════════════════════════════════════

/** $8000: 球员数据查询入口 */
export function bank27_entry(sys: SystemState): void {
  console.warn(`[bank27] entry called — not yet implemented`);
}

export const bank27_dispatch: Record<number, (sys: SystemState) => void> = {
  0x00: bank27_entry,
};

console.log('[bank27] ✅ ROM registered — SKELETON (player data)');
