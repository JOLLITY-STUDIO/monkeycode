/**
 * 状态机 - 游戏状态分发器
 * 替代 $81F7-$8263 的状态跳转表机制
 *
 * 原始 ROM 中 $84D2 是核心状态分发器:
 *   - 高4位 (bits 7-4): 选择 PRG Bank (写入 $1C)
 *   - 低4位 (bits 3-0): 子状态索引 (通过跳转表分发)
 *
 * 状态 ID 编码:
 *   $10 → Bank 1, 子状态 0 (标题初始化)
 *   $5D → Bank 5, 子状态 D (标题动画?)
 *   $60 → Bank 6, 子状态 0 (菜单)
 *
 * 状态存储: $03CA (dataCache.gameState)
 * 跳转表地址: $81FD
 *
 * 主状态列表 (顶层):
 *   0: Init/Title     → 调用 $84D2 with $10
 *   1: Title Loop     → 调用 $84D2 with $5D
 *   2: Menu Select    → 调用 $84D2 with $60
 *   3: Team Select    → 调用 $84D2 with custom
 *   4: Match Main     → 调用 $84D2 with custom
 *   5: Match Event    → 调用 $84D2 with custom
 */

import type { DataCache } from '../cache/DataCache';
import type { InputManager } from '../input/InputManager';
import type { Renderer } from '../renderer/Renderer';
import type { OamCache } from '../cache/OamCache';
import type { BankManager } from '../cache/BankManager';
import type { PpuQueue } from '../cache/PpuQueue';
import { Bank1Dispatcher } from './Bank1Dispatcher';

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

/** 状态ID → $84D2 参数的映射 */
const STATE_DISPATCH_MAP: Record<number, { bankId: number; subStateId: number }> = {
  0: { bankId: 1, subStateId: 0 },   // $10 → Bank 1, sub-state 0 (标题初始化)
  1: { bankId: 1, subStateId: 2 },   // $12 → Bank 1, sub-state 2 (标题动画)
  2: { bankId: 1, subStateId: 5 },   // $15 → Bank 1, sub-state 5 (菜单初始化)
  3: { bankId: 1, subStateId: 6 },   // $16 → Bank 1, sub-state 6 (菜单循环/队伍选择共用)
  4: { bankId: 4, subStateId: 0 },   // $40 → Bank 4, sub-state 0 (比赛主循环)
  5: { bankId: 4, subStateId: 1 },   // $41 → Bank 4, sub-state 1 (比赛事件)
};

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

  /** Bank 1 子状态调度器 */
  private bank1Dispatcher: Bank1Dispatcher;

  /** 当前激活的 PRG Bank (用于 Bank 子状态调度) */
  private activePrgBank: number = 0;

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

    this.bank1Dispatcher = new Bank1Dispatcher(
      dataCache, bankManager, renderer, oamCache, ppuQueue, inputManager,
    );
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

  /**
   * 跳转到指定状态
   *
   * 对应 ROM 中 $81F7:
   *   LDA $03CA        ; 读取状态ID
   *   JSR $834D        ; 通过跳转表获取处理地址
   *   (跳转表数据)      ; 每个状态的处理入口
   *   → 处理入口调用 $84D2(stateId) 进行 Bank 切换 + 子状态调度
   */
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

    // 执行 $84D2 风格的 Bank 切换 + 子状态调度
    this.dispatchBankState(stateId);

    newState.onEnter();
  }

  /**
   * 执行 $84D2 风格的 Bank 切换 + 子状态调度
   *
   * 对应 ROM $84D2:
   *   PHA           ; 保存状态ID
   *   LSR x4         ; 提取高4位
   *   JSR $83C5      ; 写入 PRG Bank 寄存器 ($1C)
   *   PLA            ; 恢复状态ID
   *   AND #$0F       ; 提取低4位
   *   STA $05FC      ; 存储子状态索引
   *   ASL / ADC      ; ×3 (跳转表条目为3字节?)
   *   JMP ($05FB)    ; 跳转到对应处理函数
   *
   * @param stateId 原始状态ID (如 $10, $5D, $60)
   */
  private dispatchBankState(stateId: number): void {
    const dispatch = STATE_DISPATCH_MAP[stateId];
    if (!dispatch) {
      console.warn(`[StateMachine] No dispatch mapping for state ${stateId}`);
      return;
    }

    const { bankId, subStateId } = dispatch;

    // 切换 PRG Bank
    this.bankManager.prgBank0 = bankId;
    this.dataCache.mmcBankReg2 = bankId;
    this.activePrgBank = bankId;

    console.log(`[StateMachine] Dispatch: state=$${stateId.toString(16)} → PRG Bank ${bankId}, sub-state ${subStateId}`);

    // 根据 Bank 初始化子状态调度器
    switch (bankId) {
      case 1:
        this.bank1Dispatcher.init(subStateId);
        break;
      case 4:
      case 5:
      case 6:
        // TODO: 实现其他 Bank 的子状态调度器
        console.log(`[StateMachine] Bank ${bankId} dispatcher not yet implemented`);
        break;
      default:
        console.warn(`[StateMachine] Unknown PRG Bank ${bankId}`);
        break;
    }
  }

  /** 每帧更新 */
  update(): void {
    // 首先处理 Bank 子状态调度器
    if (this.activePrgBank === 1) {
      this.bank1Dispatcher.update();
    }

    // 然后更新当前顶层状态
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
  /** 获取 Bank 1 调度器 */
  getBank1Dispatcher(): Bank1Dispatcher { return this.bank1Dispatcher; }
}
