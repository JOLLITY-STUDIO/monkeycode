/**
 * 平台抽象接口 - 隔离 web / 微信小程序差异
 *
 * 游戏核心只依赖此接口，不直接使用任何平台 API。
 * web 和小程序各自实现此接口注入到 Tsubasa 中。
 */

/** 平台支持的 Canvas 渲染上下文（web CanvasRenderingContext2D 和小程序 CanvasRenderingContext2D 的公共子集）
 *
 * 注意：微信小程序 CanvasRenderingContext2D 没有 .canvas 属性，
 * 所以 canvas 是可选的。需要 canvas 尺寸时请从外部传入。
 */
export interface ICanvasContext {
  /** canvas 元素回引（web 有，小程序无） */
  readonly canvas?: ICanvas;
  imageSmoothingEnabled: boolean;
  fillStyle: string | CanvasGradient | CanvasPattern;
  font: string;
  fillRect(x: number, y: number, w: number, h: number): void;
  fillText(text: string, x: number, y: number, maxWidth?: number): void;
  drawImage(image: ICanvasImageSource, sx: number, sy: number, sw: number, sh: number,
            dx: number, dy: number, dw: number, dh: number): void;
  drawImage(image: ICanvasImageSource, dx: number, dy: number): void;
  getImageData(sx: number, sy: number, sw: number, sh: number): IImageData;
  putImageData(imagedata: IImageData, dx: number, dy: number): void;
  save(): void;
  restore(): void;
  translate(x: number, y: number): void;
  scale(x: number, y: number): void;
}

/** Canvas 元素抽象 */
export interface ICanvas {
  width: number;
  height: number;
  getContext(contextType: '2d'): ICanvasContext | null;
}

/** 图片数据抽象 */
export interface IImageData {
  readonly width: number;
  readonly height: number;
  readonly data: Uint8ClampedArray;
}

/** 可作为 drawImage 源的抽象 */
export interface ICanvasImageSource {
  width: number;
  height: number;
}

/** 平台适配器 - 封装所有平台差异 */
export interface IPlatform {
  /** 创建离屏 canvas (用于离屏渲染) */
  createOffscreenCanvas(width: number, height: number): ICanvas;

  /** 加载图片资源，返回可用于 drawImage 的对象 */
  loadImage(url: string): Promise<ICanvasImageSource>;

  /** 请求动画帧，返回句柄 */
  requestAnimationFrame(callback: (timestamp: number) => void): number;

  /** 取消动画帧 */
  cancelAnimationFrame(handle: number): void;

  /** 获取当前高精度时间戳 (ms) */
  now(): number;

  /** 平台名称 (调试用) */
  readonly name: string;
}
