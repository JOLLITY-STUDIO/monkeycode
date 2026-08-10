// Quick diagnostic: BGM00 data layout and track contents
const fs = require('fs');
const path = require('path');

// Read BGM00.ts as text
const f = fs.readFileSync(path.join(__dirname, 'mini-audio/bgm-data/BGM00.ts'), 'utf-8');

// Extract numbers from the RAW array
const rawMatch = f.match(/BGM00_RAW[\s\S]*?\[\s*([\s\S]*?)\s*\];/m);
if (!rawMatch) { console.log('Cannot find BGM00_RAW'); process.exit(1); }
const rawNums = rawMatch[1].split(/,|\s/).filter(x => x.trim()).map(x => {
  const m = x.match(/0x([0-9a-fA-F]+)/);
  return m ? parseInt(m[1], 16) : parseInt(x);
}).filter(x => !isNaN(x));

const RAW = new Uint8Array(rawNums);
console.log('BGM00_RAW length:', RAW.length);

// Header
console.log('\nHeader NES addrs:');
for (let i = 0; i < 4; i++) {
  const ch = RAW[i*3];
  const lo = RAW[i*3+1];
  const hi = RAW[i*3+2];
  const nes = lo | (hi << 8);
  const off = nes - 0xB7AD;
  console.log(`  ch${ch}: NES $${nes.toString(16).padStart(4,'0').toUpperCase()} → offset ${off}`);
}

// Sequential offsets
const segStarts = [13]; // skip header(12) + FF(1)
let off = 13;

// Read each segment until FF
for (let s = 0; s < 4; s++) {
  let segLen = 0;
  while (off + segLen < RAW.length && RAW[off + segLen] !== 0xFF) segLen++;
  console.log(`\nSegment ${s}: offset=${off}, len=${segLen}, end=${off+segLen}`);
  console.log(`  First 15:`, [...RAW.slice(off, off+15)].map(b=>'0x'+b.toString(16).padStart(2,'0')).join(' '));
  console.log(`  Last 10:`, [...RAW.slice(off+segLen-10, off+segLen)].map(b=>'0x'+b.toString(16).padStart(2,'0')).join(' '));
  console.log(`  Terminator: 0x${RAW[off+segLen].toString(16)}`);
  off = off + segLen + 1; // +1 for FF
}

// Check TRI track for $E8/$E9 (JUMP/CALL)
const triStart = 1174;
let triSegEnd = triStart;
while (triSegEnd < RAW.length && RAW[triSegEnd] !== 0xFF) triSegEnd++;
console.log(`\nTRI segment: offset=${triStart}, len=${triSegEnd-triStart}`);

// Find $E8/$E9 in TRI track
let e8 = 0, e9 = 0;
for (let i = triStart; i < triSegEnd; i++) {
  if (RAW[i] === 0xE8) e8++;
  if (RAW[i] === 0xE9) e9++;
}
console.log(`  $E8 (JUMP): ${e8}, $E9 (CALL): ${e9}`);

// Find CALL targets with addresses
for (let i = triStart; i < triSegEnd; i++) {
  if (RAW[i] === 0xE9 && i+2 < triSegEnd) {
    const lo = RAW[i+1], hi = RAW[i+2];
    const nes = lo | (hi << 8);
    const targetOff = nes - 0xB7AD;
    console.log(`  TRI[$i]: CALL $${nes.toString(16).padStart(4,'0')} → offset ${targetOff}`);
  }
}

// Check NOISE track for $E8/$E9
const noiseStart = triSegEnd + 1;
let noiseSegEnd = noiseStart;
while (noiseSegEnd < RAW.length && RAW[noiseSegEnd] !== 0xFF) noiseSegEnd++;
console.log(`\nNOISE segment: offset=${noiseStart}, len=${noiseSegEnd-noiseStart}`);
e8 = 0; e9 = 0;
for (let i = noiseStart; i < noiseSegEnd; i++) {
  if (RAW[i] === 0xE8) e8++;
  if (RAW[i] === 0xE9) e9++;
}
console.log(`  $E8 (JUMP): ${e8}, $E9 (CALL): ${e9}`);

for (let i = noiseStart; i < noiseSegEnd; i++) {
  if (RAW[i] === 0xE9 && i+2 < noiseSegEnd) {
    const lo = RAW[i+1], hi = RAW[i+2];
    const nes = lo | (hi << 8);
    const targetOff = nes - 0xB7AD;
    console.log(`  NOISE[$i]: CALL $${nes.toString(16).padStart(4,'0')} → offset ${targetOff}`);
  }
  if (RAW[i] === 0xE8 && i+2 < noiseSegEnd) {
    const lo = RAW[i+1], hi = RAW[i+2];
    const nes = lo | (hi << 8);
    const targetOff = nes - 0xB7AD;
    console.log(`  NOISE[$i]: JUMP $${nes.toString(16).padStart(4,'0')} → offset ${targetOff}`);
  }
}

// Check what data is at the CALL targets from TRI
console.log('\n--- Checking CALL target data ---');
// Find all unique CALL/JUMP targets from all tracks
const targets = new Set();
for (let i = 13; i < RAW.length; i++) {
  if ((RAW[i] === 0xE8 || RAW[i] === 0xE9) && i+2 < RAW.length) {
    const lo = RAW[i+1], hi = RAW[i+2];
    const nes = lo | (hi << 8);
    targets.add(nes);
  }
}
// Only show targets in the first few
const sortedTargets = [...targets].sort((a,b)=>a-b).slice(0,15);
for (const nes of sortedTargets) {
  const off = nes - 0xB7AD;
  console.log(`  NES $${nes.toString(16).padStart(4,'0')} → offset ${off}: [${[...RAW.slice(off, off+8)].map(b=>'0x'+b.toString(16).padStart(2,'0')).join(' ')}]`);
}

// Show last 30 bytes of RAW
console.log('\nLast 30 RAW bytes:');
console.log('  ', [...RAW.slice(RAW.length-30)].map(b=>'0x'+b.toString(16).padStart(2,'0')).join(' '));

console.log('\nTotal bytes after NOISE start to end:', RAW.length - noiseStart);
