/**
 * 对比 CRAM dump 和预提取的调色板数据
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ROM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_68K-gens-rom-dump.bin');
const CRAM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');

const rom = fs.readFileSync(ROM_PATH);
const cramDump = fs.readFileSync(CRAM_PATH);

function readByte(o) { return rom[o] & 0xff; }
function readWord(o) { return ((rom[o] & 0xff) << 8) | (rom[o + 1] & 0xff); }

console.log('=== CRAM dump 数据 (前 32 字节) ===');
for (let i = 0; i < 32; i++) {
  if (i % 8 === 0) console.log(`\n0x${i.toString(16).padStart(4, '0')}:`);
  process.stdout.write(` ${cramDump[i].toString(16).padStart(2, '0')}`);
}

console.log('\n\n=== 预提取 CRAM 数据 (ROM 0xA4582) ===');
const cramAddrs = [0xA4582, 0xA4562, 0xA4542, 0xA45A2];
const romColors = [];

for (let p = 0; p < 4; p++) {
  console.log(`\n调色板 ${p} (ROM 0x${cramAddrs[p].toString(16)}):`);
  for (let c = 0; c < 16; c++) {
    const beWord = readWord(cramAddrs[p] + c * 2);
    const r = (beWord >> 1) & 0x07;
    const g = (beWord >> 5) & 0x07;
    const b = (beWord >> 9) & 0x07;
    const cramValue = r | (g << 3) | (b << 6);
    
    romColors.push(cramValue);
    
    if (c % 8 === 0) process.stdout.write(`\n  0x${c.toString(16)}:`);
    process.stdout.write(` ${cramValue.toString(16).padStart(2, '0')}`);
  }
}

console.log('\n\n=== 对比 dump 和 ROM 提取的 CRAM ===');
console.log('索引 | dump | rom | 相同?');
console.log('-----|------|-----|-----');
for (let i = 0; i < 64; i++) {
  const d = cramDump[i];
  const r = romColors[i];
  const same = d === r ? 'Y' : 'N';
  if (same === 'N') {
    console.log(`  ${i.toString().padStart(4)} | 0x${d.toString(16).padStart(2, '0')} | 0x${r.toString(16).padStart(2, '0')} | ${same}`);
  }
}

console.log('\n=== CRAM dump 颜色转换 ===');
for (let i = 0; i < 16; i++) {
  const cramValue = cramDump[i];
  const r = cramValue & 0x07;
  const g = (cramValue >> 3) & 0x07;
  const b = (cramValue >> 6) & 0x07;
  console.log(`CRAM[${i}]=0x${cramValue.toString(16).padStart(2, '0')} → rgb(${r*36},${g*36},${b*36})`);
}

console.log('\n=== ROM 提取颜色转换 ===');
for (let i = 0; i < 16; i++) {
  const cramValue = romColors[i];
  const r = cramValue & 0x07;
  const g = (cramValue >> 3) & 0x07;
  const b = (cramValue >> 6) & 0x07;
  console.log(`CRAM[${i}]=0x${cramValue.toString(16).padStart(2, '0')} → rgb(${r*36},${g*36},${b*36})`);
}
