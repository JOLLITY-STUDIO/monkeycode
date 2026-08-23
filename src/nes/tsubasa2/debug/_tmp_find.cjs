const fs = require('fs');
const root = 'd:/studio/github/monkeycode/src/nes/tsubasa2';
const p = root + '/src/game/prg/code/system/Bank00Service.ts';
const c = fs.readFileSync(p, 'utf8');
const lines = c.split('\n');
console.log('total lines:', lines.length);
for (const k of ['sub94D8', 'sub9735', 'sub94AE', 'sub9459', 'sub92E5', 'sub9143', 'sub9201', 'BANK09_RAW', 'BANK10_RAW']) {
  lines.forEach((l, i) => { if (l.includes(k)) console.log((i + 1) + ': ' + l.trim()); });
}
console.log('===== $92E5 跳转表 =====');
const rom = fs.readFileSync(root + '/docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const base = 16 + 0 * 0x2000 + (0x92E5 - 0x8000);
const bytes = [];
for (let i = 0; i < 32; i++) bytes.push(rom[base + i]);
console.log('bytes:', bytes.map(b => b.toString(16).padStart(2, '0')).join(' '));
const table = [];
for (let i = 0; i < 15; i++) table.push((rom[base + i * 2 + 1] << 8) | rom[base + i * 2]);
console.log('table:', table.map(a => '$' + a.toString(16).toUpperCase()).join(' '));
