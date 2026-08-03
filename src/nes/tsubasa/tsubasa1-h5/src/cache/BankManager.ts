/**
 * Bank 管理器 - 替代 MMC1 映射器
 * 管理 PRG/CHR Bank 切换逻辑
 */

import { BankConfig } from '../core/types';

export class BankManager {
  /** 当前PRG bank 0 ($8000-$BFFF) */
  prgBank0: number = 0;

  /** 当前PRG bank 1 ($C000-$FFFF, 固定为7) */
  prgBank1: number = 7;

  /** 当前CHR bank 0 (低4KB) */
  chrBank0: number = 0;

  /** 当前CHR bank 1 (高4KB) */
  chrBank1: number = 0;

  /** PRG模式: 0=32KB, 1=固定高16KB+可切换低16KB, 2=固定低16KB+可切换高16KB, 3=32KB */
  prgMode: number = 0;

  /** CHR模式: 0=8KB, 1=两个4KB */
  chrMode: number = 0;

  /** 镜像模式 */
  mirroring: 'horizontal' | 'vertical' = 'horizontal';

  /** MMC1 移位寄存器 */
  private shiftReg: number = 0x10;
  private shiftCount: number = 0;
  private lastWriteAddr: number = 0;

  constructor() {
    this.reset();
  }

  /** MMC1 重置 */
  reset(): void {
    this.shiftReg = 0x10;
    this.shiftCount = 0;
    this.prgMode = 3; // 32KB mode after reset
    this.prgBank0 = 0;
    this.prgBank1 = 7;
    this.chrBank0 = 0;
    this.chrBank1 = 0;
    this.chrMode = 0; // 8KB mode after reset
    this.mirroring = 'horizontal';
  }

  /**
   * MMC1 串行写入
   * @param addr CPU地址 (决定目标寄存器)
   * @param value 写入值 (只使用 bit 0)
   */
  write(addr: number, value: number): void {
    // 如果 bit 7 = 1，重置移位寄存器
    if (value & 0x80) {
      this.shiftReg = 0x10;
      this.shiftCount = 0;
      this.prgMode = 3;

      // 根据地址判断受影响的寄存器
      if (addr < 0xA000) {
        // Control register: 设置固定高位 bank
        // (实际MMC1行为: reset写入没有立即生效，只是配置了PRG模式)
      }
      return;
    }

    // 写入 bit 0 到移位寄存器
    const bit = value & 0x01;
    this.shiftReg = (this.shiftReg >> 1) | (bit << 4);
    this.shiftCount++;
    this.lastWriteAddr = addr;

    // 收集到5位后写入目标寄存器
    if (this.shiftCount >= 5) {
      this.commitRegister(addr);
      this.shiftReg = 0x10;
      this.shiftCount = 0;
    }
  }

  /** 提交移位寄存器到目标MMC1寄存器 */
  private commitRegister(addr: number): void {
    const data = this.shiftReg & 0x1F;

    if (addr < 0xA000) {
      // Control Register ($8000-$9FFF)
      this.mirroring = (data & 0x03) <= 1 ? 'horizontal' : 'vertical';
      this.prgMode = (data >> 2) & 0x03;
      this.chrMode = (data >> 4) & 0x01;
    } else if (addr < 0xC000) {
      // CHR Bank 0 ($A000-$BFFF)
      if (this.chrMode === 0) {
        // 8KB mode: 使用低4位×2作为bank索引
        this.chrBank0 = (data & 0x1E);
        this.chrBank1 = (data & 0x1E) | 0x01;
      } else {
        this.chrBank0 = data & 0x1F;
      }
    } else if (addr < 0xE000) {
      // CHR Bank 1 ($C000-$DFFF)
      if (this.chrMode === 1) {
        this.chrBank1 = data & 0x1F;
      }
    } else {
      // PRG Bank ($E000-$FFFF)
      const bank = data & 0x0F;
      const ramEnable = (data & 0x10) === 0; // 0=enable, 1=disable

      switch (this.prgMode) {
        case 0: // 32KB mode
        case 1: // 固定高16KB + 切换低16KB
          this.prgBank0 = bank & 0x0E; // 偶数bank（32KB对齐的低半部）
          this.prgBank1 = 7; // 固定为最后一个bank
          break;
        case 2: // 固定低16KB + 切换高16KB
          this.prgBank0 = 0;
          this.prgBank1 = bank;
          break;
        case 3: // 32KB mode
          this.prgBank0 = bank & 0x0E;
          this.prgBank1 = (bank & 0x0E) | 0x01;
          break;
      }
    }
  }

  /** 获取当前 Bank 配置 */
  getConfig(): BankConfig {
    return {
      prgBank0: this.prgBank0,
      prgBank1: this.prgBank1,
      chrBank0: this.chrBank0,
      chrBank1: this.chrBank1,
      mirroring: this.mirroring,
    };
  }

  /** 设置初始配置 (对应RESET后写 $1A) */
  setInitialConfig(): void {
    // 模拟写入 $1A 到 control register
    // $1A = 00011010
    // bit 1-0 = 10 → mirroring = horizontal
    // bit 3-2 = 10 → PRG mode = 2 (fixed low, switchable high)
    // bit 4   = 1  → CHR mode = 1 (two 4KB banks)
    this.prgMode = 2;
    this.chrMode = 1;
    this.mirroring = 'horizontal';
    this.prgBank0 = 0;
    this.prgBank1 = 7;
  }
}
