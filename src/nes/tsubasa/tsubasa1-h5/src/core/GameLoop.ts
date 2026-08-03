/**
 * 游戏主循环 - 替代6502主循环 ($81EE-$81F6)
 *
 * 原始循环:
 *   $81EE: JSR $8314  ; 等待 NMI (帧同步)
 *   $81F1: JSR $81F7  ; 游戏状态分发
 *   $81F4: JMP $81EE  ; 无限循环
 *
 * H5 实现: 使用 requestAnimationFrame
 */

import { FPS, FRAME_TIME_MS } from './Constants';
import type { NmiHandler } from '../engine/NmiHandler';
import type { Renderer } from '../renderer/Renderer';

export class GameLoop {
  private running: boolean = false;
  private paused: boolean = false;
  private animationFrameId: number = 0;
  private lastFrameTime: number = 0;
  private frameCount: number = 0;

  private nmiHandler: NmiHandler;
  private renderer: Renderer;

  /** FPS 统计 */
  private fpsCounter: number = 0;
  private fpsTimer: number = 0;
  private currentFps: number = 0;

  constructor(nmiHandler: NmiHandler, renderer: Renderer) {
    this.nmiHandler = nmiHandler;
    this.renderer = renderer;
  }

  /** 启动循环 */
  start(): void {
    if (this.running) return;
    this.running = true;
    this.paused = false;
    this.lastFrameTime = performance.now();
    this.fpsTimer = this.lastFrameTime;
    this.loop(this.lastFrameTime);
  }

  /** 停止循环 */
  stop(): void {
    this.running = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = 0;
    }
  }

  /** 暂停 */
  pause(): void {
    this.paused = true;
  }

  /** 恢复 */
  resume(): void {
    this.paused = false;
    this.lastFrameTime = performance.now();
  }

  /** 主循环 */
  private loop = (timestamp: number): void => {
    if (!this.running) return;
    this.animationFrameId = requestAnimationFrame(this.loop);

    if (this.paused) return;

    const elapsed = timestamp - this.lastFrameTime;

    // 帧率控制: 限制在 ~60fps
    if (elapsed >= FRAME_TIME_MS) {
      this.lastFrameTime = timestamp - (elapsed % FRAME_TIME_MS);
      this.frameCount++;

      // FPS 统计
      this.fpsCounter++;
      if (timestamp - this.fpsTimer >= 1000) {
        this.currentFps = this.fpsCounter;
        this.fpsCounter = 0;
        this.fpsTimer = timestamp;
      }

      // 执行NMI等效处理 (包含渲染)
      this.nmiHandler.execute();
    }
  };

  /** 获取当前FPS */
  getFps(): number {
    return this.currentFps;
  }

  /** 获取帧计数 */
  getFrameCount(): number {
    return this.frameCount;
  }

  /** 是否运行中 */
  isRunning(): boolean {
    return this.running;
  }

  /** 是否暂停 */
  isPaused(): boolean {
    return this.paused;
  }
}
