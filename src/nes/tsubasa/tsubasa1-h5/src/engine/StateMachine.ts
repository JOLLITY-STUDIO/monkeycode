/**
 * 状态机 - 游戏状态分发器
 *
 * 基于 ASM 源码分析 ($81F7-$8263) 重写。
 *
 * === 跳转表 ($81FD-$820C) ===
 *  State 0 → $82A1 → $84D2($10) → Bank 1, Sub 0  开场动画+标题
 *  State 1 → $82A7 → $84D2($5D) → Bank 5, Sub D
 *  State 2 → $8276 → $84D2($60) → Bank 6, Sub 0
 *  State 3 → $85CD → 直接代码+$84D2($5A) → Bank 5, Sub A  比赛初始化(自动→State 4)
 *  State 4 → $87B9 → 直接代码  比赛主循环
 *  State 5 → $820D → 直接代码  状态转换管理器
 *  State 6 → $8264 → $84D2($63) → Bank 6, Sub 3  事件处理
 *  State 7 → $8270 → $84D2($61) → Bank 6, Sub 1  比赛结果
 *
 * === $84D2 函数 ($84D2-$84EC) ===
 *  高4位 = PRG Bank编号, 低4位 = Sub-state索引 (跳转到 $C000 + sub*3)
 *
 * === 状态流转 ===
 *  State 0 (开场) → State 5 → State 1 → State 5 → State 2 → State 5
 *    → State 3 (比赛初始化, 自动→State 4) → State 4 (比赛主循环)
 *    → State 6 (事件) / State 5 (转换器) → State 7 (结果) / State 4 (继续)
 */

import type { DataCache } from '../cache/DataCache';
import type { InputManager } from '../input/InputManager';
import type { Renderer } from '../renderer/Renderer';
import type { OamCache } from '../cache/OamCache';
import type { BankManager } from '../cache/BankManager';
import type { PpuQueue } from '../cache/PpuQueue';
import type { GameModel } from '../model/GameModel';
import type { AudioEngine } from '../audio/AudioEngine';
import { Bank1Dispatcher } from './Bank1Dispatcher';
import { OpeningScenePlayer } from './OpeningScenePlayer';

/** 游戏状态接口 */
export interface IGameState {
  readonly id: number;
  onEnter(): void;
  onUpdate(): void;
  onExit(): void;
}

/**
 * $84D2 调度参数:
 *   highNibble = PRG Bank (0-7)
 *   lowNibble  = Sub-state index
 * $84D2 格式: param = (bankId << 4) | subStateId
 */
interface DispatchParam {
  /** 目标 PRG Bank (高4位) */
  bankId: number;
  /** 子状态索引 (低4位), 跳转到 $C000 + sub*3 */
  subStateId: number;
}

/**
 * 状态类型:
 *   'dispatch' = 通过 $84D2 切换 Bank + 子状态
 *   'direct'   = 直接在 Bank 0 执行, 不切换 Bank
 */
type StateType = 'dispatch' | 'direct';

interface StateEntry {
  type: StateType;
  dispatch?: DispatchParam;
}

/**
 * 状态调度表 — 与 ASM $81FD 跳转表完全一致
 *
 * 格式说明:
 *   - dispatch 类型: state 处理器是 "LDA #$XX, JSR $84D2, RTS"
 *   - direct 类型:   state 处理器有自定义代码 (State 3/4/5)
 */
const STATE_TABLE: Record<number, StateEntry> = {
  // State 0: $82A1 → LDA #$10, JSR $84D2 → Bank 1, Sub 0
  0: { type: 'dispatch', dispatch: { bankId: 0x1, subStateId: 0x0 } },

  // State 1: $82A7 → LDA #$5D, JSR $84D2 → Bank 5, Sub D (0xD=13)
  1: { type: 'dispatch', dispatch: { bankId: 0x5, subStateId: 0xD } },

  // State 2: $8276 → LDA #$60, JSR $84D2 → Bank 6, Sub 0
  2: { type: 'dispatch', dispatch: { bankId: 0x6, subStateId: 0x0 } },

  // State 3: $85CD → 直接代码: 初始化比赛变量, JSR $84D2($5A), 然后 INC ram_03CA
  3: { type: 'direct' },

  // State 4: $87B9 → 直接代码: 比赛主循环 (无 $84D2)
  4: { type: 'direct' },

  // State 5: $820D → 直接代码: 状态转换管理器 (无 $84D2)
  5: { type: 'direct' },

  // State 6: $8264 → LDA #$63, JSR $84D2 → Bank 6, Sub 3
  6: { type: 'dispatch', dispatch: { bankId: 0x6, subStateId: 0x3 } },

  // State 7: $8270 → LDA #$61, JSR $84D2 → Bank 6, Sub 1
  7: { type: 'dispatch', dispatch: { bankId: 0x6, subStateId: 0x1 } },
};

/** 最大状态编号 (ASM 跳转表只有 8 条目, 索引 0-7) */
const MAX_STATE = 7;

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
  private model: GameModel;

  /** Bank 1 子状态调度器 */
  private bank1Dispatcher: Bank1Dispatcher;

  /** 开场动画播放器 (State 0 专用) */
  private openingPlayer: OpeningScenePlayer;

  /** 当前激活的 PRG Bank */
  private activePrgBank: number = -1;

  constructor(
    dataCache: DataCache,
    inputManager: InputManager,
    renderer: Renderer,
    oamCache: OamCache,
    bankManager: BankManager,
    ppuQueue: PpuQueue,
    model: GameModel,
    audioEngine: AudioEngine | null = null,
  ) {
    this.dataCache = dataCache;
    this.inputManager = inputManager;
    this.renderer = renderer;
    this.oamCache = oamCache;
    this.bankManager = bankManager;
    this.ppuQueue = ppuQueue;
    this.model = model;

    this.bank1Dispatcher = new Bank1Dispatcher(
      dataCache, bankManager, renderer, oamCache, ppuQueue, inputManager,
    );

    this.openingPlayer = new OpeningScenePlayer(
      dataCache, bankManager, renderer, oamCache, audioEngine,
    );
  }

  /** 注册状态 */
  registerState(state: IGameState): void {
    this.states.set(state.id, state);
  }

  /** 批量注册状态 */
  registerStates(states: IGameState[]): void {
    for (const s of states) {
      this.registerState(s);
    }
  }

  /**
   * 跳转到指定状态
   *
   * 对应 ROM $81F7-$8263:
   *   LDA ram_03CA → JSR $834D (间接跳转) → 跳转表 → State 处理器
   */
  transitionTo(stateId: number): void {
    // 验证状态ID
    if (stateId < 0 || stateId > MAX_STATE) {
      console.warn(`[StateMachine] Invalid state ID: ${stateId}, max=${MAX_STATE}`);
      return;
    }

    // 同状态不重复进入
    if (this.currentState && this.currentState.id === stateId) {
      return;
    }

    // 获取状态表条目
    const entry = STATE_TABLE[stateId];
    if (!entry) {
      console.warn(`[StateMachine] No STATE_TABLE entry for state ${stateId}`);
      return;
    }

    // 退出当前状态
    if (this.currentState) {
      this.currentState.onExit();
    }

    // 进入新状态
    const newState = this.states.get(stateId);
    if (!newState) {
      console.warn(`[StateMachine] State ${stateId} not registered`);
      return;
    }

    this.currentState = newState;
    this.currentStateId = stateId;
    this.dataCache.gameState = stateId;
    this.model.stateId = stateId;

    console.log(`[StateMachine] → State ${stateId} (type=${entry.type}${entry.dispatch ? `, bank=${entry.dispatch.bankId}, sub=${entry.dispatch.subStateId}` : ''})`);

    // State 0 特殊处理: 启动开场动画播放器
    if (stateId === 0) {
      this.openingPlayer.init();
      console.log('[StateMachine] State 0: Opening scene player started');
    }

    // 执行 $84D2 风格的 Bank 切换 (dispatch 类型)
    if (entry.type === 'dispatch' && entry.dispatch) {
      this.executeDispatch(entry.dispatch);
    }

    // State 3 特殊处理: 自动前进到 State 4
    // 对应 ASM $861A: INC ram_03CA
    if (stateId === 3) {
      this.executeState3Init();
    }

    newState.onEnter();
  }

  /**
   * 执行 $84D2 风格的 Bank 切换 + 子状态调度
   *
   * 对应 ROM $84D2-$84EC:
   *   高4位 → PRG Bank 切换
   *   低4位 → 子状态索引 (跳转 $C000 + sub*3)
   */
  private executeDispatch(dispatch: DispatchParam): void {
    const { bankId, subStateId } = dispatch;

    // 如果 Bank 没变化，不重新初始化
    if (this.activePrgBank === bankId) {
      console.log(`[StateMachine] Bank ${bankId} unchanged, skip re-init`);
      return;
    }

    // 切换 PRG Bank
    this.bankManager.prgBank0 = bankId;
    this.dataCache.mmcBankReg2 = bankId;
    this.activePrgBank = bankId;

    console.log(`[StateMachine] $84D2: PRG Bank → ${bankId}, Sub → ${subStateId}`);

    // 根据 Bank 初始化子状态调度器
    switch (bankId) {
      case 1:
        this.bank1Dispatcher.init(subStateId);
        break;
      case 5:
      case 6:
        // TODO: Bank 5/6 子状态调度器 (从 ASM 分析 Bank 5/6 的跳转表)
        console.log(`[StateMachine] Bank ${bankId} sub=${subStateId}: dispatcher pending`);
        break;
      default:
        console.warn(`[StateMachine] Unknown PRG Bank: ${bankId}`);
    }
  }

  /**
   * State 3 比赛初始化 ($85CD-$861D)
   *
   * ASM 逻辑:
   *   1. 清零 $0600-$0637, $0691-$06AE, 各种变量
   *   2. JSR $84D2($5A) → Bank 5 sub A (加载比赛数据)
   *   3. PPU 设置
   *   4. INC ram_03CA → 自动前进到 State 4
   *
   * 我们简化: State 3 的 onEnter 完成后自动 transitionTo(4)
   */
  private executeState3Init(): void {
    // 初始化比赛 RAM 区域 (对应 ASM $85CD-$861D)
    this.dataCache.initMatchRam();
  }

  /** 每帧更新 */
  update(): void {
    // State 0 特殊处理: 开场动画播放器
    if (this.currentStateId === 0) {
      const openingDone = this.openingPlayer.update();
      if (openingDone) {
        // 开场动画完成 → 过渡到标题画面 (State 1)
        console.log('[StateMachine] Opening animation complete → State 1');
        // 重置 Bank 1 子状态为标题初始化
        this.dataCache.write(0x03CB, 0);
        this.dataCache.write(0x03CC, 0);
        this.activePrgBank = 1;
        this.bank1Dispatcher.init(0);
        this.transitionTo(1);
      }
      return;
    }

    // Bank 子状态调度器更新
    if (this.activePrgBank === 1) {
      this.bank1Dispatcher.update();
    }

    // 当前顶层状态更新
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
  /** 获取 GameModel */
  getModel(): GameModel { return this.model; }
  /** 获取 Bank 1 调度器 */
  getBank1Dispatcher(): Bank1Dispatcher { return this.bank1Dispatcher; }
  /** 获取开场动画播放器 */
  getOpeningScenePlayer(): OpeningScenePlayer { return this.openingPlayer; }
}
