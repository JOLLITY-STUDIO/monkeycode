/**
 * OpeningFrameTable — 片头逐帧 Ground Truth
 * 来源:emu-full f10-f4200
 * 字段含义:
 *   f: NES 帧号
 *   c: CHR scanline 计划 [{s:scanline, b:[8 bank1k]}]
 *   p: palette {bg,sp} 或 null(与上帧相同)
 *   o: OAM diff [[idx,y,tile,attr,x],...]
 *   n: NT tile 变化行 [{ni,r,d[32]}]
 *   a: 属性表变化行 [{ni,r,d[8]}]
 *   s: 渲染用 scroll 寄存器 {v,h,vt,ht,fv,fh}
 */
export interface OpeningFrameChr {
    s: number;
    b: ReadonlyArray<number>;
}
export interface OpeningFrameNtRow {
    ni: number;
    r: number;
    d: ReadonlyArray<number>;
}
export interface OpeningFrameScroll {
    readonly v: number;
    readonly h: number;
    readonly vt: number;
    readonly ht: number;
    readonly fv: number;
    readonly fh: number;
}
export interface OpeningFrameEntry {
    readonly f: number;
    readonly c: ReadonlyArray<OpeningFrameChr>;
    readonly p: {
        readonly bg: ReadonlyArray<number>;
        readonly spr: ReadonlyArray<number>;
    } | null;
    readonly o: ReadonlyArray<ReadonlyArray<number>>;
    readonly n: ReadonlyArray<OpeningFrameNtRow>;
    readonly a: ReadonlyArray<OpeningFrameNtRow>;
    readonly s: OpeningFrameScroll;
}
export declare const OPENING_FRAMES: ReadonlyArray<OpeningFrameEntry>;
export declare function getOpeningFrame(nesFrame: number): OpeningFrameEntry | undefined;
