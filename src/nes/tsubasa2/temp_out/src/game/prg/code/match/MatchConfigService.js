"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchConfigService = void 0;
class MatchConfigService {
    constructor(store) {
        this.store = store;
    }
    /** 半场时长（分钟，默认 45） */
    halfLength() {
        return 45;
    }
    /** 换人名额 */
    maxSubstitutions() {
        return 2;
    }
}
exports.MatchConfigService = MatchConfigService;
