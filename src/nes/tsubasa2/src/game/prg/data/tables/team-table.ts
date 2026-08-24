/**
 * 队伍数据表 — 具象化契约
 *
 * 数据来源（迁移完成后即可生效）：
 *   - bank06 $A0xx 队名表（22 队联赛 + 4 训练队 + 隐藏队）
 *   - bank08 $A1xx 阵型表（22 个字节位置）
 *   - bank08 $A2xx 球员 ID 列表
 *
 * 替换实现策略：
 *   - 每条 TeamEntry 声明式：id、name、formation(11 byte 阵型)、players[22] 球员 ID 列表
 *   - findTeamById / findPlayersByTeam 立即可查询（数据空时返回 null / []）
 *   - formation 字段为 11 字节位置编码（每个 byte = 球员 slot 编号或 0xFF=空）
 *
 * 禁止：禁止 lo/hi 拆字节，禁止暴露 bank 地址（如 $A1xx 原文）
 */

export interface TeamEntry {
  /** 队伍 ID（0..21 联赛队；22..25 训练队；32..40 隐藏队） */
  readonly id: number;
  /** 队名（带阵营属性，中文 + romaji） */
  readonly name: string;
  /** 阵型（11 个位置 × 球员 slot 编号 0xFF=空） */
  readonly formation: ReadonlyArray<number>;
  /** 队员球员 ID 列表（22 字节，含首发 + 替补） */
  readonly players: ReadonlyArray<number>;
}

/** 队伍数据表（V0.4 从 bank06/bank08 提取后填充） */
export const TEAM_TABLE: ReadonlyArray<TeamEntry> = [];

/**
 * 按 ID 查询队伍
 * 数据空时返回 null（让调用方能 null 判断）；数据填充后返回具名 entry
 */
export function findTeamById(id: number): TeamEntry | null {
  for (const t of TEAM_TABLE) {
    if (t.id === (id & 0xff)) return t;
  }
  return null;
}

/**
 * 按 ID 查询队名（包装 findTeamById；返回空字符串作为合理兜底）
 */
export function findTeamNameById(id: number): string {
  return findTeamById(id)?.name ?? '';
}
