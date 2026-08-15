/**
 * Bank 27 Service — Data + Minimal Code (骨架)
 *
 * CPU 映射: $8000-$9FFF (MMC3 R6 切换, Bank #0x1B = 27)
 * PRG offset: 0x036010-0x03800F
 *
 * H5 版本: 无 MMC3 / CPU 模拟。数据已提取至 `src/data/bank27-data.ts`
 *            (原始字节, 未结构化), 本文件为 code 翻译骨架
 *            (来源: _tmp_bzk_out/bank_27.asm, CDL C 标记)。
 *
 * 原始入口 (跳转表):
 *   (无跳转表, 直接执行 $8104)
 *
 * code 段 (2):
 *   $8104-$81DB (216 B)
 *   $81EE-$8291 (164 B)
 *
 * 本地 JMP 目标:
 *   $A179×1 $A224×1
 */

import { DataStore } from '../data/DataStore';
import { readB27, readB27U16 } from '../data/bank27-data';

// ═══════════════════════════════════════════════════════════════
// Bank27Service
// ═══════════════════════════════════════════════════════════════

export class Bank27Service {
  constructor(private _store: DataStore) {}

  // ── 数据访问 (原始字节, 未结构化) ──

  /** 读取本 bank 内地址 addr 的原始字节 (addr: $8000-$9FFF) */
  readByte(addr: number): number {
    return readB27(addr);
  }

  /** 读取本 bank 内 16bit 小端数值 */
  readU16(addr: number): number {
    return readB27U16(addr);
  }

  get store(): DataStore { return this._store; }

  // ──────────────────────────────────────────────
  // $8104: 入口
  // ──────────────────────────────────────────────

  /**
   * $8104 — 入口 (TODO 翻译)
   * 原始: bank_27.asm, CDL code 标记
   */
  entry_8104(): void {
    // TODO: 翻译自 bank_27.asm $8104
  }

  // ──────────────────────────────────────────────
  // $81EE: 入口
  // ──────────────────────────────────────────────

  /**
   * $81EE — 入口 (TODO 翻译)
   * 原始: bank_27.asm, CDL code 标记
   */
  entry_81EE(): void {
    // TODO: 翻译自 bank_27.asm $81EE
  }

}