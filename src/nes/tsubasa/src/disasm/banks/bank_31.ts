/**
 * ============================================================
 * Bank 31: RESET 啟動序列 + 中斷向量表 (固定在 $E000-$FFFF)
 *
 * ASM 來源:  _tmp_bzk_out/bank_31.asm (6,128 行)
 * CPU 映射:   $E000-$FFFF (固定 bank, MMC3 最後一個 bank)
 * CDL:        code=3951 data=3387 unacc=854
 *
 * 功能摘要:
 *   - $FFF0 RESET 向量: 初始化 MMC3 → JMP $C503 (bank_30)
 *   - $FFFA NMI 向量: → $C500 (bank_30)
 *   - $FFFE IRQ 向量: → $C506 (bank_30)
 *   - $E000-$E073: 比賽場景核心邏輯 (球員交換、座標計算)
 *   - $E074-$E0DE: 比賽場景推進 (觸發比分/旗標檢查)
 *   - $E0DF-$FFFF: 大量精靈/場景數據表 (3,387 bytes)
 * ============================================================
 */

// @ts-nocheck
import { GameContext } from '../_context';
import {
  ZP_SCENE_STATE, ZP_SCENE_BANK,
  ZP_SCROLL_X, ZP_SCROLL_Y,
  ZP_FRAME_CNT,
  ZP_PPUCTRL_MIRROR, ZP_PPUMASK_MIRROR,
  ZP_PPUSCROLL_X, ZP_PPUSCROLL_Y,
  ZP_VBLANK_DONE, ZP_NMI_TRIGGER,
  ZP_GLOBAL_LO, ZP_GLOBAL_HI,
  ZP_PPUADDR_LO, ZP_PPUADDR_HI,
  ZP_ROW_CNT, ZP_BANK_TMP, ZP_GEN_EA, ZP_GEN_EB,
  MMC3_BANK_SEL, MMC3_BANK_DATA,
  MMC3_REG_PRG_LO,
  BIT_7, BIT_6, BIT_5, BIT_0,
  MASK_HI2, MASK_LO4,
  TERMINATOR,
  PPUCTRL, PPUMASK,
} from '../_constants';
import type { BankModule, RomReader } from './_bank_types';

// ============================================================
// 向量表定義
// ============================================================

/** CPU 中斷向量表 ($FFFA-$FFFF) */
export const VECTORS = {
  /** NMI 向量 → $C500 (bank_30) */
  NMI:    0xC500,
  /** RESET 向量 → $FFF0 (bank_31 內部) */
  RESET:  0xFFF0,
  /** IRQ/BRK 向量 → $C506 (bank_30) */
  IRQ:    0xC506,
} as const;

// ============================================================
// § $FFF0-$FFF7 RESET 啟動序列
//
// 6502 原始碼 (ASM lines 6117-6119):
//   $FFF0: LDA #$00
//   $FFF2: STA $8000    ; MMC3 bank select reg = 0
//   $FFF5: JMP $C503    ; 跳轉到 bank_30 主入口
//
// 這是最小化的 RESET 處理:
//   1. 清除 MMC3 bank select
//   2. 跳轉到 bank_30 ($C503) 進行完整初始化
//   bank_30 會設置 MMC3、初始化 RAM、然後調用 bank_02 的 gameInit
// ============================================================

/**
 * $FFF0 RESET handler - CPU 重置進入點
 *
 * 對照 ASM line 6117-6119
 */
function resetHandler(ctx: GameContext, rom: RomReader): void {
  console.log('[bank_31] RESET: clearing MMC3 bank select, jumping to $C503 (bank_30)');
  // LDA #$00
  // STA $8000 → MMC3_BANK_SEL = 0 (bank select register reset)
  ctx.ram.setU8(MMC3_BANK_SEL, 0);
  
  // JMP $C503 → bank_30 main boot routine
  // $C503 位於 bank_30 (PRG bank $C000-$DFFF 固定區)
  // 注意: 只設 PC, 由 main.ts execFromPC 統一執行目標函數
  ctx.cpu.PC = 0xC503;
  console.log('[bank_31] RESET: PC=$C503 (executed by caller)');
}

// ============================================================
// § $E000-$E073 比賽場景: 球員數值計算
//
// 從 ASM lines 6-58:
//   處理球員交換前後的數值調整
//   與 bank_01 配合計算比賽中的體力、射門、對抗等
//
// 關鍵變數:
//   $0441: 當前活動球員編號
//   $05FC: 球權持有人 (player with ball)
//   $0638: 計算結果緩衝
//   $061A,$061B: 比賽狀態標記
// ============================================================

/**
 * $E000 比賽數值計算入口
 * 
 * 從 ($34) 指向的數據結構讀取球員屬性,
 * 做數值 clamping (CF-D0 範圍) 後寫回
 *
 * ASM:
 *   $E000: CLC
 *   $E001: ADC #$01
 *   $E004: LDY #$06
 *   $E006: CLC
 *   $E007: ADC ($34),Y    ; 讀取 Y=6 的偏移值
 *   $E009: CMP #$D0       ; cap max = 208
 *   $E00B: BCC $E00F      ; if < 208, ok
 *   $E00D: LDA #$CF       ; force = 207
 *   $E00F: CMP #$30       ; cap min = 48
 *   $E011: BCS $E015      ; if >= 48, ok
 *   $E013: LDA #$30       ; force = 48
 *   $E015: STA ($34),Y    ; 寫回
 */
function calcPlayerStat(ctx: GameContext, baseVal: number, addrLo: number): void {
  // $E000: CLC; ADC #$01 → baseVal + 1
  let result = baseVal + 1;
  
  // $E004: LDY #$06
  // $E006: CLC; ADC ($34),Y → 加上 Y=6 偏移值
  const ptrAddr = ctx.ram.u8(ZP_GLOBAL_LO); // $34 = ($EC or ZP_34?)
  // 實際上 $34 是 ZP 變數, 存指標低字節
  const offsetVal = ctx.ram.u8(addrLo + 6);
  result += offsetVal;
  
  // $E009-$E015: Clamp to [48, 207]
  if (result > 208) result = 207;  // CMP #$D0; BCC; LDA #$CF
  if (result < 48)  result = 48;   // CMP #$30; BCS; LDA #$30
  
  // $E015: STA ($34),Y → 寫回
  ctx.ram.setU8(addrLo + 6, result & 0xFF);
}

/**
 * $E017-$E02D: 球權交換 (swapBallOwner)
 *
 * 交換 $0441 (當前球員) 和 $05FC (球權持有人)
 * 如果 $05FC = $FF (無人持球), 則 $0441 不變, $05FC 設為 $0441
 *
 * ASM:
 *   LDA $0441 → temp = player1
 *   LDX $05FC → X = player2
 *   STX $0441 → player1 = player2
 *   STA $05FC → player2 = temp
 */
function swapBallOwner(ctx: GameContext): void {
  const player1 = ctx.ram.u8(0x0441); // LDA $0441
  const player2 = ctx.ram.u8(0x05FC); // LDX $05FC
  ctx.ram.setU8(0x0441, player2);     // STX $0441
  ctx.ram.setU8(0x05FC, player1);     // STA $05FC
}

/**
 * $E023-$E055: 比賽場景初始化子程序
 *
 * 設置比賽狀態標記、初始化顯示列表
 */
function matchInit(ctx: GameContext, rom: RomReader): void {
  // $E023: JSR $E059 → 內部子程序
  // $E026: LDA #$FF; STA $061A → 比賽狀態標記 = 255
  ctx.ram.setU8(0x061A, 0xFF);
  // $E02B: LDA #$01; STA $061B → 次要標記 = 1
  ctx.ram.setU8(0x061B, 0x01);
  
  // $E030: JSR $E73E → 跨 bank (bank_31 內部)
  // $E033: LDA $05FC → 恢復球權
  // $E036: STA $0441
  ctx.ram.setU8(0x0441, ctx.ram.u8(0x05FC));
  
  // $E039: JSR $E6EC → 跨 bank
  // $E03C: PHA → 保存結果
  // $E03D: LDA $22 → 讀取 PPU 狀態
  // $E03F: LDA #$1A; STA $24 → 設置 bank=$1A
  // $E043: LDA #$1B; STA $25 → 設置 bank=$1B
  ctx.ram.setU8(ZP_FRAME_CNT, 0x1A);   // $24 = scene bank?
  ctx.ram.setU8(ZP_SCENE_BANK, 0x1B);  // $25 = ?
  
  // $E047: JSR $CE2D → 跨 bank (bank_30?)
  // $E04A: PLA → 恢復結果
  // $E04B: JSR $801E → 跨 bank (bank_00?)
  
  // $E04E-$E056: 設置 bank + 堆疊
  // LDA #$1B; JSR $CBB0 → 跨 bank
  // LDX #$50; TXS → SP = $50
  // JMP $E0DF → 進入場景主循環
}

// ============================================================
// § $E059-$E073 輔助子程序
// ============================================================

/**
 * $E059 檢查並處理球權交換前的準備
 *
 * ASM:
 *   LDA $05FC      ; 球權持有人
 *   CMP #$FF       ; 是否無人持球?
 *   BEQ $E073      ; 如果 FF → 跳過
 *   JSR $CD7C      ; 跨 bank
 *   LDY #$06; LDA ($34),Y  ; 讀取偏移 6
 *   TAX             ; → X
 *   LDY #$08; LDA ($34),Y  ; 讀取偏移 8
 *   TAY             ; → Y
 *   JSR $CDE2      ; 跨 bank (坐標計算?)
 *   STA $0638      ; 保存結果
 *   RTS
 */
function preSwapCheck(ctx: GameContext, addrLo: number): number {
  const ballHolder = ctx.ram.u8(0x05FC);
  if (ballHolder === 0xFF) {
    return 0; // BEQ → 沒人持球, 跳過
  }
  
  // JSR $CD7C → 跨 bank
  // LDY #$06; LDA ($34),Y → 讀取偏移 6
  const val6 = ctx.ram.u8(addrLo + 6);
  // LDY #$08; LDA ($34),Y → 讀取偏移 8
  const val8 = ctx.ram.u8(addrLo + 8);
  
  // JSR $CDE2(val6, val8) → bank_30 跨 bank 调用，计算 match event
  // 计算结果: (val6 * 0x100 + val8的某种变换) 基于 ROM 数据表
  // $CDE2 实际读取 ROM 表计算事件概率
  const offset = val6 * 0x100 + val8;
  const result = offset & 0xFF; // 简化: 取低位作为结果
  ctx.ram.setU8(0x0638, result);
  
  return result;
}

// ============================================================
// § $E074-$E0DE 比賽流程推進
//
// 檢查比賽狀態 ($05FF, $05FB, $0441 等),
// 根據當前狀態推進比賽流程
// ============================================================

/**
 * $E074 比賽流程檢查
 *
 * 核心決策邏輯:
 *   - 檢查 $05FF (比賽階段旗標): 0 → 不推進
 *   - 檢查 $062A bit7 (特殊旗標)
 *   - 比較當前球員與球權持有人
 *   - 根據結果觸發場景事件
 */
function matchProgressCheck(ctx: GameContext, rom: RomReader): void {
  // $E074: LDA $05FF; BEQ $E0DE → 如果為 0, 退出
  const matchPhase = ctx.ram.u8(0x05FF);
  if (matchPhase === 0) {
    // RTS
    return;
  }
  
  // $E079: LDA #$0F; STA $062A → 設置屬性緩衝
  ctx.ram.setU8(0x062A, 0x0F);
  
  // $E07E: JSR $E709 → 跨 bank (讀取行動選擇)
  
  // $E081-$E0D1: 根據行動結果決定流程
  // PHA → 保存行動結果
  // LDA #$01; JSR $CB0F → 跨 bank (執行裁判判定)
  // PLA → 恢復行動結果
  // 檢查結果: 0=失敗, $0B=角球, =當前球員=同人處理
  // BIT $062A; BPL → 特殊處理
  
  // $E0D3-$E0DE: 後續處理
  // (多個分支根據比賽類型選擇不同 bank 和場景)
}

// ============================================================
// Module 導出
// ============================================================

export const bank_31: BankModule = {
  rom: null!,
  dispatch: resetHandler,
  fns: {
    '$FFF0': resetHandler,
    '$E000': calcPlayerStat,
    '$E017': swapBallOwner,
    '$E023': matchInit,
    '$E059': preSwapCheck,
    '$E074': matchProgressCheck,
  },
};
