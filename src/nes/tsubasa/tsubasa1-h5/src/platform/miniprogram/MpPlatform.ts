/**
 * 微信小程序平台适配器
 *
 * 使用微信小程序 Canvas 2D API (<canvas type="2d">)
 * 参考文档: https://developers.weixin.qq.com/miniprogram/dev/component/canvas.html
 */

declare const wx: any;

import type {
  IPlatform, ICanvas, ICanvasContext, ICanvasImageSource, IImageData,
  IPlatformAudioContext, IPlatformOscillatorNode, IPlatformGainNode,
  IPlatformBufferSourceNode, IPlatformAudioBuffer, IPlatformAudioParam,
  IPlatformAudioNode, IPlatformAudioDestination,
} from '../IPlatform';

/** 包装小程序 Canvas 对象 */
class MpCanvas implements ICanvas {
  constructor(private _canvas: any) {}

  get width(): number { return this._canvas.width; }
  set width(v: number) { this._canvas.width = v; }
  get height(): number { return this._canvas.height; }
  set height(v: number) { this._canvas.height = v; }

  getContext(contextType: '2d'): ICanvasContext | null {
    const raw = this._canvas.getContext('2d');
    if (!raw) return null;
    return raw as unknown as ICanvasContext;
  }

  get raw(): any {
    return this._canvas;
  }
}

/** 包装小程序 Image 对象 */
class MpImage implements ICanvasImageSource {
  private _img: any;

  constructor(img: any) {
    this._img = img;
    this.width = img.width;
    this.height = img.height;
  }

  width: number;
  height: number;

  get raw(): any { return this._img; }
}

/** 包装小程序 ImageData */
class MpImageData implements IImageData {
  constructor(private _imgData: any) {}
  get width(): number { return this._imgData.width; }
  get height(): number { return this._imgData.height; }
  get data(): Uint8ClampedArray { return this._imgData.data; }
}

export class MpPlatform implements IPlatform {
  readonly name = 'miniprogram';

  /** 主 canvas 引用（由外部设置，用于 requestAnimationFrame 和 createImage） */
  private _mainCanvas: any = null;

  /** 离屏 canvas 引用（用于 createImage） */
  private _offscreenCanvas: any = null;

  /** 定时器回退时的 handle 集合 */
  private _timerHandles: Map<number, number> = new Map();
  private _timerIdSeq: number = 1;

  /** RAF 诊断计数器 */
  private _rafCallCount: number = 0;
  private _rafFallbackActive: boolean = false;

  /** 设置主 canvas（在 game.ts 中调用，用于 RAF） */
  setMainCanvas(canvas: any): void {
    this._mainCanvas = canvas;
  }

  /** 小程序离屏 canvas (使用 wx.createOffscreenCanvas) */
  createOffscreenCanvas(width: number, height: number): ICanvas {
    let c: any;
    if (typeof wx !== 'undefined' && typeof wx.createOffscreenCanvas === 'function') {
      c = wx.createOffscreenCanvas({ type: '2d', width, height });
      console.log('[MpPlatform] OffscreenCanvas created:', width, 'x', height);
    } else {
      throw new Error(
        'MpPlatform.createOffscreenCanvas requires wx.createOffscreenCanvas. ' +
        'Please upgrade WeChat base library to 2.16.1+ or provide a pre-created canvas.'
      );
    }
    // 保存引用用于 createImage
    this._offscreenCanvas = c;
    return new MpCanvas(c);
  }

  /** 加载图片资源 - 使用离屏 canvas.createImage() */
  async loadImage(url: string): Promise<ICanvasImageSource> {
    return new Promise((resolve, reject) => {
      // 优先使用离屏 canvas.createImage()，其次使用主 canvas
      const canvas = this._offscreenCanvas || this._mainCanvas;
      let img: any;

      if (canvas && typeof canvas.createImage === 'function') {
        img = canvas.createImage();
        console.log(`[MpPlatform] Loading image: ${url} (via ${this._offscreenCanvas ? 'offscreen' : 'main'} canvas)`);
      } else {
        // 最终回退：纯 JS 模拟（无法真正加载图片，但避免崩溃）
        console.warn('[MpPlatform] No canvas available for createImage, image loading disabled');
        console.warn('[MpPlatform] _offscreenCanvas:', !!this._offscreenCanvas, '_mainCanvas:', !!this._mainCanvas);
        reject(new Error('No canvas reference for image loading'));
        return;
      }

      img.onload = () => {
        console.log(`[MpPlatform] Image loaded: ${url} (${img.width}x${img.height})`);
        resolve(new MpImage(img));
      };
      img.onerror = (err: any) => {
        console.error(`[MpPlatform] Image load FAILED: ${url}`, err);
        reject(new Error(`Failed to load image: ${url} - ${JSON.stringify(err || 'unknown error')}`));
      };
      img.src = url;
    });
  }

  requestAnimationFrame(callback: (timestamp: number) => void): number {
    // 使用主 canvas 的 requestAnimationFrame
    if (this._mainCanvas && typeof this._mainCanvas.requestAnimationFrame === 'function') {
      this._rafFallbackActive = false;
      const wrappedCallback = (timestamp: number) => {
        this._rafCallCount++;
        if (this._rafCallCount <= 3) {
          console.log(`[MpPlatform] RAF fired #${this._rafCallCount} via canvas, ts=${timestamp}`);
        }
        callback(timestamp);
      };
      return this._mainCanvas.requestAnimationFrame(wrappedCallback);
    }
    // 回退到 setInterval 模拟 (~60fps, 1000/60≈16.667 → 取17ms)
    if (!this._rafFallbackActive) {
      console.warn('[MpPlatform] canvas.requestAnimationFrame not available, falling back to setInterval(17ms)');
      this._rafFallbackActive = true;
    }
    const id = this._timerIdSeq++;
    const handle = setInterval(() => {
      callback(Date.now());
    }, 17) as unknown as number;
    this._timerHandles.set(id, handle);
    return id;
  }

  cancelAnimationFrame(handle: number): void {
    if (this._mainCanvas && typeof this._mainCanvas.cancelAnimationFrame === 'function') {
      this._mainCanvas.cancelAnimationFrame(handle);
      return;
    }
    // 回退定时器清理
    const timerHandle = this._timerHandles.get(handle);
    if (timerHandle !== undefined) {
      clearInterval(timerHandle);
      this._timerHandles.delete(handle);
    }
  }

  now(): number {
    return Date.now();
  }

  /** 🆕 创建音频上下文 */
  createAudioContext(): IPlatformAudioContext | null {
    // 优先使用微信小程序 WebAudio API (基础库 2.19.0+)
    if (typeof wx !== 'undefined' && typeof wx.createWebAudioContext === 'function') {
      try {
        const rawCtx = wx.createWebAudioContext();
        console.log('[MpPlatform] WebAudioContext created via wx.createWebAudioContext');
        return new MpAudioContext(rawCtx);
      } catch (e) {
        console.warn('[MpPlatform] wx.createWebAudioContext failed, audio disabled:', e);
      }
    }
    // 尝试标准 Web Audio API (有些小程序基础库支持)
    if (typeof wx !== 'undefined' && typeof wx.createInnerAudioContext === 'function') {
      console.warn('[MpPlatform] WebAudioContext not available, InnerAudioContext exists but not suitable for APU simulation');
    }
    return null;
  }
}

// ═══════════════════════════════════════════════
// 🆕 微信小程序音频上下文适配器
// 将 wx.createWebAudioContext 包装为 IPlatformAudioContext
// ═══════════════════════════════════════════════

class MpAudioParam implements IPlatformAudioParam {
  private _param: any; // 实际的 AudioParam 对象

  constructor(target: any, prop: string) {
    // 提取 AudioParam 对象本身（如 gainNode.gain、oscNode.frequency）
    // 而不是在父节点上通过属性名间接操作
    this._param = target[prop];
  }

  get value(): number {
    // AudioParam.value 可能也有 getter，尝试直接读取
    return this._param?.value ?? 0;
  }

  set value(v: number) {
    if (this._param) {
      // 在微信小程序中，GainNode.gain 是只读属性（getter-only），
      // 不能直接替换父节点上的属性。必须通过 AudioParam 对象的 .value 来设置。
      try {
        this._param.value = v;
      } catch (e) {
        // 如果 .value 也是只读，回退到 setValueAtTime
        this._param.setValueAtTime?.(v, 0);
      }
    }
  }

  setValueAtTime(v: number, t: number): void {
    this._param?.setValueAtTime?.(v, t);
  }

  linearRampToValueAtTime(v: number, t: number): void {
    this._param?.linearRampToValueAtTime?.(v, t);
  }
}

class MpOscillatorNode implements IPlatformOscillatorNode {
  private _node: any;
  frequency: IPlatformAudioParam;
  private _type: OscillatorType = 'sine';

  constructor(node: any) {
    this._node = node;
    this.frequency = new MpAudioParam(node, 'frequency');
  }

  get type(): OscillatorType { return this._type; }
  set type(v: OscillatorType) { this._type = v; this._node.type = v; }

  connect(dest: IPlatformAudioNode): void { this._node.connect((dest as any).__raw); }
  disconnect(): void { this._node.disconnect?.(); }
  start(time?: number): void { this._node.start?.(time ?? 0); }
  stop(time?: number): void { this._node.stop?.(time ?? 0); }
}

class MpGainNode implements IPlatformGainNode {
  private _node: any;
  gain: IPlatformAudioParam;

  constructor(node: any) {
    this._node = node;
    this.gain = new MpAudioParam(node, 'gain');
  }

  get __raw(): any { return this._node; }
  connect(dest: IPlatformAudioNode): void { this._node.connect((dest as any).__raw); }
  disconnect(): void { this._node.disconnect?.(); }
}

class MpBufferSourceNode implements IPlatformBufferSourceNode {
  private _node: any;
  buffer: IPlatformAudioBuffer | null = null;
  loop: boolean = false;

  constructor(node: any) {
    this._node = node;
  }

  set buffer(v: IPlatformAudioBuffer | null) { this._node.buffer = (v as any)?.__raw ?? null; }
  get buffer(): IPlatformAudioBuffer | null { return (this._node.buffer ? new MpAudioBuffer(this._node.buffer) : null); }

  connect(dest: IPlatformAudioNode): void { this._node.connect((dest as any).__raw); }
  disconnect(): void { this._node.disconnect?.(); }
  start(time?: number): void { this._node.start?.(time ?? 0); }
  stop(time?: number): void { this._node.stop?.(time ?? 0); }
}

class MpAudioBuffer implements IPlatformAudioBuffer {
  private _buffer: any;

  constructor(buffer: any) {
    this._buffer = buffer;
  }

  get __raw(): any { return this._buffer; }
  getChannelData(channel: number): Float32Array { return this._buffer.getChannelData(channel); }
}

class MpAudioDestination implements IPlatformAudioDestination {
  constructor(private _node: any) {}
  get __raw(): any { return this._node; }
}

class MpAudioContext implements IPlatformAudioContext {
  private _ctx: any;
  sampleRate: number;
  destination: IPlatformAudioDestination;

  constructor(rawCtx: any) {
    this._ctx = rawCtx;
    this.sampleRate = rawCtx.sampleRate;
    this.destination = new MpAudioDestination(rawCtx.destination);
  }

  get currentTime(): number { return this._ctx.currentTime; }

  createOscillator(): IPlatformOscillatorNode {
    return new MpOscillatorNode(this._ctx.createOscillator());
  }

  createGain(): IPlatformGainNode {
    return new MpGainNode(this._ctx.createGain());
  }

  createBufferSource(): IPlatformBufferSourceNode {
    return new MpBufferSourceNode(this._ctx.createBufferSource());
  }

  createBuffer(numChannels: number, length: number, sampleRate: number): IPlatformAudioBuffer {
    return new MpAudioBuffer(this._ctx.createBuffer(numChannels, length, sampleRate));
  }
}
