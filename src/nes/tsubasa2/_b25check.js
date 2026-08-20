const fs = require('fs');
const s = fs.readFileSync('asm/bank25/_full.s', 'utf8');
const bytes = [];
for (const m of s.matchAll(/\$([0-9A-Fa-f]{2})/g)) { bytes.push(parseInt(m[1], 16)); }
console.log('total bytes:', bytes.length);
const seg = { HUD2_PTR: 0x0D1C, HUD3_PTR: 0x0D54, HUD1_PTR: 0x0D6E, SPR_BITS: 0x13BD, SPR_PTR: 0x13CF };
for (const k in seg) {
  const o = seg[k];
  console.log(k, 'offset 0x' + o.toString(16), 'bytes:', bytes.slice(o, o + 16).map(b => '$' + b.toString(16).toUpperCase()).join(' '));
}
