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

  /** 當前映射到 PPU $0000-$0FFF 的 4KB CHR bank 編號 */
  chrBank4k_0000: number = 0;
  /** 當前映射到 PPU $1000-$1FFF 的 4KB CHR bank 編號 */
  chrBank4k_1000: number = 1;

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
          const vromCount = this.nes.rom.vromCount;
          const baseBank = this.romSelectionReg0 === 0 ? 0 : Math.floor(vromCount / 2);
          const bank = baseBank + (value & 0xf);

          if (this.vromSwitchingSize === 0) {
            // 8KB 模式: Reg1 同時控制 $0000 和 $1000 (連續兩個 4KB bank)
            this.load8kVromBank(bank, 0x0000);
            this.chrBank4k_0000 = bank % vromCount;
            this.chrBank4k_1000 = (bank + 1) % vromCount;
          } else {
            // 4KB 模式: Reg1 只控制 $0000
            this.loadVromBank(bank, 0x0000);
            this.chrBank4k_0000 = bank % vromCount;
          }
        }

        break;

      case 2:
        this.romSelectionReg1 = (value >> 4) & 1;

        if (this.nes.rom.vromCount > 0) {
          if (this.vromSwitchingSize === 1) {
            const vromCount = this.nes.rom.vromCount;
            const baseBank = this.romSelectionReg1 === 0 ? 0 : Math.floor(vromCount / 2);
            const bank = baseBank + (value & 0xf);

            // 4KB 模式: Reg2 控制 $1000
            this.loadVromBank(bank, 0x1000);
            this.chrBank4k_1000 = bank % vromCount;
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
    s.chrBank4k_0000 = this.chrBank4k_0000;
    s.chrBank4k_1000 = this.chrBank4k_1000;
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
    this.chrBank4k_0000 = s.chrBank4k_0000 ?? 0;
    this.chrBank4k_1000 = s.chrBank4k_1000 ?? 1;
  }
}

export default Mapper1;
