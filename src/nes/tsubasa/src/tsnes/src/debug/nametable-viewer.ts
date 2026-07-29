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

export interface NameTableAllFrames {
  /** 4 个 nametable (0=0x2000, 1=0x2400, 2=0x2800, 3=0x2C00) */
  nt: [NameTableFrame, NameTableFrame, NameTableFrame, NameTableFrame];
  /** 逻辑地址到物理 nametable 的映射 (ntable1) */
  mapping: [number, number, number, number];
  /** 当前滚动位置 */
  scrollX: number;
  scrollY: number;
}

/** 滚动指示线颜色 (FCEUX 风格: 青绿色虚线) */
const SCROLL_LINE_COLOR = 0xff_00ff_ff;

/**
 * 渲染单个 NameTable
 * 参照 FCEUX NameTableViewer::calcPixelLocations() + 绘制逻辑
 *
 * FCEUX 思路:
 * - 遍历 32×30 tiles
 * - 对每个 tile: 读取 tile index → 从 pattern table 获取像素 → 用 attribute table 上色
 * - 像素 0 = 透明 (用背景色)
 */
export function renderNameTable(
  nes: NES,
  ntIndex: number,
): NameTableFrame {
  const ppu = nes.ppu;
  const nt = ppu.nameTable[ntIndex];
  const w = 32, h = 30;
  const buf = new Uint32Array(256 * 240);

  // 图案表选择 (参照 FCEUX — 检查 regi2000 的 BG 图案表位)
  const bgTableBase = ppu.f_bgPatternTable ? 256 : 0;
  const backdropColor = ppu.imgPalette[0];
  const pal = ppu.imgPalette;

  for (let ty = 0; ty < h; ty++) {
    for (let tx = 0; tx < w; tx++) {
      const tileIdx = nt.tile[ty * w + tx];
      const attrVal = nt.attrib[ty * w + tx]; // 0/4/8/12: 调色板象限偏移

      // 图案表 tile (考虑 BG pattern table 选择)
      const ptTile = ppu.ptTile[bgTableBase + tileIdx] ?? ppu.ptTile[tileIdx];

      // 基准像素坐标
      const baseX = tx * 8;
      const baseY = ty * 8;

      if (ptTile && ptTile.pix) {
        const pix = ptTile.pix;
        for (let py = 0; py < 8; py++) {
          for (let px = 0; px < 8; px++) {
            const colIdx = pix[py * 8 + px];
            if (colIdx === 0) {
              // 透明像素 — 背景色 (FCEUX 也是用 backdrop)
              buf[(baseY + py) * 256 + (baseX + px)] = backdropColor;
            } else {
              // attrVal 本身就是调色板位置偏移 (0/4/8/12)
              buf[(baseY + py) * 256 + (baseX + px)] = pal[colIdx + attrVal] ?? backdropColor;
            }
          }
        }
      } else {
        // 没有 tile 数据 — 填充背景色
        for (let py = 0; py < 8; py++) {
          for (let px = 0; px < 8; px++) {
            buf[(baseY + py) * 256 + (baseX + px)] = backdropColor;
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

  // 滚动位置 (参照 FCEUX: 从 cntV/cntH 计算)
  const scrollX = ((ppu.cntH & 0x1f) << 3) | (ppu.regFH & 7);
  const scrollY = ((ppu.cntV & 0x1f) << 3) | (ppu.regFV & 7);

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
    renderNameTable(nes, 0),
    renderNameTable(nes, 1),
    renderNameTable(nes, 2),
    renderNameTable(nes, 3),
  ];

  // 在正确的 nametable 上画滚动指示线
  // 参照 FCEUX: 滚动 X/Y 决定当前可见的 nametable
  const map0 = ppu.ntable1[0]; // 逻辑 NT 0 → 物理 NT
  const map1 = ppu.ntable1[1]; // 逻辑 NT 1 (scrollX>=256 时可见)

  drawScrollLine(ntFrames[map0], scrollX & 255, scrollY & 239);
  if ((scrollX & 256) !== 0) {
    // 水平滚动跨过了第一屏
    drawScrollLine(ntFrames[map1], (scrollX + 256) & 255, scrollY & 239);
  }

  return {
    nt: ntFrames,
    mapping: [ppu.ntable1[0], ppu.ntable1[1], ppu.ntable1[2], ppu.ntable1[3]],
    scrollX,
    scrollY,
  };
}
