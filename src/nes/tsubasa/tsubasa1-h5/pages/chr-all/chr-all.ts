/**
 * CHR All 页面 - YY-CHR 风格调色板
 *
 * 界面（自上而下）：
 *   1. 顶部信息栏
 *   2. 32 Bank 缩略图列表（每行 1 张卡，canvas 撑满，文字在下）
 *   3. 底部固定 dock：
 *      - PAL_SET: 4 个预设调色板（点击切换；点击 cell 进入编辑模式）
 *      - PAL: 64 色 NES 调色板（编辑模式下点击修改当前 cell）
 */

import { getGlobalTileStore, getChrBankInfos, nesColorToRgba } from '../../src/debug/DebugRenderer';
import { NES_PALETTE } from '../../src/core/types';

declare const wx: any;

/** 4 组预设调色板 (NES 索引)，可编辑 */
const INITIAL_PRESETS: number[][] = [
  [0x0F, 0x00, 0x10, 0x20], // PAL0: 黑-灰-白（默认）
  [0x0F, 0x06, 0x16, 0x26], // PAL1: 红系
  [0x0F, 0x0A, 0x1A, 0x2A], // PAL2: 绿系
  [0x0F, 0x02, 0x12, 0x22], // PAL3: 蓝系
];

/** 缩略图尺寸（每 tile = 16px，bank 256×256） */
const THUMB_SCALE = 2;
const TILES_PER_ROW = 16;
const TILE_PX = 8;
const BANK_PX = TILES_PER_ROW * TILE_PX * THUMB_SCALE; // 256

/** NES idx → CSS rgb() 字符串 */
function nesIdxToCss(idx: number): string {
  const [r, g, b] = nesColorToRgba(idx & 0x3F);
  return `rgb(${r},${g},${b})`;
}

interface PresetColor {
  slot: number;
  nesIdx: number;
  rgb: string;
}

interface BankInfo {
  index: number;
  hexLabel: string;
  nonEmptyTiles: number;
  checksum: number;
  checksumHex: string;
}

Page({
  data: {
    bankCount: 32,
    bankInfos: [] as BankInfo[],

    /** 4 个预设，每个 4 色 */
    presetList: [] as PresetColor[][],

    /** 当前激活预设 (0..3) */
    currentPreset: 0,

    /** 编辑模式: { preset, slot } | null (null=未在编辑) */
    editing: null as { preset: number; slot: number } | null,

    /** 最后选中的 NES 色 idx  (-1=无) */
    selectedNesIdx: -1,

    /** 64 个 NES 色 */
    nesColors: [] as string[],
  },

  /** 渲染回调计数 */
  _renderCount: 0,

  onLoad() {
    const tileStore = getGlobalTileStore();

    // bank 信息
    const rawInfos = getChrBankInfos(tileStore);
    const bankInfos: BankInfo[] = rawInfos.map((info: any) => ({
      ...info,
      hexLabel: info.index.toString(16).toUpperCase().padStart(2, '0'),
      checksumHex: (info.checksum >>> 0).toString(16).toUpperCase().padStart(8, '0'),
    }));

    // 预设调色板
    const presetList: PresetColor[][] = INITIAL_PRESETS.map(pal =>
      pal.map((nesIdx, slot) => ({ slot, nesIdx, rgb: nesIdxToCss(nesIdx) }))
    );

    // 64 NES 色
    const nesColors: string[] = [];
    for (let i = 0; i < 64; i++) nesColors.push(nesIdxToCss(i));

    this.setData({ bankInfos, presetList, nesColors });
    console.log('[CHR-All] Page loaded, banks:', bankInfos.length);
  },

  onReady() {
    setTimeout(() => this.renderAllBanks(), 600);
  },

  onShow() {
    if (this._renderCount > 0) {
      this._renderCount = 0;
      setTimeout(() => this.renderAllBanks(), 100);
    }
  },

  /** 渲染所有 Bank 缩略图 */
  async renderAllBanks() {
    const tileStore = getGlobalTileStore();
    const palette = this.getActivePalette();

    const self = this;
    const query = wx.createSelectorQuery().in(self);
    query.selectAll('.bank-canvas')
      .fields({ node: true, size: true, dataset: true })
      .exec((res: any) => {
        if (!res || !res[0]) {
          console.warn('[CHR-All] No canvases found');
          return;
        }
        const nodes: any[] = res[0];
        console.log(`[CHR-All] Found ${nodes.length} canvas nodes, palette:`, palette);

        // 先一次性把所有 canvas 尺寸设好（避免逐个 resize 触发渲染层反复重排）
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          if (n && n.node) {
            n.node.width = BANK_PX;
            n.node.height = BANK_PX;
          }
        }

        let rendered = 0;
        const failList: number[] = [];

        const renderOne = (i: number) => {
          const nodeInfo = nodes[i];
          if (!nodeInfo || !nodeInfo.node) return;

          let bankIdx: number;
          if (nodeInfo.dataset && nodeInfo.dataset.bankIndex !== undefined) {
            bankIdx = parseInt(nodeInfo.dataset.bankIndex, 10);
          } else {
            bankIdx = i;
          }
          if (isNaN(bankIdx) || bankIdx < 0 || bankIdx >= 32) return;

          try {
            const ctx = nodeInfo.node.getContext('2d');
            if (!ctx) { failList.push(bankIdx); return; }
            this.drawBankFast(ctx, tileStore, bankIdx, palette);
            rendered++;
          } catch (err) {
            console.error(`[CHR-All] Failed to render bank ${bankIdx}:`, err);
            failList.push(bankIdx);
          }
        };

        // 每个 bank 之间 sleep 50ms，给渲染层充分的合成时间
        // 32 banks × 50ms ≈ 1.6s 全部完成，不会触发 _getData 崩溃
        const sleep = (ms: number) => new Promise<void>(res => setTimeout(res, ms));
        (async () => {
          for (let i = 0; i < nodes.length; i++) {
            renderOne(i);
            await sleep(50);
          }
          self._renderCount = rendered;
          console.log(`[CHR-All] Rendered ${rendered}/32 banks, failed: ${failList.length ? '[' + failList.join(',') + ']' : 'none'}`);
          if (failList.length > 0) {
            await sleep(100);
            self.retryFailed(failList, palette);
          }
        })();
      });
  },

  /**
   * 快速绘制：构造 ImageData + putImageData（单次 Canvas API 调用）
   *
   * 对比 fillRect: 每个 bank ~8000 调用 → 1 调用，不阻塞渲染层
   */
  drawBankFast(
    ctx: any,
    tileStore: any,
    bankIdx: number,
    palette: number[]
  ): void {
    const SCALE = THUMB_SCALE; // 2
    const W = BANK_PX;          // 256

    // 1. 预计算 palette RGBA（4 色 → 4 字节 RGBA）
    const palRGBA = new Uint8Array(16);
    for (let c = 0; c < 4; c++) {
      const nesIdx = palette[c] & 0x3F;
      const rgb = NES_PALETTE[nesIdx];
      const off = c * 4;
      palRGBA[off + 0] = (rgb >> 16) & 0xFF;
      palRGBA[off + 1] = (rgb >> 8) & 0xFF;
      palRGBA[off + 2] = rgb & 0xFF;
      palRGBA[off + 3] = 255;
    }

    // 2. 创建目标尺寸 256×256 ImageData，直接写入像素倍增
    const imgData = ctx.createImageData(W, W);
    const data = new Uint8Array(imgData.data.buffer);

    for (let ty = 0; ty < TILES_PER_ROW; ty++) {
      for (let py = 0; py < 8; py++) {
        const rowY = ty * 8 + py;
        for (let tx = 0; tx < TILES_PER_ROW; tx++) {
          const tileIdx = ty * TILES_PER_ROW + tx;
          const row = tileStore.getTileRow(bankIdx, tileIdx, py);
          // 目标列偏移：tile 内像素在 256px 输出中的起始 X
          const colBase = (tx * 8) * SCALE;
          for (let px = 0; px < 8; px++) {
            const c = row[px] & 3;
            const src = c * 4;
            const dstX = colBase + px * SCALE;
            // 像素倍增：2×2 块
            for (let dy = 0; dy < SCALE; dy++) {
              const dstRowOff = (rowY * SCALE + dy) * W * 4;
              for (let dx = 0; dx < SCALE; dx++) {
                const dst = dstRowOff + (dstX + dx) * 4;
                data[dst + 0] = palRGBA[src + 0];
                data[dst + 1] = palRGBA[src + 1];
                data[dst + 2] = palRGBA[src + 2];
                data[dst + 3] = palRGBA[src + 3];
              }
            }
          }
        }
      }
    }

    // 3. 一次性 putImageData → 仅 1 次 Canvas API 调用
    ctx.putImageData(imgData, 0, 0);
  },

  /** 重试失败的 bank */
  retryFailed(failList: number[], palette: number[]) {
    const self = this;
    const tileStore = getGlobalTileStore();
    const query = wx.createSelectorQuery().in(self);

    let retried = 0;
    let i = 0;
    const next = () => {
      if (i >= failList.length) {
        console.log(`[CHR-All] Retry done, recovered ${retried}/${failList.length}`);
        return;
      }
      const bankIdx = failList[i++];
      query.select(`#bank-canvas-${bankIdx}`)
        .fields({ node: true, size: true })
        .exec((res: any) => {
          if (res && res[0] && res[0].node) {
            const canvas = res[0].node;
            canvas.width = BANK_PX;
            canvas.height = BANK_PX;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              self.drawBankFast(ctx, tileStore, bankIdx, palette);
              retried++;
              self._renderCount++;
            }
          }
          next();
        });
    };
    next();
  },

  /** 获取当前激活预设的 4 色 NES 索引数组 */
  getActivePalette(): number[] {
    const preset = this.data.presetList[this.data.currentPreset];
    return preset ? preset.map(c => c.nesIdx) : [0x0F, 0x00, 0x10, 0x20];
  },

  // ================== 调色板交互 ==================

  /** 点击 PAL_SET 预设整行 = 切换预设 */
  onPresetSelect(e: any) {
    const preset = parseInt(e.currentTarget.dataset.preset, 10);
    if (isNaN(preset) || preset < 0 || preset >= 4) return;
    this.setData({
      currentPreset: preset,
      editing: null,
      selectedNesIdx: -1,
    });
    this._renderCount = 0;
    setTimeout(() => this.renderAllBanks(), 30);
  },

  /** 点击 PAL_SET 内的某个色块 = 进入编辑模式（选中该 slot） */
  onSlotColorTap(e: any) {
    const preset = parseInt(e.currentTarget.dataset.preset, 10);
    const slot = parseInt(e.currentTarget.dataset.slot, 10);
    if (isNaN(preset) || isNaN(slot)) return;

    // 进入编辑模式：同时把当前 preset 切到该预设
    this.setData({
      currentPreset: preset,
      editing: { preset, slot },
      selectedNesIdx: -1,
    });
    // 切预设后立刻重渲染（让用户看到颜色变化）
    this._renderCount = 0;
    setTimeout(() => this.renderAllBanks(), 30);
  },

  /** 点击 NES 64 色里的某个色 = 修改当前 editing slot 的颜色 */
  onNesColorTap(e: any) {
    const idx = parseInt(e.currentTarget.dataset.idx, 10);
    if (isNaN(idx) || idx < 0 || idx >= 64) return;

    if (!this.data.editing) {
      // 不在编辑模式，只选中颜色
      this.setData({ selectedNesIdx: idx });
      return;
    }

    // 在编辑模式：修改当前 slot 的 nesIdx，然后自动跳到下一个 slot
    const { preset, slot } = this.data.editing;
    const presetList = this.data.presetList.map(arr => arr.slice());
    presetList[preset][slot] = { slot, nesIdx: idx, rgb: nesIdxToCss(idx) };

    // 自动前进到下一个 slot（连续选色），slot3 后退出编辑
    const nextSlot = slot + 1;
    const newEditing = nextSlot < 4 ? { preset, slot: nextSlot } : null;

    this.setData({
      presetList,
      selectedNesIdx: idx,
      editing: newEditing,
    });
    this._renderCount = 0;
    setTimeout(() => this.renderAllBanks(), 30);
  },

  /** 取消编辑模式（点击空白处） */
  cancelEditing() {
    if (this.data.editing) {
      this.setData({ editing: null, selectedNesIdx: -1 });
    }
  },

  /** 选中 Bank（占位） */
  onBankSelect(e: any) {
    const idx = e.currentTarget.dataset.index;
    console.log(`[CHR-All] Selected bank ${idx.toString(16).toUpperCase()}`);
  },
});
