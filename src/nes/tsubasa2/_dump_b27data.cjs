const fs = require('fs');
const rom = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
// bank27 = $A000-$BFFF window → ROM 0x10 + 27*0x2000; CPU $A000 → ROM offset
const b27 = 0x10 + 27 * 0x2000;
function r(cpu) { return rom[b27 + (cpu - 0xA000)]; }
function u16(lo, hi) { return r(lo) | (r(hi) << 8); }
function hexRow(addr, n) {
  const arr = [];
  for (let i = 0; i < n; i++) arr.push('$' + r(addr + i).toString(16).toUpperCase().padStart(2, '0'));
  return arr.join(' ');
}
console.log('=== ANIM_PTR_A292 (14 anim defs) ===');
for (let i = 0; i < 14; i++) {
  const p = u16(0xA292 + i * 2, 0xA293 + i * 2);
  console.log(`anim ${i}: ptr $${p.toString(16).toUpperCase()}`);
}
console.log('\n=== anim def streams (first 32 bytes each) ===');
for (let i = 0; i < 14; i++) {
  const p = u16(0xA292 + i * 2, 0xA293 + i * 2);
  console.log(`anim ${i} @$${p.toString(16).toUpperCase()}: ${hexRow(p, 32)}`);
}
console.log('\n=== ANIM_FRAME_PTR_A42A (32 frame defs) ===');
for (let i = 0; i < 32; i++) {
  const p = u16(0xA42A + i * 2, 0xA42B + i * 2);
  console.log(`frame ${i}: ptr $${p.toString(16).toUpperCase()}`);
}
console.log('\n=== frame data (first 48 bytes each, unique) ===');
const seen = new Set();
for (let i = 0; i < 32; i++) {
  const p = u16(0xA42A + i * 2, 0xA42B + i * 2);
  if (seen.has(p)) { console.log(`frame ${i}: dup of $${p.toString(16).toUpperCase()}`); continue; }
  seen.add(p);
  console.log(`frame ${i} @$${p.toString(16).toUpperCase()}: ${hexRow(p, 48)}`);
}
console.log('\n=== INDEX_A1DC ===');
console.log(hexRow(0xA1DC, 32));
