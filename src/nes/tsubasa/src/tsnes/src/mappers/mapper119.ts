import Mapper4 from "./mapper4";
import Tile from "../tile";
import { copyArrayElements } from "../utils";

// TQROM - MMC3 variant that supports both CHR ROM and CHR RAM simultaneously
class Mapper119 extends Mapper4 {
  static mapperName = "TQROM";

  chrRam!: Uint8Array;
  chrRamTiles!: Tile[][];
  chrRamSlots!: number[];

  constructor(nes: any) {
    super(nes);

    this.chrRam = new Uint8Array(8192);

    this.chrRamTiles = new Array(8);
    for (let i = 0; i < 8; i++) {
      this.chrRamTiles[i] = new Array(64);
      for (let j = 0; j < 64; j++) {
        this.chrRamTiles[i][j] = new Tile();
      }
    }

    this.chrRamSlots = [-1, -1, -1, -1, -1, -1, -1, -1];
  }

  executeCommand(cmd: number, arg: number): void {
    switch (cmd) {
      case Mapper4.CMD_SEL_2_1K_VROM_0000: {
        let base = this.chrAddressSelect === 0 ? 0x0000 : 0x1000;
        if (arg & 0x40) {
          let bank = arg & 0x06;
          this.load1kChrRamBank(bank, base);
          this.load1kChrRamBank(bank + 1, base + 0x0400);
        } else {
          let bank = arg & 0x3f;
          this.saveChrRamSlot(base);
          this.saveChrRamSlot(base + 0x0400);
          this.chrRamSlots[base >> 10] = -1;
          this.chrRamSlots[(base >> 10) + 1] = -1;
          this.load1kVromBank(bank, base);
          this.load1kVromBank(bank + 1, base + 0x0400);
        }
        break;
      }

      case Mapper4.CMD_SEL_2_1K_VROM_0800: {
        let base = this.chrAddressSelect === 0 ? 0x0800 : 0x1800;
        if (arg & 0x40) {
          let bank = arg & 0x06;
          this.load1kChrRamBank(bank, base);
          this.load1kChrRamBank(bank + 1, base + 0x0400);
        } else {
          let bank = arg & 0x3f;
          this.saveChrRamSlot(base);
          this.saveChrRamSlot(base + 0x0400);
          this.chrRamSlots[base >> 10] = -1;
          this.chrRamSlots[(base >> 10) + 1] = -1;
          this.load1kVromBank(bank, base);
          this.load1kVromBank(bank + 1, base + 0x0400);
        }
        break;
      }

      case Mapper4.CMD_SEL_1K_VROM_1000: {
        let base = this.chrAddressSelect === 0 ? 0x1000 : 0x0000;
        if (arg & 0x40) {
          this.load1kChrRamBank(arg & 0x07, base);
        } else {
          this.saveChrRamSlot(base);
          this.chrRamSlots[base >> 10] = -1;
          this.load1kVromBank(arg & 0x3f, base);
        }
        break;
      }

      case Mapper4.CMD_SEL_1K_VROM_1400: {
        let base = this.chrAddressSelect === 0 ? 0x1400 : 0x0400;
        if (arg & 0x40) {
          this.load1kChrRamBank(arg & 0x07, base);
        } else {
          this.saveChrRamSlot(base);
          this.chrRamSlots[base >> 10] = -1;
          this.load1kVromBank(arg & 0x3f, base);
        }
        break;
      }

      case Mapper4.CMD_SEL_1K_VROM_1800: {
        let base = this.chrAddressSelect === 0 ? 0x1800 : 0x0800;
        if (arg & 0x40) {
          this.load1kChrRamBank(arg & 0x07, base);
        } else {
          this.saveChrRamSlot(base);
          this.chrRamSlots[base >> 10] = -1;
          this.load1kVromBank(arg & 0x3f, base);
        }
        break;
      }

      case Mapper4.CMD_SEL_1K_VROM_1C00: {
        let base = this.chrAddressSelect === 0 ? 0x1c00 : 0x0c00;
        if (arg & 0x40) {
          this.load1kChrRamBank(arg & 0x07, base);
        } else {
          this.saveChrRamSlot(base);
          this.chrRamSlots[base >> 10] = -1;
          this.load1kVromBank(arg & 0x3f, base);
        }
        break;
      }

      default:
        super.executeCommand(cmd, arg);
    }
  }

  saveChrRamSlot(address: number): void {
    let slot = address >> 10;
    let bank = this.chrRamSlots[slot];
    if (bank === -1) return;
    copyArrayElements(
      this.nes.ppu.vramMem,
      slot << 10,
      this.chrRam,
      bank * 1024,
      1024,
    );
  }

  load1kChrRamBank(bank: number, address: number): void {
    this.nes.ppu.triggerRendering();
    bank &= 0x07;

    this.saveChrRamSlot(address);

    let slot = address >> 10;
    this.chrRamSlots[slot] = bank;

    let srcOffset = bank * 1024;
    copyArrayElements(
      this.chrRam,
      srcOffset,
      this.nes.ppu.vramMem,
      address,
      1024,
    );

    this.rebuildChrRamTiles(bank);
    let baseIndex = address >> 4;
    for (let i = 0; i < 64; i++) {
      this.nes.ppu.ptTile[baseIndex + i] = this.chrRamTiles[bank][i];
    }
  }

  rebuildChrRamTiles(bank: number): void {
    let base = bank * 1024;
    for (let i = 0; i < 1024; i++) {
      let tileIndex = i >> 4;
      let leftOver = i % 16;
      if (leftOver < 8) {
        this.chrRamTiles[bank][tileIndex].setScanline(
          leftOver,
          this.chrRam[base + i],
          this.chrRam[base + i + 8],
        );
      } else {
        this.chrRamTiles[bank][tileIndex].setScanline(
          leftOver - 8,
          this.chrRam[base + i - 8],
          this.chrRam[base + i],
        );
      }
    }
  }

  canWriteChr(address: number): boolean {
    if (address >= 0x2000) return false;
    return this.chrRamSlots[address >> 10] !== -1;
  }

  toJSON(): any {
    for (let slot = 0; slot < 8; slot++) {
      this.saveChrRamSlot(slot << 10);
    }
    let s = super.toJSON();
    s.chrRam = Array.from(this.chrRam);
    s.chrRamSlots = this.chrRamSlots.slice();
    return s;
  }

  fromJSON(s: any): void {
    super.fromJSON(s);
    this.chrRam = new Uint8Array(s.chrRam);
    this.chrRamSlots = s.chrRamSlots;
    for (let bank = 0; bank < 8; bank++) {
      this.rebuildChrRamTiles(bank);
    }
    for (let slot = 0; slot < 8; slot++) {
      let bank = this.chrRamSlots[slot];
      if (bank !== -1) {
        let baseIndex = (slot << 10) >> 4;
        for (let i = 0; i < 64; i++) {
          this.nes.ppu.ptTile[baseIndex + i] = this.chrRamTiles[bank][i];
        }
      }
    }
  }
}

export default Mapper119;
