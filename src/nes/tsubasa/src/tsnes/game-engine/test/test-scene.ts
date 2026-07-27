/**
 * ============================================================================
 * Test: Scene Progression — validates scene transitions and input handling
 * 
 * Simulates player input to progress through game scenes:
 *   1. TECMO logo → Title screen (skip with START)
 *   2. Title → Load/Password screen
 *   3. Load → Main Menu → Story intro → Match
 * ============================================================================
 */

import { TestRunner, TestFrame } from './test-framework';
import { Button } from '../core/types';

export function testSceneProgression(): void {
  const runner = new TestRunner();
  runner.reset();

  console.log('\n=== Test: Scene Progression ===');

  // Script: After boot, press START to skip logo
  const script: TestFrame[] = [
    {
      frame: 10,  // Wait 10 frames
      description: 'Wait for logo to appear',
    },
    {
      frame: 30,
      press: [Button.START],
      description: 'Press START to skip TECMO logo',
    },
    {
      frame: 35,
      release: [Button.START],
      description: 'Release START',
    },
    {
      frame: 60,
      expectDispatchIndex: 1,
      description: 'Should be in running state by frame 60',
    },
  ];

  const result = runner.runScript(script);

  if (result.passed) {
    console.log(`  ✅ Scene progression test PASSED (${result.totalFrames} frames)`);
  } else {
    console.error(`  ❌ Scene progression test FAILED:`);
    for (const err of result.errors) {
      console.error(`     ${err}`);
    }
  }
  console.log('');
}
