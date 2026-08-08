/**
 * 音频专用 ROM 加载器——无 Tile、无 CHR tile 处理、无关 PPU。
 */

import MapperAudio from "./mapper-audio";

export class RomAudio {
  static ROM_BANK_SIZE = 16384; // 16KB = 两个 8KB PRG bank
  static CHR_BANK_SIZE = 4096;  // 4KB

  VERTICAL_MIRRORING = 0;
  HORIZONTAL_MIRRORING = 1;

  nes: any;
  valid = false;
  header = new Uint8Array(16);

  mirroring = 0;
  batteryRam = false;

  mapperType = 0;
  romCount = 0;
  vromCount = 0;

  rom: Uint8Array[] = [];
  vrom: Uint8Array[] = [];

  constructor(nes: any) {
    this.nes = nes;
  }

  /** 从精简 rom-data/index.ts 加载原始 PRG/CHR 数组（CHR 可为空） */
  loadFromArrays(prgData: Uint8Array, chrData: Uint8Array): void {
    const bankSize8k = 8192;
    const prgLen = prgData.length;
    if (prgLen % bankSize8k !== 0) {
      throw new Error(`RomAudio: PRG size ${prgLen} not multiple of 8KB`);
    }

    this.romCount = prgLen / bankSize8k;
    const chrLen = chrData.length;
    this.vromCount = chrLen > 0 ? Math.ceil(chrLen / 4096) : 0;

    // 加载 PRG（8KB bank）
    this.rom = [];
    for (let i = 0; i < this.romCount; i++) {
      const bank = new Uint8Array(bankSize8k);
      const off = i * bankSize8k;
      const end = Math.min(off + bankSize8k, prgLen);
      bank.set(new Uint8Array(prgData.buffer, prgData.byteOffset + off, end - off));
      this.rom.push(bank);
    }

    // 加载 CHR（音频不需要图形数据，可以为空）
    this.vrom = [];
    for (let i = 0; i < this.vromCount; i++) {
      const bank = new Uint8Array(4096);
      const off = i * 4096;
      const end = Math.min(off + 4096, chrLen);
      if (end > off) {
        bank.set(new Uint8Array(chrData.buffer, chrData.byteOffset + off, end - off));
      }
      this.vrom.push(bank);
    }

    this.valid = true;
    this.mirroring = 0; // 水平镜像
    this.batteryRam = false;
    this.mapperType = 0; // 不被 Mappers 注册表使用——我们始终用 MapperAudio。
  }

  getMirroringType(): number {
    if (this.mirroring === 0) return this.HORIZONTAL_MIRRORING;
    return this.VERTICAL_MIRRORING;
  }

  createMapper(): MapperAudio {
    return new MapperAudio(this.nes);
  }
}

export default RomAudio;
