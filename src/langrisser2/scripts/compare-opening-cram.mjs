/**
 * 比较渲染结果与原始 VRAM dump, 检查标题画面 CRAM 是否合适开场动画
 *
 * 策略:
 * 1. 渲染当前结果 (用标题画面 CRAM)
 * 2. 尝试用 ROM 中的候选调色板数据
 * 3. 比较哪种调色板产生更合理的开场动画画面
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const VRAM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_VRAM-openNING-ANIATION-2.ram');
const TITLE_CRAM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');
const ROM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_68K-gens-rom-dump.bin');
const OUT_DIR = path.join(__dirname, '../20260713/output');

const vram = fs.readFileSync(VRAM_PATH);
const titleCram = fs.readFileSync(TITLE_CRAM_PATH);
const rom = fs.readFileSync(ROM_PATH);

const PLANE_A_BASE = 0xA000;
const DISPLAY_W = 320;
const DISPLAY_H = 224;

function cramToRGB(word) {
  const r = (word & 0x07) * 36;
  const g = ((word >> 3) & 0x07) * 36;
  const b = ((word >> 6) & 0x07) * 36;
  return [r, g, b];
}

function decodeTile(tileIndex) {
  const base = (tileIndex & 0x7FF) * 32;
  const pixels = new Uint8Array(64);
  for (let y = 0; y < 8; y++) {
    const rb = base + y * 4;
    const p0 = vram[rb], p1 = vram[rb + 1], p2 = vram[rb + 2], p3 = vram[rb + 3];
    for (let x = 0; x < 8; x++) {
      const bit = 7 - x;
      pixels[y * 8 + x] =
        ((p0 >> bit) & 1) |
        (((p1 >> bit) & 1) << 1) |
        (((p2 >> bit) & 1) << 2) |
        (((p3 >> bit) & 1) << 3);
    }
  }
  return pixels;
}

function parseNameTableEntry(addr) {
  const lo = vram[addr & 0xFFFF];
  const hi = vram[(addr + 1) & 0xFFFF];
  const word = (hi << 8) | lo;
  return {
    tileIndex: word & 0x07FF,
    hFlip: !!(word & 0x1000),
    vFlip: !!(word & 0x0800),
    palette: (word >> 13) & 0x03,
    priority: (word >> 15) & 0x01,
  };
}

function renderWithCram(cramData, outName) {
  function readCRAM(index) {
    const off = (index & 0x3F) * 2;
    return (cramData[off + 1] << 8) | cramData[off];
  }

  const output = new Uint8Array(DISPLAY_W * DISPLAY_H * 4);
  // 背景色 = CRAM[0] (调色板0 索引0)
  const bgColor = readCRAM(0);
  const [br, bg, bb] = cramToRGB(bgColor);
  for (let i = 0; i < output.length; i += 4) {
    output[i] = br;
    output[i + 1] = bg;
    output[i + 2] = bb;
    output[i + 3] = 255;
  }

  const tileCache = new Map();
  function getTile(idx) {
    if (idx === 0) return new Uint8Array(64);
    let cached = tileCache.get(idx);
    if (!cached) {
      cached = decodeTile(idx);
      tileCache.set(idx, cached);
    }
    return cached;
  }

  for (let ty = 0; ty < 28 + 1; ty++) {
    for (let tx = 0; tx < 40 + 1; tx++) {
      const ntX = tx % 64;
      const ntY = ty % 32;
      const entryAddr = PLANE_A_BASE + (ntY * 64 + ntX) * 2;
      const entry = parseNameTableEntry(entryAddr);
      if (entry.tileIndex === 0) continue;

      const tilePixels = getTile(entry.tileIndex);
      const palBase = entry.palette * 16;

      for (let py = 0; py < 8; py++) {
        const screenY = ty * 8 + py;
        if (screenY >= DISPLAY_H) continue;
        const srcY = entry.vFlip ? (7 - py) : py;

        for (let px = 0; px < 8; px++) {
          const screenX = tx * 8 + px;
          if (screenX >= DISPLAY_W) continue;
          const srcX = entry.hFlip ? (7 - px) : px;
          const pixelValue = tilePixels[srcY * 8 + srcX];
          if (pixelValue === 0) continue;

          const colorIdx = palBase + pixelValue;
          const cramValue = readCRAM(colorIdx);
          const [r, g, b] = cramToRGB(cramValue);

          const outIdx = (screenY * DISPLAY_W + screenX) * 4;
          output[outIdx] = r;
          output[outIdx + 1] = g;
          output[outIdx + 2] = b;
          output[outIdx + 3] = 255;
        }
      }
    }
  }

  // 保存 PPM
  const header = `P6\n${DISPLAY_W} ${DISPLAY_H}\n255\n`;
  const headerBuf = Buffer.from(header, 'ascii');
  const rgbData = Buffer.alloc(DISPLAY_W * DISPLAY_H * 3);
  for (let i = 0; i < DISPLAY_W * DISPLAY_H; i++) {
    rgbData[i * 3] = output[i * 4];
    rgbData[i * 3 + 1] = output[i * 4 + 1];
    rgbData[i * 3 + 2] = output[i * 4 + 2];
  }
  const outPath = path.join(OUT_DIR, outName);
  fs.writeFileSync(outPath, Buffer.concat([headerBuf, rgbData]));

  // 统计
  const colorStats = new Map();
  for (let i = 0; i < DISPLAY_W * DISPLAY_H; i++) {
    const r = output[i * 4];
    const g = output[i * 4 + 1];
    const b = output[i * 4 + 2];
    const key = `${r},${g},${b}`;
    colorStats.set(key, (colorStats.get(key) || 0) + 1);
  }
  return { outPath, colorStats };
}

// ============================================================
// 1. 用标题画面 CRAM 渲染
// ============================================================
console.log('=== 1. 用标题画面 CRAM 渲染 ===');
const r1 = renderWithCram(titleCram, 'opening-with-title-cram.ppm');
console.log(`  输出: ${r1.outPath}`);
console.log(`  唯一颜色数: ${r1.colorStats.size}`);
console.log(`  前 10 颜色:`);
const sorted1 = Array.from(r1.colorStats.entries()).sort((a, b) => b[1] - a[1]);
for (const [color, count] of sorted1.slice(0, 10)) {
  console.log(`    rgb(${color}): ${count} 像素`);
}

// ============================================================
// 2. 尝试 ROM 中的候选调色板
// ============================================================
console.log('\n=== 2. 尝试 ROM 中候选调色板 ===');
const candidates = [
  { addr: 0x01A652, name: '渐变调色板' },
  { addr: 0x05E62C, name: '间隔模式调色板' },
  { addr: 0x05FF80, name: '重复模式 0xFF80' },
  { addr: 0x0600DC, name: '调色板 0x60DC' },
  { addr: 0x060120, name: '调色板 0x60120' },
];

for (const cand of candidates) {
  // 读取 128 字节作为完整 CRAM (4 组 × 16 色 × 2 字节)
  const cramData = new Uint8Array(128);
  for (let i = 0; i < 128; i++) {
    cramData[i] = rom[cand.addr + i] || 0;
  }
  const result = renderWithCram(cramData, `opening-rom-${cand.addr.toString(16)}.ppm`);
  console.log(`\n  ${cand.name} @ 0x${cand.addr.toString(16)}:`);
  console.log(`    唯一颜色数: ${result.colorStats.size}`);
  const sorted = Array.from(result.colorStats.entries()).sort((a, b) => b[1] - a[1]);
  console.log(`    前 5 颜色:`);
  for (const [color, count] of sorted.slice(0, 5)) {
    console.log(`      rgb(${color}): ${count} 像素`);
  }
}

// ============================================================
// 3. 显示标题画面 CRAM 的调色板内容
// ============================================================
console.log('\n=== 3. 标题画面 CRAM 完整内容 (4 组 × 16 色) ===');
for (let pal = 0; pal < 4; pal++) {
  console.log(`调色板 ${pal}:`);
  for (let i = 0; i < 16; i++) {
    const off = (pal * 16 + i) * 2;
    const word = (titleCram[off + 1] << 8) | titleCram[off];
    const [r, g, b] = cramToRGB(word);
    console.log(`  [${i.toString(16)}] 0x${word.toString(16).padStart(3, '0')} → rgb(${r},${g},${b})`);
  }
}

console.log('\n=== 完成 ===');
