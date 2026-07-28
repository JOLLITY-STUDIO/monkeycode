/**
 * Canvas 渲染器
 *
 * 负责将 PPU 帧缓冲 (256×240 Uint32Array, BGR 格式)
 * 渲染到宿主平台的 Canvas/ImageData 上。
 *
 * 对应原始 tsnes_kernel.ts 中的 renderToCanvas() 逻辑。
 */

const SCREEN_W = 256;
const SCREEN_H = 240;

export interface RenderTarget {
  /** Canvas 2D context */
  ctx: CanvasRenderingContext2D;
  /** 缓存的 ImageData */
  imageData: ImageData;
}

/** 创建渲染目标 */
export function createRenderTarget(canvas: HTMLCanvasElement): RenderTarget {
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('[render] Cannot get 2d context');
  ctx.imageSmoothingEnabled = false;
  return {
    ctx,
    imageData: ctx.createImageData(SCREEN_W, SCREEN_H),
  };
}

/**
 * 将 tsnes PPU 帧缓冲 (BGR 格式) 写入 Canvas。
 *
 * @param target 渲染目标
 * @param frameBuffer PPU 的 buffer (Uint32Array, 256×240, 格式 0x00BBGGRR)
 */
export function renderFrame(
  target: RenderTarget,
  frameBuffer: Uint32Array,
): void {
  if (!target.ctx || !target.imageData) return;

  // tsnes PPU 输出 BGR 格式 → 转为 RGBA (alpha=0xFF)
  const buf32 = new Uint32Array(target.imageData.data.buffer);
  for (let i = 0; i < SCREEN_W * SCREEN_H; i++) {
    buf32[i] = frameBuffer[i] | 0xFF000000;
  }

  target.ctx.putImageData(target.imageData, 0, 0);
}

/**
 * 调整 Canvas 尺寸 (用于拉伸/全屏)
 */
export function resizeCanvas(
  target: RenderTarget,
  w: number,
  h: number,
): void {
  target.ctx.canvas.width = w;
  target.ctx.canvas.height = h;
  target.ctx.imageSmoothingEnabled = false;
}
