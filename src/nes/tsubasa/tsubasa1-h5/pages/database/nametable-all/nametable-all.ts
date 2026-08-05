/**
 * Nametable 数据库查看器
 * 
 * 展示 ROM 中提取的全部静态 Nametable 模板数据:
 *   1. 已知的Nametable模板列表 (从PRG Bank中提取)
 *   2. 可视化: 使用默认CHR Bank 0 渲染每个模板
 * 
 * 注意: 这里展示的是 ROM 静态 Nametable 数据 (模板/蓝图)，
 *       不是游戏运行时的 VRAM (nametable0-3)。
 *       VRAM 在游戏过程中会被动态修改。
 */
import { RomDatabase, NametableTemplateEntry } from '../../../src/data/RomDatabase';
import { initChrBanks, CHR_BANKS } from '../../../src/assets/chr/chr_data';
import { NES_PALETTE, NT_WIDTH, NT_HEIGHT, TILE_SIZE } from '../../../src/core/types';

const SCALE = 2;
const CANVAS_W = NT_WIDTH * TILE_SIZE * SCALE;
const CANVAS_H = NT_HEIGHT * TILE_SIZE * SCALE;

/** 默认渲染调色板 (灰度) */
const DEFAULT_PAL = [
  [0xFF000000, 0xFF555555, 0xFFAAAAAA, 0xFFFFFFFF],
  [0xFF000000, 0xFF555555, 0xFFAAAAAA, 0xFFFFFFFF],
  [0xFF000000, 0xFF555555, 0xFFAAAAAA, 0xFFFFFFFF],
  [0xFF000000, 0xFF555555, 0xFFAAAAAA, 0xFFFFFFFF],
];

Page({
  data: {
    templates: [] as NametableTemplateEntry[],
    selectedIdx: -1,
    dbStatus: '未初始化',
    canvasWidth: CANVAS_W,
    canvasHeight: CANVAS_H,
    /** 当前选中模板的 tile 网格数据 */
    tileGrid: [] as string[][],
    /** 列头和行标签 */
    colHeaders: [] as string[],
    rowLabels: [] as string[],
  },

  onLoad() {
    // @ts-ignore
    this._ctx = null;
    // @ts-ignore
    this._chrData = null;
    // @ts-ignore
    this._decodedNT = null;  // 已解码的nametable数据 (960B tiles + 64B attrs)
    
    // 构建标签
    const colHeaders: string[] = [];
    for (let c = 0; c < 32; c++) colHeaders.push(c.toString(16).toUpperCase());
    const rowLabels: string[] = [];
    for (let r = 0; r < 30; r++) rowLabels.push(r.toString(16).toUpperCase().padStart(2, '0'));
    this.setData({ colHeaders, rowLabels });
    
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
      
      const templates = db.getNametableTemplates();
      this.setData({
        templates,
        dbStatus: `✅ ROM 数据已加载 (${templates.filter(t => t.loaded).length}/${templates.length} 已解码)`,
      });
      
      console.log(`[DB:NT] 加载了 ${templates.length} 个 Nametable 模板`);
    } catch (err) {
      console.error('[DB:NT] 初始化失败:', err);
      this.setData({ dbStatus: '⚠️ 初始化失败' });
    }
  },

  _initCanvas() {
    const query = wx.createSelectorQuery().in(this);
    query.select('#nt-db-canvas')
      .fields({ node: true, size: true })
      .exec((res: any) => {
        if (!res || !res[0]) {
          console.warn('[DB:NT] Canvas 未找到');
          return;
        }
        const canvas = res[0].node;
        canvas.width = CANVAS_W;
        canvas.height = CANVAS_H;
        // @ts-ignore
        this._ctx = canvas.getContext('2d');
        
        if (this.data.selectedIdx >= 0) {
          this._renderTemplate(this.data.selectedIdx);
        }
      });
  },

  /** 选择模板 */
  onSelectTemplate(e: any) {
    const idx = parseInt(e.currentTarget.dataset.index);
    this.setData({ selectedIdx: idx });
    this._buildTileGrid(idx);
    
    // @ts-ignore
    wx.nextTick(() => {
      this._renderTemplate(idx);
    });
  },

  /** 构建tile网格数据 (十六进制) */
  _buildTileGrid(idx: number) {
    const template = this.data.templates[idx];
    if (!template) return;

    let tileData: Uint8Array | null = null;

    if (template.loaded && template.data) {
      tileData = template.data;
    } else {
      // 未加载: 生成占位网格
      tileData = new Uint8Array(960);
      for (let i = 0; i < 960; i++) {
        tileData[i] = (idx * 31 + i) & 0xFF;
      }
    }

    const grid: string[][] = [];
    for (let row = 0; row < NT_HEIGHT; row++) {
      const rowData: string[] = [];
      for (let col = 0; col < NT_WIDTH; col++) {
        const off = row * NT_WIDTH + col;
        rowData.push(tileData[off].toString(16).toUpperCase().padStart(2, '0'));
      }
      grid.push(rowData);
    }
    
    // @ts-ignore
    this._decodedNT = tileData;
    this.setData({ tileGrid: grid });
  },

  /** 渲染模板到 Canvas */
  _renderTemplate(idx: number) {
    // @ts-ignore
    const ctx = this._ctx;
    if (!ctx) return;
    // @ts-ignore
    const chrData = this._chrData;
    // @ts-ignore
    const nt = this._decodedNT;
    
    // 清屏
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    if (!nt || nt.length < 960) {
      ctx.fillStyle = '#f00';
      ctx.font = '14px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('模板数据未解码', CANVAS_W / 2, CANVAS_H / 2);
      return;
    }

    const chrBank = chrData?.[0] ?? null;

    for (let row = 0; row < NT_HEIGHT; row++) {
      for (let col = 0; col < NT_WIDTH; col++) {
        const tileIdx = row * NT_WIDTH + col;
        const tileId = nt[tileIdx];

        // Attribute (简化: 全部使用 palGroup 0)
        const px = col * TILE_SIZE * SCALE;
        const py = row * TILE_SIZE * SCALE;

        if (chrBank && chrBank.length >= 4096) {
          this._drawTile(ctx, chrBank, tileId, DEFAULT_PAL[0], px, py, SCALE);
        } else {
          ctx.fillStyle = '#333';
          ctx.fillRect(px, py, TILE_SIZE * SCALE, TILE_SIZE * SCALE);
          ctx.fillStyle = '#888';
          ctx.font = `${6 * SCALE}px monospace`;
          ctx.textAlign = 'center';
          ctx.fillText(
            tileId.toString(16).toUpperCase(),
            px + (TILE_SIZE * SCALE) / 2,
            py + (TILE_SIZE * SCALE) / 2 + 2
          );
        }
      }
    }

    // 网格线
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.lineWidth = 0.5;
    for (let r = 0; r <= NT_HEIGHT; r++) {
      ctx.beginPath();
      ctx.moveTo(0, r * TILE_SIZE * SCALE);
      ctx.lineTo(CANVAS_W, r * TILE_SIZE * SCALE);
      ctx.stroke();
    }
    for (let c = 0; c <= NT_WIDTH; c++) {
      ctx.beginPath();
      ctx.moveTo(c * TILE_SIZE * SCALE, 0);
      ctx.lineTo(c * TILE_SIZE * SCALE, CANVAS_H);
      ctx.stroke();
    }
  },

  _drawTile(
    ctx: CanvasRenderingContext2D,
    chrData: Uint8Array,
    tileId: number,
    palette: number[],
    px: number, py: number,
    scale: number
  ) {
    const base = (tileId & 0xFF) * 16;
    for (let row = 0; row < 8; row++) {
      const plane0 = chrData[base + row] || 0;
      const plane1 = chrData[base + row + 8] || 0;
      for (let col = 0; col < 8; col++) {
        const bit = 7 - col;
        const ci = ((plane1 >> bit) & 1) << 1 | ((plane0 >> bit) & 1);
        const color = palette[ci] || 0xFF000000;
        ctx.fillStyle = `#${(color & 0xFFFFFF).toString(16).padStart(6, '0')}`;
        ctx.fillRect(px + col * scale, py + row * scale, scale, scale);
      }
    }
  },
});
