/**
 * Web 平台适配器
 *
 * 为浏览器环境提供:
 * - HTML Canvas 渲染
 * - Web Audio API 音频
 * - 键盘输入
 *
 * 对应原始 tsnes_kernel.ts 中的 Web/浏览器相关逻辑。
 */

/**
 * Web 适配器配置
 */
export interface WebAdapterConfig {
  /** HTML Canvas 元素 */
  canvas: HTMLCanvasElement;
}

/**
 * Web 适配器
 *
 * 封装浏览器特有的 API 调用。
 */
export class WebAdapter {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private imageData: ImageData;
  private audioCtx: AudioContext | null = null;
  private audioNode: ScriptProcessorNode | null = null;

  /** 帧缓冲 (256×240 Uint32Array) */
  frameBuffer: Uint32Array | null = null;

  /** 按钮状态 */
  private buttons = 0;

  constructor(config: WebAdapterConfig) {
    this.canvas = config.canvas;
    const ctx = this.canvas.getContext('2d');
    if (!ctx) throw new Error('[web-adapter] Cannot get 2d context');
    this.ctx = ctx;
    this.ctx.imageSmoothingEnabled = false;
    this.imageData = this.ctx.createImageData(256, 240);

    // 键盘事件绑定
    this._bindKeyboard();
  }

  /** 接收 PPU 帧缓冲 */
  writeFrame(buffer: Uint32Array): void {
    this.frameBuffer = buffer;
  }

  /** 渲染到 Canvas */
  renderToCanvas(): void {
    if (!this.frameBuffer) return;
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
      this.audioCtx = new AudioContext({ sampleRate: 48000 });
    } catch (e: any) {
      console.warn('[web-adapter] AudioContext unavailable:', e.message);
    }
  }

  /** 停止音频 */
  stopAudio(): void {
    if (this.audioNode) {
      this.audioNode.disconnect();
      this.audioNode = null;
    }
    if (this.audioCtx) {
      this.audioCtx.close();
      this.audioCtx = null;
    }
  }

  /** 获取当前按钮状态 (位掩码) */
  getButtons(): number {
    return this.buttons;
  }

  /** 键盘绑定 */
  private _bindKeyboard(): void {
    const self = this;

    // NES 手柄位定义: A,B,Select,Start,Up,Down,Left,Right
    document.addEventListener('keydown', (e) => {
      switch (e.code) {
        case 'KeyZ': self.buttons |= 0x01; break;    // A
        case 'KeyX': self.buttons |= 0x02; break;    // B
        case 'ShiftRight': self.buttons |= 0x04; break; // Select
        case 'Enter': self.buttons |= 0x08; break;   // Start
        case 'ArrowUp': self.buttons |= 0x10; break; // Up
        case 'ArrowDown': self.buttons |= 0x20; break; // Down
        case 'ArrowLeft': self.buttons |= 0x40; break; // Left
        case 'ArrowRight': self.buttons |= 0x80; break; // Right
      }
    });

    document.addEventListener('keyup', (e) => {
      switch (e.code) {
        case 'KeyZ': self.buttons &= ~0x01; break;
        case 'KeyX': self.buttons &= ~0x02; break;
        case 'ShiftRight': self.buttons &= ~0x04; break;
        case 'Enter': self.buttons &= ~0x08; break;
        case 'ArrowUp': self.buttons &= ~0x10; break;
        case 'ArrowDown': self.buttons &= ~0x20; break;
        case 'ArrowLeft': self.buttons &= ~0x40; break;
        case 'ArrowRight': self.buttons &= ~0x80; break;
      }
    });
  }

  /** 销毁 */
  destroy(): void {
    this.stopAudio();
    this.frameBuffer = null;
  }
}
