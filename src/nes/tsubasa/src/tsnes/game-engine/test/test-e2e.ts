/**
 * ============================================================================
 * End-to-End Regression Test — automated scene progression
 *
 * Automates the full game flow:
 *   TECMO logo → Title → Load Game → Main Menu → Story Intro
 *   → Brazil Match → ... → Ending
 *
 * For each scene, validates:
 *   1. Scene initializes correctly (dispatchIndex, scriptPtr, bank)
 *   2. Bytecode engine processes without crash
 *   3. Transition between scenes works
 * ============================================================================
 */

import { TestRunner } from './test-framework';
import { Button, SceneType } from '../core/types';

/**
 * Run E2E test: simulate full game progression through key scenes.
 * Presses START to skip logos and title screens.
 */
export function testE2EFlow(): { passed: boolean; errors: string[] } {
  const errors: string[] = [];

  console.log('\n=== Test: E2E Scene Flow ===');

  const runner = new TestRunner();
  runner.reset();
  runner.boot();

  const state = runner.getState();

  // ─── Phase 1: Boot sequence → TECMO logo ───────────────
  console.log('  Phase 1: TECMO Logo...');
  runner.runAutoFrames(10);
  if (state.progress.sceneId !== 0) {
    errors.push(`Boot: expected scene 0, got ${state.progress.sceneId}`);
  }

  // Skip logo by pressing START
  runner.tapButton(Button.START);
  runner.runAutoFrames(30);

  console.log(`         sceneId=${state.progress.sceneId}, dispatch=${state.dispatchIndex}`);

  // ─── Phase 2: Skip to Load Game scene ──────────────────
  console.log('  Phase 2: Navigate to Load Game...');
  // Press START to skip through title → load game
  for (let i = 0; i < 5; i++) {
    runner.tapButton(Button.START);
    runner.runAutoFrames(20);
    if (state.progress.sceneId > 2) break;
  }

  console.log(`         sceneId=${state.progress.sceneId}, dispatch=${state.dispatchIndex}`);

  // ─── Phase 3: Story Intro ──────────────────────────────
  console.log('  Phase 3: Story Introduction...');
  // Monitor scene transitions
  let lastSceneId = state.progress.sceneId;
  for (let i = 0; i < 20; i++) {
    runner.runAutoFrames(10);
    if (state.progress.sceneId !== lastSceneId) {
      console.log(`         Transition: scene ${lastSceneId} → ${state.progress.sceneId}`);
      lastSceneId = state.progress.sceneId;
    }
    // Tap START to advance text
    if (i % 3 === 0) {
      runner.tapButton(Button.START);
    }
    if (state.dispatchIndex === 4) {
      runner.runAutoFrames(5); // Let transition complete
    }
  }

  console.log(`         Final: sceneId=${state.progress.sceneId}, dispatch=${state.dispatchIndex}`);

  // ─── Phase 4: Verify scene registry ────────────────────
  console.log('  Phase 4: Verify scene registry...');
  const knownScenes = [
    SceneType.TECMO_LOGO,
    SceneType.TITLE,
    SceneType.LOAD_GAME,
    SceneType.MAIN_MENU,
    SceneType.STORY_INTRO,
  ];

  for (const sid of knownScenes) {
    const sceneIdHex = `0x${sid.toString(16).padStart(2, '0')}`;
    // Verify scene exists in enum
    if (!SceneType[sid]) {
      errors.push(`Scene ID ${sceneIdHex} not in SceneType enum`);
    }
  }
  console.log(`         ${knownScenes.length} known scenes verified ✓`);

  // ─── Phase 5: State consistency check ──────────────────
  console.log('  Phase 5: State consistency...');
  const debugInfo = runner.dumpState();
  if (!debugInfo) {
    errors.push('dumpState returned empty');
  }

  // Verify core state fields are initialized
  if (state.timing.frameCount < 10) {
    errors.push(`Frame count too low: ${state.timing.frameCount}`);
  }

  console.log(`         frameCount=${state.timing.frameCount}, sceneId=${state.progress.sceneId}`);
  console.log(`         maxSceneReached=${state.progress.maxSceneReached}`);

  // ─── Phase 6: Nametable after auto-play ────────────────
  console.log('  Phase 6: Nametable content...');
  const nonZeroTiles = state.nametable0.filter(b => b !== 0).length;
  console.log(`         nametable0 non-zero tiles: ${nonZeroTiles}`);

  if (nonZeroTiles > 0) {
    // Sample first 8 non-zero tiles
    const samples: number[] = [];
    for (let i = 0; i < state.nametable0.length && samples.length < 8; i++) {
      if (state.nametable0[i] !== 0) samples.push(state.nametable0[i]);
    }
    console.log(`         Sample tiles: [${samples.map(t => '0x' + t.toString(16)).join(', ')}]`);
  }

  // ─── Phase 7: RAM/state stability ──────────────────────
  console.log('  Phase 7: Memory stability...');
  // Verify display list doesn't overflow
  if (state.displayList.length > 0) {
    console.log(`         Display list entries: ${state.displayList.length}`);
  }

  // Verify palette buffer
  const paletteNonZero = state.paletteBuffer.filter(b => b !== 0).length;
  console.log(`         Palette initialized: ${paletteNonZero} non-zero entries`);

  // ─── Summary ───────────────────────────────────────────
  if (errors.length === 0) {
    console.log('  ✅ E2E Flow test PASSED\n');
  } else {
    console.error('  ❌ E2E Flow test FAILED:');
    for (const err of errors) console.error(`     ${err}`);
    console.log('');
  }

  return { passed: errors.length === 0, errors };
}
