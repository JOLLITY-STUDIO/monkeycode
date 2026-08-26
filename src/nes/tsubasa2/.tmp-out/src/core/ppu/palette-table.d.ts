declare class PaletteTable {
    constructor();
    loadNTSCPalette(): void;
    loadPALPalette(): void;
    makeTables(): void;
    setEmphasis(emph: any): void;
    getEntry(yiq: any): any;
    getRed(rgb: any): number;
    getGreen(rgb: any): number;
    getBlue(rgb: any): number;
    getRgb(r: any, g: any, b: any): number;
    loadDefaultPalette(): void;
}
export default PaletteTable;
