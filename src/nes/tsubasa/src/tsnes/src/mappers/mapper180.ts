import Mapper0 from "./mapper0";

// UNROM (AND-logic variant, HVC-UNROM) - Crazy Climber
class Mapper180 extends Mapper0 {
  static mapperName = "UNROM (Crazy Climber)";

  constructor(nes: any) {
    super(nes);
  }

  write(address: number, value: number): void {
    if (address < 0x8000) {
      super.write(address, value);
      return;
    } else {
      this.loadRomBank(value, 0xc000);
    }
  }

  loadROM(): void {
    if (!this.nes.rom.valid) {
      throw new Error("Mapper 180: Invalid ROM! Unable to load.");
    }

    this.loadRomBank(0, 0x8000);
    this.loadRomBank(0, 0xc000);
    this.loadCHRROM();
    this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET);
  }
}

export default Mapper180;
