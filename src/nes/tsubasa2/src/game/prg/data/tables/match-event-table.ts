/**
 * 比赛事件数据表 — 原 bank20 事件数据（声明式表结构）
 *
 * 从 asm/bank20/data_tables.s + code_data.s 提取。
 * bank20 含：事件指针表（$88E4）、事件参数表、动作序列。
 *
 * 当前为 stub（契约占位），逐段提取覆盖。
 */

/** 事件指针表条目 */
export interface MatchEventPointer {
  readonly eventId: number;
  readonly lo: number;
  readonly hi: number;
}

/** 事件表条目 */
export interface MatchEventEntry {
  readonly eventId: number;
  readonly type: number;
  readonly nextEventId: number;
  readonly duration: number;
}

/** 事件指针表（原 bank20 $88E4 区域） */
export const BANK20_EVENT_POINTER_TABLE: ReadonlyArray<MatchEventPointer> = [
  // TODO B20: 从 asm/bank20/code_main.s $88E4 提取指针
];

/** 事件参数表 */
export const BANK20_EVENT_TABLE: ReadonlyArray<MatchEventEntry> = [
  // TODO B20: 从 asm/bank20/data_tables.s 提取事件参数
];

/** 按 ID 查询事件 */
export function findEventById(eventId: number): MatchEventEntry | null {
  for (const e of BANK20_EVENT_TABLE) {
    if (e.eventId === eventId) return e;
  }
  return null;
}
