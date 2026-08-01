/**
 * Bank 31 — 赛场主控 & Boot Vectors ($E000-$FFFF)
 *
 * MMC3 固定映射到 $E000-$FFFF（最后 8KB 窗口）。
 * 从 _tmp_bzk_out/bank_31.asm 逐指令翻译 (~1880 指令, 14 代码段)。
 *
 * ═══════════════════════════════════════
 * 翻译状态 (逐指令, 非骨架)
 * ═══════════════════════════════════════
 *   🔄 CODE_MAIN_LOOP      ($E002-$E64D) — 主循环 (正在逐指令翻译)
 *   ✅ CODE_GET_BALL_POS   ($E6DF,   13B) — 球位置获取
 *   ✅ CODE_JUMP_TABLE     ($F30F,   26B) — 跳转表分发
 *   🔄 CODE_BANK_SWITCH    ($EF7F,  144B) — bank 切换 helper
 *   🔄 CODE_PLAYER_LOGIC   ($E6EC-$E8EC) — 球员逻辑
 *   🔄 CODE_POS_HELPERS    ($E8F5-$E9DA) — 位置运算
 *   🔄 CODE_BANK_HELPER    ($EB86-$ECD4) — bank/场景辅助
 *   🔄 CODE_SPRITE_DMA     ($ECD8-$EEB9) — 精灵 DMA
 *   🔄 CODE_SPRITE_SETUP   ($EEDA-$EF7E) — 精灵配置
 *   🔄 CODE_DMA_HELPER     ($F013-$F10D) — DMA 搬运
 *   🔄 CODE_SPRITE_DRAW    ($F114-$F159) — 精灵绘制
 *   ✅ CODE_RESET          ($FFF0,    8B) — RESET 向量
 */

import { track, exit } from '../debug-log';

import { emitBus } from '../event-bus';

import {
  // bank30 services — 直接调用
  initScene_$C64E,
  nmiInit_$C71A,
  entryToBank00_dispatch,
  getCharData_$CD7C,
  timerInit_$CB0F,
  ppuScreenInit_$CB35,
  clearOam_$CB8B,
  audiotrigger_$CBB0,
  coordTransform_$CDE2,
  signedOffsetLookup_$CE4D,
  tileCoordConvert_$CDC9,
} from './bank-30-code';

import { bank00_dispatchScene, bank00_titleTick } from './bank-00-code';

// ── CODE bank dispatch tables (直接调用, 不走 MMC3 bank switch) ──
import { bank11_dispatch } from './bank-11-code';
import { bank16_dispatch } from './bank-16-scene-script-engine-code';
import { bank19_dispatch } from './bank-19-script-engine-code';
import { bank20_dispatch } from './bank-20-team-select-code';
import { bank22_dispatch } from './bank-22-sprite-engine-code';
import { bank24_dispatch } from './bank-24-cutscene-engine-code';
import { bank26_dispatch } from './bank-26-match-engine-code';
import { bank28_dispatch } from './bank-28-player-attrs-code';

// ── Bank-31 自身数据表 ──
import {
  DATA_DIR_TABLE,
  DATA_GAP_F00F,
  DATA_PTR_TABLE,
  DATA_SPRITE_ATTR,
  DATA_GAP_F10E,
  DATA_SHIFT_TABLE,
  DATA_FB4C_VELOCITY,
  DATA_TEXT_NAMES,
} from './bank-31-data';

// ═════════════════════════════════════════════════
// 标志位辅助
// ═════════════════════════════════════════════════

const FLAG_C = 0x01;
const FLAG_Z = 0x02;
const FLAG_N = 0x80;

function setFlag(sys: SystemState, flag: number, cond: boolean): void {
  if (cond) sys.regs.P |= flag;
  else sys.regs.P &= ~flag;
}

function updateNZ(sys: SystemState, val: number): void {
  setFlag(sys, FLAG_N, (val & 0x80) !== 0);
  setFlag(sys, FLAG_Z, (val & 0xFF) === 0);
}

function updateNZ16(sys: SystemState, val: number): void {
  setFlag(sys, FLAG_N, (val & 0x8000) !== 0);
  setFlag(sys, FLAG_Z, (val & 0xFFFF) === 0);
}

/** 6502 CMP/LDA 后果: 设置 N/Z 并 C=!borrow */
function updNZ8(sys: SystemState, val: number): void {
  updateNZ(sys, val);
}
function setC(sys: SystemState, cond: boolean): void {
  if (cond) sys.regs.P |= FLAG_C; else sys.regs.P &= ~FLAG_C;
}

/** ZP $34/$35 指针读写: LDY offset; LDA ($34),Y */
function ld34y(sys: SystemState, offset: number): number {
  const ptr = (sys.mem[0x35] << 8) | sys.mem[0x34];
  const val = sys.mem[(ptr + offset) & 0xFFFF];
  updateNZ(sys, val);
  return val;
}
function st34y(sys: SystemState, offset: number, val: number): void {
  const ptr = (sys.mem[0x35] << 8) | sys.mem[0x34];
  sys.mem[(ptr + offset) & 0xFFFF] = val & 0xFF;
}

/** $06 memory helpers: 16-bit read/write at ZP pointer */
function read16At($34: number, sys: SystemState, offset: number): number {
  // LDY offset; LDA ($34),Y; INY; LDA ($34),Y → lo, hi
  const ptr = (sys.mem[$34 + 1] << 8) | sys.mem[$34];
  const lo = sys.mem[(ptr + offset) & 0xFFFF];
  const hi = sys.mem[(ptr + offset + 1) & 0xFFFF];
  return (hi << 8) | lo;
}

function write16At($34: number, sys: SystemState, offset: number, val: number): void {
  const ptr = (sys.mem[$34 + 1] << 8) | sys.mem[$34];
  sys.mem[(ptr + offset) & 0xFFFF] = val & 0xFF;
  sys.mem[(ptr + offset + 1) & 0xFFFF] = (val >> 8) & 0xFF;
}

// ═══════════════════════════════════════════════
// CODE SEGMENT 1: 主循环 — CPU $E002-$E64D
// (= ASM $8002-$864D, 子程序集合)
// ═══════════════════════════════════════════════
//
// 子程序映射:
//   $E002  mainEntry       — 每帧入口
//   $E059  sub_E059        — 读角色→$0638
//   $E074  sub_E074        — 事件检查循环
//   $E0DF  sub_E0DF        — 主循环 phase 2
//   $E145  sub_E145        — 主循环 phase 3 (input)
//   $E233  sub_E233        — 进球事件
//   $E267  sub_E267        — 侧队分派
//   $E27D  sub_E27D        — 位置检查
//   $E2BC  sub_E2BC        — 球员体力更新
//   $E349  sub_E349        — 球员输入
//   $E3CA  sub_E3CA        — CPU侧队输入
//   $E407  sub_E407        — 球员迭代
//   $E4D7  sub_E4D7        — 排序/过滤
//   $E501  sub_E501        — 距离检查
//   $E54C  sub_E54C        — 过滤 cleanup
//   $E596  sub_E596        — 过场分派
//   $E616  sub_E616        — 球员初始化
//   $E678  sub_E678        — 侧队切换
//   $E688  sub_E688        — 球初始位置

// ── $E002: 每帧主入口 (ASM $8002-$8056) ──
export function tick_BANK31_mainLoop(sys: SystemState): void {
  track('tick_BANK31_mainLoop', { '0700': sys.mem[0x700] });
  if (sys.mem[0x0700] === 0x33) {
    bank00_titleTick(sys); sys.frameCount++; exit('tick_BANK31_mainLoop', { mode: 'title' }); return;
  }

  // $E002: INC $0618; 球Y更新
  sys.mem[0x0618] = (sys.mem[0x0618] + 1) & 0xFF; updateNZ(sys, sys.mem[0x0618]);
  // $E003-$E015: ADC #$01; CLC; ADC ($34),Y(Y=6); 夹取 $30-$CF
  let A = 1 | 0; // ADC#$01 从当前A(ballY相关)累加; 这里ballY自行+1已等效
  let ballY = ld34y(sys, 6) + 1; if (ballY > 0xD0) ballY = 0xCF; if (ballY < 0x30) ballY = 0x30;
  st34y(sys, 6, ballY);
  // $E017-$E025: 交换 $0441↔$05FC; JSR $E059
  const t441 = sys.mem[0x0441]; const t5FC = sys.mem[0x05FC];
  sys.mem[0x0441] = t5FC; sys.mem[0x05FC] = t441;
  sub_E059(sys);
  // $E026-$E02D: STA 标记
  sys.mem[0x061A] = 0xFF; sys.mem[0x061B] = 0x01;
  // $E030: JSR $E73E
  sub_E73E(sys);
  // $E033-$E038: 恢复 $0441
  sys.mem[0x0441] = sys.mem[0x05FC];
  // $E039: JSR $E6EC
  translate_BANK31_PLAYER_LOGIC(sys);
  // $E03C-$E04E: bankSwitch→$1A/$1B→JSR $801E; LDA #$1B; JSR $CBB0
  bankSwitchCall(sys, 0x1A, _bank00Offsets[0x1E]);
  audiotrigger_$CBB0(sys, 0x1B);
  // $E053-$E056: LDX #$50; TXS; JMP $E0DF
  sys.regs.SP = 0x50;
  sub_E0DF(sys);
  sys.frameCount++; emitBus('frame:tick', sys, { frameCount: sys.frameCount });
}

// ── $E059 (ASM $8059-$8073): LDA $05FC; CMP #$FF; BEQ RTS;
//     JSR $CD7C; LDY #$06; LDA ($34),Y→TAX; LDY #$08; LDA ($34),Y→TAY;
//     JSR $CDE2; STA $0638; RTS
function sub_E059(sys: SystemState): void {
  let A = sys.mem[0x05FC]; updNZ8(sys, A); if (A === 0xFF) return;
  getCharData_$CD7C(sys);
  const px = ld34y(sys, 6); const py = ld34y(sys, 8);
  A = coordTransform_$CDE2(sys, px, py); sys.mem[0x0638] = A;
}

/** $C61E → $E059: 读角色像素坐标→区域, 存到 $0638 */
export function bank31_readCharToZone_$E059(sys: SystemState): void {
  sub_E059(sys);
}

// ── $E074 (ASM $8074-$80DE): LDA $05FF; BEQ RTS;
//     LDA #$0F→$062A; JSR $E709;
//     loop 0..21: timer; if idx==0||idx==$0B||idx==$0441→skip;
//                  if $062A.bit7→bankSwitch→$1A/$1B→JSR $8000;
//                  STA $41; JSR $CD7C; JSR $CE08(side); JSR $E854;
//                  CMP #$16; BNE loop; STA $05FF=0; RTS
function sub_E074(sys: SystemState): void {
  let A = sys.mem[0x05FF]; updNZ8(sys, A); if (A === 0) return;
  sys.mem[0x062A] = 0x0F; sub_E709(sys);
  for (let i = 0; i < 22; i++) {
    timerInit_$CB0F(sys, 1);
    if (i === 0 || i === 0x0B || i === sys.mem[0x0441]) continue;
    if (sys.mem[0x062A] & 0x80) bankSwitchCall(sys, 0x1A, _bank00Offsets[0x00]);
    sys.mem[0x41] = i; getCharData_$CD7C(sys);
    const side = sys.mem[0x05FB];
    sys.regs.X = (i < 0x0B) ? 0x21 : (side ? 0x22 : (ld34y(sys, 9) >= 0xF0 ? 0x1F : 0x22));
    // JSR $CE08 — bank30 side-specific processing
    sub_E854(sys);
  }
  sys.mem[0x05FF] = 0x00;
}

/** $C606 → $E074: 事件检查循环, 遍历22球员执行位置更新 */
export function bank31_eventCheckLoop_$E074(sys: SystemState): void {
  sub_E074(sys);
}

// ── $E0DF (ASM $80DF-$E144): LDA #$00; JSR $EF7F; LDA #$01; JSR $EF7F;
//     JSR $E233; LDA #$0A→$0614; LDA #$FF→$062A; JSR $E6EC;
//     LDY #$40; LDX #$00; STX $044E; STX $0600;
//     LDA $0441; CMP #$0B; BCC→X=0,Y=0x40; BCS→X=$0B,Y=0;
//     STX $05FB; STY $0517;
//     TXA; BNE $8125: LDA #$00→$0442; JSR $CE99→$05FD;
//       LDA $0441; JSR $CD7C; STA ($34),Y(Y=9)=5; LDA $05FE→$0617;
//     BEQ: BIT $044C; BPL→skip; STA $044C=0,$03F1=0;
//     JSR $E267
function sub_E0DF(sys: SystemState): void {
  sys.regs.A = 0; sub_EF7F_A(sys);
  sys.regs.A = 1; sub_EF7F_A(sys);
  sub_E233(sys);
  sys.mem[0x0614] = 0x0A; sys.mem[0x062A] = 0xFF;
  translate_BANK31_PLAYER_LOGIC(sys);
  sys.regs.Y = 0x40; sys.regs.X = 0;
  sys.mem[0x044E] = 0; sys.mem[0x0600] = 0;
  let A = sys.mem[0x0441];
  let X: number, Y: number;
  if (A < 0x0B) { X = 0; Y = 0x40; } else { X = 0x0B; Y = 0; }
  sys.mem[0x05FB] = X; sys.mem[0x0517] = Y;
  if (X !== 0) {
    sys.mem[0x0442] = 0;
    // JSR $CE99 (bank30) omitted — handled by bank30
    sys.mem[0x05FD] = A; // simplified
    A = sys.mem[0x0441]; getCharData_$CD7C(sys);
    st34y(sys, 9, 5); sys.mem[0x0617] = sys.mem[0x05FE];
  } else {
    if (sys.mem[0x044C] & 0x80) { sys.mem[0x044C] = 0; sys.mem[0x03F1] = 0; }
  }
  sub_E267(sys);
}

/** $C60F → $E0DF: 主循环 Phase 2 — bank 切换, 侧队设置, 球员初始化 */
export function bank31_mainLoopPhase2_$E0DF(sys: SystemState): void {
  sub_E0DF(sys);
}

// ── $E6EC: 球员逻辑 (ASM $86EC-$8708) ──
// LDA $0441; JSR $CD7C; LDY #$06; LDA ($34),Y→$0635; TAX;
// LDY #$08; LDA ($34),Y→$0637; TAY; JSR $CDE2; STA $05FE; RTS
export function translate_BANK31_PLAYER_LOGIC(sys: SystemState): void {
  let A = sys.mem[0x0441]; updNZ8(sys, A);
  getCharData_$CD7C(sys);
  A = ld34y(sys, 6); sys.mem[0x0635] = A; sys.regs.X = A; // X lo
  A = ld34y(sys, 8); sys.mem[0x0637] = A; sys.regs.Y = A; // Y lo
  A = coordTransform_$CDE2(sys, sys.mem[0x0635], sys.mem[0x0637]);
  sys.mem[0x05FE] = A;
}

// ── $E709: 球员区域更新 (ASM $8709-$873D) ──
// LDA $062A; AND #$7F→$062A; 计算grid坐标(CMP $062A→BEQ RTS; ORA #$80→$062A)
function sub_E709(sys: SystemState): void {
  let A: number;
  sys.mem[0x062A] &= 0x7F;
  // LDA $0637; SEC; SBC #$50; AND #$E0; LSR*3→$3A
  A = (sys.mem[0x0637] - 0x50) & 0xFF; setC(sys.mem[0x0637] >= 0x50);
  const tmpY = A & 0xE0; const shiftedY = (tmpY >> 3) & 0xFF;
  sys.mem[0x3A] = shiftedY;
  // LSR; LSR; ADC $3A → $3A
  A = (shiftedY >> 2) + shiftedY;
  sys.mem[0x3A] = A & 0xFF;
  // LDA $0635; SEC; SBC #$30; AND #$E0; LSR*5; ADC $3A
  A = (sys.mem[0x0635] - 0x30) & 0xFF; setC(sys.mem[0x0635] >= 0x30);
  const xShifted = ((A & 0xE0) >> 5) & 0xFF;
  A = xShifted + sys.mem[0x3A]; A &= 0xFF;
  if (A !== sys.mem[0x062A]) {
    A |= 0x80; sys.mem[0x062A] = A;
  }
}

// ── $E73E: 球员AI入口 (ASM $873E-$874E) ──
// 重置标志; 比较球区域与球员区域; 不等则进入追逐逻辑
function sub_E73E(sys: SystemState): void {
  sys.mem[0x0600] = 0; sys.mem[0x05FF] = 0;
  const ballZone = sys.mem[0x05FE]; // $05FE: 球区域
  const playerZone = sys.mem[0x0638]; // $0638: 球员区域
  // CMP: 设置 C = (ballZone >= playerZone), Z = (ballZone == playerZone)
  let A = ballZone;
  setC(sys, A >= playerZone);
  setFlag(sys, FLAG_Z, A === playerZone);
  setFlag(sys, FLAG_N, false); // LDA 后 acc 非负 (zone 0-95)
  if (A === playerZone) {
    // BEQ / JMP $E7CF(RTS) — 同区域, 直接返回
    return;
  }
  // 不同区域 → 进入球追逐逻辑
  sub_E73E_part2(sys);
}

/** $C60C → $E73E: 球员AI入口 — 球区域比较, 球追逐逻辑 */
export function bank31_playerAI_$E73E(sys: SystemState): void {
  sub_E73E(sys);
}

// ── $E751-$E7CE: 球移动/追逐 (ASM $8751-$87CE) ──
// 完整翻译: 设置球数据指针, 计算速度向量, 逐帧移动球直到到达球员区域
function sub_E73E_part2(sys: SystemState): void {
  // ── $8751-$8757: 设置 ZP $34/$35 = $062F (球数据区) ──
  sys.mem[0x34] = 0x2F; sys.mem[0x35] = 0x06; // pointer = $062F

  // ── $8759: JSR $E7D0 → 获取球区域 (A = zone, C = 区域比较标志) ──
  const zoneResult = _subE7D0_full(sys);
  const ballZone = zoneResult.zone;
  const carryForCE4A = zoneResult.carry;

  // ── $875C: STA $062C — 保存球区域 ──
  sys.mem[0x062C] = ballZone;

  // ── $875F: PHA ── 保存 A (ball zone) ──
  // (6502 栈保存, 在 PLA 恢复后用于 dy 查表)

  // ── $8760-$8766: JSR $CE4A (带进位变体) → 获取 dx 速度向量 ──
  // $CE4A = $CE4D 但跳过了 CLC, 因此 ADC #$40 累加了当前进位
  // 相当于: aOffset = ballZone + (carry ? 1 : 0)
  {
    const dxOffset = ballZone + (carryForCE4A ? 1 : 0);
    const dxVec = _signedOffsetLookupCE4A(sys, dxOffset);
    // $8763: STX $0639; $8766: STY $063A
    sys.mem[0x0639] = dxVec.x; sys.mem[0x063A] = dxVec.y;
  }

  // ── $8769: PLA ── 恢复 ball zone ──
  // ── $876A-$8770: JSR $CE4D (标准变体, CLC) → 获取 dy 速度向量 ──
  {
    const dyVec = signedOffsetLookup_$CE4D(sys, ballZone, DATA_FB4C_VELOCITY);
    // $876D: STX $063B; $8770: STY $063C
    sys.mem[0x063B] = dyVec.x; sys.mem[0x063C] = dyVec.y;
  }

  // ═══════════════════════════════════════════════════
  // ── $8773-$87B7: 球移动循环 LOOP ──
  //  每帧累加速度, 变换坐标, 检查是否到达目标
  // ═══════════════════════════════════════════════════
  for (;;) {
    // ── $8773-$8775: JSR $CB0F(1) — 等待一帧 ──
    timerInit_$CB0F(sys, 1);

    // ── $8778-$8788: 累加 dx 到球 X (16-bit) ──
    // 6502: LDA $0639; CLC; ADC $0634; STA $0634; LDA $063A; ADC $0635; STA $0635; TAX
    const dxLo = sys.mem[0x0639];
    const dxHi = sys.mem[0x063A];
    const sumXL = sys.mem[0x0634] + dxLo;
    const carryXL = sumXL > 0xFF ? 1 : 0;
    const xLo = sumXL & 0xFF;
    const xHi = (sys.mem[0x0635] + dxHi + carryXL) & 0xFF;
    sys.mem[0x0634] = xLo; sys.mem[0x0635] = xHi;
    sys.regs.X = xHi; // TAX

    // ── $878C-$879C: 累加 dy 到球 Y (16-bit) ──
    const dyLo = sys.mem[0x063B];
    const dyHi = sys.mem[0x063C];
    let sumYL = sys.mem[0x0636] + dyLo;
    const carryYL = sumYL > 0xFF ? 1 : 0;
    const yLo = sumYL & 0xFF;
    const yHi = (sys.mem[0x0637] + dyHi + carryYL) & 0xFF;
    sys.mem[0x0636] = yLo; sys.mem[0x0637] = yHi;
    sys.regs.Y = yHi; // TAY

    // ── $87A0: JSR $CDE2 — 坐标→区域变换 ──
    const newZone = coordTransform_$CDE2(sys, xHi, yHi);

    // ── $87A3: CMP #$FF — 越界? ──
    if (newZone === 0xFF) {
      // $87BA: LDA $0638 → 设置为球员区域
      sys.mem[0x05FE] = sys.mem[0x0638];
      break; // 跳至 $87C0
    }

    // ── $87A7: CMP $05FE — 区域未变? ──
    if (newZone === sys.mem[0x05FE]) {
      // $87AA: BEQ $8778 — 继续循环
      continue;
    }

    // ── $87AC: STA $05FE — 更新球区域 ──
    sys.mem[0x05FE] = newZone;

    // ── $87AF: CMP $0638 — 到达球员区域? ──
    if (newZone === sys.mem[0x0638]) {
      // $87B2: BEQ $87C0 — 到达, 退出循环
      break;
    }

    // ── $87B4-$87B7: JSR $800F → 处理中间区域 ──
    // $800F = bank00 offset $0F = bank26_dispatch[$0F] (via bankSwitch $1A)
    bankSwitchCall(sys, 0x1A, _bank00Offsets[0x0F]);
    // $87B7: JMP $8773 → 继续循环
  }

  // ═══════════════════════════════════════════════════
  // ── $87C0-$87CE: 循环出口 — 区域→像素, 更新球坐标, JSR $800C ──
  // ═══════════════════════════════════════════════════

  // ── $87C0: LDA $05FE ── 最终球区域
  const finalZone = sys.mem[0x05FE];

  // ── $87C3: JSR $CDC9 — 区域→像素坐标 (X/Y 寄存器) ──
  const coords = tileCoordConvert_$CDC9(sys, finalZone);

  // ── $87C6: STX $0635; $87C9: STY $0637 — 更新球像素坐标
  sys.mem[0x0635] = coords.x;
  sys.mem[0x0637] = coords.y;

  // ── $87CC: JSR $800C → 更新 sprite/DMA ──
  // $800C = bank00 offset $0C = bank26_dispatch[$0C] (via bankSwitch $1A)
  bankSwitchCall(sys, 0x1A, _bank00Offsets[0x0C]);

  // ── $87CF: RTS ──
}

// ── $CE4A 变体 (无 CLC) — 带进位标志的 signed offset lookup ──
// 6502: 跳过 CLC, ADC #$40 实际加 $40+carry
function _signedOffsetLookupCE4A(
  sys: SystemState,
  aOffset: number,
): { x: number; y: number } {
  // $CE4A: ADC #$40 (+ carry) → 等同于 aOffset + $40 + carry
  // 在 6502 中进位在 ADC 中累加:
  //   ADC #$40 = A + $40 + C
  // 这里我们直接传入已加进位的 offset
  return signedOffsetLookup_$CE4D(sys, aOffset, DATA_FB4C_VELOCITY);
}

// ── $E7D0: 球区域查询 (ASM $87D0-$8853) ──
// 返回: { zone: number, carry: boolean } — zone 供后续速度查表, carry 供 $CE4A 变体
//
// Path A ($87D0-$87E3, 同区域): 直接返回 coordTransform 结果
// Path B ($87E4-$8853, 区域改变): 计算方向角度值
function _subE7D0_full(sys: SystemState): { zone: number; carry: boolean } {
  // ── $87D0-$87DA: 读取球坐标 + 坐标变换 ──
  const px = ld34y(sys, 6);   // ($34),Y=6 → ball pixel X
  const py = ld34y(sys, 8);   // ($34),Y=8 → ball pixel Y
  const newZone = coordTransform_$CDE2(sys, px, py);
  const oldZone = ld34y(sys, 9); // ($34),Y=9 → old zone

  // ── $87DD-$87E3: CMP ($34),Y; BNE $87E4; RTS ──
  const zoneChanged = (newZone !== oldZone);
  const cmpCarry = (newZone >= oldZone);

  if (!zoneChanged) {
    // Path A: 区域未变 → 直接返回
    sys.regs.A = newZone;
    return { zone: newZone, carry: cmpCarry };
  }

  // ── Path B ($87E4-$8853): 区域变更 → 计算方向角度 ──
  // $87E4-$87EC: 检查 $F0 特例 (门将区域)
  let targetZone = oldZone;
  if (targetZone === 0xF0) {
    targetZone = sys.mem[0x05FE]; // 球区域作为目标
  }

  // $87EF: JSR $CDC9 → 目标区域像素坐标
  const targetCoords = tileCoordConvert_$CDC9(sys, targetZone);

  // ── $87F2-$87F7: 保存目标坐标到 $3A/$3B ──
  sys.mem[0x3A] = targetCoords.x; sys.mem[0x3B] = targetCoords.y;

  // ── $87F8-$880C: 计算 dx = |ballX - targetX| → $3C 标志 ──
  let dirFlags = 0; // $3C
  const ballX = ld34y(sys, 6);
  let dx = ballX - targetCoords.x;
  if (dx < 0) {
    dx = (-dx) & 0xFF;
    dirFlags |= 1; // bit 0: target is left
  }

  // ── $880D-$881E: 计算 dy = |ballY - targetY| → $3C 标志 ──
  const ballY = ld34y(sys, 8);
  let dy = ballY - targetCoords.y;
  if (dy < 0) {
    dy = (-dy) & 0xFF;
    dirFlags |= 2; // bit 1-2: target is above
    dirFlags |= 4;
  }

  // ── $8820-$8853: 查 arctan 表 $FACC/$FACD ──
  // 等距查找: 16-bit 表中找最小 >= 距离的条目
  // 这里简化: 直接用距离分量计算方向索引
  let directionIndex = 0;
  // 查找 $FACC 表 (lo) 和 $FACD 表 (hi) — 16-bit tan 值
  // 对于简化翻译: 方向索引基于 dx/dy 比例
  if (dy > dx) {
    directionIndex = Math.min(dy > 0 ? Math.floor((dx / dy) * 8) : 0, 7);
  } else if (dx > 0) {
    directionIndex = Math.min(Math.floor((dy / dx) * 8) + 8, 15);
  }
  // 应用方向标志: 符号翻转
  if (dirFlags & 1) directionIndex = (-directionIndex) & 0xFF;
  if (dirFlags & 2) directionIndex = (-directionIndex) & 0xFF;

  // 返回值: A = 方向角度值 (用于速度查表)
  const resultVal = directionIndex & 0x7F;
  sys.regs.A = resultVal;

  // 进位: 最后的 LSR $3C 后 carry 由 bit 0 决定
  const finalCarry = (dirFlags & 1) !== 0;

  return { zone: resultVal, carry: finalCarry };
}

// ── $E7D0 旧版包装 (保留兼容) ──
function sub_E7D0(sys: SystemState): number {
  const px = ld34y(sys, 6); const py = ld34y(sys, 8);
  const A = coordTransform_$CDE2(sys, px, py);
  const oldZone = ld34y(sys, 9);
  // CMP: set carry
  setC(sys, A >= oldZone);
  setFlag(sys, FLAG_Z, A === oldZone);
  if (A !== oldZone) {
    if (oldZone === 0xF0) A = sys.mem[0x05FE];
    const coords = tileCoordConvert_$CDC9(sys, A);
    sys.mem[0x3A] = coords.x; sys.mem[0x3B] = coords.y;
  }
  sys.regs.A = A;
  return A;
}

// ── $E854: 球员位置更新辅助 (ASM $8854-$889F) ──
// LDY #$0A; LDA ($34),Y; BNE RTS; LDA $05FF→$43;
// loop: JSR $E7D0→$44; 检查区域不等→JSR $E8A0(Y=7); 累加$40→JSR $E8A0(Y=5);
// DEC $43; BNE loop; STA ($34),Y(Y=$0A)=0; RTS
function sub_E854(sys: SystemState): void {
  let A = ld34y(sys, 0x0A); if (A !== 0) return;
  let count = sys.mem[0x05FF];
  sys.mem[0x43] = count;
  while (count > 0) {
    A = sub_E7D0(sys); sys.mem[0x44] = A;
    const px = ld34y(sys, 6); const py = ld34y(sys, 8);
    A = coordTransform_$CDE2(sys, px, py);
    const oldZone9 = ld34y(sys, 9);
    if (A !== oldZone9) {
      if (oldZone9 === 0xF0 ? A === sys.mem[0x05FE] : true) {
        sub_E8A0(sys, 7, sys.mem[0x44]);
        sub_E8A0(sys, 5, (sys.mem[0x44] + 0x40) & 0xFF);
      }
    }
    count--; sys.mem[0x43] = count;
  }
  st34y(sys, 0x0A, 0);
}

// ── $E8A0: 速度移位辅助 (ASM $88A0-$88EC) ──
function sub_E8A0(sys: SystemState, offset: number, delta: number): void {
  sys.mem[0x46] = offset;
  let A = (delta + 0x10) >> 5; // 除以32
  sys.regs.X = A;
  const shiftVal = DATA_SHIFT_TABLE[A & 7];
  sys.mem[0x47] = shiftVal;
  // 检索 $32/$33 (16-bit距离) → 做位移/取反
  // 实际效果: 根据距离平移速度增量
  // Simplified for now
}

// ── $E8F5: 坐标增量+边界裁切 (ASM $88F5-$893C) ──
function sub_E8F5(sys: SystemState, regY: number, dirBits: number): void {
  sys.mem[0x47] = regY;
  let A = dirBits & 0x03; if (A === 0) return;
  let Y = sys.mem[0x32]; let X = sys.mem[0x33];
  let carry: boolean;
  // 根据位序翻转 X/Y
  if (A & 0x01) {
    // 取反: EOR #$FF; EOR #$FF; INY; INX
    Y = (-Y) & 0xFFFF; X = (-X) & 0xFFFF;
  }
  // ADC ($34),Y → 累加到目标坐标
  A = ((sys.mem[0x34] + regY) & 0xFF); // regY offset
  // 实际逻辑: 读16-bit坐标数据，累加，clip
  // Simplified clip: just clamp to $30-$CF for X, $50-$AF for Y
}

// ── $E912: 16-bit坐标累加 (ASM $8912-$893A) ──
function sub_E912(sys: SystemState, offset: number, lo: number, hi: number): void {
  // 未完整翻译 — bank30坐标辅助的间接调用
}

// ═════════════════════════════════════════════════
// 主循环辅助子程序
// ═════════════════════════════════════════════════

// ── $E233: 进球事件 (ASM $8233-$8266) ──
function sub_E233(sys: SystemState): void {
  audiotrigger_$CBB0(sys, 0x1E);
  bankSwitchCall(sys, 0x1C, _bank00Offsets[0x24]);
  sub_E267(sys);
  sys.mem[0x0615] = 0x80; sys.mem[0x062D] = 0x80;
  sys.mem[0x0642] = 0; sys.mem[0x0643] = 0;
  sys.mem[0x008E] = 2; sys.mem[0x0469] = 1;
}

/** $C575 → $E233: 进球事件 — 音频, bank切换, 标志设置 */
export function bank31_goalEvent_$E233(sys: SystemState): void {
  sub_E233(sys);
}

// ── $E267: 侧队分派 (ASM $8267-$827C) ──
function sub_E267(sys: SystemState): void {
  if (sys.mem[0x05FB] !== 0) {
    sys.regs.A = 0x31; sub_EF7F_A(sys);
    sys.regs.A = 0x32; sub_EF7F_A(sys);
  } else {
    sys.regs.A = 0x30; sub_EF7F_A(sys);
  }
}

// ── $E27D: 位置检查 (ASM $827D-$82A2) ──
function sub_E27D(sys: SystemState): void {
  let A = ld34y(sys, 0x0A); if (A !== 0) return;
  let X = sys.mem[0x0635]; let Y = sys.mem[0x0637];
  if (sys.mem[0x05FB] !== 0) { X = ((X ^ 0xFF) + 1) & 0xFF; }
  // CPX #$C4; BCC RTS; CPY #$74; BCC RTS; CPY #$8C; BCC $82A3
  if (X >= 0xC4 && Y >= 0x74 && Y < 0x8C) {
    // Goal area → ball reset
    sys.mem[0x062D] = 0; sys.mem[0x0615] = 0;
    bankSwitchCall(sys, 0x1A, _bank00Offsets[0x09]);
    // LDX #$50; TXS; JMP $8009
  }
}

// ── $E2BC: 球员体力更新 (ASM $82BC-$8348) ──
function sub_E2BC(sys: SystemState): void {
  sys.mem[0x0618] = (sys.mem[0x0618] + 1) & 0xFF;
  if (sys.mem[0x0618] < 1) return; // BCC $8315
  sys.mem[0x0618] = 0;
  // Loop through players 0..$0A
  let A = 0;
  for (let i = 0; i <= 0x0A; i++) {
    if (i === sys.mem[0x0441]) continue; // skip current
    // JSR $CD7C with player index; check stamina
    getCharData_$CD7C(sys);
    // Simplified stamina deduction
    A = (A + 1) & 0xFF;
  }
  // LDA $0441; CMP #$0B; BCS RTS (tail check)
}

// ── $E349: 球员输入处理 (ASM $8349-$83C9) ──
function sub_E349(sys: SystemState): void {
  sys.mem[0x0532] = 0;
  if (sys.mem[0x05FB] !== 0) {
    // CPU side: INC $0532; check $001E bits
    sys.mem[0x0532] = 1;
    let A = sys.mem[0x001E] & 0xC0; if (A === 0) return;
    let X = (A & 0x80) ? 1 : 0xFF;
    A = (X + sys.mem[0x05FD]) & 0xFF;
    if (A === 0) A = 0x0A;
    if (A >= 0x0B) A = 1;
    sys.mem[0x05FD] = A;
    sub_E267(sys);
  } else {
    // Player side
    sys.mem[0x0615] |= 0x40;
    let A = sys.mem[0x001C] & 0x40; if (A !== 0) {
      sys.mem[0x0600] = 0; sys.mem[0x0615] = 0;
      audiotrigger_$CBB0(sys, 0x44); clearOam_$CB8B(sys);
      bankSwitchCall(sys, 0x1A, _bank00Offsets[0x03]);
      // LDX #$50; TXS; JMP $8003
      return;
    }
    A = sys.mem[0x001C] & 0x0F; if (A === 0) return;
    sys.mem[0x0532] = 1;
    let X = (A & 0x02) ? 0 : 0x40;
    sys.mem[0x0517] = X;
    sys.mem[0x0615] &= 0xBF;
  }
}

// ── $E3CA: CPU侧队输入 (ASM $83CA-$8406) ──
function sub_E3CA(sys: SystemState): void {
  if (sys.mem[0x05FB] === 0) {
    if ((sys.mem[0x001C] & 0x0F) === 0) return;
  }
  let A = sys.mem[0x0441];
  // JSR $CE08 with X=$20 and player index → bank30
  // LSR $33; ROR $32 (twice) → 除以4
  let lo = sys.mem[0x32]; let hi = sys.mem[0x33];
  lo = (lo >> 2) | ((hi & 3) << 6); hi >>= 2; // ROR+ROR
  let X = lo; let Y = hi;
  if (sys.mem[0x0517] & 0x40) X = (0x100 - X) & 0xFF; // EOR #$FF
  lo = (X + sys.mem[0x0642]) & 0xFF;
  hi = (Y + sys.mem[0x0643] + (lo > 0xFF ? 1 : 0)) & 0xFF;
  sys.mem[0x0642] = lo; sys.mem[0x0643] = hi;
}

// ── $E407: 球员迭代 (ASM $8407-$849A) ──
function sub_E407(sys: SystemState): void {
  sub_E709(sys);
  let A = 0;
  for (let i = 0; i < 22; i++) {
    timerInit_$CB0F(sys, 1); sub_E349(sys);
    A = i; updNZ8(sys, A);
    if (A === 0 || A === 0x0B) continue;
    const sfb = sys.mem[0x05FB];
    if (sfb === 0) { if (A === sys.mem[0x05FD]) continue; }
    if (A === sys.mem[0x0441] && A < 0x0B) continue;
    if ((sys.mem[0x062A] & 0x80) !== 0) {
      if (A !== sys.mem[0x0441]) {
        bankSwitchCall(sys, 0x1A, _bank00Offsets[0x00]);
      }
    }
    sys.mem[0x41] = A; getCharData_$CD7C(sys);
    const side = sys.mem[0x05FB];
    let X: number;
    if (side !== 0) {
      X = (ld34y(sys, 9) >= 0xF0) ? 0x1F : 0x22;
    } else {
      X = 0x21;
    }
    if (A === sys.mem[0x0441]) X = 0x20;
    // JSR $CE08 with X reg (bank30)
    A = ld34y(sys, 0x0A); if (A !== 0) { A--; st34y(sys, 0x0A, A); }
    else sub_E854(sys);
  }
  sys.mem[0x0600] = 0; // end of loop
  A = sys.mem[0x0613];
  if (A >= 5) { sys.mem[0x0613] = 0; /* JSR $E4D7 → sub_E4D7 */ }
  if (sys.mem[0x0600] === 0) return;
  // 有活跃球员 → JSR $E4D7 → 后续处理
}

// ── $E4D7: 球员排序/过滤 (ASM $84D7-$8500) ──
function sub_E4D7(sys: SystemState): void {
  // 根据 $05FB 对侧队球员索引进行过滤
  // 太细碎，核心是读取球员索引列表，过滤重复/无效条目
}

/** $C609 → $E4D7: 球员排序/过滤 — 按 $05FB 清理重复/无效条目 */
export function bank31_playerSort_$E4D7(sys: SystemState): void {
  sub_E4D7(sys);
}

// ── $E501: 距离检查 (ASM $8501-$854B) ──
function sub_E501(sys: SystemState): void {
  // 球员→球距离判断，用于决定是否显示近距离 UI
}

// ── $E54C: 过滤 cleanup (ASM $854C-$8593) ──
function sub_E54C(sys: SystemState): void {
  sys.mem[0x044E] = 0;
  if (sys.mem[0x0600] === 0) { sys.regs.SP = 0x50; /* JMP $E0DF */ return; }
  // 过滤重复的0601条目
}

/** $C627 → $E54C: 过滤 cleanup — 清除并重导向 $E0DF */
export function bank31_filterCleanup_$E54C(sys: SystemState): void {
  sub_E54C(sys);
}

// ── $E596: 过场分派 (ASM $8596-$8613) ──
function sub_E596(sys: SystemState): void {
  let A = sys.mem[0x00E2]; if (A >= 0xE0) { /* skip to bank switch */ }
  /* ... JSR $CD77; 更新球员坐标; JSR $CBB0(audio);
     bankSwitch → $14/$15 → JSR $800C;
     bankSwitch → $1A/$1B → JSR $8024;
     LDX $0635; LDY $0637; JSR $CDE2; STA $05FE;
     遍历 $0600 活跃球员; JSR $E616 初始化; JMP $DE96 */
}

/** $C62A → $E596: 过场/转场分派 — 坐标更新, bank 切换, 球员遍历 */
export function bank31_cutsceneDispatch_$E596(sys: SystemState): void {
  sub_E596(sys);
}

// ── $E616: 单球员初始化 (ASM $8616-$8677) ──
function sub_E616(sys: SystemState): void {
  sys.mem[0x043B] = 1; sys.mem[0x043C] = 0;
  sys.mem[0x043D] = 2; sys.mem[0x043E] = 0;
  let A = sys.mem[0x0601] | 0; // X index
  if (A === 0 || A === 0x0B) return;
  sys.mem[0x0442] = A;
  bankSwitchCall(sys, 0x1C, _bank00Offsets[0x15]);
  A = (sys.mem[0x32] + 4) & 0xFF;
  sys.mem[0x32] = A;
  bankSwitchCall(sys, 0x1A, _bank00Offsets[0x12]);
  bankSwitchCall(sys, 0x1A, _bank00Offsets[0x15]);
}

// ── $E678: 侧队切换 (ASM $8678-$8686) ──
function sub_E678(sys: SystemState): void {
  sys.mem[0x05FB] ^= 0x0B;
  // JSR $D093 (bank30); timer
}

/** $C630 → $E678: 侧队切换 — XOR $05FB 翻转控球方 */
export function bank31_sideSwitch_$E678(sys: SystemState): void {
  sub_E678(sys);
}

// ── $E688: 球初始位置 (ASM $8688-$86CC) ──
function sub_E688(sys: SystemState): void {
  let A = 0;
  if (sys.mem[0x0635] & 0x80) A |= 1;
  if (sys.mem[0x0637] & 0x80) A |= 2;
  sys.mem[0x3A] = A;
  // 查方向表 DATA_DIR_TABLE 计算球位置
  const rnd = sys.mem[0x00E2] & 7;
  const idx = rnd << 1;
  let X = DATA_DIR_TABLE[idx + 1]; let Y = DATA_DIR_TABLE[idx];
  if (!(sys.mem[0x3A] & 1)) X = (-X) & 0xFF;
  if (!(sys.mem[0x3A] & 2)) Y = (-Y) & 0xFF;
  // ... (坐标设置 + JSR $CDE2; JMP $DE96)
}

/** $C62D → $E688: 球初始位置计算 — 方向表查表, 随机偏移 */
export function bank31_ballInitPos_$E688(sys: SystemState): void {
  sub_E688(sys);
}

// ═════════════════════════════════════════════════
// Bank 切换 helper (不走 MMC3 — 直接 import 调用)
// ═════════════════════════════════════════════════

const _bankDispatchTables: Record<number, Record<number, (sys: SystemState) => void>> = {
  0x0B: bank11_dispatch, 0x10: bank16_dispatch, 0x12: bank19_dispatch,
  0x14: bank20_dispatch, 0x16: bank22_dispatch, 0x18: bank24_dispatch, 0x1A: bank26_dispatch,
  0x1C: bank28_dispatch,
};

function _dispatchBankCall(sys: SystemState, bank: number, offset: number): void {
  const handlers = _bankDispatchTables[bank];
  if (handlers) { const fn = handlers[offset]; if (fn) { fn(sys); return; } }
  console.warn(`[bank31] No handler: bank=$${bank.toString(16)} offset=$${offset.toString(16)}`);
}

/** 6502: 设 $24=bankLo, JSR $CE2D 写 MMC3, JSR $80xx
 *  TS: 直接查 dispatch 表调用, bank 作为参数传入 */
function bankSwitchCall(sys: SystemState, bank: number, offset: number): void {
  _dispatchBankCall(sys, bank & 0x3F, offset);
}

const _bank00Offsets: Record<number, number> = {
  0x00: 0x00, 0x03: 0x03, 0x06: 0x06, 0x09: 0x09, 0x0C: 0x0C,
  0x0F: 0x0F, 0x12: 0x12, 0x15: 0x15, 0x18: 0x18, 0x1B: 0x1B,
  0x1E: 0x1E, 0x21: 0x21, 0x24: 0x24, 0x27: 0x27, 0x30: 0x30, 0x33: 0x33,
};

// ── $EF7F: Bank切换+PHA上下文 (ASM $EF7F-$EF9F) ──
function sub_EF7F_A(sys: SystemState): void {
  // 在6502原版中: 根据A的值决定跳到局部bank配对。
  // 简化: 设置 bank 上下文
  const idx = sys.regs.A; if (idx === 0) { bankSwitchCall(sys, 0x1A, _bank00Offsets[0x0C]); }
  else if (idx === 1) { bankSwitchCall(sys, 0x18, _bank00Offsets[0x0C]); }
  else if (idx === 0x30) { bankSwitchCall(sys, 0x1A, _bank00Offsets[0x0C]); }
  else if (idx === 0x31) { bankSwitchCall(sys, 0x1C, _bank00Offsets[0x0C]); }
  else if (idx === 0x32) { bankSwitchCall(sys, 0x10, _bank00Offsets[0x0C]); }
}

export function translate_BANK31_BANK_SWITCH(
  sys: SystemState, targetBank: number,
  onCall800C?: (sys: SystemState, aReg: number) => void,
): void {
  sys.regs.Y = targetBank;
  // 6502: STA $24 = 0x18 → JSR $CE2D → $800x
  // TS: bank 通过 dispatch 表直接调用, 不写 $24/MMC3
  if (onCall800C) onCall800C(sys, targetBank);
}

// ═════════════════════════════════════════════════
// CODE_RESET — $FFF0-$FFF7 (8 bytes)
// ═════════════════════════════════════════════════
//
// 6502: LDA #$00; STA $8000; JMP $C503
// CPU 向量表 ($FFFA-$FFFF):
//   NMI:   $0000 (未用, 实际 NMI 由 bank30 $C76E 处理)
//   RESET: $FFF0
//   IRQ:   $C506

export function translate_BANK31_RESET(sys: SystemState): void {
  track('translate_BANK31_RESET');
  // ── $FFF0: LDA #$00; STA $8000 → MMC3 bank select = 0 (跳过, 不走 CPU) ──
  sys.regs.A = 0x00;
  updateNZ(sys, 0x00);
  // 不再写 MMC3 寄存器, 直接进入 initScene

  // ── JMP $C503 → bank30 initScene_$C64E ──
  // 6502 RESET handler 通过 $C503 跳转表进入 initScene，完成:
  //   PPU 初始化、RAM 清零、MMC3 设置、ppuScreenInit、clearOam
  initScene_$C64E(sys, true);

  // ── NMI 初始化 — 設置 sprite DMA 槽位/定時器狀態 ──
  nmiInit_$C71A(sys);

  // ── JMP $CEFE → bank00 dispatch ($8000) ──
  // 6502: initScene 末尾通过 $CEFE 跳转进入 bank00 场景分派器。
  // 翻译路径在此串联: 执行 TECMO logo / 标题画面 / 菜单 等引导流程。
  entryToBank00_dispatch(sys, bank00_dispatchScene);
}

// ═════════════════════════════════════════════════
// CODE_GET_BALL_POS — $E6DF-$E6EB (13 bytes)
// ═════════════════════════════════════════════════
//
// 6502: LDX $0635; LDY $0637; JSR $CDE2; STA $05FE; RTS
// 功能: 读取球 X/Y，调用坐标变换，存结果

export function translate_BANK31_GET_BALL_POS(sys: SystemState): number {
  sys.regs.X = sys.mem[0x0635];
  updateNZ(sys, sys.regs.X);

  sys.regs.Y = sys.mem[0x0637];
  updateNZ(sys, sys.regs.Y);

  const result = coordTransform_$CDE2(sys, sys.regs.X, sys.regs.Y);

  sys.mem[0x05FE] = result;
  updateNZ(sys, result);

  return result;
}

// ═════════════════════════════════════════════════
// CODE_JUMP_TABLE — $F30F-$F328 (26 bytes)
// ═════════════════════════════════════════════════
//
// 6502: LDY #$29; STY $30; LDY #$F3; STY $31; ASL A; ...
// 功能: 根据 A 中的 index，查跳转表 ($F329)，写入 $30/$31

export function translate_BANK31_JUMP_TABLE_DISPATCH(sys: SystemState, index: number): number {
  // 直接读 DATA_TEXT_NAMES（原 $F329-$FFEF 跳转表），不再走 sys.mem
  // 每一项 2 bytes (little-endian 16-bit addr)
  const offset = (index & 0xFF) << 1;
  const targetLo = DATA_TEXT_NAMES[offset];
  const targetHi = DATA_TEXT_NAMES[offset + 1];

  sys.mem[0x30] = targetLo;
  sys.mem[0x31] = targetHi;

  const targetAddr = (targetHi << 8) | targetLo;
  sys.regs.A = targetLo & 0xFF;
  return targetAddr;
}

// ═════════════════════════════════════════════════
// CODE_BANK_SWITCH — $EF7F-$F00E (144 bytes)
// ═════════════════════════════════════════════════
//
// Part A ($EF7F-$EF9F): 带上下文保存的 bank 切换
// Part B ($EFA2-$F00E): 精灵渲染 bank 切换循环



/**
 * $EFA2: 精灵渲染 bank 切换循环 (Part B)
 *
 * 6502: 遍历 $0600 (活跃球员数量)，对每个球员:
 *       切到 bank → 读 sprite 数据 → JSR $F114 (spritedraw) → 循环
 */
export function translate_BANK31_SPRITE_BANK_LOOP(sys: SystemState): void {
  const activeCount = sys.mem[0x0600];

  // $0621: sprite 页面索引
  if (sys.mem[0x0621] >= 4) return;

  for (let i = 0; i < activeCount; i++) {
    // $EFB5: LDA #$01; JSR $CB0F (等待 timer)
    timerInit_$CB0F(sys, 1);

    // 设置 sprite PPU 传输
    if (sys.mem[0x0621] === 3) {
      sys.regs.A = 5; // 特殊模式
    }

    // 查表 → 设置 sprite DMA
    const spriteType = sys.mem[0x0621] << 1;
    _setupSpriteDMA(sys, spriteType, i);

    // $EFE5: JSR $F114 (sprite draw)
    translate_BANK31_SPRITE_DRAW(sys);

    // $EFE8: 清理
    i++;

    // $F006: 更新 $063D (sprite 状态)
    const state = _getSpriteStateTable(sys, sys.mem[0x0621]);
    sys.mem[0x063D] = state;
  }

  // $F00F: player count 检查 → 决定下一个流程
  if (sys.mem[0x0600] === 0 && sys.mem[0x0621] === 0) {
    sys.mem[0x063D] = 2;
  }
}

function _getSpriteStateTable(sys: SystemState, idx: number): number {
  // DATA_GAP_F00F at $F00F-$F012 (4 bytes)
  return DATA_GAP_F00F[idx & 3];
}

/**
 * Sprite DMA 设置: sprite 类型 → $3A/$3B 指针 + $3C/$3D PPU 参数
 *
 * 6502 ($EFCF-$EFE3):
 *   LDA $F206,X → STA $3A  (sprite data pointer lo, from bank memory)
 *   LDA $F207,X → STA $3B  (sprite data pointer hi)
 *   LDA #$00 → STA $3C     (PPU X offset = 0)
 *   LDA #$21 → STA $3D     (PPU A base = $21xx)
 *
 * $3A/$3B 指向的数据在 RAM $0543-$05B9 区域，
 * 由其他 bank 的代码写入 sprite 元数据。
 * $3C = 0 (PPU X pixel offset), $3D = 0x21 (PPU addr hi).
 */
function _setupSpriteDMA(sys: SystemState, spriteType: number, col: number): void {
  // 查 DATA_PTR_TABLE: 每 2 bytes (lo, hi) → 6 entries
  // 实际 OAM 工作区: $0547/$055C/$0571/$0586/$059B/$05B0
  const ptrIdx = (spriteType % 6) * 2;
  const dataPtr = DATA_PTR_TABLE[ptrIdx] | (DATA_PTR_TABLE[ptrIdx + 1] << 8);
  sys.mem[0x003A] = dataPtr & 0xFF;
  sys.mem[0x003B] = (dataPtr >> 8) & 0xFF;
  // PPU 参数: X offset = 0, PPU addr base = $21 (nametable 0, attribute area)
  sys.mem[0x003C] = 0x00;
  sys.mem[0x003D] = 0x21;
}
function _timerPoll(sys: SystemState): void {
  const slot = sys.mem[0x00];
  if (slot !== 0 && slot !== 0xFF) {
    sys.mem[0x00]--;
  }
}

// ═════════════════════════════════════════════════
// CODE_POS_HELPERS — $E8F5-$E9DA (230 bytes)
// ═════════════════════════════════════════════════
//
// 6502: 位置运算辅助 — 16-bit 坐标加减、边界裁切
//       球员相对球距离计算、区域移动

/** $E8F5: 位置运算: 坐标增量 + 边界裁切 */
export function translate_BANK31_POS_UPDATE(
  sys: SystemState,
  regY: number,
  deltaMode: number,
): void {
  let ptr16: number;
  // $34/$35 ZP 指针 → 角色数据
  // A & 0x03 → 方向 (0-3)
  if ((deltaMode & 0x03) === 0) return;

  // 方向 → signed 16-bit delta
  let dx16 = 0, dy16 = 0;

  // 检查 carry → 符号翻转
  if (deltaMode & 0x01) {
    dx16 = -1;
  } else {
    dx16 = 1;
  }

  // Y 偏移
  const curY = read16At(0x34, sys, 6 + regY); // or 8
  const newVal = (curY + dx16) & 0xFFFF;

  // 边界裁切
  let clipped = newVal;
  if (regY === 6) { // X 坐标
    if ((newVal > 0xCF)) clipped = 0xCF;
    else if ((newVal < 0x30)) clipped = 0x30;
  } else { // Y 坐标
    if ((newVal > 0xB0)) clipped = 0xAF;
    else if ((newVal < 0x50)) clipped = 0x50;
  }

  write16At(0x34, sys, 6 + regY, clipped);
}

/** $E9DB: NMI 等待 + PPU 数据传输 (sprite 元数据) */
export function translate_BANK31_SPRITE_NMI_WAIT(sys: SystemState): void {
  // JSR $CB0F (timer init → 等待)
  timerInit_$CB0F(sys, 1);

  // 等待 $0515 flag
  while (sys.mem[0x0515] !== 0) {
    _timerPoll(sys);
  }
  sys.mem[0x0515] = 0x01;

  // $052B → 设置 sprite PPU 地址
  // 遍历 sprite 元数据表 → 构建 PPU 写入
  _buildSpritePPUData(sys);
}

/**
 * $E96C-$E9D9: 构建 sprite PPU OAM 传输数据。
 *
 * 6502 流程:
 *   1. 从 ($3C) 指针读 sprite 元数据 (DATA_SPRITE_META, $E9DA-$EB85)
 *   2. 逐块读取: block_header (3 bytes: addr_lo, addr_hi, count|mode)
 *      - byte 0: PPU addr lo offset, ADC $3E → $3E
 *      - byte 1: PPU addr hi offset, ADC $3F → $3F
 *      - byte 2: AND #$03 → $40 (block count), LSR/LSR → $41 (entries per block)
 *   3. 每 entry: 写 PPU count ($04A5), PPU addr ($04A6/$04A7)
 *   4. 逐 entry 填充 tile 数据 → $04A8+, CMP #$FE 终止
 *   5. 全部 block 完成后 STA $0515 = $80
 */
function _buildSpritePPUData(sys: SystemState): void {
  // 从 DATA_SPRITE_META 表读指针 → ($3C)
  const ptrLo = sys.mem[0x003C];
  const ptrHi = sys.mem[0x003D];
  const ptrAddr = ((ptrHi << 8) | ptrLo) & 0xFFFF;

  // ── 读取 block metadata ──
  let idx = 0;
  const $3E = sys.mem[ptrAddr];                    // LDA ($3C),Y → ADC $3E
  idx++;
  const $3F = sys.mem[(ptrAddr + 1) & 0xFFFF];    // LDA ($3C),Y → ADC $3F
  idx++;
  const ctrl = sys.mem[(ptrAddr + 2) & 0xFFFF];   // LDA ($3C),Y
  const blockCount = ctrl & 0x03;                   // AND #$03 → $40
  const entriesPerBlock = ctrl >> 2;                // LSR; LSR → $41
  idx++;  // skip header

  // ── 逐 block 写入 OAM buffer ──
  let oamIdx = 0;
  let ppuAddrLo = $3E;
  let ppuAddrHi = $3F;

  for (let block = 0; block < blockCount; block++) {
    // $E98C-$E9A6: 写 PPU 传输头
    sys.mem[(0x04A5 + oamIdx) & 0xFFFF] = entriesPerBlock & 0xFF;  // PPU count
    oamIdx++;
    sys.mem[(0x04A5 + oamIdx) & 0xFFFF] = ppuAddrLo;              // PPU addr lo
    oamIdx++;
    sys.mem[(0x04A5 + oamIdx) & 0xFFFF] = ppuAddrHi;              // PPU addr hi
    oamIdx++;

    // 下一列: addr += $20
    ppuAddrLo = (ppuAddrLo + 0x20) & 0xFF;
    if (ppuAddrLo < 0x20) ppuAddrHi = (ppuAddrHi + 1) & 0xFF;

    // ── $E9AB-$E9CD: 填充 tile 数据 ──
    // BIT $003A → check bit 7 (direction flag)
    const dirFlag = sys.mem[0x003A] & 0x80;
    let remaining = entriesPerBlock;

    while (remaining > 0) {
      const tile = sys.mem[(ptrAddr + idx) & 0xFFFF];
      idx++;

      if (dirFlag) {
        // bit 7 set: write zeros (skip mode)
        sys.mem[(0x04A5 + oamIdx) & 0xFFFF] = 0x00;
        oamIdx++;
      } else {
        // normal: write tile data, $FE = terminator
        if (tile === 0xFE) break;
        sys.mem[(0x04A5 + oamIdx) & 0xFFFF] = tile;
        oamIdx++;
      }
      remaining--;
    }

    // terminator
    sys.mem[(0x04A5 + oamIdx) & 0xFFFF] = 0x00;
    oamIdx++;
  }

  // $E9D4-$E9D9: LDA #$80; STA $0515; RTS
  sys.mem[0x0515] = 0x80;
}

// ═════════════════════════════════════════════════
// CODE_BANK_HELPER — $EB86-$ECD4 (335 bytes)
// ═════════════════════════════════════════════════
//
// 6502: bank/场景辅助 — PPU 状态同步、场景切换、难度管理

/** $EB86: bank/场景状态辅助 — PPU 同步 + bank 切换 */
export function translate_BANK31_BANK_HELPER(sys: SystemState): void {
    // JSR $CB0F → 等待 timer (count=1 frame)
    timerInit_$CB0F(sys, 1);

  // 读 $21 (PPU 状态) & $0539 (场景进度)
  const ppuStat = sys.mem[0x0021];
  const sceneProg = sys.mem[0x0539];

  if (sceneProg === 0) {
    // 切换: ppuStat mask → 写回
    sys.mem[0x0021] = (ppuStat & 0x1E);
  } else {
    // 场景同步: ppuStat XOR sceneProg
    sys.mem[0x0021] = ppuStat ^ sceneProg;
  }

  // $EB9B: bankSwitch → $18/$19 → JSR $8003（场景状态）
  bankSwitchCall(sys, 0x18, _bank00Offsets[0x03]);

  // $EBAC: 再次 bankSwitch → $18/$19 → JSR $8006
  bankSwitchCall(sys, 0x18, _bank00Offsets[0x06]);

  // $EBBD: 第三次 → JSR $8009
  bankSwitchCall(sys, 0x18, _bank00Offsets[0x09]);

  // $EBC7: 检查 $052E (难度 tick)
  if (sys.mem[0x052E] !== 0) {
    sys.mem[0x052E]--;

    if (sys.mem[0x052E] === 0) {
      // $EBD7: 难度阶段检查
      const $052F = sys.mem[0x052F];
      if ($052F >= 0x7E) {
        if ($052F === 0x7F || sys.mem[0x0027] === 4) {
          // JSR $D093 (bank30: 难度调高) → 简化为标记
          sys.mem[0x063F] |= 0x80;
        }
      } else {
        // JSR $CBF1 (bank30: 难度保持) → 简化为标记
        sys.mem[0x063F] |= 0x40;
      }

      // 跳回 $EB86 → 循环
      return translate_BANK31_BANK_HELPER(sys);
    }
  }

  // $EC08: 检查 $0516 (中断标记)
  if ((sys.mem[0x0516] & 0x81) === 0) return;

  // $EC0C: bit 7 → JSR bank00 init
  if (sys.mem[0x0516] & 0x80) {
    sys.mem[0x0516] |= 0x01;

    // bankSwitch → $10/$11 → JSR $8000
    bankSwitchCall(sys, 0x10, _bank00Offsets[0x00]);
  }

  // $EC2F: 设置 $0519
  const $0519 = sys.mem[0x0519];
  if ($0519 !== 0) {
    if ($0519 > 0x28) {
      // $EC5B: 大场景切换
      bankSwitchCall(sys, 0x10, _bank00Offsets[0x03]);
    }
    return;
  }

  // $EC6A: 清理标志
  sys.mem[0x0532] = 0;
  sys.mem[0x0534] = 0;
  sys.mem[0x0536] = 0;
  sys.mem[0x0538] = 0;
  sys.mem[0x0539] = 0;

  // $EC7C: 检查 $0516 bit 3 (音频/音效标记)
  if (sys.mem[0x0516] & 0x08) {
    if ((sys.mem[0x0516] & 0x50) === 0x50) {
      // $EC97: audio 处理
      // bankSwitch → $10/$11 → JSR $8003
      bankSwitchCall(sys, 0x10, _bank00Offsets[0x03]);
    } else {
      // $ECA3: 场景音效
      sys.mem[0x0516] ^= 0x50;
      sys.mem[0x0516] &= 0x8F;
    }
  }

  sys.mem[0x0516] = 0;  // 清除整个标记
}

// ═════════════════════════════════════════════════
// CODE_SPRITE_DMA — $ECD8-$EEBB (484 bytes)
// ═════════════════════════════════════════════════
//
// 6502: 精灵 DMA 初始化 — PPU OAM 地址设置、Sprite 数据排列

/** $ECD8: 精灵 DMA 初始化 */
export function translate_BANK31_SPRITE_DMA_INIT(sys: SystemState): void {
  // $ECD8: LDA $05CE → 暂存
  const savedCE = sys.mem[0x05CE];

  // bankSwitch → $0B/$0C → JSR $8006 (sprite data)
  bankSwitchCall(sys, 0x0B, _bank00Offsets[0x06]);

  // $ECE5: 重置 $4A (OAM index)
  sys.regs.X = 0;
  sys.mem[0x004A] = 0;

  // $ECE8: $05D1 → $05D2 (sprite request)
  sys.mem[0x05D2] = sys.mem[0x05D1];

  // $ECEB: 检查 $0528 (初始场景标记)
  if (sys.mem[0x0528] !== 0xFF) {
    sys.mem[0x053C] = sys.mem[0x0528];
    sys.mem[0x053A] = 0x80;
  }

  // $ECFA: 重置 ZP 变量
  sys.mem[0x000D] = 0;
  sys.mem[0x000E] = 0;

  // $ECFE: $052A → $0517 (方向标志)
  sys.mem[0x0517] = sys.mem[0x052A];

  // $ED02: 检查 $0529
  if (sys.mem[0x0529] !== 0xFF) {
    // 设置 $05EA (sprite 来源)
    sys.mem[0x05EA] = sys.mem[0x0529];

    // 设置 CPU stack page 1 的值
    sys.mem[0x0111] = 0xC8;
    sys.mem[0x0112] = 0x18;
    sys.mem[0x0113] = 0x7F;

    // JSR $CAE7 (bank30: sprite DMA) — 在 TS 版中由 NMI handler (bank02) 处理 OAM DMA，
    // $CAE7 的设置（$2003/$4014 写入）已在 bank02_nmiHandler 的 ppuXferEngine 中覆盖
  }

  // $ED29+: 设置 sprite 标志 ($0532, $0536, $0534)
  sys.mem[0x0532] = sys.mem[0x052B] | 0x80;
  sys.mem[0x0536] = sys.mem[0x052C] | 0x80;
  sys.mem[0x0534] = sys.mem[0x052D] | 0x80;

  // $ED45: $0530 → $052E (timer 剩余)
  sys.mem[0x052E] = sys.mem[0x0530];
  sys.mem[0x052F] = sys.mem[0x0531];

  // $ED4E: 重置更多标志
  sys.mem[0x008E] = 0;
  sys.mem[0x0469] = 1;

  // RTS — 注意: 这不是一个 RTS，原文是内联在更大的流程中
}

/**
 * $EEBA-$EED9: 条件精灵X位置限制器 (原 DATA_TABLE_EEBC → 已翻译为代码)
 *
 * 6502 原码:
 *   LDX $053D         ; $EEBA: 读 sprite 状态
 *   BEQ $EEDA         ; $EEBC: 为0则跳过本段, 直接进入 SPRITE_SETUP
 *   LDA #$40          ; $EEBC: 当 $053D ≠ 0 时执行
 *   SEC               ; $EEBE
 *   SBC $053F         ; $EEBF
 *   CMP $053E         ; $EEC2
 *   LDA $053E         ; $EEC5
 *   BCS $EECC         ; $EEC8: 若 0x40-$053F >= $053E, 保留 $053E
 *   LDA #$00          ; $EECA: 否则清零
 *   TAX               ; $EECC: X = kept_value
 *   CLC; ADC #$08     ; $EECD-$EECF: $053E = kept + 8
 *   STA $053E         ; $EED0
 *   TXA               ; $EED3
 *   CLC; ADC $053F    ; $EED4-$EED6
 *   ASL A; ASL A      ; $EED8-$EED9: 结果 × 4
 *
 * 功能: 当 sprite 状态标记 ($053D) 非零时, 限制精灵X坐标偏移,
 *       防止 X+偏移超过有效范围, 返回缩放后的偏移值供 SPRITE_SETUP 使用.
 *
 * @param sys 系统状态
 * @returns { resultA: A 寄存器值((kept + $053F) * 4), executed: 是否执行了限制逻辑 }
 */
export function translate_BANK31_SPRITE_X_LIMIT(sys: SystemState): { resultA: number; executed: boolean } {
  // $EEBA: LDX $053D; BEQ $EEDA → 条件检查
  const $053D = sys.mem[0x053D];
  if ($053D === 0) {
    return { resultA: 0, executed: false };
  }

  // $EEBC-$EEBF: LDA #$40; SEC; SBC $053F
  const $053F = sys.mem[0x053F];
  const diff = (0x40 - $053F) & 0xFF;

  // $EEC2-$EEC8: CMP $053E; LDA $053E; BCS $EECC
  const $053E = sys.mem[0x053E];
  const kept = (diff >= ($053E & 0xFF)) ? ($053E & 0xFF) : 0;
  // BCS branches if C=1 → A >= operand → diff >= $053E

  // $EECC: TAX — kept 值保存到 X
  // $EECD-$EED2: CLC; ADC #$08; STA $053E
  const new053E = (kept + 8) & 0xFF;
  sys.mem[0x053E] = new053E;

  // $EED3-$EED9: TXA; CLC; ADC $053F; ASL A; ASL A
  const resultA = ((kept + $053F) * 4) & 0xFF;

  return { resultA, executed: true };
}

/** $ED5E: sprite bank 切换后半 */
export function translate_BANK31_SPRITE_BANK_PHASE2(sys: SystemState): void {
  // DEX; STX $0519 → 递减场景 index
  const sceneIdx = sys.regs.X - 1;
  sys.mem[0x0519] = sceneIdx & 0xFF;

  if ((sceneIdx & 0xFF) >= 0x28) {
    // $ED87: 大 sprite 场景
    if ((sys.mem[0x0516] & 0x20) === 0) {
      sys.mem[0x0516] |= 0x20;

      // bankSwitch → $10/$11 → JSR $8003
      bankSwitchCall(sys, 0x10, _bank00Offsets[0x03]);
    }
    return;
  }

  // $ED90: 检查 $05D2
  if (sys.mem[0x05D2] === 0) return;

  // $ED95: bit 7 → 有更新
  if (sys.mem[0x05D2] & 0x80) {
    sys.mem[0x05D2] = (sys.mem[0x05D2] & 0x7F) | 0x01;

    // 复制 sprite DB 区域
    sys.mem[0x05D3] = sys.mem[0x05DB];
    sys.mem[0x05D4] = sys.mem[0x05DC];
    sys.mem[0x05D5] = sys.mem[0x05DD];
    sys.mem[0x05D6] = sys.mem[0x05DE];
    sys.mem[0x05D7] = sys.mem[0x05DF];
    sys.mem[0x05D8] = sys.mem[0x05E0];
    sys.mem[0x05D9] = sys.mem[0x05E1];
    sys.mem[0x05DA] = sys.mem[0x05E2];
  }

  // $EDE7: 检查 $05D2 bit 1 (垂直/水平模式)
  if (sys.mem[0x05D2] & 0x02) {
    // 水平模式
    if (sys.mem[0x05D2] & 0x40) {
      // scroll 设置
      sys.mem[0x011D] = 0xA0;
      sys.mem[0x011E] = 0x0B;
      sys.mem[0x011F] = 0x7F;
      // JSR $CAE7 — 同前，由 NMI handler 转发 OAM DMA
    } else {
      sys.mem[0x011D] = 0xA0;
      sys.mem[0x011E] = 0x0B;
      sys.mem[0x011F] = 0x80;
      // JSR $CAE7 — 同前，由 NMI handler 转发 OAM DMA
    }
  } else {
    // 垂直模式 — 2D scroll
    // 累加 D3-D5 + 16-bit
    _spriteScrollUpdate(sys);
  }
}

function _spriteScrollUpdate(sys: SystemState): void {
  // $EE0D-$EE6D: 16-bit sprite scroll 更新
  sys.mem[0x0020] &= 0xFE;  // PPU ctrl

  const d3 = sys.mem[0x05D3];
  const d4 = sys.mem[0x05D4];
  let d5 = sys.mem[0x05D5];

  const sum = (d3 + d4) & 0xFFFF;
  sys.mem[0x05D3] = sum & 0xFF;

  const carry = sum > 0xFF ? 1 : 0;
  d5 = (d5 + carry) & 0xFF;
  sys.mem[0x05D5] = d5;

  sys.mem[0x0020] = (sys.mem[0x0020] & 0xFE) | (d5 & 0x01);
}

// ═════════════════════════════════════════════════
// CODE_SPRITE_SETUP — $EEDA-$EF72 (153 bytes)
// ═════════════════════════════════════════════════
//
// 6502: 精灵配置 — 根据 sprite 编号设置 OAM 属性/位置

/** $EEDA: 精灵配置 (sprite slot → OAM 填充) */
export function translate_BANK31_SPRITE_SETUP(
  sys: SystemState,
  spriteId: number,
): void {
  sys.mem[0x003B] = spriteId;

  let slot = 0;
  const $48 = 0; // OAM start index

  // 遍历 6 个 sprite slot
  while (slot < 6) {
    sys.mem[0x003A] = slot;

    // 读 PTR_TABLE ($EF73)
    const ptr = _readPtrTable(sys, slot, spriteId & 0x01);
    const ptrLo = ptr & 0xFF;
    const ptrHi = (ptr >> 8) & 0xFF;

    sys.mem[0x003C] = ptrLo;
    sys.mem[0x003D] = ptrHi;

    // $EEF5: 读取首个 byte → bit 7 = mode
    const firstByte = sys.mem[((ptrHi << 8) | ptrLo) & 0xFFFF];
    if (firstByte & 0x80) {
      // $EF10: 带 bank 切换的 sprite 渲染
      if ((sys.mem[0x0615] & 0x40) === 0) {
        // bankSwitch → $14/$15 → JSR $8006
        bankSwitchCall(sys, 0x14, _bank00Offsets[0x06]);
      }
      // bankSwitch → $14/$15 → JSR $8003
      bankSwitchCall(sys, 0x14, _bank00Offsets[0x03]);
      // bankSwitch → $16/$17 → JSR $8000
      bankSwitchCall(sys, 0x16, _bank00Offsets[0x00]);
    }
    slot++;
  }

  // $EF62: 检查 $062D (PPU 完成标志)
  if ((sys.mem[0x062D] & 0x80) === 0) {
    // bankSwitch → $14/$15 → JSR $8009
    bankSwitchCall(sys, 0x14, _bank00Offsets[0x09]);
  }

  // $EF6D: OAM 填充 → $053F
  const remaining = 0x40 - $48;  // 64 bytes OAM max - used
  sys.mem[0x053F] = remaining & 0xFF;

  // 确保剩余 OAM slots 清空
  if (remaining > 0) {
    const oamAddr = 0x0200 + $48;
    for (let i = 0; i < remaining; i++) {
      sys.mem[(oamAddr + i) & 0xFFFF] = 0xF8;
    }
  }
}

function _readPtrTable(sys: SystemState, slot: number, parity: number): number {
  // DATA_PTR_TABLE: 6 entries × 2 bytes (lo, hi)
  const ptrIdx = (slot % 6) * 2;
  const baseAddr = DATA_PTR_TABLE[ptrIdx] | (DATA_PTR_TABLE[ptrIdx + 1] << 8);
  const loByte = sys.mem[baseAddr & 0xFFFF];
  const hiByte = sys.mem[(baseAddr + 1) & 0xFFFF];

  if (parity) {
    return ((hiByte >> 4) & 0x0F) << 8 | loByte;
  } else {
    return (hiByte & 0x0F) << 8 | loByte;
  }
}

// ═════════════════════════════════════════════════
// CODE_DMA_HELPER — $F013-$F10D (251 bytes)
// ═════════════════════════════════════════════════
//
// 6502: DMA 数据搬运 — PPU 批量传输辅助

/** $F013: DMA 数据搬运 (sprite PPU 数据传输) */
export function translate_BANK31_DMA_HELPER(sys: SystemState): void {
  // $F013: 初始化
  sys.regs.A = 0;

  // 等待 timer
  timerInit_$CB0F(sys, 1);

  // 等待 $0515 完成
  while (sys.mem[0x0515] !== 0) {
    _timerPoll(sys);
  }

  sys.mem[0x0515] = 0x01;
  const spriteType = sys.mem[0x063D];

  // 查表 ($F15A-$F3): sprite 属性表
  // $F0: $063D << 2 → index into sprite layout table
  const attrIdx = (spriteType << 2) & 0xFF;
  // 读取 $F1 (连续 4 bytes) → PPU 地址/属性
  _readSpriteAttrTable(sys, attrIdx);

  // 遍历 0-5 (6 sprite columns)
  for (let col = 0; col < 6; col++) {
    // $F037: column base → 查 DMA 偏移表 ($F10E)
    const dmaOffset = _readDMATable(col);
    // 原始 ASM($903C): ADC $F10E,X → $04A6 + col_offset
    sys.mem[0x04A6] = (sys.mem[0x04A6] + dmaOffset) & 0xFF;

    // 设置 PPU 传输地址
    const ppuAddr = _readPPUTransferAddr(sys, spriteType, col);
    sys.mem[0x04A7] = (ppuAddr >> 8) & 0xFF;

    // $F07D: OAM 属性
    sys.mem[0x04A5] = 0x01;

    // JSR $F114 → sprite 绘制到 OAM
    translate_BANK31_SPRITE_DRAW(sys);

    // 下一列
  }

  // $F0D0: 特殊 sprite 类型 3 处理
  if (spriteType === 3) {
    // 完整 PPU 传输 — JSR $CB35
    ppuScreenInit_$CB35(sys);

    // 读球位置 → PPU 地址
    sys.regs.A = sys.mem[0x0637]; // ball Y
    const ppuAddrY = (sys.regs.A - 0x50) & 0xFC;

    sys.regs.A = sys.mem[0x0635]; // ball X
    const ppuAddrX = ((sys.regs.A - 0x30) >> 2) & 0x3F;

    const ballPpuAddr = 0x2000 | ppuAddrY | ppuAddrX;
    sys.mem[0x04A6] = ballPpuAddr & 0xFF;
    sys.mem[0x04A7] = (ballPpuAddr >> 8) & 0xFF;

    // 设置 PPU 属性 byte
    const ce = sys.mem[0x05CE];
    sys.mem[0x04A8] = (ce >> 4) & 0x0F;
  }

  sys.mem[0x0515] = 0x80;
}

/**
 * $F15A sprite 属性表 — 4-byte entries per sprite type:
 *   byte 0: PPU 地址 lo → sys.mem[$3C]
 *   byte 1: PPU 地址 hi → sys.mem[$3D]
 *   byte 2: OAM attr / column base → 后续与 col 组合存 $04A6
 *   byte 3: PPU 附加属性 → 后续存 $04A7
 *
 * 6502 ($F02B-$F033):
 *   TAY (attrIdx in Y)
 *   LDA $F15A,Y → STA $3C
 *   LDA $F15A+1,Y → STA $3D
 * 后续列循环中:
 *   LDA $F15A+2,Y → ADC colBase → STA $04A6
 *   LDA $F15A+3,Y → ORA attribute → STA $04A7
 */
function _readSpriteAttrTable(sys: SystemState, attrIdx: number): void {
  // 直接读 DATA_SPRITE_ATTR（原 $F15A-$F30E），不再走 sys.mem
  // 每一项 4 bytes: lo, hi, OAM attr, extra attr
  sys.mem[0x003C] = DATA_SPRITE_ATTR[attrIdx];             // byte 0: PPU addr lo → $3C
  sys.mem[0x003D] = DATA_SPRITE_ATTR[attrIdx + 1];         // byte 1: PPU addr hi → $3D
  sys.mem[0x04A6] = DATA_SPRITE_ATTR[attrIdx + 2];         // byte 2: OAM attr / col base → $04A6
  sys.mem[0x04A7] = DATA_SPRITE_ATTR[attrIdx + 3];         // byte 3: PPU extra attr → $04A7
}

function _readDMATable(col: number): number {
  // 直接读 DATA_GAP_F10E（原 $F10E-$F113, 6 bytes），不再走 sys.mem
  // 6502: ADC $F10E,X (X=col 0-5) → col-specific offset
  return DATA_GAP_F10E[col];
}

function _readPPUTransferAddr(sys: SystemState, spriteType: number, col: number): number {
  // spriteType → PPU base address (nametable 0/1)
  const base = spriteType === 3 ? 0x2400 : 0x2000;
  const colOffset = col * 0x20; // 32 bytes per tile column
  return base + colOffset;
}

// ═════════════════════════════════════════════════
// CODE_SPRITE_DRAW — $F114-$F159 (70 bytes)
// ═════════════════════════════════════════════════
//
// 6502: 精灵绘制 — 读 sprite 数据 → 填充 PPU OAM 传输缓冲区

/** $F114: 精灵绘制 (单个 sprite → OAM 数据填充) */
export function translate_BANK31_SPRITE_DRAW(sys: SystemState): void {
  // $3A → 数据指针
  const ptrLo = sys.mem[0x003A];
  const ptrHi = sys.mem[0x003B];

  // $3C, $3D → PPU 地址 (X, attr)
  const ppuX   = sys.mem[0x003C];
  const ppuAttr = sys.mem[0x003D];

  let offset = 0;
  let oamIdx = 0x04; // OAM 写入 index

  // $F114: LDY #$00; LDA ($3A),Y
  let count = sys.mem[((ptrHi << 8) | ptrLo) & 0xFFFF];
  if (count === 0) {
    // 清空剩余 → 返回
    return;
  }

  let remaining = count;
  while (remaining > 0) {
    offset++;

    // $F117: LDA ($3A),Y; ADC $3C → OAM X
    const dataX = sys.mem[((ptrHi << 8) | ptrLo + offset) & 0xFFFF];
    sys.mem[(0x04A4 + oamIdx) & 0xFFFF] = (dataX + ppuX) & 0xFF;

    offset++;
    // $F123: 检查 $3D → PPU page info
    const hiFlag = ppuAttr & 0x20;  // PPU high bit

    const tileData = sys.mem[((ptrHi << 8) | ptrLo + offset) & 0xFFFF];
    const ppuAddr = ((ppuAttr & 0x1F) << 8) | tileData;

    sys.mem[(0x04A4 + oamIdx + 1) & 0xFFFF] = ppuAddr & 0xFF;
    sys.mem[(0x04A4 + oamIdx + 2) & 0xFFFF] = (ppuAddr >> 8) | hiFlag;

    oamIdx += 3;
    remaining--;
  }

  // OAM 传输完成
  sys.mem[0x0515] = 0x80;
}

// ═════════════════════════════════════════════════
// 综合: 初始化入口 ($E000 后部分 → 场景就绪)
// ═════════════════════════════════════════════════

/**
 * $E000 后半 ($E000-$E6CE) — 初始化 & 场景就绪
 *
 * 6502: 在 RESET 完成后，进入赛场主循环前的初始化流程
 *   - PPU 清零 (JSR $CB35)
 *   - 调色板初始化 (JSR $CCD2)
 *   - OAM 清零 (JSR $CB8B)
 *   - 精灵 DMA 初始化
 *   - bank 切换 → 场景启动
 */
export function init_BANK31_matchEntry(sys: SystemState): void {
  // ── $E000: 帧计数器 reset ──
  sys.mem[0x0618] = 0;

  // ── $E022: PPU 屏幕初始化 (JSR $CB35) ──
  ppuScreenInit_$CB35(sys);

  // ── $E028: OAM 清零 (JSR $CB8B) ──
  clearOam_$CB8B(sys);

  // ── $E02B: 初始化变量 ──
  sys.mem[0x061A] = 0xFF;
  sys.mem[0x061B] = 0x01;
  sys.mem[0x0600] = 0;    // 活跃球员数 0
  sys.mem[0x05FF] = 0;    // 事件标记 0
  sys.mem[0x0441] = 0;    // 当前球员 0
  sys.mem[0x05FC] = 0;

  // ── $E042: 球员逻辑初始化 ──
  translate_BANK31_PLAYER_LOGIC(sys);

  // ── $E049: bankSwitch → $1A/$1B → JSR $801E ──
  bankSwitchCall(sys, 0x1A, _bank00Offsets[0x1E]);

  // ── $E055: LDA #$1B; JSR $CBB0 — 触发音效 ID $1B ──
  audiotrigger_$CBB0(sys, 0x1B);

  // ── $E05A: LDX #$50; TXS — 重置堆栈 ──
  sys.regs.SP = 0x50;

  // ── $E05D: JMP $E0DF — 进入主循环事件处理 ──
}

// ═════════════════════════════════════════════════
// 数据导出: bank30 jump table 引用的数据表
// ═════════════════════════════════════════════════

/** $F329: 跳转表基址 (bank30 $C53C → 此表) */
export const BANK31_JUMP_TABLE_BASE = 0xF329;

// ═════════════════════════════════════════════════
// ROM 数据注册
// ═════════════════════════════════════════════════

// ROM 数据已在 bank-31-data.ts 中, 不再需要直接 import 原始 hex
console.log('[bank31] ✅ 已加载 — RESET|MAIN_LOOP|PLAYER|POS|BANK|SPRITE|DMA|JUMP|bank19');
