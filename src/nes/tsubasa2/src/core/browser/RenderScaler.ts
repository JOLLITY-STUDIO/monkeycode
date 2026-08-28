// src/core/browser/RenderScaler.ts
//
// 简化版 Scaler 应用层 — 适配 HeadlessRuntime + direct canvas 渲染流程
// (test/main.ts 等). 等价于 Screen 类的 setBuffer + writeBuffer, 但不带 mouse 事件.
//
// 用法:
//   const rs = new RenderScaler(canvas, ctx, storage);
//   // 每帧:
//   rs.renderFrame(ppu.buffer);

import type { VideoConfigStorage } from "../../option";
import { getScaler } from "./scalers";
import type { VideoScaler } from "./scalers/VideoScaler";

const SCREEN_WIDTH = 256;
const SCREEN_HEIGHT = 240;

export class RenderScaler {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private storage: VideoConfigStorage;
  private scaler: VideoScaler;
  private scaledBuf32: Uint32Array;
  private buf: ArrayBuffer;
  private buf8: Uint8ClampedArray;
  private buf32: Uint32Array;
  private imageData: ImageData;
  private _unsub?: () => void;

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    storage: VideoConfigStorage,
  ) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.storage = storage;
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

    // 监听 storage 变化 → 实时切换 scaler
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
    });
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

  destroy(): void {
    if (this._unsub) this._unsub();
  }
}
