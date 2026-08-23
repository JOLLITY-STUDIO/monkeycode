declare class PPU {
    STATUS_VRAMWRITE: number;
    STATUS_SLSPRITECOUNT: number;
    STATUS_SPRITE0HIT: number;
    STATUS_VBLANK: number;
    constructor(nes: any);
    /** VRAM 底层字节数组 (只读视图, 供调试工具读取) */
    get vramMem(): Uint8Array;
    /** OAM / SPR-RAM 底层字节数组 (只读视图) */
    get spriteMem(): Uint8Array;
    /** 背景 pattern table 选择 (regS) */
    get regS(): number;
    /** 水平 nametable 位 (regH) */
    get regH(): number;
    /** 水平 tile 粗 X (regHT) */
    get regHT(): number;
    /** 水平 fine offset (regFH) */
    get regFH(): number;
    /** 垂直 nametable 位 (regV) */
    get regV(): number;
    /** 垂直 tile 粗 Y (regVT) */
    get regVT(): number;
    /** 垂直 fine offset (regFV) */
    get regFV(): number;
    setMirroring(mirroring: any): void;
    defineMirrorRegion(fromStart: any, toStart: any, size: any): void;
    startVBlank(): void;
    _fireVblankSet(cpu: any, dotsRemaining: any): void;
    _fireVblankClear(cpu: any, isLastDot: any): void;
    advanceDots(dots: any): void;
    endScanline(): void;
    startFrame(): void;
    endFrame(): void;
    updateControlReg1(value: any): void;
    _updateNmiOutput(): void;
    updateControlReg2(value: any): void;
    setStatusFlag(flag: any, value: any): void;
    readStatusRegister(): any;
    writeSRAMAddress(address: any): void;
    sramLoad(): any;
    sramWrite(value: any): void;
    scrollWrite(value: any): void;
    writeVRAMAddress(address: any): void;
    vramLoad(): any;
    vramWrite(value: any): void;
    sramDMA(value: any): void;
    regsFromAddress(): void;
    _incrementVramAddress(): void;
    cntsFromAddress(): void;
    regsToAddress(): void;
    cntsToAddress(): void;
    incTileCounter(count: any): void;
    mirroredLoad(address: any): any;
    mirroredWrite(address: any, value: any): void;
    triggerRendering(): void;
    renderFramePartially(startScan: any, scanCount: any): void;
    renderBgScanline(bgbuffer: any, scan: any): void;
    performOAMCorruption(): void;
    evaluateSprites(targetScanline: any): void;
    renderSpritesPartially(startscan: any, scancount: any, bgPri: any): void;
    checkSprite0(scan: any): boolean;
    _checkSpr0Pixels(tile: any, toffset: any, startX: any, horiFlip: any, scan: any, leftClip: any): boolean;
    _precomputeSprite0Hit(nextBufferScan: any): boolean;
    writeMem(address: any, value: any): void;
    updatePalettes(): void;
    patternWrite(address: any, value: any): void;
    nameTableWrite(index: any, address: any, value: any): void;
    attribTableWrite(index: any, address: any, value: any): void;
    spriteRamWriteUpdate(address: any, value: any): void;
    isPixelWhite(x: any, y: any): boolean;
    toJSON(): any;
    fromJSON(state: any): void;
    static JSON_PROPERTIES: string[];
}
export default PPU;
