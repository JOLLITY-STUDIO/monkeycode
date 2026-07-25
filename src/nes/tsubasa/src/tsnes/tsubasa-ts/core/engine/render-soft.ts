/**
 * ============================================================================
 * render-soft — Node.js 軟體渲染器 (無 Canvas)
 *
 * 從 PPU 狀態 (vram, palette, ctrl, mask, scroll) + CHR ROM data +
 * MMC3 映射直接渲染 256×240 像素。
 *
 * 輸出 Uint32Array[61440] (每像素 ARGB 格式) 或 PPM 二進位。
 * ============================================================================
 */

// ═══════════════ NES 64 色調色板 (NTSC) ═══════════════
// 值為 ARGB (0xAARRGGBB), alpha=FF

const NES_PAL: number[] = [
  0xFF666666, 0xFF002A88, 0xFF1412A7, 0xFF3B00A4,
  0xFF5C007E, 0xFF6E0040, 0xFF6C0600, 0xFF561D00,
  0xFF333500, 0xFF0B4800, 0xFF005200, 0xFF004F08,
  0xFF00404D, 0xFF000435, 0xFF000000, 0xFF000000,
  0xFFADADAD, 0xFF155FD9, 0xFF4240FF, 0xFF7527FE,
  0xFFA01ACC, 0xFFB71E7B, 0xFFB53120, 0xFF994E00,
  0xFF6B6D00, 0xFF388700, 0xFF0C9300, 0xFF008F32,
  0xFF007C8D, 0xFF0060D7, 0xFF000000, 0xFF000000,
  0xFFFFFEFF, 0xFF64B0FF, 0xFF9290FF, 0xFFC676FF,
  0xFFF36AFF, 0xFFFE6ECC, 0xFFFE8170, 0xFFEA9E22,
  0xFFBCBE00, 0xFF88D800, 0xFF5CE430, 0xFF45E082,
  0xFF48CDDE, 0xFF53B3E2, 0xFF4E4E4E, 0xFF000000,
  0xFFFFFEFF, 0xFFC0DFFF, 0xFFD3D2FF, 0xFFE8C8FF,
  0xFFFBC2FF, 0xFFFEC4EA, 0xFFFECCC5, 0xFFF7D8A5,
  0xFFE4E594, 0xFFCFEF96, 0xFFBDF4AB, 0xFFB3F3CC,
  0xFFB5EBF2, 0xFFB5EBF2, 0xFFB8B8B8, 0xFF000000,
];

// ═══════════════ 常量 ═══════════════

const SCREEN_W = 256;
const SCREEN_H = 240;
const NT_W = 32;
const NT_H = 30;

/** VRAM nametable offset per NT index */
const NT_OFF = [0, 1024, 2048, 3072]; // each NT = 1024 bytes
const ATTR_OFF = 960; // attribute table within a NT
const NT_BYTES = 1024;

// ═══════════════ 瓦片解碼 ═══════════════

/**
 * 解碼一個 NES 8×8 tile
 * @param chrData CHR ROM 原始數據
 * @param offset  tile 在 CHR 中的偏移 (16-byte 對齊)
 * @param pixels  輸出 buffer (64 個 uint8: 0-3 color index)
 */
export function decodeTile(chrData: number[] | Uint8Array, offset: number, pixels: Uint8Array | number[]): void {
  for (let row = 0; row < 8; row++) {
    const p0 = chrData[offset + row] ?? 0;
    const p1 = chrData[offset + row + 8] ?? 0;
    for (let col = 0; col < 8; col++) {
      const bit = 7 - col;
      const c = ((p0 >> bit) & 1) | (((p1 >> bit) & 1) << 1);
      pixels[row * 8 + col] = c;
    }
  }
}

// ═══════════════ MMC3 CHR 地址映射 ═══════════════

/**
 * 根據 MMC3 寄存器將 PPU 圖案地址映射到 CHR ROM 全局偏移
 * @param mmc3   MMC3 狀態 { regs: { r0-r5 }, chrBankMode }
 * @param ppuAddr PPU 圖案地址 (0-$1FFF)
 * @returns CHR ROM 30-bit 偏移 = bankIdx * 4096 + offset
 */
export function mapChrAddrSimple(mmc3: any, ppuAddr: number): number {
  const r = mmc3.regs ?? mmc3;
  if (mmc3.chrBankMode === 0) {
    // Mode 0: R0/R1 = 2KB each, R2-R5 = 1KB each
    if (ppuAddr < 2048) {
      const bank2k = r.r0 >> 1;
      return (bank2k >> 1) * 4096 + ((bank2k & 1) * 2048) + ppuAddr;
    }
    if (ppuAddr < 4096) {
      const bank2k = r.r1 >> 1;
      return (bank2k >> 1) * 4096 + ((bank2k & 1) * 2048) + (ppuAddr - 2048);
    }
    if (ppuAddr < 5120) return (r.r2 >> 2) * 4096 + ((r.r2 & 3) * 1024) + (ppuAddr - 4096);
    if (ppuAddr < 6144) return (r.r3 >> 2) * 4096 + ((r.r3 & 3) * 1024) + (ppuAddr - 5120);
    if (ppuAddr < 7168) return (r.r4 >> 2) * 4096 + ((r.r4 & 3) * 1024) + (ppuAddr - 6144);
    if (ppuAddr < 8192) return (r.r5 >> 2) * 4096 + ((r.r5 & 3) * 1024) + (ppuAddr - 7168);
    return 0;
  }
  // Mode 1: R0/R1 = 1KB swapped, R2-R5 = 1KB
  if (ppuAddr < 1024) return (r.r0 >> 2) * 4096 + ((r.r0 & 3) * 1024) + ppuAddr;
  if (ppuAddr < 2048) return (r.r1 >> 2) * 4096 + ((r.r1 & 3) * 1024) + (ppuAddr - 1024);
  if (ppuAddr < 3072) return (r.r2 >> 2) * 4096 + ((r.r2 & 3) * 1024) + (ppuAddr - 2048);
  if (ppuAddr < 4096) return (r.r3 >> 2) * 4096 + ((r.r3 & 3) * 1024) + (ppuAddr - 3072);
  if (ppuAddr < 5120) return (r.r4 >> 2) * 4096 + ((r.r4 & 3) * 1024) + (ppuAddr - 4096);
  if (ppuAddr < 6144) return (r.r5 >> 2) * 4096 + ((r.r5 & 3) * 1024) + (ppuAddr - 5120);
  return 0;
}

// ═══════════════ 主渲染 ═══════════════

/**
 * 渲染完整一幀
 * @param ppu    PPU 狀態 (core/ppu.ts 格式)
 * @param chrData 完整 CHR-ROM 數據 (131072 bytes)
 * @param mmc3   MMC3 狀態
 * @param tileBuf 可選的 64-byte tile 解碼緩衝 (復用避免分配)
 * @returns Uint32Array[61440] ARGB 像素
 */
export function renderFrame(
  ppu: any,
  chrData: number[] | Uint8Array,
  mmc3: any,
  tileBuf?: Uint8Array,
): Uint32Array {
  const buf = new Uint32Array(SCREEN_W * SCREEN_H);
  const tb = tileBuf ?? new Uint8Array(64);
  const vram = ppu.vram;
  const palette = ppu.palette ?? new Array(32).fill(0);
  const mask = ppu.mask ?? { bgShow: false, sprShow: false, gray: false };
  const ctrl = ppu.ctrl ?? { nametable: 0, bgTbl: 0, sprTbl: 0, sprSize: 8 };

  // ─── 背景渲染 ───
  if (mask.bgShow || (typeof mask === 'number' && (mask & 8))) {
    renderBg(buf, vram, chrData, mmc3, palette, ctrl, ppu, tb);
  }

  // ─── 精靈渲染 ───
  if (mask.sprShow || (typeof mask === 'number' && (mask & 16))) {
    renderSprites(buf, ppu.oam ?? [], chrData, mmc3, palette, ctrl, tb);
  }

  // ─── 灰度模式 ───
  if (mask.gray || (typeof mask === 'number' && (mask & 1))) {
    for (let i = 0; i < buf.length; i++) {
      const v = buf[i] & 0xFF;
      const g = (v >>> 16) & 0xFF;
      const b = v & 0xFF;
      const r = g; // use green as intensity
      const avg = (r + g + b) / 3 | 0;
      buf[i] = 0xFF000000 | (avg << 16) | (avg << 8) | avg;
    }
  }

  return buf;
}

// ═══════════════ 背景 ═══════════════

function renderBg(
  buf: Uint32Array,
  vram: number[],
  chrData: number[] | Uint8Array,
  mmc3: any,
  palette: number[],
  ctrl: any,
  ppu: any,
  tb: Uint8Array,
): void {
  const ntId = ctrl.nametable ?? (ctrl & 3);
  const ntBase = NT_OFF[ntId & 3];
  const bgTblBase = ctrl.bgTbl ?? ((typeof ctrl === 'number' && (ctrl & 16)) ? 4096 : 0);
  const scrollX = ppu.scrollX ?? 0;
  const scrollY = ppu.scrollY ?? 0;
  const fineX = ppu.fineX ?? 0;

  const pixelOffX = -((scrollX % 8) + fineX);
  const pixelOffY = -(scrollY % 8);
  const tileBaseX = Math.floor(scrollX / 8);
  const tileBaseY = Math.floor(scrollY / 8);

  // 水平 mirroring 簡化: 鏡像 nt0↔nt1
  const isH = true; // Tsubasa II uses horizontal mirroring

  for (let ty = 0; ty <= NT_H; ty++) {
    for (let tx = 0; tx <= NT_W; tx++) {
      const globalX = tileBaseX + tx;
      const globalY = tileBaseY + ty;

      // nametable mirroring
      let ntIdx: number;
      if (isH) {
        ntIdx = (globalX < NT_W) ? (ntId & 0xFE) : ((ntId & 0xFE) ^ 1);
      } else {
        ntIdx = (globalY < NT_H) ? (ntId & 0xFC) : ((ntId & 0xFC) ^ 1);
      }
      const localX = globalX & (NT_W - 1);
      const localY = (globalY % NT_H + NT_H) % NT_H;

      // tile index
      const tileAddr = NT_OFF[ntIdx & 3] + localY * NT_W + localX;
      const tileId = vram[tileAddr] ?? 0;
      if (tileId === 0) continue; // skip blank tile

      // attribute palette
      const ax = localX >> 2;
      const ay = localY >> 2;
      const attrAddr = NT_OFF[ntIdx & 3] + ATTR_OFF + ay * 8 + ax;
      const attrByte = vram[attrAddr] ?? 0;
      const quad = ((localY & 2) << 1) | (localX & 2);
      const palIdx = (attrByte >> quad) & 3;

      // decode tile from CHR (via MMC3 mapping)
      const ppuTileAddr = bgTblBase + tileId * 16;
      const chrAddr = mapChrAddrSimple(mmc3, ppuTileAddr);
      decodeTile(chrData, chrAddr, tb);

      // blit 8×8
      const dx = pixelOffX + tx * 8;
      const dy = pixelOffY + ty * 8;
      blitTile(buf, tb, palette, palIdx, dx, dy);
    }
  }
}

// ═══════════════ 精靈 ═══════════════

function renderSprites(
  buf: Uint32Array,
  oam: number[],
  chrData: number[] | Uint8Array,
  mmc3: any,
  palette: number[],
  ctrl: any,
  tb: Uint8Array,
): void {
  const sprSize = ctrl.sprSize ?? ((typeof ctrl === 'number' && (ctrl & 32)) ? 16 : 8);
  const sprTbl = ctrl.sprTbl ?? ((typeof ctrl === 'number' && (ctrl & 8)) ? 4096 : 0);

  // back-to-front (高索引先畫 = 在底層)
  for (let i = 63; i >= 0; i--) {
    const off = i * 4;
    const y = oam[off] ?? 255;
    const tileId = oam[off + 1] ?? 0;
    const attr = oam[off + 2] ?? 0;
    const x = oam[off + 3] ?? 0;

    if (y >= 0xEF || tileId === 0) continue;

    const flipH = (attr & 0x40) !== 0;
    const flipV = (attr & 0x80) !== 0;
    const palIdx = ((attr & 3) + 4); // sprites use palettes 4-7
    const behind = (attr & 0x20) !== 0;

    const spriteY = y + 1; // sprite offset
    const spX = x >= SCREEN_W - 8 ? x - 256 : x;

    const tileCount = sprSize === 16 ? 2 : 1;
    for (let h = 0; h < tileCount; h++) {
      let tid = sprSize === 16
        ? (tileId & 0xFE) + (flipV ? (1 - h) : h)
        : tileId;
      const ppuTileAddr = (sprSize === 16)
        ? (tid & 1) * 4096 + (tid & 0xFE) * 16
        : sprTbl + tid * 16;
      const chrAddr = mapChrAddrSimple(mmc3, ppuTileAddr);

      decodeTile(chrData, chrAddr, tb);
      blitTileFlipped(buf, tb, palette, palIdx, spX, spriteY + h * 8, flipH, flipV, behind);
    }
  }
}

// ═══════════════ 像素覆制 ═══════════════

function blitTile(
  buf: Uint32Array,
  tile: Uint8Array,
  palette: number[],
  palIdx: number,
  dx: number, dy: number,
): void {
  const palOff = palIdx * 4;
  for (let py = 0; py < 8; py++) {
    const sy = dy + py;
    if (sy < 0 || sy >= SCREEN_H) continue;
    const rowOff = sy * SCREEN_W;
    const srcOff = py * 8;
    for (let px = 0; px < 8; px++) {
      const sx = dx + px;
      if (sx < 0 || sx >= SCREEN_W) continue;
      const ci = tile[srcOff + px];
      if (ci === 0) continue; // transparent
      const colIdx = palette[palOff + ci] & 63;
      buf[rowOff + sx] = NES_PAL[colIdx] ?? 0xFF000000;
    }
  }
}

function blitTileFlipped(
  buf: Uint32Array,
  tile: Uint8Array,
  palette: number[],
  palIdx: number,
  dx: number, dy: number,
  flipH: boolean, flipV: boolean,
  behind: boolean,
): void {
  const palOff = palIdx * 4;
  for (let py = 0; py < 8; py++) {
    const sy = dy + (flipV ? (7 - py) : py);
    if (sy < 0 || sy >= SCREEN_H) continue;
    const rowOff = sy * SCREEN_W;
    for (let px = 0; px < 8; px++) {
      const sx = dx + px;
      if (sx < 0 || sx >= SCREEN_W) continue;
      const ci = tile[(flipV ? (7 - py) : py) * 8 + (flipH ? (7 - px) : px)];
      if (ci === 0) continue; // transparent
      // behind BG: 僅在 BG 像素為 0 (透明)時繪製
      if (behind && (buf[rowOff + sx] & 0x00FFFFFF) !== 0) continue;
      const colIdx = palette[palOff + ci] & 63;
      buf[rowOff + sx] = NES_PAL[colIdx] ?? 0xFF000000;
    }
  }
}

// ═══════════════ PPM 輸出 ═══════════════

/**
 * 將 ARGB Uint32Array 轉為 PPM 二進位 (P6)
 */
export function toPpm(buf: Uint32Array): Uint8Array {
  const header = `P6\n${SCREEN_W} ${SCREEN_H}\n255\n`;
  const headerBytes = new TextEncoder().encode(header);
  const data = new Uint8Array(headerBytes.length + SCREEN_W * SCREEN_H * 3);
  data.set(headerBytes, 0);
  let off = headerBytes.length;
  for (let i = 0; i < buf.length; i++) {
    const v = buf[i];
    data[off++] = (v >>> 16) & 0xFF; // R
    data[off++] = (v >>> 8) & 0xFF;  // G
    data[off++] = v & 0xFF;          // B
  }
  return data;
}

/** ASCII art 渲染 (調色板索引 0-63 → 灰度字符) */
export function toAscii(buf: Uint32Array): string {
  const chars = ' .:-=+*#%@';
  const lines: string[] = [];
  for (let y = 0; y < SCREEN_H; y += 2) {
    let line = '';
    for (let x = 0; x < SCREEN_W; x++) {
      const p = buf[y * SCREEN_W + x];
      const g = (p & 0xFF);
      line += chars[Math.floor(g / 28.5)];
    }
    lines.push(line);
  }
  return lines.join('\n');
}
