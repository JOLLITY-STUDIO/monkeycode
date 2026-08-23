import Tile from "./tile";
declare class ROM {
    VERTICAL_MIRRORING: number;
    HORIZONTAL_MIRRORING: number;
    FOURSCREEN_MIRRORING: number;
    SINGLESCREEN_MIRRORING: number;
    SINGLESCREEN_MIRRORING2: number;
    SINGLESCREEN_MIRRORING3: number;
    SINGLESCREEN_MIRRORING4: number;
    CHRROM_MIRRORING: number;
    nes: any;
    valid: boolean;
    /** 翻译后的 PRG bank 类 (TS 数据, 无需指令字节) */
    tsPrg: unknown;
    header: Uint8Array;
    mirroring: number;
    batteryRam: boolean;
    trainer: boolean;
    fourScreen: boolean;
    isNES2: boolean;
    romCount: number;
    rom: Uint8Array[];
    vromCount: number;
    vrom: Uint8Array[];
    vromTile: Tile[][];
    mapperType: number;
    subMapper: number;
    prgRamSize: number;
    prgNvRamSize: number;
    chrRamSize: number;
    chrNvRamSize: number;
    timingMode: number;
    consoleType: number;
    constructor(nes: any);
    load(data: Uint8Array | string | ArrayBuffer): void;
    /**
     * 直接加载 src/game/index.ts 导出的 ROM 定义。
     * romDef = { header: iNES 16B, prg: 翻译 bank 类, chr: 原始 128KB 字节 }。
     * PRG 已翻译为高级语言 (tsPrg), 无 CPU 解析, 不需要指令字节;
     * CHR 仍为原始字节, 用于 PPU 渲染 tile。
     */
    loadTs(romDef: {
        header: Uint8Array;
        prg: unknown;
        chr: Uint8Array;
    }): void;
    _loadINES1Header(): void;
    _loadNES2Header(): void;
    static _decodeRamSize(value: number): number;
    getMirroringType(): number;
    mapperSupported(): boolean;
    createMapper(): any;
}
export default ROM;
