/**
 * NameTable Viewer — 参照 FCEUX NameTableViewer (src/drivers/Qt/NameTableViewer.cpp)
 *
 * 显示 4 个 nametable 的内容，包含：
 * - 32×30 tiles 用实际调色板渲染 (256×240 像素/nametable)
 * - 滚动位置指示线
 * - 属性表可视化
 */

import type NES from '../nes';

/** 渲染一帧 nametable 的图像数据 */
export interface NameTableFrame {
  /** RGBA 像素 (256 × 240) */
  data: Uint32Array;
  width: number;   // 256
  height: number;  // 240
}

export interface ScrollState {
  x: number;
  y: number;
  /** 写入发生时的 NES 可见 scanline，-1 表示在 VBlank 期间写入 */
  scanline: number;
}

export interface NameTableAllFrames {
  /** 4 个 nametable (0=0x2000, 1=0x2400, 2=0x2800, 3=0x2C00) */
  nt: [NameTableFrame, NameTableFrame, NameTableFrame, NameTableFrame];
  /** 逻辑地址到物理 nametable 的映射 (ntable1) */
  mapping: [number, number, number, number];
  /** 当前滚动位置（主视口用） */
  scrollX: number;
  scrollY: number;
  /** 最后 $2005 写入的原始滚动值（调试用） */
  rawScrollX: number;
  rawScrollY: number;
  /** 是否从 lastScrollWrite 取值 */
  fromScrollWrite: boolean;
  /** 本帧所有完整的 $2005 滚动写入对，用于 split-screen 调试 */
  scrolls: ScrollState[];
}

/** 滚动指示线颜色 (FCEUX 风格: 青绿色虚线) */
const SCROLL_LINE_COLOR = 0xff_00ff_ff;

/** 缺失 CHR tile 标记色 (品红棋盘) */
const MISSING_TILE_COLOR1 = 0xff_ff00ff; // 品红
const MISSING_TILE_COLOR2 = 0xff_000000; // 黑

/**
 * 渲染单个 NameTable
 *
 * 策略:
 * 1. 优先从 PPU 已渲染好的背景帧 (bgbuffer) 取该 tile 在当前帧实际被画出的像素。
 *    这能正确处理 MMC3/动态 CHR bank 切换：同一帧不同 scanline 可能用不同 bank。
 * 2. 若该 tile 当前帧不在可视区域内，用 PPU 逐 scanline 录制的 CHR bank 快照，
 *    从 ROM vromTile 查找对应 scanline 的正确 tile 数据。
 * 3. 两者都不通 → 品红棋盘标记。
 */
export function renderNameTable(
  nes: NES,
  ntIndex: number,
  scrollX: number,
  scrollY: number,
): NameTableFrame {
  const ppu = nes.ppu;
  const nt = ppu.nameTable[ntIndex];
  const w = 32, h = 30;
  const buf = new Uint32Array(256 * 240);

  // 与 PPU renderBgScanline 保持一致: regS 决定 BG pattern table 基址
  const bgTableBase = ppu.regS === 0 ? 0 : 256;
  const backdropColor = ppu.imgPalette[0];
  const pal = ppu.imgPalette;

  // 当前帧背景像素。若 bgbuffer 还没生成，则整屏 fallback。
  const bgBuf = ppu.bgbuffer;
  // 逐 scanline 录制的 CHR bank 快照 (MMC3 等动态 mapper)
  const scanBanks = ppu.chrScanlineBanks;
  // ROM 预解码的 tile 数据: vromTile[bank4k][tileIndex]
  const vromTile: any = nes.rom && nes.rom.vromTile;

  /**
   * 根據 PPU slot 和 local tile index，從 ROM vromTile 取 tile 數據
   * @param slot 0-7: PPU 1KB slot ($0000-$1C00)
   * @param localIdx tile index within 1KB slot (0-63)
   * @param scanlineY NT 內部的 scanline 位移 (0-239)，用於取 CHR bank 快照
   */
  const fetchFromBank = (slot: number, localIdx: number, scanlineY: number): any => {
    if (!vromTile || !scanBanks) return null;
    const bankMap = scanBanks[scanlineY];
    if (!bankMap) return null;
    const bank1k = bankMap[slot];
    if (bank1k == null) return null;
    const bank4k = (bank1k / 4) | 0;
    const offset = (bank1k % 4) * 64 + localIdx;
    return vromTile[bank4k] ? vromTile[bank4k][offset] : null;
  };

  for (let ty = 0; ty < h; ty++) {
    for (let tx = 0; tx < w; tx++) {
      const baseX = tx * 8;
      const baseY = ty * 8;
      const tileIdx = nt.tile[ty * w + tx];
      const attrVal = nt.attrib[ty * w + tx]; // 0/4/8/12

      // ── 尝试从 bgbuffer 取当前帧实际渲染的像素 ──
      if (bgBuf) {
        // 该 tile 在 4-screen 全空间中的像素坐标
        const worldX = (ntIndex % 2) * 256 + baseX;
        const worldY = Math.floor(ntIndex / 2) * 240 + baseY;

        // 滚动画面的可视区域 (screen-space)
        const screenX = worldX - scrollX;
        const screenY = worldY - scrollY;

        // 若整 8x8 tile 都在当前帧可视范围内，优先从 bgbuffer 复制
        if (
          screenX >= 0 && screenX + 8 <= 256 &&
          screenY >= 0 && screenY + 8 <= 240
        ) {
          // bgbuffer 不會每幀清空：透明像素會保留上一幀殘影。
          // 所以複製後再用 ptTile 把透明像素強制設為背景色。
          const ptSlot = bgTableBase + tileIdx;
          const ptData = ppu.ptTile[ptSlot];
          const pix = ptData && ptData.pix ? ptData.pix : null;

          for (let py = 0; py < 8; py++) {
            const srcRow = (screenY + py) * 256;
            const dstRow = (baseY + py) * 256;
            for (let px = 0; px < 8; px++) {
              if (pix && pix[py * 8 + px] === 0) {
                buf[dstRow + baseX + px] = backdropColor;
              } else {
                buf[dstRow + baseX + px] = bgBuf[srcRow + screenX + px];
              }
            }
          }
          continue;
        }
      }

      // ── Fallback: 用逐 scanline 录制的 CHR bank 快照重建 ──
      const slot = bgTableBase === 0 ? (tileIdx >> 6) : (4 + (tileIdx >> 6));
      const localIdx = tileIdx & 63;
      const ptData = fetchFromBank(slot, localIdx, baseY)
        // 若沒有 bank 快照，fallback 到當前 ptTile
        || ppu.ptTile[bgTableBase + tileIdx];

      if (ptData && ptData.pix) {
        const pix = ptData.pix;
        for (let py = 0; py < 8; py++) {
          for (let px = 0; px < 8; px++) {
            const colIdx = pix[py * 8 + px];
            if (colIdx === 0) {
              buf[(baseY + py) * 256 + (baseX + px)] = backdropColor;
            } else {
              buf[(baseY + py) * 256 + (baseX + px)] = pal[colIdx + attrVal] ?? backdropColor;
            }
          }
        }
      } else {
        // ptTile 无数据 — 品红棋盘标记
        for (let py = 0; py < 8; py++) {
          for (let px = 0; px < 8; px++) {
            const isMagenta = ((py >> 1) + (px >> 1)) & 1;
            buf[(baseY + py) * 256 + (baseX + px)] = isMagenta ? MISSING_TILE_COLOR1 : MISSING_TILE_COLOR2;
          }
        }
      }
    }
  }

  return { data: buf, width: 256, height: 240 };
}

/**
 * 渲染所有 4 个 nametable + 滚动位置标记
 */
export function renderAllNameTables(nes: NES): NameTableAllFrames {
  const ppu = nes.ppu;

  // 收集本帧所有完整的 $2005 写入对；部分 PPU 实现会在渲染/IO 后把
  // regHT/VT 等寄存器破坏，导致读到的 scroll 恒为 0，因此优先用写入记录。
  const scrolls: ScrollState[] = Array.isArray(ppu.scrollWrites)
    ? ppu.scrollWrites.slice()
    : [];

  let fromScrollWrite = false;
  let scrollX: number;
  let scrollY: number;
  if (scrolls.length > 0) {
    // 主视口使用最后一次写入
    const last = scrolls[scrolls.length - 1];
    scrollX = last.x;
    scrollY = last.y;
    fromScrollWrite = true;
  } else if (typeof ppu.lastScrollWriteX === 'number' && typeof ppu.lastScrollWriteY === 'number') {
    scrollX = ppu.lastScrollWriteX;
    scrollY = ppu.lastScrollWriteY;
    fromScrollWrite = true;
  } else {
    // fallback: 用 regHT/regVT + fine X/Y，再补上起始 nametable 偏移 (regH/regV)
    scrollX = (ppu.regH ? 256 : 0) + (((ppu.regHT & 0x1f) << 3) | (ppu.regFH & 7));
    scrollY = (ppu.regV ? 240 : 0) + (((ppu.regVT & 0x1f) << 3) | (ppu.regFV & 7));
  }
  const rawScrollX = scrollX;
  const rawScrollY = scrollY;

  // 画滚动线 (FCEUX 用虚线标记)
  const drawScrollLine = (frame: NameTableFrame, sx: number, sy: number) => {
    // 水平线
    if (sy < 240) {
      for (let x = 0; x < 256; x++) {
        if ((x & 3) === 0) frame.data[sy * 256 + x] = SCROLL_LINE_COLOR;
      }
    }
    // 竖直线
    if (sx < 256) {
      for (let y = 0; y < 240; y++) {
        if ((y & 3) === 0) frame.data[y * 256 + sx] = SCROLL_LINE_COLOR;
      }
    }
  };

  const ntFrames: [NameTableFrame, NameTableFrame, NameTableFrame, NameTableFrame] = [
    renderNameTable(nes, 0, scrollX, scrollY),
    renderNameTable(nes, 1, scrollX, scrollY),
    renderNameTable(nes, 2, scrollX, scrollY),
    renderNameTable(nes, 3, scrollX, scrollY),
  ];

  // 在正确的 nametable 上画滚动指示线（对每一组 $2005 写入都画）
  const map0 = ppu.ntable1[0]; // 逻辑 NT 0 → 物理 NT
  const map1 = ppu.ntable1[1]; // 逻辑 NT 1 (scrollX>=256 时可见)

  const draws = scrolls.length > 0 ? scrolls : [{ x: scrollX, y: scrollY, scanline: -1 }];
  for (const s of draws) {
    drawScrollLine(ntFrames[map0], s.x & 255, s.y & 239);
    if ((s.x & 256) !== 0) {
      // 水平滚动跨过了第一屏
      drawScrollLine(ntFrames[map1], (s.x + 256) & 255, s.y & 239);
    }
  }

  return {
    nt: ntFrames,
    mapping: [ppu.ntable1[0], ppu.ntable1[1], ppu.ntable1[2], ppu.ntable1[3]],
    scrollX,
    scrollY,
    rawScrollX,
    rawScrollY,
    fromScrollWrite,
    scrolls,
  };
}
