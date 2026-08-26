export interface MpScreenOptions {
    onTouchStart?: (x: number, y: number) => void;
    onTouchEnd?: () => void;
    /** 获取父容器尺寸（px），fitInParent 自动等比适配时使用 */
    getContainerSize?: () => Promise<{
        width: number;
        height: number;
    }>;
    /** 适配后 canvas 显示尺寸变化（页面 setData 同步 WXML 内联 style） */
    onResize?: (width: number, height: number) => void;
}
export default class MpScreen {
    readonly canvas: any;
    readonly context: any;
    readonly imageData: any;
    buf: ArrayBuffer;
    buf8: Uint8ClampedArray;
    buf32: Uint32Array;
    onTouchStart?: (x: number, y: number) => void;
    onTouchEnd?: () => void;
    private _getContainerSize?;
    private _onResize?;
    private _fitWidth;
    private _fitHeight;
    constructor(canvas: any, options?: MpScreenOptions);
    /** 写入一帧像素（0x00RRGGBB → 0xFFRRGGBB，全 alpha） */
    setBuffer: (buffer: Uint32Array) => void;
    /** 提交帧缓冲到画布 */
    writeBuffer: () => void;
    /**
     * 自动等比适配父容器（fitInParent）
     * 保持 256:240 比例，取父容器内最大内接矩形，居中显示。
     */
    fitInParent: () => Promise<void>;
    /**
     * 触摸开始（由 WXML bindtouchstart 转发）
     * 小程序 canvas 节点在逻辑层不支持 addEventListener，
     * 触摸事件必须绑定在 WXML 上，由页面调用本方法。
     */
    handleTouchStart(e: any): void;
    /** 触摸结束/取消（由 WXML bindtouchend/bindtouchcancel 转发） */
    handleTouchEnd(): void;
    /** 触摸 → 256×240 游戏坐标 */
    private _mapTouch;
    destroy(): void;
}
