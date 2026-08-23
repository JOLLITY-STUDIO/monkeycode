"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SKILL_TABLE = void 0;
exports.findSkillByMoveId = findSkillByMoveId;
exports.findSkillsByPlayer = findSkillsByPlayer;
exports.SKILL_TABLE = [];
function findSkillByMoveId(moveId) {
    for (const s of exports.SKILL_TABLE) {
        if (s.moveId === moveId)
            return s;
    }
    return null;
}
function findSkillsByPlayer(playerId) {
    const ids = [];
    for (const s of exports.SKILL_TABLE) {
        if (s.players.includes(playerId))
            ids.push(s.moveId);
    }
    return ids;
}
