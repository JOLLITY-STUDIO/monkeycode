/** 读取 chr-bank-00.ts，以 32×16 格式渲染 Pattern Table 0 ASCII */
const fs = require('fs');
const src = fs.readFileSync(__dirname + '/rom-data/chr-bank-00.ts', 'utf8');
const matches = src.matchAll(/0x([0-9a-fA-F]{2})/g);
const bytes = [];
for (const m of matches) bytes.push(parseInt(m[1], 16));

console.log(`Total bytes: ${bytes.length}`);

function renderTile(buf) {
  const lines = [];
  for (let row = 0; row < 8; row++) {
    const bp0 = buf[row];
    const bp1 = buf[row + 8];
    let line = '';
    for (let col = 7; col >= 0; col--) {
      const v = ((bp0 >> col) & 1) | (((bp1 >> col) & 1) << 1);
      line += ' ·░▒▓'[v];
    }
    lines.push(line);
  }
  return lines;
}

const COLS = 32; // 宽32列
const TILE_SZ = 16;

// 只渲染 Pattern Table 0 (tile 0-255)
const pt0 = [];
for (let i = 0; i < 256; i++) {
  const off = i * TILE_SZ;
  pt0.push(renderTile(bytes.slice(off, off + TILE_SZ)));
}

// 逐行输出，每行8像素高
for (let bigRow = 0; bigRow < 8; bigRow++) {
  // 每行 tile 有 8 像素
  for (let px = 0; px < 8; px++) {
    let out = '';
    for (let col = 0; col < COLS; col++) {
      if (col > 0 && col % 16 === 0) out += '  '; // 半行间隔
      out += pt0[bigRow * COLS + col][px];
    }
    console.log(out);
  }
  // 索引行
  let idxStr = '';
  for (let col = 0; col < COLS; col++) {
    const idx = bigRow * COLS + col;
    idxStr += idx.toString(16).toUpperCase().padStart(2, '0');
    if (col < COLS - 1 && (col + 1) % 16 === 0) idxStr += '  ';
  }
  console.log(idxStr);
  console.log('');
}
