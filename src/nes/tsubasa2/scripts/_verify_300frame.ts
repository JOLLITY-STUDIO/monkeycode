/**
 * _verify_300frame.ts — 多时刻 PPU 完整可视化（BG/SPR + OAM/NT0/NT1/PT/Palette）
 *
 * 输出（output/）：
 *   verify-frame{N}-{composite|bg|spr}.png       256×240 当前帧三层
 *   ppu-trace/final-screen.png                   256×240 最终帧
 *   ppu-trace/snapshots.json                     帧概要（scene/ram）
 *   ppu-trace/frame-NNN/oam.json                 64 sprite (y,tile,attr,x)
 *   ppu-trace/frame-NNN/oam.png                  8×8 sprite 预览（各 16×16，128×128）
 *   ppu-trace/frame-NNN/nt0.json                 32×30 tile 索引 + attr
 *   ppu-trace/frame-NNN/nt0.png                  256×240 NT0 渲染
 *   ppu-trace/frame-NNN/nt1.png                  256×240 NT1 渲染
 *   ppu-trace/frame-NNN/pt.json                  512 PT tile 8+8 字节（plane0/plane1）
 *   ppu-trace/frame-NNN/pt-sheet.png             128×256 PT 整表（BG + SPR，左右各 64×256）
 *   ppu-trace/frame-NNN/palette.json             32 调色板（16 BG + 16 SPR）
 *   ppu-trace/frame-NNN/palette.png              调色板 swatch
 *   ppu-trace/frame-NNN/screen.png               256×240 当前 composite
 *
 * 快照频率：每 30 帧一次（10 次）+ 最终帧 = 11 个快照
 *
 * 关键修复（vs 旧版 pt-sheet 全黑）：从 `ppu.ptTile[i].pix[]`（已解码 tile）取色，
 * 而不是从 `ppu.vramMem[0..0x2000]`（CHR 写卡在 VRAM 但那里是空的）取。
 */
import * as fs from 'fs';
import * as path from 'path';
import * as zlib from 'zlib';
import { Tsubasa2 } from '../src/game/index';
import { HeadlessRuntime } from '../src/game/runtime/HeadlessRuntime';

const FRAMES_LIST = [1, 5, 9, 13, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300];
const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
game.boot();

const ppu: any = runtime.ppu;
const nes: any = { ppu };

// ── CRC32 + PNG encoder ──
const CRC_TABLE: number[] = (() => {
  const t: number[] = new Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    t[n] = c >>> 0;
  }
  return t;
})();
function crc32(d: Buffer): number {
  let c = 0xFFFFFFFF;
  for (let i = 0; i < d.length; i++) c = CRC_TABLE[(c ^ d[i]) & 0xFF] ^ (c >>> 8);
  return (c ^ 0xFFFFFFFF) >>> 0;
}
function makeChunk(t: string, d: Buffer): Buffer {
  const lb = Buffer.alloc(4); lb.writeUInt32BE(d.length, 0);
  const tb = Buffer.from(t, 'ascii');
  const cb = Buffer.alloc(4); cb.writeUInt32BE(crc32(Buffer.concat([tb, d])), 0);
  return Buffer.concat([lb, tb, d, cb]);
}
function encodePng(w: number, h: number, rgba: Buffer): Buffer {
  const sig = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4);
  ihdr.writeUInt8(8, 8); ihdr.writeUInt8(6, 9);
  const row = w * 4;
  const raw = Buffer.alloc((row + 1) * h);
  for (let y = 0; y < h; y++) {
    raw[y * (row + 1)] = 0;
    rgba.copy(raw, y * (row + 1) + 1, y * row, (y + 1) * row);
  }
  return Buffer.concat([sig, makeChunk('IHDR', ihdr),
    makeChunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    makeChunk('IEND', Buffer.alloc(0))]);
}
function rgbaFromU32(buf: Uint32Array, w: number, h: number): Buffer {
  const rgba = Buffer.alloc(w * h * 4);
  for (let i = 0; i < w * h; i++) {
    const v = buf[i] >>> 0;
    rgba[i * 4 + 0] = (v >>> 16) & 0xff;
    rgba[i * 4 + 1] = (v >>> 8) & 0xff;
    rgba[i * 4 + 2] = v & 0xff;
    rgba[i * 4 + 3] = 0xff;
  }
  return rgba;
}
function rgbaFromU32Direct(buf: Uint32Array, w: number, h: number): Buffer {
  // 与 rgbaFromU32 相同但更明确这是 U32→RGBA
  return rgbaFromU32(buf, w, h);
}

// ── PPU tile/nametable 渲染辅助 ──
/**
 * 用 ppu.ptTile[].pix[](已解码 tile 颜色 0-3) + 调色板 渲染到目标 RGBA
 * @param dst 目标 RGBA U32 缓冲
 * @param dstW dstH 目标尺寸
 * @param tile 0-511
 * @param dx dy tile 左上角在 dst 坐标
 * @param pal 调色板 U32（通常为 ppu.imgPalette 或 ppu.sprPalette）
 * @param palAdd 调色板起始索引（0/4/8/12）
 */
function blitTile(
  dst: Uint32Array, dstW: number, dstH: number,
  tile: number, dx: number, dy: number,
  pal: Uint32Array, palAdd: number,
): void {
  const t = ppu.ptTile[tile];
  if (!t || !t.pix) {
    // 空 tile 用深灰
    for (let py = 0; py < 8; py++) {
      const yy = dy + py;
      if (yy < 0 || yy >= dstH) continue;
      for (let px = 0; px < 8; px++) {
        const xx = dx + px;
        if (xx < 0 || xx >= dstW) continue;
        dst[yy * dstW + xx] = 0xff_222222;
      }
    }
    return;
  }
  for (let py = 0; py < 8; py++) {
    const yy = dy + py;
    if (yy < 0 || yy >= dstH) continue;
    for (let px = 0; px < 8; px++) {
      const xx = dx + px;
      if (xx < 0 || xx >= dstW) continue;
      const c = t.pix[py * 8 + px];
      dst[yy * dstW + xx] = c === 0 ? (pal[0] ?? 0) : (pal[c + palAdd] ?? pal[0] ?? 0);
    }
  }
}

// ── OAM 数据采集 ──
function dumpOam(): { json: any[]; png: Uint32Array } {
  const json: any[] = [];
  for (let i = 0; i < 64; i++) {
    json.push({
      idx: i,
      y: ppu.sprY[i],
      tile: ppu.sprTile[i],
      attr: ppu.sprCol[i] | (ppu.vertFlip[i] ? 0x80 : 0) | (ppu.horiFlip[i] ? 0x40 : 0) | (ppu.bgPriority[i] ? 0x20 : 0),
      x: ppu.sprX[i],
    });
  }
  // PNG: 8×8 grid of 16×16 cells = 128×128
  const W = 128, H = 128;
  const out = new Uint32Array(W * H);
  out.fill(0xff_202028);
  for (let i = 0; i < 64; i++) {
    const sprTile = ppu.sprTile[i];
    const tableOff = ppu.f_spPatternTable << 8;
    const globalTile = sprTile + tableOff;
    const palAdd = ppu.sprCol[i] & 0x1c; // 0/4/8/12
    const flipH = ppu.horiFlip[i] === 1;
    const flipV = ppu.vertFlip[i] === 1;
    const t = ppu.ptTile[globalTile];
    const cx = (i % 8) * 16;
    const cy = Math.floor(i / 8) * 16;
    if (!t || !t.pix) {
      // 标记 NO_TILE
      for (let py = 0; py < 16; py++) {
        for (let px = 0; px < 16; px++) {
          const isX = (py + px) & 1;
          out[(cy + py) * W + (cx + px)] = isX ? 0xff_880088 : 0xff_000000;
        }
      }
      continue;
    }
    for (let py = 0; py < 8; py++) {
      for (let px = 0; px < 8; px++) {
        const srcPy = flipV ? (7 - py) : py;
        const srcPx = flipH ? (7 - px) : px;
        const c = t.pix[srcPy * 8 + srcPx];
        const color = c === 0 ? 0x00000000 : (ppu.sprPalette[c + palAdd] ?? 0x00000000);
        // 2x 缩放
        out[(cy + py * 2) * W + (cx + px * 2)] = color;
        out[(cy + py * 2) * W + (cx + px * 2 + 1)] = color;
        out[(cy + py * 2 + 1) * W + (cx + px * 2)] = color;
        out[(cy + py * 2 + 1) * W + (cx + px * 2 + 1)] = color;
      }
    }
  }
  return { json, png: out };
}

// ── NT 渲染（256×240） ──
function renderNt(ntIdx: 0 | 1 | 2 | 3): { json: any; png: Uint32Array } {
  const nt = ppu.nameTable[ntIdx];
  const w = 32, h = 30;
  const W = 256, H = 240;
  const out = new Uint32Array(W * H);
  const grid: number[] = [];
  const attr: number[] = [];
  const bgTableBase = ppu.regS === 0 ? 0 : 256;
  for (let ty = 0; ty < h; ty++) {
    for (let tx = 0; tx < w; tx++) {
      const tIdx = nt.tile[ty * w + tx] & 0xff;
      const a = nt.attrib[ty * w + tx] & 0xff;
      grid.push(tIdx);
      attr.push(a);
      const palAdd = (a & 0xc0) === 0xc0 ? 12
                   : (a & 0x30) === 0x30 ? 8
                   : (a & 0x0c) === 0x0c ? 4 : 0;
      blitTile(out, W, H, bgTableBase + tIdx, tx * 8, ty * 8, ppu.imgPalette, palAdd);
    }
  }
  return {
    json: { tiles: grid, attr },
    png: out,
  };
}

// ── PT 整表（128×256 = 两 64×256 并列: 左 BG=$0000, 右 SPR=$1000） ──
function renderPtSheet(): { json: any; png: Uint32Array } {
  const TILE = 8;
  const TILES_PER_ROW = 16;
  const PT_W = TILE * TILES_PER_ROW; // 128
  const PT_H = TILE * 16;            // 128
  // 两张 PT 拼为 256×128
  const W = PT_W, H = PT_H;
  const out = new Uint32Array(W * H);
  const tiles: number[][] = [];
  for (let tableIdx = 0; tableIdx < 2; tableIdx++) {
    for (let row = 0; row < 16; row++) {
      const tilesRow: number[] = [];
      for (let col = 0; col < 16; col++) {
        const tIdx = tableIdx * 256 + row * 16 + col;
        const dx = col * TILE;
        const dy = row * TILE;
        blitTile(out, W, H, tIdx, dx, dy, ppu.imgPalette, 0);
        const t = ppu.ptTile[tIdx];
        const plane0: number[] = [];
        const plane1: number[] = [];
        if (t && t.pix) {
          for (let py = 0; py < 8; py++) {
            let b0 = 0, b1 = 0;
            for (let px = 0; px < 8; px++) {
              const c = t.pix[py * 8 + px];
              if (c & 1) b0 |= 1 << (7 - px);
              if (c & 2) b1 |= 1 << (7 - px);
            }
            plane0.push(b0);
            plane1.push(b1);
          }
        }
        tilesRow.push(tIdx);
        // 同时记录到 tiles 数组
        if (!tiles[tIdx]) tiles[tIdx] = [...plane0, ...plane1];
      }
    }
  }
  return {
    json: { tiles: tiles.filter(Boolean) },
    png: out,
  };
}

// ── Palette swatch ──
function renderPaletteSwatch(): { json: any; png: Uint32Array } {
  const BLOCK = 16;
  const W = 32 * BLOCK;
  const H = 2 * BLOCK;
  const out = new Uint32Array(W * H);
  out.fill(0xff_1a1a2e);
  for (let i = 0; i < 16; i++) {
    out.fill(ppu.imgPalette[i], i * BLOCK, (i + 1) * BLOCK);
    for (let py = 0; py < BLOCK; py++) {
      for (let px = 0; px < BLOCK; px++) {
        out[BLOCK * W + i * BLOCK + py * W + px] = ppu.sprPalette[i];
      }
    }
  }
  const imgRaw: number[] = [];
  const sprRaw: number[] = [];
  for (let i = 0; i < 16; i++) {
    imgRaw.push(ppu.vramMem[0x3f00 + i] & 0x3f);
    sprRaw.push(ppu.vramMem[0x3f10 + i] & 0x3f);
  }
  return {
    json: { bg: imgRaw, spr: sprRaw },
    png: out,
  };
}

// ── 主流程 ──
const W = 256, H = 240;
const outDir = path.join(__dirname, '..', 'output');
const traceDir = path.join(outDir, 'ppu-trace');
fs.mkdirSync(traceDir, { recursive: true });

const origBg = ppu.f_bgVisibility;
const origSp = ppu.f_spVisibility;
const snapshots: any[] = [];

function writeVerifyTriple(frameN: number): void {
  // Composite
  const compNz = (() => { let n = 0; for (const v of ppu.buffer) if (v !== 0) n++; return n; })();
  fs.writeFileSync(path.join(outDir, `verify-frame${frameN}-composite.png`),
    encodePng(W, H, rgbaFromU32(ppu.buffer, W, H)));

  // BG only
  ppu.buffer.fill(0);
  ppu.f_spVisibility = 0;
  ppu.f_bgVisibility = 1;
  ppu.startFrame();
  ppu.advanceDots(262 * 341);
  ppu.renderFramePartially(0, 240);
  ppu.endFrame();
  const bgNz = (() => { let n = 0; for (const v of ppu.buffer) if (v !== 0) n++; return n; })();
  fs.writeFileSync(path.join(outDir, `verify-frame${frameN}-bg.png`),
    encodePng(W, H, rgbaFromU32(ppu.buffer, W, H)));

  // SPR only
  ppu.buffer.fill(0);
  ppu.f_spVisibility = 1;
  ppu.f_bgVisibility = 0;
  ppu.startFrame();
  ppu.advanceDots(262 * 341);
  ppu.renderFramePartially(0, 240);
  ppu.endFrame();
  const sprNz = (() => { let n = 0; for (const v of ppu.buffer) if (v !== 0) n++; return n; })();
  fs.writeFileSync(path.join(outDir, `verify-frame${frameN}-spr.png`),
    encodePng(W, H, rgbaFromU32(ppu.buffer, W, H)));

  console.log(
    `[verify] frame=${String(frameN).padStart(3)} | ` +
    `composite=${String(compNz).padStart(5)} | bg=${String(bgNz).padStart(5)} | spr=${String(sprNz).padStart(5)}`,
  );
}

function writePpuTrace(frameN: number): void {
  const dir = path.join(traceDir, `frame-${String(frameN).padStart(3, '0')}`);
  fs.mkdirSync(dir, { recursive: true });

  // composite screen.png (256x240)
  fs.writeFileSync(path.join(dir, 'screen.png'),
    encodePng(W, H, rgbaFromU32Direct(ppu.buffer, W, H)));

  // OAM
  const oam = dumpOam();
  fs.writeFileSync(path.join(dir, 'oam.json'), JSON.stringify(oam.json, null, 0));
  fs.writeFileSync(path.join(dir, 'oam.png'),
    encodePng(128, 128, rgbaFromU32(oam.png, 128, 128)));

  // NT0
  const nt0 = renderNt(0);
  fs.writeFileSync(path.join(dir, 'nt0.json'), JSON.stringify(nt0.json, null, 0));
  fs.writeFileSync(path.join(dir, 'nt0.png'),
    encodePng(W, H, rgbaFromU32(nt0.png, W, H)));

  // NT1
  const nt1 = renderNt(1);
  fs.writeFileSync(path.join(dir, 'nt1.json'), JSON.stringify(nt1.json, null, 0));
  fs.writeFileSync(path.join(dir, 'nt1.png'),
    encodePng(W, H, rgbaFromU32(nt1.png, W, H)));

  // PT
  const pt = renderPtSheet();
  const dt: number[] = [];
  for (let i = 0; i < 16; i++) { const t = ppu.ptTile[i]; let nz = 0; if (t && t.pix) for (const p of t.pix) if (p !== 0) nz++; dt.push(nz); }
  console.log(`[dbg] f${frameN} ptTile[0..15] nz:`, dt.join(','));
  fs.writeFileSync(path.join(dir, 'pt.json'), JSON.stringify(pt.json));
  fs.writeFileSync(path.join(dir, 'pt-sheet.png'),
    encodePng(128, 128, rgbaFromU32(pt.png, 128, 128)));

  // 按 scanline 重建 PT 视图（跟 emulator 同粒度）
  // 1) 取 H5 路径记录的所有 CHR slot 切换，按 scanline 分组
  // 2) 每组用一组 8 个 bank1k 渲染双 PT sheet
  // 3) 同时输出 chr-switches.json 标 scanline 用的 8 slot
  const {
    renderBothPatternTablesAtScanline,
    drainChrSwitchLog,
    buildChrBankMapByScanline,
    buildFinalChrBankMap,
  } = require('../src/core/debug/pattern-table-viewer');
  const switches = drainChrSwitchLog();
  // H5 初始 banks: 从 CHR_SLOT_MAP 读（HeadlessRuntime 默认）
  const initialBanks = new Uint8Array([0, 1, 2, 3, 124, 125, 126, 127]);
  const mapByScan = buildChrBankMapByScanline(switches, initialBanks);
  const nesForViewer: any = {
    ppu,
    rom: {
      vromTile: (runtime as any).vromTilesByBank1k
        ? ((runtime as any).vromTilesByBank1k as any)
        : (game as any).runtime?.vromTilesByBank1k
          ? (game as any).runtime.vromTilesByBank1k
          : [],
    },
  };
  fs.writeFileSync(path.join(dir, 'chr-switches.json'), JSON.stringify({
    frame: frameN,
    bankMapByScanline: Array.from(mapByScan.entries()).map(([scan, banks]) => ({
      scanline: scan, banks: Array.from(banks),
    })),
    rawLog: switches,
  }, null, 2));
  for (const [scan, slotBanks] of mapByScan) {
    const ptAt = renderBothPatternTablesAtScanline(nesForViewer, slotBanks, 0);
    const w = ptAt.table0.width * 2, h = ptAt.table0.height;
    const rgba = new Uint32Array(w * h);
    rgba.set(ptAt.table0.data, 0);
    rgba.set(ptAt.table1.data, w * h / 2);
    fs.writeFileSync(path.join(dir, `pt-sheet-scan${String(scan).padStart(3, '0')}.png`),
      encodePng(w, h, rgbaFromU32(rgba, w, h)));
  }
  // 终态 PT（H5 不区分 scanline，聚合 switches 成"最终 banks"视图）
  const finalBanks = buildFinalChrBankMap(switches, initialBanks);
  const ptFinal = renderBothPatternTablesAtScanline(nesForViewer, finalBanks, 0);
  {
    const w = ptFinal.table0.width * 2, h = ptFinal.table0.height;
    const rgba = new Uint32Array(w * h);
    rgba.set(ptFinal.table0.data, 0);
    rgba.set(ptFinal.table1.data, w * h / 2);
    fs.writeFileSync(path.join(dir, 'pt-sheet-final.png'),
      encodePng(w, h, rgbaFromU32(rgba, w, h)));
  }

  // Palette
  const pal = renderPaletteSwatch();
  fs.writeFileSync(path.join(dir, 'palette.json'), JSON.stringify(pal.json));
  fs.writeFileSync(path.join(dir, 'palette.png'),
    encodePng(32 * 16, 32, rgbaFromU32(pal.png, 32 * 16, 32)));

  // 帧概要
  const store = game.store;
  snapshots.push({
    frame: frameN,
    scene: store.readByte(0x00ed),
    ram001B: store.readByte(0x001b),
    ram0628: store.readByte(0x0628),
    ram0044: store.readByte(0x0044),
  });
}

let total = 0;
for (const target of FRAMES_LIST) {
  while (total < target) {
    game.frame(runtime);
    total++;
  }
  // 写 verify-frame 三件套（按当前 PPU 状态）
  writeVerifyTriple(target);
  // 写 ppu-trace 完整快照
  writePpuTrace(target);
}

// final-screen.png
fs.writeFileSync(path.join(traceDir, 'final-screen.png'),
  encodePng(W, H, rgbaFromU32(ppu.buffer, W, H)));
fs.writeFileSync(path.join(traceDir, 'snapshots.json'),
  JSON.stringify(snapshots, null, 2));

ppu.f_bgVisibility = origBg;
ppu.f_spVisibility = origSp;
console.log(`[verify] done. PNGs at output/verify-frame{N}-{composite|bg|spr}.png`);
console.log(`[verify]      + output/ppu-trace/frame-NNN/{screen,oam,nt0,nt1,pt-sheet,palette}.png + .json`);
