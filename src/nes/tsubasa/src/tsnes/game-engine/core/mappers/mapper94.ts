import Mapper0 from "./mapper0";

// UN1ROM (HVC-UN1ROM)
class Mapper94 extends Mapper0 {
  static mapperName = "UN1ROM";

  constructor(nes: any) {
    super(nes);
  }

  write(address: number, value: number): void {
    if (address < 0x8000) {
      super.write(address, value);
      return;
    } else {
      this.loadRomBank(value >> 2, 0x8000);
    }
  }

  loadROM(): void {
    if (!this.nes.rom.valid) {
      throw new Error("UN1ROM: Invalid ROM! Unable to load.");
    }

    this.loadRomBank(0, 0x8000);
    this.loadRomBank(this.nes.rom.romCount - 1, 0xc000);
    this.loadCHRROM();
    this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET);
  }
}

export default Mapper94;
