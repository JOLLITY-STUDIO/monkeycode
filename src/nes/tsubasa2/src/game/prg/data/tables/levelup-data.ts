/**
 * levelup-data.ts — 升级阈值 + 能力显示表（从真 ROM 提取）
 *
 * 数据源（docs/rom-data-locations.md §6）：
 *   - 真实体力显示 (16-bit LE 30 项)    ROM 0x39F1E
 *   - 真实能力显示 (byte 30 项)          ROM 0x39E5E
 *
 * 注：升级 exp 阈值近似 = 上级体力 × 10；精确升级阈需进一步反汇编 Stats Modifier。
 *
 * 重生：scripts/extract_levelup.cjs
 */

export interface LevelUpStatEntry {
  /** 等级（1-30） */
  readonly level: number;
  /** 升级到该等级所需累计经验（近似） */
  readonly expRequired: number;
  /** 6 项基础成长 (shot/dribble/pass/tackle/speed/stamina) */
  readonly growth: ReadonlyArray<number>;
  /** 该等级对应真实体力显示 */
  readonly staminaRaw: number;
  /** 该等级对应能力上限显示 */
  readonly abilityMax: number;
}

/** 升级表（等级 1-30，已从真 ROM 提取） */
export const LEVEL_UP_TABLE: ReadonlyArray<LevelUpStatEntry> = [
  { level: 1, expRequired: 4640, growth: [13, 13, 13, 13, 13, 208], staminaRaw: 464, abilityMax: 13 },
  { level: 2, expRequired: 4820, growth: [13, 13, 13, 13, 13, 226], staminaRaw: 482, abilityMax: 13 },
  { level: 3, expRequired: 4900, growth: [13, 13, 13, 13, 13, 234], staminaRaw: 490, abilityMax: 13 },
  { level: 4, expRequired: 4980, growth: [14, 14, 14, 14, 14, 242], staminaRaw: 498, abilityMax: 14 },
  { level: 5, expRequired: 5060, growth: [14, 14, 14, 14, 14, 250], staminaRaw: 506, abilityMax: 14 },
  { level: 6, expRequired: 5140, growth: [14, 14, 14, 14, 14, 2], staminaRaw: 514, abilityMax: 14 },
  { level: 7, expRequired: 5220, growth: [15, 15, 15, 15, 15, 10], staminaRaw: 522, abilityMax: 15 },
  { level: 8, expRequired: 5300, growth: [15, 15, 15, 15, 15, 18], staminaRaw: 530, abilityMax: 15 },
  { level: 9, expRequired: 5380, growth: [16, 16, 16, 16, 16, 26], staminaRaw: 538, abilityMax: 16 },
  { level: 10, expRequired: 5460, growth: [16, 16, 16, 16, 16, 34], staminaRaw: 546, abilityMax: 16 },
  { level: 11, expRequired: 5540, growth: [17, 17, 17, 17, 17, 42], staminaRaw: 554, abilityMax: 17 },
  { level: 12, expRequired: 5620, growth: [17, 17, 17, 17, 17, 50], staminaRaw: 562, abilityMax: 17 },
  { level: 13, expRequired: 5700, growth: [17, 17, 17, 17, 17, 58], staminaRaw: 570, abilityMax: 17 },
  { level: 14, expRequired: 5780, growth: [18, 18, 18, 18, 18, 66], staminaRaw: 578, abilityMax: 18 },
  { level: 15, expRequired: 5860, growth: [18, 18, 18, 18, 18, 74], staminaRaw: 586, abilityMax: 18 },
  { level: 16, expRequired: 5940, growth: [19, 19, 19, 19, 19, 82], staminaRaw: 594, abilityMax: 19 },
  { level: 17, expRequired: 6020, growth: [20, 20, 20, 20, 20, 90], staminaRaw: 602, abilityMax: 20 },
  { level: 18, expRequired: 6100, growth: [20, 20, 20, 20, 20, 98], staminaRaw: 610, abilityMax: 20 },
  { level: 19, expRequired: 6180, growth: [21, 21, 21, 21, 21, 106], staminaRaw: 618, abilityMax: 21 },
  { level: 20, expRequired: 6260, growth: [21, 21, 21, 21, 21, 114], staminaRaw: 626, abilityMax: 21 },
  { level: 21, expRequired: 6340, growth: [22, 22, 22, 22, 22, 122], staminaRaw: 634, abilityMax: 22 },
  { level: 22, expRequired: 6420, growth: [22, 22, 22, 22, 22, 130], staminaRaw: 642, abilityMax: 22 },
  { level: 23, expRequired: 6500, growth: [23, 23, 23, 23, 23, 138], staminaRaw: 650, abilityMax: 23 },
  { level: 24, expRequired: 6580, growth: [24, 24, 24, 24, 24, 146], staminaRaw: 658, abilityMax: 24 },
  { level: 25, expRequired: 6640, growth: [24, 24, 24, 24, 24, 152], staminaRaw: 664, abilityMax: 24 },
  { level: 26, expRequired: 6700, growth: [25, 25, 25, 25, 25, 158], staminaRaw: 670, abilityMax: 25 },
  { level: 27, expRequired: 6760, growth: [26, 26, 26, 26, 26, 164], staminaRaw: 676, abilityMax: 26 },
  { level: 28, expRequired: 6820, growth: [26, 26, 26, 26, 26, 170], staminaRaw: 682, abilityMax: 26 },
  { level: 29, expRequired: 6880, growth: [27, 27, 27, 27, 27, 176], staminaRaw: 688, abilityMax: 27 },
  { level: 30, expRequired: 6940, growth: [28, 28, 28, 28, 28, 182], staminaRaw: 694, abilityMax: 28 },
];

