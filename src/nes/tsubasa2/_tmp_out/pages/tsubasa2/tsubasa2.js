"use strict";
/**
 * 天使之翼2 — 微信小程序游戏页面 + NT 交叉测试
 *
 * 使用 BrowserMini (借鉴 core/browser 的小程序版主板外壳) 封装:
 *   - Canvas/帧定时/音频/输入 统一由 BrowserMini 管理
 *   - page 只负责 WXML 事件 → BrowserMini.input API 转发
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../src/index");
const index_2 = require("../../src/index");
const input_1 = __importDefault(require("../../src/core/browser-mini/input"));
Page({
    data: {
        showDebug: false,
        aiMode: false,
        status: '初始化中...',
        fps: '--',
        pageMode: 'game',
        ntScrollX: 0,
        canvasScale: 1,
        canvasStyleW: index_1.NES_WIDTH,
        canvasStyleH: index_1.NES_HEIGHT,
        debugInfo: {
            frame: 0,
            gameStateName: 'INIT',
        },
    },
    _bm: null,
    _debugTimer: 0,
    _ntTest: null,
    _mainCtx: null,
    // ══════════════════════════════════════════
    // 生命周期
    // ══════════════════════════════════════════
    onLoad() {
        console.log('[Tsubasa2] 页面加载');
    },
    onReady() {
        this._initCanvas();
    },
    onUnload() {
        if (this._debugTimer)
            clearInterval(this._debugTimer);
        if (this._bm)
            this._bm.stop();
        this._stopNtTest();
    },
    // ══════════════════════════════════════════
    // 初始化
    // ══════════════════════════════════════════
    _initCanvas() {
        try {
            const query = wx.createSelectorQuery().in(this);
            query.select('#tsubasa2-canvas').fields({ node: true, size: true });
            query.select('#canvas-area').boundingClientRect();
            query.exec((res) => {
                if (!res || !res[0] || !res[0].node) {
                    this.setData({ status: 'Canvas 节点未找到' });
                    return;
                }
                const canvas = res[0].node;
                const areaRect = res[1] || {};
                // 先实例化 BrowserMini (内部已设 canvas 内部分辨率 256×240)
                this._bm = new index_1.BrowserMini({
                    canvas,
                    mode: 'h5',
                    onStatus: (status) => this.setData({ status }),
                    onError: (e) => {
                        console.error('[Tsubasa2] 运行错误:', e);
                        this.setData({ status: '错误: ' + e.message });
                    },
                });
                // 自适应父容器 (ScreenMini.fitInParent 内部按 256:240 等比缩放 + 设 CSS 显示尺寸)
                const fit = this._bm.fitInParent(areaRect.width || 0, areaRect.height || 0);
                this.setData({ canvasStyleW: fit.w, canvasStyleH: fit.h });
                // 保留 mainCtx 供 NT 测试切换时复用 canvas
                this._mainCtx = { canvas, ctx: canvas.getContext('2d'), scale: fit.w / index_1.NES_WIDTH };
                this._startGame(canvas);
            });
        }
        catch (err) {
            console.error('[Tsubasa2] 初始化失败:', err);
            this.setData({ status: '初始化失败: ' + String(err) });
        }
    },
    _startGame(_canvas) {
        // BrowserMini 内部 new NES → loadTsROM(game/index) → reset → 每帧 frame
        // 不再需要外部注入 stub game
        this._startDebugTimer();
        this._bm.start().then(() => {
            this.setData({ pageMode: 'game', status: '运行中' });
        }).catch((e) => {
            console.error('[Tsubasa2] 启动失败:', e);
            this.setData({ status: '启动失败: ' + e.message });
        });
    },
    _startDebugTimer() {
        this._debugTimer = setInterval(() => {
            if (!this._bm)
                return;
            this.setData({
                debugInfo: { frame: this._bm.frameIndex, gameStateName: 'NES' },
                fps: String(this._bm.fps),
            });
        }, 500);
    },
    /** 满屏 ↔ 原始大小 切换 (委托 BrowserMini.fitInParent) */
    toggleScale() {
        if (!this._bm)
            return;
        const mc = this._mainCtx;
        if (!mc?.canvas)
            return;
        const isFilled = mc.scale > 1;
        if (isFilled) {
            // 切回 1x (用 fitInParent 传 NES 原始尺寸)
            const fit = this._bm.fitInParent(index_1.NES_WIDTH, index_1.NES_HEIGHT);
            mc.scale = 1;
            this.setData({ canvasScale: 1, canvasStyleW: fit.w, canvasStyleH: fit.h, status: 'Canvas 1x' });
        }
        else {
            // 切满屏
            const query = wx.createSelectorQuery().in(this);
            query.select('#canvas-area').boundingClientRect();
            query.exec((res) => {
                const rect = res?.[0] || {};
                const fit = this._bm.fitInParent(rect.width || 0, rect.height || 0);
                mc.scale = fit.w / index_1.NES_WIDTH;
                this.setData({ canvasScale: mc.scale, canvasStyleW: fit.w, canvasStyleH: fit.h, status: `Canvas ${mc.scale.toFixed(1)}x` });
            });
        }
    },
    // ══════════════════════════════════════════
    // NT 交叉测试
    // ══════════════════════════════════════════
    switchToNtTest() {
        if (this._bm) {
            this._bm.stop();
            this._bm = null;
        }
        if (this._debugTimer)
            clearInterval(this._debugTimer);
        const mc = this._mainCtx;
        if (!mc?.canvas) {
            this.setData({ status: 'Canvas 未初始化' });
            return;
        }
        const canvas = mc.canvas;
        // 重拿 ctx 并恢复当前 scale
        const ctx = canvas.getContext('2d');
        ctx.scale(mc.scale, mc.scale);
        mc.ctx = ctx;
        this._startNtLoop(canvas, ctx);
    },
    _startNtLoop(canvas, _ctx) {
        // TODO: DataStore 待 game/prg 层恢复后启用 NT 测试
        // NT 测试逻辑已移至 git 历史 (commit 前), 待 DataStore 恢复后从历史恢复
        this.setData({ status: 'NT 测试不可用 (DataStore 未恢复)' });
    },
    _stopNtTest() {
        if (!this._ntTest)
            return;
        if (this._ntTest.rafId) {
            clearInterval(this._ntTest.rafId);
        }
        this._ntTest = null;
    },
    switchToGame() {
        this._stopNtTest();
        this.setData({ ntScrollX: 0 });
        const mc = this._mainCtx;
        if (!mc?.canvas)
            return;
        const ctx = mc.canvas.getContext('2d');
        ctx.scale(mc.scale, mc.scale);
        mc.ctx = ctx;
        this._startGame(mc.canvas);
    },
    /** 模式切换按钮（WXML 事件名必须为静态字符串） */
    onSwitchMode() {
        if (this.data.pageMode === 'nt_test') {
            this.switchToGame();
        }
        else {
            this.switchToNtTest();
        }
    },
    // ══════════════════════════════════════════
    // 触摸事件
    // ══════════════════════════════════════════
    onTouchStart(e) {
        if (!this._bm)
            return;
        const touch = e.touches[0];
        if (!touch)
            return;
        const query = wx.createSelectorQuery().in(this);
        query.select('#tsubasa2-canvas')
            .boundingClientRect()
            .exec((res) => {
            if (!res || !res[0])
                return;
            const rect = res[0];
            const x = touch.x - rect.left;
            const y = touch.y - rect.top;
            const w = rect.width;
            const h = rect.height;
            // 用 InputMini.dPadMask 计算方向 (借鉴 browser-mini/input.ts)
            const mask = input_1.default.dPadMask(x, y, w, h);
            this._bm.input.setMask(mask);
        });
    },
    onTouchMove(e) {
        this.onTouchStart(e);
    },
    onTouchEnd(_e) {
        if (!this._bm)
            return;
        this._bm.input.clear();
    },
    onDoubleTouch() {
        if (!this._bm)
            return;
        this._bm.input.press(index_2.BUTTON_START);
        setTimeout(() => this._bm?.input.release(index_2.BUTTON_START), 100);
    },
    // ══════════════════════════════════════════
    // 按钮方法
    // ══════════════════════════════════════════
    toggleDebug() {
        this.setData({ showDebug: !this.data.showDebug });
    },
    toggleAi() {
        const aiMode = !this.data.aiMode;
        this.setData({ aiMode });
        // TODO: NES 模式下 AI 待实现
    },
    onBtnA() {
        if (!this._bm)
            return;
        this._bm.input.press(index_2.BUTTON_A);
        setTimeout(() => this._bm?.input.release(index_2.BUTTON_A), 100);
    },
    onBtnB() {
        if (!this._bm)
            return;
        this._bm.input.press(index_2.BUTTON_B);
        setTimeout(() => this._bm?.input.release(index_2.BUTTON_B), 100);
    },
    onBtnStart() {
        if (!this._bm)
            return;
        this._bm.input.press(index_2.BUTTON_START);
        setTimeout(() => this._bm?.input.release(index_2.BUTTON_START), 100);
    },
});
