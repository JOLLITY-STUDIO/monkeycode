// Dump bank02 data tables from rom-data/prg-bank-02.ts
const fs = require('fs');
const src = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/rom-data/prg-bank-02.ts', 'utf8');
const m = src.match(/=\s*\[([\s\S]*?)\];/);
if (!m) { console.log('ARRAY NOT FOUND'); process.exit(1); }
const arr = m[1]
  .split(',')
  .map(s => s.trim())
  .filter(s => s.length > 0)
  .map(s => s.startsWith('0x') || s.startsWith('0X') ? parseInt(s, 16) : parseInt(s, 10));
const hex = (v) => '0x' + v.toString(16).padStart(2, '0');
const dump = (label, cpuAddr, len) => {
  const off = cpuAddr - 0xA000;
  const bytes = arr.slice(off, off + len);
  let line = `### ${label}  (CPU $${cpuAddr.toString(16)}, ${len}B)\n`;
  for (let i = 0; i < bytes.length; i += 16) {
    const chunk = bytes.slice(i, i + 16);
    line += `  $${(cpuAddr + i).toString(16).toUpperCase()}: ` + chunk.map(hex).join(' ') + '\n';
  }
  console.log(line);
};
dump('AA47 field tile table', 0xAA47, 46);
dump('AA75 field category', 0xAA75, 26);
dump('AA97 field params', 0xAA97, 72);
dump('AADF scroll table', 0xAADF, 64);
dump('AB1F password', 0xAB1F, 16);
dump('A773', 0xA773, 8);
