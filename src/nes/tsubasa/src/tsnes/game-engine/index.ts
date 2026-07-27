/**
 * ============================================================================
 * Tsubasa H5 Game Engine — Barrel Export
 * 
 * The complete API surface for the H5 port of Captain Tsubasa II.
 * 
 * Usage:
 *   import { WebGameAdapter } from './game-engine';
 *   import { TestRunner } from './game-engine';
 *   import { GameState, Button } from './game-engine';
 * ============================================================================
 */

// ─── Core ──────────────────────────────────────────────────
export { GameState } from './core/game-state';
export { GameLoop } from './core/game-loop';
export { InputManager } from './core/input-manager';
export { SceneManager } from './core/scene-manager';
export { MatchEngine, MatchPhase } from './core/match-engine';
export type { MatchResult } from './core/match-engine';

// ─── Types ─────────────────────────────────────────────────
export {
  // Player / Team
  PlayerStats, Player, PlayerPosition, Team, Formation,
  // Game Progress
  GameProgress,
  // Input
  Button, InputState,
  // Scene
  SceneType, SceneState,
  // Script
  BytecodeOp,
  // Display
  DisplayListEntry, TileData,
  // Audio
  AudioCommand,
  // Frame Timing
  FrameTiming,
  // Config
  EngineConfig,
} from './core/types';

// ─── Render ────────────────────────────────────────────────
export { CanvasRenderer } from './render/canvas-renderer';

// ─── Data ──────────────────────────────────────────────────
export { ChrTileStore, getDefaultTileStore } from './data/chr-tiles';
export type { DecodedTile } from './data/chr-tiles';

export { RomReader, getDefaultRomReader, createRomReader } from './data/rom-reader';

// ─── Adapters ──────────────────────────────────────────────
export { WebGameAdapter, startWebGame } from './adapters/web-adapter';
export type { WebGameOptions } from './adapters/web-adapter';

export { MpGameAdapter, renderGamepadOverlay } from './adapters/mp-adapter';
export type { MpCanvas, MpCanvasContext, MpTouchEvent, MpGameOptions } from './adapters/mp-adapter';

// ─── Test ──────────────────────────────────────────────────
export { TestRunner } from './test/test-framework';
export type { TestFrame, TestResult } from './test/test-framework';

export { testBootSequence } from './test/test-boot';
export { testSceneProgression } from './test/test-scene';
export { testInputManager } from './test/test-input';
export { testScriptEngine } from './test/test-script';
export { testRomReader, testScriptByteRead } from './test/test-rom-reader';
export { testBytecodeEngine } from './test/test-bytecode-engine';
export { testDialogSystem } from './test/test-dialog';
export { testMatchEngine } from './test/test-match';
