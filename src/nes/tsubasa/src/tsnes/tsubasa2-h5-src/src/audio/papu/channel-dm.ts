/**
 * ChannelDM — NES APU DMC (Delta Modulation Channel)
 * Adapted from src/papu/channel-dm.ts
 * Stripped of 'utils' dependency, CPU IRQ/MMAP, & JSON serialization for H5.
 *
 * H5 适配要点:
 *   - DMC 的 DMA 取指依赖 CPU (papu.nes.mmap.load + haltCycles) 已移除。
 *   - IRQ 生成逻辑已移除 (无 CPU 中断)。
 *   - 保留 δ 计数器、DAC LSB、sample 值等核心播放逻辑。
 *   - 当需要 DMC 采样时，由外部通过 setSampleProvider 注入采样数据源。
 */

class ChannelDM {
  static MODE_NORMAL = 0;
  static MODE_LOOP = 1;
  static MODE_IRQ = 2;

  papu: any;
  isEnabled: boolean;
  hasSample: boolean;
  irqGenerated: boolean;
  playMode: number;
  dmaFrequency: number;
  dmaCounter: number;
  deltaCounter: number;
  playStartAddress: number;
  playAddress: number;
  playLength: number;
  playLengthCounter: number;
  sample: number;
  dacLsb: number;
  shiftCounter: number;
  reg4012: number;
  reg4013: number;
  data: number;

  /** Sample data provider (替代 papu.nes.mmap.load) */
  private _sampleProvider: ((address: number) => number) | null = null;

  constructor(papu: any) {
    this.papu = papu;

    this.isEnabled = false;
    this.hasSample = false;
    this.irqGenerated = false;
    this.playMode = ChannelDM.MODE_NORMAL;
    this.dmaFrequency = 0;
    this.dmaCounter = 0;
    this.deltaCounter = 0;
    this.playStartAddress = 0;
    this.playAddress = 0;
    this.playLength = 0;
    this.playLengthCounter = 0;
    this.sample = 0;
    this.dacLsb = 0;
    this.shiftCounter = 0;
    this.reg4012 = 0;
    this.reg4013 = 0;
    this.data = 0;
  }

  /** 设置 DMC 采样数据提供函数 (替代原 Mapper 的 load) */
  setSampleProvider(fn: (address: number) => number | null): void {
    this._sampleProvider = fn;
  }

  clockDmc(): void {
    if (this.hasSample) {
      if ((this.data & 1) === 0) {
        if (this.deltaCounter > 0) {
          this.deltaCounter--;
        }
      } else {
        if (this.deltaCounter < 63) {
          this.deltaCounter++;
        }
      }
      this.sample = this.isEnabled ? (this.deltaCounter << 1) + this.dacLsb : 0;
      this.data >>= 1;
    }

    this.dmaCounter--;
    if (this.dmaCounter <= 0) {
      this.hasSample = false;
      this.endOfSample();
      this.dmaCounter = 8;
    }

    // H5: 无 CPU IRQ，irqGenerated 仅用于状态读取
    if (this.irqGenerated) {
      // no-op — no CPU to interrupt
    }
  }

  endOfSample(): void {
    if (this.playLengthCounter === 0 && this.playMode === ChannelDM.MODE_LOOP) {
      this.playAddress = this.playStartAddress;
      this.playLengthCounter = this.playLength;
    }

    if (this.playLengthCounter > 0) {
      this.nextSample();

      if (this.playLengthCounter === 0) {
        if (this.playMode === ChannelDM.MODE_IRQ) {
          this.irqGenerated = true;
        }
      }
    }
  }

  nextSample(): void {
    if (!this._sampleProvider) {
      this.data = 0;
    } else {
      const b = this._sampleProvider(this.playAddress);
      this.data = b !== null ? b : 0;
    }

    this.playLengthCounter--;
    this.playAddress++;
    if (this.playAddress > 0xffff) {
      this.playAddress = 0x8000;
    }

    this.hasSample = true;
  }

  writeReg(address: number, value: number): void {
    if (address === 0x4010) {
      if (value >> 6 === 0) {
        this.playMode = ChannelDM.MODE_NORMAL;
      } else if (((value >> 6) & 1) === 1) {
        this.playMode = ChannelDM.MODE_LOOP;
      } else if (value >> 6 === 2) {
        this.playMode = ChannelDM.MODE_IRQ;
      }

      if ((value & 0x80) === 0) {
        this.irqGenerated = false;
      }

      this.dmaFrequency = this.papu.getDmcFrequency(value & 0xf);
    } else if (address === 0x4011) {
      this.deltaCounter = (value >> 1) & 63;
      this.dacLsb = value & 1;
      this.sample = (this.deltaCounter << 1) + this.dacLsb;
    } else if (address === 0x4012) {
      this.playStartAddress = (value << 6) | 0x0c000;
      this.reg4012 = value;
    } else if (address === 0x4013) {
      this.playLength = (value << 4) + 1;
      this.reg4013 = value;
    } else if (address === 0x4015) {
      this.irqGenerated = false;

      if (((value >> 4) & 1) === 0) {
        this.playLengthCounter = 0;
      } else {
        if (this.playLengthCounter === 0) {
          this.playAddress = this.playStartAddress;
          this.playLengthCounter = this.playLength;
          if (!this.hasSample && this.playLengthCounter > 0) {
            this.nextSample();
            this.dmaCounter = 8;
            this.shiftCounter = this.dmaFrequency;
            if (
              this.playLengthCounter === 0 &&
              this.playMode === ChannelDM.MODE_IRQ
            ) {
              this.irqGenerated = true;
            }
          }
        }
      }
    }
  }

  setEnabled(value: boolean): void {
    this.isEnabled = value;
  }

  getLengthStatus(): number {
    return this.playLengthCounter === 0 || !this.isEnabled ? 0 : 1;
  }

  getIrqStatus(): number {
    return this.irqGenerated ? 1 : 0;
  }
}

export default ChannelDM;
