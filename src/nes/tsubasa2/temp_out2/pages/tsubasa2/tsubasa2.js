"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 天使之翼2 — 微信小程序游戏页（H5 引擎即插即用）
 *
 * 渲染：参考 src/core/browser/screen.ts → 小程序版 MpScreen（256×240 Canvas type=2d）
 *   - setBuffer/writeBuffer 提交 PPU 帧缓冲
 *   - fitInParent 自动等比适配父容器（onResize → setData 内联 style）
 * 输入：虚拟手柄（触摸）→ HeadlessRuntime.setButton → core Controller
 * 循环：canvas.requestAnimationFrame 驱动 runtime.frame(game)
 */
const index_1 = require("../../src/game/index");
const HeadlessRuntime_1 = require("../../src/game/runtime/HeadlessRuntime");
const controller_1 = __importDefault(require("../../src/core/controller"));
const screen_1 = __importDefault(require("../../src/core/mp/screen"));
/** data-key → core Controller 按键位（Controller.BUTTON_*） */
const KEY_MAP = {
    UP: controller_1.default.BUTTON_UP,
    DOWN: controller_1.default.BUTTON_DOWN,
    LEFT: controller_1.default.BUTTON_LEFT,
    RIGHT: controller_1.default.BUTTON_RIGHT,
    SELECT: controller_1.default.BUTTON_SELECT,
    START: controller_1.default.BUTTON_START,
    B: controller_1.default.BUTTON_B,
    A: controller_1.default.BUTTON_A,
};
Page({
    data: {
        frame: 0,
        status: '初始化中…',
        canvasW: 256,
        canvasH: 240,
    },
    runtime: null,
    game: null,
    screen: null,
    canvas: null,
    rafId: 0,
    frameCount: 0,
    onLoad() {
        this.runtime = new HeadlessRuntime_1.HeadlessRuntime();
        this.game = new index_1.Tsubasa2();
        this.game.boot();
        this.setData({ status: '已启动（开场）' });
    },
    onReady() {
        this._initCanvas(0);
    },
    /** 初始化画布（node 未就绪时自动重试） */
    _initCanvas(retry) {
        const query = wx.createSelectorQuery().in(this);
        query.select('#gameContainer').boundingClientRect();
        query.select('#gameCanvas').fields({ node: true, size: true });
        query.exec((res) => {
            const containerRect = res[0];
            const canvas = res[1] && res[1].node;
            console.log('[tsubasa] initCanvas retry=' + retry, {
                container: containerRect && { w: containerRect.width, h: containerRect.height },
                canvas: canvas ? 'ok' : 'null',
            });
            if (!canvas) {
                if (retry < 5)
                    setTimeout(() => this._initCanvas(retry + 1), 150);
                return;
            }
            this.canvas = canvas;
            this.screen = new screen_1.default(canvas, {
                getContainerSize: () => Promise.resolve({
                    width: (containerRect && containerRect.width) || 0,
                    height: (containerRect && containerRect.height) || 0,
                }),
                onResize: (w, h) => {
                    console.log('[tsubasa] canvas fit', w, h);
                    this.setData({ canvasW: w, canvasH: h });
                },
                onTouchStart: (_x, _y) => {
                    // 画布触摸映射到 256×240（参考 browser zapper 接口，暂不消费）
                },
            });
            this.screen.fitInParent();
            if (this.rafId) {
                this._cancelRaf(this.rafId);
                this.rafId = 0;
            }
            this._startLoop();
        });
    },
    /** canvas rAF 不可用时降级 setTimeout（约 60fps） */
    _raf(cb) {
        const c = this.canvas;
        return c && c.requestAnimationFrame ? c.requestAnimationFrame(cb) : setTimeout(cb, 16);
    },
    _cancelRaf(id) {
        const c = this.canvas;
        if (c && c.cancelAnimationFrame)
            c.cancelAnimationFrame(id);
        else
            clearTimeout(id);
    },
    _startLoop() {
        const runtime = this.runtime;
        const game = this.game;
        const screen = this.screen;
        const loop = () => {
            game.frame(runtime);
            // PPU 帧缓冲 → MpScreen（0x00RRGGBB → 全 alpha RGBA）
            screen.setBuffer(runtime.ppu.buffer);
            screen.writeBuffer();
            this.frameCount++;
            if (this.frameCount % 60 === 0) {
                this.setData({ frame: this.frameCount });
                console.log('[tsubasa] frame=' + this.frameCount);
            }
            this.rafId = this._raf(loop);
        };
        this.rafId = this._raf(loop);
    },
    /** 画布触摸（WXML 绑定 → MpScreen 坐标映射 → onTouchStart 回调） */
    onCanvasTouchStart(e) {
        this.screen?.handleTouchStart(e);
    },
    onCanvasTouchEnd() {
        this.screen?.handleTouchEnd();
    },
    onPadDown(e) {
        const key = e.currentTarget.dataset.key;
        const idx = KEY_MAP[key];
        if (idx !== undefined)
            this.runtime?.setButton(1, idx, true);
    },
    onPadUp(e) {
        const key = e.currentTarget.dataset.key;
        const idx = KEY_MAP[key];
        if (idx !== undefined)
            this.runtime?.setButton(1, idx, false);
    },
    /** 窗口尺寸变化时重新适配画布 */
    onResize() {
        this.screen?.fitInParent();
    },
    onHide() {
        if (this.rafId) {
            this._cancelRaf(this.rafId);
            this.rafId = 0;
        }
    },
    onShow() {
        // 重新进入时恢复循环（canvas 已就绪则重启）
        if (this.canvas && !this.rafId && this.screen) {
            this._startLoop();
        }
    },
    onUnload() {
        if (this.rafId) {
            this._cancelRaf(this.rafId);
            this.rafId = 0;
        }
        this.screen?.destroy();
        this.runtime = null;
        this.game = null;
        this.screen = null;
        this.canvas = null;
    },
});
