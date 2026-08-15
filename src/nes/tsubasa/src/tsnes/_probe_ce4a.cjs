// Probe $CE4A digit pattern lookup for A=0..30 using bank31 $FB4C table
const fs = require('fs');
const src = fs.readFileSync('rom-data/prg-bank-31.ts', 'utf8');
const m = src.match(/=\s*(\[[\s\S]*\]);\s*export default/s);
if (!m) { console.log('no array'); process.exit(1); }
const nums = m[1].split(',').map(s => parseInt(s.trim().replace(/0x/i, ''), 16)).filter(n => !isNaN(n));
const B31 = 0xe000;
function b(cpu) { return nums[cpu - B31]; }
function b31u16(cpu) { return b(cpu) | (b(cpu + 1) << 8); }

// $CE4A algorithm
function ce4a(a) {
  let v = (a + 0x40) & 0xff;
  let carry = (v & 0x80) !== 0; // ASL sets carry from bit7 of pre-shift value
  v = (v << 1) & 0xff;
  let negate = carry; // BPL skip: carry was set → negate
  if (negate) v = (~v) & 0xff;
  v &= 0x7e;
  const x = v;
  let lo = b31u16(0xfb4c + x);
  return { x, lo, raw: lo.toString(16).padStart(4, '0') };
}
for (let a = 0; a <= 30; a++) {
  const r = ce4a(a);
  console.log(`A=${a}  X=${r.x.toString(16)}  val=$${r.raw}`);
}
