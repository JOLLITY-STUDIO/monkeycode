import Mapper0 from "./mapper0";

// MMC1 / SxROM (SKROM, SLROM, SNROM, etc.)
class Mapper1 extends Mapper0 {
  static mapperName = "MMC1";

  regBuffer: number;
  regBufferCounter: number;
  mirroring: number;
  oneScreenMirroring: number;
  prgSwitchingArea: number;
  prgSwitchingSize: number;
  vromSwitchingSize: number;
  romSelectionReg0: number;
  romSelectionReg1: number;
  romBankSelect: number;

  constructor(nes: any) {
    super(nes);

    this.regBuffer = 0;
    this.regBufferCounter = 0;
    this.mirroring = 0;
    this.oneScreenMirroring = 0;
    this.prgSwitchingArea = 1;
    this.prgSwitchingSize = 1;
    this.vromSwitchingSize = 0;
    this.romSelectionReg0 = 0;
    this.romSelectionReg1 = 0;
    this.romBankSelect = 0;
  }

  write(address: number, value: number): void {
    if (address < 0x8000) {
      super.write(address, value);
      return;
    }

    if ((value & 128) !== 0) {
      this.regBufferCounter = 0;
      this.regBuffer = 0;

      if (this.getRegNumber(address) === 0) {
        this.prgSwitchingArea = 1;
        this.prgSwitchingSize = 1;
      }
    } else {
      this.regBuffer =
        (this.regBuffer & (0xff - (1 << this.regBufferCounter))) |
        ((value & 1) << this.regBufferCounter);
      this.regBufferCounter++;

      if (this.regBufferCounter === 5) {
        this.setReg(this.getRegNumber(address), this.regBuffer);
        this.regBuffer = 0;
        this.regBufferCounter = 0;
      }
    }
  }

  setReg(reg: number, value: number): void {
    let tmp: number;

    switch (reg) {
      case 0:
        tmp = value & 3;
        if (tmp !== this.mirroring) {
          this.mirroring = tmp;
          if ((this.mirroring & 2) === 0) {
            this.nes.ppu.setMirroring(this.nes.rom.SINGLESCREEN_MIRRORING);
          } else if ((this.mirroring & 1) !== 0) {
            this.nes.ppu.setMirroring(this.nes.rom.HORIZONTAL_MIRRORING);
          } else {
            this.nes.ppu.setMirroring(this.nes.rom.VERTICAL_MIRRORING);
          }
        }

        this.prgSwitchingArea = (value >> 2) & 1;
        this.prgSwitchingSize = (value >> 3) & 1;
        this.vromSwitchingSize = (value >> 4) & 1;

        break;

      case 1:
        this.romSelectionReg0 = (value >> 4) & 1;

        if (this.nes.rom.vromCount > 0) {
          if (this.vromSwitchingSize === 0) {
            if (this.romSelectionReg0 === 0) {
              this.load8kVromBank(value & 0xf, 0x0000);
            } else {
              this.load8kVromBank(
                Math.floor(this.nes.rom.vromCount / 2) + (value & 0xf),
                0x0000,
              );
            }
          } else {
            if (this.romSelectionReg0 === 0) {
              this.loadVromBank(value & 0xf, 0x0000);
            } else {
              this.loadVromBank(
                Math.floor(this.nes.rom.vromCount / 2) + (value & 0xf),
                0x0000,
              );
            }
          }
        }

        break;

      case 2:
        this.romSelectionReg1 = (value >> 4) & 1;

        if (this.nes.rom.vromCount > 0) {
          if (this.vromSwitchingSize === 1) {
            if (this.romSelectionReg1 === 0) {
              this.loadVromBank(value & 0xf, 0x1000);
            } else {
              this.loadVromBank(
                Math.floor(this.nes.rom.vromCount / 2) + (value & 0xf),
                0x1000,
              );
            }
          }
        }
        break;

      default: {
        let bank: number;
        let baseBank = 0;

        if (this.nes.rom.romCount >= 32) {
          if (this.vromSwitchingSize === 0) {
            if (this.romSelectionReg0 === 1) {
              baseBank = 16;
            }
          } else {
            baseBank =
              (this.romSelectionReg0 | (this.romSelectionReg1 << 1)) << 3;
          }
        } else if (this.nes.rom.romCount >= 16) {
          if (this.romSelectionReg0 === 1) {
            baseBank = 8;
          }
        }

        if (this.prgSwitchingSize === 0) {
          bank = baseBank + (value & 0xf);
          this.load32kRomBank(bank, 0x8000);
        } else {
          bank = baseBank * 2 + (value & 0xf);
          if (this.prgSwitchingArea === 0) {
            this.loadRomBank(bank, 0xc000);
          } else {
            this.loadRomBank(bank, 0x8000);
          }
        }
      }
    }
  }

  getRegNumber(address: number): number {
    if (address >= 0x8000 && address <= 0x9fff) {
      return 0;
    } else if (address >= 0xa000 && address <= 0xbfff) {
      return 1;
    } else if (address >= 0xc000 && address <= 0xdfff) {
      return 2;
    } else {
      return 3;
    }
  }

  loadROM(): void {
    if (!this.nes.rom.valid) {
      throw new Error("MMC1: Invalid ROM! Unable to load.");
    }

    this.loadRomBank(0, 0x8000);
    this.loadRomBank(this.nes.rom.romCount - 1, 0xc000);
    this.loadCHRROM();
    this.loadBatteryRam();
    this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET);
  }

  switchLowHighPrgRom(_oldSetting: any): void {
    // not yet.
  }

  switch16to32(): void {
    // not yet.
  }

  switch32to16(): void {
    // not yet.
  }

  toJSON(): any {
    let s = super.toJSON();
    s.mirroring = this.mirroring;
    s.oneScreenMirroring = this.oneScreenMirroring;
    s.prgSwitchingArea = this.prgSwitchingArea;
    s.prgSwitchingSize = this.prgSwitchingSize;
    s.vromSwitchingSize = this.vromSwitchingSize;
    s.romSelectionReg0 = this.romSelectionReg0;
    s.romSelectionReg1 = this.romSelectionReg1;
    s.romBankSelect = this.romBankSelect;
    s.regBuffer = this.regBuffer;
    s.regBufferCounter = this.regBufferCounter;
    return s;
  }

  fromJSON(s: any): void {
    super.fromJSON(s);
    this.mirroring = s.mirroring;
    this.oneScreenMirroring = s.oneScreenMirroring;
    this.prgSwitchingArea = s.prgSwitchingArea;
    this.prgSwitchingSize = s.prgSwitchingSize;
    this.vromSwitchingSize = s.vromSwitchingSize;
    this.romSelectionReg0 = s.romSelectionReg0;
    this.romSelectionReg1 = s.romSelectionReg1;
    this.romBankSelect = s.romBankSelect;
    this.regBuffer = s.regBuffer;
    this.regBufferCounter = s.regBufferCounter;
  }
}

export default Mapper1;
