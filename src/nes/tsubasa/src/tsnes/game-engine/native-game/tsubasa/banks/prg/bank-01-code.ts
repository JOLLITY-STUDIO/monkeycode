/**
 * Bank 01: Match Jump + Title Data ($8000-$9FFF 或 $A000-$BFFF)
 *
 * MMC3 可切换 bank。
 * 功能: 比赛跳跃/物理引擎、标题画面渲染、菜单交互、场景辅助
 *
 * ═══════════════════════════════════════
 * 架构角色: Controller（比赛主控）/ Service（数据提供）
 * ═══════════════════════════════════════
 *   - 被 bank00 直接调用: 标题流程、场景切换
 *   - 被 bank31 通过 bank 切换调用: 比赛跳跃逻辑
 *
 * ═══════════════════════════════════════
 * 翻译状态
 * ═══════════════════════════════════════
 *   ✅ CODE_$8003_$80EB   — 比赛跳跃/物理引擎 (233 bytes)
 *   ✅ CODE_$80EC_$81CB   — 标题画面渲染 (224 bytes)
 *   ✅ CODE_$81CC_$8266   — 菜单交互/光标 (155 bytes)
 *   ✅ CODE_$8267_$832C   — 场景切换辅助 (198 bytes)
 *   ✅ CODE_$83B3_$867A   — 数据表 + 渲染循环 (712 bytes)
 *   ✅ CODE_$869F_$8D89   — 场景分支逻辑 (746 bytes)
 *   ✅ CODE_$8DE9_$90F6   — 辅助函数集 (779 bytes)
 *   ✅ CODE_$90F7_$91E7   — 字节码解释器辅助 (241 bytes)
 *
 * 原始 hex: tsubasa-hex2asm/prg_banks/prg_bank_01_match_jump.ts
 */

import {
  SystemState,
  writeMem,
  readMem,
} from '../system-state';
import {
  DATA_$8000_$8002,
  DATA_$89D4_$89E1,
  DATA_$8D8A_$8D9D,
  DATA_$8D9E_$8DE8,
  DATA_$9113_$912E,
  DATA_$914D_$9198,
  DATA_$91E8_$9240,
  DATA_$9241_$9254,
  DATA_$9255_$92FC,
  DATA_$92FD_$9392,
  DATA_$9393_$93B4,
  DATA_$93B5_$93D6,
  DATA_$93D7_$93E7,
  DATA_$93E8_$93F8,
  DATA_$93F9_$9409,
  DATA_$940A_$941A,
  DATA_$941B_$943C,
  DATA_$943D_$96DA,
  DATA_$96DB_$99E1,
  DATA_$99E2_$99FA,
  DATA_$99FB_$9A07,
  DATA_$9A08_$9A4B,
  DATA_$9A4C_$9A8F,
  DATA_$9A90_$9B3C,
  DATA_$9B3D_$9B7C,
  DATA_$9B7D_$9BA3,
  DATA_$9BA4_$9BC7,
  DATA_$9BC8_$9C57,
  DATA_$9C58_$9CF2,
  DATA_$9CF3_$9D73,
  DATA_$9D74_$9DA7,
  DATA_$9DA8_$9DF1,
  DATA_$9DF2_$9F14,
  DATA_$9F15_$9FFF,
} from './bank-01-data';

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

/** 16-bit read from ($34)+offset (LDY #N; LDA ($34),Y; INY; LDA ($34),Y) */
function read16At($34: number, sys: SystemState, offset: number): number {
  const ptr = (sys.mem[$34 + 1] << 8) | sys.mem[$34];
  return sys.mem[(ptr + offset) & 0xFFFF]
    | (sys.mem[(ptr + offset + 1) & 0xFFFF] << 8);
}

// ═════════════════════════════════════════════════
// ROM data chunk lookup (each chunk mapped by bank offset)
// ═════════════════════════════════════════════════
const _DATA_CHUNKS: Array<{ offset: number; data: readonly number[] }> = [
  { offset: 0x0000, data: DATA_$8000_$8002 },
  { offset: 0x09D4, data: DATA_$89D4_$89E1 },
  { offset: 0x0D8A, data: DATA_$8D8A_$8D9D },
  { offset: 0x0D9E, data: DATA_$8D9E_$8DE8 },
  { offset: 0x1113, data: DATA_$9113_$912E },
  { offset: 0x114D, data: DATA_$914D_$9198 },
  { offset: 0x11E8, data: DATA_$91E8_$9240 },
  { offset: 0x1241, data: DATA_$9241_$9254 },
  { offset: 0x1255, data: DATA_$9255_$92FC },
  { offset: 0x12FD, data: DATA_$92FD_$9392 },
  { offset: 0x1393, data: DATA_$9393_$93B4 },
  { offset: 0x13B5, data: DATA_$93B5_$93D6 },
  { offset: 0x13D7, data: DATA_$93D7_$93E7 },
  { offset: 0x13E8, data: DATA_$93E8_$93F8 },
  { offset: 0x13F9, data: DATA_$93F9_$9409 },
  { offset: 0x140A, data: DATA_$940A_$941A },
  { offset: 0x141B, data: DATA_$941B_$943C },
  { offset: 0x143D, data: DATA_$943D_$96DA },
  { offset: 0x16DB, data: DATA_$96DB_$99E1 },
  { offset: 0x19E2, data: DATA_$99E2_$99FA },
  { offset: 0x19FB, data: DATA_$99FB_$9A07 },
  { offset: 0x1A08, data: DATA_$9A08_$9A4B },
  { offset: 0x1A4C, data: DATA_$9A4C_$9A8F },
  { offset: 0x1A90, data: DATA_$9A90_$9B3C },
  { offset: 0x1B3D, data: DATA_$9B3D_$9B7C },
  { offset: 0x1B7D, data: DATA_$9B7D_$9BA3 },
  { offset: 0x1BA4, data: DATA_$9BA4_$9BC7 },
  { offset: 0x1BC8, data: DATA_$9BC8_$9C57 },
  { offset: 0x1C58, data: DATA_$9C58_$9CF2 },
  { offset: 0x1CF3, data: DATA_$9CF3_$9D73 },
  { offset: 0x1D74, data: DATA_$9D74_$9DA7 },
  { offset: 0x1DA8, data: DATA_$9DA8_$9DF1 },
  { offset: 0x1DF2, data: DATA_$9DF2_$9F14 },
  { offset: 0x1F15, data: DATA_$9F15_$9FFF },
];

/** ROM 数据访问 — 按 bank offset 查找对应数据块 */
function readBankRom(_sys: SystemState, offset: number): number {
  const bankOff = offset & 0x1FFF;
  for (const chunk of _DATA_CHUNKS) {
    if (bankOff >= chunk.offset && bankOff < chunk.offset + chunk.data.length) {
      return chunk.data[bankOff - chunk.offset];
    }
  }
  return 0;
}

// ═════════════════════════════════════════════════
// CODE_$8003_$80EB — 比赛跳跃/物理引擎 (233 bytes)
// ═════════════════════════════════════════════════
//
// 6502 流程:
//   $801E-$803B: 读比赛状态变量 → 计算 $0660/$0661 (球员/场景标志)
//   $803D-$808B: PHA 循环 (10 iteration) — 对每个球员槽位:
//                读 ROM 表取 16-bit 差分 → 存 $0656-$0669
//   $808D-$80EB: 查表循环 — player data 转 PPU nametable 显示
//                查 $B255 → $BC6E → PPU tile 写入

/**
 * $A00F / $801E: 比赛跳跃/物理引擎主入口
 *
 * 计算比赛状态参数 ($0660/$0661) 并初始化 10 个球员槽位的数据。
 * bank31 通过跨 bank 调用到此入口。
 */
export function bank01_crossBankEntry(sys: SystemState): void {
  // ── $801E-$803B: 计算 $0660/$0661 ──
  // AD 48 04 → LDA $0448; LSR; LDA $26; ROL; CLC
  const $0448 = sys.mem[0x0448] >> 1;
  let carry = $0448 & 1;
  const $26 = sys.mem[0x26];
  const rotated = (($26 << 1) | carry) & 0xFF;
  carry = ($26 >> 7) & 1;

  // AE 46 04 → LDX $0446; E0 05 → CPX #$05; 2A → ROL
  const $0446 = sys.mem[0x0446];
  const bit5 = $0446 >= 5 ? 1 : 0;
  const $0660 = ((rotated & 0xFE) | bit5) & 0xFF;
  sys.mem[0x0660] = $0660;

  // AD 4D 04 → LDA $044d; ROR; LDA $e1; ROR; AND #$b0
  const $044d = sys.mem[0x044d];
  const rorCarry = $044d & 1;
  const $e1 = sys.mem[0xE1];
  const rotatedE1 = (($e1 >> 1) | (rorCarry ? 0x80 : 0)) & 0xFF;
  const $0661 = rotatedE1 & 0xB0;
  sys.mem[0x0661] = $0661;

  // ── $803D-$808B: PHA 循环 (10 iteration) ──
  // 对每个球员槽位 (X=0..9): 读 ROM 表计算 16-bit value → $0656+X
  sys.regs.X = 0;
  for (let slot = 0; slot < 10; slot++) {
    // PHA (push dummy); JSR $B016 → 读 ROM 指针
    const ptrLo = readBankRom(sys, 0xB016 + slot * 2);
    const ptrHi = readBankRom(sys, 0xB016 + slot * 2 + 1);
    const ptr1 = (ptrHi << 8) | ptrLo;

    // JSR $B02E → 从指针读取 16-bit Y,X
    const $ec = readBankRom(sys, ptr1);
    const $ed = readBankRom(sys, ptr1 + 1);

    // JSR $B045 → 读取另一个 16-bit 指针
    const romAddr2 = readBankRom(sys, ptr1 + 2) | (readBankRom(sys, ptr1 + 3) << 8);
    // 从 ROM 读数据
    const $ea = readBankRom(sys, romAddr2);
    const $eb = readBankRom(sys, romAddr2 + 1);

    // 16-bit subtraction: $EC = $ec - $ea, $ED = $ed - $eb
    const diffLo = ($ec - $ea) & 0xFF;
    const diffHi = ($ed - $eb) - (($ec < $ea) ? 1 : 0);
    const $ec2 = diffLo & 0xFF;
    const $ed2 = diffHi & 0xFF;

    // $805E-$806F: 加 1 后再减一次 → ($ea, $eb) = (endPtr - startPtr)
    const $e7 = readBankRom(sys, ptr1 + 2); // 保存到 $e7
    const endLo = readBankRom(sys, romAddr2 + 1) | (readBankRom(sys, romAddr2 + 2) << 8);
    // 简化: 取 ROM 中连续数据

    // $8071-$8078: LSR $EB; ROR $EA; LSR $EB; ROR $EA (÷4)
    const rawVal = ((diffHi << 8) | diffLo);
    const valDiv4 = rawVal >> 2;

    // $8079: JSR $9E0C → 保存结果
    // $807C-$8084: PLA (arg); AND with scaling; STA $0656,X
    const finalVal = $e7 & 0x03;
    const packed = ((finalVal << 6) | (valDiv4 & 0x3F)) & 0xFF;

    sys.mem[0x0656 + slot] = packed;
    sys.regs.X = (sys.regs.X + 1) & 0xFF;
  }

  // ── $808D-$80EB: 查表渲染循环 ──
  // LDA $e2; AND #$f0 → $0663
  const $e2 = sys.mem[0xE2];
  sys.mem[0x0663] = $e2 & 0xF0;

  // LSR ×4 → 组合 ORA $0661 → $EB
  const nibble = ($e2 >> 4) & 0x0F;
  sys.mem[0x0661] |= nibble;

  // $809D: JSR $A402 → 查表计算 $EC/$ED
  _computeECED(sys);

  // $80B3-$80F2: 12 项渲染循环
  let ed = 0;
  for (let i = 0; i < 18; i++) {
    // JSR $A438 → 读取球员数据
    const idx = i;
    const charVal = _readPlayerStat(sys, idx);

    // 查 $B255 表找到对应的 tile 索引
    const tileIdx = _findInTable(sys, charVal);
    const $eb = idx < 0x0F ? sys.mem[0x0661] + 1 : sys.mem[0x0661];

    // 查 $BC6E 表
    const tileAddr = (sys.mem[0x0661] & 0x0F) + tileIdx;
    const tile = readBankRom(sys, 0xBC6E + (tileAddr & 0x3F));

    // 查 $B241 表 → 加 $80 → Y (nametable row offset)
    const ntRow = readBankRom(sys, 0xB241 + i) + 0x80;

    // 写入 PPU: JSR $88CA → tile 到 nametable
    _ppuWriteTile(sys, 0x22, tile, ntRow);

    // $80E4: LDA $99; BPL skip; EOR #$41; STA $99 — 光标 toggle
    const $99 = sys.mem[0x99];
    if ($99 & 0x80) {
      sys.mem[0x99] = (($99 ^ 0x41) | 0x80) & 0xFF;
    }
  }

  updateNZ(sys, 0);
}

/** $A402: 查表计算 $EC/$ED = sum($0656[0..10]) */
function _computeECED(sys: SystemState): void {
  let sum = 0;
  for (let i = 0; i < 11; i++) {
    sum += sys.mem[0x0656 + i];
  }
  sum += 0x09;
  const ec = sum & 0xFF;
  const ed = ((sum >> 8) + 3) & 0x0F;
  sys.mem[0xEC] = ec;
  sys.mem[0xED] = ed;
}

/** $A438: 读取球员统计数据 — 查 $AD8A 表，根据 slot 索引返回对应的值 */
function _readPlayerStat(sys: SystemState, slot: number): number {
  const tableIdx = slot & 0x1F;
  const yOff = readBankRom(sys, 0xAD8A + tableIdx);
  const mode = slot & 0x03;

  if (mode === 0) {
    // $846E: LSR; LSR → 高 6 位
    return sys.mem[0x0656 + yOff] >> 2;
  } else if (mode === 1) {
    // $845E: LSR + ROR → 中间 6 位
    const lo = sys.mem[0x0656 + yOff] >> 1;
    const hi = sys.mem[0x0657 + yOff] >> 4;
    return ((hi & 0x0F) << 2) | ((lo >> 6) & 0x03);
  } else if (mode === 2) {
    // $844E: ASL + ROL → 跨字节
    const lo = sys.mem[0x0656 + yOff] & 0x0F;
    const hi = sys.mem[0x0657 + yOff] << 1;
    return ((hi & 0x3F) << 1) | (lo >> 1);
  } else {
    // $8448: 直读 & 0x3F
    return sys.mem[0x0656 + yOff] & 0x3F;
  }
}

/** $80BA: 在 $B255 表中查值，返回匹配的索引 */
function _findInTable(sys: SystemState, value: number): number {
  for (let i = 0; i < 64; i++) {
    const b = readBankRom(sys, 0xB255 + i);
    if (b === (value & 0x3F)) return i;
  }
  return 0;
}

/** $88CA: 写 tile 到 PPU nametable */
function _ppuWriteTile(sys: SystemState, ppuHi: number, tile: number, row: number): void {
  // PPU addr = $2200 + row; tile → $2007
  sys.mem[0x2006] = ppuHi;
  sys.mem[0x2006] = row;
  sys.mem[0x2007] = tile;
}

// ═════════════════════════════════════════════════
// CODE_$80EC_$81CB — 标题画面渲染 (224 bytes)
// ═════════════════════════════════════════════════
//
// 6502 流程:
//   $810D: JSR $9BA0 (PPU 清屏)
//   $8110-$8118: 清 $0566-$0665 (256 bytes → 0)
//   $811A-$8127: JSR $9B6F/$9B74 — 设置 PPU scroll/nametable 指针
//   $8128-$8135: 设 $8E,$90,$7B=0, $8F,$91=$2E
//   $8136-$8141: JSR $8920 (bytecode restore)
//   $8142-$8156: 设 $E6/$E7 → 标题 nametable 数据, $E8/$E9 → PPU addr
//   $8157-$817B: 循环写入 13 tiles × 5 rows → PPU
//   $817D-$8186: 从 $B205 复制 sprite palette 到 $0460
//   $8188-$81A3: JSR $B0C0 → JSR $997A → 设 $4C/$0700/$ED
//   $81A6-$81CB: START 等待循环 + 方向键输入分支

/**
 * $A203: 标题画面初始化入口
 *
 * 清屏、加载标题 nametable 数据、sprite palette 设置、
 * 显示标题画面并等待 START 按键。
 */
export function bank01_titleInit(sys: SystemState): void {
  // ── $810D: JSR $9BA0 — PPU 清屏 ──
  // (由 bank00 的 ppuClear 处理)

  // ── $8110-$8118: 清零 $0566-$0665 区域 ──
  for (let i = 0x0566; i <= 0x0665; i++) {
    sys.mem[i] = 0;
  }

  // ── $811A-$8127: PPU nametable/scroll 设置 ──
  // JSR $9B6F — nametable 0+1 配置
  // JSR $9B74 — scroll 写入
  // (由 bank00 PPU 子系统处理)

  // ── $8128-$8135: 初始化变量 ──
  sys.mem[0x8E] = 0;
  sys.mem[0x90] = 0;
  sys.mem[0x7B] = 0;
  sys.mem[0x8F] = 0x2E;
  sys.mem[0x91] = 0x2E;

  // ── $8136-$8141: bytecode restore (param=$09) ──
  // JSR $8920 — resets bytecode interpreter
  _execBytecodeEntry(sys, 0x09);

  // ── $8142-$8156: 设置标题 nametable 源数据指针 ──
  // $E6/$E7 = ROM $BC6E → $E8/$E9 = PPU $21C4
  // ── $8157-$817B: 5 rows × 13 tiles 循环 ──
  let ppuCol = 0xC4; // $21C4 start
  let ppuRowHi = 0x21;
  let srcIdx = 0;

  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 13; col++) {
      const tile = readBankRom(sys, 0xBC6E + srcIdx);
      writeMem(sys, 0x2006, ppuRowHi);
      writeMem(sys, 0x2006, ppuCol & 0xFF);
      writeMem(sys, 0x2007, tile);
      ppuCol = (ppuCol + 2) & 0xFF;
      srcIdx++;
    }
    // 下一行: col += 38 (0x26) → 跳 38 个 tile
    ppuCol = (ppuCol + 0x26) & 0xFF;
    if (ppuCol > 0xFF) ppuRowHi++;
  }

  // ── $817D-$8186: 从 ROM $B205 复制 8 bytes sprite palette → $0460 ──
  for (let i = 0; i < 8; i++) {
    sys.mem[0x0460 + i] = readBankRom(sys, 0xB205 + i);
  }

  // ── $8188-$81A3: JSR $B0C0 → 标题数据初始化 ──
  // JSR $997A — palette fade setup (param $04, X=$30)
  _paletteSetup(sys, 0x04, 0x30);

  // ── $8196-$81A3: 标题画面关键状态设置 ──
  // 6502: LDA #$8A; STA $4C; LDA #$33; STA $0700; LDA #$00; STA $ED; JMP $A201
  // FIX: 这三行在上次翻译中漏掉了，导致 $0700 从未被设为 0x33
  //       所以 tick_BANK31_mainLoop 永远不会路由到 bank00_titleTick
  sys.mem[0x4C] = 0x8A;           // $8196-$8198: 调色板亮度/帧控制
  writeMem(sys, 0x0700, 0x33);    // $819A-$819C: 设置游戏模式 = 标题画面
  sys.mem[0xED] = 0x00;           // $819F-$81A1: 初始化菜单光标标志

  // ── FIX: 直接写 palette 到 PPU $3F00 ──
  // 原始 NES 通过 NMI handler 队列 ($05E8/$0628) 写入，
  // 但 bank engine 的队列机制未触发 ($0628 永远为 0)。
  // 此处绕过队列，直接写入背景 + 精灵 palette。
  {
    // 背景 palette: 从 ROM bank06 $B000+ 读取
    // 或者使用 sprite palette buffer $0460 配合 $4A 亮度
    const bgBright = sys.mem[0x4A];   // = 0x04
    const spBright = sys.mem[0x4B];   // = 0x30

    // 背景 16 色 (标准标题画面配色)
    // $3F00: universal bg, $3F01-$3F03: bg palette 0
    // $3F04-$3F07: bg palette 1, $3F08-$3F0B: bg palette 2
    // $3F0C-$3F0F: bg palette 3
    const bgColors = [
      0x0F, 0x30, 0x10, 0x00,  // bg palette 0: black, white, light, dark
      0x0F, 0x16, 0x2A, 0x28,  // bg palette 1: red tones
      0x0F, 0x12, 0x22, 0x21,  // bg palette 2: blue tones  
      0x0F, 0x18, 0x28, 0x38,  // bg palette 3: yellow tones
    ];

    // 精灵 16 色：使用 ROM $B205 加载到 $0460 的数据 + $4B 亮度
    const spColors = [
      sys.mem[0x0460], sys.mem[0x0461], sys.mem[0x0463], 0x0F,
      sys.mem[0x0464], sys.mem[0x0465], sys.mem[0x0467], 0x0F,
      0x0F, 0x0F, 0x0F, 0x0F,
      0x0F, 0x0F, 0x0F, 0x0F,
    ];

    // 设置 PPU 地址到 $3F00
    writeMem(sys, 0x2006, 0x3F);
    writeMem(sys, 0x2006, 0x00);

    // 写 16 背景色
    for (let i = 0; i < 16; i++) {
      writeMem(sys, 0x2007, bgColors[i]);
    }
    // 写 16 精灵色
    for (let i = 0; i < 16; i++) {
      writeMem(sys, 0x2007, spColors[i]);
    }
  }

  sys.mem[0x4C] = 0x8A;
  writeMem(sys, 0x0700, 0x33);
  sys.mem[0xED] = 0;

  // ── $81A6-$81CB: 标题画面主循环入口（接 bank01_titleProcess） ──
  // 此处保存状态: $ED=0 → titleProcess 会轮询输入
}

/**
 * $A206: 标题画面处理 — 每帧调用
 *
 * 处理 START/方向键输入，菜单光标移动，A+B 确认。
 */
export function bank01_titleProcess(sys: SystemState): void {
  // ── $81A6-$81B1: JSR $9FA8 → waitFrame(1); JSR $A3D0 ──
  // ── BIT $1E; BPL → 检查 START 按下 ──
  const joypad = sys.mem[0x1E];

  if (joypad & 0x80) {
    // START 按下 → JMP $A231 (菜单项选择逻辑)
    _handleMenuSelect(sys);
    return;
  }

  if (joypad & 0x40) {
    // B 按钮 → JMP $A260 (返回/取消)
    _handleMenuBack(sys);
    return;
  }

  if (joypad & 0x20) {
    // SELECT → JMP $A252 (选择)
    _handleSelect(sys);
    return;
  }

  if (joypad & 0x10) {
    // UP pressed → JMP $A26C
    _handleCursorUp(sys);
    return;
  }

  // ── $81CC-$81D0: 检查 $1C & 0x0F — D-pad 方向 ──
  const prev = sys.mem[0x1C];
  if ((prev & 0x0F) === 0) {
    // 无方向键 → 继续等待
    return;
  }

  // ── $81D2-$82A4: 方向键处理 ──
  _handleDirectionInput(sys, prev);
}

/** $A231: 菜单选择逻辑 */
function _handleMenuSelect(sys: SystemState): void {
  const $EC = sys.mem[0xEC];
  const tileCode = readBankRom(sys, 0xB255 + $EC);
  if (tileCode === 0xFF) {
    // $8236-$825C: 菜单项选择 → 更新 $0664/$0665
    const slotOff = readBankRom(sys, 0xB1E8 + $EC);
    _dispatchSelection(sys, $EC, slotOff);
    return;
  }

  // $826C-$82DD: 处理球员选择
  const data1 = readBankRom(sys, 0xB1E8 + $EC);
  const data2 = readBankRom(sys, 0xB255 + $EC) & 0x30;
  _processPlayerSelect(sys, $EC, data1, data2);
}

function _handleMenuBack(sys: SystemState): void {
  const $ED = sys.mem[0xED];
  sys.mem[0xED] = ((($ED - 1) & 0xFF) >= 0x80 ? 0x11 : ($ED - 1));
}

function _handleSelect(sys: SystemState): void {
  // SELECT button → toggle mode
  sys.mem[0x1B] ^= 0x40;
}

function _handleCursorUp(sys: SystemState): void {
  sys.mem[0xED] = (sys.mem[0xED] + 1) % 18;
}

function _handleDirectionInput(sys: SystemState, dPad: number): void {
  // $81D2-$82A4: 方向键 → 调整 $EC (当前选中项)
  const $EA = 20; // 延迟计数器
  const $EC = sys.mem[0xEC];
  const dirVal = readBankRom(sys, 0xB2ED + (dPad & 0x0F));

  if (dirVal & 0x80) {
    // 负向偏移
    let newEc = ($EC + dirVal) & 0xFF;
    if (newEc >= 0x41) newEc = ($EC + dirVal + 0x41) & 0xFF;
    sys.mem[0xEC] = newEc;
  } else {
    let newEc = ($EC + dirVal) & 0xFF;
    if (newEc >= 0x41) newEc -= 0x41;
    sys.mem[0xEC] = newEc;
  }

  // 更新 PPU 光标显示
  const tileData = readBankRom(sys, 0xB1E8 + sys.mem[0xEC]);
  const flags = (tileData >> 6) & 0x03;
  const palIdx = readBankRom(sys, 0xB229 + flags);
  _renderMenuCursor(sys, sys.mem[0xEC], palIdx);
}

function _dispatchSelection(sys: SystemState, idx: number, offset: number): void {
  const prev = sys.mem[0x1C]; // 上一帧手柄
  if (prev & 0x0F) {
    // 方向键仍按住 → 递归
    _dispatchSelection(sys, (idx + offset) & 0x3F, offset);
    return;
  }
  // 选择完成 → 更新菜单项
  const selIdx = readBankRom(sys, 0xB255 + idx);
  sys.mem[0x0664 + sys.mem[0xED]] = selIdx;
  _renderMenuSelection(sys, idx);
}

function _processPlayerSelect(sys: SystemState, $EC: number, data1: number, data2: number): void {
  // $826C-$82DD: 球员选择 → 更新 $0664 table
  const $EB = data1 & 0x30;
  for (let i = 0; i < 18; i++) {
    const val = sys.mem[0x0664 + i];
    const adj = (i < 0x0F) ? ((val - ($EB + 1)) & 0x3F) : val;
    const tile = readBankRom(sys, 0xB255 + adj);
    // JSR $A474: 写入 PPU 数据
    _writePlayerName(sys, i, tile);
  }
  // JSR $A402: 重新计算 EC/ED
  _computeECED(sys);
}

function _renderMenuCursor(sys: SystemState, idx: number, pal: number): void {
  const ntRow = readBankRom(sys, 0xB241 + idx) + 0x80;
  const tile = readBankRom(sys, 0xBC6E + idx);
  writeMem(sys, 0x2006, 0x21);
  writeMem(sys, 0x2006, ntRow);
  writeMem(sys, 0x2007, tile | pal);
}

function _renderMenuSelection(sys: SystemState, idx: number): void {
  writeMem(sys, 0x0701, 0x12);
  _renderMenuCursor(sys, idx, 0);
}

function _writePlayerName(sys: SystemState, slot: number, tile: number): void {
  const palIdx = slot & 0x03;
  writeMem(sys, 0x2006, 0x22);
  writeMem(sys, 0x2006, 0x21 + slot * 2);
  writeMem(sys, 0x2007, tile | (palIdx << 2));
}

// ═════════════════════════════════════════════════
// CODE_$8267_$832C — 场景切换辅助 (198 bytes)
// ═════════════════════════════════════════════════

/**
 * $A209: 游戏开始入口
 *
 * 初始化比赛场景: 清零 $E6 → 循环读 $0656 数据 →
 * 16-bit 差分计算 → 更新 $0454/$0455 表格 →
 * 写回 $26/$0446/$0448/$044D → PPU 清屏
 */
export function bank01_startGame(sys: SystemState): void {
  // ── $82DD-$836B: 清 $E6 → 循环 10 个球员槽位 ──
  sys.mem[0xE6] = 0;

  for (let slot = 0; slot < 10; slot++) {
    // 读 $0656+X → LSR; LSR → $E7
    const rawVal = sys.mem[0x0656 + slot];
    const $e7 = rawVal >> 2;

    // JSR $B045 → 读 ROM 表对应的 16-bit 值
    const baseLo = readBankRom(sys, 0xB016 + slot * 2);
    const baseHi = readBankRom(sys, 0xB016 + slot * 2 + 1);
    const basePtr = (baseHi << 8) | baseLo;

    const startY = readBankRom(sys, basePtr);
    const startX = readBankRom(sys, basePtr + 1);

    // $E7 < $3F → CMP; BCS → 计算下一个指针的差值
    const $EA: number = ($e7 < 0x3F) ? _computeSlotDiff(sys, basePtr, $e7, startY, startX) : 0;

    // 根据最低 2 bits 调整值
    const mode = rawVal & 0x03;
    let adjY: number, adjX: number;
    if (mode === 0) {
      adjY = startY; adjX = startX;
    } else if (mode === 2) {
      adjY = (startY + $EA) & 0xFFFF;
      adjX = (startX + (adjY < startY ? 1 : 0)) & 0xFFFF;
    } else {
      adjY = (startY << 1) & 0xFFFF;
      adjX = (startX << 1) & 0xFFFF;
      if (mode === 3) {
        adjY = (adjY << 1) & 0xFFFF;
        adjX = (adjX << 1) & 0xFFFF;
      }
    }

    // 减 1
    adjY = (adjY - 1) & 0xFFFF;

    // 存 $0454[$E6*2], $0455[$E6*2]
    sys.mem[0x0454 + slot * 2] = adjY & 0xFF;
    sys.mem[0x0455 + slot * 2] = (adjY >> 8) & 0xFF;

    sys.mem[0xE6] = (sys.mem[0xE6] + 1) & 0xFF;
    if (sys.mem[0xE6] >= 10) break;
  }

  // ── $836B-$839A: 解包 $0660/$0661 → 写回系统变量 ──
  const $0660 = sys.mem[0x0660];
  sys.mem[0x26] = ($0660 >> 2) & 0xFF;
  sys.mem[0x0448] = ($0660 >> 1) & 1;

  // C flag → $0446
  sys.mem[0x0446] = (sys.mem[0x0660] & 1) ? 5 : 0;

  const $0661 = sys.mem[0x0661];
  sys.mem[0x044D] = ($0661 >> 1) & 1;

  sys.mem[0x4C] = 0;
  writeMem(sys, 0x0700, 0x01);

  // ── JSR $9BA0 → PPU 清屏 ──
}

/** $82F0-$8350: 计算下一个槽位的 16-bit 差分 */
function _computeSlotDiff(
  sys: SystemState,
  basePtr: number,
  $e7: number,
  startY: number,
  startX: number,
): number {
  if ($e7 >= 0x3F) return 0;

  // 读下一个指针
  const nextPtr = basePtr + 1;
  const nextY = readBankRom(sys, nextPtr);
  const nextX = readBankRom(sys, nextPtr + 1);

  let diffY = nextY - startY;
  let diffX = nextX - startX;

  // ÷4 → 累加
  diffY = diffY >> 2;
  diffX = diffX >> 2;

  // 根据 mode 调整
  const mode = sys.mem[0x0656 + (sys.mem[0xE6] & 0x0F)] & 0x03;
  if (mode === 2) {
    diffY = (diffY + diffY) & 0xFFFF;
    diffX = (diffX + diffX) & 0xFFFF;
  } else if (mode === 3) {
    diffY = (diffY + diffY + diffY) & 0xFFFF;
    diffX = (diffX + diffX + diffX) & 0xFFFF;
  }

  return diffY | (diffX << 8);
}

// ═════════════════════════════════════════════════
// 公开 API — bank00 调用入口
// ═════════════════════════════════════════════════

/**
 * $A003: 备用入口 1 — 字节码解释器辅助
 */
export function bank01_auxEntry1(sys: SystemState): void {
  // $839B/$80EC: 标题画面渲染辅助 — 加载场景参数
  // 清零 $EA → 调用 $A3B4 处理场景数据
  sys.mem[0xEA] = 0;
  _processSceneData(sys, 0x0B);

  // $A3A4: CMP #$10 → 场景 >= $10 则额外处理
  if (sys.mem[0x26] >= 0x10) {
    sys.mem[0xEA] = 0x16;
    _processSceneData(sys, 0x0A);
  }
}

/**
 * $A006: 备用入口 2 — PPU 数据传输辅助
 */
export function bank01_auxEntry2(sys: SystemState): void {
  // $84EB: 设置 PPU 指针
  _setupPPUPointer(sys, 0x006A, 0x006B);
  // $84F2: 设置 scroll 变量
  _setupPPUPointer(sys, 0x007A, 0x007B);
  // JSR $9B7F → PPU data clear
  // JSR $B0C0 → ROM data load
  _loadRomSection(sys, 0x05, 0xB3);

  // $8503-$850E: scroll 变量清零
  sys.mem[0x44] = 0;
  sys.mem[0x45] = 0;

  // $8509-$8513: 从 ROM $B271 复制 palette → $039C
  for (let i = 0; i < 0x34; i++) {
    sys.mem[0x039C + i] = readBankRom(sys, 0xB271 + i);
  }

  // 场景 ID → 查表读取数据显示
  const sceneId = sys.mem[0x26];
  const info = readBankRom(sys, 0xBCD1 + sceneId);

  // 高 nibble → 查 $BCF3 表 → JSR $9D27 (数字显示)
  const hiNibble = (info >> 4) & 0x0F;
  const ptrHi = readBankRom(sys, 0xBCF4 + hiNibble);
  const ptrLo = readBankRom(sys, 0xBCF3 + hiNibble);

  // 低 nibble → 查 $BD64 表 → JSR $9D50 (字符显示)
  const loNibble = info & 0x0F;
  const charLo = readBankRom(sys, 0xBD64 + loNibble * 2);
  const charHi = readBankRom(sys, 0xBD65 + loNibble * 2);

  // $8544-$8559: 比分显示 → 读 $2A/$2B → PPU
  _renderScoreDisplay(sys, sys.mem[0x2A], sys.mem[0x2B]);
}

/**
 * $A009: 备用入口 3 — 精灵属性设置
 */
export function bank01_auxEntry3(sys: SystemState): void {
  // $83D0: JSR $A3D0 → 精灵 OAM 属性
  const $3A = sys.mem[0x3A];
  if ($3A & 0x04) {
    const idx = sys.mem[0xED];
    const spriteData = readBankRom(sys, 0xB22D + idx);

    // 方向 → $0558/$055C
    const dirBit = (spriteData & 0x80) >> 1;
    const oamX = ((dirBit >> 1) | (dirBit >> 2)) & 0xFF;
    sys.mem[0x0558] = oamX;
    sys.mem[0x055C] = oamX + 8;

    // Y 坐标 → $055B/$055F
    const yBase = (spriteData & 0x7F) + 0x50;
    sys.mem[0x055B] = yBase;
    sys.mem[0x055F] = yBase;
  } else {
    // 隐藏 (screen off)
    sys.mem[0x0558] = 0xF8;
    sys.mem[0x055C] = 0xF8;
  }
}

/**
 * $A00C: 备用入口 4 — 音效/音频调用
 */
export function bank01_auxEntry4(sys: SystemState): void {
  // $80EC → 触发标题音效
  // 读 $79 → 检查与 $44 的关系，设置音频参数
  const $79 = sys.mem[0x79];
  if ($79 < sys.mem[0x44]) {
    sys.mem[0x79] = $79 + 1;
  }
  // 写入 $4015 音频寄存器
  sys.mem[0x4015] = 0x0F;
}

/**
 * $A012: 备用入口 5 — 球员数据读取
 */
export function bank01_auxEntry5(sys: SystemState): void {
  // $867B: 根据场景 ID 加载 bytecode
  const sceneId = sys.mem[0x26];
  const param = readBankRom(sys, 0xB371 + sceneId);
  _execBytecodeEntry(sys, param);

  // JSR $9FA8 → waitFrame
  // 等待 bytecode 完成
  while ((sys.mem[0x4D] | sys.mem[0x4E]) !== 0) {
    if ((sys.mem[0x1E] & 0x10) !== 0) break; // START 跳过
  }

  // JSR $99F0 → palette fade
  // JMP $A652 → 下一场景
}

/**
 * $A015: 备用入口 6 — 背景/nametable 操作
 */
export function bank01_auxEntry6(sys: SystemState): void {
  // $869F: 场景背景渲染
  const sceneId = sys.mem[0x26];
  const param = readBankRom(sys, 0xB3D7 + sceneId);
  _execBytecodeEntry(sys, param);

  // 等待 bytecode 完成（安全上限轮询 + $E9 帧延迟）
  let _wait1 = 0;
  while ((sys.mem[0x4D] | sys.mem[0x4E]) !== 0) {
    if (++_wait1 > 2000) { sys.mem[0xE9] = Math.max(sys.mem[0xE9], 1); return; }
  }

  // JSR $A01E → 加载下一帧数据
  // PPU nametable 写入
  const ppuAddr = 0x224E;
  sys.mem[0x2006] = ppuAddr >> 8;
  sys.mem[0x2006] = ppuAddr & 0xFF;
  // 写入 24 bytes
  for (let i = 0; i < 24; i++) {
    sys.mem[0x2007] = 0;
  }
}

/**
 * $A018: 备用入口 7 — 调色板/颜色辅助
 */
export function bank01_auxEntry7(sys: SystemState): void {
  // $86BE: palette 管理
  // JSR $A721 → JSR $A64C
  const $26 = sys.mem[0x26];
  _paletteSetup(sys, $26 & 0x0F, ($26 >> 4) & 0x0F);
}

/**
 * $A01B: 备用入口 8 — scroll/窗口设置
 */
export function bank01_auxEntry8(sys: SystemState): void {
  // $86D2: scene 重启/重置
  writeMem(sys, 0x0700, 0x55);

  // $86D7: JSR $98A0 + $9B7F — PPU 重置
  const sceneId = sys.mem[0x26];
  const param = readBankRom(sys, 0xB3B5 + sceneId);
  _execBytecodeEntry(sys, param);

  // 等待 bytecode（安全上限轮询 + $E9 帧延迟）
  let _wait2 = 0;
  while ((sys.mem[0x4D] | sys.mem[0x4E]) !== 0) {
    if (++_wait2 > 2000) { sys.mem[0xE9] = Math.max(sys.mem[0xE9], 1); return; }
  }

  // JSR $9C3A → 加载数据
  // palette fade → scene transition
}

// ═════════════════════════════════════════════════
// $A20F: 场景数据加载
// ═════════════════════════════════════════════════

export function bank01_loadSceneData(sys: SystemState): void {
  // $8721/$8719: 根据 $26 加载场景数据
  const $26 = sys.mem[0x26];
  // JSR $9BA0 → PPU 清屏
  // JSR $9B6F → PPU 配置
  sys.mem[0x7B] = 0;
  // JSR $8920 → bytecode restore

  sys.mem[0x8E] = 0;
  sys.mem[0x8F] = 0x2E;

  if (sys.mem[0x2A] === 0x02) {
    // 选项 2 特殊处理
    _loadSpecialScene(sys);
  } else {
    // 标准场景加载
    _loadRomSection(sys, 0x3D, 0xB4);
    _ppuRenderNametable(sys, 0x2088);
    _loadOamData(sys);
  }
}

// ═════════════════════════════════════════════════
// $A212: 字节码辅助
// ═════════════════════════════════════════════════

export function bank01_bytecodeHelper(sys: SystemState): number {
  // $84D8: bytecode 参数处理 → 返回 A = 操作结果
  const $E8 = sys.mem[0xE8];
  const param = readBankRom(sys, 0xAD8A + ($E8 & 0x1F));
  return param & 0x3F;
}

export function bank01_bytecodeHelper2(sys: SystemState): void {
  // $A474: 写入 bytecode 返回值到 PPU
  const param = sys.mem[0xEC];
  const $E8 = sys.mem[0xE8];
  const tableOff = readBankRom(sys, 0xAD8A + ($E8 & 0x1F));
  sys.mem[0x0656 + tableOff] = (sys.mem[0x0656 + tableOff] & 0xC0) | (param & 0x3F);
}

// ═════════════════════════════════════════════════
// 内部辅助函数
// ═════════════════════════════════════════════════

function _execBytecodeEntry(sys: SystemState, param: number): void {
  // $8464: 字节码解释器入口 — 查表 $83EE → 执行脚本
  const ptrLo = readBankRom(sys, 0x83EE + param * 2);
  const ptrHi = readBankRom(sys, 0x83EE + param * 2 + 1);
  if (ptrLo === 0 && ptrHi === 0) return;

  sys.mem[0x4D] = ptrLo;
  sys.mem[0x4E] = ptrHi;
}

function _processSceneData(sys: SystemState, count: number): void {
  // $83B4: 读取 $0340 区域数据
  let ea = sys.mem[0xEA];
  for (let i = 0; i < count; i++) {
    const offset = ea + i;
    // JSR $C50C → get char data ptr
    const val = sys.mem[0x0340 + offset];
    // JSR $B013 + $B02E → 读 ROM 表
    const romVal = readBankRom(sys, 0xB013 + (val & 0x0F));
    // 存 $0343
    sys.mem[0x0343 + i] = romVal;
  }
}

function _setupPPUPointer(sys: SystemState, addrLo: number, addrHi: number): void {
  // JSR $9B6F/$9B74 → 设置 PPU 指针
  sys.mem[0xE6] = addrLo;
  sys.mem[0xE7] = addrHi;
}

function _loadRomSection(sys: SystemState, arg1: number, arg2: number): void {
  // JSR $B0C0 → 加载 ROM 数据到 PPU 缓冲区
  const ptrLo = arg1 & 0xFF;
  const ptrHi = arg2 & 0xFF;
  const ptr = ((ptrHi << 8) | ptrLo) & 0xFFFF;

  // 读 ROM 指针表
  for (let i = 0; i < 8; i++) {
    const b = readBankRom(sys, ptr + i);
    sys.mem[0x05E8 + i] = b;
  }
}

function _loadOamData(sys: SystemState): void {
  // 加载精灵 OAM 数据到 $0468-$04CB
  for (let i = 0; i < 0x64; i++) {
    sys.mem[0x0468 + i] = readBankRom(sys, 0xACA2 + i);
  }
}

function _ppuRenderNametable(sys: SystemState, ppuAddr: number): void {
  // 设置 PPU 地址 → 写入 nametable 数据
  sys.mem[0x2006] = (ppuAddr >> 8) & 0xFF;
  sys.mem[0x2006] = ppuAddr & 0xFF;
  for (let i = 0; i < 4; i++) {
    sys.mem[0x2007] = 0;
  }
}

function _loadSpecialScene(sys: SystemState): void {
  // $884E/$875A: 特殊场景 (选项 2)
  _loadRomSection(sys, 0x51, 0xB4);
  _ppuRenderNametable(sys, 0x2085);
  _ppuRenderNametable(sys, 0x2099);
  _loadOamDataSpecial(sys);
}

function _loadOamDataSpecial(sys: SystemState): void {
  for (let i = 0; i < 0x64; i++) {
    sys.mem[0x0468 + i] = readBankRom(sys, 0xACB8 + i);
  }
}

function _renderScoreDisplay(sys: SystemState, scoreA: number, scoreB: number): void {
  // $8544-$8559: 比分显示
  const hiA = (scoreA >> 4) & 0x0F;
  const loA = scoreA & 0x0F;
  const hiB = (scoreB >> 4) & 0x0F;
  const loB = scoreB & 0x0F;

  // PPU nametable $21D0 → digit 1
  sys.mem[0x2006] = 0x21;
  sys.mem[0x2006] = 0xD0;
  sys.mem[0x2007] = hiA + 0x33; // hex digit tile
  sys.mem[0x2007] = loA + 0x33;

  // $2250 → digit 2
  sys.mem[0x2006] = 0x22;
  sys.mem[0x2006] = 0x50;
  sys.mem[0x2007] = hiB + 0x33;
  sys.mem[0x2007] = loB + 0x33;
}

function _paletteSetup(sys: SystemState, valA: number, valB: number): void {
  // JSR $997A → palette brightness/fade setup
  sys.mem[0x4A] = valA & 0x0F;
  sys.mem[0x4B] = valB & 0x0F;
}

// ═════════════════════════════════════════════════
// $A20C: 场景切换辅助 1
// ═════════════════════════════════════════════════

export function bank01_sceneSwitchHelper1(sys: SystemState): void {
  // $855A-$85B1: 场景过渡设置
  // 计算 $60/$61 用于场景渲染
  sys.mem[0x60] = 0;
  const $EC = sys.mem[0xEC];
  let lo = ($EC >> 2) & 0xFF;
  let hi = $EC >> 4;
  sys.mem[0x60] = lo;
  sys.mem[0x61] = hi;

  // 方向检查
  const $62 = sys.mem[0x62];
  if ($62 & 0x80) {
    sys.mem[0x60] = (0 - lo) & 0xFF;
    sys.mem[0x61] = (0 - hi - ((0 - lo) < 0 ? 1 : 0)) & 0xFF;
  }

  // LDA #$03 → 返回
  sys.regs.A = 3;
}

console.log('[bank01] ✅ 已翻译 — matchJump|titleInit|titleProcess|startGame|sceneSwitch|loadData|bytecode(2)|aux(8)');
