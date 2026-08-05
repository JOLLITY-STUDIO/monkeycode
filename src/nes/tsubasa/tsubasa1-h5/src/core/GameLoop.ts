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
import type { AutoPlayController } from '../engine/AutoPlayController';
import type { DataCache } from '../cache/DataCache';
import type { SceneComposer } from '../view/SceneComposer';
import type { GameModel } from '../model/GameModel';
import type { AudioEngine } from '../audio/AudioEngine';
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
  private autoPlayController: AutoPlayController | null = null;

  /** 🆕 v0.x.0: 音频引擎 (NMI 阶段同步更新) */
  private audioEngine: AudioEngine | null = null;

  /** v0.6.0: 场景构建器 (Model → VRAM+OAM) */
  private sceneComposer: SceneComposer;
  /** v0.6.0: 游戏数据模型 (logic ↔ view 之间的共享数据) */
  private gameModel: GameModel;

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
    sceneComposer: SceneComposer,
    gameModel: GameModel,
    audioEngine: AudioEngine | null = null,
  ) {
    this.platform = platform;
    this.ppuFiller = ppuFiller;
    this.renderer = renderer;
    this.stateMachine = stateMachine;
    this.dataCache = dataCache;
    this.sceneComposer = sceneComposer;
    this.gameModel = gameModel;
    this.audioEngine = audioEngine;
  }

  /** 设置自动播放控制器 */
  setAutoPlayController(ctrl: AutoPlayController | null): void {
    this.autoPlayController = ctrl;
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
    this.paused = false;
    if (this.animationFrameId) {
      this.platform.cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = 0;
    }
  }

  pause(): void { this.paused = true; }

  resume(): void {
    if (!this.paused) return;
    this.paused = false;
    this.lastFrameTime = 0;
    this.fpsTimestamps = [];
    // 重新发起 RAF 链
    this.animationFrameId = this.platform.requestAnimationFrame(this.loop);
  }

  /**
   * 帧循环 — 四段式架构 (v0.6.0) + 音频同步 (v0.x.0)
   *
   *   阶段1: PPU数据填充 + 音频更新 (NMI)
   *     OAM DMA → VRAM写入 → 输入读取 → 帧计数 → 🆕 AudioEngine.update()
   *     NES: CPU在VBlank期间填PPU寄存器 + 写APU寄存器
   *
   *   阶段2: 游戏逻辑
   *     状态机更新 → AI/脚本 → 修改 GameModel
   *     NES: NMI返回后CPU执行主循环
   *
   *   阶段3: 场景构建 (NEW v0.6.0)
   *     SceneComposer: 读取 GameModel → 写入 VRAM + OAM
   *     将 high-level model 翻译为 NES 底层绘图数据
   *
   *   阶段4: Canvas渲染
   *     Renderer: 读取 VRAM + OAM → Canvas draw
   */
  private loop = (timestamp: number): void => {
    if (!this.running) return;

    if (this.paused) {
      // 暂停时不请求下一帧，等 resume() 重启发起
      return;
    }

    this.animationFrameId = this.platform.requestAnimationFrame(this.loop);

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
    // 阶段1: PPU数据填充 + 音频更新 (NMI)
    //   NES: CPU在VBlank期间:
    //     - 填PPU寄存器 (OAM DMA, VRAM, 调色板)
    //     - 写APU寄存器 ($4000-$4013) → 音乐/音效
    // ═══════════════════════════════════════════
    this.ppuFiller.fillPpuData();

    // 🆕 音频引擎更新 — 与 PPU 填充同阶段，确保音画同步
    if (this.audioEngine) {
      this.audioEngine.update();
    }

    // ═══════════════════════════════════════════
    // 阶段2: 游戏逻辑
    //   状态更新 → 写入 GameModel
    // ═══════════════════════════════════════════
    if (this.dataCache.bankLock === 0) {
      if (this.autoPlayController) {
        this.autoPlayController.update(this.stateMachine.getCurrentStateId());
      }
      this.stateMachine.update();
    }

    // ═══════════════════════════════════════════
    // 阶段3: 场景构建 (v0.6.0 NEW)
    //   GameModel → VRAM + OAM
    //   纯渲染数据转换，不涉及任何游戏逻辑
    // ═══════════════════════════════════════════
    this.sceneComposer.compose(this.gameModel, this.stateMachine.getCurrentStateId());

    // ═══════════════════════════════════════════
    // 阶段4: Canvas渲染
    //   VRAM + OAM → Canvas 2D 绘制
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
