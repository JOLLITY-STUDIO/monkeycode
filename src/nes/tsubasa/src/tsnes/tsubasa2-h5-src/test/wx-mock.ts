/**
 * 微信小程序 wx API Mock — 浏览器环境兼容层
 *
 * 让 tsubasa2-h5-src 在普通浏览器中运行。
 * 仅 mock 游戏运行必需的 API：
 *   - canvas.requestAnimationFrame / cancelAnimationFrame
 *   - wx.createSelectorQuery (返回 canvas 节点)
 *   - wx.createWebAudioContext → 标准 AudioContext
 */

interface MockCanvas extends HTMLCanvasElement {
  requestAnimationFrame: (cb: (ts: number) => void) => number;
  cancelAnimationFrame: (id: number) => void;
}

/**
 * SelectorQuery Mock — 模拟 wx.createSelectorQuery().select().fields().exec()
 * 测试页面只有一个 canvas，selector 全部返回该 canvas。
 */
class SelectorQueryMock {
  private _canvas: HTMLCanvasElement;
  private _queue: Array<{ isBounding: boolean }> = [];

  constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas;
  }

  in(): this {
    return this;
  }

  select(): this {
    this._queue.push({ isBounding: false });
    return this;
  }

  fields(): this {
    return this;
  }

  boundingClientRect(): this {
    const last = this._queue[this._queue.length - 1];
    if (last) last.isBounding = true;
    return this;
  }

  exec(cb: (res: any[]) => void): void {
    const results = this._queue.map((item) => {
      if (item.isBounding) {
        const rect = this._canvas.getBoundingClientRect();
        return {
          left: rect.left, top: rect.top, width: rect.width, height: rect.height,
          right: rect.right, bottom: rect.bottom,
        };
      }
      return {
        node: this._canvas,
        width: this._canvas.width,
        height: this._canvas.height,
      };
    });
    this._queue = [];
    cb(results);
  }
}

function installWxMock(targetCanvas: HTMLCanvasElement): void {
  // 给 canvas 注入 wx 风格的 requestAnimationFrame（直接复用浏览器 rAF）
  const canvas = targetCanvas as MockCanvas;
  if (!canvas.requestAnimationFrame) {
    canvas.requestAnimationFrame = (cb: (ts: number) => void): number => {
      return window.requestAnimationFrame(cb);
    };
  }
  if (!canvas.cancelAnimationFrame) {
    canvas.cancelAnimationFrame = (id: number): void => {
      window.cancelAnimationFrame(id);
    };
  }

  // wx 全局对象
  const wxMock: any = {
    createSelectorQuery: () => new SelectorQueryMock(targetCanvas),
    createOffscreenCanvas: (opts: { type: string; width: number; height: number }) => {
      const off = document.createElement('canvas');
      off.width = opts.width;
      off.height = opts.height;
      return off;
    },
    createWebAudioContext: () => {
      const AC = (window as any).AudioContext || (window as any).webkitAudioContext;
      return new AC({ sampleRate: 44100 });
    },
    setStorageSync: () => {},
    getStorageSync: () => null,
    showToast: (opts: { title: string }) => console.log('[wx.showToast]', opts.title),
    console: {
      log: (...args: any[]) => console.log('[wx]', ...args),
      warn: (...args: any[]) => console.warn('[wx]', ...args),
      error: (...args: any[]) => console.error('[wx]', ...args),
    },
  };

  (window as any).wx = wxMock;
  (globalThis as any).wx = wxMock;
}

export { installWxMock };
