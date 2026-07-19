/**
 * VDP 渲染器 — 将 VDP 状态合成到 Canvas 2D
 *
 * 渲染管线 (对应真实 VDP 每帧行为):
 * 1. 清空 framebuffer (背景色)
 * 2. 渲染 Plane B (低优先级 BG)
 * 3. 渲染 Plane A
 * 4. 渲染低优先级 Sprite
 * 5. 渲染高优先级 Plane tile (priority bit)
 * 6. 渲染高优先级 Sprite
 *
 * 输出: ImageData → Canvas putImageData
 */

import { VdpChip } from './VdpChip';
import { Vram } from './Vram';
import { Cram } from './Cram';
import { Plane } from './Plane';
import { Sprite } from './Sprite';
import { TileDecoder } from './TileDecoder';
import { DISPLAY } from '../core/types';

export class Renderer {
  readonly vdp: VdpChip;

  private plane: Plane;
  private sprite: Sprite;

  /** 帧缓冲区 (320×224 RGBA) */
  private framebuffer: Uint8ClampedArray;

  constructor(vdp: VdpChip) {
    this.vdp = vdp;
    this.plane = new Plane(vdp);
    this.sprite = new Sprite(vdp);

    const totalPixels = DISPLAY.WIDTH * DISPLAY.HEIGHT * 4;
    this.framebuffer = new Uint8ClampedArray(totalPixels);
  }

  /**
   * 渲染一帧
   *
   * @param ctx Canvas 2D 上下文 (用于 createImageData, 兼容微信小程序)
   * @returns ImageData (可 putImageData 到 Canvas)
   */
  renderFrame(ctx: CanvasRenderingContext2D): ImageData {
    const vram = this.vdp.vram;
    const cram = this.vdp.cram;
    const dst = this.framebuffer;

    // 1. 填充背景色
    this.fillBackground(dst);

    // 2. 渲染 Plane B
    this.plane.renderPlaneB(dst, vram, cram);

    // 3. 渲染 Plane A
    this.plane.renderPlaneA(dst, vram, cram);

    // 4. 渲染精灵
    this.sprite.renderSprites(dst, vram, cram);

    // 5. 将 framebuffer 复制到 ImageData (通过 ctx.createImageData 兼容小程序)
    const imageData = ctx.createImageData(DISPLAY.WIDTH, DISPLAY.HEIGHT);
    imageData.data.set(this.framebuffer);

    return imageData;
  }

  /**
   * 填充背景色
   * VDP reg $07 指定 palette 0 color 0 作为背景
   * 或使用 CRAM[0] 的背景色部分
   */
  private fillBackground(dst: Uint8ClampedArray): void {
    const bgIdx = this.vdp.backgroundColor;
    const rawColor = this.vdp.cram.getColor(bgIdx);
    const rgba = Cram.toRGBA(rawColor);

    const totalPixels = DISPLAY.WIDTH * DISPLAY.HEIGHT;
    for (let i = 0; i < totalPixels; i++) {
      const off = i * 4;
      dst[off]     = rgba.r;
      dst[off + 1] = rgba.g;
      dst[off + 2] = rgba.b;
      dst[off + 3] = rgba.a;
    }
  }

  /** 获取 framebuffer 直接引用 (性能优化) */
  getFrameBuffer(): Uint8ClampedArray {
    return this.framebuffer;
  }

  /** 获取 ImageData (需要传入 Canvas 上下文) */
  getImageData(ctx: CanvasRenderingContext2D): ImageData {
    const imageData = ctx.createImageData(DISPLAY.WIDTH, DISPLAY.HEIGHT);
    imageData.data.set(this.framebuffer);
    return imageData;
  }
}
