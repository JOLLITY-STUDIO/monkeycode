import Mapper0 from "./mapper0";

// Mapper 240 (Jing Ke Xin Zhuan / Sheng Huo Lie Zhuan PCBs)
class Mapper240 extends Mapper0 {
  static mapperName = "Mapper 240";

  constructor(nes: any) {
    super(nes);
  }

  write(address: number, value: number): void {
    if (address < 0x4020 || address > 0x5fff) {
      super.write(address, value);
      return;
    } else {
      this.load32kRomBank((value >> 4) & 3, 0x8000);
      this.load8kVromBank((value & 0xf) * 2, 0x0000);
    }
  }
}

export default Mapper240;
