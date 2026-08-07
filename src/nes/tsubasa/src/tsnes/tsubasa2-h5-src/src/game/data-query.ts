/**
 * Data Query Service
 *
 * Bank 01 (PRG $8000-$9FFF, SWITCHABLE)
 * 功能: 球员/队伍数据查询服务 — 调用 Bank 02 $A72C 场景控制器
 *
 * - 球员数据检索（按 ID / 位置 / 队伍）
 * - 队伍信息查询（阵型 / 球员列表）
 * - 赛事数据（赛程 / 对阵表）
 */

import { DataStore } from '../data/DataStore';
import type { Player, Team } from '../model/types';
import { PlayerPosition } from '../model/types';

export class DataQueryService {
  /** 球员表 */
  private _players: Map<number, Player> = new Map();

  /** 队伍表 */
  private _teams: Map<number, Team> = new Map();

  constructor(private _store: DataStore) {}

  // ── 主入口 ──

  update(_buttons: number, _frameCount: number): void {
    // TODO: 翻译 Bank 01 的 4239B 代码逻辑
    // 数据查询调度: 接收外部请求 → 查表 → 返回结果
  }

  // ── 球员 ──

  registerPlayer(p: Player): void {
    this._players.set(p.id, p);
  }

  getPlayer(id: number): Player | undefined {
    return this._players.get(id);
  }

  getPlayersByPosition(pos: PlayerPosition): Player[] {
    return [...this._players.values()].filter(p => p.position === pos);
  }

  getPlayersByTeam(teamId: number): Player[] {
    return [...this._players.values()].filter(p => p.teamId === teamId);
  }

  get allPlayers(): Player[] {
    return [...this._players.values()];
  }

  // ── 队伍 ──

  registerTeam(t: Team): void {
    this._teams.set(t.id, t);
  }

  getTeam(id: number): Team | undefined {
    return this._teams.get(id);
  }

  getTeamPlayers(teamId: number): Player[] {
    return this.getPlayersByTeam(teamId);
  }

  get allTeams(): Team[] {
    return [...this._teams.values()];
  }

  // ── 关系查询 ──

  /** 根据球员 ID 查找所属队伍 */
  findTeamByPlayer(playerId: number): Team | undefined {
    const player = this._players.get(playerId);
    if (!player) return undefined;
    return this._teams.get(player.teamId);
  }
}
