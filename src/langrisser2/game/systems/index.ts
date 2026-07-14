/**
 * systems/index.ts — Barrel export for all Langrisser II game systems
 *
 * Each system is a self-contained module using ROM-derived data:
 *   - ItemSystem      → ROM 0x060530 (37 items × 8B)
 *   - MagicSystem     → Unit spell slots + ROM spell table
 *   - CombatSystem    → Unit type advantages + combat formulas
 *   - StageConfig     → ROM 0x05EDDC + 0x0821BE + 0x61CB0
 *   - InputSystem     → Keyboard → Genesis controller mapper
 *   - CheatSystem     → ROM cheat sequence detector
 *   - SaveSystem      → localStorage save/load (SRAM replacement)
 */

// Re-export all systems
export * from './ItemSystem';
export * from './MagicSystem';
export * from './CombatSystem';
export * from './StageConfig';
export * from './InputSystem';
export * from './CheatSystem';
export * from './SaveSystem';
export * from './SoundSystem';
