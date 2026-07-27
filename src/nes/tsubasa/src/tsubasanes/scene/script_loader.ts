// ============================================================================
// scene/script_loader.ts — 从 ROM 提取场景脚本数据并注册到解释器
//
// ROM 数据布局:
//   Bank 3 R6 ($8000-$9FFF): 脚本指针表 (16-bit little-endian, 索引=脚本编号)
//   Bank 4 R7 ($A000-$BFFF): 实际脚本 bytecode 数据
//
// $8464 入口逻辑:
//   1. 在 $8AEC 阈值表中查找脚本所属的 bank
//   2. offset = (scriptNum - threshold) * 2
//   3. 读 bank3[$8000 + offset] → 2-byte 脚本数据指针 (指向 bank4 的 $A000 区)
//   4. 脚本数据以 FF 结束
// ============================================================================

import type { Ppu } from '../ppu/ppu';
import type { BytecodeInterpreter } from './bytecode';

// ROM bank offset: header(16) + bank_index * 8192
const PRG_START = 16;
const BANK_SIZE = 8192;

// MMC3 CHR bank size: 8KB for simplicity (game uses CHR ROM)
const CHR_BANK_SIZE = 8192;

/** ROM buffer — 由外部注入或通过文件加载 */
let romBuffer: Uint8Array | null = null;

/** 获取 ROM 数据 */
function getRom(): Uint8Array {
  if (romBuffer) return romBuffer;
  // 小程序/Node 环境加载
  throw new Error('ROM data not loaded. Call setRomBuffer() first.');
}

/** 设置 ROM buffer */
export function setRomBuffer(buf: Uint8Array): void {
  romBuffer = buf;
}

/**
 * Bank 3 $8AEC 阈值表 — 脚本编号 → (bank, 起始脚本号范围)
 *
 * ROM 原文 DATA_$8AE7_$8AF6 (16 bytes):
 *   0x0A 0x14 0x28 0x3C 0x50 0x78 0xF0 0x00 0x03 0x10 0x04 0x20 0x05 0x60 0x06 0xFF
 *
 * 但 $8464 中实际用的 base 是 $8AEC:
 *   $8AEC: 0x78 → threshold for scripts >= $78
 *   $8AED: 0xF0
 *   $8AEE: 0x00 → bank for first range (scripts 0-?)
 *   $8AEF: 0x03
 *   ...
 *
 * 简化: 脚本 0-? 在 bank 3/4, 直接使用 bank 3 指针表
 */

/** 脚本数据所在的 PRG bank (R7 窗口: $A000-$BFFF) */
const SCRIPT_BANK_R7 = 4;
/** 指针表所在的 PRG bank (R6 窗口: $8000-$9FFF) */
const POINTER_BANK_R6 = 3;

/**
 * 从 ROM Bank 3 指针表解析脚本数据地址
 * 返回在 bank 4 ($A000 区) 中的偏移
 */
function getScriptOffset(scriptNum: number): number | null {
  const rom = getRom();
  // Bank 3 R6 窗口的指针表起始
  const ptrBase = PRG_START + POINTER_BANK_R6 * BANK_SIZE;
  const ptrOffset = scriptNum * 2;

  if (ptrBase + ptrOffset + 1 >= rom.length) return null;

  const lo = rom[ptrBase + ptrOffset];
  const hi = rom[ptrBase + ptrOffset + 1];

  // 指针值是在 $A000-$BFFF 范围的绝对地址
  const absAddr = lo + (hi << 8);
  if (absAddr < 0xA000 || absAddr >= 0xC000) return null;

  // 转换为 bank 4 中的偏移
  return absAddr - 0xA000;
}

/**
 * 读取一条完整的脚本数据 (以 FF 结束)
 */
function readScriptData(scriptNum: number): Uint8Array | null {
  const offset = getScriptOffset(scriptNum);
  if (offset === null) return null;

  const rom = getRom();
  const dataBase = PRG_START + SCRIPT_BANK_R7 * BANK_SIZE;
  const start = dataBase + offset;
  if (start >= rom.length) return null;

  // 找 FF 结束标记
  let end = start;
  while (end < rom.length && rom[end] !== 0xFF) end++;
  if (rom[end] === 0xFF) end++; // 包含 FF 字节

  return rom.slice(start, end);
}

/**
 * 加载 ROM 脚本数据到 bytecode 解释器
 *
 * 对应 ROM $8464 入口在场景进入时逐表调用。
 * 此处预注册常用脚本，运行时 bytecode.load(num) 即可找到。
 */
export function loadScriptsFromRom(bytecode: BytecodeInterpreter): void {
  if (!romBuffer) {
    console.warn('[script_loader] ROM not loaded, skip script registration');
    return;
  }

  // 注册场景 0 (TECMO_LOGO) 需要的脚本
  //   Table 1 ($83DC): scene 0 → script 02
  //   Table 3 ($8420): scene 0 → script 03
  const neededScripts = [2, 3];

  for (const num of neededScripts) {
    const data = readScriptData(num);
    if (data) {
      bytecode.registerScript(num, SCRIPT_BANK_R7, data);
      console.log(`[script_loader] Registered script ${num}: ${data.length} bytes`);
    } else {
      console.warn(`[script_loader] Script ${num} not found in ROM`);
    }
  }
}

/**
 * 批量注册场景需要的所有脚本 (根据进度表推算)
 */
export function loadScriptsForScene(
  sceneId: number,
  bytecode: BytecodeInterpreter,
): void {
  // ROM 进度表查表 — 获取 sceneId 需要的 scriptNum 列表
  const tables = getScriptsForScene(sceneId);

  for (const num of tables) {
    const data = readScriptData(num);
    if (data) {
      bytecode.registerScript(num, SCRIPT_BANK_R7, data);
    }
  }
}

/**
 * 查询 scene_id 需要哪些脚本编号 (从进度表)
 *
 * ROM 表:
 *   $83DC (Table 1), $83FE (Table 2), $8420 (Table 3), $8442 (Table 4)
 */
function getScriptsForScene(sceneId: number): number[] {
  // 从 ROM 进度表读 (位于 bank 0)
  const rom = getRom();
  const bank0 = PRG_START + 0 * BANK_SIZE;

  const scripts: number[] = [];

  // $83DC → ROM bank0 offset $83DC - $8000 = $03DC
  const v1 = rom[bank0 + 0x03DC + sceneId];
  if (v1) scripts.push(v1);

  // $83FE → offset $03FE
  const v2 = rom[bank0 + 0x03FE + sceneId];
  if (v2) scripts.push(v2);

  // $8420 → offset $0420
  const v3 = rom[bank0 + 0x0420 + sceneId];
  if (v3) scripts.push(v3);

  // $8442 → offset $0442
  const v4 = rom[bank0 + 0x0442 + sceneId];
  if (v4) scripts.push(v4);

  return scripts;
}

// ═══════════════════════════════════════════════
// CHR 数据加载
// ═══════════════════════════════════════════════

/**
 * 从 ROM 提取 CHR 数据注入 PPU
 *
 * NES 文件结构: header(16) + PRG(prgPages*16384) + CHR(chrPages*8192)
 * MMC3: CHR bank 0 是图案表基础页面
 */
export function loadChrToPpu(ppu: Ppu): void {
  const rom = getRom();
  // 读 NES header 获取 PRG/CHR 页数
  const prgPages = rom[4];
  const chrPages = rom[5];
  if (chrPages === 0) {
    console.warn('[script_loader] ROM has no CHR banks (CHR RAM)');
    return;
  }

  // CHR 起始偏移 = header(16) + PRG
  const chrStart = PRG_START + prgPages * 16384;
  const chrSize = chrPages * CHR_BANK_SIZE;

  // 加载第一个 8KB CHR bank，拆分为两个 4KB 图案表
  // bank 0 = 背景图案表 ($0000-$0FFF), bank 1 = 精灵图案表 ($1000-$1FFF)
  const chrEnd = chrStart + Math.min(8192, chrSize);
  const chrData = rom.slice(chrStart, chrEnd);
  const half = Math.min(4096, chrData.length);
  ppu.setChrBank(0, chrData.slice(0, half));
  ppu.setChrBank(1, chrData.slice(half));

  console.log(`[script_loader] Loaded CHR: ${chrData.length} bytes from ROM offset ${chrStart}, split at ${half}`);
}
