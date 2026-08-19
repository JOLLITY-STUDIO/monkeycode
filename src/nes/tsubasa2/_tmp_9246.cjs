// Dump bank19 bytes $9246-$92A6 (array idx 0x1246-0x12A6)
const fs = require('fs');
const txt = fs.readFileSync('src/game/data/prg-bank-19.ts', 'utf8');
// The file is a TS module: export default [ ... ] with hex literals
const m = txt.match(/\[\s*([\s\S]*?)\]\s*;?\s*export default/s);
if (!m) { console.log('NO MATCH'); process.exit(1); }
const nums = m[1].split(',').map(s => parseInt(s.trim(), 16));
console.log('len', nums.length);
for (let i = 0x1246; i <= 0x12a6; i++) {
  const off = 0x9000 + i;
  console.log(`${off.toString(16).toUpperCase()}: ${nums[i].toString(16).padStart(2, '0')}`);
}
// stream head
console.log('--- stream @0x1467 ---');
for (let i = 0x1467; i < 0x1467 + 32; i++) {
  console.log(`${(0xb467 + (i - 0x1467)).toString(16).toUpperCase()}: ${nums[i].toString(16).padStart(2, '0')}`);
}
