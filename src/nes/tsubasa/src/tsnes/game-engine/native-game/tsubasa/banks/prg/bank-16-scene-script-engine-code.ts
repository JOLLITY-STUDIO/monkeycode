/**
 * Bank 16: Scene Logic/Script Engine ($8000-$9FFF)
 *
 * MMC3 可切换 bank。
 * 功能: 场景渲染/脚本引擎 — 场景数据解码、PPU 批量写入、脚本解释执行
 *
 * ═══════════════════════════════════════
 * 架构角色: Controller（场景脚本引擎）
 * ═══════════════════════════════════════
 *
 * 6502 Entry Points (JMP vectors at $8000):
 *   $8000 → JMP $8006 (scene dispatch init)
 *   $8003 → JMP $8021 (scene update/tick)
 *
 * Phase 2b: 骨架实现 — 字节码场景脚本解释器
 *   负责将 ROM 中的场景脚本数据（TECMO logo、标题画面等）解码并写入 PPU nametable
 *
 * 原始 hex: tsubasa-hex2asm/prg_banks/prg_bank_16_scene_logic.ts
 */

import type { SystemState } from '../system-state';
import { writeMem, readMem } from '../system-state';
import { track } from '../debug-log';

// ── 场景脚本/对白数据 bank（原始 MMC3 映射 bank 03/04/05/25） ──
import { getBank03Data } from './bank-03-code';
import { getBank04Data } from './bank-04-code';
import { getBank05Data } from './bank-05-code';
import { getBank25Data } from './bank-25-code';

// ── 关卡/场景元数据 bank-23 ──
import { getBank23Data } from './bank-23-code';


import {
  DATA_$80AF_$80CE,
  DATA_$8173_$81A8,
  DATA_$81A9_$81BC,
  DATA_$81BD_$8206,
  DATA_$82FE_$8316,
  DATA_$8317_$832C,
  DATA_$83D6_$83E3,
  DATA_$8442_$844D,
  DATA_$86E3_$8716,
  DATA_$8717_$8746,
  DATA_$8747_$8756,
  DATA_$8757_$876A,
  DATA_$876B_$8786,
  DATA_$8787_$87A0,
  DATA_$87A1_$87CF,
  DATA_$87D0_$87DF,
  DATA_$88FC_$890C,
  DATA_$89C7_$8A38,
  DATA_$8A39_$8A4E,
  DATA_$8A4F_$8A5E,
  DATA_$8A5F_$8A90,
  DATA_$8A91_$8AEB,
  DATA_$8AEC_$8BC0,
  DATA_$8BC1_$8C6E,
  DATA_$8C6F_$8CA3,
  DATA_$8CA4_$8CDB,
  DATA_$8CDC_$8D27,
  DATA_$8D28_$8D40,
  DATA_$8D41_$8D52,
  DATA_$8D53_$8D64,
  DATA_$8D65_$8D77,
  DATA_$8D78_$8D87,
  DATA_$8D88_$8DB2,
  DATA_$8DB3_$8DC2,
  DATA_$8DC3_$8DF2,
  DATA_$8DF3_$8E02,
  DATA_$8E03_$8E28,
  DATA_$8E29_$8E4E,
  DATA_$8E4F_$8E79,
  DATA_$8E7A_$8E95,
  DATA_$8E96_$8EAB,
  DATA_$8EAC_$8EB8,
  DATA_$8EB9_$8EDD,
  DATA_$8EDE_$8EF9,
  DATA_$8EFA_$8F08,
  DATA_$8F09_$8F2E,
  DATA_$8F2F_$8F63,
  DATA_$8F64_$8F76,
  DATA_$8F77_$8FAE,
  DATA_$8FAF_$8FF1,
  DATA_$8FF2_$901C,
  DATA_$901D_$902E,
  DATA_$902F_$9041,
  DATA_$9042_$9051,
  DATA_$9052_$9079,
  DATA_$907A_$90CC,
  DATA_$90CD_$90F2,
  DATA_$90F3_$9118,
  DATA_$9119_$913C,
  DATA_$913D_$9175,
  DATA_$9176_$9182,
  DATA_$9183_$91A7,
  DATA_$91A8_$91B4,
  DATA_$91B5_$91D2,
  DATA_$91D3_$91E9,
  DATA_$91EA_$92A8,
  DATA_$92A9_$92D8,
  DATA_$92D9_$9308,
  DATA_$9309_$93FA,
  DATA_$93FB_$9418,
  DATA_$9419_$9433,
  DATA_$9434_$9484,
  DATA_$9485_$94A8,
  DATA_$94A9_$94BA,
  DATA_$94BB_$94CF,
  DATA_$94D0_$9528,
  DATA_$9529_$9594,
  DATA_$9595_$95A0,
  DATA_$95A1_$95BB,
  DATA_$95BC_$95DB,
  DATA_$95DC_$95E8,
  DATA_$95E9_$95F4,
  DATA_$95F5_$9626,
  DATA_$9627_$965F,
  DATA_$9660_$9677,
  DATA_$9678_$9683,
  DATA_$9684_$96A9,
  DATA_$96AA_$96CD,
  DATA_$96CE_$96E1,
  DATA_$96E2_$972D,
  DATA_$972E_$974E,
  DATA_$974F_$9783,
  DATA_$9784_$9798,
  DATA_$9799_$97AA,
  DATA_$97AB_$97BF,
  DATA_$97C0_$97DA,
  DATA_$97DB_$97EF,
  DATA_$97F0_$97FE,
  DATA_$97FF_$9814,
  DATA_$9815_$982C,
  DATA_$982D_$9866,
  DATA_$9867_$9893,
  DATA_$9894_$98BF,
  DATA_$98C0_$98E0,
  DATA_$98E1_$98F9,
  DATA_$98FA_$990B,
  DATA_$990C_$9972,
  DATA_$9973_$99A6,
  DATA_$99A7_$9A2A,
  DATA_$9A2B_$9A3F,
  DATA_$9A40_$9A7F,
  DATA_$9A80_$9AF8,
  DATA_$9AF9_$9B81,
  DATA_$9B82_$9BBE,
  DATA_$9BBF_$9BCA,
  DATA_$9BCB_$9C58,
  DATA_$9C59_$9CBF,
  DATA_$9CC0_$9CDC,
  DATA_$9CDD_$9D17,
  DATA_$9D18_$9D2D,
  DATA_$9D2E_$9D39,
  DATA_$9D3A_$9D79,
  DATA_$9D7A_$9DC1,
  DATA_$9DC2_$9DE1,
  DATA_$9DE2_$9DF5,
  DATA_$9DF6_$9E20,
  DATA_$9E21_$9E2C,
  DATA_$9E2D_$9E44,
  DATA_$9E45_$9E5B,
  DATA_$9E5C_$9E9B,
  DATA_$9E9C_$9EC3,
  DATA_$9EC4_$9EED,
  DATA_$9EEE_$9F49,
  DATA_$9F4A_$9F87,
  DATA_$9F88_$9F9B,
  DATA_$9F9C_$9FB4,
  DATA_$9FB5_$9FFF,
} from './bank-16-scene-script-engine-data';

// ── ROM data chunk lookup (each chunk mapped by bank offset range) ──
const _DATA_CHUNKS: Array<{ offset: number; data: readonly number[] }> = [
  { offset: 0x00AF, data: DATA_$80AF_$80CE },
  { offset: 0x0173, data: DATA_$8173_$81A8 },
  { offset: 0x01A9, data: DATA_$81A9_$81BC },
  { offset: 0x01BD, data: DATA_$81BD_$8206 },
  { offset: 0x02FE, data: DATA_$82FE_$8316 },
  { offset: 0x0317, data: DATA_$8317_$832C },
  { offset: 0x03D6, data: DATA_$83D6_$83E3 },
  { offset: 0x0442, data: DATA_$8442_$844D },
  { offset: 0x06E3, data: DATA_$86E3_$8716 },
  { offset: 0x0717, data: DATA_$8717_$8746 },
  { offset: 0x0747, data: DATA_$8747_$8756 },
  { offset: 0x0757, data: DATA_$8757_$876A },
  { offset: 0x076B, data: DATA_$876B_$8786 },
  { offset: 0x0787, data: DATA_$8787_$87A0 },
  { offset: 0x07A1, data: DATA_$87A1_$87CF },
  { offset: 0x07D0, data: DATA_$87D0_$87DF },
  { offset: 0x08FC, data: DATA_$88FC_$890C },
  { offset: 0x09C7, data: DATA_$89C7_$8A38 },
  { offset: 0x0A39, data: DATA_$8A39_$8A4E },
  { offset: 0x0A4F, data: DATA_$8A4F_$8A5E },
  { offset: 0x0A5F, data: DATA_$8A5F_$8A90 },
  { offset: 0x0A91, data: DATA_$8A91_$8AEB },
  { offset: 0x0AEC, data: DATA_$8AEC_$8BC0 },
  { offset: 0x0BC1, data: DATA_$8BC1_$8C6E },
  { offset: 0x0C6F, data: DATA_$8C6F_$8CA3 },
  { offset: 0x0CA4, data: DATA_$8CA4_$8CDB },
  { offset: 0x0CDC, data: DATA_$8CDC_$8D27 },
  { offset: 0x0D28, data: DATA_$8D28_$8D40 },
  { offset: 0x0D41, data: DATA_$8D41_$8D52 },
  { offset: 0x0D53, data: DATA_$8D53_$8D64 },
  { offset: 0x0D65, data: DATA_$8D65_$8D77 },
  { offset: 0x0D78, data: DATA_$8D78_$8D87 },
  { offset: 0x0D88, data: DATA_$8D88_$8DB2 },
  { offset: 0x0DB3, data: DATA_$8DB3_$8DC2 },
  { offset: 0x0DC3, data: DATA_$8DC3_$8DF2 },
  { offset: 0x0DF3, data: DATA_$8DF3_$8E02 },
  { offset: 0x0E03, data: DATA_$8E03_$8E28 },
  { offset: 0x0E29, data: DATA_$8E29_$8E4E },
  { offset: 0x0E4F, data: DATA_$8E4F_$8E79 },
  { offset: 0x0E7A, data: DATA_$8E7A_$8E95 },
  { offset: 0x0E96, data: DATA_$8E96_$8EAB },
  { offset: 0x0EAC, data: DATA_$8EAC_$8EB8 },
  { offset: 0x0EB9, data: DATA_$8EB9_$8EDD },
  { offset: 0x0EDE, data: DATA_$8EDE_$8EF9 },
  { offset: 0x0EFA, data: DATA_$8EFA_$8F08 },
  { offset: 0x0F09, data: DATA_$8F09_$8F2E },
  { offset: 0x0F2F, data: DATA_$8F2F_$8F63 },
  { offset: 0x0F64, data: DATA_$8F64_$8F76 },
  { offset: 0x0F77, data: DATA_$8F77_$8FAE },
  { offset: 0x0FAF, data: DATA_$8FAF_$8FF1 },
  { offset: 0x0FF2, data: DATA_$8FF2_$901C },
  { offset: 0x101D, data: DATA_$901D_$902E },
  { offset: 0x102F, data: DATA_$902F_$9041 },
  { offset: 0x1042, data: DATA_$9042_$9051 },
  { offset: 0x1052, data: DATA_$9052_$9079 },
  { offset: 0x107A, data: DATA_$907A_$90CC },
  { offset: 0x10CD, data: DATA_$90CD_$90F2 },
  { offset: 0x10F3, data: DATA_$90F3_$9118 },
  { offset: 0x1119, data: DATA_$9119_$913C },
  { offset: 0x113D, data: DATA_$913D_$9175 },
  { offset: 0x1176, data: DATA_$9176_$9182 },
  { offset: 0x1183, data: DATA_$9183_$91A7 },
  { offset: 0x11A8, data: DATA_$91A8_$91B4 },
  { offset: 0x11B5, data: DATA_$91B5_$91D2 },
  { offset: 0x11D3, data: DATA_$91D3_$91E9 },
  { offset: 0x11EA, data: DATA_$91EA_$92A8 },
  { offset: 0x12A9, data: DATA_$92A9_$92D8 },
  { offset: 0x12D9, data: DATA_$92D9_$9308 },
  { offset: 0x1309, data: DATA_$9309_$93FA },
  { offset: 0x13FB, data: DATA_$93FB_$9418 },
  { offset: 0x1419, data: DATA_$9419_$9433 },
  { offset: 0x1434, data: DATA_$9434_$9484 },
  { offset: 0x1485, data: DATA_$9485_$94A8 },
  { offset: 0x14A9, data: DATA_$94A9_$94BA },
  { offset: 0x14BB, data: DATA_$94BB_$94CF },
  { offset: 0x14D0, data: DATA_$94D0_$9528 },
  { offset: 0x1529, data: DATA_$9529_$9594 },
  { offset: 0x1595, data: DATA_$9595_$95A0 },
  { offset: 0x15A1, data: DATA_$95A1_$95BB },
  { offset: 0x15BC, data: DATA_$95BC_$95DB },
  { offset: 0x15DC, data: DATA_$95DC_$95E8 },
  { offset: 0x15E9, data: DATA_$95E9_$95F4 },
  { offset: 0x15F5, data: DATA_$95F5_$9626 },
  { offset: 0x1627, data: DATA_$9627_$965F },
  { offset: 0x1660, data: DATA_$9660_$9677 },
  { offset: 0x1678, data: DATA_$9678_$9683 },
  { offset: 0x1684, data: DATA_$9684_$96A9 },
  { offset: 0x16AA, data: DATA_$96AA_$96CD },
  { offset: 0x16CE, data: DATA_$96CE_$96E1 },
  { offset: 0x16E2, data: DATA_$96E2_$972D },
  { offset: 0x172E, data: DATA_$972E_$974E },
  { offset: 0x174F, data: DATA_$974F_$9783 },
  { offset: 0x1784, data: DATA_$9784_$9798 },
  { offset: 0x1799, data: DATA_$9799_$97AA },
  { offset: 0x17AB, data: DATA_$97AB_$97BF },
  { offset: 0x17C0, data: DATA_$97C0_$97DA },
  { offset: 0x17DB, data: DATA_$97DB_$97EF },
  { offset: 0x17F0, data: DATA_$97F0_$97FE },
  { offset: 0x17FF, data: DATA_$97FF_$9814 },
  { offset: 0x1815, data: DATA_$9815_$982C },
  { offset: 0x182D, data: DATA_$982D_$9866 },
  { offset: 0x1867, data: DATA_$9867_$9893 },
  { offset: 0x1894, data: DATA_$9894_$98BF },
  { offset: 0x18C0, data: DATA_$98C0_$98E0 },
  { offset: 0x18E1, data: DATA_$98E1_$98F9 },
  { offset: 0x18FA, data: DATA_$98FA_$990B },
  { offset: 0x190C, data: DATA_$990C_$9972 },
  { offset: 0x1973, data: DATA_$9973_$99A6 },
  { offset: 0x19A7, data: DATA_$99A7_$9A2A },
  { offset: 0x1A2B, data: DATA_$9A2B_$9A3F },
  { offset: 0x1A40, data: DATA_$9A40_$9A7F },
  { offset: 0x1A80, data: DATA_$9A80_$9AF8 },
  { offset: 0x1AF9, data: DATA_$9AF9_$9B81 },
  { offset: 0x1B82, data: DATA_$9B82_$9BBE },
  { offset: 0x1BBF, data: DATA_$9BBF_$9BCA },
  { offset: 0x1BCB, data: DATA_$9BCB_$9C58 },
  { offset: 0x1C59, data: DATA_$9C59_$9CBF },
  { offset: 0x1CC0, data: DATA_$9CC0_$9CDC },
  { offset: 0x1CDD, data: DATA_$9CDD_$9D17 },
  { offset: 0x1D18, data: DATA_$9D18_$9D2D },
  { offset: 0x1D2E, data: DATA_$9D2E_$9D39 },
  { offset: 0x1D3A, data: DATA_$9D3A_$9D79 },
  { offset: 0x1D7A, data: DATA_$9D7A_$9DC1 },
  { offset: 0x1DC2, data: DATA_$9DC2_$9DE1 },
  { offset: 0x1DE2, data: DATA_$9DE2_$9DF5 },
  { offset: 0x1DF6, data: DATA_$9DF6_$9E20 },
  { offset: 0x1E21, data: DATA_$9E21_$9E2C },
  { offset: 0x1E2D, data: DATA_$9E2D_$9E44 },
  { offset: 0x1E45, data: DATA_$9E45_$9E5B },
  { offset: 0x1E5C, data: DATA_$9E5C_$9E9B },
  { offset: 0x1E9C, data: DATA_$9E9C_$9EC3 },
  { offset: 0x1EC4, data: DATA_$9EC4_$9EED },
  { offset: 0x1EEE, data: DATA_$9EEE_$9F49 },
  { offset: 0x1F4A, data: DATA_$9F4A_$9F87 },
  { offset: 0x1F88, data: DATA_$9F88_$9F9B },
  { offset: 0x1F9C, data: DATA_$9F9C_$9FB4 },
  { offset: 0x1FB5, data: DATA_$9FB5_$9FFF },
];

/** ROM 数据访问 — 按 bank offset 查找对应数据块 */
function rom16(offset: number): number {
  const bankOff = offset & 0x1FFF;
  for (const chunk of _DATA_CHUNKS) {
    if (bankOff >= chunk.offset && bankOff < chunk.offset + chunk.data.length) {
      return chunk.data[bankOff - chunk.offset];
    }
  }
  return 0;
}

// ═════════════════════════════════════════════════
// Scene script bytecode opcodes ($8000 entry)
// ═════════════════════════════════════════════════
//
// $8000/$8006: 场景脚本分派入口。
// 6502 原始: 从 $05EA 表的场景索引读取脚本指针 ($5D/$5E)，
// 然后逐字节解释执行场景脚本。
//
// 场景脚本格式 (bytecode):
//   < $F0: tile data → 写入 PPU nametable
//   ≥ $F0: 控制码 → 分发给子处理器
//     $F0-FE: 各控制码子功能
//     $FF: 脚本结束/RTS

/** $8000/$8006: 场景分派入口 — 场景脚本解释器 */
export function bank16_dispatchEntry(sys: SystemState): void {
  track('bank16_dispatchEntry', { sceneIdx: sys.mem[0x05EA] });

  // ── 从 $05EA 表读取场景脚本指针 ──
  // $8006: LDX $05EA; LDA $05EA+1  (actual offsets in ROM)
  // 读取 $5D/$5E 脚本指针
  const sceneIdx = sys.mem[0x05EA] || 0;
  const ptrLo = rom16(sceneIdx * 2);
  const ptrHi = rom16(sceneIdx * 2 + 1);

  if (ptrLo === 0 && ptrHi === 0) {
    // 无效指针 → 返回 (场景未定义)
    console.log(`[bank16] dispatchEntry: scene #${sceneIdx} not defined`);
    return;
  }

  sys.mem[0x5D] = ptrLo;
  sys.mem[0x5E] = ptrHi;
  sys.mem[0x3A] = 0; // 脚本偏移归零

  console.log(`[bank16] dispatchEntry: scene #${sceneIdx} → $${ptrHi.toString(16)}${ptrLo.toString(16)}`);

  // 进入字节码执行循环
  _bank16_executeBytecode(sys);
}

/** $8003/$8021: 场景更新/tick — 每帧调用以推进脚本 */
export function bank16_sceneTick(sys: SystemState): void {
  track('bank16_sceneTick');
  // 如果脚本指针有效，继续执行
  if (sys.mem[0x5E] !== 0 || sys.mem[0x5D] !== 0) {
    _bank16_executeBytecode(sys);
  }
}

// ═════════════════════════════════════════════════
// 字节码执行器 — 核心解释循环
// ═════════════════════════════════════════════════

/**
 * 字节码解释器主循环。
 *
 * 6502 逻辑: 从 ($5D)+Y 逐字节读取，根据值分发：
 *   < $F0: 写入当前 PPU 队列的 tile 数据
 *   ≥ $F0: 控制码 → 查跳转表，执行子处理器
 *
 * 安全上限: 每帧最多 200 个字节码，防止死循环
 */
function _bank16_executeBytecode(sys: SystemState): void {
  const ptr = (sys.mem[0x5E] << 8) | sys.mem[0x5D];
  if (ptr < 0x8000 || ptr > 0xBFFF) {
    return; // 无效指针
  }

  let offset = sys.mem[0x3A] || 0;
  const MAX_OPS = 200;
  let ops = 0;

  while (ops < MAX_OPS) {
    const byte = rom16((ptr + offset) & 0x1FFF);
    ops++;

    if (byte >= 0xFF) {
      // $FF: 脚本终止
      console.log(`[bank16] bytecode end at offset ${offset}`);
      sys.mem[0x5D] = 0;
      sys.mem[0x5E] = 0;
      sys.mem[0x3A] = 0;
      return;
    }

    if (byte >= 0xF0) {
      // 控制码: 跳到子处理器
      const handlerOffset = byte - 0xF0;
      offset = (offset + 1) & 0xFF;
      const shouldContinue = _bank16_handleControl(sys, handlerOffset, ptr, offset);
      if (!shouldContinue) {
        sys.mem[0x3A] = offset;
        return; // 控制码请求暂停（等 NMI 或下一帧）
      }
      // 控制码处理后可能跳转到新位置
      offset = sys.mem[0x3A] || offset;
    } else {
      // tile 数据: 写入 PPU nametable 队列
      _bank16_writeTileToQueue(sys, byte);
      offset = (offset + 1) & 0xFF;
    }
  }

  sys.mem[0x3A] = offset;
  if (ops >= MAX_OPS) {
    console.log(`[bank16] bytecode yield: ${ops} ops, resume at offset ${offset}`);
  }
}

// ═════════════════════════════════════════════════
// 控制码处理器
// ═════════════════════════════════════════════════

/**
 * 控制码分派 ($F0-$FE)。
 *
 * 6502 跳转表 ($80AF → 16 个条目):
 *   F0 → $80CF (设置标志)
 *   F1 → $80D4 (跳转/偏移)
 *   F2 → $80F4 (设置 nametable 坐标)
 *   F3 → $8105 (PPU 批量写入)
 *   F4 → $81E0 (子脚本调用)
 *   F5 → $81F6 (返回)
 *   F6 → $81EC (循环)
 *   F7 → $81F9 (条件)
 *   ... (F8-FE 各种辅助)
 */
function _bank16_handleControl(
  sys: SystemState,
  code: number,
  basePtr: number,
  offset: number,
): boolean {
  switch (code) {
    case 0x00: // F0: 设置场景标志
      // 读下一字节作为标志
      sys.mem[0x052A] = rom16((basePtr + offset) & 0x1FFF);
      sys.mem[0x3A] = (offset + 1) & 0xFF;
      return true;

    case 0x01: // F1: 脚本指针跳转
      // 读 2 字节新地址 → $5D/$5E
      const newLo = rom16((basePtr + offset) & 0x1FFF);
      const newHi = rom16((basePtr + offset + 1) & 0x1FFF);
      sys.mem[0x5D] = newLo;
      sys.mem[0x5E] = newHi;
      sys.mem[0x3A] = 0;
      return true;

    case 0x02: // F2: 设置 nametable 写入位置
      // 读 2 字节 → PPU 地址
      writeMem(sys, 0x0523, rom16((basePtr + offset) & 0x1FFF)); // addr lo
      writeMem(sys, 0x0524, rom16((basePtr + offset + 1) & 0x1FFF)); // addr hi
      sys.mem[0x3A] = (offset + 2) & 0xFF;
      return true;

    case 0x03: // F3: PPU 批量数据写入
      // 读 count 字节，写入 PPU 队列
      {
        const count = rom16((basePtr + offset) & 0x1FFF);
        if (count === 0) {
          writeMem(sys, 0x0516, (readMem(sys, 0x0516) | 0x04) & 0xEF);
          sys.mem[0x3A] = 0;
          return false; // 等待 NMI
        }
        const ppuLo = readMem(sys, 0x0523);
        const ppuHi = readMem(sys, 0x0524);
        const qIdx = readMem(sys, 0x0628) || 0;

        // 构建队列条目
        writeMem(sys, 0x05E8 + qIdx, count);
        writeMem(sys, 0x05E9 + qIdx, ppuLo);
        writeMem(sys, 0x05EA + qIdx, ppuHi);
        for (let i = 0; i < count; i++) {
          writeMem(sys, 0x05EB + qIdx + i, rom16((basePtr + offset + 1 + i) & 0x1FFF));
        }
        writeMem(sys, 0x0628, qIdx + 3 + count);
        writeMem(sys, 0x05E8 + qIdx + 3 + count, 0); // 终止符

        // NMI 标志
        writeMem(sys, 0x0515, 0x80);
        sys.mem[0x3A] = (offset + 1 + count) & 0xFF;
        return true;
      }

    case 0x04: // F4: 子脚本调用（保存返回地址到 $0522 栈）
      {
        const retLo = sys.mem[0x5D];
        const retHi = sys.mem[0x5E];
        const retOff = (offset + 2) & 0xFF;
        const stackIdx = readMem(sys, 0x0522) || 0;

        // 保存返回地址到调用栈
        writeMem(sys, 0x051A + stackIdx, retLo);
        writeMem(sys, 0x051B + stackIdx, retHi);
        writeMem(sys, 0x0522, stackIdx + 2);

        // 跳到子脚本
        sys.mem[0x5D] = rom16((basePtr + offset) & 0x1FFF);
        sys.mem[0x5E] = rom16((basePtr + offset + 1) & 0x1FFF);
        sys.mem[0x3A] = 0;
        return true;
      }

    case 0x05: // F5: 从子脚本返回
      {
        const stackIdx = (readMem(sys, 0x0522) || 0) - 2;
        if (stackIdx < 0) {
          // 栈空 → 脚本结束
          sys.mem[0x5D] = 0;
          sys.mem[0x5E] = 0;
          return false;
        }
        sys.mem[0x5D] = readMem(sys, 0x051A + stackIdx);
        sys.mem[0x5E] = readMem(sys, 0x051B + stackIdx);
        sys.mem[0x0522] = stackIdx;
        sys.mem[0x3A] = (offset + 1) & 0xFF;
        return true;
      }

    case 0x07: // F7: 条件跳转 (检查 $052A 标志)
      {
        const flag = readMem(sys, 0x052A) || 0;
        const jumpLo = rom16((basePtr + offset) & 0x1FFF);
        const jumpHi = rom16((basePtr + offset + 1) & 0x1FFF);
        if (flag !== 0) {
          sys.mem[0x5D] = jumpLo;
          sys.mem[0x5E] = jumpHi;
          sys.mem[0x3A] = 0;
        } else {
          sys.mem[0x3A] = (offset + 2) & 0xFF;
        }
        return true;
      }

    default:
      // F6, F8-FE: 其他控制码（延迟、属性、音频触发等）
      // 大部分只读 1-2 字节参数然后继续
      const param = rom16((basePtr + offset) & 0x1FFF);
      console.log(`[bank16] control F${code.toString(16)}: param=$${param.toString(16)}`);
      sys.mem[0x3A] = (offset + 1) & 0xFF;
      return true;
  }
}

// ═════════════════════════════════════════════════
// PPU 队列辅助
// ═════════════════════════════════════════════════

/** 将单个 tile 写入 PPU 队列 */
function _bank16_writeTileToQueue(sys: SystemState, tile: number): void {
  const qIdx = readMem(sys, 0x0628) || 0;
  writeMem(sys, 0x05E8 + qIdx, 1); // entry: 1 tile
  writeMem(sys, 0x05E9 + qIdx, sys.mem[0x0523] || 0); // PPU addr lo
  writeMem(sys, 0x05EA + qIdx, sys.mem[0x0524] || 0x22); // PPU addr hi
  writeMem(sys, 0x05EB + qIdx, tile);
  writeMem(sys, 0x05EB + qIdx + 1, 0); // terminator

  // 推进 nametable 列
  sys.mem[0x0523] = (sys.mem[0x0523] + 1) & 0xFF;
  writeMem(sys, 0x0628, qIdx + 4);

  // NMI flag
  writeMem(sys, 0x0515, 0x80);
}

// ═════════════════════════════════════════════════
// 场景脚本数据存取（bank 03/04/05/25）
// ═════════════════════════════════════════════════

/** 场景脚本/对白数据 bank-03 */
export { getBank03Data as bank16_getSceneData03 } from './bank-03-code';
/** 场景脚本/对白数据 bank-04 */
export { getBank04Data as bank16_getSceneData04 } from './bank-04-code';
/** 场景脚本/对白数据 bank-05 */
export { getBank05Data as bank16_getSceneData05 } from './bank-05-code';
/** 场景脚本/事件数据 bank-25 */
export { getBank25Data as bank16_getSceneData25 } from './bank-25-code';

/** 关卡/场景元数据 bank-23 */
export { getBank23Data as bank16_getLevelData23 } from './bank-23-code';



// ═════════════════════════════════════════════════
// Dispatch table
// ═════════════════════════════════════════════════

/** Bank 16 dispatch table (offset → handler) */
export const bank16_dispatch: Record<number, (sys: SystemState) => void> = {
  0x00: bank16_dispatchEntry,
  0x03: bank16_sceneTick,
  0x0C: (sys: SystemState) => { /* stub: bank 0x10 offset 0x0C — 占位 */ },
};

console.log('[bank16] ✅ Phase 2b — 场景脚本解释器 (dispatch|tick|bytecode)');
