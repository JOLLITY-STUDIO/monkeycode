"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchHudService = void 0;
class MatchHudService {
    constructor(store) {
        this.store = store;
    }
    /** 刷新 HUD 到渲染缓冲（$05E8，V0.5 实现） */
    refresh() {
        // TODO V0.5: 翻译 HUD 渲染（比分/时间/体力条）
    }
}
exports.MatchHudService = MatchHudService;
