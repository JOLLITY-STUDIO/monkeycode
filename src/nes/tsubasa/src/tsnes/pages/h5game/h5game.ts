/**
 * ============================================================================
 * H5 游戏页面 — 纯 TS + Canvas 引擎（无模拟器）
 *
 * 使用 game-engine/ 的 MpGameAdapter 驱动游戏。
 * 不依赖 NES 模拟器、不加载 ROM 文件。
 * ============================================================================
 */

import { MpGameAdapter } from '../../game-engine/adapters/mp-adapter';
import { Button } from '../../game-engine/core/types';

const SCREEN_W = 256;
const SCREEN_H = 240;

// ============================================================================
// 按钮映射：dataset.btn → NES Button bitmask
// ============================================================================
const BTN_MAP: Record<string, number> = {
  up:     Button.UP,
  down:   Button.DOWN,
  left:   Button.LEFT,
  right:  Button.RIGHT,
  a:      Button.A,
  b:      Button.B,
  start:  Button.START,
  select: Button.SELECT,
};

// ============================================================================
// 页面
// ============================================================================

Page({
  data: {
    status: 'initializing...',
    fps: '--',
  },

  // ---- 引擎 ----
  _adapter: null as MpGameAdapter | null,
  _animId: -1 as number,
  _started: false,

  // ---- FPS ----
  _fpsFrameCount: 0,
  _fpsLastTime: 0,

  // ================================================================
  // 生命周期
  // ================================================================

  onLoad() {
    console.log('[h5game] onLoad');
  },

  onReady() {
    console.log('[h5game] onReady');
    this._initCanvas();
  },

  onUnload() {
    console.log('[h5game] onUnload');
    this._stopLoop();
    if (this._adapter) {
      this._adapter.stop();
      this._adapter = null;
    }
  },

  // ================================================================
  // Canvas 初始化
  // ================================================================

  _initCanvas() {
    const query = wx.createSelectorQuery();
    query.select('#h5canvas')
      .fields({ node: true, size: true })
      .exec((res: any) => {
        if (!res || !res[0] || !res[0].node) {
          console.warn('[h5game] canvas not found, retry in 300ms');
          setTimeout(() => this._initCanvas(), 300);
          return;
        }

        const cnv = res[0].node;
        cnv.width = SCREEN_W;
        cnv.height = SCREEN_H;

        console.log('[h5game] Canvas ready:', SCREEN_W, 'x', SCREEN_H,
          '| display:', res[0].width, 'x', res[0].height);

        this._startEngine(cnv);
      });
  },

  // ================================================================
  // 启动引擎
  // ================================================================

  _startEngine(canvas: any) {
    try {
      this.setData({ status: 'starting engine...' });

      this._adapter = new MpGameAdapter({
        canvas,
        config: {
          canvasWidth: SCREEN_W,
          canvasHeight: SCREEN_H,
          fps: 60,
          debug: true,
          platform: 'miniprogram',
        },
      });

      // 啟用調試
      this._adapter.setDebug(true);

      this._adapter.start();
      this._started = true;

      this.setData({ status: 'running (H5 engine)' });
      console.log('[h5game] MpGameAdapter started');

      // 啟動 FPS 計數 + 狀態日誌循環
      this._monitorLoop();

    } catch (e: any) {
      const msg = e.message || String(e);
      console.error('[h5game] Engine start failed:', msg, e.stack);
      this.setData({ status: 'error: ' + msg.substring(0, 30) });
    }
  },

  // ================================================================
  // 狀態監控（每秒打印引擎狀態）
  // ================================================================

  _monitorLoop() {
    if (!this._adapter) return;

    const info = this._adapter.sceneManager.getDebugInfo();
    const fps = this.data.fps;

    // 每秒輸出一次調試信息
    if (!this._debugTimer) {
      this._debugTimer = setInterval(() => {
        if (!this._adapter) return;
        const s = this._adapter.state;
        console.log(
          `[h5game] frame=${s.timing.frameCount} ` +
          `scene=${s.progress.sceneId} ` +
          `dispatch=${s.dispatchIndex} ` +
          `fps=${this.data.fps}`
        );
      }, 2000);
    }
  },

  _debugTimer: null as any,

  // ================================================================
  // 幀循環（只負責 FPS 顯示，遊戲幀由 MpGameAdapter.setInterval 驅動）
  // ================================================================

  _fpsUpdate() {
    this._fpsFrameCount++;
    const now = Date.now();
    if (!this._fpsLastTime) this._fpsLastTime = now;
    const elapsed = now - this._fpsLastTime;
    if (elapsed >= 1000) {
      const fps = Math.round(this._fpsFrameCount / (elapsed / 1000));
      this.setData({ fps: String(fps) });
      this._fpsFrameCount = 0;
      this._fpsLastTime = now;
    }

    // 遞歸調用
    this._animId = setTimeout(() => {
      if (this._started) this._fpsUpdate();
    }, 1000) as any;
  },

  _stopLoop() {
    if (this._animId >= 0) {
      clearTimeout(this._animId);
      this._animId = -1;
    }
    if (this._debugTimer) {
      clearInterval(this._debugTimer);
      this._debugTimer = null;
    }
  },

  // ================================================================
  // 觸摸按鈕輸入
  // ================================================================

  onBtnDown(e: any) {
    if (!this._adapter) return;
    const btn = e.currentTarget.dataset.btn as string;
    const mask = BTN_MAP[btn];
    if (mask === undefined) return;

    this._adapter.state.input.current |= mask;
  },

  onBtnUp(e: any) {
    if (!this._adapter) return;
    const btn = e.currentTarget.dataset.btn as string;
    const mask = BTN_MAP[btn];
    if (mask === undefined) return;

    this._adapter.state.input.current &= ~mask;
  },
});
