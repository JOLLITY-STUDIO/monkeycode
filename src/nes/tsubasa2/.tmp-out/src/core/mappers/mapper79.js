import Mapper0 from "./mapper0";
// NINA-03/NINA-06 (American Video Entertainment)
class Mapper79 extends Mapper0 {
    constructor(nes) {
        super(nes);
    }
    write(address, value) {
        if ((address & 0xe100) === 0x4100) {
            this.load32kRomBank((value >> 3) & 1, 0x8000);
            this.load8kVromBank((value & 7) * 2, 0x0000);
        }
        super.write(address, value);
    }
}
Mapper79.mapperName = "NINA-03/NINA-06";
export default Mapper79;
