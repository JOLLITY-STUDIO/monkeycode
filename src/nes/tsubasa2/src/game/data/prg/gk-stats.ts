// @ts-nocheck
/**
 * 守门员能力值数据 (真实 ROM 提取, 20 GK × 8 字节)
 *
 * 来源: ROM 0x3ae96 + gkIndex * 8
 * 每条记录 8 字节:
 *   [0] Stamina 体力
 *   [1] Pass 传球
 *   [2] Catching 扑接
 *   [3] Punching 击球
 *   [4] Vs Shots 对射门
 *   [5] Vs Dribbles 对盘带
 *   [6] Low Rush 低空冲出
 *   [7] High Claim 高空摘球
 *
 * 数据来源文档: docs/rom-data-locations.md
 */

export const GK_STAT_FIELDS = [
  'stamina',    // 0
  'pass',       // 1
  'catching',   // 2
  'punching',   // 3
  'vsShots',    // 4
  'vsDribbles', // 5
  'lowRush',    // 6
  'highClaim',  // 7
] as const;

/** GK 能力值原始字节表 */
export const GK_STATS_RAW: readonly (readonly number[])[] = [
  [20,15,27,38,19,19,22,23], // GK 0
  [28,20,43,46,26,26,38,43], // GK 1
  [0,10,4,4,0,0,8,8], // GK 2
  [0,10,8,8,2,2,8,8], // GK 3
  [0,10,20,20,55,55,45,45], // GK 4
  [0,10,18,18,11,11,12,12], // GK 5
  [0,10,15,19,10,10,12,12], // GK 6
  [0,10,20,22,13,13,14,14], // GK 7
  [0,10,17,20,18,18,18,18], // GK 8
  [0,20,26,27,24,24,24,24], // GK 9
  [0,20,29,32,23,23,24,24], // GK 10
  [0,20,31,34,24,24,24,24], // GK 11
  [0,20,31,35,24,24,26,26], // GK 12
  [0,20,26,38,30,30,32,32], // GK 13
  [0,25,40,40,28,28,32,32], // GK 14
  [0,25,44,44,30,30,34,34], // GK 15
  [0,25,64,64,44,44,48,48], // GK 16
  [0,25,33,45,40,40,44,44], // GK 17
  [0,30,48,48,40,40,44,44], // GK 18
  [0,30,58,58,44,44,48,48], // GK 19
];

/** 按 gkIndex 获取 GK 能力值原始字节 */
export function getGkStatsRaw(gkIndex: number): readonly number[] {
  return GK_STATS_RAW[gkIndex] ?? new Array(8).fill(0);
}

/** 按 gkIndex 获取结构化能力值对象 */
export function getGkStats(gkIndex: number): Record<string, number> {
  const raw = getGkStatsRaw(gkIndex);
  const obj = {};
  for (let i = 0; i < GK_STAT_FIELDS.length; i++) {
    obj[GK_STAT_FIELDS[i]] = raw[i] ?? 0;
  }
  return obj;
}
