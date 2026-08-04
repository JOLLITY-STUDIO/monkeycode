/**
 * CHR All 页面 - 显示全部 32 个 CHR Bank 的 tile 图形数据
 *
 * 每个 Bank 包含 256 个 8×8 tile, 以 16×16 网格显示
 * 支持调色板切换和单个 Bank 放大查看
 */

import { getGlobalTileStore, renderBankToImageData, getChrBankInfos, nesColorToRgba, putImageDataToCanvas } from '../../src/debug/DebugRenderer';

declare const wx: any;

/** 调色板预设: 4色调色板 (NES索引) */
const PALETTE_PRESETS: number[][] = [
  [0x0F, 0x00, 0x10, 0x20], // 默认: 黑-灰-白
  [0x0F, 0x06, 0x16, 0x26], // 红系
  [0x0F, 0x0A, 0x1A, 0x2A], // 绿系
  [0x0F, 0x02, 0x12, 0x22], // 蓝系
  [0x0F, 0x07, 0x17, 0x27], // 橙系
  [0x0F, 0x01, 0x11, 0x21], // 深蓝系
  [0x0F, 0x08, 0x18, 0x28], // 黄系
  [0x0F, 0x04, 0x14, 0x24], // 紫系
];

/** Bank 缩略图尺寸（放大倍数） */
const THUMB_SCALE = 1;
const TILES_PER_ROW = 16;
const TILE_PX = 8;
const BANK_PX = TILES_PER_ROW * TILE_PX * THUMB_SCALE; // 128

Page({
  data: {
    bankCount: 32,
    bankCanvasSize: BANK_PX,
    bankInfos: [] as Array<{ index: number; hexLabel: string; nonEmptyTiles: number; checksum: number }>,
    palettePresets: [] as string[][],
    currentPalette: 0,
    currentBank: -1,
  },

  /** 渲染回调计数 */
  _renderCount: 0,
  /** 是否已完成全部渲染 */
  _allRendered: false,

  onLoad() {
    const tileStore = getGlobalTileStore();

    // 获取 bank 信息（预计算 hexLabel，WXML 不支持 .toString()）
    const rawInfos = getChrBankInfos(tileStore);
    const bankInfos = rawInfos.map((info: any) => ({
      ...info,
      hexLabel: info.index.toString(16).toUpperCase(),
    }));
    this.setData({ bankInfos });

    // 调色板预设颜色
    const palettePresets = PALETTE_PRESETS.map(pal =>
      pal.map(idx => {
        const [r, g, b] = nesColorToRgba(idx);
        return `rgb(${r},${g},${b})`;
      })
    );
    this.setData({ palettePresets });

    console.log('[CHR-All] Page loaded, banks:', bankInfos.length);
  },

  onReady() {
    // 延迟渲染，等待 canvas 节点就绪
    setTimeout(() => this.renderAllBanks(), 300);
  },

  /** 渲染所有 Bank 的缩略图 */
  async renderAllBanks() {
    const tileStore = getGlobalTileStore();
    const palette = PALETTE_PRESETS[this.data.currentPalette];

    for (let bi = 0; bi < 32; bi++) {
      await this.renderBankCanvas(bi, tileStore, palette);
    }
  },

  /** 渲染单个 Bank 到 canvas */
  renderBankCanvas(bankIdx: number, tileStore: any, palette: number[]): Promise<void> {
    return new Promise((resolve) => {
      const query = wx.createSelectorQuery();
      query.select(`#bank-canvas-${bankIdx}`)
        .fields({ node: true, size: true })
        .exec((res: any) => {
          if (!res || !res[0] || !res[0].node) {
            console.warn(`[CHR-All] Canvas bank-canvas-${bankIdx} not found`);
            resolve();
            return;
          }

          const canvas = res[0].node;
          canvas.width = BANK_PX;
          canvas.height = BANK_PX;
          const ctx = canvas.getContext('2d');

          if (!ctx) {
            resolve();
            return;
          }

          // 生成 ImageData
          const imgData = renderBankToImageData(tileStore, bankIdx, palette, THUMB_SCALE);
          putImageDataToCanvas(ctx, imgData, 0, 0);

          this._renderCount++;
          if (this._renderCount >= 32 && !this._allRendered) {
            this._allRendered = true;
            console.log('[CHR-All] All 32 banks rendered');
          }

          resolve();
        });
    });
  },

  /** 选择调色板 */
  onPaletteSelect(e: any) {
    const idx = e.currentTarget.dataset.index;
    this.setData({ currentPalette: idx });
    this._renderCount = 0;
    setTimeout(() => this.renderAllBanks(), 100);
  },

  /** 选择 Bank（可扩展：点击后在弹窗中放大显示） */
  onBankSelect(e: any) {
    const idx = e.currentTarget.dataset.index;
    this.setData({ currentBank: idx });
    console.log(`[CHR-All] Selected bank ${idx.toString(16).toUpperCase()}`);
  },
});
