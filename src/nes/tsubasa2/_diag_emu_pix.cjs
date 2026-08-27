// emu PNG 精确像素 dump y14-y26 x0-63 + 检查 palette
const fs = require('fs');
const zlib = require('zlib');
const b = fs.readFileSync('output/emu-full/frame-0800/screen.png');
let pos = 8, w = 0, h = 0, ct = 0, idat = [];
while (pos < b.length) {
  const len = b.readUInt32BE(pos);
  const t = b.slice(pos + 4, pos + 8).toString();
  const d = b.slice(pos + 8, pos + 8 + len);
  if (t === 'IHDR') { w = d.readUInt32BE(0); h = d.readUInt32BE(4); ct = d[9]; }
  else if (t === 'IDAT') idat.push(d);
  else if (t === 'IEND') break;
  pos += 12 + len;
}
const raw = zlib.inflateSync(Buffer.concat(idat));
const bpp = 4, stride = w * bpp;
const out = Buffer.alloc(h * stride);
let prev = Buffer.alloc(stride), p = 0;
for (let y = 0; y < h; y++) {
  const f = raw[p++];
  const line = raw.slice(p, p + stride);
  const cur = out.slice(y * stride, (y + 1) * stride);
  for (let x = 0; x < stride; x++) {
    const a = x >= bpp ? cur[x - bpp] : 0;
    const bb = y > 0 ? prev[x] : 0;
    const c = x >= bpp && y > 0 ? prev[x - bpp] : 0;
    let v = line[x];
    if (f === 1) v += a;
    else if (f === 2) v += bb;
    else if (f === 3) v += (a + bb) >> 1;
    else if (f === 4) {
      const pa = Math.abs(bb - c), pb = Math.abs(a - c), pc = Math.abs(a + bb - 2 * c);
      v += (pa <= pb && pa <= pc ? a : pb <= pc ? bb : c);
    }
    cur[x] = v & 0xff;
  }
  prev = cur;
  p += stride;
}
const lines = [];
for (let y = 14; y <= 26; y++) {
  let s = 'emu y' + y + ': ';
  for (let x = 0; x < 64; x++) {
    const pp = y * stride + x * bpp;
    const v = (out[pp] << 16) | (out[pp + 1] << 8) | out[pp + 2];
    s += (v === 0 ? '.' : v.toString(16).padStart(6, '0').slice(0, 4)) + ' ';
  }
  lines.push(s);
}
lines.push('bgTable: ' + JSON.stringify(fs.existsSync('output/emu-full/frame-0800/bgTable.json') ? '' : 'n/a'));
// palette
try {
  const pal = JSON.parse(fs.readFileSync('output/emu-full/frame-0800/palette.json', 'utf8'));
  lines.push('emu palette bg: ' + JSON.stringify(pal.bg || pal.bg));
} catch (e) { lines.push('no palette: ' + e.message); }
fs.writeFileSync('_diag_emu_pix.txt', lines.join('\n'));
console.log('done');
