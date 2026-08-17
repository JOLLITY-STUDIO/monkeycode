const fs = require('fs');
const f = 'd:/studio/github/monkeycode/src/nes/tsubasa2/rom-data/prg-bank-02.ts';
const txt = fs.readFileSync(f, 'utf8');
const m = txt.match(/=\s*\[([\s\S]*?)\];/);
if (!m) { console.log('no array'); process.exit(0); }
const nums = m[1].split(',').map(s => parseInt(s.trim().replace(/^0x/i, ''), 16)).filter(n => !isNaN(n));
console.log('len=', nums.length, 'first8=', nums.slice(0, 8));
const idxA677 = 0xA677 - 0xA000;
const idxA67B = 0xA67B - 0xA000;
console.log('A677[0..7]=', nums.slice(idxA677, idxA677 + 8));
console.log('A67B[0..7]=', nums.slice(idxA67B, idxA67B + 8));
console.log('A677_256 = [');
console.log('  ' + nums.slice(idxA677, idxA677 + 256).map(n => '0x' + n.toString(16).padStart(2, '0')).join(', '));
console.log('];');
console.log('A67B_256 = [');
console.log('  ' + nums.slice(idxA67B, idxA67B + 256).map(n => '0x' + n.toString(16).padStart(2, '0')).join(', '));
console.log('];');
const idxAA97 = 0xAA97 - 0xA000;
console.log('AA97[0..71]=', nums.slice(idxAA97, idxAA97 + 72));
