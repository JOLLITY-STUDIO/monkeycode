const fs = require('fs');
const path = require('path');
// Find the ROM file
const root = path.join(__dirname, '_tmp_bzk_out');
let rom = null;
for (const f of fs.readdirSync(root)) {
  if (f.endsWith('.nes') || f.endsWith('.rom')) { rom = path.join(root, f); console.log('ROM:', f); }
}
// Check last line of part01 and first lines of part02
const p1 = fs.readFileSync(path.join(root, 'bank_02', 'bank_02_part01.asm'), 'utf8').split('\n');
console.log('part01 last 3 lines:');
for (let i = p1.length - 4; i < p1.length; i++) console.log(`${i + 1}: ${p1[i].trimEnd()}`);
const p2 = fs.readFileSync(path.join(root, 'bank_02', 'bank_02_part02.asm'), 'utf8').split('\n');
console.log('part02 first 8 lines:');
for (let i = 0; i < 8; i++) console.log(`${i + 1}: ${p2[i].trimEnd()}`);
