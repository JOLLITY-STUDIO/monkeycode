import Mapper0 from "./mapper0";

// Color Dreams (unlicensed discrete mapper)
class Mapper11 extends Mapper0 {
  static mapperName = "Color Dreams";

  constructor(nes: any) {
    super(nes);
  }

  write(address: number, value: number): void {
    if (address < 0x8000) {
      super.write(address, value);
      return;
    } else {
      let prgbank1 = ((value & 0xf) * 2) % this.nes.rom.romCount;
      let prgbank2 = ((value & 0xf) * 2 + 1) % this.nes.rom.romCount;

      this.loadRomBank(prgbank1, 0x8000);
      this.loadRomBank(prgbank2, 0xc000);

      if (this.nes.rom.vromCount > 0) {
        let bank = ((value >> 4) * 2) % this.nes.rom.vromCount;
        this.loadVromBank(bank, 0x0000);
        this.loadVromBank(bank + 1, 0x1000);
      }
    }
  }
}

export default Mapper11;
