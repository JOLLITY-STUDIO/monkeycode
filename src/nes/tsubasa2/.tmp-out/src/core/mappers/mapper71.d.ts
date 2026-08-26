import Mapper0 from "./mapper0";
declare class Mapper71 extends Mapper0 {
    static mapperName: string;
    constructor(nes: any);
    write(address: number, value: number): void;
    loadROM(): void;
}
export default Mapper71;
