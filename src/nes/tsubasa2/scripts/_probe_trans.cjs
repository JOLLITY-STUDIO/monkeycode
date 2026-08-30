// 探测 f30-f130 过渡: prerender / 帧末 / screen 内容范围, 找 emu pre-render 行为切换点
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const ROOT = path.resolve(__dirname, '..');

const prerender = JSON.parse(fs.readFileSync(path.join(ROOT, 'output/emu-full/scroll-prerender.json'), 'utf8'));

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
  let minY = -1, maxY = -1;
  const prev = Buffer.alloc(stride);
  const cur = Buffer.alloc(stride);
  for (let y = 0; y < h; y++) {
    const f = raw[y * (stride + 1)];
    raw.copy(cur, 0, y * (stride + 1) + 1, (y + 1) * (stride + 1));
    let nz = false;
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
      if (v !== 0) nz = true;
    }
    const t = prev;
    prev.set(cur); // keep simple: color not needed for nz detection
    if (nz) { if (minY < 0) minY = y; maxY = y; }
  }
  return { minY, maxY };
}

for (let f = 30; f <= 130; f++) {
  const key = String(f);
  const pr = prerender[key];
  let st = null;
  try {
    st = JSON.parse(fs.readFileSync(path.join(ROOT, 'output/emu-full/frame-' + String(f).padStart(4, '0') + '/state.json'), 'utf8'));
  } catch (e) {}
  const prTxt = pr ? `vt:${pr.regVT} fv:${pr.regFV} fh:${pr.regFH} v:${pr.regV}` : 'NONE';
  const end = st ? `endV:${st.scrollEnd.cntV} endVT:${st.scrollEnd.cntVT}` : '';
  let rr = '';
  try {
    const r = decodePng(path.join(ROOT, 'output/emu-full/frame-' + String(f).padStart(4, '0') + '/screen.png'));
    rr = `rows:[${r.minY}..${r.maxY}]`;
  } catch (e) { rr = 'NO-PNG'; }
  console.log(`f${f} PR=${prTxt} ${end} ${rr}`);
}
