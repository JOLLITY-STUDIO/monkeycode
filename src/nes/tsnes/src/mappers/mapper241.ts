import Mapper0 from "./mapper0";

// BxROM variant (Hengge Technology)
class Mapper241 extends Mapper0 {
  static mapperName = "BxROM (Mapper 241)";

  constructor(nes: any) {
    super(nes);
  }

  write(address: number, value: number): void {
    if (address < 0x8000) {
      super.write(address, value);
      return;
    } else {
      this.load32kRomBank(value, 0x8000);
    }
  }
}

export default Mapper241;
