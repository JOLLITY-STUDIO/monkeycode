/**
 * 天使之翼2 — 微信小程序游戏页面 + NT 交叉测试
 */

import { Tsubasa2 } from '../../src/core/Tsubasa2';
import { DataStore } from '../../src/game/data/DataStore';
import { NES_WIDTH, NES_HEIGHT, TILE_PX, NT_COLS, NT_ROWS } from '../../src/core/types';

type PageMode = 'game' | 'nt_test';

interface PageData {
  showDebug: boolean;
  aiMode: boolean;
  status: string;
  fps: string;
  pageMode: PageMode;
  ntScrollX: number;
  canvasScale: number;
  canvasStyleW: number;
  canvasStyleH: number;
  debugInfo: {
    frame: number;
    gameStateName: string;
  };
}

/** NT 测试相关 */
interface NtTestState {
  store: DataStore;
  rafId: number;
  scrollDir: number;  // 1=右, -1=左
}

Page({
  data: {
    showDebug: false,
    aiMode: false,
    status: '初始化中...',
    fps: '--',
    pageMode: 'game' as PageMode,
    ntScrollX: 0,
    canvasScale: 1,
    canvasStyleW: NES_WIDTH,
    canvasStyleH: NES_HEIGHT,
    debugInfo: {
      frame: 0,
      gameStateName: 'INIT',
    },
  } as PageData,

  _game: null as Tsubasa2 | null,
  _ctx: null as any,
  _debugTimer: 0,
  _ntTest: null as NtTestState | null,
  _mainCtx: null as any,

  // ══════════════════════════════════════════
  // 生命周期
  // ══════════════════════════════════════════

  onLoad() {
    console.log('[Tsubasa2] 页面加载');
  },

  onReady() {
    this._initCanvas();
  },

  onUnload() {
    if (this._debugTimer) clearInterval(this._debugTimer);
    if (this._game) this._game.stop();
    this._stopNtTest();
  },

  // ══════════════════════════════════════════
  // 初始化
  // ══════════════════════════════════════════

  _initCanvas() {
    try {
      const query = wx.createSelectorQuery().in(this);
      query.select('#tsubasa2-canvas').fields({ node: true, size: true });
      query.select('#canvas-area').boundingClientRect();
      query.exec((res: any) => {
        if (!res || !res[0] || !res[0].node) {
          this.setData({ status: 'Canvas 节点未找到' });
          return;
        }

        const canvas = res[0].node;
        const areaRect = res[1] || {};
        // 开机自动根据容器算最大整数倍 scale
        const scale = this._calcFillScale(areaRect.width || 0, areaRect.height || 0);
        this._applyScale(canvas, scale);
        this.setData({ canvasScale: scale });

        this._startGame(canvas, this._mainCtx.ctx);
      });
    } catch (err) {
      console.error('[Tsubasa2] 初始化失败:', err);
      this.setData({ status: '初始化失败: ' + String(err) });
    }
  },

  _startGame(canvas: any, ctx: any) {
    this._game = new Tsubasa2(ctx, {
      scale: 1,
      debug: true,
      aiMode: this.data.aiMode,
    });
    this._startDebugTimer();
    this._game.start(canvas);
    this.setData({ status: '运行中', pageMode: 'game' });
  },

  _startDebugTimer() {
    this._debugTimer = setInterval(() => {
      if (!this._game) return;
      const info = this._game.getDebugInfo();
      this.setData({
        debugInfo: { frame: info.frame, gameStateName: info.gameStateName },
        fps: String(info.fps),
      });
    }, 500);
  },

  // ══════════════════════════════════════════
  // Canvas 自适应缩放
  // ══════════════════════════════════════════

  /**
   * 根据容器计算最大 tile 对齐的缩放比例（每个 tile 8px 必须放大到整像素）
   * scale 只能是 n/8 的倍数：如 1, 1.125, 1.25, ..., 2, 2.125, ...
   */
  _calcFillScale(containerW: number, containerH: number): number {
    if (containerW <= 0 || containerH <= 0) return 1;
    const raw = Math.min(containerW / NES_WIDTH, containerH / NES_HEIGHT);
    // 单个 tile 放大后的整像素数（最小 8 = 1x scale）
    const tilePx = Math.max(8, Math.floor(raw * 8));
    const scale = tilePx / 8;
    console.log(`[SCALE] container=${containerW}x${containerH}  raw=${raw.toFixed(3)}  tilePx=${tilePx}  scale=${scale.toFixed(3)}`);
    return scale;
  },

  /** 设置 canvas 尺寸 + ctx.scale + CSS 显示尺寸（scale 对齐后尺寸必为整数） */
  _applyScale(canvas: any, scale: number) {
    // NES_WIDTH=32×8, NES_HEIGHT=30×8, scale×8=整数 → 尺寸必为整数
    const w = NES_WIDTH * scale;
    const h = NES_HEIGHT * scale;
    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext('2d')!;
    ctx.scale(scale, scale);

    this._mainCtx = { canvas, ctx, scale };
    this._ctx = ctx;

    this.setData({ canvasStyleW: w, canvasStyleH: h, canvasScale: Math.round(scale * 10) / 10 });
    console.log(`[SCALE] scale=${scale.toFixed(3)}x  canvas=${w}×${h}`);
  },

  /** 满屏 ↔ 原始大小 切换 */
  toggleScale() {
    const mc = this._mainCtx;
    if (!mc?.canvas) return;

    const isFilled = mc.scale > 1;
    if (isFilled) {
      this._applyScale(mc.canvas, 1);
      this.setData({ status: 'Canvas 1x' });
    } else {
      const query = wx.createSelectorQuery().in(this);
      query.select('#canvas-area').boundingClientRect();
      query.exec((res: any) => {
        const rect = res?.[0] || {};
        const fill = this._calcFillScale(rect.width || 0, rect.height || 0);
        this._applyScale(mc.canvas, fill);
        this.setData({ status: `Canvas ${fill}x` });
      });
    }
  },

  // ══════════════════════════════════════════
  // NT 交叉测试
  // ══════════════════════════════════════════

  switchToNtTest() {
    if (this._game) {
      this._game.stop();
      this._game = null;
    }
    if (this._debugTimer) clearInterval(this._debugTimer);

    const mc = this._mainCtx;
    if (!mc?.canvas) {
      this.setData({ status: 'Canvas 未初始化' });
      return;
    }

    const canvas = mc.canvas;
    // 重拿 ctx 并恢复当前 scale
    const ctx = canvas.getContext('2d');
    ctx.scale(mc.scale, mc.scale);
    mc.ctx = ctx;
    this._ctx = ctx;

    this._startNtLoop(canvas, ctx);
  },

  _startNtLoop(canvas: any, _ctx: any) {
    const store = new DataStore();

    for (let y = 0; y < NT_ROWS; y++) {
      for (let x = 0; x < NT_COLS; x++) {
        store.writeNT(0, x, y, { tile: 1, palette: 0, bank: 0, flipH: false, flipV: false, behindBg: false });
        store.writeNT(1, x, y, { tile: 2, palette: 0, bank: 0, flipH: false, flipV: false, behindBg: false });
      }
    }

    store.scrollX = 0;

    let scrollDir = 1;
    const MS_PER_FRAME = 16;

    // 离屏 1x NES canvas，先在上面按原始分辨率绘制，再一次性 drawImage 缩放，避免 tile 间缝隙
    const off = (wx as any).createOffscreenCanvas({ type: '2d', width: NES_WIDTH + TILE_PX, height: NES_HEIGHT });
    const offCtx = off.getContext('2d');

    const state: NtTestState = { store, rafId: 0, scrollDir: 1 };
    state.rafId = setInterval(() => {
      if (!this._ntTest) return;
      const main = this._mainCtx;
      if (!main?.ctx) return;
      const ctx = main.ctx;

      const maxScroll = NT_COLS * TILE_PX + NES_WIDTH;
      let sx = store.scrollX + scrollDir * 2;
      if (sx >= maxScroll) { sx = maxScroll; scrollDir = -1; }
      else if (sx <= 0) { sx = 0; scrollDir = 1; }
      store.scrollX = sx;

      // 1) 在离屏 canvas 上按 1x 绘制（坐标永远是整数像素）
      offCtx.fillStyle = '#000';
      offCtx.fillRect(0, 0, off.width, off.height);

      offCtx.fillStyle = '#FF0000';
      offCtx.fillRect(NES_WIDTH - 40, NES_HEIGHT - 40, 32, 32);

      const startTx = Math.floor(sx / TILE_PX);
      const tilesWide = Math.ceil(NES_WIDTH / TILE_PX) + 1;
      const tilesHigh = Math.ceil(NES_HEIGHT / TILE_PX) + 1;
      const fineX = sx % TILE_PX;

      for (let ty = 0; ty < tilesHigh; ty++) {
        for (let tx = 0; tx < tilesWide; tx++) {
          const worldTx = startTx + tx;
          const entry = store.getWorldTile(worldTx, ty);
          if (!entry || entry.tile === 0) continue;

          offCtx.fillStyle = entry.tile === 1 ? '#00AA00' : '#0066FF';
          offCtx.fillRect(tx * TILE_PX - fineX, ty * TILE_PX, TILE_PX, TILE_PX);
        }
      }

      // 2) 主 canvas：清屏后把离屏图 nearest-neighbor 缩放到整个 canvas
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, NES_WIDTH, NES_HEIGHT);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(off, 0, 0, NES_WIDTH, NES_HEIGHT);

      this.setData({ ntScrollX: sx });
    }, MS_PER_FRAME) as unknown as number;

    this._ntTest = state;
    this.setData({ status: 'NT 交叉测试中', pageMode: 'nt_test' });
  },

  _stopNtTest() {
    if (!this._ntTest) return;
    if (this._ntTest.rafId) {
      clearInterval(this._ntTest.rafId);
    }
    this._ntTest = null;
  },

  switchToGame() {
    this._stopNtTest();
    this.setData({ ntScrollX: 0 });
    const mc = this._mainCtx;
    if (!mc?.canvas) return;

    const ctx = mc.canvas.getContext('2d');
    ctx.scale(mc.scale, mc.scale);
    mc.ctx = ctx;
    this._ctx = ctx;

    this._startGame(mc.canvas, ctx);
  },

  // ══════════════════════════════════════════
  // 触摸事件
  // ══════════════════════════════════════════

  onTouchStart(e: any) {
    if (!this._game) return;
    const touch = e.touches[0];
    if (!touch) return;

    const query = wx.createSelectorQuery().in(this);
    query.select('#tsubasa2-canvas')
      .boundingClientRect()
      .exec((res: any) => {
        if (!res || !res[0]) return;
        const rect = res[0];
        const x = touch.x - rect.left;
        const y = touch.y - rect.top;
        const w = rect.width;
        const h = rect.height;

        const thirdW = w / 3;
        const thirdH = h / 3;

        let mask = 0;
        if (x < thirdW) mask |= 0x40;
        else if (x > thirdW * 2) mask |= 0x80;
        if (y < thirdH) mask |= 0x10;
        else if (y > thirdH * 2) mask |= 0x20;

        this._game!.setButtons(mask);
      });
  },

  onTouchMove(e: any) {
    this.onTouchStart(e);
  },

  onTouchEnd(_e: any) {
    if (!this._game) return;
    this._game.setButtons(0);
  },

  onDoubleTouch() {
    if (!this._game) return;
    this._game.pressButton('START');
    setTimeout(() => this._game?.releaseButton('START'), 100);
  },

  // ══════════════════════════════════════════
  // 按钮方法
  // ══════════════════════════════════════════

  toggleDebug() {
    this.setData({ showDebug: !this.data.showDebug });
  },

  toggleAi() {
    const aiMode = !this.data.aiMode;
    this.setData({ aiMode });
    if (this._game) {
      aiMode ? this._game.enableAi() : this._game.disableAi();
    }
  },

  onBtnA() {
    if (!this._game) return;
    this._game.pressButton('A');
    setTimeout(() => this._game?.releaseButton('A'), 100);
  },

  onBtnB() {
    if (!this._game) return;
    this._game.pressButton('B');
    setTimeout(() => this._game?.releaseButton('B'), 100);
  },

  onBtnStart() {
    if (!this._game) return;
    this._game.pressButton('START');
    setTimeout(() => this._game?.releaseButton('START'), 100);
  },
});
