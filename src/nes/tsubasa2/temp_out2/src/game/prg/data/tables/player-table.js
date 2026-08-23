"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PLAYER_TABLE = void 0;
exports.findPlayerById = findPlayerById;
exports.findPlayersByTeam = findPlayersByTeam;
exports.PLAYER_TABLE = [];
/** 按 ID 查询球员（V0.2 数据填充后生效） */
function findPlayerById(id) {
    for (const p of exports.PLAYER_TABLE) {
        if (p.id === id)
            return p;
    }
    return null;
}
function findPlayersByTeam(teamId) {
    const ids = [];
    for (const p of exports.PLAYER_TABLE) {
        if (p.club === teamId)
            ids.push(p.id);
    }
    return ids;
}
