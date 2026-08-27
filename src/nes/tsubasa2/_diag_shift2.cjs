// 逐行匹配统计：对每个偏移 d，输出最不匹配的行号
const fs = require('fs');
const zlib = require('zlib');
const { Tsubasa2 } = require('./dist-cjs2/game/index');
const { HeadlessRuntime } = require('./dist-cjs2/game/runtime/HeadlessRuntime');

function decodePng(file) {
  const b = fs.readFileSync(file);
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
  const bpp = ct === 2 ? 3 : ct === 6 ? 4 : 1;
  const stride = w * bpp;
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
  return { w, h, bpp, data: out };
}

const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
const origLog = console.log;
console.log = () => {};
game.boot(runtime);
console.log = origLog;
for (let i = 0; i <= 790; i++) game.frame(runtime);
const h5 = runtime.ppu.buffer;

const emu = decodePng('output/emu-full/frame-0800/screen.png');
const out = [];

// 每行对每个偏移的匹配数：rowMatch[d+6][y]
const rowMatch = {};
for (let d = -2; d <= 4; d++) {
  rowMatch[d] = [];
  for (let y = 0; y < 240; y++) {
    const ey = y + d;
    if (ey < 0 || ey >= 240) { rowMatch[d].push(-1); continue; }
    let m = 0;
    for (let x = 0; x < 256; x++) {
      const p = ey * emu.w * emu.bpp + x * emu.bpp;
      const ev = (emu.data[p] << 16) | (emu.data[p + 1] << 8) | emu.data[p + 2];
      if (ev === (h5[y * 256 + x] & 0xffffff)) m++;
    }
    rowMatch[d].push(m);
  }
}

// 找出每个 H5 行最好的偏移
out.push('每行最佳偏移（H5[y] 对应 emu[y+d]），只列 256 像素中匹配 < 200 的行：');
let bad = 0;
for (let y = 0; y < 240; y++) {
  let bestD = 0, bestM = -1;
  for (let d = -2; d <= 4; d++) {
    if (rowMatch[d][y] > bestM) { bestM = rowMatch[d][y]; bestD = d; }
  }
  if (bestM < 200) {
    bad++;
    out.push(`H5 y${y}: best d=${bestD} match=${bestM}/256  (d-2=${rowMatch[-2][y]} d-1=${rowMatch[-1][y]} d0=${rowMatch[0][y]} d1=${rowMatch[1][y]} d2=${rowMatch[2][y]} d3=${rowMatch[3][y]} d4=${rowMatch[4][y]})`);
  }
}
out.push(`总计 bad 行 (match<200): ${bad}`);
fs.writeFileSync('_diag_shift2_out.txt', out.join('\n'));
console.log('done');
