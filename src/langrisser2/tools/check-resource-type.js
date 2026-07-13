import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url).replace(/^\//, ''));
const root = path.resolve(__dirname, '..');

const romPath = path.resolve(root, '20260713/Langrisser II (Japan)_68K-gens-rom-dump.bin');
const romData = new Uint8Array(fs.readFileSync(romPath));

// 资源 0 的偏移 = 0x000B06B4
const res0Ptr = 0x000B06B4;
console.log('资源 0 偏移: 0x' + res0Ptr.toString(16));
console.log('第一个字节: 0x' + romData[res0Ptr].toString(16).padStart(2, '0'));
console.log('第一个字: 0x' + ((romData[res0Ptr] << 8) | romData[res0Ptr + 1]).toString(16).padStart(4, '0'));
console.log('第一个长字: 0x' + (
  (romData[res0Ptr] << 24) |
  (romData[res0Ptr + 1] << 16) |
  (romData[res0Ptr + 2] << 8) |
  romData[res0Ptr + 3]
).toString(16).padStart(8, '0'));

// 看看类型分派表 (0x99F0)
console.log('\n类型分派表 (0x99F0):');
for (let i = 0; i < 10; i++) {
  const offset = 0x99F0 + i * 2;
  const val = (romData[offset] << 8) | romData[offset + 1];
  const target = 0x99F0 + val;
  console.log(`  类型 ${i}: offset=0x${val.toString(16).padStart(4, '0')} → target=0x${target.toString(16).padStart(6, '0')}`);
}

// 看看资源 3 的第一个字节 (之前说 entry 3 是 8192B)
const res3Ptr = 0x000B1DBC;
console.log('\n资源 3 偏移: 0x' + res3Ptr.toString(16));
console.log('第一个字节: 0x' + romData[res3Ptr].toString(16).padStart(2, '0'));
