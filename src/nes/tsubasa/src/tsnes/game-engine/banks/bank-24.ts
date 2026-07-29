/**
 * Bank 24: Cutscene/Match Scene Control ($8000-$9FFF)
 *
 * MMC3 可切换 bank。
 * 功能: 比赛场景/过场控制 — scene state machine、TECMO logo、intro cutscenes
 *
 * ═══════════════════════════════════════
 * 架构角色: Controller（过场/比赛流程控制）
 * ═══════════════════════════════════════
 *
 * ═══════════════════════════════════════
 * 翻译状态 (SKELETON — 待完整翻译)
 * ═══════════════════════════════════════
 *
 * 6502 Entry Points (JMP vectors at $8000):
 *   $8000 → JMP $800F (scene state machine)
 *   $8003 → JMP $86F8 (scene tick/update)
 *   $8006 → JMP $8779 (scene data load)
 *   $8009 → JMP $87E6 (PPU/scene render)
 *   $800C → JMP $8851 (helper/aux)
 *
 * 原始 hex: tsubasa-hex2asm/prg_banks/prg_bank_24_cutscene.ts
 */

import type { SystemState } from './system-state';
import { registerBankRom } from './system-state';
import { PRG_ROM_BANKS } from '../data/rom-data';

// ── ROM data registration ──
registerBankRom(24, PRG_ROM_BANKS[24]);

// ═════════════════════════════════════════════════
// Entry stubs — called via MMC3 bank switch + JMP
// ═════════════════════════════════════════════════

/** $8000/$800F: 场景状态机主入口 */
export function bank24_sceneStateMachine(sys: SystemState): void {
  console.warn(`[bank24] $8000 scene state machine — not yet implemented`);
}

/** $8003/$86F8: 场景更新/tick */
export function bank24_sceneTick(sys: SystemState): void {
  console.warn(`[bank24] $8003 scene tick — not yet implemented`);
}

/** $8006/$8779: 场景数据加载 */
export function bank24_sceneDataLoad(sys: SystemState): void {
  console.warn(`[bank24] $8006 scene data load — not yet implemented`);
}

/** $8009/$87E6: 场景渲染输出 */
export function bank24_sceneRender(sys: SystemState): void {
  console.warn(`[bank24] $8009 scene render — not yet implemented`);
}

/** $800C/$8851: 辅助函数 */
export function bank24_auxHelper(sys: SystemState): void {
  console.warn(`[bank24] $800C aux helper — not yet implemented`);
}

/** Bank 24 dispatch table (offset → handler) */
export const bank24_dispatch: Record<number, (sys: SystemState) => void> = {
  0x00: bank24_sceneStateMachine,
  0x03: bank24_sceneTick,
  0x06: bank24_sceneDataLoad,
  0x09: bank24_sceneRender,
  0x0C: bank24_auxHelper,
};

console.log('[bank24] ✅ ROM registered — SKELETON (stateMachine|tick|dataLoad|render|aux)');
