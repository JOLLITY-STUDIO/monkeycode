/**
 * Nametable All 页面
 *
 * 显示 NES 名称表结构:
 * - 4 个名称表 (NT0-NT3, 各 32×30 tiles)
 * - 4 个属性表 (AT0-AT3, 各 8×8 blocks = 64 字节)
 * - 调色板 (32 字节, $3F00-$3F1F)
 *
 * 静态数据展示: 名称表填充为 tile 索引 0x00-0xFF 以展示结构。
 * 游戏运行时的实际名称表数据需通过 Renderer 接口获取。
 */
import { getGlobalTileStore, drawTile, nesColorToRgba } from '../../src/debug/DebugRenderer';

declare const wx: any;

/** 默认调色板（NES 初始化后） */
const DEFAULT_PALETTE: number[] = [
  0x0F, 0x00, 0x10, 0x20,  // BG 0
  0x0F, 0x06, 0x16, 0x26,  // BG 1
  0x0F, 0x0A, 0x1A, 0x2A,  // BG 2
  0x0F, 0x02, 0x12, 0x22,  // BG 3
  0x0F, 0x07, 0x17, 0x27,  // Sprite 0
  0x0F, 0x01, 0x11, 0x21,  // Sprite 1
  0x0F, 0x08, 0x18, 0x28,  // Sprite 2
  0x0F, 0x04, 0x14, 0x24,  // Sprite 3
];

const NT_TILES_W = 32;
const NT_TILES_H = 30;
const TILE_PX = 8;
const ZOOM = 1;

// 属性表: 8×8 blocks, 每个 block 覆盖 4×4 tiles
const ATTR_BLOCKS_W = 8;
const ATTR_BLOCKS_H = 8;

/** NES 名称表基地址 ($2000)，每个 NT 间隔 $400 */
const NT_BASE = 0x2000;
const NT_STRIDE = 0x400;

/** 预计算 NT Tab 数据 */
function buildNTTabs(): Array<{ nt: number; label: string }> {
  return [0, 1, 2, 3].map((nt) => ({
    nt,
    label: `NT${nt} ($` + (NT_BASE + nt * NT_STRIDE).toString(16).toUpperCase() + ')',
  }));
}

Page({
  data: {
    currentNT: 0,
    chrBank: 0,
    ntW: NT_TILES_W * TILE_PX * ZOOM,
    ntH: NT_TILES_H * TILE_PX * ZOOM,
    attrW: ATTR_BLOCKS_W * 16 * 2,
    attrH: ATTR_BLOCKS_H * 16 * 2,
    zoom: ZOOM,
    paletteGroups: [] as Array<{ name: string; colors: Array<{ index: number; hex: string; idxHex: string }> }>,
    ntDataRows: [] as Array<Array<{ val: number; hex: string }>>,
    ntTabs: buildNTTabs(),
  },

  _tileStore: null as any,

  onLoad() {
    this._tileStore = getGlobalTileStore();
    this.buildPaletteDisplay();
    this.buildNTData();
  },

  onReady() {
    setTimeout(() => {
      this.renderNametable();
      this.renderAttributeTable();
    }, 300);
  },

  /** 构建调色板显示数据（预计算 hex 字符串，WXML 不支持 .toString()） */
  buildPaletteDisplay() {
    const groups: Array<{ name: string; colors: Array<{ index: number; hex: string; idxHex: string }> }> = [];
    const groupNames = ['BG 0', 'BG 1', 'BG 2', 'BG 3', 'Spr 0', 'Spr 1', 'Spr 2', 'Spr 3'];
    for (let g = 0; g < 8; g++) {
      const colors: Array<{ index: number; hex: string; idxHex: string }> = [];
      for (let c = 0; c < 4; c++) {
        const nesIdx = DEFAULT_PALETTE[g * 4 + c];
        const [r, g2, b] = nesColorToRgba(nesIdx);
        colors.push({
          index: nesIdx,
          hex: `#${r.toString(16).padStart(2, '0')}${g2.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`,
          idxHex: nesIdx.toString(16).toUpperCase(),
        });
      }
      groups.push({ name: groupNames[g], colors });
    }
    this.setData({ paletteGroups: groups });
  },

  /** 构建名称表 tile 数据表格（预计算 hex 字符串） */
  buildNTData() {
    const rows: Array<Array<{ val: number; hex: string }>> = [];
    for (let y = 0; y < 16; y++) {
      const row: Array<{ val: number; hex: string }> = [];
      for (let x = 0; x < 32; x++) {
        const v = (y * 32 + x) & 0xFF;
        row.push({ val: v, hex: v.toString(16).toUpperCase().padStart(2, '0') });
      }
      rows.push(row);
    }
    this.setData({ ntDataRows: rows });
  },

  /** 渲染名称表到 Canvas */
  renderNametable() {
    const query = wx.createSelectorQuery();
    query.select('#nt-canvas')
      .fields({ node: true, size: true })
      .exec((res: any) => {
        if (!res || !res[0] || !res[0].node) {
          console.warn('[NT] Canvas not found');
          return;
        }

        const canvas = res[0].node;
        const w = NT_TILES_W * TILE_PX * ZOOM;
        const h = NT_TILES_H * TILE_PX * ZOOM;
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');

        if (!ctx) return;

        const chrBank = this.data.chrBank;

        for (let ty = 0; ty < NT_TILES_H; ty++) {
          for (let tx = 0; tx < NT_TILES_W; tx++) {
            const tileIdx = (ty * NT_TILES_W + tx) & 0xFF;
            // 使用 BG 0 调色板
            const palette = DEFAULT_PALETTE.slice(0, 4);

            drawTile(ctx, this._tileStore, chrBank, tileIdx,
              tx * TILE_PX * ZOOM, ty * TILE_PX * ZOOM, ZOOM, palette);
          }
        }
      });
  },

  /** 渲染属性表到 Canvas (可视化调色板分组) */
  renderAttributeTable() {
    const query = wx.createSelectorQuery();
    query.select('#attr-canvas')
      .fields({ node: true, size: true })
      .exec((res: any) => {
        if (!res || !res[0] || !res[0].node) {
          console.warn('[NT] Attr canvas not found');
          return;
        }

        const canvas = res[0].node;
        const blockPixelSize = 16 * 2; // 每个 block 显示为 16×16 像素
        const w = ATTR_BLOCKS_W * blockPixelSize;
        const h = ATTR_BLOCKS_H * blockPixelSize;
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');

        if (!ctx) return;

        // 属性表 64 字节: 每字节低2位 = 左上4×4, bit2-3 = 右上4×4, bit4-5 = 左下, bit6-7 = 右下
        const attrColors = [
          '#333', '#944', '#494', '#449',  // 调色板 0-3 的代表色
        ];

        for (let ay = 0; ay < ATTR_BLOCKS_H; ay++) {
          for (let ax = 0; ax < ATTR_BLOCKS_W; ax++) {
            const attrIdx = ay * ATTR_BLOCKS_W + ax;
            // 模拟属性字节（每 block 不同调色板以展示）
            const attrByte = ((ax + ay) & 3) | (((ax + ay + 1) & 3) << 2)
              | (((ax + ay + 2) & 3) << 4) | (((ax + ay + 3) & 3) << 6);

            // 绘制 block 背景
            ctx.fillStyle = 'rgba(255,255,255,0.02)';
            ctx.fillRect(ax * blockPixelSize, ay * blockPixelSize, blockPixelSize, blockPixelSize);
            ctx.strokeStyle = 'rgba(255,255,255,0.1)';
            ctx.strokeRect(ax * blockPixelSize, ay * blockPixelSize, blockPixelSize, blockPixelSize);

            // 四个象限
            const half = blockPixelSize / 2;
            for (let q = 0; q < 4; q++) {
              const palGroup = (attrByte >> (q * 2)) & 3;
              const qx = (q & 1) * half;
              const qy = ((q >> 1) & 1) * half;
              ctx.fillStyle = attrColors[palGroup];
              ctx.fillRect(ax * blockPixelSize + qx, ay * blockPixelSize + qy, half, half);

              // 调色板编号文字
              ctx.fillStyle = '#fff';
              ctx.font = '10px monospace';
              ctx.fillText(`${palGroup}`,
                ax * blockPixelSize + qx + 4,
                ay * blockPixelSize + qy + 12);
            }
          }
        }
      });
  },

  onNTSelect(e: any) {
    const nt = e.currentTarget.dataset.nt;
    this.setData({ currentNT: nt });
    setTimeout(() => {
      this.renderNametable();
      this.renderAttributeTable();
    }, 50);
  },

  onChrBankInput(e: any) {
    const val = parseInt(e.detail.value) || 0;
    const bank = Math.max(0, Math.min(31, val));
    this.setData({ chrBank: bank });
    setTimeout(() => this.renderNametable(), 50);
  },
});
