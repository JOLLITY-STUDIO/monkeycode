/**
 * Web 平台适配器 - 使用标准浏览器 API
 */
import type { IPlatform, ICanvas, ICanvasContext, ICanvasImageSource, IImageData } from '../IPlatform';

/** 包装 HTMLCanvasElement */
class WebCanvas implements ICanvas {
  constructor(private _canvas: HTMLCanvasElement | OffscreenCanvas) {}

  get width(): number { return this._canvas.width; }
  set width(v: number) { this._canvas.width = v; }
  get height(): number { return this._canvas.height; }
  set height(v: number) { this._canvas.height = v; }

  getContext(contextType: '2d'): ICanvasContext | null {
    const raw = this._canvas.getContext('2d');
    if (!raw) return null;
    // CanvasRenderingContext2D 直接就是 ICanvasContext 的超集
    return raw as unknown as ICanvasContext;
  }

  /** 获取原始元素（web 专用） */
  get raw(): HTMLCanvasElement | OffscreenCanvas {
    return this._canvas;
  }
}

/** 包装 ImageData */
class WebImageData implements IImageData {
  constructor(private _imgData: globalThis.ImageData) {}
  get width(): number { return this._imgData.width; }
  get height(): number { return this._imgData.height; }
  get data(): Uint8ClampedArray { return this._imgData.data; }
}

export class WebPlatform implements IPlatform {
  readonly name = 'web';

  createOffscreenCanvas(width: number, height: number): ICanvas {
    let c: HTMLCanvasElement | OffscreenCanvas;
    if (typeof OffscreenCanvas !== 'undefined') {
      c = new OffscreenCanvas(width, height);
    } else {
      c = document.createElement('canvas');
      c.width = width;
      c.height = height;
    }
    return new WebCanvas(c);
  }

  async loadImage(url: string): Promise<ICanvasImageSource> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
      img.src = url;
    });
  }

  requestAnimationFrame(callback: (timestamp: number) => void): number {
    return window.requestAnimationFrame(callback);
  }

  cancelAnimationFrame(handle: number): void {
    window.cancelAnimationFrame(handle);
  }

  now(): number {
    return performance.now();
  }
}
