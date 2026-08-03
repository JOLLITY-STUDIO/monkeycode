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
import { PpuDataFiller } from '../engine/NmiHandler';
import { StateMachine } from '../engine/StateMachine';
import {
  State00_InitTitle,
  State01_TitleLoop,
  State02_MenuSelect,
  State03_TeamSelect,
  State04_MatchMain,
  State05_MatchEvent,
  StateTest,
} from '../engine/states/index';
import { Button, GameInput } from './types';
import type { IPlatform, ICanvasContext } from '../platform/IPlatform';

export interface TsubasaOptions {
  spriteBasePath?: string;
  scale?: number;
  autoLoadSprites?: boolean;
  /** 手动步进模式：不启动内置 GameLoop，由外部驱动 step() */
  manualStep?: boolean;
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
  private renderer!: Renderer;
  private gameLoop!: GameLoop;
  private ppuFiller!: PpuDataFiller;
  private stateMachine!: StateMachine;

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

    // 渲染器：传入平台适配器 + canvas 上下文
    this.renderer = new Renderer(this.platform, ctx);
    this.renderer.setBankManager(this.bankManager);

    this.stateMachine = new StateMachine(
      this.dataCache, this.inputManager, this.renderer,
      this.oamCache, this.bankManager, this.ppuQueue,
    );

    this.stateMachine.registerStates([
      new State00_InitTitle(this.stateMachine),
      new State01_TitleLoop(this.stateMachine),
      new State02_MenuSelect(this.stateMachine),
      new State03_TeamSelect(this.stateMachine),
      new State04_MatchMain(this.stateMachine),
      new State05_MatchEvent(this.stateMachine),
      new StateTest(this.stateMachine),
    ]);

    // PPU数据填充器 — 对应NMI中的硬件操作
    this.ppuFiller = new PpuDataFiller(
      this.dataCache, this.oamCache, this.ppuQueue,
      this.inputManager, this.renderer,
    );

    // 游戏循环 — 编排三段式帧: PPU填充 → 游戏逻辑 → 渲染
    this.gameLoop = new GameLoop(
      this.platform, this.ppuFiller, this.renderer,
      this.stateMachine, this.dataCache,
    );

    if (this.options.debug) {
      console.log('[Tsubasa] All subsystems initialized (platform: ' + this.platform.name + ')');
    }

    this.state = 'ready';
  }

  async start(): Promise<void> {
    if (this.state === 'running') return;

    console.log('[Tsubasa] Starting NORMAL mode...');
    console.log('[Tsubasa] spriteBasePath:', this.options.spriteBasePath);
    console.log('[Tsubasa] autoLoadSprites:', this.options.autoLoadSprites);

    if (this.options.autoLoadSprites) {
      try {
        console.log('[Tsubasa] Loading CHR banks...');
        await this.renderer.loadAllChrBanks(this.options.spriteBasePath);
        console.log('[Tsubasa] CHR banks load complete');
      } catch (err) {
        console.warn('[Tsubasa] Failed to load CHR banks:', err);
      }
    }

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
   * 仅在 manualStep 模式下使用，由外部帧循环驱动。
   *
   * 帧三段式:
   *   1. PPU数据填充 (OAM DMA → VRAM写入 → 输入读取 → 帧计数)
   *   2. 游戏逻辑 (状态机更新)
   *   3. Canvas渲染
   */
  step(): void {
    if (this.state !== 'running') return;

    // 阶段1: PPU数据填充
    this.ppuFiller.fillPpuData();

    // 阶段2: 游戏逻辑
    if (this.dataCache.bankLock === 0) {
      this.stateMachine.update();
    }

    // 阶段3: Canvas渲染
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

  destroy(): void {
    this.stop();
    this.dataCache.clear();
    this.oamCache.clear();
    this.ppuQueue.clear();
  }
}
