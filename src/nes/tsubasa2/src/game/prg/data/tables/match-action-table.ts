/**
 * 比赛动作数据表 — 原 bank28 动作/指令数据（声明式表结构）
 *
 * 从 asm/bank28/data_tables.s + code_data.s 提取。
 * bank28 含：动作指针表（$9E4E）、动作参数表（$818E/$8199）、动作类型表。
 *
 * 当前为 stub（契约占位），逐段提取覆盖。
 */

/** 动作指针表条目 */
export interface MatchActionPointer {
  readonly actionId: number;
  readonly lo: number;
  readonly hi: number;
}

/** 动作表条目 */
export interface MatchActionEntry {
  readonly actionId: number;
  readonly type: number;
  readonly nextActionId: number;
  readonly offset: number;
}

/** 动作指针表（原 bank28 $9E4E 区域） */
export const BANK28_ACTION_POINTER_TABLE: ReadonlyArray<MatchActionPointer> = [
  // TODO B28: 从 asm/bank28/code_main.s $9E4E 提取指针
];

/** 动作参数表（原 bank28 $818E/$8199） */
export const BANK28_ACTION_TABLE: ReadonlyArray<MatchActionEntry> = [
  // TODO B28: 从 asm/bank28/data_tables.s 提取动作参数
];

/** 按 ID 查询动作 */
export function findActionById(actionId: number): MatchActionEntry | null {
  for (const a of BANK28_ACTION_TABLE) {
    if (a.actionId === actionId) return a;
  }
  return null;
}
