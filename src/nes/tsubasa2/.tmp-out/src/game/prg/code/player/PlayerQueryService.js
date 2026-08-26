import { PLAYER_TABLE, findPlayerById, } from '../../data/tables/player-table';
import { TEAMS_FULL as TEAM_ROSTER_TABLE } from '../../data/tables/team-table';
export class PlayerQueryService {
    constructor(store) {
        this.store = store;
    }
    /** 按球员 ID 查询档案 */
    findById(playerId) {
        return findPlayerById(playerId);
    }
    /** 按球队查询队员 ID 列表（先按 TeamRoster 精确查，无则回退到 PLAYER_TABLE.club） */
    findTeamRoster(teamId) {
        const tid = teamId & 0xff;
        for (const t of TEAM_ROSTER_TABLE) {
            if (t.id === tid)
                return Array.from(t.players);
        }
        const ids = [];
        for (const p of PLAYER_TABLE) {
            if (p.club === tid)
                ids.push(p.id);
        }
        return ids;
    }
    /** 按球员名查询 ID（精确匹配） */
    findIdByName(name) {
        for (const p of PLAYER_TABLE) {
            if (p.name === name)
                return p.id;
        }
        return null;
    }
}
