/**
 * _verify_scroll_h5.cjs — 验证 H5 Opening 滚动修复（renderStartOverride）
 * 跑 H5 f0-f350，关键帧 dump screen.png + scroll 状态，与 emu-full 对比。
 */
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const { HeadlessRuntime } = require('../dist-cjs/game/runtime/HeadlessRuntime');
const { Tsubasa2 } = require('../dist-cjs/game/index');

const EMU_DIR = path.join(__dirname, '..', 'output', 'emu-full');
const OUT_DIR = path.join(__dirname, '..', 'output', 'h5-scroll-check');
fs.mkdirSync(OUT_DIR, { recursive: true });

// PNG 编码器
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
function bufToRgba(buf) {
  const w = 256, h = 240;
  const rgba = Buffer.alloc(w * h * 4);
  for (let i = 0; i < w * h; i++) { const v = buf[i]; rgba[i * 4] = (v >>> 16) & 0xff; rgba[i * 4 + 1] = (v >>> 8) & 0xff; rgba[i * 4 + 2] = v & 0xff; rgba[i * 4 + 3] = 0xff; }
  return rgba;
}

const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
game.boot(runtime);

const total = Number(process.env.SCROLL_TOTAL || 60);
const dumpEvery = 10;
const logs = [];
let diffTotal = 0;

for (let f = 0; f < total; f++) {
  runtime.frame(game);
  const ppu = runtime.ppu;
  const h5f = f + 10; // NES 帧
  const emuDir = path.join(EMU_DIR, 'frame-' + String(h5f).padStart(4, '0'));
  const emuPng = path.join(emuDir, 'screen.png');
  if (fs.existsSync(emuPng)) {
    const rg = bufToRgba(ppu.buffer);
    const outDir = path.join(OUT_DIR, 'frame-' + String(f).padStart(4, '0'));
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'screen.png'), encodePng(256, 240, rg));
    // 与 emu 对比（像素差异数 + scroll）
    const emu = JSON.parse(fs.readFileSync(path.join(emuDir, 'state.json'), 'utf8'));
    const sc = emu.scroll || {};
    const override = ppu.renderStartOverride;
    const diffCount = diffAgainstEmu(emuPng, ppu.buffer);
    if (diffCount !== null) diffTotal++;
    // 渲染诊断
    let nz = 0;
    for (let i = 0; i < ppu.buffer.length; i++) if (ppu.buffer[i] !== 0) nz++;
    let nt0nz = 0, nt1nz = 0;
    for (let i = 0; i < 960; i++) {
      if (ppu.nameTable[0].tile[i] !== 0) nt0nz++;
      if (ppu.nameTable[1].tile[i] !== 0) nt1nz++;
    }
    let chrInit = 0;
    for (let i = 0; i < 512; i++) if (ppu.ptTile[i] && ppu.ptTile[i].initialized) chrInit++;
    if (f % 5 === 0 || f < 20) {
      logs.push(
        `h5 f${String(f).padStart(3)} nes f${h5f} diffPx=${diffCount} bufNz=${nz} ` +
        `nt0Nz=${nt0nz} nt1Nz=${nt1nz} chrInit=${chrInit} ` +
        `regS=${ppu.regS} regC=${ppu.regC} mask=${ppu.mask} bgVis=${ppu.f_bgVisibility} ` +
        `emuRegV=${sc.regV} regH=${sc.regH} regVT=${sc.regVT} regHT=${sc.regHT} regFV=${sc.regFV} | ` +
        `emuCntV=${sc.cntV} cntH=${sc.cntH} cntVT=${sc.cntVT} cntHT=${sc.cntHT} | ` +
        `h5Override=${override ? JSON.stringify(override) : 'null'}`,
      );
    }
  }
}
fs.writeFileSync(path.join(OUT_DIR, 'diff-summary.log'), logs.join('\n'));
console.log('diff summary frames compared:', diffTotal);
console.log('log written to output/h5-scroll-check/diff-summary.log');
console.log(logs.slice(0, 30).join('\n'));

// 读 emu PNG（解码 RGB）与 H5 buffer 对比像素差异数
function diffAgainstEmu(emuPngPath, h5buf) {
  try {
    const data = fs.readFileSync(emuPngPath);
    const ihdrOff = data.indexOf('IHDR') + 8;
    const w = data.readUInt32BE(ihdrOff);
    const h = data.readUInt32BE(ihdrOff + 4);
    // 收集所有 IDAT 块合并（emu 单块，但稳妥起见全部收集）
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
    const rowLen = w * 4 + 1;
    // filter type 0 直接读（emu 编码器只写 filter 0）
    let diff = 0;
    for (let y = 0; y < h; y++) {
      const rowStart = y * rowLen + 1;
      for (let x = 0; x < w; x++) {
        const o = rowStart + x * 4;
        const r = raw[o], g = raw[o + 1], b = raw[o + 2];
        const v = h5buf[y * w + x];
        const hr = (v >>> 16) & 0xff, hg = (v >>> 8) & 0xff, hb = v & 0xff;
        if (Math.abs(r - hr) + Math.abs(g - hg) + Math.abs(b - hb) > 12) diff++;
      }
    }
    return diff;
  } catch (e) {
    console.log('diffAgainstEmu error:', e.message);
    return null;
  }
}
