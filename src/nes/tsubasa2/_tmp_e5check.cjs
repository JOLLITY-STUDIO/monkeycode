const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const base = 0x10 + 19 * 0x2000;
const sub = {};
const ctx = {};
for (let off = 0x1467; off < 0x2000; off++) {
  const b = rom[base + off];
  if (b === 0xe5) {
    const v = rom[base + off + 1];
    sub[v] = (sub[v] || 0) + 1;
    if (!ctx[v]) ctx[v] = [];
    if (ctx[v].length < 3) ctx[v].push('0x' + off.toString(16));
  }
}
console.log('E5 sub-dispatch values:', JSON.stringify(sub));
console.log('positions:', JSON.stringify(ctx));
// context of E3 and E6
for (const target of [0x188e, 0x1658]) {
  let s = '';
  for (let i = target - 2; i < target + 6; i++) s += rom[base + i].toString(16).padStart(2, '0') + ' ';
  console.log('ctx@0x' + target.toString(16) + ':', s.trim());
}
// first 16 bytes of stream
let s = '';
for (let i = 0x1467; i < 0x1477; i++) s += rom[base + i].toString(16).padStart(2, '0') + ' ';
console.log('stream head:', s.trim());
