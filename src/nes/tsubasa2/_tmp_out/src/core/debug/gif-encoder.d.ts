/**
 * GIF89a 编码器 — 支持透明背景、循环播放
 *
 * 从 RGBA Uint32Array 帧序列编码为 GIF 动画文件。
 * 透明像素 (alpha=0) 映射到调色板索引 0。
 */
export interface GifFrame {
    pixels: Uint32Array;
    width: number;
    height: number;
    /** 帧延迟，单位 1/100 秒 (如 10 = 0.1s ≈ 10fps) */
    delay: number;
}
export declare function encodeGif(frames: GifFrame[], options?: {
    loop?: boolean;
}): Uint8Array;
