/**
 * 比赛引擎 - 核心比赛逻辑
 *
 * 对应 ROM Bank 4/6 中的比赛逻辑。
 * 负责:
 *   - 球员场上位置管理
 *   - 球的移动和物理
 *   - 球员AI行为
 *   - 比赛状态管理 (开球、进行中、半场、结束)
 *   - 比分和计时
 */

import type { PlayerStats, TeamData } from '../data/PlayerData';
import type { RngGenerator } from '../utils/RngGenerator';

/** 场地常量 */
export const FIELD_WIDTH = 256;   // 球场宽度 (NES 像素)
export const FIELD_HEIGHT = 200;  // 球场高度
export const GOAL_Y_TOP = 70;     // 球门上沿
export const GOAL_Y_BOT = 130;    // 球门下沿
export const GOAL_LEFT_X = 0;     // 左球门线
export const GOAL_RIGHT_X = 252;  // 右球门线

/** 球员场上位置 (坐标) */
export interface PlayerPosition {
  x: number;
  y: number;
}

/** 球员场上状态 */
export interface PlayerState {
  playerId: number;
  stats: PlayerStats;
  position: PlayerPosition;
  hasBall: boolean;
  isActive: boolean;       // 是否在场上 (未受伤/红牌)
  energy: number;          // 当前体力 (初始 = stamina * 10)
}

/** 比赛阶段 */
export enum MatchPhase {
  KICKOFF = 0,      // 开球
  PLAYING = 1,       // 比赛进行中
  HALFTIME = 2,      // 半场休息
  SECOND_HALF = 3,   // 下半场
  FULLTIME = 4,      // 比赛结束
  PAUSED = 5,        // 暂停 (事件中)
}

/** 球的状态 */
export interface BallState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  possessedBy: number | null;  // 持球球员ID
}

/** 比赛统计 */
export interface MatchStats {
  team0: TeamData;
  team1: TeamData;
  score: [number, number];
  possession: [number, number];   // 控球时间
  shots: [number, number];
  fouls: [number, number];
}

export class MatchEngine {
  /** 两队球员 */
  team0Players: PlayerState[] = [];
  team1Players: PlayerState[] = [];

  /** 球 */
  ball: BallState = { x: FIELD_WIDTH / 2, y: FIELD_HEIGHT / 2, vx: 0, vy: 0, possessedBy: null };

  /** 比赛阶段 */
  phase: MatchPhase = MatchPhase.KICKOFF;

  /** 比赛时间 (每秒60帧 ≈ 1游戏秒) */
  matchTime: number = 0;
  halfLength: number = 45 * 60;  // 45分钟 = 2700 帧

  /** 比分 */
  score: [number, number] = [0, 0];

  /** 随机数 */
  rng: RngGenerator;

  /** 当前控球方 */
  possession: 0 | 1 = 0;

  /** 事件队列 */
  eventQueue: MatchEvent[] = [];

  /** 帧计数器 */
  frameCount: number = 0;

  constructor(rng: RngGenerator) {
    this.rng = rng;
  }

  /** 初始化比赛：设置两队场上球员 */
  initMatch(team0: TeamData, team1: TeamData): void {
    this.team0Players = this.setupTeam(team0, 0);
    this.team1Players = this.setupTeam(team1, 1);
    this.ball = { x: FIELD_WIDTH / 2, y: FIELD_HEIGHT / 2, vx: 0, vy: 0, possessedBy: null };
    this.phase = MatchPhase.KICKOFF;
    this.matchTime = 0;
    this.score = [0, 0];
    this.frameCount = 0;
    this.eventQueue = [];
    this.possession = 0;

    // 开球: 随机一方持球
    this.ball.possessedBy = this.team0Players[6].playerId;
  }

  /** 设置一队球员的初始位置 */
  private setupTeam(team: TeamData, side: number): PlayerState[] {
    const players: PlayerState[] = [];
    const isLeft = side === 0;

    // 阵型布局 (4-4-2 默认)
    const formationX = isLeft
      ? [20, 60, 90, 120, 120, 140, 160, 180, 180, 200, 210]  // 左队
      : [236, 196, 166, 136, 136, 116, 96, 76, 76, 56, 46];   // 右队
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
      });
    }
    return players;
  }

  /** 每帧更新 */
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
      this.phase = MatchPhase.PLAYING;
    }
    return null;
  }

  private updatePlaying(): MatchEvent | null {
    // 时间推进
    if (this.frameCount % 60 === 0) {
      this.matchTime++;
    }

    // 半场/终场检查
    if (this.matchTime >= this.halfLength && this.phase === MatchPhase.PLAYING) {
      this.phase = MatchPhase.HALFTIME;
      return { type: 'halftime', data: { score: this.score, time: this.matchTime } };
    }
    if (this.matchTime >= this.halfLength * 2 && this.phase === MatchPhase.SECOND_HALF) {
      this.phase = MatchPhase.FULLTIME;
      return { type: 'fulltime', data: { score: this.score } };
    }

    // AI 球员移动
    this.movePlayers();

    // 球物理
    this.updateBallPhysics();

    return this.processEventQueue();
  }

  /** 球员移动 (简化AI) */
  private movePlayers(): void {
    const ballHolder = this.getBallHolder();
    const allPlayers = [...this.team0Players, ...this.team1Players];

    for (const player of allPlayers) {
      if (!player.isActive) continue;
      if (player.playerId === ballHolder) continue;

      // 简单追踪球/位置
      const targetX = player.hasBall ? this.ball.x : this.ball.x + (this.rng.next() % 40 - 20);
      const targetY = player.hasBall ? this.ball.y : this.ball.y + (this.rng.next() % 40 - 20);

      const dx = targetX - player.position.x;
      const dy = targetY - player.position.y;
      const speed = player.stats.speed / 20;  // 每帧移动像素

      if (Math.abs(dx) > 1) player.position.x += Math.sign(dx) * Math.min(speed, Math.abs(dx));
      if (Math.abs(dy) > 1) player.position.y += Math.sign(dy) * Math.min(speed, Math.abs(dy));

      // 边界限制
      player.position.x = Math.max(0, Math.min(FIELD_WIDTH, player.position.x));
      player.position.y = Math.max(0, Math.min(FIELD_HEIGHT, player.position.y));
    }
  }

  /** 球物理更新 */
  private updateBallPhysics(): void {
    if (this.ball.possessedBy !== null) {
      // 球随持球者移动
      const holder = this.getPlayerById(this.ball.possessedBy);
      if (holder) {
        this.ball.x = holder.position.x;
        this.ball.y = holder.position.y;
      }
      this.ball.vx = 0;
      this.ball.vy = 0;
    } else {
      // 自由球：减速
      this.ball.x += this.ball.vx;
      this.ball.y += this.ball.vy;
      this.ball.vx *= 0.92;
      this.ball.vy *= 0.92;

      if (Math.abs(this.ball.vx) < 0.1) this.ball.vx = 0;
      if (Math.abs(this.ball.vy) < 0.1) this.ball.vy = 0;

      // 边界反弹
      if (this.ball.x < 0 || this.ball.x > FIELD_WIDTH) {
        this.ball.vx *= -0.7;
        this.ball.x = Math.max(0, Math.min(FIELD_WIDTH, this.ball.x));
      }
      if (this.ball.y < 0 || this.ball.y > FIELD_HEIGHT) {
        this.ball.vy *= -0.7;
        this.ball.y = Math.max(0, Math.min(FIELD_HEIGHT, this.ball.y));
      }
    }
  }

  /** 球员动作: 射门 */
  shoot(playerId: number): MatchEvent {
    const player = this.getPlayerById(playerId);
    if (!player || !player.hasBall) return { type: 'none' };

    player.hasBall = false;
    this.ball.possessedBy = null;

    // 确定射门方向 (面向对方球门)
    const teamSide = this.getPlayerTeam(playerId);
    const dir = teamSide === 0 ? 1 : -1;

    // 射门速度基于球员 power 属性
    const power = player.stats.power / 10;
    this.ball.vx = dir * (power + this.rng.next() % 5);
    this.ball.vy = (this.rng.next() % 7 - 3);

    // 检查是否进球
    const isGoal = this.checkGoal();
    const scoringTeam = teamSide;

    return {
      type: isGoal ? 'goal' : 'shoot',
      data: { playerId, scoringTeam, isGoal },
    };
  }

  /** 球员动作: 传球 */
  pass(playerId: number, targetId: number): MatchEvent {
    const player = this.getPlayerById(playerId);
    if (!player || !player.hasBall) return { type: 'none' };

    player.hasBall = false;
    this.ball.possessedBy = null;

    const target = this.getPlayerById(targetId);
    if (!target) return { type: 'none' };

    const dx = target.position.x - player.position.x;
    const dy = target.position.y - player.position.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const speed = player.stats.technique / 15;

    this.ball.vx = (dx / dist) * speed;
    this.ball.vy = (dy / dist) * speed;

    // 传球到达后自动被接球
    const arriveFrames = Math.ceil(dist / speed);
    return {
      type: 'pass',
      data: { playerId, targetId, arriveFrames },
    };
  }

  /** 球员动作: 铲球 */
  tackle(playerId: number, targetId: number): MatchEvent {
    const tackler = this.getPlayerById(playerId);
    const target = this.getPlayerById(targetId);
    if (!tackler || !target) return { type: 'none' };

    // 比较铲球值 vs 盘球值
    const tacklePower = tackler.stats.power + (this.rng.next() % 20);
    const dribblePower = target.stats.technique + (this.rng.next() % 20);

    if (tacklePower > dribblePower) {
      // 铲球成功
      target.hasBall = false;
      this.ball.possessedBy = playerId;
      tackler.hasBall = true;
      return { type: 'tackle_success', data: { tacklerId: playerId, targetId } };
    } else {
      // 铲球失败
      return { type: 'tackle_fail', data: { tacklerId: playerId, targetId } };
    }
  }

  /** 检查是否进球 */
  private checkGoal(): boolean {
    return (
      (this.ball.x <= GOAL_LEFT_X + 5 &&
       this.ball.y >= GOAL_Y_TOP &&
       this.ball.y <= GOAL_Y_BOT) ||
      (this.ball.x >= GOAL_RIGHT_X - 5 &&
       this.ball.y >= GOAL_Y_TOP &&
       this.ball.y <= GOAL_Y_BOT)
    );
  }

  /** 获取持球球员 */
  getBallHolder(): number | null {
    return this.ball.possessedBy;
  }

  /** 查找球员 */
  getPlayerById(id: number): PlayerState | undefined {
    return [...this.team0Players, ...this.team1Players].find(p => p.playerId === id);
  }

  /** 获取球员所属队伍 (0=team0, 1=team1, -1=未找到) */
  getPlayerTeam(id: number): number {
    if (this.team0Players.some(p => p.playerId === id)) return 0;
    if (this.team1Players.some(p => p.playerId === id)) return 1;
    return -1;
  }

  /** 处理事件队列 */
  private processEventQueue(): MatchEvent | null {
    if (this.eventQueue.length > 0) {
      return this.eventQueue.shift()!;
    }
    return null;
  }

  /** 推进事件 (进球后重开) */
  handleGoal(scoringTeam: number): void {
    this.score[scoringTeam]++;
    // 中场开球
    this.ball.x = FIELD_WIDTH / 2;
    this.ball.y = FIELD_HEIGHT / 2;
    this.ball.vx = 0;
    this.ball.vy = 0;
    this.ball.possessedBy = (scoringTeam === 0)
      ? this.team1Players[6].playerId
      : this.team0Players[6].playerId;
    this.phase = MatchPhase.KICKOFF;
    this.frameCount = 0;
  }

  /** 获取两队球员列表 (用于渲染) */
  getAllPlayers(): PlayerState[] {
    return [...this.team0Players, ...this.team1Players];
  }
}

/** 比赛事件 */
export interface MatchEvent {
  type: string;
  data?: any;
}
