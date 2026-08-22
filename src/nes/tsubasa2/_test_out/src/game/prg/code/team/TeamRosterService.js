"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamRosterService = void 0;
class TeamRosterService {
    constructor(store) {
        this._store = store;
    }
    /** 查询球队阵容 (原 readBank29 地址查表) */
    getRoster(teamId) {
        // TODO: 结构化阵容表
        void teamId;
        return [];
    }
}
exports.TeamRosterService = TeamRosterService;
exports.default = TeamRosterService;
