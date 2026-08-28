const SCREEN_WIDTH = 256;
const SCREEN_HEIGHT = 240;

import type { VideoScaler } from "./scalers/VideoScaler";
import { getScaler } from "./scalers";
import type { VideoConfig } from "../../option";
import { getAspectRatio } from "../../option";

interface ScreenOptions {
  onMouseDown?: (x: number, y: number) => void;
  onMouseUp?: () => void;
  /** 初始 scaler. 不传则用 identity (1x). */
  initialScaler?: VideoScaler;
}

export default class Screen {
  onMouseDown?: (x: number, y: number) => void;
  onMouseUp?: () => void;
  canvas!: HTMLCanvasElement;
  context!: CanvasRenderingContext2D;
  imageData!: ImageData;
  buf!: ArrayBuffer;
  buf8!: Uint8ClampedArray;
  buf32!: Uint32Array;

  /**
   * 缩放后输出 buffer (RGBA8888).
   * 当 scaler = identity (1x) 时, 与 buf32 长度一致, 但保留独立变量方便 hot-swap scaler.
   * 当 scaler = HQ3X (3x) 时, 长度 = 256*240*9 = 552960.
   */
  scaledBuf32!: Uint32Array;
  /** 当前 scaler (驱动 scaledBuf32 维度 + apply 行为) */
  currentScaler!: VideoScaler;

  private _handleMouseDown!: (e: MouseEvent) => void;
  private _handleMouseUp!: () => void;
  private _ro?: ResizeObserver;

  constructor(container: HTMLElement, options: ScreenOptions = {}) {
    this.onMouseDown = options.onMouseDown;
    this.onMouseUp = options.onMouseUp;

    // Create canvas element - 初始 256x240, applyScaler() 会按需 resize
    this.canvas = document.createElement("canvas");
    this.canvas.width = SCREEN_WIDTH;
    this.canvas.height = SCREEN_HEIGHT;
    (this.canvas.style as any).imageRendering = "pixelated";
    (this.canvas.style as any).imageRendering = "crisp-edges";
    container.appendChild(this.canvas);

    // Mouse events for Zapper support
    this._handleMouseDown = (e: MouseEvent) => {
      if (!this.onMouseDown) return;
      let scale = this.canvas.width / parseFloat(this.canvas.style.width || `${this.canvas.width}`);
      let rect = this.canvas.getBoundingClientRect();
      let x = Math.round((e.clientX - rect.left) * scale);
      let y = Math.round((e.clientY - rect.top) * scale);
      this.onMouseDown(x, y);
    };
    this._handleMouseUp = () => {
      if (this.onMouseUp) this.onMouseUp();
    };
    this.canvas.addEventListener("mousedown", this._handleMouseDown);
    this.canvas.addEventListener("mouseup", this._handleMouseUp);

    // 初始化 scaler + buffers
    this.currentScaler = options.initialScaler || getScaler("none");
    this._initBuffers(this.currentScaler.scale);
    this._initCanvas();

    // 监听父容器 resize (autoScaleOnResize 时需要响应)
    if (typeof ResizeObserver !== "undefined") {
      this._ro = new ResizeObserver(() => {
        // 这里仅在 Browser 调用 fitInParent() 时生效.
        // Browser 通过 _videoConfigStorage.onChange 触发 fitInParent().
        // 单独自定义行为 (override 默认 fitInParent) 可在 caller 处理.
      });
      this._ro.observe(container);
    }
  }

  private _initBuffers(scale: 1 | 2 | 3): void {
    const dstW = SCREEN_WIDTH * scale;
    const dstH = SCREEN_HEIGHT * scale;
    const dstSize = dstW * dstH;
    this.scaledBuf32 = new Uint32Array(dstSize);
  }

  private _initCanvas(): void {
    this.context = this.canvas.getContext("2d")!;
    const initW = this.canvas.width;
    const initH = this.canvas.height;
    this.imageData = this.context.createImageData(initW, initH);
    this.context.fillStyle = "black";
    this.context.fillRect(0, 0, initW, initH);

    // CPU-side buffer to write on next animation frame
    this.buf = new ArrayBuffer(this.imageData.data.length);
    this.buf8 = new Uint8ClampedArray(this.buf);
    this.buf32 = new Uint32Array(this.buf);

    // Set alpha 全 FF
    for (var i = 0; i < this.buf32.length; ++i) {
      this.buf32[i] = 0xff000000;
    }
  }

  /**
   * Hot-swap scaler. ⚠️ 与 setBuffer 在同一帧同时调用未定义, 单线程 JS 实际安全.
   * 应在 frame 间隙调用 (例如 configChange listener 里).
   */
  setScaler(scaler: VideoScaler): void {
    const newScale = scaler.scale;
    const oldScale = this.currentScaler.scale;
    if (newScale === oldScale) {
      this.currentScaler = scaler;
      return;
    }
    // 重新分配 scaledBuf32 + canvas
    this.currentScaler = scaler;
    this._initBuffers(newScale);
    this.canvas.width = SCREEN_WIDTH * newScale;
    this.canvas.height = SCREEN_HEIGHT * newScale;
    this._initCanvas();
  }

  /**
   * 写入 PPU frame buffer (256*240 RGBA8888).
   * 自动应用 currentScaler (HQ3X 等).
   * 调用方 (NES onFrame) 一帧调一次.
   */
  setBuffer = (buffer: Uint32Array): void => {
    const scale = this.currentScaler.scale;
    if (scale === 1) {
      // 直接复制 (加 alpha)
      for (var i = 0; i < buffer.length; ++i) {
        this.scaledBuf32[i] = 0xff000000 | buffer[i];
      }
    } else {
      // 经 scaler 升采样
      this.currentScaler.apply(
        buffer as Uint32Array,
        this.scaledBuf32,
        SCREEN_WIDTH,
        SCREEN_HEIGHT,
        SCREEN_WIDTH * scale,
        SCREEN_HEIGHT * scale,
      );
    }
  };

  /**
   * 把 scaledBuf32 写到 ImageData + putImageData.
   * OnFrame 流程结束 / FrameTimer 调一次.
   * ImageData 与 canvas 维度匹配 (scaler 已生效).
   */
  writeBuffer = (): void => {
    // copy scaledBuf32 (RGBA8888) 到 buf8 (Uint8ClampedArray)
    this.buf32.set(this.scaledBuf32);
    this.imageData.data.set(this.buf8);
    this.context.putImageData(this.imageData, 0, 0);
  };

  /**
   * Auto-fit: 按整数倍 fit 到父容器, 保持画布宽高比.
   * 类似 fceux autoScaleCbx=true 行为.
   */
  fitInParent = (): void => {
    let parent = this.canvas.parentNode as HTMLElement;
    if (!parent) return;
    let parentWidth = parent.clientWidth;
    let parentHeight = parent.clientHeight;
    let desiredRatio = this.canvas.width / this.canvas.height;
    if (parentWidth === 0 || parentHeight === 0) return;
    if (desiredRatio < parentWidth / parentHeight) {
      this.canvas.style.width = `${Math.round(parentHeight * desiredRatio)}px`;
      this.canvas.style.height = `${parentHeight}px`;
    } else {
      this.canvas.style.width = `${parentWidth}px`;
      this.canvas.style.height = `${Math.round(parentWidth / desiredRatio)}px`;
    }
  };

  /**
   * 应用 VideoConfig 决定 CSS 尺寸 (与 RenderScaler._applyCssSize 一致逻辑).
   * Browser 在 onChange 时调这个.
   *
   * 优先级:
   *   1. autoScaleOnResize=true → fitInParent 整数倍 fit
   *   2. forceAspectRatio=true  → scaleX + aspectRatio
   *   3. forceAspectRatio=false → 独立 scaleX/Y
   */
  applyConfigSize(cfg: VideoConfig): void {
    const baseW = this.canvas.width;
    const baseH = this.canvas.height;
    if (cfg.autoScaleOnResize) {
      this.fitInParent();
      return;
    }
    if (cfg.forceAspectRatio) {
      const k = cfg.scaleX;
      const hPerW = getAspectRatio(cfg.aspectRatio);
      const baseHRatio = baseH / baseW;
      const stretchY = hPerW / baseHRatio;
      this.canvas.style.width = `${baseW * k}px`;
      this.canvas.style.height = `${baseH * k * stretchY}px`;
      return;
    }
    // 独立 X / Y
    this.canvas.style.width = `${baseW * cfg.scaleX}px`;
    this.canvas.style.height = `${baseH * cfg.scaleY}px`;
  }

  screenshot(): HTMLImageElement {
    var img = new Image();
    img.src = this.canvas.toDataURL("image/png");
    return img;
  }

  destroy(): void {
    this.canvas.removeEventListener("mousedown", this._handleMouseDown);
    this.canvas.removeEventListener("mouseup", this._handleMouseUp);
    if (this._ro) this._ro.disconnect();
    this.canvas.parentNode!.removeChild(this.canvas);
  }
}