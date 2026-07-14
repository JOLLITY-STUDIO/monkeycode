// Search for ALL cheat code tables and trigger addresses in the ROM/ASM
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const base = join(__dirname, '..', '20260713');
const rom = readFileSync(join(base, 'Langrisser II (Japan).md'));
const asm = readFileSync(join(base, 'asm/m68k/rom.asm'), 'utf8');
const asmLines = asm.split('\n');

// Button bit definitions (Genesis controller)
const BTN_UP = 0x01;
const BTN_DOWN = 0x02;
const BTN_LEFT = 0x04;
const BTN_RIGHT = 0x08;
const BTN_B = 0x10;
const BTN_C = 0x20;
const BTN_A = 0x40;
const BTN_START = 0x80;

// All known cheat sequences (button press bytes - each press creates a history entry)
const sequences = [
  // Hidden Shop 1: A B A B ↑ ↓ ← → START B
  { name: 'Hidden Shop 1', seq: [BTN_A, 0, BTN_B, 0, BTN_A, 0, BTN_B, 0, BTN_UP, 0, BTN_DOWN, 0, BTN_LEFT, 0, BTN_RIGHT, 0, BTN_START, 0, BTN_B], desc: '兵士配置画面 A B A B ↑ ↓ ← → START B' },
  // Hidden Shop 2: B START → ← ↓ ↑ B A B A ↑ ↓ ← → START (hold START)
  { name: 'True Hidden Shop', seq: [BTN_B, 0, BTN_START, 0, BTN_RIGHT, 0, BTN_LEFT, 0, BTN_DOWN, 0, BTN_UP, 0, BTN_B, 0, BTN_A, 0, BTN_B, 0, BTN_A, 0, BTN_UP, 0, BTN_DOWN, 0, BTN_LEFT, 0, BTN_RIGHT, 0, BTN_START], extraCheck: BTN_START, desc: 'B START → ← ↓ ↑ B A B A ↑ ↓ ← → START(START长按)' },
  // Scenario Select: ← → START C
  { name: 'Scenario Select', seq: [BTN_LEFT, 0, BTN_RIGHT, 0, BTN_START, 0, BTN_C], desc: 'LOAD画面 ← → START C' },
  // Debug Mode: ↑ ← ↑ → A ← ↓ B ↓ → A B ↓ → A
  { name: 'Debug Mode', seq: [BTN_UP, 0, BTN_LEFT, 0, BTN_UP, 0, BTN_RIGHT, 0, BTN_A, 0, BTN_LEFT, 0, BTN_DOWN, 0, BTN_B, 0, BTN_DOWN, 0, BTN_RIGHT, 0, BTN_A, 0, BTN_B, 0, BTN_DOWN, 0, BTN_RIGHT, 0, BTN_A], desc: '地图画面 ↑ ← ↑ → A ← ↓ B ↓ → A B ↓ → A' },
];

console.log('=== 1. Searching ROM binary for ALL cheat sequence byte patterns ===\n');

for (const cheat of sequences) {
  const fullSeq = cheat.seq;
  let found = false;
  for (let i = 0; i < rom.length - fullSeq.length; i++) {
    if (fullSeq.every((b, j) => rom[i + j] === b)) {
      console.log(`✓ "${cheat.name}" found at ROM 0x${i.toString(16).toUpperCase()}`);
      console.log(`  Sequence: ${cheat.desc}`);
      // Show surrounding bytes
      let hex = '';
      for (let j = Math.max(0, i - 4); j < Math.min(rom.length, i + fullSeq.length + 4); j++) {
        hex += rom[j].toString(16).padStart(2, '0') + ' ';
      }
      console.log(`  Hex: ${hex}`);
      if (cheat.extraCheck) {
        console.log(`  Extra check byte: 0x${cheat.extraCheck.toString(16)} (must follow sequence)`);
      }
      found = true;
      break;
    }
  }
  if (!found) {
    console.log(`✗ "${cheat.name}" NOT found as byte sequence in ROM`);
    
    // Try compressed format (without 0x00 between presses - some implementations might just store press bytes)
    const pressOnly = cheat.seq.filter(b => b !== 0);
    let found2 = false;
    for (let i = 0; i < rom.length - pressOnly.length; i++) {
      if (pressOnly.every((b, j) => rom[i + j] === b)) {
        console.log(`  > Found (press-only) at ROM 0x${i.toString(16).toUpperCase()}`);
        found2 = true;
        break;
      }
    }
    if (!found2) {
      console.log(`  > Also NOT found in press-only format`);
    }
  }
  console.log('');
}

// 2. Search ASM for all lea/jsr 008A20 calls (sequence matcher calls)
console.log('=== 2. All sequence matcher invocations in ASM ===\n');

let inChecks = [];
for (let i = 0; i < asmLines.length; i++) {
  const line = asmLines[i];
  if (line.includes('$008A20') || line.includes('loc_008A20')) {
    // Look backwards for lea
    if (i >= 4 && asmLines[i-2] && asmLines[i-2].includes('lea')) {
      inChecks.push({line: i+1, lea: asmLines[i-2].trim(), jsr: line.trim()});
    } else if (i >= 2 && asmLines[i-1] && asmLines[i-1].includes('lea')) {
      inChecks.push({line: i+1, lea: asmLines[i-1].trim(), jsr: line.trim()});
    }
  }
}

for (const c of inChecks) {
  // Show context around the call
  const start = Math.max(0, c.line - 10);
  const end = Math.min(asmLines.length, c.line + 5);
  console.log(`Line ${c.line}, LEA: ${c.lea}`);
  for (let j = start; j < end; j++) {
    console.log(`  ${j+1}: ${asmLines[j].substring(0, 140)}`);
  }
  console.log('');
}

// 3. Search for all cheat tables that might exist near $008600-$008700
console.log('=== 3. All data in cheat table area $008600-$008700 ===\n');

for (let addr = 0x8600; addr < 0x8700; addr += 16) {
  let hexLine = `0x${addr.toString(16).toUpperCase().padStart(6,'0')}: `;
  let asciiLine = '  ';
  for (let j = 0; j < 16; j++) {
    const b = rom[addr + j];
    hexLine += b.toString(16).padStart(2,'0') + ' ';
    asciiLine += (b >= 0x20 && b < 0x7F) ? String.fromCharCode(b) : '.';
  }
  console.log(hexLine + asciiLine);
}

// 4. Check for $00861C table used for toggling $FFFF8174
console.log('\n=== 4. Decoding $00861C table (toggles $FFFF8174) ===');
// From the ASM analysis, $00861C is the first table fed to loc_008A20
// Table format: [word length][bytes...][byte post-condition]
const addr861C = 0x861C;
const len861C = rom[addr861C] * 256 + rom[addr861C + 1];
console.log(`Count word at 0x${addr861C.toString(16)}: ${len861C}`);
let seq861C = [];
for (let j = 0; j < Math.min(len861C, 32); j++) {
  seq861C.push(`0x${rom[addr861C + 2 + j].toString(16)}`);
}
console.log(`Sequence bytes (${len861C}):`, seq861C.join(' '));
if (addr861C + 2 + len861C < rom.length) {
  const post = rom[addr861C + 2 + len861C];
  console.log(`Post-condition byte: 0x${post.toString(16)}`);
}

// 5. Search for sound test (cursor at 2,2 + B held)
console.log('\n=== 5. Searching for sound test implementation ===');
// Look for references to cursor position checks combined with timer/button checks
// Cursor position is typically at $FFFFA6DE / $FFFFA6E0
// Or $FFFFA5B0 / $FFFFA5B2
const csrPatterns = [
  { addr: 'FFFFA6DE', name: 'cursorX' },
  { addr: 'FFFFA6E0', name: 'cursorY' },
  { addr: 'FFFFA5B0', name: 'cursorX_alt' },
  { addr: 'FFFFA5B2', name: 'cursorY_alt' },
  { addr: 'FFFFA984', name: 'cursor_menu' },
];

let csrLines = [];
for (let i = 0; i < asmLines.length; i++) {
  const line = asmLines[i];
  for (const p of csrPatterns) {
    if (line.includes(p.addr)) {
      csrLines.push({line: i+1, addr: p.addr, name: p.name, content: line.substring(0, 140)});
    }
  }
}
// Check for B button + timer patterns
let timerLines = [];
for (let i = 0; i < asmLines.length; i++) {
  const line = asmLines[i];
  if (line.includes('btst') && line.includes('#4') && (line.includes('d0') || line.includes('D0'))) {
    // B button check - look for nearby timer/counter
    const ctx = [];
    for (let j = Math.max(0, i - 5); j < Math.min(asmLines.length, i + 15); j++) {
      ctx.push(`${j+1}: ${asmLines[j].substring(0, 140)}`);
      // check if there are timer-like increments or compares nearby
      if (asmLines[j].includes('addq') || asmLines[j].includes('addi') || asmLines[j].includes('subq')) {
        timerLines.push({line: j+1, context: ctx.join('\n  ')});
        break;
      }
    }
  }
}

console.log('Cursor-related code references (first 20):');
for (const cl of csrLines.slice(0, 20)) {
  console.log(`  L${cl.line} [${cl.name}]: ${cl.content}`);
}
console.log(`\nB-button+timer code snippets (${timerLines.length} found):`);
for (const tl of timerLines.slice(0, 10)) {
  console.log(`\n  Near L${tl.line}:`);
  console.log(`  ${tl.context}`);
}

// 6. Search ASM for "sound" / "Sound" in comments
console.log('\n=== 6. Searching for sound test references ===');
let soundRefs = [];
for (let i = 0; i < asmLines.length; i++) {
  const line = asmLines[i].toLowerCase();
  if (line.includes('sound') || line.includes('snd') || line.includes('bgm') || line.includes('music')) {
    if (!line.startsWith(';') || (line.includes('sound') && line.includes('test'))) {
      soundRefs.push({line: i+1, content: asmLines[i].substring(0, 140)});
    }
    if (soundRefs.length >= 20) break;
  }
}
for (const sr of soundRefs) {
  console.log(`  L${sr.line}: ${sr.content}`);
}

// 7. Check $FFFF8174 and $FFFF8176 flag reads (the toggled debug flags)
console.log('\n=== 7. References to $FFFF8174 and $FFFF8176 ===');
let flagRefs = [];
for (let i = 0; i < asmLines.length; i++) {
  const line = asmLines[i];
  if (line.includes('$FFFF8174') || line.includes('$FFFF8176')) {
    flagRefs.push({line: i+1, content: line.substring(0, 140)});
    if (flagRefs.length >= 30) break;
  }
}
for (const fr of flagRefs) {
  console.log(`  L${fr.line}: ${fr.content}`);
}

// 8. Search Ghidra decompile for debug/cheat related functions
console.log('\n=== 8. Ghidra C references to cheat-related ===');
try {
  const ghidra = readFileSync(join(__dirname, '..', 'ghidra-decompile.c'), 'utf8');
  const ghidraLines = ghidra.split('\n');
  let debugRefs = [];
  for (let i = 0; i < ghidraLines.length; i++) {
    const line = ghidraLines[i];
    if (line.includes('0x8174') || line.includes('0x8176') || line.includes('0xA6DC') || line.includes('0xA6DA') || line.includes('0x8188') || line.includes('0x81A7')) {
      debugRefs.push({line: i+1, content: line.substring(0, 200)});
      if (debugRefs.length >= 30) break;
    }
  }
  for (const dr of debugRefs) {
    console.log(`  G${dr.line}: ${dr.content}`);
  }
} catch (e) {
  console.log(`  Error reading ghidra: ${e.message}`);
}

console.log('\n=== DONE ===');
