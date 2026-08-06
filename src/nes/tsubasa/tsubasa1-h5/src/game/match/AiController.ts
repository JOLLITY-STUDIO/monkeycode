/**
 * 天使之翼1 — AI 控制器
 * 
 * 基于赛后统计数据实现逼真的比赛AI:
 *   - 持球方决策: 盘带/传球/射门 基于球员能力值
 *   - 防守方决策: 拦截/抢断 基于位置和距离
 *   - 场地区域分区: 根据球在球场的谁半边决策
 * 
 * AI决策权重:
 *   射门: 接近球门时概率高, 受 shoot 能力影响
 *   盘带: 中场区域, 受 dribble 能力影响
 *   传球: 有队友在有利位置时, 受 pass 能力影响
 *   拦截: 防守时, 受 tackle 能力影响
 */

import { DataStore } from '../../data/DataStore';
import { PlayerRepo, TeamRepo } from '../../data/tables/index';
import { PlayerPosition } from '../../core/types';

/** AI决策类型 */
export enum AiAction {
  NONE = 0,
  DRIBBLE = 1,      // 盘带前进
  PASS = 2,         // 传球
  SHOOT = 3,        // 射门
  TACKLE = 4,       // 抢断
  CLEAR = 5,        // 解围
  MOVE_TO_BALL = 6, // 追球
  HOLD = 7,         // 控制(守门员)
}

/** 比赛事件 */
export interface MatchEvent {
  type: 'goal' | 'foul' | 'corner' | 'throw_in' | 'goal_kick' | 'offside' | 'save';
  team: 0 | 1;
  playerIdx?: number;
  message?: string;
}

/** 球员场上状态 */
interface PlayerState {
  idx: number;          // 球队内索引 (0=GK)
  team: 0 | 1;
  x: number;            // 场上X坐标 (0-240)
  y: number;            // 场上Y坐标 (0-180)
  hasBall: boolean;
  stamina: number;      // 体力 (0-100)
  lastAction: number;   // 上次动作的时间戳
}

export class AiController {
  private ds: DataStore;
  
  /** 双方球员状态 */
  private _teamA: PlayerState[] = [];
  private _teamB: PlayerState[] = [];
  
  /** 球位置 */
  private _ballX: number = 128;
  private _ballY: number = 100;
  private _ballTeam: 0 | 1 = 0;  // 当前持球队
  
  /** 事件队列 */
  private _events: MatchEvent[] = [];
  
  /** 帧计数 */
  private _frameCount: number = 0;
  
  /** 随机数种子 */
  private _seed: number = 12345;
  
  /** 半场时长 */
  private _halfLength: number = 2700; // 45分钟 × 60帧
  
  /** 进球统计 */
  private _goals: { teamA: number; teamB: number } = { teamA: 0, teamB: 0 };
  
  constructor(ds: DataStore) {
    this.ds = ds;
  }
  
  /** 初始化双方球员位置 (比赛开始时调用) */
  init(lineupA?: number[], lineupB?: number[]): void {
    this._teamA = [];
    this._teamB = [];
    this._goals = { teamA: 0, teamB: 0 };
    this._events = [];
    this._frameCount = 0;
    
    // 主队阵型 (4-3-3)
    const formationA = [
      { x: 20, y: 90 },     // GK
      { x: 55, y: 45 }, { x: 55, y: 70 }, { x: 55, y: 110 }, { x: 55, y: 135 }, // DF
      { x: 90, y: 55 }, { x: 90, y: 90 }, { x: 90, y: 125 },                    // MF
      { x: 130, y: 55 }, { x: 130, y: 90 }, { x: 130, y: 125 },                  // FW
    ];
    
    // 客队阵型 (镜像)
    const formationB = [
      { x: 220, y: 90 },    // GK
      { x: 185, y: 45 }, { x: 185, y: 70 }, { x: 185, y: 110 }, { x: 185, y: 135 }, // DF
      { x: 150, y: 55 }, { x: 150, y: 90 }, { x: 150, y: 125 },                    // MF
      { x: 110, y: 55 }, { x: 110, y: 90 }, { x: 110, y: 125 },                    // FW
    ];
    
    for (let i = 0; i < 11; i++) {
      this._teamA.push({
        idx: i, team: 0,
        x: formationA[i].x, y: formationA[i].y,
        hasBall: false, stamina: 100, lastAction: 0,
      });
      this._teamB.push({
        idx: i, team: 1,
        x: formationB[i].x, y: formationB[i].y,
        hasBall: false, stamina: 100, lastAction: 0,
      });
    }
    
    // 球在开球点
    this._ballX = 120;
    this._ballY = 90;
    this._ballTeam = 0;
    
    // 主队FW开球
    const kicker = this._teamA[8];
    kicker.hasBall = true;
    this._ballX = kicker.x;
    this._ballY = kicker.y;
    
    this._syncToDataStore();
  }
  
  /** 半场换边 */
  swapSides(): void {
    const swapTeam = (team: PlayerState[]) => {
      for (const p of team) {
        p.x = 240 - p.x;
        p.y = 180 - p.y;
      }
    };
    swapTeam(this._teamA);
    swapTeam(this._teamB);
    this._ballX = 240 - this._ballX;
    this._ballY = 180 - this._ballY;
    this._ballTeam = this._ballTeam === 0 ? 1 : 0;
  }
  
  /**
   * 每帧AI决策
   * @returns 事件列表 (进球等)
   */
  tick(): MatchEvent[] {
    this._frameCount++;
    this._events = [];
    
    // 体力恢复 (慢速)
    if (this._frameCount % 30 === 0) {
      for (const p of [...this._teamA, ...this._teamB]) {
        if (p.stamina < 100) p.stamina = Math.min(100, p.stamina + 0.5);
      }
    }
    
    // 每N帧进行一次AI决策
    const tickRate = 30; // 每秒2次
    if (this._frameCount % tickRate !== 0) {
      this._syncToDataStore();
      return this._events;
    }
    
    // 找到持球球员
    const ballCarrier = this._findBallCarrier();
    
    if (ballCarrier) {
      // 持球方决策
      this._decideOffense(ballCarrier);
    } else {
      // 无球状态: 最近球员去追球
      this._chaseLooseBall();
    }
    
    // 球员移动更新
    this._updatePositions();
    
    // 同步到 DataStore
    this._syncToDataStore();
    
    return this._events;
  }
  
  /** 找到持球球员 */
  private _findBallCarrier(): PlayerState | null {
    for (const p of [...this._teamA, ...this._teamB]) {
      if (p.hasBall) return p;
    }
    return null;
  }
  
  /** 持球方决策 */
  private _decideOffense(carrier: PlayerState): void {
    const team = carrier.team === 0 ? this._teamA : this._teamB;
    const opponent = carrier.team === 0 ? this._teamB : this._teamA;
    const isAttacking = carrier.team === 0 ? (carrier.x > 100) : (carrier.x < 140);
    
    // 获取球员能力值 (从球员表)
    const playerAbilities = this._getPlayerAbilities(carrier);
    
    // 球到对方球门的距离
    const distToGoal = carrier.team === 0 ? (240 - carrier.x) : carrier.x;
    
    // 最近的防守者距离
    let nearestDefenderDist = 999;
    let nearestDefender: PlayerState | null = null;
    for (const d of opponent) {
      const dist = Math.abs(d.x - carrier.x) + Math.abs(d.y - carrier.y);
      if (dist < nearestDefenderDist && d.idx !== 0) { // 排除GK
        nearestDefenderDist = dist;
        nearestDefender = d;
      }
    }
    
    // 决策权重计算
    let shootWeight = 0;
    let passWeight = 0;
    let dribbleWeight = 0;
    
    // 射门决策
    if (distToGoal < 50) {
      shootWeight = (60 - distToGoal) * 0.6 + playerAbilities.shoot * 0.3;
    }
    
    // 传球决策
    let hasOpenTeammate = false;
    let bestPassTarget: PlayerState | null = null;
    let bestPassScore = 0;
    for (const t of team) {
      if (t === carrier || t.idx === 0) continue; // 跳过自己&GK
      const tDistToGoal = carrier.team === 0 ? (240 - t.x) : t.x;
      const dist = Math.abs(t.x - carrier.x) + Math.abs(t.y - carrier.y);
      // 队友在前方且相对空旷
      if (tDistToGoal < distToGoal - 10 && dist < 80) {
        // 检查是否有防守者拦截路线
        const passScore = (100 - dist) * 0.5 + playerAbilities.pass * 0.4;
        if (passScore > bestPassScore) {
          bestPassScore = passScore;
          bestPassTarget = t;
          hasOpenTeammate = true;
        }
      }
    }
    passWeight = hasOpenTeammate ? (40 + playerAbilities.pass * 0.5) : 0;
    
    // 盘带决策
    if (nearestDefenderDist > 15) {
      dribbleWeight = 50 + playerAbilities.dribble * 0.4;
    } else {
      dribbleWeight = 20 + playerAbilities.dribble * 0.3;
    }
    
    // 如果被紧逼 → 减小盘带权重
    if (nearestDefenderDist < 10) {
      dribbleWeight -= 20;
      passWeight += 15;
    }
    
    // 最终决策
    const total = shootWeight + passWeight + dribbleWeight;
    const roll = this._random() * total;
    
    if (roll < shootWeight && distToGoal < 60) {
      // 射门！
      this._doShoot(carrier, distToGoal, playerAbilities);
    } else if (roll < shootWeight + passWeight && bestPassTarget) {
      // 传球
      this._doPass(carrier, bestPassTarget);
    } else {
      // 盘带前进
      this._doDribble(carrier, playerAbilities);
    }
  }
  
  /** 射门 */
  private _doShoot(shooter: PlayerState, distToGoal: number, abilities: any): void {
    const goalDirection = shooter.team === 0 ? 1 : -1;
    const power = abilities.shoot * (1 - distToGoal / 100);
    const accuracy = abilities.shoot * 0.6 + this._random() * 40;
    
    // 对方GK的扑救
    const opponent = shooter.team === 0 ? this._teamB : this._teamA;
    const gk = opponent[0];
    const gkAbility = this._getPlayerAbilities(gk);
    const saveChance = gkAbility.tackle * 0.5 + (1 - distToGoal / 200) * 30;
    
    if (power > saveChance * 0.8 + this._random() * 20) {
      // 进球！
      if (shooter.team === 0) {
        this._goals.teamA++;
      } else {
        this._goals.teamB++;
      }
      
      this._events.push({
        type: 'goal',
        team: shooter.team,
        playerIdx: shooter.idx,
        message: `进球! ${shooter.team === 0 ? '南葛' : '对手'} ${shooter.idx === 0 ? 'GK' : `#${shooter.idx}`}`,
      });
      
      // 重新开球
      this._resetAfterGoal(shooter.team === 0 ? 1 : 0);
    } else {
      // 扑救成功 → 球到了GK手里
      gk.hasBall = true;
      shooter.hasBall = false;
      this._ballX = gk.x;
      this._ballY = gk.y;
      this._ballTeam = gk.team as 0 | 1;
      
      this._events.push({
        type: 'save',
        team: gk.team as 0 | 1,
        message: 'GK扑救!',
      });
    }
  }
  
  /** 传球 */
  private _doPass(from: PlayerState, to: PlayerState): void {
    from.hasBall = false;
    to.hasBall = true;
    this._ballX = to.x;
    this._ballY = to.y;
    this._ballTeam = to.team as 0 | 1;
  }
  
  /** 盘带 */
  private _doDribble(carrier: PlayerState, abilities: any): void {
    const dir = carrier.team === 0 ? 1 : -1;
    const speed = (abilities.dribble / 40) + 1;
    
    const newX = carrier.x + dir * speed * 3;
    const newY = carrier.y + (this._random() - 0.5) * speed * 4;
    
    // 边界检查
    carrier.x = Math.max(5, Math.min(235, newX));
    carrier.y = Math.max(5, Math.min(175, newY));
    
    // 球跟随
    this._ballX = carrier.x;
    this._ballY = carrier.y;
    
    // 被抢断检查
    const opponent = carrier.team === 0 ? this._teamB : this._teamA;
    for (const d of opponent) {
      if (d.idx === 0) continue; // GK不主动抢断
      const dist = Math.abs(d.x - carrier.x) + Math.abs(d.y - carrier.y);
      if (dist < 8) {
        const defenderAbility = this._getPlayerAbilities(d);
        const tackleChance = defenderAbility.tackle * 0.5;
        if (tackleChance > this._random() * 100) {
          // 抢断成功
          carrier.hasBall = false;
          d.hasBall = true;
          this._ballX = d.x;
          this._ballY = d.y;
          this._ballTeam = d.team as 0 | 1;
          
          this._events.push({
            type: 'foul',
            team: d.team as 0 | 1,
            message: `抢断!`,
          });
          return;
        }
      }
    }
  }
  
  /** 追无主球 */
  private _chaseLooseBall(): void {
    // 找最近球员
    let closestPlayer: PlayerState | null = null;
    let closestDist = 999;
    
    for (const p of [...this._teamA, ...this._teamB]) {
      if (p.hasBall) continue;
      const dist = Math.abs(p.x - this._ballX) + Math.abs(p.y - this._ballY);
      if (dist < closestDist) {
        closestDist = dist;
        closestPlayer = p;
      }
    }
    
    if (closestPlayer && closestDist < 100) {
      // 移动到球的方向
      const dx = this._ballX - closestPlayer.x;
      const dy = this._ballY - closestPlayer.y;
      const mag = Math.sqrt(dx * dx + dy * dy) || 1;
      const speed = 3;
      closestPlayer.x += (dx / mag) * speed;
      closestPlayer.y += (dy / mag) * speed;
      
      // 捡到球
      if (closestDist < 5) {
        closestPlayer.hasBall = true;
        this._ballX = closestPlayer.x;
        this._ballY = closestPlayer.y;
        this._ballTeam = closestPlayer.team as 0 | 1;
      }
    }
  }
  
  /** 更新所有球员位置 */
  private _updatePositions(): void {
    // 无球球员回位
    for (const team of [this._teamA, this._teamB]) {
      for (const p of team) {
        if (p.hasBall) continue;
        
        // 向默认位置移动 (慢)
        const formation = p.team === 0 ? 
          this._getFormationA()[p.idx] : 
          this._getFormationB()[p.idx];
        
        const dx = formation.x - p.x;
        const dy = formation.y - p.y;
        const dist = Math.abs(dx) + Math.abs(dy);
        
        if (dist > 2) {
          const speed = dist > 40 ? 1.5 : 0.8;
          p.x += (dx / dist) * speed;
          p.y += (dy / dist) * speed;
        }
      }
    }
  }
  
  /** 进球后重置 */
  private _resetAfterGoal(kickoffTeam: 0 | 1): void {
    // 所有球员失去球权
    for (const p of [...this._teamA, ...this._teamB]) {
      p.hasBall = false;
    }
    
    // 重置到开球阵型
    this.init();
    this._ballTeam = kickoffTeam;
    
    // 开球队FW拿球
    const kicker = kickoffTeam === 0 ? this._teamA[9] : this._teamB[9];
    kicker.hasBall = true;
    this._ballX = kicker.x;
    this._ballY = kicker.y;
  }
  
  /** 获取阵型A */
  private _getFormationA(): { x: number; y: number }[] {
    return [
      { x: 20, y: 90 },    { x: 55, y: 45 },  { x: 55, y: 70 },
      { x: 55, y: 110 },   { x: 55, y: 135 }, { x: 90, y: 55 },
      { x: 90, y: 90 },    { x: 90, y: 125 }, { x: 130, y: 55 },
      { x: 130, y: 90 },   { x: 130, y: 125 },
    ];
  }
  
  private _getFormationB(): { x: number; y: number }[] {
    return [
      { x: 220, y: 90 },   { x: 185, y: 45 }, { x: 185, y: 70 },
      { x: 185, y: 110 },  { x: 185, y: 135 },{ x: 150, y: 55 },
      { x: 150, y: 90 },   { x: 150, y: 125 },{ x: 110, y: 55 },
      { x: 110, y: 90 },   { x: 110, y: 125 },
    ];
  }
  
  /** 获取球员能力值 */
  private _getPlayerAbilities(player: PlayerState): { shoot: number; pass: number; dribble: number; tackle: number; speed: number } {
    // 从球员表获取真实能力值，如果不可用则使用默认值
    const defaults = {
      0: { shoot: 30, pass: 55, dribble: 40, tackle: 50, speed: 50 },   // GK
      1: { shoot: 55, pass: 65, dribble: 60, tackle: 80, speed: 70 },   // DF
      2: { shoot: 75, pass: 82, dribble: 78, tackle: 70, speed: 78 },   // MF
      3: { shoot: 85, pass: 70, dribble: 75, tackle: 45, speed: 82 },   // FW
    };
    
    // 尝试获取球员数据
    let pData = null;
    try {
      const allPlayers = PlayerRepo.table.getAll();
      // 根据team和idx找球员
      const teamId = player.team === 0 ? 1 : 2;
      const team = TeamRepo.table.getById(teamId);
      if (team && team.playerIds && team.playerIds.length > player.idx) {
        const playerId = team.playerIds[player.idx];
        pData = PlayerRepo.table.getById(playerId);
      }
    } catch (e) { /* ignore */ }
    
    if (pData) {
      return {
        shoot: pData.shoot || 60,
        pass: pData.pass || 60,
        dribble: pData.dribble || 60,
        tackle: pData.tackle || 60,
        speed: pData.speed || 60,
      };
    }
    
    return defaults[player.idx === 0 ? 0 : (player.idx <= 4 ? 1 : (player.idx <= 7 ? 2 : 3))];
  }
  
  /** 同步球员/球位置到 DataStore */
  private _syncToDataStore(): void {
    // 同步比分
    this.ds.scoreA = this._goals.teamA;
    this.ds.scoreB = this._goals.teamB;
    
    // 同步球员位置
    const syncTeam = (team: PlayerState[], baseAddr: number) => {
      for (let i = 0; i < Math.min(team.length, 11); i++) {
        const p = team[i];
        this.ds.set04xx(baseAddr + i * 4, Math.floor(p.x * 256 / 240));
        this.ds.set04xx(baseAddr + i * 4 + 1, Math.floor(p.y * 256 / 180));
        this.ds.set04xx(baseAddr + i * 4 + 2, p.hasBall ? 1 : 0);
      }
    };
    
    syncTeam(this._teamA, 0x410);
    syncTeam(this._teamB, 0x490);
    
    // 同步球位置
    this.ds.set06xx(0x40, Math.floor(this._ballX * 256 / 240));
    this.ds.set06xx(0x41, Math.floor(this._ballY * 256 / 180));
  }
  
  /** 简单随机数生成 */
  private _random(): number {
    this._seed = (this._seed * 1103515245 + 12345) & 0x7FFFFFFF;
    return (this._seed >> 16) / 32768;
  }
  
  // ==================== 查询接口 ====================
  
  get players(): { teamA: PlayerState[]; teamB: PlayerState[] } {
    return { teamA: this._teamA, teamB: this._teamB };
  }
  
  get ballPosition(): { x: number; y: number } {
    return { x: this._ballX, y: this._ballY };
  }
  
  get goals(): { teamA: number; teamB: number } {
    return { ...this._goals };
  }
  
  get events(): MatchEvent[] {
    return [...this._events];
  }
}
