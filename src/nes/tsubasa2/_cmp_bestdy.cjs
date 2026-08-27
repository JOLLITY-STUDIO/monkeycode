// 对 f710/f760/f860 分别计算 emu screen.png vs H5 渲染的最佳垂直偏移(全图+分区域)
const fs = require('fs');
const zlib = require('zlib');
const { Tsubasa2 } = require('./dist-cjs2/game/index');
const { HeadlessRuntime } = require('./dist-cjs2/game/runtime/HeadlessRuntime');

function decodePng(file) {
  const buf = fs.readFileSync(file);
  let off = 8, width = 0, height = 0, colorType = 0;
  const idat = [];
  while (off < buf.length) {
    const len = buf.readUInt32BE(off);
    const type = buf.toString('ascii', off + 4, off + 8);
    const data = buf.slice(off + 8, off + 8 + len);
    if (type === 'IHDR') { width = data.readUInt32BE(0); height = data.readUInt32BE(4); colorType = data[9]; }
    else if (type === 'IDAT') idat.push(data);
    else if (type === 'IEND') break;
    off += 12 + len;
  }
  const raw = zlib.inflateSync(Buffer.concat(idat));
  const bpp = colorType === 6 ? 4 : colorType === 2 ? 3 : 1;
  const realStride = width * bpp;
  const px = Buffer.alloc(width * height * 3);
  let pos = 0;
  let prev = Buffer.alloc(realStride);
  for (let y = 0; y < height; y++) {
    const filter = raw[pos++];
    const line = Buffer.alloc(realStride);
    for (let x = 0; x < realStride; x++) {
      const cur = raw[pos];
      const a = x >= bpp ? line[x - bpp] : 0;
      const b = prev[x];
      const c = x >= bpp ? prev[x - bpp] : 0;
      let v;
      switch (filter) {
        case 0: v = cur; break;
        case 1: v = (cur + a) & 0xff; break;
        case 2: v = (cur + b) & 0xff; break;
        case 3: v = (cur + ((a + b) >> 1)) & 0xff; break;
        case 4: { const p = a + b - c; const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c); v = (cur + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c)) & 0xff; break; }
        default: v = cur;
      }
      line[x] = v; pos++;
    }
    prev = line;
    for (let x = 0; x < width; x++) {
      px[(y * width + x) * 3 + 0] = line[x * bpp + 0];
      px[(y * width + x) * 3 + 1] = line[x * bpp + 1];
      px[(y * width + x) * 3 + 2] = line[x * bpp + 2];
    }
  }
  return { width, height, px };
}

function lumaArr(px, w, h) {
  const g = Buffer.alloc(w * h);
  for (let i = 0; i < w * h; i++) g[i] = Math.round(0.299 * px[i * 3] + 0.587 * px[i * 3 + 1] + 0.114 * px[i * 3 + 2]);
  return g;
}
function h5lumaArr(b, w, h) {
  const g = Buffer.alloc(w * h);
  for (let i = 0; i < w * h; i++) { const v = b[i]; g[i] = Math.round(0.299 * ((v >> 16) & 0xff) + 0.587 * ((v >> 8) & 0xff) + 0.114 * (v & 0xff)); }
  return g;
}

function bestDy(emuG, h5G, x0, x1, y0, y1, range) {
  let best = null;
  for (let dy = -range; dy <= range; dy++) {
    let sum = 0, cnt = 0;
    for (let y = y0; y < y1; y++) {
      const sy = y + dy;
      if (sy < 0 || sy >= 240) continue;
      for (let x = x0; x < x1; x++) {
        if (emuG[y * 256 + x] <= 12) continue; // 只看有内容
        sum += Math.abs(emuG[y * 256 + x] - h5G[sy * 256 + x]);
        cnt++;
      }
    }
    if (!cnt) continue;
    const avg = sum / cnt;
    if (!best || avg < best.avg) best = { dy, avg };
  }
  return best;
}

const TARGETS = [710, 760, 860];
const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
const origLog = console.log;
console.log = () => {};
game.boot(runtime);
console.log = origLog;

const out = [];
for (let h5 = 0; h5 <= 860; h5++) {
  game.frame(runtime);
  const nes = h5 + 10;
  if (TARGETS.includes(nes)) {
    const emu = decodePng(`output/emu-full/frame-${String(nes).padStart(4, '0')}/screen.png`);
    const emuG = lumaArr(emu.px, 256, 240);
    const h5G = h5lumaArr(runtime.ppu.buffer, 256, 240);
    const whole = bestDy(emuG, h5G, 0, 256, 0, 240, 8);
    const sprite = bestDy(emuG, h5G, 100, 165, 35, 120, 8);
    const bgTop = bestDy(emuG, h5G, 0, 256, 60, 200, 8);
    out.push(`f${nes}: whole dy=${whole.dy} avg=${whole.avg.toFixed(1)} | sprite区 dy=${sprite.dy} avg=${sprite.avg.toFixed(1)} | 中下BG区 dy=${bgTop.dy} avg=${bgTop.avg.toFixed(1)}`);
    console.log(out[out.length - 1]);
  }
}
fs.writeFileSync('_cmp_bestdy.txt', out.join('\n'), 'utf8');
console.log('done');
