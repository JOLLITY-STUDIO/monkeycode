import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const DATA_DIR = join(ROOT, 'src/langrisser2/20260713');

const VRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');
const CRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');
const BMP_PATH = join(ROOT, 'src/langrisser2/screenshots/Langrisser II (Japan)_034.bmp');

const vram = new Uint8Array(readFileSync(VRAM_PATH));
const cram = new Uint8Array(readFileSync(CRAM_PATH));
const bmpBuf = readFileSync(BMP_PATH);

const bmpWidth = bmpBuf.readInt32LE(18);
const bmpHeight = bmpBuf.readInt32LE(22);
const dataOffset = bmpBuf.readUInt32LE(10);
const rowSize = ((bmpWidth * 3 + 3) >> 2) * 4;

console.log('=== BMP 截图信息 ===');
console.log(`尺寸: ${bmpWidth} x ${bmpHeight}`);
console.log(`数据偏移: 0x${dataOffset.toString(16)}`);
console.log(`行字节数: ${rowSize}`);
console.log('');

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
  return { r, g, b, word };
}

const PLANE_A_BASE = 0xC000;
const PLANE_B_BASE = 0xE000;
const DISPLAY_W = 320;
const DISPLAY_H = 224;
const COLS = 40;
const ROWS = 28;

function readNametableEntry(base, tx, ty) {
  const addr = base + (ty * 64 + tx) * 2;
  const lo = vram[addr];
  const hi = vram[addr + 1];
  const word = (hi << 8) | lo;
  return {
    addr,
    priority: (word >> 15) & 1,
    palette: (word >> 13) & 3,
    hflip: (word >> 12) & 1,
    vflip: (word >> 11) & 1,
    tileIdx: word & 0x7FF,
    word,
    rawBytes: [lo, hi]
  };
}

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

function tracePixel(sx, sy) {
  console.log(`\n=== 像素追踪 (${sx}, ${sy}) ===`);
  
  const sc = getScreenshotPixel(sx, sy);
  console.log(`截图颜色: rgb(${sc.r}, ${sc.g}, ${sc.b})`);
  
  const tx = Math.floor(sx / 8);
  const ty = Math.floor(sy / 8);
  const px = sx % 8;
  const py = sy % 8;
  
  console.log(`Tile 坐标: (${tx}, ${ty}), 像素内偏移: (${px}, ${py})`);
  
  const eA = readNametableEntry(PLANE_A_BASE, tx, ty);
  const eB = readNametableEntry(PLANE_B_BASE, tx, ty);
  
  console.log(`\nPlane A (0xC000):`);
  console.log(`  地址: 0x${eA.addr.toString(16)}`);
  console.log(`  原始字节: [0x${eA.rawBytes[0].toString(16).padStart(2,'0')}, 0x${eA.rawBytes[1].toString(16).padStart(2,'0')}]`);
  console.log(`  Word: 0x${eA.word.toString(16).padStart(4,'0')}`);
  console.log(`  优先级: ${eA.priority}, 调色板: ${eA.palette}, H翻转: ${eA.hflip}, V翻转: ${eA.vflip}`);
  console.log(`  Tile索引: ${eA.tileIdx} (0x${eA.tileIdx.toString(16)})`);
  
  if (eA.word !== 0) {
    const tileOffset = eA.tileIdx * 32;
    console.log(`  Tile数据地址: 0x${tileOffset.toString(16)}`);
    console.log(`  Tile前32字节:`);
    let hexDump = '    ';
    for (let i = 0; i < 32; i++) {
      hexDump += vram[tileOffset + i].toString(16).padStart(2, '0') + ' ';
      if (i === 15) hexDump += '\n    ';
    }
    console.log(hexDump);
    
    const tile = decodeTileRowMajor(eA.tileIdx);
    const srcX = eA.hflip ? (7 - px) : px;
    const srcY = eA.vflip ? (7 - py) : py;
    const pixel = tile[srcY * 8 + srcX];
    console.log(`  行主序解码像素值: ${pixel}`);
    
    if (pixel !== 0) {
      const color = decodeCRAM(eA.palette * 16 + pixel);
      console.log(`  颜色: CRAM[${eA.palette * 16 + pixel}] = rgb(${color.r}, ${color.g}, ${color.b}) (word=0x${color.word.toString(16)})`);
    } else {
      console.log(`  透明像素`);
    }
  }
  
  console.log(`\nPlane B (0xE000):`);
  console.log(`  地址: 0x${eB.addr.toString(16)}`);
  console.log(`  原始字节: [0x${eB.rawBytes[0].toString(16).padStart(2,'0')}, 0x${eB.rawBytes[1].toString(16).padStart(2,'0')}]`);
  console.log(`  Word: 0x${eB.word.toString(16).padStart(4,'0')}`);
  console.log(`  优先级: ${eB.priority}, 调色板: ${eB.palette}, H翻转: ${eB.hflip}, V翻转: ${eB.vflip}`);
  console.log(`  Tile索引: ${eB.tileIdx} (0x${eB.tileIdx.toString(16)})`);
  
  if (eB.word !== 0) {
    const tileOffset = eB.tileIdx * 32;
    console.log(`  Tile数据地址: 0x${tileOffset.toString(16)}`);
    console.log(`  Tile前32字节:`);
    let hexDump = '    ';
    for (let i = 0; i < 32; i++) {
      hexDump += vram[tileOffset + i].toString(16).padStart(2, '0') + ' ';
      if (i === 15) hexDump += '\n    ';
    }
    console.log(hexDump);
    
    const tile = decodeTileRowMajor(eB.tileIdx);
    const srcX = eB.hflip ? (7 - px) : px;
    const srcY = eB.vflip ? (7 - py) : py;
    const pixel = tile[srcY * 8 + srcX];
    console.log(`  行主序解码像素值: ${pixel}`);
    
    if (pixel !== 0) {
      const color = decodeCRAM(eB.palette * 16 + pixel);
      console.log(`  颜色: CRAM[${eB.palette * 16 + pixel}] = rgb(${color.r}, ${color.g}, ${color.b}) (word=0x${color.word.toString(16)})`);
    } else {
      console.log(`  透明像素`);
    }
  }
  
  const bgColor = decodeCRAM(4);
  console.log(`\n背景色: CRAM[4] = rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b}) (word=0x${bgColor.word.toString(16)})`);
}

// 追踪多个关键像素
const testPixels = [
  [160, 80],   // 之前发现的问题点
  [48, 100],   // 另一个不匹配点
  [10, 10],    // 左上角
  [160, 112],  // 中心
  [50, 50],    // 标题区域
  [200, 150],  // 右下区域
];

for (const [x, y] of testPixels) {
  tracePixel(x, y);
}

console.log('\n\n=== 调色板内容 ===');
for (let pal = 0; pal < 4; pal++) {
  console.log(`\n调色板 ${pal} (CRAM[${pal*16}-${pal*16+15}]):`);
  for (let i = 0; i < 16; i++) {
    const c = decodeCRAM(pal * 16 + i);
    const word = c.word;
    console.log(`  [${i}] word=0x${word.toString(16).padStart(4,'0')} bytes=[0x${cram[(pal*16+i)*2].toString(16).padStart(2,'0')}, 0x${cram[(pal*16+i)*2+1].toString(16).padStart(2,'0')}] → rgb(${c.r.toString().padStart(3)}, ${c.g.toString().padStart(3)}, ${c.b.toString().padStart(3)})`);
  }
}

// 统计截图中的主要颜色
console.log('\n\n=== 截图主要颜色统计 ===');
const colorCount = new Map();
for (let y = 0; y < Math.min(bmpHeight, DISPLAY_H); y++) {
  for (let x = 0; x < Math.min(bmpWidth, DISPLAY_W); x++) {
    const c = getScreenshotPixel(x, y);
    // 量化到 36 的倍数
    const key = `${Math.round(c.r/36)*36},${Math.round(c.g/36)*36},${Math.round(c.b/36)*36}`;
    colorCount.set(key, (colorCount.get(key) || 0) + 1);
  }
}
const sortedColors = [...colorCount.entries()].sort((a, b) => b[1] - a[1]);
console.log('前 20 种主要颜色:');
for (const [color, count] of sortedColors.slice(0, 20)) {
  console.log(`  rgb(${color}): ${count} 像素`);
}
