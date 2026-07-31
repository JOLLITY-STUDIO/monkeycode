/**
 * Bank 24: Cutscene/Match Scene Control ($8000-$9FFF)
 *
 * MMC3 可切换 bank。
 * 功能: 比赛场景/过场控制 — scene state machine、TECMO logo、intro cutscenes
 *
 * ═══════════════════════════════════════
 * 架构角色: Controller（过场/比赛流程控制）
 * ═══════════════════════════════════════
 *
 * 6502 Entry Points (JMP vectors at $8000):
 *   $8000 → JMP $800F (scene state machine - main entry)
 *   $8003 → JMP $86F8 (scene tick/update)
 *   $8006 → JMP $8779 (scene data load)
 *   $8009 → JMP $87E6 (PPU/scene render)
 *   $800C → JMP $8851 (helper/aux)
 *
 * Phase 2b: 骨架实现 — TECMO logo 场景状态机
 *
 * 原始 hex: tsubasa-hex2asm/prg_banks/prg_bank_24_cutscene.ts
 */

import type { SystemState } from '../system-state';
import { writeMem, readMem } from '../system-state';
import { PRG_ROM_BANKS } from '../data/rom-data';
import { track } from '../debug-log';

// ── ROM data registration ──// ═════════════════════════════════════════════════
// Scene state machine — $8000/$800F 主入口
// ═════════════════════════════════════════════════
//
// 6502 原始: 从场景脚本表 $92 读取当前场景状态，逐帧推进过场动画。
// 场景状态存储在 $05E3-$05F4 区域。
//
// 关键内存:
//   $05E3: 场景激活标志 (0=完成, 1=运行中)
//   $05E4: 子状态索引 (跳到哪个子处理器)
//   $05E5: 脚本数据偏移
//   $05E9: 帧等待计数器
//   $063F: 渲染标志 (bit6=显示, bit7=主动画)

/** $8000/$800F: 场景状态机主入口 */
export function bank24_sceneStateMachine(sys: SystemState): void {
  track('bank24_sceneStateMachine', {
    e3: sys.mem[0x05E3],
    e4: sys.mem[0x05E4],
    e9: sys.mem[0x05E9],
  });

  // ── 检查 $063F 显示标志 ──
  const renderFlag = readMem(sys, 0x063F);
  if ((renderFlag & 0x40) === 0) {
    // 等待 bank-00 完成初始化
    return;
  }

  // ── 设置场景脚本指针 $5F/$60 ──
  // $800F: LDA #$20; STA $5F; LDA #$92; STA $60
  sys.mem[0x5F] = 0x20;
  sys.mem[0x60] = 0x92;

  // ── 从 $05EA 表读取子场景指针 ──
  const sceneIdx = readMem(sys, 0x05EA) || 0;
  const tblOff = sceneIdx * 2;
  const handlerLo = readMem(sys, 0x9220 + tblOff);
  const handlerHi = readMem(sys, 0x9220 + tblOff + 1);

  if (handlerLo === 0 && handlerHi === 0) {
    console.log(`[bank24] scene #${sceneIdx}: handler not found, scene done`);
    writeMem(sys, 0x05E3, 0); // 场景结束
    return;
  }

  sys.mem[0x5F] = handlerLo;
  sys.mem[0x60] = handlerHi;

  // ── 初始化场景变量 ──
  writeMem(sys, 0x05E9, 0); // 帧计数
  writeMem(sys, 0x05E5, 0); // 脚本偏移
  writeMem(sys, 0x05E4, 0); // 子状态
  writeMem(sys, 0x05F4, 0); // 辅助标志
  writeMem(sys, 0x05E3, 1); // 激活标志

  // ── 调色板/精灵初始化 ──
  writeMem(sys, 0x0515, 0x01); // NMI 标志

  console.log(`[bank24] scene ${sceneIdx} started, handler=$${handlerHi.toString(16)}${handlerLo.toString(16)}`);

  // 进入子场景处理器分发
  _bank24_dispatchSubScene(sys);
}

/** $8003/$86F8: 场景更新/tick — 每帧推进 */
export function bank24_sceneTick(sys: SystemState): void {
  track('bank24_sceneTick');

  // 检查场景是否激活
  if ((readMem(sys, 0x05E3) || 0) === 0) return;

  // 检查帧等待
  const frameWait = readMem(sys, 0x05E9) || 0;
  if (frameWait > 0) {
    writeMem(sys, 0x05E9, frameWait - 1);
    return;
  }

  // 推进子场景处理器
  _bank24_advanceSubScene(sys);
}

/** $8006/$8779: 场景数据加载 */
export function bank24_sceneDataLoad(sys: SystemState): void {
  track('bank24_sceneDataLoad');

  // 从脚本指针 ($5F/$60) 读取长度，复制场景数据到 PPU 队列
  const ptr = (sys.mem[0x60] << 8) | sys.mem[0x5F];
  if (ptr < 0x8000 || ptr > 0xBFFF) return;

  const length = readMem(sys, ptr);
  if (length === 0) {
    // 终止符
    writeMem(sys, 0x05E3, 0);
    return;
  }

  // 读 PPU 地址
  const ppuLo = readMem(sys, ptr + 1);
  const ppuHi = readMem(sys, ptr + 2);

  // 构建 PPU 队列
  const qIdx = readMem(sys, 0x0628) || 0;
  writeMem(sys, 0x05E8 + qIdx, length);
  writeMem(sys, 0x05E9 + qIdx, ppuLo);
  writeMem(sys, 0x05EA + qIdx, ppuHi);
  for (let i = 0; i < length; i++) {
    writeMem(sys, 0x05EB + qIdx + i, readMem(sys, ptr + 3 + i));
  }
  writeMem(sys, 0x0628, qIdx + 3 + length);
  writeMem(sys, 0x05E8 + qIdx + 3 + length, 0);

  // 推进脚本指针
  sys.mem[0x5F] = (sys.mem[0x5F] + 3 + length) & 0xFF;
  if (sys.mem[0x5F] < 3 + length) {
    sys.mem[0x60] = (sys.mem[0x60] + 1) & 0xFF;
  }
  writeMem(sys, 0x05E5, (readMem(sys, 0x05E5) + 1) & 0xFF);

  // NMI 标志
  writeMem(sys, 0x0515, 0x80);
}

/** $8009/$87E6: 场景渲染输出 — 将场景数据输出到 PPU */
export function bank24_sceneRender(sys: SystemState): void {
  track('bank24_sceneRender');

  // 检查渲染标志
  const renderFlag = readMem(sys, 0x063F);
  if ((renderFlag & 0x80) === 0) {
    // 设置 NMI 标志，等 NMI handler 渲染
    writeMem(sys, 0x0515, 0x80);
  }

  // 推进子状态
  writeMem(sys, 0x05E4, (readMem(sys, 0x05E4) + 1) & 0xFF);
}

/** $800C/$8851: 辅助函数 — 数据转换/查表 */
export function bank24_auxHelper(sys: SystemState): void {
  track('bank24_auxHelper');

  // 根据 $05E4 子状态索引分发辅助功能
  const subState = readMem(sys, 0x05E4) || 0;
  switch (subState) {
    case 0:
      // Sprite palette setup
      _bank24_setupSprites(sys);
      break;
    case 1:
      // Nametable attribute setup
      _bank24_setupAttributes(sys);
      break;
    case 2:
      // Scroll position setup
      _bank24_setupScroll(sys);
      break;
    default:
      // Done
      writeMem(sys, 0x05E3, 0);
      writeMem(sys, 0x05E4, 0);
      break;
  }
}

// ═════════════════════════════════════════════════
// 内部辅助
// ═════════════════════════════════════════════════

/**
 * 子场景分发 — 根据 $05E4 索引执行当前步骤
 */
function _bank24_dispatchSubScene(sys: SystemState): void {
  const subState = readMem(sys, 0x05E4) || 0;
  const subCount = 4; // 4 phases per scene typically

  if (subState >= subCount) {
    writeMem(sys, 0x05E3, 0); // 场景完成
    writeMem(sys, 0x05E4, 0);
    console.log('[bank24] scene all phases complete');
    return;
  }

  console.log(`[bank24] sub-scene phase ${subState}/${subCount}`);
  _bank24_executeSubScene(sys, subState);
}

/** 推进到下一子场景 */
function _bank24_advanceSubScene(sys: SystemState): void {
  const frameWait = readMem(sys, 0x05E9) || 0;
  if (frameWait === 0) {
    writeMem(sys, 0x05E4, (readMem(sys, 0x05E4) + 1) & 0xFF);
    _bank24_dispatchSubScene(sys);
  }
}

/** 执行单个子场景 */
function _bank24_executeSubScene(sys: SystemState, phase: number): void {
  switch (phase) {
    case 0:
      // Phase 0: 清除 nametable + 设置调色板
      _bank24_clearNametable(sys);
      _bank24_loadPalette(sys);
      writeMem(sys, 0x05E9, 2); // 等 2 帧
      break;

    case 1:
      // Phase 1: 加载 nametable tile 数据
      bank24_sceneDataLoad(sys);
      writeMem(sys, 0x05E9, 4); // 等 4 帧
      break;

    case 2:
      // Phase 2: 加载属性表 + 精灵
      _bank24_setupAttributes(sys);
      _bank24_setupSprites(sys);
      writeMem(sys, 0x05E9, 3); // 等 3 帧
      break;

    case 3:
      // Phase 3: 最终渲染 + 滚动设置
      bank24_sceneRender(sys);
      writeMem(sys, 0x05E9, 1); // 等 1 帧
      _bank24_setupScroll(sys);
      writeMem(sys, 0x063F, (readMem(sys, 0x063F) | 0x80) & 0xFF);
      writeMem(sys, 0x0515, 0x80);
      break;
  }
}

/** 清除 nametable (写 $00 到 $2000-$23FF) */
function _bank24_clearNametable(sys: SystemState): void {
  writeMem(sys, 0x0516, (readMem(sys, 0x0516) | 0x04) & 0xEF); // PPU increment = 1
  const qIdx = readMem(sys, 0x0628) || 0;
  writeMem(sys, 0x05E8 + qIdx, 0x20); // entry type
  writeMem(sys, 0x05E9 + qIdx, 0x00);
  writeMem(sys, 0x05EA + qIdx, 0x20); // PPU addr $2000
  writeMem(sys, 0x05EB + qIdx, 0x00); // fill byte
  writeMem(sys, 0x05EB + qIdx + 1, 0x00); // terminator
  writeMem(sys, 0x0628, qIdx + 2);
  writeMem(sys, 0x0515, 0x80);
}

/** 加载调色板 — 从 ROM bank 06 复制 */
function _bank24_loadPalette(sys: SystemState): void {
  // 调色板在 bank-06 ROM (通过 readMem 访问)
  for (let i = 0; i < 0x20; i++) {
    const color = readMem(sys, 0xB62A + i); // buf: ROM bank 06 palette area
    sys.mem[0x046F + i] = color;
  }
  writeMem(sys, 0x0515, 0x80);
}

/** 设置精灵数据 */
function _bank24_setupSprites(sys: SystemState): void {
  // Clear OAM shadow
  for (let i = 0; i < 0xA0; i++) {
    sys.mem[0x0200 + i] = 0xF8;
  }
  sys.mem[0x0568] = 0;
  sys.mem[0x0588] = 0;
  sys.mem[0x05A8] = 0;
  sys.mem[0x05C8] = 0;
}

/** 设置 nametable 属性表 */
function _bank24_setupAttributes(sys: SystemState): void {
  // 写属性表 $23C0-$23FF (64 bytes)
  const qIdx = readMem(sys, 0x0628) || 0;
  writeMem(sys, 0x05E8 + qIdx, 0x40); // entry: 64 tiles
  writeMem(sys, 0x05E9 + qIdx, 0xC0);
  writeMem(sys, 0x05EA + qIdx, 0x23); // PPU addr $23C0
  for (let i = 0; i < 0x40; i++) {
    writeMem(sys, 0x05EB + qIdx + i, 0x00); // default attribute = 0
  }
  writeMem(sys, 0x05EB + qIdx + 0x40, 0x00); // terminator
  writeMem(sys, 0x0628, qIdx + 3 + 0x40);
  writeMem(sys, 0x0515, 0x80);
}

/** 设置滚动位置 */
function _bank24_setupScroll(sys: SystemState): void {
  sys.mem[0x44] = 0;       // scroll Y = 0
  sys.mem[0x7A] = 0;       // scroll X = 0
  sys.mem[0x0490] = 0;     // v-scroll
  sys.mem[0x0491] = 0;     // h-scroll
}

// ═════════════════════════════════════════════════
// Dispatch table
// ═════════════════════════════════════════════════

/** Bank 24 dispatch table (offset → handler) */
export const bank24_dispatch: Record<number, (sys: SystemState) => void> = {
  0x00: bank24_sceneStateMachine,
  0x03: bank24_sceneTick,
  0x06: bank24_sceneDataLoad,
  0x09: bank24_sceneRender,
  0x0C: bank24_auxHelper,
};

console.log('[bank24] ✅ Phase 2b — 场景状态机 (TECMO logo|cutscene|render)');
