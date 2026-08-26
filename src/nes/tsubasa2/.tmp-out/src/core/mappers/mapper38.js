import Mapper0 from "./mapper0";
// PCI556 (UNL-PCI556) - Bit Corp
class Mapper38 extends Mapper0 {
    constructor(nes) {
        super(nes);
    }
    write(address, value) {
        if (address < 0x7000 || address > 0x7fff) {
            super.write(address, value);
            return;
        }
        else {
            this.load32kRomBank(value & 3, 0x8000);
            this.load8kVromBank(((value >> 2) & 3) * 2, 0x0000);
        }
    }
}
Mapper38.mapperName = "PCI556";
export default Mapper38;
