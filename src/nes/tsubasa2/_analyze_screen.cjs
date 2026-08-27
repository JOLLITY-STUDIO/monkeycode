const fs = require('fs');
const zlib = require('zlib');

function decodePng(file) {
  const data = fs.readFileSync(file);
  const w = data.readUInt32BE(16);
  const h = data.readUInt32BE(20);
  const ct = data[25];
  let idat = Buffer.alloc(0);
  let pos = 8;
  while (pos + 8 <= data.length) {
    const len = data.readUInt32BE(pos);
    const type = data.toString('ascii', pos + 4, pos + 8);
    if (type === 'IDAT') idat = Buffer.concat([idat, data.slice(pos + 8, pos + 8 + len)]);
    pos += 12 + len;
    if (type === 'IEND') break;
  }
  const raw = zlib.inflateSync(idat);
  const bpp = ct === 6 ? 4 : ct === 2 ? 3 : 1;
  const rowLen = w * bpp + 1;
  const px = new Uint8Array(w * h * 4);
  const prev = new Uint8Array(w * bpp);
  for (let y = 0; y < h; y++) {
    const f = raw[y * rowLen];
    const line = raw.slice(y * rowLen + 1, (y + 1) * rowLen);
    const cur = new Uint8Array(w * bpp);
    for (let x = 0; x < w * bpp; x++) {
      let v = line[x];
      switch (f) {
        case 0: break;
        case 1: v = (v + (x >= bpp ? cur[x - bpp] : 0)) & 0xff; break;
        case 2: v = (v + prev[x]) & 0xff; break;
        case 3: v = (v + ((x >= bpp ? cur[x - bpp] : 0) + prev[x]) / 2) & 0xff; break;
        case 4: {
          const a = x >= bpp ? cur[x - bpp] : 0;
          const b = prev[x];
          const c = x >= bpp ? prev[x - bpp] : 0;
          const p = a + b - c;
          const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
          v = (v + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c)) & 0xff;
          break;
        }
      }
      cur[x] = v;
      px[y * w * 4 + x] = v;
    }
    prev.set(cur);
  }
  return { w, h, px };
}

// 每 8 像素行统计非黑像素数
function rowProfile(px, w, h) {
  const rows = [];
  for (let ty = 0; ty < 30; ty++) {
    let nz = 0;
    const cols = [];
    for (let tx = 0; tx < 32; tx++) {
      let cellNz = 0;
      for (let dy = 0; dy < 8; dy++) {
        for (let dx = 0; dx < 8; dx++) {
          const y = ty * 8 + dy, x = tx * 8 + dx;
          const o = (y * w + x) * 4;
          const r = px[o], g = px[o + 1], b = px[o + 2];
          if (r < 240 || g < 240 || b < 240) cellNz++; // 非近白
        }
      }
      nz += cellNz > 0 ? 1 : 0;
      cols.push(cellNz);
    }
    rows.push({ nz, cols });
  }
  return rows;
}

function ntProfile(file) {
  const nt = JSON.parse(fs.readFileSync(file, 'utf8'));
  const out = {};
  for (const [k, o] of Object.entries(nt)) {
    const t = o.tile || o.tiles;
    const rows = [];
    for (let r = 0; r < 32; r++) {
      let nz = 0;
      const cols = [];
      for (let c = 0; c < 32; c++) {
        if (t[r * 32 + c] !== 0) { nz++; cols.push(c); }
      }
      rows.push({ nz, cols });
    }
    out[k] = rows;
  }
  return out;
}

const screen = decodePng('output/emu-full/frame-0760/screen.png');
console.log('screen', screen.w, screen.h);
const sp = rowProfile(screen.px, screen.w, screen.h);
console.log('=== screen tile rows (non-near-white cols) ===');
for (let r = 0; r < 30; r++) {
  const rz = sp[r];
  if (rz.nz > 0) console.log('row' + String(r).padStart(2) + ': nz=' + rz.nz + ' cols=' + rz.cols.filter((v, i) => v > 0).join(','));
}
const np = ntProfile('output/emu-full/frame-0760/nt.json');
for (const k of Object.keys(np)) {
  console.log('=== nt' + k + ' tile rows (nonzero) ===');
  for (let r = 0; r < 32; r++) {
    const rz = np[k][r];
    if (rz.nz > 0) console.log('row' + String(r).padStart(2) + ': nz=' + rz.nz + ' cols=' + rz.cols.join(','));
  }
}
