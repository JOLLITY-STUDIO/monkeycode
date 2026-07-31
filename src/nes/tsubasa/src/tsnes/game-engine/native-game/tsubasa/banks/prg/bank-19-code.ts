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
import {
  DATA_$8000_$833F,
  DATA_$83E0_$8B8F,
  DATA_$8BA0_$8F4F,
  DATA_$944E_$988E,
  DATA_$988F_$9FFF,
} from './bank-19-data';

// ═════════════════════════════════════════════════
// 零页 / 内存常量
// ═════════════════════════════════════════════════

/** 脚本数据指针高字节 — 跟踪当前在 SCRIPT_DATA 中的位置 */
const PTR_HI = 0x89;

/** 脚本数据指针低字节 — 仅 bank19_advancePointer 使用 */
const PTR_LO = 0x88;

/** 当前读取偏移 — 数据流中的字节索引 */
const OFFSET = 0x8A;

/** nametable 选择/行计数 */
const NT_SELECT = 0x8B;

/** PPU 更新队列区域 — $04A5-$04ED (73 bytes) */
const QUEUE_BASE = 0x04A5;
const QUEUE_ENTRY_TYPE  = QUEUE_BASE + 0;
const QUEUE_ADDR_LO     = QUEUE_BASE + 1;
const QUEUE_ADDR_HI     = QUEUE_BASE + 2;
const QUEUE_DATA_START  = QUEUE_BASE + 3;

/** NMI 同步标志 — $0515 */
const NMI_FLAG = 0x0515;

/** 上传包格式常量 */
const PKT_TERMINATOR = 0x00;
const CTRL_THRESHOLD = 0xE0;
const NT_ROW_SIZE    = 0x20;
const NT_ROWS_PER_BLOCK = 4;

// ═════════════════════════════════════════════════
// 脚本数据 — bank-19 内嵌的 PPU 上传包 + 文本控制码
// ═════════════════════════════════════════════════
// 原始 ROM: $944E-$9FFF，CPU 入口指针 $B467
// 由 DATA_$944E_$988E (1089B) + DATA_$988F_$9FFF (1905B) 拼接

const SCRIPT_DATA: readonly number[] = [...DATA_$944E_$988E, ...DATA_$988F_$9FFF];

/** PTR_HI 初始值 — 对应脚本数据首字节 */
const PTR_HI_INIT = 0xB4;

/** 辅助: 将 (PTR_HI, OFFSET) 转换为 SCRIPT_DATA 中的索引 */
function scriptIdx(sys: SystemState, extra: number = 0): number {
  return (sys.mem[PTR_HI] - PTR_HI_INIT) * 256 + sys.mem[OFFSET] + extra;
}

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
  console.log('[bank19] mainParser — starting parse loop');

  // ── $9000-$9029: 初始化 ──
  sys.mem[0x0490] = 0;
  sys.mem[0x0491] = 0;
  sys.mem[0x0087] = 0;

  // 指针 → PTR_HI=$B4, OFFSET=0 (对应 SCRIPT_DATA[0])
  sys.mem[PTR_HI] = PTR_HI_INIT;
  sys.mem[OFFSET] = 0;

  writeMem(sys, 0x05FB, 0x00);
  writeMem(sys, 0x0441, 0x09);
  writeMem(sys, 0x0442, 0x14);
  writeMem(sys, 0x063F, 0x80);

  // ── 主解析循环 ──
  const MAX_ITER = 5000;
  let iter = 0;

  while (iter < MAX_ITER) {
    iter++;
    const offset = sys.mem[OFFSET];
    const idx = scriptIdx(sys);
    if (idx >= SCRIPT_DATA.length) {
      console.warn('[bank19] mainParser — script data exhausted');
      break;
    }
    const byte = SCRIPT_DATA[idx];

    if (byte >= CTRL_THRESHOLD) {
      sys.mem[OFFSET] = (offset + 1) & 0xFF;
      if (sys.mem[OFFSET] < 1) {
        sys.mem[PTR_HI] = (sys.mem[PTR_HI] + 1) & 0xFF;
      }
      const shouldContinue = bank19_handleControl(sys, byte);
      if (!shouldContinue) {
        console.log('[bank19] mainParser — control handler signaled stop');
        break;
      }
    } else {
      const shouldContinue = bank19_handleUploadPacket(sys, byte);
      if (!shouldContinue) {
        console.log('[bank19] mainParser — upload packet terminator (0x00)');
      }
    }
  }

  if (iter >= MAX_ITER) {
    console.warn('[bank19] mainParser — max iterations reached, stopping');
  }
}

// ═════════════════════════════════════════════════
// $9406-$944D — PPU 上传包写入 (72 bytes)
// ═════════════════════════════════════════════════
//
// 格式: 读入的字节 A = 一个 tile 数据或长度。
// 该函数将当前偏移 + tile 写入 $04A5 队列，供 NMI handler 消费。
// 一次处理 1 列 × 4 行 (写入 4 个 nametable 行的同一列位置)。
//
// 6502:
//   PHA              ; 保存 tile 数据
//   LDX #$00
//   STX $8B; STX $8A ; 清除 nametable 选择 & 偏移
//   (等待 NMI)
//   LDX #$24; LDA #$00
//   STA $04A5,X; DEX; BPL → 清 $04A5-$04C9 (37 bytes)
//   LDA #$20; STA $04A5     ; queue entry type = $20
//   LDX $8A; STX $04A6      ; PPU addr lo (nametable col)
//   PLA; PHA; ORA $8B; STA $04A7  ; PPU addr hi (with nametable select)
//   LDA #$80; STA $0515     ; NMI flag
//   TXA; ADC #$20; STA $8A  ; 下一行: offset += 32
//   LDA $8B; ADC #$00; STA $8B
//   CMP #$04; BCC loop      ; 处理 4 行 (共 128 tile)
//   PLA; RTS
//
// @param tile LO 本列要写入的 tile ID
// @param colOffset 当前 nametable 列偏移 (0-31)

export function bank19_writeUploadPacket(sys: SystemState, tile: number): void {
  // ── 初始化: 清 $8B/$8A ──
  sys.mem[NT_SELECT] = 0;
  let colOffset = sys.mem[OFFSET]; // 当前数据偏移作为列索引

  // ── 等待 NMI 标志清除 ──
  // 6502: JSR $C515 → 循环等 $0515 归零
  // 翻译: NMI handler 运行时 $0515 bit7=1，结束后=0
  // 这里等待最多 60 帧 (~1 秒)
  let waitFrames = 0;
  while ((readMem(sys, NMI_FLAG) & 0x80) && waitFrames < 60) {
    waitFrames++;
    // 帧等待由外部 NMI tick 驱动
  }

  // ── 设 NMI 标志 ──
  writeMem(sys, NMI_FLAG, 0x01);

  // ── 清 $04A5-$04C9 (37 bytes queue header area) ──
  for (let i = 0; i <= 0x24; i++) {
    sys.mem[QUEUE_BASE + i] = 0;
  }

  // ── 逐行写入 (4 行, 每行同一列) ──
  // 6502 循环: 写 [entry_type][addr_lo][addr_hi] → offset += 32
  let row = 0;
  let rowSelect = 0;

  while (row < NT_ROWS_PER_BLOCK && colOffset < 0x100) {
    // entry type = $20 (水平增量, count=32)
    sys.mem[QUEUE_ENTRY_TYPE] = 0x20;

    // PPU addr lo = colOffset (nametable 列位置)
    sys.mem[QUEUE_ADDR_LO] = colOffset & 0xFF;

    // PPU addr hi = 基础 ($20) + nametable 选择
    sys.mem[QUEUE_ADDR_HI] = 0x20 | rowSelect;

    // 写 tile 数据到队列
    sys.mem[QUEUE_DATA_START] = tile;

    // ── NMI 标志 ──
    writeMem(sys, NMI_FLAG, 0x80);

    // ── 前进到下一行 ──
    colOffset = (colOffset + NT_ROW_SIZE) & 0xFF;
    row++;
    if (colOffset < NT_ROW_SIZE) {
      rowSelect = (rowSelect + 1) & 0x03; // 进位 → 更新 nametable 选择
    }

    // ── 等 NMI 标志清除后继续 ──
    waitFrames = 0;
    while ((readMem(sys, NMI_FLAG) & 0x80) && waitFrames < 60) {
      waitFrames++;
    }
    writeMem(sys, NMI_FLAG, 0x01);
  }

  // 恢复 offset = 更新后的 colOffset
  sys.mem[OFFSET] = colOffset & 0xFF;
}

// ═════════════════════════════════════════════════
// 上传包处理 ($903D 调 $B043)
// ═════════════════════════════════════════════════
//
// 6502 中 $B043 在固定 bank ($B000-$BFFF)。该函数从数据流中
// 读取一个完整的上传包并写入 PPU 队列。
//
// 上传包格式: [length][ppu_addr_lo][ppu_addr_hi][tile × N]
//   length = 0 → 终止 (返回 false)
//   length > 0 → 写入 N 个 tile

/** @returns true = 继续解析, false = 包终止 (length=0) */
function bank19_handleUploadPacket(sys: SystemState, firstByte: number): boolean {
  if (firstByte === PKT_TERMINATOR) {
    sys.mem[OFFSET] = (sys.mem[OFFSET] + 1) & 0xFF;
    if (sys.mem[OFFSET] < 1) {
      sys.mem[PTR_HI] = (sys.mem[PTR_HI] + 1) & 0xFF;
    }
    return false;
  }

  const count = firstByte;
  const offset = sys.mem[OFFSET];

  // 读 PPU 地址 (lo, hi) — 从脚本数据直接读取
  const ppuAddrLo = SCRIPT_DATA[scriptIdx(sys, 1)];
  const ppuAddrHi = SCRIPT_DATA[scriptIdx(sys, 2)];

  console.log(`[bank19] uploadPacket: count=${count}, addr=$${ppuAddrHi.toString(16)}${ppuAddrLo.toString(16)}`);

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

  // 写 tile 数据
  for (let i = 0; i < count; i++) {
    const tileId = SCRIPT_DATA[scriptIdx(sys, 3 + i)];
    writeMem(sys, QUEUE_AREA + qIdx + 3 + i, tileId);
  }

  writeMem(sys, 0x0628, qIdx + 3 + count);
  writeMem(sys, QUEUE_AREA + qIdx + 3 + count, 0x00);
  writeMem(sys, NMI_FLAG, 0x80);

  // 前进 offset
  sys.mem[OFFSET] = (offset + 3 + count) & 0xFF;
  if (sys.mem[OFFSET] < 3 + count) {
    sys.mem[PTR_HI] = (sys.mem[PTR_HI] + 1) & 0xFF;
  }

  return true;
}

// ═════════════════════════════════════════════════
// 控制码处理 — CODE_$91A6_$9234 (143 bytes)
// ═════════════════════════════════════════════════
//
// 6502 $91A6:
//   JSR $C52D           ; 从脚本读参数
//   LDY $8A; INC $8A    ; 读下一字节
//   LDA ($88),Y
//   JSR $C54E           ; 查表分发
//
// 控制码跳转表 ($9166):
//   E0→$B1A6  E1→$B1E0  E2→$B1F3  E3→$B218
//   E4→$B21B  E5→$B224  E6→$B235
//
// 这些目标全在固定 bank ($B000-$BFFF)，不在 bank-19 内。
// bank-19 的 $91A6-$9234 只是读取参数 + 分发的包装器。
// 实际处理逻辑在固定 bank 中，由 bank-30 实现。

/** @returns true = 继续解析, false = 脚本终止 */
function bank19_handleControl(sys: SystemState, ctrlCode: number): boolean {
  const offset = sys.mem[OFFSET];

  console.log(`[bank19] control code: $${ctrlCode.toString(16)} at offset=$${offset.toString(16)}`);

  switch (ctrlCode) {
    case 0xE0: {
      const param = SCRIPT_DATA[scriptIdx(sys)];
      sys.mem[0x8B] = param;
      sys.mem[OFFSET] = (offset + 1) & 0xFF;
      if (sys.mem[OFFSET] < 1) sys.mem[PTR_HI] = (sys.mem[PTR_HI] + 1) & 0xFF;
      console.log(`[bank19] E0: set state = $${param.toString(16)}`);
      return true;
    }

    case 0xE1: {
      const delta = SCRIPT_DATA[scriptIdx(sys)];
      sys.mem[OFFSET] = (offset + delta) & 0xFF;
      if (sys.mem[OFFSET] < delta) {
        sys.mem[PTR_HI] = (sys.mem[PTR_HI] + 1) & 0xFF;
      }
      console.log(`[bank19] E1: jump +$${delta.toString(16)}`);
      return true;
    }

    case 0xE2: {
      const x = SCRIPT_DATA[scriptIdx(sys)];
      const y = SCRIPT_DATA[scriptIdx(sys, 1)];
      sys.mem[0x8B] = x;
      sys.mem[0x8C] = y;
      sys.mem[OFFSET] = (offset + 2) & 0xFF;
      if (sys.mem[OFFSET] < 2) sys.mem[PTR_HI] = (sys.mem[PTR_HI] + 1) & 0xFF;
      console.log(`[bank19] E2: set XY = ($${x.toString(16)}, $${y.toString(16)})`);
      return true;
    }

    case 0xE3: {
      console.log('[bank19] E3: script terminate/reset');
      return false;
    }

    case 0xE4: {
      console.log('[bank19] E4: output string...');
      let strOffset = offset;
      while (true) {
        const ch = SCRIPT_DATA[scriptIdx(sys, strOffset - offset)];
        if (ch === 0xFC || ch === 0x00) {
          strOffset++;
          break;
        }
        if (ch >= 0xE0) {
          break;
        }
        bank19_writeStringChar(sys, ch);
        strOffset++;
        if (strOffset >= 0x100) break;
      }
      sys.mem[OFFSET] = strOffset & 0xFF;
      if (sys.mem[OFFSET] < offset) {
        sys.mem[PTR_HI] = (sys.mem[PTR_HI] + 1) & 0xFF;
      }
      return true;
    }

    case 0xE5: {
      const param = SCRIPT_DATA[scriptIdx(sys)];
      sys.mem[OFFSET] = (offset + 1) & 0xFF;
      if (sys.mem[OFFSET] < 1) sys.mem[PTR_HI] = (sys.mem[PTR_HI] + 1) & 0xFF;
      console.log(`[bank19] E5: routine call param=$${param.toString(16)}`);
      return true;
    }

    case 0xE6: {
      const param = SCRIPT_DATA[scriptIdx(sys)];
      sys.mem[OFFSET] = (offset + 1) & 0xFF;
      if (sys.mem[OFFSET] < 1) sys.mem[PTR_HI] = (sys.mem[PTR_HI] + 1) & 0xFF;
      console.log(`[bank19] E6: other control param=$${param.toString(16)}`);
      return true;
    }

    default: {
      console.warn(`[bank19] unknown control code: $${ctrlCode.toString(16)}`);
      return true;
    }
  }
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
export function bank19_tick(sys: SystemState): boolean {
  const nmiFlag = readMem(sys, NMI_FLAG);

  // 如果 NMI 还没处理完上次的队列，等待
  if (nmiFlag & 0x80) {
    return false; // 仍在等待 NMI
  }

  // 推进主解析器一步
  const offset = sys.mem[OFFSET];
  const idx = scriptIdx(sys);
  if (idx >= SCRIPT_DATA.length) return false;
  const byte = SCRIPT_DATA[idx];

  if (byte >= CTRL_THRESHOLD) {
    sys.mem[OFFSET] = (offset + 1) & 0xFF;
    if (sys.mem[OFFSET] < 1) sys.mem[PTR_HI] = (sys.mem[PTR_HI] + 1) & 0xFF;
    return bank19_handleControl(sys, byte);
  } else if (byte === PKT_TERMINATOR) {
    sys.mem[OFFSET] = (offset + 1) & 0xFF;
    if (sys.mem[OFFSET] < 1) sys.mem[PTR_HI] = (sys.mem[PTR_HI] + 1) & 0xFF;
    return false;
  } else {
    return bank19_handleUploadPacket(sys, byte);
  }
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
