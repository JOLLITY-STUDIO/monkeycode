const fs = require('fs');
const s = fs.readFileSync('rom-data/prg-bank-12.ts', 'utf8');
const start = s.indexOf('[') + 1;
const end = s.lastIndexOf(']');
const raw = s.slice(start + 1, end);
const nums = raw.split(/[\s,]+/).filter(Boolean).map(n => {
  return n.startsWith('0x') || n.startsWith('0X') ? parseInt(n, 16) : parseInt(n, 10);
}).filter(n => !isNaN(n));
function r(addr) { const o = addr - 0x8000; return o >= 0 && o < nums.length ? nums[o] : 0; }
let out = '    entries: [\n';
for (let sid = 1; sid <= 31; sid++) {
  const lo = r(0x8BDA + (sid - 1) * 2);
  const hi = r(0x8BDA + (sid - 1) * 2 + 1);
  const ptr = lo | (hi << 8);
  if (ptr === 0xFF00) break;
  const parts = [];
  let off = ptr - 0x8000;
  while (off < nums.length) {
    const ch = nums[off];
    if (ch >= 0x80) break;
    const addr = nums[off+1] | (nums[off+2] << 8);
    parts.push('ch' + ch + ':$' + addr.toString(16).toUpperCase().padStart(4,'0'));
    off += 3;
  }
  const desc = parts.join(' ');
  const basePtr = '$' + ptr.toString(16).toUpperCase().padStart(4, '0');
  out += `      { seId: 0x${sid.toString(16).toUpperCase().padStart(2,'0')}, desc: "${desc}", basePtr: "${basePtr}", bank: "12" },\n`;
}
out += '    ],';
fs.writeFileSync('_entries_out.txt', out);
console.log('written to _entries_out.txt');
