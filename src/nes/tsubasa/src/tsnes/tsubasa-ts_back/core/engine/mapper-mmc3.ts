/**
 * ============================================================================
 * mapper-mmc3 — MMC3 存储体控制器
 *
 * 管理 8 个 bank 寄存器 (R0-R7)、IRQ 计数器、PRG/CHR 映射。
 * 读写 $8000-$FFFF 区域的寄存器。
 * ============================================================================
 */

// ═══════════════ 寄存器地址 ═══════════════

/** Bank 选择/模式寄存器 ($8000) */
export const REG_BANK_SELECT = 32768;  // $8000
/** Bank 数据寄存器 ($8001) */
export const REG_BANK_DATA   = 32769;  // $8001
/** 镜像控制 ($A000) */
export const REG_MIRRORING   = 40960;  // $A000
/** PRG-RAM 保护 ($A001) */
export const REG_PRG_RAM_PROTECT = 40961;
/** IRQ 锁存器 ($C000) */
export const REG_IRQ_LATCH   = 49152;  // $C000
/** IRQ 重载 ($C001) */
export const REG_IRQ_RELOAD  = 49153;  // $C001
/** IRQ 禁用 ($E000) */
export const REG_IRQ_DISABLE = 57344;  // $E000
/** IRQ 启用 ($E001) */
export const REG_IRQ_ENABLE  = 57345;  // $E001

// ═══════════════ Bank 槽位含义 ═══════════════

/** R0-R5: CHR, R6-R7: PRG */
export const REG_CHR_COUNT = 6;
export const REG_PRG_COUNT = 2;

/** Bank 选择: bit7 用于 $8000 的地址选择 */
export const BANK_SELECT_MASK = 7;

// ═══════════════ 常量 ═══════════════

/** 8KB bank 窗口大小 */
export const BANK_SIZE_8K   = 8192;

/** 上电默认 bank 映射 */
export const DEFAULT_BANK_R6 = 30; // $C000-$DFFF 固定
export const DEFAULT_BANK_R7 = 31; // $E000-$FFFF 固定 (向量表)

/** ROM bank 总数 */
export const TOTAL_PRG_BANKS = 32;

// ═══════════════ 工厂函数 ═══════════════

/**
 * 创建 MMC3 初始状态
 * @returns {object}
 */
export function createMmc3State() {
  return {
    /** 8 个 bank 寄存器 */
    regs: {
      r0: 0, r1: 0, r2: 0, r3: 0,
      r4: 0, r5: 0, r6: 0, r7: 1,
    },
    /** 当前 $8000 选择 (0-7) */
    bankSelect: 0,
    /** PRG bank 模式:
     *  0: R6 → $8000, R7 → $A000 (default)
     *  1: $C000 → R6, $8000 → fixed-2nd-last, $A000 → R7 */
    prgBankMode: 0,
    /** CHR bank 模式:
     *  0: R0/R1 为两个 2KB, R2-R5 为四个 1KB
     *  1: R0/R1 为两个 1KB (互换), R2-R5 为四个 1KB */
    chrBankMode: 0,
    /** IRQ 锁存值 */
    irqLatch: 0,
    /** IRQ 递减计数器 */
    irqCounter: 0,
    /** IRQ 是否启用 */
    irqEnabled: false,
    /** 等待 IRQ 重载 (A12 上升沿触发) */
    irqReload: false,
    /** 已访问的 PRG bank */
    accessedBanks: new Set(),
    /** mirroring: 0=水平, 1=垂直 */
    mirroring: 0,

    // 便捷方法 (与 boot.js / engine.js 调用风格一致)
    write8000(v) { write8000(this, v); },
    write8001(v) { write8001(this, v); },
    writeA000(v) { writeA000(this, v); },
    writeC000(v) { writeC000(this, v); },
    writeC001(v) { writeC001(this, v); },
    writeE000(v) { writeE000(this, v); },
    writeE001(v) { writeE001(this, v); },
  };
}

// ═══════════════ 寄存器读写 ═══════════════

/**
 * 写入 $8000 — Bank 选择寄存器
 * @param {object} mmc3
 * @param {number} value
 */
export function write8000(mmc3, value) {
  mmc3.bankSelect = value & BANK_SELECT_MASK;
  // bit6: PRG bank mode (0 or 1)
  mmc3.prgBankMode = (value & 64) !== 0 ? 1 : 0;
  // bit7: CHR bank mode (0 or 1)
  mmc3.chrBankMode = (value & 128) !== 0 ? 1 : 0;
}

/**
 * 写入 $8001 — Bank 数据寄存器
 * @param {object} mmc3
 * @param {number} value
 */
export function write8001(mmc3, value) {
  const sel = mmc3.bankSelect;
  switch (sel) {
    case 0: mmc3.regs.r0 = value & 255; break;
    case 1: mmc3.regs.r1 = value & 255; break;
    case 2: mmc3.regs.r2 = value & 255; break;
    case 3: mmc3.regs.r3 = value & 255; break;
    case 4: mmc3.regs.r4 = value & 255; break;
    case 5: mmc3.regs.r5 = value & 255; break;
    case 6: mmc3.regs.r6 = value & (TOTAL_PRG_BANKS - 1); break;
    case 7: mmc3.regs.r7 = value & (TOTAL_PRG_BANKS - 1); break;
  }
}

/**
 * 写入 $A000 — 镜像控制
 */
export function writeA000(mmc3, value) {
  mmc3.mirroring = value & 1;
}

/**
 * 写入 $C000 — IRQ 锁存器
 */
export function writeC000(_mmc3, value) {
  _mmc3.irqLatch = value & 255;
}

/**
 * 写入 $C001 — IRQ 重载
 */
export function writeC001(_mmc3, _value) {
  _mmc3.irqReload = true;
}

/**
 * 写入 $E000 — IRQ 禁用 + 确认
 */
export function writeE000(_mmc3, _value) {
  _mmc3.irqEnabled = false;
}

/**
 * 写入 $E001 — IRQ 启用
 */
export function writeE001(_mmc3, _value) {
  _mmc3.irqEnabled = true;
}

// ═══════════════ PRG Bank 地址映射 ═══════════════

/**
 * 根据 CPU 地址返回实际 PRG bank 索引
 * @param {object} mmc3
 * @param {number} cpuAddr — 16-bit CPU 地址
 * @returns {{ bankIndex: number, offset: number }}
 */
export function mapPrgAddr(mmc3, cpuAddr) {
  if (cpuAddr < 32768) {
    return null; // 非 PRG-ROM 地址
  }

  if (cpuAddr < 40960) {
    // $8000-$9FFF → R6 (8KB)
    const offset = cpuAddr - 32768;
    return { bankIndex: mmc3.regs.r6, offset };
  }

  if (cpuAddr < 49152) {
    // $A000-$BFFF → R7 (8KB)
    const offset = cpuAddr - 40960;
    return { bankIndex: mmc3.regs.r7, offset };
  }

  if (mmc3.prgBankMode === 0) {
    if (cpuAddr < 57344) {
      // $C000-$DFFF → 固定 bank 30 (倒数第二个)
      return { bankIndex: TOTAL_PRG_BANKS - 2, offset: cpuAddr - 49152 };
    }
    // $E000-$FFFF → 固定 bank 31 (最后一个)
    return { bankIndex: TOTAL_PRG_BANKS - 1, offset: cpuAddr - 57344 };
  }

  // PRG mode 1: $C000-$DFFF 由 R6 映射, $8000-$9FFF 固定倒数第二个
  if (cpuAddr < 57344) {
    // $C000-$DFFF → R6
    return { bankIndex: mmc3.regs.r6, offset: cpuAddr - 49152 };
  }
  // $E000-$FFFF → 固定 bank 31
  return { bankIndex: TOTAL_PRG_BANKS - 1, offset: cpuAddr - 57344 };
}

/**
 * 读取 PRG-ROM 的一个字节 (通过 MMC3 映射)
 * @param {object} mmc3
 * @param {object[]} prgBanks — PRG bank 数组 (每个含 data: number[])
 * @param {number} cpuAddr
 * @returns {number} 0-255
 */
export function readPrg(mmc3, prgBanks, cpuAddr) {
  const mapped = mapPrgAddr(mmc3, cpuAddr);
  if (!mapped) return 0;

  const bank = prgBanks[mapped.bankIndex];
  if (!bank) return 0;

  const value = bank.data[mapped.offset];
  mmc3.accessedBanks.add(mapped.bankIndex);
  return value ?? 0;
}

// ═══════════════ CHR 地址映射 ═══════════════

/**
 * 根据 PPU 地址返回实际 CHR bank 索引
 * @param {object} mmc3
 * @param {number} ppuAddr — 12-bit PPU 地址
 * @returns {{ bankIndex: number, offset: number }}
 */
export function mapChrAddr(mmc3, ppuAddr) {
  // 统一返回 4KB VROM bank 索引 (0-31) + 该 bank 内字节偏移
  const r = mmc3.regs;
  if (mmc3.chrBankMode === 0) {
    // Mode 0: R0/R1 = 两个 2KB, R2-R5 = 四个 1KB
    if (ppuAddr < 2048) {
      // $0000-$07FF: R0 (2KB, 低 bit 忽略)
      const bank2k = r.r0 >> 1;
      return { bankIndex: bank2k >> 1, offset: ((bank2k & 1) * 2048) + ppuAddr };
    }
    if (ppuAddr < 4096) {
      // $0800-$0FFF: R1 (2KB)
      const bank2k = r.r1 >> 1;
      return { bankIndex: bank2k >> 1, offset: ((bank2k & 1) * 2048) + (ppuAddr - 2048) };
    }
    if (ppuAddr < 5120) return { bankIndex: r.r2 >> 2, offset: ((r.r2 & 3) * 1024) + (ppuAddr - 4096) };
    if (ppuAddr < 6144) return { bankIndex: r.r3 >> 2, offset: ((r.r3 & 3) * 1024) + (ppuAddr - 5120) };
    if (ppuAddr < 7168) return { bankIndex: r.r4 >> 2, offset: ((r.r4 & 3) * 1024) + (ppuAddr - 6144) };
    if (ppuAddr < 8192) return { bankIndex: r.r5 >> 2, offset: ((r.r5 & 3) * 1024) + (ppuAddr - 7168) };
    return null;
  }
  // Mode 1: R0/R1 = 两个 1KB (互换), R2-R5 = 四个 1KB
  if (ppuAddr < 1024)       return { bankIndex: r.r0 >> 2, offset: ((r.r0 & 3) * 1024) + ppuAddr };
  if (ppuAddr < 2048)       return { bankIndex: r.r1 >> 2, offset: ((r.r1 & 3) * 1024) + (ppuAddr - 1024) };
  if (ppuAddr < 3072)       return { bankIndex: r.r2 >> 2, offset: ((r.r2 & 3) * 1024) + (ppuAddr - 2048) };
  if (ppuAddr < 4096)       return { bankIndex: r.r3 >> 2, offset: ((r.r3 & 3) * 1024) + (ppuAddr - 3072) };
  if (ppuAddr < 5120)       return { bankIndex: r.r4 >> 2, offset: ((r.r4 & 3) * 1024) + (ppuAddr - 4096) };
  if (ppuAddr < 6144)       return { bankIndex: r.r5 >> 2, offset: ((r.r5 & 3) * 1024) + (ppuAddr - 5120) };
  return null;
}
