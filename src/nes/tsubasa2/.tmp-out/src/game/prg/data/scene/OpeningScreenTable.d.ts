/**
 * OpeningScreenTable — 片头动画每屏 Ground Truth 数据表
 *
 * 来源: scripts/_gen_opening_table.cjs (从 emu-full 4332 帧 dump 提取)
 * 用途: OpeningSequenceService 直接按此表播放 14 屏片头动画。
 *
 * 注意: 这是行为数据, 禁止导出裸地址接口。
 */
export interface OpeningScreenEntry {
    id: number;
    label: string;
    startFrame: number;
    endFrame: number;
    duration: number;
    fadeInFrames: number;
    stableFrames: number;
    fadeOutFrames: number;
    chr: number[];
    mid: OpeningFrameState;
    startPal: OpeningPalette;
    endPal: OpeningPalette;
}
export interface OpeningPalette {
    bg: number[];
    spr: number[];
}
export interface OpeningFrameState {
    frame: number;
    pal: OpeningPalette;
    oam: number[][];
    nt: {
        tile: number[];
        attrib: number[];
    }[];
    state: {
        pc: number;
        nTblAddress: number;
        bgTable: number;
        spTable: number;
    };
}
export declare const OPENING_SCREENS: ReadonlyArray<OpeningScreenEntry>;
/** 按 ID 取屏 */
export declare function getOpeningScreen(id: number): OpeningScreenEntry | undefined;
