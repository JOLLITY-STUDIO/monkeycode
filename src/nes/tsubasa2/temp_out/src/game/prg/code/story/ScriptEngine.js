"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScriptEngine = void 0;
class ScriptEngine {
    constructor(store, loader) {
        this.store = store;
        this.loader = loader;
    }
    /** 装载并启动一段脚本 */
    start(scriptId) {
        // TODO V0.4: 翻译脚本启动（装载段 → 初始化上下文）
        void scriptId;
        return { ip: 0, stack: [], waitFrames: 0, waitingInput: false, finished: false };
    }
    /** 执行一帧脚本（返回是否仍在运行） */
    step(ctx, frame) {
        // TODO V0.4: 翻译脚本 VM 主循环（fetch opcode → dispatch）
        void ctx;
        void frame;
        return false;
    }
}
exports.ScriptEngine = ScriptEngine;
