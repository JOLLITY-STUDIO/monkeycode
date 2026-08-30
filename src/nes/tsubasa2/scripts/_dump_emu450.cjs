// 解码 emu f450 screen.png, dump y0-5 与 y215-239 非零像素 x 范围 + 每行非零计数
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const ROOT = path.resolve(__dirname, '..');

function decodePng(file) {
  const data = fs.readFileSync(file);
  const ihdr = data.indexOf('IHDR');
  const w = data.readUInt32BE(ihdr + 4);
  const h = data.readUInt32BE(ihdr + 8);
  const ct = data[ihdr + 13];
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
  const stride = w * bpp;
  const rgba = Buffer.alloc(w * h * 4);
  const prev = Buffer.alloc(stride);
  const cur = Buffer.alloc(stride);
  for (let y = 0; y < h; y++) {
    const f = raw[y * (stride + 1)];
    raw.copy(cur, 0, y * (stride + 1) + 1, (y + 1) * (stride + 1));
    for (let x = 0; x < stride; x++) {
      const a = x >= bpp ? cur[x - bpp] : 0;
      const b = prev[x];
      const c = x >= bpp ? prev[x - bpp] : 0;
      let v = cur[x];
      if (f === 1) v = (v + a) & 0xff;
      else if (f === 2) v = (v + b) & 0xff;
      else if (f === 3) v = (v + ((a + b) >> 1)) & 0xff;
      else if (f === 4) {
        const p = a + b - c;
        const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
        v = (v + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c)) & 0xff;
      }
      cur[x] = v;
      const px = x % bpp;
      if (ct === 6) {
        if (px === 0) rgba[(y * w + ((x / 4) | 0)) * 4] = cur[x];
        else if (px === 1) rgba[(y * w + ((x / 4) | 0)) * 4 + 1] = cur[x];
        else if (px === 2) rgba[(y * w + ((x / 4) | 0)) * 4 + 2] = cur[x];
      } else if (ct === 2) {
        if (px === 0) rgba[(y * w + ((x / 3) | 0)) * 4] = cur[x];
        else if (px === 1) rgba[(y * w + ((x / 3) | 0)) * 4 + 1] = cur[x];
        else if (px === 2) rgba[(y * w + ((x / 3) | 0)) * 4 + 2] = cur[x];
      }
    }
  }
  return { w, h, rgba };
}

const { w, h, rgba } = decodePng(path.join(ROOT, 'output/emu-full/frame-0450/screen.png'));
console.log('size', w, h);
// 每行非零像素计数 + 范围
for (let y = 0; y < h; y++) {
  let cnt = 0, minX = -1, maxX = -1;
  for (let x = 0; x < w; x++) {
    const i = (y * w + x) * 4;
    if (rgba[i] || rgba[i + 1] || rgba[i + 2]) {
      cnt++;
      if (minX < 0) minX = x;
      maxX = x;
    }
  }
  if (y < 12 || (y >= 210 && y < 240)) {
    console.log(`y=${String(y).padStart(3)} nz=${String(cnt).padStart(4)} x=[${minX}..${maxX}]`);
  }
}
// 关键像素: y225 的采样颜色 (0,16,32,...,240)
for (const y of [137, 138, 139, 224, 225, 226, 227]) {
  const i = (y * w + 0) * 4;
  const row = [];
  for (let x = 0; x < 256; x += 16) {
    const j = (y * w + x) * 4;
    row.push(`x${x}=${rgba[j]},${rgba[j + 1]},${rgba[j + 2]}`);
  }
  console.log(`y${y} sample: ${row.join(' ')}`);
}
