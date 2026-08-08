/**
 * 音频专用 Mapper — MMC3 PRG bank 处理 + APU/控制寄存器。
 * 无 PPU、无 CHR、无视频。
 */

import { copyArrayElements } from "./utils";

const CMD_SEL_ROM_PAGE1 = 6;
const CMD_SEL_ROM_PAGE2 = 7;

export class MapperAudio {
  static JSON_PROPERTIES = [
    "joy1StrobeState", "joy2StrobeState",
    "joypadLastWrite", "joypadOutputBit0", "joypadLastWriteCycle",
    "command", "prgAddressSelect", "chrAddressSelect",
    "irqCounter", "irqLatchValue", "irqEnable",
    "prgAddressChanged", "prgBankMap",
  ];

  nes: any;

  // ── 手柄状态 ──
  joy1StrobeState = 0;
  joy2StrobeState = 0;
  joypadLastWrite = 0;
  joypadOutputBit0 = 0;
  joypadLastWriteCycle = -2;

  // ── MMC3 寄存器 ──
  command = 0;
  prgAddressSelect = 0;
  chrAddressSelect = 0;
  irqCounter = 0;
  irqLatchValue = 0;
  irqEnable = 0;
  prgAddressChanged = false;

  prgBankMap: Record<number, number> = { 0x8000: 0, 0xA000: 1, 0xC000: 30, 0xE000: 31 };

  constructor(nes: any) {
    this.nes = nes;
  }

  // ═══════════════ 读 ═══════════════

  load(address: number): number {
    address &= 0xffff;

    if (address < 0x2000) {
      return this.nes.cpu.mem[address & 0x7ff];
    }

    if (address >= 0x2000 && address < 0x4000) {
      return this._regLoad(address);
    }

    if (address >= 0x4000 && address < 0x4018) {
      return this._regLoad(address);
    }

    // 0x4020+ → WRAM / 空
    return this.nes.cpu.mem[address] ?? 0;
  }

  // ═══════════════ 写 ═══════════════

  write(address: number, value: number): void {
    if (address < 0x2000) {
      this.nes.cpu.mem[address & 0x7ff] = value;
      return;
    }

    if (address >= 0x8000) {
      this._mmc3Write(address, value);
      return;
    }

    if (address >= 0x6000) {
      this.nes.cpu.mem[address] = value;
      return;
    }

    if (address >= 0x2000 && address < 0x4000) {
      this._ppuRegWrite(address, value);
      return;
    }

    this._regWrite(address, value);
  }

  private _ppuRegWrite(address: number, value: number): void {
    switch (address & 0x2007) {
      case 0x2000: this.nes.ppu.updateControlReg1(value); break;
      case 0x2001: this.nes.ppu.updateControlReg2(value); break;
      case 0x2003: this.nes.ppu.writeSRAMAddress(value); break;
      case 0x2004: this.nes.ppu.sramWrite(value); break;
      case 0x2005: this.nes.ppu.scrollWrite(value); break;
      case 0x2006: this.nes.ppu.writeVRAMAddress(value); break;
      case 0x2007: this.nes.ppu.vramWrite(value); break;
    }
  }

  private _regLoad(address: number): number {
    // PPU 寄存器
    if (address >= 0x2000 && address < 0x4000) {
      const a = address & 0x2007;
      if (a === 0x2002) return this.nes.ppu.readStatusRegister();
      return this.nes.ppu.openBusLatch;
    }

    // APU 状态寄存器
    if (address === 0x4015) {
      return this.nes.papu.readReg(address);
    }

    // 手柄 1
    if (address === 0x4016) {
      return this._joy1Read() & 0x1f;
    }

    // 手柄 2
    if (address === 0x4017) {
      return this._joy2Read() & 0x1f;
    }

    return this.nes.cpu.dataBus & 0xff;
  }

  private _regWrite(address: number, value: number): void {
    // 裁剪地址如果 > 4017
    if (address > 0x4017) return;

    switch (address) {
      case 0x4014: {
        // OAM DMA → 占用 CPU 周期进行 DMA（然后丢弃数据）
        this.nes.ppu.sramDMA(value, this.nes.cpu);
        break;
      }
      case 0x4015:
      case 0x4017:
        this.nes.papu.writeReg(address, value);
        break;
      case 0x4016: {
        // 手柄 strobe → 无操作
        this._write4016(value);
        break;
      }
      default:
        // 剩余的 APU 寄存器：$4000-$4013
        if (address >= 0x4000 && address < 0x4014) {
          this.nes.papu.writeReg(address, value);
        }
    }
  }

  // ═══════════════ MMC3 ─────────────────────

  private _mmc3Write(address: number, value: number): void {
    switch (address & 0xe001) {
      case 0x8000: {
        this.command = value & 7;
        this.prgAddressSelect = (value >> 6) & 1;
        this.chrAddressSelect = (value >> 7) & 1;
        break;
      }
      case 0x8001:
        this._mmc3Command(this.command, value);
        break;
      case 0xa000:
        // 镜像 → 不关心
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

  private _mmc3Command(cmd: number, arg: number): void {
    // CHR 命令 → 无操作
    if (cmd <= 5) return;

    switch (cmd) {
      case CMD_SEL_ROM_PAGE1: {
        if (this.prgAddressSelect === 0) {
          this._load8kBank(arg, 0x8000);
          this.prgBankMap[0x8000] = arg;
        } else {
          this._load8kBank(arg, 0xC000);
          this.prgBankMap[0xC000] = arg;
        }
        break;
      }
      case CMD_SEL_ROM_PAGE2: {
        this._load8kBank(arg, 0xA000);
        this.prgBankMap[0xA000] = arg;
        break;
      }
    }
  }

  // ═══════════════ 银行加载 ─────────────────

  loadROM(): void {
    if (!this.nes.rom.valid) {
      throw new Error("MapperAudio: invalid ROM");
    }
    const count = this.nes.rom.romCount;
    // 假设 8KB bank
    const lastBank = (count - 1) * 2;  // 倒数第二个 8KB
    this._load8kBank(lastBank, 0xC000);
    this.prgBankMap[0xC000] = lastBank;
    this._load8kBank(lastBank + 1, 0xE000);
    this.prgBankMap[0xE000] = lastBank + 1;
    this._load8kBank(0, 0x8000);
    this.prgBankMap[0x8000] = 0;
    this._load8kBank(1, 0xA000);
    this.prgBankMap[0xA000] = 1;

    // 不加载 CHR；不加载电池。
    this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET);
  }

  private _load8kBank(bank8k: number, address: number): void {
    const rom = this.nes.rom.rom;
    if (!rom || rom.length === 0) return;
    // 检测 bank 大小：8KB 还是 16KB
    const count = rom.length;
    const bankSize = rom[0]?.length ?? 0;
    if (bankSize === 8192) {
      // 已经是 8KB
      const idx = bank8k % count;
      copyArrayElements(rom[idx], 0, this.nes.cpu.mem, address, 8192);
    } else if (bankSize === 16384) {
      // 16KB → 拆成两半
      const b16 = Math.floor(bank8k / 2) % count;
      const off = (bank8k % 2) * 8192;
      copyArrayElements(rom[b16], off, this.nes.cpu.mem, address, 8192);
    }
  }

  // ═══════════════ 手柄 ═══════════════

  private _joy1Read(): number {
    // 总是返回 0（无按键）。开头的 BGM 不需要手柄。
    return 0;
  }

  private _joy2Read(): number {
    return 0;
  }

  private _write4016(value: number): void {
    // 无操作
  }

  // ═══════════════ 其他 ─────────────────

  clockIrqCounter(): void {
    // MMC3 扫描线 IRQ——对纯音频来说不相关。
  }

  // 序列化
  toJSON(): any {
    return {
      joy1StrobeState: this.joy1StrobeState,
      joy2StrobeState: this.joy2StrobeState,
      joypadLastWrite: this.joypadLastWrite,
      joypadOutputBit0: this.joypadOutputBit0,
      joypadLastWriteCycle: this.joypadLastWriteCycle,
      command: this.command,
      prgAddressSelect: this.prgAddressSelect,
      chrAddressSelect: this.chrAddressSelect,
      irqCounter: this.irqCounter,
      irqLatchValue: this.irqLatchValue,
      irqEnable: this.irqEnable,
      prgAddressChanged: this.prgAddressChanged,
      prgBankMap: { ...this.prgBankMap },
    };
  }

  fromJSON(s: any): void {
    this.joy1StrobeState = s.joy1StrobeState ?? 0;
    this.joy2StrobeState = s.joy2StrobeState ?? 0;
    this.joypadLastWrite = s.joypadLastWrite ?? 0;
    this.joypadOutputBit0 = s.joypadOutputBit0 ?? 0;
    this.joypadLastWriteCycle = s.joypadLastWriteCycle ?? -2;
    this.command = s.command ?? 0;
    this.prgAddressSelect = s.prgAddressSelect ?? 0;
    this.chrAddressSelect = s.chrAddressSelect ?? 0;
    this.irqCounter = s.irqCounter ?? 0;
    this.irqLatchValue = s.irqLatchValue ?? 0;
    this.irqEnable = s.irqEnable ?? 0;
    this.prgAddressChanged = s.prgAddressChanged ?? false;
    if (s.prgBankMap) this.prgBankMap = { ...s.prgBankMap };
  }
}

export default MapperAudio;
