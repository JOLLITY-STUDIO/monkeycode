/**
 * 天使之翼1 — Bank 0 核心逻辑 v3
 * 
 * State 3: 比赛初始化 (通过 MatchEngine)
 * State 4: 比赛主循环 (通过 MatchEngine.update())
 * State 5: 状态转换管理器
 * 
 * 集成 AiController + MatchFieldRenderer
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
  private _transitionPhase: number = 0; // 转换子阶段
  
  constructor(ds: DataStore, stateMachine: StateMachine, bankDispatcher: BankDispatcher) {
    this.ds = ds;
    this.stateMachine = stateMachine;
    this.bankDispatcher = bankDispatcher;
    this.matchEngine = new MatchEngine(ds);
    
    this.matchEngine.onTransition = (to) => {
      this.stateMachine.transitionTo(to);
    };
    
    // 进球回调
    this.matchEngine.onGoal = (team, scoreA, scoreB) => {
      console.log(`[Bank0] ⚽ GOAL! ${team === 0 ? '南葛' : '对手'} → ${scoreA}-${scoreB}`);
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
    console.log('[Bank0] Match init start');
    this._initStep = 0;
    
    if (!PlayerRepo.isLoaded) PlayerRepo.loadTestData();
    if (!TeamRepo.isLoaded) TeamRepo.loadTestData();
  }
  
  private matchInit(): void {
    const done = this.matchEngine.execInitStep(this._initStep);
    if (done) {
      this._initStep++;
      if (this._initStep >= this.matchEngine.initSteps) {
        this.stateMachine.advanceState();
      }
    }
  }
  
  private matchInitExit(): void {
    console.log('[Bank0] Match init complete → entering match');
  }
  
  // ==================== State 4: 比赛主循环 ====================
  
  private matchLoopEnter(): void {
    console.log('[Bank0] ⚽ Match loop started');
    this._matchEventQueue = [];
    this._transitionPhase = 0;
  }
  
  /** 是否已触发当前进球/半场的转换 (防重入) */
  private _transitionTriggered: boolean = false;
  
  private matchLoop(): void {
    const result = this.matchEngine.update();
    
    // 收集事件
    if (result.events.length > 0) {
      this._matchEventQueue.push(...result.events);
    }
    
    // 进球事件 → 触发转换 (注意: 此时 freezeTimer 已被设置, 但转换应在冻结前触发)
    // 防重入: 进球后到下次开球前只触发一次
    if (result.events.includes(MatchEvent.GOAL) && !this._transitionTriggered) {
      this._transitionTriggered = true;
      this.ds.transCounter = 0;
      this._transitionPhase = 0;
      this._logEvent('[Bank0] ⚽ GOAL detected → transitioning to State 5');
      this.stateMachine.transitionTo(GameState.TRANSITION);
      return;
    }
    
    // 比赛结束
    if (this.matchEngine.isMatchOver && !this._transitionTriggered) {
      this._transitionTriggered = true;
      this.ds.transCounter = 2;
      this._logEvent('[Bank0] 🏁 Match Over → transitioning to State 5');
      this.stateMachine.transitionTo(GameState.TRANSITION);
      return;
    }
    
    // 中场休息 (检测 phase 变化, 不依赖 isFrozen)
    if (this.matchEngine.isHalfTime && !this._transitionTriggered) {
      this._transitionTriggered = true;
      this.ds.transCounter = 1;
      this._logEvent('[Bank0] ⏸ Half Time → transitioning to State 5');
      this.stateMachine.transitionTo(GameState.TRANSITION);
      return;
    }
    
    // 更新 DataStore
    this.ds.matchPhase = this.matchEngine.phase;
  }
  
  private matchLoopExit(): void {
    console.log('[Bank0] Exiting match loop');
  }
  
  // ==================== State 5: 状态转换 ====================
  
  private transitionManager(): void {
    this.ds.matchSubState = 0;
    this.ds.matchSubState2 = 0;
    
    const count = this.ds.transCounter;
    
    // 转换子阶段: 每N帧切换一次，避免在一个帧内连续跳转
    this._transitionPhase++;
    
    if (this._transitionPhase < 30) return; // 等待0.5秒
    
    this._transitionPhase = 0;
    
    if (count === 0) {
      // 进球 → 事件画面
      console.log('[Bank0] ⚽ Goal → Event');
      this.stateMachine.advanceState();
      this.ds.transCounter = 10;
    } else if (count === 1) {
      // 中场 → 回到比赛
      console.log('[Bank0] ⏸ Half time → back to match');
      this.stateMachine.retreatState();
      this.ds.transCounter = 10;
    } else if (count === 2) {
      // 比赛结束 → 结果
      console.log('[Bank0] 🏁 Match end → Result');
      this.stateMachine.advanceState();
      this.ds.transCounter = 10;
    }
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
  
  /** 获取比赛日志 */
  getMatchLog(): string[] {
    return this.matchEngine.log;
  }
}
