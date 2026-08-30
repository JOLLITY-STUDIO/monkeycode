/**
 * _diag_f450.ts — f450 底部缺 3 行根因诊断
 * 1. GT f447-f453 scroll 值
 * 2. emu scroll-prerender / scroll-scan f450
 * 3. H5 f450 渲染每行 cnt* 轨迹（hook renderBgScanline）
 * 4. H5 vs emu 逐行非零行范围对比
 */
import * as fs from 'fs';
import * as path from 'path';
import * as zlib from 'zlib';
import { Tsubasa2 } from '../src/game/index';
import { HeadlessRuntime } from '../src/game/runtime/HeadlessRuntime';

const ROOT = path.resolve(__dirname, '..');

// ---------- emu 数据 ----------
const prerender = JSON.parse(fs.readFileSync(path.join(ROOT, 'output/emu-full/scroll-prerender.json'), 'utf8'));
const scan = JSON.parse(fs.readFileSync(path.join(ROOT, 'output/emu-full/scroll-scan.json'), 'utf8'));
console.log('=== emu scroll-prerender (键: f 帧) ===');
for (const k of ['447', '448', '449', '450', '451']) {
  const v = prerender[k];
  console.log(`key ${k} => f:${v.f} regVT:${v.regVT} regFV:${v.regFV} regFH:${v.regFH} cntVT:${v.cntVT} cntFV:${v.cntFV}`);
}
console.log('=== emu scroll-scan f450 (key 449) ===');
const sc449 = scan['449'];
console.log(JSON.stringify(sc449));

// ---------- GT 数据 ----------
console.log('=== GT OpeningFrameTable f447-f453 ===');
const gt = fs.readFileSync(path.join(ROOT, 'src/game/prg/data/scene/opening/opening-title-1.ts'), 'utf8');
for (const l of gt.split('\n')) {
  const m = l.match(/f:\s*(\d+)/);
  if (m) {
    const f = +m[1];
    if (f >= 447 && f <= 453) {
      const s = l.match(/s:\{[^}]+\}/);
      console.log(`GT f${f}: ${s ? s[0] : 'NO-S'}`);
    }
  }
}

// ---------- H5 渲染轨迹 ----------
const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
game.boot(runtime);
const ppu: any = runtime.ppu;

const trace: Array<{ scan: number; pre: string; post: string; rendered: boolean }> = [];
const orig = ppu.renderBgScanline.bind(ppu);
let targetFrame = 450;
let curNesFrame = 0;
ppu.renderBgScanline = function (bgbuffer: boolean, scan: number) {
  const pre = `${ppu.cntFV},${ppu.cntVT},${ppu.cntV},${ppu.cntH},${ppu.cntHT},fh=${ppu.regFH}`;
  const rendered = scan < 240 && scan - ppu.cntFV >= 0;
  const r = orig(bgbuffer, scan);
  const post = `${ppu.cntFV},${ppu.cntVT},${ppu.cntV},${ppu.cntH}`;
  if (curNesFrame === targetFrame && scan <= 245) {
    trace.push({ scan, pre, post, rendered });
  }
  return r;
};

for (let k = 1; k <= 441; k++) {
  curNesFrame = k + 9;
  runtime.frame(game);
}

console.log('=== H5 f450 renderBgScanline 轨迹 (pre=cntFV,cntVT,cntV,cntH,cntHT; post=cntFV,cntVT,cntV,cntH) ===');
for (const t of trace) {
  console.log(`scan=${String(t.scan).padStart(3)} pre=(${t.pre}) rendered=${t.rendered} post=(${t.post})`);
}

// ---------- H5 vs emu 逐行非零行范围 ----------
function h5Rgba(buf: Uint32Array): Buffer {
  const rgba = Buffer.alloc(256 * 240 * 4);
  for (let i = 0; i < 256 * 240; i++) {
    const v = buf[i] >>> 0;
    rgba[i * 4] = (v >>> 16) & 0xff;
    rgba[i * 4 + 1] = (v >>> 8) & 0xff;
    rgba[i * 4 + 2] = v & 0xff;
    rgba[i * 4 + 3] = 0xff;
  }
  return rgba;
}

function decodePng(file: string): Buffer {
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
        const pa = Math.abs(p - a);
        const pb = Math.abs(p - b);
        const pc = Math.abs(p - c);
        v = (v + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c)) & 0xff;
      }
      cur[x] = v;
    }
    for (let x = 0; x < stride; x++) {
      prev[x] = cur[x];
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
  return rgba;
}

const h5r = h5Rgba(ppu.buffer);
const emur = decodePng(path.join(ROOT, 'output/emu-full/frame-0450/screen.png'));

console.log('=== 逐行对比 (非零像素行) ===');
const onlyH5: number[] = [];
const onlyEmu: number[] = [];
for (let y = 0; y < 240; y++) {
  let h5nz = false;
  let emunz = false;
  for (let x = 0; x < 256; x++) {
    const i = (y * 256 + x) * 4;
    if (h5r[i] || h5r[i + 1] || h5r[i + 2]) h5nz = true;
    if (emur[i] || emur[i + 1] || emur[i + 2]) emunz = true;
    if (h5nz && emunz) break;
  }
  if (h5nz && !emunz) onlyH5.push(y);
  if (emunz && !h5nz) onlyEmu.push(y);
}
console.log('onlyH5(emu无内容):', onlyH5.join(','));
console.log('onlyEmu(h5无内容):', onlyEmu.join(','));
