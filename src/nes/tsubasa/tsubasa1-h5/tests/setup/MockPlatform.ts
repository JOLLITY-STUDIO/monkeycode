/**
 * Mock 平台适配器 - 用于无渲染的单元测试
 *
 * 模拟 IPlatform 接口，所有平台操作均为空操作或返回假数据。
 * 允许在不依赖 DOM/Canvas/微信 SDK 的环境下运行游戏逻辑。
 */

import type {
  IPlatform, ICanvasContext, ICanvas, ICanvasImageSource, IImageData,
} from '../../src/platform/IPlatform';

// ============================================================
// Mock Canvas
// ============================================================

class MockCanvas implements ICanvas {
  width: number = 256;
  height: number = 240;
  getContext(_contextType: '2d'): ICanvasContext | null {
    return new MockCanvasContext();
  }
}

// ============================================================
// Mock Canvas Context
// ============================================================

class MockCanvasContext implements ICanvasContext {
  readonly canvas: ICanvas = new MockCanvas();
  imageSmoothingEnabled: boolean = false;

  fillStyle: string = '#000000';
  font: string = '16px sans-serif';

  fillRect(_x: number, _y: number, _w: number, _h: number): void { /* noop */ }
  fillText(_text: string, _x: number, _y: number, _maxWidth?: number): void { /* noop */ }
  drawImage(..._args: any[]): void { /* noop */ }
  getImageData(_sx: number, _sy: number, _sw: number, _sh: number): IImageData {
    return { width: _sw, height: _sh, data: new Uint8ClampedArray(_sw * _sh * 4) };
  }
  putImageData(_imagedata: IImageData, _dx: number, _dy: number): void { /* noop */ }
  save(): void { /* noop */ }
  restore(): void { /* noop */ }
  translate(_x: number, _y: number): void { /* noop */ }
  scale(_x: number, _y: number): void { /* noop */ }
}

// ============================================================
// Mock Image
// ============================================================

class MockImage implements ICanvasImageSource {
  width: number = 128;
  height: number = 128;
}

// ============================================================
// Mock Platform
// ============================================================

export class MockPlatform implements IPlatform {
  readonly name: string = 'mock-test';

  /** 模拟时间 (ms)，每帧 +16.67 */
  private _time: number = 0;

  /** RAF 回调队列 */
  private rafCallbacks: Array<(t: number) => void> = [];
  private rafIdCounter: number = 1;

  createOffscreenCanvas(width: number, height: number): ICanvas {
    const c = new MockCanvas();
    c.width = width;
    c.height = height;
    return c;
  }

  async loadImage(_url: string): Promise<ICanvasImageSource> {
    return new MockImage();
  }

  requestAnimationFrame(callback: (timestamp: number) => void): number {
    const id = this.rafIdCounter++;
    this.rafCallbacks.push(callback);
    return id;
  }

  cancelAnimationFrame(_handle: number): void {
    // noop in mock
  }

  now(): number {
    return this._time;
  }

  // ============================================================
  // 测试辅助方法
  // ============================================================

  /** 推进模拟时间一帧 (16.67ms) 并执行 RAF 回调 */
  tickFrame(frameTimeMs: number = 16.67): void {
    this._time += frameTimeMs;
    const callbacks = [...this.rafCallbacks];
    this.rafCallbacks = [];
    for (const cb of callbacks) {
      cb(this._time);
    }
  }

  /** 重置状态 */
  reset(): void {
    this._time = 0;
    this.rafCallbacks = [];
    this.rafIdCounter = 1;
  }
}

/** 创建一个可以直接传给 Renderer 的 MockCanvasContext */
export function createMockCanvasContext(): ICanvasContext {
  return new MockCanvasContext();
}
