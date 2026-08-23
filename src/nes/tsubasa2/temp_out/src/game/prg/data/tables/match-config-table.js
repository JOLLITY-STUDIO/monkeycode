"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_MATCH_CONFIG = void 0;
exports.getMatchConfig = getMatchConfig;
exports.DEFAULT_MATCH_CONFIG = {
    halfLength: 45,
    maxSubstitutions: 2,
    injuryTime: 0,
};
function getMatchConfig() {
    return exports.DEFAULT_MATCH_CONFIG;
}
