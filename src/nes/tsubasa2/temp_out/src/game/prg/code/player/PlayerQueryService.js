"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerQueryService = void 0;
class PlayerQueryService {
    constructor(store) {
        this.store = store;
    }
    /** 按球员 ID 查询档案（V0.2 数据表接入后实现） */
    findById(playerId) {
        // TODO V0.2: 从 player-table 查询
        void playerId;
        return null;
    }
    /** 按球队查询队员 ID 列表 */
    findTeamRoster(teamId) {
        // TODO V0.2: 从 team-table 查询
        void teamId;
        return [];
    }
}
exports.PlayerQueryService = PlayerQueryService;
