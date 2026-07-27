import Mapper0 from "./mapper0";

// BNROM (NES-BNROM)
class Mapper34 extends Mapper0 {
  static mapperName = "BNROM";

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

export default Mapper34;
