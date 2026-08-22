"use strict";
/**
 * Debug Canvas 工具 — 从 h5game.ts 抽离
 *
 * 处理 debug canvas 的初始化、blit 等纯 canvas 操作。
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugCanvasManager = void 0;
exports.makeGameSlot = makeGameSlot;
exports.renderGameSlot = renderGameSlot;
class DebugCanvasManager {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.imgData = null;
        this.querying = false;
    }
    /** 初始化 debug canvas（通过微信 selector API） */
    init(selector = '#debugCanvas') {
        if (this.ctx)
            return;
        if (this.querying)
            return;
        this.querying = true;
        const query = wx.createSelectorQuery();
        query.select(selector)
            .fields({ node: true, size: true })
            .exec((res) => {
            this.querying = false;
            const c = res && res[0];
            if (c && c.node) {
                this.canvas = c.node;
                this.ctx = c.node.getContext('2d');
                this.imgData = null;
            }
        });
    }
    /** 绑定已有的 canvas/ctx（Page onReady 时传入已获取的 canvas） */
    attach(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.imgData = null;
        this.querying = false;
    }
    reset() {
        this.ctx = null;
        this.canvas = null;
        this.imgData = null;
        this.querying = false;
    }
    /**
     * 将源缓冲区 (w×h) 1:1 绘制到 canvas（像素尺寸 = w×h）
     * CSS 通过 image-rendering: pixelated + max-width/max-height 自动放大撑满面板
     */
    blit(buf, w, h) {
        const ctx = this.ctx;
        const canvas = this.canvas;
        if (!ctx || !canvas)
            return;
        canvas.width = w;
        canvas.height = h;
        const imgData = ctx.createImageData(w, h);
        const pix = imgData.data;
        for (let i = 0, j = 0; i < buf.length; i++, j += 4) {
            const color = buf[i];
            pix[j] = (color >> 16) & 0xff;
            pix[j + 1] = (color >> 8) & 0xff;
            pix[j + 2] = color & 0xff;
            pix[j + 3] = 0xff;
        }
        ctx.putImageData(imgData, 0, 0);
    }
    /**
     * 带 alpha 通道的 blit（专供导出透明 PNG）
     * 背景填充色通常用 0x00000000（全透明），精灵像素用 0xFFrrggbb（不透明）
     */
    blitAlpha(buf, w, h) {
        const ctx = this.ctx;
        const canvas = this.canvas;
        if (!ctx || !canvas)
            return;
        canvas.width = w;
        canvas.height = h;
        const imgData = ctx.createImageData(w, h);
        const pix = imgData.data;
        for (let i = 0, j = 0; i < buf.length; i++, j += 4) {
            const color = buf[i];
            pix[j] = (color >> 16) & 0xff;
            pix[j + 1] = (color >> 8) & 0xff;
            pix[j + 2] = color & 0xff;
            pix[j + 3] = (color >>> 24) & 0xff;
        }
        ctx.putImageData(imgData, 0, 0);
    }
    /**
     * 在 canvas 上叠加文字 HUD（frame count 等）
     * 必须在 blit 之后调用
     */
    drawTextOverlay(text, x, y, fontSize = 14, color = '#fff') {
        const ctx = this.ctx;
        if (!ctx)
            return;
        // 半透明背景
        ctx.fillStyle = 'rgba(0,0,0,0.65)';
        const mid = ctx.measureText ? 0 : 0; // safe
        // 先测量文字宽度
        ctx.font = `${fontSize}px monospace`;
        const textW = ctx.measureText(text).width + 8;
        const textH = fontSize + 6;
        ctx.fillRect(x - 4, y - fontSize - 1, textW, textH);
        // 文字
        ctx.fillStyle = color;
        ctx.fillText(text, x, y);
    }
}
exports.DebugCanvasManager = DebugCanvasManager;
/** 从 Page 传入的 game canvas slot 创建 CanvasSlot */
function makeGameSlot(cnv, w, h) {
    cnv.width = w;
    cnv.height = h;
    return {
        canvas: cnv,
        ctx: cnv.getContext('2d'),
        imgData: null,
        frameBuf: null,
    };
}
/** 渲染一个 game canvas slot 的画面 */
function renderGameSlot(slot, screenW, screenH) {
    if (!slot || !slot.frameBuf || !slot.ctx)
        return;
    const ctx = slot.ctx;
    if (!slot.imgData) {
        slot.imgData = ctx.createImageData(screenW, screenH);
    }
    const data = slot.imgData.data;
    const src = slot.frameBuf;
    for (let i = 0, j = 0; i < src.length; i++, j += 4) {
        const p = src[i];
        data[j] = (p >> 16) & 0xff;
        data[j + 1] = (p >> 8) & 0xff;
        data[j + 2] = p & 0xff;
        data[j + 3] = 0xff;
    }
    ctx.putImageData(slot.imgData, 0, 0);
}
