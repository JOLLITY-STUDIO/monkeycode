/**
 * Bank 20: Team/Player Selection ($8000-$9FFF)
 *
 * MMC3 可切换 bank。
 * 功能: 队伍/球员选择 — 阵容编辑、球员数据管理、选择菜单
 *
 * ═══════════════════════════════════════
 * 架构角色: Controller（阵容管理）
 * ═══════════════════════════════════════
 *
 * ═══════════════════════════════════════
 * 翻译状态 (SKELETON — 待完整翻译)
 * ═══════════════════════════════════════
 *
 * 6502 Entry Points (JMP vectors at $8000):
 *   $8000 → JMP $800F (team select init)
 *   $8003 → JMP $84DC (player data load)
 *   $8006 → JMP $83D9 (roster update)
 *   $8009 → JMP $8624 (formation/setup)
 *   $800C → JMP $8796 (menu handler)
 *
 * 原始 hex: tsubasa-hex2asm/prg_banks/prg_bank_20_team_data.ts
 */

import type { SystemState } from './system-state';
import { registerBankRom } from './system-state';
import { PRG_ROM_BANKS } from '../data/rom-data';

// ── ROM data registration ──
registerBankRom(20, PRG_ROM_BANKS[20]);

// ═════════════════════════════════════════════════
// Entry stubs — called via MMC3 bank switch + JMP
// ═════════════════════════════════════════════════

/** $8000/$800F: 队伍选择初始化 */
export function bank20_teamSelectInit(sys: SystemState): void {
  console.warn(`[bank20] $8000 team select init — not yet implemented`);
}

/** $8003/$84DC: 球员数据加载 */
export function bank20_playerDataLoad(sys: SystemState): void {
  console.warn(`[bank20] $8003 player data load — not yet implemented`);
}

/** $8006/$83D9: 阵容更新 */
export function bank20_rosterUpdate(sys: SystemState): void {
  console.warn(`[bank20] $8006 roster update — not yet implemented`);
}

/** $8009/$8624: 阵型设置 */
export function bank20_formationSetup(sys: SystemState): void {
  console.warn(`[bank20] $8009 formation setup — not yet implemented`);
}

/** $800C/$8796: 菜单处理器 */
export function bank20_menuHandler(sys: SystemState): void {
  console.warn(`[bank20] $800C menu handler — not yet implemented`);
}

/** Bank 20 dispatch table (offset → handler) */
export const bank20_dispatch: Record<number, (sys: SystemState) => void> = {
  0x00: bank20_teamSelectInit,
  0x03: bank20_playerDataLoad,
  0x06: bank20_rosterUpdate,
  0x09: bank20_formationSetup,
  0x0C: bank20_menuHandler,
};

console.log('[bank20] ✅ ROM registered — SKELETON (teamSelect|player|roster|formation|menu)');
