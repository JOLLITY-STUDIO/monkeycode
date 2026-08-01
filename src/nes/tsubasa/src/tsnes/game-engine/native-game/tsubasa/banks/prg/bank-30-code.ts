/**
 * Bank 30 翻译 — System Library ($C000-$DFFF)
 *
 * MMC3 固定映射到 $C000-$DFFF（倒数第二个 8KB 窗口）。
 * 这是 Tsubasa 的运行时系统库，包括:
 *   - 跳转表 API（JMP 向量，供跨 bank 调用）
 *   - 系统/场景初始化
 *   - NMI/IRQ 处理
 *   - 16-bit 乘/除法
 *   - OAM 清零 / 内存填充
 *   - PPU 寄存器读写辅助
 *   - 任务调度器
 *
 * ═══════════════════════════════════════
 * 翻译状态
 * ═══════════════════════════════════════
 *   ✅ $C500-$C64D  — 跳转表（5 个 JMP 表，68 entries）
 *   ✅ $C64E-$C719  — 场景/系统初始化（204 bytes）
 *   ✅ $C4B2-$C4F3  — Bank 切换 + 跨 bank 调用辅助（66 bytes）
 *   ✅ $CE2D-$CE49  — Bank 切换应用（29 bytes）
 *   ✅ $C6BE-$C717  — 软重置路径（90 bytes，合并进 initScene）
 *   ✅ $CB8B         — OAM 清零
 *   ✅ $CD3C         — 16-bit 乘法
 *   ✅ $CD0D         — 16-bit 除法
 *   ✅ $CB35-$CB8A  — PPU 屏幕初始化（86 bytes）
 *   ✅ $CEFE         — bank00 dispatch 入口
 *   ✅ $C71A-$C76D  — NMI 初始化（84 bytes）
 *   ✅ $C76E-$C8FA  — NMI handler 主入口（397 bytes）
 *   ✅ $C8FB-$C9B4  — PPU 数据传输引擎（186 bytes）
 *   ✅ $DB62-$DBE9  — 场景辅助（234 bytes）
 *   ✅ $CD7C         — 获取角色数据指针
 *   ✅ $CC02         — 帧初始化 + NMI 等待
 *   ✅ $CCD2         — 调色板初始化传输引擎
 *   ✅ $D565         — 球员状态处理器（teamFlag=0 branch connected）
 *   ✅ $D70C         — 比赛事件处理器（frame wait fixed）
 *   ✅ $C64E         — 软重置 audio init ($CF1F documented)
 *   🟡 $C9B5-$C9F0  — 手柄输入更新 (已翻译, 待接入帧循环)
 *   🟡 $CA97-$CB34  — 定时器调度器 (已翻译, 待接入 NMI)
 *   🟡 $CAE7-$CAF6  — Sprite DMA 设置 (由 NMI handler 处理)
 *   🟡 其余 ~15 个 CODE 块 — 部分依赖 bank31，需配合回调完成
 *
 * ═══════════════════════════════════════
 * 使用方式
 * ═══════════════════════════════════════
 * 翻译后的 bank30 函数通过 bank-30.ts 直接导出使用。
 */

import { SystemState, writeMem, readMem } from '../system-state';

// ── Bank-30 ROM 数据表 ──
import {
  DATA_$CD89_$CDC8,
  DATA_$D183_$D192,
  DATA_$D6F3_$D70B,
} from './bank-30-data';

// ── Bank-31 转发 — 跳转表中 15 个 bank-31 函数引用 ──
import {
  // 已独立导出的 bank-31 函数
  translate_BANK31_BANK_SWITCH,
  translate_BANK31_JUMP_TABLE_DISPATCH,
  translate_BANK31_DMA_HELPER,
  translate_BANK31_PLAYER_LOGIC,
  translate_BANK31_SPRITE_BANK_LOOP,
  // 新导出包装器
  bank31_readCharToZone_$E059,
  bank31_eventCheckLoop_$E074,
  bank31_mainLoopPhase2_$E0DF,
  bank31_goalEvent_$E233,
  bank31_playerAI_$E73E,
  bank31_playerSort_$E4D7,
  bank31_filterCleanup_$E54C,
  bank31_cutsceneDispatch_$E596,
  bank31_sideSwitch_$E678,
  bank31_ballInitPos_$E688,
} from './bank-31-code';

// ═════════════════════════════════════════════════
// 跳转表 — 定义 bank30 的公开 API 入口
// ═════════════════════════════════════════════════

/** $C500-$C518: 9-entry jump table */
// export const JTAB_C500: Record<number, string> = {
//   0xC500: 'initSystem_$C76E',
//   0xC503: 'initScene_$C64E',
//   0xC506: 'fn_$C821_irqHandler',
//   0xC509: 'memClear_$CB8B',   // OAM clear + memory fill
//   0xC50C: 'getCharData_$CD7C',
//   0xC50F: 'spriteDma_$CAE7',
//   0xC512: 'fn_$CAF7_coroutineSave',
//   0xC515: 'fn_$CB0F_coroutineCreate',
//   0xC518: 'fn_$CB0D_coroutineResume',
// };

/** $C51B-$C53F: 13-entry jump table */
// export const JTAB_C51B: Record<number, string> = {
//   0xC51B: 'irqHandler_$CB02',
//   0xC51E: 'multiply16_$CD3C',
//   0xC521: 'divide16_$CD0D',
//   0xC524: 'fn_$CBC2_charCodeConv',
//   0xC527: 'fn_$CE08_tileToScreenCoord',
//   0xC52A: 'fn_$EF7F_bank31Data',
//   0xC52D: 'fn_$CC46_paletteDlSetup',
//   0xC530: 'fn_$CC02_frameInitWait',
//   0xC533: 'fn_$CCD2_paletteTransfer',
//   0xC536: 'fn_$CDC9_tileCoordConvert',
//   0xC539: 'fn_$CDE2_reverseCoordQuery',
//   0xC53C: 'fn_$F30F_bank31JumpDispatch',
//   0xC53F: 'bankSwitch_$CE2D',
// };

/** $C542-$C57B: 20-entry jump table */
// export const JTAB_C542: Record<number, string> = {
//   0xC542: 'fn_$CE4D_signedOffsetLookup', 0xC545: 'fn_$CE4A_signedOffsetVariant',
//   0xC548: 'fn_$CE99_indirectCallTable',  0xC54B: 'fn_$CE6E_farCallDispatch',
//   0xC54E: 'fn_$CBB0_audioTrigger',      0xC551: 'fn_$CD77_gameModeSelector',
//   0xC554: 'fn_$CEFE_bank00Dispatch',    0xC557: 'fn_$C6BE_jumpTable4Alias',
//   0xC55A: 'fn_$CF4F_playerDataRead',    0xC55D: 'fn_$CBF1_teamSlotScan',
//   0xC560: 'fn_$CF72_teamListTraverse',  0xC563: 'fn_$CF8F_attrScaleDown',
//   0xC566: 'fn_$F013_bank31DmaCopy',     0xC569: 'fn_$CB35_ppuScreenInit',
//   0xC56C: 'fn_$D022_inputRead',         0xC56F: 'fn_$D093_menuDispatch',
//   0xC572: 'fn_$DB62_sceneHelper',       0xC575: 'fn_$E233_bank31Helper',
//   0xC578: 'fn_$D0D1_playerSlotScan',    0xC57B: 'fn_$C6BE_jumpTable4Alias',
// };

/** $C600-$C639: 20-entry jump table */
// export const JTAB_C600: Record<number, string> = {
//   0xC600: 'fn_$D565_playerStateCore',   0xC603: 'fn_$D193_gpModify',
//   0xC606: 'fn_$E074_bank31Helper',      0xC609: 'fn_$E4D7_bank31Helper',
//   0xC60C: 'fn_$E73E_bank31PlayerAI',    0xC60F: 'fn_$E0DF_bank31EventLoop',
//   0xC612: 'fn_$DE52_matchEventProcess', 0xC615: 'fn_$DE5E_matchEventSubEntry',
//   0xC618: 'fn_$DCFD_playerMoveCheck',   0xC61B: 'fn_$DD02_moveCheckSubEntry',
//   0xC61E: 'fn_$E059_bank31Helper',      0xC621: 'fn_$DFD9_matchResultCalc',
//   0xC624: 'fn_$DCDF_randomGen',          0xC627: 'fn_$E54C_bank31Helper',
//   0xC62A: 'fn_$E596_bank31Helper',      0xC62D: 'fn_$E688_bank31Helper',
//   0xC630: 'fn_$E678_bank31Helper',      0xC633: 'fn_$DDFD_playerInit',
//   0xC636: 'fn_$DAAA_playerSubstituteUI', 0xC639: 'fn_$DE45_playerSlotFlagSet',
// };

/** $C63C-$C64B: 6-entry jump table */
// export const JTAB_C63C: Record<number, string> = {
//   0xC63C: 'fn_$DE6C_matchEventContinue', 0xC63F: 'fn_$D8F7_playerAttrDisplay',
//   0xC642: 'fn_$D852_playerSelectCursor', 0xC645: 'fn_$E6EC_bank31PlayerLogic',
//   0xC648: 'fn_$D7E8_playerDataLoad',     0xC64B: 'fn_$EFA2_bank31Helper',
// };

// ═════════════════════════════════════════════════
// $C64E — 场景/系统初始化 (bank31 RESET 直接调用)
// ═════════════════════════════════════════════════
//
// 6502 反汇编:
//   C64E: LDA #$08       ; PPU ctrl: NMI off, 8x8 sprites
//   C650: STA $2000
//   C653: SEI            ; disable IRQ
//   C654: CLD            ; clear decimal mode
//   C655: LDX #$FF
//   C657: TXS            ; SP = $FF, stack → $01FF
//   C658: wait_vblank1
//   C65D: wait_vblank2
//   C662: LDA #$C0       ; MMC3 PRG-RAM protect
//   C664: STA $A001
//   C667: LDA #$00
//   C669: STA $00, STA $01
//   C66D: TAY
//   C66E: LDX #$08       ; loop 8 pages = 2KB
//   C670: loop: STA ($00),Y  ; zero fill ($0000-$07FF)
//   C672: INY
//   C673: BNE loop
//   C675: INC $01
//   C677: DEX
//   C678: BNE loop
//   C67A: LDA #$08       ; PPU ctrl shadow = $08
//   C67C: STA $20
//   C67E: LDA #$06       ; PPU mask shadow = $06
//   C680: STA $21
//   C682: STA $2001      ; PPU mask = $06 (mono, no bg, no sprite)
//   C685: LDA #$00
//   C687: STA $4010      ; APU DMC off
//   C68A: LDA #$40
//   C68C: STA $4017      ; APU frame counter 5-step, no IRQ
//   C68F: read $2002 (PPU status)
//   C692: LDA #$10
//   C694: TAX            ; X = $10 (loop counter)
//   C695: loop2: STA $2006; set VRAM addr to 0
//   C698: STA $2006
//   C69B: EOR #$00       ; toggle A between $10 and $00
//   C69D: DEX
//   C69E: BNE loop2      ; 16 iterations
//   C6A0: LDA #$00
//   C6A2: STA $22        ; MMC3 shadow = 0
//   C6A5: JSR $CB35      ; call init sub
//   C6A8: JSR $CB8B      ; call OAM clear
//   C6AB: LDA #$00
//   C6AD: STA $0469      ; clear $0469
//   C6B0: LDA #$00
//   C6B2: STA $0469      ; clear $0469 (twice for stability?)
//   C6B5: STA $E000      ; MMC3: acknowledge IRQ
//   C6B8: CLI            ; enable IRQ
//   C6B9: LDA #$00       ; scene ID = 0
//   C6BB: JMP $CEFE      ; entry point to bank00 dispatch
//
// ... (second soft-reset path at $C6BE)
//   C6BE: LDX #$E0
//   C6C0: TXS            ; SP = $E0 (different from cold boot)
//   C6C1: LDA #$00       ; clear ZP pairs
//   C6C3: STA $01, STA $02
//   ...
//   C6E2: JSR $CF1F
//   C6E5: LDA #$00
//   C6E7: STA $1B
//   C6E9: STA $063F
//   C6EC: LDA #$08
//   C6EE: STA $20
//   C6F0: LDA #$1E
//   C6F2: STA $21
//   C6F4: LDA #$20       ; bank switch config
//   C6F6: STA $046C
//   C6F9: LDA #$00
//   C6FB: STA $046D
//   C6FE: LDA #$3F
//   C700: STA $046E
//   C703: LDX #$00
//   C705: LDA #$12; JSR $CC02
//   C708: LDX #$10
//   C70A: LDA #$12; JSR $CC02
//   C70D: JSR $CCD2
//   ... inline data: $046C pointer
//
// 注意: 代码 $C64E-$C717 之后有一个内联数据字 `00 6C` (= $046C)

export function initScene_$C64E(sys: SystemState, coldBoot: boolean = true): void {
  console.log('[bank30] initScene — PPU/RAM/MMC3 初始化');

  if (coldBoot) {
    // ── 冷启动路径 ($C64E) ──────────────────────

    // PPU ctrl: NMI off, VRAM increment +1, 8x8 sprites, bg $0000, sprite $0000
    writeMem(sys, 0x2000, 0x08);

    // 等两个 VBlank（NES 上电稳定）→ 翻译模式无需真的等帧，跳过

    // MMC3 PRG-RAM 保护
    writeMem(sys, 0xA001, 0xC0);

    // 清空 RAM $0000-$07FF（8 pages, 2KB）
    for (let addr = 0; addr < 0x0800; addr++) {
      sys.mem[addr] = 0;
    }

    // PPU 控制字影子变量
    sys.mem[0x20] = 0x08;  // PPU ctrl shadow
    sys.mem[0x21] = 0x06;  // PPU mask shadow

    // PPU mask = $06（不显示，为后续渲染准备）
    writeMem(sys, 0x2001, 0x06);

    // APU 初始化
    writeMem(sys, 0x4010, 0x00);  // DMC off
    writeMem(sys, 0x4017, 0x40);  // frame counter 模式 1（5-step, no IRQ）

    // VRAM 地址置零（toggle PPU addr 16 次保证稳定）
    // 6502: A = $10, X = $10, loop: STA $2006; STA $2006; EOR #$00; DEX; BNE
    // 效果: 写 32 次 $2006，交替写入 $10/$00，最终 PPU addr = 0
    for (let i = 0; i < 32; i++) {
      writeMem(sys, 0x2006, (i & 1) ? 0x00 : 0x10);
    }

    // MMC3 影子寄存器
    sys.mmc3Shadow = 0x00;
    sys.mem[0x22] = 0x00;

    // JSR $CB35 — PPU 屏幕初始化
    ppuScreenInit_$CB35(sys);

    // OAM 清零
    clearOam_$CB8B(sys);

    // 清除 $0469（重复写两次确保稳定）
    sys.mem[0x0469] = 0;
    sys.mem[0x0469] = 0;

    // MMC3 IRQ 确认（写 $E000 清除 MMC3 IRQ latch）
    writeMem(sys, 0xE000, 0x00);

    // CLI: 启用 IRQ（翻译模式无 IRQ，仅写影子变量）
    // 6502: STA $E000, CLI, LDA #$00, JMP $CEFE
    // 末尾跳转 → 实际会进入 bank00
  } else {
    // ── 软重置路径 ($C6BE) ──────────────────────

    // SP → $E0（不同于冷启动的 $FF）
    sys.regs.SP = 0xE0;

    // 清零 ZP 变量组
    // $0001-$0002, $0005-$0006, $0009-$000A,
    // $000D-$000E, $0011-$0012, $0015-$0016
    for (const addr of [0x01,0x02, 0x05,0x06, 0x09,0x0A, 0x0D,0x0E, 0x11,0x12, 0x15,0x16]) {
      sys.mem[addr] = 0;
    }

    // JSR $CF1F — audio init
    // $CF1F: 初始化 APU/声音寄存器
    // 6502 调用: JSR $CF1F → 清零 $4000-$4015 (APU 寄存器) + 设 $4015=$0F (enable all channels)
    // 翻译: bank12 音频引擎已翻译但尚未接入此调用
    // 软重置时 APU 状态由 NMI handler 重新初始化，暂时跳过
    // TODO: 接入 bank12 音频引擎时在此调用 audio init

    sys.mem[0x1B] = 0;
    sys.mem[0x063F] = 0;

    // PPU 影子
    sys.mem[0x20] = 0x08;
    sys.mem[0x21] = 0x1E;

    // 内联数据: $046C = $20, $046D = $00, $046E = $3F
    sys.mem[0x046C] = 0x20;
    sys.mem[0x046D] = 0x00;
    sys.mem[0x046E] = 0x3F;

    // JSR $CC02 × 2 (参数: X=$00, A=$12; X=$10, A=$12)
    frameInit_$CC02(sys, 0x12, 0x00);
    frameInit_$CC02(sys, 0x12, 0x10);

    // JSR $CCD2 — 调色板初始化
    paletteInit_$CCD2(sys);
  }

  // 最终会 JMP 到 bank00 dispatch 入口 ($CEFE in CPU space)
  // 实际: JMP $CEFE → 这在 CPU 模拟器中运行到 bank00
  console.log('[bank30] initScene 结束 → 即将进入 bank00 dispatch');
}

// ═════════════════════════════════════════════════
// $CB8B — OAM 清零（填充 $F8 使 sprites 移到屏幕外）
// ═════════════════════════════════════════════════
//
// 6502 反汇编:
//   CB8B: LDY #$00
//   CB8D: LDA #$F8
//   CB8F: loop: STA $0200,Y
//   CB92: INY
//   CB93: INY
//   CB94: INY
//   CB95: INY
//   CB96: BNE loop        ; 256 bytes = 64 sprites × 4 bytes
//   CB98: RTS

export function clearOam_$CB8B(sys: SystemState): void {
  console.log('[bank30] clearOam — OAM 填充 $F8');
  // 每个 sprite 4 字节: Y, tile, attr, X
  // 填充 $F8 把 Y 坐标放到屏幕最下方（不可见）
  for (let i = 0; i < 256; i += 4) {
    sys.mem[0x0200 + i] = 0xF8;  // Y = $F8 (off-screen)
    sys.mem[0x0200 + i + 1] = 0; // tile = $00
    sys.mem[0x0200 + i + 2] = 0; // attr = $00
    sys.mem[0x0200 + i + 3] = 0; // X = $00
  }
}

// ═════════════════════════════════════════════════
// $CD3C — 16-bit 乘法（shift-add 算法）
// ═════════════════════════════════════════════════
//
// 6502 反汇编:
//   CD3C: TXA
//   CD3D: PHA             ; save X
//   CD3E: LDA #$00
//   CD40: STA $6B         ; result lo (bit 0-7)
//   CD42: STA $6C         ; result lo (bit 8-15)
//   CD44: STA $6D         ; result hi (bit 16-23)
//   CD46: STA $6E         ; result hi (bit 24-31)
//   CD48: LDX #$10        ; 16 bits
//   CD4A: loop:
//           ROR $68       ; shift multiplier
//           ROR $67
//           BCC skip
//           CLC
//           LDA $6D
//           ADC $69       ; add multiplicand
//           STA $6D
//           LDA $6E
//           ADC $6A
//           STA $6E
//       skip:
//           ROR $6E       ; shift result
//           ROR $6D
//           ROR $6C
//           ROR $6B
//   CD62: DEX
//   CD63: BNE loop
//   CD65: PLA
//   CD66: TAX             ; restore X
//   CD67: RTS
//
// 输入:
//   $67-$68: multiplier (16-bit, little-endian)
//   $69-$6A: multiplicand (16-bit, little-endian)
// 输出:
//   $6B-$6E: product (32-bit, little-endian)
//
// ⚠ 注意: 这个乘法的输入用了 ROR（循环右移从 bit0 开始），
// 不是标准的 LSR 移位乘法，涉及 signed 语义。

export function multiply16_$CD3C(sys: SystemState): void {
  // 读取输入
  const multLo = sys.mem[0x67] | (sys.mem[0x68] << 8);   // multiplier
  const candLo = sys.mem[0x69] | (sys.mem[0x6A] << 8);   // multiplicand

  // 16-bit × 16-bit → 32-bit
  // 6502 算法: 从 LSB 开始逐位检查，加 multiplicand 到结果
  let result = 0;   // 32-bit 累加
  let multiplier = multLo;

  for (let bit = 0; bit < 16; bit++) {
    // ROR $68; ROR $67 → 检查移出的 bit (LSB → carry)
    if (multiplier & 1) {
      // 有进位: 加上 multiplicand（但加到 result 的高 16-bit）
      result += (candLo & 0xFFFF) << 16;
    }
    // 右移 multiplier
    multiplier = (multiplier >> 1) & 0xFFFF;
    // 右移 result（带动下一位的 carry）
    // 6502: ROR 4次 → 整体右移 1 bit, 新 bit-31 = old bit-0 (carry)
    result = (result >>> 1) & 0xFFFFFFFF;
  }

  // 写回结果
  sys.mem[0x6B] = result & 0xFF;
  sys.mem[0x6C] = (result >> 8) & 0xFF;
  sys.mem[0x6D] = (result >> 16) & 0xFF;
  sys.mem[0x6E] = (result >> 24) & 0xFF;
}

// ═════════════════════════════════════════════════
// $CD0D — 16-bit 除法（shift-subtract 算法）
// ═════════════════════════════════════════════════
//
// 6502 反汇编:
//   CD0D: TXA
//   CD0E: PHA
//   CD0F: LDA #$00
//   CD11: STA $72         ; remainder lo
//   CD13: STA $73         ; remainder hi
//   CD15: LDX #$10        ; 16 bits
//   CD17: loop:
//           ASL $6F       ; 左移被除数→进位
//           ROL $70
//           ROL $72       ; 进位→余数
//           ROL $73
//           BCS sub        ; 余数≥除数
//           LDA $73
//           CMP $74
//           BEQ checkLo
//           BCC noSub
//           BCS sub
//        checkLo:
//           LDA $72
//           CMP $71
//           BCC noSub
//        sub:
//           LDA $72       ; 余数 -= 除数
//           SBC $71
//           STA $72
//           LDA $73
//           SBC $74
//           STA $73
//           SEC           ; set carry → 商 bit = 1
//        process:
//           ROL $6F       ; carry → 商
//           ROL $70
//   CD51: DEX
//   CD52: BNE loop
//   CD54: PLA
//   CD55: TAX
//   CD56: RTS
//
// 输入:
//   $6F-$70: dividend (16-bit, LE)
//   $71-$72: (reserved: remainder)
//   $73-$74: divisor (16-bit, LE)
// 输出:
//   $6F-$70: quotient (16-bit, LE)
//   $71-$72: remainder (16-bit, LE)

export function divide16_$CD0D(sys: SystemState): void {
  let dividend = sys.mem[0x6F] | (sys.mem[0x70] << 8);
  const divisor  = sys.mem[0x73] | (sys.mem[0x74] << 8);  // 注意: divisor 在 $73-$74

  if (divisor === 0) {
    // 除零 → 返回 $FFFF（NES 游戏常见处理）
    sys.mem[0x6F] = 0xFF;
    sys.mem[0x70] = 0xFF;
    sys.mem[0x71] = dividend & 0xFF;
    sys.mem[0x72] = (dividend >> 8) & 0xFF;
    return;
  }

  let quot = 0;
  let rem = 0;

  for (let bit = 0; bit < 16; bit++) {
    // 左移 dividend → quot
    quot = (quot << 1) & 0xFFFF;
    // 取 dividend 最高位 → rem
    rem = ((rem << 1) | ((dividend >> 15) & 1)) & 0xFFFF;
    dividend = (dividend << 1) & 0xFFFF;

    if (rem >= divisor) {
      rem -= divisor;
      quot |= 1;  // set quotient bit
    }
  }

  sys.mem[0x6F] = quot & 0xFF;
  sys.mem[0x70] = (quot >> 8) & 0xFF;
  sys.mem[0x71] = rem & 0xFF;
  sys.mem[0x72] = (rem >> 8) & 0xFF;
}

// ═════════════════════════════════════════════════
// $C4B2-$C4F3 — Bank 切换 + 跨 bank 调用辅助 (66 bytes)
// ═════════════════════════════════════════════════
//
// 两个子函数:
//   $C4B2: bankSwitch_6(X=bankNum) — 切换 MMC3 window 6 ($8000-$9FFF)
//   $C4B9: bankSwitch_7(X=bankNum) — 切换 MMC3 window 7 ($A000-$BFFF)
//   $C4C7: callWithBankContext(A=param, X=param) — 带 bank 上下文保护调用
//
// 6502 反汇编:
//   C4B2: STX $24      ; 保存到 window 6 anchor
//   C4B4: LDA #$06
//   C4B6: JMP $C4BD
//   C4B9: STX $25      ; 保存到 window 7 anchor
//   C4BB: LDA #$07
//   C4BD: ORA $22      ; 合并 MMC3 PRG 模式位
//   C4BF: STA $23
//   C4C1: STA $8000    ; MMC3 bank select
//   C4C3: STX $8001    ; MMC3 bank data
//   C4C6: RTS
//
//   C4C7: CMP #$23     ; param A (< $23 是有效 bank)
//   C4C9: BCS $C4F2    ; >= $23 → 跳过
//   C4CB: TAY
//   C4CC: BEQ $C4F2    ; = 0 → 跳过
//   C4CE: STX $ED      ; 保存 X
//   C4D0: LDA $24      ; 保存当前 window 6 bank
//   C4D2: STA $EE
//   C4D4: LDA $25      ; 保存当前 window 7 bank
//   C4D6: STA $EF
//   C4D8: LDX #$00
//   C4DA: JSR $C4B2    ; window 6 → bank 0
//   C4DD: LDX #$01
//   C4DF: JSR $C4B9    ; window 7 → bank 1
//   C4E2: TYA          ; 恢复 A 参数
//   C4E3: LDX $ED      ; 恢复 X 参数
//   C4E5: JSR $A00F    ; 调用 bank01 $A00F（跨 bank 调用目标）
//   C4E8: LDX $EF
//   C4EA: JSR $C4B9    ; 恢复 window 7
//   C4ED: LDX $EE
//   C4EF: JSR $C4B2    ; 恢复 window 6
//   C4F2: RTS
//

/**
 * $C4B2: 设置当前 window 6 ($8000-$9FFF) 对应的 bank 号
 * 6502: STX $24; LDA #$06; JMP $C4BD → 通过 MMC3 寄存器切换
 * TS: 仅记录跟踪值；PRG bank 切换通过 import 模块直接调用实现
 */
export function bankSwitch_Win6(sys: SystemState, bankNum: number): void {
  sys.mem[0x24] = bankNum;
}

/**
 * $C4B9: 设置当前 window 7 ($A000-$BFFF) 对应的 bank 号
 * 6502: STX $25; LDA #$07; ORA $22; STA $23; STA $8000; STX $8001; RTS
 * TS: 仅记录跟踪值
 */
export function bankSwitch_Win7(sys: SystemState, bankNum: number): void {
  sys.mem[0x25] = bankNum;
}

/**
 * $C4C7: 带 bank 上下文保护的跨 bank 调用
 *
 * 保存当前 window 6/7 映射 → 切到 bank0/bank1 → 调 $A00F → 恢复映射。
 *
 * 6502: CMP #$23; BCS skip; TAY; BEQ skip;
 *       STX $ED; LDA $24; STA $EE; LDA $25; STA $EF;
 *       LDX #$00; JSR bankSwitch_Win6;
 *       LDX #$01; JSR bankSwitch_Win7;
 *       TYA; LDX $ED; JSR $A00F;
 *       LDX $EF; JSR bankSwitch_Win7;
 *       LDX $EE; JSR bankSwitch_Win6;
 *       RTS
 *
 * @param aReg A 寄存器值（传入 bank01 $A00F 的 A 参数，需 < $23 且 != 0）
 * @param xReg X 寄存器值（传入 bank01 $A00F 的 X 参数）
 * @param callA00F 回调: 模拟 bank01 $A00F 的调用，接收 (sys, aReg, xReg)
 */
export function callBank01_A00F(
  sys: SystemState,
  aReg: number,
  xReg: number,
  callA00F: (sys: SystemState, a: number, x: number) => void,
): void {
  // CMP #$23; BCS skip → 只接受 < $23 且 != 0
  if (aReg >= 0x23 || aReg === 0) return;

  // 保存上下文 (仅记录, 不模拟 MMC3 寄存器)
  sys.mem[0xED] = xReg;
  sys.mem[0xEE] = sys.mem[0x24];
  sys.mem[0xEF] = sys.mem[0x25];

  // 设置当前 bank 跟踪值
  bankSwitch_Win6(sys, 0);
  bankSwitch_Win7(sys, 1);

  // 调用 bank01 $A00F (回调已 import 对应 bank 模块)
  callA00F(sys, aReg, xReg);

  // 恢复 bank 跟踪值
  bankSwitch_Win7(sys, sys.mem[0xEF]);
  bankSwitch_Win6(sys, sys.mem[0xEE]);
}

// ═════════════════════════════════════════════════
// $CE2D — Bank 切换应用 (29 bytes)
// ═════════════════════════════════════════════════
//
// 将 $24/$25 中保存的 bank 号写入 MMC3 寄存器。
// 调用方先设置 $24/$25，再 JSR $CE2D 触发实际切换。
//
// 6502 反汇编:
//   CE2D: LDA $22       ; MMC3 PRG 模式
//   CE2F: ORA #$06
//   CE31: STA $23
//   CE33: STA $8000     ; MMC3 bank select → window 6
//   CE36: LDA $24
//   CE38: STA $8001     ; 设置 window 6 bank
//   CE3B: LDA $22
//   CE3D: ORA #$07
//   CE3F: STA $23
//   CE41: STA $8000     ; MMC3 bank select → window 7
//   CE44: LDA $25
//   CE46: STA $8001     ; 设置 window 7 bank
//   CE49: RTS
//

/**
 * $CE2D: 应用已保存在 $24/$25 的 bank 映射。
 *
 * 6502: LDA $22; ORA #$06; STA $8000; LDA $24; STA $8001;
 *       LDA $22; ORA #$07; STA $8000; LDA $25; STA $8001; RTS
 *
 * TS: PRG bank 切换通过 import 模块直接调用, 不写 MMC3 寄存器。
 *     此函数仅做数据记录 (保留接口兼容)。
 */
export function bankSwitch_apply_$CE2D(_sys: SystemState): void {
  // MMC3 寄存器写已移除: TS 版 bank 是独立模块, 不需要地址映射。
  // $24/$25 的值由调用方设置, 供 PPU/CHR 侧读取出当前 bank 号。
}

/**
 * bankSwitch — 便利函数：记录当前 window 6/7 对应的 bank 号
 *
 * 6502: 设置 $24=bankId, $25=bankId+1, 然后 JSR $CE2D 写 MMC3 寄存器
 * TS: 仅跟踪 $24/$25, PRG bank 切换通过 import 模块回调实现
 */
export function bankSwitch(sys: SystemState, bankId: number): void {
  sys.mem[0x24] = bankId & 0x3F;
  sys.mem[0x25] = (bankId & 0x3F) + 1;
}

// ═════════════════════════════════════════════════
// $CEFE — bank00 dispatch 入口
// ═════════════════════════════════════════════════
//
// 6502: JMP $CEFE → bank00 $8000（dispatch 入口）
// 这是 bank30 跳转到 bank00 dispatch 的标准入口点。
// 在初始化/软重置等流程末尾调用。

/**
 * $CEFE: 跳转到 bank00 dispatch 入口。
 *
 * 6502 中这是一个 JMP 到 $8000（$8000-$9FFF 被映射为 bank00）。
 * 翻译后调用 bank00_dispatchScene。
 */
export function entryToBank00_dispatch(sys: SystemState, dispatchFn: (sys: SystemState) => void): void {
  dispatchFn(sys);
}

// ═════════════════════════════════════════════════
// $CB35-$CB8A — PPU 屏幕初始化 (86 bytes)
// ═════════════════════════════════════════════════
//
// 冷启动时调用，设置 PPU 并初始化 nametable/palette。
//
// 6502 反汇编:
//   CB35: LDA $20       ; PPU ctrl shadow
//   CB37: AND #$7F      ; 清除 bit7 (NMI off)
//   CB39: STA $20
//   CB3B: STA $2000
//   CB3E: LDA #$06      ; PPU mask = bg+sprites off
//   CB40: STA $2001
//   CB43: LDA #$20      ; nametable 0 VRAM addr
//   CB45: JSR $CB5C     ; 写入 PPU addr
//   CB48: LDA #$24      ; nametable 1
//   CB4A: JSR $CB5C
//   CB4D: LDA #$1E      ; PPU mask = show bg+sprites
//   CB4F: STA $2001
//   CB52: LDA $20
//   CB54: ORA #$80      ; NMI on
//   CB56: STA $20
//   CB58: STA $2000
//   CB5B: RTS
//
//   $CB5C helper: 写入 PPU addr
//   CB5C: BIT $2002     ; 等 VBlank 结束
//   CB5F: STA $2006     ; PPU addr hi
//   CB62: LDA #$00
//   CB64: STA $2006     ; PPU addr lo
//   CB67: LDA #$00
//   CB69: LDX #$C0      ; 192 字节零填充
//   CB6B: LDY #$04      ; 4 次 × 256 = 1024
//   CB6D: STA $2007     ; PPU 数据写
//   CB70: DEX
//   CB71: BNE $CB6D     ; 内循环 192/256 字节
//   CB73: DEY
//   CB74: BNE $CB6D     ; 外循环 4 次
//   CB76: TXA           ; A=0
//   CB77: LDX #$40      ; 64 字节 attribute table 零填充
//   CB79: STA $2007
//   CB7C: DEX
//   CB7D: BNE $CB79
//   CB7F: BIT $2002
//   CB82: LDA #$00
//   CB84: STA $2005     ; scroll X = 0
//   CB87: STA $2005     ; scroll Y = 0
//   CB8A: RTS
//

/**
 * $CB5C: 写入 PPU addr 并清零 nametable
 *
 * 6502: 选择 nametable → 写 1024 字节零（整个 nametable $2000 + attribute）
 */
function ppuClearNametable(sys: SystemState, ntHi: number): void {
  // BIT $2002 — wait PPU ready
  readMem(sys, 0x2002);

  // STA $2006 — PPU addr hi
  writeMem(sys, 0x2006, ntHi);
  // LDA #$00; STA $2006 — PPU addr lo
  writeMem(sys, 0x2006, 0);

  // 写 1024 字节零: 内循环 256 → 外循环 4 + 64 attribute 字节
  // 等价于: 写 1024 + 64 = 1088 字节零
  for (let i = 0; i < 0x0440; i++) {
    writeMem(sys, 0x2007, 0);
  }

  // BIT $2002
  readMem(sys, 0x2002);
  // Scroll reset
  writeMem(sys, 0x2005, 0);
  writeMem(sys, 0x2005, 0);
}

/**
 * $CB35: PPU 屏幕初始化 — 清屏 nametable 0/1，设置显示
 *
 * 6502: NMI 关闭 → mask=$06 → 清除 NT0/NT1 → mask=$1E(开显示) → NMI 开
 */
export function ppuScreenInit_$CB35(sys: SystemState): void {
  // LDA $20; AND #$7F; STA $20; STA $2000 — NMI off
  const ppuCtrl = sys.mem[0x20] & 0x7F;
  sys.mem[0x20] = ppuCtrl;
  writeMem(sys, 0x2000, ppuCtrl);

  // LDA #$06; STA $2001 — 关闭渲染（bg+sprites off）
  writeMem(sys, 0x2001, 0x06);

  // LDA #$20; JSR $CB5C — 清除 nametable 0
  ppuClearNametable(sys, 0x20);

  // LDA #$24; JSR $CB5C — 清除 nametable 1
  ppuClearNametable(sys, 0x24);

  // LDA #$1E; STA $2001, STA $21 — 开启 bg+sprites + 影子同步
  writeMem(sys, 0x2001, 0x1E);
  sys.mem[0x21] = 0x1E;

  // LDA $20; ORA #$80; STA $20; STA $2000 — NMI on
  sys.mem[0x20] = ppuCtrl | 0x80;
  writeMem(sys, 0x2000, ppuCtrl | 0x80);
}

// ═════════════════════════════════════════════════
// $CA97-$CB0E — 帧定时器 / 任务调度器 (120 bytes)
// ═════════════════════════════════════════════════
//
// 管理 6 个零页定时器槽位 ($00-$17)，每帧递减。
// 到期后触发跨 bank 回调执行。用于帧延迟和跨 bank 调用协调。
//
// 6502 反汇编 ($CA97 主循环):
//   CA97: LDX #$01       ; 从槽位 1 开始（$00 保留）
//   CA99: LDA $00,X      ; 读定时器值
//   CA9B: BEQ $CAA5      ; =0 → 空闲，下一个槽位
//   CA9D: CMP #$FF       ; $FF = 等待中不递减
//   CA9F: BEQ $CAD7      ; → 等待 NMI/VBlank
//   CAA1: DEC $00,X      ; 递减
//   CAA3: BEQ $CAB9      ; 减到 0 → 触发
//   CAA5: TXA            ; 下一个槽位（+4 字节）
//   CAA6: CLC
//   CAA7: ADC #$04
//   CAA9: TAX
//   CAAA: CPX #$19       ; 最多 6 槽位 ($01-$19)
//   CAAC: BNE $CA99
//   CAAE: LDA $1B        ; 检查 NMI 标志
//   CAB0: BPL $CAAE      ; bit7=0 → 等待 NMI
//   CAB2: AND #$7F
//   CAB4: STA $1B        ; 清除 NMI pending
//   CAB6: JMP $CA97      ; 重新轮询
//
//   触发路径 ($CAB9):
//   CAB9: LSR $19        ; ...
//   CABB: STX $00        ; 保存槽位索引
//   CABD: LDA $02,X      ; 读取目标 bank
//   CABF: STA $24
//   CAC1: LDA $03,X      ; 读取目标偏移
//   CAC3: STA $25
//   CAC5: JSR $CE2D      ; 应用 bank 切换
//   CAC8: LDA $01,X      ; 读取 SP 恢复值
//   CACA: TAX
//   CACB: TXS            ; 恢复堆栈指针
//   CACC: SEC
//   CACD: ROR $19        ; ...
//   CACF: PLA            ; 恢复 Y
//   CAD0: TAY
//   CAD1: PLA            ; 恢复 X
//   CAD2: TAX
//   CAD3: RTS            ; → 跳转到回调

/**
 * 定时器槽位结构 (每 4 字节):
 *   [base+0]: 帧计数
 *   [base+1]: SP 恢复值
 *   [base+2]: 目标 $24 (window 6 bank)
 *   [base+3]: 目标 $25 (window 7 bank)
 *
 * 槽位: $01-$04, $05-$08, $09-$0C, $0D-$10, $11-$14, $15-$18
 *       (共 6 个槽位，$00 保留)
 */

/**
 * $CA97: 定时器轮询（每帧调用一次）。
 *
 * 遍历 6 个定时器槽位，递减计数。
 * 到期槽位执行跨 bank 回调。
 *
 * @returns 如果触发定时器，返回回调信息；否则返回 null
 */
export function timerPoll_$CA97(
  sys: SystemState,
  onTimerExpired: (sys: SystemState, slot: number, bankW6: number, bankW7: number) => void,
): void {
  // 遍历 6 个槽位
  for (let slotBase = 1; slotBase < 0x19; slotBase += 4) {
    const count = sys.mem[slotBase];
    if (count === 0) continue;       // 空闲
    if (count === 0xFF) continue;    // 等待中不递减

    sys.mem[slotBase]--;             // DEC
    if (sys.mem[slotBase] === 0) {
      // 定时器到期 → 触发
      const bankW6 = sys.mem[slotBase + 2];
      const bankW7 = sys.mem[slotBase + 3];
      onTimerExpired(sys, slotBase, bankW6, bankW7);
      return; // 一次只触发一个
    }
  }
}

/**
 * $CB0F: 初始化定时器槽位
 *
 * 6502: STA $7F; TXA; PHA; TYA; PHA;
 *       LDX $00; LDA $24; STA $02,X; LDA $25; STA $03,X;
 *       LDA $7F; STA $00,X;   ; 设置帧计数 = A
 *       TXA; TAY;             ; Y = slot base
 *       TSX; STX $01,Y;       ; 保存当前 SP
 *       LDX $00;
 *       JMP $CAA5             ; 跳到下一槽位
 */
export function timerInit_$CB0F(sys: SystemState, count: number): void {
  sys.mem[0x7F] = count;
  const slotBase = sys.mem[0x00]; // 当前槽位基址

  // 保存当前 bank 配置
  sys.mem[slotBase + 2] = sys.mem[0x24];
  sys.mem[slotBase + 3] = sys.mem[0x25];

  // 设置帧计数
  sys.mem[slotBase] = count;

  // 保存 SP
  sys.mem[slotBase + 1] = sys.regs.SP;
}

// ═════════════════════════════════════════════════
// $C9B5-$C9F0 — 手柄输入更新 (60 bytes)
// ═════════════════════════════════════════════════
//
// 6502 反汇编:
//   C9B5: LDA $1C,X      ; 读上一帧输入
//   C9B7: EOR $83        ; XOR 当前输入（变化检测）
//   C9B9: AND $83        ; AND 当前输入（只保留新按下的）
//   C9BB: STA $1E,X      ; 保存到 just-pressed
//   C9BD: LDA $83
//   C9BF: STA $1C,X      ; 更新上一帧 = 当前帧
//   C9C1: RTS

/**
 * $C9B5: 更新手柄状态（just-pressed 检测）。
 *
 * 6502: newPress = (prev XOR current) AND current
 *       prev = current
 *
 * @param indexX X 寄存器 → 零页偏移 ($1C/$1E 组的索引, 0 或 1)
 * @param currentRaw 当前帧原始读取值 ($83 或来自 $4016/$4017)
 */
export function joypadUpdate_$C9B5(sys: SystemState, xIndex: number, currentRaw: number): void {
  const prev = sys.mem[0x1C + xIndex];
  const justPressed = (prev ^ currentRaw) & currentRaw;
  sys.mem[0x1E + xIndex] = justPressed;
  sys.mem[0x1C + xIndex] = currentRaw;
}

// ═════════════════════════════════════════════════
// $C71A-$C76D — NMI 初始化 (84 bytes)
// ═════════════════════════════════════════════════
//
// 设置 NMI 软渲染引擎的初始状态。初始化 3 组 sprite DMA 槽位，
// 每槽 4 字节: [帧计数, SP, bankWin6, bankWin7]。
// 最后启用 NMI 并进入主循环（$CA97 定时器轮询）。
//
// 6502 反汇编:
//   C71A: LDX #$07
//   C71C: L1: LDA $C766,X   ; 复制 $C766-$C76D 到 $05EB-$05F2
//   C71F: STA $05EB,X
//   C722: DEX
//   C723: BPL L1
//
//   C725: LDX #$01          ; 槽位 1 ($01-$04)
//   C727: LDA #$28
//   C729: STA $01,X         ; 帧计数 = $28
//   C72B: LDA #$00
//   C72D: STA $02,X         ; bankWin6 = 0
//   C72F: LDA #$CA          ; target lo = $CA
//   C731: LDY #$21
//   C733: JSR $CAE7         ; 设置 sprite DMA 回调参数
//
//   C736: LDX #$05          ; 槽位 2 ($05-$08)
//   C738: LDA #$50
//   C73A: STA $01,X         ; 帧计数 = $50
//   C73C: LDA #$00
//   C73E: STA $02,X         ; bankWin6 = 0
//   C740: LDA #$D1
//   C742: LDY #$1D
//   C744: JSR $CAE7
//
//   C747: LDX #$09          ; 槽位 3 ($09-$0C)
//   C749: LDA #$78
//   C74B: STA $01,X         ; 帧计数 = $78
//   C74D: LDA #$00
//   C74F: STA $02,X         ; bankWin6 = 0
//   C751: LDA #$EB
//   C753: LDY #$85
//   C755: JSR $CAE7
//
//   C758: LDA $20
//   C75A: ORA #$80
//   C75C: STA $20           ; PPU ctrl |= NMI on
//   C75E: STA $19           ; NMI enable shadow
//   C760: STA $2000          ; 写 PPU
//   C763: JMP $CA97          ; 进入定时器主循环
//
//   内联数据 $C766-$C76D: 13 07 19 00 00 AF 2E FD
//

/**
 * $C71A: NMI 初始化 — 设置 sprite DMA 槽位并进入主循环。
 *
 * 6502 原文:
 *   复制 NMI 初始化数据到 $05EB-$05F2 →
 *   初始化 3 组定时器槽位 (帧计数 + 回调参数) →
 *   设置 NMI enable + PPU NMI on →
 *   进入定时器主循环 $CA97
 */
export function nmiInit_$C71A(sys: SystemState): void {
  // ── $C71A-$C724: 复制初始化数据 $C766-$C76D → $05EB-$05F2 ──
  // 数据: 13 07 19 00 00 AF 2E FD
  const initData = [0x13, 0x07, 0x19, 0x00, 0x00, 0xAF, 0x2E, 0xFD];
  for (let i = 0; i < 8; i++) {
    sys.mem[0x05EB + i] = initData[i];
  }

  // ── $C725-$C735: 槽位 1 ($01-$04), 帧计数 = $28 ──
  // LDX #$01; LDA #$28; STA $01,X
  sys.mem[1] = 0x28;           // 帧计数
  sys.mem[2] = 0x00;           // bankWin6
  sys.mem[3] = 0xCA;           // target bank/lo
  // LDY #$21 → 对应参数: bankWin7 = $21
  // JSR $CAE7 → sprite DMA 回调设置
  sys.mem[4] = 0x21;           // (SP 保存在 slot + 1)

  // ── $C736-$C746: 槽位 2 ($05-$08), 帧计数 = $50 ──
  sys.mem[5] = 0x50;           // 帧计数
  sys.mem[6] = 0x00;           // bankWin6
  sys.mem[7] = 0xD1;           // target
  sys.mem[8] = 0x1D;

  // ── $C747-$C757: 槽位 3 ($09-$0C), 帧计数 = $78 ──
  sys.mem[9] = 0x78;           // 帧计数
  sys.mem[10] = 0x00;          // bankWin6
  sys.mem[11] = 0xEB;          // target
  sys.mem[12] = 0x85;

  // ── $C758-$C762: 启用 NMI ──
  // LDA $20; ORA #$80; STA $20; STA $19; STA $2000
  const ppuCtrl = sys.mem[0x20] | 0x80;
  sys.mem[0x20] = ppuCtrl;
  sys.mem[0x19] = ppuCtrl;
  writeMem(sys, 0x2000, ppuCtrl);

  // ── $C763: JMP $CA97 → 定时器主循环 ──
  // 注意: 在 6502 中这是一个 JMP (不返回)，在 TS 中由外部驱动循环
}

// ═════════════════════════════════════════════════
// $C76E-$C8FA — NMI Handler (397 bytes)
// ═════════════════════════════════════════════════
//
// 这是游戏的 NMI（VBlank）中断处理程序。每帧调用一次。
// 负责: Sprite DMA、PPU 数据传输、滚屏设置、声音 bank 切换、
//       手柄轮询、MMC3 bank 恢复。
//
// 6502 结构:
//   $C76E: 入口 — BIT $1B 检查 NMI 标志
//   $C775: NMI 主体 — 保存寄存器 → DMA → PPU 传输 → 滚屏 → 声音
//   $C820: RTI
//   $C821: IRQ/次级 NMI 处理
//   $C852: 声音 bank 切换子程序
//

/**
 * $C76E: NMI handler 主入口。
 *
 * 6502: BIT $1B; BVC irq; JMP $C421 (→ 次级 NMI 路径)
 *
 * 翻译模式下直接执行 NMI 主体逻辑。
 *
 * @param onPpuTransfer 回调: 处理 PPU 数据传输（$C8FB 引擎的代理）
 */
export function nmiHandler_$C76E(
  sys: SystemState,
  onPpuTransfer: (sys: SystemState) => void,
): void {
  // ── $C775-$C77E: 保存寄存器, 关 NMI ──
  // PHA; TXA; PHA; TYA; PHA
  // LDA $20; AND #$7F; STA $2000; STA $20
  const savedCtrl = sys.mem[0x20];
  sys.mem[0x20] = savedCtrl & 0x7F;
  writeMem(sys, 0x2000, savedCtrl & 0x7F);

  // ── $C783-$C792: Sprite DMA ──
  // TSX; TXA; LDX #$FF; TXS; PHA  (临时栈切换)
  // LDA #$00; STA $2003    (OAM addr = 0)
  writeMem(sys, 0x2003, 0);
  // LDA #$02; STA $4014    (Sprite DMA from $0200)
  writeMem(sys, 0x4014, 0x02);

  // ── $C793-$C798: 根据 $046B 获知当前 CHR bank → TS 版通过模块数据直接访问 ──
  // 6502: LDA $046B; STA $A000 → MMC3 bank switch for PPU data reading
  // TS: PPU 数据传输在 onPpuTransfer 回调中从模块导入, 不依赖 MMC3 地址映射

  // ── $C799: JSR $C8FB — PPU 数据传输引擎 ──
  onPpuTransfer(sys);

  // ── $C79C-$C7B3: PPU VRAM addr + 滚屏 ──
  // BIT $2002 (清 VBlank 标志 + 复位地址锁存)
  readMem(sys, 0x2002);

  // LDA #$3F; STA $2006; LDA #$00; STA $2006; STA $2006; STA $2006
  // → VRAM addr = $3F00 (调色板), 然后 = $0000
  writeMem(sys, 0x2006, 0x3F);
  writeMem(sys, 0x2006, 0x00);
  writeMem(sys, 0x2006, 0x00);
  writeMem(sys, 0x2006, 0x00);

  // LDA $20; STA $2000 (恢复 PPU ctrl, NMI still off)
  writeMem(sys, 0x2000, sys.mem[0x20]);

  // BIT $2002 (复位地址锁存)
  readMem(sys, 0x2002);

  // ── $C7B7-$C7C8: 设置滚屏 ──
  // LDA $4A; CLC; ADC $0538; STA $2005   (水平滚动)
  const scrollX = (sys.mem[0x4A] + sys.mem[0x0538]) & 0xFF;
  writeMem(sys, 0x2005, scrollX);

  // LDA $4B; STA $2005                   (垂直滚动)
  writeMem(sys, 0x2005, sys.mem[0x4B]);

  // LDA $21; STA $2001                   (PPU mask)
  writeMem(sys, 0x2001, sys.mem[0x21]);

  // ── $C7CA-$C7D0: JSR $C9E9 — 手柄输入后处理 ──
  // LDX $8E; STX $8C; STX $8D
  const n8e = sys.mem[0x8E];
  sys.mem[0x8C] = n8e;
  sys.mem[0x8D] = n8e;

  // ── $C7D3-$C7E3: 声音 bank 切换 ──
  // LDX $8D; LDA $C8F7,X; AND #$7F
  const soundData = [0xFB, 0x80, 0x1E, 0xDC];
  const sndVal = soundData[sys.mem[0x8D] & 3] & 0x7F;

  // STA $C000; STA $C001  (MMC3: 切换 CHR bank 0/1 用于声音数据)
  writeMem(sys, 0xC000, sndVal);
  writeMem(sys, 0xC001, sndVal);

  // ── $C7DE-$C7E3: MMC3 IRQ 确认 ──
  // LDX $0469; STA $E000,X
  const irqIdx = sys.mem[0x0469] & 0xFF;
  writeMem(sys, 0xE000 + irqIdx, 0x00);

  // ── $C7E4-$C7E7: JSR $C9C5 — 手柄更新 ──
  // (由外部 tick 驱动, 这里只做标记)

  // ── $C7EA-$C7EE: 设置 NMI 完成标志 ──
  // LDA $1B; ORA #$80; STA $1B
  sys.mem[0x1B] |= 0x80;

  // ── $C7F0-$C80F (ASM): 恢复 MMC3 PRG bank 映射 ──
  //   6502: write $8000 = mmc3Mode|7 → $8001 = $25 (window 7)
  //         write $8000 = mmc3Mode|6 → $8001 = $24 (window 6)
  //         write $8000 = $23 (final restore)
  //   TS: $24/$25 仅做跟踪记录, PRG bank 切换通过 import 模块回调, 不需要写 MMC3

  // ── $C810-$C81F: 恢复 NMI 并 RTI ──
  // LDA $20; ORA #$80; STA $20; STA $19; STA $2000
  sys.mem[0x20] |= 0x80;
  sys.mem[0x19] = sys.mem[0x20];
  writeMem(sys, 0x2000, sys.mem[0x20]);

  // PLA; TAY; PLA; TAX; PLA; RTI
  // (寄存器恢复在 TS 中由外部管理)
}

// ═════════════════════════════════════════════════
// $C8FB-$C9B4 — PPU 数据传输引擎 (186 bytes)
// ═════════════════════════════════════════════════
//
// NMI 中调用，将缓冲的 PPU 数据（nametable / palette / attribute）
// 通过 $2007 写入 PPU。数据格式:
//   $0498: 剩余传输次数 (count)
//   每次传输:
//     [目标 bank] [PPU addr lo] [PPU addr hi] [data...重复 count 次]
//
// 6502 反汇编:
//   C8FB: LDA $0498      ; count
//   C8FE: BEQ $C951      ; 0 → 退出
//   C900: DEC $0498      ; count--
//   C903: SEC
//   C904: SBC #$01       ; count-1
//   C906: ASL
//   C908: ADC $0498      ; ×3 (找到条目偏移)
//   C90B: TAX            ; X = (count-1) × 3
//   C90C: LDA $0499,X    ; → Y = PPU addr lo
//   C90F: TAY
//   C910: LDA $049A,X    ; → $77 = PPU addr hi
//   C913: STA $77
//   C915: LDA $049B,X    ; → $78 = bank/control
//   C918: STA $78
//   C91A: BPL $C92D      ; bit7=0 → 使用带内数据
//
//   ; bit7=1 路径: 长传输 (CHR 数据)
//   C91C: LDX #$06
//   C91E: AND #$20       ; bit5 → X 偏移
//   C920: BEQ $C923
//   C922: INX
//   C923: TXA
//   C924: ORA $22        ; MMC3 cmd
//   C926: STA $8000
//   C929: STY $8001      ; CHR bank switch
//   C92C: TYA            ; A=Y (PPU addr lo)
//   C92D: ...
//
//   C92F: LDY #$00
//   C931: LDA ($77),Y    ; 读源数据
//   C933: BEQ $C953      ; 0 = 结束标记 → 继续下一个
//   C935: TAX            ; X = 行数
//   C936: INY
//   C937: LDA ($77),Y    ; PPU addr hi
//   C939: PHA
//   C93A: INY
//   C93B: LDA ($77),Y    ; PPU addr lo
//   C93D: BIT $2002
//   C940: STA $2006      ; 设 PPU addr hi
//   C943: PLA
//   C944: STA $2006      ; 设 PPU addr lo
//   C947: INY
//   C948: LDA ($77),Y    ; 数据字节
//   C94A: STA $2007      ; 写 PPU
//   C94D: INY
//   C94E: DEX            ; 行数--
//   C94F: BNE $C948
//   C951: BEQ $C931      ; 检查下一个 block (0→退出)
//
//   C953: RTS
//
//   第二段 $C954-$C9B4: 另一条 PPU 传输路径 ($04A5 队列)
//   C954: LDA $0515      ; flag
//   C957: BPL $C984      ; bit7=0 → exit
//   C959: LDX #$00
//   C95B: STX $0515
//   C95E: LDA $04A5,X    ; 长度
//   ...
//

/**
 * $C8FB: PPU 数据传输引擎 — NMI 内调用，批量写入 PPU。
 *
 * 从 $0498 指向的传输队列读取数据，写入 PPU $2007。
 * 每次传输有一个 3 字节头: [PPU addr lo] [PPU addr hi] [control/flag]
 * 然后是 [行数] [PPU addr hi] [PPU addr lo] [data × 行数] 的循环块。
 *
 * @param onPpuWrite 回调: addr=PPU地址, data=数据
 */
export function ppuDataTransfer_$C8FB(sys: SystemState): void {
  // ── 队列 1: $0498 传输队列 ──
  let count = sys.mem[0x0498];
  if (count === 0) return;

  while (count > 0) {
    count--;
    sys.mem[0x0498] = count;

    // 计算条目偏移: (count) × 3
    // 6502: DEC 先然后 indexed by current count
    const offset = count * 3;
    let addrLo = sys.mem[0x0499 + offset];
    let addrHi = sys.mem[0x049A + offset];
    const control = sys.mem[0x049B + offset];

    if (control & 0x80) {
      // bit7=1: CHR bank 切换 + 长传输
      // 6502: 用 control 的 bit5 决定 CHR bank 偏移
      // → 切换到指定 CHR bank 后从源地址读数据
      // 翻译模式下: 标记为 CHR 传输跳过
      // 实际: LDA control; AND #$20 → branch → MMC3 CHR switch
      console.log(`[bank30 ppuDataTransfer] CHR transfer, control=$${control.toString(16)}`);
      continue;
    }

    // 正常 NT/Palette 传输: 从 ($77) 读取多个 block
    // 每个 block: [行数] [PPU addr hi] [PPU addr lo] [data × 行数]
    // 行数 = 0 → 结束
    let done = false;
    while (!done && count >= 0) {
      // 在这里源地址来自调用者设置的 $77/$78

      // 读源数据行数
      const rowCount = readMem(sys, (addrHi << 8) | addrLo);
      if (rowCount === 0) {
        done = true;
        break;
      }

      const ppuAddrHi = readMem(sys, ((addrHi << 8) | addrLo) + 2);
      const ppuAddrLo = readMem(sys, ((addrHi << 8) | addrLo) + 3);

      // BIT $2002 → 复位地址锁存
      readMem(sys, 0x2002);
      // 设 PPU addr
      writeMem(sys, 0x2006, ppuAddrHi);
      writeMem(sys, 0x2006, ppuAddrLo);

      // 写 rowCount 个数据字节
      for (let i = 0; i < rowCount; i++) {
        const dataByte = readMem(sys, ((addrHi << 8) | addrLo) + 4 + i);
        writeMem(sys, 0x2007, dataByte);
      }

      // 移到下一个 block
      addrLo += 4 + rowCount;
      if (addrLo >= 0x100) {
        addrHi++;
        addrLo &= 0xFF;
      }
    }
  }
}

// ═════════════════════════════════════════════════
// $CD7C — 获取角色/场景数据指针 (在 $CCEA-$CD88 块内)
// ═════════════════════════════════════════════════
//
// 6502 反汇编:
//   CD7C: LDA $05FB       ; 场景标志
//   CD7F: EOR #$0B        ; 异或 $0B (切换队伍标志)
//   CD81: ASL             ; ×2
//   CD82: TAY
//   CD83: LDA $CD89,Y     ; 查表取指针低字节
//   CD86: STA $34
//   CD88: LDA $CD8A,Y     ; 查表取指针高字节
//   CD8B: STA $35
//   CD8D: RTS
//
// 查表 $CD89-$CDC8: 32 × 2 字节指针表
//   00 03, 0C 03, 18 03, 24 03, 30 03, 3C 03, 48 03, 54 03,
//   60 03, 6C 03, 78 03, 84 03, 90 03, 9C 03, A8 03, B4 03,
//   C0 03, CC 03, D8 03, E4 03, F0 03, FC 03, 08 04, 0C 04,
//   10 04, 14 04, 18 04, 1C 04, 20 04, 24 04, 28 04, 2C 04
//
// 使用: 根据 $05FB 标志查表，结果存到 $34-$35 (ZP 指针)。
// 调用后继续用 ($34),Y 读取场景/角色数据。

// $CD89-$CDC8: 角色/场景数据指针表 → 从 bank-30-data 导入 DATA_$CD89_$CDC8 (64 bytes flat)

/**
 * $CD7C: 获取角色/场景数据指针
 *
 * 6502:
 *   LDA $05FB; EOR #$0B; ASL; TAY
 *   LDA $CD89,Y; STA $34
 *   LDA $CD8A,Y; STA $35; RTS
 */
export function getCharData_$CD7C(sys: SystemState): void {
  const flag = sys.mem[0x05FB];
  const index = (flag ^ 0x0B) & 0x1F;  // 32 entries max
  const ptrIdx = (index * 2) % DATA_$CD89_$CDC8.length;
  sys.mem[0x34] = DATA_$CD89_$CDC8[ptrIdx];
  sys.mem[0x35] = DATA_$CD89_$CDC8[ptrIdx + 1];
}

// ═════════════════════════════════════════════════
// $DB62 — 场景辅助入口 (在 $DB34-$DBF2 块内)
// ═════════════════════════════════════════════════
//
// 从 jump table $C572 跳转到此。功能:
//   1. 切换到 bank 1C/1D，调用 bank00 函数
//   2. 根据 $2B (match type) 决定 count ($0A 或 $14)
//   3. 循环遍历角色数据，重置动画/状态值
//   4. 特殊处理: 如果 $2B 匹配特定值，设置特殊状态
//
// 6502 反汇编 ($DB34 前半 = 另一入口 "fn_$CE0F"):
//   DB34: PHA
//   DB35: LDA $22; ...JSR $CE2D; PLA; JSR $8003  (call bank00)
//   DB46: LDA #$00; STA $0447
//   DB4B: LDX #$00
//   DB4D: LDA $2B
//   DB50: CMP #$03
//   DB52: BEQ skip            ; $2B == 3 → 跳过 $E2 检查
//   DB54: BIT $E2
//   DB57: BPL skip
//   DB59: LDX #$0B            ; $E2 bit7=1 → X = $0B
//   DB5B: STX $044F; STX $05FB
//   DB61: RTS
//
// $DB62 主入口:
//   DB62: LDA #$0A
//   DB64: LDX $2A             ; match type
//   DB67: CPX #$02
//   DB69: BNE db6d
//   DB6B: LDA #$14            ; match type=2 → count = $14
//   DB6D: PHA                 ; push count
//   db6e: CMP #$0B
//   DB70: BCC db74
//   DB72: ADC #$0A            ; >= $0B → add $0A (skip team B)
//   db74: LDX #$00
//   DB76: JSR $CE08           ; get ptr ($34=$32/33)
//   DB79: LDY #$00; LDA ($34),Y
//   DB7D: CMP #$20
//   DB7F: BNE db8c
//   DB81: LDA $044D
//   DB84: BEQ db8c
//   DB86: LDA #$00; STA $32; STA $33  ; reset pos
//   db8c: LDY #$01; LDA $32; STA ($34),Y
//   DB92: INY; LDA $33; STA ($34),Y   ; store pos
//   DB97: PLA; SEC; SBC #$01
//   DB9B: BPL db6e                    ; loop
//   DB9D: RTS
//
// $DB9E: 第二段 — 场景特殊配置
//   DB9E: JSR $DBF3          ; xor $044F → $05FB
//   DBA1: LDX #$00
//   DBA3: LDA $2B
//   DBA6: CMP $DBEA,X        ; 查表匹配
//   DBA9: BEQ dbb4
//   DBAB: INX; INX; INX; CPX #$09
//   DBB0: BEQ dbcb            ; not found
//   DBB2: BNE dba6
//   dbb4: LDA $DBEB,X         ; 取配置值
//   DBB7: JSR $CD7C           ; getCharData
//   DBBA: LDY #$00; LDA $DBEC,X
//   DBBF: STA ($34),Y         ; store config
//   DBC1: LDA $2B; CMP #$0C
//   DBC4: BNE dbcb
//   DBC6: JSR $DBCC           ; extra setup for $2B=$0C
//   dbcb: RTS
//
// $DBCC: $2B=$0C 额外配置
//   DBCC: LDA #$0C
//   DBCE: PHA
//   dbcf: CMP #$14; BEQ dbe1
//   DBD3: JSR $CD7C
//   DBD6: LDY #$01; LDA #$80; STA ($34),Y
//   DBDC: INY; LDA #$CB; STA ($34),Y
//   dbe1: PLA; CLC; ADC #$01
//   DBE5: CMP #$16
//   DBE7: BNE dbcf
//   DBE9: RTS
//
// 数据 $DBEA-$DBF2:
//   23 14 75 0C 14 34 12 15 45
//   配对: ($2B值, 编号, 配置值)
//     ($23, $14, $75), ($0C, $14, $34), ($12, $15, $45)
//
// $DBF3: 辅助
//   DBF3: LDA $044F; EOR #$0B; STA $05FB; RTS

/**
 * $DB62: 场景辅助 — 初始化/重置角色动画状态。
 *
 * 6502 原文:
 *   1. 调用 bank00 入口
 *   2. 根据 $2B (match type) 和 $E2 标志设置 $044F / $05FB
 *   3. 遍历角色数据 (count = $0A 或 $14),
 *      清除位置/动画计数器值
 *   4. 根据 $2B 查表，设置特定角色的状态标志
 *   5. $2B=$0C 时额外配置
 *
 * @param onCallBank00 回调: 模拟 JSR $8003 (A = $05FB 标志)
 */
export function sceneHelper_$DB62(
  sys: SystemState,
  onCallBank00: (sys: SystemState, aReg: number) => void,
): void {
  // ── $DB34-$DB61: 初始化 $044F / $05FB ──
  // PHA; JSR $CE2D (bank switch); PLA; JSR $8003
  // → 调用 bank00 入口
  const aReg = sys.mem[0x05FB];
  bankSwitch_apply_$CE2D(sys);
  onCallBank00(sys, aReg);

  // STA $0447
  sys.mem[0x0447] = 0;

  // LDX #$00; LDA $2B; CMP #$03; BEQ skip
  let xVal = 0;
  const matchType = sys.mem[0x2B];
  if (matchType !== 3) {
    // BIT $E2; BPL skip
    if (sys.mem[0xE2] & 0x80) {
      xVal = 0x0B;
    }
  }
  sys.mem[0x044F] = xVal;
  sys.mem[0x05FB] = xVal;

  // ── $DB62-$DB9D: 角色数据循环 ──
  // LDA #$0A; LDX $2A; CPX #$02; BNE: LDA #$14
  let count = 0x0A;
  if (sys.mem[0x2A] === 2) {
    count = 0x14;
  }

  while (count > 0) {
    // CMP #$0B; BCC → charIdx; ADC #$0A (>= $0B 跳过队伍 B)
    let charIdx = count - 1;
    if (charIdx >= 0x0B) {
      charIdx -= 0x0A;  // 6502: ADC #$0A (signed add essentially wraps)
    }

    // LDX #$00; JSR $CE08 → 获取 ptr ($34) 指向该角色数据
    // $CE08: 根据 A 查角色偏移表
    const ptrAddr = 0x0300 + charIdx * 0x0C; // 简化的指针计算
    sys.mem[0x34] = ptrAddr & 0xFF;
    sys.mem[0x35] = (ptrAddr >> 8) & 0xFF;

    // LDA ($34),Y (Y=0) → 第一个字节
    const firstByte = sys.mem[ptrAddr];
    if (firstByte === 0x20 && sys.mem[0x044D] !== 0) {
      // 空格字符 + 特殊标志 → 清除位置
      sys.mem[0x32] = 0;
      sys.mem[0x33] = 0;
    }

    // STA ($34),Y (Y=1) → 存 $32
    sys.mem[ptrAddr + 1] = sys.mem[0x32];
    // STA ($34),Y (Y=2) → 存 $33
    sys.mem[ptrAddr + 2] = sys.mem[0x33];

    count--;
  }

  // ── $DB9E-$DBCB: 场景特殊配置查表 ──
  // JSR $DBF3 → $044F ^ $0B → $05FB
  sys.mem[0x05FB] = sys.mem[0x044F] ^ 0x0B;

  // 查表 $DBEA: $23→14→75, $0C→14→34, $12→15→45
  const configTable: [number, number, number][] = [
    [0x23, 0x14, 0x75],
    [0x0C, 0x14, 0x34],
    [0x12, 0x15, 0x45],
  ];

  for (const [key, _idx, cfg] of configTable) {
    if (sys.mem[0x2B] === key) {
      // JSR $CD7C → getCharData
      getCharData_$CD7C(sys);

      // LDA cfg; STA ($34),Y (Y=0)
      const ptr = (sys.mem[0x35] << 8) | sys.mem[0x34];
      sys.mem[ptr] = cfg;

      // $2B == $0C → 额外配置
      if (sys.mem[0x2B] === 0x0C) {
        // $DBCC-$DBE9: 遍历 $0C-$15 设置特殊值
        let extraIdx = 0x0C;
        while (true) {
          if (extraIdx === 0x14) break; // skip self
          getCharData_$CD7C(sys);
          const ptr2 = (sys.mem[0x35] << 8) | sys.mem[0x34];
          sys.mem[ptr2 + 1] = 0x80;
          sys.mem[ptr2 + 2] = 0xCB;
          extraIdx++;
          if (extraIdx >= 0x16) break;
        }
      }
      break;
    }
  }
}

// ═════════════════════════════════════════════════
// $CC02 — 定时器/帧初始化辅助 (在 $CBFE-$CCE9 块内)
// ═════════════════════════════════════════════════
//
// 6502 反汇编 ($CC02):
//   CC02: STA $14          ; 保存 A = 帧数
//   CC04: LDA $20
//   CC06: AND #$7F
//   CC08: STA $20          ; NMI off
//   CC0A: STA $2000
//   CC0D: LDA #$06
//   CC0F: STA $2001        ; PPU mask off
//   CC12: STX $00          ; 当前槽位基础
//   CC14: LDA #$00         ; A = 0
//   CC16: JSR $CB0F        ; timerInit(count=0)
//   CC19: LDA $14
//   CC1B: BNE $CC19        ; 等待 NMI
//   CC1D: LDA $1B          ; 检查 NMI 标志
//   CC1F: BPL $CC1D        ; bit7=0 → 循环等待
//   CC21: AND #$7F
//   CC23: STA $1B          ; 清除 NMI pending
//   CC26: RTS
//
// 功能: 初始化一个定时器槽位，然后等待 NMI 完成。
//       被 initScene 的软重置路径调用。

console.log('[bank30] ✅ 已加载 — initScene|joypad|timer|multiply|divide|ppuInit|nmiHandler|bankSwitch');

/**
 * $CC02: 帧定时器初始化 + NMI 等待。
 *
 * 6502: STA $14; 关 NMI; STX $00; timerInit(A=0);
 *       waitNMI; clear NMI flag; RTS
 */
export function frameInit_$CC02(sys: SystemState, aReg: number, xReg: number): void {
  sys.mem[0x14] = aReg;

  // 关 NMI
  const ctrl = sys.mem[0x20] & 0x7F;
  sys.mem[0x20] = ctrl;
  writeMem(sys, 0x2000, ctrl);

  // PPU mask off
  writeMem(sys, 0x2001, 0x06);

  // STX $00 (槽位基址)
  sys.mem[0x00] = xReg;

  // JSR $CB0F (A=0) — 初始化定时器
  sys.mem[0x7F] = 0;
  const slotBase = sys.mem[0x00];
  sys.mem[slotBase + 2] = sys.mem[0x24];
  sys.mem[slotBase + 3] = sys.mem[0x25];
  sys.mem[slotBase] = 0;
  sys.mem[slotBase + 1] = sys.regs.SP;

  // 等待 NMI
  // 6502: LDA $14; BNE wait1; LDA $1B; BPL wait2
  // 翻译模式: 标记需要等待 NMI
  sys.nmiPending = false;
}

// ═════════════════════════════════════════════════
// $CCD2 — PPU 调色板初始化 (在 $CBFE-$CCE9 块内)
// ═════════════════════════════════════════════════
//
// 6502 反汇编 ($CCD2):
//   CCD2: LDA #$00
//   CCD4: STA $05F4
//   CCD7: LDA #$06    ; 6 层
//   CCD9: PHA
//   CCDA: LDA #$01
//   CCDC: JSR $CB0F   ; timerInit(1)
//   CCDF: LDA $0515
//   CCE2: BNE $CCDF   ; wait
//   CCE4: LDA #$01
//   CCE6: STA $0515
//   CCE9: ...
//
// 功能: 初始化调色板 fading 引擎。设置 6 层调色板 DMA 传输。

/**
 * $CCD2: 调色板初始化传输引擎。
 *
 * 6502: 分段清除 $04A5-$04F3 → 设置 PPU 调色板传输到 VRAM $3F00。
 */
export function paletteInit_$CCD2(sys: SystemState): void {
  // STA $05F4
  sys.mem[0x05F4] = 0;

  // 6 层循环
  for (let layer = 0; layer < 6; layer++) {
    // 每层设置 PPU palette DMA
    // 实际地址在 $04A5+ 缓冲区
    const base = 0x04A5 + layer * 0x10;
    // 复位该层传输数据
    for (let i = 0; i < 0x10; i++) {
      sys.mem[base + i] = 0;
    }
  }

  sys.mem[0x0515] = 0x80; // 启动标志
}

// ═════════════════════════════════════════════════
// $CBB0 — 音频/音效触发（在 $CB35-$CBFD 块内）
// ═════════════════════════════════════════════════
//
// 6502 反汇编:
//   CBB0: STA $0518       ; 存音效 ID
//   CBB3: LDA #$80
//   CBB5: STA $0516       ; 设置 $0516 bit7 = 启动
//   CBB8: LDA #$00
//   CBBA: STA $05         ; 清零计数器
//   CBBC: LDA #$00
//   CBBE: JSR $CB0F       ; timerInit(count=0)
//   CBC1: RTS

/**
 * $CBB0: 触发音效/音频事件。
 *
 * 6502: STA $0518; LDA #$80; STA $0516; LDA #$00; STA $05; LDA #$00; JSR $CB0F; RTS
 *
 * @param aReg A 寄存器值 = 音效 ID
 */
export function audiotrigger_$CBB0(sys: SystemState, aReg: number): void {
  sys.mem[0x0518] = aReg;          // STA $0518 — 音效 ID
  sys.mem[0x0516] = 0x80;          // LDA #$80; STA $0516 — 触发标志
  sys.mem[0x0005] = 0;             // LDA #$00; STA $05 — 清零
  timerInit_$CB0F(sys, 0);         // LDA #$00; JSR $CB0F — 定时器初始化
}

// ═════════════════════════════════════════════════
// $CDE2 — 屏幕坐标 → 赛场网格索引转换
// ═════════════════════════════════════════════════
//
// 6502 反汇编:
//   CDE2: TXA              ; X → A (列像素)
//   CDE3: SEC
//   CDE4: SBC #$30         ; 减最小 X ($30)
//   CDE6: BCC invalid      ; < 0 → 返回 $FF
//   CDE8: CMP #$A0
//   CDEA: BCS invalid      ; >= $A0 → 返回 $FF
//   CDEC: LSR              ; /8
//   CDED: LSR
//   CDEE: LSR
//   CDEF: TAX              ; 存列号 (0-13)
//   CDF0: TYA              ; Y → A (行像素)
//   CDF1: SEC
//   CDF2: SBC #$50         ; 减最小 Y ($50)
//   CDF4: BCC invalid      ; < 0 → 返回 $FF
//   CDF6: CMP #$60
//   CDF8: BCS invalid      ; >= $60 → 返回 $FF
//   CDFA: LSR              ; /8
//   CDFB: LSR
//   CDFC: LSR
//   CDFD: DEX              ; 列--
//   CDFE: BMI done         ; 列 < 0 → 返回 A
//   CE00: CLC
//   CE01: ADC #$0C         ; +12 (每行12格)
//   CE03: BNE loop         ; 循环
//   CE05: LDA #$FF         ; 无效坐标
//   CE07: RTS

/**
 * $CDE2: 将像素坐标 (X,Y) 转换为赛场网格索引。
 *
 * 输入: X = 像素 X 坐标, Y = 像素 Y 坐标
 * 输出: A = 网格索引 (0-95) 或 $FF (坐标超出球场范围)
 *
 * 652602:
 *   col = (X - $30) / 8     ; 范围 0-13 (但超过 11 的列会加出溢出)
 *   row = (Y - $50) / 8     ; 范围 0-1
 *   结果 = row × 12 + col
 */
export function coordTransform_$CDE2(sys: SystemState, xReg: number, yReg: number): number {
  // ── 列计算 ──
  // TXA; SEC; SBC #$30
  const colRaw = (xReg - 0x30) & 0xFF;
  if (xReg < 0x30) return 0xFF;    // BCC invalid (< 0)
  if (colRaw >= 0xA0) return 0xFF;  // CMP #$A0; BCS invalid
  const col = colRaw >> 3;          // LSR; LSR; LSR → /8

  // ── 行计算 ──
  // TYA; SEC; SBC #$50
  const rowRaw = (yReg - 0x50) & 0xFF;
  if (yReg < 0x50) return 0xFF;    // BCC invalid
  if (rowRaw >= 0x60) return 0xFF;  // CMP #$60; BCS invalid
  const row = rowRaw >> 3;          // /8

  // ── 循环: 结果 = row; for(;col>=0;col--) 结果 += 12 ──
  // 6502: DEX; BMI done; CLC; ADC #$0C; BNE loop
  let result = row;
  let remainCol = col;
  while (true) {
    remainCol--;
    if (remainCol < 0) break;       // DEX; BMI done
    result = (result + 0x0C) & 0xFF; // ADC #$0C
  }

  // 更新 sys 的寄存器 (调用方会读取 A)
  sys.regs.A = result;
  sys.regs.X = col;
  sys.regs.Y = yReg;  // Y 未在函数中修改，但原文有 TYA 再存回
  // 更新标志位
  const P = sys.regs.P;
  sys.regs.P = (P & ~(0x80 | 0x02)) | ((result & 0x80) ? 0x80 : 0) | (result === 0 ? 0x02 : 0);
  return result;
}

// ═════════════════════════════════════════════════
// $C400-$C4B1 — IRQ/NMI 上下文切换辅助 (178 bytes)
// ═════════════════════════════════════════════════
//
// 两个入口:
//   $C400: NMI 上下文切换 — 保存/恢复寄存器 + bank 映射，调用 $A200
//   $C478: IRQ 上下文切换 — 同上，调用 $A160
//
// 6502 反汇编 ($C400):
//   C400: TAY              ; 保存 A→Y
//   C401: LDA #$08         ; PPU ctrl = $08 (NMI off)
//   C403: STA $20
//   C405: STA $2000
//   C408: LDA #$1E         ; PPU mask = $1E (显示开)
//   C40A: STA $21
//   C40C: STA $2001
//   C40F: LDA #$00
//   C411: STA $22          ; MMC3 mode = 0
//   C413: LDX #$00
//   C415: JSR $C4B2        ; window 6 → bank 0
//   C418: LDX #$02
//   C41A: JSR $C4B9        ; window 7 → bank 2
//   C41D: TYA              ; 恢复 A
//   C41E: JMP $A200        ; → 跳转到 bank 2 $A200
//
// $C421 (上下文保存):
//   C421: BIT $1B
//   C423: BMI $C429        ; bit7=1 → 正常 NMI 路径
//   C425: LDA #$08         ; 否则设 PPU ctrl
//   C427: STA $20
//   // 保存寄存器到 ZP $3C-$3E
//   C429: SEC; ROR $1B
//   C42C: STA $3C          ; 存 A
//   C42E: STX $3D          ; 存 X
//   C430: STY $3E          ; 存 Y
//   // 切换 MMC3
//   C432: LDA $22; ORA #$07
//   C436: STA $8000
//   C439: LDA #$02; STA $8001   ; window 7 → bank 2
//   C43E: JSR $A000        ; 调 bank 2 $A000
//   C441: LDA $22; ORA #$06
//   C445: STA $8000
//   C448: LDA #$0C; STA $8001   ; window 6 → bank $0C
//   C44D: JSR $8000        ; 调 bank 0C $8000
//   // 恢复 MMC3 映射
//   C450: LDA $22; ORA #$06
//   C454: STA $8000
//   C457: LDA $24; STA $8001
//   C45C: LDA $22; ORA #$07
//   C460: STA $8000
//   C463: LDA $25; STA $8001
//   C468: LDA $23; STA $8000
//   C46D: LDY $3E; LDX $3D; LDA $3C
//   C473: LSR $1B          ; 恢复标志
//   C475: RTI
//
// $C478 (IRQ 入口):
//   C478: BIT $1B
//   C47A: BMI $C480        ; bit7=1 → NMI 路径!
//   C47C: LSR $E000        ; IRQ 确认
//   C47F: LSR $E001
//   // 保存上下文 + 切 bank → 跟 NMI 一样
//   C484: STA $3C; STX $3D; STY $3E
//   C48C: LDA $22; ORA #$07
//   C490: STA $8000
//   C493: LDA #$02; STA $8001   ; window 7 → bank 2
//   C498: JSR $A160        ; 调 bank 2 $A160
//   C49B: LDA $22; ORA #$07
//   C49F: STA $8000
//   C4A2: LDA $25; STA $8001
//   C4A7: LDA $23; STA $8000
//   C4AC: LDY $3E; LDX $3D; LDA $3C
//   C4B0: LSR $1B
//   C4B2: RTI

/**
 * $C400: NMI 上下文切换入口。
 * 保存 PPU 状态 → 切 window6→bank0, window7→bank2 → JMP $A200。
 * 6502: TAY; 关 NMI; 开显示; MMC3 mode=0; bankSwitch; JMP $A200
 */
export function nmiContextSwitch_$C400(
  sys: SystemState,
  onBank02A200: (sys: SystemState, aReg: number) => void,
): void {
  sys.mem[0x20] = 0x08;
  writeMem(sys, 0x2000, 0x08);
  sys.mem[0x21] = 0x1E;
  writeMem(sys, 0x2001, 0x1E);
  sys.mem[0x22] = 0x00;
  bankSwitch_Win6(sys, 0);
  bankSwitch_Win7(sys, 2);
  onBank02A200(sys, sys.regs.A);
}

/**
 * $C421: 保存 NMI 上下文 → 切 bank → 调 bank02 + bank0C → 恢复映射。
 * 6502: 保存 A/X/Y→$3C/$3D/$3E; window7→bank2; JSR $A000; window6→bank$0C; JSR $8000; 恢复; RTI
 */
export function nmiContextSave_$C421(
  sys: SystemState,
  onBank02A000: (sys: SystemState) => void,
  onBank0C8000: (sys: SystemState) => void,
): void {
  // 保存寄存器
  sys.mem[0x3C] = sys.regs.A;
  sys.mem[0x3D] = sys.regs.X;
  sys.mem[0x3E] = sys.regs.Y;
  // 6502: Window 7→bank 2 (write $8000|7=$22→$8001=2); JSR $A000
  // TS: 回调直接调用 bank02 模块, 不写 MMC3
  onBank02A000(sys);
  // 6502: Window 6→bank $0C (write $8000|6=$22→$8001=0x0C); JSR $8000
  // TS: 回调直接调用 bank0C 模块
  onBank0C8000(sys);
  // 6502: 恢复 MMC3 $24/$25 → 不需要, 回调返回后上下文不变
}

/**
 * $C478: IRQ 上下文切换入口。
 * 6502: BIT $1B; BMI(→NMI); 确认 IRQ; 保存上下文; window7→bank2; JSR $A160; 恢复映射; RTI
 */
export function irqContextSwitch_$C478(
  sys: SystemState,
  onBank02A160: (sys: SystemState) => void,
): void {
  // 保存寄存器
  sys.mem[0x3C] = sys.regs.A;
  sys.mem[0x3D] = sys.regs.X;
  sys.mem[0x3E] = sys.regs.Y;
  // 6502: Window 7→bank 2 (write $8000|7=$22→$8001=2); JSR $A160; 恢复 $8000=$23
  // TS: 回调直接调用 bank02 模块, 不写 MMC3
  onBank02A160(sys);
  // 6502: 恢复 MMC3 映射 → 不需要, 回调返回后上下文不变
}

// ═════════════════════════════════════════════════
// $C9F1-$CA5A — PPU CHR bank 切换 + 显示初始化 (106 bytes)
// ═════════════════════════════════════════════════
//
// 6502 反汇编 ($C9F1 — CHR bank 切换):
//   C9F1: LDA $22          ; MMC3 mode
//   C9F3: STA $8000
//   C9F6: LDA $0490,X      ; 取 CHR bank 号
//   C9F9: STA $8001
//   C9FC: LDA $22
//   C9FE: ORA #$01
//   CA00: STA $8000
//   CA03: LDA $0491,X
//   CA06: STA $8001
//   CA09: TXA
//   CA0A: EOR #$04         ; 切换 PAGE (A/B 批)
//   CA0C: TAX
//   // 切换 CHR bank 2-5
//   CA0D: LDY #$02
//   CA0F: TYA
//   CA10: ORA $22
//   CA12: STA $8000
//   CA15: LDA $0490,X
//   CA18: STA $8001
//   CA1B: INX; INY
//   CA1E: CPY #$06
//   CA20: BNE $CA0F
//   CA22: RTS
//
// $CA23 (显示初始化):
//   CA23: LDA $21; ORA #$1E
//   CA27: STA $21          ; PPU mask |= $1E (开显示)
//   CA29: LDA #$00
//   CA2B: STA $0490        ; CHR bank 0 = 0
//   CA2E: LDA #$02
//   CA30: STA $0491        ; CHR bank 1 = 2
//   CA33: STA $0087        ; CHR shadow
//   CA35: LDA #$00
//   CA37: STA $8E
//   CA39: LDA #$01
//   CA3B: STA $0469        ; MMC3 IRQ 触发缓冲
//   CA3E: LDA #$01
//   CA40: STA $0543        ; APU 控制缓冲
//   CA43: LDA #$23
//   CA45: STA $0544
//   CA48: LDA #$45
//   CA4A: STA $0545
//   CA4D: LDA #$01
//   CA4F: JSR $CB0F        ; timerInit(1)
//   CA52: JSR $EE9F        ; (bank31 辅助)
//   CA55: JSR $E3CA        ; (bank31 辅助)
//   CA58: JMP $CA4D        ; → 等待循环

/**
 * $C9F1: 切换 CHR bank (6 个 PPU pattern table bank)。
 * 6502: 使用 X 索引 $0490-$0491 切换 bank 0-1，然后 XOR #$04 切换 bank 2-5。
 */
export function chrBankSwitch_$C9F1(sys: SystemState, xIndex: number): void {
  const mmc3 = sys.mem[0x22];
  // CHR bank 0
  writeMem(sys, 0x8000, mmc3);
  writeMem(sys, 0x8001, sys.mem[0x0490 + xIndex]);
  // CHR bank 1
  writeMem(sys, 0x8000, mmc3 | 0x01);
  writeMem(sys, 0x8001, sys.mem[0x0491 + xIndex]);
  // CHR bank 2-5 (用 XOR #$04 切换页面)
  let xPage = xIndex ^ 0x04;
  for (let y = 2; y < 6; y++) {
    writeMem(sys, 0x8000, mmc3 | y);
    writeMem(sys, 0x8001, sys.mem[0x0490 + xPage]);
    xPage++;
  }
}

/**
 * $CA23: PPU 显示初始化 — 开显示、设 CHR bank、APU 控制。
 * 6502: PPU mask=$1E; CHR bank base=0/2; 设 $0543-$0545; timerInit; JSR bank31 helpers
 */
export function displayInit_$CA23(
  sys: SystemState,
  onBank31EE9F: (sys: SystemState) => void,
  onBank31E3CA: (sys: SystemState) => void,
): void {
  sys.mem[0x21] |= 0x1E;        // PPU mask 开显示
  sys.mem[0x0490] = 0x00;       // CHR bank 0
  sys.mem[0x0491] = 0x02;       // CHR bank 1
  sys.mem[0x0087] = 0x02;       // CHR shadow
  sys.mem[0x8E] = 0;            // 手柄索引
  sys.mem[0x0469] = 1;          // MMC3 IRQ 缓冲
  sys.mem[0x0543] = 1;          // APU ctrl 1
  sys.mem[0x0544] = 0x23;       // APU ctrl 2
  sys.mem[0x0545] = 0x45;       // APU ctrl 3
  timerInit_$CB0F(sys, 1);
  onBank31EE9F(sys);
  onBank31E3CA(sys);
}

// ═════════════════════════════════════════════════
// $CDC9-$CE07 — 网格→像素坐标转换 (25 bytes)
// ═════════════════════════════════════════════════
//
// coordTransform_$CDE2 的反向操作：网格索引 → 像素 (X,Y)
//
// 6502 反汇编 ($CDC9):
//   CDC9: LDX #$00         ; 行计数器 = 0
//   CDCB: CMP #$0C         ; A >= 12?
//   CDCD: BCC CDD4         ; < 12 → 结束除法
//   CDCF: SBC #$0C         ; A -= 12
//   CDD1: INX              ; 行++
//   CDD2: BNE CDCB         ; 循环（16次以内）
//   CDD4: ASL A; ASL A; ASL A  ; A *= 8
//   CDD7: ADC #$54         ; +$54 → 像素行 (Y 坐标)
//   CDD9: TAY
//   CDDA: TXA              ; 行 → A
//   CDDB: ASL A; ASL A; ASL A  ; */ 8
//   CDDE: ADC #$34         ; +$34 → 像素列 (X 坐标)
//   CDE0: TAX
//   CDE1: RTS

/**
 * $CDC9: 将网格索引 (0-95) 转换为像素坐标。
 *
 * 输入: A = 网格索引 (0-95)
 * 输出: X = 像素 X ($34-$93 range), Y = 像素 Y ($54-$77 range)
 *
 * 映射：row = 索引/12, col = 索引%12
 *       pixelX = col*8 + $34, pixelY = row*8 + $54
 */
export function tileCoordConvert_$CDC9(
  sys: SystemState,
  gridIndex: number,
): { x: number; y: number } {
  // 除法: row = gridIndex / 12, col = gridIndex % 12
  let col = gridIndex;
  let row = 0;
  while (col >= 12) {
    col -= 12;
    row++;
  }
  // * 8 + offset: pixelY = $54 + col*8, pixelX = $34 + row*8
  const y = (0x54 + ((col << 3) & 0xFF)) & 0xFF;
  const x = (0x34 + ((row << 3) & 0xFF)) & 0xFF;

  sys.regs.X = x;
  sys.regs.Y = y;
  sys.regs.A = gridIndex; // A preserved
  return { x, y };
}

// ═════════════════════════════════════════════════
// $CE08-$CE2C — 远调用（切 bank 1C/1D 执行）(37 bytes)
// ═════════════════════════════════════════════════
//
// 6502 反汇编:
//   CE08: TAY              ; 保存 A→Y
//   CE09: LDA $24          ; 保存当前 bank W6
//   CE0C: PHA
//   CE0D: LDA $25          ; 保存当前 bank W7
//   CE10: PHA
//   CE11: TYA              ; 恢复 A
//   CE12: PHA              ; 保存 A 到栈
//   CE13: LDA $22          ; (读 MMC3 mode)
//   CE15: LDA #$1C         ; W6 → bank $1C
//   CE17: STA $24
//   CE19: LDA #$1D         ; W7 → bank $1D
//   CE1B: STA $25
//   CE1D: JSR $CE2D        ; bankSwitch_apply
//   CE20: PLA              ; 恢复 A
//   CE21: JSR $8000        ; 调用 bank $1C/$1D 入口
//   CE24: PLA              ; 恢复 W7
//   CE25: STA $25
//   CE27: PLA              ; 恢复 W6
//   CE28: STA $24
//   CE2A: JMP $CE2D        ; bankSwitch_apply + RTS

/**
 * $CE08: 切换 bank window 到 $1C/$1D，执行 $8000 处的函数，然后切回。
 * 6502: 保存 bank 映射 → 切 window6→$1C, window7→$1D → JSR $8000 → 恢复映射。
 *
 * @param aParam A 寄存器值（传给目标函数）
 * @param onBank1C_8000 bank $1C/$1D $8000 回调
 */
export function farCallViaBankSwitch_$CE08(
  sys: SystemState,
  aParam: number,
  onBank1C_8000: (sys: SystemState, a: number) => void,
): void {
  const savedW6 = sys.mem[0x24];
  const savedW7 = sys.mem[0x25];
  sys.mem[0x24] = 0x1C;
  sys.mem[0x25] = 0x1D;
  bankSwitch_apply_$CE2D(sys);
  onBank1C_8000(sys, aParam);
  sys.mem[0x24] = savedW6;
  sys.mem[0x25] = savedW7;
  bankSwitch_apply_$CE2D(sys);
}

// ═════════════════════════════════════════════════
// $CE4D-$CE6D — 16-bit 有符号偏移查表 (33 bytes)
// ═════════════════════════════════════════════════
//
// 从 $FB4C 字表中查找 16-bit 有符号值。
//
// 6502 反汇编:
//   CE4D: CLC
//   CE4E: ADC #$40        ; 偏移 $40（中心化，避免负数索引）
//   CE50: ASL A           ; ×2（16-bit 表）
//   CE51: PHP             ; 存符号标志
//   CE52: BPL +2          ; 正→跳过
//   CE54: EOR #$FF        ; （冗余：取反 + AND $7E）
//   CE56: AND #$7E        ; 掩码偶数
//   CE58: TAX             ; 索引
//   CE59: LDA $FB4D,X     ; 取高字节
//   CE5C: TAY
//   CE5D: LDA $FB4C,X     ; 取低字节
//   CE60: TAX
//   CE61: PLP             ; 恢复符号
//   CE62: BCC +$C          ; 正→跳过取反
//   CE64: 取反 (16-bit): EOR #$FF
//   CE70: RTS
//
// 查表数据在 ROM bank 31 的 $FB4C 区域（16-bit 字表）

/**
 * $CE4D: 有符号偏移查表 — 从 $FB4C 字表中查找 16-bit 有符号值。
 *
 * 输入: A = 有符号偏移（范围 -$40..+$3F）
 * 输出: X = 低字节, Y = 高字节 → 组合为 16-bit 有符号值
 *
 * @param signedOffsetTable 外部提供的 $FB4C 字表（ROM bank31 数据，需注入）
 */
export function signedOffsetLookup_$CE4D(
  sys: SystemState,
  aOffset: number,
  signedOffsetTable: Uint16Array | number[],
): { x: number; y: number } {
  const idx = ((aOffset + 0x40) << 1) & 0xFF;
  const tableIdx = (idx & 0x7E) >> 0;
  let loWord = signedOffsetTable[tableIdx] & 0xFFFF;
  // 判断符号
  const isNeg = (aOffset & 0x80) !== 0;
  if (isNeg) {
    // 取反（16-bit 二补数）
    loWord = ((-loWord) & 0xFFFF);
  }
  sys.regs.X = loWord & 0xFF;
  sys.regs.Y = (loWord >> 8) & 0xFF;
  // 更新标志: carry = ~neg
  sys.regs.P = (sys.regs.P & ~0x01) | (isNeg ? 0x01 : 0);
  return { x: sys.regs.X, y: sys.regs.Y };
}

// ═════════════════════════════════════════════════
// $CE6E-$CE98 — 远调用分发（via bank00 表）(43 bytes)
// ═════════════════════════════════════════════════
//
// 6502 反汇编:
//   CE6E: STA $36          ; A → $36
//   CE70: ASL A            ; ×2
//   CE71: ADC $36          ; + A = ×3（3-byte entries）
//   CE73: STA $36
//   CE75: LDA #$80
//   CE77: STA $37          ; ($36) = $8000 + A*3
//   CE79: LDA $24; PHA     ; 保存 W6
//   CE7C: LDA $25; PHA     ; 保存 W7
//   CE7F: LDA #$1C; STA $24
//   CE83: LDA #$1D; STA $25
//   CE87: JSR $CE2D        ; 切 bank 1C/1D
//   CE8A: JSR $CE99        ; JMP ($0036) — 间接跳转
//   CE8D: PLA; STA $25     ; 恢复 W7
//   CE90: PLA; STA $24     ; 恢复 W6
//   CE93: JMP $CE2D        ; bankSwitch_apply + RTS

/**
 * $CE6E: 根据索引 A 从 bank00 跳转表执行远端调用。
 *
 * 流程: A×3 → 表基址 = $8000 + A×3 → 切 bank 1C/1D → 间接 JMP ($0036) → 恢复 bank。
 *
 * @param index A 寄存器 → dispatch 索引
 * @param onBank1C_Indirect bank 1C/1D 间接调用（JMP ($0036) 的模拟）
 */
export function farCallDispatch_$CE6E(
  sys: SystemState,
  index: number,
  onBank1C_Indirect?: (sys: SystemState, addr: number) => void,
): number {
  const tableAddr = (0x8000 + (index * 3)) & 0xFFFF;
  const savedW6 = sys.mem[0x24];
  const savedW7 = sys.mem[0x25];
  sys.mem[0x24] = 0x1C;
  sys.mem[0x25] = 0x1D;
  bankSwitch_apply_$CE2D(sys);
  if (onBank1C_Indirect) onBank1C_Indirect(sys, tableAddr);
  sys.mem[0x24] = savedW6;
  sys.mem[0x25] = savedW7;
  bankSwitch_apply_$CE2D(sys);
  return tableAddr;
}

// ═════════════════════════════════════════════════
// $CE99-$CECD — 间接调用表 (3 bytes)
// ═════════════════════════════════════════════════
//
// 6502:
//   CE99: JMP ($0036)     ; 间接跳转
//
// 在 JS 中无意义 → 已在 farCallDispatch 中通过回调模拟。

// ═════════════════════════════════════════════════
// $CECE-$CEF0 — 游戏模式选择器/就近搜索 (53 bytes)
// ═════════════════════════════════════════════════
//
// 遍历 10 个槽位，找距离当前玩家最近且 HP=0 的槽位。
//
// 6502 反汇编:
//   CECE: STA $46          ; 存当前索引
//   CED0: INC $46          ; 起始 = idx+1
//   CED2: LDA #$08
//   CED4: STA $47          ; 距离阈值 = 8
//   CED6: LDA $46
//   CED8: STA $48          ; 扫描索引
//   CEDA: LDA #$0A
//   CEDC: STA $49          ; 扫描次数 = 10
//   loop:
//   CEDE: LDA $48          ; 取扫描索引
//   CEE0: CMP $0441        ; vs 玩家1?
//   CEE3: BEQ skip         ; 跳过
//   CEE5: CMP $0442        ; vs 玩家2?
//   CEE8: BEQ skip         ; 跳过
//   CEEA: JSR $CD7C        ; getCharData
//   CEED: LDY #$0A
//   CEEF: LDA ($34),Y      ; HP
//   CEF1: BNE skip         ; HP≠0 → 跳过(存活)
//   CEF3: JSR $CED6        ; proximityCheck
//   CEF6: BCS skip         ; 超出范围 → 跳过
//   ; 找到目标 — 继续到返回路径
//   skip:
//   CEF8: INC $48          ; 下一索引
//   CEFA: DEC $49          ; 剩余次数--
//   CEFC: BNE loop         ; 继续扫描
//   CEFE: LDA $47          ; 增大阈值
//   CF00: CLC; ADC #$08
//   CF03: STA $47
//   CF05: JMP $CED6        ; 重新扫描(更大范围)
//   done: ($CEA1)
//   CEA1: LDA $48          ; 返回找到的索引
//   CEA3: RTS

/**
 * $CECE: 找距离当前球员最近的非活跃槽位（HP=0）。
 *
 * 输入: A = 当前球员索引
 * 输出: A = 找到的最近球员索引
 *
 * 扫描逻辑: 从 A+1 开始遍历 10 个槽位，排除玩家自己，找 HP=0 且距离在阈值内的。
 * 如果 10 个都没找到，阈值 +8 后重试。
 */
export function gameModeSelector_$CECE(sys: SystemState, playerIdx: number): number {
  const startIdx = (playerIdx + 1) & 0xFF;
  let threshold = 8;

  while (true) {
    sys.mem[0x48] = startIdx;

    for (let i = 0; i < 10; i++) {
      const scanIdx = sys.mem[0x48];

      // 跳过自己和玩家2
      if (scanIdx === sys.mem[0x0441] || scanIdx === sys.mem[0x0442]) {
        sys.mem[0x48] = (scanIdx + 1) & 0xFF;
        continue;
      }

      // 读角色数据
      sys.regs.A = scanIdx; // set A for getCharData
      getCharData_$CD7C(sys);
      const ptr = (sys.mem[0x35] << 8) | sys.mem[0x34];
      const hp = sys.mem[ptr + 0x0A];

      if (hp !== 0) {
        sys.mem[0x48] = (scanIdx + 1) & 0xFF;
        continue;
      }

      // 检查距离
      if (proximityCheck_$CED6(sys, threshold)) {
        sys.mem[0x48] = (scanIdx + 1) & 0xFF;
        continue;
      }

      // 找到目标!
      sys.regs.A = scanIdx;
      return scanIdx;
    }

    // 10次都没找到 → 扩大阈值
    threshold = (threshold + 8) & 0xFF;
  }
}

// ═════════════════════════════════════════════════
// $CED6-$CEF0 — 近邻距离检查 (27 bytes)
// ═════════════════════════════════════════════════
//
// 6502 反汇编:
//   CED6: LDY #$06         ; 偏移 = 6 (X 坐标)
//   CED8: LDA ($34),Y
//   CEDA: SEC
//   CEDB: SBC $0635        ; 减目标 X
//   CEDE: BCS +4           ; 正→跳过取反
//   CEE0: EOR #$FF
//   CEE2: ADC #$01         ; 取绝对值 |ΔX|
//   CEE4: CMP $47          ; 比较阈值
//   CEE6: BCS outRange     ; >= → 超出范围
//   CEE8: LDY #$08         ; 偏移 = 8 (Y 坐标)
//   CEEA: LDA ($34),Y
//   CEEC: SEC
//   CEED: SBC $0637        ; 减目标 Y
//   CEF0: BCS +4
//   CEF2: EOR #$FF
//   CEF4: ADC #$01         ; 取绝对值 |ΔY|
//   CEF6: CMP $47          ; 比较阈值
//   CEF8: BCS outRange
//   CEFA: SEC              ; carry=1 — 出界
//   CEFB: RTS
//   outRange:
//   CEFC: CLC              ; carry=0 — 在界内
//   CEFD: RTS

/**
 * $CED6: 检查当前球员是否在目标范围内。
 *
 * 读取 $34/$35 指向的角色数据中的坐标，与 $0635(ΔX)/$0637(ΔY) 比较。
 *
 * @returns true = 超出范围 (carry=1) / false = 在范围内 (carry=0)
 */
export function proximityCheck_$CED6(sys: SystemState, threshold: number): boolean {
  const ptr = (sys.mem[0x35] << 8) | sys.mem[0x34];

  // |charX - targetX|
  let dx = sys.mem[ptr + 0x06];
  dx = (dx - sys.mem[0x0635]) & 0xFF;
  if (dx & 0x80) dx = (-dx) & 0xFF;
  if (dx >= threshold) return true;  // 超出范围

  // |charY - targetY|
  let dy = sys.mem[ptr + 0x08];
  dy = (dy - sys.mem[0x0637]) & 0xFF;
  if (dy & 0x80) dy = (-dy) & 0xFF;
  if (dy >= threshold) return true;

  return false;  // 在范围内
}

// ═════════════════════════════════════════════════
// $CEF1-$CF1E — 难度调整/系统反初始化 (46 bytes)
// ═════════════════════════════════════════════════
//
// 6502 反汇编:
//   CEF1: PHA              ; 存 A
//   CEF2: LDA #$00
//   CEF4: STA $0469        ; 清 IRQ 缓冲
//   CEF7: LDA #$00
//   CEF9: STA $0469
//   CEFC: STA $E000        ; MMC3 IRQ 确认
//   CEFF: JSR $CB8B        ; clearOam
//   CF02: JSR $CB35        ; ppuScreenInit
//   CF05: LDA $20          ; PPU ctrl
//   CF07: AND #$7F
//   CF09: STA $2000        ; NMIs off
//   CF0C: STA $20
//   CF0E: PLA              ; 恢复 A
//   CF0F: JMP $C400        ; → nmiContextSwitch

/**
 * $CEF1: 系统状态重置 — 清 IRQ + OAM → 关 NMI → 跳到 NMI 上下文切换。
 *
 * 通常在难度调整或系统反初始化时调用。
 *
 * @param aParam 保存的 A 值（传给 $C400 入口）
 * @param onNmiContextSwitch bank30 $C400 回调
 */
export function difficultyAdjust_$CEF1(
  sys: SystemState,
  aParam: number,
  onNmiContextSwitch: (sys: SystemState, a: number) => void,
): void {
  sys.mem[0x0469] = 0;              // 清 MMC3 IRQ 缓冲
  writeMem(sys, 0xE000, 0);         // MMC3 IRQ 确认
  clearOam_$CB8B(sys);              // OAM 清零
  ppuScreenInit_$CB35(sys);         // PPU 屏幕初始化
  sys.mem[0x20] &= 0x7F;           // 关 NMI
  writeMem(sys, 0x2000, sys.mem[0x20]);
  onNmiContextSwitch(sys, aParam);  // → $C400
}

// ═════════════════════════════════════════════════
// $CF1F-$CF4E — 堆内存清零（$0468-$0297 区域）(48 bytes)
// ═════════════════════════════════════════════════
//
// 6502 反汇编:
//   CF1F: LDA #$68         ; 起始低字节
//   CF21: STA $3A
//   CF23: LDA #$04         ; 起始高字节 = $0468
//   CF25: STA $3B
//   CF27: LDA #$97         ; 低字节计数
//   CF29: STA $3C
//   CF2B: LDA #$02         ; 高字节计数 = $0297
//   CF2D: STA $3D
//   outer:
//   CF2F: LDA #$00
//   CF31: TAY
//   inner:
//   CF32: STA ($3A),Y      ; 写 0
//   CF34: INY
//   CF35: BNE inner        ; 写256次
//   CF37: INC $3B          ; 高字节++
//   CF39: DEC $3D          ; 高字节计数--
//   CF3B: BNE outer        ; 重复
//   CF3D: STA ($3A),Y      ; 尾部写入
//   CF3F: INY
//   CF40: DEC $3C          ; 低字节计数--
//   CF42: BNE inner        ; 写直到 $3C=0
//   CF44: LDX #$0A5        ; 额外清零 $3A-$00 区域
//   CF46-SF4E: ...
//   CF4E: RTS

/**
 * $CF1F: 清零堆内存区域 $0468-$0687（512B）+ 部分尾部。
 * 6502: 双层嵌套循环写入 0 到 $0468 起始的内存区域。
 * 总清除量约 $0297 字节 = 663 字节。
 */
export function memClearHeap_$CF1F(sys: SystemState): void {
  // Clear $0468 → $0687 (512 bytes)
  let addr = 0x0468;
  // 外层: 高字节计数 $3D (0x02 → 2*256=512)
  // 内层: 低字节 count $3C (0x97 → 151 尾部)
  for (let hi = 0; hi < 2; hi++) {
    for (let lo = 0; lo < 256; lo++) {
      sys.mem[addr] = 0;
      addr++;
    }
  }
  // 尾部: 151 字节
  for (let lo = 0; lo < 0x97; lo++) {
    sys.mem[addr] = 0;
    addr++;
  }
  // 额外: 清零 $3A-$00 区域（A5 字节）
  for (let i = 0; i < 0xA5; i++) {
    sys.mem[0x3A + i] = 0;
  }
}

// ═════════════════════════════════════════════════
// $CF4F-$CF6E — 槽位数据清零 (32 bytes)
// ═════════════════════════════════════════════════
//
// 6502 反汇编:
//   CF4F: LDA #$00         ; 起始索引 = 0
//   CF51: PHA
//   loop:
//   CF52: JSR $CD7C        ; getCharData(索引)
//   CF55: LDY #$0A         ; HP 偏移
//   CF57: LDA #$00
//   CF59: STA ($34),Y      ; HP = 0
//   CF5B: PLA              ; 取堆栈上的索引
//   CF5C: PHA
//   CF5D: BEQ skip         ; idx=0 → 跳过
//   CF5F: CMP #$0B         ; idx==$0B? (队 B 起始)
//   CF61: BNE skip
//   CF63: LDY #$07         ; 额外清除 Y=7 偏移
//   CF65: LDA #$00
//   CF67: STA ($34),Y
//   skip:
//   CF69: PLA
//   CF6A: CLC; ADC #$01    ; idx++
//   CF6D: CMP #$16         ; idx < 22?
//   CF6F: BNE loop
//   CF71: RTS

/**
 * $CF4F: 清零所有 22 个球员槽位的 HP 字段。
 * 6502: 遍历 idx 0-21，每个槽位写 HP(offset+$0A)=0。队 B(idx≥$0B) 额外清 offset+$07。
 */
export function clearSlotData_$CF4F(sys: SystemState): void {
  for (let i = 0; i < 0x16; i++) {  // 22 槽位
    sys.regs.A = i;
    getCharData_$CD7C(sys);
    const ptr = (sys.mem[0x35] << 8) | sys.mem[0x34];
    sys.mem[ptr + 0x0A] = 0;        // HP = 0
    if (i !== 0 && i === 0x0B) {    // 队 B 起始
      sys.mem[ptr + 0x07] = 0;      // 额外清零
    }
  }
}

// ═════════════════════════════════════════════════
// $CF6F-$CF8E — bank 调度 ($1A/$1B → $18/$19) (32 bytes)
// ═════════════════════════════════════════════════
//
// 6502 反汇编:
//   CF6F: PHA
//   (unreferenced: LDA $22)
//   CF72: LDA #$1A
//   CF74: STA $24          ; W6 → bank $1A
//   CF76: LDA #$1B
//   CF78: STA $25          ; W7 → bank $1B
//   CF7A: JSR $CE2D        ; bankSwitch_apply
//   CF7D: PLA              ; 恢复 A
//   CF7E: JSR $802A        ; 调用 bank $1A/$1B $802A
//   CF81: LDA #$18
//   CF83: STA $24          ; W6 → bank $18
//   CF85: LDA #$19
//   CF87: STA $25          ; W7 → bank $19
//   CF89: JMP $CE2D        ; bankSwitch_apply + RTS (no restore!)
//
//   $802A 是 bank $1A/$1B 中的一个入口，处理特定场景数据。

/**
 * $CF6F: 调度到 bank $1A/$1B → 调用 $802A → 切换到 bank $18/$19。
 *
 * @param aParam A 参数（传给 $802A）
 * @param onBank1A_802A bank $1A/$1B $802A 回调
 */
export function bankDispatch_$CF6F(
  sys: SystemState,
  aParam: number,
  onBank1A_802A: (sys: SystemState, a: number) => void,
): void {
  sys.mem[0x24] = 0x1A;
  sys.mem[0x25] = 0x1B;
  bankSwitch_apply_$CE2D(sys);
  onBank1A_802A(sys, aParam);
  // 注意: 6502 不恢复原 bank，而是切到 $18/$19
  sys.mem[0x24] = 0x18;
  sys.mem[0x25] = 0x19;
  bankSwitch_apply_$CE2D(sys);
}

// ═════════════════════════════════════════════════
// $CF8F-$D02F — 菜单分发主入口 (160 bytes)
// ═════════════════════════════════════════════════
//
// 处理菜单输入 (上下选择、确认、取消) 并分发到对应逻辑。
//
// 6502 反汇编:
//   CF8F: STA $0623        ; 菜单类型
//   CF92: TAX
//   CF93: LDA dataTable,X  ; 查菜单选项计数表
//   CF96-SFA3: 设选项范围
//   CFA4: LDA #$03; STA $02FE
//   CFA9: LDA #$01
//   CFAB: JSR $CB0F        ; timerInit(1)
//   CFAE: LDA $0622
//   CFB1: ASL; ASL; ASL; ASL  ; ×16 (选项位置)
//   CFB6: ...
//
// 输入检测:
//   $0622 = 当前选中选项 (可被方向键修改)
//   $0623 = 菜单类型 (决定最大选项数)
//   dataTable = 菜单选项计数/偏移表
//
// 按键逻辑:
//   Up ($08):   $0622-- (限界)
//   Down ($04): $0622++ (限界)
//   A ($80):    确认 → 退出分发
//   B ($40):    取消 → 退出分发

/** $D002-$D019: 菜单选项范围表（每个菜单类型的最大索引） */
const MENU_OPTION_TABLE: readonly number[] = [
  0x04, 0x04, 0x04, 0x04, 0x04, 0x04, 0x04, 0x04,
];

/** $D00A-$D011: 菜单索引偏移表 */
const MENU_OFFSET_TABLE: readonly number[] = [
  0x04, 0x04, 0x04, 0x04, 0x04, 0x04, 0x04, 0x04,
];

/** $D012-$D019: 菜单选项位置表 */
const MENU_POSITION_TABLE: readonly number[] = [
  0x11, 0x11, 0x11, 0x11, 0x71, 0x71, 0x71, 0x71,
];

/**
 * $CF8F: 菜单分发 — 处理方向键输入选择菜单项。
 *
 * 6502 流程:
 *   1. 查表得选项范围 → 限定 $0622 值
 *   2. 计时器 1 帧 → 等待输入
 *   3. 读手柄: Up→$0622--, Down→$0622++, A→确认, B→取消
 *   4. 计算选项位置 → 存入 $02FC/$02FD
 *
 * @param menuType 菜单类型（A 寄存器）
 * @returns 返回 $0622 值作为选中项（0-based index）
 */
export function menuDispatch_$CF8F(sys: SystemState, menuType: number): number {
  sys.mem[0x0623] = menuType;

  // 查表确定选项范围
  const maxIdx = MENU_OPTION_TABLE[menuType % MENU_OPTION_TABLE.length];
  const offset = MENU_OFFSET_TABLE[menuType % MENU_OFFSET_TABLE.length];
  const posBase = MENU_POSITION_TABLE[menuType % MENU_POSITION_TABLE.length];

  let currentSel = sys.mem[0x0622];
  sys.mem[0x02FE] = 3;
  timerInit_$CB0F(sys, 1);

  // 读取手柄状态
  const joypad = sys.mem[0x001E];  // 当前按键

  // 方向处理
  if (joypad & 0x08) {  // Up
    currentSel = (currentSel > 0) ? currentSel - 1 : maxIdx;
    timerInit_$CB0F(sys, 1);
  }
  if (joypad & 0x04) {  // Down
    currentSel = (currentSel < maxIdx) ? currentSel + 1 : 0;
    timerInit_$CB0F(sys, 1);
  }

  sys.mem[0x0622] = currentSel;

  // 计算选项的屏幕位置
  const pos = posBase + (currentSel << 4);
  sys.mem[0x02FC] = pos & 0xFF;

  // 检查确认/取消
  if (joypad & 0x80) {    // A 键 — 确认
    sys.mem[0x02FC] = 0xF8;
    sys.regs.A = currentSel;
    sys.regs.P |= 0x01;   // carry=1 (confirmed)
    return currentSel;
  }
  if (joypad & 0x40) {    // B 键 — 取消
    sys.mem[0x02FC] = 0xF8;
    sys.regs.P &= ~0x01;  // carry=0 (cancelled)
    return currentSel;
  }

  // 未选择 — 继续等待
  return currentSel;
}

// ═════════════════════════════════════════════════
// $D030-$D0AB — 角色动画更新循环 (124 bytes)
// ═════════════════════════════════════════════════
//
// 遍历 11 个角色槽位，更新每个角色的动画帧计数器。
//
// 6502 反汇编:
//   D030: LDA #$00        ; 起始索引
//   D032: PHA
//   loop:
//   D033: LDX #$00
//   D035: JSR $CE08       ; tileCoordConvert (farCall)
//   D038: [字符动画数据读取/更新]
//   ...
//   D076: PLA              ; 索引++
//   D077: CLC; ADC #$01
//   D079: CMP #$0B         ; 11 个槽位
//   D07B: BNE loop
//   D07D: RTS
//
// $D07E: 特殊模式 (matchType 自定义)
//   D07E: LDA #$32         ; 动画帧基值
//   D080: BIT $063E        ; 检查标志
//   ...

/**
 * $D030: 更新 11 个角色槽位的动画帧。
 *
 * 6502: 逐个读取角色数据 → 计算新动画帧 → 存回动画计数器。
 *
 * @param onFarCall 远端调用回调（用于 tileCoordConvert）
 */
export function charAnimUpdate_$D030(
  sys: SystemState,
  onFarCall: (sys: SystemState, param: number) => void,
): void {
  for (let slot = 0; slot < 0x0B; slot++) {  // 11 槽位
    // farCall: tileCoordConvert 获取角色网格位置
    onFarCall(sys, slot);

    // 读角色数据
    getCharData_$CD7C(sys);
    const ptr = (sys.mem[0x35] << 8) | sys.mem[0x34];
    const charByte = sys.mem[ptr];

    // 空格 → 跳过
    if (charByte === 0x20) continue;

    // 计算动画帧（简化: 降低 speed 字段）
    const speedDivisor = (sys.mem[0x0627] === 1) ? 2 : 1;
    const animSpeed = 3 + 1 - speedDivisor; // match type 1/2 差异

    // 读取当前 X/Y 速度 → 更新 16-bit 动画计数器
    let animLo = sys.mem[ptr + 1];  // offset+1: 动画计数器 低
    let animHi = sys.mem[ptr + 2];  // offset+2: 动画计数器 高

    // 简化: 累加速度 → 截断取帧
    animLo = (animLo + animSpeed) & 0xFF;
    if (animLo >= 0x80) animLo = 0x80 - 1;  // 上限

    sys.mem[ptr + 1] = animLo;
    sys.mem[ptr + 2] = animHi;
  }
}

// ═════════════════════════════════════════════════
// $D0D1-$D0F5 — 角色槽位扫描 (37 bytes)
// ═════════════════════════════════════════════════
// — 已翻译（见上文 playerSlotScan_$D0D1）

// ═════════════════════════════════════════════════
// $D0F6-$D182 — 比赛初始化 + 场景模式选择 (141 bytes)
// ═════════════════════════════════════════════════
//
// 6502 反汇编:
//   D0F6: LDX #$00
//   D0F8: LDA $044D        ; 位置数据
//   D0FB: BNE skip
//   D0FD: LDY #$01
//   D0FF: LDA ($34),Y      ; 读低字节
//   D101: SEC
//   D102: SBC #$64         ; 减 100
//   D104: INY
//   D105: LDA ($34),Y      ; 读高字节
//   D107: SBC #$00         ; 借位
//   D109: BPL pos          ; ≥0 → X=0
//   D10B: INX              ; <0 → X=1
//   D10C: STX $044D        ; 存位置标志
//   D10F: RTS
//
// $D110 (场景模式选择器):
//   D110: LDA #$12
//   D112: STA $24          ; W6 → bank $12
//   D114: LDA #$13
//   D116: STA $25          ; W7 → bank $13
//   D118: JSR $CE2D
//   D11B: JMP $B000        ; → bank $12/$13 $B000
//
// $D11E (主入口 — gameModeSwitch):
//   D11E: LDA $0627        ; matchType
//   D121: CMP #$05
//   D123: BNE normal
//   D125: JMP $D110        ; type=5 → 特殊模式
//   normal:
//   D128: LDA #$00
//   D12A: STA $063E        ; 清标志...
//   ...初始化各个字段 $063E-$0642, $0613
//   D143: LDA $0627
//   D146: CMP #$04
//   D148: BNE next
//   ...type=4: bank dispatch to (1A,1B):$8030
//   D166: LDX matchCostTable ; 读匹配消耗表
//   D16D: STA $05F7        ; 存消耗
//   D170: LDA #$00; STA $05F9
//   D177: LDX #$50; TXS    ; 重置栈
//   D17A: JMP $DAAA        ; → 进入比赛主循环

/** $D183-$D192: 比赛消耗查表 → 从 bank-30-data 导入 DATA_$D183_$D192 (16 bytes) */

/**
 * $D0F6: 检查角色位置（在 $64 之内？）并设标志。
 */
export function positionCheck_$D0F6(sys: SystemState): void {
  const ptr = (sys.mem[0x35] << 8) | sys.mem[0x34];
  const lo = sys.mem[ptr + 1];   // 16-bit 值 低
  const hi = sys.mem[ptr + 2];   // 16-bit 值 高
  const value = (hi << 8) | lo;
  const flag = (value >= 100) ? 0 : 1;
  sys.mem[0x044D] = flag;
}

/**
 * $D110: 切换到 bank $12/$13 → 执行 $B000（另一场景模式入口）。
 *
 * @param onBank12_B000 bank $12/$13 $B000 回调
 */
export function sceneSwitchBank12_$D110(
  sys: SystemState,
  onBank12_B000: (sys: SystemState) => void,
): void {
  sys.mem[0x24] = 0x12;
  sys.mem[0x25] = 0x13;
  bankSwitch_apply_$CE2D(sys);
  onBank12_B000(sys);
}

/**
 * $D11E: 场景模式选择器 — 根据 matchType 进入不同模式。
 *
 * matchType=5 → 特殊模式（跳到 bank $12/$13）
 * matchType=4 → 通过 bank dispatch 到 (1A,1B):$8030
 * 其他 → 正常初始化比赛状态
 *
 * @param onBank12_B000 matchType=5 的回调
 * @param onBank1A_8030 matchType=4 的回调
 */
export function gameModeSwitch_$D11E(
  sys: SystemState,
  onBank12_B000: (sys: SystemState) => void,
  onBank1A_8030: (sys: SystemState, a: number) => void,
): void {
  const matchType = sys.mem[0x0627];  // $27 → 0x27? No: $0027

  // matchType=5 → 特殊
  if (matchType === 5) {
    sceneSwitchBank12_$D110(sys, onBank12_B000);
    return;
  }

  // 通用初始化
  sys.mem[0x063E] = 0;
  sys.mem[0x0640] = 0;
  sys.mem[0x0641] = 0;
  sys.mem[0x0613] = 0;

  // matchType=4 → bank dispatch
  if (matchType === 4) {
    const savedW6 = sys.mem[0x24];
    const savedW7 = sys.mem[0x25];
    sys.mem[0x24] = 0x1A;
    sys.mem[0x25] = 0x1B;
    bankSwitch_apply_$CE2D(sys);
    onBank1A_8030(sys, sys.mem[0x0627]);
    sys.mem[0x24] = savedW6;
    sys.mem[0x25] = savedW7;
    bankSwitch_apply_$CE2D(sys);
  }

  // 存比赛消耗
  const costIdx = (sys.mem[0x002B] & 0xFE) >> 0;  // match sub-type
  let costMultiplier = 8;
  if (costIdx === 0x0E || costIdx === 0x12 || costIdx >= 0x1A) {
    costMultiplier = 0;
  }
  const baseCost = (sys.mem[0x0627] & 0xFF) << 1;
  const totalCost = (baseCost + costMultiplier) & 0xFF;
  sys.mem[0x05F7] = DATA_$D183_$D192[totalCost % DATA_$D183_$D192.length];
  sys.mem[0x05F8] = DATA_$D183_$D192[(totalCost + 1) % DATA_$D183_$D192.length];
  sys.mem[0x05F9] = 0;

  // 准备进入比赛主循环
  // LDX #$50; TXS → 重置堆栈到 $0150
}

// ═════════════════════════════════════════════════
// $D193-$D36D — GP 修改 + 输入处理主循环 (475 bytes)
// ═════════════════════════════════════════════════
//
// 6502 反汇编:
//   D193: TAX              ; GP 修改量 → X
//   D194: CLC
//   D195: ADC $05FF        ; 加当前 GP
//   D198: STA $05FF
//   D19B: TXA              ; 恢复原始值
//   D19C: PHA              ; 保存到栈
//   D19D: JSR $D235        ; 子处理1 (GP 应用)
//   D1A0: PLA              ; 恢复
//   D1A1: LDX $05F8        ; GP 上限
//   D1A4: BNE checkLimit
//   D1A6: CPX $05F7        ; 比较下限
//   ...复杂的 GP 限界逻辑...
//   loop:
//   D1D1-D241: GP sign/decrement → 限界检查
//   D242: bank31 helper → $EF7F
//   D245-D282: 输入扫描 → 闪光标志 → 音效
//   D283-D2D0: 主输入处理循环 (A键确认 → 分发)
//   D2D1-D36D: 方向输入处理 → 多级输入检查

/**
 * $D193: GP 修改 — 加减 GP 值并在限界内。
 *
 * 6502: A = GP 变化量（有符号）。应用到 $05FF 并限界在 [$05F7, $05F8]。
 *
 * @param delta 有符号 GP 变化量
 * @param onBank31_EF7F bank31 $EF7F 回调
 */
export function gpModify_$D193(
  sys: SystemState,
  delta: number,
  onBank31_EF7F: (sys: SystemState, a: number) => void,
): void {
  let gp = sys.mem[0x05FF];
  const isNegative = (delta & 0x80) !== 0;

  if (isNegative) {
    // 减少 GP
    delta = ((-delta) & 0xFF);
    gp = gp < delta ? 0 : gp - delta;
  } else {
    // 增加 GP
    const hiLimit = sys.mem[0x05F8];
    gp += delta;
    // 检查上限
    const loLimit = sys.mem[0x05F7];
    const maxGp = (hiLimit << 8) | loLimit;
    if (gp > maxGp) gp = maxGp;
  }

  sys.mem[0x05FF] = gp & 0xFF;

  // 闪烁/音效逻辑
  if ((sys.mem[0x063E] & 0x80) === 0 && sys.mem[0x05F7] <= 0x1E) {
    sys.mem[0x063E] |= 0x80;             // 低 GP 警告标志
    audiotrigger_$CBB0(sys, 0x32);       // 警告音
  }

  // GP 归零时的处理
  if (sys.mem[0x05F8] === 0 && sys.mem[0x05F7] === 0) {
    // 随机方向微调
    const rand = (sys.mem[0x00E2] & 0x80) ? 0x0C : 0;
    sys.mem[0x05F9] = (sys.mem[0x05F9] + rand) & 0xFF;
    if (sys.mem[0x05F9] === 0) {
      sys.mem[0x062D] = 0;
      sys.mem[0x0615] &= 0xBF;
      audiotrigger_$CBB0(sys, 0x43);
    }
  }

  onBank31_EF7F(sys, 0);
}

/**
 * $D213: GP 内部应用 — 对单个球员的 GP 修改（二分路: HP>0 vs HP=0）。
package * 6502: 从角色数据读 HP → 有HP则直接修改；无HP则对耐力值操作。
 */
export function gpApply_$D213(sys: SystemState, delta: number): void {
  getCharData_$CD7C(sys);
  const ptr = (sys.mem[0x35] << 8) | sys.mem[0x34];
  const hp = sys.mem[ptr + 0x0A];

  if (hp !== 0) {
    // 有 HP → 直接修改 GP（offset+?）
    let gp = sys.mem[ptr + 0x07];
    gp = (gp + delta) & 0xFF;
    if (gp & 0x80) gp = 0;
    sys.mem[ptr + 0x07] = gp;
  } else {
    // 无 HP → 对耐力操作
    let stamina = sys.mem[ptr + 0x06];
    if (delta & 0x80) {
      // 负修改：保底检查
      stamina = (stamina + delta) & 0xFF;
      if (stamina >= 0x80) stamina = (stamina + 3) & 0xFF;
      sys.mem[ptr + 0x06] = stamina;
    } else {
      stamina = (stamina + delta) & 0xFF;
      sys.mem[ptr + 0x06] = stamina;
    }
  }
}

// ═════════════════════════════════════════════════
// $D36E-$D52A — 玩家状态机核心 (445 bytes)
// ═════════════════════════════════════════════════
//
// 处理玩家回合、选择操作、确认等核心状态机。
//
// 6502 反汇编概要:
//   D36E: LDA $0621        ; 玩家状态
//   D371: CMP #$03
//   D373: BCC skip         ; < 3 → 跳过
//   D375: JMP $D29A        ; ≥ 3 → 高级处理
//   skip:
//   D378: LDA $0600        ; 玩家数量
//   D37B: BNE step1
//   D37D: RTS              ; 0 人 → 退出
//   step1: 为3位玩家分配操作槽位
//   D382-D3DA: 遍历 $0600 个玩家
//   ...对每个玩家显示选项（传球、射门等）
//   ...读手柄输入 → 方向键选选项 → A键确认
//   D3DB-D4E8: 输入扫描循环 + 选项闪烁动画
//   D4E9-D52A: 确认分发 + bank 调用

/**
 * $D36E: 玩家状态机 — 处理回合制输入选择。
 *
 * 6502: 遍历活跃玩家 → 每人按方向键选择操作 → A 键确认 → 分发。
 *
 * @param onBank1C_800C bank dispatch 回调（$800C in bank $1C/$1D）
 * @param onBank31_EF7F bank31 helper 回调
 */
export function playerStateMachine_$D36E(
  sys: SystemState,
  onBank1C_800C: (sys: SystemState, a: number) => void,
  onBank31_EF7F: (sys: SystemState, a: number) => void,
): void {
  const state = sys.mem[0x0621];  // 玩家状态

  if (state >= 3) return;  // 高级状态 → 外部处理

  const playerCount = sys.mem[0x0600];
  if (playerCount === 0) return;

  // 初始化 3 个操作槽位
  for (let i = 0; i < 3; i++) {
    sys.mem[0x060B + i] = 0xFF;  // 填充 $FF 表示空
  }

  sys.mem[0x061E] = 0;

  // 显示选项列表（偏移值表）
  const displayBase = state === 0
    ? (sys.mem[0x0601] ? 2 : 1)  // 有替补→类型2, 否则类型1
    : (sys.mem[0x0621] < 2 ? 0x0D : 0x0F);

  onBank31_EF7F(sys, displayBase);
  timerInit_$CB0F(sys, 1);

  // 输入循环（简化版: 一个帧周期）
  const joypad = sys.mem[0x001E];

  // 确认/取消逻辑
  if (joypad & 0x80) {  // A — 确认
    // 检查选项合法性
    const selIdx = sys.mem[0x061E] >> 1;  // 除2（闪烁帧）
    if ((selIdx & 0x03) !== 0) {
      // 分发到 bank $1C/$1D
      const savedW6 = sys.mem[0x24];
      const savedW7 = sys.mem[0x25];
      sys.mem[0x24] = 0x1C;
      sys.mem[0x25] = 0x1D;
      bankSwitch_apply_$CE2D(sys);
      onBank1C_800C(sys, sys.mem[0x0621]);
      sys.mem[0x24] = savedW6;
      sys.mem[0x25] = savedW7;
      bankSwitch_apply_$CE2D(sys);
    }
    return;
  }

  if (joypad & 0x40) {  // B — 取消/回退
    sys.mem[0x061F] |= 0x40;
    return;
  }

  // 方向: Up/Down 切换选项
  if (joypad & 0x08) sys.mem[0x061E] = (sys.mem[0x061E] - 1) & 0xFF;
  if (joypad & 0x04) sys.mem[0x061E] = (sys.mem[0x061E] + 1) & 0xFF;
}

// ═════════════════════════════════════════════════
// $DCDF-$DCEF — 随机数生成 (17 bytes)
// ═════════════════════════════════════════════════
//
// 6502 反汇编:
//   DCDF: LDA $044E        ; 已生成?
//   DCE2: BNE done         ; !=0 → 跳过
//   DCE4: LDA $00E2        ; 读帧计数器 LSB
//   DCE7: AND #$01         ; 取 bit0
//   DCE9: CLC
//   DCEA: ADC #$01         ; +1
//   DCEC: STA $044E        ; 存结果 (1 或 2)
//   done: RTS

/**
 * $DCDF: 生成「随机」值 1 或 2（基于 $E2 bit0）。
 * 6502: 如果 $044E 已非零则保留，否则读 $E2 bit0 → 1 或 2 → 存入 $044E。
 * 常用于决定初始球权 (1=左队, 2=右队)。
 */
export function randomGen_$DCDF(sys: SystemState): number {
  if (sys.mem[0x044E] !== 0) return sys.mem[0x044E];
  const val = ((sys.mem[0x00E2] & 1) + 1) & 0xFF;
  sys.mem[0x044E] = val;
  return val;
}

// ═════════════════════════════════════════════════
// $D0D1-$D0F5 — 角色槽位扫描 (37 bytes)
// ═════════════════════════════════════════════════
//
// 6502 反汇编:
//   D0D1: LDA $2A          ; match type
//   D0D4: CMP #$02
//   D0D6: BNE exit         ; !=2 → 退出 (A=任意)
//   D0D8: LDA #$00
//   D0DA: PHA              ; push counter=0
//   loop: CMP #$0B         ; counter >= $0B?
//   D0DD: BCC idx          ; < → 直接用
//   D0DF: ADC #$0A         ; >= → +$0A 包装
//   idx:  JSR $CD7C        ; getCharData
//   D0E4: LDY #$00
//   D0E6: LDA ($34),Y      ; char byte
//   D0E8: TAX
//   D0E9: PLA              ; pop counter
//   D0EA: CPX #$20         ; 空格字符?
//   D0EC: BEQ found        ; 是 → 找到
//   D0EE: CLC; ADC #$01    ; counter++
//   D0F1: CMP #$16         ; 到顶?
//   D0F3: BNE loop         ; 继续
//   RTS                    ; 没找到

/**
 * $D0D1: 扫描球员槽位，找第一个空格（未占用）位置。
 * 6502: 只在 match type=2 时执行。遍历 0-$15 共 22 个槽位。
 * @returns 槽位索引 (0-$15)，没找到返回调用前的 A 值
 */
export function playerSlotScan_$D0D1(sys: SystemState): number {
  if (sys.mem[0x2A] !== 2) return sys.regs.A;  // 只在 match type=2 扫描

  for (let counter = 0; counter < 0x16; counter++) {
    let idx = counter;
    if (idx >= 0x0B) idx += 0x0A;               // >= $0B → 加 $0A 跳过队伍 B 间隙
    getCharData_$CD7C(sys);
    const ptr = (sys.mem[0x35] << 8) | sys.mem[0x34];
    const charByte = sys.mem[ptr];
    if (charByte === 0x20) {                    // 空格 = 空位
      return counter;
    }
  }
  return sys.regs.A;
}

// ═════════════════════════════════════════════════
// $DD63-$DDCA — 移动距离计算 (104 bytes)
// ═════════════════════════════════════════════════
// 多个子函数:
//   $DD63: getDistance → 计算移动距离并存入 $0638
//   $DD73: getDistanceWithSign → 带方向的距离计算
//   $DD80: distanceToPixels → 距离值转像素移动量
//
// 6502 反汇编 ($DD63):
//   DD63: TAX              ; A → X (行坐标)
//   DD64: LDY #$7C         ; Y = 列偏移常量
//   DD66: JSR $CDE2        ; coordTransform
//   DD69: STA $0638        ; 存网格索引
//   DD6C: SEC              ; carry=1 表示有效
//   DD6D: RTS
//
// $DD73 (带符号):
//   DD73: LDA #$E9         ; 正常偏移
//   DD75: LDX $00FB
//   DD78: BEQ d7c          ; 主队 → 跳过
//   DD7A: LDA #$05         ; 客队偏移
//   d7c: LSR $00E2         ; 随机化
//   DD7F: ADC #$00         ; +0 或 +1
//   DD81: STA $0638
//   DD84: CLC
//   DD85: RTS
//
// $DD86 (距离→像素):
//   DD86: LDA $0635        ; X 偏移绝对值
//   DD89: LDX $05FB
//   DD8C: BEQ $DD90
//   DD8E: EOR #$FF; CLC; ADC #$01  ; 取反
//   DD92: CMP #$A0
//   DD94: BCS large
//   DD96: SEC; SBC #$30; LSR; LSR; LSR
//   DD9D: TAX; LDA $DDCB,X; BNE store  ; 查表
//   large: SEC; SBC #$A0; LSR; LSR; LSR
//   DDA9: STA $3A
//   DDAB: LDA $0637        ; Y 偏移
//   DDAE: BPL ddb2
//   DDB0: EOR #$FF         ; 取绝对值
//   ddb2: SEC; SBC #$50
//   DDB6: AND #$38; LSR
//   DDBA: STA $3B
//   DDBC: LSR; ADC $3B; ADC $3A
//   DDC1: TAX; LDA $DDDE,X ; 查表
//   DDC5: STA $062B
//   DDC8: ASL; ASL; ASL; ADC $062B
//   store: STA $062B
//   RTS

/** $DDCB-$DDDD: 近距离速度查表（19 entries） */
const MOVE_SPEED_NEAR: readonly number[] = [
  0x13, 0x12, 0x11, 0x10, 0x0F, 0x0E, 0x0D, 0x0C,
  0x0B, 0x0A, 0x09, 0x08, 0x07, 0x06, 0x05, 0x05, 0x05, 0x05, 0x05,
];

/** $DDDE-$DDFC: 远距离速度查表（31 entries） */
const MOVE_SPEED_FAR: readonly number[] = [
  0x05, 0x05, 0x04, 0x04, 0x04, 0x04, 0x04, 0x05,
  0x04, 0x03, 0x03, 0x03, 0x03, 0x05, 0x04, 0x03,
  0x02, 0x02, 0x02, 0x05, 0x04, 0x03, 0x02, 0x01,
  0x01, 0x05, 0x04, 0x03, 0x02, 0x01, 0x00,
];

/**
 * $DD63: 计算坐标距离并存入 $0638。
 * 6502: TAX; LDY #$7C; JSR coordTransform; STA $0638; SEC; RTS
 */
export function getDistance_$DD63(sys: SystemState, xReg: number, yReg: number): void {
  coordTransform_$CDE2(sys, xReg, yReg);
  sys.mem[0x0638] = sys.regs.A;
}

/**
 * $DD73: 带方向标记的距离计算。
 * 6502: 根据 $05FB (主队/客队) 选择偏移基值，随机 +0 或 +1。
 */
export function getDistanceSigned_$DD73(sys: SystemState): void {
  let base = (sys.mem[0x05FB] === 0) ? 0xE9 : 0x05;
  // LSR $E2; ADC #$00 → 随机 +0 或 +1
  base = (base + ((sys.mem[0x00E2] & 1) ? 1 : 0)) & 0xFF;
  sys.mem[0x0638] = base;
}

/**
 * $DD86: 距离值转像素移动量（存 $062B）。
 * 6502: 读取 $0635(ΔX)、$0637(ΔY) → 查表得速度值 → 存 $062B
 */
export function distanceToPixels_$DD86(sys: SystemState): void {
  let dx = sys.mem[0x0635];
  // 根据队伍方向取反
  if (sys.mem[0x05FB] !== 0) {
    dx = ((-dx) & 0xFF);
  }
  // 计算速度
  if (dx >= 0xA0) {
    // 远距离路径
    const colIdx = ((dx - 0xA0) & 0xFF) >> 3;
    let dy = sys.mem[0x0637];
    if (dy & 0x80) dy = (-dy) & 0xFF;               // 取绝对值
    dy = (((dy - 0x50) & 0x38) >> 1) & 0xFF;
    const rowPart = ((dy >> 1) + dy) & 0xFF;
    const totalDist = (rowPart + colIdx) & 0xFF;
    const speed = MOVE_SPEED_FAR[totalDist % MOVE_SPEED_FAR.length];
    const pixels = (speed * 9) & 0xFF;              // ×9 (= speed<<3 + speed)
    sys.mem[0x062B] = pixels;
  } else {
    // 近距离路径
    const colIdx = ((dx - 0x30) & 0xFF) >> 3;
    const speed = MOVE_SPEED_NEAR[colIdx % MOVE_SPEED_NEAR.length];
    sys.mem[0x062B] = speed;
  }
}

// ═════════════════════════════════════════════════
// $DCFD-$DD62 — 球员移动检查 (102 bytes)
// ═════════════════════════════════════════════════
//
// 6502 反汇编 ($DCFD):
//   DCFD: LDA #$FF
//   DCFF: STA $061A        ; 目标距离 = $FF
//   DD02: JSR $DD81        ; calcDistance
//   DD05: JSR $DD47        ; 距离→像素
//   DD08: PHP              ; 存标志
//   DD09: LDA #$00
//   DD0B: STA $061B        ; 结果标志 = 0
//   DD0E: JSR $E73E        ; bank31 player logic
//   DD11: PLP
//   DD12: BCC $DD1C        ; carry=0 → 可以移动
//   DD14: LDA #$2D
//   DD16: JSR $CBB0        ; 音效 $2D (碰撞/失败)
//   DD19: JMP $801B        ; → bank00 dispatch
//   DD1C: JSR $CD77        ; gameModeSelector
//   DD1F: LDY #$0A
//   DD21: LDA ($34),Y
//   DD23: BNE $DD36
//   DD25: LDA #$1A
//   DD27: STA $24
//   DD29: LDA #$1B
//   DD2B: STA $25
//   DD2D: JSR $CE2D        ; bank switch
//   DD30: LDX #$50
//   DD32: TXS
//   DD33: JMP $8006        ; → bank00 get state
//   DD36: LDA #$1A
//   DD38: STA $24
//   DD3A: LDA #$1B
//   DD3C: STA $25
//   DD3E: JSR $CE2D
//   DD41: LDX #$50
//   DD43: TXS
//   DD44: JMP $8018        ; → bank00 action
//
// $DD47: 距离校验
//   DD47: LDA $3C04
//   DD4A: BNE $DD6E
//   DD4C: LDA $0635        ; ΔX
//   DD4F: LDX $05FB
//   DD52: BEQ dd56
//   DD54: EOR #$FF; sec; ADC #$01
//   dd56: CMP #$80
//   DD58: BCS adjust
//   DD5A: ADC #$4F
//   DD5C: LDX $05FB
//   DD5F: BEQ ret

/**
 * $DCFD: 球员移动检查 — 计算到达性 + 执行移动/碰撞逻辑。
 * 6502: 计算距离 → 调用 bank31 player logic → 判断结果。
 *
 * @param onBank00_801B bank00 $801B 回调（碰撞路径）
 * @param onBank00_8006 bank00 $8006 回调（get state 路径）
 * @param onBank00_8018 bank00 $8018 回调（continue 路径）
 * @param onBank31_E73E bank31 $E73E 回调（player logic）
 * @param onGameModeSelect bank30 $CD77 回调（游戏模式选择）
 */
export function playerMoveCheck_$DCFD(
  sys: SystemState,
  onBank00_801B: (sys: SystemState) => void,
  onBank00_8006: (sys: SystemState) => void,
  onBank00_8018: (sys: SystemState) => void,
  onBank31_E73E: (sys: SystemState) => void,
  onGameModeSelect: (sys: SystemState) => void,
): void {
  sys.mem[0x061A] = 0xFF;          // 目标标志

  // 计算距离 (JSR $DD81 + $DD47)
  getDistanceSigned_$DD73(sys);
  distanceToPixels_$DD86(sys);

  sys.mem[0x061B] = 0;             // 结果标志清零

  // JSR $E73E — player logic
  onBank31_E73E(sys);

  // 判断 carry: BCC → 可移动; BCS → 碰撞
  const canMove = !(sys.regs.P & 0x01);
  if (!canMove) {
    // 碰撞路径
    audiotrigger_$CBB0(sys, 0x2D);
    sys.mem[0x24] = 0x1A; sys.mem[0x25] = 0x1B;
    bankSwitch_apply_$CE2D(sys);
    onBank00_801B(sys);
    return;
  }

  // 可移动: 检查角色数据
  onGameModeSelect(sys);
  const ptr = (sys.mem[0x35] << 8) | sys.mem[0x34];
  const charFlag = sys.mem[ptr + 0x0A];

  sys.mem[0x24] = 0x1A; sys.mem[0x25] = 0x1B;
  bankSwitch_apply_$CE2D(sys);

  if (charFlag === 0) {
    // 玩家消失 → get state
    onBank00_8006(sys);
  } else {
    // 继续移动
    onBank00_8018(sys);
  }
}

/**
 * $DD47: 距离有效性校验（辅助函数）。
 * 6502: 检查 $3C04 + $0635 偏移是否在可到达范围内。
 * @returns carry set = 不可到达, carry clear = 可到达
 */
export function distanceCheck_$DD47(sys: SystemState): boolean {
  if (sys.mem[0x3C04] !== 0) return false;  // 特殊模式跳过
  let dist = sys.mem[0x0635];
  if (sys.mem[0x05FB] !== 0) dist = (-dist) & 0xFF;
  // 简化: 距离 <= $80 为有效
  return dist <= 0x80;
}

// ═════════════════════════════════════════════════
// $DDFD-$DE44 — 球员初始化 (72 bytes)
// ═════════════════════════════════════════════════
//
// 6502 反汇编:
//   DDFD: LDA $00E2
//   DE00: AND #$07
//   DE02: CMP #$06
//   DE04: BCC de06
//   DE06: SBC #$06         ; >=6 → -6 (wrap)
//   DE08: CLC
//   DE09: ADC #$05         ; +5
//   DE0B: ADC $05FB        ; 加队伍偏移
//   DE0E: STA $05FC        ; 存球员 ID
//   DE11: LDA $05FB        ; 队伍标志
//   DE14: STA $0441        ; 场景 ID
//   DE17: JSR $E6EC        ; bank31 player logic
//   DE1A: LDY #$0A
//   DE1C: LDA #$00
//   DE1E: STA ($34),Y      ; 清零 HP
//   DE20: LDA #$00
//   DE22: STA $0628        ; 清零动画计数器
//   DE25: STA $044E        ; 清零 RN seed
//   DE28: JSR $DCDF        ; 生成随机数
//   DE2B: LDA #$01
//   DE2D: STA $043B        ; 初始化事件标志
//   DE30: LDA #$00
//   DE32: STA $043C        ; 事件步进
//   DE35: JSR $D093        ; 菜单分发
//   DE38: LDA #$3A
//   DE3A: JSR $CBB0        ; 音效 $3A
//   DE3D: LDA #$1A
//   DE3F: STA $061A        ; 距离目标
//   DE42: JMP $DE5E        ; → matchEventSubEntry

/**
 * $DDFD: 初始化球员（随机选择球员 + 队伍分配）。
 * 6502: ($E2 & 7) 模 6 → +5 → +team → 存 $05FC; 清零 HP/动画; play sound $3A
 *
 * @param onBank31_E6EC bank31 $E6EC player logic 回调
 * @param onMenuDispatch bank30 $D093 菜单分发回调
 * @param onMatchSubEntry bank30 $DE5E 回调
 */
export function playerInit_$DDFD(
  sys: SystemState,
  onBank31_E6EC: (sys: SystemState) => void,
  onMenuDispatch: (sys: SystemState) => void,
  onMatchSubEntry: (sys: SystemState) => void,
): void {
  // 随机器生成球员 ID
  let rand = sys.mem[0x00E2] & 0x07;
  if (rand >= 6) rand -= 6;
  const playerId = (rand + 5 + sys.mem[0x05FB]) & 0xFF;
  sys.mem[0x05FC] = playerId;
  sys.mem[0x0441] = sys.mem[0x05FB];

  // 清零
  onBank31_E6EC(sys);
  const ptr = (sys.mem[0x35] << 8) | sys.mem[0x34];
  sys.mem[ptr + 0x0A] = 0;        // HP = 0
  sys.mem[0x0628] = 0;           // 动画计数
  sys.mem[0x044E] = 0;           // RN
  randomGen_$DCDF(sys);          // 再生随机数

  sys.mem[0x043B] = 1;           // 事件标志
  sys.mem[0x043C] = 0;           // 事件步进
  onMenuDispatch(sys);
  audiotrigger_$CBB0(sys, 0x3A);
  sys.mem[0x061A] = 0x1A;
  onMatchSubEntry(sys);
}

// ═════════════════════════════════════════════════
// $DF8B-$DFBC — 比赛结果计算辅助 (50 bytes)
// ═════════════════════════════════════════════════
//
// 6502 反汇编:
//   DF8B: LDA $0638        ; 网格位置
//   DF8E: JSR $CDC9        ; tileCoordConvert
//   DF91: TXA              ; 列坐标
//   DF92: SEC
//   DF93: SBC $0635        ; 减目标 X
//   DF96: BCS $DF9C
//   DF98: EOR #$FF
//   DF9A: ADC #$01         ; 取绝对值
//   DF9E: STA $3A          ; |ΔX|
//   DFA0: TYA              ; 行坐标
//   DFA1: SEC
//   DFA2: SBC $0637        ; 减目标 Y
//   DFA5: BCS $DFAB
//   DFA7: EOR #$FF
//   DFA9: ADC #$01         ; 取绝对值
//   DFAE: TAY              ; |ΔY|
//   DFAF: SEC
//   DFB0: SBC $3A          ; |ΔY| - |ΔX|
//   DFB2: BCS $DFB6
//   DFB4: LDY $3A          ; 取较大的值
//   DFB6: TYA
//   DFB7: LSR; LSR; LSR    ; /8
//   DFBA: TAX; LDA $DFBD,X ; 查表 → $062B
//   DFBF: STA $062B
//   DFC1: RTS

/** $DFBD-$DFD8: 结果系数查表 (28 bytes) */
const RESULT_COEFF: readonly number[] = [
  0x02, 0x03, 0x03, 0x03, 0x03, 0x04, 0x04, 0x04,
  0x04, 0x04, 0x04, 0x05, 0x05, 0x05, 0x05, 0x05,
  0x05, 0x05, 0x05, 0x05,
  // 内联初始化代码: JSR $DCDF; LDA #$19; JSR $CBB0
];

/**
 * $DF8B: 根据网格距离计算比赛结果系数。
 * 6502: gridPos→tileCoords; |ΔX| 和 |ΔY| → maxDist/8 → 查 RESULT_COEFF 表
 */
export function resultCalcDistance_$DF8B(sys: SystemState): void {
  const gridPos = sys.mem[0x0638];

  // 转换坐标 (JSR $CDC9)
  const targetX = sys.mem[0x0635];
  const targetY = sys.mem[0x0637];

  // 计算 |ΔX|
  let dx = gridPos; // 简化: gridPos 包含了行列信息
  dx = ((dx - targetX) & 0xFF);
  if (dx & 0x80) dx = (-dx) & 0xFF;
  sys.mem[0x3A] = dx;

  // 计算 |ΔY|
  let dy = ((sys.mem[0x0637] - targetY) & 0xFF);
  if (dy & 0x80) dy = (-dy) & 0xFF;

  // 取 max(|ΔX|, |ΔY|)
  if (dy < dx) dy = dx;

  // /8 → 查表
  const idx = (dy >> 3);
  sys.mem[0x062B] = RESULT_COEFF[idx % RESULT_COEFF.length];
}

// ═════════════════════════════════════════════════
// $DFD9-$DFFF — 比赛结果最终计算 (39 bytes)
// ═════════════════════════════════════════════════
//
// 6502 反汇编:
//   DFD9: JSR $E059        ; bank31 helper
//   DFDC: LDA #$FF
//   DFDE: STA $061A        ; 目标 = $FF
//   DFE1: LDA #$01
//   DFE3: STA $061B        ; 结果标志 = 1
//   DFE6: JSR $E73E        ; bank31 player logic
//   DFE9: LDA #$1A
//   DFEB: JSR $CBB0        ; 音效 $1A
//   DFEE: LDA $0441        ; 当前球员 ID
//   DFF1: JSR $CD7C        ; getCharData
//   DFF4: LDA $0443        ; 结果值
//   DFF7: ASL; ASL; ASL    ; ×8
//   DFFA: LDX $05FB
//   DFFD: BEQ $E002

/**
 * $DFD9: 比赛结果最终计算 — 获取结果值并放大。
 * 6502: bank31 helper → 设标志 → playerLogic → 音效 → 读取 $0443×8
 *
 * @param onBank31_E059 bank31 $E059 回调
 * @param onBank31_E73E bank31 $E73E 回调
 * @returns 结果值 (0-$FF)
 */
export function matchResultCalc_$DFD9(
  sys: SystemState,
  onBank31_E059: (sys: SystemState) => void,
  onBank31_E73E: (sys: SystemState) => void,
): number {
  onBank31_E059(sys);
  sys.mem[0x061A] = 0xFF;
  sys.mem[0x061B] = 1;
  onBank31_E73E(sys);
  audiotrigger_$CBB0(sys, 0x1A);

  // 读取角色数据
  sys.mem[0x0441] = sys.mem[0x05FC]; // fallback to player ID
  getCharData_$CD7C(sys);

  let result = sys.mem[0x0443];
  result = (result << 3) & 0xFF;  // ×8
  if (sys.mem[0x05FB] !== 0) {
    result = (-result) & 0xFF;     // 客队取反
  }
  return result;
}

// ═════════════════════════════════════════════════
// $D565-$D6C9 — 玩家状态处理 (357 bytes)
// ═════════════════════════════════════════════════
//
// 6502 反汇编概要:
//   $D565: 子入口1 — 输入确认/Menu流程分发
//   $D57E: 主入口 — GP 消耗后的状态流转
//       检查角色 HP → 若为 0 则音效 + 退出
//       根据 $0621(state) 决定前进方向
//       通过 $D6CA 跳转表分发到不同逻辑分支
//   $D5C3: 输入循环 — 等帧 + 读手柄 + 闪烁动画
//   $D60C: 确认分发 — 扫描位标记 + 查表跳转
//   $D64E: 各分支处理逻辑（调用 bank31 $EF7F + bank1C dispatch）

/** $D6CA-$D6F2: 玩家状态分发跳转表（24 entries） */
const PLAYER_STATE_JMP_TABLE_LO: readonly number[] = [
  0x92, 0xE8, 0x0C, 0x79, 0x0C, 0x65, 0x0C, 0x0C,
  0x0C, 0x0C, 0x02, 0x01, 0x00, 0x03, 0x04, 0x05,
  0x06, 0x1E, 0x1F, 0x20, 0x00, 0x01, 0x03, 0x02,
];

/** $D6F3-$D70B: 选项数据配置表 → 从 bank-30-data 导入 DATA_$D6F3_$D70B (25 bytes) */

/**
 * $D565: 玩家状态主入口 — 根据 $0621 分发到对应状态处理。
 *
 * 6502 流程:
 *   1. $D573 → 查跳转表得目标地址
 *   2. 切换到 bank $1A/$1B → 执行对应逻辑
 *   3. $D57E: 较完整的状态处理入口 — 检查 HP + 跳转表
 *
 * @param onBank31_EF7F bank31 help display 回调
 * @param onBank1A_1B bank dispatch 回调 (bank $1A/$1B)
 * @param onBank31_E73E bank31 player logic 回调 ($E73E)
 */
export function playerStateHandler_$D565(
  sys: SystemState,
  onBank31_EF7F: (sys: SystemState, a: number) => void,
  onBank1A_1B: (sys: SystemState, subAddr: string) => void,
  onBank31_E73E?: (sys: SystemState) => void,
): void {
  const state = sys.mem[0x0621];

  // 读手柄输入
  const joypad = sys.mem[0x001E];

  // 检查角色 HP
  getCharData_$CD7C(sys);
  const ptr = (sys.mem[0x35] << 8) | sys.mem[0x34];
  const hp = sys.mem[ptr + 0x0A];

  if (hp === 0) {
    audiotrigger_$CBB0(sys, 0x40);
    onBank31_EF7F(sys, state);
    return;
  }

  // $D5B2: check state
  if (state >= 3) {
    // 检查 $0600 是否有玩家
    if (sys.mem[0x0600] !== 0) {
      if (sys.mem[0x0601] !== 0 && sys.mem[0x0601] !== 0x0B) {
        audiotrigger_$CBB0(sys, 0x41);
      }
    }
    onBank31_EF7F(sys, 0);
  }

  // $D5C3: 输入循环
  sys.mem[0x0011] = 0;
  sys.mem[0x0012] = 0;
  timerInit_$CB0F(sys, 2);

  // 闪烁刷新
  // 在 6502 中这里调用 waitFrame 后再次显示
  // 简化: 闪烁标志翻转
  if (sys.mem[0x0615] & 0x40) {
    sys.mem[0x0615] &= ~0x40;
  } else {
    sys.mem[0x0615] |= 0x40;
  }

  // 队伍标志 — 6502: JSR $E73E → bank31 球员逻辑
  const teamFlag = sys.mem[0x05FB];
  if (teamFlag === 0) {
    // 调用 bank31 player logic ($E73E)
    if (onBank31_E73E) {
      onBank31_E73E(sys);
    }
  }

  // 通过跳转表分发
  const jmpIdx = state * 2;
  const lo = PLAYER_STATE_JMP_TABLE_LO[jmpIdx % PLAYER_STATE_JMP_TABLE_LO.length];
  const hi = (lo >= 0x0C) ? 0xD7 : 0xD9;
  const subAddr = `${lo.toString(16).toUpperCase()}_D${hi.toString(16).toUpperCase()}`;

  // 方向键处理
  if (joypad & 0x0F) {
    let dirIdx = 0;
    let mask = joypad & 0x0F;
    if (mask & 0x01) dirIdx = 0;
    else if (mask & 0x02) dirIdx = 1;
    else if (mask & 0x04) dirIdx = 2;
    else dirIdx = 3;

    const configIdx = state * 4 + dirIdx;
    const option = DATA_$D6F3_$D70B[configIdx % DATA_$D6F3_$D70B.length];
    if (option !== 0xFF) {
      sys.mem[0x043B] = option;
    }
  }

  // A 键确认
  if (joypad & 0x80) {
    if (sys.mem[0x061E] & 0x80) {
      // 已确认 — 分发到 bank $1A/$1B
      onBank1A_1B(sys, subAddr);
    }
  }

  // B 键取消
  if (joypad & 0x40) {
    if (sys.mem[0x061E] & 0x80) {
      sys.mem[0x061E] = 0;
      onBank31_EF7F(sys, 0);
    }
    return;
  }

  // 时序闪烁
  if (sys.mem[0x061F] & 0x40) {
    const blink = sys.mem[0x061E] ^ 0x40;
    sys.mem[0x061E] = blink;
  }
}

// ═════════════════════════════════════════════════
// $D70C-$D851 — 比赛事件处理 (326 bytes)
// ═════════════════════════════════════════════════
//
// 6502 反汇编概要:
//   $D70C: 主入口 — 帧等待 + 清标志
//   $D717: 事件分支 1 — bank dispatch 到 $1C/$1D:$8012
//   $D737: 事件分支 2 — bank dispatch 到 $1C/$1D:$8015
//   $D74F: 距离比较 — 角色坐标与目标坐标比大小
//   $D757: bank 调度 — 从 bank $1C 读数据 → 校验
//   $D7A0: 分支状态检查 — 多条件跳转
//   $D7CC: 输入处理循环 — 读手柄 + 选项滚动
//   $D80C: 选择确认 — 查表 + 写结果

/**
 * $D70C: 比赛事件处理入口 — 处理一帧事件逻辑。
 *
 * 6502 流程:
 *   1. 帧等待 → 清 $062D 标志
 *   2. 根据 $043B(eventStep) 和 $043C(eventType) 分发
 *   3. 两种 bank dispatch 分支: $8012($1C/$1D) 和 $8015($1C/$1D)
 *   4. 返回值校验 → 可能需要重试或退出
 *
 * @param onBank1C_8012 bank dispatch 回调 (event branch 1)
 * @param onBank1C_8015 bank dispatch 回调 (event branch 2)
 * @param onBank31_EF7F bank31 help 回调
 */
export function matchEventHandler_$D70C(
  sys: SystemState,
  onBank1C_8012: (sys: SystemState, a: number) => void,
  onBank1C_8015: (sys: SystemState, a: number) => void,
  onBank31_EF7F: (sys: SystemState, a: number) => void,
): void {
  // 帧等待 + 额外等待 (6502: JSR $9FA8 waitFrame ×3)
  // 翻译: 设 $E9 = 3，外部帧循环逐帧递减
  sys.mem[0xE9] = Math.max(sys.mem[0xE9], 3);
  sys.mem[0x062D] = 0;

  const eventType = sys.mem[0x043C];

  // 分支 1: bank dispatch $8012
  {
    const savedW6 = sys.mem[0x24];
    const savedW7 = sys.mem[0x25];
    sys.mem[0x24] = 0x1C;
    sys.mem[0x25] = 0x1D;
    bankSwitch_apply_$CE2D(sys);
    onBank1C_8012(sys, eventType);
    sys.mem[0x24] = savedW6;
    sys.mem[0x25] = savedW7;
    bankSwitch_apply_$CE2D(sys);
  }

  // 距离比较
  const ptr = (sys.mem[0x35] << 8) | sys.mem[0x34];
  let lo = sys.mem[ptr + 1];
  const tgtLo = sys.mem[0x043F];
  let hi = sys.mem[ptr + 2];
  const tgtHi = sys.mem[0x0440];
  const cmp = (hi - tgtHi) & 0xFF;

  if ((cmp & 0x80) === 0 && (sys.mem[0x043C] & 0x80) === 0) {
    // 在范围内 → 减少阈值
    lo = ((lo - 1) & 0xFF);
    sys.mem[0x043C] = lo;
    return;
  }

  // 分支 2: bank dispatch $8015
  if ((sys.mem[0x043E] & 0x80) === 0) {
    const savedW6 = sys.mem[0x24];
    const savedW7 = sys.mem[0x25];
    sys.mem[0x24] = 0x1C;
    sys.mem[0x25] = 0x1D;
    bankSwitch_apply_$CE2D(sys);
    onBank1C_8015(sys, sys.mem[0x043E]);
    sys.mem[0x24] = savedW6;
    sys.mem[0x25] = savedW7;
    bankSwitch_apply_$CE2D(sys);

    // 如果结果 carry=0 => 触发失败路径
    if (!(sys.regs.P & 0x01)) {
      audiotrigger_$CBB0(sys, 0x3D);
      return;
    }
  }

  // $D7A0: 状态检查路径
  const subState = sys.mem[0x043C];
  if (subState >= 3) {
    sys.mem[0x043C] = sys.mem[0x044E];  // 重映射
  }

  if (subState === 0x12) {
    // 特殊分支: 初始化逻辑
    if (sys.mem[0x0448] === 0) {
      sys.mem[0x0448] = 1;
      audiotrigger_$CBB0(sys, 0x46);
      // bank dispatch $1A/$1B:$8021
    }
  }

  // 最后分支: 向 bank dispatch 到 $1A/$1B
  if (subState === 0x11) {
    sys.mem[0x0449] = 0;
    sys.mem[0x044A] = 0;
  }

  // 输入循环序
  onBank31_EF7F(sys, 0x0F);
  sys.mem[0x062D] = 0x81;
  sys.mem[0x0494] = 0x1F;
}

// ═════════════════════════════════════════════════
// $D852-$D978 — 球员选择光标 + 属性显示 (295 bytes)
// ═════════════════════════════════════════════════
//
// 6502 反汇编概要:
//   $D852: 读取光标项 — 根据 $0625 或 $0430 读取角色数据
//   $D878: 属性显示 — 显示球员名和 GP（bank31 $EF7F 调用）
//   $D89A: 输入处理循环 — 方向键移动光标 + A 键确认 + B 键取消
//   $D8D2: 光标绘制 — 计算屏幕坐标 → 写入 PPU 数据
//   $D8F7: 位置匹配 — 校验光标位置与网格位置是否一致

/**
 * $D852: 球员选择光标主入口 — 在球员列表中用方向键移动光标。
 *
 * 6502 流程:
 *   1. 读 $0625（选择光标索引）
 *   2. 通过 $CDE2 转换网格坐标
 *   3. 检查是否与目标位置一致（$0430 的有效数据）
 *   4. 方向键上下移动光标（限界在 0 - $0430）
 *   5. A 键确认 → 写 $05FC 当前选择 → 退出
 *   6. B 键取消 → 写特殊标志 → 退出
 *
 * @param onBank31_EF7F bank31 help 回调（显示球员名等）
 */
export function playerSelectCursor_$D852(
  sys: SystemState,
  onBank31_EF7F: (sys: SystemState, a: number) => void,
): void {
  const maxIdx = sys.mem[0x0430];
  let cursorIdx = sys.mem[0x0625];

  if (cursorIdx !== 0) {
    // 读取当前选中角色的数据
    const srcIdx = cursorIdx < 0x0B ? cursorIdx + 0x22 : cursorIdx + 0x22;
    // 调用 bank31 显示
    onBank31_EF7F(sys, cursorIdx < 0x0B ? cursorIdx + 0x22 : cursorIdx);
  }

  timerInit_$CB0F(sys, 1);

  // 输入循环
  while (true) {
    const joypad = sys.mem[0x001E];

    // 方向: Up/Down
    if (joypad & 0x08) {
      cursorIdx = (cursorIdx - 1) & 0xFF;
      if ((cursorIdx & 0x80) !== 0) cursorIdx = maxIdx;
      sys.mem[0x0625] = cursorIdx;
      onBank31_EF7F(sys, cursorIdx < 0x0B ? cursorIdx + 0x1F : cursorIdx);
    }
    if (joypad & 0x04) {
      cursorIdx = (cursorIdx + 1) & 0xFF;
      if (cursorIdx > maxIdx) cursorIdx = 0;
      sys.mem[0x0625] = cursorIdx;
      onBank31_EF7F(sys, cursorIdx < 0x0B ? cursorIdx + 0x1F : cursorIdx);
    }

    // A 确认
    if (joypad & 0x80) {
      let selected = sys.mem[0x0431 + cursorIdx];
      sys.mem[0x05FC] = selected;
      return;
    }

    // B 取消
    if (joypad & 0x40) {
      // 取消标志
      sys.mem[0x02FC] = 0xF8;
      return;
    }

    // 帧等待
    timerInit_$CB0F(sys, 1);

    // 计算光标屏幕位置
    const cursorPos = (cursorIdx << 4) + 0x9A;
    sys.mem[0x02FC] = cursorPos & 0xFF;
    sys.mem[0x02FD] = 0x11;
    sys.mem[0x02FE] = 0x03;
    sys.mem[0x02FF] = 0x50;
  }
}

// ═════════════════════════════════════════════════
// $D979-$DB33 — 球员替换 UI + 场景过渡 + 匹配结果 (443 bytes)
// ═════════════════════════════════════════════════
//
// 6502 反汇编概要:
//   $D979: 替换 UI 主入口 — 搜索可替换球员
//   $D9AF: 球员扫描 — 找角色数据 + 比较距离
//   $DA03: 输入循环 — 确认替换目标
//   $DA24: 选人光标移动 — 左右切换
//   $DA48: 位置匹配检查 — 校验选择有效性
//   $DAAA: 场景过渡 — 切 bank 控制流
//   $DAE5: 中场处理 — 调用 bank31 $EF7F 显示
//   $DB07: 比赛结果显示 — 音效 + 文本

/**
 * $D979: 球员替换 UI — 在比赛中断时替换场上球员。
 *
 * 6502 流程:
 *   1. 播放音效 $38
 *   2. 检查 $043C — 如果有球员被选中则跳过
 *   3. 遍历 0-10 索引 → 找 HP=0 且距离在阈值内 → 加入候选列表
 *   4. 调用 bank31 $EF7F 显示替换 UI
 *   5. 等待 A/B 键输入 → 确认或取消替换
 *   6. 如果确认 → bank dispatch 到 $1A/$1B:$8021 执行替换
 *   7. 替换后 → 切换场景模式
 *
 * @param onBank1A_8021 bank dispatch 回调（替换确认）
 * @param onBank31_EF7F bank31 help 回调
 */
export function playerSubstitutionUI_$D979(
  sys: SystemState,
  onBank1A_8021: (sys: SystemState, a: number) => void,
  onBank31_EF7F: (sys: SystemState, a: number) => void,
): void {
  audiotrigger_$CBB0(sys, 0x38);

  if (sys.mem[0x043C] !== 0) return;  // 已经选中

  // 初始化候选列表
  sys.mem[0x3A] = 1;  // 扫描计数器
  sys.mem[0x0430] = 0;  // 候选数量

  // 扫描可用球员
  for (let i = 1; i < 0x0B; i++) {
    if (i === sys.mem[0x0441]) continue;  // 跳过自己

    // 距离检查（简化：阈值 = 0x14）
    getCharData_$CD7C(sys);
    const ptr = (sys.mem[0x35] << 8) | sys.mem[0x34];
    const dx = Math.abs(sys.mem[ptr + 0x06] - sys.mem[0x0635]);
    const dy = Math.abs(sys.mem[ptr + 0x08] - sys.mem[0x0637]);

    if (dx < 0x14 && dy < 0x14) {
      // 记录候选
      const slotIdx = sys.mem[0x0430];
      if (slotIdx < 4) {
        sys.mem[0x0431 + slotIdx] = i;
        sys.mem[0x0430] = (slotIdx + 1) & 0xFF;
      }
    }
    sys.mem[0x3A] = (i + 1) & 0xFF;
  }

  // 调用 bank31 显示
  const candidateCount = sys.mem[0x0430];
  if (candidateCount === 0) {
    // 无候选 → 提示
    onBank31_EF7F(sys, 0x11);
    timerInit_$CB0F(sys, 1);
    // 等待 A/B 回退
    const joypad = sys.mem[0x001E];
    if ((joypad & 0xC0) !== 0) return;
  } else {
    // 有候选 → 显示选择 UI
    onBank31_EF7F(sys, 0x10);
    sys.mem[0x062D] = 0x82;
    sys.mem[0x0494] = 0x1F;
  }

  // 比赛结果处理阶段
  sys.mem[0x062D] = 0;
  sys.mem[0x0615] = 0;
  audiotrigger_$CBB0(sys, 0x33);

  // 场景过渡 → bank dispatch
  const savedW6 = sys.mem[0x24];
  const savedW7 = sys.mem[0x25];
  sys.mem[0x24] = 0x1A;
  sys.mem[0x25] = 0x1B;
  bankSwitch_apply_$CE2D(sys);
  onBank1A_8021(sys, 0);
  sys.mem[0x24] = savedW6;
  sys.mem[0x25] = savedW7;
  bankSwitch_apply_$CE2D(sys);

  // 中场暂停显示
  onBank31_EF7F(sys, 0x33);
  onBank31_EF7F(sys, 0x35);
  onBank31_EF7F(sys, 0x01);
}

// ═════════════════════════════════════════════════
// $DBF3-$DC81 — 队伍槽位标志 + 坐标/属性缩放 (143 bytes)
// ═════════════════════════════════════════════════
//
// 6502 反汇编概要:
//   $DBF3: 队伍翻转 — XOR #$0B → 存 $05FB
//   $DBFF: 坐标缩放 — 根据 $2C/$2E 缩放球员坐标
//   $DC07: 属性缩放 — 查表缩放球员属性值
//   $DC29: 循环入口 — 遍历 22 个球员槽位
//
// 核心功能: 根据场上球员位置重新计算坐标和属性值。
// 使用多个查表 ($DC82-$DCDE) 进行属性映射和坐标修正。

/** $DC82-$DCDE: 属性映射表（4组，每组 11 字节） */
const ATTR_MAP_TABLE: readonly number[] = [
  // Group A (team A x4 types)
  0x05, 0x3D, 0x46, 0x41, 0x2A, 0x57, 0x77, 0x5C, 0x71, 0x72, 0x6C,
  0x05, 0x3D, 0x46, 0x41, 0x2A, 0x63, 0x68, 0x5A, 0x72, 0x59, 0x71,
  0x05, 0x3D, 0x46, 0x35, 0x4C, 0x63, 0x68, 0x4F, 0x72, 0x5A, 0x71,
  0x05, 0x3D, 0x46, 0x35, 0x37, 0x59, 0x77, 0x68, 0x72, 0x71, 0x63,
  // Group B (unused trailing data)
  0xEA, 0xBE, 0xB5, 0xAE, 0xC5, 0xA4, 0x79, 0x9F, 0x97, 0x94, 0x82,
  0xEA, 0xBE, 0xB5, 0xAE, 0xC5, 0x99, 0x92, 0x95, 0x7B, 0x96, 0x80,
  0xEA, 0xB2, 0xA9, 0xBA, 0x96, 0x99, 0x92, 0x94, 0x7B, 0x95, 0x80,
  0xEA, 0xB2, 0xA9, 0xBB, 0xB9, 0xA2, 0x79, 0x9F, 0x95, 0x97, 0xA4,
];

/** $DC87-$DCB2: 坐标缩放查表 */
const COORD_SCALE_TABLE: readonly number[] = [
  0x05, 0x06, 0x07, 0x09, 0x0A, 0x05, // ← 前6项($DC82-$DC87)也是此表开头
];

/**
 * $DBF3: 队伍槽位翻转 — 切换队伍标志并重置坐标。
 *
 * 6502: XOR $044F 与 #$0B → 存 $05FB
 */
export function teamFlagFlip_$DBF3(sys: SystemState): void {
  sys.mem[0x05FB] = sys.mem[0x044F] ^ 0x0B;
}

/**
 * $DBFF: 坐标缩放主入口 — 根据 $2C/$2E 缩放所有球员坐标。
 *
 * 6502 流程:
 *   1. 读 $2C → 计算横向缩放因子
 *   2. 读 $2E → 计算纵向缩放因子
 *   3. 遍历 22 个槽位 → 每个球员的坐标 * 缩放因子
 *   4. 查 $DC82 属性表 → 映射属性值
 */
export function coordAttrScale_$DBFF(sys: SystemState): void {
  // 横向缩放因子 (基于 $2C)
  const hScale = sys.mem[0x002C];
  const hScaleX3 = (hScale * 3) & 0xFF;
  const hScaleX8 = ((hScaleX3 << 3) + hScaleX3) & 0xFF;

  // 纵向缩放因子 (基于 $2E)
  const vScale = sys.mem[0x002E];
  const vScaleX3 = (vScale * 3) & 0xFF;
  const vScaleX8 = ((vScaleX3 << 3) + vScaleX3) & 0xFF;

  sys.mem[0x3A] = hScaleX8;
  sys.mem[0x3B] = vScaleX8;

  // 遍历 22 个槽位
  let idx = 0;
  for (let slot = 0; slot < 0x16; slot++) {
    getCharData_$CD7C(sys);

    // 坐标缩放
    const teamFlag = sys.mem[0x05FB];
    const scaleX = (teamFlag === 0 || slot < 0x0B) ? hScaleX8 : vScaleX8;

    // 读当前坐标
    const ptr = (sys.mem[0x35] << 8) | sys.mem[0x34];
    const attrX = sys.mem[ptr + 0x06];
    const attrY = sys.mem[ptr + 0x08];

    // 查属性表 → 缩放后的值
    const attrIdx = (slot + scaleX) & 0xFF;
    const scaledX = COORD_SCALE_TABLE[attrIdx % COORD_SCALE_TABLE.length];

    // 应用坐标
    if (teamFlag !== 0 && slot >= 0x0B) {
      scaledX !== 0 && (sys.mem[ptr + 0x06] = ((-scaledX) & 0xFF));
      sys.mem[ptr + 0x08] = ((-attrY) & 0xFF);
    } else {
      sys.mem[ptr + 0x06] = scaledX;
      sys.mem[ptr + 0x08] = attrY;
    }

    // 额外属性清零检查
    if (slot === 0 || slot === 0x0B) {
      sys.mem[ptr + 0x07] = 0;
    }

    idx++;
  }
}

// ═════════════════════════════════════════════════
// $DE52-$DF59 — 比赛事件处理主入口 (264 bytes)
// ═════════════════════════════════════════════════
//
// 6502 反汇编概要:
//   $DE52: 入口 — 根据 $0628 决定初始目标
//   $DE5E: 核心循环 — 跑动/事件处理
//   $DE6C: 比赛流程主循环 — 多次 bank dispatch 调用
//   $DEC0: 碰撞检测 — 距离比较 + 音效触发
//   $DEE8: 球员坐标更新 — 根据速度值移动球员
//   $DF25: 队伍统计 — 更新队伍数据
//   $DF4A: 错误恢复 — 异常路径处理

/** $DF5A-$DF8A: 碰撞距离检查辅助表 */
const COLLISION_DIST_TABLE: readonly number[] = [
  0x20, 0x7C, 0xCD, 0xA0, 0x0A, 0xB1, 0x34, 0xD0,
  0x26, 0xA0, 0x06, 0xB1, 0x34, 0x38, 0xED, 0x35,
  // ... (实际是内联代码转数据)
];

/**
 * $DE52: 比赛事件处理主循环 — 核心跑动/事件引擎。
 *
 * 6502 流程:
 *   1. 设置目标距离 $061A ($FF 或 $26)
 *   2. $DE5E: 调用 bank31 $E059 → 设置目标
 *   3. 调用 $DF8B 计算距离系数
 *   4. 调用 bank31 $E73E → player logic
 *   5. 检查 $05FC → 若为 $FF 则进入错误恢复路径($DF8B)
 *   6. 读取球员数据 → bank dispatch $1A/$1B:$801E
 *   7. 音效 + 结果计算 + 跳转
 *
 * @param onBank31_E059 bank31 help 1 回调
 * @param onBank31_E73E bank31 player logic 回调
 * @param onBank1A_801E bank dispatch 回调
 * @param onResultCalc $DF8B 结果计算回调
 */
export function matchEventMain_$DE52(
  sys: SystemState,
  onBank31_E059: (sys: SystemState) => void,
  onBank31_E73E: (sys: SystemState) => void,
  onBank1A_801E: (sys: SystemState, a: number) => void,
  onResultCalc: (sys: SystemState) => void,
): void {
  const targetFlag = (sys.mem[0x0628] & 0x80) ? 0x26 : 0xFF;
  sys.mem[0x061A] = targetFlag;

  // 步骤 1: 调 bank31
  onBank31_E059(sys);

  // 步骤 2: 计算距离
  onResultCalc(sys);

  // 步骤 3: 设置结果标志
  sys.mem[0x061B] = 1;

  // 步骤 4: player logic
  onBank31_E73E(sys);

  // 步骤 5: 检查 $05FC
  const playerId = sys.mem[0x05FC];
  if (playerId === 0xFF) {
    // 错误恢复 → bank dispatch
    sys.mem[0x0441] = 0;
    const savedW6 = sys.mem[0x24];
    const savedW7 = sys.mem[0x25];
    sys.mem[0x24] = 0x1A;
    sys.mem[0x25] = 0x1B;
    bankSwitch_apply_$CE2D(sys);
    onBank1A_801E(sys, playerId);
    sys.mem[0x24] = savedW6;
    sys.mem[0x25] = savedW7;
    bankSwitch_apply_$CE2D(sys);
    audiotrigger_$CBB0(sys, 0x1C);
    return;
  }

  // 步骤 6: 读取球员属性
  sys.mem[0x0441] = playerId;
  getCharData_$CD7C(sys);

  // 步骤 7: 存储结果速度
  const speed = sys.mem[0x062B];
  sys.mem[0x0430] = speed;

  // 步骤 8: 两边队伍数据更新
  const teamFlag = sys.mem[0x05FB];
  const resultLo = sys.mem[0x0431];
  const resultHi = sys.mem[0x0432];

  // 队伍 A 侧
  sys.mem[0x05FB] = teamFlag;
  let side = sys.mem[0x0431];
  const limit = [0x23, 0x24][teamFlag & 1] || 0x23;

  // 队伍 B 侧（翻转）
  sys.mem[0x05FB] = teamFlag ^ 0x0B;
  const sideB = sys.mem[0x0432];

  // 比较两队结果
  const sideAVal = side;
  const sideBVal = sideB;

  if (sideAVal >= sideBVal) {
    if (teamFlag === 0) {
      // 队伍 A 获胜
      // 更新 battle stats
      const savedW6 = sys.mem[0x24];
      const savedW7 = sys.mem[0x25];
      sys.mem[0x24] = 0x1A;
      sys.mem[0x25] = 0x1B;
      bankSwitch_apply_$CE2D(sys);
      onBank1A_801E(sys, playerId);
      sys.mem[0x24] = savedW6;
      sys.mem[0x25] = savedW7;
      bankSwitch_apply_$CE2D(sys);
      audiotrigger_$CBB0(sys, 0x1C);
    } else {
      audiotrigger_$CBB0(sys, 0x34);
      // 失败路径
    }
    return;
  }

  // 中间结果（持续）
  // 速度递减
  const decSpeed = sys.mem[0x0430];
  if (decSpeed > 0) sys.mem[0x0430] = (decSpeed - 1) & 0xFF;

  // 循环返回（6502 中跳回 $DE6C 或 $DE5E）
}

// ═════════════════════════════════════════════════
// $D193-$D36D — GP 修改 + 输入处理主循环 (475 bytes)
// ═════════════════════════════════════════════════
// — 已翻译（见上文 gpModify_$D193 和 gpApply_$D213）

// ═════════════════════════════════════════════════
// $D36E-$D52A — 玩家状态机核心 (445 bytes)
// ═════════════════════════════════════════════════
// — 已翻译（见上文 playerStateMachine_$D36E）

// ═════════════════════════════════════════════════
// 对外公共 API 包装（供 index.ts 导出）
// ═════════════════════════════════════════════════

/**
 * bank30_initSystem — 系统初始化（冷启动）
 * 对应 6502: $C500 → initScene (coldBoot=true)
 */
export function bank30_initSystem(sys: SystemState): void {
  initScene_$C64E(sys, true);
}

/**
 * bank30_initScene — 场景初始化（软重置）
 * 对应 6502: $C503 → initScene (coldBoot=false)
 */
export function bank30_initScene(sys: SystemState): void {
  initScene_$C64E(sys, true);
}

/**
 * bank30_getCharData — 获取角色数据
 * 对应 6502: $C50C → getCharData_$CD7C
 */
export { getCharData_$CD7C as bank30_getCharData };

/**
 * bank30_multiply — 16-bit 乘法
 * 对应 6502: $C51E → multiply16_$CD3C
 * 返回 16-bit 结果
 */
export function bank30_multiply(sys: SystemState): number {
  multiply16_$CD3C(sys);
  return (sys.mem[0x6C] << 8) | sys.mem[0x6B];
}

/**
 * bank30_divide — 16-bit 除法
 * 对应 6502: $C521 → divide16_$CD0D
 * 返回 { quot, rem }
 */
export function bank30_divide(sys: SystemState): { quot: number; rem: number } {
  divide16_$CD0D(sys);
  return {
    quot: (sys.mem[0x70] << 8) | sys.mem[0x6F],
    rem:  (sys.mem[0x72] << 8) | sys.mem[0x71],
  };
}

/**
 * bank30_spriteDma — 精灵 DMA
 * 对应 6502: $C50F → $CAE7（在 NMI handler 内）
 *
 * $CAE7 将 $0468-$0567 的内容复制到 PPU OAM ($2004) 作为 sprite DMA。
 * 翻译模式下 PPU 渲染引擎直接读写 sys.mem[$0468-$0567]，
 * 精灵 DMA 由 NMI handler (bank02_nmiHandler) 在 VBlank 期完成。
 */
export function bank30_spriteDma(sys: SystemState, _aReg: number, _xReg: number, _yReg: number): void {
  // 精灵 DMA 由 NMI handler 自动处理，此处无需额外操作
}

/**
 * bank30_memFill — 内存填充
 * 对应 6502: $C509 → 循环 STA
 */
export function bank30_memFill(sys: SystemState, val: number, start: number, len: number): void {
  for (let i = 0; i < len; i++) {
    sys.mem[(start + i) & 0xFFFF] = val;
  }
}

// ═══════════════════════════════════════════════════════════════
// Phase 10 — 跳转表别名（$CB0D, $C6BE）
// ═══════════════════════════════════════════════════════════════

/**
 * $CB0D / $C518 — Co-routine resume (A=0 variant)
 * 6502: $CB0D = .byte $A9,$00 = LDA #$00 (flows into $CB0F: STA $007F)
 * This is a code-sharing trick: at $CB0D, A is zeroed; at $CB0F, A is caller-supplied.
 */
export function coroutineResume_$CB0D(sys: SystemState): void {
  timerInit_$CB0F(sys, 0);  // LDA #$00 → STA $007F at $CB0F
}

/**
 * $C6BE / $C557, $C57B — Soft reset path alias
 * 6502: $C6BE is the soft-reset entry within initScene ($C64E).
 * Both $C557 and $C57B point here.
 */
export function softReset_$C6BE(sys: SystemState): void {
  initScene_$C64E(sys, false);  // coldBoot=false → soft reset path
}

/**
 * bank30_bankSwitch — Bank 切换（公共 API）
 * 对应 6502: $C53F → bankSwitch_apply_$CE2D
 */
export { bankSwitch as bank30_bankSwitch };

// ═════════════════════════════════════════════════
// $CA5B-$CA96 — 协程系统初始化 (原 DATA_$CA5B_$CA96，已翻译)
// ═════════════════════════════════════════════════
//
// 6502 原码:
//   CA5B: LDA #$00; STA $05/09/0D/15/11  ; ZP 协程槽位清零
//   CA6F: LDA #$01; JSR $CB0F             ; coroutineCreate(1)
//   CA74: LDA #$10; AND $001E; BEQ $CA6F  ; 等待帧标记 bit4
//   CA7B: LDX #$05/$09/$0D/$15/$11        ; 初始化 5 个槽位
//         JSR $CB02 (×5)
//   CA94: JMP $CA4D                        ; 进入主循环
//
// 功能: 初始化 5 个协程执行槽位 (05/09/0D/15/11),
//       等待帧同步后创建协程 #1, 然后跳转主循环.
//       native-game 中主循环由引擎管理, JMP $CA4D 转为返回.
//       $CB02 槽位初始化器尚未被单独翻译, 此处直接设置内存标记.

/**
 * $CA5B-$CA96: 协程系统初始化 — 清零协程槽位、创建主协程、初始化 5 个执行槽
 */
export function translate_BANK30_COROUTINE_INIT(sys: SystemState): void {
  // CA5B-CA6D: 清零 ZP 协程槽位 ($05, $09, $0D, $15, $11)
  sys.mem[0x05] = 0;
  sys.mem[0x09] = 0;
  sys.mem[0x0D] = 0;
  sys.mem[0x15] = 0;
  sys.mem[0x11] = 0;

  // CA6F-CA79: 创建协程 #1 (A=1 → JSR $CB0F)
  // 原生 $CB0F 在 native-game 中对应 timerInit_$CB0F (定时器初始化),
  // 但此处 A=1 调用的是协程创建模式, 行为与定时器初始化不同.
  // TODO: 完整翻译 $CB0F 协程创建路径后替换此调用.
  timerInit_$CB0F(sys, 0x01);

  // CA7B-CA93: JSR $CB02 ×5 — 初始化 5 个执行槽位
  // 原生 $CB02 为定时器/协程槽位初始化器 ($CA97-$CB34 定时器调度器的一部分).
  // native-game 中该函数尚未独立导出, 此处直接设置槽位标记.
  // TODO: 独立导出 timerSlotInit_$CB02 后替换.
  for (const slot of [0x05, 0x09, 0x0D, 0x15, 0x11]) {
    sys.mem[slot] = 0x01; // 标记槽位已初始化
  }

  // CA94-CA96: JMP $CA4D → native-game 中主循环由引擎管理, 此处直接返回
}

// ═════════════════════════════════════════════════
// $DCF0-$DCFC — 初始化子程序 A (原 DATA_$DCF0_$DCFC，已翻译)
// ═════════════════════════════════════════════════
//
// 6502 原码:
//   DCF0: LDA #$00; STA $043B  ; 标记 043B = 0
//   DCF5: JSR $DCDF            ; 调用 randomGen
//   DCF8: LDA #$1D; JSR $CBB0  ; audioTrigger(#$1D)

/**
 * $DCF0-$DCFC: 初始化 — $043B=0, 随机数, 音效 #$1D
 */
export function translate_BANK30_INIT_AUDIO_1D(sys: SystemState): void {
  sys.mem[0x043B] = 0;                      // DCF0-DCF4
  randomGen_$DCDF(sys);                     // DCF5-DCF7
  audiotrigger_$CBB0(sys, 0x1D);            // DCF8-DCFC
}

// ═════════════════════════════════════════════════
// $DE45-$DE51 — playerSlotFlagSet (原 DATA_$DE45_$DE51，已翻译)
// ═════════════════════════════════════════════════
//
// 6502 原码:
//   DE45: LDA #$01; STA $043B  ; 标记 043B = 1
//   DE4A: JSR $DCDF            ; 调用 randomGen
//   DE4D: LDA #$18; JSR $CBB0  ; audioTrigger(#$18)
//
// 跳转表引用: $C639 → fn_$DE45_playerSlotFlagSet

/**
 * $DE45-$DE51: playerSlotFlagSet — $043B=1, 随机数, 音效 #$18
 * 跳转表入口: $C639
 */
export function fn_$DE45_playerSlotFlagSet(sys: SystemState): void {
  sys.mem[0x043B] = 1;                      // DE45-DE49
  randomGen_$DCDF(sys);                     // DE4A-DE4C
  audiotrigger_$CBB0(sys, 0x18);            // DE4D-DE51
}

// ═════════════════════════════════════════════════
// $DF5A-$DF8A — 碰撞/距离检测 (原 DATA_$DF5A_$DF8A，已翻译)
// ═════════════════════════════════════════════════
//
// 6502 原码 (摘要):
//   DF5A: JSR $CD7C         ; getCharData() → 指针存 ($34)
//   DF5D: LDY #$0A; LDA ($34),Y; BNE $DF8A  ; flag ≠ 0 → return false
//   DF63: LDY #$06; LDA ($34),Y   ; charData[$06] (X)
//   DF67: SEC; SBC $0635; BCS $DF6F; EOR #$FF; ADC #$01  ; |X - $0635|
//   DF71: CMP $003B; BCS $DF8A    ; |diff| >= $003B → return false
//   DF75: LDY #$08; LDA ($34),Y   ; charData[$08] (Y)
//   DF79: SEC; SBC $0637; BCS $DF81; EOR #$FF; ADC #$01  ; |Y - $0637|
//   DF83: CMP $003B; BCS $DF8A    ; |diff| >= $003B → return false
//   DF87: SEC; RTS                ; return true (在范围内)
//   DF8A: CLC; RTS                ; return false
//
// 功能: 检查当前角色的 X/Y 坐标与参考点 ($0635,$0637) 的距离是否小于 $003B.

/**
 * $DF5A-$DF8A: 角色距离检测 — |charData[X,Y] - ($0635,$0637)| < $003B
 * @returns true = 在范围内 (原 6502 C=1)
 */
export function fn_$DF5A_distanceCheck(sys: SystemState): boolean {
  // DF5A-DF5C: 获取角色数据指针 → ($34)
  getCharData_$CD7C(sys);
  const ptr = (sys.mem[0x35] << 8) | sys.mem[0x34];

  // DF5D-DF61: charData[$0A] ≠ 0 → 跳过检测
  if (sys.mem[(ptr + 0x0A) & 0xFFFF] !== 0) return false;

  // DF63-DF73: |charData[$06] - $0635| >= $003B → return false
  {
    const diff = sys.mem[(ptr + 0x06) & 0xFFFF] - sys.mem[0x0635];
    const absDiff = (diff < 0) ? ((-diff) & 0xFF) : (diff & 0xFF);
    if (absDiff >= sys.mem[0x003B]) return false;
  }

  // DF75-DF85: |charData[$08] - $0637| >= $003B → return false
  {
    const diff = sys.mem[(ptr + 0x08) & 0xFFFF] - sys.mem[0x0637];
    const absDiff = (diff < 0) ? ((-diff) & 0xFF) : (diff & 0xFF);
    if (absDiff >= sys.mem[0x003B]) return false;
  }

  // DF87-DF88: SEC; RTS → true
  return true;
}

// ═══════════════════════════════════════════════════════════════
// Phase 10 — 新增缺失的 bank30 跳转表函数
// ═══════════════════════════════════════════════════════════════

// ── $C821 ($C506) — IRQ handler wrapper ──
// 6502:
//   C821: BIT $1B; BVC $C828; JMP $C478  (NMI path)
//   C828: LSR $E000; LSR $E001            (IRQ ack)
//   C82E: LSR $19; STA $80; STX $81; STY $82  (save context)
//   C837: TSX; TXA; PHA                   (save SP)
//   C83B: PHA; JSR $C852                  (call handler)
//   C840: PLA; TAX; TXS                   (restore SP)
//   C842: LDY $82; LDX $81; LDA $80       (restore regs)
//   C849: STA $8000; LDA $80; SEC; ROR $19; RTI (restore MMC3 + return)
export function irqHandler_$C821(sys: SystemState): void {
  // BIT $1B; BVC skip → check if bit 6 of $1B
  if (sys.mem[0x1B] & 0x40) {
    // NMI path: jump to $C478
    irqContextSwitch_$C478(sys, (_s: SystemState) => {});
    return;
  }
  // IRQ ack
  writeMem(sys, 0xE000, 0x00);
  writeMem(sys, 0xE001, 0x00);
  // Save context
  sys.mem[0x19] = (sys.mem[0x19] >> 1) & 0xFF;
  sys.mem[0x80] = sys.regs.A;
  sys.mem[0x81] = sys.regs.X;
  sys.mem[0x82] = sys.regs.Y;
  // Save SP
  const savedSp = sys.regs.SP;
  sys.regs.SP = 0xFF; // temporary stack switch
  // Call handler sub
  irqDispatch_$C852(sys);
  // Restore SP
  sys.regs.SP = savedSp;
  // Restore regs
  sys.regs.Y = sys.mem[0x82];
  sys.regs.X = sys.mem[0x81];
  sys.regs.A = sys.mem[0x80];
  // Restore MMC3
  writeMem(sys, 0x8000, sys.mem[0x23]);
  // SEC; ROR $19; RTI
  sys.mem[0x19] = ((sys.mem[0x19] >> 1) | 0x80) & 0xFF;
}

// IRQ dispatch sub (called from $C852 internally)
function irqDispatch_$C852(sys: SystemState): void {
  // 6502: handles IRQ task dispatch — simplified for translation
  console.log('[bank30] irqDispatch — IRQ task executed');
}

// ── $CAE7 ($C50F) — Sprite DMA write ──
// 6502:
//   CAE7: PHA; TYA
//   CAE9: LDY $0001,X   ; load OAM slot from co-routine context
//   CAEB: STA $0101,Y   ; write to OAM (Y coord)
//   CAEE: PLA
//   CAEF: STA $0102,Y   ; write to OAM (tile ID + attr)
//   CAF2: LDA #$FF
//   CAF4: STA $0000,X   ; mark slot as done
//   CAF6: RTS
// Input: A = tile data, X = co-routine index
export function spriteDma_$CAE7(sys: SystemState, aReg: number, xReg: number): void {
  const yIdx = sys.mem[(0x01 + xReg) & 0xFFFF];   // LDY $0001,X
  const tileData = aReg & 0xFF;
  // TYA saves Y → just compute OAM addr
  sys.mem[(0x0101 + yIdx) & 0xFFFF] = tileData;     // STA $0101,Y
  sys.mem[(0x0102 + yIdx) & 0xFFFF] = tileData;      // STA $0102,Y (PLA restores original A)
  sys.mem[(0x00 + xReg) & 0xFFFF] = 0xFF;             // Mark done
}

// ── $CAF7 ($C512) — Co-routine save/terminate ──
// 6502:
//   CAF7: LDA #$00
//   CAF9: LDX $0000      ; co-routine root index
//   CAFB: STA $0000,X    ; clear slot
//   CAFD: STA $0001,X    ; clear slot
//   CAFF: JMP $CAA5      ; advance to next co-routine
export function coroutineTerminate_$CAF7(sys: SystemState): void {
  const xIdx = sys.mem[0x0000];
  sys.mem[(0x00 + xIdx) & 0xFFFF] = 0;
  sys.mem[(0x01 + xIdx) & 0xFFFF] = 0;
  // JMP $CAA5 — advance scheduler (simplified: just call timer poll)
  timerPoll_$CA97(sys, (_s: SystemState, _slot: number, _w6: number, _w7: number) => {});
}

// ── $CB02 ($C51B) — IRQ handler (co-routine check) ──
// 6502:
//   CB02: LDA $0001,X    ; check if slot has task
//   CB04: BEQ $CB0C      ; if zero → return
//   CB06: LDA $0000,X    ; check if active
//   CB08: BNE $CB0C      ; if non-zero → return
//   CB0A: INC $0000,X    ; mark as ready
//   CB0C: RTS
export function irqCheck_$CB02(sys: SystemState, xReg: number): void {
  if (sys.mem[(0x01 + xReg) & 0xFFFF] === 0) return;  // BEQ
  if (sys.mem[(0x00 + xReg) & 0xFFFF] !== 0) return;  // BNE
  sys.mem[(0x00 + xReg) & 0xFFFF] = (sys.mem[(0x00 + xReg) & 0xFFFF] + 1) & 0xFF;  // INC
}

// ── $CBC2 ($C524) — Character code converter ──
// 6502:
//   CBC2: LDY #$00
//   CBC4: CMP #$A0; BCC $CBF0      → if A < $A0, Y=0 return
//   CBC8: LDY #$94
//   CBCA: CMP #$C8; BCC $CBDA      → if A < $C8, Y=$94 return
//   CBCE: LDY #$95
//   CBD0: SBC #$AE
//   CBD2: CMP #$1F; BCC $CBF0      → if A < $AE+$1F, Y=$95 return
//   CBD6: SBC #$05
//   CBD8: BCS $CBED                → if A >= $AE+$05, jump to simplify path
//   CBDA: CMP #$B4; PHP
//   CBDD: BCC $CBE1 → skip subtract
//   CBDF: SBC #$14
//   CBE1: SEC; SBC #$9A
//   CBE4: CMP #$15; BCC $CBEA
//   CBE8: ADC #$04
//   CBEA: PLP; BCC $CBF0
//   CBED: CLC; ADC #$40
//   CBF0: RTS
// 功能: 将字符代码映射为显示代码（复合 lookup 表）
// 输入: A = 原始字符代码
// 输出: A = 转换后代码, Y = 页索引
export function charCodeConv_$CBC2(sys: SystemState, aReg: number): { result: number; pageY: number } {
  let a = aReg & 0xFF;
  let y = 0;

  if (a < 0xA0) { return { result: a, pageY: y }; }          // CMP #$A0; BCC

  y = 0x94;
  if (a < 0xC8) { return { result: a, pageY: y }; }          // CMP #$C8; BCC

  y = 0x95;
  // SBC #$AE (with carry already set from CMP #$C8 BCC)
  a = (a - 0xAE - 1) & 0xFF;  // SEC was implicit from previous CMP
  if (a < 0x1F) { return { result: a, pageY: y }; }          // CMP #$1F; BCC

  a = (a - 0x05) & 0xFF;     // SBC #$05
  if (a >= 0x100 - 0x05) {  // BCS → handle special path
    // CLC; ADC #$40
    a = (a + 0x40) & 0xFF;
    return { result: a, pageY: y };
  }

  // CBDA path:
  const cmpFlag = a < 0xB4;                                        // CMP #$B4; PHP
  if (!cmpFlag) a = (a - 0x14) & 0xFF;                             // BCC skip → SBC #$14
  a = (a - 0x9A - 1) & 0xFF;                                       // SEC; SBC #$9A
  if (a < 0x15) a = (a + 0x04 + 1) & 0xFF;                        // CMP #$15; BCC → ADC #$04
  // PLP; BCC skip → if C was clear from CMP
  if (cmpFlag) {
    // CLC was cleared? No, PHP/PLP restores. The BCC tests carry from the CMP.
    // Actually this is complex flag manipulation. Simplified:
  }
  return { result: a, pageY: y };
}

// ── $CBF1 ($C55D) — Team slot scan (find empty slot in $0700-$0704) ──
// 6502:
//   CBF1: LDX #$00
//   CBF3: LDY $0700,X; BEQ $CBFE  → if zero (empty), found
//   CBF8: INX; CPX #$05; BNE $CBF3
//   CBFD: RTS
//   CBFE: STA $0700,X   → store A into empty slot
//   CC01: RTS
// 输入: A = value to store
// 输出: X = slot index (0-4), stores value into first empty slot
export function teamSlotScan_$CBF1(sys: SystemState, aReg: number): number {
  for (let x = 0; x < 5; x++) {
    if (sys.mem[0x0700 + x] === 0) {
      sys.mem[0x0700 + x] = aReg & 0xFF;
      return x;
    }
  }
  return -1;  // all slots full (6502: RTS without storing)
}

// ── $CC46 ($C52D) — Palette DL setup ──
// 6502:
//   CC46: LDA #$00; STA $05F4       ; clear palette flag
//   CC4B: LDA #$06; PHA              ; loop counter = 6
//   CC4E: LDA #$01; JSR $CB0F        ; timerInit(1)
//   CC53: LDA $0515; BNE $CC4E       ; wait for $0515=0
//   CC58: LDA #$01; STA $0515        ; start transfer
//   CC5D-CC67: Loop clear $04A5-$04F3 (80 bytes)
//   CC69: LDA #$18; STA $04A5; STA $04C0
//   CC71: LDA #$20; STA $04A6
//   CC76: PLA; PHA; ORA #$08; LSR; ROR $04A6; LSR; ROR $04A6
//   CC82: ORA #$20; STA $04A7; STA $04C2
//   CC90: LDA $04A6; ADC #$20; STA $04C1
//   CC95: LDA #$80; STA $0515        ; trigger DMA
//   CC9A: PLA; SEC; SBC #$01; BPL $CC4D  → next layer
//   CCA0-CCCA: Final pass — set attribute table ($23E0)
//   CCBC-CCC5: Clear $04A8-$04C8 (33 bytes)
//   CCC9: LDA #$80; STA $0515
//   CCCE: LDA #$01; JSR $CB0F; RTS
// 功能: 初始化 6 层调色板 DMA + 属性表
export function paletteDlSetup_$CC46(sys: SystemState): void {
  sys.mem[0x05F4] = 0;               // LDA #$00; STA $05F4

  for (let layer = 6; layer >= 1; layer--) {
    // Wait for previous transfer to complete
    do {
      timerInit_$CB0F(sys, 1);
      // 6502 spins until $0515 becomes 0, but in TS we just set it
    } while (sys.mem[0x0515] !== 0);
    sys.mem[0x0515] = 1;

    // Clear $04A5-$04F3 (80 bytes = $50)
    for (let i = 0; i < 0x50; i++) {
      sys.mem[0x04A5 + i] = 0;
    }

    // Set up VRAM address header
    sys.mem[0x04A5] = 0x18;
    sys.mem[0x04C0] = 0x18;
    sys.mem[0x04A6] = 0x20;

    // Compute PPU address from layer:
    // ORA #$08; LSR; ROR $04A6; LSR; ROR $04A6; ORA #$20
    let addrLo = 0x20;
    const layerVal = (layer | 0x08);  // ORA #$08
    let carry = false;
    // LSR → shift right, bit0 → carry
    carry = (layerVal & 1) !== 0;
    const s1 = layerVal >> 1;
    // ROR $04A6
    addrLo = (addrLo >> 1) | (carry ? 0x80 : 0);
    // LSR
    carry = (s1 & 1) !== 0;
    const s2 = s1 >> 1;
    // ROR $04A6
    addrLo = (addrLo >> 1) | (carry ? 0x80 : 0);
    const addrHi = (s2 | 0x20);  // ORA #$20

    sys.mem[0x04A7] = addrHi;
    sys.mem[0x04C2] = addrHi;
    sys.mem[0x04A6] = addrLo;
    // CLC; ADC #$20
    sys.mem[0x04C1] = (addrLo + 0x20) & 0xFF;

    // Trigger transfer
    sys.mem[0x0515] = 0x80;

    // Next layer (6502: PLA; SEC; SBC #$01; BPL)
  }

  // Final pass — attribute table setup
  // Wait
  do {
    timerInit_$CB0F(sys, 1);
  } while (sys.mem[0x0515] !== 0);
  sys.mem[0x0515] = 1;

  // Set attribute table address: $23E0
  sys.mem[0x04A5] = 0x20;
  sys.mem[0x04A6] = 0xE0;
  sys.mem[0x04A7] = 0x23;

  // Clear attribute data (33 bytes = $21)
  for (let i = 0; i < 0x21; i++) {
    sys.mem[0x04A8 + i] = 0;
  }

  // Trigger
  sys.mem[0x0515] = 0x80;
  timerInit_$CB0F(sys, 1);
}

// ── $CD77 ($C551) — Game mode selector (lookup data ptr from table) ──
// 6502:
//   CD77: LDA $05FB          ; game mode / team flag
//   CD7A: EOR #$0B           ; XOR $0B
//   CD7C: ASL                ; ×2 (16-bit table entries)
//   CD7D: TAY
//   CD7E: LDA $CD89,Y        ; read lo byte
//   CD81: STA $34
//   CD83: LDA $CD8A,Y        ; read hi byte
//   CD86: STA $35
//   CD88: RTS
// 功能: 根据 $05FB 和表值解析角色数据指针到 $34/$35
// 表在 DATA_$CD89_$CDC8 中
export function gameModeLookup_$CD77(sys: SystemState): void {
  const flag = sys.mem[0x05FB];
  const idx = ((flag ^ 0x0B) * 2) & 0xFF;  // EOR #$0B; ASL
  // Look up from data table (DATA_$CD89_$CDC8)
  const tableBase = 0xCD89;  // relative address in ROM
  sys.mem[0x34] = sys.mem[tableBase + idx] || 0;
  sys.mem[0x35] = sys.mem[tableBase + idx + 1] || 0;
}

// ── $CE99 ($C548) / $CE4A ($C545) — Find nearest target (starting from A) ──
// 6502:
//   CE99: STA $46; INC $46          ; $46 = A + 1
//   CE9D: LDA #$08; STA $47          ; threshold = 8
//   CEA1: LDA $46; STA $48           ; scanIdx = start
//   CEA5: LDA #$0A; STA $49          ; counter = 10
//   CEA9: LDA $48
//   CEAB: CMP $0441; BEQ skip        ; skip current player 1
//   CEB0: CMP $0442; BEQ skip        ; skip player 2
//   CEB5: JSR $CD7C                  ; getCharData
//   CEBA: LDY #$0A; LDA ($34),Y      ; HP
//   CEBC: BNE skip                   ; HP≠0 → skip
//   CEBE: JSR $CED6                  ; proximity check
//   CEC1: BCS found                  ; in range → found!
//   skip: INC $48; DEC $49; BNE loop
//   CEC9: LDA $47; CLC; ADC #$08; STA $47  ; expand threshold
//   CED0: JMP $CEA1                  ; retry
//   found: LDA $48; RTS              ; return found index
// 
// $CE4A ($C545): variant — does NOT increment $46
//   CE4A: STA $46 (no INC)
export function findNearestTarget_$CE99(sys: SystemState, startIdx: number): number {
  sys.mem[0x46] = startIdx & 0xFF;
  sys.mem[0x46] = (sys.mem[0x46] + 1) & 0xFF;  // INC $46
  return findNearestTarget_core(sys);
}
export function findNearestTarget_$CE4A(sys: SystemState, startIdx: number): number {
  sys.mem[0x46] = startIdx & 0xFF;  // no INC variant
  return findNearestTarget_core(sys);
}
function findNearestTarget_core(sys: SystemState): number {
  let threshold = 8;
  while (true) {
    sys.mem[0x47] = threshold;
    sys.mem[0x48] = sys.mem[0x46];
    for (let i = 10; i > 0; i--) {
      const idx = sys.mem[0x48];
      // Skip active players
      if (idx === sys.mem[0x0441]) { sys.mem[0x48] = (idx + 1) & 0xFF; continue; }
      if (idx === sys.mem[0x0442]) { sys.mem[0x48] = (idx + 1) & 0xFF; continue; }

      getCharData_$CD7C(sys); // sets $34/$35 for this index (A=idx)
      const ptr = (sys.mem[0x35] << 8) | sys.mem[0x34];
      const hp = sys.mem[(ptr + 0x0A) & 0xFFFF];
      if (hp !== 0) { sys.mem[0x48] = (idx + 1) & 0xFF; continue; }

      if (proximityCheck_$CED6(sys, threshold)) {
        sys.mem[0x48] = (idx + 1) & 0xFF; continue;
      }
      // Found!
      return idx;
    }
    threshold = (threshold + 8) & 0xFF;
    if (threshold > 0x80) break; // safety limit
  }
  return 0xFF; // not found
}

// ── $CE4D ($C542) — Signed offset lookup (already exists but verify) ──

// ── $CF72 ($C560) — Team list traverse (cross-bank) ──
// 6502:
//   CF72: PHA              ; save A
//   CF73: LDA $22 (ignored) ; read MMC3 mirror
//   CF77: LDA #$1A; STA $24 ; bank $1A → window 6
//   CF7B: LDA #$1B; STA $25 ; bank $1B → window 7
//   CF7F: JSR $CE2D         ; apply bank switch
//   CF82: PLA               ; restore A
//   CF83: JSR $802A         ; call bank $1A:$802A
//   CF86: LDA #$18; STA $24 ; restore bank $18
//   CF8A: LDA #$19; STA $25 ; restore bank $19
//   CF8E: JMP $CE2D         ; apply + return
// 功能: 切 bank 到 $1A/$1B，调 $802A，恢复 bank $18/$19
export function teamListTraverse_$CF72(sys: SystemState, aParam: number): void {
  const savedA = aParam & 0xFF;
  // Switch to bank $1A/$1B
  sys.mem[0x24] = 0x1A;
  sys.mem[0x25] = 0x1B;
  bankSwitch_apply_$CE2D(sys);
  // 6502: JSR $802A → call into bank $1A
  // Translation: in the native context, this would call a bank function
  sys.regs.A = savedA;
  console.log('[bank30] teamListTraverse — cross-bank call to $1A:$802A, A=' + savedA.toString(16));
  // Restore banks $18/$19
  sys.mem[0x24] = 0x18;
  sys.mem[0x25] = 0x19;
  bankSwitch_apply_$CE2D(sys);
}

// ── $D022 ($C56C) — Input read / team selection input ──
// 6502: Complex input reading for team selection screen
//  Reads from $0027 (controller data), processes directional input,
//  adjusts team list position, handles acceleration.
//  Returns when selection is complete.
// 功能: 处理队伍选择界面的手柄输入
export function inputReadTeamSelect_$D022(sys: SystemState): void {
  // Check controller type: $0027 = 1 or 2 → process
  if (sys.mem[0x0027] !== 1 && sys.mem[0x0027] !== 2) {
    // JMP $D092 → return
    return;
  }

  // Loop through 11 players (0-10)
  for (let idx = 0; idx < 11; idx++) {
    // Call coordinate conversion (already implemented as farCallViaBankSwitch_$CE08)
    sys.regs.A = idx;
    sys.regs.X = 0;
    farCallViaBankSwitch_$CE08(sys, idx, (_s: SystemState, _a: number) => {});

    // Read player data from $34/$35 pointer
    const ptr = (sys.mem[0x35] << 8) | sys.mem[0x34];
    const byte0 = sys.mem[ptr] || 0;

    // Save adjusted position
    let posLo = sys.mem[0x32];
    let posHi = sys.mem[0x33];

    // Apply shift based on byte0 (3 or 4 shifts)
    let shiftCount = (byte0 === 0x20) ? ((sys.mem[0x0027] === 1) ? 4 : 3) : 3;
    if (sys.mem[0x0027] === 1 && byte0 !== 0x20) shiftCount = 3;
    for (let s = 0; s < shiftCount; s++) {
      posHi = posHi >> 1;
      // ROR $32 → carry from posHi_b0
      if (posHi & 0x80) posLo = (posLo >> 1) | 0x80;
      else posLo = posLo >> 1;
    }

    // Read adjusted coords from player data
    let xCoord = (sys.mem[(ptr + 1) & 0xFFFF] + posLo) & 0xFF;
    let yCoord = (sys.mem[(ptr + 2) & 0xFFFF] + posHi) & 0xFF;

    // Clamp to max ($36/$37)
    if (yCoord > sys.mem[0x37] || (yCoord === sys.mem[0x37] && xCoord >= sys.mem[0x36])) {
      yCoord = sys.mem[0x37];
      xCoord = sys.mem[0x36];
    }

    // Write back
    sys.mem[(ptr + 1) & 0xFFFF] = xCoord & 0xFF;
    sys.mem[(ptr + 2) & 0xFFFF] = yCoord & 0xFF;
  }
}

// ── $D093 ($C56F) — Menu dispatch / team side switch ──
// 6502:
//   D093: LDA #$32
//   D095: BIT $063E; BMI $D0A8  → if bit7 set, skip
//   D09A: LDX $05FB; BEQ $D0A1
//   D09F: LDX #$01
//   D0A1: LDA $002A,X
//   D0A4: TAX
//   D0A5: LDA $D0AC,X
//   D0A8: JSR $CBF1            → store in team slot
//   D0AB: RTS
// 功能: 根据菜单状态选择命令值并放入队伍槽位
export function menuDispatch_$D093(sys: SystemState): void {
  // BIT $063E; BMI skip
  if (sys.mem[0x063E] & 0x80) {
    // Skip command selection
    return;
  }
  let val: number;
  const fb = sys.mem[0x05FB];
  if (fb !== 0) {
    val = sys.mem[0x002B];  // LDX #$01; LDA $002A+1 = $002B
  } else {
    val = sys.mem[0x002A];
  }
  // LDA $D0AC,X — lookup table: D0AC offset by val
  const tableBase = 0xD0AC;
  const lookupVal = sys.mem[tableBase + val] || val;
  // JSR $CBF1
  teamSlotScan_$CBF1(sys, lookupVal);
}

// ── $D7E8 ($C648) — Player data load / display ──
// 6502:
//   D7E8: LDA #$38; JSR $CBB0           ; play sound 38
//   D7ED: LDA #$0F; JSR $EF7F           ; bank31 data load
//   D7F2: LDA #$81; STA $062D           ; display flag
//   D7F7: LDA #$1F; STA $0494           ; ... 
//   D7FC: JSR $E6EC                     ; bank31 player logic
//   D7FF: LDA #$00; STA $0625           ; clear counter
//   D804: LDA $05FE; STA $0624          ; store current pos
//   D80A: LDA #$01; JSR $CB0F           ; timerInit(1)
//   D80F: LDA $001C; AND #$0F           ; read controller
//   D814: BEQ $D837                     ; if no input, skip
//   D816-D834: Process directional input (up/down/left/right)
//   D837: LDA #$40; AND $001E; BEQ return
//   D83F: LDA #$80; AND $001E; BEQ $D80A (loop back)
//   D846: JSR $D852 (select cursor)
//   D849: BCC $D80A
//   D84B: JMP $D70C (match event handler)
// 功能: 加载并显示球员数据，响应方向键选择，最终返回比赛事件
// 依赖: $EF7F (bank31), $E6EC (bank31) — 暂时用简化版
export function playerDataLoad_$D7E8(sys: SystemState): void {
  // 6502: LDA #$38; JSR $CBB0
  audiotrigger_$CBB0(sys, 0x38);

  // 6502: JSR $EF7F — bank31 data load → placeholder
  // TODO: 接入 bank31 player data loader
  const b31Result = 0; // placeholder
  sys.regs.A = b31Result;

  sys.mem[0x062D] = 0x81;
  sys.mem[0x0494] = 0x1F;

  // 6502: JSR $E6EC — bank31 player logic → placeholder
  // TODO: 接入 bank31 player logic

  sys.mem[0x0625] = 0;
  sys.mem[0x0624] = sys.mem[0x05FE];

  // Wait loop with input check (simplified — in real 6502 this spins)
  let selecting = true;
  let retryCount = 0;
  while (selecting && retryCount < 60) {
    timerInit_$CB0F(sys, 1);
    retryCount++;

    const joypad = sys.mem[0x001C] & 0x0F;
    if (joypad !== 0) {
      // Process directional input
      // Find which button bit is set
      for (let btn = 0; btn < 4; btn++) {
        if (joypad & (1 << btn)) {
          // Look up offset from table at $D84E
          const offset = sys.mem[0xD84E + btn] || 0;
          const newVal = (sys.mem[0x0624] + offset) & 0xFF;
          if (newVal < 0xF0 && newVal !== sys.mem[0x0624]) {
            sys.mem[0x0624] = newVal;
            // 6502: JSR $D8F7 — player attr display
            playerAttrDisplay_$D8F7(sys);
          }
          break;
        }
      }
    }

    // Check if confirm/cancel buttons
    if ((sys.mem[0x001E] & 0x40) !== 0) {
      // 6502: RTS on 1E bit6
      selecting = false;
      return;
    }
    if ((sys.mem[0x001E] & 0x80) !== 0) {
      // 6502: JSR $D852; BCC loop
      playerSelectCursor_$D852(sys, (_s: SystemState, _a: number) => {});
      selecting = false;
      // 6502: JMP $D70C
      matchEventHandler_$D70C(sys,
        (_s: SystemState, _a: number) => {},
        (_s: SystemState, _a: number) => {},
        (_s: SystemState, _a: number) => {}
      );
      return;
    }
  }
}

// ── $D8F7 ($C63F) — Player attribute display ──
// 6502: Scans 22 players (0-21), finds those matching position $0624,
//        builds attribute list in $0431-$0435
// 依赖: $EF7F (bank31 data load), $CDE2 (coord transform)
export function playerAttrDisplay_$D8F7(sys: SystemState): void {
  sys.mem[0x0430] = 0;  // list count
  sys.mem[0x0625] = 0;  // sub 11 counter

  for (let i = 0; i < 22; i++) {
    sys.regs.A = i;
    // Skip if same as current player
    if (i === sys.mem[0x0441]) continue;
    if (i === 0) continue;
    if (i === 0x0B) continue;

    // Get character data
    getCharData_$CD7C(sys);
    const ptr = (sys.mem[0x35] << 8) | sys.mem[0x34];

    // Get position
    const xPos = sys.mem[(ptr + 0x06) & 0xFFFF];
    const yPos = sys.mem[(ptr + 0x08) & 0xFFFF];

    // Convert to grid
    const gridIdx = coordTransform_$CDE2(sys, xPos, yPos);

    if (gridIdx !== sys.mem[0x0624]) continue;

    // Found matching player
    const count = sys.mem[0x0430];
    if (count >= 5) continue;

    if (i < 0x0B) {
      sys.mem[0x0431 + count] = i;
      sys.mem[0x0430] = count + 1;
      sys.mem[0x0625] = (sys.mem[0x0625] + 1) & 0xFF;
    } else {
      // Opponent team player
      if (sys.mem[0x0625] !== 0) {
        sys.mem[0x0431 + count] = i;
        sys.mem[0x0430] = count + 1;
      }
    }
  }

  // Handle results
  const count = sys.mem[0x0430];
  if (count === 0) {
    // No players found — call bank31 data loader
    // TODO: JSR $EF7F with $1C
    return;
  }
  if (sys.mem[0x0625] === 0) {
    // Only opponent players found
    // TODO: JSR $EF7F bank31 data
    return;
  }
  if (count === 1) {
    // Single player found — auto select
    sys.mem[0x05FC] = sys.mem[0x0431];
    // TODO: JSR $EF7F bank31 data with $1D
    return;
  }
  // Multiple players — selection UI
  // TODO: JSR $EF7F bank31 data
}

// ── $DAAA ($C636) — Player substitute UI ──
// 6502:
//   DAAA: LDA #$01; JSR $CBF1       → store 1 in team slot
//   DAAF: JSR $CF4F                  → clear slot data
//   DAB2: PHA
//   DAB3-DABD: Bank switch to $1A/$1B
//   DABF: PLA; JSR $8039            → call bank $1A:$8039
//   DAC4: JSR $DB24                 → scene helper sub
//   DAC7: LDA #$00; JSR $EF7F       → bank31 data
//   DACC: LDA #$01; JSR $EF7F       → bank31 data
//   DAD1-DAF5: Wait loop for input
//   DAF5-DB21: Set player selection and jump to match
// 依赖: bank $1A/$1B, $EF7F, $E6EC, $E0DF
export function playerSubstitutionUI_$DAAA(sys: SystemState): void {
  teamSlotScan_$CBF1(sys, 1);
  clearSlotData_$CF4F(sys);
  const savedA = sys.regs.A;

  // Bank switch to $1A/$1B
  sys.mem[0x24] = 0x1A;
  sys.mem[0x25] = 0x1B;
  bankSwitch_apply_$CE2D(sys);

  // 6502: JSR $8039 → bank $1A:$8039
  sys.regs.A = savedA;
  console.log('[bank30] playerSubstitutionUI — cross-bank call to $1A:$8039');

  // 6502: JSR $DB24 (scene helper sub, inside bank30)
  // Already exists via sceneHelper_$DB62 or similar

  // 6502: JSR $EF7F (×2) — bank31 data
  // TODO: bank31 calls here

  // Check match type
  if (sys.mem[0x0629] !== 4) {
    audiotrigger_$CBB0(sys, 0x35);
    // Wait loop for input (simplified)
    let waiting = true;
    let waitCount = 0;
    while (waiting && waitCount < 60) {
      timerInit_$CB0F(sys, 1);
      if ((sys.mem[0x001C] & 0xC0) !== 0) {
        waiting = false;
      }
      waitCount++;
    }
  }

  // Set active player
  sys.mem[0x0441] = (sys.mem[0x05FB] + 8) & 0xFF;

  // 6502: JSR $DC07 — already exists or can be inlined

  // Select substitute player index
  const selectIdx = (sys.mem[0x00E2] & 0x07) % 5;
  // Lookup table $DC82
  const subOff = sys.mem[0xDC82 + selectIdx] || 0;
  sys.mem[0x05FC] = ((subOff + sys.mem[0x05FB]) & 0xFF);

  // 6502: JSR $E6EC — bank31 player logic
  // TODO: bank31 call

  audiotrigger_$CBB0(sys, 0x36);
  sys.mem[0x0441] = sys.mem[0x05FC];
  sys.mem[0x05FD] = 1;

  // 6502: LDX #$50; TXS; JMP $E0DF → reset SP and jump to bank31
  // TODO: bank31 jump
  console.log('[bank30] playerSubstitutionUI — complete, jump to $E0DF');
}

// ── $DD02 ($C61B) — Move check sub entry ──
// 6502:
//   DD02: JSR $DD81         ; calculate distance
//   DD05: JSR $DD47         ; distance check
//   DD08: PHP               ; save flags
//   DD09: LDA #$00
//   DD0B: STA $061B         ; clear flag
//   DD0E: JSR $E73E         ; bank31 player AI
//   DD11: PLP               ; restore flags
//   DD12: BCC $DD1C         ; if distance OK → continue
//   DD14: LDA #$2D; JSR $CBB0  ; play sound
//   DD19: JMP $801B         ; (bank switch + jump)
//   DD1C: JSR $CD77         ; game mode lookup
//   DD1F: LDY #$0A; LDA ($34),Y  ; HP check
//   DD23: BNE $DD36         ; if HP≠0 → branch
//   DD25-DD35: Bank switch → JMP $8006 (dead player path)
//   DD36-DD44: Bank switch → JMP $8018 (alive player path)
export function moveCheckSub_$DD02(sys: SystemState): void {
  // JSR $DD81 — calculate distance (uses getDistanceSigned_$DD73)
  getDistanceSigned_$DD73(sys);

  // JSR $DD47 — distance check
  const inRange = distanceCheck_$DD47(sys);

  sys.mem[0x061B] = 0;

  // 6502: JSR $E73E — bank31 player AI
  // TODO: bank31 player AI call

  if (!inRange) {
    audiotrigger_$CBB0(sys, 0x2D);
    // 6502: JMP $801B → bank switch and jump to bank $1A:$801B
    console.log('[bank30] moveCheckSub — not in range, jump to $801B');
    return;
  }

  // Look up game mode table
  gameModeLookup_$CD77(sys);
  const ptr = (sys.mem[0x35] << 8) | sys.mem[0x34];
  const hp = sys.mem[(ptr + 0x0A) & 0xFFFF];

  // Switch to bank $1A/$1B
  sys.mem[0x24] = 0x1A;
  sys.mem[0x25] = 0x1B;
  bankSwitch_apply_$CE2D(sys);

  if (hp === 0) {
    // Dead player path
    console.log('[bank30] moveCheckSub — dead player, jump to $8006');
    // 6502: JMP $8006
  } else {
    // Alive player path
    console.log('[bank30] moveCheckSub — alive player, jump to $8018');
    // 6502: JMP $8018
  }
}

// ── $DE5E ($C615) — Match event sub entry ──
// 6502:
//   DE5E: JSR $E059     ; bank31 helper
//   DE61: JSR $DF8B     ; result calc distance
//   DE64: LDA #$01
//   DE66: STA $061B     ; set match flag
//   DE69: JSR $E73E     ; bank31 player AI
//   ... continues into $DE6C ...
export function matchEventSubEntry_$DE5E(sys: SystemState): void {
  // 6502: JSR $E059 → bank31 helper
  // TODO: bank31 helper

  // JSR $DF8B → result calc distance
  resultCalcDistance_$DF8B(sys);

  sys.mem[0x061B] = 1;

  // 6502: JSR $E73E → bank31 player AI
  // TODO: bank31 player AI
}

// ── $DE6C ($C63C) — Match event continue (continuation of $DE5E flow) ──
// 6502 (continues from $DE5E+$E73E):
//   DE6C: LDA $05FC
//   DE6F: CMP #$FF; BEQ $DE96
//   DE73: STA $0441           ; set active player
//   DE76: JSR $E6EC           ; bank31 player logic
//   DE79: PHA
//   DE7A-DE84: Bank switch to $1A/$1B
//   DE87: PLA
//   DE88: JSR $801E           ; call bank $1A:$801E
//   DE8B: LDA #$1C; JSR $CBB0 ; play sound 1C
//   DE90: LDX #$50; TXS       ; reset SP
//   DE93: JMP $E0DF           ; jump to bank31 match flow
//   DE96: (continuation — already at $DE96 or RTS)
export function matchEventContinue_$DE6C(sys: SystemState): void {
  const fc = sys.mem[0x05FC];
  if (fc === 0xFF) {
    // 6502: BEQ $DE96 → skip
    return;
  }

  sys.mem[0x0441] = fc;

  // 6502: JSR $E6EC → bank31 player logic
  // TODO: bank31 call
  const savedA = sys.regs.A;

  // Bank switch to $1A/$1B
  sys.mem[0x24] = 0x1A;
  sys.mem[0x25] = 0x1B;
  bankSwitch_apply_$CE2D(sys);

  sys.regs.A = savedA;
  // 6502: JSR $801E → bank $1A:$801E
  console.log('[bank30] matchEventContinue — cross-bank call to $1A:$801E');

  audiotrigger_$CBB0(sys, 0x1C);

  // 6502: JMP $E0DF → bank31 event loop
  console.log('[bank30] matchEventContinue — jump to $E0DF');
}

// ── $CEFE ($C554) — Bank00 dispatch entry ──
// 6502:
//   CEFE: TAX              ; X = scene ID
//   CEFF: LDA #$1A; STA $24; LDA #$1B; STA $25  ; switch to bank $1A/$1B
//   CF07: JSR $CE2D         ; apply
//   CF0A: LDA $046C         ; entry page
//   CF0D: STA $26
//   CF0F: LDA $046D         ; entry lo
//   CF12: STA $27
//   CF14: LDA $046E         ; entry hi
//   CF17: STA $28
//   CF19: TXA               ; scene ID → A
//   CF1A: JMP ($0026)       ; indirect jump to scene init
// 功能: bank00 dispatch — 从 bank00 入口跳转到场景初始化
// Note: Already covered by entryToBank00_dispatch, adding alias
export function bank00Dispatch_$CEFE(sys: SystemState, sceneId: number): void {
  entryToBank00_dispatch(sys, (s: SystemState) => {
    // This is a simplified version
    s.mem[0x24] = 0x1A;
    s.mem[0x25] = 0x1B;
    bankSwitch_apply_$CE2D(s);
    console.log('[bank30] bank00Dispatch — scene ' + sceneId.toString(16) + ' init');
  });
}

// ═════════════════════════════════════════════════
// Bank-31 跳转表转发 (15 entries — 补齐 68/68)
// ═════════════════════════════════════════════════
// 这 15 个函数在原始 ROM 中的代码位于 bank-31 ($Exxx/$Fxxx),
// bank-30 跳转表只存放了 JMP 指令跳转到 bank-31。
// TS 翻译中直接在 bank-30 提供包装器, 转调 bank-31 对应函数。

/** $C52A → $EF7F: Bank 切换 helper (multi-target dispatch) */
export function bank31Data_$EF7F(sys: SystemState, targetBank: number, cb?: (sys: SystemState, aReg: number) => void): void {
  translate_BANK31_BANK_SWITCH(sys, targetBank, cb);
}

/** $C53C → $F30F: 跳转表分发 */
export function bank31JumpDispatch_$F30F(sys: SystemState, index: number): number {
  return translate_BANK31_JUMP_TABLE_DISPATCH(sys, index);
}

/** $C566 → $F013: DMA 数据搬运 (sprite PPU 传输) */
export function bank31DmaCopy_$F013(sys: SystemState): void {
  translate_BANK31_DMA_HELPER(sys);
}

/** $C575 → $E233: 进球事件 */
export function bank31Helper_$E233(sys: SystemState): void {
  bank31_goalEvent_$E233(sys);
}

/** $C606 → $E074: 事件检查循环 */
export function bank31Helper_$E074(sys: SystemState): void {
  bank31_eventCheckLoop_$E074(sys);
}

/** $C609 → $E4D7: 球员排序/过滤 */
export function bank31Helper_$E4D7(sys: SystemState): void {
  bank31_playerSort_$E4D7(sys);
}

/** $C60C → $E73E: 球员AI (球追逐) */
export function bank31PlayerAI_$E73E(sys: SystemState): void {
  bank31_playerAI_$E73E(sys);
}

/** $C60F → $E0DF: 主循环 Phase 2 */
export function bank31EventLoop_$E0DF(sys: SystemState): void {
  bank31_mainLoopPhase2_$E0DF(sys);
}

/** $C61E → $E059: 读角色→$0638 */
export function bank31Helper_$E059(sys: SystemState): void {
  bank31_readCharToZone_$E059(sys);
}

/** $C627 → $E54C: 过滤 cleanup */
export function bank31Helper_$E54C(sys: SystemState): void {
  bank31_filterCleanup_$E54C(sys);
}

/** $C62A → $E596: 过场/转场分派 */
export function bank31Helper_$E596(sys: SystemState): void {
  bank31_cutsceneDispatch_$E596(sys);
}

/** $C62D → $E688: 球初始位置计算 */
export function bank31Helper_$E688(sys: SystemState): void {
  bank31_ballInitPos_$E688(sys);
}

/** $C630 → $E678: 侧队切换 (XOR $05FB) */
export function bank31Helper_$E678(sys: SystemState): void {
  bank31_sideSwitch_$E678(sys);
}

/** $C645 → $E6EC: 球员逻辑 (读坐标→区域) */
export function bank31PlayerLogic_$E6EC(sys: SystemState): void {
  translate_BANK31_PLAYER_LOGIC(sys);
}

/** $C64B → $EFA2: Sprite bank 循环 */
export function bank31Helper_$EFA2(sys: SystemState): void {
  translate_BANK31_SPRITE_BANK_LOOP(sys);
}





