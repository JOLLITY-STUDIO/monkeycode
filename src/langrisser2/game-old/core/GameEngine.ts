/**
 * 游戏主循环 & 状态管理
 *
 * 对应 execution-trace.md 里的任务调度系统 (FUN_00009498)
 *
 * 简化版: 先把主循环跑起来, 任务队列用伪结构
 * 后续逐步替换为真实的 68K 任务调度逻辑
 */

import { VDP } from '../hw/vdp/vdp.js';
import { renderFrame } from '../hw/vdp/renderer.js';

/**
 * 游戏主循环控制器
 *
 * 对应原 ROM 的任务调度系统:
 *   - DAT_ffff8004: 当前任务函数指针
 *   - DAT_ffff8010: 任务队列 (FUN_00009498 调度)
 *   - FUN_00008576: 帧同步
 *
 * 当前阶段: 纯 TS 模拟, 不执行 68K 代码
 *   VDP 数据由各个游戏场景模块手动填充
 *   后续可替换为 68K CPU 模拟
 */
export class GameEngine {
  readonly vdp: VDP;

  /** 帧缓冲 (RGBA) */
  frameBuffer: Uint8Array;
  /** 帧计数器 */
  frameCount: number = 0;

  /** 动画回调列表 */
  private _rafId: number | null = null;
  private _running: boolean = false;

  constructor() {
    this.vdp = new VDP();
    this.vdp.reset();

    // 分配帧缓冲
    const size = this.vdp.width * this.vdp.height * 4;
    this.frameBuffer = new Uint8Array(size);
  }

  /**
   * 启动游戏循环
   *
   * @param onFrame 每帧回调, 可用于更新 VDP 数据
   * @param canvas 可选, 自动渲染到 Canvas
   */
  start(onFrame?: (engine: GameEngine) => void, canvas?: HTMLCanvasElement): void {
    if (this._running) return;
    this._running = true;

    const ctx = canvas ? canvas.getContext('2d') : null;
    if (canvas && ctx) {
      canvas.width = this.vdp.width;
      canvas.height = this.vdp.height;
    }

    const loop = () => {
      if (!this._running) return;

      // 1. 更新游戏逻辑
      if (onFrame) onFrame(this);

      // 2. 渲染帧
      renderFrame(this.vdp, this.frameBuffer, 0, 0, 0, 0);

      // 3. 输出到 Canvas
      if (ctx) {
        const imgData = ctx.createImageData(this.vdp.width, this.vdp.height);
        imgData.data.set(this.frameBuffer);
        ctx.putImageData(imgData, 0, 0);
      }

      this.frameCount++;
      this._rafId = requestAnimationFrame(loop);
    };

    this._rafId = requestAnimationFrame(loop);
  }

  /** 停止游戏循环 */
  stop(): void {
    this._running = false;
    if (this._rafId !== null) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }
  }
}
