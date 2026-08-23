export default class ScreenMini {
    canvas: any;
    ctx: any;
    imageData: any;
    buf32: Uint32Array;
    buf8: Uint8ClampedArray;
    constructor(canvas: any);
    /**
     * 接收 NES PPU 帧缓冲 (Uint32Array, 256×240) 并写入内部 buf32。
     * 对应 browser/screen.ts 的 setBuffer。
     */
    setBuffer: (buffer: Uint32Array) => void;
    /** 把内部 buf8 写到 Canvas。对应 browser/screen.ts 的 writeBuffer。 */
    writeBuffer: () => void;
    /**
     * 根据父容器尺寸自适应 Canvas 显示尺寸 (借鉴 core/browser/screen.ts fitInParent)。
     *
     * 保持 NES 256:240 宽高比, 等比缩放适配父容器最大宽高。
     * 设置 canvas.style.width/height (CSS 显示尺寸, canvas 内部分辨率 256×240 不变)。
     *
     * @param parentW 父容器宽度 (px)
     * @param parentH 父容器高度 (px)
     * @returns 应用后的显示尺寸 {w, h}
     */
    fitInParent(parentW: number, parentH: number): {
        w: number;
        h: number;
    };
    /** 内部: 设置 CSS 显示尺寸 */
    private _setStyleSize;
}
