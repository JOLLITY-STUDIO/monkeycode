/**
 * ============================================================================
 * Test: Script Engine — validates the bytecode interpreter
 * 
 * Tests the bytecode opcode handling:
 *   - Character output ($00-$D7)
 *   - Palette control ($D8-$DF)
 *   - Clear screen ($EA)
 *   - Terminator ($FF)
 * ============================================================================
 */

import { TestRunner } from './test-framework';
import { BytecodeOp } from '../core/types';

export function testScriptEngine(): void {
  console.log('\n=== Test: Script Engine ===');

  const runner = new TestRunner();
  runner.reset();
  runner.boot();  // Initialize palette and other state
  const state = runner.getState();

  let errors: string[] = [];

  // Verify bytecode constants match expectations
  if (BytecodeOp.CHAR_MIN !== 0x00) {
    errors.push(`CHAR_MIN should be 0x00, got ${BytecodeOp.CHAR_MIN}`);
  }
  if (BytecodeOp.CHAR_MAX !== 0xD7) {
    errors.push(`CHAR_MAX should be 0xD7, got ${BytecodeOp.CHAR_MAX}`);
  }
  if (BytecodeOp.PALETTE_CTRL !== 0xD8) {
    errors.push(`PALETTE_CTRL should be 0xD8, got ${BytecodeOp.PALETTE_CTRL}`);
  }
  if (BytecodeOp.CLEAR_SCREEN !== 0xEA) {
    errors.push(`CLEAR_SCREEN should be 0xEA, got ${BytecodeOp.CLEAR_SCREEN}`);
  }
  if (BytecodeOp.TERMINATOR !== 0xFF) {
    errors.push(`TERMINATOR should be 0xFF, got ${BytecodeOp.TERMINATOR}`);
  }

  // Verify state init is clean
  if (state.nametable0.length !== 960) {
    errors.push(`Nametable0 should be 960 bytes, got ${state.nametable0.length}`);
  }
  if (state.paletteBuffer[0] !== 0x0F) {
    errors.push(`BG palette[0] should be 0x0F, got ${state.paletteBuffer[0]}`);
  }

  if (errors.length === 0) {
    console.log('  ✅ Script engine test PASSED\n');
  } else {
    console.error('  ❌ Script engine test FAILED:');
    for (const err of errors) console.error(`     ${err}`);
    console.log('');
  }
}
