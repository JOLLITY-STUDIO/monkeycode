/**
 * Interrupt Service — Bank 31 (CPU $C000-$FFFF, Fixed Bank)
 *
 * NMI/IRQ/RESET 向量表 + MMC3 Bank 切换表。
 *
 * H5: 不模拟 MMC3，Bank 31 的 bank 切换表作为配置数据保留，
 * NMI handler 逻辑合并到 Bank 00/01 的帧循环中。
 *
 * 原始结构:
 *   $C000-$C502 — MMC3 中断处理
 *   $C503-$C6DF — 硬件初始化 (Bank 30 已翻译)
 *   $C6E0-$CFFF — 数据表: 场景入口表、Bank 配置表
 *   $E000-$FFFF — Fixed Bank (Bank 31 固定)
 *   $FFF0-$FFFA — RESET/NMI/IRQ 向量
 */
import { DataStore } from '../data/DataStore';

/** Bank 切换配置条目 */
export interface BankConfig {
  bankId: number;    // PRG bank number
  r6Select: number;  // MMC3 R6 value (CPU $8000-$9FFF)
  r7Select: number;  // MMC3 R7 value (CPU $A000-$BFFF)
}

export class InterruptService {
  constructor(private _store: DataStore) {}

  /**
   * 获取场景对应的 Bank 配置
   * (原始数据在 Bank 31 $C787+ 区域)
   *
   * @param sceneId 场景 ID
   */
  getBankConfig(_sceneId: number): BankConfig | null {
    // H5: 不需要 MMC3 bank 切换，直接通过 import 引用对应 Bank 数据
    // 此方法保留用于场景 → Bank 映射查询
    return null;
  }

  /**
   * RESET 向量入口 ($FFF0)
   * H5: 不模拟 — GameLoop 直接驱动
   */
  reset(): void {
    // RESET: $FFF0 → Bank30 $C64E → $C400 → Bank02 $A200
  }

  /**
   * NMI 向量入口 ($FFFA)
   * 原始: 每帧 NMI 触发 PPU 渲染 + OAM DMA + 音频帧更新
   */
  nmi(): void {
    // H5: 合入 Bank00 update() → 不再需要单独 NMI
  }
}
