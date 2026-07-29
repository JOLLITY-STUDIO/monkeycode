import Mapper0 from "./mapper0";

// MMC3 / TxROM (TSROM, TLSROM, TQROM, etc.)
class Mapper4 extends Mapper0 {
  static mapperName = "MMC3";
  static CMD_SEL_2_1K_VROM_0000 = 0;
  static CMD_SEL_2_1K_VROM_0800 = 1;
  static CMD_SEL_1K_VROM_1000 = 2;
  static CMD_SEL_1K_VROM_1400 = 3;
  static CMD_SEL_1K_VROM_1800 = 4;
  static CMD_SEL_1K_VROM_1C00 = 5;
  static CMD_SEL_ROM_PAGE1 = 6;
  static CMD_SEL_ROM_PAGE2 = 7;

  command: number;
  prgAddressSelect: number;
  chrAddressSelect: number;
  pageNumber: number;
  irqCounter: number;
  irqLatchValue: number;
  irqEnable: number;
  prgAddressChanged: boolean;

  /** 8 PPU 1KB slot → CHR 1KB bank ID */
  chrBanks: Uint8Array;
  /** bank 的索引對應 PPU 地址:
   *  [0]=$0000 [1]=$0400 [2]=$0800 [3]=$0C00
   *  [4]=$1000 [5]=$1400 [6]=$1800 [7]=$1C00 */
  static PPU_ADDR_TO_SLOT: number[] = [0,1,2,3,4,5,6,7];
  /** 当前 PRG bank 映射: key=窗口基地址($8000/$A000/$C000/$E000), value=8KB bank index */
  prgBankMap: Record<number, number>;

  constructor(nes: any) {
    super(nes);
    this.command = 0;
    this.prgAddressSelect = 0;
    this.chrAddressSelect = 0;
    this.pageNumber = 0;
    this.irqCounter = 0;
    this.irqLatchValue = 0;
    this.irqEnable = 0;
    this.prgAddressChanged = false;
    this.chrBanks = new Uint8Array(8);
    this.prgBankMap = { 0x8000: 0, 0xA000: 1, 0xC000: 30, 0xE000: 31 };
  }

  write(address: number, value: number): void {
    if (address < 0x8000) {
      super.write(address, value);
      return;
    }

    switch (address & 0xe001) {
      case 0x8000: {
        this.command = value & 7;
        const tmp = (value >> 6) & 1;
        if (tmp !== this.prgAddressSelect) {
          this.prgAddressChanged = true;
        }
        this.prgAddressSelect = tmp;
        this.chrAddressSelect = (value >> 7) & 1;
        break;
      }

      case 0x8001:
        this.executeCommand(this.command, value);
        break;

      case 0xa000:
        if ((value & 1) !== 0) {
          this.nes.ppu.setMirroring(this.nes.rom.HORIZONTAL_MIRRORING);
        } else {
          this.nes.ppu.setMirroring(this.nes.rom.VERTICAL_MIRRORING);
        }
        break;

      case 0xa001:
        // SaveRAM Toggle
        break;

      case 0xc000:
        this.irqCounter = value;
        break;

      case 0xc001:
        this.irqLatchValue = value;
        break;

      case 0xe000:
        this.irqEnable = 0;
        break;

      case 0xe001:
        this.irqEnable = 1;
        break;
    }
  }

  executeCommand(cmd: number, arg: number): void {
    switch (cmd) {
      case Mapper4.CMD_SEL_2_1K_VROM_0000:
        if (this.chrAddressSelect === 0) {
          this.chrBanks[0] = arg;
          this.chrBanks[1] = arg + 1;
          this.load1kVromBank(arg, 0x0000);
          this.load1kVromBank(arg + 1, 0x0400);
        } else {
          this.chrBanks[4] = arg;
          this.chrBanks[5] = arg + 1;
          this.load1kVromBank(arg, 0x1000);
          this.load1kVromBank(arg + 1, 0x1400);
        }
        break;

      case Mapper4.CMD_SEL_2_1K_VROM_0800:
        if (this.chrAddressSelect === 0) {
          this.chrBanks[2] = arg;
          this.chrBanks[3] = arg + 1;
          this.load1kVromBank(arg, 0x0800);
          this.load1kVromBank(arg + 1, 0x0c00);
        } else {
          this.chrBanks[6] = arg;
          this.chrBanks[7] = arg + 1;
          this.load1kVromBank(arg, 0x1800);
          this.load1kVromBank(arg + 1, 0x1c00);
        }
        break;

      case Mapper4.CMD_SEL_1K_VROM_1000:
        if (this.chrAddressSelect === 0) {
          this.chrBanks[4] = arg;
          this.load1kVromBank(arg, 0x1000);
        } else {
          this.chrBanks[0] = arg;
          this.load1kVromBank(arg, 0x0000);
        }
        break;

      case Mapper4.CMD_SEL_1K_VROM_1400:
        if (this.chrAddressSelect === 0) {
          this.chrBanks[5] = arg;
          this.load1kVromBank(arg, 0x1400);
        } else {
          this.chrBanks[1] = arg;
          this.load1kVromBank(arg, 0x0400);
        }
        break;

      case Mapper4.CMD_SEL_1K_VROM_1800:
        if (this.chrAddressSelect === 0) {
          this.chrBanks[6] = arg;
          this.load1kVromBank(arg, 0x1800);
        } else {
          this.chrBanks[2] = arg;
          this.load1kVromBank(arg, 0x0800);
        }
        break;

      case Mapper4.CMD_SEL_1K_VROM_1C00:
        if (this.chrAddressSelect === 0) {
          this.chrBanks[7] = arg;
          this.load1kVromBank(arg, 0x1c00);
        } else {
          this.chrBanks[3] = arg;
          this.load1kVromBank(arg, 0x0c00);
        }
        break;

      case Mapper4.CMD_SEL_ROM_PAGE1:
        if (this.prgAddressChanged) {
          const fixedBank = (this.nes.rom.romCount - 1) * 2;
          if (this.prgAddressSelect === 0) {
            this.load8kRomBank(fixedBank, 0xc000);
            this.prgBankMap[0xC000] = fixedBank;
          } else {
            this.load8kRomBank(fixedBank, 0x8000);
            this.prgBankMap[0x8000] = fixedBank;
          }
          this.prgAddressChanged = false;
        }

        if (this.prgAddressSelect === 0) {
          this.load8kRomBank(arg, 0x8000);
          this.prgBankMap[0x8000] = arg;
        } else {
          this.load8kRomBank(arg, 0xc000);
          this.prgBankMap[0xC000] = arg;
        }
        break;

      case Mapper4.CMD_SEL_ROM_PAGE2:
        this.load8kRomBank(arg, 0xa000);
        this.prgBankMap[0xA000] = arg;

        if (this.prgAddressChanged) {
          const fixedBank = (this.nes.rom.romCount - 1) * 2;
          if (this.prgAddressSelect === 0) {
            this.load8kRomBank(fixedBank, 0xc000);
            this.prgBankMap[0xC000] = fixedBank;
          } else {
            this.load8kRomBank(fixedBank, 0x8000);
            this.prgBankMap[0x8000] = fixedBank;
          }
          this.prgAddressChanged = false;
        }
    }
  }

  loadROM(): void {
    if (!this.nes.rom.valid) {
      throw new Error("MMC3: Invalid ROM! Unable to load.");
    }

    const lastBank = (this.nes.rom.romCount - 1) * 2;
    this.load8kRomBank(lastBank, 0xc000);
    this.prgBankMap[0xC000] = lastBank;
    this.load8kRomBank(lastBank + 1, 0xe000);
    this.prgBankMap[0xE000] = lastBank + 1;
    this.load8kRomBank(0, 0x8000);
    this.prgBankMap[0x8000] = 0;
    this.load8kRomBank(1, 0xa000);
    this.prgBankMap[0xA000] = 1;
    this.loadCHRROM();
    this.loadBatteryRam();
    this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET);
  }

  clockIrqCounter(): void {
    if (this.irqEnable === 1) {
      this.irqCounter--;
      if (this.irqCounter < 0) {
        this.nes.cpu.requestIrq(this.nes.cpu.IRQ_NORMAL);
        this.irqCounter = this.irqLatchValue;
      }
    }
  }

  toJSON(): any {
    let s = super.toJSON();
    s.command = this.command;
    s.prgAddressSelect = this.prgAddressSelect;
    s.chrAddressSelect = this.chrAddressSelect;
    s.pageNumber = this.pageNumber;
    s.irqCounter = this.irqCounter;
    s.irqLatchValue = this.irqLatchValue;
    s.irqEnable = this.irqEnable;
    s.prgAddressChanged = this.prgAddressChanged;
    s.chrBanks = Array.from(this.chrBanks);
    s.prgBankMap = { ...this.prgBankMap };
    return s;
  }

  fromJSON(s: any): void {
    super.fromJSON(s);
    this.command = s.command;
    this.prgAddressSelect = s.prgAddressSelect;
    this.chrAddressSelect = s.chrAddressSelect;
    this.pageNumber = s.pageNumber;
    this.irqCounter = s.irqCounter;
    this.irqLatchValue = s.irqLatchValue;
    this.irqEnable = s.irqEnable;
    this.prgAddressChanged = s.prgAddressChanged;
    if (s.chrBanks) this.chrBanks.set(s.chrBanks);
    if (s.prgBankMap) this.prgBankMap = { ...s.prgBankMap };
  }

  getChrBankMap(): Uint8Array | null {
    return this.chrBanks;
  }

  /** 返回当前 PRG 8KB bank 映射 (window base → bank index) */
  getPrgBankMap(): Record<number, number> {
    return this.prgBankMap;
  }
}

export default Mapper4;
