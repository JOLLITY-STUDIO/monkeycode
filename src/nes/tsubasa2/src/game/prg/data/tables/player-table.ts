/**
 * 球员数据表 — 具象化契约
 *
 * 数据来源（迁移完成后即可生效）：
 *   - bank08 $A2xx 球员 ID 列表（22 队 × 22 人）
 *   - bank17 $8xxx 球员属性段（射门/盘带/传球/铲断/速度/体力）
 *   - bank17 $9xxx 球员名字段
 *
 * 替换实现策略：
 *   - 每条 PlayerProfile 声明式：id/name/club/position/shot/dribble/pass/tackle/speed/stamina
 *   - findPlayerById / findPlayersByTeam 立即可查询（数据空时返回 null / []）
 *
 * 禁止：禁止 lo/hi 拆字节，禁止暴露 bank 地址
 */

import type { PlayerProfile } from '../../code/player/PlayerQueryService';

/** 球员档案表（V0.4 从 bank08/bank17 提取后填充；约 22 队 × 22 人 ≈ 484 项） */
export const PLAYER_TABLE: ReadonlyArray<PlayerProfile> = [];

/** 按 ID 查询球员（数据空时返回 null） */
export function findPlayerById(id: number): PlayerProfile | null {
  for (const p of PLAYER_TABLE) {
    if (p.id === (id & 0xff)) return p;
  }
  return null;
}

/** 按球队查询队员 ID 列表（数据空时返回空数组） */
export function findPlayersByTeam(teamId: number): number[] {
  const ids: number[] = [];
  for (const p of PLAYER_TABLE) {
    if (p.club === (teamId & 0xff)) ids.push(p.id);
  }
  return ids;
}

/** 按 ID 查询球员名（包装 findPlayerById；返回空字符串兜底） */
export function findPlayerNameById(id: number): string {
  return findPlayerById(id)?.name ?? '';
}
