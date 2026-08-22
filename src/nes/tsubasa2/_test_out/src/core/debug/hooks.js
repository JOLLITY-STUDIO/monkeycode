"use strict";
// @ts-nocheck
/**
 * Debug hooks — 参照 FCEUX 的 X6502_Debug() / CPUHook 模式
 *
 * 在 CPU 指令执行后注入回调，供 debug 插件使用。
 * 不做断点/单步调试 — 调试器功能太复杂且 tsnes 暂不需要。
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.debugHooks = exports.DebugHookManager = void 0;
// ==================== Hook Manager ====================
class DebugHookManager {
    constructor() {
        this._postHooks = [];
        this._frameHooks = [];
        this._nes = null;
        this._enabled = false;
        this.instrCount = 0;
    }
    // ---------- 注册 / 注销 ----------
    onPostInstr(hook) { this._postHooks.push(hook); }
    offPostInstr(hook) {
        this._postHooks = this._postHooks.filter(h => h !== hook);
    }
    onFrame(hook) { this._frameHooks.push(hook); }
    offFrame(hook) {
        this._frameHooks = this._frameHooks.filter(h => h !== hook);
    }
    // ---------- 挂载 / 卸载 ----------
    attach(nes) {
        if (this._enabled)
            return;
        this._nes = nes;
        this._enabled = true;
        // 挂载 frame hook
        const origOnFrame = nes.opts.onFrame;
        if (origOnFrame) {
            const self = this;
            nes.opts.onFrame = function (buffer) {
                for (const h of self._frameHooks) {
                    try {
                        h(nes.fpsFrameCount);
                    }
                    catch (e) {
                        console.error('[debug] frameHook error:', e);
                    }
                }
                self.instrCount = 0;
                origOnFrame.call(this, buffer);
            };
        }
        // 挂载 CPU 指令 hook
        const cpu = nes.cpu;
        const origCb = cpu._traceCb;
        const self = this;
        cpu._traceCb = function (pc, opcode, cycles, frameCount) {
            if (origCb) {
                try {
                    origCb.call(this, pc, opcode, cycles, frameCount);
                }
                catch { }
            }
            if (self._postHooks.length > 0) {
                self.instrCount++;
                const info = {
                    pc,
                    opcode,
                    cycles,
                    frameCount,
                    instrCount: self.instrCount,
                    reg: {
                        A: this.REG_ACC,
                        X: this.REG_X,
                        Y: this.REG_Y,
                        S: this.REG_SP & 0xff,
                        P: this.REG_STATUS,
                    },
                };
                for (const h of self._postHooks) {
                    try {
                        h(info);
                    }
                    catch (e) {
                        console.error('[debug] postHook error:', e);
                    }
                }
            }
        };
    }
    detach() {
        if (!this._enabled)
            return;
        const cpu = this._nes?.cpu;
        if (cpu && cpu._traceCb) {
            cpu._traceCb = null;
        }
        this._nes = null;
        this._enabled = false;
    }
    get nes() { return this._nes; }
    get enabled() { return this._enabled; }
}
exports.DebugHookManager = DebugHookManager;
/** 全局单例 (参照 FCEUX FCEUI_Debugger) */
exports.debugHooks = new DebugHookManager();
