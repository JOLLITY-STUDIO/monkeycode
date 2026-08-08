/**
 * 天使之翼1 — AI 自动挂机
 * 
 * 自动控制整个游戏流程:
 *   State 0 (Opening): 按START加速跳过
 *   State 1 (Title): 按START进入
 *   State 2 (Menu): 选择游戏模式
 *   State 3-4 (Match): 玩家AI控制 (已由 AiController 处理)
 *   State 5-7 (Transition/Event/Result): 按A继续
 * 
 * 用法:
 *   const ai = new AiAutoPlay(ds, inputManager);
 *   gameLoop.onFrame(() => ai.tick());
 */

import { DataStore } from '../data/DataStore';
import { InputManager } from '../engine/InputManager';
import { GameState, BUTTON } from '../core/types';

/** 自动挂机状态 */
interface AutoPlayState {
  lastAction: number;     // 上次操作帧
  currentButton: number;  // 当前按下的按键
  pressedFrames: number;  // 按住帧数
  stateStartFrame: number;// 进入当前状态时的帧
}

export class AiAutoPlay {
  private ds: DataStore;
  private input: InputManager;
  private _enabled: boolean = false;
  private _state: AutoPlayState;
  private _lastGameState: GameState = GameState.OPENING;
  private _log: string[] = [];
  
  /** 帧回调 */
  onLog: ((msg: string) => void) | null = null;
  
  constructor(ds: DataStore, input: InputManager) {
    this.ds = ds;
    this.input = input;
    this._state = {
      lastAction: 0,
      currentButton: 0,
      pressedFrames: 0,
      stateStartFrame: 0,
    };
  }
  
  /** 启用/禁用 */
  set enabled(val: boolean) {
    this._enabled = val;
    if (!val) {
      this.input.setJoy1Buttons(0);
      this._state.currentButton = 0;
    }
    this._logEvent(val ? '🤖 AI Auto-Play ENABLED' : '🛑 AI Auto-Play DISABLED');
  }
  get enabled(): boolean { return this._enabled; }
  
  /**
   * 每帧调用 (在输入处理之前)
   */
  tick(): void {
    if (!this._enabled) return;
    
    const frame = this.ds.frameCounter;
    const gs = this.ds.gameState;
    
    // 检测状态变化
    if (gs !== this._lastGameState) {
      this._state.stateStartFrame = frame;
      this._state.pressedFrames = 0;
      this._state.currentButton = 0;
      this._logEvent(`State → ${this._getStateName(gs)}`);
      this._lastGameState = gs;
    }
    
    // 每N帧决策一次
    if (frame - this._state.lastAction < 8) return;
    this._state.lastAction = frame;
    
    // 释放当前按键
    this.input.setJoy1Buttons(0);
    this._state.currentButton = 0;
    
    // 根据状态决策
    switch (gs) {
      case GameState.OPENING:
        this._handleOpening(frame);
        break;
      case GameState.TITLE:
        this._handleTitle(frame);
        break;
      case GameState.MENU:
        this._handleMenu(frame);
        break;
      case GameState.MATCH_INIT:
        this._handleMatchInit(frame);
        break;
      case GameState.MATCH_LOOP:
        this._handleMatchLoop(frame);
        break;
      case GameState.TRANSITION:
        this._handleTransition(frame);
        break;
      case GameState.EVENT:
        this._handleEvent(frame);
        break;
      case GameState.RESULT:
        this._handleResult(frame);
        break;
    }
  }
  
  // ==================== 各状态处理 ====================
  
  /** 开场动画: 按START跳过 */
  private _handleOpening(frame: number): void {
    const elapsed = frame - this._state.stateStartFrame;
    if (elapsed > 60) {
      this._press(BUTTON.START);
    }
  }
  
  /** 标题画面: 按START进入 */
  private _handleTitle(frame: number): void {
    const elapsed = frame - this._state.stateStartFrame;
    if (elapsed > 30) {
      this._press(BUTTON.START);
    }
  }
  
  /** 菜单: 按A选择 */
  private _handleMenu(frame: number): void {
    const elapsed = frame - this._state.stateStartFrame;
    if (elapsed > 30) {
      this._press(BUTTON.A);
    }
  }
  
  /** 比赛初始化: 等待 */
  private _handleMatchInit(_frame: number): void {
    // 什么都不做，等初始化完成
  }
  
  /** 比赛主循环: AI已由AiController处理，这里什么都不做 */
  private _handleMatchLoop(_frame: number): void {
    // 玩家操作用AI控制，已由MatchEngine.ai处理
    // 这里不需要额外操作
  }
  
  /** 状态转换: 等待 */
  private _handleTransition(_frame: number): void {
    // 自动转换，无需操作
  }
  
  /** 事件画面: 按A继续 */
  private _handleEvent(frame: number): void {
    const elapsed = frame - this._state.stateStartFrame;
    if (elapsed > 60) {
      this._press(BUTTON.A);
    }
  }
  
  /** 结果画面: 按A继续 */
  private _handleResult(frame: number): void {
    const elapsed = frame - this._state.stateStartFrame;
    if (elapsed > 60) {
      this._press(BUTTON.A);
    }
  }
  
  // ==================== 按键辅助 ====================
  
  private _press(button: number): void {
    this._state.currentButton = button;
    this.input.setJoy1Buttons(button);
    this._state.pressedFrames++;
  }
  
  // ==================== 日志 ====================
  
  private _logEvent(msg: string): void {
    this._log.push(`[Frame ${this.ds.frameCounter}] ${msg}`);
    console.log(`[AutoPlay] ${msg}`);
    if (this.onLog) this.onLog(msg);
  }
  
  private _getStateName(gs: GameState): string {
    const names: Record<number, string> = {
      0: 'OPENING', 1: 'TITLE', 2: 'MENU',
      3: 'MATCH_INIT', 4: 'MATCH_LOOP', 5: 'TRANSITION',
      6: 'EVENT', 7: 'RESULT',
    };
    return names[gs] || `UNKNOWN(${gs})`;
  }
  
  /** 获取日志 */
  get log(): string[] { return [...this._log]; }
}
