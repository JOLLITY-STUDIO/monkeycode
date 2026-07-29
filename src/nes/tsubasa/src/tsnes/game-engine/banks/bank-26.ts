/**
 * Bank 26: Core Match Engine ($8000-$9FFF)
 *
 * MMC3 可切换 bank。
 * 功能: 核心比赛引擎 — 球员AI、球物理、碰撞检测、比赛状态机
 *
 * ═══════════════════════════════════════
 * 架构角色: Controller（核心比赛引擎）
 * ═══════════════════════════════════════
 *
 * ═══════════════════════════════════════
 * 翻译状态 (SKELETON — 待完整翻译)
 * ═══════════════════════════════════════
 *
 * 6502 Entry Points (JMP vectors at $8000):
 *   $8000 → JMP $A103 (match init/setup)
 *   $8003 → JMP $803C (player AI tick)
 *   $8006 → JMP $84F8 (ball physics)
 *   $8009 → JMP $86F6 (collision check)
 *   $800C → JMP $8835 (player state)
 *   $800F → JMP $87E1 (team logic)
 *   $8012 → JMP $888D (goal check)
 *   $8015 → JMP $88A8 (event handler)
 *   $8018 → JMP $88F3 (data query)
 *   $801B → JMP $8BE5 (match flow)
 *   $801E → JMP $8B4A (scene transition)
 *
 * 原始 hex: tsubasa-hex2asm/prg_banks/prg_bank_26_match_core.ts
 */

import type { SystemState } from './system-state';
import { registerBankRom } from './system-state';
import { PRG_ROM_BANKS } from '../data/rom-data';

// ── ROM data registration ──
registerBankRom(26, PRG_ROM_BANKS[26]);

// ═════════════════════════════════════════════════
// Entry stubs — called via MMC3 bank switch + JMP
// ═════════════════════════════════════════════════

/** $8000/$A103: 比赛初始化 */
export function bank26_matchInit(sys: SystemState): void {
  console.warn(`[bank26] $8000 match init — not yet implemented`);
}

/** $8003/$803C: 球员AI推进 */
export function bank26_playerAI(sys: SystemState): void {
  console.warn(`[bank26] $8003 player AI — not yet implemented`);
}

/** $8006/$84F8: 球物理更新 */
export function bank26_ballPhysics(sys: SystemState): void {
  console.warn(`[bank26] $8006 ball physics — not yet implemented`);
}

/** $8009/$86F6: 碰撞检测 */
export function bank26_collision(sys: SystemState): void {
  console.warn(`[bank26] $8009 collision — not yet implemented`);
}

/** $800C/$8835: 球员状态 */
export function bank26_playerState(sys: SystemState): void {
  console.warn(`[bank26] $800C player state — not yet implemented`);
}

/** $800F/$87E1: 队伍逻辑 */
export function bank26_teamLogic(sys: SystemState): void {
  console.warn(`[bank26] $800F team logic — not yet implemented`);
}

/** $8012/$888D: 进球检测 */
export function bank26_goalCheck(sys: SystemState): void {
  console.warn(`[bank26] $8012 goal check — not yet implemented`);
}

/** $8015/$88A8: 事件处理 */
export function bank26_eventHandler(sys: SystemState): void {
  console.warn(`[bank26] $8015 event handler — not yet implemented`);
}

/** $8018/$88F3: 数据查询 */
export function bank26_dataQuery(sys: SystemState): void {
  console.warn(`[bank26] $8018 data query — not yet implemented`);
}

/** $801B/$8BE5: 比赛流程 */
export function bank26_matchFlow(sys: SystemState): void {
  console.warn(`[bank26] $801B match flow — not yet implemented`);
}

/** $801E/$8B4A: 场景切换 */
export function bank26_sceneTransition(sys: SystemState): void {
  console.warn(`[bank26] $801E scene transition — not yet implemented`);
}

/** Bank 26 dispatch table (offset → handler) */
export const bank26_dispatch: Record<number, (sys: SystemState) => void> = {
  0x00: bank26_matchInit,
  0x03: bank26_playerAI,
  0x06: bank26_ballPhysics,
  0x09: bank26_collision,
  0x0C: bank26_playerState,
  0x0F: bank26_teamLogic,
  0x12: bank26_goalCheck,
  0x15: bank26_eventHandler,
  0x18: bank26_dataQuery,
  0x1B: bank26_matchFlow,
  0x1E: bank26_sceneTransition,
};

console.log('[bank26] ✅ ROM registered — SKELETON (11 entry points)');
