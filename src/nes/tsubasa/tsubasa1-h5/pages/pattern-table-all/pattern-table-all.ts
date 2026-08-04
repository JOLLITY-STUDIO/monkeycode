/**
 * Pattern Table All 页面
 *
 * NES 风格图案表查看器:
 * - 左 Pattern Table: $0000 (CHR Bank 低4KB = tiles 0-255)
 * - 右 Pattern Table: $1000 (CHR Bank 高4KB = tiles 256-511)
 * - 由于 MMC1 每个 sub-bank = 4KB, 左右各对应一个 bank
 */
import { getGlobalTileStore, renderBankToImageData, getChrBankInfos, nesColorToRgba, putImageDataToCanvas } from '../../src/debug/DebugRenderer';

declare const wx: any;

const PALETTE_PRESETS: number[][] = [
  [0x0F, 0x00, 0x10, 0x20],
  [0x0F, 0x06, 0x16, 0x26],
  [0x0F, 0x0A, 0x1A, 0x2A],
  [0x0F, 0x02, 0x12, 0x22],
  [0x0F, 0x07, 0x17, 0x27],
  [0x0F, 0x01, 0x11, 0x21],
  [0x0F, 0x08, 0x18, 0x28],
  [0x0F, 0x04, 0x14, 0x24],
];

const PT_SCALE = 2; // Pattern table 放大倍数
const TILES_PER_ROW = 16;
const TILE_PX = 8;
const PT_SIZE = TILES_PER_ROW * TILE_PX * PT_SCALE; // 256

Page({
  data: {
    ptSize: PT_SIZE,
    currentBank: 0,
    currentBankHex: '0',
    currentPalette: 0,
    bankInfos: [] as Array<{ index: number; hexLabel: string; nonEmptyTiles: number; checksum: number }>,
    palettePresets: [] as string[][],
  },

  _tileStore: null as any,

  onLoad() {
    const tileStore = getGlobalTileStore();
    this._tileStore = tileStore;

    const rawInfos = getChrBankInfos(tileStore);
    // 预计算 hexLabel（WXML 不支持 .toString()）
    const bankInfos = rawInfos.map((info: any) => ({
      ...info,
      hexLabel: info.index.toString(16).toUpperCase(),
    }));
    this.setData({
      bankInfos,
      currentBankHex: this.data.currentBank.toString(16).toUpperCase(),
    });

    const palettePresets = PALETTE_PRESETS.map(pal =>
      pal.map(idx => {
        const [r, g, b] = nesColorToRgba(idx);
        return `rgb(${r},${g},${b})`;
      })
    );
    this.setData({ palettePresets });
  },

  onReady() {
    setTimeout(() => this.renderPatternTables(), 300);
  },

  renderPatternTables() {
    const bankIdx = this.data.currentBank;
    const palette = PALETTE_PRESETS[this.data.currentPalette];

    // 左表: 当前 bank (低4KB)
    this.renderToCanvas('pt-left-canvas', bankIdx, palette);
    // 右表: 下一个 bank (高4KB, 或同一bank重复)
    this.renderToCanvas('pt-right-canvas', bankIdx + 1, palette);
  },

  renderToCanvas(canvasId: string, bankIdx: number, palette: number[]) {
    const query = wx.createSelectorQuery();
    query.select(`#${canvasId}`)
      .fields({ node: true, size: true })
      .exec((res: any) => {
        if (!res || !res[0] || !res[0].node) {
          console.warn(`[PT] Canvas ${canvasId} not found`);
          return;
        }

        const canvas = res[0].node;
        canvas.width = PT_SIZE;
        canvas.height = PT_SIZE;
        const ctx = canvas.getContext('2d');

        if (!ctx) return;

        const actualBank = bankIdx % 32;
        const imgData = renderBankToImageData(this._tileStore, actualBank, palette, PT_SCALE);
        putImageDataToCanvas(ctx, imgData, 0, 0);
      });
  },

  /** 切换 Bank 并同步 hex 字符串 */
  _setBank(newBank: number) {
    this.setData({
      currentBank: newBank,
      currentBankHex: newBank.toString(16).toUpperCase(),
    });
    setTimeout(() => this.renderPatternTables(), 50);
  },

  onPrevBank() {
    this._setBank((this.data.currentBank - 1 + 32) % 32);
  },

  onNextBank() {
    this._setBank((this.data.currentBank + 1) % 32);
  },

  onBankJump(e: any) {
    this._setBank(e.currentTarget.dataset.index);
  },

  onPaletteSelect(e: any) {
    const idx = e.currentTarget.dataset.index;
    this.setData({ currentPalette: idx });
    setTimeout(() => this.renderPatternTables(), 50);
  },
});
