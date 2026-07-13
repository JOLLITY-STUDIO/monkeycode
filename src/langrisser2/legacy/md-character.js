/**
 * md-character.js — Langrisser II MD 角色与场景配置解析器
 *
 * 基于 Ghidra 反编译代码 FUN_00010a94 / FUN_00010bbe / FUN_00010d04 / FUN_0000a122 / FUN_0000a16a
 * ★ 2026-07-13 RAM dump 校准: 修正角色能力表布局错误
 *
 * 数据流:
 *   ROM 0x05E64A (角色能力初始表, 14B×10角色, 连续存储无间隔)
 *        │ FUN_00010a94: 复制14B (★修正: 不是0x18B, 是0x0E连续)
 *        ▼
 *   RAM 0xFFFFA4CC (DAT_ffffa4cc, 10角色运行时能力表, 14B/角色连续)
 *        │ FUN_00010bbe: 读CLASS_ID → 写0xFF603C槽 + 应用AT/DF修正
 *        ▼
 *   RAM 0xFF603C (战场角色槽, 0x60B×20槽, 仅战斗中存在)
 *
 * RAM dump 校准结论 (2026-07-13):
 *   - 新dump (标题画面): 角色能力表已加载, 角色槽全零 (游戏未开始)
 *   - 旧dump (游戏界面): 角色能力表已修改, 角色槽有完整战斗数据
 *   - 两份dump互补, 共同验证了数据流
 *   - ROM 0x05E64A 步长=14B, RAM 0xFFFFA4CC 步长=14B (非0x18B!)
 *
 * 关键修正:
 *   - 0x05EDDC 不是单纯职业属性表, 而是复合表 (含地形修正偏移+命名偏移)
 *   - 0x0821BE 不是128B/关, 而是 4B指针表 ×31关, 每指针指向128B配置
 *   - 0x05E5D8 是角色RAM槽位指针表 (4B×16条目, 指向0xFF60xx)
 */

// ============================================================
// 地址常量
// ============================================================

/** ROM 0x05E64A: 角色能力初始表 (14B×10角色, 连续存储) */
export const CHAR_INIT_TABLE = 0x05E64A;
/** 每角色在 ROM/RAM 中的条目大小 (★修正: 14B连续, 非0x18B) */
export const CHAR_INIT_ENTRY_SIZE = 0x0E;
/** 每角色有效数据大小 (与 CHAR_INIT_ENTRY_SIZE 相同, 14B连续) */
export const CHAR_INIT_DATA_SIZE = 0x0E;
/** 可玩角色总数 */
export const CHAR_COUNT = 10;

/** ROM 0x082A59: 角色AT/DF/MV修正表 (6B/角色) */
export const CHAR_MODIFIER_TABLE = 0x082A59;
export const CHAR_MODIFIER_SIZE = 6;

/** ROM 0x05E5D8: 角色RAM槽位指针表 (4B×16条目, 指向0xFF60xx) */
export const CHAR_RAM_PTR_TABLE = 0x05E5D8;
export const CHAR_RAM_PTR_COUNT = 16;

/** ROM 0x0821BE: 场景单位配置指针表 (4B×31关, 每指针指向128B配置) */
export const SCENARIO_UNIT_CONFIG_PTR_TABLE = 0x0821BE;
export const SCENARIO_CONFIG_SIZE = 128; // 32 dword
export const SCENARIO_CONFIG_DWORD_COUNT = 32;

/** ROM 0x05EDDC: 职业数据表 (0x1C B/条目, 含地形修正偏移) */
export const CLASS_DATA_ADDR = 0x05EDDC;
export const CLASS_ENTRY_SIZE = 0x1C;

/** RAM 0xFFFFA4CC: 角色能力运行时表 (★修正: 14B/角色连续, 非0x18B) */
export const RAM_CHAR_TABLE = 0xFFFFA4CC;

// ============================================================
// 类型定义
// ============================================================

/**
 * 角色能力初始表条目 (ROM 0x05E64A, 14B/角色)
 *
 * Ghidra FUN_00010a94 复制流程:
 *   for i in 0..9:
 *     memcpy(RAM 0xFFFFA4CC + i*0x18, ROM 0x05E64A + i*0x18, 14)
 *     memset(RAM 0xFFFFA4CC + i*0x18 + 14, 0, 10)
 *
 * 字段映射 (来自 FUN_00010bbe 读取偏移):
 *   ROM[0x00] → RAM[0x00] = 基础职业ID (写到角色槽0x00)
 *   ROM[0x01] → RAM[0x01] = MP基础值 (写到角色槽0x38/0x39 当前/最大MP)
 *   ROM[0x02-03] → RAM[0x02-03] = AT修正 word (写到角色槽0x2E-2F)
 *   ROM[0x04-05] → RAM[0x04-05] = DF修正 word (写到角色槽0x3A-3B)
 *   ROM[0x06-09] → RAM[0x06-09] = 技能位 dword (写到角色槽0x50-53)
 *   ROM[0x0A-0B] → RAM[0x0A-0B] = 预留 (FUN_00010bbe未读取)
 *   ROM[0x0C] → RAM[0x0C] = 移动范围 (写到角色槽0x15)
 *   ROM[0x0D] → RAM[0x0D] = 头像索引 (FUN_00010d04 写到角色槽0x5F)
 *   ROM[0x0E] → RAM[0x0E] = 子职业 (写到角色槽0x09)
 *   ROM[0x0F] → RAM[0x0F] = 附加职业属性 (写到角色槽0x0A)
 *   ROM[0x10] → RAM[0x10] = CLASS_ID (写到角色槽0x0B) ★
 *   ROM[0x11] → RAM[0x11] = 指挥范围 (FUN_00010d04 写到角色槽0x16)
 *   ROM[0x12-13] → RAM[0x12-13] = 预留
 */
export const CHAR_INIT_FIELDS = [
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

/**
 * 角色AT/DF/MV修正表条目 (ROM 0x082A59, 6B/角色)
 *
 * Ghidra FUN_00010bbe 读取流程:
 *   sVar2 = (charIdx - 1) * 6
 *   unit[0x46] += ROM[0x082A59 + sVar2 + 0]  // AT修正
 *   unit[0x47] += ROM[0x082A59 + sVar2 + 1]  // DF修正
 *   unit[0x44] += ROM[0x082A59 + sVar2 + 2]  // MV修正
 *   (其余3字节未被 FUN_00010bbe 读取)
 */
export const CHAR_MODIFIER_FIELDS = [
  { offset: 0x00, size: 1, name: 'atBonus', desc: 'AT修正 (加到角色槽0x46)' },
  { offset: 0x01, size: 1, name: 'dfBonus', desc: 'DF修正 (加到角色槽0x47)' },
  { offset: 0x02, size: 1, name: 'mvBonus', desc: 'MV修正 (加到角色槽0x44)' },
  { offset: 0x03, size: 3, name: 'unknown', desc: '预留 (FUN_00010bbe未读取)' },
];

/**
 * 10位可玩角色清单 (来自 docs/Langrisser专题站·梦幻模拟战Ⅱ·转职表.html)
 */
export const PLAYABLE_CHARACTERS = [
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

// ============================================================
// 工具函数
// ============================================================

function readU32(data, addr) {
  if (addr + 3 >= data.length) return 0;
  return (data[addr] << 24) | (data[addr + 1] << 16) | (data[addr + 2] << 8) | data[addr + 3];
}

function readU16(data, addr) {
  if (addr + 1 >= data.length) return 0;
  return (data[addr] << 8) | data[addr + 1];
}

function readS16(data, addr) {
  const v = readU16(data, addr);
  return v >= 0x8000 ? v - 0x10000 : v;
}

function readU8(data, addr) {
  return addr < data.length ? data[addr] : 0;
}

function hex(b) {
  return '0x' + b.toString(16).padStart(2, '0').toUpperCase();
}

function hexW(w) {
  return '0x' + w.toString(16).padStart(4, '0').toUpperCase();
}

// ============================================================
// 解析器: 角色能力初始表
// ============================================================

/**
 * 解析单个角色能力初始表条目
 * @param {Uint8Array} data - ROM 数据
 * @param {number} charIdx - 角色索引 (1-10)
 * @returns {object} 角色初始能力对象
 */
export function parseCharInit(data, charIdx) {
  const base = CHAR_INIT_TABLE + (charIdx - 1) * CHAR_INIT_ENTRY_SIZE;
  if (base + CHAR_INIT_DATA_SIZE > data.length) return null;

  const charInfo = PLAYABLE_CHARACTERS[charIdx - 1] || { jp: `Char#${charIdx}`, cn: '?', en: '?' };

  return {
    index: charIdx,
    romAddr: base,
    nameJp: charInfo.jp,
    nameCn: charInfo.cn,
    nameEn: charInfo.en,
    baseClassId:  readU8(data, base + 0x00),
    baseMP:       readU8(data, base + 0x01),
    atModifier:   readU16(data, base + 0x02),
    dfModifier:   readU16(data, base + 0x04),
    skillBits:    readU32(data, base + 0x06),
    reserved0A:   readU16(data, base + 0x0A),
    moveRange:    readU8(data, base + 0x0C),
    portraitIdx:  readU8(data, base + 0x0D),
    subClass:     readU8(data, base + 0x0E),
    classFlags:   readU8(data, base + 0x0F),
    classId:      readU8(data, base + 0x10),
    commandRange: readU8(data, base + 0x11),
    reserved12:   readU16(data, base + 0x12),
    raw: Array.from(data.slice(base, base + CHAR_INIT_DATA_SIZE)),
  };
}

/**
 * 解析全部10位可玩角色
 */
export function parseAllCharInit(data) {
  const chars = [];
  for (let i = 1; i <= CHAR_COUNT; i++) {
    const c = parseCharInit(data, i);
    if (c) chars.push(c);
  }
  return chars;
}

// ============================================================
// 解析器: 角色AT/DF/MV修正表
// ============================================================

/**
 * 解析单个角色的 AT/DF/MV 修正
 * @param {Uint8Array} data - ROM 数据
 * @param {number} charIdx - 角色索引 (1-10)
 */
export function parseCharModifier(data, charIdx) {
  const base = CHAR_MODIFIER_TABLE + (charIdx - 1) * CHAR_MODIFIER_SIZE;
  if (base + CHAR_MODIFIER_SIZE > data.length) return null;

  return {
    index: charIdx,
    romAddr: base,
    atBonus: readS8(data, base + 0x00),
    dfBonus: readS8(data, base + 0x01),
    mvBonus: readS8(data, base + 0x02),
    unknown: Array.from(data.slice(base + 0x03, base + CHAR_MODIFIER_SIZE)),
  };
}

function readS8(data, addr) {
  const v = readU8(data, addr);
  return v >= 0x80 ? v - 0x100 : v;
}

/**
 * 解析全部10位角色的修正值
 */
export function parseAllCharModifiers(data) {
  const mods = [];
  for (let i = 1; i <= CHAR_COUNT; i++) {
    const m = parseCharModifier(data, i);
    if (m) mods.push(m);
  }
  return mods;
}

// ============================================================
// 解析器: 角色RAM槽位指针表
// ============================================================

/**
 * 解析角色RAM槽位指针表 (ROM 0x05E5D8, 4B×16条目)
 *
 * Ghidra 用法 (FUN_0000a16a 等):
 *   iVar1 = *(int *)(PTR_DAT_0005e5d8 + charIdx * 4)
 *   → iVar1 是 0xFF603C 系列 RAM 地址
 *   unit_type = *(byte *)(iVar1 + 0x20)  // 阵营标志
 */
export function parseCharRamPtrTable(data) {
  const ptrs = [];
  for (let i = 0; i < CHAR_RAM_PTR_COUNT; i++) {
    const addr = CHAR_RAM_PTR_TABLE + i * 4;
    if (addr + 4 > data.length) break;
    const ptr = readU32(data, addr);
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

// ============================================================
// 解析器: 场景单位配置 (0x0821BE)
// ============================================================

/**
 * 解析场景单位配置
 *
 * Ghidra FUN_0000a122 流程:
 *   puVar3 = *(uint**)(0x0821BE + (level-1) * 4)  // 指针表查询
 *   memcpy(RAM 0xFFFF9F62, puVar3, 128)            // 复制 32 dword
 *
 * Ghidra FUN_0000a16a 流程 (使用配置):
 *   A0+4 = &0xFFFF9F62                  // 起始
 *   A0+8 = &0xFFFF9F62                  // 当前指针
 *   if (unit[0x20] != 1) A0+4 += 0x20   // 跳过 32B (第1段:玩家方)
 *   if (unit[0x20] != 3) A0+4 += 0x20   // 跳过 32B (第2段:AI特殊)
 *   A0+4 += 0x20                        // 跳过 32B (第3段:NPC)
 *   // 第4段 32B = 默认敌方
 *
 * 推测: 128B配置分为4段(每段32B = 8 dword),按单位阵营选择
 *   段0 (0x00-0x1F): 玩家方 (unit[0x20] == 1)
 *   段1 (0x20-0x3F): AI特殊 (unit[0x20] == 3)
 *   段2 (0x40-0x5F): NPC (其他)
 *   段3 (0x60-0x7F): 默认敌方
 *
 * @param {Uint8Array} data - ROM 数据
 * @param {number} levelIndex - 关卡索引 (1-31)
 */
export function parseScenarioUnitConfig(data, levelIndex) {
  const ptrAddr = SCENARIO_UNIT_CONFIG_PTR_TABLE + (levelIndex - 1) * 4;
  if (ptrAddr + 4 > data.length) return null;

  const configPtr = readU32(data, ptrAddr);
  if (configPtr < 0x200 || configPtr + SCENARIO_CONFIG_SIZE > data.length) {
    return {
      levelIndex,
      ptrAddr,
      configPtr,
      error: '配置指针无效',
    };
  }

  // 解析 4 段 (每段 8 dword = 32 字节)
  const segments = [];
  const segmentNames = ['player', 'aiSpecial', 'npc', 'enemyDefault'];

  for (let s = 0; s < 4; s++) {
    const segBase = configPtr + s * 32;
    const dwords = [];
    for (let d = 0; d < 8; d++) {
      dwords.push(readU32(data, segBase + d * 4));
    }
    segments.push({
      name: segmentNames[s],
      offset: s * 32,
      dwords,
      // dword[0] 通常是某种掩码或起始ID
      // dword[1..6] 可能是单位ID列表
      // dword[7] 可能是终止标志
    });
  }

  return {
    levelIndex,
    ptrAddr,
    configPtr,
    romAddr: configPtr,
    segments,
    raw: Array.from(data.slice(configPtr, configPtr + SCENARIO_CONFIG_SIZE)),
  };
}

/**
 * 解析全部31关的场景单位配置指针
 */
export function parseAllScenarioConfigs(data) {
  const configs = [];
  for (let i = 1; i <= 31; i++) {
    const cfg = parseScenarioUnitConfig(data, i);
    if (cfg) configs.push(cfg);
  }
  return configs;
}

/**
 * 列出已知的6种场景配置变体 (MEMORY.md记录)
 * 用于交叉验证
 */
export const SCENARIO_CONFIG_VARIANTS = [
  { ptr: 0x08223A, levels: '默认',       note: '多数关卡用' },
  { ptr: 0x0822BA, levels: '4,12,23',    note: '' },
  { ptr: 0x08233A, levels: '8',          note: '' },
  { ptr: 0x0823BA, levels: '11',         note: '' },
  { ptr: 0x08243A, levels: '25-27,31',   note: '' },
  { ptr: 0x0824BA, levels: '22,28,30',   note: '' },
];

// ============================================================
// 解析器: 职业数据表 (修正字段定义)
// ============================================================

/**
 * 职业数据表条目 (ROM 0x05EDDC, 0x1C字节/条目)
 *
 * Ghidra 交叉验证:
 *   - DAT_0005eddc: 表起始
 *   - DAT_0005edde (offset 0x02): word, 作为short读取 (用途待查)
 *   - DAT_0005ede0 (offset 0x04): word, 地形修正表相对偏移
 *       用法: terrainDef = DAT_0005eddc[terrainId + DAT_0005ede0[classId*0x1C]]
 *   - DAT_0005ede2 (offset 0x06): byte, 移动类型 (0x0F=飞行? 0x10=水兵?)
 *   - DAT_0005ede3 (offset 0x07): byte, 装备类型?
 *   - DAT_0005ede4 (offset 0x08): byte, 标志位 (==0检查)
 *   - DAT_0005ede7 (offset 0x0B): byte, 写到角色槽0x17 (兵种属性2)
 *   - DAT_0005ede8 (offset 0x0C): byte, 写到角色槽0x19 (兵种属性3)
 *   - DAT_0005ede9 (offset 0x0D): byte, MV (移动力) → 角色槽0x44
 *   - DAT_0005edea (offset 0x0E): byte, Range (射程) → 角色槽0x45
 *   - DAT_0005edeb (offset 0x0F): byte, AT基础 → 角色槽0x46
 *   - DAT_0005edec (offset 0x10): byte, DF基础 → 角色槽0x47
 *   - DAT_0005edef (offset 0x13): byte, MP/能力 → 角色槽0x50
 *
 * Ghidra 在 5996 行的用法:
 *   *(char**)(unit + 0x0F) = &DAT_0005eddc + *(short*)(DAT_0005eddc + classId*0x1C)
 *   → 第一个 word 是相对偏移, 加上表起始得到数据指针 (可能是命名/ Sprite 偏移)
 */
export const CLASS_DATA_FIELDS = [
  { offset: 0x00, size: 2, name: 'dataOffset',    desc: '相对偏移word (加0x05EDDC得到数据指针)' },
  { offset: 0x02, size: 2, name: 'field_02',      desc: 'word (用途待查, FUN_0000b558读取)' },
  { offset: 0x04, size: 2, name: 'terrainModOff', desc: '地形修正表相对偏移 (地形修正查找)' },
  { offset: 0x06, size: 1, name: 'moveType',      desc: '移动类型 (0x0F/0x10特殊, 见FUN_0000c010)' },
  { offset: 0x07, size: 1, name: 'field_07',      desc: 'byte (写到角色槽0x??)' },
  { offset: 0x08, size: 1, name: 'flag_08',       desc: '标志位 (==0检查)' },
  { offset: 0x09, size: 2, name: 'reserved_09',   desc: '预留' },
  { offset: 0x0B, size: 1, name: 'cmdRange2',     desc: '指挥范围2 (写到角色槽0x17)' },
  { offset: 0x0C, size: 1, name: 'cmdRange3',     desc: '指挥范围3 (写到角色槽0x19)' },
  { offset: 0x0D, size: 1, name: 'mv',            desc: 'MV移动力 (写到角色槽0x44)' },
  { offset: 0x0E, size: 1, name: 'range',         desc: 'Range射程 (写到角色槽0x45)' },
  { offset: 0x0F, size: 1, name: 'baseAT',        desc: 'AT基础 (写到角色槽0x46)' },
  { offset: 0x10, size: 1, name: 'baseDF',        desc: 'DF基础 (写到角色槽0x47)' },
  { offset: 0x11, size: 2, name: 'reserved_11',   desc: '预留' },
  { offset: 0x13, size: 1, name: 'mp',            desc: 'MP/能力位 (写到角色槽0x50)' },
  { offset: 0x14, size: 8, name: 'reserved_14',   desc: '预留' },
];

/**
 * 解析职业数据表条目 (修正版)
 * @param {Uint8Array} data - ROM 数据
 * @param {number} classId - 职业 ID
 */
export function parseClassDataEntry(data, classId) {
  const offset = CLASS_DATA_ADDR + classId * CLASS_ENTRY_SIZE;
  if (offset + CLASS_ENTRY_SIZE > data.length) return null;

  return {
    classId,
    romAddr: offset,
    dataOffset:    readS16(data, offset + 0x00),
    field_02:      readS16(data, offset + 0x02),
    terrainModOff: readS16(data, offset + 0x04),
    moveType:      readU8(data, offset + 0x06),
    field_07:      readU8(data, offset + 0x07),
    flag_08:       readU8(data, offset + 0x08),
    reserved_09:   readU16(data, offset + 0x09),
    cmdRange2:     readU8(data, offset + 0x0B),
    cmdRange3:     readU8(data, offset + 0x0C),
    mv:            readU8(data, offset + 0x0D),
    range:         readU8(data, offset + 0x0E),
    baseAT:        readU8(data, offset + 0x0F),
    baseDF:        readU8(data, offset + 0x10),
    reserved_11:   readU16(data, offset + 0x11),
    mp:            readU8(data, offset + 0x13),
    reserved_14:   Array.from(data.slice(offset + 0x14, offset + CLASS_ENTRY_SIZE)),
    // 计算命名/数据指针
    dataPtr: CLASS_DATA_ADDR + readS16(data, offset + 0x00),
    raw: Array.from(data.slice(offset, offset + CLASS_ENTRY_SIZE)),
  };
}

// ============================================================
// 综合查询: 角色完整初始化数据
// ============================================================

/**
 * 综合查询: 角色完整初始化数据
 * 合并: 角色初始表 + AT/DF修正表 + 职业基础属性
 *
 * @param {Uint8Array} data - ROM 数据
 * @param {number} charIdx - 角色索引 (1-10)
 */
export function getCharacterFullData(data, charIdx) {
  const init = parseCharInit(data, charIdx);
  const mod = parseCharModifier(data, charIdx);
  const classData = init ? parseClassDataEntry(data, init.classId) : null;

  if (!init) return null;

  // 模拟 FUN_00010bbe 的合并逻辑
  const finalAT = classData ? (classData.baseAT + (init.atModifier & 0xFF)) + (mod ? mod.atBonus : 0) : null;
  const finalDF = classData ? (classData.baseDF + (init.dfModifier & 0xFF)) + (mod ? mod.dfBonus : 0) : null;
  const finalMV = classData ? (classData.mv + (mod ? mod.mvBonus : 0)) : null;

  // 特殊职业 0x1D 的 MP 翻倍处理
  let finalMP = init.baseMP;
  if (init.classId === 0x1D) {
    finalMP = Math.min(99, finalMP * 2);
  }

  return {
    index: charIdx,
    name: PLAYABLE_CHARACTERS[charIdx - 1] || null,
    init,
    modifier: mod,
    classData,
    computed: {
      finalAT,
      finalDF,
      finalMV,
      finalMP,
      finalRange: classData ? classData.range : null,
    },
  };
}

/**
 * 导出全部10角色的完整初始化数据
 */
export function getAllCharactersFullData(data) {
  const result = [];
  for (let i = 1; i <= CHAR_COUNT; i++) {
    const c = getCharacterFullData(data, i);
    if (c) result.push(c);
  }
  return result;
}

// ============================================================
// 格式化输出 (调试用)
// ============================================================

/**
 * 格式化角色初始表为文本表格
 */
export function formatCharInitTable(data) {
  const chars = parseAllCharInit(data);
  const lines = [];
  lines.push('角色 | 中文名 | 职业ID | MP | AT修正 | DF修正 | 移动 | 子职 | CLASS | 指挥');
  lines.push('-----|--------|--------|----|--------|--------|------|------|-------|------');

  for (const c of chars) {
    lines.push(
      ` ${String(c.index).padStart(2)} | ${c.nameCn.padEnd(6)} | ${hex(c.classId).padEnd(4)} | ` +
      `${String(c.baseMP).padStart(2)} | ${hexW(c.atModifier)} | ${hexW(c.dfModifier)} | ` +
      `${String(c.moveRange).padStart(2)} | ${hex(c.subClass)} | ${hex(c.classId)} | ${String(c.commandRange).padStart(2)}`
    );
  }
  return lines.join('\n');
}

/**
 * 格式化场景配置为文本
 */
export function formatScenarioConfig(data, levelIndex) {
  const cfg = parseScenarioUnitConfig(data, levelIndex);
  if (!cfg) return `关卡${levelIndex}: 解析失败`;

  const lines = [];
  lines.push(`关卡 ${levelIndex} 单位配置 (ROM 0x${cfg.configPtr.toString(16).toUpperCase()}):`);

  for (const seg of cfg.segments) {
    lines.push(`  [${seg.name}] 偏移 ${hex(seg.offset)}:`);
    lines.push('    ' + seg.dwords.map((d, i) => `[${i}]=${hexW(d >>> 0)}`).join(' '));
  }
  return lines.join('\n');
}

// 注: 地址常量均以 export const 形式在头部声明, 无需额外 export 块
