/**
 * Screen (小程序版) — Canvas 2D 渲染输出
 *
 * 借鉴 core/browser/screen.ts, 适配微信小程序 Canvas 2D API:
 *   - 不用 document.createElement, 改为接收 page 传入的 canvas 节点
 *   - ImageData 用 wx.createCanvasImageData / canvas.createImageData
 *   - 无 mousedown 事件, 触摸输入由 BrowserMini 外部注入
 *
 * 像素格式: NES PPU buffer 是 Uint32Array (ABGR 小端), 转 ImageData RGBA。
 */
const SCREEN_WIDTH = 256;
const SCREEN_HEIGHT = 240;

export default class ScreenMini {
  canvas: any;
  ctx: any;
  imageData: any;
  buf32: Uint32Array;
  buf8: Uint8ClampedArray;

  constructor(canvas: any) {
    this.canvas = canvas;
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;
    this.ctx = canvas.getContext('2d');
    // 小程序 Canvas 2D 支持 createImageData
    this.imageData = this.ctx.createImageData(SCREEN_WIDTH, SCREEN_HEIGHT);
    this.buf8 = this.imageData.data as Uint8ClampedArray;
    this.buf32 = new Uint32Array(this.buf8.buffer);
    // 初始化 alpha=255
    for (let i = 0; i < this.buf32.length; i++) {
      this.buf32[i] = 0xff000000;
    }
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
  }

  /**
   * 接收 NES PPU 帧缓冲 (Uint32Array, 256×240) 并写入内部 buf32。
   * 对应 browser/screen.ts 的 setBuffer。
   */
  setBuffer = (buffer: Uint32Array): void => {
    const len = SCREEN_WIDTH * SCREEN_HEIGHT;
    for (let i = 0; i < len; i++) {
      this.buf32[i] = 0xff000000 | buffer[i];
    }
  };

  /** 把内部 buf8 写到 Canvas。对应 browser/screen.ts 的 writeBuffer。 */
  writeBuffer = (): void => {
    this.ctx.putImageData(this.imageData, 0, 0);
  };

  /**
   * 根据父容器尺寸自适应 Canvas 显示尺寸 (借鉴 core/browser/screen.ts fitInParent)。
   *
   * 保持 NES 256:240 宽高比, 等比缩放适配父容器最大宽高。
   * 设置 canvas.style.width/height (CSS 显示尺寸, canvas 内部分辨率 256×240 不变)。
   *
   * @param parentW 父容器宽度 (px)
   * @param parentH 父容器高度 (px)
   * @returns 应用后的显示尺寸 {w, h}
   */
  fitInParent(parentW: number, parentH: number): { w: number; h: number } {
    if (parentW <= 0 || parentH <= 0) {
      return { w: SCREEN_WIDTH, h: SCREEN_HEIGHT };
    }
    const desiredRatio = SCREEN_WIDTH / SCREEN_HEIGHT;
    const parentRatio = parentW / parentH;
    let w: number, h: number;
    if (desiredRatio < parentRatio) {
      // 父容器更宽, 以高度为基准
      h = parentH;
      w = Math.round(parentH * desiredRatio);
    } else {
      // 父容器更高, 以宽度为基准
      w = parentW;
      h = Math.round(parentW / desiredRatio);
    }
    this._setStyleSize(w, h);
    return { w, h };
  }

  /** 内部: 设置 CSS 显示尺寸 */
  private _setStyleSize(w: number, h: number): void {
    if (this.canvas) {
      this.canvas.style = this.canvas.style || {};
      this.canvas.style.width = w + 'px';
      this.canvas.style.height = h + 'px';
    }
  }
}
