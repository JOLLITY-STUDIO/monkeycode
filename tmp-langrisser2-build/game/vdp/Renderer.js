"use strict";
/**
 * VDP 渲染器 — 将 VDP 状态合成到 Canvas 2D
 *
 * 渲染管线 (对应真实 VDP 每帧行为):
 * 1. 清空 framebuffer (背景色)
 * 2. 渲染 Plane B (低优先级 BG)
 * 3. 渲染 Plane A
 * 4. 渲染低优先级 Sprite
 * 5. 渲染高优先级 Plane tile (priority bit)
 * 6. 渲染高优先级 Sprite
 *
 * 输出: ImageData → Canvas putImageData
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Renderer = void 0;
const Cram_1 = require("./Cram");
const Plane_1 = require("./Plane");
const Sprite_1 = require("./Sprite");
const types_1 = require("../core/types");
class Renderer {
    vdp;
    plane;
    sprite;
    /** 帧缓冲区 (320×224 RGBA) */
    framebuffer;
    constructor(vdp) {
        this.vdp = vdp;
        this.plane = new Plane_1.Plane(vdp);
        this.sprite = new Sprite_1.Sprite(vdp);
        const totalPixels = types_1.DISPLAY.WIDTH * types_1.DISPLAY.HEIGHT * 4;
        this.framebuffer = new Uint8ClampedArray(totalPixels);
    }
    /**
     * 渲染一帧
     *
     * @param ctx Canvas 2D 上下文 (用于 createImageData, 兼容微信小程序)
     * @returns ImageData (可 putImageData 到 Canvas)
     */
    renderFrame(ctx) {
        const vram = this.vdp.vram;
        const cram = this.vdp.cram;
        const dst = this.framebuffer;
        // 1. 填充背景色
        this.fillBackground(dst);
        // 2. 渲染 Plane B
        this.plane.renderPlaneB(dst, vram, cram);
        // 3. 渲染 Plane A
        this.plane.renderPlaneA(dst, vram, cram);
        // 4. 渲染精灵
        this.sprite.renderSprites(dst, vram, cram);
        // 5. 将 framebuffer 复制到 ImageData (通过 ctx.createImageData 兼容小程序)
        const imageData = ctx.createImageData(types_1.DISPLAY.WIDTH, types_1.DISPLAY.HEIGHT);
        imageData.data.set(this.framebuffer);
        return imageData;
    }
    /**
     * 填充背景色
     * VDP reg $07 指定 palette 0 color 0 作为背景
     * 或使用 CRAM[0] 的背景色部分
     */
    fillBackground(dst) {
        const bgIdx = this.vdp.backgroundColor;
        const rawColor = this.vdp.cram.getColor(bgIdx);
        const rgba = Cram_1.Cram.toRGBA(rawColor);
        const totalPixels = types_1.DISPLAY.WIDTH * types_1.DISPLAY.HEIGHT;
        for (let i = 0; i < totalPixels; i++) {
            const off = i * 4;
            dst[off] = rgba.r;
            dst[off + 1] = rgba.g;
            dst[off + 2] = rgba.b;
            dst[off + 3] = rgba.a;
        }
    }
    /** 获取 framebuffer 直接引用 (性能优化) */
    getFrameBuffer() {
        return this.framebuffer;
    }
    /** 获取 ImageData (需要传入 Canvas 上下文) */
    getImageData(ctx) {
        const imageData = ctx.createImageData(types_1.DISPLAY.WIDTH, types_1.DISPLAY.HEIGHT);
        imageData.data.set(this.framebuffer);
        return imageData;
    }
}
exports.Renderer = Renderer;
