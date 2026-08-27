// 对比 emu f710 screen.png vs H5 NES f710 渲染 buffer，计算最佳位移(垂直/水平)
const fs = require('fs');
const zlib = require('zlib');
const { Tsubasa2 } = require('./dist-cjs2/game/index');
const { HeadlessRuntime } = require('./dist-cjs2/game/runtime/HeadlessRuntime');

// ---------- 最小 PNG 解码器 ----------
function decodePng(file) {
  const buf = fs.readFileSync(file);
  let off = 8; // skip signature
  let width = 0, height = 0, bitDepth = 0, colorType = 0;
  const idat = [];
  while (off < buf.length) {
    const len = buf.readUInt32BE(off);
    const type = buf.toString('ascii', off + 4, off + 8);
    const data = buf.slice(off + 8, off + 8 + len);
    if (type === 'IHDR') {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9];
    } else if (type === 'IDAT') {
      idat.push(data);
    } else if (type === 'IEND') break;
    off += 12 + len;
  }
  const raw = zlib.inflateSync(Buffer.concat(idat));
  const bpp = colorType === 6 ? 4 : colorType === 2 ? 3 : colorType === 3 ? 1 : 1;
  const stride = Math.ceil((width * bitDepth * (bpp / (bitDepth === 16 ? 8 : 1))) / 8);
  const realStride = width * (bitDepth === 16 ? 2 : 1) * bpp;
  // 重建
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
        case 4: {
          const p = a + b - c;
          const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
          v = (cur + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c)) & 0xff;
          break;
        }
        default: v = cur;
      }
      line[x] = v;
      pos++;
    }
    prev = line;
    // 写入 px
    if (colorType === 6) {
      for (let x = 0; x < width; x++) {
        px[(y * width + x) * 3 + 0] = line[x * 4 + 0];
        px[(y * width + x) * 3 + 1] = line[x * 4 + 1];
        px[(y * width + x) * 3 + 2] = line[x * 4 + 2];
      }
    } else if (colorType === 2) {
      for (let x = 0; x < width; x++) {
        px[(y * width + x) * 3 + 0] = line[x * 3 + 0];
        px[(y * width + x) * 3 + 1] = line[x * 3 + 1];
        px[(y * width + x) * 3 + 2] = line[x * 3 + 2];
      }
    } else if (colorType === 3) {
      // palette: 简化按灰度处理（一般不会用到）
      for (let x = 0; x < width; x++) {
        const g = line[x];
        px[(y * width + x) * 3 + 0] = g;
        px[(y * width + x) * 3 + 1] = g;
        px[(y * width + x) * 3 + 2] = g;
      }
    }
  }
  return { width, height, px };
}

// ---------- 跑 H5 到 NES f710 (h5=700) ----------
const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
const origLog = console.log;
console.log = () => {};
game.boot(runtime);
console.log = origLog;
for (let h5 = 0; h5 <= 700; h5++) game.frame(runtime);
const h5 = runtime.ppu.buffer; // Uint32Array 256x240 0x00RRGGBB

const emu = decodePng('output/emu-full/frame-0710/screen.png');
console.log('emu size', emu.width + 'x' + emu.height);

// ---------- 求最佳位移 ----------
// 把两帧转成灰度 + 仅在"非背景/差异区"匹配，先粗算整个屏幕的最佳 (dx, dy)
function toGrayLuma(buf) {
  const g = Buffer.alloc(256 * 240);
  for (let i = 0; i < 256 * 240; i++) {
    const r = buf[i * 3 + 0], gg = buf[i * 3 + 1], b = buf[i * 3 + 2];
    g[i] = Math.round(0.299 * r + 0.587 * gg + 0.114 * b);
  }
  return g;
}
const emuG = toGrayLuma(emu.px);
const h5G = Buffer.alloc(256 * 240);
for (let i = 0; i < 256 * 240; i++) {
  const v = h5[i];
  h5G[i] = Math.round(0.299 * ((v >> 16) & 0xff) + 0.587 * ((v >> 8) & 0xff) + 0.114 * (v & 0xff));
}

// 只在有内容区域(非黑)匹配
function isContent(g, x, y) { return g[y * 256 + x] > 12; }

// 全图最佳位移：对每个候选 (dx,dy) 计算匹配像素上的平均绝对差
const RANGE = 16;
const region = { x0: 80, x1: 180, y0: 20, y1: 130 }; // 解说/精灵区域
let best = null;
for (let dy = -RANGE; dy <= RANGE; dy++) {
  for (let dx = -RANGE; dx <= RANGE; dx++) {
    let sum = 0, cnt = 0;
    for (let y = region.y0; y < region.y1; y++) {
      const sy = y + dy;
      if (sy < 0 || sy >= 240) continue;
      for (let x = region.x0; x < region.x1; x++) {
        const sx = x + dx;
        if (sx < 0 || sx >= 256) continue;
        // 只统计 emu 有内容的像素（精灵/文字）
        if (!isContent(emuG, x, y)) continue;
        sum += Math.abs(emuG[y * 256 + x] - h5G[sy * 256 + sx]);
        cnt++;
      }
    }
    if (cnt === 0) continue;
    const avg = sum / cnt;
    if (!best || avg < best.avg) best = { dx, dy, avg };
  }
}
console.log('best offset (emu -> h5): dx=' + best.dx + ' dy=' + best.dy + ' avgDiff=' + best.avg.toFixed(2));

// 再单独看几个水平条带，找出差异集中在哪几行
console.log('\n== 每 8 行差异度 (x 80-180) ==');
for (let y0 = 0; y0 < 240; y0 += 8) {
  let sum = 0, cnt = 0;
  for (let y = y0; y < Math.min(y0 + 8, 240); y++) {
    for (let x = 80; x < 180; x++) {
      sum += Math.abs(emuG[y * 256 + x] - h5G[y * 256 + x]);
      cnt++;
    }
  }
  if (cnt) console.log('y' + y0 + '-' + (y0 + 7) + ' avgDiff=' + (sum / cnt).toFixed(1));
}
