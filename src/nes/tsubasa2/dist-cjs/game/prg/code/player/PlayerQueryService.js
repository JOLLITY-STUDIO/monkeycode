"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerQueryService = void 0;
const player_table_1 = require("../../data/tables/player-table");
const team_table_1 = require("../../data/tables/team-table");
class PlayerQueryService {
    constructor(store) {
        this.store = store;
    }
    /** 按球员 ID 查询档案 */
    findById(playerId) {
        return (0, player_table_1.findPlayerById)(playerId);
    }
    /** 按球队查询队员 ID 列表（先按 TeamRoster 精确查，无则回退到 PLAYER_TABLE.club） */
    findTeamRoster(teamId) {
        const tid = teamId & 0xff;
        for (const t of team_table_1.TEAMS_FULL) {
            if (t.id === tid)
                return Array.from(t.players);
        }
        const ids = [];
        for (const p of player_table_1.PLAYER_TABLE) {
            if (p.club === tid)
                ids.push(p.id);
        }
        return ids;
    }
    /** 按球员名查询 ID（精确匹配） */
    findIdByName(name) {
        for (const p of player_table_1.PLAYER_TABLE) {
            if (p.name === name)
                return p.id;
        }
        return null;
    }
}
exports.PlayerQueryService = PlayerQueryService;
