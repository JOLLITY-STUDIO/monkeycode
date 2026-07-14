/**
 * 直接提取 CRAM 原始值
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const VRAM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');
const CRAM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');

const vram = fs.readFileSync(VRAM_PATH);
const cram = fs.readFileSync(CRAM_PATH);

function parseEntry(addr) {
  const lo = vram[addr] & 0xff;
  const hi = vram[addr + 1] & 0xff;
  const word = (hi << 8) | lo;
  return {
    tileIndex: word & 0x07FF,
    hFlip: !!(word & 0x1000),
    vFlip: !!(word & 0x0800),
    palette: (word >> 13) & 0x03,
    priority: (word >> 15) & 0x01,
  };
}

const usedTiles = new Set();
for (let i = 0; i < 4096; i += 2) {
  const entry = parseEntry(0xC000 + i);
  if (entry.tileIndex !== 0) usedTiles.add(entry.tileIndex);
}
for (let i = 0; i < 4096; i += 2) {
  const entry = parseEntry(0xE000 + i);
  if (entry.tileIndex !== 0) usedTiles.add(entry.tileIndex);
}

const maxTile = Math.max(...usedTiles);
const tileData = new Uint8Array((maxTile + 1) * 32);
for (let i = 0; i <= maxTile; i++) {
  const srcAddr = i * 32;
  const dstAddr = i * 32;
  for (let j = 0; j < 32; j++) {
    tileData[dstAddr + j] = vram[srcAddr + j];
  }
}

const cramData = new Uint8Array(128);
for (let i = 0; i < 128; i++) {
  cramData[i] = cram[i];
}

const nametableA = vram.subarray(0xC000, 0xC000 + 4096);
const nametableB = vram.subarray(0xE000, 0xE000 + 4096);

const outputDir = path.join(__dirname, '../game/data');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const outputPath = path.join(outputDir, 'TitleScreenData.ts');

const content = `/**
 * 标题画面数据 - 从 VRAM/CRAM dump 提取
 */

export const TITLE_TILES = new Uint8Array([
${Array.from(tileData).map((b, i) => (i % 32 === 0 ? '\n  ' : ' ') + b).join(',')}
]);

export const TITLE_CRAM = new Uint8Array([
${Array.from(cramData).map((b, i) => (i % 16 === 0 ? '\n  ' : ' ') + b).join(',')}
]);

export const TITLE_NAMETABLE_A = new Uint8Array([
${Array.from(nametableA).map((b, i) => (i % 32 === 0 ? '\n  ' : ' ') + b).join(',')}
]);

export const TITLE_NAMETABLE_B = new Uint8Array([
${Array.from(nametableB).map((b, i) => (i % 32 === 0 ? '\n  ' : ' ') + b).join(',')}
]);
`;

fs.writeFileSync(outputPath, content);
console.log(`输出: ${outputPath}`);
console.log(`文件大小: ${fs.statSync(outputPath).size}B`);
