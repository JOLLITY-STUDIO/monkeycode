// ============================================================================
// memory.ts — 游戏内存模型（纯 TS，无 CPU 模拟）
//
// NES 内存映射:
//   0-255     — Zero Page (256B)
//   256-511   — Stack      (256B)
//   512-2047  — WRAM       (1.5KB)
//   8192-16383 — PPU 寄存器 (镜像)
//   16384-16415 — APU/手柄   (32B)
//   16416-24575 — 卡带扩展
//   24576-32767 — SRAM      (8KB)
//   32768-65535 — PRG-ROM   (32KB 窗口, MMC3 映射)
// ============================================================================

import { SRAM_START, PRG_ROM_START } from '../constants';

/** 主 RAM — 0 ~ 2047 (Zero Page + Stack + WRAM) */
export const wram = new Uint8Array(2048);

/** SRAM — 24576 ~ 32767 */
export const sram = new Uint8Array(8192);

/** OAM 缓冲区 — page 512, 256B */
export const oamBuf = new Uint8Array(256);

// ============================================================
// Zero Page 按语义别名访问
// ============================================================

/** Zero Page 视图 */
export const zp = new Uint8Array(wram.buffer, 0, 256);

// ============================================================
// 便捷读写
// ============================================================

/** 读内存字节 (处理 SRAM/WRAM 区) */
export function read(addr: number): number {
  if (addr < 2048) return wram[addr];
  if (addr >= SRAM_START && addr < PRG_ROM_START) return sram[addr - SRAM_START];
  return 0; // ROM 区由 MMC3 处理
}

/** 写内存字节 */
export function write(addr: number, val: number): void {
  if (addr < 2048) { wram[addr] = val; return; }
  if (addr >= SRAM_START && addr < PRG_ROM_START) { sram[addr - SRAM_START] = val; return; }
}

/** 清空所有内存 */
export function clear(): void {
  wram.fill(0);
  sram.fill(0);
  oamBuf.fill(255);
}
