const fs = require('fs');
const s = fs.readFileSync('rom-data/prg-bank-12.ts', 'utf8');
const start = s.indexOf('[\n') + 1;
const end = s.lastIndexOf(']');
const raw = s.slice(start + 1, end);
const nums = raw.split(/[\s,]+/).filter(Boolean).map(n => {
  const v = n.startsWith('0x') || n.startsWith('0X') ? parseInt(n, 16) : parseInt(n, 10);
  return v;
}).filter(n => !isNaN(n));
console.log('Bank 12 size:', nums.length, 'bytes');
console.log('First:', nums.slice(0, 8));
console.log('At $8BDA:', nums.slice(0x0BDA, 0x0BDA+12));

function r(cpuAddr) {
  const offset = cpuAddr - 0x8000;
  return offset >= 0 && offset < nums.length ? nums[offset] : 0;
}

console.log('\n=== $8BDA pointer table (2-level, (soundId-1)*2 offset) ===');
for (let i = 0; i < 10; i++) {
  const lo = r(0x8BDA + i * 2);
  const hi = r(0x8BDA + i * 2 + 1);
  const ptr = lo | (hi << 8);
  if (ptr < 0x8000 || ptr >= 0xA000) {
    console.log('  ID 0x' + (i+1).toString(16).toUpperCase().padStart(2,'0') + ': ptr=$' + ptr.toString(16).toUpperCase().padStart(4,'0') + ' INVALID');
    continue;
  }
  const b0 = r(ptr);
  const b1 = r(ptr + 1);
  const b2 = r(ptr + 2);
  const b3 = r(ptr + 3);
  const b4 = r(ptr + 4);
  const b5 = r(ptr + 5);
  const hexs = [b0,b1,b2,b3,b4,b5].map(x=>x.toString(16).toUpperCase().padStart(2,'0')).join(' ');
  console.log('  ID 0x' + (i+1).toString(16).toUpperCase().padStart(2,'0') + ': ptr=$' + ptr.toString(16).toUpperCase().padStart(4,'0') + ' bytes: ' + hexs);
}

console.log('\n=== $870D Frequency table (12 x 16-bit) ===');
for (let i = 0; i < 12; i++) {
  const lo = r(0x870D + i * 2);
  const hi = r(0x870D + i * 2 + 1);
  const period = lo | (hi << 8);
  const freq = period > 0 ? Math.round(1789772.5 / (16 * (period + 1))) : 'N/A';
  console.log('  idx ' + i.toString().padStart(2) + ': $' + lo.toString(16).padStart(2,'0') + ' $' + hi.toString(16).padStart(2,'0') + ' period=' + period.toString().padStart(5) + ' freq=' + freq + 'Hz');
}

console.log('\n=== $8725 Duration table (first 64) ===');
let durs = [];
for (let i = 0; i < 64; i++) durs.push(r(0x8725 + i));
console.log('  ' + durs.join(', '));
