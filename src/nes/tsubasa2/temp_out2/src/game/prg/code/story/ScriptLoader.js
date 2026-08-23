"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScriptLoader = void 0;
class ScriptLoader {
    constructor(store) {
        this.store = store;
    }
    /** 取一段脚本（V0.2 数据表接入后实现） */
    loadSegment(scriptId) {
        // TODO V0.2/V0.4: 从 data/scene/scripts-*.ts 读取段
        void scriptId;
        return null;
    }
    /** 全部段清单（供差分验证） */
    listSegments() {
        return [];
    }
}
exports.ScriptLoader = ScriptLoader;
