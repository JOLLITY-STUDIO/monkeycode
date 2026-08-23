import Mapper0 from "./mapper0";
declare class Mapper9 extends Mapper0 {
    static mapperName: string;
    prgBank: number;
    chrBankFD0: number;
    chrBankFE0: number;
    chrBankFD1: number;
    chrBankFE1: number;
    latch0: number;
    latch1: number;
    constructor(nes: any);
    write(address: number, value: number): void;
    _updateChr0(): void;
    _updateChr1(): void;
    latchAccess(address: number): void;
    loadROM(): void;
    toJSON(): any;
    fromJSON(s: any): void;
}
export default Mapper9;
