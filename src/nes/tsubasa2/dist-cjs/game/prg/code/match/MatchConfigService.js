"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchConfigService = void 0;
const match_config_table_1 = require("../../data/tables/match-config-table");
class MatchConfigService {
    constructor(store) {
        this.store = store;
    }
    /** 取比赛配置（按双方队 ID 查表） */
    getConfig(homeTeam, awayTeam) {
        return (0, match_config_table_1.getMatchConfig)(homeTeam, awayTeam);
    }
    /** 半时长度（分钟，按双方队查表） */
    halfLength(homeTeam = 0, awayTeam = 0) {
        return this.getConfig(homeTeam, awayTeam).halfLength;
    }
    /** 换人名额 */
    maxSubstitutions(homeTeam = 0, awayTeam = 0) {
        return this.getConfig(homeTeam, awayTeam).maxSubstitutions;
    }
    /** 伤停补时（分钟） */
    injuryTime(homeTeam = 0, awayTeam = 0) {
        return this.getConfig(homeTeam, awayTeam).injuryTime;
    }
    /** 全场分钟数（halfLength * 2 + injuryTime） */
    totalMinutes(homeTeam = 0, awayTeam = 0) {
        const c = this.getConfig(homeTeam, awayTeam);
        return c.durationMinutes;
    }
    /** 赛事类型查询 */
    getTournament(homeTeam, awayTeam) {
        return this.getConfig(homeTeam, awayTeam).tournament;
    }
    /** 是否加时赛 */
    hasExtraTime(homeTeam = 0, awayTeam = 0) {
        return this.getConfig(homeTeam, awayTeam).extraTime;
    }
    /** 默认配置（兜底） */
    get default() { return match_config_table_1.DEFAULT_MATCH_CONFIG; }
}
exports.MatchConfigService = MatchConfigService;
