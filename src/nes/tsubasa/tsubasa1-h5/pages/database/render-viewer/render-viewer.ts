/**
 * 渲染管线数据查看器 — 可视化滚动/精灵优先级
 * 
 * 展示:
 *   1. 完整渲染输出 (256×240 缩放)
 *   2. 滚动偏移信息 (scrollX, scrollY)
 *   3. Nametable映射 (哪些NT在可见范围内)
 *   4. 精灵位置叠加 (区分前景/后景/透明)
 *   5. 像素色彩标记热力图
 */
import { initChrBanks, CHR_BANKS } from '../../../src/assets/chr/chr_data';
import { SCREEN_WIDTH, SCREEN_HEIGHT, SPRITE_COUNT } from '../../../src/core/types';

const SCALE = 2;
const CANVAS_W = SCREEN_WIDTH * SCALE;
const CANVAS_H = SCREEN_HEIGHT * SCALE;

// 精灵可视化颜色
const COLOR_FG_SPRITE = 'rgba(0, 255, 100, 0.7)';   // 前景精灵 绿色
const COLOR_BG_SPRITE = 'rgba(255, 200, 0, 0.7)';    // 后景精灵 金色
const COLOR_INACTIVE   = 'rgba(128, 128, 128, 0.3)';  // 非活跃

interface SpriteDebugInfo {
  index: number;
  x: number;
  y: number;
  tileIndex: number;
  behindBg: boolean;
  hFlip: boolean;
  vFlip: boolean;
  paletteGroup: number;
  active: boolean;
}

interface NametableOverlay {
  ntIndex: number;
  region: string;      // 描述可见区域
  topLeft: { x: number; y: number };
  bottomRight: { x: number; y: number };
}

Page({
  data: {
    viewMode: 'render' as 'render' | 'mask' | 'ntmap' | 'sprites',
    scrollX: 0,
    scrollY: 0,
    mirroring: 'HORIZONTAL',
    bgEnabled: true,
    sprEnabled: true,
    bgLeft8: false,
    sprLeft8: false,
    fps: 0,
    spriteCount: 0,
    behindBgCount: 0,
    ntRegions: [] as NametableOverlay[],
    sprites: [] as SpriteDebugInfo[],
  },

  onLoad() {
    // @ts-ignore
    this._canvas = null;
    // @ts-ignore
    this._ctx = null;
    // @ts-ignore
    this._overlayCtx = null;
    // @ts-ignore
    this._updateTimer = 0;
  },

  onReady() {
    this._initCanvas();
    this._startUpdate();
  },

  onUnload() {
    if (this._updateTimer) {
      clearInterval(this._updateTimer);
    }
  },

  _initCanvas() {
    const query = wx.createSelectorQuery().in(this);
    query.select('#render-canvas')
      .fields({ node: true, size: true })
      .exec((res: any) => {
        if (!res || !res[0]) {
          console.error('[DB:Render] Canvas未找到');
          return;
        }
        const canvas = res[0].node;
        canvas.width = CANVAS_W;
        canvas.height = CANVAS_H;
        this._canvas = canvas;
        this._ctx = canvas.getContext('2d');
        this._render();
      });

    // 叠加层Canvas (用于绘制精灵边框等)
    const q2 = wx.createSelectorQuery().in(this);
    q2.select('#overlay-canvas')
      .fields({ node: true, size: true })
      .exec((res: any) => {
        if (!res || !res[0]) return;
        const canvas = res[0].node;
        canvas.width = CANVAS_W;
        canvas.height = CANVAS_H;
        this._overlayCanvas = canvas;
        this._overlayCtx = canvas.getContext('2d');
        this._renderOverlay();
      });
  },

  _startUpdate() {
    // 每500ms更新一次数据
    this._updateTimer = setInterval(() => {
      this._updateData();
      this._render();
      this._renderOverlay();
    }, 500);
  },

  _updateData() {
    const app = getApp();
    const game = app?.globalData?.game;
    if (!game) return;

    try {
      const renderer = game._getRenderer();
      const ds = game._getDataStore();
      
      if (renderer) {
        const scroll = renderer.scrollDebug;
        this.setData({
          scrollX: scroll.scrollX,
          scrollY: scroll.scrollY,
          mirroring: ['SINGLE_LOW', 'SINGLE_HIGH', 'VERTICAL', 'HORIZONTAL', 'FOUR_SCREEN'][renderer.mirroring] ?? '?',
          fps: game.getFps(),
        });
      }
      
      if (ds) {
        const ppuMask = ds.ppuMask;
        this.setData({
          bgEnabled: (ppuMask & 0x08) !== 0,
          sprEnabled: (ppuMask & 0x10) !== 0,
          bgLeft8: (ppuMask & 0x02) !== 0,
          sprLeft8: (ppuMask & 0x04) !== 0,
        });
        
        // 收集精灵信息
        const sprites: SpriteDebugInfo[] = [];
        let activeCount = 0;
        let behindCount = 0;
        for (let i = 0; i < SPRITE_COUNT; i++) {
          const spr = ds.getSprite(i);
          const active = spr.y < 0xEF;
          if (active) {
            activeCount++;
            if (spr.attr & 0x20) behindCount++;
          }
          sprites.push({
            index: i,
            x: spr.x,
            y: spr.y + 1,
            tileIndex: spr.tileIndex,
            behindBg: (spr.attr & 0x20) !== 0,
            hFlip: (spr.attr & 0x80) !== 0,
            vFlip: (spr.attr & 0x40) !== 0,
            paletteGroup: ((spr.attr & 0x03) + 4) & 0x07,
            active,
          });
        }
        this.setData({ sprites, spriteCount: activeCount, behindBgCount: behindCount });
        
        // Nametable区域计算
        this._updateNametableRegions();
      }
    } catch (err) {
      console.error('[DB:Render] 更新数据失败:', err);
    }
  },

  _updateNametableRegions() {
    const scrollX = this.data.scrollX;
    const scrollY = this.data.scrollY;
    const regions: NametableOverlay[] = [];
    
    // 计算哪些NT在可见范围内
    const ntPixelW = 256;
    const ntPixelH = 240;
    
    // 可见范围: [scrollX, scrollX+256) × [scrollY, scrollY+240)
    const visLeft = scrollX;
    const visRight = scrollX + SCREEN_WIDTH;
    const visTop = scrollY;
    const visBottom = scrollY + SCREEN_HEIGHT;
    
    for (let ntRow = 0; ntRow < 2; ntRow++) {
      for (let ntCol = 0; ntCol < 2; ntCol++) {
        const ntLeft = ntCol * ntPixelW;
        const ntRight = ntLeft + ntPixelW;
        const ntTop = ntRow * ntPixelH;
        const ntBottom = ntTop + ntPixelH;
        
        // 检查交叉
        if (visLeft < ntRight && visRight > ntLeft && visTop < ntBottom && visBottom > ntTop) {
          const ntIndex = ntRow * 2 + ntCol;
          regions.push({
            ntIndex,
            region: `NT${ntIndex}`,
            topLeft: { x: ntLeft, y: ntTop },
            bottomRight: { x: ntRight, y: ntBottom },
          });
        }
      }
    }
    
    this.setData({ ntRegions: regions });
  },

  // ==================== 渲染 ====================

  _render() {
    const ctx = this._ctx;
    if (!ctx) return;

    const mode = this.data.viewMode;
    
    // 清屏
    ctx.fillStyle = '#0a0a1a';
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    const app = getApp();
    const game = app?.globalData?.game;
    if (!game) {
      this._drawNoData(ctx);
      return;
    }

    try {
      const renderer = game._getRenderer();
      const ds = game._getDataStore();
      
      if (mode === 'render') {
        this._drawRenderOutput(ctx, renderer);
      } else if (mode === 'mask') {
        this._drawColorMask(ctx, renderer);
      } else if (mode === 'ntmap') {
        this._drawNametableMap(ctx, renderer, ds);
      } else if (mode === 'sprites') {
        this._drawSpriteMap(ctx, renderer, ds);
      }
    } catch (err) {
      console.error('[DB:Render] 渲染失败:', err);
      this._drawError(ctx, String(err));
    }
  },

  /** 复制游戏渲染输出 */
  _drawRenderOutput(ctx: CanvasRenderingContext2D, renderer: any) {
    const pixelBuffer = renderer.getPixelBufferDebug();
    if (!pixelBuffer) return;

    // 从像素缓冲创建 ImageData
    const imageData = ctx.createImageData(SCREEN_WIDTH, SCREEN_HEIGHT);
    const dst = imageData.data;
    for (let i = 0; i < SCREEN_WIDTH * SCREEN_HEIGHT; i++) {
      const color = pixelBuffer[i];
      const offset = i * 4;
      dst[offset]     = color & 0xFF;
      dst[offset + 1] = (color >> 8) & 0xFF;
      dst[offset + 2] = (color >> 16) & 0xFF;
      dst[offset + 3] = (color >> 24) & 0xFF;
    }
    
    // 缩放到显示Canvas — 优先使用微信小程序离屏Canvas
    let tempCanvas: any = null;
    try {
      if (typeof wx !== 'undefined' && (wx as any).createOffscreenCanvas) {
        tempCanvas = (wx as any).createOffscreenCanvas({ type: '2d', width: SCREEN_WIDTH, height: SCREEN_HEIGHT });
      }
    } catch (e) { /* ignore */ }
    
    if (!tempCanvas && typeof document !== 'undefined') {
      tempCanvas = document.createElement('canvas');
      tempCanvas.width = SCREEN_WIDTH;
      tempCanvas.height = SCREEN_HEIGHT;
    }
    
    if (tempCanvas) {
      const tempCtx = tempCanvas.getContext('2d');
      if (tempCtx) {
        tempCtx.putImageData(imageData, 0, 0);
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(tempCanvas, 0, 0, CANVAS_W, CANVAS_H);
        return;
      }
    }
    
    // 最终降级: 逐像素 fillRect (较慢但兼容)
    ctx.imageSmoothingEnabled = false;
    for (let y = 0; y < SCREEN_HEIGHT; y++) {
      for (let x = 0; x < SCREEN_WIDTH; x++) {
        const i = y * SCREEN_WIDTH + x;
        const color = pixelBuffer[i];
        ctx.fillStyle = `rgba(${color & 0xFF},${(color >> 8) & 0xFF},${(color >> 16) & 0xFF},${((color >> 24) & 0xFF) / 255})`;
        ctx.fillRect(x * SCALE, y * SCALE, SCALE, SCALE);
      }
    }
  },

  /** 色彩标记热力图 */
  _drawColorMask(ctx: CanvasRenderingContext2D, renderer: any) {
    const colorMask = renderer.getColorMaskDebug();
    if (!colorMask) return;

    // 热力图颜色映射
    // bit0-1 = colorIdx (0-3)
    // bit2   = isBg (背景=1, 精灵=0)
    const heatColors = [
      [20, 20, 40],     // color0 bg (暗蓝 = 背景空白)
      [0, 80, 200],     // color1 bg (蓝)
      [0, 180, 80],     // color2 bg (绿)  
      [200, 60, 0],     // color3 bg (红)
    ];
    const sprHeatColors = [
      [40, 40, 60],     // color0 spr (透明区)
      [180, 100, 255],  // color1 spr (紫)
      [255, 200, 50],   // color2 spr (金)
      [255, 80, 80],    // color3 spr (红)
    ];

    const imageData = ctx.createImageData(SCREEN_WIDTH, SCREEN_HEIGHT);
    const dst = imageData.data;
    for (let i = 0; i < SCREEN_WIDTH * SCREEN_HEIGHT; i++) {
      const mask = colorMask[i];
      const colorIdx = mask & 0x03;
      const isBg = (mask & 4) !== 0;
      const colors = isBg ? heatColors : sprHeatColors;
      const c = colors[colorIdx];
      const offset = i * 4;
      dst[offset] = c[0];
      dst[offset + 1] = c[1];
      dst[offset + 2] = c[2];
      dst[offset + 3] = 255;
    }

    // 缩放绘制 — 使用微信离屏Canvas
    let tempCanvas: any = null;
    try {
      if (typeof wx !== 'undefined' && (wx as any).createOffscreenCanvas) {
        tempCanvas = (wx as any).createOffscreenCanvas({ type: '2d', width: SCREEN_WIDTH, height: SCREEN_HEIGHT });
      }
    } catch (e) { /* ignore */ }
    if (!tempCanvas && typeof document !== 'undefined') {
      tempCanvas = document.createElement('canvas');
      tempCanvas.width = SCREEN_WIDTH;
      tempCanvas.height = SCREEN_HEIGHT;
    }
    if (tempCanvas) {
      const tempCtx = tempCanvas.getContext('2d');
      if (tempCtx) {
        tempCtx.putImageData(imageData, 0, 0);
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(tempCanvas, 0, 0, CANVAS_W, CANVAS_H);
      }
    }

    // 图例
    ctx.font = '10px monospace';
    const legend = [
      { label: 'BG c0 (空)', color: 'rgb(20,20,40)' },
      { label: 'BG c1-3',    color: 'rgb(0,80,200)' },
      { label: 'SPR c1-3',   color: 'rgb(255,80,80)' },
    ];
    legend.forEach((item, i) => {
      const ly = CANVAS_H - 60 + i * 16;
      ctx.fillStyle = item.color;
      ctx.fillRect(10, ly, 12, 12);
      ctx.fillStyle = '#fff';
      ctx.textBaseline = 'top';
      ctx.fillText(item.label, 28, ly + 1);
    });
  },

  /** Nametable映射视图 */
  _drawNametableMap(ctx: CanvasRenderingContext2D, renderer: any, ds: any) {
    if (!ds) return;
    
    const scrollX = renderer.scrollDebug.scrollX;
    const scrollY = renderer.scrollDebug.scrollY;
    
    // 绘制4个NT的小缩略图
    const ntNames = ['NT0', 'NT1', 'NT2', 'NT3'];
    const ntArrays = [ds.nametable0, ds.nametable1, ds.nametable2, ds.nametable3];
    
    const previewScale = 1;
    const previewW = 32 * 8 * previewScale;
    const previewH = 30 * 8 * previewScale;
    
    const colors = ['rgba(255,100,100,0.5)', 'rgba(100,255,100,0.5)', 'rgba(100,100,255,0.5)', 'rgba(255,255,100,0.5)'];
    
    for (let i = 0; i < 4; i++) {
      const px = (i % 2) * (previewW + 10);
      const py = Math.floor(i / 2) * (previewH + 30);
      
      // 背景色
      ctx.fillStyle = colors[i];
      ctx.fillRect(px, py, previewW, previewH);
      
      // 填充每个tile (简化: 用灰度表示tile index)
      const nt = ntArrays[i];
      for (let row = 0; row < 30; row++) {
        for (let col = 0; col < 32; col++) {
          const tileId = nt[row * 32 + col] || 0;
          const brightness = tileId & 0x0F;
          ctx.fillStyle = `rgba(${brightness * 16},${brightness * 16},${brightness * 16},0.8)`;
          ctx.fillRect(px + col * 8 * previewScale, py + row * 8 * previewScale, 8 * previewScale, 8 * previewScale);
        }
      }
      
      // 标签
      ctx.fillStyle = '#fff';
      ctx.font = '10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(ntNames[i], px + previewW / 2, py + previewH + 14);
    }
    
    // 视口指示框
    const visLeft = (scrollX % 512) * previewScale / 256 * (previewW / 2);
    const visTop = (scrollY % 480) * previewScale / 240 * (previewH / 2);
    const visW = SCREEN_WIDTH * previewScale / 256 * (previewW / 2);
    const visH = SCREEN_HEIGHT * previewScale / 240 * (previewH / 2);
    
    ctx.strokeStyle = 'rgba(255,255,255,0.8)';
    ctx.lineWidth = 2;
    ctx.strokeRect(
      ((scrollX >> 8) & 1) * (previewW + 10) + (scrollX & 0xFF) / 256 * previewW,
      ((scrollY >> 8) & 1) * (previewH + 30) + (scrollY & 0xFF) / 240 * previewH,
      SCREEN_WIDTH / 256 * previewW,
      SCREEN_HEIGHT / 240 * previewH
    );
  },

  /** 精灵分布视图 */
  _drawSpriteMap(ctx: CanvasRenderingContext2D, renderer: any, ds: any) {
    if (!ds) return;
    
    // 背景
    ctx.fillStyle = '#0a0a1a';
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
    
    // 绘制NES屏幕边界
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, CANVAS_W, CANVAS_H);
    
    const sprites = this.data.sprites;
    
    for (const spr of sprites) {
      if (!spr.active) continue;
      
      const sx = spr.x * SCALE;
      const sy = spr.y * SCALE;
      const size = 8 * SCALE;
      
      // 精灵框
      if (spr.behindBg) {
        ctx.strokeStyle = COLOR_BG_SPRITE;
        ctx.fillStyle = 'rgba(255, 200, 0, 0.15)';
      } else {
        ctx.strokeStyle = COLOR_FG_SPRITE;
        ctx.fillStyle = 'rgba(0, 255, 100, 0.1)';
      }
      ctx.lineWidth = 1;
      ctx.fillRect(sx, sy, size, size);
      ctx.strokeRect(sx, sy, size, size);
      
      // 精灵索引
      ctx.fillStyle = '#fff';
      ctx.font = `${Math.max(8, 6 * SCALE)}px monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${spr.index}`, sx + size / 2, sy + size / 2);
      
      // 调色板颜色标记
      const palColors = ['#f00', '#0f0', '#00f', '#ff0'];
      ctx.fillStyle = palColors[spr.paletteGroup % 4];
      ctx.fillRect(sx + size - 4, sy, 4, 4);
    }
    
    // 图例
    const ly = CANVAS_H - 50;
    ctx.fillStyle = '#fff';
    ctx.font = '10px monospace';
    ctx.textAlign = 'left';
    ctx.fillText('? 前景精灵', 10, ly);
    ctx.fillText('? 后景精灵 (behindBg)', 10, ly + 14);
    ctx.fillText(`活跃: ${this.data.spriteCount} | 后景: ${this.data.behindBgCount}`, 10, ly + 28);
  },

  // ==================== 叠加层 ====================

  _renderOverlay() {
    const ctx = this._overlayCtx;
    if (!ctx) return;

    // @ts-ignore
    if (!this._overlayCanvas) return;
    // @ts-ignore
    ctx.clearRect(0, 0, this._overlayCanvas.width, this._overlayCanvas.height);

    // 视口信息 (左下角)
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fillRect(0, CANVAS_H - 55, 230, 55);
    ctx.fillStyle = '#0f0';
    ctx.font = '9px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`scroll: (${this.data.scrollX}, ${this.data.scrollY})`, 4, CANVAS_H - 40);
    ctx.fillText(`mirror: ${this.data.mirroring}`, 4, CANVAS_H - 28);
    ctx.fillText(`PPU: BG=${this.data.bgEnabled} SPR=${this.data.sprEnabled} L8=${this.data.bgLeft8}`, 4, CANVAS_H - 16);
    ctx.fillText(`sprites: ${this.data.spriteCount} (behind:${this.data.behindBgCount}) FPS:${this.data.fps}`, 4, CANVAS_H - 4);

    // NT区域叠加
    for (const region of this.data.ntRegions) {
      const colors = ['#f66', '#6f6', '#66f', '#ff6'];
      ctx.strokeStyle = colors[region.ntIndex] || '#fff';
      ctx.lineWidth = 2;
      
      // 计算在屏幕上的位置
      const sx = Math.max(0, (region.topLeft.x - this.data.scrollX)) * SCALE;
      const sy = Math.max(0, (region.topLeft.y - this.data.scrollY)) * SCALE;
      const sw = Math.min(CANVAS_W - sx, (region.bottomRight.x - Math.max(this.data.scrollX, region.topLeft.x)) * SCALE);
      const sh = Math.min(CANVAS_H - sy, (region.bottomRight.y - Math.max(this.data.scrollY, region.topLeft.y)) * SCALE);
      
      if (sw > 0 && sh > 0) {
        ctx.strokeRect(sx, sy, sw, sh);
        ctx.fillStyle = colors[region.ntIndex];
        ctx.font = '10px bold monospace';
        ctx.textAlign = 'center';
        ctx.fillText(region.region, sx + sw / 2, sy + sh / 2);
      }
    }
  },

  // ==================== 无数据/错误显示 ====================

  _drawNoData(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#333';
    ctx.font = '14px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('请先在 game 页面启动游戏', CANVAS_W / 2, CANVAS_H / 2 - 10);
    ctx.fillText('然后返回此页面查看渲染数据', CANVAS_W / 2, CANVAS_H / 2 + 10);
  },

  _drawError(ctx: CanvasRenderingContext2D, msg: string) {
    ctx.fillStyle = '#600';
    ctx.font = '12px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('渲染错误: ' + msg, CANVAS_W / 2, CANVAS_H / 2);
  },

  // ==================== 视图切换 ====================

  onSwitchMode(e: any) {
    const mode = e.currentTarget.dataset.mode;
    this.setData({ viewMode: mode });
    this._render();
  },
});
