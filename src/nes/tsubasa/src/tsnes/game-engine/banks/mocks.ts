/**
 * Mock 层 — 未翻译 bank 的临时桩函数
 *
 * 翻译模式：逐 bank 替换 6502 机器码 → TypeScript 语义代码。
 * 未翻译的 bank 函数在此用 mock 替代，输出日志便于追踪执行路径。
 *
 * Bank 调用约定：
 *   所有跨 bank 调用都通过命名函数，参数为 SystemState，无返回值或返回数值。
 */

import { SystemState, writeMem, readMem } from './system-state';
import {
  initScene_$C64E,
  clearOam_$CB8B,
  multiply16_$CD3C,
  divide16_$CD0D,
  bankSwitch_Win6,
  bankSwitch_Win7,
  bankSwitch_apply_$CE2D,
  ppuScreenInit_$CB35,
  timerPoll_$CA97,
  timerInit_$CB0F,
  joypadUpdate_$C9B5,
  callBank01_A00F,
  nmiHandler_$C76E,
  nmiInit_$C71A,
  ppuDataTransfer_$C8FB,
  getCharData_$CD7C,
  sceneHelper_$DB62,
  frameInit_$CC02,
  paletteInit_$CCD2,
} from './bank-30';

// ═════════════════════════════════════════════════
// Bank 30: System Library ($C000-$DFFF)
// ═════════════════════════════════════════════════

/** $C500: initSystem → ✅ 已翻译 */
export function bank30_initSystem(sys: SystemState): void {
  initScene_$C64E(sys, true);
}

/** $C503: 场景初始化 — ✅ 已翻译 */
export function bank30_initScene(sys: SystemState): void {
  initScene_$C64E(sys, true);
}

/** $C51B: 中断处理入口 → ⏳ 待翻译 $CB02 */
export function bank30_irqHandler(sys: SystemState): void {
  // $C51B → JMP $CB02 (使用 bank31 数据, 暂时跳过)
}

/** $C51E: 乘法 — ✅ 已翻译 */
export function bank30_multiply(sys: SystemState): number {
  multiply16_$CD3C(sys);
  return (sys.mem[0x6C] << 8) | sys.mem[0x6B];
}

/** $C521: 除法 — ✅ 已翻译 */
export function bank30_divide(sys: SystemState): { quot: number; rem: number } {
  divide16_$CD0D(sys);
  return {
    quot: (sys.mem[0x70] << 8) | sys.mem[0x6F],
    rem:  (sys.mem[0x72] << 8) | sys.mem[0x71],
  };
}

/** $C50C: 获取角色数据 — ✅ 已翻译 ($CD7C) */
export function bank30_getCharData(sys: SystemState): void {
  getCharData_$CD7C(sys);
}

/** $C50F: Sprite DMA → ⏳ 待翻译 $CAE7 */
export function bank30_spriteDma(sys: SystemState, aReg: number, xReg: number, yReg: number): void {
  // 待翻译 $CAE7 (实际逻辑在 $C76E NMI handler 内)
}

/** $C509: 内存/OAM 填充 — ✅ 已翻译 */
export function bank30_memFill(sys: SystemState, val: number, start: number, len: number): void {
  for (let i = 0; i < len; i++) {
    sys.mem[(start + i) & 0xFFFF] = val;
  }
}

/** $C53F: Bank 切换 — ✅ 已翻译 ($CE2D)
 *
 * 6502 约定: 调用方先设置 sys.mem[0x24] = bankNum，然后调用此函数。
 * 实际执行: bankSwitch_apply_$CE2D(sys)
 */
export function bank30_bankSwitch(sys: SystemState, bankId: number): void {
  // 标准用法: STX $24; JSR $C53F (→ $CE2D)
  // 需要同时设置 window 6 和 window 7
  sys.mem[0x24] = bankId & 0x3F;            // window 6 bank
  sys.mem[0x25] = (bankId & 0x3F) + 1;      // window 7 = bankId+1 (常见模式)
  bankSwitch_apply_$CE2D(sys);
}

/** $C53C: 跳转表分发 → ⏳ 实际在 bank31 $F30F */
export function bank30_jumpTableDispatch(sys: SystemState, index: number): void {
  console.log(`[bank30] jumpTableDispatch index=${index} → bank31 $F30F`);
}

/** $C52A: 数据引用 → ⏳ 实际指向 bank31 DATA_$EF7F */
export function bank30_dataRefEF7F(sys: SystemState): number {
  return 0;
}

/** $C57B → $C6BE: 软重置 — ✅ 已翻译（合并进 initScene 冷/热启动双路径） */
export function bank30_softReset(sys: SystemState): void {
  // $C57B → JMP $C6BE
  // 软重置 = initScene(冷启动=false)
  initScene_$C64E(sys, false);
}

/** $C572 → $DB62: 场景辅助 — ✅ 已翻译 (234 bytes) */
export function bank30_helperC572(sys: SystemState): void {
  // JSR $DB62: 场景辅助 — 初始化角色动画状态 + 特殊场景配置
  sceneHelper_$DB62(sys, (_sys, aReg) => {
    // JSR $8003 (bank00): 在 bank 1C/1D 上下文中调用
    // A 寄存器来自 $05FB 异或结果
    console.log(`[bank30] sceneHelper → bank00 entry, A=$${aReg.toString(16)}`);
  });
}

// ═════════════════════════════════════════════════
// Bank 00: Scene Dispatch Engine ($8000-$9FFF)
// → 已翻译，见 ./bank-00.ts
// ═════════════════════════════════════════════════

export { bank00_dispatchScene, bank00_execBytecode, bank00_tickTimers } from './bank-00';

/** $8003: 场景 tick (每帧调用) — 兼容旧接口 */
export function bank00_tickScene(sys: SystemState): void {
  bank00_tickTimers(sys);
}

// ═════════════════════════════════════════════════
// Bank 01: Match Jump + Title Data — 从 bank-01.ts re-export
// ═════════════════════════════════════════════════

export {
  bank01_startGame,
  bank01_titleInit,
  bank01_titleProcess,
  bank01_sceneSwitchHelper1,
  bank01_loadSceneData,
  bank01_bytecodeHelper,
  bank01_bytecodeHelper2,
  bank01_auxEntry1,
  bank01_auxEntry2,
  bank01_auxEntry3,
  bank01_auxEntry4,
  bank01_auxEntry5,
  bank01_auxEntry6,
  bank01_auxEntry7,
  bank01_auxEntry8,
} from './bank-01';

// ═════════════════════════════════════════════════
// Bank 02: NMI Renderer — 从 bank-02.ts re-export
// ═════════════════════════════════════════════════

export {
  bank02_nmiHandler,
  bank02_loadSceneData,
  bank02_sceneSwitchHelper,
  bank02_auxEntry1,
  bank02_auxEntry2,
  bank02_auxEntry8,
} from './bank-02';

// ═════════════════════════════════════════════════
// 通用 mock
// ═════════════════════════════════════════════════

/** 切换到指定 bank (模拟 MMC3 bank switch) */
let bank08kStub: Uint8Array | null = null;

export function mock_bankSwitch(sys: SystemState, bankId: number): void {
  // 注册 bank 到 MMC3 $8000-$9FFF 窗口
  sys.mmc3Map[0] = bankId & 0x3F;
}

/** 通用: 读 PRG-ROM 中的函数入口地址 (little-endian) */
export function mock_readPrgAddr(sys: SystemState, bankId: number, offset: number): number {
  // 从注册的 bank ROM 表读取
  const byteLo = readMem(sys, 0x8000 + offset);      // 简化: 假设 bank 已映射到 $8000
  const byteHi = readMem(sys, 0x8000 + offset + 1);
  return byteLo | (byteHi << 8);
}

/** 通用: 调用未知子程序 (仅用于调试追踪) */
export function mock_callUnknown(sys: SystemState, addr: number, desc: string): void {
  console.log(`[MOCK unknown] CALL $${addr.toString(16).toUpperCase().padStart(4, '0')} — ${desc}`);
}
