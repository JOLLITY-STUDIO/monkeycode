/**
 * 检查 sprite 表 - 看看标题文字是不是在 sprite 里
 * Sprite table 通常在 0xF800 (由 R5 决定)
 * 每个 sprite 8 字节
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createCanvas } from 'canvas';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUT_DIR = resolve(ROOT, 'output');
mkdirSync(OUT_DIR, { recursive: true });

const vram = new Uint8Array(
  readFileSync(resolve(ROOT, '20260713/Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram'))
);

// 尝试不同的 sprite table 地址
const SPRITE_ADDRS = [0xF800, 0xFC00, 0xF000, 0xE800, 0xD800, 0xB000];

function read16(addr: number): number {
  return (vram[(addr + 1) & 0xFFFF] << 8) | vram[addr & 0xFFFF];
}

interface Sprite {
  y: number;
  size: number; // 0=8x8, 1=8x16, 2=16x8, 3=16x16, 4=32x32...
  hFlip: boolean;
  vFlip: boolean;
  palette: number;
  priority: boolean;
  tileIdx: number;
  x: number;
  link: number;
  w: number;
  h: number;
}

function parseSprite(addr: number): Sprite {
  // Genesis sprite table entry (8 bytes, little-endian):
  // +0: Y position (lo bits)
  // +1: size (bits 6-7) + link hi (bit 5) + Y hi (bit 2) + ...  
  // 实际上 Genesis sprite 格式比较特殊
  // 让我用标准格式：
  // word 0: Y position (bits 0-9 = Y, bit 10 = Y-sign, etc.)
  // word 1: link
  // word 2: tile index + hflip + vflip + palette + priority
  // word 3: X position
  
  // 简化版：用常用的格式
  const y = read16(addr) & 0x3FF;
  const link = read16(addr + 2) & 0x7F;
  const attr = read16(addr + 4);
  const x = read16(addr + 6) & 0x3FF;
  
  const tileIdx = attr & 0x07FF;
  const hFlip = !!(attr & 0x1000);
  const vFlip = !!(attr & 0x0800);
  const palette = (attr >> 13) & 3;
  const priority = !!(attr & 0x8000);
  const size = (read16(addr) >> 8) & 0x03; // 简化
  
  // 尺寸映射（简化）
  const sizes = [
    [8, 8],
    [8, 16],
    [16, 8],
    [16, 16],
  ];
  const [w, h] = sizes[size] || [16, 16];
  
  // Y 是屏幕底部的位置（-128 偏移）
  const adjY = y - 128;
  const adjX = x - 128;
  
  return {
    y: adjY,
    size,
    hFlip,
    vFlip,
    palette,
    priority,
    tileIdx,
    x: adjX,
    link,
    w,
    h,
  };
}

// 检查各个 sprite table 地址
for (const base of SPRITE_ADDRS) {
  console.log(`\n=== Sprite table @ 0x${base.toString(16)} ===`);
  
  // 遍历 sprite 链表（从 sprite 0 开始）
  const sprites: Sprite[] = [];
  let next = 0;
  let visited = new Set<number>();
  let safety = 100;
  
  while (safety-- > 0) {
    if (visited.has(next)) break;
    visited.add(next);
    
    const addr = base + next * 8;
    const sp = parseSprite(addr);
    
    // 检查 sprite 是否在屏幕范围内
    if (sp.x >= -32 && sp.x < 352 && sp.y >= -32 && sp.y < 256 && sp.tileIdx > 0) {
      sprites.push(sp);
      console.log(`  Sprite ${next}: pos=(${sp.x}, ${sp.y}) size=${sp.w}x${sp.h} tile=${sp.tileIdx} pal=${sp.palette} pri=${sp.priority?1:0}`);
    }
    
    if (sp.link === 0 || sp.link >= 80) break;
    next = sp.link;
  }
  
  console.log(`  共 ${sprites.length} 个可见 sprite`);
  
  if (sprites.length > 0 && sprites.length < 50) {
    // 画出来看看
    const canvas = createCanvas(320, 224);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#000066';
    ctx.fillRect(0, 0, 320, 224);
    
    for (const sp of sprites) {
      ctx.fillStyle = sp.priority ? '#ff6644' : '#ffcc33';
      ctx.fillRect(sp.x, sp.y - sp.h, sp.w, sp.h);
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 1;
      ctx.strokeRect(sp.x + 0.5, sp.y - sp.h + 0.5, sp.w - 1, sp.h - 1);
    }
    
    const outPath = resolve(OUT_DIR, `sprites-at-${base.toString(16)}.png`);
    writeFileSync(outPath, canvas.toBuffer('image/png'));
    console.log(`  可视化: ${outPath}`);
    break;
  }
}

// 也检查 0x3C00（之前提到过的）
console.log(`\n=== Sprite table @ 0x3C00 ===`);
const base = 0x3C00;
const sprites: Sprite[] = [];
let next = 0;
let visited = new Set<number>();
let safety = 100;

while (safety-- > 0) {
  if (visited.has(next)) break;
  visited.add(next);
  
  const addr = base + next * 8;
  const sp = parseSprite(addr);
  
  if (sp.x >= -32 && sp.x < 352 && sp.y >= -32 && sp.y < 256 && sp.tileIdx > 0) {
    sprites.push(sp);
    console.log(`  Sprite ${next}: pos=(${sp.x}, ${sp.y}) size=${sp.w}x${sp.h} tile=${sp.tileIdx} pal=${sp.palette}`);
  }
  
  if (sp.link === 0 || sp.link >= 80) break;
  next = sp.link;
}

console.log(`  共 ${sprites.length} 个可见 sprite`);

if (sprites.length > 0 && sprites.length < 80) {
  const canvas = createCanvas(320, 224);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#000066';
  ctx.fillRect(0, 0, 320, 224);
  
  for (const sp of sprites) {
    ctx.fillStyle = sp.priority ? '#ff6644' : '#ffcc33';
    ctx.fillRect(sp.x, sp.y - sp.h, sp.w, sp.h);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1;
    ctx.strokeRect(sp.x + 0.5, sp.y - sp.h + 0.5, sp.w - 1, sp.h - 1);
  }
  
  const outPath = resolve(OUT_DIR, 'sprites-at-3c00.png');
  writeFileSync(outPath, canvas.toBuffer('image/png'));
  console.log(`  可视化: ${outPath}`);
}
