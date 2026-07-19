/**
 * units.ts — Langrisser II 单位结构体解析器 (TypeScript版)
 *
 * 严格基于已验证的 md-units.js 逻辑转写
 * 96字节运行时单位 + ROM静态模板 (0x1E字节) + 关卡单位配置
 *
 * 交叉验证来源: PAR金手指码 (9个角色, 偏移100%一致)
 * Elwin基址 FF603C, 级差 0x60=96字节/单位
 */

import { read8, read16BE, read32BE } from './rom';

// === 单位结构体字段定义 (与 md-units.js UNIT_FIELDS 一致) ===
export interface UnitField {
  offset: number;
  size: number;
  name: string;
  desc: string;
}

export const UNIT_FIELDS: UnitField[] = [
  { offset: 0x00, size: 1, name: '职业类型索引', desc: 'class modifier (PAR验证)' },
  { offset: 0x01, size: 1, name: '名字索引',      desc: 'name modifier (PAR验证)' },
  { offset: 0x02, size: 1, name: '状态标志0',     desc: 'bit0=已移动, bit3=已行动' },
  { offset: 0x03, size: 1, name: '状态标志1',     desc: '-' },
  { offset: 0x04, size: 1, name: '状态标志2',     desc: 'bit6=已行动标志' },
  { offset: 0x05, size: 1, name: '状态标志3',     desc: '-' },
  { offset: 0x06, size: 1, name: '地图 X 坐标',   desc: '网格列' },
  { offset: 0x07, size: 1, name: '地图 Y 坐标',   desc: '网格行' },
  { offset: 0x08, size: 1, name: '基础职业索引',  desc: '*in_A0' },
  { offset: 0x09, size: 1, name: '道具槽#1',      desc: 'item slot 1 (PAR验证)' },
  { offset: 0x0A, size: 1, name: '道具槽#2',      desc: 'item slot 2 (PAR验证)' },
  { offset: 0x0B, size: 1, name: '道具槽#3',      desc: 'item slot 3 (PAR验证)' },
  { offset: 0x0C, size: 1, name: '法术槽0-ID',    desc: '法术ID' },
  { offset: 0x0D, size: 1, name: '法术槽0-等级',  desc: '等级要求' },
  { offset: 0x0E, size: 6, name: '法术槽0-数据',  desc: '内部数据' },
  { offset: 0x14, size: 1, name: '移动类型',      desc: '-' },
  { offset: 0x15, size: 1, name: '移动范围',      desc: '-' },
  { offset: 0x16, size: 1, name: '指挥范围',      desc: '-' },
  { offset: 0x17, size: 1, name: '指挥光环',      desc: '-' },
  { offset: 0x18, size: 1, name: '法术槽1-ID',    desc: '法术ID' },
  { offset: 0x19, size: 1, name: '法术槽1-等级',  desc: '等级要求' },
  { offset: 0x1A, size: 6, name: '预留',          desc: '-' },
  { offset: 0x20, size: 1, name: '兵种类别',      desc: 'bit0=玩家方' },
  { offset: 0x21, size: 1, name: '兵种属性',      desc: '-' },
  { offset: 0x22, size: 2, name: '兵种数据',      desc: 'word' },
  { offset: 0x24, size: 1, name: '法术槽2-ID',    desc: '法术ID' },
  { offset: 0x25, size: 1, name: '法术槽2-等级',  desc: '等级要求' },
  { offset: 0x26, size: 6, name: '预留',          desc: '-' },
  { offset: 0x2C, size: 2, name: 'AT装备奖励',    desc: '武器加成' },
  { offset: 0x2E, size: 1, name: '等级',          desc: 'level (PAR验证)' },
  { offset: 0x2F, size: 1, name: '经验值',        desc: 'exp (PAR验证)' },
  { offset: 0x30, size: 1, name: '法术槽3-ID',    desc: '法术ID' },
  { offset: 0x31, size: 1, name: '法术槽3-等级',  desc: '等级要求' },
  { offset: 0x32, size: 6, name: '预留',          desc: '-' },
  { offset: 0x38, size: 1, name: '当前MP',        desc: 'current MP (PAR验证)' },
  { offset: 0x39, size: 1, name: '基础MP',        desc: 'base MP (PAR验证)' },
  { offset: 0x3A, size: 1, name: 'AT 攻击力',     desc: 'attack (PAR验证)' },
  { offset: 0x3B, size: 1, name: 'DF 防御力',     desc: 'defence (PAR验证)' },
  { offset: 0x3C, size: 1, name: '法术槽4-ID',    desc: '法术ID' },
  { offset: 0x3D, size: 1, name: '法术槽4-等级',  desc: '等级要求' },
  { offset: 0x3E, size: 6, name: '预留',          desc: '-' },
  { offset: 0x44, size: 1, name: '移动力 MV',     desc: 'movement (PAR验证)' },
  { offset: 0x45, size: 1, name: '射程 Range',    desc: 'range (PAR验证)' },
  { offset: 0x46, size: 1, name: '修正AT',        desc: 'adjust AT (PAR验证)' },
  { offset: 0x47, size: 1, name: '修正DF',        desc: 'adjust DF (PAR验证)' },
  { offset: 0x48, size: 7, name: '预留',          desc: '-' },
  { offset: 0x4F, size: 16, name: '预留',         desc: '-' },
  { offset: 0x5F, size: 1, name: '头像索引',      desc: 'portrait (PAR验证)' },
];

export const UNIT_SIZE = 0x60;

// === ROM静态单位模板字段 (与 md-units.js ROM_UNIT_TEMPLATE_FIELDS 一致) ===
export interface RomUnitTemplateField {
  offset: number;
  size: number;
  name: string;
  targetRAM: string;
}

export const ROM_UNIT_TEMPLATE_FIELDS: RomUnitTemplateField[] = [
  { offset: 0x00, size: 4, name: '属性块0',  targetRAM: '0x08' },
  { offset: 0x04, size: 4, name: '属性块1',  targetRAM: '0x14' },
  { offset: 0x08, size: 4, name: '属性块2',  targetRAM: '0x20' },
  { offset: 0x0C, size: 4, name: '属性块3',  targetRAM: '0x2C (基础AT)' },
  { offset: 0x10, size: 4, name: '属性块4',  targetRAM: '0x38 (HP/DF)' },
  { offset: 0x14, size: 4, name: '属性块5',  targetRAM: '0x50 (能力标志)' },
  { offset: 0x18, size: 2, name: '初始X/Y',  targetRAM: '0x06-0x07' },
  { offset: 0x1A, size: 1, name: '指挥官/等级', targetRAM: '0x01' },
  { offset: 0x1B, size: 1, name: '职业类型索引', targetRAM: '0x00' },
  { offset: 0x1C, size: 1, name: '附加标志',  targetRAM: '0x5F' },
  { offset: 0x1D, size: 1, name: '预留',      targetRAM: '-' },
];

// === 关卡单位配置接口 (与 md-units.js parseLevelUnits 返回值一致) ===
export interface LevelUnit {
  index: number;
  romAddr: number;
  typeIndex: number;      // 职业类型索引 (ROM偏移0x1B)
  commanderId: number;    // 指挥官编号 (ROM偏移0x1A)
  x: number;              // 初始X (ROM偏移0x18)
  y: number;              // 初始Y (ROM偏移0x19)
  raw: Uint8Array;        // 原始0x1E字节数据
  /** 阵营: 从 attr_block_2 (ROM offset 0x08) bit0 读取: 1=玩家, 0=敌方/其他 */
  isPlayer: boolean;
  /** attr_block_0 (ROM offset 0x00, → RAM 0x08): 基础职业等 */
  attr0: number;
  /** attr_block_1 (ROM offset 0x04, → RAM 0x14): 移动类型/范围/指挥 */
  attr1: number;
  /** attr_block_2 (ROM offset 0x08, → RAM 0x20): bit0=玩家方, bit?=NPC/AI */
  attr2: number;
  /** attr_block_3 (ROM offset 0x0C, → RAM 0x2C): 基础AT */
  attr3: number;
  /** attr_block_4 (ROM offset 0x10, → RAM 0x38): HP/DF */
  attr4: number;
  /** attr_block_5 (ROM offset 0x14, → RAM 0x50): 能力标志位 */
  attr5: number;
  /** 额外标志 (ROM offset 0x1C, → RAM 0x5F): 头像/单位标志 */
  extraFlags: number;
}

// === 解析关卡单位配置 (严格按 md-units.js parseLevelUnits) ===
//
// PTR_LAB_0018005e[关卡-1] → 配置结构 → 0x0C偏移 → 单位列表(每单位0x1E字节)
//
// BUGFIX: stride 从 0x12 修正为 0x1E，与 ROM 单位模板 0x1E 字节一致
// legacy md-units.js 的 0x12 步长导致重叠读取、坐标错位
export function parseLevelUnits(rom: Uint8Array, levelIndex: number): LevelUnit[] {
  const ptrTableAddr = 0x18005E;
  if (ptrTableAddr + levelIndex * 4 + 3 > rom.length) return [];

  const configPtr = read32BE(rom, ptrTableAddr + (levelIndex - 1) * 4) & 0xFFFFFF;
  if (configPtr < 0x200 || configPtr + 0x10 > rom.length) return [];

  const unitListPtr = read32BE(rom, configPtr + 0x0C) & 0xFFFFFF;
  if (unitListPtr < 0x200 || unitListPtr > rom.length) return [];

  const STRIDE = 0x1E; // 单位模板大小 (30 字节)
  const units: LevelUnit[] = [];
  let off = 0;
  while (unitListPtr + off + STRIDE <= rom.length) {
    const addr = unitListPtr + off;
    const typeIndex = rom[addr + 0x1B];
    const commanderId = rom[addr + 0x1A];
    if (typeIndex === 0xFF || commanderId === 0xFF) break;
    if (typeIndex === 0 && commanderId === 0) break;

    const x = rom[addr + 0x18];
    const y = rom[addr + 0x19];

    // 解析 6 个 attr_block (dword each), 映射到 RAM 单位槽
    const attr0 = read32BE(rom, addr + 0x00);  // → RAM 0x08
    const attr1 = read32BE(rom, addr + 0x04);  // → RAM 0x14
    const attr2 = read32BE(rom, addr + 0x08);  // → RAM 0x20
    const attr3 = read32BE(rom, addr + 0x0C);  // → RAM 0x2C
    const attr4 = read32BE(rom, addr + 0x10);  // → RAM 0x38
    const attr5 = read32BE(rom, addr + 0x14);  // → RAM 0x50
    const extraFlags = rom[addr + 0x1C];        // → RAM 0x5F

    // faction 判定: attr_block_2 bit0 = 玩家方 (ROM 逻辑: unit[0x20] & 1)
    const isPlayer = (attr2 & 1) !== 0;

    units.push({
      index: units.length,
      romAddr: addr,
      typeIndex,
      commanderId,
      x, y,
      raw: rom.slice(addr, addr + 0x1E),
      isPlayer,
      attr0, attr1, attr2, attr3, attr4, attr5,
      extraFlags,
    });
    off += STRIDE;
  }
  return units;
}

// === 解析关卡列表 (与 md-units.js parseLevelList 一致) ===
export interface LevelListItem {
  index: number;
  ptr: number;
  width: number;
  height: number;
}

export function parseLevelList(rom: Uint8Array): LevelListItem[] {
  const ptrTableAddr = 0x61CB0;
  const levels: LevelListItem[] = [];

  for (let i = 0; i < 32; i++) {
    const ptr = read32BE(rom, ptrTableAddr + i * 4) & 0xFFFFFF;
    if (ptr < 0x200 || ptr > rom.length) continue;
    const w = read16BE(rom, ptr);
    const h = read16BE(rom, ptr + 2);
    if (w === 0 || h === 0 || w > 128 || h > 128) continue;
    levels.push({ index: i, ptr, width: w, height: h });
  }
  return levels;
}

// === 解析关卡地图数据 (与 md-units.js parseLevelMap 一致) ===
export interface LevelMapSimple {
  width: number;
  height: number;
  tiles: number[];
  romAddr: number;
}

export function parseLevelMap(rom: Uint8Array, levelIndex: number): LevelMapSimple | null {
  const ptrTableAddr = 0x61CB0;
  const ptr = read32BE(rom, ptrTableAddr + levelIndex * 4) & 0xFFFFFF;
  if (ptr < 0x200 || ptr + 4 > rom.length) return null;

  const width = read16BE(rom, ptr);
  const height = read16BE(rom, ptr + 2);
  if (width > 128 || height > 128) return null;

  const tileData = ptr + 4;
  const tiles: number[] = [];
  for (let i = 0; i < width * height && tileData + i < rom.length; i++) {
    tiles.push(rom[tileData + i]);
  }

  return { width, height, tiles, romAddr: ptr };
}

// === 单位结构体参考表 (与 md-units.js UNIT_STRUCT_TABLE 一致) ===
export const UNIT_STRUCT_TABLE = `
单位结构体 (0x60 = 96 字节)
WRAM 基址: 0xFF603C, 最大 20 单位

偏移    字段
0x00   职业类型索引 (_DAT_ffffa4cc表, 0x18B/项)
0x01   指挥官编号 (0-7)
0x02   状态标志0 (bit0=已移动, bit3=已行动)
0x03   状态标志1
0x04   状态标志2 (bit6=已行动)
0x05   状态标志3
0x06   地图X坐标 (列)
0x07   地图Y坐标 (行)
0x08   基础职业索引
0x09   子职业数据
0x0A   附加职业属性
0x0B   职业类别 (0x1D=特殊)
0x0C-0x13 法术槽0 (ID+等级+内部数据)
0x14-0x17 移动类型/范围/指挥
0x18-0x1F 法术槽1
0x20-0x23 兵种类别/属性 (bit0=玩家方)
0x24-0x2B 法术槽2
0x2C-0x2D AT装备奖励
0x2E-0x2F 基础AT值 (word, 职业表)
0x30-0x37 法术槽3
0x38     当前HP (byte, 职业表)
0x39     HP上限 (byte, 职业表)
0x3A-0x3B 基础DF值 (word, 职业表)
0x3C-0x43 法术槽4
0x44-0x4F 精灵图块偏移 (0x44=AT/0x45=DF/0x46=MP/0x47=MV)
0x50-0x53 能力标志位掩码 (32位)
0x54     内部状态
0x55     等级
0x56-0x5D 战斗变量
0x5E     经验/击杀
0x5F     单位标志

法术槽格式: [ID(1B)][等级(1B)][内部数据(6B)]
`;
