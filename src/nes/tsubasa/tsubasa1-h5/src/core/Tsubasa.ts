/**
 * 天使之翼1 — 主入口类
 * 
 * 对外暴露的惟二接口:
 *   const game = new Tsubasa(canvasContext);
 *   game.start();
 * 
 * 外部无需了解游戏内核逻辑，只需:
 *   1. 提供 CanvasRenderingContext2D
 *   2. 调用 start() 启动游戏
 *   3. 通过 setButton() 发送操作事件
 *   4. 通过 getDebugInfo() 获取调试信息
 */

import { DataStore } from '../data/DataStore';
import { GameLoop } from './GameLoop';
import { StateMachine } from './StateMachine';
import { NmiHandler } from './NmiHandler';
import { BankDispatcher } from './BankDispatcher';
import { PpuQueue } from '../engine/PpuQueue';
import { InputManager } from '../engine/InputManager';
import { Renderer } from '../render/Renderer';
import { RomReader, getRomReader } from '../data/RomReader';
import { Bank0Core } from '../game/Bank0Core';
import { SkeletonBank1, SkeletonBank5, SkeletonBank6 } from '../game/SkeletonBanks';
import { TsubasaOptions, DebugSnapshot, BUTTON, GameState } from './types';

/** 默认选项 */
const DEFAULT_OPTIONS: Required<TsubasaOptions> = {
  aiMode: false,
  scale: 2,
  debug: false,
  skipStates: 0,
};

export class Tsubasa {
  // ====== 核心组件 ======
  private _ds: DataStore;
  private _gameLoop: GameLoop;
  private _stateMachine: StateMachine;
  private _nmiHandler: NmiHandler;
  private _bankDispatcher: BankDispatcher;
  private _ppuQueue: PpuQueue;
  private _inputManager: InputManager;
  private _renderer: Renderer;
  private _romReader: RomReader;
  private _bank0Core: Bank0Core;
  
  // ====== 选项 ======
  private _options: Required<TsubasaOptions>;
  
  // ====== 状态 ======
  private _started: boolean = false;
  private _ctx: CanvasRenderingContext2D;
  
  /** 底层 Canvas 节点 (微信小程序中用于创建离屏Canvas) */
  private _canvasNode: any;

  /**
   * 构造函数
   * @param ctx Canvas 2D 渲染上下文
   * @param options 可选配置
   * @param canvasNode 微信小程序 Canvas 节点 (用于创建离屏Canvas)
   */
  constructor(ctx: CanvasRenderingContext2D, options?: TsubasaOptions, canvasNode?: any) {
    this._ctx = ctx;
    this._canvasNode = canvasNode;
    this._options = { ...DEFAULT_OPTIONS, ...options };
    
    // 初始化ROM读取器
    this._romReader = getRomReader();
    
    // 初始化核心组件 (依赖注入)
    this._ds = new DataStore();
    this._bankDispatcher = new BankDispatcher(this._ds);
    this._ppuQueue = new PpuQueue(this._ds);
    this._inputManager = new InputManager(this._ds);
    this._nmiHandler = new NmiHandler(this._ds, this._ppuQueue, this._inputManager, this._bankDispatcher);
    this._stateMachine = new StateMachine(this._ds, this._bankDispatcher);
    this._gameLoop = new GameLoop(this._ds, this._stateMachine, this._nmiHandler);
    this._renderer = new Renderer(ctx, this._ds, this._options.scale, canvasNode);
    
    // 连接渲染器
    this._gameLoop.setRenderer(this._renderer);
    
    // 传递 Canvas 节点用于 requestAnimationFrame (微信小程序兼容)
    if (canvasNode) {
      this._gameLoop.setCanvasNode(canvasNode);
    }
    
    // 注册默认状态处理器
    this._stateMachine.registerDefaultHandlers();
    
    // 注册Bank 0内联状态 (State 3/4/5)
    this._bank0Core = new Bank0Core(this._ds, this._stateMachine, this._bankDispatcher);
    this._bank0Core.register();
    
    // 注册骨架Bank模块 (Bank 1/5/6) — 后续会被完整实现替换
    const skBank1 = new SkeletonBank1(this._ds, this._stateMachine);
    const skBank5 = new SkeletonBank5(this._ds, this._stateMachine);
    const skBank6 = new SkeletonBank6(this._ds, this._stateMachine);
    this._bankDispatcher.registerBank(skBank1);
    this._bankDispatcher.registerBank(skBank5);
    this._bankDispatcher.registerBank(skBank6);
    
    // 设置ROM读取器
    this._setupRomReader();
    
    // AI模式
    if (this._options.aiMode) {
      this._inputManager.enableAi();
    }
    
    // 调试模式
    if (this._options.debug) {
      this._gameLoop.onFrame((frame) => {
        if (frame % 60 === 0) {
          const info = this.getDebugInfo();
          console.log(`[Tsubasa] Frame ${info.frame} | State: ${info.gameStateName} | ` +
            `Score: ${info.scoreA}-${info.scoreB} | Phase: ${info.matchPhase} | ` +
            `FPS: ${this._gameLoop.fps}`);
        }
      });
    }
  }
  
  // ==================== 生命周期 API ====================
  
  /**
   * 启动游戏
   * 执行RESET初始化 → 进入主循环
   */
  start(): void {
    if (this._started) {
      console.warn('[Tsubasa] 游戏已经启动');
      return;
    }
    
    this._started = true;
    console.log('[Tsubasa] 🏆 天使之翼1 — 开始!');
    
    // 初始化CHR Bank (空数据 — 需要外部加载)
    // 初始化PRG Bank (空数据 — 需要外部加载)
    
    // 启动主循环
    this._gameLoop.start();
  }
  
  /**
   * 暂停游戏
   */
  pause(): void {
    this._gameLoop.pause();
  }
  
  /**
   * 恢复游戏
   */
  resume(): void {
    this._gameLoop.resume();
  }
  
  /**
   * 重置游戏
   */
  reset(): void {
    this._gameLoop.stop();
    this._started = false;
    this._ds.reset();
    this.start();
  }
  
  // ==================== 操作 API ====================
  
  /**
   * 设置玩家1按键 (位掩码)
   * @param buttons 按键位掩码 (参见 BUTTON 常量)
   */
  setButton1(buttons: number): void {
    this._inputManager.setJoy1Buttons(buttons);
  }
  
  /**
   * 设置玩家2按键 (位掩码)
   */
  setButton2(buttons: number): void {
    this._inputManager.setJoy2Buttons(buttons);
  }
  
  /**
   * 按下单个按键
   * @param button 按键名 ('A' | 'B' | 'START' | 'SELECT' | 'UP' | 'DOWN' | 'LEFT' | 'RIGHT')
   */
  pressButton(button: keyof typeof BUTTON): void {
    this._inputManager.pressJoy1(button);
  }
  
  /**
   * 释放单个按键
   */
  releaseButton(button: keyof typeof BUTTON): void {
    this._inputManager.releaseJoy1(button);
  }
  
  // ==================== AI 模式 API ====================
  
  /** 开启AI自动挂机 */
  enableAi(): void {
    this._inputManager.enableAi();
    console.log('[Tsubasa] AI模式已开启');
  }
  
  /** 关闭AI自动挂机 */
  disableAi(): void {
    this._inputManager.disableAi();
    console.log('[Tsubasa] AI模式已关闭');
  }
  
  /** AI设置模拟按键 */
  setAiButtons(joy1: number, joy2?: number): void {
    this._inputManager.setAiButtons(joy1, joy2 ?? 0);
  }
  
  // ==================== 数据 API ====================
  
  /**
   * 加载CHR Bank数据
   * @param bankId Bank编号 (0-31, 每个4KB)
   * @param data 4096字节的CHR tile数据
   */
  loadChrBank(bankId: number, data: Uint8Array): void {
    this._renderer.loadChrBank(bankId, data);
  }
  
  /**
   * 加载PRG Bank数据
   * @param bankId Bank编号 (0-7)
   * @param data 16KB的PRG数据
   */
  loadPrgBank(bankId: number, data: Uint8Array): void {
    this._romReader.loadBank(bankId, data);
  }
  
  /**
   * 从base64批量加载PRG Bank
   * @param banks [{ bankId, base64 }] 格式的数据
   */
  loadPrgBanks(banks: { bankId: number; base64: string }[]): void {
    for (const entry of banks) {
      const binary = atob(entry.base64);
      const size = binary.length;
      const data = new Uint8Array(size);
      for (let i = 0; i < size; i++) {
        data[i] = binary.charCodeAt(i);
      }
      this.loadPrgBank(entry.bankId, data);
    }
  }
  
  // ==================== 调试 API ====================
  
  /**
   * 获取调试信息快照
   */
  getDebugInfo(): DebugSnapshot {
    return this._ds.getDebugSnapshot();
  }
  
  /**
   * 获取当前游戏状态
   */
  getCurrentState(): GameState {
    return this._ds.gameState;
  }
  
  /**
   * 获取帧数
   */
  getFrameCount(): number {
    return this._ds.frameCounter;
  }
  
  /**
   * 获取FPS
   */
  getFps(): number {
    return this._gameLoop.fps;
  }
  
  /**
   * 获取canvas尺寸
   */
  getCanvasSize(): { width: number; height: number } {
    return this._renderer.getCanvasSize();
  }
  
  /**
   * 获取比分
   */
  getScore(): { a: number; b: number } {
    return { a: this._ds.scoreA, b: this._ds.scoreB };
  }
  
  // ==================== 内部方法 ====================
  
  /**
   * 设置ROM读取器
   * 根据CPU地址 $8000-$FFFF 读取对应Bank的数据
   */
  private _setupRomReader(): void {
    const romReader = (addr: number): number => {
      return this._romReader.read(addr);
    };
    
    this._nmiHandler.setRomReader(romReader);
  }
  
  /** 获取底层 DataStore (仅供调试页面使用) */
  _getDataStore(): DataStore { return this._ds; }
  
  /** 获取渲染器 (仅供调试页面使用) */
  _getRenderer(): Renderer { return this._renderer; }
  
  /** 获取输入管理器 */
  _getInputManager(): InputManager { return this._inputManager; }
}
