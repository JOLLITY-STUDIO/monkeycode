import Mapper0 from "./mapper0";

// GxROM (NES-GNROM, NES-MHROM)
class Mapper66 extends Mapper0 {
  static mapperName = "GxROM";

  constructor(nes: any) {
    super(nes);
  }

  write(address: number, value: number): void {
    if (address < 0x8000) {
      super.write(address, value);
      return;
    } else {
      this.load32kRomBank((value >> 4) & 3, 0x8000);
      this.load8kVromBank((value & 3) * 2, 0x0000);
    }
  }
}

export default Mapper66;
