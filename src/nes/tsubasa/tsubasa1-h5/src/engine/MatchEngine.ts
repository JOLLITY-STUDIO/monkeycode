/**
 * 比赛引擎 - 核心比赛逻辑 (v1.4.0: 碰撞检测 + AI增强)
 *
 * 对应 ROM Bank 4/6 中的比赛逻辑。
 * 负责:
 *   - 球员场上位置管理
 *   - 球的移动和物理
 *   - 球员AI行为 (传球/射门/铲球决策)
 *   - 碰撞检测 (球员↔球, 球员↔球员)
 *   - 比赛状态管理 (开球、进行中、半场、结束)
 *   - 比分和计时
 */

import type { PlayerStats, TeamData } from '../data/PlayerData';
import type { RngGenerator } from '../utils/RngGenerator';

// ============================================================
// 常量
// ============================================================

/** 场地常量 */
export const FIELD_WIDTH = 256;   // 球场宽度 (NES 像素)
export const FIELD_HEIGHT = 200;  // 球场高度
export const GOAL_Y_TOP = 70;     // 球门上沿
export const GOAL_Y_BOT = 130;    // 球门下沿
export const GOAL_LEFT_X = 0;     // 左球门线
export const GOAL_RIGHT_X = 252;  // 右球门线

/** 碰撞检测阈值 */
const BALL_PICKUP_DIST = 12;      // 球员拾球距离 (像素)
const BALL_CATCH_DIST = 8;        // 传球到达接球距离
const TACKLE_RANGE = 16;          // 铲球范围 (像素)
const SHOOT_RANGE = 80;           // 射门最低距离

/** 比赛时长 (半场游戏秒数, 60帧=1秒) */
const DEFAULT_HALF_SECONDS = 45;  // 默认半场45秒 (可缩短用于测试)

// ============================================================
// 类型定义
// ============================================================

export interface PlayerPosition {
  x: number;
  y: number;
}

export interface PlayerState {
  playerId: number;
  stats: PlayerStats;
  position: PlayerPosition;
  hasBall: boolean;
  isActive: boolean;
  energy: number;
  /** 目标位置 (AI用) */
  targetX?: number;
  targetY?: number;
  /** AI冷却 (帧) */
  aiCooldown: number;
}

export enum MatchPhase {
  KICKOFF = 0,
  PLAYING = 1,
  HALFTIME = 2,
  SECOND_HALF = 3,
  FULLTIME = 4,
  PAUSED = 5,
}

export interface BallState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  possessedBy: number | null;
}

export interface MatchStats {
  team0: TeamData;
  team1: TeamData;
  score: [number, number];
  possession: [number, number];
  shots: [number, number];
  fouls: [number, number];
}

export interface MatchEvent {
  type: string;
  data?: any;
}

// ============================================================
// MatchEngine 类
// ============================================================

export class MatchEngine {
  team0Players: PlayerState[] = [];
  team1Players: PlayerState[] = [];

  ball: BallState = {
    x: FIELD_WIDTH / 2, y: FIELD_HEIGHT / 2,
    vx: 0, vy: 0, possessedBy: null,
  };

  phase: MatchPhase = MatchPhase.KICKOFF;
  matchTime: number = 0;
  halfLength: number = DEFAULT_HALF_SECONDS * 60;

  score: [number, number] = [0, 0];

  rng: RngGenerator;
  possession: 0 | 1 = 0;

  eventQueue: MatchEvent[] = [];
  frameCount: number = 0;

  /** 自由球帧计数 (无人持球) */
  private freeBallFrames: number = 0;
  /** 最近的传球目标 (用于接球判定) */
  private passTargetId: number | null = null;
  /** 传球剩余到达帧数 */
  private passArriveFrames: number = 0;

  constructor(rng: RngGenerator) {
    this.rng = rng;
  }

  // ============================================================
  // 初始化
  // ============================================================

  initMatch(team0: TeamData, team1: TeamData): void {
    this.team0Players = this.setupTeam(team0, 0);
    this.team1Players = this.setupTeam(team1, 1);
    this.resetBall();
    this.phase = MatchPhase.KICKOFF;
    this.matchTime = 0;
    this.score = [0, 0];
    this.frameCount = 0;
    this.eventQueue = [];
    this.possession = 0;
    this.freeBallFrames = 0;
    this.passTargetId = null;
    this.passArriveFrames = 0;

    this.ball.possessedBy = this.team0Players[6].playerId;
    if (this.team0Players[6]) {
      this.team0Players[6].hasBall = true;
    }
  }

  private resetBall(): void {
    this.ball = {
      x: FIELD_WIDTH / 2, y: FIELD_HEIGHT / 2,
      vx: 0, vy: 0, possessedBy: null,
    };
  }

  private setupTeam(team: TeamData, side: number): PlayerState[] {
    const players: PlayerState[] = [];
    const isLeft = side === 0;

    const formationX = isLeft
      ? [20, 60, 90, 120, 120, 140, 160, 180, 180, 200, 210]
      : [236, 196, 166, 136, 136, 116, 96, 76, 76, 56, 46];
    const formationY = [112, 60, 164, 50, 174, 112, 50, 174, 112, 90, 134];

    for (let i = 0; i < Math.min(team.players.length, 11); i++) {
      const p = team.players[i];
      players.push({
        playerId: p.id,
        stats: p,
        position: { x: formationX[i], y: formationY[i] },
        hasBall: false,
        isActive: true,
        energy: p.stamina * 10,
        aiCooldown: 0,
      });
    }
    return players;
  }

  // ============================================================
  // 主更新循环
  // ============================================================

  update(): MatchEvent | null {
    this.frameCount++;

    switch (this.phase) {
      case MatchPhase.KICKOFF:
        return this.updateKickoff();
      case MatchPhase.PLAYING:
      case MatchPhase.SECOND_HALF:
        return this.updatePlaying();
      case MatchPhase.PAUSED:
        return this.processEventQueue();
      default:
        return null;
    }
  }

  private updateKickoff(): MatchEvent | null {
    if (this.frameCount > 30) {
      this.phase = this.matchTime >= this.halfLength
        ? MatchPhase.SECOND_HALF : MatchPhase.PLAYING;
    }
    return null;
  }

  private updatePlaying(): MatchEvent | null {
    // 时间推进 (每60帧1游戏秒)
    if (this.frameCount % 60 === 0) {
      this.matchTime++;
    }

    // 半场/终场检查
    if (this.matchTime >= this.halfLength &&
        this.matchTime < this.halfLength + 2 &&
        this.phase === MatchPhase.PLAYING) {
      this.phase = MatchPhase.HALFTIME;
      return { type: 'halftime', data: { score: this.score, time: this.matchTime } };
    }
    if (this.matchTime >= this.halfLength * 2 &&
        this.phase === MatchPhase.SECOND_HALF) {
      this.phase = MatchPhase.FULLTIME;
      return { type: 'fulltime', data: { score: this.score } };
    }

    // 1. 球员AI决策 (每15帧)
    if (this.frameCount % 15 === 0) {
      this.runAI();
    }

    // 2. 球员移动
    this.movePlayers();

    // 3. 球物理
    this.updateBallPhysics();

    // 4. 碰撞检测 (M4.4)
    this.detectCollisions();

    // 5. 传球接球检测
    this.checkPassArrival();

    return this.processEventQueue();
  }

  // ============================================================
  // M4.4: 碰撞检测
  // ============================================================

  /**
   * 球员-球碰撞检测
   * - 自由球: 最近的球员可以拾取
   * - 传球途中到达目标: 目标球员自动接球
   */
  private detectCollisions(): void {
    // 自由球时: 检查是否有球员可以拾取
    if (this.ball.possessedBy === null && this.freeBallFrames > 5) {
      this.checkBallPickup();
    }
  }

  /** 检查球员拾取自由球 */
  private checkBallPickup(): void {
    const allPlayers = [...this.team0Players, ...this.team1Players];
    let nearest: PlayerState | null = null;
    let nearestDist = Infinity;

    for (const p of allPlayers) {
      if (!p.isActive || p.hasBall) continue;
      const dx = p.position.x - this.ball.x;
      const dy = p.position.y - this.ball.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < BALL_PICKUP_DIST && dist < nearestDist) {
        nearest = p;
        nearestDist = dist;
      }
    }

    if (nearest) {
      nearest.hasBall = true;
      this.ball.possessedBy = nearest.playerId;
      this.ball.vx = 0;
      this.ball.vy = 0;
      this.freeBallFrames = 0;
      this.possession = this.getPlayerTeam(nearest.playerId) === 0 ? 0 : 1;
    }
  }

  /** 检查传球是否到达目标 */
  private checkPassArrival(): void {
    if (this.passTargetId === null || this.ball.possessedBy !== null) {
      this.passTargetId = null;
      return;
    }

    this.passArriveFrames--;
    const target = this.getPlayerById(this.passTargetId);
    if (!target) { this.passTargetId = null; return; }

    const dx = target.position.x - this.ball.x;
    const dy = target.position.y - this.ball.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < BALL_CATCH_DIST || this.passArriveFrames <= 0) {
      // 传球到达
      target.hasBall = true;
      this.ball.possessedBy = this.passTargetId;
      this.ball.vx = 0;
      this.ball.vy = 0;
      this.passTargetId = null;
    }
  }

  // ============================================================
  // 球员移动
  // ============================================================

  private movePlayers(): void {
    const allPlayers = [...this.team0Players, ...this.team1Players];

    for (const player of allPlayers) {
      if (!player.isActive) continue;

      // 持球者或防守方: 使用各自的目标位置
      let targetX: number, targetY: number;
      if (player.targetX !== undefined) {
        targetX = player.targetX;
        targetY = player.targetY ?? this.ball.y;
        // 到达目标附近清除
        const dxt = targetX - player.position.x;
        const dyt = targetY - player.position.y;
        if (Math.abs(dxt) < 5 && Math.abs(dyt) < 5) {
          player.targetX = undefined;
          player.targetY = undefined;
        }
      } else {
        // 默认: 向球移动
        targetX = this.ball.x;
        targetY = this.ball.y;
      }

      const dx = targetX - player.position.x;
      const dy = targetY - player.position.y;
      const speed = Math.max(0.5, player.stats.speed / 15);

      if (Math.abs(dx) > 1) {
        player.position.x += Math.sign(dx) * Math.min(speed, Math.abs(dx));
      }
      if (Math.abs(dy) > 1) {
        player.position.y += Math.sign(dy) * Math.min(speed, Math.abs(dy));
      }

      // 边界限制
      player.position.x = Math.max(2, Math.min(FIELD_WIDTH - 2, player.position.x));
      player.position.y = Math.max(2, Math.min(FIELD_HEIGHT - 2, player.position.y));
    }
  }

  // ============================================================
  // 球物理
  // ============================================================

  private updateBallPhysics(): void {
    if (this.ball.possessedBy !== null) {
      const holder = this.getPlayerById(this.ball.possessedBy);
      if (holder) {
        this.ball.x = holder.position.x;
        this.ball.y = holder.position.y;
      }
      this.ball.vx = 0;
      this.ball.vy = 0;
      this.freeBallFrames = 0;
    } else {
      this.freeBallFrames++;
      this.ball.x += this.ball.vx;
      this.ball.y += this.ball.vy;
      this.ball.vx *= 0.93;
      this.ball.vy *= 0.93;

      if (Math.abs(this.ball.vx) < 0.05) this.ball.vx = 0;
      if (Math.abs(this.ball.vy) < 0.05) this.ball.vy = 0;

      // 边界反弹 + 进球检测
      if (this.ball.x < -20 || this.ball.x > FIELD_WIDTH + 20) {
        // 出界太远，重置
        this.ball.vx = 0;
        this.ball.vy = 0;
      }
      if (this.ball.x < GOAL_LEFT_X - 5 || this.ball.x > GOAL_RIGHT_X + 5) {
        this.ball.x = Math.max(GOAL_LEFT_X - 5, Math.min(GOAL_RIGHT_X + 5, this.ball.x));
      }
      if (this.ball.y < 0 || this.ball.y > FIELD_HEIGHT) {
        this.ball.vy *= -0.5;
        this.ball.y = Math.max(0, Math.min(FIELD_HEIGHT, this.ball.y));
      }

      // 球门检查
      if (this.checkGoal()) {
        const scoringTeam = this.ball.x < FIELD_WIDTH / 2 ? 1 : 0;
        if (this.ball.possessedBy === null) {
          this.addEvent({
            type: 'goal',
            data: { scoringTeam, playerId: -1 },
          });
        }
      }
    }
  }

  // ============================================================
  // AI系统
  // ============================================================

  private runAI(): void {
    const holderId = this.ball.possessedBy;
    if (holderId === null) return; // 自由球时靠碰撞检测

    const holder = this.getPlayerById(holderId);
    if (!holder) return;

    const holderTeam = this.getPlayerTeam(holderId);

    if (holderTeam === 0) {
      this.runTeam0AI(holder, holderId);
    } else {
      this.runTeam1AI(holder, holderId);
    }
  }

  /** 玩家队AI (team 0, 进攻向右) */
  private runTeam0AI(holder: PlayerState, holderId: number): void {
    const distToGoal = GOAL_RIGHT_X - holder.position.x;

    // 冷却
    if (holder.aiCooldown > 0) { holder.aiCooldown--; return; }

    // 1. 射门决策
    if (distToGoal < SHOOT_RANGE && this.isInGoalAngle(holder)) {
      const shootChance = 60 + holder.stats.power;
      if (this.rng.next() % 100 < shootChance) {
        const evt = this.shoot(holderId);
        holder.aiCooldown = 30;
        this.addEvent(evt);
        return;
      }
    }

    // 2. 传球决策 (找更靠前的队友)
    const teammates = this.team0Players.filter(
      p => p.isActive && p.playerId !== holderId && p.position.x > holder.position.x + 10,
    );
    if (teammates.length > 0 && distToGoal > 20) {
      teammates.sort((a, b) => b.position.x - a.position.x);
      const target = teammates[0];
      const evt = this.pass(holderId, target.playerId);
      holder.aiCooldown = 25;
      this.addEvent(evt);
      return;
    }

    // 3. 向球门盘带
    holder.targetX = Math.min(GOAL_RIGHT_X - 10, holder.position.x + 3);
    holder.targetY = 112;
    holder.aiCooldown = 10;
  }

  /** 对手队AI (team 1, 进攻向左) */
  private runTeam1AI(holder: PlayerState, holderId: number): void {
    const distToGoal = holder.position.x - GOAL_LEFT_X;

    if (holder.aiCooldown > 0) { holder.aiCooldown--; return; }

    // 1. 射门决策
    if (distToGoal < SHOOT_RANGE && this.isInGoalAngle(holder)) {
      const shootChance = 50 + holder.stats.power;
      if (this.rng.next() % 100 < shootChance) {
        const evt = this.shoot(holderId);
        holder.aiCooldown = 35;
        this.addEvent(evt);
        return;
      }
    }

    // 2. 传球
    const teammates = this.team1Players.filter(
      p => p.isActive && p.playerId !== holderId && p.position.x < holder.position.x - 10,
    );
    if (teammates.length > 0 && distToGoal > 20) {
      teammates.sort((a, b) => a.position.x - b.position.x);
      const target = teammates[0];
      const evt = this.pass(holderId, target.playerId);
      holder.aiCooldown = 30;
      this.addEvent(evt);
      return;
    }

    // 3. 盘带
    holder.targetX = Math.max(GOAL_LEFT_X + 10, holder.position.x - 3);
    holder.targetY = 112;
    holder.aiCooldown = 10;
  }

  /** 检查球员是否在射门角度内 */
  private isInGoalAngle(player: PlayerState): boolean {
    return player.position.y > GOAL_Y_TOP - 20 &&
           player.position.y < GOAL_Y_BOT + 20;
  }

  // ============================================================
  // 球员动作
  // ============================================================

  shoot(playerId: number): MatchEvent {
    const player = this.getPlayerById(playerId);
    if (!player || !player.hasBall) return { type: 'none' };

    player.hasBall = false;
    this.ball.possessedBy = null;
    this.freeBallFrames = 0;

    const teamSide = this.getPlayerTeam(playerId);
    const dir = teamSide === 0 ? 1 : -1;

    const power = 3 + player.stats.power / 5;
    const rngOffset = this.rng.next() % 5;
    this.ball.vx = dir * (power + rngOffset);
    this.ball.vy = (this.rng.next() % 7) - 3;

    // 延迟检查进球 (给球一点飞行时间)
    const scoringTeam = teamSide;
    return {
      type: 'shoot',
      data: { playerId, scoringTeam, velocity: { vx: this.ball.vx, vy: this.ball.vy } },
    };
  }

  pass(playerId: number, targetId: number): MatchEvent {
    const player = this.getPlayerById(playerId);
    if (!player || !player.hasBall) return { type: 'none' };

    player.hasBall = false;
    this.ball.possessedBy = null;
    this.freeBallFrames = 0;

    const target = this.getPlayerById(targetId);
    if (!target) return { type: 'none' };

    const dx = target.position.x - player.position.x;
    const dy = target.position.y - player.position.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const speed = 3 + player.stats.technique / 10;

    this.ball.vx = (dx / dist) * speed;
    this.ball.vy = (dy / dist) * speed;

    this.passTargetId = targetId;
    this.passArriveFrames = Math.ceil(dist / speed);

    return {
      type: 'pass',
      data: { playerId, targetId, arriveFrames: this.passArriveFrames },
    };
  }

  tackle(playerId: number, targetId: number): MatchEvent {
    const tackler = this.getPlayerById(playerId);
    const target = this.getPlayerById(targetId);
    if (!tackler || !target) return { type: 'none' };

    const tacklePower = tackler.stats.power + (this.rng.next() % 30);
    const dribblePower = target.stats.technique + (this.rng.next() % 30);

    if (tacklePower > dribblePower) {
      target.hasBall = false;
      this.ball.possessedBy = playerId;
      tackler.hasBall = true;
      return { type: 'tackle_success', data: { tacklerId: playerId, targetId } };
    }
    return { type: 'tackle_fail', data: { tacklerId: playerId, targetId } };
  }

  // ============================================================
  // 进球检测
  // ============================================================

  private checkGoal(): boolean {
    const bx = this.ball.x;
    const by = this.ball.y;
    return (
      (bx <= GOAL_LEFT_X + 2 &&
       by >= GOAL_Y_TOP && by <= GOAL_Y_BOT) ||
      (bx >= GOAL_RIGHT_X - 2 &&
       by >= GOAL_Y_TOP && by <= GOAL_Y_BOT)
    );
  }

  // ============================================================
  // 工具方法
  // ============================================================

  getBallHolder(): number | null {
    return this.ball.possessedBy;
  }

  getPlayerById(id: number): PlayerState | undefined {
    return [...this.team0Players, ...this.team1Players].find(p => p.playerId === id);
  }

  getPlayerTeam(id: number): number {
    if (this.team0Players.some(p => p.playerId === id)) return 0;
    if (this.team1Players.some(p => p.playerId === id)) return 1;
    return -1;
  }

  private addEvent(evt: MatchEvent): void {
    if (evt.type !== 'none') {
      this.eventQueue.push(evt);
    }
  }

  private processEventQueue(): MatchEvent | null {
    if (this.eventQueue.length > 0) {
      return this.eventQueue.shift()!;
    }
    return null;
  }

  handleGoal(scoringTeam: number): void {
    this.score[scoringTeam]++;
    this.resetBall();
    // 失球方开球
    const kickoffTeam = scoringTeam === 0 ? this.team1Players : this.team0Players;
    const kickoffPlayer = kickoffTeam[6];
    if (kickoffPlayer) {
      this.ball.possessedBy = kickoffPlayer.playerId;
      kickoffPlayer.hasBall = true;
    }
    // 清除所有球员持球标记
    for (const p of [...this.team0Players, ...this.team1Players]) {
      if (p.playerId !== (kickoffPlayer?.playerId)) p.hasBall = false;
    }
    this.phase = MatchPhase.KICKOFF;
    this.frameCount = 0;
  }

  getAllPlayers(): PlayerState[] {
    return [...this.team0Players, ...this.team1Players];
  }
}
