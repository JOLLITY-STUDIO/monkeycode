import Mapper0 from "./mapper0";
declare class Mapper3 extends Mapper0 {
    static mapperName: string;
    constructor(nes: any);
    write(address: number, value: number): void;
}
export default Mapper3;
