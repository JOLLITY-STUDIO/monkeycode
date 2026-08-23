"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TEAM_TABLE = void 0;
exports.findTeamById = findTeamById;
exports.TEAM_TABLE = [];
function findTeamById(id) {
    for (const t of exports.TEAM_TABLE) {
        if (t.id === id)
            return t;
    }
    return null;
}
