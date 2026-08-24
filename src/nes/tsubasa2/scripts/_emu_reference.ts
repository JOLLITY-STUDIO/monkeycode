/**
 * _emu_reference.ts — 用 TS NES 模拟器（src/core/nes.ts）跑同一份 ROM，
 *                       在同样的 frame 节点 dump PPU 状态到
 *                       output/emu-reference/frame-XXX/
 *
 * 目的：作为 H5 转写版本（chr-bank-XX.ts + game/index.ts）的真值对照基线。
 *       跑出来的 PT/NT/OAM/Palette 应与 output/ppu-trace/frame-XXX/ 一致
 *       （H5 路径产出 = ROM 实际行为 = "as if 模拟器跑 ROM"）。
 *
 * 用法（scripts/_emu_reference.cjs esbuild 打包后）：
 *   node scripts/_emu_reference.cjs
 */
import * as fs from 'fs';
import * as path from 'path';
import * as zlib from 'zlib';
import { NES } from '../src/core';
import {
  renderBothPatternTables,
  renderBothPatternTablesAtScanline,
  drainChrSwitchLog,
  buildChrBankMapByScanline,
} from '../src/core/debug/pattern-table-viewer';

// ── 路径常量 ──
const ROM_PATH = path.join(__dirname, '..', 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes');
const OUT_DIR  = path.join(__dirname, '..', 'output', 'emu-reference');
const FRAMES   = [30, 60, 90, 120, 150, 180, 210, 240, 270, 300];

// ── PNG 编码器（同 _verify_300frame.ts）──
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
function bufToRgba(buf: Uint32Array): Buffer {
  const w = 256, h = 240;
  const rgba = Buffer.alloc(w * h * 4);
  for (let i = 0; i < w * h; i++) {
    const v = buf[i];
    rgba[i * 4 + 0] = (v >>> 16) & 0xff;
    rgba[i * 4 + 1] = (v >>> 8) & 0xff;
    rgba[i * 4 + 2] = v & 0xff;
    rgba[i * 4 + 3] = 0xff;
  }
  return rgba;
}
function rgbaFromData(data: Uint32Array, w: number, h: number): Buffer {
  const rgba = Buffer.alloc(w * h * 4);
  for (let i = 0; i < w * h; i++) {
    const v = data[i];
    rgba[i * 4 + 0] = (v >>> 16) & 0xff;
    rgba[i * 4 + 1] = (v >>> 8) & 0xff;
    rgba[i * 4 + 2] = v & 0xff;
    rgba[i * 4 + 3] = 0xff;
  }
  return rgba;
}

// ── 主流程 ──
const romBytes = fs.readFileSync(ROM_PATH);
const nes = new NES({ emulateSound: false });
nes.loadROM(romBytes);
const ppu: any = (nes as any).ppu;
const mmap: any = (nes as any).mmap;
const rom: any = (nes as any).rom;

console.log(`[emu-ref] mapper=${rom.mapperType}  prg=${rom.romCount}×16KB  chr=${rom.vromCount}×4KB`);

let total = 0;
for (const target of FRAMES) {
  while (total < target) {
    nes.frame();
    total++;
  }
  // 模拟 H5 _verify_300frame.ts 的 renderTriple 抓取时机:
  // 跑完 game.frame() 后强制重跑 PPU 整帧渲染(startFrame+262scanline+endFrame)
  // 保证 NT/OAM/PT 都处于"显示完成"状态,而不是停在某条 CPU 指令中间
  const origBg = ppu.f_bgVisibility;
  const origSp = ppu.f_spVisibility;
  if (typeof ppu.startFrame === 'function') {
    ppu.startFrame();
    ppu.advanceDots(262 * 341);
    ppu.renderFramePartially(0, 240);
    ppu.endFrame();
  }
  // 强制 reload 全部 8 个 1KB CHR slot 到 ptTile（避免某 slot 没被当前帧渲染导致残留旧 tile）
  if (mmap && Array.isArray(mmap.chrBanks) && typeof mmap.load1kVromBank === 'function') {
    for (let slot = 0; slot < 8; slot++) {
      mmap.load1kVromBank(mmap.chrBanks[slot], slot * 0x400);
    }
  }
  // 按 scanline 分组 dump 多个 PT sheet：每组 = 该 scanline 用的 8 个 1KB slot
  const switches = drainChrSwitchLog();
  const chrMapByScan = buildChrBankMapByScanline(switches, mmap.chrBanks);
  const frameDir = path.join(OUT_DIR, `frame-${String(target).padStart(3, '0')}`);
  fs.mkdirSync(frameDir, { recursive: true });
  fs.writeFileSync(
    path.join(frameDir, 'chr-switches.json'),
    JSON.stringify({
      frame: target,
      bankMapByScanline: Array.from(chrMapByScan.entries()).map(([scan, banks]) => ({
        scanline: scan, banks: Array.from(banks),
      })),
      rawLog: switches,
    }, null, 2)
  );
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

  // 1) Screen (PPU buffer)
  fs.writeFileSync(path.join(frameDir, 'screen.png'), encodePng(256, 240, bufToRgba(ppu.buffer)));

  // 2) Pattern Table sheet (256×128：table0+table1 横排，按 ptTile 当前缓存 = 最后一次 load1kVromBank 状态)
  const pt = renderBothPatternTables(nes, 0);
  const ptW = pt.table0.width;
  const ptH = pt.table0.height;
  const ptRgba = rgbaFromData(new Uint32Array([...pt.table0.data, ...pt.table1.data]), ptW * 2, ptH);
  fs.writeFileSync(path.join(frameDir, 'pt-sheet.png'), encodePng(ptW * 2, ptH, ptRgba));

  // 3) PT JSON: 512 tile，每 tile 8 byte plane0 + 8 byte plane1
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

  // 4) Nametables — 用 PPU 内部 NT 字节 + 当前 ptTile 重建（不走 bgbuffer，避免时序不一致）
  const ntRgba = renderAllNameTablesNoBg(ppu, rom);
  for (let i = 0; i < 4; i++) {
    fs.writeFileSync(path.join(frameDir, `nt${i}.png`), encodePng(256, 240, rgbaFromData(ntRgba[i], 256, 240)));
  }
  const ntJson: any[] = [];
  for (let i = 0; i < 4; i++) {
    const t = ppu.nameTable[i];
    ntJson.push({
      idx: i,
      tile: Array.from(t.tile),
      attrib: Array.from(t.attrib),
    });
  }
  fs.writeFileSync(path.join(frameDir, 'nt.json'), JSON.stringify(ntJson));

  // 5) OAM (64 sprites: y, tile, attr, x)
  const oamArr: number[] = Array.from(ppu.spriteMem);
  const oamJson: any[] = [];
  for (let i = 0; i < 64; i++) {
    oamJson.push({
      idx: i,
      y: oamArr[i * 4 + 0],
      tile: oamArr[i * 4 + 1],
      attr: oamArr[i * 4 + 2],
      x: oamArr[i * 4 + 3],
    });
  }
  fs.writeFileSync(path.join(frameDir, 'oam.json'), JSON.stringify(oamJson));
  // 独立 OAM PNG：4×16 网格 (64 sprite, 每 sprite 8×8 tile preview + 7 间隔)
  const oamImg = renderOamSheet(oamJson, ppu);
  fs.writeFileSync(path.join(frameDir, 'oam.png'), encodePng(oamImg.w, oamImg.h, oamImg.rgba));
  // 组合后的 OAM 图：按 y/x 把 64 sprite 摆到 256×240 画布上（sprite-only layer）
  const oamComp = renderOamComposite(oamJson, ppu);
  fs.writeFileSync(path.join(frameDir, 'oam-composite.png'), encodePng(256, 240, oamComp));

  // 6) Palette (32 colors: 16 BG + 16 SPR)
  const palBg = Array.from(ppu.vramMem.slice(0x3F00, 0x3F10));
  const palSp = Array.from(ppu.vramMem.slice(0x3F10, 0x3F20));
  fs.writeFileSync(path.join(frameDir, 'palette.json'), JSON.stringify({ bg: palBg, sp: palSp }));
  // 独立 palette PNG: 8×4 网格
  const palImg = renderPaletteSheet(palBg, palSp, ppu);
  fs.writeFileSync(path.join(frameDir, 'palette.png'), encodePng(palImg.w, palImg.h, palImg.rgba));

  // 7) MMC3 CHR bank map（8 个 1KB slot）
  const chrMap = mmap.chrBanks ? Array.from(mmap.chrBanks) : [];
  const prgMap = mmap.prgBankMap || {};
  fs.writeFileSync(path.join(frameDir, 'state.json'), JSON.stringify({
    frame: total,
    pc: (nes as any).cpu ? (((nes as any).cpu.REG_PC >>> 0) || ((nes as any).cpu.pc & 0xffff)) : 0,
    nTblAddress: ppu.f_nTblAddress,
    bgTable: ppu.f_bgPatternTable,
    spTable: ppu.f_spPatternTable,
    chrBanks: chrMap,
    prgBankMap: prgMap,
  }, null, 2));

  console.log(`[emu-ref] frame=${String(target).padStart(3)}  PT[0..7]=[${chrMap.join(',')}]  PRG@8000=${prgMap[0x8000]}`);
}

console.log(`[emu-ref] done. PNG/JSON at ${OUT_DIR}`);

// ── 自实现 NT renderer：直接用 PPU 内部 nameTable[i] + ptTile + imgPalette，
//    不走 bgbuffer（避免跟 screen buffer 时序错位）
function renderAllNameTablesNoBg(ppu: any, rom: any): Uint32Array[] {
  const W = 256, H = 240, COLS = 32, ROWS = 30;
  const bgTableBase = ppu.regS === 0 ? 0 : 256;
  const pal = ppu.imgPalette;
  const out: Uint32Array[] = [];
  for (let ntIdx = 0; ntIdx < 4; ntIdx++) {
    const buf = new Uint32Array(W * H);
    const nt = ppu.nameTable[ntIdx];
    if (!nt) { out.push(buf); continue; }
    for (let ty = 0; ty < ROWS; ty++) {
      for (let tx = 0; tx < COLS; tx++) {
        const tileIdx = nt.tile[ty * COLS + tx] | 0;
        const attrVal = nt.attrib[ty * COLS + tx] | 0;
        const pt = ppu.ptTile[bgTableBase + tileIdx];
        const pix = pt && pt.pix ? pt.pix : null;
        const baseX = tx * 8, baseY = ty * 8;
        if (pix) {
          for (let py = 0; py < 8; py++) {
            for (let px = 0; px < 8; px++) {
              const ci = pix[py * 8 + px];
              buf[(baseY + py) * W + baseX + px] =
                ci === 0 ? pal[0] : (pal[ci + attrVal] ?? pal[0]);
            }
          }
        } else {
          // 无 tile 数据：填背景色
          for (let py = 0; py < 8; py++) {
            for (let px = 0; px < 8; px++) {
              buf[(baseY + py) * W + baseX + px] = pal[0];
            }
          }
        }
      }
    }
    out.push(buf);
  }
  return out;
}

// ── OAM sheet: 64 sprite, 每 sprite 8x8 tile, 网格 8 列 ──
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
        const color = idx === 0
          ? 0xff202020
          : (ppu.imgPalette[palHi + idx] ?? 0xff202020);
        const r = (color >>> 16) & 0xff;
        const g = (color >>> 8) & 0xff;
        const b = color & 0xff;
        const off = ((cy + py) * w + cx + px) * 4;
        rgba[off] = r; rgba[off + 1] = g; rgba[off + 2] = b; rgba[off + 3] = 0xff;
      }
      // 1px 分隔
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

// ── OAM composite: 按 y/x 把 64 sprite 摆到 256×240 画布上（sprite-only layer）
//    与 screen 同步：透明像素用紫色棋盘标识（参照 PPU viewer 习惯）
function renderOamComposite(oamJson: any[], ppu: any): Buffer {
  const W = 256, H = 240;
  const rgba = Buffer.alloc(W * H * 4);
  // 透明像素用紫色棋盘（跟 nametable viewer 的品红棋盘一致）
  const fillBg = (x: number, y: number) => {
    const off = (y * W + x) * 4;
    const isM = ((y >> 1) + (x >> 1)) & 1;
    const v = isM ? 0xff_30_00_30 : 0xff_00_00_00;
    rgba[off] = (v >>> 16) & 0xff;
    rgba[off + 1] = (v >>> 8) & 0xff;
    rgba[off + 2] = v & 0xff;
    rgba[off + 3] = 0xff;
  };
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) fillBg(x, y);

  const baseIdx = ppu.f_spPatternTable ? 256 : 0;
  for (let i = 0; i < oamJson.length; i++) {
    const o = oamJson[i];
    if (o.y >= 0xef) continue;            // 隐藏 sprite (y >= 0xEF)
    const attr = o.attr;
    const flipH = (attr & 0x40) ? 1 : 0;
    const flipV = (attr & 0x80) ? 1 : 0;
    const palHi = (attr & 0x03) << 2;
    const ptT = ppu.ptTile[baseIdx + o.tile];
    const pix = ptT && ptT.pix ? ptT.pix : null;
    if (!pix) continue;
    // NES PPU 内部坐标：y/x 已经是 -1 基线（y=0 → scanline -1，y=0xFF → 隐藏）
    // 屏幕上 y+1, x 为可见坐标
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
        const r = (color >>> 16) & 0xff;
        const g = (color >>> 8) & 0xff;
        const b = color & 0xff;
        const off = (dy * W + dx) * 4;
        rgba[off] = r; rgba[off + 1] = g; rgba[off + 2] = b; rgba[off + 3] = 0xff;
      }
    }
  }
  return rgba;
}

// ── Palette sheet: 32 色 (16 BG + 16 SPR), 8 列 4 行 ──
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
    const r = (entry >>> 16) & 0xff;
    const g = (entry >>> 8) & 0xff;
    const b = entry & 0xff;
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
