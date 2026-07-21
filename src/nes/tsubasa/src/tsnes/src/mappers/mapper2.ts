import Mapper0 from "./mapper0";

// UxROM (NES-UNROM, NES-UOROM)
class Mapper2 extends Mapper0 {
  static mapperName = "UxROM";

  constructor(nes: any) {
    super(nes);
  }

  write(address: number, value: number): void {
    if (address < 0x8000) {
      super.write(address, value);
      return;
    } else {
      this.loadRomBank(value, 0x8000);
    }
  }

  loadROM(): void {
    if (!this.nes.rom.valid) {
      throw new Error("UNROM: Invalid ROM! Unable to load.");
    }

    this.loadRomBank(0, 0x8000);
    this.loadRomBank(this.nes.rom.romCount - 1, 0xc000);
    this.loadCHRROM();
    this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET);
  }
}

export default Mapper2;
