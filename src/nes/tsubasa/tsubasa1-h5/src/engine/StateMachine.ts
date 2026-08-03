/**
 * 状态机 - 游戏状态分发器
 * 替代 $81F7-$8263 的状态跳转表机制
 *
 * 状态存储: $03CA (dataCache.gameState)
 * 跳转表地址: $81FD
 *
 * 状态列表:
 *   0: Init/Title     ($82A1)
 *   1: Title Loop     ($82A7)
 *   2: Menu Select    ($8276)
 *   3: Team Select    ($8264)
 *   4: Match Main     ($826A)
 *   5: Match Event    ($8270)
 *   6: Transition     (TBD)
 *   7: Result         (TBD)
 */

import type { DataCache } from '../cache/DataCache';
import type { InputManager } from '../input/InputManager';
import type { Renderer } from '../renderer/Renderer';
import type { OamCache } from '../cache/OamCache';
import type { BankManager } from '../cache/BankManager';
import type { PpuQueue } from '../cache/PpuQueue';

/** 游戏状态接口 */
export interface IGameState {
  /** 状态ID */
  readonly id: number;
  /** 进入状态时调用 */
  onEnter(): void;
  /** 每帧更新 */
  onUpdate(): void;
  /** 退出状态时调用 */
  onExit(): void;
}

export class StateMachine {
  private states: Map<number, IGameState> = new Map();
  private currentState: IGameState | null = null;
  private currentStateId: number = -1;

  private dataCache: DataCache;
  private inputManager: InputManager;
  private renderer: Renderer;
  private oamCache: OamCache;
  private bankManager: BankManager;
  private ppuQueue: PpuQueue;

  constructor(
    dataCache: DataCache,
    inputManager: InputManager,
    renderer: Renderer,
    oamCache: OamCache,
    bankManager: BankManager,
    ppuQueue: PpuQueue,
  ) {
    this.dataCache = dataCache;
    this.inputManager = inputManager;
    this.renderer = renderer;
    this.oamCache = oamCache;
    this.bankManager = bankManager;
    this.ppuQueue = ppuQueue;
  }

  /** 注册状态 */
  registerState(state: IGameState): void {
    this.states.set(state.id, state);
  }

  /** 批量注册状态 */
  registerStates(states: IGameState[]): void {
    for (const state of states) {
      this.registerState(state);
    }
  }

  /** 跳转到指定状态 */
  transitionTo(stateId: number): void {
    if (this.currentState && this.currentState.id === stateId) return;

    // 退出当前状态
    if (this.currentState) {
      this.currentState.onExit();
    }

    // 进入新状态
    const newState = this.states.get(stateId);
    if (!newState) {
      console.warn(`State ${stateId} not registered, staying in ${this.currentStateId}`);
      return;
    }

    this.currentState = newState;
    this.currentStateId = stateId;
    this.dataCache.gameState = stateId;
    newState.onEnter();
  }

  /** 每帧更新 */
  update(): void {
    if (this.currentState) {
      this.currentState.onUpdate();
    }
  }

  /** 获取当前状态 */
  getCurrentState(): IGameState | null {
    return this.currentState;
  }

  /** 获取当前状态ID */
  getCurrentStateId(): number {
    return this.currentStateId;
  }

  /** 获取 DataCache */
  getDataCache(): DataCache { return this.dataCache; }
  /** 获取 InputManager */
  getInputManager(): InputManager { return this.inputManager; }
  /** 获取 Renderer */
  getRenderer(): Renderer { return this.renderer; }
  /** 获取 OamCache */
  getOamCache(): OamCache { return this.oamCache; }
  /** 获取 BankManager */
  getBankManager(): BankManager { return this.bankManager; }
  /** 获取 PpuQueue */
  getPpuQueue(): PpuQueue { return this.ppuQueue; }
}
