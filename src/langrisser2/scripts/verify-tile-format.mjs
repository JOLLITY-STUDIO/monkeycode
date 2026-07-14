import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const DATA_DIR = join(ROOT, 'src/langrisser2/20260713');

const VRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');
const CRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');

const vram = new Uint8Array(readFileSync(VRAM_PATH));
const cram = new Uint8Array(readFileSync(CRAM_PATH));

const BMP_PATH = join(ROOT, 'src/langrisser2/screenshots/Langrisser II (Japan)_034.bmp');
const bmpBuf = readFileSync(BMP_PATH);
const bmpWidth = bmpBuf.readInt32LE(18);
const bmpHeight = bmpBuf.readInt32LE(22);
const dataOffset = bmpBuf.readUInt32LE(10);
const rowSize = ((bmpWidth * 3 + 3) >> 2) * 4;

function getScreenshotPixel(sx, sy) {
  const srcY = bmpHeight > 0 ? (bmpHeight - 1 - sy) : sy;
  const srcOff = dataOffset + srcY * rowSize + sx * 3;
  return { r: bmpBuf[srcOff + 2], g: bmpBuf[srcOff + 1], b: bmpBuf[srcOff + 0] };
}

function decodeCRAM(i) {
  const word = (cram[i * 2 + 1] << 8) | cram[i * 2];
  const r = (word & 0x07) * 36;
  const g = ((word >> 3) & 0x07) * 36;
  const b = ((word >> 6) & 0x07) * 36;
  return { r, g, b };
}

const palette = [];
for (let i = 0; i < 64; i++) palette.push(decodeCRAM(i));

// === Tile解码方法 ===
// 方法1: 行主序 (4字节/行)
function decodeTileRowMajor(tileIdx) {
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
      pixels[y * 8 + x] = ((p0 >> bit) & 1) | (((p1 >> bit) & 1) << 1) | (((p2 >> bit) & 1) << 2) | (((p3 >> bit) & 1) << 3);
    }
  }
  return pixels;
}

// 方法2: 平面主序 (8字节/平面)
function decodeTilePlaneMajor(tileIdx) {
  const offset = tileIdx * 32;
  const pixels = new Uint8Array(64);
  for (let y = 0; y < 8; y++) {
    const p0 = vram[offset + y];
    const p1 = vram[offset + y + 8];
    const p2 = vram[offset + y + 16];
    const p3 = vram[offset + y + 24];
    for (let x = 0; x < 8; x++) {
      const bit = 7 - x;
      pixels[y * 8 + x] = ((p0 >> bit) & 1) | (((p1 >> bit) & 1) << 1) | (((p2 >> bit) & 1) << 2) | (((p3 >> bit) & 1) << 3);
    }
  }
  return pixels;
}

// 方法3: 行主序 + 字节交换 (VRAM dump可能byte-swapped)
function decodeTileRowMajorSwapped(tileIdx) {
  const offset = tileIdx * 32;
  const pixels = new Uint8Array(64);
  for (let y = 0; y < 8; y++) {
    const rowOffset = offset + y * 4;
    // 交换每对字节: [0,1,2,3] → [1,0,3,2]
    const p0 = vram[rowOffset + 1];
    const p1 = vram[rowOffset];
    const p2 = vram[rowOffset + 3];
    const p3 = vram[rowOffset + 2];
    for (let x = 0; x < 8; x++) {
      const bit = 7 - x;
      pixels[y * 8 + x] = ((p0 >> bit) & 1) | (((p1 >> bit) & 1) << 1) | (((p2 >> bit) & 1) << 2) | (((p3 >> bit) & 1) << 3);
    }
  }
  return pixels;
}

// === 详细检查Tile 300 (位置20,10的Plane A) ===
console.log('=== Tile 300 原始数据 (偏移 0x' + (300 * 32).toString(16) + ') ===');
console.log('');

const tileOffset = 300 * 32;
console.log('原始字节:');
for (let y = 0; y < 8; y++) {
  let line = `行${y}: `;
  for (let x = 0; x < 4; x++) {
    line += `0x${vram[tileOffset + y * 4 + x].toString(16).padStart(2, '0')} `;
  }
  // 也显示平面主序视角
  line += ` | 平面视角: `;
  line += `p0=0x${vram[tileOffset + y].toString(16).padStart(2,'0')} `;
  line += `p1=0x${vram[tileOffset + y + 8].toString(16).padStart(2,'0')} `;
  line += `p2=0x${vram[tileOffset + y + 16].toString(16).padStart(2,'0')} `;
  line += `p3=0x${vram[tileOffset + y + 24].toString(16).padStart(2,'0')}`;
  console.log(line);
}

console.log('');
console.log('=== 三种解码方式的像素网格 ===');
console.log('');

const decoders = [
  { name: '行主序', fn: decodeTileRowMajor },
  { name: '平面主序', fn: decodeTilePlaneMajor },
  { name: '行主序+字节交换', fn: decodeTileRowMajorSwapped },
];

for (const dec of decoders) {
  const tile = dec.fn(300);
  console.log(`${dec.name}:`);
  for (let y = 0; y < 8; y++) {
    let line = '  ';
    for (let x = 0; x < 8; x++) {
      line += tile[y * 8 + x].toString(16).padStart(2, '0') + ' ';
    }
    console.log(line);
  }
  
  // 像素(0,0)的值
  console.log(`  像素(0,0) = ${tile[0]} → ${tile[0] === 0 ? '透明(背景色)' : `rgb(${palette[32 + tile[0]].r},${palette[32 + tile[0]].g},${palette[32 + tile[0]].b})`}`);
  console.log('');
}

// === 逐像素对比整个标题区域 ===
console.log('=== 标题区域逐像素对比 (tile 6-15, row 8-9) ===');
console.log('');
console.log('此区域Plane A(pal2)在高优先级, Plane B(pal3)在低优先级');
console.log('截图应该显示Plane A的颜色 (因为Plane A优先级更高)');
console.log('');

const PLANE_A_BASE = 0xC000;
const PLANE_B_BASE = 0xE000;

function readNametableEntryLE(base, tx, ty) {
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

// 统计匹配率
let matchCount = { rowMajor: 0, planeMajor: 0, rowMajorSwapped: 0 };
let totalCount = 0;

for (let ty = 8; ty < 10; ty++) {
  for (let tx = 6; tx < 16; tx++) {
    const ea = readNametableEntryLE(PLANE_A_BASE, tx, ty);
    const eb = readNametableEntryLE(PLANE_B_BASE, tx, ty);
    
    if (ea.word === 0) continue;
    
    for (let py = 0; py < 8; py++) {
      for (let px = 0; px < 8; px++) {
        const sx = tx * 8 + px;
        const sy = ty * 8 + py;
        const sc = getScreenshotPixel(sx, sy);
        
        const srcXa = ea.hflip ? (7 - px) : px;
        const srcYa = ea.vflip ? (7 - py) : py;
        
        const ci_row = decodeTileRowMajor(ea.tileIdx)[srcYa * 8 + srcXa];
        const ci_plane = decodeTilePlaneMajor(ea.tileIdx)[srcYa * 8 + srcXa];
        const ci_swap = decodeTileRowMajorSwapped(ea.tileIdx)[srcYa * 8 + srcXa];
        
        // 检查Plane A像素是否透明
        const palOffsetA = [0, 16, 32, 48][ea.palette];
        
        // 如果Plane A像素非透明，检查颜色是否匹配截图
        if (ci_row !== 0) {
          const c = palette[palOffsetA + ci_row];
          const diff = Math.abs(c.r - sc.r) + Math.abs(c.g - sc.g) + Math.abs(c.b - sc.b);
          if (diff < 30) matchCount.rowMajor++;
        } else {
          // 透明，检查是否与背景色匹配
          if (sc.r === 0 && sc.g === 0 && sc.b === 72) matchCount.rowMajor++;
        }
        
        if (ci_plane !== 0) {
          const c = palette[palOffsetA + ci_plane];
          const diff = Math.abs(c.r - sc.r) + Math.abs(c.g - sc.g) + Math.abs(c.b - sc.b);
          if (diff < 30) matchCount.planeMajor++;
        } else {
          if (sc.r === 0 && sc.g === 0 && sc.b === 72) matchCount.planeMajor++;
        }
        
        if (ci_swap !== 0) {
          const c = palette[palOffsetA + ci_swap];
          const diff = Math.abs(c.r - sc.r) + Math.abs(c.g - sc.g) + Math.abs(c.b - sc.b);
          if (diff < 30) matchCount.rowMajorSwapped++;
        } else {
          if (sc.r === 0 && sc.g === 0 && sc.b === 72) matchCount.rowMajorSwapped++;
        }
        
        totalCount++;
      }
    }
  }
}

console.log(`总像素数: ${totalCount}`);
console.log(`行主序匹配: ${matchCount.rowMajor} (${(matchCount.rowMajor/totalCount*100).toFixed(1)}%)`);
console.log(`平面主序匹配: ${matchCount.planeMajor} (${(matchCount.planeMajor/totalCount*100).toFixed(1)}%)`);
console.log(`行主序+字节交换匹配: ${matchCount.rowMajorSwapped} (${(matchCount.rowMajorSwapped/totalCount*100).toFixed(1)}%)`);

// === 更大范围验证 (整个屏幕) ===
console.log('');
console.log('=== 全屏幕匹配率统计 ===');
console.log('');

let fullMatch = { rowMajor: 0, planeMajor: 0, rowMajorSwapped: 0 };
let fullTotal = 0;

const ROWS = 28, COLS = 40;
const DISPLAY_W = 320;

for (let ty = 0; ty < ROWS; ty++) {
  for (let tx = 0; tx < COLS; tx++) {
    const ea = readNametableEntryLE(PLANE_A_BASE, tx, ty);
    const eb = readNametableEntryLE(PLANE_B_BASE, tx, ty);
    
    for (let py = 0; py < 8; py++) {
      for (let px = 0; px < 8; px++) {
        const sx = tx * 8 + px;
        const sy = ty * 8 + py;
        if (sx >= DISPLAY_W) continue;
        
        const sc = getScreenshotPixel(sx, sy);
        
        // 计算最终像素颜色 (考虑优先级: B低→A低→B高→A高)
        function getFinalColor(decoder) {
          let color = { r: 0, g: 0, b: 72 }; // 背景色
          
          // Plane B 低优先级
          if (eb.word !== 0 && eb.priority === 0) {
            const srcX = eb.hflip ? (7 - px) : px;
            const srcY = eb.vflip ? (7 - py) : py;
            const ci = decoder(eb.tileIdx)[srcY * 8 + srcX];
            if (ci !== 0) color = palette[[0,16,32,48][eb.palette] + ci];
          }
          
          // Plane A 低优先级
          if (ea.word !== 0 && ea.priority === 0) {
            const srcX = ea.hflip ? (7 - px) : px;
            const srcY = ea.vflip ? (7 - py) : py;
            const ci = decoder(ea.tileIdx)[srcY * 8 + srcX];
            if (ci !== 0) color = palette[[0,16,32,48][ea.palette] + ci];
          }
          
          // Plane B 高优先级
          if (eb.word !== 0 && eb.priority === 1) {
            const srcX = eb.hflip ? (7 - px) : px;
            const srcY = eb.vflip ? (7 - py) : py;
            const ci = decoder(eb.tileIdx)[srcY * 8 + srcX];
            if (ci !== 0) color = palette[[0,16,32,48][eb.palette] + ci];
          }
          
          // Plane A 高优先级
          if (ea.word !== 0 && ea.priority === 1) {
            const srcX = ea.hflip ? (7 - px) : px;
            const srcY = ea.vflip ? (7 - py) : py;
            const ci = decoder(ea.tileIdx)[srcY * 8 + srcX];
            if (ci !== 0) color = palette[[0,16,32,48][ea.palette] + ci];
          }
          
          return color;
        }
        
        const cRow = getFinalColor(decodeTileRowMajor);
        const cPlane = getFinalColor(decodeTilePlaneMajor);
        const cSwap = getFinalColor(decodeTileRowMajorSwapped);
        
        const diffRow = Math.abs(cRow.r - sc.r) + Math.abs(cRow.g - sc.g) + Math.abs(cRow.b - sc.b);
        const diffPlane = Math.abs(cPlane.r - sc.r) + Math.abs(cPlane.g - sc.g) + Math.abs(cPlane.b - sc.b);
        const diffSwap = Math.abs(cSwap.r - sc.r) + Math.abs(cSwap.g - sc.g) + Math.abs(cSwap.b - sc.b);
        
        if (diffRow < 30) fullMatch.rowMajor++;
        if (diffPlane < 30) fullMatch.planeMajor++;
        if (diffSwap < 30) fullMatch.rowMajorSwapped++;
        fullTotal++;
      }
    }
  }
}

console.log(`总像素数: ${fullTotal}`);
console.log(`行主序匹配: ${fullMatch.rowMajor} (${(fullMatch.rowMajor/fullTotal*100).toFixed(1)}%)`);
console.log(`平面主序匹配: ${fullMatch.planeMajor} (${(fullMatch.planeMajor/fullTotal*100).toFixed(1)}%)`);
console.log(`行主序+字节交换匹配: ${fullMatch.rowMajorSwapped} (${(fullMatch.rowMajorSwapped/fullTotal*100).toFixed(1)}%)`);
