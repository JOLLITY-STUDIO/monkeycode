/**
 * Bank 22 Service — Data+Code Hybrid (骨架)
 *
 * 数据已直接 import `rom-data/prg-bank-22.ts` (Bank #0x16 = 22), 无 MMC3 切换。
 * PRG offset: 0x02C010-0x02E00F
 *
 * 本文件为 code 翻译骨架 (来源: _tmp_bzk_out/bank_22.asm, CDL C 标记)。
 *
 * 原始入口 (跳转表):
 *   (无跳转表, 直接执行 $8005)
 *
 * code 段 (2):
 *   $8005-$80B5 (177 B)
 *   $80C0-$81D1 (274 B)
 *
 * 本地函数 (被 JSR 调用, 3):
 *   $80B3×1 $80C0×1 $8187×1
 *
 * 本地 JMP 目标:
 *   $809F×2 $8109×1 $8164×1
 */

import { DataStore } from '../data/DataStore';
import PRG_BANK_22 from "../../../rom-data/prg-bank-22";

// ═══════════════════════════════════════════════════════════════
// Bank22Service
// ═══════════════════════════════════════════════════════════════

export class Bank22Service {
  constructor(private _store: DataStore) {}

  // ── 数据访问 (原始字节, 未结构化) ──

  /** 读取本 bank 内地址 addr 的原始字节 (addr: $8005-$81D1) */
  readByte(addr: number): number {
    return PRG_BANK_22[addr - 0x8000] ?? 0xFF;
  }

  /** 读取本 bank 内 16bit 小端数值 */
  readU16(addr: number): number {
    return this.readByte(addr) | (this.readByte(addr + 1) << 8);
  }

  get store(): DataStore { return this._store; }

  // ──────────────────────────────────────────────
  // $8005: 入口
  // ──────────────────────────────────────────────

  /**
   * $8005 — 入口 (TODO 翻译)
   * 原始: bank_22.asm, CDL code 标记
   */
  entry_8005(): void {
    // TODO: 翻译自 bank_22.asm $8005
  }

  // ──────────────────────────────────────────────
  // $80B3: 内部函数
  // ──────────────────────────────────────────────

  /**
   * $80B3 — 内部函数 (TODO 翻译)
   * 原始: bank_22.asm, CDL code 标记
   */
  private fn_80B3(): void {
    // TODO: 翻译自 bank_22.asm $80B3
  }

  // ──────────────────────────────────────────────
  // $80C0: 入口
  // ──────────────────────────────────────────────

  /**
   * $80C0 — 入口 (TODO 翻译)
   * 原始: bank_22.asm, CDL code 标记
   */
  entry_80C0(): void {
    // TODO: 翻译自 bank_22.asm $80C0
  }

  // ──────────────────────────────────────────────
  // $8187: 内部函数
  // ──────────────────────────────────────────────

  /**
   * $8187 — 内部函数 (TODO 翻译)
   * 原始: bank_22.asm, CDL code 标记
   */
  private fn_8187(): void {
    // TODO: 翻译自 bank_22.asm $8187
  }

}