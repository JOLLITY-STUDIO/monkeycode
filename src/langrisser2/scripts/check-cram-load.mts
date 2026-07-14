/**
 * 检查 CRAM 加载方式是否一致
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

import { VDP } from '../game/hw/vdp/vdp.js';
import { TITLE_CRAM } from '../game/data/TitleScreenData.js';

const CRAM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');
const cramDump = fs.readFileSync(CRAM_PATH);

console.log('=== 方式1: 使用 writeCRAM ===');
const vdp1 = new VDP();
vdp1.reset();
for (let i = 0; i < 128; i++) {
  vdp1.writeCRAM(i, cramDump[i]);
}
console.log('CRAM[0-15]:');
for (let i = 0; i < 16; i++) {
  process.stdout.write(vdp1.cram[i].toString(16).padStart(2, '0') + ' ');
}

console.log('\n\n=== 方式2: 直接赋值 ===');
const vdp2 = new VDP();
vdp2.reset();
for (let i = 0; i < 128; i++) {
  vdp2.cram[i] = TITLE_CRAM[i];
}
console.log('CRAM[0-15]:');
for (let i = 0; i < 16; i++) {
  process.stdout.write(vdp2.cram[i].toString(16).padStart(2, '0') + ' ');
}

console.log('\n\n=== 对比 CRAM ===');
let diff = 0;
for (let i = 0; i < 128; i++) {
  if (vdp1.cram[i] !== vdp2.cram[i]) {
    diff++;
    if (diff <= 10) {
      console.log(`CRAM[${i}]: writeCRAM=0x${vdp1.cram[i].toString(16)}, direct=0x${vdp2.cram[i].toString(16)}`);
    }
  }
}
console.log(`差异: ${diff}/128`);

console.log('\n=== 原始 CRAM dump ===');
console.log('CRAM[0-15]:');
for (let i = 0; i < 16; i++) {
  process.stdout.write(cramDump[i].toString(16).padStart(2, '0') + ' ');
}

console.log('\n\n=== 预提取 CRAM ===');
console.log('CRAM[0-15]:');
for (let i = 0; i < 16; i++) {
  process.stdout.write(TITLE_CRAM[i].toString(16).padStart(2, '0') + ' ');
}
