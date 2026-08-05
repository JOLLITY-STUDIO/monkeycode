/**
 * 天使之翼1 — 游戏状态机
 * 对应原 Bank 0: $81F7-$8263 (State Dispatcher)
 * 
 * 状态跳转表 (原 $81FD-$820B):
 *   State 0 → $82A1: 开场动画
 *   State 1 → $82A7: 标题画面
 *   State 2 → $8276: 菜单选择
 *   State 3 → $85CD: 比赛初始化 (Bank 0内部)
 *   State 4 → $87B9: 比赛主循环 (Bank 0内部)
 *   State 5 → $820D: 状态转换管理器
 *   State 6 → $8264: 事件处理
 *   State 7 → $8270: 比赛结果
 */

import { DataStore } from '../data/DataStore';
import { GameState } from './types';
import { BankDispatcher } from './BankDispatcher';

/**
 * 状态处理器接口
 * 每个游戏状态对应一个处理函数
 */
export interface StateHandler {
  /** 状态进入时调用 */
  enter?(): void;
  /** 每帧调用 */
  execute(): void;
  /** 状态退出时调用 */
  exit?(): void;
}

export class StateMachine {
  private ds: DataStore;
  private bankDispatcher: BankDispatcher;
  private _handlers: Map<number, StateHandler> = new Map();
  
  /** 内联状态处理器 (不在Bank中的直接代码) */
  private _matchInitHandler: StateHandler | null = null;
  private _matchLoopHandler: StateHandler | null = null;
  private _transitionHandler: StateHandler | null = null;
  
  private _prevState: number = -1;
  
  constructor(ds: DataStore, bankDispatcher: BankDispatcher) {
    this.ds = ds;
    this.bankDispatcher = bankDispatcher;
  }
  
  // ==================== 注册处理器 ====================
  
  /** 注册Bank调度的状态处理器 */
  registerBankState(state: GameState, bankId: number, subId: number): void {
    this._handlers.set(state, {
      execute: () => this.bankDispatcher.callDirect(bankId, subId),
    });
  }
  
  /** 注册内联状态处理器 (直接代码，不走Bank调度) */
  registerInlineState(state: GameState, handler: StateHandler): void {
    switch (state) {
      case GameState.MATCH_INIT: this._matchInitHandler = handler; break;
      case GameState.MATCH_LOOP: this._matchLoopHandler = handler; break;
      case GameState.TRANSITION: this._transitionHandler = handler; break;
    }
    this._handlers.set(state, handler);
  }
  
  /** 注册默认处理器 */
  registerDefaultHandlers(): void {
    // State 0: 开场动画 → Bank 1, Sub 0
    this.registerBankState(GameState.OPENING, 1, 0);
    
    // State 1: 标题画面 → Bank 5, Sub 13 ($0D)
    this.registerBankState(GameState.TITLE, 5, 0x0D);
    
    // State 2: 菜单选择 → Bank 6, Sub 0
    this.registerBankState(GameState.MENU, 6, 0);
    
    // State 3-5: 内联 (在Bank 0内部，需要外部注册)
    // State 6: 事件处理 → Bank 6, Sub 3
    this.registerBankState(GameState.EVENT, 6, 3);
    
    // State 7: 比赛结果 → Bank 6, Sub 1
    this.registerBankState(GameState.RESULT, 6, 1);
  }
  
  // ==================== 状态分发 (主循环每帧调用) ====================
  
  /**
   * 游戏状态分发
   * 对应原始:
   *   $81F7: LDA ram_03CA
   *   $81FA: JSR $834D    → 间接跳转 (A*2 查后续跳转表)
   *                         → $81FD-$820B 跳转表
   */
  dispatch(): void {
    const state = this.ds.gameState;
    
    // 状态切换检测
    if (state !== this._prevState) {
      // 退出旧状态
      const oldHandler = this._handlers.get(this._prevState);
      oldHandler?.exit?.();
      
      // 进入新状态
      const newHandler = this._handlers.get(state);
      newHandler?.enter?.();
      
      this._prevState = state;
      
      if (newHandler) {
        console.log(`[StateMachine] State ${this._prevState}(${GameState[this._prevState]}) → ${state}(${GameState[state]})`);
      }
    }
    
    // 执行当前状态
    const handler = this._handlers.get(state);
    if (handler) {
      handler.execute();
    } else {
      console.warn(`[StateMachine] 未注册的状态处理器: State ${state} (${GameState[state] ?? 'UNKNOWN'})`);
    }
  }
  
  // ==================== 状态转换辅助 ====================
  
  /**
   * 切换到指定状态
   * 对应原始: INC ram_03CA (前进) / DEC ram_03CA (后退) / STA ram_03CA (跳转)
   */
  transitionTo(state: GameState): void {
    this.ds.gameState = state;
    this.ds.subState = 0;
    this.ds.subState2 = 0;
  }
  
  /** 前进到下一个状态 */
  advanceState(): void {
    const nextState = this.ds.gameState + 1;
    if (nextState <= 7) {
      this.transitionTo(nextState as GameState);
    }
  }
  
  /** 后退到上一个状态 */
  retreatState(): void {
    const prevState = this.ds.gameState - 1;
    if (prevState >= 0) {
      this.transitionTo(prevState as GameState);
    }
  }
  
  /**
   * State 5 — 状态转换管理器
   * 对应原始: $820D-$8263
   * 
   * 负责比赛中的状态转换判断:
   *   - 半场结束 → 回State 4或到State 6
   *   - 终场 → State 6
   *   - 进球 → State 6
   */
  transitionManager(): void {
    // 使用 ram_03E5 作为计数器
    this.ds.transCounter++;
    const count = this.ds.transCounter;
    
    // 重置子状态
    this.ds.matchSubState = 0;
    this.ds.matchSubState2 = 0;
    
    // 简化的原始逻辑 (详细实现见 bank_04):
    // 首次调用: INC ram_03CA → State 6
    // 第二次: 检查比分/阶段
    // ...
    
    if (count === 1) {
      // 首次: 直接前进到事件处理
      this.advanceState();
    } else if (count === 2) {
      // 检查比分是否相同
      if (this.ds.scoreA !== this.ds.scoreB) {
        this.advanceState(); // 比分不同 → 事件
      } else if (this.ds.matchPhase >= 7) {
        this.advanceState(); // 比赛结束
      } else {
        this.transitionTo(GameState.MATCH_LOOP); // 回到比赛
        this.ds.transCounter = 4;
      }
    } else if (count === 3) {
      this.retreatState(); // 回到比赛
    } else {
      this.advanceState(); // 继续前进
    }
  }
  
  // ==================== 查询 ====================
  
  getCurrentState(): GameState { return this.ds.gameState; }
  getCurrentStateName(): string { return GameState[this.ds.gameState] ?? `UNKNOWN(${this.ds.gameState})`; }
  isMatchActive(): boolean {
    const s = this.ds.gameState;
    return s === GameState.MATCH_INIT || s === GameState.MATCH_LOOP || s === GameState.TRANSITION;
  }
}
