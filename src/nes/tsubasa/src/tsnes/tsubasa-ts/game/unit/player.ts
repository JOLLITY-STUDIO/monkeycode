/**
 * 球员 — 类型定义 + class Player
 *
 * 封装 ROM/运行时中的球员数据，对应 WRAM $0300 区 roster 槽位。
 * 每球员 12 字节:
 *   [nameIdx, team, number, position, stamina_lo, stamina_hi, G, K, C, T, P, S]
 */

// ============================================================
// §1 类型 / 常量 / 工具函数
// ============================================================

/** 球员位置枚举 */
export enum PlayerPosition {
  GK = 0,  // 守门员
  DF = 1,  // 后卫
  MF = 2,  // 中场
  FW = 3,  // 前锋
}

export const POSITION_LABELS: Record<PlayerPosition, string> = {
  [PlayerPosition.GK]: 'GK',
  [PlayerPosition.DF]: 'DF',
  [PlayerPosition.MF]: 'MF',
  [PlayerPosition.FW]: 'FW',
};

export function parsePosition(code: number): PlayerPosition {
  if (code in POSITION_LABELS) return code as PlayerPosition;
  return PlayerPosition.FW;
}

/** 六维数值 */
export interface PlayerStats {
  goalkeeping: number;
  kick: number;
  cut: number;
  tackle: number;
  pass: number;
  speed: number;
}

export const STAT_KEYS = [
  'goalkeeping', 'kick', 'cut', 'tackle', 'pass', 'speed',
] as const;

export type StatKey = typeof STAT_KEYS[number];

export const STAT_LABELS: Record<StatKey, string> = {
  goalkeeping: 'G',
  kick:        'K',
  cut:         'C',
  tackle:      'T',
  pass:        'P',
  speed:       'S',
};

/** 升级经验表 */
export const EXPERIENCE_TABLE: readonly number[] = [
    20,   40,   60,   80,  100,  130,  160,  200,  240,
   280,  320,  380,  440,  500,  580,  660,  740,  820,
   920, 1040, 1160, 1280, 1420, 1560, 1720, 1880, 2040,
  2240, 2480, 2760, 3040,
];

export const MAX_LEVEL = 32;

export function calcLevel(exp: number): number {
  let lv = 1;
  let remaining = exp;
  for (let i = 0; i < EXPERIENCE_TABLE.length; i++) {
    if (remaining < EXPERIENCE_TABLE[i]) return lv;
    remaining -= EXPERIENCE_TABLE[i];
    lv++;
  }
  return MAX_LEVEL;
}

export function expToNextLevel(currentLevel: number): number {
  if (currentLevel < 1 || currentLevel >= MAX_LEVEL) return 0;
  return EXPERIENCE_TABLE[currentLevel - 1];
}

export function createDefaultStats(): PlayerStats {
  return { goalkeeping: 0, kick: 0, cut: 0, tackle: 0, pass: 0, speed: 0 };
}

export function sumStats(s: PlayerStats): number {
  return s.goalkeeping + s.kick + s.cut + s.tackle + s.pass + s.speed;
}

/** 必杀技 */
export enum SpecialMoveType {
  SHOT    = 'shot',
  PASS    = 'pass',
  DRIBBLE = 'dribble',
  TACKLE  = 'tackle',
  CATCH   = 'catch',
  COMBO   = 'combo',
}

export interface SpecialMove {
  id: number;
  name: string;
  type: SpecialMoveType;
  cost: number;
  power: number;
}

export const KNOWN_SPECIAL_MOVES: Record<number, SpecialMove> = {
  1:  { id: 1,  name: '抽球射门',    type: SpecialMoveType.SHOT,    cost: 400, power: 200 },
  10: { id: 10, name: '虎射',        type: SpecialMoveType.SHOT,    cost: 450, power: 250 },
  20: { id: 20, name: '黄金搭档',    type: SpecialMoveType.COMBO,   cost: 350, power: 180 },
  31: { id: 31, name: '三角跳跃',    type: SpecialMoveType.CATCH,   cost: 300, power: 200 },
};

export function getSpecialMove(id: number): SpecialMove | undefined {
  return KNOWN_SPECIAL_MOVES[id];
}

export const PLAYER_BYTES = 12;

export type PlayerId = number;

export interface PlayerInit {
  id: PlayerId;
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
}

// ============================================================
// §2 Player 类
// ============================================================

/**
 * Player 类 — 球员完整状态
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

  /** 添加经验值，返回是否升级 */
  addExp(amount: number): boolean {
    if (this.level >= MAX_LEVEL) return false;
    this.exp += amount;
    return this.tryLevelUp();
  }

  /** 尝试升级（可能连升多级） */
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

  /** 升级总经验 */
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
      level:       1,
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
