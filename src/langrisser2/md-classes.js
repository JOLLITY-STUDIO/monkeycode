/**
 * Langrisser II 职业属性解析器
 * 从 ROM 地址 0x5EDE8 读职业数据 (每职业 0x1C=28 字节)
 * 从 ROM 地址 0x82A58 读等级成长修正 (每职业 6 字节)
 */

/** 职业基础属性表 ROM 地址 */
const CLASS_DATA_ADDR = 0x5EDE8;

/** 每个职业数据大小 (28 字节) */
const CLASS_RECORD_SIZE = 0x1C;

/** 职业成长修正表 ROM 地址 */
const CLASS_GROWTH_ADDR = 0x82A58;

/** 成长修正大小 (6 字节/职业) */
const GROWTH_RECORD_SIZE = 6;

/** 职业精灵映射表 */
const CLASS_SPRITE_ADDR = 0x5DB80;

/**
 * 职业名称表
 * 根据 Langrisser II 官方职业体系
 */
const CLASS_NAMES = {
  0x00: { name: '战士', icon: '⚔️' },
  0x01: { name: '领主', icon: '👑' },
  0x02: { name: '剑士统帅', icon: '⚔️' },
  0x03: { name: '骑士', icon: '🐴' },
  0x04: { name: '骑士统帅', icon: '🐴' },
  0x05: { name: '圣骑士', icon: '🐴' },
  0x06: { name: '魔法师', icon: '🔮' },
  0x07: { name: '大魔法师', icon: '🔮' },
  0x08: { name: '召唤师', icon: '🌀' },
  0x09: { name: '僧侣', icon: '✨' },
  0x0A: { name: '主教', icon: '✨' },
  0x0B: { name: '圣者', icon: '✨' },
  0x0C: { name: '盗贼', icon: '🗡️' },
  0x0D: { name: '刺客', icon: '🗡️' },
  0x0E: { name: '忍者', icon: '🥷' },
  0x0F: { name: '弓兵', icon: '🏹' },
  0x10: { name: '狙击手', icon: '🏹' },
  0x11: { name: '龙骑士', icon: '🐉' },
  0x12: { name: '龙骑统帅', icon: '🐉' },
  0x13: { name: '飞龙骑士', icon: '🐉' },
  0x14: { name: '飞龙统帅', icon: '🐉' },
  0x15: { name: '水兵', icon: '🌊' },
  0x16: { name: '水兵统帅', icon: '🌊' },
  0x17: { name: '天使', icon: '👼' },
  0x18: { name: '大天使', icon: '👼' },
  0x19: { name: '恶魔', icon: '👿' },
  0x1A: { name: '大恶魔', icon: '👿' },
  0x1B: { name: '幽灵', icon: '👻' },
  0x1C: { name: '吸血鬼', icon: '🧛' },
  0x1D: { name: '骷髅', icon: '💀' },
  0x1E: { name: '石像鬼', icon: '🗿' },
};

/**
 * 转职树 (上级职业ID 映射)
 * 0xFF = 无上级/最终职业
 */
const PROMOTION_TREE = {
  // 战士系
  0x00: [0x01, 0x03, 0x06],   // 战士 → 领主/骑士/魔法师
  0x01: [0x02, 0x05, 0x0B],   // 领主 → 剑士统帅/圣骑士/圣者
  0x02: [0xFF],                 // 剑士统帅 = 顶
  // 骑士系
  0x03: [0x04, 0x11],          // 骑士 → 骑士统帅/龙骑士
  0x04: [0x05, 0x12],          // 骑士统帅 → 圣骑士/龙骑统帅
  0x05: [0xFF],                 // 圣骑士 = 顶
  // 魔法系
  0x06: [0x07, 0x08],          // 魔法师 → 大魔法师/召唤师
  0x07: [0x0B],                 // 大魔法师 → 圣者
  0x08: [0xFF],                 // 召唤师 = 顶
  // 僧侣系
  0x09: [0x0A, 0x0B],          // 僧侣 → 主教/圣者
  0x0A: [0x0B],                 // 主教 → 圣者
  0x0B: [0xFF],                 // 圣者 = 顶
  // 盗贼系
  0x0C: [0x0D, 0x0E],          // 盗贼 → 刺客/忍者
  0x0D: [0xFF],                 // 刺客 = 顶
  0x0E: [0xFF],                 // 忍者 = 顶
  // 弓兵系
  0x0F: [0x10],                 // 弓兵 → 狙击手
  0x10: [0xFF],                 // 狙击手 = 顶
  // 龙骑系
  0x11: [0x12, 0x13],          // 龙骑士 → 龙骑统帅/飞龙骑士
  0x12: [0xFF],                 // 龙骑统帅 = 顶
  0x13: [0x14],                 // 飞龙骑士 → 飞龙统帅
  0x14: [0xFF],                 // 飞龙统帅 = 顶
  // 水兵系
  0x15: [0x16],                 // 水兵 → 水兵统帅
  0x16: [0xFF],                 // 水兵统帅 = 顶
  // 特殊
  0x17: [0x18],                 // 天使 → 大天使
  0x18: [0xFF],
  0x19: [0x1A],                 // 恶魔 → 大恶魔
  0x1A: [0xFF],
};

/**
 * 解析单个职业数据记录
 */
export function parseClassRecord(data, classId) {
  const base = CLASS_DATA_ADDR + classId * CLASS_RECORD_SIZE;
  if (base + CLASS_RECORD_SIZE > data.length) return null;

  const view = new DataView(data.buffer, data.byteOffset, data.byteLength);

  const record = {
    classId,
    name: CLASS_NAMES[classId]?.name || `职业${classId}`,
    icon: CLASS_NAMES[classId]?.icon || '?',
    promotions: PROMOTION_TREE[classId] || [],
  };

  try {
    record.at = data[base + 0];
    record.df = data[base + 1];
    record.mp = data[base + 2];
    record.mv = data[base + 4];
    record.commRange = data[base + 6];
    record.classType = data[base + 8];
    record.atGrowth = data[base + 10];
    record.dfGrowth = data[base + 11];
    record.mpGrowth = data[base + 12];
    record.skillFlags = (data[base + 13] << 16) | (data[base + 14] << 8) | data[base + 15];
    record.terrainAffinity = [];
    for (let i = 0; i < 8; i++) {
      record.terrainAffinity.push(data[base + 16 + i]);
    }
  } catch (e) {
    return null;
  }

  // 读成长修正
  const growthBase = CLASS_GROWTH_ADDR + (classId - 1) * GROWTH_RECORD_SIZE;
  if (growthBase + GROWTH_RECORD_SIZE <= data.length) {
    try {
      record.atGrowth = view.getInt16(growthBase, false);
      record.dfGrowth = view.getInt16(growthBase + 2, false);
      record.mpGrowth = view.getInt16(growthBase + 4, false);
    } catch (e) { }
  }

  return record;
}

/**
 * 解析所有职业数据
 */
export function parseAllClasses(data, maxClasses = 48) {
  const classes = [];
  for (let id = 0; id < maxClasses; id++) {
    const record = parseClassRecord(data, id);
    if (record && (record.at > 0 || record.df > 0 || record.mv > 0 || record.mp > 0)) {
      classes.push(record);
    }
  }
  return classes;
}

/**
 * 解析职业精灵映射表 (0x5DB80)
 * 返回: Map<classCategory, Map<soldierType, spriteId>>
 */
export function parseClassSpriteTable(data) {
  const maps = [];
  const view = new DataView(data.buffer, data.byteOffset, data.byteLength);

  for (let cat = 0; cat < 10; cat++) {
    const ptrAddr = CLASS_SPRITE_ADDR + cat * 4;
    if (ptrAddr + 4 > data.length) break;

    const tableAddr = view.getUint32(ptrAddr, false) & 0x00FFFFFF;
    if (tableAddr >= data.length || tableAddr < 0x200) continue;

    const entries = [];
    let i = 0;
    while (tableAddr + i * 3 + 2 < data.length) {
      const soldierType = data[tableAddr + i * 3];
      if (soldierType === 0xFF) break;
      entries.push({
        soldierType,
        spriteIdLo: data[tableAddr + i * 3 + 1],
        spriteIdHi: data[tableAddr + i * 3 + 2],
      });
      i++;
    }
    maps[cat + 1] = entries;
  }
  return maps;
}

/**
 * 从单位结构体解析
 */
export function parseUnitStruct(data, addr) {
  if (addr + 0x60 > data.length) return null;

  return {
    exists:     data[addr + 0x00] !== 0xFF,
    classType:  data[addr + 0x01],
    posX:       data[addr + 0x04],
    posY:       data[addr + 0x05],
    level:      data[addr + 0x05],
    sideFlags:  data[addr + 0x20],
    subUnits:   [],
    at:         (data[addr + 0x2E] << 8) | data[addr + 0x2F],
    df:         (data[addr + 0x3A] << 8) | data[addr + 0x3B],
    hp:         data[addr + 0x38],
    hpMax:      data[addr + 0x39],
    mp:         data[addr + 0x46],
    mv:         data[addr + 0x47],
    override:   data[addr + 0x5C],
    exp:        data[addr + 0x5E],
  };
}

export { CLASS_NAMES, PROMOTION_TREE };
