/**
 * 技能数据表 — 原 bank16 必杀技数据（声明式表结构）
 *
 * V0.2 从 asm/bank16/*.s 的 .byte 数据提取。当前为空表（契约占位）。
 */
export interface SkillEntry {
  readonly moveId: number;
  readonly name: string;
  readonly power: number;
  /** 关联球员 ID 列表 */
  readonly players: ReadonlyArray<number>;
}

export const SKILL_TABLE: ReadonlyArray<SkillEntry> = [];

export function findSkillByMoveId(moveId: number): SkillEntry | null {
  for (const s of SKILL_TABLE) {
    if (s.moveId === moveId) return s;
  }
  return null;
}

export function findSkillsByPlayer(playerId: number): number[] {
  const ids: number[] = [];
  for (const s of SKILL_TABLE) {
    if (s.players.includes(playerId)) ids.push(s.moveId);
  }
  return ids;
}
