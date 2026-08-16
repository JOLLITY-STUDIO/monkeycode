/**
 * 渲染器 (View 层) — 对应模拟器 ui.writeFrame / onFrame 的具体实现
 *
 * 职责 (且仅此一项):
 *   接收 PPU 层产出的帧缓冲 (Uint32Array, 每像素 0xRRGGBB)，
 *   复制到 ImageData 并 putImageData 到画布。
 *
 * 与模拟器的对应关系:
 *   PPU.endFrame() → nes.ui.writeFrame(buffer)
 *   Screen.setBuffer() + Screen.writeBuffer() → putImageData
 *   FrameCompositor.compose() → Renderer.writeFrame(buffer)
 *
 * 不包含任何合成/业务逻辑；NT/OAM/调色板解码、文本叠加全部在 PPU 层
 * (FrameCompositor / 未来的 core/ppu) 完成。
 */
import { NES_WIDTH, NES_HEIGHT } from '../../types';

export class Renderer {
  /** Canvas 2d 上下文 */
  private _ctx: CanvasRenderingContext2D | null = null;

  /** 预建的 256×240 ImageData (每帧原地填充后 putImageData) */
  private _imageData: ImageData | null = null;

  /** 双缓冲: Uint8 视图 (ImageData.data 拷贝源) */
  private _buf8: Uint8ClampedArray | null = null;

  /** 双缓冲: Uint32 视图 (写入目标, 与模拟器 screen.ts 一致) */
  private _buf32: Uint32Array | null = null;

  /** 挂载主 Canvas Context, 预建 ImageData 与双缓冲 */
  setupCanvas(ctx: CanvasRenderingContext2D): void {
    this._ctx = ctx;
    this._imageData = this._createImageData(NES_WIDTH, NES_HEIGHT, ctx);

    const data = this._imageData.data;
    this._buf8 = new Uint8ClampedArray(data.length);
    this._buf32 = new Uint32Array(this._buf8.buffer);
    for (let i = 0; i < this._buf32.length; i++) {
      this._buf32[i] = 0xff000000; // 初始全黑不透明
    }

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, NES_WIDTH, NES_HEIGHT);
  }

  /**
   * 呈现一帧 (对应模拟器 Screen.setBuffer + writeBuffer)。
   * @param buffer PPU 帧缓冲, 256×240, 每像素 0xRRGGBB (小端写入, 高位强制 alpha=FF)
   */
  writeFrame(buffer: Uint32Array): void {
    if (!this._ctx || !this._imageData || !this._buf8 || !this._buf32) return;

    const buf32 = this._buf32;
    const n = Math.min(buf32.length, buffer.length);
    for (let i = 0; i < n; i++) {
      buf32[i] = 0xff000000 | buffer[i]; // Full alpha, 与模拟器 screen.ts 行为一致
    }

    this._imageData.data.set(this._buf8);
    this._ctx.putImageData(this._imageData, 0, 0);
  }

  /**
   * 创建 ImageData，兼容微信小程序 Canvas 2D 与标准 DOM。
   */
  private _createImageData(w: number, h: number, ctx?: CanvasRenderingContext2D): ImageData {
    const sources: any[] = [ctx, this._ctx, (this._ctx as any)?.canvas];
    for (const s of sources) {
      if (s && typeof s.createImageData === 'function') {
        return s.createImageData(w, h) as ImageData;
      }
    }
    if (typeof (ImageData as any) !== 'undefined') {
      return new (ImageData as any)(w, h) as ImageData;
    }
    return { width: w, height: h, data: new Uint8ClampedArray(w * h * 4) } as unknown as ImageData;
  }
}
