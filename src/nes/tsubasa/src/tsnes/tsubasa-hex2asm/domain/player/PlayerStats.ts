/**
 * 球员六维数值
 *
 * ROM 数据格式（每项 0-99，FIFG 编码格式）：
 *   - G: 守门 (Goalkeeping)
 *   - K: 踢力 (Kick)
 *   - C: 截球 (Cut)
 *   - T: 盘球 (Tackle)
 *   - P: 传球 (Pass)
 *   - S: 速度 (Speed)
 */
export interface PlayerStats {
  goalkeeping: number;
  kick: number;
  cut: number;
  tackle: number;
  pass: number;
  speed: number;
}

/** 六维统计键名 */
export const STAT_KEYS = [
  'goalkeeping', 'kick', 'cut', 'tackle', 'pass', 'speed',
] as const;

export type StatKey = typeof STAT_KEYS[number];

/** 六维标签（中日双语） */
export const STAT_LABELS: Record<StatKey, string> = {
  goalkeeping: 'G',
  kick:        'K',
  cut:         'C',
  tackle:      'T',
  pass:        'P',
  speed:       'S',
};

/**
 * 升级经验表 — 从 ROM 提取（bank_28 属性表偏移量）
 *
 * 每级需要累计经验值才能升级。
 * Level 1 初始即拥有，不需要经验。
 * Level 从 1 开始，数组索引 0 = Lv2 所需经验。
 */
export const EXPERIENCE_TABLE: readonly number[] = [
  // Lv2   Lv3   Lv4   Lv5   Lv6   Lv7   Lv8   Lv9   Lv10
     20,   40,   60,   80,  100,  130,  160,  200,  240,
  // Lv11  Lv12  Lv13  Lv14  Lv15  Lv16  Lv17  Lv18  Lv19
    280,  320,  380,  440,  500,  580,  660,  740,  820,
  // Lv20  Lv21  Lv22  Lv23  Lv24  Lv25  Lv26  Lv27  Lv28
    920, 1040, 1160, 1280, 1420, 1560, 1720, 1880, 2040,
  // Lv29  Lv30  Lv31  Lv32
   2240, 2480, 2760, 3040,
];

/** 最高等级 */
export const MAX_LEVEL = 32;

/**
 * 计算当前等级（基于累计经验）
 *
 * EXPERIENCE_TABLE 为逐级所需经验（从当前级到下一级）。
 * 例：Lv1→2 需 20，Lv2→3 需 40，累计 20=Lv2，累计 60=Lv3。
 *
 * @param exp - 累计经验值
 * @returns 等级 (1-32)，超过最大视为 32
 */
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

/**
 * 升级所需经验（当前等级 → 下一级）
 *
 * @param currentLevel - 当前等级 (1-31)
 * @returns 升级所需经验，已满级返回 0
 */
export function expToNextLevel(currentLevel: number): number {
  if (currentLevel < 1 || currentLevel >= MAX_LEVEL) return 0;
  return EXPERIENCE_TABLE[currentLevel - 1];
}

/**
 * 创建空的六维对象
 */
export function createDefaultStats(): PlayerStats {
  return { goalkeeping: 0, kick: 0, cut: 0, tackle: 0, pass: 0, speed: 0 };
}

/**
 * 六维合计
 */
export function sumStats(s: PlayerStats): number {
  return s.goalkeeping + s.kick + s.cut + s.tackle + s.pass + s.speed;
}
