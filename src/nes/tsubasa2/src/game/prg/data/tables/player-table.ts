/**
 * 球员数据表 — 原 bank01 球员数据（声明式表结构）
 *
 * V0.2 从 asm/bank01/*.s 的 .byte 数据提取为具名记录，禁止臆造。
 * 当前为空表（契约占位）。
 */
import type { PlayerProfile } from '../../code/player/PlayerQueryService';

export const PLAYER_TABLE: ReadonlyArray<PlayerProfile> = [];

/** 按 ID 查询球员（V0.2 数据填充后生效） */
export function findPlayerById(id: number): PlayerProfile | null {
  for (const p of PLAYER_TABLE) {
    if (p.id === id) return p;
  }
  return null;
}

export function findPlayersByTeam(teamId: number): number[] {
  const ids: number[] = [];
  for (const p of PLAYER_TABLE) {
    if (p.club === teamId) ids.push(p.id);
  }
  return ids;
}
