import Mapper0 from "./mapper0";

// Jaleco JF-11 / JF-14
class Mapper140 extends Mapper0 {
  static mapperName = "Jaleco JF-11/JF-14";

  constructor(nes: any) {
    super(nes);
  }

  write(address: number, value: number): void {
    if (address < 0x6000 || address > 0x7fff) {
      super.write(address, value);
      return;
    } else {
      this.load32kRomBank((value >> 4) & 3, 0x8000);
      this.load8kVromBank((value & 0xf) * 2, 0x0000);
    }
  }
}

export default Mapper140;
