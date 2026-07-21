import Mapper0 from "./mapper0";

// MMC2 (PNROM / PEEOROM) - Mike Tyson's Punch-Out!!
class Mapper9 extends Mapper0 {
  static mapperName = "MMC2";

  prgBank: number;
  chrBankFD0: number;
  chrBankFE0: number;
  chrBankFD1: number;
  chrBankFE1: number;
  latch0: number;
  latch1: number;

  constructor(nes: any) {
    super(nes);

    this.prgBank = 0;
    this.chrBankFD0 = 0;
    this.chrBankFE0 = 0;
    this.chrBankFD1 = 0;
    this.chrBankFE1 = 0;
    this.latch0 = 0xfe;
    this.latch1 = 0xfe;
  }

  write(address: number, value: number): void {
    if (address < 0x8000) {
      super.write(address, value);
      return;
    }

    switch (address & 0xf000) {
      case 0xa000:
        this.prgBank = value & 0x0f;
        this.load8kRomBank(this.prgBank, 0x8000);
        break;

      case 0xb000:
        this.chrBankFD0 = value & 0x1f;
        this._updateChr0();
        break;

      case 0xc000:
        this.chrBankFE0 = value & 0x1f;
        this._updateChr0();
        break;

      case 0xd000:
        this.chrBankFD1 = value & 0x1f;
        this._updateChr1();
        break;

      case 0xe000:
        this.chrBankFE1 = value & 0x1f;
        this._updateChr1();
        break;

      case 0xf000:
        if (value & 0x01) {
          this.nes.ppu.setMirroring(this.nes.rom.HORIZONTAL_MIRRORING);
        } else {
          this.nes.ppu.setMirroring(this.nes.rom.VERTICAL_MIRRORING);
        }
        break;
    }
  }

  _updateChr0(): void {
    let bank = this.latch0 === 0xfd ? this.chrBankFD0 : this.chrBankFE0;
    this.loadVromBank(bank, 0x0000);
  }

  _updateChr1(): void {
    let bank = this.latch1 === 0xfd ? this.chrBankFD1 : this.chrBankFE1;
    this.loadVromBank(bank, 0x1000);
  }

  latchAccess(address: number): void {
    if (address === 0x0fd8) {
      if (this.latch0 !== 0xfd) {
        this.latch0 = 0xfd;
        this._updateChr0();
      }
    } else if (address === 0x0fe8) {
      if (this.latch0 !== 0xfe) {
        this.latch0 = 0xfe;
        this._updateChr0();
      }
    } else if (address >= 0x1fd8 && address <= 0x1fdf) {
      if (this.latch1 !== 0xfd) {
        this.latch1 = 0xfd;
        this._updateChr1();
      }
    } else if (address >= 0x1fe8 && address <= 0x1fef) {
      if (this.latch1 !== 0xfe) {
        this.latch1 = 0xfe;
        this._updateChr1();
      }
    }
  }

  loadROM(): void {
    if (!this.nes.rom.valid) {
      throw new Error("MMC2: Invalid ROM! Unable to load.");
    }

    this.load8kRomBank(0, 0x8000);

    let lastBank8k = (this.nes.rom.romCount - 1) * 2 + 1;
    this.load8kRomBank(lastBank8k - 2, 0xa000);
    this.load8kRomBank(lastBank8k - 1, 0xc000);
    this.load8kRomBank(lastBank8k, 0xe000);

    this.loadCHRROM();
    this.loadBatteryRam();

    this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET);
  }

  toJSON(): any {
    let s = super.toJSON();
    s.prgBank = this.prgBank;
    s.chrBankFD0 = this.chrBankFD0;
    s.chrBankFE0 = this.chrBankFE0;
    s.chrBankFD1 = this.chrBankFD1;
    s.chrBankFE1 = this.chrBankFE1;
    s.latch0 = this.latch0;
    s.latch1 = this.latch1;
    return s;
  }

  fromJSON(s: any): void {
    super.fromJSON(s);
    this.prgBank = s.prgBank;
    this.chrBankFD0 = s.chrBankFD0;
    this.chrBankFE0 = s.chrBankFE0;
    this.chrBankFD1 = s.chrBankFD1;
    this.chrBankFE1 = s.chrBankFE1;
    this.latch0 = s.latch0;
    this.latch1 = s.latch1;
  }
}

export default Mapper9;
