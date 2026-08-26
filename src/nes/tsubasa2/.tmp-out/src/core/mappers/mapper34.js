import Mapper0 from "./mapper0";
// BNROM (NES-BNROM)
class Mapper34 extends Mapper0 {
    constructor(nes) {
        super(nes);
    }
    write(address, value) {
        if (address < 0x8000) {
            super.write(address, value);
            return;
        }
        else {
            this.load32kRomBank(value, 0x8000);
        }
    }
}
Mapper34.mapperName = "BNROM";
export default Mapper34;
