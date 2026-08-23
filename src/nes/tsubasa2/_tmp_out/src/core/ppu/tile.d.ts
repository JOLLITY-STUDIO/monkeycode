/**
 * Tile — 单个 CHR Pattern Tile 解码缓冲
 * 移植自 tsnes/src/tile.ts（逐行原样，无外部依赖）
 *
 * pix: 8×8 颜色索引 (0-3)
 * opaque: 每行是否全不透明
 */
export declare class Tile {
    pix: Uint8Array;
    initialized: boolean;
    opaque: Uint8Array;
    constructor();
    setBuffer(scanline: Uint8Array): void;
    setScanline(sline: number, b1: number, b2: number): void;
    render(buffer: Uint32Array, srcx1: number, srcy1: number, srcx2: number, srcy2: number, dx: number, dy: number, palAdd: number, palette: Uint32Array, flipHorizontal: number, flipVertical: number, pri: number, priTable: Uint32Array): void;
    isTransparent(x: number, y: number): boolean;
}
