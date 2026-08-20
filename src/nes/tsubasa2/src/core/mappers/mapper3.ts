import Mapper0 from "./mapper0";

// CNROM
class Mapper3 extends Mapper0 {
  static mapperName = "CNROM";

  constructor(nes: any) {
    super(nes);
  }

  write(address: number, value: number): void {
    if (address < 0x8000) {
      super.write(address, value);
      return;
    } else {
      this.load8kVromBank(value * 2, 0x0000);
    }
  }
}

export default Mapper3;
