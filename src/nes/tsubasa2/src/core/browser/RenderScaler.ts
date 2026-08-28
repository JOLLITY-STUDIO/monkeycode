// src/core/browser/RenderScaler.ts
//
// Scaler + Aspect/Scale 应用层 — 适配 HeadlessRuntime + direct canvas 渲染流程
// (test/main.ts 等). 等价于 Screen 类的 setBuffer + writeBuffer, 但不带 mouse 事件.
//
// 用法:
//   const rs = new RenderScaler(canvas, ctx, storage, container);
//   // 每帧:
//   rs.renderFrame(ppu.buffer);
//   // 窗口 resize 时 (autoScaleOnResize=true):
//   rs.fitContainer();  // 或自动监听
//
// 工作:
//   1. canvas.width/height 由 scaler 决定 (整数倍 256x240)
//   2. canvas.style.width/height 由 VideoConfig 决定:
//      - autoScaleOnResize=true:  按 parent clientWidth/clientHeight 计算最大整数比
//      - autoScaleOnResize=false: 直接 scaleX/scaleY (CSS 倍率)
//   3. forceAspectRatio: 用 aspectRatio 的 h/w 算出 CSS height (aspect 下拉)
//   4. ResizeObserver 监听 parent clientWidth/clientHeight 变化时重新 fit

import type { VideoConfigStorage } from "../../option";
import { getAspectRatio } from "../../option";
import { getScaler } from "./scalers";
import type { VideoScaler } from "./scalers/VideoScaler";

const SCREEN_WIDTH = 256;
const SCREEN_HEIGHT = 240;

export class RenderScaler {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private storage: VideoConfigStorage;
  private parent: HTMLElement | null;
  private scaler: VideoScaler;
  private scaledBuf32: Uint32Array;
  private buf: ArrayBuffer;
  private buf8: Uint8ClampedArray;
  private buf32: Uint32Array;
  private imageData: ImageData;
  private _unsub?: () => void;
  private _ro?: ResizeObserver;

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    storage: VideoConfigStorage,
    parent?: HTMLElement | null,
  ) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.storage = storage;
    this.parent = parent || canvas.parentElement || null;
    this.scaler = getScaler(storage.current.scaler);

    // 初始 buffer / imageData
    const scale = this.scaler.scale;
    const dstW = SCREEN_WIDTH * scale;
    const dstH = SCREEN_HEIGHT * scale;
    this.scaledBuf32 = new Uint32Array(dstW * dstH);
    this.canvas.width = dstW;
    this.canvas.height = dstH;
    this.imageData = ctx.createImageData(dstW, dstH);
    this.buf = new ArrayBuffer(this.imageData.data.length);
    this.buf8 = new Uint8ClampedArray(this.buf);
    this.buf32 = new Uint32Array(this.buf);

    // 初始 CSS 尺寸 (scaler + config)
    this._applyCssSize(storage.current);

    // 监听 storage 变化 → 实时切换 scaler / 重新 fit
    this._unsub = storage.onChange((cfg) => {
      const newScaler = getScaler(cfg.scaler);
      if (newScaler.scale !== this.scaler.scale) {
        this.scaler = newScaler;
        const dW = SCREEN_WIDTH * newScaler.scale;
        const dH = SCREEN_HEIGHT * newScaler.scale;
        this.canvas.width = dW;
        this.canvas.height = dH;
        this.scaledBuf32 = new Uint32Array(dW * dH);
        this.imageData = ctx.createImageData(dW, dH);
        this.buf = new ArrayBuffer(this.imageData.data.length);
        this.buf8 = new Uint8ClampedArray(this.buf);
        this.buf32 = new Uint32Array(this.buf);
      } else {
        this.scaler = newScaler;
      }
      this._applyCssSize(cfg);
    });

    // 监听 parent resize → 自动 fit
    if (this.parent && typeof ResizeObserver !== "undefined") {
      this._ro = new ResizeObserver(() => {
        if (this.storage.current.autoScaleOnResize) {
          this._applyCssSize(this.storage.current);
        }
      });
      this._ro.observe(this.parent);
    }
  }

  /** 渲染一帧. ppuBuffer 来自 HeadlessRuntime.ppu.buffer (Uint32Array 256*240 RGBA8888) */
  renderFrame(ppuBuffer: Uint32Array): void {
    const scale = this.scaler.scale;
    if (scale === 1) {
      // 直接复制 + 加 alpha
      for (let i = 0; i < ppuBuffer.length; i++) {
        this.scaledBuf32[i] = 0xff000000 | ppuBuffer[i];
      }
    } else {
      this.scaler.apply(
        ppuBuffer as Uint32Array,
        this.scaledBuf32,
        SCREEN_WIDTH,
        SCREEN_HEIGHT,
        SCREEN_WIDTH * scale,
        SCREEN_HEIGHT * scale,
      );
    }
    this.buf32.set(this.scaledBuf32);
    this.imageData.data.set(this.buf8);
    this.ctx.putImageData(this.imageData, 0, 0);
  }

  /** 手动触发 fit (ResizeObserver 不可用时, 或外部 size 改变) */
  fitContainer(): void {
    this._applyCssSize(this.storage.current);
  }

  destroy(): void {
    if (this._unsub) this._unsub();
    if (this._ro) this._ro.disconnect();
  }

  /**
   * 应用 CSS 尺寸逻辑 (与 fceux vidblit.cpp SetScreenSize + scaleAspect 一致).
   *
   * 优先级:
   *   1. autoScaleOnResize=true → 算 max integer fit, 保持画布宽高比 (类似 fitInParent)
   *   2. autoScaleOnResize=false + forceAspectRatio=true → scaleX × aspectRatio h/w
   *   3. autoScaleOnResize=false + forceAspectRatio=false → 独立 scaleX × scaleY
   */
  private _applyCssSize(cfg: import("../../option").VideoConfig): void {
    const baseW = this.canvas.width;   // scaler 输出 canvas 像素宽 (e.g. 768 for hq3x)
    const baseH = this.canvas.height;

    if (cfg.autoScaleOnResize && this.parent) {
      // ─── 模式 1: 自适应父容器 (整数倍 max fit, 保持画布宽高比) ───
      const pw = this.parent.clientWidth;
      const ph = this.parent.clientHeight;
      if (pw > 0 && ph > 0) {
        const sx = Math.max(1, Math.floor(pw / baseW));
        const sy = Math.max(1, Math.floor(ph / baseH));
        const k = Math.max(1, Math.min(sx, sy));
        this.canvas.style.width = `${baseW * k}px`;
        this.canvas.style.height = `${baseH * k}px`;
        return;
      }
    }
    if (cfg.forceAspectRatio) {
      // ─── 模式 2: 单 scaleX + aspectRatio (e.g. 4:3 显示) ───
      const k = cfg.scaleX;
      const hPerW = getAspectRatio(cfg.aspectRatio);
      // base canvas 已经是 baseW:baseH (来自 scaler, NES = 256:240 = 16:15),
      // 我们要把它按 hPerW 比例拉伸到屏幕上:
      //   targetH = targetW * hPerW
      //   targetW = baseW * k
      // 但这样会让 base canvas 内容被拉伸。常见做法: canvas style width 用 scaleX,
      // canvas style height 用 scaleX * (baseH/baseW) * hPerW:
      //   实际显示比 = (scaleX * baseW / scaleX * baseH) * hPerW = (baseW/baseH) * hPerW
      const baseHRatio = baseH / baseW;
      const targetHRatio = hPerW;
      const stretchY = targetHRatio / baseHRatio;
      this.canvas.style.width = `${baseW * k}px`;
      this.canvas.style.height = `${baseH * k * stretchY}px`;
      return;
    }
    // ─── 模式 3: 独立 scaleX × scaleY (自由拉伸) ───
    this.canvas.style.width = `${baseW * cfg.scaleX}px`;
    this.canvas.style.height = `${baseH * cfg.scaleY}px`;
  }
}