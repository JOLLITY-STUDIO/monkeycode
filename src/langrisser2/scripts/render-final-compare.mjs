/**
 * 最终渲染对比脚本
 *
 * 用确认过的参数渲染标题画面：
 *   - nametable地址: 0xC000 (R2=0x30 影子寄存器确认)
 *   - nametable字节序: big-endian (tile 193有数据确认)
 *   - tile索引: 11位 (entry & 0x7FF)
 *   - 显示模式: 320x224 (H40 + V28)
 *
 * 输出三张图并排对比:
 *   左: CRAM big-endian
 *   中: CRAM little-endian
 *   右: VRAM.bmp (如果存在的话，模拟器导出参考图)
 */

import { readFileSync, existsSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createCanvas } from 'canvas';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const DATA_DIR = join(ROOT, 'src/langrisser2/20260713');

const VRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');
const CRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');
const BMP_PATH  = join(DATA_DIR, 'Langrisser II (Japan)_VRAM.bmp');
const OUT_PATH  = join(DATA_DIR, 'output/title-render-final.png');

// ============================================================
// 加载数据
// ============================================================
const vram = new Uint8Array(readFileSync(VRAM_PATH));
const cram = new Uint8Array(readFileSync(CRAM_PATH));
console.log('VRAM size:', vram.length, 'bytes');
console.log('CRAM size:', cram.length, 'bytes');

// ============================================================
// CRAM 解码: big-endian 和 little-endian 两种
// ============================================================
// Genesis CRAM 颜色格式 (9-bit):
//   bit8-6 = Blue, bit5-3 = Green, bit2-0 = Red
//   每个通道 3 位 (0-7)，乘以 36 映射到 0-252

function cramWordBigEndian(i) {
  return (cram[i * 2] << 8) | cram[i * 2 + 1];
}
function cramWordLittleEndian(i) {
  return (cram[i * 2 + 1] << 8) | cram[i * 2];
}
function cramWordToRgb(word) {
  // 9-bit BGR: BBB GGG RRR (bit8-6=B, bit5-3=G, bit2-0=R)
  const r = (word & 0x07) * 36;
  const g = ((word >> 3) & 0x07) * 36;
  const b = ((word >> 6) & 0x07) * 36;
  return { r, g, b };
}

const paletteBE = [];
const paletteLE = [];
for (let i = 0; i < 64; i++) {
  paletteBE.push(cramWordToRgb(cramWordBigEndian(i)));
  paletteLE.push(cramWordToRgb(cramWordLittleEndian(i)));
}

console.log('\n--- CRAM 颜色 0-7 (big-endian) ---');
paletteBE.slice(0, 8).forEach((c, i) => {
  console.log(`  [${i}] rgb(${c.r},${c.g},${c.b}) word=0x${cramWordBigEndian(i).toString(16).padStart(4,'0')}`);
});
console.log('\n--- CRAM 颜色 0-7 (little-endian) ---');
paletteLE.slice(0, 8).forEach((c, i) => {
  console.log(`  [${i}] rgb(${c.r},${c.g},${c.b}) word=0x${cramWordLittleEndian(i).toString(16).padStart(4,'0')}`);
});

// ============================================================
// Tile 解码 (4bpp 位平面格式)
// ============================================================
// 每个 tile 32字节 = 8行 × 4字节/行
// 4个位平面：每行4个字节，对应4个位平面，水平扫描8像素
// 像素颜色索引 = p0 | p1<<1 | p2<<2 | p3<<3

function decodeTile(tileIdx) {
  const offset = tileIdx * 32;
  const pixels = new Uint8Array(64); // 8x8
  for (let y = 0; y < 8; y++) {
    const rowOff = offset + y * 4;
    for (let x = 0; x < 8; x++) {
      const bit = 7 - x;
      const p0 = (vram[rowOff + 0] >> bit) & 1;
      const p1 = (vram[rowOff + 1] >> bit) & 1;
      const p2 = (vram[rowOff + 2] >> bit) & 1;
      const p3 = (vram[rowOff + 3] >> bit) & 1;
      pixels[y * 8 + x] = p0 | (p1 << 1) | (p2 << 2) | (p3 << 3);
    }
  }
  return pixels;
}

// ============================================================
// nametable 解析 (big-endian)
// ============================================================
// nametable 条目 2字节 big-endian:
//   bit15 = 优先级
//   bit14-13 = 调色板 (0-3, 每个16色)
//   bit12 = H翻转
//   bit11 = V翻转
//   bit10-0 = tile 索引 (11位, 0-2047)

function readNametableEntry(planeBase, tx, ty) {
  // H40 = 64列nametable (硬件固定), V28 = 32行
  const addr = planeBase + (ty * 64 + tx) * 2;
  const hi = vram[addr];
  const lo = vram[addr + 1];
  const word = (hi << 8) | lo;
  return {
    priority: (word >> 15) & 1,
    palette:  (word >> 13) & 3,
    hflip:    (word >> 12) & 1,
    vflip:    (word >> 11) & 1,
    tileIdx:  word & 0x7FF,
    word,
    raw: { hi, lo, addr }
  };
}

// ============================================================
// 渲染单个 Plane
// ============================================================
const PLANE_A_BASE = 0xC000; // R2=0x30 → 0xC000
const DISPLAY_W = 320;
const DISPLAY_H = 224;
const COLS = 40; // H40
const ROWS = 28; // V28

function renderPlane(palette) {
  const canvas = createCanvas(DISPLAY_W, DISPLAY_H);
  const ctx = canvas.getContext('2d');
  const imgData = ctx.createImageData(DISPLAY_W, DISPLAY_H);
  const data = imgData.data;

  // 预解码所有可能用到的 tile (VRAM 64KB / 32字节 = 2048 tiles)
  const tileCache = new Array(2048);
  for (let i = 0; i < 2048; i++) {
    tileCache[i] = decodeTile(i);
  }

  for (let ty = 0; ty < ROWS; ty++) {
    for (let tx = 0; tx < COLS; tx++) {
      const entry = readNametableEntry(PLANE_A_BASE, tx, ty);
      if (entry.tileIdx === 0 && entry.palette === 0) {
        // 空tile，画背景色 (palette 0 color 0)
        const bg = palette[0];
        for (let py = 0; py < 8; py++) {
          for (let px = 0; px < 8; px++) {
            const ox = tx * 8 + px;
            const oy = ty * 8 + py;
            const di = (oy * DISPLAY_W + ox) * 4;
            data[di] = bg.r; data[di+1] = bg.g; data[di+2] = bg.b; data[di+3] = 255;
          }
        }
        continue;
      }

      const tilePixels = tileCache[entry.tileIdx] || tileCache[0];
      const palBase = entry.palette * 16;

      for (let py = 0; py < 8; py++) {
        for (let px = 0; px < 8; px++) {
          // 处理翻转
          const srcX = entry.hflip ? (7 - px) : px;
          const srcY = entry.vflip ? (7 - py) : py;
          const colorIdx = tilePixels[srcY * 8 + srcX];
          const palIdx = palBase + colorIdx;
          const color = palette[palIdx] || palette[0];

          const ox = tx * 8 + px;
          const oy = ty * 8 + py;
          const di = (oy * DISPLAY_W + ox) * 4;
          data[di] = color.r; data[di+1] = color.g; data[di+2] = color.b; data[di+3] = 255;
        }
      }
    }
  }

  ctx.putImageData(imgData, 0, 0);
  return canvas;
}

// ============================================================
// 检查 VRAM.bmp 参考图
// ============================================================
let refCanvas = null;
let refInfo = '(无 BMP 参考图)';
if (existsSync(BMP_PATH)) {
  try {
    const buf = readFileSync(BMP_PATH);
    // 解析BMP头
    const header = buf.toString('ascii', 0, 2);
    const fileSize = buf.readUInt32LE(2);
    const dataOffset = buf.readUInt32LE(10);
    const infoSize = buf.readUInt32LE(14);
    const width = buf.readInt32LE(18);
    const height = buf.readInt32LE(22);
    const bpp = buf.readUInt16LE(28);
    const compression = buf.readUInt32LE(30);

    console.log('\n--- VRAM.bmp 头部 ---');
    console.log(`  Header: ${header}`);
    console.log(`  FileSize: ${fileSize} (实际: ${buf.length})`);
    console.log(`  DataOffset: ${dataOffset}`);
    console.log(`  Width: ${width}, Height: ${height}`);
    console.log(`  BPP: ${bpp}, Compression: ${compression}`);

    if (bpp === 24 && compression === 0) {
      const absH = Math.abs(height);
      const rowSize = ((width * 3 + 3) >> 2) * 4; // 4字节对齐
      refCanvas = createCanvas(width, absH);
      const rctx = refCanvas.getContext('2d');
      const rImg = rctx.createImageData(width, absH);
      for (let y = 0; y < absH; y++) {
        const srcY = height > 0 ? (absH - 1 - y) : y; // BMP默认bottom-up
        for (let x = 0; x < width; x++) {
          const srcOff = dataOffset + srcY * rowSize + x * 3;
          const di = (y * width + x) * 4;
          rImg.data[di]   = buf[srcOff + 2]; // R
          rImg.data[di+1] = buf[srcOff + 1]; // G
          rImg.data[di+2] = buf[srcOff + 0]; // B
          rImg.data[di+3] = 255;
        }
      }
      rctx.putImageData(rImg, 0, 0);
      refInfo = `BMP参考图 ${width}x${absH}`;
    } else {
      refInfo = `BMP 不支持 (bpp=${bpp}, compression=${compression})`;
    }
  } catch (e) {
    refInfo = `BMP解析失败: ${e.message}`;
  }
}
console.log('\n参考图:', refInfo);

// ============================================================
// 渲染两种 CRAM 字节序
// ============================================================
console.log('\n--- 渲染 (big-endian CRAM) ---');
const canvasBE = renderPlane(paletteBE);

console.log('--- 渲染 (little-endian CRAM) ---');
const canvasLE = renderPlane(paletteLE);

// ============================================================
// 拼接并排输出
// ============================================================
const GAP = 20;
const LABEL_H = 30;
const totalW = DISPLAY_W * (refCanvas ? 3 : 2) + GAP * (refCanvas ? 2 : 1);
const totalH = DISPLAY_H + LABEL_H;

const outCanvas = createCanvas(totalW, totalH);
const octx = outCanvas.getContext('2d');
octx.fillStyle = '#202020';
octx.fillRect(0, 0, totalW, totalH);

// big-endian
octx.drawImage(canvasBE, 0, LABEL_H);
octx.fillStyle = '#fff';
octx.font = '16px monospace';
octx.fillText('CRAM big-endian', 10, 20);

// little-endian
octx.drawImage(canvasLE, DISPLAY_W + GAP, LABEL_H);
octx.fillStyle = '#fff';
octx.fillText('CRAM little-endian', DISPLAY_W + GAP + 10, 20);

// 参考图
if (refCanvas) {
  octx.drawImage(refCanvas, (DISPLAY_W + GAP) * 2, LABEL_H);
  octx.fillStyle = '#fff';
  octx.fillText('VRAM.bmp 参考', (DISPLAY_W + GAP) * 2 + 10, 20);
}

// ============================================================
// 输出 nametable 摘要 (前几个非零条目)
// ============================================================
console.log('\n--- nametable 非零条目抽样 (前20个) ---');
let count = 0;
for (let ty = 0; ty < ROWS && count < 20; ty++) {
  for (let tx = 0; tx < COLS && count < 20; tx++) {
    const e = readNametableEntry(PLANE_A_BASE, tx, ty);
    if (e.tileIdx !== 0 || e.palette !== 0) {
      const wordHex = '0x' + e.word.toString(16).padStart(4, '0');
      console.log(`  [tx=${tx},ty=${ty}] word=${wordHex} tile=${e.tileIdx} pal=${e.palette} hflip=${e.hflip} vflip=${e.vflip} prio=${e.priority}`);
      count++;
    }
  }
}

// ============================================================
// 保存
// ============================================================
import('fs').then(fs => {
  fs.writeFileSync(OUT_PATH, outCanvas.toBuffer('image/png'));
  console.log(`\n✅ 输出: ${OUT_PATH}`);
  console.log(`   尺寸: ${totalW}x${totalH}`);
});
