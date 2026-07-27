/**
 * 队伍实体
 *
 * 包含球员列表、阵型、队伍元数据。
 * ROM 中队伍数据在 bank_20 和 $0700 区。
 */

import { Player, type PlayerId } from '../player/Player';
import { Formation, FormationId, PLAYERS_PER_TEAM } from './Formation';

/** 队伍 ID */
export type TeamId = number;

export interface TeamInit {
  id: TeamId;
  nameIdx: number;
  /** 11 名球员 */
  players: Player[];
  /** 当前阵型 */
  formation?: Formation;
  /** 替补球员 */
  substitutes?: Player[];
}

/**
 * Team 实体
 *
 * 表示一支足球队伍：
 * - 球队基本信息
 * - 首发 11 人
 * - 替补球员
 * - 阵型
 */
export class Team {
  readonly id: TeamId;
  nameIdx: number;
  /** 首发 11 人 */
  readonly players: Player[];
  /** 替补球员 */
  readonly substitutes: Player[];
  /** 当前阵型 */
  formation: Formation;

  constructor(init: TeamInit) {
    this.id          = init.id;
    this.nameIdx     = init.nameIdx;
    this.players     = init.players.map(p => p.clone());
    this.substitutes = (init.substitutes ?? []).map(p => p.clone());
    this.formation   = init.formation ?? Formation.default();
  }

  /** 根据 ID 查找球员 */
  findPlayer(id: PlayerId): Player | undefined {
    return this.players.find(p => p.id === id)
        ?? this.substitutes.find(p => p.id === id);
  }

  /** 按位置获取球员列表 */
  getPlayersByPosition(position: number): Player[] {
    return this.players.filter(p => p.position === position);
  }

  /** 门将 */
  get goalkeeper(): Player | undefined {
    return this.players.find(p => p.position === 0);
  }

  /** 球队总六维 */
  get totalStats(): number {
    return this.players.reduce((sum, p) => sum +
      p.stats.goalkeeping + p.stats.kick + p.stats.cut +
      p.stats.tackle + p.stats.pass + p.stats.speed, 0);
  }

  /** 克隆 */
  clone(): Team {
    return new Team({
      id:          this.id,
      nameIdx:     this.nameIdx,
      players:     this.players.map(p => p.clone()),
      substitutes: this.substitutes.map(p => p.clone()),
      formation:   this.formation,
    });
  }
}
