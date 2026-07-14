import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createCanvas } from 'canvas';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');

const VRAM_PATH = join(ROOT, 'src/langrisser2/20260713/Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');
const CRAM_PATH = join(ROOT, 'src/langrisser2/20260713/Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');

const vram = new Uint8Array(readFileSync(VRAM_PATH));
const cram = new Uint8Array(readFileSync(CRAM_PATH));

console.log('=== 使用正确的 VDP 寄存器配置 ===');
console.log('');

const REG2 = 0x30;
const REG4 = 0x07;
const REG5 = 0x6C;
const REG6 = 0x00;

const planeABaseAddr = (REG2 & 0x38) << 10;
const planeBBaseAddr = (REG4 & 0x07) << 13;
const spriteTableAddr = (REG5 & 0x7F) << 9;
const spriteTileAddr = (REG6 & 0x07) << 13;

console.log('VDP 寄存器:');
console.log(`  R2 (Plane A): 0x${REG2.toString(16)} -> VRAM 0x${planeABaseAddr.toString(16)}`);
console.log(`  R4 (Plane B): 0x${REG4.toString(16)} -> VRAM 0x${planeBBaseAddr.toString(16)}`);
console.log(`  R5 (Sprite表): 0x${REG5.toString(16)} -> VRAM 0x${spriteTableAddr.toString(16)}`);
console.log(`  R6 (Sprite tile): 0x${REG6.toString(16)} -> VRAM 0x${spriteTileAddr.toString(16)}`);
console.log('');

function decodeLittleEndian(i) {
  return (cram[i * 2 + 1] << 8) | cram[i * 2];
}

function cramToRgb(word) {
  const r = ((word >> 1) & 7) * 36;
  const g = ((word >> 4) & 7) * 36;
  const b = ((word >> 7) & 7) * 36;
  return { r, g, b };
}

const palette = [];
for (let i = 0; i < 64; i++) {
  if (i * 2 + 1 < cram.length) {
    palette.push(cramToRgb(decodeLittleEndian(i)));
  } else {
    palette.push({ r: 0, g: 0, b: 0 });
  }
}

console.log('--- Plane A Nametable (0xC000) ---');
console.log('前 16 个条目:');
for (let i = 0; i < 16; i++) {
  const addr = planeABaseAddr + i * 2;
  const entry = (vram[addr] << 8) | vram[addr + 1];
  const tileIdx = entry & 0x3FF;
  const paletteLine = (entry >> 13) & 3;
  const hFlip = (entry >> 12) & 1;
  const vFlip = (entry >> 11) & 1;
  console.log(`  条目 ${i}: 0x${entry.toString(16).padStart(4, '0')} -> tile=${tileIdx}, palette=${paletteLine}, h=${hFlip}, v=${vFlip}`);
}
console.log('');

const SCREEN_WIDTH = 320;
const SCREEN_HEIGHT = 224;
const TILE_SIZE = 8;
const TILES_X = SCREEN_WIDTH / TILE_SIZE;
const TILES_Y = SCREEN_HEIGHT / TILE_SIZE;

const canvas = createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
const ctx = canvas.getContext('2d');

const bgColor = palette[0];
ctx.fillStyle = `rgb(${bgColor.r},${bgColor.g},${bgColor.b})`;
ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

for (let ty = 0; ty < TILES_Y; ty++) {
  for (let tx = 0; tx < TILES_X; tx++) {
    const nametableIndex = ty * TILES_X + tx;
    const nametableAddr = planeABaseAddr + nametableIndex * 2;
    
    if (nametableAddr + 2 > vram.length) continue;
    
    const nametableEntry = (vram[nametableAddr] << 8) | vram[nametableAddr + 1];
    const tileIndex = nametableEntry & 0x3FF;
    const paletteLine = (nametableEntry >> 13) & 3;
    const hFlip = (nametableEntry >> 12) & 1;
    const vFlip = (nametableEntry >> 11) & 1;
    
    const tileOffset = tileIndex * 32;
    if (tileOffset + 32 > vram.length) continue;
    
    const tile = vram.slice(tileOffset, tileOffset + 32);
    
    const basePaletteIndex = paletteLine * 16;
    
    for (let py = 0; py < 8; py++) {
      for (let px = 0; px < 8; px++) {
        const x = hFlip ? 7 - px : px;
        const y = vFlip ? 7 - py : py;
        
        const bit = 7 - x;
        const p0 = (tile[y * 4 + 0] >> bit) & 1;
        const p1 = ((tile[y * 4 + 1] >> bit) & 1) << 1;
        const p2 = ((tile[y * 4 + 2] >> bit) & 1) << 2;
        const p3 = ((tile[y * 4 + 3] >> bit) & 1) << 3;
        const colorIndex = p0 | p1 | p2 | p3;
        
        const color = palette[basePaletteIndex + colorIndex];
        if (color) {
          ctx.fillStyle = `rgb(${color.r},${color.g},${color.b})`;
        } else {
          ctx.fillStyle = '#000';
        }
        ctx.fillRect(tx * 8 + px, ty * 8 + py, 1, 1);
      }
    }
  }
}

const OUT_PATH = join(ROOT, 'src/langrisser2/20260713/output/title-screen-correct-vdp.png');
import('fs').then(fs => fs.writeFileSync(OUT_PATH, canvas.toBuffer('image/png')));

console.log('输出:', OUT_PATH);
console.log('');
console.log('=== Plane B 检查 ===');
console.log(`Plane B 基址: 0x${planeBBaseAddr.toString(16)}`);
let planeBData = 0;
for (let i = 0; i < 8192; i++) {
  if (vram[planeBBaseAddr + i] !== 0) planeBData++;
}
console.log(`非零字节: ${planeBData}/8192`);
console.log('');
console.log('=== Sprite 表检查 ===');
console.log(`Sprite 表基址: 0x${spriteTableAddr.toString(16)}`);
let spriteData = 0;
for (let i = 0; i < 512; i++) {
  if (vram[spriteTableAddr + i] !== 0) spriteData++;
}
console.log(`非零字节: ${spriteData}/512`);
console.log('');
console.log('=== Tile 区域检查 ===');
console.log('Tile 0-63 (0x0000-0x0FFF):');
let tilesWithData = 0;
for (let i = 0; i < 64; i++) {
  const offset = i * 32;
  let hasData = false;
  for (let j = 0; j < 32; j++) {
    if (vram[offset + j] !== 0) { hasData = true; break; }
  }
  if (hasData) tilesWithData++;
}
console.log(`有数据的 tile: ${tilesWithData}/64`);