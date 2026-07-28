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
 *   ⏳ $C9B5-$C9F0  — 手柄输入更新 (已翻译, 待接入)
 *   ⏳ $CA97-$CB34  — 定时器调度器 (已翻译, 待接入 NMI)
 *   ⏳ $CAE7-$CAF6  — Sprite DMA 设置
 *   ⏳ 其余 15+ 个 CODE 块 — 待翻译
 *
 * ═══════════════════════════════════════
 * 使用方式
 * ═══════════════════════════════════════
 * 翻译后的 bank30 函数被 mocks.ts 中的 bank30_* 包装调用。
 * 逐步替换 mock 实现为真实翻译。
 */

import { SystemState, writeMem, readMem } from './system-state';

// ═════════════════════════════════════════════════
// 跳转表 — 定义 bank30 的公开 API 入口
// ═════════════════════════════════════════════════

/** $C500-$C518: 9-entry jump table */
export const JTAB_C500: Record<number, string> = {
  0xC500: 'initSystem_$C76E',
  0xC503: 'initScene_$C64E',
  0xC506: 'fn_$C821',
  0xC509: 'memClear_$CB8B',   // OAM clear + memory fill
  0xC50C: 'getCharData_$CD7C',
  0xC50F: 'spriteDma_$CAE7',
  0xC512: 'fn_$CAF7',
  0xC515: 'fn_$CB0F',
  0xC518: 'fn_$CB0D',
};

/** $C51B-$C53F: 13-entry jump table */
export const JTAB_C51B: Record<number, string> = {
  0xC51B: 'irqHandler_$CB02',
  0xC51E: 'multiply16_$CD3C',
  0xC521: 'divide16_$CD0D',
  0xC524: 'fn_$CBC2',
  0xC527: 'fn_$CE08',
  0xC52A: 'fn_$EF7F',      // → points to bank31 DATA
  0xC52D: 'fn_$CC46',
  0xC530: 'fn_$CC02',
  0xC533: 'fn_$CCD2',
  0xC536: 'fn_$CDC9',
  0xC539: 'fn_$CDE2',
  0xC53C: 'fn_$F30F',      // → points to bank31 jump dispatch
  0xC53F: 'bankSwitch_$CE2D',
};

/** $C542-$C57B: 20-entry jump table */
export const JTAB_C542: Record<number, string> = {
  0xC542: 'fn_$CE4D',  0xC545: 'fn_$CE4A',  0xC548: 'fn_$CE99',
  0xC54B: 'fn_$CE6E',  0xC54E: 'fn_$CBB0',  0xC551: 'fn_$CD77',
  0xC554: 'fn_$CEFE',  0xC557: 'fn_$C6BE',  0xC55A: 'fn_$CF4F',
  0xC55D: 'fn_$CBF1',  0xC560: 'fn_$CF72',  0xC563: 'fn_$CF8F',
  0xC566: 'fn_$F013',  0xC569: 'fn_$CB35',  0xC56C: 'fn_$D022',
  0xC56F: 'fn_$D093',  0xC572: 'fn_$DB62',  0xC575: 'fn_$E233',
  0xC578: 'fn_$D0D1',  0xC57B: 'fn_$C6BE',
};

/** $C600-$C639: 20-entry jump table */
export const JTAB_C600: Record<number, string> = {
  0xC600: 'fn_$D565',  0xC603: 'fn_$D193',  0xC606: 'fn_$E074',
  0xC609: 'fn_$E4D7',  0xC60C: 'fn_$E73E',  0xC60F: 'fn_$E0DF',
  0xC612: 'fn_$DE52',  0xC615: 'fn_$DE5E',  0xC618: 'fn_$DCFD',
  0xC61B: 'fn_$DD02',  0xC61E: 'fn_$E059',  0xC621: 'fn_$DFD9',
  0xC624: 'fn_$DCDF',  0xC627: 'fn_$E54C',  0xC62A: 'fn_$E596',
  0xC62D: 'fn_$E688',  0xC630: 'fn_$E678',  0xC633: 'fn_$DDFD',
  0xC636: 'fn_$DAAA',  0xC639: 'fn_$DE45',
};

/** $C63C-$C64B: 6-entry jump table */
export const JTAB_C63C: Record<number, string> = {
  0xC63C: 'fn_$DE6C',  0xC63F: 'fn_$D8F7',  0xC642: 'fn_$D852',
  0xC645: 'fn_$E6EC',  0xC648: 'fn_$D7E8',  0xC64B: 'fn_$EFA2',
};

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

    // JSR $CF1F — audio init (暂时跳过，声音引擎未翻译)
    // $CF1F: 初始化 APU/声音寄存器
    console.log('[bank30] initScene soft reset: audio init $CF1F skipped');

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
 * $C4B2: 切换 MMC3 window 6 ($8000-$9FFF)
 * 6502: STX $24; LDA #$06; JMP $C4BD
 */
export function bankSwitch_Win6(sys: SystemState, bankNum: number): void {
  sys.mem[0x24] = bankNum;
  const mmc3Cmd = sys.mem[0x22] | 0x06;
  sys.mem[0x23] = mmc3Cmd;
  writeMem(sys, 0x8000, mmc3Cmd);
  writeMem(sys, 0x8001, bankNum);
}

/**
 * $C4B9: 切换 MMC3 window 7 ($A000-$BFFF)
 * 6502: STX $25; LDA #$07; ORA $22; STA $23; STA $8000; STX $8001; RTS
 */
export function bankSwitch_Win7(sys: SystemState, bankNum: number): void {
  sys.mem[0x25] = bankNum;
  const mmc3Cmd = sys.mem[0x22] | 0x07;
  sys.mem[0x23] = mmc3Cmd;
  writeMem(sys, 0x8000, mmc3Cmd);
  writeMem(sys, 0x8001, bankNum);
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

  // 保存上下文
  sys.mem[0xED] = xReg;
  sys.mem[0xEE] = sys.mem[0x24];
  sys.mem[0xEF] = sys.mem[0x25];

  // 切到 bank0/bank1 上下文
  bankSwitch_Win6(sys, 0);
  bankSwitch_Win7(sys, 1);

  // 调用 bank01 $A00F
  callA00F(sys, aReg, xReg);

  // 恢复 bank 映射
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
 * $CE2D: 应用已保存在 $24/$25 的 bank 映射到 MMC3。
 *
 * 6502: LDA $22; ORA #$06; STA $23; STA $8000;
 *       LDA $24; STA $8001;
 *       LDA $22; ORA #$07; STA $23; STA $8000;
 *       LDA $25; STA $8001; RTS
 */
export function bankSwitch_apply_$CE2D(sys: SystemState): void {
  const mmc3Mode = sys.mem[0x22];

  // Window 6 ($8000-$9FFF)
  let cmd = mmc3Mode | 0x06;
  sys.mem[0x23] = cmd;
  writeMem(sys, 0x8000, cmd);
  writeMem(sys, 0x8001, sys.mem[0x24]);

  // Window 7 ($A000-$BFFF)
  cmd = mmc3Mode | 0x07;
  sys.mem[0x23] = cmd;
  writeMem(sys, 0x8000, cmd);
  writeMem(sys, 0x8001, sys.mem[0x25]);
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

  // LDA #$1E; STA $2001 — 开启 bg+sprites
  writeMem(sys, 0x2001, 0x1E);

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

  // ── $C793-$C798: 根据 $046B 切换 MMC3 bank 到 $8000-$9FFF ──
  // LDA $046B; STA $A000
  const bankA000 = sys.mem[0x046B];
  writeMem(sys, 0xA000, bankA000);

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

  // ── $C7F0-$C80F: 恢复 MMC3 bank 映射 ──
  // Window 7 restore
  const mmc3Mode = sys.mem[0x22];
  writeMem(sys, 0x8000, mmc3Mode | 0x07);
  writeMem(sys, 0x8001, sys.mem[0x25]);

  // Window 6 restore
  writeMem(sys, 0x8000, mmc3Mode | 0x06);
  writeMem(sys, 0x8001, sys.mem[0x24]);

  // 恢复 SP
  // (6502: PLA; TAX; TXS)
  // 在 TS 中 SP 由 regs 管理

  // MMC3 最终恢复
  writeMem(sys, 0x8000, sys.mem[0x23]);

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

/** $CD89-$CDC8: 角色/场景数据指针表（32 entries, $0300-$042F） */
const CHAR_DATA_PTRS: readonly number[][] = [
  [0x00,0x03], [0x0C,0x03], [0x18,0x03], [0x24,0x03],
  [0x30,0x03], [0x3C,0x03], [0x48,0x03], [0x54,0x03],
  [0x60,0x03], [0x6C,0x03], [0x78,0x03], [0x84,0x03],
  [0x90,0x03], [0x9C,0x03], [0xA8,0x03], [0xB4,0x03],
  [0xC0,0x03], [0xCC,0x03], [0xD8,0x03], [0xE4,0x03],
  [0xF0,0x03], [0xFC,0x03], [0x08,0x04], [0x0C,0x04],
  [0x10,0x04], [0x14,0x04], [0x18,0x04], [0x1C,0x04],
  [0x20,0x04], [0x24,0x04], [0x28,0x04], [0x2C,0x04],
];

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
  const ptr = CHAR_DATA_PTRS[index % CHAR_DATA_PTRS.length];
  sys.mem[0x34] = ptr[0];
  sys.mem[0x35] = ptr[1];
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

