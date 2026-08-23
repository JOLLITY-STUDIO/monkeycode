"use strict";
/**
 * 微信小程序 wx API Mock — 浏览器环境兼容层
 *
 * 让 tsubasa2-h5-src 在普通浏览器中运行。
 * 仅 mock 游戏运行必需的 API：
 *   - canvas.requestAnimationFrame / cancelAnimationFrame
 *   - wx.createSelectorQuery (返回 canvas 节点)
 *   - wx.createWebAudioContext → 标准 AudioContext
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.installWxMock = installWxMock;
/**
 * SelectorQuery Mock — 模拟 wx.createSelectorQuery().select().fields().exec()
 * 测试页面只有一个 canvas，selector 全部返回该 canvas。
 */
class SelectorQueryMock {
    constructor(canvas) {
        this._queue = [];
        this._canvas = canvas;
    }
    in() {
        return this;
    }
    select() {
        this._queue.push({ isBounding: false });
        return this;
    }
    fields() {
        return this;
    }
    boundingClientRect() {
        const last = this._queue[this._queue.length - 1];
        if (last)
            last.isBounding = true;
        return this;
    }
    exec(cb) {
        const results = this._queue.map((item) => {
            if (item.isBounding) {
                const rect = this._canvas.getBoundingClientRect();
                return {
                    left: rect.left, top: rect.top, width: rect.width, height: rect.height,
                    right: rect.right, bottom: rect.bottom,
                };
            }
            return {
                node: this._canvas,
                width: this._canvas.width,
                height: this._canvas.height,
            };
        });
        this._queue = [];
        cb(results);
    }
}
function installWxMock(targetCanvas) {
    // 给 canvas 注入 wx 风格的 requestAnimationFrame（直接复用浏览器 rAF）
    const canvas = targetCanvas;
    if (!canvas.requestAnimationFrame) {
        canvas.requestAnimationFrame = (cb) => {
            return window.requestAnimationFrame(cb);
        };
    }
    if (!canvas.cancelAnimationFrame) {
        canvas.cancelAnimationFrame = (id) => {
            window.cancelAnimationFrame(id);
        };
    }
    // wx 全局对象
    const wxMock = {
        createSelectorQuery: () => new SelectorQueryMock(targetCanvas),
        createOffscreenCanvas: (opts) => {
            const off = document.createElement('canvas');
            off.width = opts.width;
            off.height = opts.height;
            return off;
        },
        createWebAudioContext: () => {
            const AC = window.AudioContext || window.webkitAudioContext;
            return new AC({ sampleRate: 44100 });
        },
        setStorageSync: () => { },
        getStorageSync: () => null,
        showToast: (opts) => console.log('[wx.showToast]', opts.title),
        console: {
            log: (...args) => console.log('[wx]', ...args),
            warn: (...args) => console.warn('[wx]', ...args),
            error: (...args) => console.error('[wx]', ...args),
        },
    };
    window.wx = wxMock;
    globalThis.wx = wxMock;
}
