/**
 * MpScreen — 微信小程序版画布屏幕（canvas type=2d）
 *
 * 对齐 src/core/browser/screen.ts 的接口（即插即用）：
 *   setBuffer(buffer)  写入 256×240 帧缓冲（Uint32 0x00RRGGBB → 全 alpha）
 *   writeBuffer()      提交 ImageData → putImageData
 *   fitInParent()      自动等比适配父容器（保持 256:240，取最大内接矩形）
 *   onTouchStart/End   触摸坐标映射到 256×240 游戏坐标（参考 browser zapper）
 *
 * 与 browser 版差异：
 *  - 小程序 canvas 节点由 WXML 声明，构造时直接传入 node（无需 createElement）
 *  - 显示尺寸通过 onResize 回调同步到页面 setData（WXML 内联 style 绑定），
 *    同时尝试直接写 node.style，双保险
 */
const SCREEN_WIDTH = 256;
const SCREEN_HEIGHT = 240;

export interface MpScreenOptions {
  onTouchStart?: (x: number, y: number) => void;
  onTouchEnd?: () => void;
  /** 获取父容器尺寸（px），fitInParent 自动等比适配时使用 */
  getContainerSize?: () => Promise<{ width: number; height: number }>;
  /** 适配后 canvas 显示尺寸变化（页面 setData 同步 WXML 内联 style） */
  onResize?: (width: number, height: number) => void;
}

export default class MpScreen {
  readonly canvas: any;
  readonly context: any;
  readonly imageData: any;
  buf!: ArrayBuffer;
  buf8!: Uint8ClampedArray;
  buf32!: Uint32Array;
  onTouchStart?: (x: number, y: number) => void;
  onTouchEnd?: () => void;

  private _getContainerSize?: () => Promise<{ width: number; height: number }>;
  private _onResize?: (width: number, height: number) => void;
  private _fitWidth = SCREEN_WIDTH;
  private _fitHeight = SCREEN_HEIGHT;
  private _touchHandlers: Array<{ type: string; handler: (e: any) => void }> = [];

  constructor(canvas: any, options: MpScreenOptions = {}) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.imageData = this.context.createImageData(SCREEN_WIDTH, SCREEN_HEIGHT);
    this.onTouchStart = options.onTouchStart;
    this.onTouchEnd = options.onTouchEnd;
    this._getContainerSize = options.getContainerSize;
    this._onResize = options.onResize;

    // 内部像素尺寸 256×240（与 browser 版一致；显示尺寸由 WXML 内联 style 决定）
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;

    // 初始黑屏
    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

    // 帧缓冲（alpha 预置不透明）
    this.buf = new ArrayBuffer(this.imageData.data.length);
    this.buf8 = new Uint8ClampedArray(this.buf);
    this.buf32 = new Uint32Array(this.buf);
    for (let i = 0; i < this.buf32.length; ++i) {
      this.buf32[i] = 0xff000000;
    }

    this._bindTouch();
  }

  /** 写入一帧像素（0x00RRGGBB → 0xFFRRGGBB，全 alpha） */
  setBuffer = (buffer: Uint32Array): void => {
    for (let y = 0; y < SCREEN_HEIGHT; ++y) {
      for (let x = 0; x < SCREEN_WIDTH; ++x) {
        const i = y * SCREEN_WIDTH + x;
        this.buf32[i] = 0xff000000 | buffer[i];
      }
    }
  };

  /** 提交帧缓冲到画布 */
  writeBuffer = (): void => {
    this.imageData.data.set(this.buf8);
    this.context.putImageData(this.imageData, 0, 0);
  };

  /**
   * 自动等比适配父容器（fitInParent）
   * 保持 256:240 比例，取父容器内最大内接矩形，居中显示。
   */
  fitInParent = async (): Promise<void> => {
    if (!this._getContainerSize) return;
    const { width, height } = await this._getContainerSize();
    if (!width || !height) return;
    const parentRatio = width / height;
    const desiredRatio = SCREEN_WIDTH / SCREEN_HEIGHT;
    let w: number;
    let h: number;
    if (desiredRatio < parentRatio) {
      h = Math.floor(height);
      w = Math.floor(height * desiredRatio);
    } else {
      w = Math.floor(width);
      h = Math.floor(width / desiredRatio);
    }
    this._fitWidth = w;
    this._fitHeight = h;
    // 双保险：节点 style + onResize（WXML 内联 style 绑定）
    try {
      this.canvas.style.width = `${w}px`;
      this.canvas.style.height = `${h}px`;
    } catch {
      /* 节点 style 不可用时依赖 onResize */
    }
    if (this._onResize) this._onResize(w, h);
  };

  /** 触摸 → 256×240 游戏坐标 */
  private _mapTouch(e: any): { x: number; y: number } {
    const t = e && e.touches && e.touches[0];
    if (!t) return { x: 0, y: 0 };
    const sx = t.x ?? 0;
    const sy = t.y ?? 0;
    const x = Math.round((sx / this._fitWidth) * SCREEN_WIDTH);
    const y = Math.round((sy / this._fitHeight) * SCREEN_HEIGHT);
    return {
      x: Math.min(SCREEN_WIDTH - 1, Math.max(0, x)),
      y: Math.min(SCREEN_HEIGHT - 1, Math.max(0, y)),
    };
  }

  private _bindTouch(): void {
    const onStart = (e: any) => {
      if (!this.onTouchStart) return;
      const { x, y } = this._mapTouch(e);
      this.onTouchStart(x, y);
    };
    const onEnd = () => {
      if (this.onTouchEnd) this.onTouchEnd();
    };
    this._touchHandlers = [
      { type: 'touchstart', handler: onStart },
      { type: 'touchend', handler: onEnd },
      { type: 'touchcancel', handler: onEnd },
    ];
    for (const h of this._touchHandlers) {
      this.canvas.addEventListener(h.type, h.handler);
    }
  }

  destroy(): void {
    for (const h of this._touchHandlers) {
      this.canvas.removeEventListener(h.type, h.handler);
    }
    this._touchHandlers = [];
  }
}
