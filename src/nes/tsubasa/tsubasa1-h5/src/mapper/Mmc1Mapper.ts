/**
 * MMC1 Mapper 模拟
 *
 * MMC1 使用串行接口，向 $8000-$FFFF 写入 5 次组成完整配置字。
 * 本实现模拟 MMC1 的行为，但不做逐周期 CPU 模拟，
 * 而是将 MMC1 的状态暴露给游戏逻辑层使用。
 */

/** MMC1 寄存器地址范围 */
export enum Mmc1Reg {
  CTRL = 0x00,  // $8000-$9FFF: R0 控制寄存器
  CHR0 = 0x20,  // $A000-$BFFF: R1 CHR Bank 0
  CHR1 = 0x40,  // $C000-$DFFF: R2 CHR Bank 1
  PRG  = 0x60,  // $E000-$FFFF: R3 PRG Bank
}

export class Mmc1Mapper {
  // 内部寄存器
  r0: number = 0x0C;  // 控制寄存器 (默认: 水平镜像, 16KB PRG, 4KB CHR)
  r1: number = 0;     // CHR Bank 0 (PPU $0000-$0FFF)
  r2: number = 0;     // CHR Bank 1 (PPU $1000-$1FFF)
  r3: number = 0;     // PRG Bank ($8000-$BFFF)

  // 串行写入状态
  shiftReg: number = 0x10;  // 移位寄存器，bit4=1 表示空闲
  shiftCount: number = 0;

  // PRG Bank 数量
  private prgBankCount: number;

  constructor(prgBankCount: number) {
    this.prgBankCount = prgBankCount;
  }

  /** 获取镜像模式 */
  get mirroring(): number {
    return this.r0 & 0x03;
  }

  /** PRG 模式: false=32KB, true=16KB (固定 $C000-$FFFF) */
  get prg16KMode(): boolean {
    return (this.r0 & 0x04) !== 0;
  }

  /** CHR 模式: false=8KB, true=两个4KB Bank */
  get chr4KMode(): boolean {
    return (this.r0 & 0x08) !== 0;
  }

  /** PRG-RAM 启用 (本游戏不使用) */
  get prgRamEnabled(): boolean {
    return (this.r0 & 0x10) === 0;
  }

  /**
   * 向 MMC1 写入数据
   * 返回 true 表示完成了一次完整的寄存器写入
   */
  write(address: number, value: number): boolean {
    // bit7=1: 复位移位寄存器
    if (value & 0x80) {
      this.shiftReg = 0x10;
      this.shiftCount = 0;
      // 复位同时写入 R0 bit2-3
      this.r0 |= 0x0C;
      return false;
    }

    // 串行写入: LSB 先
    const bit = value & 0x01;
    this.shiftReg = (this.shiftReg >> 1) | (bit << 4);
    this.shiftCount++;

    if (this.shiftCount < 5) {
      return false;
    }

    // 5 次写入完成，锁存到目标寄存器
    const reg = address & 0x60; // 提取 bit5-6 选择寄存器

    switch (reg) {
      case Mmc1Reg.CTRL:
        this.r0 = this.shiftReg;
        break;
      case Mmc1Reg.CHR0:
        this.r1 = this.shiftReg;
        break;
      case Mmc1Reg.CHR1:
        this.r2 = this.shiftReg;
        break;
      case Mmc1Reg.PRG:
        this.r3 = this.shiftReg;
        break;
    }

    // 复位移位寄存器
    this.shiftReg = 0x10;
    this.shiftCount = 0;

    return true;
  }

  /** 获取 PRG ROM Bank 编号 (用于 CPU $8000-$BFFF) */
  getPrgBank(): number {
    if (this.prg16KMode) {
      // 16KB 模式: R3 bit0-3 选择 Bank
      // bit4 (PRG-RAM 禁用) 忽略
      return this.r3 & 0x0F;
    } else {
      // 32KB 模式: R3 bit1-3 选择偶数 Bank 对
      return (this.r3 & 0x0E);
    }
  }

  /** 获取固定 PRG Bank (始终为最后一个 Bank) */
  getFixedPrgBank(): number {
    return this.prgBankCount - 1;
  }

  /** 获取 CHR Bank 编号 (用于 PPU $0000-$0FFF) */
  getChrBank0(): number {
    if (this.chr4KMode) {
      return this.r1 & 0x1F;
    } else {
      // 8KB 模式: bit1 忽略
      return (this.r1 & 0x1E);
    }
  }

  /** 获取 CHR Bank 编号 (用于 PPU $1000-$1FFF) */
  getChrBank1(): number {
    if (this.chr4KMode) {
      return this.r2 & 0x1F;
    } else {
      return (this.r1 & 0x1E) + 1;
    }
  }

  /** 重置 MMC1 到初始状态 */
  reset(): void {
    this.r0 = 0x0C;  // 水平镜像, 16KB PRG, 4KB CHR
    this.r1 = 0;
    this.r2 = 0;
    this.r3 = 0;
    this.shiftReg = 0x10;
    this.shiftCount = 0;
  }
}
