import Mapper0 from "./mapper0";
declare class Mapper4 extends Mapper0 {
    static mapperName: string;
    static CMD_SEL_2_1K_VROM_0000: number;
    static CMD_SEL_2_1K_VROM_0800: number;
    static CMD_SEL_1K_VROM_1000: number;
    static CMD_SEL_1K_VROM_1400: number;
    static CMD_SEL_1K_VROM_1800: number;
    static CMD_SEL_1K_VROM_1C00: number;
    static CMD_SEL_ROM_PAGE1: number;
    static CMD_SEL_ROM_PAGE2: number;
    command: number;
    prgAddressSelect: number;
    chrAddressSelect: number;
    pageNumber: number;
    irqCounter: number;
    irqLatchValue: number;
    irqEnable: number;
    prgAddressChanged: boolean;
    /** 8 PPU 1KB slot → CHR 1KB bank ID */
    chrBanks: Uint8Array;
    /** bank 的索引對應 PPU 地址:
     *  [0]=$0000 [1]=$0400 [2]=$0800 [3]=$0C00
     *  [4]=$1000 [5]=$1400 [6]=$1800 [7]=$1C00 */
    static PPU_ADDR_TO_SLOT: number[];
    /** 当前 PRG bank 映射: key=窗口基地址($8000/$A000/$C000/$E000), value=8KB bank index */
    prgBankMap: Record<number, number>;
    constructor(nes: any);
    write(address: number, value: number): void;
    executeCommand(cmd: number, arg: number): void;
    loadROM(): void;
    clockIrqCounter(): void;
    toJSON(): any;
    fromJSON(s: any): void;
    getChrBankMap(): Uint8Array | null;
    /** 返回当前 PRG 8KB bank 映射 (window base → bank index) */
    getPrgBankMap(): Record<number, number>;
}
export default Mapper4;
