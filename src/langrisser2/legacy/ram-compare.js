import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 新文件路径
const newDir = path.join(__dirname, '20260713');
const newRam = fs.readFileSync(path.join(newDir, 'Langrisser II (Japan)_68K-gens-ram-dump.ram'));
const newRom = fs.readFileSync(path.join(newDir, 'Langrisser II (Japan)_68K-gens-rom-dump.bin'));
const newMd = fs.readFileSync(path.join(newDir, 'Langrisser II (Japan).md'));

// 旧文件路径
const oldDir = path.join(__dirname, 'monkeycode-tmp-files', '.monkeycode-tmp-files');
const oldRam = fs.readFileSync(path.join(oldDir, '17e953fa-Langrisser II (Japan)_68K-1.ram'));
const oldRom = fs.readFileSync(path.join(oldDir, '1927e379-Langrisser II (Japan)-1.md'));

console.log('=== 文件对比 ===');
console.log(`RAM: 旧=${oldRam.length}B 新=${newRam.length}B`);
console.log(`ROM: 旧=${oldRom.length}B 新=${newRom.length}B  .bin=${newRom.length}B  .md=${newMd.length}B`);

// 比较RAM
let ramDiff = 0;
const ramDiffs = [];
for (let i = 0; i < Math.min(oldRam.length, newRam.length); i++) {
  if (oldRam[i] !== newRam[i]) {
    ramDiff++;
    if (ramDiffs.length < 10) {
      ramDiffs.push(`  偏移 0x${i.toString(16).padStart(4,'0')}: 旧=${oldRam[i].toString(16).padStart(2,'0')} 新=${newRam[i].toString(16).padStart(2,'0')}`);
    }
  }
}
console.log(`\nRAM 差异: ${ramDiff} 处`);
if (ramDiffs.length > 0) ramDiffs.forEach(d => console.log(d));

// 比较ROM
let romDiff = 0;
const romDiffs = [];
for (let i = 0; i < Math.min(oldRom.length, newRom.length); i++) {
  if (oldRom[i] !== newRom[i]) {
    romDiff++;
    if (romDiffs.length < 10) {
      romDiffs.push(`  偏移 0x${i.toString(16).padStart(6,'0')}: 旧=${oldRom[i].toString(16).padStart(2,'0')} 新=${newRom[i].toString(16).padStart(2,'0')}`);
    }
  }
}
console.log(`\nROM 差异: ${romDiff} 处`);
if (romDiffs.length > 0) romDiffs.forEach(d => console.log(d));

// 比较 .bin 和 .md
let binMdDiff = 0;
for (let i = 0; i < Math.min(newRom.length, newMd.length); i++) {
  if (newRom[i] !== newMd[i]) binMdDiff++;
}
console.log(`\n.bin vs .md 差异: ${binMdDiff} 处`);

// 打印RAM前64字节对比
console.log('\n=== RAM 前64字节 (新dump) ===');
for (let row = 0; row < 4; row++) {
  const bytes = [];
  for (let i = 0; i < 16; i++) {
    bytes.push(newRam[row * 16 + i].toString(16).padStart(2, '0'));
  }
  console.log(`  ${row.toString().padStart(2,'0')}: ${bytes.join(' ')}`);
}

// 打印 0xFFFFA4CC 区域 (RAM偏移 0xA4CC)
console.log('\n=== 新RAM 0xFFFFA4CC 区域 (角色能力表) ===');
for (let row = 0; row < 20; row++) {
  const base = 0xA4CC + row * 16;
  const bytes = [];
  for (let i = 0; i < 16; i++) {
    bytes.push(newRam[base + i].toString(16).padStart(2, '0'));
  }
  console.log(`  A4${(row*16+0xCC).toString(16).padStart(3,'0')}: ${bytes.join(' ')}`);
}

// 打印 0xFF603C 区域 (角色槽)
console.log('\n=== 新RAM 0xFF603C 区域 (角色槽0-3) ===');
for (let slot = 0; slot < 4; slot++) {
  const base = 0x603C + slot * 0x60;
  console.log(`\n槽${slot} @ 0xFF${base.toString(16).padStart(4,'0')}:`);
  for (let row = 0; row < 6; row++) {
    const bytes = [];
    for (let i = 0; i < 16; i++) {
      bytes.push(newRam[base + row * 16 + i].toString(16).padStart(2, '0'));
    }
    console.log(`  ${row.toString().padStart(2,'0')}: ${bytes.join(' ')}`);
  }
}

// 打印 0xFFFF9F62 场景配置区
console.log('\n=== 新RAM 0xFFFF9F62 场景配置 (128B) ===');
for (let row = 0; row < 8; row++) {
  const base = 0x9F62 + row * 16;
  const bytes = [];
  for (let i = 0; i < 16; i++) {
    bytes.push(newRam[base + i].toString(16).padStart(2, '0'));
  }
  console.log(`  9F${(row*16+0x62).toString(16).padStart(3,'0')}: ${bytes.join(' ')}`);
}
