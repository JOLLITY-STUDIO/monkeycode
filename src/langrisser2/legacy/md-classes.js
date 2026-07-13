/**
 * md-classes.js — Langrisser II MD ROM 职业数据解析器
 * 职业名表: 0x05E958 (FF分隔, Shift-JIS半角假名, 151条目)
 * 职业数据表: 0x05EDDC (28B/条目, class_id×0x1C索引)
 * 转职路线表: 0x060000 (32B/条目)
 */

// === 地址常量 ===
const CLASS_NAME_ADDR = 0x05E958;
const CLASS_DATA_ADDR = 0x05EDDC;
const CLASS_ENTRY_SIZE = 0x1C;
const CLASS_PATH_ADDR = 0x060000;
const CLASS_PATH_SIZE = 0x20;

// === 半角假名 → 全角假名 ===
const HALF_TO_FULL = {
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

export function halfToFullKana(str) {
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

// === Shift-JIS 半角假名解码 ===
function sjisHalfToUnicode(b) {
  if (b >= 0xA1 && b <= 0xDF) return 0xFF61 + (b - 0xA1);
  return b;
}

function sjisDecode(bytes) {
  return Array.from(bytes).map(sjisHalfToUnicode).map(c => String.fromCharCode(c)).join('');
}

// === 职业名表解析 (0x05E958, FF分隔) ===
export function parseClassNames(romData) {
  const names = [];
  let current = [];
  for (let addr = CLASS_NAME_ADDR; addr < romData.length; addr++) {
    const b = romData[addr];
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

// === 28B 职业数据条目解析 (修正版, 基于 Ghidra FUN_00010bbe/FUN_0000b558) ===
//
// 字段映射 (来自 Ghidra 交叉验证):
//   offset 0x00 (word): dataOffset - 相对偏移, 加 0x05EDDC 得到数据指针
//                       Ghidra: *(char**)(unit+0x0F) = &DAT_0005eddc + *(short*)(DAT_0005eddc + classId*0x1C)
//   offset 0x02 (word): field_02 - short, FUN_0000b558 读取作为索引
//   offset 0x04 (word): terrainModOff - 地形修正表相对偏移
//                       Ghidra: terrainDef = DAT_0005eddc[terrainId + DAT_0005ede0[classId*0x1C]]
//   offset 0x06 (byte): moveType - 移动类型 (0x0F/0x10 特殊, 见 FUN_0000c010)
//   offset 0x08 (byte): flag_08 - 标志位 (==0 检查, 见 11568/11571)
//   offset 0x0B (byte): cmdRange2 - 写到角色槽 0x17
//   offset 0x0C (byte): cmdRange3 - 写到角色槽 0x19
//   offset 0x0D (byte): mv - MV 移动力 (写到角色槽 0x44, 来自 DAT_0005ede9)
//   offset 0x0E (byte): range - Range 射程 (写到角色槽 0x45, 来自 DAT_0005edea)
//   offset 0x0F (byte): baseAT - AT 基础 (写到角色槽 0x46, 来自 DAT_0005edeb)
//   offset 0x10 (byte): baseDF - DF 基础 (写到角色槽 0x47, 来自 DAT_0005edec)
//   offset 0x13 (byte): mp - MP/能力位 (写到角色槽 0x50, 来自 DAT_0005edef)
export function parseClassEntry(romData, classId) {
  const offset = CLASS_DATA_ADDR + classId * CLASS_ENTRY_SIZE;
  const d = romData.slice(offset, offset + CLASS_ENTRY_SIZE);
  const dv = new DataView(d.buffer, d.byteOffset, d.byteLength);

  return {
    rawHex:        Array.from(d).map(b => b.toString(16).padStart(2, '0')).join(' '),
    // 修正字段: 严格按 Ghidra DAT_xxxx 偏移对齐
    dataOffset:    dv.getInt16(0x00, false),  // 相对偏移 → 数据指针
    field_02:      dv.getInt16(0x02, false),  // FUN_0000b558 读取
    terrainModOff: dv.getInt16(0x04, false),  // 地形修正表相对偏移
    moveType:      d[0x06],                   // 移动类型 (0x0F/0x10 特殊)
    field_07:      d[0x07],
    flag_08:       d[0x08],                   // 标志位 (==0 检查)
    reserved_09:   dv.getUint16(0x09, false),
    cmdRange2:     d[0x0B],                   // 角色槽 0x17
    cmdRange3:     d[0x0C],                   // 角色槽 0x19
    mv:            d[0x0D],                   // MV (DAT_0005ede9)
    range:         d[0x0E],                   // Range (DAT_0005edea)
    baseAT:        d[0x0F],                   // AT基础 (DAT_0005edeb)
    baseDF:        d[0x10],                   // DF基础 (DAT_0005edec)
    reserved_11:   dv.getUint16(0x11, false),
    mp:            d[0x13],                   // MP/能力 (DAT_0005edef)
    reserved_14:   Array.from(d.slice(0x14, 0x1C)),
    // 派生: 数据指针
    dataPtr:       CLASS_DATA_ADDR + dv.getInt16(0x00, false),
  };
}

// === 职业能力参考表 (用户提供) ===
// class_id 0x00-0x01 无数据, 表从 0x02 ロード 开始
export const CLASS_STATS = {
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

// === 转职路线解析 (注意: 0x060000 已确认不是转职路线表!) ===
//
// 修正记录 (2026-07-13):
//   之前误判 0x060000 为转职路线表, 实际 Ghidra 无此地址引用
//   该区域数据稀疏, 不符合转职树结构
//   转职路线可能内嵌在职业 28B 结构体 (0x05EDDC) 中, 或在场景字节码里
//
// 保留此函数仅供历史数据查看, 不要用于转职树构建
export function parseClassPath(romData, pathIndex) {
  const offset = CLASS_PATH_ADDR + pathIndex * CLASS_PATH_SIZE;
  const d = romData.slice(offset, offset + CLASS_PATH_SIZE);
  return {
    pathIndex,
    classId: d[0],
    rawHex: Array.from(d).map(b => b.toString(16).padStart(2, '0')).join(' '),
    branches: Array.from(d.slice(1, 1 + 8)),
    requirements: Array.from(d.slice(9, 9 + 8)),
    nextPaths: Array.from(d.slice(17, 17 + 8)),
    warning: '0x060000 已确认不是转职路线表, 此数据仅供参考',
  };
}

// === 合并查询 ===
export function getAllClassInfo(romData) {
  const names = parseClassNames(romData);
  const classes = [];
  for (let id = 0; id < Math.min(names.length, 256); id++) {
    classes.push(getClassInfo(romData, id));
  }
  return classes;
}

export function getClassInfo(romData, classId) {
  const names = parseClassNames(romData);
  const nameKana = names[classId] || `Class#0x${classId.toString(16)}`;
  const nameFull = halfToFullKana(nameKana);
  const stats = CLASS_STATS[classId] || null;
  const isPlayer = !!stats;
  const entry = parseClassEntry(romData, classId);

  return {
    classId,
    nameKana,
    name: nameFull,
    isPlayer,
    stats,
    entry,
  };
}

// === 输出玩家职业一览 ===
export function formatClassSummary(romData) {
  const names = parseClassNames(romData);
  const lines = [];
  lines.push('职业ID | 名称 | AT DF A+ D+ MP MV R');
  lines.push('-------|------|-------------------');

  for (const id of Object.keys(CLASS_STATS).sort((a, b) => parseInt(a) - parseInt(b))) {
    const nameKana = names[id] || '?';
    const name = halfToFullKana(nameKana);
    const s = CLASS_STATS[id];
    if (s) {
      lines.push(` 0x${parseInt(id).toString(16).padStart(2, '0')} | ${name.padEnd(10)} | ${String(s.at).padStart(2)} ${String(s.df).padStart(2)} ${String(s.ap).padStart(2)} ${String(s.dp).padStart(2)} ${String(s.mp).padStart(2)} ${String(s.mv).padStart(2)} ${String(s.r).padStart(1)}`);
    }
  }
  return lines.join('\n');
}
