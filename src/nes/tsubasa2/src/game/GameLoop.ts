/**
 * GameLoop — 游戏帧循环驱动 (game 层)
 *
 * 微信小程序 Canvas 2D 的 requestAnimationFrame 驱动。
 * 每帧回调 onFrame(dt) + onRender(dt), 支持暂停/恢复/停止。
 *
 * 对应 NES 硬件: NMI 每帧触发, CPU 执行一帧逻辑 + PPU 渲染一帧。
 */
export class GameLoop {
  /** 逻辑帧回调 (dt ms) */
  onFrame: ((dt: number) => void) | null = null;
  /** 渲染帧回调 (dt ms) */
  onRender: ((dt: number) => void) | null = null;

  /** 当前帧计数 */
  private _frameCount = 0;
  /** 循环是否运行中 */
  private _running = false;
  /** requestAnimationFrame id (微信小程序) */
  private _rafId = 0;
  /** 上一帧时间戳 (ms) */
  private _lastTime = 0;
  /** FPS 统计 */
  private _fps = 0;
  private _fpsFrames = 0;
  private _fpsTime = 0;

  /** 帧回调配置 (可选, 状态变更通知) */
  callbacks?: { onStateChange?: (from: string, to: string) => void };

  get frameCount(): number {
    return this._frameCount;
  }

  get fps(): number {
    return this._fps;
  }

  get isRunning(): boolean {
    return this._running;
  }

  /**
   * 启动循环 — 需要传 canvas 节点 (微信小程序 Canvas 2D 用 canvas.requestAnimationFrame)。
   * 若无 canvas (无头模式), 用 setInterval(16ms) 驱动。
   */
  start(canvas?: any): void {
    if (this._running) return;
    this._running = true;
    this._frameCount = 0;
    this._lastTime = Date.now();
    this._fpsFrames = 0;
    this._fpsTime = this._lastTime;

    if (canvas && typeof canvas.requestAnimationFrame === 'function') {
      // 微信小程序 Canvas 2D 的 RAF
      const tick = () => {
        if (!this._running) return;
        this._tick();
        this._rafId = canvas.requestAnimationFrame(tick);
      };
      this._rafId = canvas.requestAnimationFrame(tick);
    } else {
      // 无头/setInterval 兜底 (16ms ≈ 60fps)
      this._rafId = setInterval(() => {
        if (!this._running) return;
        this._tick();
      }, 16) as unknown as number;
    }
  }

  /** 暂停 */
  pause(): void {
    this._running = false;
    this._cancelRaf();
  }

  /** 恢复 */
  resume(): void {
    if (this._running) return;
    this._running = true;
    this._lastTime = Date.now();
    // 重新驱动 (简化: 用 setInterval, 调用方可重新 start(canvas) 切回 RAF)
    this._rafId = setInterval(() => {
      if (!this._running) return;
      this._tick();
    }, 16) as unknown as number;
  }

  /** 彻底停止 */
  stop(): void {
    this._running = false;
    this._cancelRaf();
    this._frameCount = 0;
  }

  private _cancelRaf(): void {
    if (this._rafId) {
      // 微信 RAF 返回 number, clearInterval 对 number 安全
      try { clearInterval(this._rafId); } catch (_) { /* RAF id 非 interval */ }
      this._rafId = 0;
    }
  }

  private _tick(): void {
    const now = Date.now();
    const dt = now - this._lastTime;
    this._lastTime = now;
    this._frameCount++;
    this._fpsFrames++;
    if (now - this._fpsTime >= 1000) {
      this._fps = this._fpsFrames;
      this._fpsFrames = 0;
      this._fpsTime = now;
    }
    if (this.onFrame) this.onFrame(dt);
    if (this.onRender) this.onRender(dt);
  }
}
