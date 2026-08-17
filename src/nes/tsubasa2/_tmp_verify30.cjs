/** 直接对照 ROM: bank30 $C766 表 + $FBCC 调色板 */
const fs = require('fs');
const b = fs.readFileSync('./roms/Captain Tsubasa II - Super Striker (Japan).nes');
const base = 16 + 30 * 8192;

const c766 = [];
for (let i = 0; i < 8; i++) c766.push(b[base + 0x766 + i]);
console.log('ROM $C766:', c766.map(x => '0x' + x.toString(16).padStart(2, '0')).join(' '));

const fbcc = base + 0xFBCC + 0x12 * 12 - 0xC000;
const raw = [];
for (let i = 0; i < 16; i++) raw.push(b[fbcc + i]);
console.log('ROM palette:', raw.map(x => '0x' + x.toString(16).padStart(2, '0')).join(' '));

let idx = 0;
const out = [];
for (let i = 0; i < 16; i++) {
  if ((i & 3) === 0) out.push(0x0f);
  else out.push(raw[idx++]);
}
console.log('CC02 out:', out.map(v => '0x' + v.toString(16).padStart(2, '0')).join(' '));
