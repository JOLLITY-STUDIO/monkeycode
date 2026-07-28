/**
 * Bank 01: Match Jump + Title Data ($8000-$9FFF)
 *
 * MMC3 可切换 bank，映射到 $8000-$9FFF 或 $A000-$BFFF 窗口。
 * 功能: 比赛跳跃/物理引擎、标题画面数据、UI 辅助
 *
 * ═══════════════════════════════════════
 * 架构角色: Controller（比赛主控） / Service（数据提供）
 * ═══════════════════════════════════════
 *   - 被 bank00 直接调用: 标题流程、场景切换
 *   - 被 bank31 通过 bank 切换调用: 比赛跳跃逻辑
 *
 * ═══════════════════════════════════════
 * 翻译状态
 * ═══════════════════════════════════════
 *   ⏳ CODE_$8003_$80EB   (233 bytes) — 比赛跳跃引擎
 *   ⏳ CODE_$80EC_$81CB   (224 bytes) — 标题画面渲染
 *   ⏳ CODE_$81CC_$8266   (155 bytes) — UI/交互逻辑
 *   ⏳ CODE_$8267_$832C   (198 bytes) — 场景切换辅助
 *   ⏳ 其余 CODE/DATA 块 — 待翻译
 *
 * 原始 hex: tsubasa-hex2asm/prg_banks/prg_bank_01_match_jump.ts
 */

import {
  SystemState,
  writeMem,
  readMem,
  registerBankRom,
} from './system-state';

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

// ═════════════════════════════════════════════════
// 公开 API — bank00 调用入口 ($A003-$A21F 跳转表)
// ═════════════════════════════════════════════════

/**
 * $A003: 备用入口 1 — 字节码解释器辅助
 *
 * 6502 原始: 在场景初始化后被 JSR 调用
 */
export function bank01_auxEntry1(sys: SystemState): void {
  // ⏳ 待从 CODE_$8003_$80EB 翻译
  console.log('[bank01] auxEntry1 — 待翻译');
}

/**
 * $A006: 备用入口 2 — PPU 数据传输辅助
 */
export function bank01_auxEntry2(sys: SystemState): void {
  console.log('[bank01] auxEntry2 — 待翻译');
}

/**
 * $A009: 备用入口 3 — 精灵属性设置
 */
export function bank01_auxEntry3(sys: SystemState): void {
  console.log('[bank01] auxEntry3 — 待翻译');
}

/**
 * $A00C: 备用入口 4 — 音效/音频调用
 */
export function bank01_auxEntry4(sys: SystemState): void {
  console.log('[bank01] auxEntry4 — 待翻译');
}

/**
 * $A00F: 跨 bank 调用入口 (bank30 callBank01_A00F → 此处)
 *
 * 6502 原始: bank30 保存上下文 → 切到 bank01 → JSR $A00F
 * 功能: 比赛跳跃物理计算
 */
export function bank01_crossBankEntry(sys: SystemState): void {
  // ⏳ 待从 CODE_$8003_$80EB 翻译 — 核心跳跃引擎
  console.log('[bank01] crossBankEntry ($A00F) — 待翻译');
}

/**
 * $A012: 备用入口 5 — 球员数据读取
 */
export function bank01_auxEntry5(sys: SystemState): void {
  console.log('[bank01] auxEntry5 — 待翻译');
}

/**
 * $A015: 备用入口 6 — 背景/nametable 操作
 */
export function bank01_auxEntry6(sys: SystemState): void {
  console.log('[bank01] auxEntry6 — 待翻译');
}

/**
 * $A018: 备用入口 7 — 调色板/颜色辅助
 */
export function bank01_auxEntry7(sys: SystemState): void {
  console.log('[bank01] auxEntry7 — 待翻译');
}

/**
 * $A01B: 备用入口 8 — scroll/窗口设置
 */
export function bank01_auxEntry8(sys: SystemState): void {
  console.log('[bank01] auxEntry8 — 待翻译');
}

/**
 * $A203: 标题画面入口
 *
 * 6502 原始: bank00 title boot → JMP $A203 (bank01)
 * 功能: 标题画面初始化 — PPU 设置、背景数据加载
 */
export function bank01_titleInit(sys: SystemState): void {
  // ⏳ 待从 CODE_$80EC_$81CB 翻译
  console.log('[bank01] titleInit ($A203) — 待翻译');
  // 预期: 加载 nametable、设置调色板、初始化菜单
}

/**
 * $A206: 标题画面处理
 *
 * 6502 原始: 每帧调用 — 处理光标移动、选项选择
 */
export function bank01_titleProcess(sys: SystemState): void {
  // ⏳ 待从 CODE_$81CC_$8266 翻译
  console.log('[bank01] titleProcess ($A206) — 待翻译');
}

/**
 * $A209: 游戏开始入口 (A+B 确认后跳转)
 *
 * 6502 原始: START + A+B → JMP $A209
 * 功能: 初始化比赛场景、加载球员数据
 */
export function bank01_startGame(sys: SystemState): void {
  // ⏳ 待从 CODE_$8267_$832C 翻译
  console.log('[bank01] startGame ($A209) — 比赛开始!');
  // 预期: 初始化 $0600-$06FF 区域、设置第一个场景
}

/**
 * $A20C: 场景切换辅助 1
 *
 * 6502 原始: 场景过渡时调用
 */
export function bank01_sceneSwitchHelper1(sys: SystemState): void {
  console.log('[bank01] sceneSwitchHelper1 ($A20C) — 待翻译');
}

/**
 * $A20F: 场景数据加载
 *
 * 6502 原始: 加载场景所需的 PPU/sprite 数据
 */
export function bank01_loadSceneData(sys: SystemState): void {
  console.log('[bank01] loadSceneData ($A20F) — 待翻译');
}

/**
 * $A212: 字节码辅助
 *
 * 6502 原始: 字节码解释器调用 — 执行特殊指令
 * @returns 操作结果 (在 A 寄存器中)
 */
export function bank01_bytecodeHelper(sys: SystemState): number {
  console.log('[bank01] bytecodeHelper ($A212) — 待翻译');
  return 0;
}

/**
 * $A215: 字节码辅助 2
 *
 * 6502 原始: 字节码解释器第二辅助入口
 */
export function bank01_bytecodeHelper2(sys: SystemState): void {
  console.log('[bank01] bytecodeHelper2 ($A215) — 待翻译');
}

// ═════════════════════════════════════════════════
// ROM 数据注册
// ═════════════════════════════════════════════════

import _PRG_BANK_01_RAW from '../../tsubasa-hex2asm/prg_banks/prg_bank_01_match_jump';

const BANK_01_ROM: Uint8Array =
  _PRG_BANK_01_RAW instanceof Uint8Array
    ? _PRG_BANK_01_RAW
    : new Uint8Array(_PRG_BANK_01_RAW as unknown as number[]);

registerBankRom(1, BANK_01_ROM);

console.log('[bank01] ✅ 已加载 — titleInit|titleProcess|startGame|aux(8)|bytecode(2)');
