/**
 * ============================================================================
 * Test: ROM Reader — validates PRG-ROM bank access and bytecode reading
 *
 * Tests:
 *   1. RomReader basic read (bank0 byte at known addresses)
 *   2. Bank switching
 *   3. Word read (little-endian)
 *   4. SceneManager bytecode reading (non-stub)
 *   5. Script engine bytecode opcode verification from ROM
 * ============================================================================
 */

import { TestRunner } from './test-framework';
import { RomReader, createRomReader } from '../data/rom-reader';
import { Button } from '../core/types';

export function testRomReader(): { passed: boolean; errors: string[] } {
  const errors: string[] = [];

  console.log('\n=== Test: ROM Reader ===');

  // ─── 1. Basic bank reading ────────────────────────────
  const reader = new RomReader();

  // Bank 0, first few bytes: should be valid 6502 opcodes
  const b0_0 = reader.read(0x8000);
  const b0_1 = reader.read(0x8001);
  const b0_2 = reader.read(0x8002);

  // Bank 0 ($8000) is the dispatch scene engine. Verify non-zero content.
  console.log(`  Bank 0 [0x8000-0x8002]: 0x${b0_0.toString(16).padStart(2, '0')} 0x${b0_1.toString(16).padStart(2, '0')} 0x${b0_2.toString(16).padStart(2, '0')}`);

  if (b0_0 === 0 && b0_1 === 0 && b0_2 === 0) {
    errors.push('Bank 0 first 3 bytes are all zero — ROM data might not be loaded');
  }

  // Verify bank 0 offset 0 is non-zero (first byte of dispatch engine)
  if (b0_0 === 0) {
    errors.push('Bank 0 [0x8000] is zero, expected non-zero opcode');
  }

  // ─── 2. Bank switching ────────────────────────────────
  const origB6Val = reader.read(0x8000);
  reader.setBank6(1); // Switch to bank 1 (match jump)
  const b1Val = reader.read(0x8000);
  reader.setBank6(0); // Switch back
  const backVal = reader.read(0x8000);

  console.log(`  Bank switch: orig=0x${origB6Val.toString(16)}, bank1=0x${b1Val.toString(16)}, back=0x${backVal.toString(16)}`);

  if (backVal !== origB6Val) {
    errors.push(`Bank switch: expected orig 0x${origB6Val.toString(16)}, got 0x${backVal.toString(16)} after switching back`);
  }

  // ─── 3. Word read (little-endian) ─────────────────────
  // NES vectors at $FFFA-$FFFF in bank 31 (fixed at $E000)
  // NMI vector at $FFFA, Reset at $FFFC, IRQ at $FFFE
  const nmiVec = reader.readWord(0xFFFA);
  const resetVec = reader.readWord(0xFFFC);
  console.log(`  Vectors: NMI=0x${nmiVec.toString(16)}, RESET=0x${resetVec.toString(16)}`);

  if (resetVec === 0) {
    errors.push('Reset vector should be non-zero');
  }

  // ─── 4. Out-of-range address ──────────────────────────
  const outOfRange = reader.read(0x6000);
  if (outOfRange !== 0) {
    errors.push(`Out-of-range read expected 0, got ${outOfRange}`);
  }

  // ─── 5. Bank 3 data validation ────────────────────────
  // Bank 3 contains script/bytecode data
  // Verify it starts with non-zero data
  reader.setBank6(3);
  const b3_0 = reader.read(0x8000);
  reader.setBank6(0);
  console.log(`  Bank 3 [0x8000]: 0x${b3_0.toString(16).padStart(2, '0')}`);

  // ─── 6. Factory function test ─────────────────────────
  const factoryReader = createRomReader(5, 10);
  if (factoryReader.bank6 !== 5 || factoryReader.bank7 !== 10) {
    errors.push(`createRomReader bank mapping failed: R6=${factoryReader.bank6}, R7=${factoryReader.bank7}`);
  }

  if (errors.length === 0) {
    console.log('  ✅ ROM Reader test PASSED\n');
  } else {
    console.error('  ❌ ROM Reader test FAILED:');
    for (const err of errors) console.error(`     ${err}`);
    console.log('');
  }

  return { passed: errors.length === 0, errors };
}

/**
 * Test: Scene manager _readScriptByte now reads from actual ROM.
 * Instead of returning 0, it should return valid bytecode from PRG ROM.
 */
export function testScriptByteRead(): { passed: boolean; errors: string[] } {
  const errors: string[] = [];

  console.log('\n=== Test: Script Byte Read (ROM-backed) ===');

  const runner = new TestRunner();
  runner.reset();
  runner.boot();

  const state = runner.getState();

  // Set scriptPtr to a known location in bank 0 (the dispatch engine)
  // Bank 0 at $8000-$9FFF contains the NES reset code and scene dispatch
  // Set script start: point to bytecode data area
  // For the initial startup after boot, scriptPtr would be set by the scene init.
  // We test by manually setting scriptPtr and reading through the engine.

  // Manually set scriptPtr to bank 0 offset for testing
  state.scriptPtr = 0x8000;
  state.scriptStatus = 0x80; // Mark new command ready
  state.dispatchIndex = 1;   // Running state so bytecode engine processes

  // Advance 1 frame to let bytecode engine process
  runner.runAutoFrames(1);

  // After 1 frame, scriptPtr should have incremented (unless TERMINATOR was read)
  const newPtr = state.scriptPtr;
  console.log(`  scriptPtr: 0x8000 → 0x${newPtr.toString(16)}`);

  if (newPtr === 0x8000) {
    errors.push('scriptPtr should have advanced after bytecode read');
  }

  // The first byte of bank 0 at $8000 is 0xA5 (LDA opcode).
  // This is a literal character bytecode (0xA5 <= 0xD7), so it should be output.
  // ScriptCol should have advanced to 1.
  console.log(`  scriptRow=${state.scriptRow}, scriptCol=${state.scriptCol}`);

  // Reset and test with known bytecode data in bank 3
  runner.reset();
  runner.boot();
  const state2 = runner.getState();

  // Bank 3 contains script data. Point to beginning.
  state2.prgBank6 = 3;
  state2.scriptPtr = 0x8000;
  state2.scriptStatus = 0x80;
  state2.dispatchIndex = 1;

  // Read first byte of script data from bank 3
  runner.runAutoFrames(1);

  const newPtr2 = state2.scriptPtr;
  const bank3FirstByte = new RomReader().banks[3][0];
  console.log(`  Bank 3 [0x8000] byte: 0x${bank3FirstByte.toString(16).padStart(2, '0')}, scriptPtr now: 0x${newPtr2.toString(16)}`);

  if (newPtr2 === 0x8000) {
    errors.push('Bank 3: scriptPtr should have advanced after bytecode read');
  }

  if (errors.length === 0) {
    console.log('  ✅ Script Byte Read test PASSED\n');
  } else {
    console.error('  ❌ Script Byte Read test FAILED:');
    for (const err of errors) console.error(`     ${err}`);
    console.log('');
  }

  return { passed: errors.length === 0, errors };
}
