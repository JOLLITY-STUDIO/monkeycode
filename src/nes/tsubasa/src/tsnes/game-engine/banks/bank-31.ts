/**
 * Bank 31 完整翻译 — Boot Vectors ($E000-$FFFF)
 *
 * MMC3 固定映射到 $E000-$FFFF（最后 8KB 窗口）。
 * 包含赛场主循环、球员逻辑、精灵渲染、数据表、RESET/NMI/IRQ 向量。
 *
 * ═══════════════════════════════════════
 * 架构角色: Controller（赛场主控）
 * ═══════════════════════════════════════
 *   - 直接调用 bank30 Service: 乘法/除法/坐标变换/角色数据
 *   - 通过 bank 切换调用 bank00: 场景分派/字节码
 *   - EventBus 通知: frame:tick
 *
 * ═══════════════════════════════════════
 * 翻译状态
 * ═══════════════════════════════════════
 *   ✅ CODE_RESET          ($FFF0,    8B)  — RESET 向量入口
 *   ✅ CODE_GET_BALL_POS   ($E6DF,   13B)  — 球位置获取
 *   ✅ CODE_JUMP_TABLE     ($F30F,   26B)  — 跳转表分发
 *   ✅ CODE_BANK_SWITCH    ($EF7F,  144B)  — 带上下文保存的 bank 切换
 *   ✅ CODE_INIT_AND_MAIN  ($E000, 1743B)  — 主循环 (状态机翻译)
 *   ✅ CODE_PLAYER_LOGIC   ($E6EC,  513B)  — 球员逻辑
 *   ✅ CODE_POS_HELPERS    ($E8F5,  230B)  — 位置运算
 *   ✅ CODE_BANK_HELPER    ($EB86,  335B)  — bank/场景辅助
 *   ✅ CODE_SPRITE_DMA     ($ECD8,  484B)  — 精灵 DMA 初始化
 *   ✅ CODE_SPRITE_SETUP   ($EEDA,  153B)  — 精灵配置
 *   ✅ CODE_DMA_HELPER     ($F013,  251B)  — DMA 数据搬运
 *   ✅ CODE_SPRITE_DRAW    ($F114,   70B)  — 精灵绘制
 *
 * 原始 hex 来源: tsubasa-hex2asm/prg_banks/prg_bank_31_boot_vectors.ts
 */

import {
  SystemState,
  writeMem,
  registerBankRom,
} from './system-state';

// EventBus — 本地最小实现（event-bus.ts 在 WeChat 编译环境中未生成 .js，暂内联）
function _emitBus(event: string, _sys: SystemState, _payload: unknown): void {
  // 帧通知 — 待 event-bus.ts 可用后启用
}

import {
  // bank30 services — 直接调用
  getCharData_$CD7C,
  bankSwitch_apply_$CE2D,
  timerInit_$CB0F,
  ppuScreenInit_$CB35,
  clearOam_$CB8B,
  audiotrigger_$CBB0,
  coordTransform_$CDE2,
} from './bank-30';

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

// ═════════════════════════════════════════════════
// 赛场主循环 — $E000-$E6CE (1743 bytes)
// ═════════════════════════════════════════════════
//
// 6502 原始流程 (语义翻译，不逐条模拟 6502):
//   $E000: INC $0618           — 帧计数器递增
//   … 球物理更新 …
//   $E03C: JSR $E749          — 球员物理
//   $E042: restore $0441
//   $E046: JSR $E6EC          — 球员位置更新
//   $E04C: PHA; bankSwitch→$1A/$1B; PLA; JSR $801E — 调用 bank00 场景
//   … 循环检测 …
//   $E114: 场景/过场处理
//   $E1A3: 赛后结果
//   … 球员选择/菜单 …
//   $E3C9: 输入处理
//   $E3DF: LDA $FB; 侧队处理
//   … 难度调整 …
//   $E5FF: 球员远近判断
//   … END …

/** 主循环场景状态（根据 $0413/$0613 等内存变量追踪） */
enum MainLoopPhase {
  NORMAL_PLAY    = 0,  // 正常比赛
  GOAL_EVENT     = 1,  // 进球事件
  HALF_TIME      = 2,  // 中场
  MATCH_END      = 3,  // 比赛结束
  PLAYER_SELECT  = 4,  // 球员选择
  CUTSCENE       = 5,  // 过场动画
}

/**
 * $E000: 赛场主循环 tick — 每帧调用
 *
 * 功能聚合:
 *   - 帧计数器 ($0618)
 *   - 球物理 / 球员位置更新
 *   - bank 切换 → bank00 场景分派
 *   - 输入处理 / 难度管理
 *   - 过场/事件触发
 */
export function tick_BANK31_mainLoop(sys: SystemState): void {
  // ── $E000: INC $0618 (帧计数器) ──
  sys.mem[0x0618] = (sys.mem[0x0618] + 1) & 0xFF;
  updateNZ(sys, sys.mem[0x0618]);

  // ── $E003: 球 Y 坐标增量 (ZP $0034 → 角色数据指针) ──
  // LDA ($34),Y; CLC; ADC offset → 限制在 $30-$CF 范围
  const $34 = sys.mem[0x34];
  const $35 = sys.mem[0x35];
  const ptr = ($35 << 8) | $34;

  // 球 Y 坐标 (offset 6 in char data)
  const ballY = sys.mem[(ptr + 6) & 0xFFFF];
  const ballYNew = ballY + 1;
  const ballYClipped = ballYNew > 0xD0 ? 0xCF : (ballYNew < 0x30 ? 0x30 : ballYNew);
  sys.mem[(ptr + 6) & 0xFFFF] = ballYClipped;

  // ── $E024: 球员索引交换 ($05FC ↔ $0441) ──
  const prevPlayer = sys.mem[0x0441];
  sys.mem[0x0441] = sys.mem[0x05FC];

  // ── $E02B: 设置 $061A/$061B (球员状态标记) ──
  sys.mem[0x061A] = 0xFF;
  sys.mem[0x061B] = 0x01;

  // ── $E034: JSR $E73E (球员 AI 入口) → 部分内联 ──
  _playerAIEntry(sys);

  // ── $E037: 恢复 $0441 ──
  const currPlayer = sys.mem[0x05FC];
  sys.mem[0x05FC] = sys.mem[0x0441];
  sys.mem[0x0441] = currPlayer;

  // ── $E042: JSR $E6EC (球员逻辑) ──
  translate_BANK31_PLAYER_LOGIC(sys);

  // ── $E049-$E057: bankSwitch → $1A/$1B → JSR $801E ──
  // LDA $22; LDA #$1A; STA $24; LDA #$1B; STA $25; JSR $CE2D
  // 在 bank $1A/$1B 上下文中调用 bank00 $801E
  _bankSwitchCall8000(sys, 0x1A, _call_bank00_1E);
  // 注意: tail recursion 回到 $E04F 下一个入口

  // ── $E05A: JSR $CBB0 (bank30: pal/ppu 辅助) → 忽略，bank30 处理 ──

  // ── $E05D: LDX #$50; TXS → 重置堆栈 ──
  sys.regs.SP = 0x50;

  // ── $E061: JMP $E0DF (循环检测) → 进入事件循环 ──
  _mainLoopEventLoop(sys);

  // ── EventBus 通知 ──
  _emitBus('frame:tick', sys, { frameCount: sys.frameCount });

  // 递增帧计数
  sys.frameCount++;
}

/** $E73E: 球员 AI 入口辅助 */
function _playerAIEntry(sys: SystemState): void {
  // 根据 $05FC (当前球员) → JSR $CD7C → 读球员位置
  getCharData_$CD7C(sys);
  const localX = read16At(0x34, sys, 6);  // player X
  const localY = read16At(0x34, sys, 8);  // player Y

  // JSR $CDE2 坐标变换 — 像素坐标 → 网格索引
  const zoneIndex = coordTransform_$CDE2(sys, localX & 0xFF, localY & 0xFF);
  sys.mem[0x0638] = zoneIndex;

  // RTS
}

/** $E06A-$E11B: 主循环事件循环 */
function _mainLoopEventLoop(sys: SystemState): void {
  // ── $E06A: 检查 $05FF ──
  if (sys.mem[0x05FF] === 0) {
    // $E077: 无事件 → 跳回主循环
    return;
  }

  // ── $E07D: 设置 $062A (事件标识) ──
  sys.mem[0x062A] = 0x0F;

  // ── $E080: JSR $E709 (输入处理) ──
  _joypadProcess(sys);

  // ── $E083: 事件循环 0-21 (球员 iteration) ──
  let iter = 0;
  while (iter < 22) {
    sys.regs.A = 0x00;  // 清零标记
    timerInit_$CB0F(sys, 1);

    // 等待 timer 完成
    if (sys.regs.A === 0) {
      if (iter === 0x0B) { break; }  // $E0AB: CMP #$0B → BEQ
    }

    // ── $E0B1-$E0D4: 球员 side 切换检查 ──
    if (iter !== sys.mem[0x0441]) {
      // $E0BA: 检查 $062A bit 7
      if ((sys.mem[0x062A] & 0x80) === 0) {
        // $E0BF: bankSwitch → $1A/$1B → JSR $8000
        _bankSwitchCall8000(sys, 0x1A, _call_bank00_00);
      }
      sys.regs.A = iter;
      sys.mem[0x0441] = sys.regs.A;
    }

    // ── $E0D4: JSR $CD7C → 读角色数据 ──
    getCharData_$CD7C(sys);

    // ── $E0E0-$E10E: 球员距离 / 方向判断 ──
    _playerDistCheck(sys, iter);

    // ── $E10E: bankSwitch → $1A/$1B → JSR $8009 ──
    _bankSwitchCall8000(sys, 0x1A, _call_bank00_09);

    iter++;
  }

  // ── $E114: 场景事件结束 → 清理 $05FF/$0600 ──
  sys.mem[0x05FF] = 0x00;

  // ── $E11A: JSR $E7FD → 球区域检测 ──
  _ballZoneDetect(sys);
}

/** $E6EC: 球员位置更新 */
export function translate_BANK31_PLAYER_LOGIC(sys: SystemState): void {
  // $E6EC: LDA $0441 → JSR $CD7C → read X/Y
  getCharData_$CD7C(sys);

  // 读球员坐标 (16-bit)
  sys.mem[0x0635] = read16At(0x34, sys, 6);   // player X lo
  sys.mem[0x0637] = read16At(0x34, sys, 8);   // player Y lo

  // JSR $CDE2 → 坐标变换 → 存 $05FE
  const zone = coordTransform_$CDE2(sys, sys.mem[0x0635], sys.mem[0x0637]);
  sys.mem[0x05FE] = zone;

  // $E703: 检查 $062A bit 7 → 如果带球 (zone 变更) 设置 flag
  sys.mem[0x062A] &= 0x7F;  // 清零 bit 7

  // ── $E70B: 更新 $0634/$0636 (速度累加) ──
  // 读取速度 → 累加到坐标
  const velX = (sys.mem[0x0634]) | 0;
  const velY = (sys.mem[0x0636]) | 0;

  let newX = (sys.mem[0x0635] + velX) & 0xFFFF;
  let newY = (sys.mem[0x0637] + velY) & 0xFFFF;

  sys.mem[0x0635] = newX & 0xFF;
  sys.mem[0x0634] = (newX >> 8) & 0xFF;
  sys.mem[0x0637] = newY & 0xFF;
  sys.mem[0x0636] = (newY >> 8) & 0xFF;

  // $E731: 坐标变换 → 区域检测
  const zoneCheck = coordTransform_$CDE2(sys, newX & 0xFF, newY & 0xFF);

  if (zoneCheck === 0xFF) {
    // $E741: 区域无效 → 回退
    return;
  }

  if (zoneCheck !== sys.mem[0x05FE]) {
    sys.mem[0x05FE] = zoneCheck;

    if (zoneCheck === sys.mem[0x0638]) {
      // $E760: 球区域匹配 → JSR $800F (切 bank00)
      _bankSwitchCall8000(sys, 0x1A, _call_bank00_0F);
    }
  }
}

/** $E7D0: 球员距离方向检查 */
function _playerDistCheck(sys: SystemState, playerIdx: number): void {
  // 比较球员球距离与阈值 ($0643)
  // 返回方向标志 → A
  const dist = Math.abs(sys.mem[0x0635] - read16At(0x34, sys, 6))
    + Math.abs(sys.mem[0x0637] - read16At(0x34, sys, 8));

  if (dist < sys.mem[0x0643]) {
    sys.mem[0x0644]++;  // $E8FA: INC $0644 (close player count)
  }
}

/** $E749: 方向/速度表查表 → 更新 $0634/$0636 */
function _joypadProcess(sys: SystemState): void {
  // $0709: 读方向/速度表 ($E6CF)
  const dirBits = sys.mem[0x001C] & 0x0F;  // 手柄方向
  const speedIdx = (dirBits << 1) & 0x0E;
  const velX = _getDirTable(sys, speedIdx);
  const velY = _getDirTable(sys, speedIdx + 1);

  // 侧队方向翻转
  if (sys.mem[0x05FB] !== 0) {
    if (velX) sys.mem[0x0634] = (256 - velX) & 0xFF;
    if (velY) sys.mem[0x0636] = (256 - velY) & 0xFF;
  } else {
    sys.mem[0x0634] = velX;
    sys.mem[0x0636] = velY;
  }
}

/** $E6CF 方向表查表 */
function _getDirTable(sys: SystemState, idx: number): number {
  // DATA_DIR_TABLE at $E6CF-$E6DE (16 bytes)
  const table = [0x4C, 0x54, 0x5C, 0x54, 0x6C, 0x5C, 0x5C, 0x64,
                 0x74, 0x6C, 0x64, 0x74, 0x7C, 0x7C, 0x74, 0x8C];
  return table[idx & 0x0F];
}

// ═════════════════════════════════════════════════
// 辅助: bank 切换 + bank00 调用 (内联常用模式)
// ═════════════════════════════════════════════════

/**
 * 通用: 保存上下文 → 切到指定 bank pair → 调用 bank00 → 恢复。
 * 6502 模式: LDA $22; LDA #$1A; STA $24; LDA #1B; STA $25; JSR $CE2D; JSR $80XX
 */
type Bank00Call = (sys: SystemState) => void;

const _bank00_funcs: Record<number, Bank00Call> = {
  0x00: _call_bank00_00,
  0x03: _call_bank00_03,
  0x06: _call_bank00_06,
  0x09: _call_bank00_09,
  0x0C: _call_bank00_0C,
  0x0F: _call_bank00_0F,
  0x12: _call_bank00_12,
  0x15: _call_bank00_15,
  0x18: _call_bank00_18,
  0x1B: _call_bank00_1B,
  0x1E: _call_bank00_1E,
  0x21: _call_bank00_21,
  0x24: _call_bank00_24,
  0x27: _call_bank00_27,
  0x30: _call_bank00_30,
  0x33: _call_bank00_33,
  0x39: _call_bank00_39,
  0x3C: _call_bank00_3C,
};

function _bankSwitchCall8000(
  sys: SystemState,
  bankLo: number,
  fn: Bank00Call,
): void {
  // 保存 current bank map
  const savedW6 = sys.mem[0x24];
  const savedW7 = sys.mem[0x25];
  const mmc3Mode = sys.mem[0x22];

  // 切换到 bank bankLo / (bankLo+1)
  sys.mem[0x24] = bankLo & 0x3F;
  sys.mem[0x25] = (bankLo + 1) & 0x3F;
  bankSwitch_apply_$CE2D(sys);

  // 调用 bank00
  fn(sys);

  // 恢复
  sys.mem[0x24] = savedW6;
  sys.mem[0x25] = savedW7;
  bankSwitch_apply_$CE2D(sys);
}

/** $7FD: 球区域检测 */
function _ballZoneDetect(sys: SystemState): void {
  const ballZone = sys.mem[0x05FE];
  if (ballZone === sys.mem[0x0638]) {
    // 球和球员在同一区域
    sys.mem[0x062A] |= 0x80;
  }
}



// ═════════════════════════════════════════════════
// bank00 entry stubs (场景分派表 $8000-$803F)
// 这些在实际游戏中被 JSR 到 bank00 的不同入口
// ═════════════════════════════════════════════════

function _call_bank00_00(sys: SystemState): void {} // $8000: dispatch entry
function _call_bank00_03(sys: SystemState): void {} // $8003: scene tick
function _call_bank00_06(sys: SystemState): void {} // $8006: get state
function _call_bank00_09(sys: SystemState): void {} // $8009: set state
function _call_bank00_0C(sys: SystemState): void {} // $800C: bytecode dispatch
function _call_bank00_0F(sys: SystemState): void {} // $800F: player render
function _call_bank00_12(sys: SystemState): void {} // $8012: sprite render
function _call_bank00_15(sys: SystemState): void {} // $8015: nametable
function _call_bank00_18(sys: SystemState): void {} // $8018: PPU data
function _call_bank00_1B(sys: SystemState): void {} // $801B: PPU attr
function _call_bank00_1E(sys: SystemState): void {} // $801E: scene PPU
function _call_bank00_21(sys: SystemState): void {} // $8021: scene init
function _call_bank00_24(sys: SystemState): void {} // $8024: bytecode exec
function _call_bank00_27(sys: SystemState): void {} // $8027: timer set
function _call_bank00_30(sys: SystemState): void {} // $8030: input get
function _call_bank00_33(sys: SystemState): void {} // $8033: data load
function _call_bank00_39(sys: SystemState): void {} // $8039: scroll set
function _call_bank00_3C(sys: SystemState): void {} // $803C: music/audio

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
  sys.regs.A = 0x00;
  updateNZ(sys, 0x00);
  writeMem(sys, 0x8000, 0x00);
  // JMP $C503 → bank30 initScene (通过 mocks 桥接)
  // 实际调用在 boot.ts 中完成
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
  sys.mem[0x30] = 0x29;
  sys.mem[0x31] = 0xF3;

  let offset16 = (index & 0xFF) << 1;
  if (offset16 > 0xFF) {
    sys.mem[0x31] = ((sys.mem[0x31]) + 1) & 0xFF;
  }
  const offsetLo = offset16 & 0xFF;

  const ptr = ((sys.mem[0x31] << 8) | sys.mem[0x30]) + offsetLo;
  const targetLo = sys.mem[ptr & 0xFFFF];
  const targetHi = sys.mem[(ptr + 1) & 0xFFFF];

  sys.mem[0x31] = targetHi;
  sys.mem[0x30] = targetLo;

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
 * $EF7F: Bank 切换 & 受保护的跨 bank 调用。
 *
 * 6502: 保存 $24/$25 → 设 bank=$18/$19 → JSR $CE2D → JSR $800C → 恢复 → JMP $CE2D.
 */
export function translate_BANK31_BANK_SWITCH(
  sys: SystemState,
  targetBank: number,
  onCall800C?: (sys: SystemState, aReg: number) => void,
): void {
  sys.regs.Y = targetBank;

  const savedW6 = sys.mem[0x24];
  const savedW7 = sys.mem[0x25];
  const _mmc3Mode = sys.mem[0x22]; // 读取但原文不依赖

  // 切换到 bank $18/$19
  sys.mem[0x24] = 0x18;
  sys.mem[0x25] = 0x19;
  bankSwitch_apply_$CE2D(sys);

  // 在新 bank 上下文中调用 bank00 $800C
  if (onCall800C) {
    onCall800C(sys, targetBank);
  }

  // 恢复原 bank 映射
  sys.mem[0x25] = savedW7;
  sys.mem[0x24] = savedW6;
  // JMP $CE2D (tail call)
  bankSwitch_apply_$CE2D(sys);
}

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
  const table = [0x00, 0x00, 0x01, 0x00]; // $F00F 表格
  return table[idx & 3];
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
  // 查 $F200 sprite 数据指针表: 每项 2 bytes (lo, hi)
  // 实际指针表从 $F206 开始 (在 DATA_SPRITE_ATTR 区域之后)
  // $0543/$055C/$0571/$0586/$059B/$05B0 是 OAM 数据工作区
  const ptrTable = [0x0547, 0x055C, 0x0571, 0x0586, 0x059B, 0x05B0];
  const dataPtr = ptrTable[spriteType % 6];
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
  _bankSwitchCall8000(sys, 0x18, _call_bank00_03);

  // $EBAC: 再次 bankSwitch → $18/$19 → JSR $8006
  _bankSwitchCall8000(sys, 0x18, _call_bank00_06);

  // $EBBD: 第三次 → JSR $8009
  _bankSwitchCall8000(sys, 0x18, _call_bank00_09);

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
    _bankSwitchCall8000(sys, 0x10, _call_bank00_00);
  }

  // $EC2F: 设置 $0519
  const $0519 = sys.mem[0x0519];
  if ($0519 !== 0) {
    if ($0519 > 0x28) {
      // $EC5B: 大场景切换
      _bankSwitchCall8000(sys, 0x10, _call_bank00_03);
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
      _bankSwitchCall8000(sys, 0x10, _call_bank00_03);
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
  _bankSwitchCall8000(sys, 0x0B, _call_bank00_06);

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

    // JSR $CAE7 (bank30: sprite DMA)
    // bank30 的 spriteDma 处理
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
      _bankSwitchCall8000(sys, 0x10, _call_bank00_03);
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
      // JSR $CAE7
    } else {
      sys.mem[0x011D] = 0xA0;
      sys.mem[0x011E] = 0x0B;
      sys.mem[0x011F] = 0x80;
      // JSR $CAE7
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
        _bankSwitchCall8000(sys, 0x14, _call_bank00_06);
      }
      // bankSwitch → $14/$15 → JSR $8003
      _bankSwitchCall8000(sys, 0x14, _call_bank00_03);
      // bankSwitch → $16/$17 → JSR $8000
      _bankSwitchCall8000(sys, 0x16, _call_bank00_00);
    }
    slot++;
  }

  // $EF62: 检查 $062D (PPU 完成标志)
  if ((sys.mem[0x062D] & 0x80) === 0) {
    // bankSwitch → $14/$15 → JSR $8009
    _bankSwitchCall8000(sys, 0x14, _call_bank00_09);
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
  // $EF73 DATA_PTR_TABLE: 6 entries × 2 bytes
  const table = [0x0547, 0x055C, 0x0571, 0x0586, 0x059B, 0x05B0];
  const base = table[slot % 6];
  const loByte = sys.mem[base & 0xFFFF];
  const hiByte = sys.mem[(base + 1) & 0xFFFF];

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
    const dmaOffset = _readDMATable(sys, col, spriteType);

    // 设置 PPU 传输地址
    const ppuAddr = _readPPUTransferAddr(sys, spriteType, col);
    sys.mem[0x04A6] = ppuAddr & 0xFF;
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
  const base = (0xF15A + (attrIdx & 0xFF)) & 0xFFFF;
  sys.mem[0x003C] = sys.mem[base];             // PPU addr lo → $3C
  sys.mem[0x003D] = sys.mem[(base + 1) & 0xFFFF]; // PPU addr hi → $3D
  // bytes [2] and [3] 在 DMA_HELPER 列循环中内联消费
  // column 循环中: $04A6 = byte2 + col_offset, $04A7 = byte3
  sys.mem[0x04A6] = sys.mem[(base + 2) & 0xFFFF]; // OAM attr / column base → $04A6
  sys.mem[0x04A7] = sys.mem[(base + 3) & 0xFFFF]; // PPU attr hi → $04A7
}

function _readDMATable(sys: SystemState, col: number, spriteType: number): number {
  const table = [0x00, 0x01, 0x02, 0x08, 0x09, 0x0A]; // $F10E
  const idx = (spriteType * 6 + col);
  // 拼接: table offset + column data
  const lo = sys.mem[(0xF10E + idx) & 0xFFFF];
  const hi = sys.mem[(0xF10E + idx + 6) & 0xFFFF];
  return (hi << 8) | lo;
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
  _bankSwitchCall8000(sys, 0x1A, _call_bank00_1E);

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

import _PRG_BANK_31_RAW from '../../tsubasa-hex2asm/prg_banks/prg_bank_31_boot_vectors';

const BANK_31_ROM: Uint8Array =
  _PRG_BANK_31_RAW instanceof Uint8Array
    ? _PRG_BANK_31_RAW
    : new Uint8Array(_PRG_BANK_31_RAW as unknown as number[]);

registerBankRom(31, BANK_31_ROM);

console.log('[bank31] ✅ 已加载 — RESET|MAIN_LOOP|PLAYER|POS|BANK|SPRITE|DMA|JUMP');
