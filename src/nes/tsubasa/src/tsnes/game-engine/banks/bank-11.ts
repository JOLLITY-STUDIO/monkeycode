/**
 * Bank 11: Background/Tile Renderer ($8000-$9FFF)
 *
 * MMC3 可切换 bank。
 * 功能: 背景/瓦片渲染 — nametable scroll 更新、tile 复制
 *
 * ═══════════════════════════════════════
 * 架构角色: Controller（背景渲染引擎）
 * ═══════════════════════════════════════
 *
 * ═══════════════════════════════════════
 * 翻译状态 (SKELETON — 待完整翻译)
 * ═══════════════════════════════════════
 *
 * 6502 Entry Points (JMP vectors at $8000):
 *   $8000 → JMP $800C (init/render)
 *   $8003 → JMP $8083 (scroll update)
 *   $8006 → JMP $84A1 (tile write)
 *   $8009 → JMP $814C (attr/setup)
 *
 * 原始 hex: tsubasa-hex2asm/prg_banks/prg_bank_11_background.ts
 */

import type { SystemState } from './system-state';
import { registerBankRom } from './system-state';
import { PRG_ROM_BANKS } from '../data/rom-data';

// ── ROM data registration ──
registerBankRom(11, PRG_ROM_BANKS[11]);

// ═════════════════════════════════════════════════
// Entry stubs — called via MMC3 bank switch + JMP
// ═════════════════════════════════════════════════

/** $8000/$800C: 背景初始化/渲染 */
export function bank11_init(sys: SystemState): void {
  console.warn(`[bank11] $8000 init/render — not yet implemented`);
}

/** $8003/$8083: 滚动更新 */
export function bank11_scrollUpdate(sys: SystemState): void {
  console.warn(`[bank11] $8003 scroll update — not yet implemented`);
}

/** $8006/$84A1: 瓦片写入 */
export function bank11_tileWrite(sys: SystemState): void {
  console.warn(`[bank11] $8006 tile write — not yet implemented`);
}

/** $8009/$814C: 属性设置 */
export function bank11_attrSetup(sys: SystemState): void {
  console.warn(`[bank11] $8009 attr setup — not yet implemented`);
}

/** Bank 11 dispatch table (offset → handler) */
export const bank11_dispatch: Record<number, (sys: SystemState) => void> = {
  0x00: bank11_init,
  0x03: bank11_scrollUpdate,
  0x06: bank11_tileWrite,
  0x09: bank11_attrSetup,
};

console.log('[bank11] ✅ ROM registered — SKELETON (init|scroll|tile|attr)');
