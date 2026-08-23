/**
 * PrgBankService — MMC3 PRG bank 切换服务 (去 6502 指令, 保留 MMC3 mapper)
 *
 * 原版: CPU 执行 JSR $C4B9 → 写 $8000(选 cmd 6/7) + $8001(bank 号)
 *       → MMC3 mapper4.executeCommand → load8kRomBank → 更新 prgBankMap
 *       → 后续读 $8000/$A000 窗口数据时按 prgBankMap 动态取 bank
 *
 * H5: 不跑 CPU 指令, 直接调 mapper4.write(0x8000/0x8001) 触发同样的 bank 切换。
 *     service 层读 PRG 数据时调 getBankOfWindow() 查当前窗口映射的 bank。
 *
 * MMC3 PRG 窗口 (Tsubasa2 默认 prgAddressSelect=0):
 *   $8000-$9FFF = R6 (可切, CMD_SEL_ROM_PAGE1=6)
 *   $A000-$BFFF = R7 (可切, CMD_SEL_ROM_PAGE2=7)
 *   $C000-$DFFF = 固定 bank30 (倒数第二)
 *   $E000-$FFFF = 固定 bank31 (最后, 含向量)
 *
 * @bank 30 ($C4B9 bank switch routine 的 H5 等价)
 */
import { DataStore } from '../../data/store/DataStore';

/** PRG 窗口基地址 */
export const enum PrgWindow {
  /** $8000-$9FFF — R6 可切 (CMD 6) */
  R6 = 0x8000,
  /** $A000-$BFFF — R7 可切 (CMD 7) */
  R7 = 0xA000,
  /** $C000-$DFFF — 固定 bank30 */
  FIXED_C = 0xC000,
  /** $E000-$FFFF — 固定 bank31 (向量) */
  FIXED_E = 0xE000,
}

/** MMC3 命令常量 (与 mapper4 对齐) */
const CMD_SEL_ROM_PAGE1 = 6; // R6
const CMD_SEL_ROM_PAGE2 = 7; // R7

/** RAM 键: ram_0024 = R6 bank 号, ram_0025 = R7 bank 号 (原版 $C4B9 语义) */
const RAM_R6_BANK = 0x0024;
const RAM_R7_BANK = 0x0025;

function ramKey(addr: number): string {
  return `ram_${addr.toString(16).toUpperCase().padStart(4, '0')}`;
}

export class PrgBankService {
  protected _store: DataStore;
  /** MMC3 mapper 引用 (组合根注入, 同 InterruptService._mmap) */
  protected _mmap: any = null;

  constructor(store: DataStore) {
    this._store = store;
  }

  /** 挂接 MMC3 mapper (组合根注入) */
  attachMapper(mmap: any): void {
    this._mmap = mmap;
  }

  /**
   * 切 R6 bank ($8000-$9FFF 窗口)
   * 原版 $C4B9: LDA #$06; STA $8000; LDA bank; STA $8001
   * H5: 直接调 mapper.write 触发 executeCommand(CMD_SEL_ROM_PAGE1, bank)
   * @param bank 8KB bank 索引 (0-31)
   */
  switchR6(bank: number): void {
    this._store.write(ramKey(RAM_R6_BANK), bank & 0xff);
    if (this._mmap && this._mmap.write) {
      this._mmap.write(0x8000, CMD_SEL_ROM_PAGE1);
      this._mmap.write(0x8001, bank & 0xff);
    }
  }

  /**
   * 切 R7 bank ($A000-$BFFF 窗口)
   * 原版: LDA #$07; STA $8000; LDA bank; STA $8001
   * @param bank 8KB bank 索引 (0-31)
   */
  switchR7(bank: number): void {
    this._store.write(ramKey(RAM_R7_BANK), bank & 0xff);
    if (this._mmap && this._mmap.write) {
      this._mmap.write(0x8000, CMD_SEL_ROM_PAGE2);
      this._mmap.write(0x8001, bank & 0xff);
    }
  }

  /**
   * 查当前窗口映射的 8KB bank 索引
   * @param window PrgWindow.R6/R7/FIXED_C/FIXED_E
   * @returns bank 索引 (0-31), 或 -1 表示 mapper 未挂接
   */
  getBankOfWindow(window: PrgWindow): number {
    if (this._mmap && this._mmap.getPrgBankMap) {
      const map = this._mmap.getPrgBankMap() as Record<number, number>;
      const b = map[window];
      if (b != null) return b;
    }
    // Fallback: 从 RAM 读 ram_0024/ram_0025 (原版语义)
    switch (window) {
      case PrgWindow.R6:
        return this._store.read(ramKey(RAM_R6_BANK)) & 0xff;
      case PrgWindow.R7:
        return this._store.read(ramKey(RAM_R7_BANK)) & 0xff;
      case PrgWindow.FIXED_C:
        return 30;
      case PrgWindow.FIXED_E:
        return 31;
    }
    return -1;
  }

  /** 当前 R6 bank ($8000 窗口) */
  get currentR6(): number {
    return this.getBankOfWindow(PrgWindow.R6);
  }

  /** 当前 R7 bank ($A000 窗口) */
  get currentR7(): number {
    return this.getBankOfWindow(PrgWindow.R7);
  }

  /**
   * 按 CPU 地址查映射的 8KB bank
   * $8000-$9FFF → R6, $A000-$BFFF → R7, $C000-$DFFF → 30, $E000-$FFFF → 31
   */
  getBankAtCpuAddr(cpuAddr: number): number {
    const a = cpuAddr & 0xe000;
    switch (a) {
      case 0x8000:
        return this.getBankOfWindow(PrgWindow.R6);
      case 0xa000:
        return this.getBankOfWindow(PrgWindow.R7);
      case 0xc000:
        return 30;
      case 0xe000:
        return 31;
    }
    return -1;
  }
}

export default PrgBankService;
