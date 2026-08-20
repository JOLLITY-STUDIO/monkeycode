"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Renderer = void 0;
/**
 * 渲染器 (View 层) — 对应模拟器 ui.writeFrame / onFrame 的具体实现
 *
 * 职责 (且仅此一项):
 *   接收 PPU 层产出的帧缓冲 (Uint32Array, 每像素 0xRRGGBB)，
 *   复制到 ImageData 并 putImageData 到画布。
 *
 * 与模拟器的对应关系:
 *   PPU.endFrame() → nes.ui.writeFrame(buffer)
 *   Screen.setBuffer() + Screen.writeBuffer() → putImageData
 *   FrameCompositor.compose() → Renderer.writeFrame(buffer)
 *
 * 不包含任何合成/业务逻辑；NT/OAM/调色板解码、文本叠加全部在 PPU 层
 * (FrameCompositor / 未来的 core/ppu) 完成。
 */
const types_1 = require("../../types");
class Renderer {
    constructor() {
        /** Canvas 2d 上下文 */
        this._ctx = null;
        /** 预建的 256×240 ImageData (每帧原地填充后 putImageData) */
        this._imageData = null;
        /** 双缓冲: Uint8 视图 (ImageData.data 拷贝源) */
        this._buf8 = null;
        /** 双缓冲: Uint32 视图 (写入目标, 与模拟器 screen.ts 一致) */
        this._buf32 = null;
    }
    /** 挂载主 Canvas Context, 预建 ImageData 与双缓冲 */
    setupCanvas(ctx) {
        this._ctx = ctx;
        this._imageData = this._createImageData(types_1.NES_WIDTH, types_1.NES_HEIGHT, ctx);
        const data = this._imageData.data;
        this._buf8 = new Uint8ClampedArray(data.length);
        this._buf32 = new Uint32Array(this._buf8.buffer);
        for (let i = 0; i < this._buf32.length; i++) {
            this._buf32[i] = 0xff000000; // 初始全黑不透明
        }
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, types_1.NES_WIDTH, types_1.NES_HEIGHT);
    }
    /**
     * 呈现一帧 (对应模拟器 Screen.setBuffer + writeBuffer)。
     * @param buffer PPU 帧缓冲, 256×240, 每像素 0xRRGGBB
     *               转换为 Canvas ImageData 的 RGBA (小端平台不能直接 0xFFRRGGBB 写入 Uint32)
     */
    writeFrame(buffer) {
        if (!this._ctx || !this._imageData || !this._buf8 || !this._buf32)
            return;
        const dst = this._buf8;
        const n = Math.min(dst.length / 4, buffer.length);
        let di = 0;
        for (let i = 0; i < n; i++) {
            const px = buffer[i];
            dst[di++] = (px >> 16) & 0xff; // R
            dst[di++] = (px >> 8) & 0xff; // G
            dst[di++] = px & 0xff; // B
            dst[di++] = 0xff; // A
        }
        this._imageData.data.set(this._buf8);
        this._ctx.putImageData(this._imageData, 0, 0);
    }
    /**
     * 创建 ImageData，兼容微信小程序 Canvas 2D 与标准 DOM。
     */
    _createImageData(w, h, ctx) {
        const sources = [ctx, this._ctx, this._ctx?.canvas];
        for (const s of sources) {
            if (s && typeof s.createImageData === 'function') {
                return s.createImageData(w, h);
            }
        }
        if (typeof ImageData !== 'undefined') {
            return new ImageData(w, h);
        }
        return { width: w, height: h, data: new Uint8ClampedArray(w * h * 4) };
    }
}
exports.Renderer = Renderer;
