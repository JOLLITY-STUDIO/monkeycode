/**
 * ============================================================================
 * Test: Boot Sequence — validates the game cold-boot flow
 * 
 * Verifies that after boot:
 *   1. Game state is properly initialized
 *   2. Scene ID is 0 (TECMO logo)
 *   3. Dispatching works correctly
 *   4. Frame counter increments
 * ============================================================================
 */

import { TestRunner } from './test-framework';
import { Button } from '../core/types';

export function testBootSequence(): void {
  const runner = new TestRunner();

  console.log('\n=== Test: Boot Sequence ===');

  // Boot the game
  runner.reset();
  runner.boot();

  const state = runner.getState();
  console.log(`  Scene ID after boot: ${state.progress.sceneId}`);
  console.log(`  Dispatch index: ${state.dispatchIndex}`);
  console.log(`  PRG Bank R6: ${state.prgBank6}`);
  console.log(`  PRG Bank R7: ${state.prgBank7}`);

  // Verify boot state
  let errors: string[] = [];

  if (state.progress.sceneId !== 0) {
    errors.push(`Expected scene 0, got ${state.progress.sceneId}`);
  }
  if (state.dispatchIndex !== 0) {
    errors.push(`Expected dispatch 0, got ${state.dispatchIndex}`);
  }
  if (state.prgBank6 !== 0) {
    errors.push(`Expected PRG bank R6=0, got ${state.prgBank6}`);
  }
  if (state.timing.frameCount !== 0) {
    errors.push(`Expected frame count 0, got ${state.timing.frameCount}`);
  }

  // Run 1 frame auto
  runner.runAutoFrames(1);
  console.log(`  After 1 frame — frame count: ${state.timing.frameCount}`);
  if (state.timing.frameCount !== 1) {
    errors.push(`Expected frame count 1, got ${state.timing.frameCount}`);
  }

  // Run 60 more frames (1 second at 60fps)
  runner.runAutoFrames(60);
  console.log(`  After 61 frames — frame count: ${state.timing.frameCount}`);
  console.log(`  Scene ID: ${state.progress.sceneId}`);
  console.log(`  Dispatch index: ${state.dispatchIndex}`);

  if (errors.length === 0) {
    console.log('  ✅ Boot sequence test PASSED\n');
  } else {
    console.error('  ❌ Boot sequence test FAILED:');
    for (const err of errors) {
      console.error(`     ${err}`);
    }
    console.log('');
  }
}
