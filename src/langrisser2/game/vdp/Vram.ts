/**
 * VRAM — 64KB VDP 视频内存
 *
 * Genesis VDP 使用 16-bit VRAM orgasnized as:
 * - 字节存储: 小端序 (TS 端模拟)
 * - 大端序读写: 模拟 Genesis 数据端口
 *
 * VDP 访问 VRAM 通过:
 * 1. CPU → VDP_CTRL 写目标地址
 * 2. CPU → VDP_DATA 批量读写
 * 3. DMA → VDP_DATA 批量写
 */

import { VRAM_SIZE, VDP_VRAM_LAYOUT } from '../core/types';

export class Vram {
  /** 64KB 原始字节 */
  private data: Uint8Array;

  /** VDP 内部地址寄存器 (16-bit) */
  private _address: number = 0;

  /** 地址自增量 (VDP reg $0F) */
  private _autoInc: number = 2;

  /** CD bits: 当前操作类型 (VDP ctrl word 的 bit 6-7 和 bit 30-31) */
  private _cd: number = 0;

  constructor() {
    this.data = new Uint8Array(VRAM_SIZE);
  }

  // ============================================================
  // 地址控制
  // ============================================================

  /** 设置地址递增步长 (VDP reg $0F) */
  set autoInc(value: number) {
    this._autoInc = value;
  }

  get autoInc(): number {
    return this._autoInc;
  }

  /** 当前 VRAM 地址 */
  get address(): number {
    return this._address;
  }

  /** 设置 VRAM 访问地址 + CD 位 (来自 VDP ctrl word 的两阶段协议)
   *  格式: CD1 CD0 A13 A12 A11 A10 A09 A08 A07 A06 A05 A04 A03 A02 A01 A00
   *  CD=00: VRAM 读
   *  CD=01: VRAM 写
   *  CD=11: CRAM 读 (地址走 CRAM, 但 CD 存在此处)
   *  注意: A14-A15 由低字提供 (← VDP ctrl word 低字的 bit 14-15)
   */
  setAddress(ctrlHi: number, ctrlLo: number): void {
    // CD 位 = ctrlHi bits 14-15
    this._cd = (ctrlHi >> 14) & 0x03;

    // VRAM 地址 = ctrlHi bits 0-13 (A0-A13) | ctrlLo bits 14-15 (A14-A15)
    const a0_13 = ctrlHi & 0x3FFF;           // bits 0-13
    const a14_15 = ((ctrlLo >> 14) & 0x03) << 14; // bits 14-15
    this._address = (a14_15 | a0_13) & 0xFFFF;
  }

  /** 设置 CRAM 写地址 (CD=10, bit13=1 单阶段命令)
   *  格式: 10 1 0 00 AA AA AA AA (AA9-AA0 = CRAM word address)
   */
  setCramAddress(ctrlWord: number): void {
    this._cd = (ctrlWord >> 14) & 0x03; // CD=10
    this._address = ctrlWord & 0x3FF;   // AA9-AA0 (up to 1024 entries, CRAM only 64)
  }

  /** 当前 CD 位 */
  get cd(): number {
    return this._cd;
  }

  // ============================================================
  // VRAM 读写
  // ============================================================

  /** 读 16-bit word (大端序, 模拟 VDP_DATA 端口读)
   *  注意: Genesis 实际是 8-bit 读两次拼接
   */
  readData(): number {
    const addr = this._address;
    const value = (this.data[addr] << 8) | this.data[addr + 1];
    this._address = (this._address + this._autoInc) & 0xFFFF;
    return value;
  }

  /** 写 16-bit word (大端序写入, 模拟 VDP_DATA 端口写)
   *  VDP 内部小端序存储: 高字节→低地址, 低字节→高地址+1
   */
  writeData(value: number): void {
    const addr = this._address;
    this.data[addr] = (value >> 8) & 0xFF;     // 高字节
    this.data[addr + 1] = value & 0xFF;          // 低字节
    this._address = (this._address + this._autoInc) & 0xFFFF;
  }

  /** 批量写 16-bit words (DMA 用)
   *  每个 word 占 2 字节，按大端序写入
   */
  writeDataBlock(words: Uint16Array): void {
    let addr = this._address;
    for (let i = 0; i < words.length; i++) {
      const value = words[i];
      this.data[addr] = (value >> 8) & 0xFF;
      this.data[addr + 1] = value & 0xFF;
      addr = (addr + 2) & 0xFFFF;
    }
    this._address = addr;
  }

  // ============================================================
  // 直接字节读写 (用于渲染器读取 tile 数据)
  // ============================================================

  /** 读指定 VRAM 地址的 1 字节 */
  readByte(vramAddr: number): number {
    return this.data[vramAddr & 0xFFFF];
  }

  /** 读指定 VRAM 地址的 16-bit word (大端序) */
  readWord(vramAddr: number): number {
    const a = vramAddr & 0xFFFF;
    return (this.data[a] << 8) | this.data[a + 1];
  }

  /** 按小端序读 16-bit word (TS 内部格式)
   *  nametable/tile 数据按 Genesis 大端序写入, 但渲染器用小端序解析
   *  实际上是同一件事: lo = vram[addr], hi = vram[addr+1] → word = (hi<<8)|lo
   */
  readWordLE(vramAddr: number): number {
    const a = vramAddr & 0xFFFF;
    const hi = this.data[a];      // 高位字节
    const lo = this.data[a + 1];  // 低位字节
    return (hi << 8) | lo;
  }

  /** 读一段字节 */
  readBytes(vramAddr: number, length: number): Uint8Array {
    const a = vramAddr & 0xFFFF;
    const end = Math.min(a + length, VRAM_SIZE);
    return this.data.slice(a, end);
  }

  // ============================================================
  // 区域操作
  // ============================================================

  /** 填充 VRAM 区域 (0 值) */
  fill(addr: number, length: number): void {
    const start = addr & 0xFFFF;
    const end = Math.min(start + length, VRAM_SIZE);
    this.data.fill(0, start, end);
  }

  /** 清空全部 VRAM */
  clear(): void {
    this.data.fill(0);
    this._address = 0;
  }

  // ============================================================
  // 区域读取 (rendering)
  // ============================================================

  /** 获取 Plane A Nametable 指定 offset 的 entry (16-bit) */
  readPlaneAEntry(offset: number): number {
    return this.readWordLE(VDP_VRAM_LAYOUT.PLANE_A_TABLE.start + offset * 2);
  }

  /** 获取 Plane B Nametable 指定 offset 的 entry */
  readPlaneBEntry(offset: number): number {
    return this.readWordLE(VDP_VRAM_LAYOUT.PLANE_B_TABLE.start + offset * 2);
  }

  /** 获取 Sprite Attribute Table 的某个精灵条目 (8 字节) */
  readSpriteEntry(index: number): Uint8Array {
    if (index >= 80) return new Uint8Array(8);
    const base = VDP_VRAM_LAYOUT.SPRITE_ATTR.start + index * 8;
    return this.data.slice(base, base + 8);
  }

  /** 获取 tile 像素数据 (32 字节 = 8×8 4bpp tile)
   *  vramAddr: tile 在 VRAM 中的起始地址
   *  返回 32 字节 (每字节 = 2 个像素, 各 4-bit color index)
   */
  readTileData(vramAddr: number): Uint8Array {
    return this.readBytes(vramAddr, 32);
  }

  // ============================================================
  // 批量写入 (DMA / 场景数据加载)
  // ============================================================

  /** 从 Uint8Array 按字节写入 VRAM (原始字节, 保持 Genesis 大端序语义) */
  writeBytes(vramAddr: number, bytes: Uint8Array): void {
    const a = vramAddr & 0xFFFF;
    const end = Math.min(a + bytes.length, VRAM_SIZE);
    for (let i = a; i < end; i++) {
      this.data[i] = bytes[i - a];
    }
  }

  /** 从 Uint8Array 按 Word (大端序) 写入 VRAM
   *  每 2 个源字节 → 1 个 VRAM word (hi byte, lo byte)
   */
  writeWords(vramAddr: number, words: Uint16Array): void {
    let a = vramAddr & 0xFFFF;
    for (let i = 0; i < words.length && a < VRAM_SIZE; i++) {
      const v = words[i];
      this.data[a]     = (v >> 8) & 0xFF;
      this.data[a + 1] =  v       & 0xFF;
      a += 2;
    }
  }

  /** 直接获取底层 data 引用 (慎用, 仅用于 bulk load 场景) */
  getRawData(): Uint8Array {
    return this.data;
  }

  // ============================================================
  // 调试
  // ============================================================

  dump(start: number, length: number): string {
    const bytes: string[] = [];
    for (let i = 0; i < length; i++) {
      bytes.push(this.data[(start + i) & 0xFFFF].toString(16).padStart(2, '0'));
    }
    return bytes.join(' ');
  }
}
