import { copyArrayElements } from "../utils";

// NROM - the simplest NES cartridge board (NES-NROM-128/NROM-256)
class Mapper0 {
  static mapperName = "NROM";

  nes: any;
  joy1StrobeState: number;
  joy2StrobeState: number;
  joypadLastWrite: number;
  joypadOutputBit0: number;
  joypadLastWriteCycle: number;
  zapperFired: boolean;
  zapperX: number | null;
  zapperY: number | null;
  bgTileOverride: boolean;

  constructor(nes: any) {
    this.nes = nes;

    this.joy1StrobeState = 0;
    this.joy2StrobeState = 0;
    this.joypadLastWrite = 0;
    this.joypadOutputBit0 = 0;
    this.joypadLastWriteCycle = -2;

    this.zapperFired = false;
    this.zapperX = null;
    this.zapperY = null;
    this.bgTileOverride = false;
  }

  write(address: number, value: number): void {
    if (address < 0x2000) {
      this.nes.cpu.mem[address & 0x7ff] = value;
    } else if (address >= 0x8000) {
      // ROM is not writable. Mappers may override this to handle bank switching.
    } else if (address >= 0x6000) {
      this.nes.cpu.mem[address] = value;
      this.nes.opts.onBatteryRamWrite(address, value);
    } else if (address > 0x4017) {
      this.nes.cpu.mem[address] = value;
    } else if (address > 0x2007 && address < 0x4000) {
      this.regWrite(0x2000 + (address & 0x7), value);
    } else {
      this.regWrite(address, value);
    }
  }

  writelow(address: number, value: number): void {
    if (address < 0x2000) {
      this.nes.cpu.mem[address & 0x7ff] = value;
    } else if (address >= 0x8000) {
      // ROM is not writable
    } else if (address > 0x4017) {
      this.nes.cpu.mem[address] = value;
    } else if (address > 0x2007 && address < 0x4000) {
      this.regWrite(0x2000 + (address & 0x7), value);
    } else {
      this.regWrite(address, value);
    }
  }

  load(address: number): number {
    address &= 0xffff;

    if (address > 0x4017) {
      if (address < 0x6000) {
        return this.nes.cpu.dataBus;
      }
      return this.nes.cpu.mem[address];
    } else if (address >= 0x2000) {
      return this.regLoad(address);
    } else {
      return this.nes.cpu.mem[address & 0x7ff];
    }
  }

  regLoad(address: number): number {
    switch (address >> 12) {
      case 0:
        break;

      case 1:
        break;

      case 2:
      case 3:
        switch (address & 0x7) {
          case 0x0:
            return this.nes.ppu.openBusLatch;

          case 0x1:
            return this.nes.ppu.openBusLatch;

          case 0x2:
            return this.nes.ppu.readStatusRegister();

          case 0x3:
            return this.nes.ppu.openBusLatch;

          case 0x4:
            return this.nes.ppu.sramLoad();

          case 0x5:
            return this.nes.ppu.openBusLatch;

          case 0x6:
            return this.nes.ppu.openBusLatch;

          case 0x7:
            return this.nes.ppu.vramLoad();
        }
        break;
      case 4:
        switch (address - 0x4015) {
          case 0:
            return this.nes.papu.readReg(address);

          case 1:
            return (this.joy1Read() & 0x1f) | (this.nes.cpu.dataBus & 0xe0);

          case 2: {
            let w = 0;

            if (this.zapperX !== null && this.zapperY !== null) {
              if (!this.nes.ppu.isPixelWhite(this.zapperX, this.zapperY)) {
                w = 0x1 << 3;
              }
            }

            if (this.zapperFired) {
              w |= 0x1 << 4;
            }
            return (
              ((this.joy2Read() | w) & 0x1f) | (this.nes.cpu.dataBus & 0xe0)
            );
          }
        }
        break;
    }
    let cpu = this.nes.cpu;
    if (
      cpu._dmcFetchCycles > 0 &&
      cpu._dmcFetchCycles === cpu.instrBusCycles + 1
    ) {
      let dmc = this.nes.papu.dmc;
      if (dmc && dmc.isEnabled) {
        return dmc.lastFetchedByte;
      }
    }
    return cpu.dataBus;
  }

  regWrite(address: number, value: number): void {
    if (address >= 0x2000 && address <= 0x3fff) {
      this.nes.ppu.openBusLatch = value;
      this.nes.ppu.openBusDecayFrames = 36;
    }

    switch (address) {
      case 0x2000:
        this.nes.cpu.mem[address] = value;
        this.nes.ppu.updateControlReg1(value);
        break;

      case 0x2001:
        this.nes.cpu.mem[address] = value;
        this.nes.ppu.updateControlReg2(value);
        break;

      case 0x2003:
        this.nes.ppu.writeSRAMAddress(value);
        break;

      case 0x2004:
        this.nes.ppu.sramWrite(value);
        break;

      case 0x2005:
        this.nes.ppu.scrollWrite(value);
        break;

      case 0x2006:
        this.nes.ppu.writeVRAMAddress(value);
        break;

      case 0x2007:
        this.nes.ppu.vramWrite(value);
        break;

      case 0x4014:
        this.nes.ppu.sramDMA(value);
        break;

      case 0x4015:
        this.nes.papu.writeReg(address, value);
        break;

      case 0x4016: {
        let cpu = this.nes.cpu;
        let currentCycle = cpu._cpuCycleBase + cpu.instrBusCycles;

        if (currentCycle - this.joypadLastWriteCycle > 1) {
          let prevBit = this.joypadLastWrite & 1;
          if (prevBit !== this.joypadOutputBit0) {
            if (this.joypadOutputBit0 === 1 && prevBit === 0) {
              this.joy1StrobeState = 0;
              this.joy2StrobeState = 0;
            }
            this.joypadOutputBit0 = prevBit;
          }
        }

        this.joypadLastWrite = value;
        this.joypadLastWriteCycle = currentCycle;

        if (currentCycle % 2 === 1) {
          let newBit = value & 1;
          if (this.joypadOutputBit0 === 1 && newBit === 0) {
            this.joy1StrobeState = 0;
            this.joy2StrobeState = 0;
          }
          this.joypadOutputBit0 = newBit;
        }
        break;
      }

      case 0x4017:
        this.nes.papu.writeReg(address, value);
        break;

      default:
        if (address >= 0x4000 && address <= 0x4017) {
          this.nes.papu.writeReg(address, value);
        }
    }
  }

  _syncJoypadOutput(): void {
    let newBit = this.joypadLastWrite & 1;
    if (newBit !== this.joypadOutputBit0) {
      if (this.joypadOutputBit0 === 1 && newBit === 0) {
        this.joy1StrobeState = 0;
        this.joy2StrobeState = 0;
      }
      this.joypadOutputBit0 = newBit;
    }
  }

  joy1Read(): number {
    this._syncJoypadOutput();

    if (this.joypadOutputBit0) {
      return this.nes.controllers[1].state[0];
    }

    let ret: number;
    if (this.joy1StrobeState < 8) {
      ret = this.nes.controllers[1].state[this.joy1StrobeState];
    } else {
      ret = 1;
    }

    this.joy1StrobeState++;
    if (this.joy1StrobeState === 24) {
      this.joy1StrobeState = 0;
    }

    return ret;
  }

  joy2Read(): number {
    this._syncJoypadOutput();

    if (this.joypadOutputBit0) {
      return this.nes.controllers[2].state[0];
    }

    let ret: number;
    if (this.joy2StrobeState < 8) {
      ret = this.nes.controllers[2].state[this.joy2StrobeState];
    } else {
      ret = 1;
    }

    this.joy2StrobeState++;
    if (this.joy2StrobeState === 24) {
      this.joy2StrobeState = 0;
    }

    return ret;
  }

  loadROM(): void {
    if (!this.nes.rom.valid || this.nes.rom.romCount < 1) {
      throw new Error("NoMapper: Invalid ROM! Unable to load.");
    }

    this.loadPRGROM();
    this.loadCHRROM();
    this.loadBatteryRam();
    this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET);
  }

  loadPRGROM(): void {
    if (this.nes.rom.romCount > 1) {
      this.loadRomBank(0, 0x8000);
      this.loadRomBank(1, 0xc000);
    } else {
      this.loadRomBank(0, 0x8000);
      this.loadRomBank(0, 0xc000);
    }
  }

  loadCHRROM(): void {
    if (this.nes.rom.vromCount > 0) {
      if (this.nes.rom.vromCount === 1) {
        this.loadVromBank(0, 0x0000);
        this.loadVromBank(0, 0x1000);
      } else {
        this.loadVromBank(0, 0x0000);
        this.loadVromBank(1, 0x1000);
      }
    }
  }

  loadBatteryRam(): void {
    if (this.nes.rom.batteryRam) {
      let ram = this.nes.rom.batteryRam;
      if (ram !== null && ram.length === 0x2000) {
        copyArrayElements(ram, 0, this.nes.cpu.mem, 0x6000, 0x2000);
      }
    }
  }

  loadRomBank(bank: number, address: number): void {
    bank %= this.nes.rom.romCount;
    copyArrayElements(
      this.nes.rom.rom[bank],
      0,
      this.nes.cpu.mem,
      address,
      16384,
    );
  }

  loadVromBank(bank: number, address: number): void {
    if (this.nes.rom.vromCount === 0) {
      return;
    }
    this.nes.ppu.triggerRendering();

    copyArrayElements(
      this.nes.rom.vrom[bank % this.nes.rom.vromCount],
      0,
      this.nes.ppu.vramMem,
      address,
      4096,
    );

    let vromTile = this.nes.rom.vromTile[bank % this.nes.rom.vromCount];
    copyArrayElements(vromTile, 0, this.nes.ppu.ptTile, address >> 4, 256);
  }

  load32kRomBank(bank: number, address: number): void {
    this.loadRomBank((bank * 2) % this.nes.rom.romCount, address);
    this.loadRomBank((bank * 2 + 1) % this.nes.rom.romCount, address + 16384);
  }

  load8kVromBank(bank4kStart: number, address: number): void {
    if (this.nes.rom.vromCount === 0) {
      return;
    }
    this.nes.ppu.triggerRendering();

    this.loadVromBank(bank4kStart % this.nes.rom.vromCount, address);
    this.loadVromBank(
      (bank4kStart + 1) % this.nes.rom.vromCount,
      address + 4096,
    );
  }

  load1kVromBank(bank1k: number, address: number): void {
    if (this.nes.rom.vromCount === 0) {
      return;
    }
    this.nes.ppu.triggerRendering();

    let bank4k = Math.floor(bank1k / 4) % this.nes.rom.vromCount;
    let bankoffset = (bank1k % 4) * 1024;
    copyArrayElements(
      this.nes.rom.vrom[bank4k],
      bankoffset,
      this.nes.ppu.vramMem,
      address,
      1024,
    );

    let vromTile = this.nes.rom.vromTile[bank4k];
    let baseIndex = address >> 4;
    for (let i = 0; i < 64; i++) {
      this.nes.ppu.ptTile[baseIndex + i] = vromTile[((bank1k % 4) << 6) + i];
    }
  }

  load2kVromBank(bank2k: number, address: number): void {
    if (this.nes.rom.vromCount === 0) {
      return;
    }
    this.nes.ppu.triggerRendering();

    let bank4k = Math.floor(bank2k / 2) % this.nes.rom.vromCount;
    let bankoffset = (bank2k % 2) * 2048;
    copyArrayElements(
      this.nes.rom.vrom[bank4k],
      bankoffset,
      this.nes.ppu.vramMem,
      address,
      2048,
    );

    let vromTile = this.nes.rom.vromTile[bank4k];
    let baseIndex = address >> 4;
    for (let i = 0; i < 128; i++) {
      this.nes.ppu.ptTile[baseIndex + i] = vromTile[((bank2k % 2) << 7) + i];
    }
  }

  load8kRomBank(bank8k: number, address: number): void {
    const rom = this.nes.rom.rom;
    const count = this.nes.rom.romCount;

    // 自动识别 bank 单位：8KB bank 直接用；16KB bank 拆半取
    if (rom[0] && rom[0].length === 8192) {
      // 每个 bank 就是 8KB，直接索引
      const idx = bank8k % count;
      copyArrayElements(rom[idx], 0, this.nes.cpu.mem, address, 8192);
    } else {
      // 每个 bank 是 16KB，拆半
      const bank16k = Math.floor(bank8k / 2) % count;
      const offset = (bank8k % 2) * 8192;
      copyArrayElements(rom[bank16k], offset, this.nes.cpu.mem, address, 8192);
    }
  }

  canWriteChr(_address: number): boolean {
    return this.nes.rom.vromCount === 0;
  }

  clockIrqCounter(): void {
    // Does nothing. This is used by the MMC3 mapper.
  }

  latchAccess(_address: number): void {
    // Does nothing. This is used by MMC2.
  }

  onBgRender(): void {}

  onSpriteRender(): void {}

  getBgTileData(_baseTile?: any, _tileIndex?: number, _ht?: number, _vt?: number): null {
    return null;
  }

  getSpritePatternTile(index: number): any {
    return this.nes.ppu.ptTile[index];
  }

  toJSON(): any {
    return {
      joy1StrobeState: this.joy1StrobeState,
      joy2StrobeState: this.joy2StrobeState,
      joypadLastWrite: this.joypadLastWrite,
      joypadOutputBit0: this.joypadOutputBit0,
      joypadLastWriteCycle: this.joypadLastWriteCycle,
    };
  }

  fromJSON(s: any): void {
    this.joy1StrobeState = s.joy1StrobeState;
    this.joy2StrobeState = s.joy2StrobeState;
    this.joypadLastWrite = s.joypadLastWrite;
    this.joypadOutputBit0 = s.joypadOutputBit0 || 0;
    this.joypadLastWriteCycle = s.joypadLastWriteCycle ?? -2;
  }
}

export default Mapper0;
