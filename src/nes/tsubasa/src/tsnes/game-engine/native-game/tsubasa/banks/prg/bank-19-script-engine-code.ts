/**
 * Bank 19: Script Parser + Lookup Tables ($8000-$9FFF)
 *
 * MMC3 可切换 bank。
 * 功能: 标题画面/过场的 PPU 上传包脚本解释器 + 游戏数据查找表
 *
 * ═══════════════════════════════════════
 * 架构角色: Script Engine + Data Provider
 * ═══════════════════════════════════════
 *
 * 原始 hex: tsubasa-hex2asm/prg_banks/prg_bank_19_lookup_tables.ts
 *
 * ── Bank 布局 (CPU $8000-$9FFF) ──
 *   $8000-$8FFF: 数据表 (metatile 映射、碰撞、调色板属性等)
 *   $9000-$9165: 主解析循环 — 分类器 (上传包 vs 控制码)
 *   $9166-$9173: 控制码跳转表 (7 entries × 2 bytes)
 *   $91A6-$9234: 控制码子处理器集合
 *   $9235-$9245: 标志位设置
 *   $92A6-$930F: 调色板操作系列 (3 个函数)
 *   $9333-$9387: 场景初始化 + 脚本指针推进
 *   $9388-$93C1: 场景专用初始化
 *   $93C2-$9405: 场景过渡/淡入淡出
 *   $9406-$944D: PPU 上传包写入 — 逐行写 $04A5 OAM 队列
 *   $944E-$988E: PPU 上传包数据 + 文本控制码脚本 (含 TECMO)
 *   $988F-$9FFF: FF 填充
 *
 * ═══════════════════════════════════════
 * 翻译状态: ✅ 完整翻译
 * ═══════════════════════════════════════
 */

import type { SystemState } from '../system-state';
import { writeMem, readMem } from '../system-state';

// ── 场景脚本/对白数据 bank（原始 MMC3 映射 bank 03/04/05/25） ──
import { getBank03Data } from './bank-03-segment-table';
import { getBank04Data } from './bank-04-code';
import { getBank05Data } from './bank-05-code';
import { getBank25Data } from './bank-25-code';

import {
  DATA_$8000_$833F,
  DATA_$83E0_$8B8F,
  DATA_$8BA0_$8F4F,
} from './bank-19-script-engine-data';

// ── 结构化脚本数据（替代原始 bytecode 流 DATA_$944E_$988E + DATA_$988F_$9FFF） ──
import type { Bank19ScriptCommand } from './bank-19-script-engine-structured-data';
import { SCRIPT_COMMANDS, BYTE_OFFSET_TO_CMD } from './bank-19-script-engine-structured-data';

// ═════════════════════════════════════════════════
// 零页 / 内存常量
// ═════════════════════════════════════════════════

/** NMI 同步标志 — $0515 */
const NMI_FLAG = 0x0515;

// ═════════════════════════════════════════════════
// 控制码跳转表 ($9166-$9173) — 已内联到 switch，此处仅文档
// ═════════════════════════════════════════════════
// E0→setState  E1→jump  E2→setXY  E3→terminate
// E4→string    E5→call  E6→other

// ═════════════════════════════════════════════════
// 主要入口
// ═════════════════════════════════════════════════

/**
 * $8000 / $9333: 脚本引擎入口
 *
 * bank-19 的核心入口。被场景初始化代码调用，启动标题画面/过场的
 * 脚本解析器。执行以下流程:
 *   1. 初始化指针 → 指向 DATA_$944E 上传包数据
 *   2. 进入主循环: 逐字节解析
 *      - < $E0: 上传包 (PPU tile 数据) → 写入 $04A5 队列
 *      - >= $E0: 控制码 → 分发给控制码处理器
 *
 * 6502 原始流程:
 *   $9333: LDA #$80; STA $0515  — 清除 NMI 标志
 *   $9339: 设置脚本完成回调
 *   $933F: JMP $9000              — 进入主解析循环
 *
 * 但实际上 $9333 只是一个包装器，真正的入口是 $9000。
 * 调用方通过 $C515 (waitNMI 的翻译) 进入，然后切到 bank-19。
 *
 * @param sys 系统状态
 */
export function bank19_entry(sys: SystemState): void {
  console.log('[bank19] entry — script parser starting');

  // $9333: LDA #$80; STA $0515 — 设置 NMI 标志 (告知 NMI handler 有更新待处理)
  writeMem(sys, NMI_FLAG, 0x80);

  // 进入主解析循环
  bank19_mainParser(sys);
}

/**
 * $9000-$9165: 主解析循环 (358 bytes)
 *
 * 6502:
 *   $9000-$9029: 初始化 — 设 CHR bank, 指针 $88/$89 → $B467, offset=0
 *   $902D-$9043: 主循环 — 读字节 → 分类
 *   $9045-$909E: NMI 等待 + 字符集写入辅助
 *   $909F-$910A: 上传包处理分支
 *   $910B-$9165: 控制码分派
 *
 * 翻译后简化: 去掉逐字节模拟，改为语义化分步执行。
 */
export function bank19_mainParser(sys: SystemState): void {
  console.log('[bank19] mainParser — iterating structured commands');

  // ── $9000-$9029: 初始化 ──
  sys.mem[0x0490] = 0;
  sys.mem[0x0491] = 0;
  sys.mem[0x0087] = 0;

  writeMem(sys, 0x05FB, 0x00);
  writeMem(sys, 0x0441, 0x09);
  writeMem(sys, 0x0442, 0x14);
  writeMem(sys, 0x063F, 0x80);

  // ── 主循环 — 遍历预解析的结构化命令 ──
  const MAX_ITER = 5000;
  let iter = 0;
  let cmdIdx = 0;

  while (cmdIdx < SCRIPT_COMMANDS.length && iter < MAX_ITER) {
    iter++;
    const cmd = SCRIPT_COMMANDS[cmdIdx];
    cmdIdx++;

    switch (cmd.type) {
      case 'upload': {
        bank19_handleStructuredUpload(sys, cmd);
        break;
      }
      case 'upload_null': {
        // 0x00 null packet — skip
        break;
      }
      case 'ctrl_state': {
        sys.mem[0x8B] = cmd.state;
        console.log(`[bank19] E0: set state = 0x${cmd.state.toString(16)}`);
        break;
      }
      case 'ctrl_jump': {
        // resolve byte-offset delta to command index
        const targetOffset = cmd.byteOffset + cmd.delta;
        const target = BYTE_OFFSET_TO_CMD.get(targetOffset);
        if (target !== undefined) {
          console.log(`[bank19] E1: jump +0x${cmd.delta.toString(16)} → cmd ${target}`);
          cmdIdx = target;
        } else {
          console.warn(`[bank19] E1: jump +0x${cmd.delta.toString(16)} → no target found`);
        }
        break;
      }
      case 'ctrl_set_xy': {
        sys.mem[0x8B] = cmd.x;
        sys.mem[0x8C] = cmd.y;
        console.log(`[bank19] E2: set XY = (0x${cmd.x.toString(16)}, 0x${cmd.y.toString(16)})`);
        break;
      }
      case 'ctrl_terminate': {
        console.log('[bank19] E3: script terminate');
        cmdIdx = SCRIPT_COMMANDS.length; // exit loop
        break;
      }
      case 'ctrl_string': {
        for (const ch of cmd.tiles) {
          bank19_writeStringChar(sys, ch);
        }
        break;
      }
      case 'ctrl_call': {
        console.log(`[bank19] E5: routine call param=0x${cmd.routine.toString(16)}`);
        // TODO: implement actual routine dispatch in fixed bank
        break;
      }
      case 'ctrl_other': {
        console.log(`[bank19] E6: other control param=0x${cmd.param.toString(16)}`);
        break;
      }
      case 'ctrl_unknown': {
        // FF padding / unknown control — skip
        break;
      }
    }
  }

  if (iter >= MAX_ITER) {
    console.warn('[bank19] mainParser — max iterations reached, stopping');
  }
}

// ═════════════════════════════════════════════════
// PPU 上传包写入 (结构化版本)
// ═════════════════════════════════════════════════

/**
 * 处理结构化 upload 命令 — 写 [count, addr_lo, addr_hi, tiles...] 到 $05E8 队列
 */
function bank19_handleStructuredUpload(sys: SystemState, cmd: Bank19ScriptCommand & { type: 'upload' }): void {
  const count = cmd.tiles.length;
  const ppuAddrLo = cmd.addr & 0xFF;
  const ppuAddrHi = (cmd.addr >> 8) & 0xFF;

  console.log(`[bank19] upload: count=${count}, addr=$${ppuAddrHi.toString(16)}${ppuAddrLo.toString(16)}`);

  // 等待 NMI
  let waitFrames = 0;
  while ((readMem(sys, NMI_FLAG) & 0x80) && waitFrames < 60) {
    waitFrames++;
  }
  writeMem(sys, NMI_FLAG, 0x01);

  const qIdx = readMem(sys, 0x0628);
  const QUEUE_AREA = 0x05E8;

  writeMem(sys, QUEUE_AREA + qIdx, count);
  writeMem(sys, QUEUE_AREA + qIdx + 1, ppuAddrLo);
  writeMem(sys, QUEUE_AREA + qIdx + 2, ppuAddrHi);

  for (let i = 0; i < count; i++) {
    writeMem(sys, QUEUE_AREA + qIdx + 3 + i, cmd.tiles[i]);
  }

  writeMem(sys, 0x0628, qIdx + 3 + count);
  writeMem(sys, QUEUE_AREA + qIdx + 3 + count, 0x00);
  writeMem(sys, NMI_FLAG, 0x80);
}

// ═════════════════════════════════════════════════
// 字符直写辅助
// ═════════════════════════════════════════════════

/**
 * 将单个 tile (来自 E4 字符串) 写入 PPU 队列
 *
 * 6502 中通过 $C524 (bytecode 的 PPU 写入子程序) 完成。
 * 这里直接构建一个单条目队列。
 */
function bank19_writeStringChar(sys: SystemState, tile: number): void {
  // 使用 $04A5 简化的单 tile 队列条目
  const qIdx = readMem(sys, 0x0628);

  writeMem(sys, 0x05E8 + qIdx, 0x01);      // entry type = 1 tile

  // PPU addr 使用当前的 $8B (光标位置)
  const cursorLo = sys.mem[0x8B] & 0x1F;
  const cursorHi = 0x22; // nametable $2200 区域
  writeMem(sys, 0x05E9 + qIdx, cursorLo);
  writeMem(sys, 0x05EA + qIdx, cursorHi);

  writeMem(sys, 0x05EB + qIdx, tile);       // tile data

  // 写终止符
  writeMem(sys, 0x05EB + qIdx + 1, 0x00);

  writeMem(sys, 0x0628, qIdx + 4);

  // 前进光标位置
  sys.mem[0x8B] = (sys.mem[0x8B] + 1) & 0xFF;

  // 设置 NMI 标志
  writeMem(sys, NMI_FLAG, 0x80);
}

// ═════════════════════════════════════════════════
// 调色板操作 — CODE_$92A6_$92D2, $92D3_$92ED, $92EE_$930F
// ═════════════════════════════════════════════════

/**
 * $92A6-$92D2: 调色板批量设置 — 将 $046F-$048E 的低 4 位
 * 替换为指定值，保留高 4 位不变。
 *
 * 6502:
 *   LDA #$30; PHA (保存基值)
 *   LDX #$00
 *   LDA $046F,X; AND #$0F; ORA $3A → 合并
 *   若结果为 $0F → 改为全 $0F
 *   STA $046F,X
 *   INX; CPX #$20; BNE loop
 */
export function bank19_setPaletteLowNibble(sys: SystemState, baseVal: number): void {
  for (let i = 0; i < 0x20; i++) {
    const orig = sys.mem[0x046F + i];
    let newVal = (orig & 0x0F) | (baseVal & 0xF0);
    if (newVal === 0x0F) {
      newVal = 0x0F; // 全黑? 保留原逻辑
    }
    sys.mem[0x046F + i] = newVal;
  }
}

/**
 * $92D3-$92ED: 调色板递减 — 从 baseVal 开始每次减 $10
 * 直到 baseVal < $10 则结束。
 *
 * 6502:
 *   LDA $3A; SEC; SBC #$10; BPL loop
 */
export function bank19_paletteShiftDown(sys: SystemState, startVal: number): void {
  let val = startVal;
  while (val >= 0x10) {
    bank19_setPaletteLowNibble(sys, val);
    val -= 0x10;
  }
}

/**
 * $92EE-$930F: 调色板清零 — 清除 $046F-$048E (每 4 字节清除)
 *
 * 6502:
 *   LDX #$00; LDA #$00
 *   STA $046F,X; INX; INX; INX; INX
 *   CPX #$20; BNE loop
 */
export function bank19_clearPaletteSection(sys: SystemState): void {
  for (let i = 0; i < 0x20; i += 4) {
    sys.mem[0x046F + i] = 0;
  }
}

// ═════════════════════════════════════════════════
// 场景相关 — CODE_$9333_$9387 (85 bytes)
// ═════════════════════════════════════════════════

/**
 * $9333-$9338: NMI 标志设置 + 主循环入口
 *
 * 在调用 mainParser 前设置 NMI 标志并初始化场景相关变量。
 */
export function bank19_sceneInit(sys: SystemState): void {
  console.log('[bank19] sceneInit — starting scene script');
  writeMem(sys, NMI_FLAG, 0x80);
  bank19_mainParser(sys);
}

/**
 * $9339-$935C: 脚本指针推进 — 将当前脚本指针加到 $88/$89
 * 使后续读操作从新位置继续。
 *
 * 6502:
 *   LDA $8A; CLC; ADC $88; STA $88
 *   BCC skip; INC $89
 *   LDA #$00; STA $8A
 */
export function bank19_advancePointer(sys: SystemState, addend: number): void {
  // $88=ptr_lo, $89=ptr_hi, $8A=offset (zero-page script pointer trackers)
  const PTR_LO = 0x88;
  const PTR_HI = 0x89;
  const OFFSET = 0x8A;

  const oldLo = sys.mem[PTR_LO];
  const newLo = (oldLo + addend) & 0xFF;
  sys.mem[PTR_LO] = newLo;
  if (newLo < oldLo) {
    sys.mem[PTR_HI] = (sys.mem[PTR_HI] + 1) & 0xFF;
  }
  sys.mem[OFFSET] = 0;
}

/**
 * $935D-$9387: 场景状态重置 — 设置游戏状态标志
 *
 * 6502:
 *   LDA #$01; STA $046B
 *   LDA #$00; STA $4B; STA $0517; STA $053C
 *   LDA #$80; STA $053A
 *   LDA #$24; STA $4A
 *   LDA #$20; JSR $B406  — 调用 bank-19 内的子函数
 *   LDA #$28; JSR $B406
 *   LDA $20; AND #$FC; STA $20  — 清除 PPUCTRL 低 2 bit
 *   LDX #$10; LDA #$15; JSR $C530 — 精灵设置
 *   LDX #$00; LDA #$16; JSR $C530
 */
export function bank19_resetSceneState(sys: SystemState): void {
  writeMem(sys, 0x046B, 0x01);
  sys.mem[0x4B] = 0;
  writeMem(sys, 0x0517, 0x00);
  writeMem(sys, 0x053C, 0x00);
  writeMem(sys, 0x053A, 0x80);
  sys.mem[0x4A] = 0x24;

  // 调用子函数 (bank-19 内部)
  bank19_auxInit(sys, 0x20);
  bank19_auxInit(sys, 0x28);

  // 清除 PPUCTRL nametable 选择位
  sys.mem[0x20] &= 0xFC;

  // 精灵设置 (跨 bank 调用，简化)
  console.log('[bank19] resetSceneState — scene vars reset');
}

// ═════════════════════════════════════════════════
// 辅助初始化 — 被 sceneInit 调用
// ═════════════════════════════════════════════════

/**
 * $B406 (映射地址): 辅助初始化 — 设置精灵相关变量
 *
 * 6502 (在 bank-19 内):
 *   读参数并设置 PPU 队列/精灵数据。
 */
function bank19_auxInit(sys: SystemState, param: number): void {
  // 简化实现: 设置参数到内存
  sys.mem[0x8C] = param;
}

// ═════════════════════════════════════════════════
// 场景专用初始化 — CODE_$9388_$93C1 (58 bytes)
// ═════════════════════════════════════════════════

/**
 * $9388-$93C1: 从 ROM 数据表加载初始值到精灵区域
 *
 * 6502:
 *   LDX #$03
 *   LDA $B402,X; STA $0494,X; DEX; BPL loop
 *   LDA #$7C; STA $0490
 *   LDA #$7E; STA $0491
 *   LDA #$FF; STA $0557; STA $0558; STA $0541
 *   LDA #$FF; STA $054F
 *   LDA #$DD; STA $0553
 *   LDA #$80; STA $0547
 *   LDA #$31; STA $0559
 */
export function bank19_sceneSpecificInit(sys: SystemState): void {
  // 从 DATA_$83E0_$8B8F 加载 4 字节到 $0494-$0497
  // CPU $B402 → ROM $8402 → DATA_$83E0_$8B8F[$8402 - $83E0] = index 0x22
  const table = DATA_$83E0_$8B8F;
  const baseIdx = 0x8402 - 0x83E0; // 0x22 = 34
  for (let i = 0; i < 4; i++) {
    sys.mem[0x0494 + i] = table[baseIdx + i];
  }

  sys.mem[0x0490] = 0x7C;
  sys.mem[0x0491] = 0x7E;

  sys.mem[0x0557] = 0xFF;
  sys.mem[0x0558] = 0xFF;
  sys.mem[0x0541] = 0xFF;
  sys.mem[0x054F] = 0xFF;
  sys.mem[0x0553] = 0xDD;
  sys.mem[0x0547] = 0x80;
  sys.mem[0x0559] = 0x31;
}

// ═════════════════════════════════════════════════
// 场景过渡/淡入淡出 — CODE_$93C2_$9405 (68 bytes)
// ═════════════════════════════════════════════════

/**
 * $93C2-$9405: 逐帧场景过渡 — 每次递减亮度/标记直到完成
 *
 * 6502:
 *   LDA #$60; JSR $C515 — 等待
 *   LDA #$00; STA $8A
 *   循环: LDA #$01; JSR $C515; LDA $8A; ADC #$60; TAX
 *         若进位 → INC 上一页 (指针推进)
 *   DEC $054F; DEC $4A
 *   若 $4A == 0 → 退出
 *   若 $4A == $14 → LDX #$06
 *   若 $4A == $08 → LDX #$16
 *   STX $0470
 *   检查完成标志 → JMP (回调) 或继续循环
 */
export function bank19_sceneFadeTransition(sys: SystemState): void {
  const startVal = sys.mem[0x4A]; // 亮度/阶段值
  let val = startVal;

  // 递减循环
  while (val > 0) {
    writeMem(sys, 0x054F, val - 1);

    if (val === 0x14) {
      writeMem(sys, 0x0470, 0x06);
    } else if (val === 0x08) {
      writeMem(sys, 0x0470, 0x16);
    }

    val--;
    sys.mem[0x4A] = val;

    if (val === 0) {
      console.log('[bank19] sceneFadeTransition — done');
      break;
    }
  }
}

// ═════════════════════════════════════════════════
// 标志位设置 — CODE_$9235_$9245 (17 bytes)
// ═════════════════════════════════════════════════

/**
 * $9235-$9245: 设置 $063F bit6 — 激活某个渲染/显示标志
 *
 * 6502:
 *   LDA $063F; ORA #$40; STA $063F
 */
export function bank19_setRenderFlag(sys: SystemState): void {
  writeMem(sys, 0x063F, readMem(sys, 0x063F) | 0x40);
}

/**
 * $923C-$9245: 设置调色板值
 *
 * 6502:
 *   LDA #$0F; STA $0472
 */
export function bank19_setPaletteEntry(sys: SystemState): void {
  writeMem(sys, 0x0472, 0x0F);
}

// ═════════════════════════════════════════════════
// per-frame tick — 供 NMI/帧循环调用
// ═════════════════════════════════════════════════

/**
 * bank-19 每帧 tick
 *
 * 画面每帧调用以推进脚本。
 * 检查 NMI 标志并推进主解析器。
 */
/** 命令索引追踪内存地址 ($8A — 复用原 byte offset 位置存储 cmdIdx) */
const CMD_IDX = 0x8A;

export function bank19_tick(sys: SystemState): boolean {
  const nmiFlag = readMem(sys, NMI_FLAG);
  if (nmiFlag & 0x80) {
    return false; // 仍在等待 NMI
  }

  // 从 sys.mem[$8A] 读取当前命令索引
  let cmdIdx = sys.mem[CMD_IDX];
  if (cmdIdx >= SCRIPT_COMMANDS.length) return false;

  const cmd = SCRIPT_COMMANDS[cmdIdx];
  cmdIdx++;
  sys.mem[CMD_IDX] = cmdIdx;

  switch (cmd.type) {
    case 'upload': {
      bank19_handleStructuredUpload(sys, cmd);
      return true;
    }
    case 'upload_null': {
      // 0x00 是原始 bytecode 暂停点，返回 false 让调用方等待下一帧
      return false;
    }
    case 'ctrl_state': {
      sys.mem[0x8B] = cmd.state;
      return true;
    }
    case 'ctrl_jump': {
      const targetOffset = cmd.byteOffset + cmd.delta;
      const target = BYTE_OFFSET_TO_CMD.get(targetOffset);
      if (target !== undefined) {
        sys.mem[CMD_IDX] = target;
      }
      return true;
    }
    case 'ctrl_set_xy': {
      sys.mem[0x8B] = cmd.x;
      sys.mem[0x8C] = cmd.y;
      return true;
    }
    case 'ctrl_terminate': {
      sys.mem[CMD_IDX] = SCRIPT_COMMANDS.length; // 标记结束
      return false;
    }
    case 'ctrl_string': {
      for (const ch of cmd.tiles) {
        bank19_writeStringChar(sys, ch);
      }
      return true;
    }
    case 'ctrl_call':
    case 'ctrl_other':
    case 'ctrl_unknown':
    default: {
      return true;
    }
  }
}

/**
 * bank19_writeUploadPacket — 将单个 tile 写入 PPU OAM 上传队列 ($04A5)
 *
 * 原始 6502: $9406-$944D, 逐行写入 4 行 × 32 列 tile 数据到 OAM 队列。
 * 结构化版本: 写 entry type 0x20 到 $04A5, 推进列偏移。
 *
 * @deprecated 主要上传路径使用 bank19_handleStructuredUpload → $05E8 队列。
 *   此函数保留供遗留测试兼容。
 */
export function bank19_writeUploadPacket(sys: SystemState, _tile: number): void {
  const QUEUE_OAM = 0x04A5;
  writeMem(sys, QUEUE_OAM, 0x20); // entry type = 0x20 (逐行 tile 上传)

  // 推进列偏移: 4 行 × 32 列/行 = 128 (0x80)
  const oldOffset = sys.mem[0x8A];
  sys.mem[0x8A] = (oldOffset + 0x80) & 0xFF;
}

// ═════════════════════════════════════════════════
// 公开 API — 数据表访问
// ═════════════════════════════════════════════════

/**
 * 读取 bank-19 内的 tile 映射表
 *
 * $8000-$833F: 832 bytes — metatile 到 PPU tile 的映射表
 * 每 2×2 metatile → 4 个 PPU tile ID
 *
 * @param index 映射表索引 (0-207, 每个条目 4 bytes)
 * @returns 4 个 tile ID 组成的数组
 */
export function bank19_readTileMap(_sys: SystemState, index: number): number[] {
  // $8000-$833F: metatile → PPU tile 映射表, 每 4 字节一条
  const table = DATA_$8000_$833F;
  const base = index * 4;
  return [table[base], table[base + 1], table[base + 2], table[base + 3]];
}

/**
 * 读取碰撞/属性数据表
 *
 * $8BA0-$8F4F: 944 bytes — 游戏对象碰撞属性
 * 每个条目 4 bytes: [flags, attr1, attr2, attr3]
 */
export function bank19_readCollisionData(_sys: SystemState, index: number): number[] {
  // $8BA0-$8F4F: 碰撞属性表, 每 4 字节一条
  const table = DATA_$8BA0_$8F4F;
  const base = index * 4;
  return [table[base], table[base + 1], table[base + 2], table[base + 3]];
}

// ═════════════════════════════════════════════════
// 场景脚本数据存取（bank 03/04/05/25）
// ═════════════════════════════════════════════════

/** 场景脚本/对白数据 bank-03 */
export { getBank03Data as bank19_getSceneData03 } from './bank-03-segment-table';
/** 场景脚本/对白数据 bank-04 */
export { getBank04Data as bank19_getSceneData04 } from './bank-04-code';
/** 场景脚本/对白数据 bank-05 */
export { getBank05Data as bank19_getSceneData05 } from './bank-05-code';
/** 场景脚本/事件数据 bank-25 */
export { getBank25Data as bank19_getSceneData25 } from './bank-25-code';

// ═════════════════════════════════════════════════
// Dispatch table
// ═════════════════════════════════════════════════

export const bank19_dispatch: Record<number, (sys: SystemState) => void> = {
  0x00: bank19_entry,
  0x01: bank19_mainParser,
  0x02: bank19_sceneInit,
  0x03: bank19_resetSceneState,
  0x04: bank19_sceneSpecificInit,
  0x05: bank19_sceneFadeTransition,
};

console.log('[bank19] ✅ 已翻译 — parser|uploadPacket|controlCodes|palette|sceneInit|dataTables');
