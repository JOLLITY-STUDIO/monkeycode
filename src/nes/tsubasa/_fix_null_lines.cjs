/**
 * 修复因 _fix_and_convert.cjs 错误产生的 "null" 行
 * 方法: 从原始 eccbb79 版本中提取对应位置的正确 .byte 数据
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const FILENAME = 'src/tsnes/tsubasa-hex2asm/prg_banks/prg_bank_00_dispatch_scene_engine.ts';
const FILEPATH = path.join(__dirname, FILENAME);

// Step 1: Read current file
let curr = fs.readFileSync(FILEPATH, 'utf8');
let lines = curr.split(/\r?\n/);

// Find null lines
console.log('Finding null lines in current file...');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].trim() === 'null') {
    console.log('Line ' + (i+1) + ': null');
  }
}

// Step 2: Restore original and extract bytes at the neighborhood
execSync('git stash -- "' + FILENAME + '"', { cwd: __dirname });
let orig = fs.readFileSync(FILEPATH, 'utf8');

function getFuncBytes(content, fname) {
  const search = 'function ' + fname + '(';
  let idx = content.indexOf(search);
  if (idx === -1) return null;
  let braceIdx = content.indexOf('{', idx);
  let depth = 0, endIdx = -1;
  for (let i = braceIdx; i < content.length; i++) {
    if (content[i] === '{') depth++;
    if (content[i] === '}') { depth--; if (depth === 0) { endIdx = i; break; } }
  }
  const body = content.slice(braceIdx + 1, endIdx);
  const bytes = [];
  const bm = body.match(/0x([0-9a-fA-F]{2})/g);
  if (bm) bm.forEach(m => bytes.push(parseInt(m.slice(2), 16)));
  const startLine = content.slice(0, idx).split(/\r?\n/).length;
  return { bytes, body, startLine, endIdx };
}

const bhInfo = getFuncBytes(orig, 'buildbytecodeHandlers');
const padInfo = getFuncBytes(orig, 'buildpadding');
console.log('bh bytes: ' + bhInfo.bytes.length + ' starting at line ' + (bhInfo.startLine+1));
console.log('pad bytes: ' + padInfo.bytes.length + ' starting at line ' + (padInfo.startLine+1));

// Step 3: Restore current version
execSync('git stash pop -- "' + FILENAME + '"', { cwd: __dirname });
curr = fs.readFileSync(FILEPATH, 'utf8');
lines = curr.split(/\r?\n/);

// The null lines are at positions within the asm template
// Lines 681 (buildbytecodeHandlers), 823 (buildbytecodeHandlers), 3545, 3547 (buildpadding)
// We need to find the byte offset for each

// For buildbytecodeHandlers: the asm template starts inside the function.
// Count bytes from the start of buildbytecodeHandlers function to each null position

// Since we know the original lines had .byte 0xXX entries in a continuous stream,
// and the converted version has mnemonics + labels, we need to match positions
// by assembling the converted function up to the null line.

// Actually, simpler approach: find the null line's context in the original file
// by matching the surrounding unique instructions.

// Context around line 681 (in original, should be .byte entries in the buildbytecodeHandlers function)
// Current (converted): @E9CA: STX $0564 / RTS / null / .byte $03
// In original, this would be at some offset in the .byte stream

// Context around line 823 (in original):
// Current: @EAEF: / .byte $03 / null / JSR $6005 / ASL $FF
// This is data mixed with code

const H2 = n => n.toString(16).toUpperCase().padStart(2, '0');

// The null lines contain 2-byte branch instructions that target external addresses.
// From the original file, these were just raw bytes in the .byte stream.
// Since we can't easily map positions, let's look up the ROM directly.

// Read ROM
const rom = Array.from(fs.readFileSync('rom.nes').slice(16, 16 + 8192));

// For buildbytecodeHandlers (base $8840, 1709 bytes):
// The ROM bytes at offset $840-$8ED correspond to this function.
// To find the bytes at the null position, we need the exact ROM address.
// Let's map the asm output to ROM by assembling.

// Actually, the simplest: find the ROM bytes that match the surrounding context
// and extract the bytes for the null position.

// For @E9CA context: STX $0564, RTS, null, .byte $03
// STX $0564 = $8E, $64, $05 (STX ABS opcode)
// RTS = $60
// .byte $03 = $03
// So ROM pattern: 8E 64 05 60 xx yy 03
// Search ROM for this pattern

function searchRom(pattern) {
  for (let i = 0; i < rom.length - pattern.length; i++) {
    let match = true;
    for (let j = 0; j < pattern.length; j++) {
      if (pattern[j] !== null && rom[i + j] !== pattern[j]) { match = false; break; }
    }
    if (match) return i;
  }
  return -1;
}

// Match 1: STX $0564, RTS, ??, ??, $03
const off1 = searchRom([0x8E, 0x64, 0x05, 0x60, null, null, 0x03]);
if (off1 >= 0) {
  console.log('\nMatch 1 found at ROM offset $' + off1.toString(16) + ' (addr $' + (0x8000+off1).toString(16) + ')');
  console.log('  ROM bytes: ' + rom.slice(off1, off1+7).map(b=>H2(b)).join(' '));
  console.log('  Branch bytes at offset $' + (off1+4).toString(16) + ': $' + H2(rom[off1+4]) + ' $' + H2(rom[off1+5]));
  
  // BNE opcode = $D0
  const b1 = rom[off1 + 4];
  const b2 = rom[off1 + 5];
  
  // The corresponding line number in the current file (681) → replace "null" with .byte
  const target = 0x8840 + off1 + 4; // guess: this is the target computed by disassembler
  const rel = b2;
  const computedTarget = target + 2 + (rel < 128 ? rel : rel - 256);
  console.log('  Target computed: $' + computedTarget.toString(16));
  
  const newLine = '    .byte $' + H2(b1) + ', $' + H2(b2) + '  ; BNE $' + computedTarget.toString(16).toUpperCase().padStart(4, '0') + ' (cross-function)';
  console.log('  Replacement: ' + newLine);
  
  // Replace the null at line 681
  if (lines[680].trim() === 'null') {
    lines[680] = newLine;
    console.log('  Replaced line 681');
  }
} else {
  console.log('Match 1 NOT FOUND');
}

// Match 2: .byte $03, null, JSR $6005, ASL $FF
// .byte $03 = $03
// JSR $6005 = $20, $05, $60
// ASL $FF = $06, $FF
const off2 = searchRom([0x03, null, null, 0x20, 0x05, 0x60, 0x06, 0xFF]);
if (off2 >= 0) {
  console.log('\nMatch 2 found at ROM offset $' + off2.toString(16) + ' (addr $' + (0x8000+off2).toString(16) + ')');
  console.log('  ROM bytes: ' + rom.slice(off2, off2+8).map(b=>H2(b)).join(' '));
  console.log('  Branch bytes: $' + H2(rom[off2+1]) + ' $' + H2(rom[off2+2]));
  
  const b1 = rom[off2 + 1];
  const b2 = rom[off2 + 2];
  const target = 0x8840 + off2 + 1;
  const rel = b2;
  const computedTarget = target + 2 + (rel < 128 ? rel : rel - 256);
  
  const newLine = '    .byte $' + H2(b1) + ', $' + H2(b2) + '  ; BPL $' + computedTarget.toString(16).toUpperCase().padStart(4, '0') + ' (cross-function)';
  console.log('  Replacement: ' + newLine);
  
  if (lines[822].trim() === 'null') {
    lines[822] = newLine;
    console.log('  Replaced line 823');
  }
} else {
  console.log('Match 2 NOT FOUND');
}

// Match 3: Context around line 3545 (buildpadding)
// BPL @EEE6, null, ... 
// Search for BPL (opcode $10) with context
// From line 3544: BPL @EEE6, line 3545: null, line 3546: @EED8: JSR $3030
// @EED8: label (no bytes), JSR $3030 = $20, $30, $30
const off3 = searchRom([null, null, 0x20, 0x30, 0x30]);
if (off3 >= 0) {
  // The two null bytes before JSR $3030 are the branch
  console.log('\nMatch 3 found at ROM offset $' + off3.toString(16) + ' (addr $' + (0x8000+off3).toString(16) + ')');
  console.log('  ROM bytes: ' + rom.slice(off3, off3+7).map(b=>H2(b)).join(' '));
  console.log('  Branch bytes: $' + H2(rom[off3]) + ' $' + H2(rom[off3+1]));
  
  const b1 = rom[off3];
  const b2 = rom[off3 + 1];
  const target = 0x8FF6 + off3; // buildpadding base
  const rel = b2;
  const computedTarget = target + 2 + (rel < 128 ? rel : rel - 256);
  
  const newLine = '    .byte $' + H2(b1) + ', $' + H2(b2) + '  ; BPL $' + computedTarget.toString(16).toUpperCase().padStart(4, '0') + ' (cross-function)';
  console.log('  Replacement: ' + newLine);
  
  if (lines[3544] && lines[3544].trim() === 'null') {
    lines[3544] = newLine;
    console.log('  Replaced line 3545');
  }
} else {
  console.log('Match 3 NOT FOUND');
}

// Match 4: @EED8: JSR $3030, BMI @EF0D (null?), BMI @EF0F
// JSR $3030 = $20, $30, $30  (already emitted)
// null = BMI bytes
// BMI @EF0F = $30, ?? (the next branch)
// Search: JSR $3030, ??, ??, BMI ??  
const off4 = searchRom([0x20, 0x30, 0x30, null, null, 0x30]);
if (off4 >= 0) {
  console.log('\nMatch 4 found at ROM offset $' + off4.toString(16) + ' (addr $' + (0x8000+off4).toString(16) + ')');
  console.log('  ROM bytes: ' + rom.slice(off4, off4+8).map(b=>H2(b)).join(' '));
  console.log('  Branch bytes: $' + H2(rom[off4+3]) + ' $' + H2(rom[off4+4]));
  
  const b1 = rom[off4 + 3];
  const b2 = rom[off4 + 4];
  const target = 0x8FF6 + off4 + 3;
  const rel = b2;
  const computedTarget = target + 2 + (rel < 128 ? rel : rel - 256);
  
  const newLine = '    .byte $' + H2(b1) + ', $' + H2(b2) + '  ; BMI $' + computedTarget.toString(16).toUpperCase().padStart(4, '0') + ' (cross-function)';
  console.log('  Replacement: ' + newLine);
  
  if (lines[3546] && lines[3546].trim() === 'null') {
    lines[3546] = newLine;
    console.log('  Replaced line 3547');
  }
} else {
  console.log('Match 4 NOT FOUND');
}

// Save
const newContent = lines.join('\n');
fs.writeFileSync(FILEPATH, newContent, 'utf8');
console.log('\nSaved!');
