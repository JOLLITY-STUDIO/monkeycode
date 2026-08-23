/**
 * 比赛回合数据表 — 原 bank24 回合/战术数据（声明式表结构）
 *
 * 从 asm/bank24/data_tables.s + code_data.s 提取。
 * bank24 含：回合指针表（$86B8）、回合参数表、战术数据。
 *
 * 当前为 stub（契约占位），逐段提取覆盖。
 */

/** 回合指针表条目 */
export interface MatchRoundPointer {
  readonly typeId: number;
  readonly paramId: number;
  readonly lo: number;
  readonly hi: number;
}

/** 回合表条目 */
export interface MatchRoundEntry {
  readonly roundId: number;
  readonly type: number;
  readonly nextRoundId: number;
  readonly duration: number;
}

/** 回合指针表（原 bank24 $86B8 区域） */
export const BANK24_ROUND_POINTER_TABLE: ReadonlyArray<MatchRoundPointer> = [
  // TODO B24: 从 asm/bank24/code_main.s $86B8 提取指针
];

/** 回合参数表 */
export const BANK24_ROUND_TABLE: ReadonlyArray<MatchRoundEntry> = [
  // TODO B24: 从 asm/bank24/data_tables.s 提取回合参数
];

/** 按 ID 查询回合 */
export function findRoundById(roundId: number): MatchRoundEntry | null {
  for (const r of BANK24_ROUND_TABLE) {
    if (r.roundId === roundId) return r;
  }
  return null;
}
