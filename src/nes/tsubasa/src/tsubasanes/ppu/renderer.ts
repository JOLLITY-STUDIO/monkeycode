// ============================================================================
// renderer.ts — Canvas 渲染器
// 将 PPU frameBuffer 输出到 Canvas 2D / 微信小程序 Canvas
// ============================================================================

const SCREEN_W = 256;
const SCREEN_H = 240;

export type CanvasContext = CanvasRenderingContext2D | WechatCanvasContext;

/** 微信小程序 Canvas 2D 上下文简化类型 */
export interface WechatCanvasContext {
  createImageData(w: number, h: number): ImageData;
  putImageData(imgData: ImageData, x: number, y: number, ...args: any[]): void;
}

/**
 * 将 Uint32Array RGBA 帧缓冲渲染到 Canvas
 * @param ctx Canvas 2D 上下文 (浏览器或微信小程序)
 * @param buffer RGBA 帧缓冲 (Uint32Array, 256×240)
 * @param dx 目标 X
 * @param dy 目标 Y
 * @param dw 目标宽度 (可选, 默认 256)
 * @param dh 目标高度 (可选, 默认 240)
 */
export function renderToCanvas(
  ctx: CanvasContext,
  buffer: Uint32Array,
  dx: number = 0,
  dy: number = 0,
  dw: number = SCREEN_W,
  dh: number = SCREEN_H,
): void {
  const imgData = ctx.createImageData(SCREEN_W, SCREEN_H);
  const dst = new Uint32Array(imgData.data.buffer);
  const len = SCREEN_W * SCREEN_H;

  for (let i = 0; i < len; i++) {
    dst[i] = buffer[i] | 0xFF000000;
  }

  ctx.putImageData(imgData, dx, dy, 0, 0, dw, dh);
}

/**
 * 清空 Canvas
 */
export function clearCanvas(
  ctx: CanvasContext,
  w: number = SCREEN_W,
  h: number = SCREEN_H,
): void {
  (ctx as any).clearRect?.(0, 0, w, h);
  (ctx as CanvasRenderingContext2D).fillStyle = '#000000';
  (ctx as any).fillRect?.(0, 0, w, h);
}
