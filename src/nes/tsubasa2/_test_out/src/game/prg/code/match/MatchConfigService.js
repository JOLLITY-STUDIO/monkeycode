"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchConfigService = void 0;
class MatchConfigService {
    constructor(store) {
        this._store = store;
    }
    /** 读取比赛配置 (原 readMatchConfig) */
    getConfig(matchIndex) {
        // TODO: 结构化比赛配置表
        void matchIndex;
        return {};
    }
}
exports.MatchConfigService = MatchConfigService;
exports.default = MatchConfigService;
