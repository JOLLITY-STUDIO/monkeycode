/**
 * Debug Canvas 工具 — 从 h5game.ts 抽离
 *
 * 处理 debug canvas 的初始化、blit 等纯 canvas 操作。
 */
export interface CanvasSlot {
    canvas: any;
    ctx: any;
    imgData: any;
    frameBuf: Uint32Array | null;
}
export declare class DebugCanvasManager {
    canvas: any;
    ctx: any;
    imgData: any;
    querying: boolean;
    /** 初始化 debug canvas（通过微信 selector API） */
    init(selector?: string): void;
    /** 绑定已有的 canvas/ctx（Page onReady 时传入已获取的 canvas） */
    attach(canvas: any, ctx: any): void;
    reset(): void;
    /**
     * 将源缓冲区 (w×h) 1:1 绘制到 canvas（像素尺寸 = w×h）
     * CSS 通过 image-rendering: pixelated + max-width/max-height 自动放大撑满面板
     */
    blit(buf: Uint32Array, w: number, h: number): void;
    /**
     * 带 alpha 通道的 blit（专供导出透明 PNG）
     * 背景填充色通常用 0x00000000（全透明），精灵像素用 0xFFrrggbb（不透明）
     */
    blitAlpha(buf: Uint32Array, w: number, h: number): void;
    /**
     * 在 canvas 上叠加文字 HUD（frame count 等）
     * 必须在 blit 之后调用
     */
    drawTextOverlay(text: string, x: number, y: number, fontSize?: number, color?: string): void;
}
/** 从 Page 传入的 game canvas slot 创建 CanvasSlot */
export declare function makeGameSlot(cnv: any, w: number, h: number): CanvasSlot;
/** 渲染一个 game canvas slot 的画面 */
export declare function renderGameSlot(slot: CanvasSlot | null, screenW: number, screenH: number): void;
