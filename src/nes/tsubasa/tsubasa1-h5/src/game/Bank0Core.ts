/**
 * 天使之翼1 — Bank 0 核心逻辑模块
 * 对应 Bank 0 内联的状态处理器 (State 3/4/5)
 * 
 * 这些状态不通过Bank调度器跳转，而是直接在Bank 0内部执行:
 *   State 3 ($85CD): 比赛初始化
 *   State 4 ($87B9): 比赛主循环
 *   State 5 ($820D): 状态转换管理器
 */
import { DataStore } from '../data/DataStore';
import { StateMachine, StateHandler } from '../core/StateMachine';
import { BankDispatcher } from '../core/BankDispatcher';
import { getRomReader } from '../data/RomReader';
import { GameState } from '../core/types';

export class Bank0Core {
  private ds: DataStore;
  private stateMachine: StateMachine;
  private bankDispatcher: BankDispatcher;
  
  constructor(ds: DataStore, stateMachine: StateMachine, bankDispatcher: BankDispatcher) {
    this.ds = ds;
    this.stateMachine = stateMachine;
    this.bankDispatcher = bankDispatcher;
  }
  
  /**
   * 注册Bank 0内联状态处理器
   */
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
  
  /**
   * 比赛初始化入口
   * 对应原始: $85CD
   * 
   * 功能: 初始化比赛数据，加载球队阵容，设置初始位置
   */
  private matchInitEnter(): void {
    console.log('[Bank0] 比赛初始化开始');
    this.ds.subState = 0;
  }
  
  private matchInit(): void {
    // 根据 subState 执行不同步骤
    switch (this.ds.subState) {
      case 0:
        // 步骤0: 清除比赛数据区 ($0400-$05FF)
        this._initMatchRam();
        break;
      case 1:
        // 步骤1: 加载球队数据 (从Bank 3)
        this._loadTeamData();
        break;
      case 2:
        // 步骤2: 设置球员初始位置
        this._setupPlayerPositions();
        break;
      case 3:
        // 步骤3: 设置比赛参数
        this._setupMatchParams();
        break;
      case 4:
        // 步骤4: 初始化完成 → 进入比赛主循环
        this.stateMachine.advanceState();
        break;
      default:
        this.stateMachine.advanceState();
    }
    
    this.ds.subState++;
  }
  
  private matchInitExit(): void {
    console.log('[Bank0] 比赛初始化完成');
  }
  
  // ==================== State 4: 比赛主循环 ====================
  
  /**
   * 比赛主循环入口
   * 对应原始: $87B9
   */
  private matchLoopEnter(): void {
    console.log('[Bank0] 进入比赛主循环');
  }
  
  private matchLoop(): void {
    // 每帧根据比赛子状态执行逻辑
    // 这个状态会持续多帧
    const phase = this.ds.matchPhase;
    
    switch (phase) {
      case 0: // 开球
        this._matchKickoff();
        break;
      case 7: // 比赛结束
        this.stateMachine.advanceState(); // → State 5 (转换)
        break;
      default: // 正常比赛流程
        this._matchNormal();
    }
  }
  
  private matchLoopExit(): void {
    console.log('[Bank0] 退出比赛主循环');
  }
  
  // ==================== State 5: 状态转换 ====================
  
  /**
   * 状态转换管理器
   * 对应原始: $820D-$8263
   */
  private transitionManager(): void {
    this.ds.transCounter++;
    const count = this.ds.transCounter;
    
    this.ds.matchSubState = 0;
    this.ds.matchSubState2 = 0;
    
    if (count === 1) {
      // 首次: 前进到事件处理
      this.stateMachine.advanceState();
    } else if (count === 2) {
      // 比分不同或比赛结束 → 事件/结果
      if (this.ds.scoreA !== this.ds.scoreB) {
        this.stateMachine.advanceState();
      } else if (this.ds.matchPhase >= 7) {
        this.stateMachine.advanceState();
      } else {
        this.stateMachine.retreatState();
        this.ds.transCounter = 4;
      }
    } else if (count === 3) {
      this.stateMachine.retreatState();
    } else {
      this.stateMachine.advanceState();
    }
  }
  
  // ==================== 内部方法 (占位 — 待深入分析ASM后实现) ====================
  
  private _initMatchRam(): void {
    // 清除 $0400-$05FF 比赛数据区
    // 原始: 通过循环填充0
    for (let addr = 0x400; addr <= 0x5FF; addr++) {
      this.ds.set04xx(addr, 0);
    }
  }
  
  private _loadTeamData(): void {
    // 从Bank 3读取球队数据
    // 原始: LDA #$30 → JSR $84D2 (Bank 3, Sub 0)
    // 通过 bankDispatcher.callDirect(3, 0) 或直接读取
    console.log('[Bank0] 加载球队数据 (占位 — 待Bank 3实现)');
  }
  
  private _setupPlayerPositions(): void {
    // 根据阵型设置球员初始场地位置
    console.log('[Bank0] 设置球员位置 (占位)');
  }
  
  private _setupMatchParams(): void {
    // 设置比赛阶段、时间、比分等
    this.ds.matchPhase = 0;
    this.ds.scoreA = 0;
    this.ds.scoreB = 0;
  }
  
  private _matchKickoff(): void {
    // 开球动画/流程
    // 简单实现: 直接进入正常比赛
    this.ds.matchPhase = 1;
  }
  
  private _matchNormal(): void {
    // 正常比赛流程 (核心!)
    // 这里最终会调用Bank 4的比赛AI和物理引擎
    // 目前占位: 模拟比赛推进
    
    // 简单模拟: 每60帧增加比赛阶段
    if (this.ds.frameCounter % 60 === 0) {
      this.ds.matchPhase++;
      
      // 随机模拟进球
      if (this.ds.matchPhase % 3 === 0) {
        if (Math.random() > 0.5) {
          this.ds.scoreA++;
        } else {
          this.ds.scoreB++;
        }
        // 进球 → 触发状态转换
        this.stateMachine.transitionTo(GameState.TRANSITION);
        this.ds.transCounter = 0;
      }
    }
    
    // 比赛阶段到7 → 结束
    if (this.ds.matchPhase >= 7) {
      this.stateMachine.transitionTo(GameState.TRANSITION);
      this.ds.transCounter = 0;
    }
  }
}
