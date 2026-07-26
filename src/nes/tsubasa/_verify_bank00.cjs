/**
 * 验证 bank_00 生成的字节与 ROM 一致
 * 通过提取函数体中的 0x 字节和汇编字节来重建
 */
const fs = require('fs');
const path = require('path');

const ROM_PATH = 'rom.nes';
const SRC_PATH = path.join(__dirname, 'src', 'tsnes', 'tsubasa-hex2asm', 'prg_banks', 'prg_bank_00_dispatch_scene_engine.ts');

const rom = fs.readFileSync(ROM_PATH);
const expected = Array.from(rom.slice(16, 16 + 8192));
const src = fs.readFileSync(SRC_PATH, 'utf8');

// Functions in assembly order
const order = ['builddispatch', 'buildjumpVectors', 'buildsceneLoop',
  'buildscriptEngine', 'builddataTables', 'buildsceneTables',
  'buildbytecodeHandlers', 'buildscheduler', 'buildcontextSave', 'buildpadding'];

function getFuncBytes(fname) {
  const search = 'function ' + fname + '(';
  let idx = src.indexOf(search);
  if (idx === -1) return [];
  let braceIdx = src.indexOf('{', idx);
  let depth = 0, endIdx = -1;
  for (let i = braceIdx; i < src.length; i++) {
    if (src[i] === '{') depth++;
    if (src[i] === '}') { depth--; if (depth === 0) { endIdx = i; break; } }
  }
  const body = src.slice(braceIdx + 1, endIdx);
  
  // Extract 0xXX bytes (for functions still using raw byte format)
  const byteMatches = body.match(/0x([0-9a-fA-F]{2})/g) || [];
  const result = byteMatches.map(m => parseInt(m.slice(2), 16));
  
  if (result.length === 0) {
    // This function uses asm mnemonics - we can't extract bytes directly
    // Mark as "needs assembly"
    return { needsAsm: true, name: fname, bodyLen: body.length };
  }
  return result;
}

let totalMnemonic = 0;
let totalRaw = 0;
const issues = [];

for (const fname of order) {
  const result = getFuncBytes(fname);
  if (result.needsAsm) {
    totalMnemonic++;
    console.log(fname + ': MNEMONIC (needs asm assembly, ' + result.bodyLen + ' chars)');
  } else {
    totalRaw += result.length;
    console.log(fname + ': ' + result.length + ' raw bytes');
  }
}

console.log('\nTotal: ' + totalRaw + ' raw bytes, ' + totalMnemonic + ' mnemonic functions');
console.log('Raw byte total vs bank size: ' + totalRaw + ' / 8192');

// Quick check: find each raw function's bytes in ROM
const rawFuncs = order.filter(fname => !getFuncBytes(fname).needsAsm);
console.log('\n--- Verifying raw-byte functions in ROM ---');
let allMatch = true;
for (const fname of rawFuncs) {
  const bytes = getFuncBytes(fname);
  if (bytes.length === 0) continue;
  
  const search = bytes.slice(0, 8);
  let found = false;
  for (let i = 0; i < expected.length - search.length; i++) {
    let match = true;
    for (let j = 0; j < search.length; j++) {
      if (expected[i + j] !== search[j]) { match = false; break; }
    }
    if (match) {
      const romAddr = 0x8000 + i;
      // Full verify
      let mismatch = -1;
      for (let k = 0; k < bytes.length && (i + k) < expected.length; k++) {
        if (expected[i + k] !== bytes[k]) { mismatch = k; break; }
      }
      const status = mismatch >= 0 ? 'MISMATCH at byte ' + mismatch : 'OK';
      if (mismatch >= 0) allMatch = false;
      console.log('  ' + fname + ': $' + romAddr.toString(16) + ' - ' + status);
      if (mismatch >= 0) {
        console.log('    Expected: 0x' + expected[i+mismatch].toString(16) + ' Got: 0x' + bytes[mismatch].toString(16));
        console.log('    Context: ' + bytes.slice(mismatch-5, mismatch+5).map(b => b.toString(16).padStart(2,'0')).join(' '));
      }
      found = true;
      break;
    }
  }
  if (!found) console.log('  ' + fname + ': NOT FOUND in ROM');
}

if (allMatch) {
  console.log('\nAll raw-byte functions VERIFIED against ROM!');
}

// Check for overlap/gaps
console.log('\n--- Address coverage ---');
