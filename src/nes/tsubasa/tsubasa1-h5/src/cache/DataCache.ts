/**
 * 数据缓存中心 - 替代6502 RAM
 * 提供 key-value 存储方式，模拟零页和通用RAM访问
 *
 * 内存布局:
 *   $0000-$00FF: 零页 (Zero Page) - 高频访问，使用Map
 *   $0100-$01FF: 栈区 - 不模拟
 *   $0200-$02FF: OAM 区域 - 由 OamCache 管理
 *   $0300-$07FF: 通用RAM - 使用 Uint8Array
 */

import { ZP_SIZE, RAM_SIZE } from '../core/Constants';

export class DataCache {
  /** 零页存储 (高频访问) */
  private zp: Map<number, number>;

  /** 通用 RAM ($0200-$07FF) */
  private ram: Uint8Array;

  /** 结构化数据存储 (高级 key-value) */
  private store: Map<string, any>;

  constructor() {
    this.zp = new Map();
    this.ram = new Uint8Array(RAM_SIZE - 0x200);
    this.store = new Map();
    this.clear();
  }

  /** 清空所有数据 */
  clear(): void {
    this.zp.clear();
    this.ram.fill(0);
    this.store.clear();
  }

  // ===========================
  // 零页访问 ($0000-$00FF)
  // ===========================

  /** 读取零页字节 */
  zpRead(addr: number): number {
    if (addr < 0 || addr >= ZP_SIZE) {
      throw new Error(`ZP read out of bounds: $${addr.toString(16).padStart(4, '0')}`);
    }
    return this.zp.get(addr) ?? 0;
  }

  /** 写入零页字节 */
  zpWrite(addr: number, value: number): void {
    if (addr < 0 || addr >= ZP_SIZE) {
      throw new Error(`ZP write out of bounds: $${addr.toString(16).padStart(4, '0')}`);
    }
    this.zp.set(addr, value & 0xFF);
  }

  /** 读取零页字 (小端) */
  zpReadWord(addr: number): number {
    const lo = this.zpRead(addr);
    const hi = this.zpRead(addr + 1);
    return (hi << 8) | lo;
  }

  /** 写入零页字 (小端) */
  zpWriteWord(addr: number, value: number): void {
    this.zpWrite(addr, value & 0xFF);
    this.zpWrite(addr + 1, (value >> 8) & 0xFF);
  }

  // ===========================
  // 通用RAM访问 ($0200-$07FF)
  // ===========================

  /** 读取RAM字节 (完整地址 $0000-$07FF) */
  read(addr: number): number {
    if (addr < ZP_SIZE) {
      return this.zpRead(addr);
    }
    if (addr < 0x200) {
      return 0; // 栈区不模拟，返回0
    }
    if (addr >= RAM_SIZE) {
      throw new Error(`RAM read out of bounds: $${addr.toString(16).padStart(4, '0')}`);
    }
    return this.ram[addr - 0x200];
  }

  /** 写入RAM字节 */
  write(addr: number, value: number): void {
    if (addr < ZP_SIZE) {
      this.zpWrite(addr, value);
      return;
    }
    if (addr < 0x200) {
      return; // 栈区不模拟
    }
    if (addr >= RAM_SIZE) {
      throw new Error(`RAM write out of bounds: $${addr.toString(16).padStart(4, '0')}`);
    }
    this.ram[addr - 0x200] = value & 0xFF;
  }

  /** 读取RAM字 */
  readWord(addr: number): number {
    return this.read(addr) | (this.read(addr + 1) << 8);
  }

  /** 写入RAM字 */
  writeWord(addr: number, value: number): void {
    this.write(addr, value & 0xFF);
    this.write(addr + 1, (value >> 8) & 0xFF);
  }

  /** 获取RAM原始缓冲引用 (用于DMA等批量操作) */
  getRamBuffer(offset: number, length: number): Uint8Array {
    if (offset < 0x200) {
      throw new Error('Cannot get buffer below $0200');
    }
    return this.ram.subarray(offset - 0x200, offset - 0x200 + length);
  }

  /** 批量写入RAM */
  writeRamBlock(destAddr: number, data: Uint8Array): void {
    for (let i = 0; i < data.length; i++) {
      this.write(destAddr + i, data[i]);
    }
  }

  // ===========================
  // 高级结构化存储 (key-value)
  // ===========================

  /** 获取结构化数据 */
  get<T = any>(key: string): T | undefined {
    return this.store.get(key) as T;
  }

  /** 设置结构化数据 */
  set<T = any>(key: string, value: T): void {
    this.store.set(key, value);
  }

  /** 检查键是否存在 */
  has(key: string): boolean {
    return this.store.has(key);
  }

  /** 删除键 */
  delete(key: string): boolean {
    return this.store.delete(key);
  }

  // ===========================
  // 常用零页变量快捷访问
  // ===========================

  /** $16: PPU 滚动 X */
  get scrollX(): number { return this.zpRead(0x16); }
  set scrollX(v: number) { this.zpWrite(0x16, v); }

  /** $17: PPU 滚动 Y */
  get scrollY(): number { return this.zpRead(0x17); }
  set scrollY(v: number) { this.zpWrite(0x17, v); }

  /** $18: PPU MASK 镜像 */
  get ppuMask(): number { return this.zpRead(0x18); }
  set ppuMask(v: number) { this.zpWrite(0x18, v); }

  /** $19: PPU CTRL 镜像 */
  get ppuCtrl(): number { return this.zpRead(0x19); }
  set ppuCtrl(v: number) { this.zpWrite(0x19, v); }

  /** $1A: MMC1 Bank 寄存器 0 (CHR) */
  get mmcBankReg0(): number { return this.zpRead(0x1A); }
  set mmcBankReg0(v: number) { this.zpWrite(0x1A, v); }

  /** $1B: MMC1 Bank 寄存器 1 (CHR) */
  get mmcBankReg1(): number { return this.zpRead(0x1B); }
  set mmcBankReg1(v: number) { this.zpWrite(0x1B, v); }

  /** $1C: MMC1 Bank 寄存器 2 (PRG) */
  get mmcBankReg2(): number { return this.zpRead(0x1C); }
  set mmcBankReg2(v: number) { this.zpWrite(0x1C, v); }

  /** $93: Bank切换锁 */
  get bankLock(): number { return this.zpRead(0x93); }
  set bankLock(v: number) { this.zpWrite(0x93, v); }

  /** $0300: 帧计数器 */
  get frameCount(): number { return this.read(0x0300); }
  set frameCount(v: number) { this.write(0x0300, v); }

  /** $0301-$0302: 手柄输入原始值 [0] */
  get joypad1Raw(): number { return this.read(0x0301); }
  set joypad1Raw(v: number) { this.write(0x0301, v); }

  /** $0303-$0304: 手柄输入原始值 [1] */
  get joypad2Raw(): number { return this.read(0x0303); }
  set joypad2Raw(v: number) { this.write(0x0303, v); }

  /** $03CA: 游戏状态索引 */
  get gameState(): number { return this.read(0x03CA); }
  set gameState(v: number) { this.write(0x03CA, v); }

  /** 获取调试快照 */
  debugSnapshot(): Record<string, number> {
    return {
      scrollX: this.scrollX,
      scrollY: this.scrollY,
      ppuMask: this.ppuMask,
      ppuCtrl: this.ppuCtrl,
      frameCount: this.frameCount,
      gameState: this.gameState,
      bankLock: this.bankLock,
    };
  }
}
