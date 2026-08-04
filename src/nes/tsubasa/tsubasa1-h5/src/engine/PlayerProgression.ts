/**
 * 球员升级系统
 *
 * ⚠️ TODO: 需要从 ROM Bank 4 验证是否存在等级/经验系统。
 * 当前为占位结构，所有数值待 ROM 分析后确定。
 */
export interface PlayerLevelState {
  playerId: number;
  level: number;
  exp: number;
}

export const DEFAULT_LEVEL = 1;

export function getExpForLevel(_level: number): number {
  // TODO: 从 ROM 提取经验表
  return 0;
}
