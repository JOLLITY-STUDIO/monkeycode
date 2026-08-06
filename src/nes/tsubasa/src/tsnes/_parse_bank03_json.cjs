/**
 * bank-03 对话数据 → 结构化 JSON segments
 * 处理濁点(0x94)半濁点(0x95)合并到前一个基字
 * 重新渲染 BMP（濁点半濁点叠加在基字tile上）
 * 用法: node _parse_bank03_json.cjs
 */
const fs = require('fs');
const path = require('path');

// ── 读数据 ──
const b03Raw = fs.readFileSync(
  path.join(__dirname, 'game-engine', 'native-game', 'tsubasa', 'banks', 'prg', 'bank-03-data-only.ts'), 'utf-8'
);
const BANK03 = b03Raw.match(/readonly\s+number\[\]\s*=\s*\[\s*([\s\S]*?)\s*\];/)[1]
  .split(',').map(s => parseInt(s.trim(), 16)).filter(b => !isNaN(b));

const chrRaw = fs.readFileSync(path.join(__dirname, 'rom-data', 'chr-bank-00.ts'), 'utf-8');
const CHR = chrRaw.match(/\[\s*([\s\S]*?)\s*\];/)[1]
  .split(',').map(s => parseInt(s.trim(), 16)).filter(b => !isNaN(b));
if (CHR.length > 8192) CHR.length = 8192;

// ── 工具 ──
function isBlankTile(tid) {
  const off = tid * 16;
  for (let i = 0; i < 16; i++) if (CHR[off + i]) return false;
  return true;
}
function getTilePixels(tid) {
  const off = tid * 16;
  const rows = [];
  for (let y = 0; y < 8; y++) {
    const p0 = CHR[off + y], p1 = CHR[off + 8 + y];
    let line = '';
    for (let x = 0; x < 8; x++) {
      const mk = 0x80 >> x;
      line += ['·', '░', '▒', '█'][((p0 & mk) ? 1 : 0) | ((p1 & mk) ? 2 : 0)];
    }
    rows.push(line);
  }
  return rows;
}
function getTilePixels2D(tid) {
  const off = tid * 16;
  const rows = [];
  for (let y = 0; y < 8; y++) {
    const p0 = CHR[off + y], p1 = CHR[off + 8 + y];
    const row = [];
    for (let x = 0; x < 8; x++) {
      const mk = 0x80 >> x;
      row.push(((p0 & mk) ? 1 : 0) | ((p1 & mk) ? 2 : 0));
    }
    rows.push(row);
  }
  return rows;
}
// 合并两个 tile 像素（濁点叠加在基字上）
function mergeTiles(baseTid, dakutenTid) {
  const base = getTilePixels2D(baseTid);
  const dakuten = getTilePixels2D(dakutenTid);
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      if (dakuten[y][x] > 0) base[y][x] = Math.max(base[y][x], dakuten[y][x]);
    }
  }
  return base;
}

// ── 控制码 ──
const CTRL = new Set([
  0x00, 0xFF,
  0xDB, 0xDC, 0xDD, 0xDE, 0xDF,
  0xE1, 0xE2, 0xE3, 0xE4,
  0xE8, 0xE9, 0xEA, 0xEB, 0xEC, 0xED, 0xEE, 0xEF,
  0xF1, 0xF2, 0xF3, 0xF4, 0xF5, 0xF6, 0xF7, 0xF8,
  0xF9, 0xFA, 0xFB, 0xFC, 0xFD, 0xFE,
]);

const DAKUTEN = 0x94;   // ゛
const HANDAKUTEN = 0x95; // ゜

// ── 特殊字符 tile 标签 ──
const SPECIAL_TILES = {
  0x94: '゛', 0x95: '゜',
  0x7A: '、', 0x7B: '。',
  0x7D: '—', 0x7E: '・',
};

// ── 解析 segments ──
const segments = [];
let segStart = 0, segType = null;

function flush(end) {
  if (segType === null || segStart >= end) return;
  const raw = BANK03.slice(segStart, end);
  const hex = raw.map(b => b.toString(16).toUpperCase().padStart(2, '0')).join(' ');

  if (segType === 'text' && raw.length >= 3) {
    // 合并濁点/半濁点
    const chars = [];
    for (let i = 0; i < raw.length; i++) {
      if (raw[i] === DAKUTEN || raw[i] === HANDAKUTEN) {
        // 合并到前一个 tile
        if (chars.length > 0 && chars[chars.length - 1].type === 'char') {
          chars[chars.length - 1].mark = raw[i];
          chars[chars.length - 1].markType = raw[i] === DAKUTEN ? 'dakuten' : 'handakuten';
        }
      } else {
        const label = SPECIAL_TILES[raw[i]] || null;
        chars.push({ type: 'char', tile: raw[i], label, mark: null, markType: null });
      }
    }
    segments.push({
      type: 'text',
      offset: segStart,
      length: raw.length,
      hex,
      chars,
    });
  } else if (segType === 'control') {
    segments.push({
      type: 'control',
      offset: segStart,
      length: raw.length,
      hex,
      bytes: raw,
    });
  }
}

for (let i = 0; i < BANK03.length; i++) {
  const b = BANK03[i];
  const isCtrl = CTRL.has(b);
  const isText = b >= 0x01 && b <= 0xFE && !isCtrl && !isBlankTile(b);
  const curType = isCtrl ? 'control' : (isText ? 'text' : 'skip');

  if (segType !== null && curType !== segType) {
    flush(i);
    segStart = i;
    segType = curType;
  } else if (segType === null) {
    segStart = i;
    segType = curType;
  }
}
flush(BANK03.length);

const textSegs = segments.filter(s => s.type === 'text');
const ctrlSegs = segments.filter(s => s.type === 'control');
console.log(`text: ${textSegs.length}, control: ${ctrlSegs.length}, total: ${segments.length}`);

// ── 输出 JSON ──
const outDir = path.join(__dirname, 'temp', 'chr_bank0');
fs.mkdirSync(outDir, { recursive: true });

fs.writeFileSync(path.join(outDir, 'bank03_segments.json'), JSON.stringify(segments, null, 2));
fs.writeFileSync(path.join(outDir, 'bank03_text_segments.json'), JSON.stringify(textSegs, null, 2));

// ── 重新渲染 BMP（濁点合并模式）──
const bmpOutDir = path.join(outDir, 'bank03_text_v2');
fs.mkdirSync(bmpOutDir, { recursive: true });

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
      const [r, g, b] = pal[pixels[sy][sx]] || pal[0];
      const po = ro + x * 3;
      buf[po] = b; buf[po + 1] = g; buf[po + 2] = r;
    }
  }
  fs.writeFileSync(fpath, buf);
}

const GAP = 2;
for (let si = 0; si < textSegs.length; si++) {
  const chars = textSegs[si].chars;
  const totalTiles = chars.reduce((acc, c) => acc + 1, 0); // 每一char一个tile宽（含合并）
  const w = totalTiles * 8 + (totalTiles - 1) * GAP;
  const h = 8;
  const pixels = Array.from({ length: h }, () => new Array(w).fill(0));

  let bx = 0;
  for (const c of chars) {
    let p2d;
    if (c.mark !== null) {
      p2d = mergeTiles(c.tile, c.mark);
    } else {
      p2d = getTilePixels2D(c.tile);
    }
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        pixels[y][bx + x] = p2d[y][x];
      }
    }
    bx += 8 + GAP;
  }

  const label = textSegs[si].hex.replace(/\s/g, '_');
  writeBMP(pixels, w, h, 4, path.join(bmpOutDir, `seg_${si.toString().padStart(3, '0')}_${label.substring(0,40)}.bmp`));
}

// ── tile 对照表（只渲染用到的）──
const allTiles = new Set();
for (const seg of textSegs) {
  for (const c of seg.chars) {
    allTiles.add(c.tile);
    if (c.mark !== null) allTiles.add(c.mark);
  }
}
const sortedTiles = [...allTiles].sort((a, b) => a - b);
const tCols = 16;
const tRows = Math.ceil(sortedTiles.length / tCols);
const cellW = 8, cellH = 12, tGap = 1;
const refW = tCols * cellW + (tCols + 1) * tGap;
const refH = tRows * cellH + (tRows + 1) * tGap;
const refPx = Array.from({ length: refH }, () => new Array(refW).fill(1));

for (let i = 0; i < sortedTiles.length; i++) {
  const tid = sortedTiles[i];
  const col = i % tCols, row = Math.floor(i / tCols);
  const bx2 = col * cellW + (col + 1) * tGap;
  const by2 = row * cellH + (row + 1) * tGap;
  const tp = getTilePixels2D(tid);
  const label = SPECIAL_TILES[tid] || '';
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      refPx[by2 + y][bx2 + x] = tp[y][x];
    }
  }
  // tile ID 二进制标注（底行）
  const hi = (tid >> 4) & 0xF, lo = tid & 0xF;
  for (let x = 0; x < 4; x++) if (hi & (8 >> x)) refPx[by2 + 8][bx2 + x] = 3;
  for (let x = 4; x < 8; x++) if (lo & (8 >> (x - 4))) refPx[by2 + 8][bx2 + x] = 3;
  // 标签行
  if (label) {
    for (let x = 0; x < cellW; x++) refPx[by2 + 9][bx2 + x] = 0;
  }
}
writeBMP(refPx, refW, refH, 4, path.join(outDir, 'tile_reference_v2.bmp'));

// ── 精简版 JSON：只输出 chars 数组 ──
const simple = textSegs.map(s => ({
  offset: s.offset,
  chars: s.chars.map(c => ({
    tile: c.tile,
    label: c.label,
    ...(c.mark !== null ? { mark: c.mark, markType: c.markType } : {}),
  }))
}));
fs.writeFileSync(path.join(outDir, 'bank03_text_chars.json'), JSON.stringify(simple, null, 2));

console.log(`\n输出:`);
console.log(`  temp/chr_bank0/bank03_segments.json`);
console.log(`  temp/chr_bank0/bank03_text_segments.json`);
console.log(`  temp/chr_bank0/bank03_text_chars.json  (精简版)`);
console.log(`  temp/chr_bank0/bank03_text_v2/  (合并濁点的 BMP)`);
console.log(`  temp/chr_bank0/tile_reference_v2.bmp`);
