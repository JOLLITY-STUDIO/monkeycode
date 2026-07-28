/**
 * 微信小程序平台适配器
 *
 * 为微信小程序提供:
 * - Canvas 渲染 (通过 wx.createOffscreenCanvas 或组件 canvas)
 * - 音频 (通过 wx.createWebAudioContext / InnerAudioContext)
 * - 输入 (触摸 → 虚拟手柄映射)
 * - 文件系统 (存档读写)
 *
 * 对应原始 tsnes_kernel.ts 中的微信相关逻辑。
 */

/**
 * 微信小程序适配器配置
 */
export interface MpAdapterConfig {
  /** Canvas 组件实例 */
  canvas: any;
  /** Canvas 上下文 */
  ctx: any;
  /** 每帧回调 */
  onFrame: (framebuffer: Uint32Array) => void;
}

/**
 * 微信小程序适配器
 *
 * 封装微信特有的 API 调用，提供与 web-adapter 一致的接口。
 */
export class MpAdapter {
  private canvas: any;
  private ctx: any;
  private audioCtx: any = null;
  private audioNode: any = null;

  /** 帧缓冲 (256×240 Uint32Array) */
  frameBuffer: Uint32Array | null = null;

  /** ImageData 缓存 */
  private imageData: any = null;

  /** 按钮状态掩码 */
  private buttons = 0;

  constructor(config: MpAdapterConfig) {
    this.canvas = config.canvas;
    this.ctx = config.ctx;
    this.ctx.imageSmoothingEnabled = false;
  }

  /** 接收 PPU 帧缓冲 */
  writeFrame(buffer: Uint32Array): void {
    this.frameBuffer = buffer;
  }

  /** 渲染到 Canvas */
  renderToCanvas(): void {
    if (!this.ctx || !this.frameBuffer) return;

    // 创建 ImageData (微信小程序兼容)
    if (!this.imageData) {
      this.imageData = this.ctx.createImageData(256, 240);
    }

    const buf32 = new Uint32Array(this.imageData.data.buffer);
    const fb = this.frameBuffer;
    for (let i = 0; i < 256 * 240; i++) {
      buf32[i] = fb[i] | 0xFF000000;
    }
    this.ctx.putImageData(this.imageData, 0, 0);
  }

  /** 启动音频 */
  startAudio(): void {
    try {
      this.audioCtx = wx.createWebAudioContext();
      // 音频管线将在后续版本中完善
    } catch (e: any) {
      console.warn('[mp-adapter] WebAudioContext unavailable:', e.message);
    }
  }

  /** 停止音频 */
  stopAudio(): void {
    if (this.audioNode) {
      try { this.audioNode.disconnect(); } catch (_) {}
      this.audioNode = null;
    }
    if (this.audioCtx) {
      try { this.audioCtx.close(); } catch (_) {}
      this.audioCtx = null;
    }
  }

  /** 设置手柄输入 (位掩码) */
  setButtons(mask: number): void {
    this.buttons = mask;
  }

  /** 获取当前按钮状态 */
  getButtons(): number {
    return this.buttons;
  }

  /** 销毁 */
  destroy(): void {
    this.stopAudio();
    this.frameBuffer = null;
    this.imageData = null;
  }
}
