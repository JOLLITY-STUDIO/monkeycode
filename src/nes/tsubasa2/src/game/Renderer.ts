/**
 * Renderer — Canvas 2D 帧渲染器 (game 层)
 *
 * 把帧缓冲 (Uint32Array RGBA) 写入 Canvas 2D context。
 * 对应模拟器 ui.writeFrame。
 *
 * 微信小程序 Canvas 2D: ctx.putImageData(ImageData, 0, 0)。
 * 因微信 ImageData 构造方式特殊, 用 new Uint8ClampedArray(buffer) 包装。
 */
export class Renderer {
  /** Canvas 2D 上下文 */
  private _ctx: CanvasRenderingContext2D | null = null;
  /** 离屏 ImageData (复用, 避免每帧分配) */
  private _imgData: ImageData | null = null;
  /** 帧缓冲宽度 */
  private _width = 0;
  /** 帧缓冲高度 */
  private _height = 0;

  /**
   * 挂载 Canvas 2D 上下文。
   * @param ctx Canvas 2D context
   * @param width 帧缓冲宽 (NES_WIDTH=256)
   * @param height 帧缓冲高 (NES_HEIGHT=240)
   */
  setupCanvas(ctx: CanvasRenderingContext2D | any, width = 256, height = 240): void {
    this._ctx = ctx;
    this._width = width;
    this._height = height;
    // 微信小程序: 用 canvas.createImageData 或 ctx.createImageData
    try {
      this._imgData = (ctx as any).createImageData(width, height);
    } catch (_) {
      // 兜底: 手动构造 (微信小程序 Canvas 2D 支持 new ImageData)
      try {
        this._imgData = new ImageData(new Uint8ClampedArray(width * height * 4), width, height);
      } catch (_) {
        this._imgData = null; // 无法创建, writeFrame 时兜底 fillRect
      }
    }
  }

  /**
   * 把 Uint32Array 帧缓冲写入 Canvas。
   * @param buf RGBA8888 帧缓冲 (Uint32Array, length = width*height)
   */
  writeFrame(buf: Uint32Array | number[]): void {
    if (!this._ctx) return;
    const len = this._width * this._height;
    if (buf.length < len) return;

    if (this._imgData) {
      // 把 Uint32Array 视为 Uint8ClampedArray (ABGR/RGBA 取决于端序)
      const u8 = new Uint8ClampedArray(buf.buffer, buf.byteOffset, len * 4);
      this._imgData.data.set(u8);
      try {
        this._ctx.putImageData(this._imgData, 0, 0);
        return;
      } catch (_) {
        // putImageData 失败, 走兜底
      }
    }
    // 兜底: 无 ImageData, 用 fillRect 逐像素 (极慢, 仅保证不崩)
    // TODO: 后续优化为 drawImage(offscreenCanvas)
  }
}
