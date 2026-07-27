/**
 * ============================================================================
 * Test: Input Manager — validates key bindings and button state logic
 * ============================================================================
 */

import { TestRunner } from './test-framework';
import { Button } from '../core/types';

export function testInputManager(): void {
  const runner = new TestRunner();
  runner.reset();

  console.log('\n=== Test: Input Manager ===');
  const state = runner.getState();
  let errors: string[] = [];

  // Test: initial state should be empty
  if (state.input.current !== 0) {
    errors.push(`Initial input should be 0, got ${state.input.current}`);
  }

  // Test: tap a button
  runner.tapButton(Button.START);
  runner.runAutoFrames(1);
  if (state.input.current !== 0) {
    errors.push(`After release, current should be 0, got ${state.input.current}`);
  }

  // Test: hold a button
  runner.holdButton(Button.A, 5);
  runner.runAutoFrames(1);
  if ((state.input.current & Button.A) === 0) {
    errors.push('Button A should still be held');
  }

  if (errors.length === 0) {
    console.log('  ✅ Input manager test PASSED\n');
  } else {
    console.error('  ❌ Input manager test FAILED:');
    for (const err of errors) console.error(`     ${err}`);
    console.log('');
  }
}
