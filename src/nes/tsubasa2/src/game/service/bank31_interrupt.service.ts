/**
 * Interrupt Service — Bank 31 (数据已直接 import, 无 MMC3) 对应vectors.s
 *
 * NMI/IRQ/RESET 向量 + 场景 → Bank 配置表。
 *
 * H5: 不模拟 MMC3，NMI handler 逻辑合并到 Bank 00/01 的帧循环中，
 * Bank 配置表仅作数据索引保留。
 *
 * 原始结构:
 *   $C000-$C502 — MMC3 中断处理 (H5: 无需)
 *   $C503-$C6DF — 硬件初始化 (Bank 30 已翻译为 Bank30Service.init())
 *   $C6E0-$CFFF — 数据表: 场景入口表、Bank 配置表
 *   $E000-$FFFF — Fixed Bank (Bank 31 固定)
 *   $FFF0-$FFFA — RESET/NMI/IRQ 向量
 *
 * RESET 链 (vectors.s $FFF0):
 *   LDA #$00; STA $8000 (MMC3 R6=bank0); JMP $C503
 *   → Bank30 $C503: SEI/CLD/TXS → VBlank×2 → 清 RAM → PPU 配置
 *   → $C64E: NT/OAM 清零 → $CEFE → $C400 → bank02.resetEntry(0)
 */
import { DataStore } from '../data/prg/DataStore';
import { Bank30Service } from './bank30_init.service';
import { Bank00Service } from './bank00/bank00_core.service';

/** Bank 配置条目 (H5: 仅数据索引, 不涉及硬件切换) */
export interface BankConfig {
  bankId: number;    // PRG bank number
  r6Select: number;  // 原始 R6 值 (仅存档参考)
  r7Select: number;  // 原始 R7 值 (仅存档参考)
}

export class InterruptService {
  /** Bank30 固定区 ($C000-$CFFF), RESET 硬件初始化实际执行者 */
  private _bank30?: Bank30Service;
  /** Bank00 主循环 ($9EED), NMI 每帧推进游戏逻辑 */
  private _bank00?: Bank00Service;

  constructor(private _store: DataStore) {}

  /** 注入 Bank30 (RESET 链实际执行者, 对应 $C503-$C6DF 硬件初始化) */
  setBank30(bank30: Bank30Service): void {
    this._bank30 = bank30;
  }

  /** 注入 Bank00 (NMI 主循环实际执行者, 对应 $9EED) */
  setBank00(bank00: Bank00Service): void {
    this._bank00 = bank00;
  }

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
   * 真实 ROM: LDA #$00; STA $8000 (R6=bank0); JMP $C503
   *   → Bank30 $C503 RESET 初始化链 (SEI/CLD/TXS → 清 RAM → PPU 配置
   *   → $C64E NT/OAM 清零 → $CEFE → $C400 → bank02.resetEntry(0))
   *
   * H5: 委托 Bank30Service.init() 执行完整 RESET 硬件初始化链。
   */
  reset(): void {
    if (!this._bank30) {
      throw new Error('InterruptService.reset: bank30 未注入 (setBank30 未调用)');
    }
    // 委托 bank30 执行 $C503 → $C64E → $CEFE → $C400 完整链
    this._bank30.init();
  }

  /**
   * NMI 向量入口 ($FFFA)
   * 真实 ROM: 每帧 VBlank 触发 NMI → CPU 跳 $FFFA 向量 → NMI handler
   *   (bank00/bank01 NMI 通用渲染代码: 写 PPU/OAM/NT/调色板 + 帧推进)
   *
   * H5: RAF 循环每帧调一次 interrupt.nmi(buttons) ≈ 真实 NMI 时序。
   *   内部委托 bank00.mainLoop(buttons) 推进一帧游戏逻辑。
   *
   * @param buttons 当前帧按键 bitmask
   */
  nmi(buttons: number): void {
    if (!this._bank00) {
      throw new Error('InterruptService.nmi: bank00 未注入 (setBank00 未调用)');
    }
    // 委托 bank00 推进 $9EED 主循环一帧 (含场景路由/NMI 渲染/帧调度)
    this._bank00.mainLoop(buttons);
  }
}
