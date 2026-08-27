const fs = require('fs');
const zlib = require('zlib');

function parsePng(file) {
  const data = fs.readFileSync(file);
  let pos = 8;
  let width = 0, height = 0, bitDepth = 0, colorType = 0;
  const idat = [];
  while (pos < data.length) {
    const len = data.readUInt32BE(pos);
    const type = data.toString('ascii', pos + 4, pos + 8);
    if (type === 'IHDR') {
      width = data.readUInt32BE(pos + 8);
      height = data.readUInt32BE(pos + 12);
      bitDepth = data[pos + 16];
      colorType = data[pos + 17];
    } else if (type === 'IDAT') {
      idat.push(data.slice(pos + 8, pos + 8 + len));
    }
    pos += 12 + len;
  }
  const raw = zlib.inflateSync(Buffer.concat(idat));
  return { width, height, bitDepth, colorType, raw };
}

function paeth(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
}

function unfilter(raw, width, height, bpp) {
  const stride = width * bpp;
  const out = Buffer.alloc(height * stride);
  let rpos = 0, opos = 0;
  for (let y = 0; y < height; y++) {
    const filter = raw[rpos++];
    for (let x = 0; x < stride; x++) {
      const rawVal = raw[rpos++];
      let left = x >= bpp ? out[opos - bpp] : 0;
      let up = y > 0 ? out[opos - stride] : 0;
      let upleft = (y > 0 && x >= bpp) ? out[opos - stride - bpp] : 0;
      let recon = 0;
      switch (filter) {
        case 0: recon = rawVal; break;
        case 1: recon = (rawVal + left) & 0xff; break;
        case 2: recon = (rawVal + up) & 0xff; break;
        case 3: recon = (rawVal + Math.floor((left + up) / 2)) & 0xff; break;
        case 4: recon = (rawVal + paeth(left, up, upleft)) & 0xff; break;
        default: recon = rawVal;
      }
      out[opos++] = recon;
    }
  }
  return out;
}

function sampleLum(file) {
  const { width, height, colorType, raw } = parsePng(file);
  const bpp = colorType === 6 ? 4 : (colorType === 2 ? 3 : 1);
  const un = unfilter(raw, width, height, bpp);
  let sum = 0, cnt = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const off = y * (width * bpp) + x * bpp;
      const r = un[off], g = un[off + 1], b = un[off + 2];
      sum += (r * 299 + g * 587 + b * 114) / 1000;
      cnt++;
    }
  }
  return { width, height, avg: cnt ? sum / cnt : 0 };
}

for (let f = 1; f <= 200; f++) {
  const p = `output/emu-full/frame-${String(f).padStart(4, '0')}/screen.png`;
  if (!fs.existsSync(p)) continue;
  const { avg, width, height } = sampleLum(p);
  if (avg > 1) console.log(`f=${f} avg=${avg.toFixed(2)} size=${width}x${height}`);
}
