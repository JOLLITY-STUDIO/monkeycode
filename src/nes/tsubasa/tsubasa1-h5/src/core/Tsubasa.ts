/**
 * 主游戏类 - 外部唯一接口
 *
 * 即插即用:
 *   // 微信小程序
 *   new Tsubasa(mpPlatform, canvasCtx).start()
 *
 * 外部只负责提供 Canvas 上下文和操作输入，
 * 无需了解游戏内核逻辑。
 *
 * ## 帧三段式架构 (v0.5.0)
 * 每帧: PPU数据填充 → 游戏逻辑 → Canvas渲染
 * 参见 GameLoop.ts 注释
 */
import { GameLoop } from './GameLoop';
import { DataCache } from '../cache/DataCache';
import { OamCache } from '../cache/OamCache';
import { PpuQueue } from '../cache/PpuQueue';
import { BankManager } from '../cache/BankManager';
import { InputManager } from '../input/InputManager';
import { Renderer } from '../renderer/Renderer';
import { TileStore } from '../renderer/TileStore';
import { PpuDataFiller } from '../engine/NmiHandler';
import { StateMachine } from '../engine/StateMachine';
import { AutoPlayController } from '../engine/AutoPlayController';
import { GameModel } from '../model/GameModel';
import { ProgressManager } from '../model/ProgressManager';
import { SceneComposer } from '../view/SceneComposer';
import {
  State00_InitTitle,
  State01_TitleLoop,
  State02_MenuSelect,
  State03_MemberSelect,
  State04_MatchMain,
  State05_MatchEvent,
  State06_Halftime,
  State07_MatchResult,
  StateTest,
} from '../engine/states/index';
import { Button, GameInput } from './types';
import type { IPlatform, ICanvasContext } from '../platform/IPlatform';
// 🆕 音频模块
import { ApuSimulator } from '../audio/ApuSimulator';
import { AudioEngine } from '../audio/AudioEngine';
import { MUSIC_TRACKS, MUSIC_SEQUENCES } from '../audio/MusicData';

export interface TsubasaOptions {
  spriteBasePath?: string;
  scale?: number;
  autoLoadSprites?: boolean;
  /** 手动步进模式：不启动内置 GameLoop，由外部驱动 step() */
  manualStep?: boolean;
  /** 自动播放模式：双方均由AI控制，无需人工操作 */
  autoPlay?: boolean;
  debug?: boolean;
}

export type TsubasaState = 'loading' | 'ready' | 'running' | 'paused' | 'stopped';

export class Tsubasa {
  // 子系统
  private dataCache!: DataCache;
  private oamCache!: OamCache;
  private ppuQueue!: PpuQueue;
  private bankManager!: BankManager;
  private inputManager!: InputManager;
  private tileStore!: TileStore;
  private renderer!: Renderer;
  private gameLoop!: GameLoop;
  private ppuFiller!: PpuDataFiller;
  private stateMachine!: StateMachine;
  private autoPlayController!: AutoPlayController;

  // 模型与视图层 (v0.6.0 架构分离)
  private gameModel!: GameModel;
  private progressManager!: ProgressManager;
  private sceneComposer!: SceneComposer;

  // 🆕 音频系统
  private audioEngine: AudioEngine | null = null;
  private apuSimulator: ApuSimulator | null = null;

  // 状态
  private state: TsubasaState = 'stopped';
  private options: TsubasaOptions;
  private platform: IPlatform;

  constructor(platform: IPlatform, ctx: ICanvasContext, options: TsubasaOptions = {}) {
    this.platform = platform;
    this.options = {
      spriteBasePath: '/sprites/',
      scale: 2,
      autoLoadSprites: true,
      debug: false,
      ...options,
    };

    this.initialize(ctx);
  }

  private initialize(ctx: ICanvasContext): void {
    this.state = 'loading';

    this.dataCache = new DataCache();
    this.oamCache = new OamCache();
    this.ppuQueue = new PpuQueue();
    this.bankManager = new BankManager();
    this.inputManager = new InputManager();

    // TileStore: 从 base64 嵌入字符串解码 CHR ROM → 2BPP 解码
    this.tileStore = new TileStore();

    // 渲染器：传入平台 + canvas + TileStore
    this.renderer = new Renderer(this.platform, ctx, this.tileStore);
    this.renderer.setBankManager(this.bankManager);

    // === v0.6.0 架构分离: Model + View ===
    this.gameModel = new GameModel();
    this.progressManager = new ProgressManager();
    this.sceneComposer = new SceneComposer(this.renderer, this.oamCache);

    this.stateMachine = new StateMachine(
      this.dataCache, this.inputManager, this.renderer,
      this.oamCache, this.bankManager, this.ppuQueue,
      this.gameModel,  // ← 注入 model
      this.audioEngine,  // 🆕 注入音频引擎 (开场 BGM)
    );

    // ASM 跳转表 $81FD 只有 8 条目 (State 0-7), 无 State 8
    this.stateMachine.registerStates([
      new State00_InitTitle(this.stateMachine),
      new State01_TitleLoop(this.stateMachine),
      new State02_MenuSelect(this.stateMachine),
      new State03_MemberSelect(this.stateMachine),
      new State04_MatchMain(this.stateMachine),
      new State05_MatchEvent(this.stateMachine),
      new State06_Halftime(this.stateMachine),
      new State07_MatchResult(this.stateMachine),
      new StateTest(this.stateMachine),
    ]);

    // ═══════════════════════════════════════════════
    // 🆕 音频管线: Platform AudioContext → ApuSimulator → AudioEngine
    // 在 NES 中 APU 寄存器 ($4000-$4013) 由音频引擎在 NMI 期间写入
    // ═══════════════════════════════════════════════
    const audioCtx = this.platform.createAudioContext?.() ?? null;
    if (audioCtx) {
      this.apuSimulator = new ApuSimulator(audioCtx);
      this.audioEngine = new AudioEngine(this.apuSimulator);

      // 注册音乐曲目 (占位数据，待 ROM 提取)
      for (let i = 0; i < MUSIC_TRACKS.length; i++) {
        const seq = MUSIC_SEQUENCES[i];
        if (seq && seq.data.length > 0) {
          this.audioEngine!.registerTrack(MUSIC_TRACKS[i], seq.data);
        }
      }

      if (this.options.debug) {
        console.log('[Tsubasa] Audio engine initialized (' +
          this.audioEngine.getTrackList().length + ' tracks registered)');
      }
    } else {
      console.log('[Tsubasa] Audio DISABLED (platform does not support Web Audio API)');
    }

    // PPU数据填充器 — 对应NMI中的硬件操作
    this.ppuFiller = new PpuDataFiller(
      this.dataCache, this.oamCache, this.ppuQueue,
      this.inputManager, this.renderer,
    );

    // 游戏循环 — 编排四段式帧: PPU填充+音频 → 游戏逻辑 → 场景构建 → 渲染
    this.gameLoop = new GameLoop(
      this.platform, this.ppuFiller, this.renderer,
      this.stateMachine, this.dataCache,
      this.sceneComposer, this.gameModel,  // ← 注入 composer + model
      this.audioEngine,  // 🆕 注入音频引擎
    );

    // 自动播放控制器
    this.autoPlayController = new AutoPlayController(this.inputManager, this.dataCache);
    if (this.options.autoPlay) {
      this.autoPlayController.enabled = true;
      this.gameLoop.setAutoPlayController(this.autoPlayController);
    }

    if (this.options.debug) {
      console.log('[Tsubasa] All subsystems initialized (platform: ' + this.platform.name + ')');
    }

    this.state = 'ready';
  }

  async start(): Promise<void> {
    if (this.state === 'running') return;

    console.log('[Tsubasa] Starting NORMAL mode...');

    // TileStore 初始化 (同步，数据已内嵌)
    this.tileStore.init();

    // 模拟 RESET 初始化流程
    this.bankManager.setInitialConfig();
    console.log('[Tsubasa] Bank config initialized:', this.bankManager.getConfig());

    // 对应 $80C9-$80CF: 初始化 PPU 控制寄存器镜像
    this.dataCache.ppuCtrl = 0x10;  // $80C9: LDA #$10, STA $19
    this.dataCache.ppuMask = 0x06;  // $80CD: LDA #$06, STA $18
    this.dataCache.scrollX = 0;     // $80C3: STA $16
    this.dataCache.scrollY = 0;     // $80C5: STA $17
    this.dataCache.bankLock = 0;    // 初始不锁定

    // 初始化 Bank 1 子状态变量 ($03CB, $03CC)
    this.dataCache.write(0x03CB, 0);
    this.dataCache.write(0x03CC, 0);

    // 初始化进度管理器
    this.progressManager.reset();
    this.dataCache.set('progressManager', this.progressManager);

    // 设置初始队伍名称（比赛序列数据待从ROM提取，当前使用默认值）
    const firstMatch = this.progressManager.getCurrentMatch();
    this.dataCache.set('playerTeamName', firstMatch?.playerTeamName ?? 'Nankatsu');
    this.dataCache.set('opponentTeamName', firstMatch?.opponentName ?? 'Opponent');

    console.log('[Tsubasa] Transitioning to State 0 (Title Init)');

    // 跳转到 State 0 (标题初始化)
    this.stateMachine.transitionTo(0);

    if (!this.options.manualStep) {
      this.gameLoop.start();
    }
    this.state = 'running';

    if (this.options.debug) {
      console.log('[Tsubasa] Game started, PPU: ctrl=$' +
        this.dataCache.ppuCtrl.toString(16) +
        ' mask=$' + this.dataCache.ppuMask.toString(16) +
        (this.options.manualStep ? ' [manual step mode]' : ''));
    }
  }

  /**
   * 启动测试模式 — 渲染 "TEST" 文字来验证 Canvas 管线
   * 不加载 CHR 图片，使用色块回退 + debug 文字叠加
   */
  async startTestMode(): Promise<void> {
    if (this.state === 'running') return;

    // 测试模式不需要 CHR 图片

    // 基本 Bank 配置
    this.bankManager.setInitialConfig();

    // 基本 PPU 配置
    this.dataCache.ppuCtrl = 0x10;
    this.dataCache.ppuMask = 0x06;
    this.dataCache.scrollX = 0;
    this.dataCache.scrollY = 0;
    this.dataCache.bankLock = 0;

    this.dataCache.write(0x03CB, 0);
    this.dataCache.write(0x03CC, 0);

    // 跳转到 State 99 (测试状态)
    this.stateMachine.transitionTo(99);

    if (!this.options.manualStep) {
      this.gameLoop.start();
    }
    this.state = 'running';

    if (this.options.debug) {
      console.log('[Tsubasa] Test mode started' +
        (this.options.manualStep ? ' [manual step mode]' : ''));
    }
  }

  /**
   * 手动步进一帧 (用于对比验证场景)
   *
   * 帧四段式 + 音频同步 (v0.x.0):
   *   1. PPU数据填充 + 音频更新 (OAM DMA → VRAM写入 → 输入读取 → 帧计数 → AudioEngine.update)
   *   2. 游戏逻辑 (状态机更新 → 写 GameModel)
   *   3. 场景构建 (SceneComposer: Model → VRAM+OAM)
   *   4. Canvas渲染 (Renderer: VRAM+OAM → Canvas)
   */
  step(): void {
    if (this.state !== 'running') return;

    // 阶段1: PPU数据填充 + 音频更新
    this.ppuFiller.fillPpuData();
    if (this.audioEngine) {
      this.audioEngine.update();
    }

    // 阶段2: 游戏逻辑
    if (this.dataCache.bankLock === 0) {
      this.stateMachine.update();
    }

    // 阶段3: 场景构建 (Model → VRAM+OAM)
    this.sceneComposer.compose(this.gameModel, this.stateMachine.getCurrentStateId());

    // 阶段4: Canvas渲染
    this.renderer.render(this.dataCache, this.oamCache);
  }

  pause(): void {
    if (this.state !== 'running') return;
    this.gameLoop.pause();
    this.state = 'paused';
  }

  resume(): void {
    if (this.state !== 'paused') return;
    this.gameLoop.resume();
    this.state = 'running';
  }

  stop(): void {
    this.gameLoop.stop();
    this.state = 'stopped';
  }

  handleInput(input: GameInput): void {
    if (this.state !== 'running') return;
    this.inputManager.setExternalButtons(input.pressed | input.held);
  }

  pressButton(button: Button): void {
    this.inputManager.pressButton(button);
  }

  releaseButton(button: Button): void {
    this.inputManager.releaseButton(button);
  }

  getState(): TsubasaState { return this.state; }
  getFps(): number { return this.gameLoop.getFps(); }
  getFrameCount(): number { return this.gameLoop.getFrameCount(); }
  getCurrentGameState(): number { return this.stateMachine.getCurrentStateId(); }

  getDebugInfo(): Record<string, any> {
    return {
      state: this.state,
      platform: this.platform.name,
      fps: this.gameLoop.getFps(),
      frame: this.gameLoop.getFrameCount(),
      gameState: this.stateMachine.getCurrentStateId(),
      ram: this.dataCache.debugSnapshot(),
      banks: this.bankManager.getConfig(),
    };
  }

  /** 启用自动播放模式 */
  enableAutoPlay(): void {
    this.autoPlayController.enabled = true;
    this.autoPlayController.reset();
    this.gameLoop.setAutoPlayController(this.autoPlayController);
    console.log('[Tsubasa] Auto-play ENABLED');
  }

  /** 禁用自动播放模式 */
  disableAutoPlay(): void {
    this.autoPlayController.enabled = false;
    this.autoPlayController.reset();
    this.gameLoop.setAutoPlayController(null);
    console.log('[Tsubasa] Auto-play DISABLED');
  }

  /** 切换自动播放 */
  toggleAutoPlay(): boolean {
    if (this.autoPlayController.enabled) {
      this.disableAutoPlay();
      return false;
    } else {
      this.enableAutoPlay();
      return true;
    }
  }

  /** 是否处于自动播放模式 */
  isAutoPlay(): boolean {
    return this.autoPlayController.enabled;
  }

  /** 设置自动播放日志回调 */
  setAutoPlayLogCallback(cb: (msg: string) => void): void {
    this.autoPlayController.setLogCallback(cb);
  }

  /** 设置比赛结束回调 */
  setAutoPlayMatchEndCallback(cb: (score: [number, number], time: number) => void): void {
    this.autoPlayController.setMatchEndCallback(cb);
  }

  destroy(): void {
    this.stop();
    this.dataCache.clear();
    this.oamCache.clear();
    this.ppuQueue.clear();
  }
}
