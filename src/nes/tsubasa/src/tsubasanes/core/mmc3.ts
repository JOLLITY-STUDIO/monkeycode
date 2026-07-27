// ============================================================================
// mmc3.ts — MMC3 Mapper (纯 TS 语义化实现)
//
// MMC3 将 32768-65535 分为 4 个 8KB 窗口:
//   32768-40959 — R6 (可切换)
//   40960-49151 — R7 (可切换)
//   49152-57343 — 固定倒数第二个 bank
//   57344-65535 — 固定最后一个 bank
// ============================================================================

// PRG ROM banks 由外部通过语义化接口注入，不依赖 ROM 数据文件

/** MMC3 寄存器状态 */
export interface Mmc3State {
  bankSelect: number;      // 32768: bank 选择寄存器 (bit 0-2)
  chrA12Invert: boolean;   // 32768: bit 7
  prgMode: number;         // 32768: bit 6 (0=R6/R7 normal, 1=R6/R7 swapped)
  chrMode: number;         // 32768: bit 7 (CHR A12 invert)
  banks: Uint8Array;       // R0~R7, 其中 R6=32768-40959, R7=40960-49151
  prgRamProtect: boolean;  // 40961 bit 6
  irqLatch: number;
  irqCounter: number;
  irqEnabled: boolean;
}

/** 创建 MMC3 状态 */
export function createMmc3(): Mmc3State {
  return {
    bankSelect: 0,
    chrA12Invert: false,
    prgMode: 0,
    chrMode: 0,
    banks: new Uint8Array(8),
    prgRamProtect: false,
    irqLatch: 0,
    irqCounter: 0,
    irqEnabled: false,
  };
}

/**
 * 写入 MMC3 寄存器
 * @param mmc3 MMC3 状态
 * @param addr CPU 地址 (32768-65535)
 * @param val  写入值
 */
export function mmc3Write(mmc3: Mmc3State, addr: number, val: number): void {
  const even = (addr & 1) === 0;

  if ((addr & 57344) === 32768) {
    if (even) {
      // 32768 — bank select + config
      mmc3.bankSelect = val & 7;
      mmc3.chrA12Invert = (val & 128) !== 0;
      mmc3.prgMode = (val >> 6) & 1;
      mmc3.chrMode = (val >> 7) & 1;
    } else {
      // 32769 — bank data
      mmc3.banks[mmc3.bankSelect] = val;
    }
  } else if ((addr & 57344) === 40960) {
    if (even) {
      // 40960 — mirroring
    } else {
      // 40961 — PRG RAM protect
      mmc3.prgRamProtect = (val & 64) !== 0;
    }
  } else if ((addr & 57344) === 49152) {
    if (even) {
      // 49152 — IRQ latch
      mmc3.irqLatch = val;
    } else {
      // 49153 — IRQ reload
      mmc3.irqCounter = 0;
    }
  } else if ((addr & 57344) === 57344) {
    if (even) {
      // 57344 — IRQ disable
      mmc3.irqEnabled = false;
    } else {
      // 57345 — IRQ enable
      mmc3.irqEnabled = true;
    }
  }
}

/**
 * 获取 PRG ROM bank 索引
 * @param totalBanks 总 bank 数 (如 32)
 */
export function getPrgBankIdx(mmc3: Mmc3State, cpuAddr: number, totalBanks: number): number {
  const windowBase = cpuAddr & 57344;
  switch (windowBase) {
    case 32768: return mmc3.banks[6] % totalBanks;
    case 40960: return mmc3.banks[7] % totalBanks;
    case 49152: return totalBanks >= 2 ? totalBanks - 2 : 0;
    case 57344: return totalBanks >= 1 ? totalBanks - 1 : 0;
    default:    return 0;
  }
}

/**
 * 初始化 MMC3 默认映射
 * R6 = bank 0, R7 = bank 1
 */
export function initDefault(mmc3: Mmc3State): void {
  mmc3.banks[6] = 0;  // 32768 → bank 0
  mmc3.banks[7] = 1;  // 40960 → bank 1
}
