/**
 * 天使之翼1 — 比赛引擎 v3
 * 
 * 完整比赛生命周期管理:
 *   State 3 (MatchInit): 加载球队 → 初始化AI → 设置场地
 *   State 4 (MatchLoop): AI驱动比赛 → 事件处理 → 时间管理
 *   State 5 (Transition): 进球/半场/终场 状态转换
 * 
 * 集成组件:
 *   - AiController: 球员AI决策和物理
 *   - MatchFieldRenderer: 场地+球员渲染
 */

import { DataStore } from '../../data/DataStore';
import { GameState } from '../../core/types';
import { PlayerRepo, TeamRepo } from '../../data/tables/index';
import { AiController, MatchEvent as AIMatchEvent } from './AiController';

/** 比赛阶段 */
export const enum MatchPhase {
  PRE_MATCH = 0,
  KICKOFF = 1,
  FIRST_HALF = 2,
  HALF_TIME = 3,
  SECOND_HALF = 4,
  EXTRA_TIME = 5,
  PK_SHOOTOUT = 6,
  MATCH_END = 7,
}

/** 比赛子状态 (初始化步骤) */
export const enum MatchSubState {
  IDLE = 0,
  INIT_TEAMS = 1,
  INIT_FIELD = 2,
  INIT_PARAMS = 3,
  INIT_DONE = 4,
}

/** 球权 */
export const enum BallPossession {
  NONE = 0,
  TEAM_A = 1,
  TEAM_B = 2,
}

/** 比赛事件 (对外) */
export const enum MatchEvent {
  NONE = 0,
  GOAL = 1,
  FOUL = 2,
  CORNER_KICK = 3,
  GOAL_KICK = 4,
  THROW_IN = 5,
  OFFSIDE = 6,
  SAVE = 8,
}

export class MatchEngine {
  private ds: DataStore;
  private ai: AiController;
  
  // 比赛状态
  private _phase: MatchPhase = MatchPhase.PRE_MATCH;
  private _matchTimer: number = 0;
  private _halfLength: number = 2400;  // 40分钟=2400帧 (简化, 原版45分钟)
  private _eventQueue: MatchEvent[] = [];
  private _freezeTimer: number = 0;    // 冻结计时器 (进球庆祝等)
  
  // 回调
  onTransition: ((to: GameState) => void) | null = null;
  onGoal: ((team: 0 | 1, scoreA: number, scoreB: number) => void) | null = null;
  
  // 日志
  private _log: string[] = [];
  
  constructor(ds: DataStore) {
    this.ds = ds;
    this.ai = new AiController(ds);
  }
  
  // ==================== State 3: 初始化 ====================
  
  get initSteps(): number { return 5; }
  
  execInitStep(step: number): boolean {
    switch (step) {
      case 0: return this._step0_ClearRAM();
      case 1: return this._step1_LoadTeams();
      case 2: return this._step2_InitAI();
      case 3: return this._step3_SetupParams();
      case 4: return this._step4_InitDone();
      default: return true;
    }
  }
  
  private _step0_ClearRAM(): boolean {
    for (let addr = 0x400; addr <= 0x5FF; addr++) this.ds.set04xx(addr, 0);
    for (let addr = 0x600; addr <= 0x6FF; addr++) this.ds.set06xx(addr, 0);
    this._phase = MatchPhase.PRE_MATCH;
    this._matchTimer = 0;
    this._eventQueue = [];
    this._log = [];
    this._logEvent('[Match] RAM cleared');
    return true;
  }
  
  private _step1_LoadTeams(): boolean {
    if (!PlayerRepo.isLoaded) PlayerRepo.loadTestData();
    if (!TeamRepo.isLoaded) TeamRepo.loadTestData();
    
    const teamA = TeamRepo.table.getById(1);
    const teamB = TeamRepo.table.getById(2);
    
    if (teamA) this._logEvent(`[Match] Team A: ${teamA.name} (${teamA.playerIds.length} players)`);
    if (teamB) this._logEvent(`[Match] Team B: ${teamB.name} (${teamB.playerIds.length} players)`);
    return true;
  }
  
  private _step2_InitAI(): boolean {
    this.ai.init();
    this._logEvent('[Match] AI initialized');
    return true;
  }
  
  private _step3_SetupParams(): boolean {
    this._phase = MatchPhase.KICKOFF;
    this._matchTimer = 0;
    this._halfLength = 2400;
    this._freezeTimer = 0;
    
    this.ds.matchPhase = this._phase;
    this.ds.scoreA = 0;
    this.ds.scoreB = 0;
    
    this._logEvent('[Match] Parameters set');
    return true;
  }
  
  private _step4_InitDone(): boolean {
    this._logEvent('[Match] ✅ Init complete. Ready to kick off!');
    return true;
  }
  
  // ==================== State 4: 比赛主循环 ====================
  
  update(): { phase: MatchPhase; events: MatchEvent[] } {
    this._eventQueue = [];
    
    // 冻结计时器处理 (进球庆祝)
    if (this._freezeTimer > 0) {
      this._freezeTimer--;
      if (this._freezeTimer === 0) {
        this._logEvent('[Match] Play resumed');
      }
      return { phase: this._phase, events: [] };
    }
    
    switch (this._phase) {
      case MatchPhase.KICKOFF:
        return this._updateKickoff();
      case MatchPhase.FIRST_HALF:
      case MatchPhase.SECOND_HALF:
      case MatchPhase.EXTRA_TIME:
        return this._updatePlaying();
      case MatchPhase.HALF_TIME:
        return this._updateHalfTime();
      default:
        return { phase: this._phase, events: [] };
    }
  }
  
  private _updateKickoff(): { phase: MatchPhase; events: MatchEvent[] } {
    this._matchTimer++;
    
    if (this._matchTimer > 90) { // 1.5秒展示
      this._phase = MatchPhase.FIRST_HALF;
      this._matchTimer = 0;
      this._logEvent('[Match] ⚽ First half begins!');
    }
    
    this.ds.matchPhase = this._phase;
    return { phase: this._phase, events: [] };
  }
  
  private _updatePlaying(): { phase: MatchPhase; events: MatchEvent[] } {
    if (this._freezeTimer > 0) return { phase: this._phase, events: [] };
    
    this._matchTimer++;
    
    // AI决策
    const aiEvents = this.ai.tick();
    
    // 处理AI事件
    for (const e of aiEvents) {
      if (e.type === 'goal') {
        this._onGoal(e.team as 0 | 1);
        this._eventQueue.push(MatchEvent.GOAL);
      } else if (e.type === 'foul') {
        this._eventQueue.push(MatchEvent.FOUL);
      } else if (e.type === 'save') {
        this._eventQueue.push(MatchEvent.SAVE);
      }
    }
    
    // 半场时间检查
    if (this._matchTimer >= this._halfLength) {
      if (this._phase === MatchPhase.FIRST_HALF) {
        this._phase = MatchPhase.HALF_TIME;
        this._matchTimer = 0;
        this._freezeTimer = 90;
        this._logEvent('[Match] ⏸ Half time!');
      } else if (this._phase === MatchPhase.SECOND_HALF) {
        const goals = this.ai.goals;
        if (goals.teamA === goals.teamB) {
          this._phase = MatchPhase.EXTRA_TIME;
          this._matchTimer = 0;
          this._logEvent('[Match] ⏱ Extra time!');
        } else {
          this._phase = MatchPhase.MATCH_END;
          this._logEvent('[Match] 🏁 Match over!');
        }
      } else if (this._phase === MatchPhase.EXTRA_TIME) {
        this._phase = MatchPhase.MATCH_END;
        this._logEvent('[Match] 🏁 Extra time over!');
      }
    }
    
    // 更新 DataStore
    this.ds.matchPhase = this._phase;
    this.ds.scoreA = this.ai.goals.teamA;
    this.ds.scoreB = this.ai.goals.teamB;
    
    return { phase: this._phase, events: [...this._eventQueue] };
  }
  
  private _updateHalfTime(): { phase: MatchPhase; events: MatchEvent[] } {
    this._matchTimer++;
    
    if (this._matchTimer > 90) { // 1.5秒中场
      this._phase = MatchPhase.SECOND_HALF;
      this._matchTimer = 0;
      this.ai.swapSides();
      this._logEvent('[Match] ⚽ Second half begins!');
    }
    
    this.ds.matchPhase = this._phase;
    return { phase: this._phase, events: [] };
  }
  
  // ==================== 进球处理 ====================
  
  private _onGoal(team: 0 | 1): void {
    const goals = this.ai.goals;
    this._freezeTimer = 120; // 2秒庆祝
    
    this._logEvent(`[Match] ⚽ GOAL! ${team === 0 ? '南葛' : '对手'} → ${goals.teamA}-${goals.teamB}`);
    
    if (this.onGoal) {
      this.onGoal(team, goals.teamA, goals.teamB);
    }
  }
  
  // ==================== 查询接口 ====================
  
  get phase(): MatchPhase { return this._phase; }
  get score(): { teamA: number; teamB: number } {
    const g = this.ai.goals;
    return { teamA: g.teamA, teamB: g.teamB };
  }
  get timer(): number { return this._matchTimer; }
  get isMatchOver(): boolean { return this._phase === MatchPhase.MATCH_END; }
  get isHalfTime(): boolean { return this._phase === MatchPhase.HALF_TIME; }
  get isFrozen(): boolean { return this._freezeTimer > 0; }
  get aiController(): AiController { return this.ai; }
  get log(): string[] { return [...this._log]; }
  
  getPhaseText(): string {
    const texts: Record<number, string> = {
      [MatchPhase.PRE_MATCH]: '赛前',
      [MatchPhase.KICKOFF]: '开球',
      [MatchPhase.FIRST_HALF]: '上半场',
      [MatchPhase.HALF_TIME]: '中场休息',
      [MatchPhase.SECOND_HALF]: '下半场',
      [MatchPhase.EXTRA_TIME]: '加时赛',
      [MatchPhase.PK_SHOOTOUT]: '点球大战',
      [MatchPhase.MATCH_END]: '比赛结束',
    };
    return texts[this._phase] || '未知';
  }
  
  getTimeText(): string {
    const totalSec = Math.floor(this._matchTimer / 60);
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  }
  
  /** 获取半场总时长 (秒) */
  get halfLengthSec(): number {
    return Math.floor(this._halfLength / 60);
  }
  
  // ==================== 辅助 ====================
  
  private _logEvent(msg: string): void {
    this._log.push(`[${this.getTimeText()}] ${msg}`);
    console.log(msg);
  }
}
