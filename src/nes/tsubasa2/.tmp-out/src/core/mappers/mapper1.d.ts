import Mapper0 from "./mapper0";
declare class Mapper1 extends Mapper0 {
    static mapperName: string;
    regBuffer: number;
    regBufferCounter: number;
    mirroring: number;
    oneScreenMirroring: number;
    prgSwitchingArea: number;
    prgSwitchingSize: number;
    vromSwitchingSize: number;
    romSelectionReg0: number;
    romSelectionReg1: number;
    romBankSelect: number;
    /** 當前映射到 PPU $0000-$0FFF 的 4KB CHR bank 編號 */
    chrBank4k_0000: number;
    /** 當前映射到 PPU $1000-$1FFF 的 4KB CHR bank 編號 */
    chrBank4k_1000: number;
    constructor(nes: any);
    write(address: number, value: number): void;
    setReg(reg: number, value: number): void;
    getRegNumber(address: number): number;
    loadROM(): void;
    switchLowHighPrgRom(_oldSetting: any): void;
    switch16to32(): void;
    switch32to16(): void;
    toJSON(): any;
    fromJSON(s: any): void;
}
export default Mapper1;
