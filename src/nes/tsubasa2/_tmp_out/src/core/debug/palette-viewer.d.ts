/**
 * Palette Viewer — 每组 4 色独立显示 (Group 0~3)
 *
 * 布局:
 * ┌──────────────────────────────────────┐
 * │ [ BG  ]              [ SPR ]         │
 * │ G0 G1 G2 G3         G0 G1 G2 G3     │
 * │ ■  ■  ■  ■          ■  ■  ■  ■     │
 * │ ■  ■  ■  ■          ■  ■  ■  ■     │
 * │ ■  ■  ■  ■          ■  ■  ■  ■     │
 * │ ■  ■  ■  ■          ■  ■  ■  ■     │
 * │                                      │
 * │        [ System Palette 64 ]        │
 * │  8×8 网格                           │
 * └──────────────────────────────────────┘
 */
import type NES from '../nes';
export interface PaletteViewerData {
    systemPalette: Uint32Array;
    imgPalette: Uint32Array;
    sprPalette: Uint32Array;
    rawImgPalette: Uint8Array;
    rawSprPalette: Uint8Array;
    emphasis: number;
}
export declare function getPaletteData(nes: NES): PaletteViewerData;
export declare function renderPaletteImage(nes: NES): {
    data: Uint32Array;
    width: number;
    height: number;
};
