/**
 * 队伍名册 — class TeamRoster
 *
 * 管理游戏中所有已知队伍。
 */

import { Team, type TeamId } from './team';

export class TeamRoster {
  private _teams: Map<TeamId, Team> = new Map();

  register(team: Team): void {
    this._teams.set(team.id, team);
  }

  get(id: TeamId): Team | undefined {
    return this._teams.get(id);
  }

  all(): Team[] {
    return [...this._teams.values()];
  }

  get size(): number {
    return this._teams.size;
  }

  clear(): void {
    this._teams.clear();
  }
}
