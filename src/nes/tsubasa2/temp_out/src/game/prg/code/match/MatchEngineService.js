"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchEngineService = void 0;
class MatchEngineService {
    constructor(store) {
        this.store = store;
    }
    /** 开始比赛（V0.5 实现） */
    startMatch(homeTeam, awayTeam) {
        // TODO V0.5: 翻译比赛初始化（阵容装载/比分/时间）
        void homeTeam;
        void awayTeam;
        return { homeTeam, awayTeam, homeScore: 0, awayScore: 0, timeMinutes: 45, timeSeconds: 0 };
    }
    /** 每帧比赛逻辑（V0.5 实现） */
    update(frame) {
        // TODO V0.5
        void frame;
    }
}
exports.MatchEngineService = MatchEngineService;
