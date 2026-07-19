const fs = require('fs');
const zlib = require('zlib');

const f1 = 'src/nes/tsubasa/romdata/Captain Tsubasa II - Super Striker (Japan).fc1.fcs';
const f2 = 'src/nes/tsubasa/romdata/Captain Tsubasa II - Super Striker (Japan).fc2.fcs';

function loadRam(path) {
  const buf = fs.readFileSync(path);
  const data = zlib.inflateSync(buf.slice(0x10));
  const tag = Buffer.from('RAM');
  const pos = data.indexOf(tag);
  if (pos < 0) throw new Error('RAM not found in ' + path);
  const size = data.readUInt32LE(pos + 4);
  const off = pos + 8;
  return data.slice(off, off + size);
}

const r1 = loadRam(f1);
const r2 = loadRam(f2);

// First player stats assumed: 16,14,12,11,12,12
// Second player stats from screenshot: 8,8,9,8,8,8
// Also second player other displayed values: level 1, max katsu 416, trap 8, shoot 10, through 9, clear 8, aerial 9

const secondValues = [8, 9, 10, 1, 416];
const firstValues = [11, 12, 14, 16, 748];

console.log('=== r2 addresses with displayed values ===');
for (const v of secondValues) {
  const addrs = [];
  for (let i = 0; i < 0x800; i++) {
    if (v < 256) {
      if (r2[i] === v) addrs.push(i);
    } else {
      if (i < 0x7FF && r2.readUInt16LE(i) === v) addrs.push(i);
    }
  }
  console.log(`  ${v}: ${addrs.map(a=>'$'+a.toString(16).padStart(4,'0')).join(', ')}`);
}

console.log('\n=== r1 addresses with displayed values ===');
for (const v of firstValues) {
  const addrs = [];
  for (let i = 0; i < 0x800; i++) {
    if (v < 256) {
      if (r1[i] === v) addrs.push(i);
    } else {
      if (i < 0x7FF && r1.readUInt16LE(i) === v) addrs.push(i);
    }
  }
  console.log(`  ${v}: ${addrs.map(a=>'$'+a.toString(16).padStart(4,'0')).join(', ')}`);
}

// Find candidate addresses: same address, r1 in firstValues, r2 in secondValues, and values are consistent
console.log('\n=== Candidate stat transitions (same address, r1->r2) ===');
for (let i = 0; i < 0x800; i++) {
  const a1 = r1[i];
  const a2 = r2[i];
  if (firstValues.includes(a1) && secondValues.includes(a2)) {
    console.log(`  $${i.toString(16).padStart(4,'0')}: ${a1} -> ${a2}`);
  }
}

// Show diff regions with candidate values highlighted
console.log('\n=== Diff addresses with values in candidate ranges ===');
for (let i = 0; i < 0x800; i++) {
  if (r1[i] !== r2[i]) {
    const a1 = r1[i], a2 = r2[i];
    if (a1 <= 20 && a2 <= 20) {
      console.log(`  $${i.toString(16).padStart(4,'0')}: ${a1} -> ${a2}`);
    }
  }
}

// Look for contiguous block of second player stats: 8,8,9,8,8,8 in r2
console.log('\n=== Search for 8,8,9,8,8,8 sequence in r2 ===');
for (let i = 0; i < 0x800 - 6; i++) {
  if (r2[i] === 8 && r2[i+1] === 8 && r2[i+2] === 9 && r2[i+3] === 8 && r2[i+4] === 8 && r2[i+5] === 8) {
    const h1 = [...r1.slice(i, i+6)].join(',');
    const h2 = [...r2.slice(i, i+6)].join(',');
    console.log(`  $${i.toString(16).padStart(4,'0')}: r1=[${h1}] r2=[${h2}]`);
  }
}

// Search for 8,10,9,8,9 sequence (ball handling: trap, shoot, through, clear, aerial) in r2
console.log('\n=== Search for 8,10,9,8,9 ball handling in r2 ===');
for (let i = 0; i < 0x800 - 5; i++) {
  if (r2[i] === 8 && r2[i+1] === 10 && r2[i+2] === 9 && r2[i+3] === 8 && r2[i+4] === 9) {
    const h1 = [...r1.slice(i, i+5)].join(',');
    const h2 = [...r2.slice(i, i+5)].join(',');
    console.log(`  $${i.toString(16).padStart(4,'0')}: r1=[${h1}] r2=[${h2}]`);
  }
}

// Print first 256 bytes of both rams to compare
console.log('\n=== First 256 bytes comparison ===');
for (let base = 0; base < 256; base += 16) {
  const hex1 = [...r1.slice(base, base+16)].map(b=>b.toString(16).padStart(2,'0')).join(' ');
  const hex2 = [...r2.slice(base, base+16)].map(b=>b.toString(16).padStart(2,'0')).join(' ');
  if (hex1 !== hex2) {
    console.log(`$${base.toString(16).padStart(4,'0')} r1: ${hex1}`);
    console.log(`$${base.toString(16).padStart(4,'0')} r2: ${hex2}`);
  }
}

console.log('\n=== Low RAM region $0500-$0700 comparison (stats often here) ===');
for (let base = 0x500; base < 0x700; base += 16) {
  const hex1 = [...r1.slice(base, base+16)].map(b=>b.toString(16).padStart(2,'0')).join(' ');
  const hex2 = [...r2.slice(base, base+16)].map(b=>b.toString(16).padStart(2,'0')).join(' ');
  if (hex1 !== hex2) {
    console.log(`$${base.toString(16).padStart(4,'0')} r1: ${hex1}`);
    console.log(`$${base.toString(16).padStart(4,'0')} r2: ${hex2}`);
  }
}
