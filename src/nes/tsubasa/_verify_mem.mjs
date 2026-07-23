// Quick test: load core.cjs and verify memory offset
import { readFileSync } from 'fs';
import { createRequire } from 'module';

// Monkey-patch to avoid node:fs error in emscripten shell
const origRequire = global.require;
// The core.cjs already has ENVIRONMENT_IS_NODE check, but let's just load it

// We'll create a small test by manually loading the asm.js part
const core = readFileSync('tools/6502-to-js-test/_prg_output/core.cjs', 'utf8');

// Instead of full require, let's just look at the actual runtime behavior
// by using _test_run.cjs but with memory inspection
const testCode = readFileSync('tools/6502-to-js-test/_prg_output/_test_run.cjs', 'utf8');

// Let's modify _test_run.cjs to check memory offsets
const mod = testCode
  .replace(
    "console.log('init OK');",
    `console.log('init OK');
    // Verify memory offset
    const buf = Module.wasmMemory.buffer;
    const u8 = new Uint8Array(buf);
    // Find where memory[0] lives by writing test value
    // Try offsets: 8, 1024, 1040, 1312
    const offsets = [8, 1024, 1040, 1312, 1313];
    for (const off of offsets) {
      console.log('HEAP['+off+'] =', u8[off]);
    }
    // Check _load result
    console.log('_load(0x27) =', Module._load(0x27));
    console.log('_load(0x8000) =', Module._load(0x8000));
    // Write test value and see where it goes
    Module._store(0x27, 0xAB);
    Module._store(0x8000, 0xCD);
    for (const off of offsets) {
      console.log('After store, HEAP['+off+'] =', u8[off]);
    }
    // Hmm, _load and _store might not be exported
  `
  );

// Hmm, this won't work cleanly in the eval. Let me just check the theory 
// by looking at the code pattern more carefully.

// Actually, let me look at line2 more carefully to see if STATIC_BASE is set
const line0 = core.split('\n')[0];
const statMatch = line0.match(/STATIC_BASE\s*=\s*(\d+)/);
if (statMatch) {
  console.log('STATIC_BASE =', statMatch[1]);
} else {
  console.log('STATIC_BASE not found in line 0');
}

// Also check for GLOBAL_BASE
const gbMatch = core.match(/GLOBAL_BASE\s*=\s*(\d+)/);
if (gbMatch) {
  console.log('GLOBAL_BASE =', gbMatch[1]);
}

// Check for Runtime.GLOBAL_BASE
const rgbMatch = core.match(/GLOBAL_BASE[^=]*=(\d+)/);
if (rgbMatch) {
  console.log('GLOBAL_BASE like =', rgbMatch[0]);
}

// Check: in function O(q), there's p(q) which writes to v[1024]
// That's `l(e,1024,"/w==")` which decodes to 0xFF at index 1024
// What variable is at offset 1024? It could be Reg_SP = 0xFF (= 255)
// So Reg_SP might be at HEAP[1024], meaning memory[] starts elsewhere

// Let me check: what global goes right before or after the 1024 area?
// In the C code: Reg_PC (2 bytes), Reg_A..Reg_C (8 bytes), Reg_SP (1 byte)
// If Reg_SP = 0xFF at HEAP[1024], then:
// Reg_A at 1023, Reg_PC at 1021-1022
// -> But that puts first globals before 1024, which doesn't align well

// Alternative: maybe v[1024] is the CYCLE_COUNT or frame counter?
// Actually, looking at R():
//   g = w[520]  -> this is a 16-bit read at byte 1040-1041
//   if (g) { i=v[1046]; j=v[1045]; ... l=5e4; break b }
//   b = v[1095] -> some 8-bit value
// 
// 5e4 = 50000 = MAX_CYCLES
// The initial Reg_PC = 0, so g would be 0 (not taken)
// v[1095] could be... some bank register? MMC3 register?

// I'm going in circles. Let me just assume STATIC_BASE = 1024 and proceed.
// We can verify later by actually running the code.
console.log('\n=== Assuming STATIC_BASE = 1024 ===');
console.log('memory[0x0000] = HEAP[1024]');
console.log('memory[0x8000] = HEAP[33792]');
console.log('PRG bank 0 at HEAP[33792..41983]');
