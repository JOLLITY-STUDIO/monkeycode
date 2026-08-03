/**
 * 游戏主循环 - 平台无关
 *
 * 通过 IPlatform 接口适配，支持微信小程序的 canvas.requestAnimationFrame。
 *
 * ## 帧三段式架构 (v0.5.0)
 *
 * 每帧严格分为三个阶段，对应NES的硬件时序：
 *
 *   阶段1 — PPU数据填充 (NMI)
 *     OAM DMA → PPU队列(VRAM写入) → 输入读取 → 帧计数
 *     NES: CPU在VBlank期间把数据填入PPU寄存器
 *
 *   阶段2 — 游戏逻辑
 *     状态机更新 → AI/脚本 → 准备下一帧的PPU数据
 *     NES: NMI返回后CPU执行主循环逻辑
 *
 *   阶段3 — Canvas渲染
 *     用阶段1填充的PPU数据绘制画面
 *     NES: PPU用VBlank期间填入的数据逐行渲染
 *
 * ## 帧时钟策略
 *
 * 每个 RAF 回调执行一帧（1:1 映射），RAF 在 60Hz 显示器上天然 ~60fps，
 * 与 NES 原生帧率一致。
 */
import type { PpuDataFiller } from '../engine/NmiHandler';
import type { Renderer } from '../renderer/Renderer';
import type { StateMachine } from '../engine/StateMachine';
import type { DataCache } from '../cache/DataCache';
import type { IPlatform } from '../platform/IPlatform';

/** FPS 滑动窗口大小 (秒) */
const FPS_WINDOW_S = 2;

export class GameLoop {
  private running: boolean = false;
  private paused: boolean = false;
  private animationFrameId: number = 0;
  private lastFrameTime: number = 0;
  private frameCount: number = 0;

  private ppuFiller: PpuDataFiller;
  private renderer: Renderer;
  private stateMachine: StateMachine;
  private dataCache: DataCache;
  private platform: IPlatform;

  /** FPS 统计 */
  private fpsTimestamps: number[] = [];
  private currentFps: number = 0;
  private heartbeatInterval: number = 180;

  constructor(
    platform: IPlatform,
    ppuFiller: PpuDataFiller,
    renderer: Renderer,
    stateMachine: StateMachine,
    dataCache: DataCache,
  ) {
    this.platform = platform;
    this.ppuFiller = ppuFiller;
    this.renderer = renderer;
    this.stateMachine = stateMachine;
    this.dataCache = dataCache;
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    this.paused = false;
    this.lastFrameTime = 0;
    this.fpsTimestamps = [];
    console.log('[GameLoop] Starting 3-phase frame loop (PPU fill → Game Logic → Render)');
    this.animationFrameId = this.platform.requestAnimationFrame(this.loop);
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
    this.lastFrameTime = 0;
    this.fpsTimestamps = [];
  }

  /**
   * 帧循环 — 每个RAF回调执行完整的三阶段帧
   */
  private loop = (timestamp: number): void => {
    if (!this.running) return;
    this.animationFrameId = this.platform.requestAnimationFrame(this.loop);

    if (this.paused) return;

    // 首次RAF：同步时钟基准
    if (this.lastFrameTime === 0) {
      this.lastFrameTime = timestamp;
      console.log(`[GameLoop] Clock synced (first RAF skip): base=${timestamp.toFixed(1)}`);
      return;
    }

    this.frameCount++;

    // FPS 统计
    this.fpsTimestamps.push(timestamp);
    this.pruneFpsWindow(timestamp);

    if (this.frameCount <= 3) {
      const interval = timestamp - this.lastFrameTime;
      console.log(`[GameLoop] Frame #${this.frameCount} | interval=${interval.toFixed(1)}ms | fps≈${this.currentFps}`);
    }

    this.lastFrameTime = timestamp;

    // ═══════════════════════════════════════════
    // 阶段1: PPU数据填充 (NMI)
    //   OAM DMA → VRAM写入 → 输入读取 → 帧计数
    //   NES: CPU在VBlank期间填PPU寄存器
    // ═══════════════════════════════════════════
    this.ppuFiller.fillPpuData();

    // ═══════════════════════════════════════════
    // 阶段2: 游戏逻辑
    //   状态机更新 → AI/脚本处理
    //   NES: NMI返回后CPU执行主循环
    //   对应 ROM $8100: bankLock检查 → dispatch
    // ═══════════════════════════════════════════
    if (this.dataCache.bankLock === 0) {
      this.stateMachine.update();
    }

    // ═══════════════════════════════════════════
    // 阶段3: Canvas渲染
    //   用阶段1填充的PPU数据绘制到Canvas
    //   NES: PPU用VBlank填入的数据逐行渲染
    // ═══════════════════════════════════════════
    this.renderer.render(this.dataCache, this.stateMachine.getOamCache());

    // 心跳日志
    if (this.frameCount % this.heartbeatInterval === 0) {
      console.log(`[GameLoop] Heartbeat: frame=${this.frameCount} fps=${this.currentFps}`);
    }
  };

  private pruneFpsWindow(now: number): void {
    const cutoff = now - FPS_WINDOW_S * 1000;
    let removeCount = 0;
    while (removeCount < this.fpsTimestamps.length && this.fpsTimestamps[removeCount] < cutoff) {
      removeCount++;
    }
    if (removeCount > 0) {
      this.fpsTimestamps.splice(0, removeCount);
    }
    if (this.fpsTimestamps.length >= 2) {
      const duration = this.fpsTimestamps[this.fpsTimestamps.length - 1] - this.fpsTimestamps[0];
      this.currentFps = duration > 0
        ? Math.round((this.fpsTimestamps.length - 1) / (duration / 1000))
        : 0;
    }
  }

  getFps(): number { return this.currentFps; }
  getFrameCount(): number { return this.frameCount; }
  isRunning(): boolean { return this.running; }
  isPaused(): boolean { return this.paused; }
}
