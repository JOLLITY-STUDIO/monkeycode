/**
 * Bank 16: Scene Logic/Script Engine ($8000-$9FFF)
 *
 * MMC3 可切换 bank。
 * 功能: 场景渲染/脚本引擎 — 场景数据解码、PPU 批量写入、脚本解释执行
 *
 * ═══════════════════════════════════════
 * 架构角色: Controller（场景脚本引擎）
 * ═══════════════════════════════════════
 *
 * ═══════════════════════════════════════
 * 翻译状态 (SKELETON — 待完整翻译)
 * ═══════════════════════════════════════
 *
 * 6502 Entry Points (JMP vectors at $8000):
 *   $8000 → JMP $8006 (scene dispatch init)
 *   $8003 → JMP $8021 (scene update/tick)
 *
 * 原始 hex: tsubasa-hex2asm/prg_banks/prg_bank_16_scene_logic.ts
 */

import type { SystemState } from './system-state';
import { registerBankRom } from './system-state';
import { PRG_ROM_BANKS } from '../data/rom-data';

// ── ROM data registration ──
registerBankRom(16, PRG_ROM_BANKS[16]);

// ═════════════════════════════════════════════════
// Entry stubs — called via MMC3 bank switch + JMP
// ═════════════════════════════════════════════════

/** $8000/$8006: 场景分派入口 */
export function bank16_dispatchEntry(sys: SystemState): void {
  console.warn(`[bank16] $8000 dispatch entry — not yet implemented`);
}

/** $8003/$8021: 场景更新/推进 */
export function bank16_sceneTick(sys: SystemState): void {
  console.warn(`[bank16] $8003 scene tick — not yet implemented`);
}

/** Bank 16 dispatch table (offset → handler) */
export const bank16_dispatch: Record<number, (sys: SystemState) => void> = {
  0x00: bank16_dispatchEntry,
  0x03: bank16_sceneTick,
};

console.log('[bank16] ✅ ROM registered — SKELETON (dispatch|tick)');
