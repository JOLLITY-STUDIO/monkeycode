/**
 * _compare_h5_emu.cjs — 稳健版 H5 vs emu 关键帧对比
 * 跑 H5 指定帧区间，dump PNG + scroll/NT 诊断，与 emu-full state.json/PNG 对比。
 * 用法: node scripts/_compare_h5_emu.cjs <startF> <endF> [step]
 */
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const { HeadlessRuntime } = require('../dist-cjs/game/runtime/HeadlessRuntime');
const { Tsubasa2 } = require('../dist-cjs/game/index');

const EMU_DIR = path.join(__dirname, '..', 'output', 'emu-full');
const OUT_DIR = path.join(__dirname, '..', 'output', 'h5-compare');
fs.mkdirSync(OUT_DIR, { recursive: true });

const startF = parseInt(process.argv[2] || '0', 10);
const endF = parseInt(process.argv[3] || '60', 10);
const step = parseInt(process.argv[4] || '5', 10);

// PNG 编码器（filter 0，RGBA）
const CRC_TABLE = (() => {
  const t = new Array(256);
  for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1); t[n] = c >>> 0; }
  return t;
})();
function crc32(d) { let c = 0xFFFFFFFF; for (let i = 0; i < d.length; i++) c = CRC_TABLE[(c ^ d[i]) & 0xFF] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; }
function makeChunk(t, d) {
  const lb = Buffer.alloc(4); lb.writeUInt32BE(d.length, 0);
  const tb = Buffer.from(t, 'ascii');
  const cb = Buffer.alloc(4); cb.writeUInt32BE(crc32(Buffer.concat([tb, d])), 0);
  return Buffer.concat([lb, tb, d, cb]);
}
function encodePng(w, h, rgba) {
  const sig = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4); ihdr.writeUInt8(8, 8); ihdr.writeUInt8(6, 9);
  const row = w * 4;
  const raw = Buffer.alloc((row + 1) * h);
  for (let y = 0; y < h; y++) { raw[y * (row + 1)] = 0; rgba.copy(raw, y * (row + 1) + 1, y * row, (y + 1) * row); }
  return Buffer.concat([sig, makeChunk('IHDR', ihdr), makeChunk('IDAT', zlib.deflateSync(raw, { level: 1 })), makeChunk('IEND', Buffer.alloc(0))]);
}

// 解码 emu PNG (RGBA)，返回 Uint32Array (0xRRGGBB)
function decodeEmuPng(p) {
  const data = fs.readFileSync(p);
  const w = data.readUInt32BE(16);
  const h = data.readUInt32BE(20);
  const bit = data[24];
  const ct = data[25];
  const bpp = ct === 6 ? 4 : ct === 2 ? 3 : ct === 3 || ct === 0 ? 1 : 2;
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
  const rowLen = w * bpp + 1;
  const out = new Uint32Array(w * h);
  const prev = Buffer.alloc(w * bpp);
  for (let y = 0; y < h; y++) {
    const f = raw[y * rowLen];
    const row = raw.slice(y * rowLen + 1, (y + 1) * rowLen);
    const cur = Buffer.alloc(w * bpp);
    for (let x = 0; x < w * bpp; x++) {
      const a = x >= bpp ? cur[x - bpp] : 0;
      const b = prev[x];
      const c = x >= bpp ? prev[x - bpp] : 0;
      let v = row[x];
      if (f === 1) v = (v + a) & 0xff;
      else if (f === 2) v = (v + b) & 0xff;
      else if (f === 3) v = (v + ((a + b) >> 1)) & 0xff;
      else if (f === 4) {
        const p = a + b - c;
        const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
        v = (v + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c)) & 0xff;
      }
      cur[x] = v;
    }
    if (ct === 6) for (let x = 0; x < w; x++) out[y * w + x] = (cur[x * 4] << 16) | (cur[x * 4 + 1] << 8) | cur[x * 4 + 2];
    else if (ct === 2) for (let x = 0; x < w; x++) out[y * w + x] = (cur[x * 3] << 16) | (cur[x * 3 + 1] << 8) | cur[x * 3 + 2];
    else if (ct === 3 || ct === 0) for (let x = 0; x < w; x++) { const v = cur[x]; out[y * w + x] = (v << 16) | (v << 8) | v; }
    prev.set(cur);
  }
  return { w, h, px: out };
}

function diffPx(emu, h5buf, w, h) {
  let diff = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const e = emu[y * w + x];
      const v = h5buf[y * w + x];
      const er = (e >>> 16) & 0xff, eg = (e >>> 8) & 0xff, eb = e & 0xff;
      const hr = (v >>> 16) & 0xff, hg = (v >>> 8) & 0xff, hb = v & 0xff;
      if (Math.abs(er - hr) + Math.abs(eg - hg) + Math.abs(eb - hb) > 12) diff++;
    }
  }
  return diff;
}

const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
game.boot(runtime);

// 跑到 startF
for (let f = 0; f < startF; f++) runtime.frame(game);

const logs = [];
for (let f = startF; f <= endF; f++) {
  runtime.frame(game);
  const ppu = runtime.ppu;
  const h5f = f + 10;
  const emuDir = path.join(EMU_DIR, 'frame-' + String(h5f).padStart(4, '0'));
  const emuPng = path.join(emuDir, 'screen.png');
  const emuState = path.join(emuDir, 'state.json');
  const line = [`h5f=${h5f}`];
  // H5 buffer 统计
  let nz = 0; for (let i = 0; i < ppu.buffer.length; i++) if (ppu.buffer[i] !== 0) nz++;
  line.push(`bufNz=${nz}`);
  // NT 统计
  const ntStr = [];
  for (let ni = 0; ni < 4; ni++) {
    const nt = ppu.nameTable[ni];
    let c = 0; for (let i = 0; i < 960; i++) if (nt.tile[i] !== 0) c++;
    ntStr.push(`nt${ni}=${c}`);
  }
  line.push(ntStr.join(' '));
  // scroll
  line.push(`reg=(${ppu.regV},${ppu.regH},${ppu.regVT},${ppu.regHT},${ppu.regFV},${ppu.regFH})`);
  line.push(`cnt=(${ppu.cntV},${ppu.cntH},${ppu.cntVT},${ppu.cntHT},${ppu.cntFV})`);
  line.push(`ovr=${ppu.renderStartOverride ? 'Y' : 'n'}`);
  // emu 对比
  if (fs.existsSync(emuPng) && fs.existsSync(emuState)) {
    try {
      const emu = decodeEmuPng(emuPng);
      const d = diffPx(emu.px, ppu.buffer, 256, 240);
      line.push(`diffPx=${d}`);
      const st = JSON.parse(fs.readFileSync(emuState, 'utf8'));
      const sc = st.scroll || {};
      line.push(`emuReg=(${sc.regV},${sc.regH},${sc.regVT},${sc.regHT},${sc.regFV},${sc.regFH})`);
      line.push(`emuCnt=(${sc.cntV},${sc.cntH},${sc.cntVT},${sc.cntHT},${sc.cntFV ?? sc.regFV})`);
      line.push(`emuNTbl=${st.nTblAddress} bg=${st.bgTable}`);
      // dump H5 PNG
      const outDir = path.join(OUT_DIR, 'frame-' + String(f).padStart(4, '0'));
      fs.mkdirSync(outDir, { recursive: true });
      const rgba = Buffer.alloc(256 * 240 * 4);
      for (let i = 0; i < 256 * 240; i++) {
        const v = ppu.buffer[i];
        rgba[i * 4] = (v >>> 16) & 0xff; rgba[i * 4 + 1] = (v >>> 8) & 0xff; rgba[i * 4 + 2] = v & 0xff; rgba[i * 4 + 3] = 0xff;
      }
      fs.writeFileSync(path.join(outDir, 'screen.png'), encodePng(256, 240, rgba));
      fs.writeFileSync(path.join(outDir, 'state.json'), JSON.stringify({
        bufNz: nz,
        reg: [ppu.regV, ppu.regH, ppu.regVT, ppu.regHT, ppu.regFV, ppu.regFH],
        cnt: [ppu.cntV, ppu.cntH, ppu.cntVT, ppu.cntHT, ppu.cntFV],
      }));
    } catch (e) {
      line.push(`EMU_ERR=${e.message}`);
    }
  }
  if ((f - startF) % step === 0) logs.push(line.join(' '));
}
const outPath = path.join(OUT_DIR, 'compare-' + startF + '-' + endF + '.log');
fs.writeFileSync(outPath, logs.join('\n'));
console.log(logs.join('\n'));
