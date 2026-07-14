/**
 * 分析场景数据表结构
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_68K-gens-rom-dump.bin');
const rom = fs.readFileSync(ROM_PATH);

function readByte(o) { return rom[o] & 0xff; }
function readWord(o) { return ((rom[o] & 0xff) << 8) | (rom[o + 1] & 0xff); }
function readLong(o) { return ((rom[o] & 0xff) << 24) | ((rom[o + 1] & 0xff) << 16) | ((rom[o + 2] & 0xff) << 8) | (rom[o + 3] & 0xff); }

console.log('=== 场景数据表 (ROM 0x061CB0 - 参数表) ===');
const sceneParamBase = 0x061CB0;
for (let i = 0; i < 8; i++) {
  const off = sceneParamBase + i * 4;
  const val = readLong(off);
  console.log(`场景 ${i + 1}: 0x${off.toString(16)} = 0x${val.toString(16)}`);
}

console.log('\n=== 场景资源 ID 表 (ROM 0x061C34) ===');
const sceneResourceBase = 0x061C34;
for (let i = 0; i < 8; i++) {
  const off = sceneResourceBase + i * 4;
  const val = readLong(off);
  const low = val & 0xffff;
  const high = (val >> 16) & 0xffff;
  console.log(`场景 ${i + 1}: 0x${off.toString(16)} = 0x${val.toString(16)}  (低字=0x${low.toString(16)}, 高字=0x${high.toString(16)})`);
}

console.log('\n=== 场景布局表 (ROM 0x061D2C - 底层) ===');
const layoutBase = 0x061D2C;
for (let i = 0; i < 8; i++) {
  const off = layoutBase + i * 4;
  const val = readLong(off);
  console.log(`场景 ${i + 1}: 0x${off.toString(16)} = 0x${val.toString(16)}`);
}

console.log('\n=== 场景布局表 (ROM 0x061D30 - 高层) ===');
const layoutBase2 = 0x061D30;
for (let i = 0; i < 8; i++) {
  const off = layoutBase2 + i * 4;
  const val = readLong(off);
  console.log(`场景 ${i + 1}: 0x${off.toString(16)} = 0x${val.toString(16)}`);
}

console.log('\n=== 场景重映射表 (ROM 0x061E24 - 底层) ===');
const remapBase = 0x061E24;
for (let i = 0; i < 8; i++) {
  const off = remapBase + i * 4;
  const val = readLong(off);
  console.log(`场景 ${i + 1}: 0x${off.toString(16)} = 0x${val.toString(16)}`);
}

console.log('\n=== 标题画面布局数据 (场景 1, 底层) ===');
const titleLayoutPtr = readLong(layoutBase + 0);
console.log(`标题底层布局指针: 0x${titleLayoutPtr.toString(16)}`);
for (let i = 0; i < 128; i += 4) {
  const val = readLong(titleLayoutPtr + i);
  if (val !== 0) {
    console.log(`  0x${(titleLayoutPtr + i).toString(16)} = 0x${val.toString(16)}`);
  }
}

console.log('\n=== 标题画面布局数据 (场景 1, 高层) ===');
const titleLayoutPtr2 = readLong(layoutBase2 + 0);
console.log(`标题高层布局指针: 0x${titleLayoutPtr2.toString(16)}`);
for (let i = 0; i < 128; i += 4) {
  const val = readLong(titleLayoutPtr2 + i);
  if (val !== 0) {
    console.log(`  0x${(titleLayoutPtr2 + i).toString(16)} = 0x${val.toString(16)}`);
  }
}
