import Mapper0 from "./mapper0";
import { copyArrayElements } from "../utils";

interface PulseState {
  enabled: boolean;
  dutyCycle: number;
  lengthHalt: boolean;
  constantVolume: boolean;
  volume: number;
  timer: number;
  timerCounter: number;
  lengthCounter: number;
  envelopeCounter: number;
  envelopeDecay: number;
  envelopeStart: boolean;
  sequencePos: number;
}

// MMC5 / ExROM (EKROM, ELROM, ETROM, EWROM)
class Mapper5 extends Mapper0 {
  static mapperName = "MMC5";

  prgMode: number;
  prgBankReg: Uint8Array;
  prgRam: Uint8Array;
  prgRamProtectA: number;
  prgRamProtectB: number;
  chrMode: number;
  chrBankA: Uint16Array;
  chrBankB: Uint16Array;
  chrUpperBits: number;
  lastChrWrite: number;
  ntMapping: Uint8Array;
  exramMode: number;
  exram: Uint8Array;
  fillTile: number;
  fillAttr: number;
  irqTarget: number;
  irqEnabled: boolean;
  irqPending: boolean;
  inFrame: boolean;
  irqCounter: number;
  multA: number;
  multB: number;
  splitEnabled: boolean;
  splitRight: boolean;
  splitTile: number;
  splitScroll: number;
  splitPage: number;
  pulse1: PulseState;
  pulse2: PulseState;
  pcmValue: number;
  pcmReadMode: boolean;
  pcmIrqEnabled: boolean;
  audioEnabled: number;
  _chrBankTarget: number;

  constructor(nes: any) {
    super(nes);

    this.prgMode = 3;
    this.prgBankReg = new Uint8Array(5);
    this.prgBankReg[4] = 0xff;

    this.prgRam = new Uint8Array(0x10000);
    this.prgRamProtectA = 0x03;
    this.prgRamProtectB = 0x03;

    this.chrMode = 3;
    this.chrBankA = new Uint16Array(8);
    this.chrBankB = new Uint16Array(4);
    this.chrUpperBits = 0;
    this.lastChrWrite = 0;

    this.ntMapping = new Uint8Array(4);

    this.exramMode = 0;
    this.exram = new Uint8Array(0x400);

    this.fillTile = 0;
    this.fillAttr = 0;

    this.irqTarget = 0;
    this.irqEnabled = false;
    this.irqPending = false;
    this.inFrame = false;
    this.irqCounter = 0;

    this.multA = 0;
    this.multB = 0;

    this.splitEnabled = false;
    this.splitRight = false;
    this.splitTile = 0;
    this.splitScroll = 0;
    this.splitPage = 0;

    this.pulse1 = this._initPulse();
    this.pulse2 = this._initPulse();
    this.pcmValue = 0;
    this.pcmReadMode = false;
    this.pcmIrqEnabled = false;
    this.audioEnabled = 0;

    this._chrBankTarget = -1;
  }

  _initPulse(): PulseState {
    return {
      enabled: false,
      dutyCycle: 0,
      lengthHalt: false,
      constantVolume: false,
      volume: 0,
      timer: 0,
      timerCounter: 0,
      lengthCounter: 0,
      envelopeCounter: 0,
      envelopeDecay: 15,
      envelopeStart: false,
      sequencePos: 0,
    };
  }

  load(address: number): number {
    address &= 0xffff;

    if (address < 0x5000) {
      return super.load(address);
    }

    if (address === 0x5015) {
      let val = 0;
      if (this.pulse1.lengthCounter > 0) val |= 0x01;
      if (this.pulse2.lengthCounter > 0) val |= 0x02;
      return val;
    }

    if (address === 0x5010) {
      return 0;
    }

    if (address >= 0x5100 && address <= 0x5104) {
      return this.nes.cpu.dataBus;
    }

    if (address === 0x5105) {
      return this.nes.cpu.dataBus;
    }

    if (address === 0x5204) {
      let ppu = this.nes.ppu;
      let rendering =
        ppu.scanline >= 20 &&
        ppu.scanline <= 260 &&
        (ppu.f_bgVisibility === 1 || ppu.f_spVisibility === 1);
      if (!rendering) {
        this.inFrame = false;
      }

      let val = 0;
      if (this.irqPending) val |= 0x80;
      if (this.inFrame) val |= 0x40;
      this.irqPending = false;
      return val;
    }

    if (address === 0x5205) {
      return (this.multA * this.multB) & 0xff;
    }

    if (address === 0x5206) {
      return ((this.multA * this.multB) >> 8) & 0xff;
    }

    if (address >= 0x5c00 && address <= 0x5fff) {
      if (this.exramMode >= 2) {
        return this.exram[address - 0x5c00];
      }
      return this.nes.cpu.dataBus;
    }

    if (address < 0x6000) {
      return this.nes.cpu.dataBus;
    }

    if (address < 0x8000) {
      let bank = this.prgBankReg[0] & 0x07;
      let offset = bank * 0x2000 + (address - 0x6000);
      return this.prgRam[offset & 0xffff];
    }

    return this._readPrg(address);
  }

  _readPrg(address: number): number {
    let slot: number, reg: number, isRam: boolean, bank: number, base: number;

    switch (this.prgMode) {
      case 0:
        reg = this.prgBankReg[4];
        bank = (reg & 0x7c) >> 2;
        return this._readPrgRom32k(bank, address - 0x8000);

      case 1:
        if (address < 0xc000) {
          reg = this.prgBankReg[2];
          isRam = (reg & 0x80) === 0;
          if (isRam) {
            bank = (reg & 0x06) >> 1;
            return this.prgRam[bank * 0x4000 + (address - 0x8000)];
          }
          bank = (reg & 0x7e) >> 1;
          return this._readPrgRom16k(bank, address - 0x8000);
        } else {
          reg = this.prgBankReg[4];
          bank = (reg & 0x7e) >> 1;
          return this._readPrgRom16k(bank, address - 0xc000);
        }

      case 2:
        if (address < 0xc000) {
          reg = this.prgBankReg[2];
          isRam = (reg & 0x80) === 0;
          if (isRam) {
            bank = (reg & 0x06) >> 1;
            return this.prgRam[bank * 0x4000 + (address - 0x8000)];
          }
          bank = (reg & 0x7e) >> 1;
          return this._readPrgRom16k(bank, address - 0x8000);
        } else if (address < 0xe000) {
          reg = this.prgBankReg[3];
          isRam = (reg & 0x80) === 0;
          if (isRam) {
            bank = reg & 0x07;
            return this.prgRam[bank * 0x2000 + (address - 0xc000)];
          }
          bank = reg & 0x7f;
          return this._readPrgRom8k(bank, address - 0xc000);
        } else {
          reg = this.prgBankReg[4];
          bank = reg & 0x7f;
          return this._readPrgRom8k(bank, address - 0xe000);
        }

      case 3:
      default:
        if (address < 0xa000) {
          slot = 1;
        } else if (address < 0xc000) {
          slot = 2;
        } else if (address < 0xe000) {
          slot = 3;
        } else {
          slot = 4;
        }
        reg = this.prgBankReg[slot];
        base =
          slot === 1
            ? 0x8000
            : slot === 2
              ? 0xa000
              : slot === 3
                ? 0xc000
                : 0xe000;
        if (slot < 4 && (reg & 0x80) === 0) {
          bank = reg & 0x07;
          return this.prgRam[bank * 0x2000 + (address - base)];
        }
        bank = reg & 0x7f;
        return this._readPrgRom8k(bank, address - base);
    }
  }

  _readPrgRom32k(bank32k: number, offset: number): number {
    let bank16k =
      (bank32k * 2 + Math.floor(offset / 0x4000)) % this.nes.rom.romCount;
    let innerOffset = offset % 0x4000;
    return this.nes.rom.rom[bank16k][innerOffset];
  }

  _readPrgRom16k(bank16k: number, offset: number): number {
    bank16k %= this.nes.rom.romCount;
    return this.nes.rom.rom[bank16k][offset];
  }

  _readPrgRom8k(bank8k: number, offset: number): number {
    let bank16k = Math.floor(bank8k / 2) % this.nes.rom.romCount;
    let innerOffset = (bank8k % 2) * 0x2000 + offset;
    if (bank16k < this.nes.rom.romCount) {
      return this.nes.rom.rom[bank16k][innerOffset];
    }
    return 0;
  }

  write(address: number, value: number): void {
    if (address < 0x5000) {
      super.write(address, value);
      return;
    }

    if (address >= 0x5000 && address <= 0x5003) {
      this._writePulse(this.pulse1, address - 0x5000, value);
      return;
    }
    if (address >= 0x5004 && address <= 0x5007) {
      this._writePulse(this.pulse2, address - 0x5004, value);
      return;
    }
    if (address === 0x5010) {
      this.pcmReadMode = (value & 0x01) !== 0;
      this.pcmIrqEnabled = (value & 0x80) !== 0;
      return;
    }
    if (address === 0x5011) {
      if (!this.pcmReadMode && value !== 0) {
        this.pcmValue = value;
      }
      return;
    }
    if (address === 0x5015) {
      this.audioEnabled = value & 0x03;
      this.pulse1.enabled = (value & 0x01) !== 0;
      this.pulse2.enabled = (value & 0x02) !== 0;
      if (!this.pulse1.enabled) this.pulse1.lengthCounter = 0;
      if (!this.pulse2.enabled) this.pulse2.lengthCounter = 0;
      return;
    }

    if (address === 0x5100) {
      this.prgMode = value & 0x03;
      this._syncPrg();
      return;
    }

    if (address === 0x5101) {
      this.chrMode = value & 0x03;
      this._syncChr();
      return;
    }

    if (address === 0x5102) {
      this.prgRamProtectA = value & 0x03;
      return;
    }
    if (address === 0x5103) {
      this.prgRamProtectB = value & 0x03;
      return;
    }

    if (address === 0x5104) {
      this.exramMode = value & 0x03;
      this.bgTileOverride = this.exramMode === 1;
      this._syncNametables();
      return;
    }

    if (address === 0x5105) {
      let v = value;
      this.ntMapping[0] = v & 0x03;
      v >>= 2;
      this.ntMapping[1] = v & 0x03;
      v >>= 2;
      this.ntMapping[2] = v & 0x03;
      v >>= 2;
      this.ntMapping[3] = v & 0x03;
      this._syncNametables();
      return;
    }

    if (address === 0x5106) {
      this.fillTile = value;
      this._syncNametables();
      return;
    }

    if (address === 0x5107) {
      this.fillAttr = value & 0x03;
      this._syncNametables();
      return;
    }

    if (address === 0x5113) {
      this.prgBankReg[0] = value & 0x07;
      return;
    }

    if (address >= 0x5114 && address <= 0x5117) {
      let idx = address - 0x5113;
      this.prgBankReg[idx] = value;
      this._syncPrg();
      return;
    }

    if (address >= 0x5120 && address <= 0x5127) {
      let reg = address - 0x5120;
      this.chrBankA[reg] = (this.chrUpperBits << 8) | value;
      this.lastChrWrite = 0;
      this._syncChr();
      return;
    }

    if (address >= 0x5128 && address <= 0x512b) {
      let reg = address - 0x5128;
      this.chrBankB[reg] = (this.chrUpperBits << 8) | value;
      this.lastChrWrite = 1;
      this._syncChr();
      return;
    }

    if (address === 0x5130) {
      this.chrUpperBits = value & 0x03;
      return;
    }

    if (address === 0x5200) {
      this.splitEnabled = (value & 0x80) !== 0;
      this.splitRight = (value & 0x40) !== 0;
      this.splitTile = value & 0x1f;
      return;
    }

    if (address === 0x5201) {
      this.splitScroll = value;
      return;
    }

    if (address === 0x5202) {
      this.splitPage = value & 0x3f;
      return;
    }

    if (address === 0x5203) {
      this.irqTarget = value;
      return;
    }

    if (address === 0x5204) {
      this.irqEnabled = (value & 0x80) !== 0;
      if (this.irqEnabled && this.irqPending) {
        this.nes.cpu.requestIrq(this.nes.cpu.IRQ_NORMAL);
      }
      return;
    }

    if (address === 0x5205) {
      this.multA = value;
      return;
    }

    if (address === 0x5206) {
      this.multB = value;
      return;
    }

    if (address >= 0x5c00 && address <= 0x5fff) {
      let exAddr = address - 0x5c00;
      if (this.exramMode === 0 || this.exramMode === 1) {
        this.exram[exAddr] = this.inFrame ? value : 0x00;
        this._syncExramToVram(exAddr);
      } else if (this.exramMode === 2) {
        this.exram[exAddr] = value;
      }
      return;
    }

    if (address >= 0x6000 && address <= 0x7fff) {
      if (this.prgRamProtectA === 0x02 && this.prgRamProtectB === 0x01) {
        let bank = this.prgBankReg[0] & 0x07;
        let offset = bank * 0x2000 + (address - 0x6000);
        this.prgRam[offset & 0xffff] = value;
        this.nes.cpu.mem[address] = value;
        this.nes.opts.onBatteryRamWrite(address, value);
      }
      return;
    }

    if (address >= 0x8000) {
      this._writePrg(address, value);
      return;
    }
  }

  _writePrg(address: number, value: number): void {
    let slot: number, reg: number, isRam: boolean, bank: number, base: number;

    switch (this.prgMode) {
      case 0:
        return;

      case 1:
        if (address < 0xc000) {
          reg = this.prgBankReg[2];
          isRam = (reg & 0x80) === 0;
          if (isRam && this._isPrgRamWritable()) {
            bank = (reg & 0x06) >> 1;
            this.prgRam[bank * 0x4000 + (address - 0x8000)] = value;
          }
        }
        return;

      case 2:
        if (address < 0xc000) {
          reg = this.prgBankReg[2];
          isRam = (reg & 0x80) === 0;
          if (isRam && this._isPrgRamWritable()) {
            bank = (reg & 0x06) >> 1;
            this.prgRam[bank * 0x4000 + (address - 0x8000)] = value;
          }
        } else if (address < 0xe000) {
          reg = this.prgBankReg[3];
          isRam = (reg & 0x80) === 0;
          if (isRam && this._isPrgRamWritable()) {
            bank = reg & 0x07;
            this.prgRam[bank * 0x2000 + (address - 0xc000)] = value;
          }
        }
        return;

      case 3:
      default:
        if (address < 0xa000) {
          slot = 1;
          base = 0x8000;
        } else if (address < 0xc000) {
          slot = 2;
          base = 0xa000;
        } else if (address < 0xe000) {
          slot = 3;
          base = 0xc000;
        } else {
          return;
        }
        reg = this.prgBankReg[slot];
        isRam = (reg & 0x80) === 0;
        if (isRam && this._isPrgRamWritable()) {
          bank = reg & 0x07;
          this.prgRam[bank * 0x2000 + (address - base)] = value;
        }
        return;
    }
  }

  _isPrgRamWritable(): boolean {
    return this.prgRamProtectA === 0x02 && this.prgRamProtectB === 0x01;
  }

  _syncPrg(): void {
    switch (this.prgMode) {
      case 0: {
        let reg = this.prgBankReg[4];
        let bank = (reg & 0x7c) >> 2;
        this.load32kRomBank(bank, 0x8000);
        break;
      }
      case 1: {
        let regLo = this.prgBankReg[2];
        if (regLo & 0x80) {
          let bank16k = (regLo & 0x7e) >> 1;
          this.loadRomBank(bank16k % this.nes.rom.romCount, 0x8000);
        }

        let regHi = this.prgBankReg[4];
        let bank16kHi = (regHi & 0x7e) >> 1;
        this.loadRomBank(bank16kHi % this.nes.rom.romCount, 0xc000);
        break;
      }
      case 2: {
        let regA = this.prgBankReg[2];
        if (regA & 0x80) {
          let bank16k = (regA & 0x7e) >> 1;
          this.loadRomBank(bank16k % this.nes.rom.romCount, 0x8000);
        }

        let regB = this.prgBankReg[3];
        if (regB & 0x80) {
          this.load8kRomBank(regB & 0x7f, 0xc000);
        }

        let regC = this.prgBankReg[4];
        this.load8kRomBank(regC & 0x7f, 0xe000);
        break;
      }
      case 3:
      default: {
        for (let i = 1; i <= 4; i++) {
          let reg = this.prgBankReg[i];
          let addr = 0x6000 + i * 0x2000;
          if (i === 4 || reg & 0x80) {
            this.load8kRomBank(reg & 0x7f, addr);
          }
        }
        break;
      }
    }
  }

  _syncChr(): void {
    this.nes.ppu.triggerRendering();
    this._chrBankTarget = -1;

    if (this.nes.ppu.f_spriteSize === 0) {
      this._applyChrSetA();
      this._chrBankTarget = 0;
    }
  }

  _applyChrSetA(): void {
    if (this.nes.rom.vromCount === 0) return;

    switch (this.chrMode) {
      case 0:
        this.load8kVromBank((this.chrBankA[7] & 0xff) * 2, 0x0000);
        break;
      case 1:
        this.loadVromBank(this.chrBankA[3] & 0xff, 0x0000);
        this.loadVromBank(this.chrBankA[7] & 0xff, 0x1000);
        break;
      case 2:
        this.load2kVromBank(this.chrBankA[1] & 0x1ff, 0x0000);
        this.load2kVromBank(this.chrBankA[3] & 0x1ff, 0x0800);
        this.load2kVromBank(this.chrBankA[5] & 0x1ff, 0x1000);
        this.load2kVromBank(this.chrBankA[7] & 0x1ff, 0x1800);
        break;
      case 3:
      default:
        for (let i = 0; i < 8; i++) {
          this.load1kVromBank(this.chrBankA[i] & 0x3ff, i * 0x0400);
        }
        break;
    }
  }

  _applyChrSetB(): void {
    if (this.nes.rom.vromCount === 0) return;

    switch (this.chrMode) {
      case 0:
        this.load8kVromBank((this.chrBankB[3] & 0xff) * 2, 0x0000);
        break;
      case 1:
        this.loadVromBank(this.chrBankB[3] & 0xff, 0x0000);
        this.loadVromBank(this.chrBankB[3] & 0xff, 0x1000);
        break;
      case 2:
        this.load2kVromBank(this.chrBankB[1] & 0x1ff, 0x0000);
        this.load2kVromBank(this.chrBankB[3] & 0x1ff, 0x0800);
        this.load2kVromBank(this.chrBankB[1] & 0x1ff, 0x1000);
        this.load2kVromBank(this.chrBankB[3] & 0x1ff, 0x1800);
        break;
      case 3:
      default:
        for (let i = 0; i < 4; i++) {
          this.load1kVromBank(this.chrBankB[i] & 0x3ff, i * 0x0400);
          this.load1kVromBank(this.chrBankB[i] & 0x3ff, (i + 4) * 0x0400);
        }
        break;
    }
  }

  _syncNametables(): void {
    let ppu = this.nes.ppu;

    let fillAttrByte =
      this.fillAttr |
      (this.fillAttr << 2) |
      (this.fillAttr << 4) |
      (this.fillAttr << 6);
    for (let i = 0; i < 960; i++) {
      ppu.vramMem[0x2c00 + i] = this.fillTile;
    }
    for (let i = 960; i < 1024; i++) {
      ppu.vramMem[0x2c00 + i] = fillAttrByte;
    }

    if (this.exramMode >= 2) {
      for (let i = 0; i < 0x400; i++) {
        ppu.vramMem[0x2800 + i] = 0;
      }
    } else {
      copyArrayElements(this.exram, 0, ppu.vramMem, 0x2800, 0x400);
    }

    const sourceBase = [0x2000, 0x2400, 0x2800, 0x2c00];

    for (let nt = 0; nt < 4; nt++) {
      let logicalBase = 0x2000 + nt * 0x400;
      let physBase = sourceBase[this.ntMapping[nt]];
      ppu.defineMirrorRegion(logicalBase, physBase, 0x400);
    }

    ppu.defineMirrorRegion(0x3000, 0x2000, 0xf00);

    for (let nt = 0; nt < 4; nt++) {
      ppu.ntable1[nt] = this.ntMapping[nt];
    }

    this._populateNameTable(2, 0x2800);
    this._populateNameTable(3, 0x2c00);
  }

  _populateNameTable(ntIndex: number, vramBase: number): void {
    let ppu = this.nes.ppu;
    let nt = ppu.nameTable[ntIndex];

    for (let i = 0; i < 960; i++) {
      nt.tile[i] = ppu.vramMem[vramBase + i];
    }

    for (let i = 0; i < 64; i++) {
      nt.writeAttrib(i, ppu.vramMem[vramBase + 960 + i]);
    }
  }

  _syncExramToVram(exAddr: number): void {
    if (this.exramMode < 2) {
      let ppu = this.nes.ppu;
      ppu.vramMem[0x2800 + exAddr] = this.exram[exAddr];

      if (exAddr < 960) {
        ppu.nameTable[2].tile[exAddr] = this.exram[exAddr];
      } else if (exAddr < 1024) {
        ppu.nameTable[2].writeAttrib(exAddr - 960, this.exram[exAddr]);
      }
    }
  }

  _writePulse(pulse: PulseState, reg: number, value: number): void {
    switch (reg) {
      case 0:
        pulse.dutyCycle = (value >> 6) & 0x03;
        pulse.lengthHalt = (value & 0x20) !== 0;
        pulse.constantVolume = (value & 0x10) !== 0;
        pulse.volume = value & 0x0f;
        break;
      case 1:
        break;
      case 2:
        pulse.timer = (pulse.timer & 0x700) | value;
        break;
      case 3:
        pulse.timer = (pulse.timer & 0x0ff) | ((value & 0x07) << 8);
        if (pulse.enabled) {
          pulse.lengthCounter = this.nes.papu.getLengthMax(value);
        }
        pulse.envelopeStart = true;
        pulse.sequencePos = 0;
        break;
    }
  }

  clockIrqCounter(): void {
    let scanline = this.nes.ppu.scanline;

    if (scanline === 20) {
      this.inFrame = true;
      this.irqCounter = 0;
      return;
    }

    this.irqCounter++;
    if (this.irqTarget !== 0 && this.irqCounter === this.irqTarget) {
      this.irqPending = true;
      if (this.irqEnabled) {
        this.nes.cpu.requestIrq(this.nes.cpu.IRQ_NORMAL);
      }
    }

    if ((this.irqCounter & 3) === 0) {
      this._clockPulseLengthCounter(this.pulse1);
      this._clockPulseLengthCounter(this.pulse2);
    }
  }

  _clockPulseLengthCounter(pulse: PulseState): void {
    if (pulse.enabled && !pulse.lengthHalt && pulse.lengthCounter > 0) {
      pulse.lengthCounter--;
    }
  }

  onBgRender(): void {
    if (this.nes.ppu.f_spriteSize === 1 && this._chrBankTarget !== 1) {
      this._applyChrSetB();
      this._chrBankTarget = 1;
      this.nes.ppu.validTileData = false;
    }
  }

  onSpriteRender(): void {
    if (this.nes.ppu.f_spriteSize === 1 && this._chrBankTarget !== 0) {
      this._applyChrSetA();
      this._chrBankTarget = 0;
    }
  }

  getSpritePatternTile(index: number): any {
    if (this.nes.ppu.f_spriteSize !== 1 || this.nes.rom.vromCount === 0) {
      return this.nes.ppu.ptTile[index];
    }

    let vromCount = this.nes.rom.vromCount;
    let vromTile = this.nes.rom.vromTile;

    switch (this.chrMode) {
      case 0: {
        let bank4kStart = (this.chrBankA[7] & 0xff) * 2;
        let half = index >= 256 ? 1 : 0;
        let bank4k = (bank4kStart + half) % vromCount;
        return vromTile[bank4k][index - half * 256];
      }
      case 1: {
        let bank4k: number;
        if (index < 256) {
          bank4k = (this.chrBankA[3] & 0xff) % vromCount;
        } else {
          bank4k = (this.chrBankA[7] & 0xff) % vromCount;
        }
        return vromTile[bank4k][index % 256];
      }
      case 2: {
        let regIndex = [1, 3, 5, 7];
        let slot = index >> 7;
        let tileInSlot = index & 127;
        let bank2k = this.chrBankA[regIndex[slot]] & 0x1ff;
        let bank4k = Math.floor(bank2k / 2) % vromCount;
        return vromTile[bank4k][((bank2k % 2) << 7) + tileInSlot];
      }
      case 3:
      default: {
        let slot = index >> 6;
        let tileInSlot = index & 63;
        let bank1k = this.chrBankA[slot] & 0x3ff;
        let bank4k = Math.floor(bank1k / 4) % vromCount;
        return vromTile[bank4k][((bank1k % 4) << 6) + tileInSlot];
      }
    }
  }

  getBgTileData(baseTile: any, tileIndex: number, ht: number, vt: number): any {
    if (this.exramMode !== 1 || this.nes.rom.vromCount === 0) return null;

    let exAddr = vt * 32 + ht;
    let exByte = this.exram[exAddr];

    let chrBank4k = (exByte & 0x3f) | (this.chrUpperBits << 6);
    let bank4k = chrBank4k % this.nes.rom.vromCount;

    let tile = this.nes.rom.vromTile[bank4k][tileIndex];
    if (!tile) return null;

    let attrib = ((exByte >> 6) & 0x03) << 2;

    return { tile, attrib };
  }

  loadROM(): void {
    if (!this.nes.rom.valid) {
      throw new Error("MMC5: Invalid ROM! Unable to load.");
    }

    this.prgBankReg[4] = 0xff;
    this._syncPrg();

    this.loadCHRROM();

    this.loadBatteryRam();

    this._syncNametables();

    this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET);
  }

  toJSON(): any {
    let s = super.toJSON();
    s.prgMode = this.prgMode;
    s.prgBankReg = Array.from(this.prgBankReg);
    s.prgRam = Array.from(this.prgRam);
    s.prgRamProtectA = this.prgRamProtectA;
    s.prgRamProtectB = this.prgRamProtectB;
    s.chrMode = this.chrMode;
    s.chrBankA = Array.from(this.chrBankA);
    s.chrBankB = Array.from(this.chrBankB);
    s.chrUpperBits = this.chrUpperBits;
    s.lastChrWrite = this.lastChrWrite;
    s.ntMapping = Array.from(this.ntMapping);
    s.exramMode = this.exramMode;
    s.exram = Array.from(this.exram);
    s.fillTile = this.fillTile;
    s.fillAttr = this.fillAttr;
    s.irqTarget = this.irqTarget;
    s.irqEnabled = this.irqEnabled;
    s.irqPending = this.irqPending;
    s.inFrame = this.inFrame;
    s.irqCounter = this.irqCounter;
    s.multA = this.multA;
    s.multB = this.multB;
    s.splitEnabled = this.splitEnabled;
    s.splitRight = this.splitRight;
    s.splitTile = this.splitTile;
    s.splitScroll = this.splitScroll;
    s.splitPage = this.splitPage;
    s.pcmValue = this.pcmValue;
    s.pcmReadMode = this.pcmReadMode;
    s.pcmIrqEnabled = this.pcmIrqEnabled;
    s.audioEnabled = this.audioEnabled;
    s.pulse1 = Object.assign({}, this.pulse1);
    s.pulse2 = Object.assign({}, this.pulse2);
    return s;
  }

  fromJSON(s: any): void {
    super.fromJSON(s);
    this.prgMode = s.prgMode;
    this.prgBankReg = new Uint8Array(s.prgBankReg);
    this.prgRam = new Uint8Array(s.prgRam);
    this.prgRamProtectA = s.prgRamProtectA;
    this.prgRamProtectB = s.prgRamProtectB;
    this.chrMode = s.chrMode;
    this.chrBankA = new Uint16Array(s.chrBankA);
    this.chrBankB = new Uint16Array(s.chrBankB);
    this.chrUpperBits = s.chrUpperBits;
    this.lastChrWrite = s.lastChrWrite;
    this.ntMapping = new Uint8Array(s.ntMapping);
    this.exramMode = s.exramMode;
    this.exram = new Uint8Array(s.exram);
    this.fillTile = s.fillTile;
    this.fillAttr = s.fillAttr;
    this.irqTarget = s.irqTarget;
    this.irqEnabled = s.irqEnabled;
    this.irqPending = s.irqPending;
    this.inFrame = s.inFrame;
    this.irqCounter = s.irqCounter;
    this.multA = s.multA;
    this.multB = s.multB;
    this.splitEnabled = s.splitEnabled;
    this.splitRight = s.splitRight;
    this.splitTile = s.splitTile;
    this.splitScroll = s.splitScroll;
    this.splitPage = s.splitPage;
    this.pcmValue = s.pcmValue;
    this.pcmReadMode = s.pcmReadMode;
    this.pcmIrqEnabled = s.pcmIrqEnabled;
    this.audioEnabled = s.audioEnabled;
    if (s.pulse1) this.pulse1 = Object.assign(this._initPulse(), s.pulse1);
    if (s.pulse2) this.pulse2 = Object.assign(this._initPulse(), s.pulse2);

    this._syncPrg();
    this._syncChr();
    this._syncNametables();
  }
}

export default Mapper5;
