declare class Tile {
    pix: Uint8Array;
    initialized: boolean;
    opaque: Uint8Array;
    constructor();
    setBuffer(scanline: Uint8Array): void;
    setScanline(sline: number, b1: number, b2: number): void;
    render(buffer: Uint32Array, srcx1: number, srcy1: number, srcx2: number, srcy2: number, dx: number, dy: number, palAdd: number, palette: Uint32Array, flipHorizontal: number, flipVertical: number, pri: number, priTable: Uint32Array): void;
    isTransparent(x: number, y: number): boolean;
    toJSON(): {
        opaque: number[];
        pix: number[];
    };
    fromJSON(s: {
        opaque: number[];
        pix: number[];
    }): void;
}
export default Tile;
