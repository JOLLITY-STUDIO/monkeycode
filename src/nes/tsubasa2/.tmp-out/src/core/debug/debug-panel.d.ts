/**
 * Debug Panel 编排器 — 从 h5game.ts 抽离
 *
 * 职责：
 * - 管理 debug canvas 的初始化与绘制
 * - 协调所有 debug viewer (NT/PT/SPR/ASM) 的渲染
 * - 管理导出 canvas 与 SPR 导出
 * - 管理文本数据的生成和复制
 *
 * 纯逻辑，不依赖微信 Page 实例。
 */
export type DebugTab = '' | 'nametable' | 'patterntable' | 'sprite' | 'disasm';
export interface DebugDataUpdater {
    setData(data: Record<string, any>): void;
    getData(): Record<string, any>;
}
/**
 * DebugPanel 封装所有 debug viewer 逻辑
 *
 * 用法:
 *   const panel = new DebugPanel(pageUpdater);
 *   panel.onTabSwitch(newTab);
 *   panel.renderFrame(nes, sys);  // 在帧循环中调用
 */
export declare class DebugPanel {
    private page;
    private debugCanvas;
    private exportCanvas;
    private sprExportData;
    private exporting;
    recording: boolean;
    private recordedFrames;
    private recordTargetFrames;
    private recordFrameCount;
    readonly RECORD_MAX_FRAMES = 600;
    readonly RECORD_GIF_DELAY = 4;
    private fpsFrameCount;
    private _ppuFramesLogged;
    private _ppuStateChecked;
    private _ppuDeepChecked;
    constructor(page: DebugDataUpdater);
    onTabSwitch(tab: DebugTab, prevTab: DebugTab): void;
    /** 查询 debug canvas 容器尺寸，按原始比例计算最大可显示尺寸 */
    private _fitCanvasStyle;
    renderFrame(nes: any, sys: any | null, frameCount: number): void;
    private _renderGraphical;
    private _renderNT;
    private _renderPT;
    private _renderSprite;
    private _updatePaletteStrips;
    private _renderDisasm;
    private _drawFrameHUD;
    copyData(field: string, label: string): void;
    saveDataToFile(field: string, filename: string, label: string): void;
    private _buildPreviewBuf;
    /** 开始录制。durationSec = 0 手动停止，>0 自动停止 */
    startRecording(durationSec?: number): void;
    /** 停止录制并生成 GIF */
    stopRecording(pageSetData: (data: any) => void): Promise<void>;
    /** 录制中每帧调用，由 _renderSprite 触发 */
    private _capturePreviewFrame;
    exportSprite(pageSetData: (data: any) => void): Promise<void>;
    private _canvasToPng;
    /** 保存图片到系统相册 (仅真机有效，devtools 不支持) */
    private _saveToAlbum;
}
