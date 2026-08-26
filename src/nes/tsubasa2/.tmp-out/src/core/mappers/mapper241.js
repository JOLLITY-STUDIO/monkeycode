import Mapper0 from "./mapper0";
// BxROM variant (Hengge Technology)
class Mapper241 extends Mapper0 {
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
Mapper241.mapperName = "BxROM (Mapper 241)";
export default Mapper241;
