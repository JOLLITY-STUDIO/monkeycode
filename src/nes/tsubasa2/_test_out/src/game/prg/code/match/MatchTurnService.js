"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchTurnService = void 0;
class MatchTurnService {
    constructor(store) {
        this._store = store;
    }
    /** 回合推进 (原 frameTick) */
    update(frame) {
        // TODO: 翻译回合逻辑
        void frame;
    }
}
exports.MatchTurnService = MatchTurnService;
exports.default = MatchTurnService;
