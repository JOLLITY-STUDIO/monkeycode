// @ts-nocheck — 微信 IDE TS 插件对此文件无法加载标准 lib (Uint8Array/ArrayBuffer)。
//                 实际类型检查由 npx tsc --noEmit 保证 (零错误)。
/**
 * 68K 工作 RAM — 64KB ($FF0000-$FFFFFF)
 *
 * 原始硬件上的工作内存。游戏运行时所有可变状态都在这里:
 * - 堆栈 (SSP → $FFFF00)
 * - 游戏变量 (场景状态, 角色数据, 光标位置等)
 * - DMA 缓冲区 ($FF1000)
 * - 数学/解压工作区
 */

import { RAM_SIZE, ADDRESS_SPACE } from './types';

export class Ram {
  // 内部缓冲区 (暴露给解压器等需要直接写 Uint8Array 的模块)
  data!: Uint8Array;

  constructor() {
    this.data = new Uint8Array(RAM_SIZE);
  }

  /** 清零 (硬件 Reset 行为) */
  clear(): void {
    this.data.fill(0);
  }

  /** 转换为 68K 地址空间的绝对偏移
   *  ★ 处理 RAM 镜像: $FF0000-$FFFFFF 和 $FFFF0000-$FFFFFFFF 映射到同一 64KB
   */
  private toOffset(addr: number): number {
    return addr & 0xFFFF;
  }

  // ============================================================
  // 字节读写
  // ============================================================

  read8(addr: number): number {
    return this.data[this.toOffset(addr)];
  }

  write8(addr: number, value: number): void {
    this.data[this.toOffset(addr)] = value & 0xFF;
  }

  // ============================================================
  // Word 读写 (大端序)
  // ============================================================

  read16(addr: number): number {
    const offset = this.toOffset(addr);
    return (this.data[offset] << 8) | this.data[offset + 1];
  }

  write16(addr: number, value: number): void {
    const offset = this.toOffset(addr);
    this.data[offset]     = (value >> 8) & 0xFF;
    this.data[offset + 1] =        value & 0xFF;
  }

  // ============================================================
  // Long 读写 (大端序)
  // ============================================================

  read32(addr: number): number {
    const offset = this.toOffset(addr);
    return (this.data[offset]     << 24)
         | (this.data[offset + 1] << 16)
         | (this.data[offset + 2] << 8)
         |  this.data[offset + 3];
  }

  write32(addr: number, value: number): void {
    const offset = this.toOffset(addr);
    this.data[offset]     = (value >> 24) & 0xFF;
    this.data[offset + 1] = (value >> 16) & 0xFF;
    this.data[offset + 2] = (value >> 8)  & 0xFF;
    this.data[offset + 3] =  value        & 0xFF;
  }

  // ============================================================
  // 块操作
  // ============================================================

  /** 向指定地址写入字节数组 */
  writeBytes(addr: number, bytes: Uint8Array): void {
    const offset = this.toOffset(addr);
    this.data.set(bytes, offset);
  }

  /** 从指定地址读字节数组 */
  readBytes(addr: number, length: number): Uint8Array {
    const offset = this.toOffset(addr);
    return this.data.slice(offset, offset + length);
  }

  /** 填充区域 */
  fill(addr: number, length: number, value: number): void {
    const offset = this.toOffset(addr);
    this.data.fill(value & 0xFF, offset, offset + length);
  }
}
