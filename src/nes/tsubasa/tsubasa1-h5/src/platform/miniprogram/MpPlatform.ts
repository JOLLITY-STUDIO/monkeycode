/**
 * 微信小程序平台适配器
 *
 * 使用微信小程序 Canvas 2D API (<canvas type="2d">)
 * 参考文档: https://developers.weixin.qq.com/miniprogram/dev/component/canvas.html
 */

declare const wx: any;

import type { IPlatform, ICanvas, ICanvasContext, ICanvasImageSource, IImageData } from '../IPlatform';

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

  /** 设置主 canvas（在 game.ts 中调用，用于 RAF） */
  setMainCanvas(canvas: any): void {
    this._mainCanvas = canvas;
  }

  /** 小程序离屏 canvas (使用 wx.createOffscreenCanvas 或普通 canvas) */
  createOffscreenCanvas(width: number, height: number): ICanvas {
    let c: any;
    if (typeof wx !== 'undefined' && typeof wx.createOffscreenCanvas === 'function') {
      c = wx.createOffscreenCanvas({ type: '2d', width, height });
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
      } else {
        // 最终回退：纯 JS 模拟（无法真正加载图片，但避免崩溃）
        console.warn('[MpPlatform] No canvas available for createImage, image loading disabled');
        reject(new Error('No canvas reference for image loading'));
        return;
      }

      img.onload = () => {
        resolve(new MpImage(img));
      };
      img.onerror = (err: any) => {
        reject(new Error(`Failed to load image: ${url} - ${JSON.stringify(err || 'unknown error')}`));
      };
      img.src = url;
    });
  }

  requestAnimationFrame(callback: (timestamp: number) => void): number {
    // 使用主 canvas 的 requestAnimationFrame
    if (this._mainCanvas && typeof this._mainCanvas.requestAnimationFrame === 'function') {
      return this._mainCanvas.requestAnimationFrame(callback);
    }
    // 回退到 setInterval 模拟 (约60fps)
    const id = this._timerIdSeq++;
    const handle = setInterval(() => {
      callback(Date.now());
    }, 16) as unknown as number;
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
}
