/**
 * _emu_full.ts — 跑 4332 帧 + APU audio + APU register writes
 *                 + 全套 PNG/JSON dump (跟 _emu_reference.ts 同等产出)
 *
 * 关键修复:
 *  - 不调 ppu.startFrame()/advanceDots()/renderFramePartially()/endFrame()
 *    (smoke4 证明 per-frame 强制重渲会卡 nes)
 *  - APU write hook 必须挂在 PAPU.prototype, 不是 instance
 *    (因为 mapper0 内部 this.nes.papu.writeReg() 直接调 instance method)
 *  - 每帧只 reload 8 个 1KB CHR slot 到 ppu.ptTile, 保持 PPU 渲染缓存
 */
import * as fs from 'fs';
import * as path from 'path';
import * as zlib from 'zlib';
import { NES } from '../src/core';
import PAPU from '../src/core/papu/index';
import {
  drainChrSwitchLog,
  buildChrBankMapByScanline,
  renderBothPatternTables,
  renderBothPatternTablesAtScanline,
} from '../src/core/debug/pattern-table-viewer';

const ROM_PATH = path.join(__dirname, '..', 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes');
const OUT_DIR  = path.join(__dirname, '..', 'output', 'emu-full');
// EMU_FULL_FRAMES 可覆盖帧数 (快速验证/局部 trace)
const TOTAL_FRAMES = (() => {
  const v = Number(process.env.EMU_FULL_FRAMES);
  return Number.isFinite(v) && v > 0 ? v : 4332;
})();
const SAMPLE_RATE = 44100;

// ── PNG 编码器 ──
const CRC_TABLE: number[] = (() => {
  const t: number[] = new Array(256);
  for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1); t[n] = c >>> 0; }
  return t;
})();
function crc32(d: Buffer): number { let c = 0xFFFFFFFF; for (let i = 0; i < d.length; i++) c = CRC_TABLE[(c ^ d[i]) & 0xFF] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; }
function makeChunk(t: string, d: Buffer): Buffer {
  const lb = Buffer.alloc(4); lb.writeUInt32BE(d.length, 0);
  const tb = Buffer.from(t, 'ascii');
  const cb = Buffer.alloc(4); cb.writeUInt32BE(crc32(Buffer.concat([tb, d])), 0);
  return Buffer.concat([lb, tb, d, cb]);
}
function encodePng(w: number, h: number, rgba: Buffer): Buffer {
  const sig = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4); ihdr.writeUInt8(8, 8); ihdr.writeUInt8(6, 9);
  const row = w * 4;
  const raw = Buffer.alloc((row + 1) * h);
  for (let y = 0; y < h; y++) { raw[y * (row + 1)] = 0; rgba.copy(raw, y * (row + 1) + 1, y * row, (y + 1) * row); }
  return Buffer.concat([sig, makeChunk('IHDR', ihdr), makeChunk('IDAT', zlib.deflateSync(raw, { level: 1 })), makeChunk('IEND', Buffer.alloc(0))]);
}
function bufToRgba(buf: Uint32Array): Buffer {
  const w = 256, h = 240;
  const rgba = Buffer.alloc(w * h * 4);
  for (let i = 0; i < w * h; i++) { const v = buf[i]; rgba[i * 4] = (v >>> 16) & 0xff; rgba[i * 4 + 1] = (v >>> 8) & 0xff; rgba[i * 4 + 2] = v & 0xff; rgba[i * 4 + 3] = 0xff; }
  return rgba;
}
function rgbaFromData(data: Uint32Array, w: number, h: number): Buffer {
  const rgba = Buffer.alloc(w * h * 4);
  for (let i = 0; i < w * h; i++) { const v = data[i]; rgba[i * 4] = (v >>> 16) & 0xff; rgba[i * 4 + 1] = (v >>> 8) & 0xff; rgba[i * 4 + 2] = v & 0xff; rgba[i * 4 + 3] = 0xff; }
  return rgba;
}
function writeWav(filePath: string, samples: Float32Array, rate: number, channels: number): void {
  const numSamples = samples.length / channels;
  const dataLen = numSamples * channels * 2;
  const buf = Buffer.alloc(44 + dataLen);
  let off = 0;
  buf.write('RIFF', off); off += 4; buf.writeUInt32LE(36 + dataLen, off); off += 4;
  buf.write('WAVE', off); off += 4; buf.write('fmt ', off); off += 4;
  buf.writeUInt32LE(16, off); off += 4; buf.writeUInt16LE(1, off); off += 2; buf.writeUInt16LE(channels, off); off += 2;
  buf.writeUInt32LE(rate, off); off += 4; buf.writeUInt32LE(rate * channels * 2, off); off += 4;
  buf.writeUInt16LE(channels * 2, off); off += 2; buf.writeUInt16LE(16, off); off += 2;
  buf.write('data', off); off += 4; buf.writeUInt32LE(dataLen, off); off += 4;
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i])); const v = s < 0 ? s * 0x8000 : s * 0x7FFF;
    buf.writeInt16LE(v | 0, off); off += 2;
  }
  fs.writeFileSync(filePath, buf);
}

// ── APU 收集 ──
interface ApuWrite { frame: number; reg: number; value: number; }
const apuWrites: ApuWrite[] = [];
const audioSamplesL: number[] = [];
const audioSamplesR: number[] = [];
const samplesPerFrame: number[] = [];
const apuWritesPerFrame: number[] = [];



// ── 主流程 ──
const romBytes = fs.readFileSync(ROM_PATH);
const nes = new NES({
  emulateSound: true,
  sampleRate: SAMPLE_RATE,
  onAudioSample: (l: number, _n: number, r: number) => {
    if (samplesPerFrame.length > 0) samplesPerFrame[samplesPerFrame.length - 1]++;
    audioSamplesL.push(l);
    audioSamplesR.push(r);
  },
});
nes.loadROM(romBytes);
const ppu: any = (nes as any).ppu;
const mmap: any = (nes as any).mmap;
const cpu: any = (nes as any).cpu;
const rom: any = (nes as any).rom;

console.log(`[emu-full] mapper=${rom.mapperType} PRG=${rom.romCount} CHR=${rom.vromCount} frames=${TOTAL_FRAMES}`);

// ── APU prototype hook ──
let currentFrameForHook = 0;
const proto: any = (PAPU as any).prototype;
const origWriteReg = proto.writeReg;
proto.writeReg = function(addr: number, value: number) {
  if (addr >= 0x4000 && addr <= 0x4017) {
    if (apuWritesPerFrame.length > 0) apuWritesPerFrame[apuWritesPerFrame.length - 1]++;
    apuWrites.push({ frame: currentFrameForHook, reg: addr, value });
  }
  return origWriteReg.call(this, addr, value);
};

fs.mkdirSync(OUT_DIR, { recursive: true });
const t0 = Date.now();

// ── 4332 帧逐帧 dump ──
for (let f = 1; f <= TOTAL_FRAMES; f++) {
  currentFrameForHook = f;
  samplesPerFrame.push(0);
  apuWritesPerFrame.push(0);
  nes.frame();

  // 与 _emu_reference.ts 一致: reload 全部 8 个 1KB CHR slot 到 ptTile
  if (mmap && Array.isArray(mmap.chrBanks) && typeof mmap.load1kVromBank === 'function') {
    for (let slot = 0; slot < 8; slot++) mmap.load1kVromBank(mmap.chrBanks[slot], slot * 0x400);
  }

  // 按 scanline 分组 dump 多个 PT sheet
  const switches = drainChrSwitchLog();
  const chrMapByScan = buildChrBankMapByScanline(switches, mmap.chrBanks);

  const frameDir = path.join(OUT_DIR, 'frame-' + String(f).padStart(4, '0'));
  fs.mkdirSync(frameDir, { recursive: true });

  // (0.1) chr-switches.json
  fs.writeFileSync(
    path.join(frameDir, 'chr-switches.json'),
    JSON.stringify({
      frame: f,
      bankMapByScanline: Array.from(chrMapByScan.entries()).map(([scan, banks]) => ({
        scanline: scan, banks: Array.from(banks),
      })),
      rawLog: switches,
    })
  );

  // (0.5) 每个 scanline 的 pt-sheet-scanXXX.png
  for (const [scan, slotBanks] of chrMapByScan) {
    const pt = renderBothPatternTablesAtScanline(nes, slotBanks, 0);
    const ptRgba = rgbaFromData(
      new Uint32Array([...pt.table0.data, ...pt.table1.data]),
      pt.table0.width * 2, pt.table0.height,
    );
    fs.writeFileSync(
      path.join(frameDir, `pt-sheet-scan${String(scan).padStart(3, '0')}.png`),
      encodePng(pt.table0.width * 2, pt.table0.height, ptRgba),
    );
  }

  // (1) screen.png
  fs.writeFileSync(path.join(frameDir, 'screen.png'), encodePng(256, 240, bufToRgba(ppu.buffer)));

  // (2) pt-sheet.png (最终 PT 缓存 = 最后一次 load1kVromBank 状态)
  const pt = renderBothPatternTables(nes, 0);
  const ptW = pt.table0.width;
  const ptH = pt.table0.height;
  const ptRgba = rgbaFromData(new Uint32Array([...pt.table0.data, ...pt.table1.data]), ptW * 2, ptH);
  fs.writeFileSync(path.join(frameDir, 'pt-sheet.png'), encodePng(ptW * 2, ptH, ptRgba));

  // (3) pt.json (512 tile plane0 + plane1)
  const ptJson: any[] = [];
  for (let i = 0; i < 512; i++) {
    const t = ppu.ptTile[i];
    const pix = t && t.pix ? Array.from(t.pix) : new Array(64).fill(0);
    const plane0: number[] = new Array(8).fill(0);
    const plane1: number[] = new Array(8).fill(0);
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const idx = pix[row * 8 + col];
        if (idx & 1) plane0[row] |= 1 << (7 - col);
        if (idx & 2) plane1[row] |= 1 << (7 - col);
      }
    }
    ptJson.push({ idx: i, plane0, plane1 });
  }
  fs.writeFileSync(path.join(frameDir, 'pt.json'), JSON.stringify(ptJson));

  // (4) nt0/1/2/3.png + nt.json
  const ntRgba = renderAllNameTablesNoBg(ppu, rom, switches);
  for (let i = 0; i < 4; i++) {
    fs.writeFileSync(path.join(frameDir, `nt${i}.png`), encodePng(256, 240, rgbaFromData(ntRgba[i], 256, 240)));
  }
  const ntJson: any[] = [];
  for (let i = 0; i < 4; i++) {
    const t = ppu.nameTable[i];
    ntJson.push({ idx: i, tile: Array.from(t.tile), attrib: Array.from(t.attrib) });
  }
  fs.writeFileSync(path.join(frameDir, 'nt.json'), JSON.stringify(ntJson));

  // (5) oam.json + oam.png + oam-composite.png
  const oamArr: number[] = Array.from(ppu.spriteMem);
  const oamJson: any[] = [];
  for (let i = 0; i < 64; i++) {
    oamJson.push({ idx: i, y: oamArr[i * 4], tile: oamArr[i * 4 + 1], attr: oamArr[i * 4 + 2], x: oamArr[i * 4 + 3] });
  }
  fs.writeFileSync(path.join(frameDir, 'oam.json'), JSON.stringify(oamJson));
  const oamImg = renderOamSheet(oamJson, ppu);
  fs.writeFileSync(path.join(frameDir, 'oam.png'), encodePng(oamImg.w, oamImg.h, oamImg.rgba));
  const oamComp = renderOamComposite(oamJson, ppu);
  fs.writeFileSync(path.join(frameDir, 'oam-composite.png'), encodePng(256, 240, oamComp));
  // oam-stripped.png: 紧凑 sprite 摆放图 (按真实 y/x 位置 crop 到包围盒, alpha=0 透明 bg, 不带完整 256x240 大图)
  const oamStripped = renderOamStripped(oamJson, ppu);
  if (oamStripped) {
    fs.writeFileSync(path.join(frameDir, 'oam-stripped.png'), encodePng(oamStripped.w, oamStripped.h, oamStripped.rgba));
  }

  // (6) palette.json + palette.png
  const palBg = Array.from(ppu.vramMem.slice(0x3F00, 0x3F10));
  const palSp = Array.from(ppu.vramMem.slice(0x3F10, 0x3F20));
  fs.writeFileSync(path.join(frameDir, 'palette.json'), JSON.stringify({ bg: palBg, spr: palSp }));
  const palImg = renderPaletteSheet(palBg, palSp, ppu);
  fs.writeFileSync(path.join(frameDir, 'palette.png'), encodePng(palImg.w, palImg.h, palImg.rgba));

  // (7) state.json
  const chrMap = mmap.chrBanks ? Array.from(mmap.chrBanks) : [];
  const prgMap = mmap.prgBankMap || {};
  fs.writeFileSync(path.join(frameDir, 'state.json'), JSON.stringify({
    frame: f,
    pc: cpu.REG_PC >>> 0,
    nTblAddress: ppu.f_nTblAddress,
    bgTable: ppu.f_bgPatternTable,
    spTable: ppu.f_spPatternTable,
    chrBanks: chrMap,
    prgBankMap: prgMap,
    apuWritesThisFrame: apuWritesPerFrame[f - 1],
    audioSamplesThisFrame: samplesPerFrame[f - 1],
    cycleBaseAfterFrame: cpu._cpuCycleBase ?? 0,
  }, null, 2));

  if (f % 200 === 0 || f === 1 || f === TOTAL_FRAMES) {
    const elapsed = (Date.now() - t0) / 1000;
    const fps = f / elapsed;
    const eta = (TOTAL_FRAMES - f) / fps;
    console.log(`  f${f}/${TOTAL_FRAMES}  fps=${fps.toFixed(1)}  eta=${eta.toFixed(0)}s  audio=${audioSamplesL.length}  apuWrites=${apuWrites.length}`);
  }
}

// ── APU 产出 ──
const apuDir = path.join(OUT_DIR, 'apu');
fs.mkdirSync(apuDir, { recursive: true });
const stereo = new Float32Array(audioSamplesL.length * 2);
for (let i = 0; i < audioSamplesL.length; i++) { stereo[i * 2] = audioSamplesL[i]; stereo[i * 2 + 1] = audioSamplesR[i]; }
writeWav(path.join(apuDir, 'audio.wav'), stereo, SAMPLE_RATE, 2);

const regTraceLog = apuWrites.map((w, idx) =>
  `f${String(w.frame).padStart(4,'0')} #${String(idx+1).padStart(5,'0')} $${w.reg.toString(16).padStart(4,'0').toUpperCase()} = #$${w.value.toString(16).padStart(2,'0').toUpperCase()}`
).join('\n');
fs.writeFileSync(path.join(apuDir, 'register-writes.log'), regTraceLog);

const apuSummaryMap = new Map<number, any>();
for (const w of apuWrites) {
  if (!apuSummaryMap.has(w.frame)) apuSummaryMap.set(w.frame, { frame: w.frame, sq1: 0, sq2: 0, tri: 0, noise: 0, dmc: 0, ctrl: 0, total: 0 });
  const s = apuSummaryMap.get(w.frame);
  s.total++;
  if (w.reg >= 0x4000 && w.reg < 0x4004) s.sq1++;
  else if (w.reg >= 0x4004 && w.reg < 0x4008) s.sq2++;
  else if (w.reg >= 0x4008 && w.reg < 0x400C) s.tri++;
  else if (w.reg >= 0x400C && w.reg <= 0x400F) s.noise++;
  else if (w.reg >= 0x4010 && w.reg <= 0x4013) s.dmc++;
  else if (w.reg === 0x4015 || w.reg === 0x4017) s.ctrl++;
}
const apuSummary = Array.from(apuSummaryMap.values()).sort((a, b) => a.frame - b.frame);
fs.writeFileSync(path.join(apuDir, 'summary.json'), JSON.stringify(apuSummary));

const samplesPerFrameOut = samplesPerFrame.map((c, i) => ({ frame: i + 1, samples: c }));
fs.writeFileSync(path.join(apuDir, 'samples-per-frame.json'), JSON.stringify(samplesPerFrameOut));

const elapsed = (Date.now() - t0) / 1000;
console.log(`[emu-full] done in ${elapsed.toFixed(1)}s`);
console.log(`  audio samples=${audioSamplesL.length} (${(audioSamplesL.length / SAMPLE_RATE).toFixed(2)}s)`);
console.log(`  apu writes=${apuWrites.length} (${apuSummary.length} frames with writes)`);


// ════════════════════════════════════════════════════════
// ── 渲染 helper (跟 _emu_reference.ts 完全一致) ──
// ════════════════════════════════════════════════════════

function renderAllNameTablesNoBg(ppu: any, rom: any, switches: any[]): Uint32Array[] {
  const W = 256, H = 240, COLS = 32, ROWS = 30;
  const pal = ppu.imgPalette;
  const vromTile: any = rom && rom.vromTile;
  const initialBanks = new Uint8Array(8);
  if (rom && rom.chrBanks) for (let i = 0; i < 8; i++) initialBanks[i] = rom.chrBanks[i] | 0;
  const mapByScan = buildChrBankMapByScanline(switches, initialBanks);
  const scanBankCache: Uint8Array[] = new Array(240);
  for (let y = 0; y < 240; y++) {
    let best: Uint8Array = initialBanks;
    for (const [sc, banks] of mapByScan) { if (sc <= y) best = banks; else break; }
    scanBankCache[y] = best;
  }
  const bgTableBase = ppu.regS === 0 ? 0 : 256;
  const fetchTile = (tileIdx: number, yScan: number): Uint8Array | null => {
    const slot = bgTableBase === 0 ? (tileIdx >> 6) : (4 + (tileIdx >> 6));
    const localIdx = tileIdx & 63;
    const slotBanks = scanBankCache[yScan] || initialBanks;
    const bank1k = slotBanks[slot];
    if (bank1k == null) return null;
    const bank4k = (bank1k / 4) | 0;
    const off = (bank1k % 4) * 64 + localIdx;
    if (!vromTile || !vromTile[bank4k]) return null;
    const t = vromTile[bank4k][off];
    return (t && t.pix) ? t.pix : null;
  };

  const out: Uint32Array[] = [];
  for (let ntIdx = 0; ntIdx < 4; ntIdx++) {
    const buf = new Uint32Array(W * H);
    const nt = ppu.nameTable[ntIdx];
    if (!nt) { out.push(buf); continue; }
    for (let ty = 0; ty < ROWS; ty++) {
      for (let tx = 0; tx < COLS; tx++) {
        const tileIdx = nt.tile[ty * COLS + tx] | 0;
        const attrVal = nt.attrib[ty * COLS + tx] | 0;
        const yScan = ty * 8;
        const pix = fetchTile(tileIdx, yScan);
        const baseX = tx * 8, baseY = ty * 8;
        if (pix) {
          for (let py = 0; py < 8; py++) {
            for (let px = 0; px < 8; px++) {
              const ci = pix[py * 8 + px];
              buf[(baseY + py) * W + baseX + px] = ci === 0 ? pal[0] : (pal[ci + attrVal] ?? pal[0]);
            }
          }
        } else {
          for (let py = 0; py < 8; py++) for (let px = 0; px < 8; px++) buf[(baseY + py) * W + baseX + px] = pal[0];
        }
      }
    }
    out.push(buf);
  }
  return out;
}

function renderOamSheet(oamJson: any[], ppu: any): { w: number; h: number; rgba: Buffer } {
  const cellW = 9, cellH = 9;
  const cols = 8, rows = 8;
  const w = cols * cellW, h = rows * cellH;
  const rgba = Buffer.alloc(w * h * 4);
  for (let i = 0; i < oamJson.length; i++) {
    const o = oamJson[i];
    const tile = o.tile;
    const attr = o.attr;
    const flipH = (attr & 0x40) ? 1 : 0;
    const flipV = (attr & 0x80) ? 1 : 0;
    const palHi = (attr & 0x03) << 2;
    const baseIdx = ppu.f_spPatternTable ? 256 : 0;
    const ptT = ppu.ptTile[baseIdx + tile];
    const pix = ptT && ptT.pix ? ptT.pix : null;
    const cx = (i % cols) * cellW;
    const cy = Math.floor(i / cols) * cellH;
    for (let py = 0; py < 8; py++) {
      for (let px = 0; px < 8; px++) {
        const sx = flipH ? 7 - px : px;
        const sy = flipV ? 7 - py : py;
        const idx = pix ? pix[sy * 8 + sx] : 0;
        const color = idx === 0 ? 0xff202020 : (ppu.imgPalette[palHi + idx] ?? 0xff202020);
        const r = (color >>> 16) & 0xff, g = (color >>> 8) & 0xff, b = color & 0xff;
        const off = ((cy + py) * w + cx + px) * 4;
        rgba[off] = r; rgba[off + 1] = g; rgba[off + 2] = b; rgba[off + 3] = 0xff;
      }
      const sepOff = ((cy + py) * w + cx + 8) * 4;
      rgba[sepOff] = 0xff000000; rgba[sepOff + 1] = 0; rgba[sepOff + 2] = 0; rgba[sepOff + 3] = 0xff;
    }
    const hSepY = cy + 8;
    if (hSepY < h) {
      for (let px = 0; px < cellW; px++) {
        const off = (hSepY * w + cx + px) * 4;
        rgba[off] = 0; rgba[off + 1] = 0; rgba[off + 2] = 0; rgba[off + 3] = 0xff;
      }
    }
  }
  return { w, h, rgba };
}

function renderOamComposite(oamJson: any[], ppu: any): Buffer {
  const W = 256, H = 240;
  const rgba = Buffer.alloc(W * H * 4);
  const fillBg = (x: number, y: number) => {
    const off = (y * W + x) * 4;
    const isM = ((y >> 1) + (x >> 1)) & 1;
    const v = isM ? 0xff300030 : 0xff000000;
    rgba[off] = (v >>> 16) & 0xff; rgba[off + 1] = (v >>> 8) & 0xff; rgba[off + 2] = v & 0xff; rgba[off + 3] = 0xff;
  };
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) fillBg(x, y);

  const baseIdx = ppu.f_spPatternTable ? 256 : 0;
  for (let i = 0; i < oamJson.length; i++) {
    const o = oamJson[i];
    if (o.y >= 0xef) continue;
    const attr = o.attr;
    const flipH = (attr & 0x40) ? 1 : 0;
    const flipV = (attr & 0x80) ? 1 : 0;
    const palHi = (attr & 0x03) << 2;
    const ptT = ppu.ptTile[baseIdx + o.tile];
    const pix = ptT && ptT.pix ? ptT.pix : null;
    if (!pix) continue;
    const sy0 = o.y + 1;
    for (let py = 0; py < 8; py++) {
      const dy = sy0 + py;
      if (dy < 0 || dy >= H) continue;
      for (let px = 0; px < 8; px++) {
        const dx = o.x + px;
        if (dx < 0 || dx >= W) continue;
        const sx = flipH ? 7 - px : px;
        const sy = flipV ? 7 - py : py;
        const idx = pix[sy * 8 + sx];
        if (idx === 0) continue;
        const color = ppu.sprPalette ? (ppu.sprPalette[palHi + idx] ?? 0xff000000) : 0xff000000;
        const r = (color >>> 16) & 0xff, g = (color >>> 8) & 0xff, b = color & 0xff;
        const off = (dy * W + dx) * 4;
        rgba[off] = r; rgba[off + 1] = g; rgba[off + 2] = b; rgba[off + 3] = 0xff;
      }
    }
  }
  return rgba;
}

// oam-stripped: 把所有 visible sprite (y<0xef) 按真实 y/x 摆到一张紧凑 PNG 上
// 自动裁剪到 sprite 包围盒 (无 padding), 透明 bg alpha=0, 不带完整 256x240 大图
// vs oam-composite: 那里是 256x240 棋盘背景摆 sprite, 这里纯透明 + 紧凑 crop
function renderOamStripped(oamJson: any[], ppu: any): { w: number; h: number; rgba: Buffer; minX: number; minY: number } | null {
  const baseIdx = ppu.f_spPatternTable ? 256 : 0;
  let minX = 256, maxX = -1, minY = 240, maxY = -1;
  type SprRef = { o: any; sx0: number; sy0: number };
  const refs: SprRef[] = [];
  for (let i = 0; i < oamJson.length; i++) {
    const o = oamJson[i];
    if (!o || o.y >= 0xef) continue;
    const sx0 = o.x;
    const sy0 = o.y + 1;
    refs.push({ o, sx0, sy0 });
    if (sx0 < minX) minX = sx0;
    if (sx0 + 8 > maxX) maxX = sx0 + 8;
    if (sy0 < minY) minY = sy0;
    if (sy0 + 8 > maxY) maxY = sy0 + 8;
  }
  if (refs.length === 0) return null;
  const ox = -minX;
  const oy = -minY;
  const W = (maxX - minX);
  const H = (maxY - minY);
  const rgba = Buffer.alloc(W * H * 4); // alpha=0 透明
  for (const r of refs) {
    const o = r.o;
    const attr = o.attr;
    const flipH = (attr & 0x40) ? 1 : 0;
    const flipV = (attr & 0x80) ? 1 : 0;
    const palHi = (attr & 0x03) << 2;
    const ptT = ppu.ptTile[baseIdx + o.tile];
    const pix = ptT && ptT.pix ? ptT.pix : null;
    if (!pix) continue;
    const dx0 = r.sx0 + ox;
    const dy0 = r.sy0 + oy;
    for (let py = 0; py < 8; py++) {
      const dy = dy0 + py;
      if (dy < 0 || dy >= H) continue;
      for (let px = 0; px < 8; px++) {
        const dx = dx0 + px;
        if (dx < 0 || dx >= W) continue;
        const sx = flipH ? 7 - px : px;
        const sy = flipV ? 7 - py : py;
        const idx = pix[sy * 8 + sx];
        if (idx === 0) continue;
        const color = ppu.sprPalette ? (ppu.sprPalette[palHi + idx] ?? 0xff000000) : 0xff000000;
        const r = (color >>> 16) & 0xff, g = (color >>> 8) & 0xff, b = color & 0xff;
        const off = (dy * W + dx) * 4;
        rgba[off] = r; rgba[off + 1] = g; rgba[off + 2] = b; rgba[off + 3] = 0xff;
      }
    }
  }
  return { w: W, h: H, rgba, minX, minY };
}

// oam-sprites: 占位函数 (已删除 tile-by-tile 输出, 用户不需要)
// (函数体移除)

function renderPaletteSheet(palBg: number[], palSp: number[], ppu: any): { w: number; h: number; rgba: Buffer } {
  const pal: any = ppu.palTable;
  const cellW = 16, cellH = 16;
  const cols = 8, rows = 4;
  const w = cols * cellW, h = rows * cellH;
  const rgba = Buffer.alloc(w * h * 4);
  const all = [...palBg, ...palSp];
  for (let i = 0; i < 32; i++) {
    const idx = all[i] & 0x3f;
    const entry = pal.getEntry ? pal.getEntry(idx) : 0xff000000;
    const r = (entry >>> 16) & 0xff, g = (entry >>> 8) & 0xff, b = entry & 0xff;
    const cx = (i % cols) * cellW;
    const cy = Math.floor(i / cols) * cellH;
    for (let py = 0; py < cellH; py++) {
      for (let px = 0; px < cellW; px++) {
        const off = ((cy + py) * w + cx + px) * 4;
        rgba[off] = r; rgba[off + 1] = g; rgba[off + 2] = b; rgba[off + 3] = 0xff;
      }
    }
  }
  return { w, h, rgba };
}
