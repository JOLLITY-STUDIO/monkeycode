/**
 * 球队数据表 — 类型定义和工厂
 * 从 Bank 3 PRG 数据提取
 * 
 * 球队数据结构 (推断, ~20字节/队):
 *   Offset 0:    球队ID
 *   Offset 1:    球员数量
 *   Offset 2-17: 球员ID列表 (最多16人)
 *   Offset 18:   阵型ID
 *   Offset 19:   战术风格
 */
import { TeamData } from '../../core/types';

export interface TeamEntry {
  id: number;
  name: string;
  nameId: number;
  playerIds: number[];
  formation: number;
  style: number;
}

export class TeamTable {
  private _teams: Map<number, TeamEntry> = new Map();

  register(team: TeamEntry): void {
    this._teams.set(team.id, team);
  }

  registerAll(teams: TeamEntry[]): void {
    for (const t of teams) this.register(t);
  }

  getById(id: number): TeamEntry | undefined {
    return this._teams.get(id);
  }

  getAll(): TeamEntry[] {
    return Array.from(this._teams.values());
  }

  get count(): number {
    return this._teams.size;
  }

  /** 根据球员ID查找所在球队 */
  findTeamByPlayer(playerId: number): TeamEntry | undefined {
    for (const team of this._teams.values()) {
      if (team.playerIds.includes(playerId)) return team;
    }
    return undefined;
  }
}

export class TeamRepository {
  private static _instance: TeamRepository | null = null;
  private _table: TeamTable = new TeamTable();
  private _loaded: boolean = false;

  static getInstance(): TeamRepository {
    if (!TeamRepository._instance) {
      TeamRepository._instance = new TeamRepository();
    }
    return TeamRepository._instance;
  }

  get table(): TeamTable { return this._table; }
  get isLoaded(): boolean { return this._loaded; }

  loadTestData(): void {
    const testTeams: TeamEntry[] = [
      { id: 1, name: '南葛SC', nameId: 0, playerIds: [1, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], formation: 0, style: 0 },
      { id: 2, name: '錦丘中', nameId: 0, playerIds: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30], formation: 1, style: 1 },
      { id: 3, name: '南宇和中', nameId: 0, playerIds: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41], formation: 1, style: 2 },
      { id: 4, name: '東一中', nameId: 0, playerIds: [42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52], formation: 2, style: 1 },
      { id: 5, name: '花輪中', nameId: 0, playerIds: [53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63], formation: 0, style: 3 },
      { id: 6, name: '明和東中', nameId: 0, playerIds: [64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74], formation: 1, style: 4 },
      { id: 7, name: '比良戶中', nameId: 0, playerIds: [75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85], formation: 2, style: 2 },
      { id: 8, name: '佛拉諾中', nameId: 0, playerIds: [86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96], formation: 1, style: 0 },
      { id: 9, name: '東邦學園', nameId: 0, playerIds: [2, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106], formation: 1, style: 5 },
    ];

    for (const t of testTeams) {
      this._table.register(t);
    }
    this._loaded = true;
    console.log(`[TeamRepo] ✅ 测试数据: ${testTeams.length} 支球队`);
  }
}
