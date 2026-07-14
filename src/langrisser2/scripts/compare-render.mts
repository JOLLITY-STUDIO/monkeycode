/**
 * 对比原始 VRAM dump 渲染和预提取数据渲染
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas } from 'canvas';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

import { VDP } from '../game/hw/vdp/vdp.js';
import { renderFrame } from '../game/hw/vdp/renderer.js';

const VRAM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');
const CRAM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');

const vramDump = fs.readFileSync(VRAM_PATH);
const cramDump = fs.readFileSync(CRAM_PATH);

console.log('=== 方式1: 直接使用 VRAM/CRAM dump ===');
const vdp1 = new VDP();
vdp1.reset();
for (let i = 0; i < 65536; i++) {
  vdp1.writeVRAM(i, vramDump[i]);
}
for (let i = 0; i < 128; i++) {
  vdp1.cram[i] = cramDump[i];
}
vdp1.writeRegister(2, 0x30);
vdp1.writeRegister(4, 0x07);
vdp1.writeRegister(12, 0x81);
vdp1.writeRegister(7, 0x00);

const output1 = new Uint8Array(320 * 224 * 4);
renderFrame(vdp1, output1);

const canvas1 = createCanvas(320, 224);
const ctx1 = canvas1.getContext('2d');
const img1 = ctx1.createImageData(320, 224);
for (let i = 0; i < output1.length; i++) img1.data[i] = output1[i];
ctx1.putImageData(img1, 0, 0);
fs.writeFileSync(path.join(__dirname, '../20260713/output/title-vram-dump.png'), canvas1.toBuffer('image/png'));
console.log('保存: title-vram-dump.png');

console.log('\n=== 方式2: 使用预提取数据 ===');
import { TitleScreen } from '../game/scenes/TitleScreen.js';

const vdp2 = new VDP();
vdp2.reset();
const title = new TitleScreen(vdp2);
title.init();

const output2 = new Uint8Array(320 * 224 * 4);
renderFrame(vdp2, output2);

const canvas2 = createCanvas(320, 224);
const ctx2 = canvas2.getContext('2d');
const img2 = ctx2.createImageData(320, 224);
for (let i = 0; i < output2.length; i++) img2.data[i] = output2[i];
ctx2.putImageData(img2, 0, 0);
fs.writeFileSync(path.join(__dirname, '../20260713/output/title-preextracted.png'), canvas2.toBuffer('image/png'));
console.log('保存: title-preextracted.png');

console.log('\n=== 对比两种方式的像素差异 ===');
let diffCount = 0;
for (let i = 0; i < output1.length; i += 4) {
  if (output1[i] !== output2[i] || output1[i+1] !== output2[i+1] || output1[i+2] !== output2[i+2]) {
    diffCount++;
    if (diffCount <= 5) {
      console.log(`差异像素 [${i/4}]: dump=(${output1[i]},${output1[i+1]},${output1[i+2]}), pre=(${output2[i]},${output2[i+1]},${output2[i+2]})`);
    }
  }
}
console.log(`总差异像素: ${diffCount} / ${320*224} (${(diffCount/(320*224)*100).toFixed(4)}%)`);

if (diffCount === 0) {
  console.log('\n两种方式完全一致!');
}
