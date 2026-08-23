import Mapper4 from "./mapper4";
import Tile from "../tile";
declare class Mapper119 extends Mapper4 {
    static mapperName: string;
    chrRam: Uint8Array;
    chrRamTiles: Tile[][];
    chrRamSlots: number[];
    constructor(nes: any);
    executeCommand(cmd: number, arg: number): void;
    saveChrRamSlot(address: number): void;
    load1kChrRamBank(bank: number, address: number): void;
    rebuildChrRamTiles(bank: number): void;
    canWriteChr(address: number): boolean;
    toJSON(): any;
    fromJSON(s: any): void;
}
export default Mapper119;
