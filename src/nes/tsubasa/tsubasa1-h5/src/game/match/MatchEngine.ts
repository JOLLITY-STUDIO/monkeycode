/**
 * 天使之翼1 — 比赛引擎 (Bank 4 转写)
 * 
 * 对应原 Bank 4 的比赛逻辑，基于 Bank 0 内联代码和 Bank 4 分析
 * 
 * 核心流程:
 *   State 3 (MatchInit): 加载球队 → 初始化场地 → 设置参数
 *   State 4 (MatchLoop): 比赛主循环 (AI/玩家/物理)
 *   State 5 (Transition): 状态转换 (进球/半场/终场)
 * 
 * 关键内存区:
 *   $0400-$05FF: 比赛工作区 (球员位置、状态等)
 *   $0600-$06FF: 比赛扩展参数区 (计时器、阶段标志等)
 *   $05E0-$05E1: 比分
 *   $064F: 比赛阶段
 *   $05EF: 比赛标记
 */
import { DataStore } from '../data/DataStore';
import { GameState } from '../core/types';
import { PlayerRepo, TeamRepo } from '../data/tables';

/** 比赛阶段常量 */
export const enum MatchPhase {
  PRE_MATCH = 0,    // 赛前展示
  KICKOFF = 1,      // 开球
  FIRST_HALF = 2,   // 上半场
  HALF_TIME = 3,    // 中场休息
  SECOND_HALF = 4,  // 下半场
  EXTRA_TIME = 5,   // 加时赛 (如有)
  PK_SHOOTOUT = 6,  // 点球大战 (如有)
  MATCH_END = 7,    // 比赛结束
}

/** 比赛子状态 */
export const enum MatchSubState {
  IDLE = 0,
  INIT_TEAMS = 1,
  INIT_FIELD = 2,
  INIT_PARAMS = 3,
  INIT_DONE = 4,
}

/** 球权状态 */
export const enum BallPossession {
  NONE = 0,
  TEAM_A = 1,
  TEAM_B = 2,
}

/** 比赛事件类型 */
export const enum MatchEvent {
  NONE = 0,
  GOAL = 1,
  FOUL = 2,
  CORNER_KICK = 3,
  GOAL_KICK = 4,
  THROW_IN = 5,
  OFFSIDE = 6,
  SUBSTITUTION = 7,
}

/**
 * 比赛引擎
 * 管理一场比赛的完整生命周期
 */
export class MatchEngine {
  private ds: DataStore;
  private _phase: MatchPhase = MatchPhase.PRE_MATCH;
  private _ballPossession: BallPossession = BallPossession.NONE;
  private _matchTimer: number = 0;        // 比赛计时器 (帧)
  private _halfLength: number = 2700;     // 半场时长 (45分钟 × 60帧/秒 = 2700帧，简化)
  private _lastEvent: MatchEvent = MatchEvent.NONE;
  private _eventTimer: number = 0;
  private _goals: { teamA: number; teamB: number } = { teamA: 0, teamB: 0 };
  
  /** 回调: 当状态需要切换时 */
  onTransition: ((to: GameState) => void) | null = null;
  
  constructor(ds: DataStore) {
    this.ds = ds;
  }
  
  // ==================== State 3: 比赛初始化 ====================
  
  /** 初始化步骤总数 */
  get initSteps(): number { return 5; }
  
  /** 执行初始化步骤 */
  execInitStep(step: number): boolean {
    switch (step) {
      case 0: return this._clearMatchRam();
      case 1: return this._loadTeams();
      case 2: return this._setupField();
      case 3: return this._setupParams();
      case 4: return this._initDone();
      default: return true; // 完成
    }
  }
  
  private _clearMatchRam(): boolean {
    // 清除 $0400-$05FF 比赛数据区
    for (let addr = 0x400; addr <= 0x5FF; addr++) {
      this.ds.set04xx(addr, 0);
    }
    // 清除比赛扩展区
    for (let addr = 0x600; addr <= 0x6FF; addr++) {
      this.ds.set06xx(addr, 0);
    }
    this._phase = MatchPhase.PRE_MATCH;
    this._matchTimer = 0;
    this._goals = { teamA: 0, teamB: 0 };
    console.log('[Match] RAM 已清除');
    return true;
  }
  
  private _loadTeams(): boolean {
    // 从 PlayerRepo/TeamRepo 加载当前比赛球队
    const teamA = TeamRepo.table.getById(1); // 南葛SC 默认玩家队
    const teamB = TeamRepo.table.getById(2); // 对手 (根据关卡)
    
    if (teamA) {
      const teamAIds = teamA.playerIds || [];
      this._storeTeamData(0, teamAIds); // 写入 $0400 区域
      console.log(`[Match] 球队A: ${teamA.name} (${teamAIds.length}人)`);
    }
    
    if (teamB) {
      const teamBIds = teamB.playerIds || [];
      this._storeTeamData(1, teamBIds); // 写入 $0480 区域
      console.log(`[Match] 球队B: ${teamB.name} (${teamBIds.length}人)`);
    }
    
    return true;
  }
  
  /** 
   * 将球队球员ID写入比赛RAM区
   * @param team 0=主队, 1=客队
   * @param playerIds 球员ID列表
   */
  private _storeTeamData(team: number, playerIds: number[]): void {
    const baseAddr = team === 0 ? 0x400 : 0x480;
    const count = Math.min(playerIds.length, 16);
    
    // $0400/$0480: 球员数量
    this.ds.set04xx(baseAddr, count);
    
    // 球员ID列表
    for (let i = 0; i < count; i++) {
      this.ds.set04xx(baseAddr + 1 + i, playerIds[i] & 0xFF);
    }
  }
  
  private _setupField(): boolean {
    // 初始化场地坐标系统
    // 原始NES: 基于像素坐标的场地
    // 这里简化为网格系统
    
    // 设置双方初始位置
    this._setDefaultPositions(0); // 主队
    this._setDefaultPositions(1); // 客队
    
    // 球位置: 中场
    this.ds.set06xx(0x40, 128); // ball_x
    this.ds.set06xx(0x41, 112); // ball_y
    
    console.log('[Match] 场地初始化完成');
    return true;
  }
  
  private _setDefaultPositions(team: number): void {
    // 根据阵型设置球员默认位置
    // 简化: GK(1) + DF(4) + MF(3) + FW(3) = 11人
    const positions = [
      // GK
      { x: team === 0 ? 24 : 232, y: 112 },
      // DF x4
      { x: team === 0 ? 56 : 200, y: 56 },
      { x: team === 0 ? 56 : 200, y: 88 },
      { x: team === 0 ? 56 : 200, y: 136 },
      { x: team === 0 ? 56 : 200, y: 168 },
      // MF x3
      { x: team === 0 ? 96 : 160, y: 72 },
      { x: team === 0 ? 96 : 160, y: 112 },
      { x: team === 0 ? 96 : 160, y: 152 },
      // FW x3
      { x: team === 0 ? 136 : 120, y: 72 },
      { x: team === 0 ? 136 : 120, y: 112 },
      { x: team === 0 ? 136 : 120, y: 152 },
    ];
    
    // 球员位置存储在特定区域
    // 主队: $0410-$043F (11×, 每人4字节: x,y,state,flags)
    // 客队: $0490-$04BF
    const baseAddr = team === 0 ? 0x410 : 0x490;
    for (let i = 0; i < 11 && i < positions.length; i++) {
      this.ds.set04xx(baseAddr + i * 4 + 0, positions[i].x);
      this.ds.set04xx(baseAddr + i * 4 + 1, positions[i].y);
      this.ds.set04xx(baseAddr + i * 4 + 2, 0); // state
      this.ds.set04xx(baseAddr + i * 4 + 3, 0); // flags
    }
  }
  
  private _setupParams(): boolean {
    this._phase = MatchPhase.KICKOFF;
    this._matchTimer = 0;
    this._ballPossession = BallPossession.TEAM_A;
    this._halfLength = 2700; // 45分钟 = 2700帧 @60fps (简化版)
    
    // 同步到 DataStore
    this.ds.matchPhase = this._phase;
    this.ds.scoreA = 0;
    this.ds.scoreB = 0;
    
    console.log('[Match] 参数设置完成');
    return true;
  }
  
  private _initDone(): boolean {
    console.log('[Match] ✅ 初始化完成，准备开球');
    return true;
  }
  
  // ==================== State 4: 比赛主循环 ====================
  
  /** 每帧调用 */
  update(): { phase: MatchPhase; events: MatchEvent[] } {
    this._matchTimer++;
    const events: MatchEvent[] = [];
    
    switch (this._phase) {
      case MatchPhase.KICKOFF:
        this._updateKickoff();
        break;
      case MatchPhase.FIRST_HALF:
      case MatchPhase.SECOND_HALF:
      case MatchPhase.EXTRA_TIME:
        events.push(...this._updatePlaying());
        break;
      case MatchPhase.HALF_TIME:
        this._updateHalfTime();
        break;
      case MatchPhase.MATCH_END:
        // 比赛结束，由状态转换处理
        break;
    }
    
    // 更新 DataStore
    this.ds.matchPhase = this._phase;
    this.ds.scoreA = this._goals.teamA;
    this.ds.scoreB = this._goals.teamB;
    
    return { phase: this._phase, events };
  }
  
  private _updateKickoff(): void {
    // 开球: 短暂展示后进入上半场
    if (this._matchTimer > 120) { // 2秒展示
      this._phase = MatchPhase.FIRST_HALF;
      this._matchTimer = 0;
      console.log('[Match] ⚽ 上半场开始!');
    }
  }
  
  private _updatePlaying(): MatchEvent[] {
    const events: MatchEvent[] = [];
    
    // 半场时间检查
    const halfTime = this._halfLength;
    if (this._matchTimer >= halfTime) {
      if (this._phase === MatchPhase.FIRST_HALF) {
        this._phase = MatchPhase.HALF_TIME;
        this._matchTimer = 0;
        console.log('[Match] ⏸ 中场休息');
        return events;
      } else if (this._phase === MatchPhase.SECOND_HALF) {
        // 检查是否需要加时
        if (this._goals.teamA === this._goals.teamB) {
          this._phase = MatchPhase.EXTRA_TIME;
          this._matchTimer = 0;
          console.log('[Match] ⏱ 进入加时赛');
        } else {
          this._phase = MatchPhase.MATCH_END;
          console.log('[Match] 🏁 比赛结束!');
        }
        return events;
      } else if (this._phase === MatchPhase.EXTRA_TIME) {
        this._phase = MatchPhase.MATCH_END;
        console.log('[Match] 🏁 加时赛结束!');
        return events;
      }
    }
    
    // AI决策和比赛逻辑
    // 这里调用 AI 控制器进行决策
    const aiEvents = this._runAiTick();
    events.push(...aiEvents);
    
    return events;
  }
  
  private _updateHalfTime(): void {
    // 中场休息: 短暂展示后换边
    if (this._matchTimer > 180) { // 3秒展示
      this._phase = MatchPhase.SECOND_HALF;
      this._matchTimer = 0;
      this._swapSides();
      this._ballPossession = BallPossession.TEAM_B;
      console.log('[Match] ⚽ 下半场开始!');
    }
  }
  
  private _swapSides(): void {
    // 交换双方场地位置
    const swapTeam = (team: number) => {
      const baseAddr = team === 0 ? 0x410 : 0x490;
      for (let i = 0; i < 11; i++) {
        const x = this.ds.get04xx(baseAddr + i * 4);
        this.ds.set04xx(baseAddr + i * 4, 256 - x); // 镜像X坐标
      }
    };
    swapTeam(0);
    swapTeam(1);
  }
  
  // ==================== AI 逻辑 ====================
  
  private _runAiTick(): MatchEvent[] {
    const events: MatchEvent[] = [];
    
    // 简化的AI: 随机事件驱动比赛
    // 实际游戏基于 Bank 4 的复杂AI决策树
    
    // 事件概率 (每帧)
    if (this._matchTimer % 300 === 0) { // 每5秒
      const r = Math.random();
      
      if (r < 0.08) {
        // 进球事件
        this._triggerGoal();
        events.push(MatchEvent.GOAL);
      } else if (r < 0.15) {
        // 其他事件
        const subR = Math.random();
        if (subR < 0.3) events.push(MatchEvent.CORNER_KICK);
        else if (subR < 0.5) events.push(MatchEvent.FOUL);
        else if (subR < 0.7) events.push(MatchEvent.THROW_IN);
        else events.push(MatchEvent.GOAL_KICK);
      }
    }
    
    return events;
  }
  
  private _triggerGoal(): void {
    // 随机决定进球方 (基于球队实力)
    if (Math.random() > 0.5) {
      this._goals.teamA++;
      this._ballPossession = BallPossession.TEAM_B;
    } else {
      this._goals.teamB++;
      this._ballPossession = BallPossession.TEAM_A;
    }
    
    this._lastEvent = MatchEvent.GOAL;
    this._eventTimer = 120; // 2秒庆祝时间
    
    console.log(`[Match] ⚽ 进球! ${this._goals.teamA}-${this._goals.teamB}`);
  }
  
  // ==================== 查询接口 ====================
  
  get phase(): MatchPhase { return this._phase; }
  get score(): { teamA: number; teamB: number } { return { ...this._goals }; }
  get timer(): number { return this._matchTimer; }
  get possession(): BallPossession { return this._ballPossession; }
  get isMatchOver(): boolean { return this._phase === MatchPhase.MATCH_END; }
  get isHalfTime(): boolean { return this._phase === MatchPhase.HALF_TIME; }
  
  /** 获取比赛阶段显示文本 */
  getPhaseText(): string {
    switch (this._phase) {
      case MatchPhase.PRE_MATCH: return '赛前';
      case MatchPhase.KICKOFF: return '开球';
      case MatchPhase.FIRST_HALF: return '上半场';
      case MatchPhase.HALF_TIME: return '中场休息';
      case MatchPhase.SECOND_HALF: return '下半场';
      case MatchPhase.EXTRA_TIME: return '加时赛';
      case MatchPhase.PK_SHOOTOUT: return '点球大战';
      case MatchPhase.MATCH_END: return '比赛结束';
      default: return '未知';
    }
  }
  
  /** 获取比赛时间文本 (MM:SS) */
  getTimeText(): string {
    const totalSec = Math.floor(this._matchTimer / 60);
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  }
}
