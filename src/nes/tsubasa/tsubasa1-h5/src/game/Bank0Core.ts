/**
 * 天使之翼1 — Bank 0 核心逻辑模块 v2
 * 使用 MatchEngine 替代占位逻辑
 * 
 * State 3 ($85CD): 比赛初始化 → 通过 MatchEngine
 * State 4 ($87B9): 比赛主循环 → 通过 MatchEngine.update()
 * State 5 ($820D): 状态转换管理器
 */
import { DataStore } from '../data/DataStore';
import { StateMachine, StateHandler } from '../core/StateMachine';
import { BankDispatcher } from '../core/BankDispatcher';
import { GameState } from '../core/types';
import { MatchEngine, MatchPhase, MatchEvent, MatchSubState } from './match/MatchEngine';
import { PlayerRepo, TeamRepo } from '../data/tables/index';

export class Bank0Core {
  private ds: DataStore;
  private stateMachine: StateMachine;
  private bankDispatcher: BankDispatcher;
  private matchEngine: MatchEngine;
  private _initStep: number = 0;
  private _matchEventQueue: MatchEvent[] = [];
  
  constructor(ds: DataStore, stateMachine: StateMachine, bankDispatcher: BankDispatcher) {
    this.ds = ds;
    this.stateMachine = stateMachine;
    this.bankDispatcher = bankDispatcher;
    this.matchEngine = new MatchEngine(ds);
    
    // 设置转换回调
    this.matchEngine.onTransition = (to) => {
      this.stateMachine.transitionTo(to);
    };
  }
  
  register(): void {
    this.stateMachine.registerInlineState(GameState.MATCH_INIT, {
      enter: () => this.matchInitEnter(),
      execute: () => this.matchInit(),
      exit: () => this.matchInitExit(),
    });
    
    this.stateMachine.registerInlineState(GameState.MATCH_LOOP, {
      enter: () => this.matchLoopEnter(),
      execute: () => this.matchLoop(),
      exit: () => this.matchLoopExit(),
    });
    
    this.stateMachine.registerInlineState(GameState.TRANSITION, {
      execute: () => this.transitionManager(),
    });
  }
  
  // ==================== State 3: 比赛初始化 ====================
  
  private matchInitEnter(): void {
    console.log('[Bank0] 比赛初始化开始');
    this._initStep = 0;
    
    // 确保球员/球队数据已加载
    if (!PlayerRepo.isLoaded) {
      PlayerRepo.loadTestData();
    }
    if (!TeamRepo.isLoaded) {
      TeamRepo.loadTestData();
    }
  }
  
  private matchInit(): void {
    // 逐步执行初始化
    const done = this.matchEngine.execInitStep(this._initStep);
    
    if (done) {
      this._initStep++;
      if (this._initStep >= this.matchEngine.initSteps) {
        // 初始化完成 → 进入比赛主循环
        this.stateMachine.advanceState();
      }
    }
  }
  
  private matchInitExit(): void {
    console.log('[Bank0] 比赛初始化完成 → 进入比赛');
  }
  
  // ==================== State 4: 比赛主循环 ====================
  
  private matchLoopEnter(): void {
    console.log('[Bank0] ⚽ 进入比赛主循环');
  }
  
  private matchLoop(): void {
    // 每帧更新比赛引擎
    const result = this.matchEngine.update();
    
    // 检查是否有事件需要处理
    if (result.events.length > 0) {
      this._matchEventQueue.push(...result.events);
      
      // 进球事件 → 触发状态转换
      if (result.events.includes(MatchEvent.GOAL)) {
        this.ds.transCounter = 0;
        this.stateMachine.transitionTo(GameState.TRANSITION);
        return;
      }
    }
    
    // 检查比赛是否结束
    if (this.matchEngine.isMatchOver) {
      this.ds.transCounter = 0;
      this.stateMachine.transitionTo(GameState.TRANSITION);
      return;
    }
    
    // 中场休息 → 触发状态转换
    if (this.matchEngine.isHalfTime) {
      this.ds.transCounter = 1; // 中场特殊处理
      this.stateMachine.transitionTo(GameState.TRANSITION);
      return;
    }
    
    // 更新 DataStore 映射
    this.ds.matchPhase = this.matchEngine.phase;
  }
  
  private matchLoopExit(): void {
    console.log('[Bank0] 退出比赛主循环');
  }
  
  // ==================== State 5: 状态转换 ====================
  
  private transitionManager(): void {
    this.ds.matchSubState = 0;
    this.ds.matchSubState2 = 0;
    
    // 简化版状态转换:
    // transCounter 0: 进球事件 → 前进到 EVENT 状态
    // transCounter 1: 中场事件 → 回到 MATCH_LOOP 继续
    // transCounter 2+: 比赛结果 → 前进到 RESULT
    
    const count = this.ds.transCounter;
    
    if (count === 0) {
      // 进球 → 事件画面
      console.log('[Bank0] ⚽ 进球事件 → Event画面');
      this.stateMachine.advanceState(); // → State 6 (EVENT)
    } else if (count === 1) {
      // 中场 → 回到比赛
      console.log('[Bank0] ⏸ 中场休息 → 回到比赛');
      this.stateMachine.retreatState(); // → State 4 (MATCH_LOOP)
      this.ds.transCounter = 10; // 跳过后续转换
    } else if (count === 2) {
      // 比赛结束检查
      const score = this.matchEngine.score;
      if (score.teamA !== score.teamB || this.matchEngine.isMatchOver) {
        console.log('[Bank0] 🏁 比赛结束 → Result画面');
        this.stateMachine.advanceState(); // → State 7 (RESULT) 或 State 6 (EVENT)
      } else {
        // 平局 → 加时赛回到比赛
        this.stateMachine.retreatState();
        this.ds.transCounter = 10;
      }
    } else if (count >= 3) {
      // 最终结果
      this.stateMachine.advanceState(); // → State 6 → State 7
    }
    
    this.ds.transCounter++;
  }
  
  // ==================== 调试接口 ====================
  
  getMatchEngine(): MatchEngine {
    return this.matchEngine;
  }
  
  getMatchEvents(): MatchEvent[] {
    return [...this._matchEventQueue];
  }
  
  clearMatchEvents(): void {
    this._matchEventQueue = [];
  }
}
