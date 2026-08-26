import Mapper0 from "./mapper0";
// CNROM
class Mapper3 extends Mapper0 {
    constructor(nes) {
        super(nes);
    }
    write(address, value) {
        if (address < 0x8000) {
            super.write(address, value);
            return;
        }
        else {
            this.load8kVromBank(value * 2, 0x0000);
        }
    }
}
Mapper3.mapperName = "CNROM";
export default Mapper3;
