/**
 * Palette All 页面
 *
 * 展示 NES 完整调色板数据:
 * - 64 色 NES 主调色板 (NTSC)
 * - PPU 调色板 RAM 布局 ($3F00-$3F1F)
 * - 调色板内存映射说明
 *
 * 这是静态数据展示，颜色值来自 NES_PALETTE 数组。
 */
import { NES_PALETTE } from '../../src/core/types';

interface ColorInfo {
  index: number;
  indexHex: string;
  hex: string;
  r: number;
  g: number;
  b: number;
  row: number;
  col: number;
  emphasis: string;
}

/** PPU 调色板组定义 */
const PPU_PALETTE_GROUPS = [
  { name: 'BG 调色板 0', addr: '00', palette: [0x0F, 0x00, 0x10, 0x20] },
  { name: 'BG 调色板 1', addr: '04', palette: [0x0F, 0x06, 0x16, 0x26] },
  { name: 'BG 调色板 2', addr: '08', palette: [0x0F, 0x0A, 0x1A, 0x2A] },
  { name: 'BG 调色板 3', addr: '0C', palette: [0x0F, 0x02, 0x12, 0x22] },
  { name: 'Sprite 调色板 0', addr: '10', palette: [0x0F, 0x07, 0x17, 0x27] },
  { name: 'Sprite 调色板 1', addr: '14', palette: [0x0F, 0x01, 0x11, 0x21] },
  { name: 'Sprite 调色板 2', addr: '18', palette: [0x0F, 0x08, 0x18, 0x28] },
  { name: 'Sprite 调色板 3', addr: '1C', palette: [0x0F, 0x04, 0x14, 0x24] },
];

/** 颜色强调名称 */
function getEmphasis(row: number, col: number): string {
  if (col === 0) return '灰';
  if (col === 13) return '黑';
  if (col === 14) return '黑';
  if (col === 15) return '黑';
  if (row === 0) return '暗';
  if (row === 1) return '中';
  if (row === 2) return '亮';
  if (row === 3) return '强调';
  return '';
}

Page({
  data: {
    masterPaletteRows: [] as Array<{
      rowIdx: number;
      colors: ColorInfo[];
    }>,
    ppuPalettes: [] as Array<{
      name: string;
      addr: string;
      colors: Array<{ nesHex: string; displayHex: string }>;
    }>,
    selectedColor: null as ColorInfo | null,
  },

  onLoad() {
    this.buildMasterPalette();
    this.buildPpuPalettes();
  },

  /** 构建 NES 64 色主调色板 */
  buildMasterPalette() {
    const rows: Array<{ rowIdx: number; colors: ColorInfo[] }> = [];

    for (let row = 0; row < 4; row++) {
      const colors: ColorInfo[] = [];
      for (let col = 0; col < 16; col++) {
        const index = row * 16 + col;
        const rgb = NES_PALETTE[index];
        const r = (rgb >> 16) & 0xFF;
        const g = (rgb >> 8) & 0xFF;
        const b = rgb & 0xFF;

        // 判断文字颜色（深色背景用白字，浅色背景用黑字）
        const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

        colors.push({
          index,
          indexHex: index.toString(16).toUpperCase().padStart(2, '0'),
          hex: `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`,
          r, g, b,
          row,
          col,
          emphasis: getEmphasis(row, col),
        });
      }
      rows.push({ rowIdx: row, colors });
    }

    this.setData({ masterPaletteRows: rows });
  },

  /** 构建 PPU 调色板组 */
  buildPpuPalettes() {
    const palettes = PPU_PALETTE_GROUPS.map(group => ({
      name: group.name,
      addr: group.addr,
      colors: group.palette.map(nesIdx => {
        const rgb = NES_PALETTE[nesIdx];
        const r = (rgb >> 16) & 0xFF;
        const g = (rgb >> 8) & 0xFF;
        const b = rgb & 0xFF;
        const displayHex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
        const nesHex = nesIdx.toString(16).toUpperCase();
        // 深色背景用亮色文字
        const lum = 0.299 * r + 0.587 * g + 0.114 * b;
        return { nesHex, displayHex };
      }),
    }));

    this.setData({ ppuPalettes: palettes });
  },

  /** 点击颜色 */
  onColorTap(e: any) {
    const idx = e.currentTarget.dataset.index;
    const row = Math.floor(idx / 16);
    const col = idx % 16;
    const rgb = NES_PALETTE[idx];
    const r = (rgb >> 16) & 0xFF;
    const g = (rgb >> 8) & 0xFF;
    const b = rgb & 0xFF;

    const selectedColor: ColorInfo = {
      index: idx,
      indexHex: idx.toString(16).toUpperCase().padStart(2, '0'),
      hex: `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`,
      r, g, b,
      row, col,
      emphasis: getEmphasis(row, col),
    };

    this.setData({ selectedColor });
  },
});
