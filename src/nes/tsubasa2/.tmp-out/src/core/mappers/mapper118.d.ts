import Mapper4 from "./mapper4";
declare class Mapper118 extends Mapper4 {
    static mapperName: string;
    chrRegs: number[];
    constructor(nes: any);
    write(address: number, value: number): void;
    executeCommand(cmd: number, arg: number): void;
    updateNametableMirroring(): void;
    loadROM(): void;
    toJSON(): any;
    fromJSON(s: any): void;
}
export default Mapper118;
