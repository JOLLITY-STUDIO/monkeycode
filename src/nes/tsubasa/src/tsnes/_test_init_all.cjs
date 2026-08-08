const fs = require('fs');
const s = fs.readFileSync('rom-data/prg-bank-12.ts', 'utf8');
const start = s.indexOf('[') + 1;
const end = s.lastIndexOf(']');
const raw = s.slice(start + 1, end);
const nums = raw.split(/[\s,]+/).filter(Boolean).map(n => {
  return n.startsWith('0x') || n.startsWith('0X') ? parseInt(n, 16) : parseInt(n, 10);
}).filter(n => !isNaN(n));
function r(addr) { const o = addr - 0x8000; return o >= 0 && o < nums.length ? nums[o] : 0; }

for (let sid = 1; sid <= 31; sid++) {
  const lo = r(0x8BDA + (sid - 1) * 2);
  const hi = r(0x8BDA + (sid - 1) * 2 + 1);
  const ptr = lo | (hi << 8);
  if (ptr === 0xFF00) { console.log('Sound ID ' + sid + ': END ($FF00)'); break; }
  let parts = [];
  if (ptr < 0x8000 || ptr >= 0xA000) {
    console.log('Sound ID ' + sid + ': INVALID ptr=$' + ptr.toString(16));
    continue;
  }
  let off = ptr - 0x8000;
  while (off < nums.length) {
    const ch = nums[off];
    if (ch >= 0x80) { parts.push('END($'+ch.toString(16)+')'); break; }
    const flo = nums[off+1]; const fhi = nums[off+2];
    parts.push('ch'+ch+':$' + (flo | (fhi<<8)).toString(16).toUpperCase());
    off += 3;
  }
  console.log('Sound ID ' + sid + ': ptr=$' + ptr.toString(16).toUpperCase() + ' | ' + parts.join(' '));
}
