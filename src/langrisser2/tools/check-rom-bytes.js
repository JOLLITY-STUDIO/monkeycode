import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url).replace(/^\//, ''));
const root = path.resolve(__dirname, '..');

const romPath = path.resolve(root, '20260713/Langrisser II (Japan)_68K-gens-rom-dump.bin');
const romData = new Uint8Array(fs.readFileSync(romPath));

// 检查 0xC92C 附近的字节
console.log('0xC900 - 0xC980 的字节:');
for (let i = 0xC900; i < 0xC980; i += 16) {
  let line = `0x${i.toString(16).padStart(6, '0')}: `;
  for (let j = 0; j < 16; j++) {
    line += romData[i + j].toString(16).padStart(2, '0').toUpperCase() + ' ';
  }
  console.log(line);
}

console.log('\nROM 大小:', romData.length, '字节');
