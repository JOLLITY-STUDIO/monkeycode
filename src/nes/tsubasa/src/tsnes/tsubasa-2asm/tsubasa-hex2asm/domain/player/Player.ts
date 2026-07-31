/**
 * 球员实体
 *
 * 封装 ROM/运行时中的球员数据，对应 WRAM $0300 区 roster 槽位。
 * 每球员 12 字节：
 *   [nameIdx, team, number, position, stamina_lo, stamina_hi,
 *    G, K, C, T, P, S]
 */

import { PlayerPosition, parsePosition } from './PlayerPosition';
import { PlayerStats, EXPERIENCE_TABLE, calcLevel, MAX_LEVEL } from './PlayerStats';
import type { SpecialMove } from './SpecialMove';

/** Roster 槽位大小（ROM 原始格式：12 字节） */
export const PLAYER_BYTES = 12;

/** 球员 ID（ROM 索引 / WRAM 偏移） */
export type PlayerId = number;

export interface PlayerInit {
  id: PlayerId;
  nameIdx: number;
  team: number;
  number: number;
  position: PlayerPosition;
  stamina: number;    // 当前体力
  maxStamina: number; // 最大体力
  level: number;
  /** 经验值（累计，用于升级判定） */
  exp: number;
  stats: PlayerStats;
  /** 持有必杀技列表 */
  moves: SpecialMove[];
}

/**
 * Player 类
 *
 * 表示游戏中一个球员的完整状态：
 * - 基础信息：编号、背号、位置
 * - 六维数值：G/K/C/T/P/S
 * - 体力和等级经验
 * - 持有必杀技
 */
export class Player {
  readonly id: PlayerId;
  nameIdx: number;
  team: number;
  number: number;
  position: PlayerPosition;

  stamina: number;
  maxStamina: number;

  level: number;
  exp: number;

  stats: PlayerStats;

  moves: SpecialMove[];

  constructor(init: PlayerInit) {
    this.id          = init.id;
    this.nameIdx     = init.nameIdx;
    this.team        = init.team;
    this.number      = init.number;
    this.position    = init.position;
    this.stamina     = init.stamina;
    this.maxStamina  = init.maxStamina;
    this.level       = init.level;
    this.exp         = init.exp;
    this.stats       = { ...init.stats };
    this.moves       = [...init.moves];
  }

  // ---- 体力 ----

  /** 消耗体力，返回是否成功（不会低于 0） */
  consumeStamina(amount: number): boolean {
    if (this.stamina < amount) return false;
    this.stamina -= amount;
    return true;
  }

  /** 恢复体力（不超过最大值） */
  recoverStamina(amount: number): void {
    this.stamina = Math.min(this.maxStamina, this.stamina + amount);
  }

  /** 体力比率 [0, 1] */
  get staminaRatio(): number {
    if (this.maxStamina <= 0) return 0;
    return this.stamina / this.maxStamina;
  }

  // ---- 升级 ----

  /**
   * 添加经验值，返回是否升级
   */
  addExp(amount: number): boolean {
    if (this.level >= MAX_LEVEL) return false;
    this.exp += amount;
    return this.tryLevelUp();
  }

  /**
   * 尝试升级（基于剩余经验，可能连升多级）
   *
   * EXPERIENCE_TABLE 为逐级增量，每升一级从 exp 扣除对应值。
   *
   * @returns 是否至少升了 1 级
   */
  tryLevelUp(): boolean {
    let leveled = false;
    while (this.level < MAX_LEVEL) {
      const needed = EXPERIENCE_TABLE[this.level - 1];
      if (this.exp < needed) break;

      this.exp -= needed;
      this.level++;
      leveled = true;

      // 每级六维微增
      this.stats.goalkeeping = Math.min(99, this.stats.goalkeeping + 1);
      this.stats.kick        = Math.min(99, this.stats.kick        + 1);
      this.stats.cut         = Math.min(99, this.stats.cut         + 1);
      this.stats.tackle      = Math.min(99, this.stats.tackle      + 1);
      this.stats.pass        = Math.min(99, this.stats.pass        + 1);
      this.stats.speed       = Math.min(99, this.stats.speed       + 1);
    }
    return leveled;
  }

  /** 升级总经验 = 到当前等级所需累计 */
  get totalExpNeeded(): number {
    let sum = 0;
    for (let i = 0; i < this.level - 1 && i < EXPERIENCE_TABLE.length; i++) {
      sum += EXPERIENCE_TABLE[i];
    }
    return sum;
  }

  // ---- 序列化 ----

  /**
   * 从原始 roster 字节创建 Player
   * 格式: [nameIdx, team, number, position, stamina_lo, stamina_hi, G, K, C, T, P, S]
   */
  static fromRoster(id: PlayerId, bytes: Readonly<Uint8Array | number[]>, offset: number = 0): Player {
    const b = (i: number) => bytes[offset + i] ?? 0;
    const stamina = b(4) | (b(5) << 8);
    const stats: PlayerStats = {
      goalkeeping: b(6),
      kick:        b(7),
      cut:         b(8),
      tackle:      b(9),
      pass:        b(10),
      speed:       b(11),
    };

    return new Player({
      id,
      nameIdx:     b(0),
      team:        b(1),
      number:      b(2),
      position:    parsePosition(b(3)),
      stamina,
      maxStamina:  stamina,
      level:       calcLevel(0), // 初始从 1 级开始
      exp:         0,
      stats,
      moves:       [],
    });
  }

  /** 克隆 */
  clone(): Player {
    return new Player({
      id:          this.id,
      nameIdx:     this.nameIdx,
      team:        this.team,
      number:      this.number,
      position:    this.position,
      stamina:     this.stamina,
      maxStamina:  this.maxStamina,
      level:       this.level,
      exp:         this.exp,
      stats:       { ...this.stats },
      moves:       [...this.moves],
    });
  }
}
