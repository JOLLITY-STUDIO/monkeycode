import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..', '..', '..');
const ROM_PATH = path.join(ROOT, 'src/langrisser2/20260713/Langrisser II (Japan).md');

const rom = fs.readFileSync(ROM_PATH);

const MUSIC_TABLE_BASE = 0x096C74;

console.log('=== 音乐指针表原始数据 (0x096C74) ===');
console.log('');

for (let i = 0; i < 64; i++) {
  const offset = MUSIC_TABLE_BASE + i * 4;
  if (offset + 4 > rom.length) break;
  
  const b0 = rom[offset];
  const b1 = rom[offset + 1];
  const b2 = rom[offset + 2];
  const b3 = rom[offset + 3];
  
  const addrBE = (b3 << 24) | (b2 << 16) | (b1 << 8) | b0;
  const addrLE = (b0 << 24) | (b1 << 16) | (b2 << 8) | b3;
  
  const dataOffsetBE = addrBE - 0x090000;
  const dataOffsetLE = addrLE - 0x090000;
  
  console.log(`ID ${i.toString().padStart(2)}: [${offset.toString(16).toUpperCase()}] ` +
    `$${b3.toString(16).padStart(2, '0')} ${b2.toString(16).padStart(2, '0')} ` +
    `${b1.toString(16).padStart(2, '0')} ${b0.toString(16).padStart(2, '0')} ` +
    `→ BE=0x${addrBE.toString(16).padStart(8, '0')}(${dataOffsetBE}) ` +
    `LE=0x${addrLE.toString(16).padStart(8, '0')}(${dataOffsetLE})`);
}

console.log('');
console.log('=== 检查音乐数据区内容 (0x090000) ===');
const sample = rom.slice(0x090000, 0x090080);
console.log('前 128 字节:');
for (let i = 0; i < 16; i++) {
  let line = '';
  for (let j = 0; j < 8; j++) {
    line += `${sample[i * 8 + j].toString(16).padStart(2, '0')} `;
  }
  console.log(`0x${(0x090000 + i * 8).toString(16)}: ${line}`);
}