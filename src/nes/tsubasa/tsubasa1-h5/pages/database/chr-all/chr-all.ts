/**
 * CHR 图库数据库查看器
 * 
 * 展示所有 32 个 CHR Bank (各4096字节=256 tiles) 的完整 tile 图形
 * 支持灰度显示 (查看 tile 形状) 和调色板着色
 * 
 * 数据来源: ROM CHR 区域 ($00000-$1FFFF), 已转换为 PNG + Uint8Array
 */
import { RomDatabase, ChrBankEntry } from '../../../src/data/RomDatabase';
import { initChrBanks, CHR_BANKS } from '../../../src/assets/chr/chr_data';
import { NES_PALETTE } from '../../../src/core/types';

const TILE_SIZE = 8;
const TILES_PER_ROW = 16;
const GRID_COLS = TILES_PER_ROW;
const GRID_ROWS = 16;  // 256 tiles / 16 = 16 rows

Page({
  data: {
    banks: [] as ChrBankEntry[],
    selectedBank: 0,
    canvasWidth: GRID_COLS * TILE_SIZE * 2,
    canvasHeight: GRID_ROWS * TILE_SIZE * 2,
    dbStatus: '未初始化',
  },

  onLoad() {
    console.log('[DB:CHR] CHR图库数据库查看器加载');
    // @ts-ignore
    this._canvas = null;
    // @ts-ignore
    this._ctx = null;
    // @ts-ignore
    this._chrData = null;
    // @ts-ignore
    this._initDone = false;
    this._initDatabase();
  },

  onReady() {
    this._initCanvas();
  },

  onShow() {
    this._initDatabase();
  },

  _initDatabase() {
    try {
      const db = RomDatabase.getInstance();
      db.init();
      initChrBanks();
      
      // @ts-ignore
      this._chrData = CHR_BANKS;
      
      const banks = db.getChrBanks();
      this.setData({
        banks,
        dbStatus: `✅ ROM 数据已加载 (${banks.filter(b => b.loaded).length}/${banks.length} Banks)`,
      });
      console.log(`[DB:CHR] 已加载 ${banks.length} 个 CHR Bank`);
    } catch (err) {
      console.error('[DB:CHR] 初始化失败:', err);
      this.setData({ dbStatus: '⚠️ 初始化失败' });
    }
  },

  _initCanvas() {
    const query = wx.createSelectorQuery().in(this);
    query.select('#chr-canvas')
      .fields({ node: true, size: true })
      .exec((res: any) => {
        if (!res || !res[0]) {
          console.error('[DB:CHR] Canvas节点未找到');
          return;
        }
        const canvas = res[0].node;
        canvas.width = GRID_COLS * TILE_SIZE * 2;
        canvas.height = GRID_ROWS * TILE_SIZE * 2;
        // @ts-ignore
        this._canvas = canvas;
        // @ts-ignore
        this._ctx = canvas.getContext('2d');
        // @ts-ignore
        this._initDone = true;
        this._renderBank(0);
      });
  },

  /** Bank选择变更 */
  onBankSelect(e: any) {
    const bankId = parseInt(e.detail.value);
    this.setData({ selectedBank: bankId });
    // @ts-ignore
    if (this._initDone) {
      this._renderBank(bankId);
    }
  },

  /** 渲染指定Bank的所有tile */
  _renderBank(bankId: number) {
    // @ts-ignore
    const ctx = this._ctx;
    // @ts-ignore
    if (!ctx || !this._chrData) return;
    
    // @ts-ignore
    const chrData = this._chrData[bankId];
    
    // 清屏
    ctx.fillStyle = '#222';
    ctx.fillRect(0, 0, GRID_COLS * TILE_SIZE * 2, GRID_ROWS * TILE_SIZE * 2);
    
    if (!chrData || chrData.length < 4096) {
      ctx.fillStyle = '#f00';
      ctx.font = '14px monospace';
      ctx.fillText(`Bank ${bankId.toString(16).toUpperCase()} 数据不可用`, 10, 30);
      return;
    }
    
    // 灰度调色板
    const palette = [0xFF000000, 0xFF555555, 0xFFAAAAAA, 0xFFFFFFFF];
    
    const scale = 2;
    const tileSize = TILE_SIZE * scale;
    
    for (let tileIdx = 0; tileIdx < 256; tileIdx++) {
      const gridX = tileIdx % GRID_COLS;
      const gridY = Math.floor(tileIdx / GRID_COLS);
      const px = gridX * tileSize;
      const py = gridY * tileSize;
      
      const baseAddr = tileIdx * 16;
      
      for (let row = 0; row < 8; row++) {
        const plane0 = chrData[baseAddr + row] || 0;
        const plane1 = chrData[baseAddr + row + 8] || 0;
        
        for (let col = 0; col < 8; col++) {
          const bit = 7 - col;
          const colorIdx = ((plane1 >> bit) & 1) << 1 | ((plane0 >> bit) & 1);
          const color = palette[colorIdx];
          
          ctx.fillStyle = `#${(color & 0xFFFFFF).toString(16).padStart(6, '0')}`;
          ctx.fillRect(px + col * scale, py + row * scale, scale, scale);
        }
      }
    }
    
    // 网格线
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 0.5;
    for (let r = 0; r <= GRID_ROWS; r++) {
      ctx.beginPath();
      ctx.moveTo(0, r * tileSize);
      ctx.lineTo(GRID_COLS * tileSize, r * tileSize);
      ctx.stroke();
    }
    for (let c = 0; c <= GRID_COLS; c++) {
      ctx.beginPath();
      ctx.moveTo(c * tileSize, 0);
      ctx.lineTo(c * tileSize, GRID_ROWS * tileSize);
      ctx.stroke();
    }
    
    // 描画 Bank 描述文本
    const bankInfo = this.data.banks[bankId];
    if (bankInfo) {
      ctx.fillStyle = '#0f0';
      ctx.font = '10px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`Bank ${bankId.toString(16).toUpperCase()}: ${bankInfo.description}`, 4, GRID_ROWS * tileSize - 6);
    }
    
    console.log(`[DB:CHR] 已渲染 Bank ${bankId.toString(16).toUpperCase()} (256 tiles)`);
  },
});
