import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createCanvas } from 'canvas';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const DATA_DIR = join(ROOT, 'src/langrisser2/20260713');

const VRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');
const CRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');

const vram = new Uint8Array(readFileSync(VRAM_PATH));
const cram = new Uint8Array(readFileSync(CRAM_PATH));

// === CRAM解码 (小端序 + RGB顺序) ===
function decodeCRAM(i) {
  const word = (cram[i * 2 + 1] << 8) | cram[i * 2];
  const r = (word & 0x07) * 36;
  const g = ((word >> 3) & 0x07) * 36;
  const b = ((word >> 6) & 0x07) * 36;
  return { r, g, b };
}

const palette = [];
for (let i = 0; i < 64; i++) {
  palette.push(decodeCRAM(i));
}

const BG_COLOR_INDEX = 4;
const bgColor = palette[BG_COLOR_INDEX];

// === Tile解码 (行主序, 4字节/行) ===
function decodeTile(tileIdx) {
  const offset = tileIdx * 32;
  const pixels = new Uint8Array(64);
  for (let y = 0; y < 8; y++) {
    const rowOffset = offset + y * 4;
    const p0 = vram[rowOffset];
    const p1 = vram[rowOffset + 1];
    const p2 = vram[rowOffset + 2];
    const p3 = vram[rowOffset + 3];
    for (let x = 0; x < 8; x++) {
      const bit = 7 - x;
      const b0 = (p0 >> bit) & 1;
      const b1 = (p1 >> bit) & 1;
      const b2 = (p2 >> bit) & 1;
      const b3 = (p3 >> bit) & 1;
      pixels[y * 8 + x] = b0 | (b1 << 1) | (b2 << 2) | (b3 << 3);
    }
  }
  return pixels;
}

const tileCache = new Array(2048);
for (let i = 0; i < 2048; i++) {
  tileCache[i] = decodeTile(i);
}

const PLANE_A_BASE = 0xC000;
const PLANE_B_BASE = 0xE000;
const COLS = 40;
const ROWS = 28;

// === Nametable解码 (小端序) ===
function readNametableEntry(base, tx, ty) {
  const addr = base + (ty * 64 + tx) * 2;
  const lo = vram[addr];
  const hi = vram[addr + 1];
  const word = (hi << 8) | lo;
  return {
    priority: (word >> 15) & 1,
    palette: (word >> 13) & 3,
    hflip: (word >> 12) & 1,
    vflip: (word >> 11) & 1,
    tileIdx: word & 0x7FF,
    word
  };
}

const PAL_OFFSETS = [0, 16, 32, 48];

// === 截图读取 ===
const BMP_PATH = join(ROOT, 'src/langrisser2/screenshots/Langrisser II (Japan)_034.bmp');
const bmpBuf = readFileSync(BMP_PATH);
const bmpWidth = bmpBuf.readInt32LE(18);
const bmpHeight = bmpBuf.readInt32LE(22);
const dataOffset = bmpBuf.readUInt32LE(10);
const rowSize = ((bmpWidth * 3 + 3) >> 2) * 4;

function getScreenshotPixel(sx, sy) {
  const srcY = bmpHeight > 0 ? (bmpHeight - 1 - sy) : sy;
  const srcOff = dataOffset + srcY * rowSize + sx * 3;
  return {
    r: bmpBuf[srcOff + 2],
    g: bmpBuf[srcOff + 1],
    b: bmpBuf[srcOff + 0],
  };
}

// === 逐像素对比标题区域 ===
console.log('=== 标题区域逐像素对比 (行6-10, 列4-18) ===');
console.log('');
console.log('格式: [tile坐标] | PlaneA(tile/pal/ci) | PlaneB(tile/pal/ci) | 渲染RGB | 截图RGB');
console.log('');

// 渲染两个plane到一个canvas
const DISPLAY_W = 320;
const DISPLAY_H = 224;
const canvas = createCanvas(DISPLAY_W, DISPLAY_H);
const ctx = canvas.getContext('2d');
const imgData = ctx.createImageData(DISPLAY_W, DISPLAY_H);
const data = imgData.data;

// 填充背景色
for (let i = 0; i < data.length; i += 4) {
  data[i] = bgColor.r;
  data[i + 1] = bgColor.g;
  data[i + 2] = bgColor.b;
  data[i + 3] = 255;
}

// 渲染Plane B (先渲染,低优先级)
let planeBStats = { entries: 0, palCounts: [0,0,0,0], priorityHigh: 0, priorityLow: 0 };
for (let ty = 0; ty < ROWS; ty++) {
  for (let tx = 0; tx < COLS; tx++) {
    const e = readNametableEntry(PLANE_B_BASE, tx, ty);
    if (e.word === 0) continue;
    planeBStats.entries++;
    planeBStats.palCounts[e.palette]++;
    if (e.priority) planeBStats.priorityHigh++; else planeBStats.priorityLow++;
    
    const tp = tileCache[e.tileIdx] || tileCache[0];
    for (let py = 0; py < 8; py++) {
      for (let px = 0; px < 8; px++) {
        const srcX = e.hflip ? (7 - px) : px;
        const srcY = e.vflip ? (7 - py) : py;
        const ci = tp[srcY * 8 + srcX];
        if (ci !== 0) {
          const c = palette[PAL_OFFSETS[e.palette] + ci];
          const di = ((ty * 8 + py) * DISPLAY_W + (tx * 8 + px)) * 4;
          data[di] = c.r;
          data[di + 1] = c.g;
          data[di + 2] = c.b;
        }
      }
    }
  }
}

// 渲染Plane A (后渲染,高优先级)
let planeAStats = { entries: 0, palCounts: [0,0,0,0], priorityHigh: 0, priorityLow: 0 };
for (let ty = 0; ty < ROWS; ty++) {
  for (let tx = 0; tx < COLS; tx++) {
    const e = readNametableEntry(PLANE_A_BASE, tx, ty);
    if (e.word === 0) continue;
    planeAStats.entries++;
    planeAStats.palCounts[e.palette]++;
    if (e.priority) planeAStats.priorityHigh++; else planeAStats.priorityLow++;
    
    const tp = tileCache[e.tileIdx] || tileCache[0];
    for (let py = 0; py < 8; py++) {
      for (let px = 0; px < 8; px++) {
        const srcX = e.hflip ? (7 - px) : px;
        const srcY = e.vflip ? (7 - py) : py;
        const ci = tp[srcY * 8 + srcX];
        if (ci !== 0) {
          const c = palette[PAL_OFFSETS[e.palette] + ci];
          const di = ((ty * 8 + py) * DISPLAY_W + (tx * 8 + px)) * 4;
          data[di] = c.r;
          data[di + 1] = c.g;
          data[di + 2] = c.b;
        }
      }
    }
  }
}

ctx.putImageData(imgData, 0, 0);

console.log('=== Plane A 统计 ===');
console.log(`  非空条目: ${planeAStats.entries}`);
console.log(`  调色板使用: pal0=${planeAStats.palCounts[0]}, pal1=${planeAStats.palCounts[1]}, pal2=${planeAStats.palCounts[2]}, pal3=${planeAStats.palCounts[3]}`);
console.log(`  优先级: high=${planeAStats.priorityHigh}, low=${planeAStats.priorityLow}`);
console.log('');

console.log('=== Plane B 统计 ===');
console.log(`  非空条目: ${planeBStats.entries}`);
console.log(`  调色板使用: pal0=${planeBStats.palCounts[0]}, pal1=${planeBStats.palCounts[1]}, pal2=${planeBStats.palCounts[2]}, pal3=${planeBStats.palCounts[3]}`);
console.log(`  优先级: high=${planeBStats.priorityHigh}, low=${planeBStats.priorityLow}`);
console.log('');

// === 检查标题区域的Plane覆盖情况 ===
console.log('=== 标题区域 (行6-10, 列4-17) 的Plane覆盖 ===');
console.log('');
console.log('坐标(tx,ty) | PlaneA | PlaneB | 说明');
console.log('---|---|---|---');

for (let ty = 6; ty < 10; ty++) {
  for (let tx = 4; tx < 18; tx++) {
    const ea = readNametableEntry(PLANE_A_BASE, tx, ty);
    const eb = readNametableEntry(PLANE_B_BASE, tx, ty);
    
    const aInfo = ea.word !== 0 ? `tile=${ea.tileIdx},pal=${ea.palette},pri=${ea.priority}` : '空';
    const bInfo = eb.word !== 0 ? `tile=${eb.tileIdx},pal=${eb.palette},pri=${eb.priority}` : '空';
    
    let desc = '';
    if (ea.word !== 0 && eb.word !== 0) desc = '两层都有';
    else if (ea.word !== 0) desc = '仅Plane A';
    else if (eb.word !== 0) desc = '仅Plane B';
    
    console.log(`(${tx},${ty}) | ${aInfo} | ${bInfo} | ${desc}`);
  }
}

// === 逐像素颜色对比 ===
console.log('');
console.log('=== 像素级颜色对比 (采样点) ===');
console.log('');
console.log('屏幕坐标 | 渲染RGB | 截图RGB | 差异');

const samplePoints = [
  { x: 32, y: 48, desc: '标题左上' },
  { x: 80, y: 56, desc: '标题中上' },
  { x: 128, y: 56, desc: '标题中心' },
  { x: 160, y: 80, desc: '标题中下' },
  { x: 48, y: 100, desc: '标题下方' },
  { x: 10, y: 10, desc: '左上角背景' },
  { x: 310, y: 10, desc: '右上角背景' },
  { x: 160, y: 200, desc: '底部中间' },
];

for (const p of samplePoints) {
  const renderData = ctx.getImageData(p.x, p.y, 1, 1).data;
  const renderR = renderData[0], renderG = renderData[1], renderB = renderData[2];
  
  const sc = getScreenshotPixel(p.x, p.y);
  const diff = Math.abs(renderR - sc.r) + Math.abs(renderG - sc.g) + Math.abs(renderB - sc.b);
  
  console.log(`(${p.x},${p.y}) ${p.desc} | rgb(${renderR},${renderG},${renderB}) | rgb(${sc.r},${sc.g},${sc.b}) | ${diff}`);
}

// === 检查Plane A和B的优先级重叠情况 ===
console.log('');
console.log('=== 优先级重叠分析 ===');
console.log('');

let overlapCount = 0;
let overlapHighA = 0;
let overlapHighB = 0;
let overlapBothHigh = 0;
let overlapBothLow = 0;

for (let ty = 0; ty < ROWS; ty++) {
  for (let tx = 0; tx < COLS; tx++) {
    const ea = readNametableEntry(PLANE_A_BASE, tx, ty);
    const eb = readNametableEntry(PLANE_B_BASE, tx, ty);
    
    if (ea.word !== 0 && eb.word !== 0) {
      overlapCount++;
      if (ea.priority && !eb.priority) overlapHighA++;
      else if (!ea.priority && eb.priority) overlapHighB++;
      else if (ea.priority && eb.priority) overlapBothHigh++;
      else overlapBothLow++;
    }
  }
}

console.log(`重叠区域: ${overlapCount} 个tile`);
console.log(`  Plane A高优先级 (A在上): ${overlapHighA}`);
console.log(`  Plane B高优先级 (B在上): ${overlapHighB}`);
console.log(`  两者都高优先级: ${overlapBothHigh}`);
console.log(`  两者都低优先级 (A在上,因为后渲染): ${overlapBothLow}`);
console.log('');

// === 关键问题: 正确的优先级渲染 ===
console.log('=== 重新渲染 (正确的优先级处理) ===');
console.log('');

const canvas2 = createCanvas(DISPLAY_W, DISPLAY_H);
const ctx2 = canvas2.getContext('2d');
const imgData2 = ctx2.createImageData(DISPLAY_W, DISPLAY_H);
const data2 = imgData2.data;

// 填充背景色
for (let i = 0; i < data2.length; i += 4) {
  data2[i] = bgColor.r;
  data2[i + 1] = bgColor.g;
  data2[i + 2] = bgColor.b;
  data2[i + 3] = 255;
}

// 正确的MD VDP渲染顺序:
// 1. 背景色
// 2. 低优先级Plane B
// 3. 低优先级Plane A
// 4. 高优先级Plane B
// 5. 高优先级Plane A
// 6. Sprites (低优先级)
// 7. Sprites (高优先级)

function renderPlaneWithPriority(base, priority) {
  for (let ty = 0; ty < ROWS; ty++) {
    for (let tx = 0; tx < COLS; tx++) {
      const e = readNametableEntry(base, tx, ty);
      if (e.word === 0) continue;
      if (e.priority !== priority) continue;
      
      const tp = tileCache[e.tileIdx] || tileCache[0];
      for (let py = 0; py < 8; py++) {
        for (let px = 0; px < 8; px++) {
          const srcX = e.hflip ? (7 - px) : px;
          const srcY = e.vflip ? (7 - py) : py;
          const ci = tp[srcY * 8 + srcX];
          if (ci !== 0) {
            const c = palette[PAL_OFFSETS[e.palette] + ci];
            const di = ((ty * 8 + py) * DISPLAY_W + (tx * 8 + px)) * 4;
            data2[di] = c.r;
            data2[di + 1] = c.g;
            data2[di + 2] = c.b;
          }
        }
      }
    }
  }
}

// 按正确优先级顺序渲染
renderPlaneWithPriority(PLANE_B_BASE, 0); // 低优先级Plane B
renderPlaneWithPriority(PLANE_A_BASE, 0); // 低优先级Plane A
renderPlaneWithPriority(PLANE_B_BASE, 1); // 高优先级Plane B
renderPlaneWithPriority(PLANE_A_BASE, 1); // 高优先级Plane A

ctx2.putImageData(imgData2, 0, 0);

// 重新比较采样点
console.log('采样点 | 旧渲染 | 新渲染(正确优先级) | 截图');
for (const p of samplePoints) {
  const oldData = ctx.getImageData(p.x, p.y, 1, 1).data;
  const newData = ctx2.getImageData(p.x, p.y, 1, 1).data;
  const sc = getScreenshotPixel(p.x, p.y);
  
  console.log(`(${p.x},${p.y}) ${p.desc} | rgb(${oldData[0]},${oldData[1]},${oldData[2]}) | rgb(${newData[0]},${newData[1]},${newData[2]}) | rgb(${sc.r},${sc.g},${sc.b})`);
}

// 保存对比图
const labeled = createCanvas(DISPLAY_W * 3 + 40, DISPLAY_H + 60);
const lctx = labeled.getContext('2d');
lctx.fillStyle = '#000';
lctx.fillRect(0, 0, labeled.width, labeled.height);
lctx.fillStyle = '#0f0';
lctx.font = '12px monospace';
lctx.fillText('旧渲染(简单叠加) | 新渲染(正确优先级) | 模拟器截图', 10, 20);

lctx.drawImage(canvas, 10, 40);
lctx.drawImage(canvas2, DISPLAY_W + 20, 40);

// 把截图也画上去
const screenshotCanvas = createCanvas(bmpWidth, Math.abs(bmpHeight));
const sctx = screenshotCanvas.getContext('2d');
const screenshotData = sctx.createImageData(bmpWidth, Math.abs(bmpHeight));
for (let y = 0; y < Math.abs(bmpHeight); y++) {
  for (let x = 0; x < bmpWidth; x++) {
    const c = getScreenshotPixel(x, y);
    const di = (y * bmpWidth + x) * 4;
    screenshotData.data[di] = c.r;
    screenshotData.data[di + 1] = c.g;
    screenshotData.data[di + 2] = c.b;
    screenshotData.data[di + 3] = 255;
  }
}
sctx.putImageData(screenshotData, 0, 0);
lctx.drawImage(screenshotCanvas, DISPLAY_W * 2 + 30, 40);

writeFileSync(join(DATA_DIR, 'output/plane-b-diagnosis.png'), labeled.toBuffer('image/png'));
console.log('');
console.log('对比图已保存: plane-b-diagnosis.png');

// === 检查CRAM 512字节中后半部分是否有不同数据 ===
console.log('');
console.log('=== CRAM 512字节分析 ===');
console.log('');

let diffCount = 0;
for (let i = 0; i < 128; i++) {
  if (cram[i] !== cram[i + 128]) {
    diffCount++;
  }
}
console.log(`前128字节与后128字节的差异: ${diffCount} 字节`);

if (diffCount > 0) {
  console.log('');
  console.log('后半部分CRAM (offset 128-255) 作为调色板:');
  const palette2 = [];
  for (let i = 0; i < 64; i++) {
    const word = (cram[i * 2 + 1 + 128] << 8) | cram[i * 2 + 128];
    const r = (word & 0x07) * 36;
    const g = ((word >> 3) & 0x07) * 36;
    const b = ((word >> 6) & 0x07) * 36;
    palette2.push({ r, g, b });
  }
  
  console.log('调色板3 (后半部分):');
  for (let i = 0; i < 16; i++) {
    const c = palette2[48 + i];
    console.log(`  [${i}]: rgb(${c.r},${c.g},${c.b})`);
  }
}

// 检查CRAM是否每4字节一个条目 (某些模拟器格式)
console.log('');
console.log('=== 检查CRAM是否为4字节条目格式 ===');
console.log('');

// 如果是4字节条目，每个颜色占2个word，可能第二个word是重复或shadow
console.log('CRAM[4] 4字节: ', cram[16], cram[17], cram[18], cram[19]);
const word_a = (cram[17] << 8) | cram[16];
const word_b = (cram[19] << 8) | cram[18];
console.log(`  Word 0: 0x${word_a.toString(16).padStart(4,'0')}`);
console.log(`  Word 1: 0x${word_b.toString(16).padStart(4,'0')}`);

if (word_a === word_b) {
  console.log('  两个word相同 - 可能是冗余存储');
} else {
  console.log('  两个word不同 - 可能是normal/shadow对');
  
  // 尝试用第二个word解码
  const r = (word_b & 0x07) * 36;
  const g = ((word_b >> 3) & 0x07) * 36;
  const b = ((word_b >> 6) & 0x07) * 36;
  console.log(`  Word 1 解码: rgb(${r},${g},${b})`);
}
