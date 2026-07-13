/**
 * classes.ts — Langrisser II MD 职业数据解析器 (TypeScript版)
 *
 * 严格基于已验证的 md-classes.js 逻辑转写
 * 数据源: ROM 0x05E958 (职业名表) + 0x05EDDC (职业数据表, 28B/条目)
 *
 * 字段映射 (来自 Ghidra FUN_00010bbe/FUN_0000b558 交叉验证):
 *   offset 0x00 (word): dataOffset - 相对偏移, 加 0x05EDDC 得到数据指针
 *   offset 0x02 (word): field_02 - short, FUN_0000b558 读取作为索引
 *   offset 0x04 (word): terrainModOff - 地形修正表相对偏移
 *   offset 0x06 (byte): moveType - 移动类型 (0x0F/0x10 特殊)
 *   offset 0x08 (byte): flag_08 - 标志位 (==0 检查)
 *   offset 0x0B (byte): cmdRange2 - 写到角色槽 0x17
 *   offset 0x0C (byte): cmdRange3 - 写到角色槽 0x19
 *   offset 0x0D (byte): mv - MV 移动力 (写到角色槽 0x44)
 *   offset 0x0E (byte): range - Range 射程 (写到角色槽 0x45)
 *   offset 0x0F (byte): baseAT - AT 基础 (写到角色槽 0x46)
 *   offset 0x10 (byte): baseDF - DF 基础 (写到角色槽 0x47)
 *   offset 0x13 (byte): mp - MP/能力位 (写到角色槽 0x50)
 */

import { read8, read16BE } from './rom';

// === 地址常量 (与 md-classes.js 一致) ===
export const CLASS_NAME_ADDR = 0x05E958;
export const CLASS_DATA_ADDR = 0x05EDDC;
export const CLASS_ENTRY_SIZE = 0x1C;
/** 注意: 0x060000 已确认不是转职路线表, 仅保留常量供历史参考 */
export const CLASS_PATH_ADDR = 0x060000;
export const CLASS_PATH_SIZE = 0x20;

// === 半角假名 → 全角假名 (与 md-classes.js 一致) ===
const HALF_TO_FULL: Record<string, string> = {
  '｡': '。', '｢': '「', '｣': '」', '､': '、', '･': '・',
  'ｦ': 'ヲ', 'ｧ': 'ァ', 'ｨ': 'ィ', 'ｩ': 'ゥ', 'ｪ': 'ェ', 'ｫ': 'ォ',
  'ｬ': 'ャ', 'ｭ': 'ュ', 'ｮ': 'ョ', 'ｯ': 'ッ',
  'ｰ': 'ー',
  'ｱ': 'ア', 'ｲ': 'イ', 'ｳ': 'ウ', 'ｴ': 'エ', 'ｵ': 'オ',
  'ｶ': 'カ', 'ｷ': 'キ', 'ｸ': 'ク', 'ｹ': 'ケ', 'ｺ': 'コ',
  'ｻ': 'サ', 'ｼ': 'シ', 'ｽ': 'ス', 'ｾ': 'セ', 'ｿ': 'ソ',
  'ﾀ': 'タ', 'ﾁ': 'チ', 'ﾂ': 'ツ', 'ﾃ': 'テ', 'ﾄ': 'ト',
  'ﾅ': 'ナ', 'ﾆ': 'ニ', 'ﾇ': 'ヌ', 'ﾈ': 'ネ', 'ﾉ': 'ノ',
  'ﾊ': 'ハ', 'ﾋ': 'ヒ', 'ﾌ': 'フ', 'ﾍ': 'ヘ', 'ﾎ': 'ホ',
  'ﾏ': 'マ', 'ﾐ': 'ミ', 'ﾑ': 'ム', 'ﾒ': 'メ', 'ﾓ': 'モ',
  'ﾔ': 'ヤ', 'ﾕ': 'ユ', 'ﾖ': 'ヨ',
  'ﾗ': 'ラ', 'ﾘ': 'リ', 'ﾙ': 'ル', 'ﾚ': 'レ', 'ﾛ': 'ロ',
  'ﾜ': 'ワ',
  'ﾝ': 'ン',
  'ﾞ': '゛', 'ﾟ': '゜',
};

// 复合濁点半濁点
HALF_TO_FULL['ｶﾞ'] = 'ガ'; HALF_TO_FULL['ｷﾞ'] = 'ギ'; HALF_TO_FULL['ｸﾞ'] = 'グ'; HALF_TO_FULL['ｹﾞ'] = 'ゲ'; HALF_TO_FULL['ｺﾞ'] = 'ゴ';
HALF_TO_FULL['ｻﾞ'] = 'ザ'; HALF_TO_FULL['ｼﾞ'] = 'ジ'; HALF_TO_FULL['ｽﾞ'] = 'ズ'; HALF_TO_FULL['ｾﾞ'] = 'ゼ'; HALF_TO_FULL['ｿﾞ'] = 'ゾ';
HALF_TO_FULL['ﾀﾞ'] = 'ダ'; HALF_TO_FULL['ﾁﾞ'] = 'ヂ'; HALF_TO_FULL['ﾂﾞ'] = 'ヅ'; HALF_TO_FULL['ﾃﾞ'] = 'デ'; HALF_TO_FULL['ﾄﾞ'] = 'ド';
HALF_TO_FULL['ﾊﾞ'] = 'バ'; HALF_TO_FULL['ﾋﾞ'] = 'ビ'; HALF_TO_FULL['ﾌﾞ'] = 'ブ'; HALF_TO_FULL['ﾍﾞ'] = 'ベ'; HALF_TO_FULL['ﾎﾞ'] = 'ボ';
HALF_TO_FULL['ﾊﾟ'] = 'パ'; HALF_TO_FULL['ﾋﾟ'] = 'ピ'; HALF_TO_FULL['ﾌﾟ'] = 'プ'; HALF_TO_FULL['ﾍﾟ'] = 'ペ'; HALF_TO_FULL['ﾎﾟ'] = 'ポ';
HALF_TO_FULL['ｳﾞ'] = 'ヴ'; HALF_TO_FULL['ﾜﾞ'] = 'ヷ'; HALF_TO_FULL['ｦﾞ'] = 'ヺ';

export function halfToFullKana(str: string): string {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    if ((str[i] === 'ﾞ' || str[i] === 'ﾟ') && i > 0) {
      const prev = str[i - 1];
      const combined = prev + str[i];
      const mapped = HALF_TO_FULL[combined];
      if (mapped) {
        result = result.slice(0, -1) + mapped;
        continue;
      }
    }
    result += HALF_TO_FULL[str[i]] || str[i];
  }
  result = result.replace(/[゛゜]/g, '');
  return result;
}

// === Shift-JIS 半角假名解码 (与 md-classes.js 一致) ===
function sjisHalfToUnicode(b: number): number {
  if (b >= 0xA1 && b <= 0xDF) return 0xFF61 + (b - 0xA1);
  return b;
}

function sjisDecode(bytes: number[]): string {
  return bytes.map(sjisHalfToUnicode).map(c => String.fromCharCode(c)).join('');
}

// === 职业名表解析 (0x05E958, FF分隔) ===
export function parseClassNames(rom: Uint8Array): string[] {
  const names: string[] = [];
  let current: number[] = [];
  for (let addr = CLASS_NAME_ADDR; addr < rom.length; addr++) {
    const b = rom[addr];
    if (b === 0xFF || b === 0x00) {
      if (current.length) { names.push(sjisDecode(current)); current = []; }
      if (names.length > 150) break;
    } else {
      current.push(b);
    }
  }
  if (current.length) names.push(sjisDecode(current));
  return names;
}

// === 职业数据条目接口 (严格按 md-classes.js parseClassEntry) ===
export interface ClassEntry {
  rawHex: string;
  dataOffset: number;       // 相对偏移 → 数据指针
  field_02: number;         // FUN_0000b558 读取
  terrainModOff: number;    // 地形修正表相对偏移
  moveType: number;         // 移动类型 (0x0F/0x10 特殊)
  field_07: number;
  flag_08: number;          // 标志位 (==0 检查)
  reserved_09: number;
  cmdRange2: number;        // 角色槽 0x17
  cmdRange3: number;        // 角色槽 0x19
  mv: number;               // MV (DAT_0005ede9)
  range: number;            // Range (DAT_0005edea)
  baseAT: number;           // AT基础 (DAT_0005edeb)
  baseDF: number;           // DF基础 (DAT_0005edec)
  reserved_11: number;
  mp: number;               // MP/能力 (DAT_0005edef)
  reserved_14: number[];
  dataPtr: number;          // 派生: 数据指针 = CLASS_DATA_ADDR + dataOffset
}

// === 28B 职业数据条目解析 (严格按 md-classes.js) ===
export function parseClassEntry(rom: Uint8Array, classId: number): ClassEntry {
  const offset = CLASS_DATA_ADDR + classId * CLASS_ENTRY_SIZE;
  const d = rom.slice(offset, offset + CLASS_ENTRY_SIZE);

  const dataOffset = (d[0x00] << 8) | d[0x01];
  const field_02 = (d[0x02] << 8) | d[0x03];
  const terrainModOff = (d[0x04] << 8) | d[0x05];

  return {
    rawHex: Array.from(d).map(b => b.toString(16).padStart(2, '0')).join(' '),
    dataOffset,
    field_02,
    terrainModOff,
    moveType: d[0x06],
    field_07: d[0x07],
    flag_08: d[0x08],
    reserved_09: (d[0x09] << 8) | d[0x0A],
    cmdRange2: d[0x0B],
    cmdRange3: d[0x0C],
    mv: d[0x0D],
    range: d[0x0E],
    baseAT: d[0x0F],
    baseDF: d[0x10],
    reserved_11: (d[0x11] << 8) | d[0x12],
    mp: d[0x13],
    reserved_14: Array.from(d.slice(0x14, 0x1C)),
    dataPtr: CLASS_DATA_ADDR + dataOffset,
  };
}

// === 职业能力参考表 (与 md-classes.js 一致, 用户提供) ===
export interface ClassStats {
  at: number; df: number; ap: number; dp: number;
  mp: number; mv: number; r: number;
}

export const CLASS_STATS: Record<number, ClassStats> = {
  0x02: { at: 3, df: 6, ap: 2, dp: 4, mp: 3, mv: 5, r: 3 },
  0x03: { at: 6, df: 3, ap: 6, dp: 2, mp: 2, mv: 8, r: 3 },
  0x04: { at: 7, df: 2, ap: 2, dp: 4, mp: 3, mv: 8, r: 3 },
  0x05: { at: 6, df: 3, ap: 5, dp: 3, mp: 2, mv: 6, r: 3 },
  0x06: { at: 2, df: 6, ap: 3, dp: 5, mp: 6, mv: 5, r: 2 },
  0x07: { at: 4, df: 4, ap: 5, dp: 4, mp: 8, mv: 5, r: 2 },
  0x08: { at: 3, df: 5, ap: 4, dp: 4, mp: 7, mv: 5, r: 2 },
  0x09: { at: 4, df: 6, ap: 3, dp: 4, mp: 5, mv: 5, r: 3 },
  0x0A: { at: 9, df: 4, ap: 5, dp: 3, mp: 4, mv: 11, r: 4 },
  0x0B: { at: 7, df: 4, ap: 6, dp: 3, mp: 8, mv: 10, r: 4 },
  0x0C: { at: 6, df: 5, ap: 6, dp: 2, mp: 8, mv: 10, r: 4 },
  0x0D: { at: 6, df: 6, ap: 4, dp: 3, mp: 4, mv: 9, r: 4 },
  0x0E: { at: 4, df: 7, ap: 5, dp: 4, mp: 4, mv: 7, r: 3 },
  0x0F: { at: 3, df: 6, ap: 4, dp: 6, mp: 10, mv: 5, r: 3 },
  0x10: { at: 4, df: 5, ap: 5, dp: 4, mp: 12, mv: 5, r: 3 },
  0x11: { at: 5, df: 4, ap: 6, dp: 4, mp: 14, mv: 5, r: 3 },
  0x12: { at: 7, df: 4, ap: 7, dp: 5, mp: 14, mv: 5, r: 4 },
  0x13: { at: 6, df: 5, ap: 6, dp: 6, mp: 14, mv: 5, r: 4 },
  0x14: { at: 4, df: 7, ap: 6, dp: 7, mp: 12, mv: 5, r: 3 },
  0x15: { at: 6, df: 7, ap: 8, dp: 8, mp: 6, mv: 5, r: 3 },
  0x16: { at: 4, df: 7, ap: 7, dp: 5, mp: 8, mv: 5, r: 3 },
  0x17: { at: 7, df: 5, ap: 9, dp: 6, mp: 6, mv: 10, r: 4 },
  0x18: { at: 6, df: 7, ap: 8, dp: 7, mp: 3, mv: 5, r: 3 },
  0x19: { at: 8, df: 4, ap: 10, dp: 5, mp: 4, mv: 11, r: 4 },
  0x1A: { at: 8, df: 9, ap: 8, dp: 8, mp: 0, mv: 8, r: 4 },
  0x1B: { at: 7, df: 6, ap: 10, dp: 6, mp: 2, mv: 8, r: 4 },
  0x1C: { at: 10, df: 4, ap: 9, dp: 6, mp: 4, mv: 10, r: 4 },
  0x1D: { at: 5, df: 9, ap: 10, dp: 6, mp: 4, mv: 8, r: 4 },
  0x1E: { at: 8, df: 7, ap: 8, dp: 8, mp: 8, mv: 5, r: 4 },
  0x1F: { at: 9, df: 6, ap: 7, dp: 5, mp: 12, mv: 7, r: 0 },
  0x20: { at: 2, df: 2, ap: 9, dp: 8, mp: 4, mv: 6, r: 4 },
  0x21: { at: 2, df: 2, ap: 8, dp: 6, mp: 8, mv: 8, r: 0 },
  0x22: { at: 4, df: 0, ap: 8, dp: 7, mp: 4, mv: 11, r: 4 },
  0x23: { at: 0, df: 3, ap: 8, dp: 7, mp: 10, mv: 5, r: 4 },
  0x24: { at: 2, df: 1, ap: 9, dp: 7, mp: 14, mv: 5, r: 4 },
  0x25: { at: 2, df: 2, ap: 9, dp: 9, mp: 8, mv: 5, r: 4 },
  0x26: { at: 2, df: 1, ap: 8, dp: 7, mp: 14, mv: 5, r: 4 },
  0x27: { at: 5, df: 1, ap: 10, dp: 7, mp: 2, mv: 11, r: 4 },
  0x28: { at: 4, df: 2, ap: 10, dp: 7, mp: 2, mv: 9, r: 4 },
};

// === 合并查询 (与 md-classes.js getClassInfo 一致) ===
export interface ClassInfo {
  classId: number;
  nameKana: string;
  name: string;
  isPlayer: boolean;
  stats: ClassStats | null;
  entry: ClassEntry;
}

export function getClassInfo(rom: Uint8Array, classId: number): ClassInfo {
  const names = parseClassNames(rom);
  const nameKana = names[classId] || `Class#0x${classId.toString(16)}`;
  const name = halfToFullKana(nameKana);
  const stats = CLASS_STATS[classId] || null;
  const isPlayer = !!stats;
  const entry = parseClassEntry(rom, classId);

  return {
    classId,
    nameKana,
    name,
    isPlayer,
    stats,
    entry,
  };
}

export function getAllClassInfo(rom: Uint8Array): ClassInfo[] {
  const names = parseClassNames(rom);
  const classes: ClassInfo[] = [];
  for (let id = 0; id < Math.min(names.length, 256); id++) {
    classes.push(getClassInfo(rom, id));
  }
  return classes;
}

// === L2_CLASSES 简表 (与 md.js L2_CLASSES 一致) ===
export const L2_CLASSES: { id: number; name: string }[] = [
  { id: 0x00, name: '战士' }, { id: 0x01, name: '领主' }, { id: 0x02, name: '剑士统帅' },
  { id: 0x03, name: '骑士' }, { id: 0x04, name: '骑士统帅' }, { id: 0x05, name: '圣骑士' },
  { id: 0x06, name: '魔法师' }, { id: 0x07, name: '大魔法师' }, { id: 0x08, name: '召唤师' },
  { id: 0x09, name: '僧侣' }, { id: 0x0A, name: '主教' }, { id: 0x0B, name: '圣者' },
  { id: 0x0C, name: '盗贼' }, { id: 0x0D, name: '刺客' }, { id: 0x0E, name: '忍者' },
  { id: 0x0F, name: '弓兵' }, { id: 0x10, name: '狙击手' }, { id: 0x11, name: '龙骑士' },
  { id: 0x12, name: '龙骑统帅' }, { id: 0x13, name: '飞龙骑士' }, { id: 0x14, name: '飞龙统帅' },
  { id: 0x15, name: '水兵' }, { id: 0x16, name: '水兵统帅' }, { id: 0x17, name: '天使' },
  { id: 0x18, name: '大天使' }, { id: 0x19, name: '恶魔' }, { id: 0x1A, name: '大恶魔' },
  { id: 0x1B, name: '幽灵' }, { id: 0x1C, name: '吸血鬼' }, { id: 0x1D, name: '骷髅' },
  { id: 0x1E, name: '石像鬼' },
];

/**
 * 注意: 0x060000 已确认不是转职路线表!
 * 修正记录 (2026-07-13):
 *   之前误判 0x060000 为转职路线表, 实际 Ghidra 无此地址引用
 *   该区域数据稀疏, 不符合转职树结构
 *   转职路线可能内嵌在职业 28B 结构体 (0x05EDDC) 中, 或在场景字节码里
 *
 * 转职树数据待定位, 暂不提供 parseClassPath
 */
