// 临时: 解码 emu screen.png, 把顶部/底部行按亮度转 ASCII 观察实际内容位置
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

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

const charset = ' .:-=+*#%@';
for (const f of [50, 450]) {
  const { w, h, rgba } = decodePng(`output/emu-full/frame-${String(f).padStart(4, '0')}/screen.png`);
  console.log(`===== emu f${f} (${w}x${h}) top/bottom rows =====`);
  const show = (y0, y1, label) => {
    console.log(`-- ${label} --`);
    for (let y = y0; y < y1; y++) {
      let line = String(y).padStart(3) + ' ';
      for (let x = 0; x < 256; x += 2) {
        const i = (y * w + x) * 4;
        const lum = (rgba[i] * 3 + rgba[i + 1] * 6 + rgba[i + 2]) / 10;
        line += charset[Math.min(9, Math.floor((lum / 256) * 10))];
      }
      console.log(line);
    }
  };
  show(0, 16, 'top 16 rows');
  show(230, 240, 'bottom 10 rows');
}
