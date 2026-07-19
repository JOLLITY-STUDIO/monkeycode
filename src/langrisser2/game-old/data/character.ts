/**
 * character.ts — Langrisser II 角色能力表解析器 (TypeScript版)
 *
 * 严格基于已验证的 md-character.js 逻辑转写
 *
 * 数据流:
 *   ROM 0x05E64A (角色能力初始表, 14B×10角色, 连续存储无间隔)
 *        │ FUN_00010a94: 复制14B (★修正: 不是0x18B, 是0x0E连续)
 *        ▼
 *   RAM 0xFFFFA4CC (DAT_ffffa4cc, 10角色运行时能力表, 14B/角色连续)
 *        │ FUN_00010bbe: 读CLASS_ID → 写0xFF603C槽 + 应用AT/DF修正
 *        ▼
 *   RAM 0xFF603C (战场角色槽, 0x60B×20槽, 仅战斗中存在)
 */

import { read8, read16BE, read32BE } from './rom';

// === 地址常量 (与 md-character.js 一致) ===

/** ROM 0x05E64A: 角色能力初始表 (14B×10角色, 连续存储) */
export const CHAR_INIT_TABLE = 0x05E64A;
/** 每角色在 ROM/RAM 中的条目大小 (★修正: 14B连续, 非0x18B) */
export const CHAR_INIT_ENTRY_SIZE = 0x0E;
/** 角色能力初始表数据大小 (14字节有效数据) */
export const CHAR_INIT_DATA_SIZE = 0x0E;
/** 可玩角色总数 */
export const CHAR_COUNT = 10;

/** ROM 0x082A59: 角色AT/DF/MV修正表 (6B/角色) */
export const CHAR_MODIFIER_TABLE = 0x082A59;
export const CHAR_MODIFIER_SIZE = 6;

/** ROM 0x05E5D8: 角色RAM槽位指针表 (4B×16条目, 指向0xFF60xx) */
export const CHAR_RAM_PTR_TABLE = 0x05E5D8;
export const CHAR_RAM_PTR_COUNT = 16;

/** RAM 0xFFFFA4CC: 角色能力运行时表 (★修正: 14B/角色连续, 非0x18B) */
export const RAM_CHAR_TABLE = 0xFFFFA4CC;

// === 角色能力初始表字段定义 (与 md-character.js CHAR_INIT_FIELDS 一致) ===
export interface CharInitField {
  offset: number;
  size: number;
  name: string;
  desc: string;
}

export const CHAR_INIT_FIELDS: CharInitField[] = [
  { offset: 0x00, size: 1, name: 'baseClassId',  desc: '基础职业ID' },
  { offset: 0x01, size: 1, name: 'baseMP',       desc: 'MP基础值' },
  { offset: 0x02, size: 2, name: 'atModifier',   desc: 'AT修正word (写到角色槽0x2E-2F)' },
  { offset: 0x04, size: 2, name: 'dfModifier',   desc: 'DF修正word (写到角色槽0x3A-3B)' },
  { offset: 0x06, size: 4, name: 'skillBits',    desc: '技能位dword (写到角色槽0x50-53)' },
  { offset: 0x0A, size: 2, name: 'reserved0A',   desc: '预留' },
  { offset: 0x0C, size: 1, name: 'moveRange',    desc: '移动范围 (写到角色槽0x15)' },
  { offset: 0x0D, size: 1, name: 'portraitIdx',  desc: '头像索引 (写到角色槽0x5F)' },
  { offset: 0x0E, size: 1, name: 'subClass',     desc: '子职业 (写到角色槽0x09)' },
  { offset: 0x0F, size: 1, name: 'classFlags',   desc: '附加职业属性 (写到角色槽0x0A)' },
  { offset: 0x10, size: 1, name: 'classId',      desc: 'CLASS_ID ★ (写到角色槽0x0B)' },
  { offset: 0x11, size: 1, name: 'commandRange', desc: '指挥范围 (写到角色槽0x16)' },
  { offset: 0x12, size: 2, name: 'reserved12',   desc: '预留' },
];

// === 角色AT/DF/MV修正表字段 (与 md-character.js CHAR_MODIFIER_FIELDS 一致) ===
export const CHAR_MODIFIER_FIELDS: CharInitField[] = [
  { offset: 0x00, size: 1, name: 'atBonus', desc: 'AT修正 (加到角色槽0x46)' },
  { offset: 0x01, size: 1, name: 'dfBonus', desc: 'DF修正 (加到角色槽0x47)' },
  { offset: 0x02, size: 1, name: 'mvBonus', desc: 'MV修正 (加到角色槽0x44)' },
  { offset: 0x03, size: 3, name: 'unknown', desc: '预留 (FUN_00010bbe未读取)' },
];

// === 10位可玩角色清单 (与 md-character.js PLAYABLE_CHARACTERS 一致) ===
export const PLAYABLE_CHARACTERS: { id: number; jp: string; cn: string; en: string }[] = [
  { id: 1,  jp: 'エルウィン', cn: '艾尔文', en: 'Elwin'  },
  { id: 2,  jp: 'ヘイン',     cn: '海恩',   en: 'Hein'   },
  { id: 3,  jp: 'シェリー',   cn: '雪莉',   en: 'Sherry' },
  { id: 4,  jp: 'アーロン',   cn: '阿伦',   en: 'Aaron'  },
  { id: 5,  jp: 'キース',     cn: '基斯',   en: 'Keith'  },
  { id: 6,  jp: 'レスター',   cn: '利斯塔', en: 'Lester' },
  { id: 7,  jp: 'スコット',   cn: '斯科特', en: 'Scott'  },
  { id: 8,  jp: 'ジェシカ',   cn: '捷西卡', en: 'Jessica'},
  { id: 9,  jp: 'リアナ',     cn: '莉亚娜', en: 'Riana'  },
  { id: 10, jp: 'ラーナ',     cn: '拉娜',   en: 'Lana'   },
];

// === 有符号读取工具 (与 md-character.js 一致) ===
function readS8(rom: Uint8Array, addr: number): number {
  const v = read8(rom, addr);
  return v >= 0x80 ? v - 0x100 : v;
}

function readS16(rom: Uint8Array, addr: number): number {
  const v = read16BE(rom, addr);
  return v >= 0x8000 ? v - 0x10000 : v;
}

// === 角色能力初始表条目接口 (与 md-character.js parseCharInit 返回值一致) ===
export interface CharInitEntry {
  index: number;
  romAddr: number;
  nameJp: string;
  nameCn: string;
  nameEn: string;
  baseClassId: number;
  baseMP: number;
  atModifier: number;
  dfModifier: number;
  skillBits: number;
  reserved0A: number;
  moveRange: number;
  portraitIdx: number;
  subClass: number;
  classFlags: number;
  classId: number;
  commandRange: number;
  reserved12: number;
  raw: number[];
}

// === 解析单个角色能力初始表条目 (严格按 md-character.js parseCharInit) ===
//
// Ghidra FUN_00010a94 复制流程:
//   for i in 0..9:
//     memcpy(RAM 0xFFFFA4CC + i*0x18, ROM 0x05E64A + i*0x18, 14)
//     memset(RAM 0xFFFFA4CC + i*0x18 + 14, 0, 10)
//
// 字段映射 (来自 FUN_00010bbe 读取偏移):
//   ROM[0x00] → RAM[0x00] = 基础职业ID (写到角色槽0x00)
//   ROM[0x01] → RAM[0x01] = MP基础值 (写到角色槽0x38/0x39 当前/最大MP)
//   ROM[0x02-03] → RAM[0x02-03] = AT修正 word (写到角色槽0x2E-2F)
//   ROM[0x04-05] → RAM[0x04-05] = DF修正 word (写到角色槽0x3A-3B)
//   ROM[0x06-09] → RAM[0x06-09] = 技能位 dword (写到角色槽0x50-53)
//   ROM[0x0A-0B] → RAM[0x0A-0B] = 预留 (FUN_00010bbe未读取)
//   ROM[0x0C] → RAM[0x0C] = 移动范围 (写到角色槽0x15)
//   ROM[0x0D] → RAM[0x0D] = 头像索引 (FUN_00010d04 写到角色槽0x5F)
//   ROM[0x0E] → RAM[0x0E] = 子职业 (写到角色槽0x09)
//   ROM[0x0F] → RAM[0x0F] = 附加职业属性 (写到角色槽0x0A)
//   ROM[0x10] → RAM[0x10] = CLASS_ID (写到角色槽0x0B) ★
//   ROM[0x11] → RAM[0x11] = 指挥范围 (FUN_00010d04 写到角色槽0x16)
//   ROM[0x12-13] → RAM[0x12-13] = 预留
export function parseCharInit(rom: Uint8Array, charIdx: number): CharInitEntry | null {
  const base = CHAR_INIT_TABLE + (charIdx - 1) * CHAR_INIT_ENTRY_SIZE;
  if (base + CHAR_INIT_DATA_SIZE > rom.length) return null;

  const charInfo = PLAYABLE_CHARACTERS[charIdx - 1] || { jp: `Char#${charIdx}`, cn: '?', en: '?' };

  return {
    index: charIdx,
    romAddr: base,
    nameJp: charInfo.jp,
    nameCn: charInfo.cn,
    nameEn: charInfo.en,
    baseClassId:  read8(rom, base + 0x00),
    baseMP:       read8(rom, base + 0x01),
    atModifier:   read16BE(rom, base + 0x02),
    dfModifier:   read16BE(rom, base + 0x04),
    skillBits:    read32BE(rom, base + 0x06),
    reserved0A:   read16BE(rom, base + 0x0A),
    moveRange:    read8(rom, base + 0x0C),
    portraitIdx:  read8(rom, base + 0x0D),
    subClass:     read8(rom, base + 0x0E),
    classFlags:   read8(rom, base + 0x0F),
    classId:      read8(rom, base + 0x10),
    commandRange: read8(rom, base + 0x11),
    reserved12:   read16BE(rom, base + 0x12),
    raw: Array.from(rom.slice(base, base + CHAR_INIT_DATA_SIZE)),
  };
}

// === 解析全部10位可玩角色 (与 md-character.js parseAllCharInit 一致) ===
export function parseAllCharInit(rom: Uint8Array): CharInitEntry[] {
  const chars: CharInitEntry[] = [];
  for (let i = 1; i <= CHAR_COUNT; i++) {
    const c = parseCharInit(rom, i);
    if (c) chars.push(c);
  }
  return chars;
}

// === 角色AT/DF/MV修正表条目接口 ===
export interface CharModifierEntry {
  index: number;
  romAddr: number;
  atBonus: number;
  dfBonus: number;
  mvBonus: number;
  unknown: number[];
}

// === 解析单个角色的 AT/DF/MV 修正 (严格按 md-character.js parseCharModifier) ===
//
// Ghidra FUN_00010bbe 读取流程:
//   sVar2 = (charIdx - 1) * 6
//   unit[0x46] += ROM[0x082A59 + sVar2 + 0]  // AT修正
//   unit[0x47] += ROM[0x082A59 + sVar2 + 1]  // DF修正
//   unit[0x44] += ROM[0x082A59 + sVar2 + 2]  // MV修正
//   (其余3字节未被 FUN_00010bbe 读取)
export function parseCharModifier(rom: Uint8Array, charIdx: number): CharModifierEntry | null {
  const base = CHAR_MODIFIER_TABLE + (charIdx - 1) * CHAR_MODIFIER_SIZE;
  if (base + CHAR_MODIFIER_SIZE > rom.length) return null;

  return {
    index: charIdx,
    romAddr: base,
    atBonus: readS8(rom, base + 0x00),
    dfBonus: readS8(rom, base + 0x01),
    mvBonus: readS8(rom, base + 0x02),
    unknown: Array.from(rom.slice(base + 0x03, base + CHAR_MODIFIER_SIZE)),
  };
}

// === 解析全部10位角色的修正值 (与 md-character.js parseAllCharModifiers 一致) ===
export function parseAllCharModifiers(rom: Uint8Array): CharModifierEntry[] {
  const mods: CharModifierEntry[] = [];
  for (let i = 1; i <= CHAR_COUNT; i++) {
    const m = parseCharModifier(rom, i);
    if (m) mods.push(m);
  }
  return mods;
}

// === 角色RAM槽位指针表条目接口 ===
export interface CharRamPtrEntry {
  index: number;
  romAddr: number;
  ramPtr: number;
  slotOffset: number;  // 相对0xFF603C的槽位偏移, -1表示无效
}

// === 解析角色RAM槽位指针表 (严格按 md-character.js parseCharRamPtrTable) ===
//
// Ghidra 用法 (FUN_0000a16a 等):
//   iVar1 = *(int *)(PTR_DAT_0005e5d8 + charIdx * 4)
//   → iVar1 是 0xFF603C 系列 RAM 地址
//   unit_type = *(byte *)(iVar1 + 0x20)  // 阵营标志
export function parseCharRamPtrTable(rom: Uint8Array): CharRamPtrEntry[] {
  const ptrs: CharRamPtrEntry[] = [];
  for (let i = 0; i < CHAR_RAM_PTR_COUNT; i++) {
    const addr = CHAR_RAM_PTR_TABLE + i * 4;
    if (addr + 4 > rom.length) break;
    const ptr = read32BE(rom, addr);
    ptrs.push({
      index: i,
      romAddr: addr,
      ramPtr: ptr,
      // RAM 槽位 0x60 字节, 计算 0xFF603C 偏移
      slotOffset: ptr >= 0xFF603C ? (ptr - 0xFF603C) / 0x60 : -1,
    });
  }
  return ptrs;
}
