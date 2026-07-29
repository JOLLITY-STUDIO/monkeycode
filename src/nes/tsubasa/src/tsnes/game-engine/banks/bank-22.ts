/**
 * Bank 22: Sprite/OAM Engine ($8000-$9FFF)
 *
 * MMC3 可切换 bank。
 * 功能: 精灵/OAM 处理 — sprite 坐标变换、OAM 数据构造、PPU OAM 传输
 *
 * ═══════════════════════════════════════
 * 架构角色: Controller（精灵渲染引擎）
 * ═══════════════════════════════════════
 *
 * ═══════════════════════════════════════
 * 翻译状态 (SKELETON — 待完整翻译)
 * ═══════════════════════════════════════
 *
 * 6502 Entry Points (JMP vectors at $8000):
 *   $8000 → JMP $8003 (sprite/OAM convert entry)
 *
 * 原始 hex: tsubasa-hex2asm/prg_banks/prg_bank_22_sprite_engine.ts
 */

import type { SystemState } from './system-state';
import { registerBankRom } from './system-state';
import { PRG_ROM_BANKS } from '../data/rom-data';

// ── ROM data registration ──
registerBankRom(22, PRG_ROM_BANKS[22]);

// ═════════════════════════════════════════════════
// Entry stubs — called via MMC3 bank switch + JMP
// ═════════════════════════════════════════════════

/** $8000/$8003: 精灵/OAM 坐标变换入口 */
export function bank22_spriteConvert(sys: SystemState): void {
  console.warn(`[bank22] $8000 sprite/OAM convert — not yet implemented`);
}

/** Bank 22 dispatch table (offset → handler) */
export const bank22_dispatch: Record<number, (sys: SystemState) => void> = {
  0x00: bank22_spriteConvert,
};

console.log('[bank22] ✅ ROM registered — SKELETON (sprite/OAM)');
