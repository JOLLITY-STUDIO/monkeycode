/**
 * Bank 30 Service — 硬件初始化 (H5 简化版)
 *
 * CPU 映射: $C000-$DFFF (MMC3 固定 Bank)
 * PRG offset: 0x3C010-0x3E00F
 *
 * 原始 Bank 30 是核心系统库，包含:
 *   - RESET/NMI/IRQ 中断向量跳转
 *   - 公共 API 跳转表 ($C509-$C5FF, ~80 entries)
 *   - 数学运算、Bank 切换、球员数据处理等
 *
 * H5 版本: 不需要 MMC3、不需要 NMI/IRQ 模拟、
 * 不需要 CPU 指令执行。Bank30 只做初始化工作，
 * 然后直接将控制权交给 Bank02。
 */

import { DataStore } from '../data/DataStore';
import { palReset } from '../data/pallete/paletteManager';
import { Bank00Service } from './bank00_core.service';
import { Bank02Service } from './bank02_scene.service';

// ═══════════════════════════════════════════════════════════════
// Bank 30 Service
// ═══════════════════════════════════════════════════════════════

export class Bank30Service {
  constructor(
    private _store: DataStore,
    private _bank00: Bank00Service,
    private _bank02: Bank02Service,
  ) {}

  // ── 公开接口 ──

  get store(): DataStore { return this._store; }

  // ──────────────────────────────────────────────
  // $C503 → $C64E: RESET 硬件初始化
  // ──────────────────────────────────────────────

  /**
   * 对应原始 $FFF0 (Bank31) → $C503 (Bank30) → $C64E:
   *
   * 完整 RESET 初始化链 (~190 bytes):
   *   SEI / CLD / LDX #$FF; TXS          → 禁止中断/十进制/设栈
   *   等待 PPU VBlank ×2                 → frame sync
   *   LDA #$C0; STA $A001                → MMC3 protect (H5: no-op)
   *   清零 $0000-$07FF (8 页)            → store 重置
   *   PPUCTRL=$08, PPUMASK=$06           → 设 PPU 镜像
   *   STA $4010=0 (禁止 DMC)             → H5: no-op
   *   STA $4017=$40 (APU Frame)          → H5: no-op
   *   JSR $CB35 (NT/VRAM 清零)           → bank00.ntClear()
   *   JSR $CB8B (OAM 清零)               → store.clearOAM()
   *   STA $E000 (MMC3 R6=Bank00); CLI    → H5: no-op
   *   LDA #$00; JMP $CEFE                → state save
   *   $CEFE: PHA; STX $30; STY $31; JMP $C400
   *   $C400: TAY(Y=0) → PPU($2000=$08,$2001=$1E) → $22=0
   *          → JSR $C4B2(init) → LDX #$02;JSR $C4B9(切Bank02)
   *          → TYA(A=0);JMP $A200
   *
   * 最后 JMP $A200 → Bank02.$A200: JMP $A21B → scene init
   */
  init(): void {
    // ── 1. 对应 $C64E-$C658: CPU 状态初始化 ──
    // SEI / CLD / TXS → H5: 不需要

    // ── 2. 对应 $C658-$C661: 等待 PPU VBlank ×2 ──
    // H5: 不需要轮询 $2002

    // ── 3. 对应 $C662-$C666: MMC3 PRG RAM protect ──
    // H5: no-op (不需要 MMC3)

    // ── 4. 对应 $C667-$C679: 清零 $0000-$07FF (8 页) ──
    // H5: DataStore.reset() 已清 zp + ram
    this._store.zp.fill(0);
    this._store.ram.clear();

    // ── 5. 对应 $C67A-$C686: PPU 镜像设置 ──
    // $20=$08 (PPUCTRL 镜像: NMI on, 使用 NT0)
    this._store.write('ppuctrl', 0x08);
    // $21=$06 (PPUMASK 镜像: 禁用渲染)
    this._store.write('ppumask', 0x06);

    // ── 6. 对应 $C687-$C69E: APU 初始化 ──
    // STA $4010=0 (禁止 DMC), STA $4017=$40 (APU Frame Counter)
    // H5: APU 由 mini-audio 模块独立处理

    // ── 7. 对应 $C6A5: JSR $CB35 — NT/VRAM 清零 ──
    this._bank00.ntClear();

    // ── 8. 对应 $C6A8: JSR $CB8B — OAM 清零 (LDA #$F8 填充) ──
    this._store.clearOAM();
    // 设默认 OAM Y 坐标 = 0xF8 (不可见)
    for (let i = 0; i < 64; i++) {
      this._store.sprites.push({
        active: false,
        x: 0,
        y: 0xF8,
        tile: 0,
        palette: 0,
        priority: false,
        flipH: false,
        flipV: false,
        bank: 0,
      });
    }

    // ── 9. 对应 $C6B5: STA $E000 (MMC3 R6=Bank00); CLI ──
    // H5: 不需要 MMC3 bank 映射。Bank00 已经作为构造参数注入。

    // 调色板初始化
    palReset();

    // ── 10. 对应 $C6BB: LDA #$00; JMP $CEFE → $CEFE → JMP $C400 ──
    // $CEFE: PHA; STX $30; STY $31 → H5: 不需要保存/恢复
    this._initC400();
  }

  // ──────────────────────────────────────────────
  // $C400: 最终 PPU 配置 + 跳 Bank02
  // ──────────────────────────────────────────────

  /**
   * 对应原始 $C400:
   *   TAY(Y=0)                            // 保存 A=0 到 Y
   *   PPU 配置: $2000=$08, $2001=$1E      // NMI on, BG+SPR on
   *   $22=0                               // 清零 Bank 切换状态
   *   JSR $C4B2(init)                     // 未知 init
   *   LDX #$02; JSR $C4B9(切 Bank02)      // H5: 直接调 bank02
   *   TYA(A=0); JMP $A200                 // A=0 → Bank02.$A200
   */
  private _initC400(): void {
    const s = this._store;

    // PPU 最终配置
    s.write('ppuctrl', 0x08);  // NMI on, NT0
    s.write('ppumask', 0x1E);  // BG on, SPR on, 允许左8px渲染

    // $22=0: Bank 切换状态清零
    s.write('ram_0022', 0);

    // JSR $C4B2: 未知 init (可能是音频或 PPU 相关)
    // 待进一步分析

    // LDX #$02; JSR $C4B9: 切 Bank02
    // H5: 不需要切 bank，直接调 bank02.resetEntry(A=0)
    // TYA(A=0); JMP $A200: A=0 进入 Bank02 → JMP $A21B
    this._bank02.resetEntry(0);
  }

  // ── 辅助: 设置默认 RAM 值 ──

  /**
   * 初始化比赛相关 RAM 默认值（从 bank30_analysis ramMap 提取）。
   * 仅在进入比赛模式时调用。
   */
  initMatchDefaults(): void {
    const s = this._store;
    s.write('gameState',     0);
    s.write('timerLo',       0);
    s.write('timerHi',       0x18);   // 1800秒 = 30分钟
    s.write('scoreA',        0);
    s.write('scoreB',        0);
    s.write('ballOwner',     0);
    s.write('ballX',         0);
    s.write('ballY',         0);
    s.write('nearCount',     0);      // $0600
    s.write('roundCount',    0);      // $0613
    s.write('actionClock',   0x0A);   // $0614
    s.write('bpmCounter',    0);      // $0618
    s.write('ctrlStatus',    0);      // $0516
    s.write('scrollDir',     0);      // $0517
    s.write('animLock',      0);      // $0515
    s.write('zoneFlag',      0xFF);   // $062A
    s.write('pauseFlag',     0);      // $062D
  }
}
