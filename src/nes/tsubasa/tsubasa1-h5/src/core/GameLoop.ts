/**
 * 游戏主循环 - 平台无关
 *
 * 通过 IPlatform 接口适配，支持 web 的 requestAnimationFrame
 * 和微信小程序的 canvas.requestAnimationFrame。
 */
import { FPS, FRAME_TIME_MS } from './Constants';
import type { NmiHandler } from '../engine/NmiHandler';
import type { Renderer } from '../renderer/Renderer';
import type { IPlatform } from '../platform/IPlatform';

export class GameLoop {
  private running: boolean = false;
  private paused: boolean = false;
  private animationFrameId: number = 0;
  private lastFrameTime: number = 0;
  private frameCount: number = 0;

  private nmiHandler: NmiHandler;
  private renderer: Renderer;
  private platform: IPlatform;

  /** FPS 统计 */
  private fpsCounter: number = 0;
  private fpsTimer: number = 0;
  private currentFps: number = 0;

  constructor(platform: IPlatform, nmiHandler: NmiHandler, renderer: Renderer) {
    this.platform = platform;
    this.nmiHandler = nmiHandler;
    this.renderer = renderer;
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    this.paused = false;
    this.lastFrameTime = this.platform.now();
    this.fpsTimer = this.lastFrameTime;
    this.loop(this.lastFrameTime);
  }

  stop(): void {
    this.running = false;
    if (this.animationFrameId) {
      this.platform.cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = 0;
    }
  }

  pause(): void { this.paused = true; }

  resume(): void {
    this.paused = false;
    this.lastFrameTime = this.platform.now();
  }

  private loop = (timestamp: number): void => {
    if (!this.running) return;
    this.animationFrameId = this.platform.requestAnimationFrame(this.loop);

    if (this.paused) return;

    const elapsed = timestamp - this.lastFrameTime;

    if (elapsed >= FRAME_TIME_MS) {
      this.lastFrameTime = timestamp - (elapsed % FRAME_TIME_MS);
      this.frameCount++;

      this.fpsCounter++;
      if (timestamp - this.fpsTimer >= 1000) {
        this.currentFps = this.fpsCounter;
        this.fpsCounter = 0;
        this.fpsTimer = timestamp;
      }

      this.nmiHandler.execute();
    }
  };

  getFps(): number { return this.currentFps; }
  getFrameCount(): number { return this.frameCount; }
  isRunning(): boolean { return this.running; }
  isPaused(): boolean { return this.paused; }
}
