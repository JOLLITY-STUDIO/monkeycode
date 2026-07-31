/**
 * 队伍名册
 *
 * 管理游戏中所有已知队伍（ROM bank 20 数据）。
 * 提供队伍查找、遍历等功能。
 */

import { Team, type TeamId } from './Team';

/**
 * TeamRoster 队伍名册
 */
export class TeamRoster {
  private _teams: Map<TeamId, Team> = new Map();

  /** 注册队伍 */
  register(team: Team): void {
    this._teams.set(team.id, team);
  }

  /** 查找队伍 */
  get(id: TeamId): Team | undefined {
    return this._teams.get(id);
  }

  /** 全部队伍 */
  all(): Team[] {
    return [...this._teams.values()];
  }

  /** 队伍数量 */
  get size(): number {
    return this._teams.size;
  }

  /** 清空 */
  clear(): void {
    this._teams.clear();
  }
}
