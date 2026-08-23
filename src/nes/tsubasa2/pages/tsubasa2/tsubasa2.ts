/**
 * 天使之翼2 — 微信小程序游戏页（H5 引擎即插即用）
 *
 * 渲染：参考 src/core/browser/screen.ts → 小程序版 MpScreen（256×240 Canvas type=2d）
 *   - setBuffer/writeBuffer 提交 PPU 帧缓冲
 *   - fitInParent 自动等比适配父容器（onResize → setData 内联 style）
 * 输入：虚拟手柄（触摸）→ HeadlessRuntime.setButton → core Controller
 * 循环：canvas.requestAnimationFrame 驱动 runtime.frame(game)
 */
import { Tsubasa2 } from '../../src/game/index';
import { HeadlessRuntime } from '../../src/game/runtime/HeadlessRuntime';
import Controller from '../../src/core/controller';
import MpScreen from '../../src/core/mp/screen';

/** data-key → core Controller 按键位（Controller.BUTTON_*） */
const KEY_MAP: Record<string, number> = {
  UP: Controller.BUTTON_UP,
  DOWN: Controller.BUTTON_DOWN,
  LEFT: Controller.BUTTON_LEFT,
  RIGHT: Controller.BUTTON_RIGHT,
  SELECT: Controller.BUTTON_SELECT,
  START: Controller.BUTTON_START,
  B: Controller.BUTTON_B,
  A: Controller.BUTTON_A,
};

Page({
  data: {
    frame: 0,
    status: '初始化中…',
    canvasW: 256,
    canvasH: 240,
  },

  runtime: null as HeadlessRuntime | null,
  game: null as Tsubasa2 | null,
  screen: null as MpScreen | null,
  canvas: null as any,
  rafId: 0,
  frameCount: 0,

  onLoad() {
    this.runtime = new HeadlessRuntime();
    this.game = new Tsubasa2();
    this.game.boot();
    this.setData({ status: '已启动（开场）' });
  },

  onReady() {
    const query = wx.createSelectorQuery().in(this);
    query.select('#gameContainer').boundingClientRect();
    query.select('#gameCanvas').fields({ node: true, size: true });
    query.exec((res: any[]) => {
      const containerRect = res[0];
      const canvas = res[1] && res[1].node;
      if (!canvas) return;
      this.canvas = canvas;
      this.screen = new MpScreen(canvas, {
        getContainerSize: () =>
          Promise.resolve({
            width: (containerRect && containerRect.width) || 0,
            height: (containerRect && containerRect.height) || 0,
          }),
        onResize: (w: number, h: number) => this.setData({ canvasW: w, canvasH: h }),
        onTouchStart: (_x: number, _y: number) => {
          // 画布触摸映射到 256×240（参考 browser zapper 接口，暂不消费）
        },
      });
      this.screen.fitInParent();
      this._startLoop();
    });
  },

  _startLoop() {
    const runtime = this.runtime!;
    const game = this.game!;
    const screen = this.screen!;
    const loop = () => {
      game.frame(runtime);
      // PPU 帧缓冲 → MpScreen（0x00RRGGBB → 全 alpha RGBA）
      screen.setBuffer(runtime.ppu.buffer as Uint32Array);
      screen.writeBuffer();
      this.frameCount++;
      if (this.frameCount % 60 === 0) {
        this.setData({ frame: this.frameCount });
      }
      this.rafId = this.canvas.requestAnimationFrame(loop);
    };
    this.rafId = this.canvas.requestAnimationFrame(loop);
  },

  onPadDown(e: any) {
    const key: string = e.currentTarget.dataset.key;
    const idx = KEY_MAP[key];
    if (idx !== undefined) this.runtime?.setButton(1, idx, true);
  },

  onPadUp(e: any) {
    const key: string = e.currentTarget.dataset.key;
    const idx = KEY_MAP[key];
    if (idx !== undefined) this.runtime?.setButton(1, idx, false);
  },

  /** 窗口尺寸变化时重新适配画布 */
  onResize() {
    this.screen?.fitInParent();
  },

  onHide() {
    if (this.rafId && this.canvas) this.canvas.cancelAnimationFrame(this.rafId);
    this.rafId = 0;
  },

  onShow() {
    // 重新进入时恢复循环（canvas 已就绪则重启）
    if (this.canvas && !this.rafId && this.screen) {
      this._startLoop();
    }
  },

  onUnload() {
    if (this.rafId && this.canvas) this.canvas.cancelAnimationFrame(this.rafId);
    this.rafId = 0;
    this.screen?.destroy();
    this.runtime = null;
    this.game = null;
    this.screen = null;
    this.canvas = null;
  },
});
