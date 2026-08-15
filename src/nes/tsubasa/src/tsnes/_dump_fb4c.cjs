// Dump bank31 $FB4C region (offset 0x1B4C in PRG_BANK_31)
const fs = require('fs');
const src = fs.readFileSync('rom-data/prg-bank-31.ts', 'utf8');
const m = src.match(/=\s*(\[[\s\S]*\]);\s*export default/s);
if (!m) { console.log('no array'); process.exit(1); }
const nums = m[1].split(',').map(s => parseInt(s.trim().replace(/0x/i, ''), 16)).filter(n => !isNaN(n));
console.log('len', nums.length);
for (let i = 0x1b00; i < Math.min(0x1c00, nums.length); i += 16) {
  const row = [];
  for (let j = 0; j < 16; j++) row.push(nums[i + j] !== undefined ? nums[i + j].toString(16).padStart(2, '0') : '??');
  console.log((0xe000 + i).toString(16), row.join(' '));
}
