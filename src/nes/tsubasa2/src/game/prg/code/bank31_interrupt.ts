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
import { RamStore } from '../../../core/ram';
import { Bank30Service } from './bank30_init';
import { Bank00Service } from './bank00/bank00_core';
import { trace } from '../../../core/debug/trace';

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
  /** NMI 调用计数 (用于 trace 采样, 避免每帧刷屏) */
  private _nmiCount = 0;

  constructor(private _store: RamStore) {}

  /** 注入 Bank30 (RESET 链实际执行者, 对应 $C503-$C6DF 硬件初始化) */
  setBank30(bank30: Bank30Service): void {
    this._bank30 = bank30;
    trace('Interrupt', 'setBank30() 注入 RESET 向量执行者');
  }

  /** 注入 Bank00 (NMI 主循环实际执行者, 对应 $9EED) */
  setBank00(bank00: Bank00Service): void {
    this._bank00 = bank00;
    trace('Interrupt', 'setBank00() 注入 NMI 向量执行者');
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
    trace('Interrupt', 'reset() $FFF0 RESET 向量入口');
    if (!this._bank30) {
      throw new Error('InterruptService.reset: bank30 未注入 (setBank30 未调用)');
    }
    // 委托 bank30 执行 $C503 → $C64E → $CEFE → $C400 完整链
    this._bank30.init();
    trace('Interrupt', 'reset() RESET 链完成');
  }

  /**
   * NMI 向量入口 ($FFFA)
   * 真实 ROM: 每帧 VBlank 触发 NMI → CPU 跳 $FFFA 向量 → NMI handler
   *   (bank30 $C775-$C820):
   *     - OAM DMA ($2003/$4014) + 调色板/滚动/NT 写入
   *     - $C7E7: JSR $C982 → $C98B 读取手柄 → 计算"本帧新按下"边沿
   *              → $C9BC: STA $001E (newly-pressed) / $C9C1: STA $001C (current)
   *     - $C7EA-$C7EE: ram_001B |= 0x80 (NMI 帧标志)
   *     - $C7F0-$C805: 还原 bank 映射 → RTI
   *
   * ⚠️ 关键纠正: ram_001E 是"本帧新按下的按键"(边沿检测), 并非 VBlank 标志!
   *   bit4 = Up 按钮本帧被按下 (NES 控制器位序: bit0=A, bit1=B, bit2=Sel,
   *   bit3=Start, bit4=Up, bit5=Down, bit6=Left, bit7=Right)。
   *   bank00 主循环 $802C-$8030 的 `AND #$10` 等待的是"按上键进入", 不是等帧。
   *   真正的 NMI 帧标志是 ram_001B bit7 ($C7EA-$C7EE 置位)。
   *
   * H5: RAF 循环每帧调一次 interrupt.nmi(buttons) ≈ 真实 NMI 时序。
   *   每帧先按真实 $C9B5-$C9C1 做手柄边沿检测 (写入 ram_001E/001C),
   *   再按 $C7EA-$C7EE 置 ram_001B bit7, 最后推进 bank00.mainLoop(buttons)。
   *
   * @param buttons 当前帧按键 bitmask
   */
  nmi(buttons: number): void {
    if (!this._bank00) {
      throw new Error('InterruptService.nmi: bank00 未注入 (setBank00 未调用)');
    }
    // $FFFA NMI 向量 → bank00 $9EED 主循环一帧
    // 注: NMI 每帧调用, 只在首帧 + 每 60 帧 trace 避免刷屏
    if (this._nmiCount === 0 || this._nmiCount % 60 === 0) {
      trace('Interrupt', `nmi() $FFFA 向量 → bank00.mainLoop, count=${this._nmiCount} buttons=0x${buttons.toString(16)}`);
    }
    this._nmiCount++;

    const btn = (buttons & 0xFF) >>> 0;

    // ── 对应真实 NMI handler $C7E7 → $C982 → $C98B (手柄边沿检测) ──
    //   $C9B5: LDA $001C,X   ; 上一帧按键 (current)
    //   $C9B8: EOR $0083     ; prev ^ cur
    //   $C9BA: AND $0083     ; & cur → 本帧"新按下" (边沿)
    //   $C9BC: STA $001E,X   ; ram_001E = newly-pressed
    //   $C9BF: LDA $0083
    //   $C9C1: STA $001C,X   ; ram_001C = current
    const cur = btn;
    const prev = (this._store.read('ram_001C') as number) ?? 0;
    const edge = cur & (prev ^ 0xFF) & 0xFF;   // 新按下 = cur & ~prev
    this._store.write('ram_001E', edge);
    this._store.write('ram_001C', cur);

    // ── 对应真实 NMI handler $C7EA-$C7EE: ram_001B |= 0x80 (NMI 帧标志) ──
    const ram1b = (this._store.read('ram_001B') as number) ?? 0;
    this._store.write('ram_001B', ram1b | 0x80);

    this._bank00.mainLoop(btn);
  }
}
