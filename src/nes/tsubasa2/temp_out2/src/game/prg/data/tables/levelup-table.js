"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LEVEL_UP_TABLE = void 0;
exports.findLevelByExp = findLevelByExp;
exports.LEVEL_UP_TABLE = [];
function findLevelByExp(exp) {
    let level = 1;
    for (const e of exports.LEVEL_UP_TABLE) {
        if (exp >= e.expRequired)
            level = e.level;
        else
            break;
    }
    return level;
}
