"use strict";
/**
 * 游戏主循环
 *
 * - 微信小程序使用 canvas.requestAnimationFrame
 * - 提供固定步长 + 可变渲染 双模驱动
 * - FPS 统计
 * - 暂停/恢复
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameLoop = void 0;
class GameLoop {
    constructor() {
        this._lastTime = 0;
        this._frameCount = 0;
        this._fpsFrames = 0;
        this._fpsTimer = 0;
        this._fps = 0;
        this._afId = null;
        this._running = false;
        this._paused = false;
        /** Canvas 节点（微信小程序 rAF 入口） */
        this._canvas = null;
        /** 目标帧率 */
        this.frameRate = 60;
        /** 每帧回调 */
        this.onFrame = null;
        /** 渲染回调 */
        this.onRender = null;
        /** 外部回调 */
        this.callbacks = null;
    }
    get fps() { return this._fps; }
    get running() { return this._running; }
    get paused() { return this._paused; }
    // ── 控制 ──
    start(canvas) {
        if (this._running)
            return;
        if (canvas)
            this._canvas = canvas;
        if (!this._canvas)
            throw new Error('[GameLoop] 需要传入 canvas 才能启动循环');
        this._running = true;
        this._paused = false;
        this._lastTime = Date.now();
        this._frameCount = 0;
        this._afId = this._canvas.requestAnimationFrame(this._loop.bind(this));
    }
    pause() {
        this._paused = true;
    }
    resume() {
        if (!this._paused)
            return;
        this._paused = false;
        this._lastTime = Date.now();
    }
    stop() {
        this._running = false;
        if (this._afId != null && this._canvas) {
            this._canvas.cancelAnimationFrame(this._afId);
            this._afId = null;
        }
    }
    // ── 循环 ──
    _loop(_timestamp) {
        if (!this._running || !this._canvas)
            return;
        this._afId = this._canvas.requestAnimationFrame(this._loop.bind(this));
        if (this._paused)
            return;
        const now = Date.now();
        const dt = now - this._lastTime;
        this._lastTime = now;
        // 帧计数(FPS)
        this._fpsFrames++;
        this._fpsTimer += dt;
        if (this._fpsTimer >= 1000) {
            this._fps = this._fpsFrames;
            this._fpsFrames = 0;
            this._fpsTimer -= 1000;
        }
        this._frameCount++;
        // 逻辑更新
        if (this.onFrame) {
            this.onFrame(dt);
        }
        // 回调
        if (this.callbacks?.onFrame) {
            this.callbacks.onFrame(this._frameCount);
        }
        // 渲染
        if (this.onRender) {
            this.onRender(dt);
        }
    }
}
exports.GameLoop = GameLoop;
