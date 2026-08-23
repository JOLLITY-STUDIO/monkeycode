/**
 * 队伍数据表 — 原 bank29 队伍名单（声明式表结构）
 *
 * V0.2 从 asm/bank29/*.s 的 .byte 数据提取。当前为空表（契约占位）。
 */
export interface TeamEntry {
  readonly id: number;
  readonly name: string;
  readonly formation: ReadonlyArray<number>;
  readonly players: ReadonlyArray<number>;
}

export const TEAM_TABLE: ReadonlyArray<TeamEntry> = [];

export function findTeamById(id: number): TeamEntry | null {
  for (const t of TEAM_TABLE) {
    if (t.id === id) return t;
  }
  return null;
}
