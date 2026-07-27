/**
 * ============================================================================
 * Scene Registry — manages all 19 game scenes and their initialization
 *
 * Each scene has:
 *   - init handler: sets up scriptPtr, bank, etc. when entering the scene
 *   - The bytecode engine then processes the scene's script data
 *
 * Scene flow:
 *   TECMO_LOGO(0x00) → TITLE(0x02) → LOAD_GAME(0x03) → MAIN_MENU(0x04)
 *   → STORY_INTRO(0x05) → [match series] → ENDING
 * ============================================================================
 */

import { GameState } from './game-state';
import { SceneType } from './types';

export interface SceneInit {
  /** Scene ID (matches SceneType enum) */
  sceneId: number;
  /** Human-readable name */
  name: string;
  /** PRG bank to load for this scene's script data */
  bank: number;
  /** Script start address (logical CPU address) */
  scriptAddr: number;
  /** Scene description */
  description: string;
}

/**
 * Scene definitions for Captain Tsubasa II.
 *
 * The original game has 33+ scenes, but the core flow uses these 19.
 * Script data is stored in various PRG banks (3, 4, 5, 16, etc.)
 */
export const SCENE_DEFINITIONS: SceneInit[] = [
  {
    sceneId: SceneType.TECMO_LOGO,
    name: 'Tecmo Logo',
    bank: 0,
    scriptAddr: 0x8000,
    description: 'TECMO presents... logo animation',
  },
  {
    sceneId: SceneType.TITLE,
    name: 'Title Screen',
    bank: 0,
    scriptAddr: 0x8000,
    description: 'Captain Tsubasa II title screen',
  },
  {
    sceneId: SceneType.LOAD_GAME,
    name: 'Load Game / Password',
    bank: 0,
    scriptAddr: 0x8000,
    description: 'Password input or new game selection',
  },
  {
    sceneId: SceneType.MAIN_MENU,
    name: 'Main Menu',
    bank: 0,
    scriptAddr: 0x8000,
    description: 'Story mode, exhibition, etc.',
  },
  {
    sceneId: SceneType.STORY_INTRO,
    name: 'Story Introduction',
    bank: 3,
    scriptAddr: 0x8000,
    description: 'Tsubasa meets Roberto, story begins',
  },
  {
    sceneId: SceneType.BRAZIL_LEAGUE,
    name: 'Brazil League Match',
    bank: 3,
    scriptAddr: 0x8000,
    description: 'Match against Sao Paulo or Flamengo',
  },
  {
    sceneId: SceneType.BRAZIL_DIALOG,
    name: 'Brazil League Dialog',
    bank: 3,
    scriptAddr: 0x8000,
    description: 'Dialog before/after Brazil matches',
  },
  {
    sceneId: SceneType.BRAZIL_END,
    name: 'Brazil League Conclusion',
    bank: 3,
    scriptAddr: 0x8000,
    description: 'End of Brazil arc',
  },
  {
    sceneId: SceneType.HIGH_SCHOOL,
    name: 'High School Match',
    bank: 4,
    scriptAddr: 0x8000,
    description: 'National tournament match',
  },
  {
    sceneId: SceneType.HIGH_SCHOOL_DIALOG,
    name: 'High School Dialog',
    bank: 4,
    scriptAddr: 0x8000,
    description: 'Dialog during national tournament',
  },
  {
    sceneId: SceneType.HIGH_SCHOOL_END,
    name: 'High School Conclusion',
    bank: 4,
    scriptAddr: 0x8000,
    description: 'End of national tournament arc',
  },
  {
    sceneId: SceneType.JAPAN_CUP,
    name: 'Japan Cup Match',
    bank: 5,
    scriptAddr: 0x8000,
    description: 'Japan youth tournament match',
  },
  {
    sceneId: SceneType.JAPAN_CUP_DIALOG,
    name: 'Japan Cup Dialog',
    bank: 5,
    scriptAddr: 0x8000,
    description: 'Dialog during Japan Cup',
  },
  {
    sceneId: SceneType.WORLD_YOUTH,
    name: 'World Youth Match',
    bank: 16,
    scriptAddr: 0x8000,
    description: 'World Youth Championship match',
  },
  {
    sceneId: SceneType.WORLD_YOUTH_DIALOG,
    name: 'World Youth Dialog',
    bank: 16,
    scriptAddr: 0x8000,
    description: 'Dialog during World Youth',
  },
  {
    sceneId: SceneType.WORLD_YOUTH_END,
    name: 'World Youth Conclusion',
    bank: 16,
    scriptAddr: 0x8000,
    description: 'End of World Youth arc',
  },
  {
    sceneId: SceneType.ENDING,
    name: 'Game Ending',
    bank: 16,
    scriptAddr: 0x8000,
    description: 'Game ending sequence',
  },
  {
    sceneId: SceneType.FINAL_ENDING,
    name: 'Final Credits',
    bank: 16,
    scriptAddr: 0x8000,
    description: 'Final credits roll',
  },
];

/** Scene ID order for main story progression */
export const STORY_PROGRESSION: number[] = [
  SceneType.TECMO_LOGO,
  SceneType.TITLE,
  SceneType.LOAD_GAME,
  SceneType.MAIN_MENU,
  SceneType.STORY_INTRO,
  SceneType.BRAZIL_LEAGUE,
  SceneType.BRAZIL_DIALOG,
  SceneType.BRAZIL_LEAGUE,    // Second Brazil match
  SceneType.BRAZIL_DIALOG,
  SceneType.BRAZIL_END,
  SceneType.HIGH_SCHOOL,
  SceneType.HIGH_SCHOOL_DIALOG,
  SceneType.HIGH_SCHOOL,
  SceneType.HIGH_SCHOOL_DIALOG,
  SceneType.HIGH_SCHOOL_END,
  SceneType.JAPAN_CUP,
  SceneType.JAPAN_CUP_DIALOG,
  SceneType.JAPAN_CUP,
  SceneType.JAPAN_CUP_DIALOG,
  SceneType.WORLD_YOUTH,
  SceneType.WORLD_YOUTH_DIALOG,
  SceneType.WORLD_YOUTH,
  SceneType.WORLD_YOUTH_DIALOG,
  SceneType.WORLD_YOUTH_END,
  SceneType.ENDING,
  SceneType.FINAL_ENDING,
];

/**
 * Get the scene definition for a given scene ID.
 * Returns a default definition if not found.
 */
export function getSceneDefinition(sceneId: number): SceneInit {
  const def = SCENE_DEFINITIONS.find(d => d.sceneId === sceneId);
  if (def) return def;

  // Fallback: use bank 0, default address
  return {
    sceneId,
    name: `Scene 0x${sceneId.toString(16)}`,
    bank: 0,
    scriptAddr: 0x8000,
    description: 'Unknown scene',
  };
}

/**
 * Initialize game state for a specific scene.
 * Sets up PRG bank, script pointer, and dispatch for scene entry.
 */
export function initScene(state: GameState, sceneId: number): void {
  const def = getSceneDefinition(sceneId);

  state.progress.sceneId = sceneId;
  state.prgBank6 = def.bank;
  state.prgBank7 = def.bank;
  state.scriptPtr = def.scriptAddr;
  state.scriptStatus = 0x80; // Mark new command ready
  state.dispatchIndex = 1;   // Running / bytecode mode
  state.scriptRow = 0;
  state.scriptCol = 0;
  state.scriptRow = 0;
  state.scriptCol = 0;

  // Clear display
  state.nametable0.fill(0);
  state.nametable1.fill(0);
}

/**
 * Get the next scene ID in the story progression.
 * Returns -1 if at the end.
 */
export function getNextScene(currentSceneId: number): number {
  const idx = STORY_PROGRESSION.indexOf(currentSceneId);
  if (idx < 0 || idx >= STORY_PROGRESSION.length - 1) return -1;
  return STORY_PROGRESSION[idx + 1];
}
