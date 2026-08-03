/**
 * 主游戏类 - 外部唯一接口
 *
 * 即插即用:
 *   // Web
 *   new Tsubasa(platform, ctx).start()
 *
 *   // 微信小程序
 *   new Tsubasa(mpPlatform, canvasCtx).start()
 *
 * 外部只负责提供 Canvas 上下文和操作输入，
 * 无需了解游戏内核逻辑。
 */
import { GameLoop } from './GameLoop';
import { DataCache } from '../cache/DataCache';
import { OamCache } from '../cache/OamCache';
import { PpuQueue } from '../cache/PpuQueue';
import { BankManager } from '../cache/BankManager';
import { InputManager } from '../input/InputManager';
import { Renderer } from '../renderer/Renderer';
import { NmiHandler } from '../engine/NmiHandler';
import { StateMachine } from '../engine/StateMachine';
import {
  State00_InitTitle,
  State01_TitleLoop,
  State02_MenuSelect,
  State03_TeamSelect,
  State04_MatchMain,
  State05_MatchEvent,
} from '../engine/states/index';
import { Button, GameInput } from './types';
import type { IPlatform, ICanvasContext } from '../platform/IPlatform';

export interface TsubasaOptions {
  spriteBasePath?: string;
  scale?: number;
  autoLoadSprites?: boolean;
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
  private nmiHandler!: NmiHandler;
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
    ]);

    this.nmiHandler = new NmiHandler(
      this.dataCache, this.oamCache, this.ppuQueue,
      this.bankManager, this.inputManager,
      this.renderer, this.stateMachine,
    );

    // 游戏循环：传入平台适配器
    this.gameLoop = new GameLoop(this.platform, this.nmiHandler, this.renderer);

    if (this.options.debug) {
      console.log('[Tsubasa] All subsystems initialized (platform: ' + this.platform.name + ')');
    }

    this.state = 'ready';
  }

  async start(): Promise<void> {
    if (this.state === 'running') return;

    if (this.options.autoLoadSprites) {
      try {
        await this.renderer.loadAllChrBanks(this.options.spriteBasePath);
      } catch (err) {
        console.warn('[Tsubasa] Failed to load CHR banks:', err);
      }
    }

    // 模拟 RESET 初始化流程
    this.bankManager.setInitialConfig();

    // 对应 $80C9-$80CF: 初始化 PPU 控制寄存器镜像
    this.dataCache.ppuCtrl = 0x10;  // $80C9: LDA #$10, STA $19
    this.dataCache.ppuMask = 0x06;  // $80CD: LDA #$06, STA $18
    this.dataCache.scrollX = 0;     // $80C3: STA $16
    this.dataCache.scrollY = 0;     // $80C5: STA $17
    this.dataCache.bankLock = 0;    // 初始不锁定

    this.stateMachine.transitionTo(0);
    this.gameLoop.start();
    this.state = 'running';

    if (this.options.debug) {
      console.log('[Tsubasa] Game started, PPU: ctrl=$' +
        this.dataCache.ppuCtrl.toString(16) +
        ' mask=$' + this.dataCache.ppuMask.toString(16));
    }
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
