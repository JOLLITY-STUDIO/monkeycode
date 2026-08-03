/**
 * 主游戏类 - 外部唯一接口
 * 即插即用: new Tsubasa(ctx).start()
 *
 * 负责:
 *   1. 创建和连接所有子系统
 *   2. 提供简化的外部接口
 *   3. 管理游戏生命周期
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
} from '../engine/states';
import { Button, GameInput } from './types';

/** 游戏配置选项 */
export interface TsubasaOptions {
  /** 精灵表基础路径 */
  spriteBasePath?: string;
  /** 缩放倍数 (默认2x) */
  scale?: number;
  /** 自动加载精灵表 (默认true) */
  autoLoadSprites?: boolean;
  /** 调试模式 */
  debug?: boolean;
}

/** 游戏状态 (对外) */
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
  private ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D, options: TsubasaOptions = {}) {
    this.ctx = ctx;
    this.options = {
      spriteBasePath: '/sprites/',
      scale: 2,
      autoLoadSprites: true,
      debug: false,
      ...options,
    };

    this.initialize();
  }

  /** 初始化所有子系统 */
  private initialize(): void {
    this.state = 'loading';

    // 1. 数据缓存中心
    this.dataCache = new DataCache();

    // 2. OAM 缓存
    this.oamCache = new OamCache();

    // 3. PPU 队列
    this.ppuQueue = new PpuQueue();

    // 4. Bank 管理器
    this.bankManager = new BankManager();

    // 5. 输入管理器
    this.inputManager = new InputManager();

    // 6. 渲染器
    this.renderer = new Renderer(this.ctx);
    this.renderer.setBankManager(this.bankManager);

    // 7. 状态机
    this.stateMachine = new StateMachine(
      this.dataCache,
      this.inputManager,
      this.renderer,
      this.oamCache,
      this.bankManager,
      this.ppuQueue,
    );

    // 注册所有状态
    this.stateMachine.registerStates([
      new State00_InitTitle(this.stateMachine),
      new State01_TitleLoop(this.stateMachine),
      new State02_MenuSelect(this.stateMachine),
      new State03_TeamSelect(this.stateMachine),
      new State04_MatchMain(this.stateMachine),
      new State05_MatchEvent(this.stateMachine),
    ]);

    // 8. NMI 处理器
    this.nmiHandler = new NmiHandler(
      this.dataCache,
      this.oamCache,
      this.ppuQueue,
      this.bankManager,
      this.inputManager,
      this.renderer,
      this.stateMachine,
    );

    // 9. 游戏循环
    this.gameLoop = new GameLoop(this.nmiHandler, this.renderer);

    if (this.options.debug) {
      console.log('[Tsubasa] All subsystems initialized');
    }

    this.state = 'ready';
  }

  /**
   * 启动游戏
   * 异步加载精灵表后进入标题画面
   */
  async start(): Promise<void> {
    if (this.state === 'running') return;

    // 加载精灵表
    if (this.options.autoLoadSprites) {
      try {
        await this.renderer.loadAllChrBanks(this.options.spriteBasePath);
        if (this.options.debug) {
          console.log('[Tsubasa] All CHR banks loaded');
        }
      } catch (err) {
        console.warn('[Tsubasa] Failed to load CHR banks, using placeholder graphics:', err);
      }
    }

    // 初始化 MMC1 (模拟 RESET 配置)
    this.bankManager.setInitialConfig();

    // 进入初始状态
    this.stateMachine.transitionTo(0);

    // 启动游戏循环
    this.gameLoop.start();
    this.state = 'running';

    if (this.options.debug) {
      console.log('[Tsubasa] Game started');
    }
  }

  /** 暂停游戏 */
  pause(): void {
    if (this.state !== 'running') return;
    this.gameLoop.pause();
    this.state = 'paused';
  }

  /** 恢复游戏 */
  resume(): void {
    if (this.state !== 'paused') return;
    this.gameLoop.resume();
    this.state = 'running';
  }

  /** 停止游戏 */
  stop(): void {
    this.gameLoop.stop();
    this.state = 'stopped';
  }

  /** 处理输入 (触摸屏/虚拟手柄) */
  handleInput(input: GameInput): void {
    if (this.state !== 'running') return;
    this.inputManager.setExternalButtons(input.pressed | input.held);
  }

  /** 按下单个按键 */
  pressButton(button: Button): void {
    this.inputManager.pressButton(button);
  }

  /** 释放单个按键 */
  releaseButton(button: Button): void {
    this.inputManager.releaseButton(button);
  }

  /** 获取当前游戏状态 */
  getState(): TsubasaState {
    return this.state;
  }

  /** 获取FPS */
  getFps(): number {
    return this.gameLoop.getFps();
  }

  /** 获取帧计数 */
  getFrameCount(): number {
    return this.gameLoop.getFrameCount();
  }

  /** 获取当前状态机状态ID */
  getCurrentGameState(): number {
    return this.stateMachine.getCurrentStateId();
  }

  /** 获取调试信息 */
  getDebugInfo(): Record<string, any> {
    return {
      state: this.state,
      fps: this.gameLoop.getFps(),
      frame: this.gameLoop.getFrameCount(),
      gameState: this.stateMachine.getCurrentStateId(),
      ram: this.dataCache.debugSnapshot(),
      banks: this.bankManager.getConfig(),
    };
  }

  /** 销毁游戏实例 */
  destroy(): void {
    this.stop();
    this.dataCache.clear();
    this.oamCache.clear();
    this.ppuQueue.clear();
  }
}
