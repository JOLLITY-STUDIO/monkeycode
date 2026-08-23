/**
 * 天使之翼2 — 微信小程序游戏页（H5 引擎即插即用）
 *
 * 渲染：256×240 Canvas（type=2d），每帧把 PPU 帧缓冲写入 ImageData
 * 输入：虚拟手柄（触摸）→ HeadlessRuntime.setButton → core Controller
 * 循环：canvas.requestAnimationFrame 驱动 runtime.frame(game)
 */
import { Tsubasa2 } from '../../src/game/index';
import { HeadlessRuntime } from '../../src/game/runtime/HeadlessRuntime';
import Controller from '../../src/core/controller';

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
  },

  runtime: null as HeadlessRuntime | null,
  game: null as Tsubasa2 | null,
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
    // 获取 2d Canvas 节点
    const query = wx.createSelectorQuery().in(this);
    query
      .select('#gameCanvas')
      .fields({ node: true, size: true })
      .exec((res: any[]) => {
        const canvas = res[0].node;
        this.canvas = canvas;
        const ctx = canvas.getContext('2d');
        canvas.width = 256;
        canvas.height = 240;
        const imageData = ctx.createImageData(256, 240);
        this._startLoop(ctx, imageData);
      });
  },

  _startLoop(ctx: any, imageData: any) {
    const runtime = this.runtime!;
    const game = this.game!;
    const loop = () => {
      game.frame(runtime);
      // PPU 帧缓冲（Uint32 0xRRGGBB）→ ImageData RGBA
      const buf = runtime.ppu.buffer as Uint32Array;
      const data = imageData.data as Uint8ClampedArray;
      for (let i = 0, n = buf.length; i < n; i++) {
        const v = buf[i];
        const o = i * 4;
        data[o] = (v >>> 16) & 0xff;
        data[o + 1] = (v >>> 8) & 0xff;
        data[o + 2] = v & 0xff;
        data[o + 3] = 0xff;
      }
      ctx.putImageData(imageData, 0, 0);
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

  onHide() {
    if (this.rafId && this.canvas) this.canvas.cancelAnimationFrame(this.rafId);
    this.rafId = 0;
  },

  onShow() {
    // 重新进入时恢复循环（canvas 已就绪则重启）
    if (this.canvas && !this.rafId && this.game && this.runtime) {
      const ctx = this.canvas.getContext('2d');
      const imageData = ctx.createImageData(256, 240);
      this._startLoop(ctx, imageData);
    }
  },

  onUnload() {
    if (this.rafId && this.canvas) this.canvas.cancelAnimationFrame(this.rafId);
    this.rafId = 0;
    this.runtime = null;
    this.game = null;
    this.canvas = null;
  },
});
