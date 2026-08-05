/**
 * Pattern Table 数据库查看器
 * 
 * 同时展示两个 CHR Bank 作为 Pattern Table 0 和 1
 * 模拟 NES PPU 同时可访问两个 4KB Pattern Table 的视角
 * 
 * 数据来源: ROM CHR Banks (32个选择)，通过 MMC1切换
 */
import { RomDatabase } from '../../../src/data/RomDatabase';
import { initChrBanks, CHR_BANKS } from '../../../src/assets/chr/chr_data';
import { NES_PALETTE, TILE_SIZE } from '../../../src/core/types';

const TILES_PER_ROW = 16;
const SCALE = 3;
const CANVAS_SIZE = TILES_PER_ROW * TILE_SIZE * SCALE; // 384

Page({
  data: {
    chrBank0: 0,
    chrBank1: 1,
    dbStatus: '未初始化',
    bank0Desc: '',
    bank1Desc: '',
  },

  onLoad() {
    // @ts-ignore
    this._chrData = null;
    // @ts-ignore
    this._ctx0 = null;
    // @ts-ignore
    this._ctx1 = null;
    this._initDatabase();
  },

  onReady() {
    this._initCanvases();
  },

  _initDatabase() {
    try {
      const db = RomDatabase.getInstance();
      db.init();
      initChrBanks();
      
      // @ts-ignore
      this._chrData = CHR_BANKS;
      
      const bank0 = db.getChrBank(this.data.chrBank0);
      const bank1 = db.getChrBank(this.data.chrBank1);
      
      this.setData({
        dbStatus: '✅ ROM 数据已加载',
        bank0Desc: bank0?.description ?? '',
        bank1Desc: bank1?.description ?? '',
      });
    } catch (err) {
      console.error('[DB:PT] 初始化失败:', err);
      this.setData({ dbStatus: '⚠️ 初始化失败' });
    }
  },

  _initCanvases() {
    // PT0
    const q0 = wx.createSelectorQuery().in(this);
    q0.select('#pt0-canvas')
      .fields({ node: true, size: true })
      .exec((res: any) => {
        if (res?.[0]) {
          const canvas = res[0].node;
          canvas.width = CANVAS_SIZE;
          canvas.height = CANVAS_SIZE;
          // @ts-ignore
          this._ctx0 = canvas.getContext('2d');
          this._renderPT(this._ctx0, this.data.chrBank0);
        }
      });

    // PT1
    const q1 = wx.createSelectorQuery().in(this);
    q1.select('#pt1-canvas')
      .fields({ node: true, size: true })
      .exec((res: any) => {
        if (res?.[0]) {
          const canvas = res[0].node;
          canvas.width = CANVAS_SIZE;
          canvas.height = CANVAS_SIZE;
          // @ts-ignore
          this._ctx1 = canvas.getContext('2d');
          this._renderPT(this._ctx1, this.data.chrBank1);
        }
      });
  },

  _renderPT(ctx: CanvasRenderingContext2D, bankId: number) {
    // @ts-ignore
    const chrBank = this._chrData?.[bankId];
    if (!ctx) return;

    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    if (!chrBank || chrBank.length < 4096) {
      ctx.fillStyle = '#f00';
      ctx.font = '14px monospace';
      ctx.fillText(`CHR Bank ${bankId.toString(16).toUpperCase()} 数据不可用`, 10, 30);
      return;
    }

    // 灰度调色板
    const palette = [0xFF000000, 0xFF555555, 0xFFAAAAAA, 0xFFFFFFFF];

    for (let tileIdx = 0; tileIdx < 256; tileIdx++) {
      const gridX = tileIdx % TILES_PER_ROW;
      const gridY = Math.floor(tileIdx / TILES_PER_ROW);
      const px = gridX * TILE_SIZE * SCALE;
      const py = gridY * TILE_SIZE * SCALE;
      const base = tileIdx * 16;

      for (let row = 0; row < 8; row++) {
        const plane0 = chrBank[base + row] || 0;
        const plane1 = chrBank[base + row + 8] || 0;
        for (let col = 0; col < 8; col++) {
          const bit = 7 - col;
          const ci = ((plane1 >> bit) & 1) << 1 | ((plane0 >> bit) & 1);
          const color = palette[ci];
          ctx.fillStyle = `#${(color & 0xFFFFFF).toString(16).padStart(6, '0')}`;
          ctx.fillRect(px + col * SCALE, py + row * SCALE, SCALE, SCALE);
        }
      }
    }

    // 网格线
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 0.5;
    for (let r = 0; r <= TILES_PER_ROW; r++) {
      ctx.beginPath();
      ctx.moveTo(0, r * TILE_SIZE * SCALE);
      ctx.lineTo(CANVAS_SIZE, r * TILE_SIZE * SCALE);
      ctx.stroke();
    }
    for (let c = 0; c <= TILES_PER_ROW; c++) {
      ctx.beginPath();
      ctx.moveTo(c * TILE_SIZE * SCALE, 0);
      ctx.lineTo(c * TILE_SIZE * SCALE, CANVAS_SIZE);
      ctx.stroke();
    }
  },

  onPrevChr0() { this._changeChr0((this.data.chrBank0 + 31) % 32); },
  onNextChr0() { this._changeChr0((this.data.chrBank0 + 1) % 32); },
  onPrevChr1() { this._changeChr1((this.data.chrBank1 + 31) % 32); },
  onNextChr1() { this._changeChr1((this.data.chrBank1 + 1) % 32); },

  _changeChr0(id: number) {
    const db = RomDatabase.getInstance();
    const bank = db.getChrBank(id);
    this.setData({ chrBank0: id, bank0Desc: bank?.description ?? '' });
    // @ts-ignore
    this._renderPT(this._ctx0, id);
  },
  _changeChr1(id: number) {
    const db = RomDatabase.getInstance();
    const bank = db.getChrBank(id);
    this.setData({ chrBank1: id, bank1Desc: bank?.description ?? '' });
    // @ts-ignore
    this._renderPT(this._ctx1, id);
  },
});
