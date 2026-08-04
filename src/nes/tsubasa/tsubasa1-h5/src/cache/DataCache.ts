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

  /** $0301-$0302: 手柄输入原始值 (仅 P1，单人游戏) */
  get joypadRaw(): number { return this.read(0x0301); }
  set joypadRaw(v: number) { this.write(0x0301, v); }

  /** @deprecated 使用 joypadRaw (单人游戏) */
  get joypad1Raw(): number { return this.joypadRaw; }
  set joypad1Raw(v: number) { this.write(0x0301, v); }

  /** $03CA: 游戏状态索引 */
  get gameState(): number { return this.read(0x03CA); }
  set gameState(v: number) { this.write(0x03CA, v); }

  // ===========================
  // State 3 比赛初始化
  // ===========================

  /**
   * 初始化比赛 RAM 区域
   *
   * 对应 ASM $85CD-$861D (State 3 入口):
   *   $85CD: LDX #$00, 清零 $0600-$0637 (56 bytes)
   *   $85D8: LDX #$00, 清零 $0691-$06AE (30 bytes)
   *   $85E3: 清零各比赛变量
   *   $861E: 更广泛的变量初始化
   */
  initMatchRam(): void {
    // 清零比赛核心区域 $0600-$0637 (56 bytes)
    for (let i = 0x0600; i <= 0x0637; i++) {
      this.write(i, 0);
    }
    // 清零子状态区域 $0691-$06AE (30 bytes)
    for (let i = 0x0691; i <= 0x06AE; i++) {
      this.write(i, 0);
    }
    // 清零关键比赛变量 (对应 $85E3-$85FF)
    // ram_05E0, ram_05E1: 比分或其他
    this.write(0x05E0, 0);
    this.write(0x05E1, 0);
    // ram_059B, ram_059C
    this.write(0x059B, 0);
    this.write(0x059C, 0);
    // ram_03E5: State 5 子计数器
    this.write(0x03E5, 0);
    // ram_003B
    this.zpWrite(0x3B, 0);
    // ram_0735
    this.write(0x0735, 0);
    // ram_03DE
    this.write(0x03DE, 0);
    // ram_030E
    this.write(0x030E, 0);

    // 对应 $861E 更广泛的初始化
    // ram_05EF
    this.write(0x05EF, 0);
    // ram_03BE
    this.write(0x03BE, 0);
    // ram_0029
    this.zpWrite(0x29, 0);
    // ram_0043
    this.zpWrite(0x43, 0);
    // ram_03DF
    this.write(0x03DF, 0);
    // ram_0041
    this.zpWrite(0x41, 0);
    // ram_0600 (already done above)
    // ram_061B
    this.write(0x061B, 0);
    // ram_061F
    this.write(0x061F, 0);
    // ram_007C
    this.zpWrite(0x7C, 0);
    // ram_03CC
    this.write(0x03CC, 0);
    // ram_05D5
    this.write(0x05D5, 0);
    // ram_03E6
    this.write(0x03E6, 0);
    // ram_05BC
    this.write(0x05BC, 0);
    // ram_0596
    this.write(0x0596, 0);
    // ram_05E8
    this.write(0x05E8, 0);
    // ram_03F3
    this.write(0x03F3, 0);
    // ram_059E
    this.write(0x059E, 0);
    // ram_05A1
    this.write(0x05A1, 0);
    // ram_05D8
    this.write(0x05D8, 0);
    // ram_0697
    this.write(0x0697, 0);
    // ram_059D
    this.write(0x059D, 0);

    console.log('[DataCache] Match RAM initialized (State 3 init)');
  }

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
