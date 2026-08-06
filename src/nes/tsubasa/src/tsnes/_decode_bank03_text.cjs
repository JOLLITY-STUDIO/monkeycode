/**
 * 直接对照 bank-03 对话数据 + chr-bank-00 tile 数据，渲染出可读的文本 BMP
 * 用法: node _decode_bank03_text.cjs
 */
const fs = require('fs');
const path = require('path');

// ── 读 CHR Bank 00 ──
const chrRaw = fs.readFileSync(path.join(__dirname, 'rom-data', 'chr-bank-00.ts'), 'utf-8');
const cm = chrRaw.match(/\[\s*([\s\S]*?)\s*\];/);
const CHR = cm[1].split(',').map(s => parseInt(s.trim(), 16)).filter(b => !isNaN(b));
if (CHR.length > 8192) CHR.length = 8192;

// ── 读 Bank 03 ──
const b03Raw = fs.readFileSync(
  path.join(__dirname, 'game-engine', 'native-game', 'tsubasa', 'banks', 'prg', 'bank-03-data-only.ts'),
  'utf-8'
);
const bm = b03Raw.match(/readonly\s+number\[\]\s*=\s*\[\s*([\s\S]*?)\s*\];/);
const BANK03 = bm[1].split(',').map(s => parseInt(s.trim(), 16)).filter(b => !isNaN(b));

// ── 从 CHR 拿到 tile 像素 ──
function getTilePixels(tileId) {
  const off = tileId * 16;
  const p = [];
  for (let y = 0; y < 8; y++) {
    p.push((CHR[off + y] << 8) | CHR[off + 8 + y]); // plane0=high, plane1=low
  }
  return p;
}

function isBlankTile(tid) {
  const off = tid * 16;
  for (let i = 0; i < 16; i++) if (CHR[off + i]) return false;
  return true;
}

// ── 控制码（非文本 tile）──
const CTRL = new Set([
  0x00, 0xFF,
  0xDB, 0xDC, 0xDD, 0xDE, 0xDF,
  0xE1, 0xE2, 0xE3, 0xE4,
  0xE8, 0xE9, 0xEA, 0xEB, 0xEC, 0xED, 0xEE, 0xEF,
  0xF1, 0xF2, 0xF3, 0xF4, 0xF5, 0xF6, 0xF7, 0xF8, 0xF9, 0xFA, 0xFB, 0xFC, 0xFD, 0xFE,
]);

// ── 从 bank-03 提取连续文本段 ──
const segments = [];
let buf = [];
for (const b of BANK03) {
  if (b >= 0x01 && b <= 0xFE && !CTRL.has(b) && !isBlankTile(b)) {
    buf.push(b);
  } else {
    if (buf.length >= 3) segments.push([...buf]);
    buf = [];
  }
}
if (buf.length >= 3) segments.push([...buf]);

console.log(`找到 ${segments.length} 个文本段`);

// ── 去重、排序，输出 tile 列表 ──
const allTiles = new Set();
for (const seg of segments) for (const t of seg) allTiles.add(t);
const sortedTiles = [...allTiles].sort((a, b) => a - b);
console.log(`使用到 ${sortedTiles.length} 个唯一 tile ID:`);
console.log(sortedTiles.map(t => '0x' + t.toString(16).toUpperCase().padStart(2, '0')
  + '(' + t + ')').join(', '));

// ── 写 BMP ──
function writeBMP(pixels, w, h, scale, fpath) {
  const sw = w * scale, sh = h * scale;
  const rowBytes = Math.ceil(sw * 3 / 4) * 4;
  const dataSize = rowBytes * sh;
  const buf = Buffer.alloc(54 + dataSize, 0);
  buf.write('BM', 0); buf.writeUInt32LE(54 + dataSize, 2);
  buf.writeUInt32LE(54, 10); buf.writeUInt32LE(40, 14);
  buf.writeInt32LE(sw, 18); buf.writeInt32LE(-sh, 22);
  buf.writeUInt16LE(1, 26); buf.writeUInt16LE(24, 28);
  buf.writeUInt32LE(dataSize, 34);

  const pal = [[0,0,0],[80,80,80],[170,170,170],[255,255,255]];
  for (let y = 0; y < sh; y++) {
    const sy = Math.floor(y / scale);
    const ro = 54 + y * rowBytes;
    for (let x = 0; x < sw; x++) {
      const sx = Math.floor(x / scale);
      const c = pal[pixels[sy][sx]] || pal[0];
      const po = ro + x * 3;
      buf[po] = c[2]; buf[po+1] = c[1]; buf[po+2] = c[0];
    }
  }
  fs.writeFileSync(fpath, buf);
}

// ── 把每个文本段渲染为一行 BMP ──
const outDir = path.join(__dirname, 'temp', 'chr_bank0', 'bank03_text');
fs.mkdirSync(outDir, { recursive: true });

const GAP = 2;
for (let i = 0; i < segments.length; i++) {
  const tiles = segments[i];
  const w = tiles.length * 8 + (tiles.length - 1) * GAP;
  const h = 8;
  const pixels = Array.from({ length: h }, () => new Array(w).fill(0));

  for (let ti = 0; ti < tiles.length; ti++) {
    const tp = getTilePixels(tiles[ti]);
    const bx = ti * (8 + GAP);
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        const bit = 0x80 >> x;
        const c = ((tp[y] & (bit << 8) ? 1 : 0) | ((tp[y] & bit) ? 2 : 0));
        pixels[y][bx + x] = c;
      }
    }
  }

  const hexLabel = tiles.map(t => t.toString(16).toUpperCase().padStart(2, '0')).join('_');
  writeBMP(pixels, w, h, 4, path.join(outDir, `seg_${i.toString().padStart(3, '0')}_${hexLabel}.bmp`));
}

// ── 生成 tile 对照大图：每个 tile 单独渲染，带上 ID 标签 ──
function renderTilePixels(tileId) {
  const tp = getTilePixels(tileId);
  const p = Array.from({ length: 8 }, () => new Array(8).fill(0));
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const bit = 0x80 >> x;
      p[y][x] = ((tp[y] & (bit << 8)) ? 1 : 0) | ((tp[y] & bit) ? 2 : 0);
    }
  }
  return p;
}

// tile 对照表：16 列，仅渲染 bank-03 中用到的 tile
const tCols = 16;
const tRows = Math.ceil(sortedTiles.length / tCols);
const cellW = 8, cellH = 10, tGap = 1;
const refW = tCols * cellW + (tCols + 1) * tGap;
const refH = tRows * cellH + (tRows + 1) * tGap;

const refPx = Array.from({ length: refH }, () => new Array(refW).fill(1)); // 灰底

for (let i = 0; i < sortedTiles.length; i++) {
  const tid = sortedTiles[i];
  const col = i % tCols;
  const row = Math.floor(i / tCols);
  const bx = col * cellW + (col + 1) * tGap;
  const by = row * cellH + (row + 1) * tGap;

  const tp = renderTilePixels(tid);
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      refPx[by + y][bx + x] = tp[y][x];
    }
  }
  // tile ID 写在 tile 下方（最后 2 行用白色点标记 hex 高位/低位）
  const hi = (tid >> 4) & 0xF;
  const lo = tid & 0xF;
  for (let x = 0; x < 4; x++) if (hi & (8 >> x)) refPx[by + 8][bx + x] = 3;
  for (let x = 4; x < 8; x++) if (lo & (8 >> (x - 4))) refPx[by + 8][bx + x] = 3;
}

writeBMP(refPx, refW, refH, 4, path.join(outDir, 'tile_reference.bmp'));

// ── 输出文本报告 ──
let report = `# Bank 03 对话文本解码\n\n`;
report += `文本段: ${segments.length}\n`;
report += `使用 tile ID: ${sortedTiles.map(t => '0x'+t.toString(16).toUpperCase().padStart(2,'0')).join(', ')}\n\n`;

for (let i = 0; i < segments.length; i++) {
  const tiles = segments[i];
  report += `## 段${i} (${tiles.length} tiles)\n`;
  report += `hex: ${tiles.map(t => t.toString(16).toUpperCase().padStart(2,'0')).join(' ')}\n`;
  report += `dec: ${tiles.join(' ')}\n`;

  // ASCII 艺术
  const ascii = [];
  for (let y = 0; y < 8; y++) {
    let line = '';
    for (const t of tiles) {
      const tp = getTilePixels(t);
      for (let x = 0; x < 8; x++) {
        const bit = 0x80 >> x;
        const c = ((tp[y] & (bit << 8)) ? 1 : 0) | ((tp[y] & bit) ? 2 : 0);
        line += ['·', '░', '▒', '█'][c];
      }
    }
    ascii.push(line);
  }
  report += '```\n' + ascii.join('\n') + '\n```\n\n';
}

fs.writeFileSync(path.join(outDir, 'report.txt'), report);

console.log(`\n全部输出到 temp/chr_bank0/bank03_text/`);
console.log(`  - seg_XXX.bmp  : 每个文本段渲染图`);
console.log(`  - tile_reference.bmp : tile ID 对照表`);
console.log(`  - report.txt   : 文本报告 + ASCII 艺术`);
