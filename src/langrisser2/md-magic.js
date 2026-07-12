/**
 * Langrisser II 魔法 / 道具 / 指令表解析器
 *
 * 道具数据来源验证:
 *   - ROM 0x060530: 道具属性表 (68K lea 指令证实, 0x0108D0)
 *   - PAR金手指: 单位结构体偏移交叉验证 (9角色, 偏移100%一致)
 *   - RAM dump: Cherie装备 WarHammer+ChainMail 效果验证
 */

/** 指令菜单槽位表 ROM 地址 */
export const CMD_TABLE_ADDR = 0x97660;

/** 道具属性表 ROM 地址 (8字节/条目, 37条目, 索引0为空) */
export const ITEM_DATA_ADDR = 0x060530;
export const ITEM_ENTRY_SIZE = 8;
export const ITEM_COUNT = 37;

/** 道具类型 */
export const ITEM_TYPE = {
  0x00: '武器',
  0x01: '防具',
  0x02: '特殊',
  0x03: '饰品',
  0x04: '饰品',
  0x05: '饰品',
  0x06: '魔杖',
  0x07: '召唤',
  0x08: '召唤',
  0x09: '召唤',
  0x0A: '召唤',
};

/**
 * 道具名称表 (37种, ID 0x01–0x25)
 * 名称来源于日文原版
 */
export const ITEM_NAMES = {
  // 武器 (0x01–0x10)
  0x01: 'Knife (ナイフ)',
  0x02: 'WarHammer (ウォーハンマー)',
  0x03: 'GreatSword (グレートソード)',
  0x04: 'Wand (ワンド)',
  0x05: 'FlameLance (フレイムランス)',
  0x06: 'DevilAxe (デビルアックス)',
  0x07: 'DragonSlayer (D·スレイヤー)',
  0x08: 'Langrisser (ラングリッサー)',
  0x09: 'TrueLangrisser (真ラングリッサー)',
  0x0A: 'MasayanSword (メサイセンソード)',
  0x0B: 'Dumbbell (铁アレイ)',
  0x0C: 'HolyRod (ホーリーロッド)',
  0x0D: 'DarkRod (ダークロッド)',
  0x0E: 'Alhazard (アルハザード)',
  0x0F: 'LongBow (ロングボウ)',
  0x10: 'Arbalest (アーバレスト)',

  // 防具 (0x11–0x18)
  0x11: 'SmallShield (S·シールド)',
  0x12: 'LargeShield (L·シールド)',
  0x13: 'ChainMail (チェインメイル)',
  0x14: 'PlateArmor (プレートアーマー)',
  0x15: 'AssaultSuit (アサルトスーツ)',
  0x16: 'Robe (ローブ)',
  0x17: 'DragonScale (ドラゴンスケイル)',
  0x18: 'MirageRobe (ミラージュローブ)',

  // 饰品 (0x19–0x1F)
  0x19: 'RuneStone (ルーンストーン)',
  0x1A: 'Cross (クロス)',
  0x1B: 'Necklace (ネックレス)',
  0x1C: 'Orb (オーブ)',
  0x1D: 'SpeedBoots (スピードブーツ)',
  0x1E: 'Crown (クラウン)',
  0x1F: 'Amulet (アミュレット)',

  // 召唤道具 (0x20–0x25)
  0x20: 'Aurora (アウローラ)',
  0x21: 'Carbuncle (カーバンクル)',
  0x22: 'GiallarHorn (ギャラルのホルン)',
  0x23: 'OdinsShield (オーディンのたて)',
  0x24: 'AngelWing (天使の羽)',
  0x25: 'Gleipnir (グレイプニール)',
};

/**
 * 解析战斗指令菜单数据
 * ROM 0x97660 起: 6组指令槽数据
 */
export function parseCommandMenu(data) {
  const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
  const slots = [];

  const slotNames = [
    '攻击',         '移动/指令',
    '装备/物品',    '法术',
    '法术/物品',    '物品',
  ];

  const slotConds = [
    '始终可用',
    '单位未移动',
    '部队拥有物品 & bit0',
    '部队拥有法术 & bit0x800000 + 未移动',
    '部队未移动',
    '部队未移动',
  ];

  for (let i = 0; i < 6; i++) {
    const addr = CMD_TABLE_ADDR + i * 2;
    if (addr + 1 > data.length) break;
    const cmdId  = view.getUint16(addr, false);
    const paramLo = view.getUint16(addr + 2, false);

    slots.push({
      slot: i,
      name: slotNames[i] || `槽${i}`,
      condition: slotConds[i] || '?',
      commandId: cmdId,
      paramLo,
      paramHi: view.getUint16(addr + 4, false),
    });
  }

  return slots;
}

/**
 * 法术名称表
 */
export const SPELL_NAMES = {
  0x01: '魔法弹 (Fireball)',
  0x02: '火焰 (Fire)',
  0x03: '地狱火 (Inferno)',
  0x04: '暴风雪 (Blizzard)',
  0x05: '雷电 (Thunder)',
  0x06: '陨石 (Meteor)',
  0x07: '地震 (Earthquake)',
  0x08: '龙卷风 (Tornado)',
  0x09: '回复1 (Heal1)',
  0x0A: '回复2 (Heal2)',
  0x0B: '回复3 (Heal3)',
  0x0C: '攻击强化 (AttackUp)',
  0x0D: '防御强化 (DefenseUp)',
  0x0E: '加速 (Quick)',
  0x0F: '催眠 (Sleep)',
  0x10: '混乱 (Confuse)',
  0x11: '沉默 (Mute)',
  0x12: '传送 (Teleport)',
  0x13: '石化 (Stone)',
  0x14: '即死 (Death)',
  0x15: '吸血 (Vampire)',
};

/**
 * 解析单位法术槽 (5 个法术槽位)
 */
export function parseUnitSpells(unitData, unitAddr) {
  const spellSlots = [
    { idOff: 0x0C, lvOff: 0x0D },
    { idOff: 0x18, lvOff: 0x19 },
    { idOff: 0x24, lvOff: 0x25 },
    { idOff: 0x30, lvOff: 0x31 },
    { idOff: 0x3C, lvOff: 0x3D },
  ];

  return spellSlots.map((slot, i) => {
    const spellId  = unitData[unitAddr + slot.idOff];
    const spellLv  = unitData[unitAddr + slot.lvOff];
    const name = SPELL_NAMES[spellId] || (spellId !== 0 && spellId < 0xFF ? `法术#${spellId}` : '-');
    return {
      slot: i,
      id: spellId,
      level: spellLv,
      name,
      active: spellId !== 0 && spellId !== 0xFF,
    };
  });
}

function sb(b) { return b < 128 ? b : b - 256; }

/**
 * 从 ROM 解析单个道具条目
 * 条目格式 (8字节, 未用字段填 0xFF):
 *   [0] type     — 道具类型 (见 ITEM_TYPE)
 *   [1] primary  — 主属性 (武器=AT, 防具=DF, 魔杖=魔法射程)
 *   [2] field2   — 辅属性
 *   [3] field3   — 第三属性 (武器=DF修正, 魔杖=魔法伤害)
 *   [4] field4   — 第四属性
 *   [5] field5   — 第五属性 (修正A)
 *   [6] field6   — 第六属性
 *   [7] field7   — 第七属性 (修正D)
 */
export function parseItemEntry(romData, id) {
  if (id < 1 || id > ITEM_COUNT) return null;

  const off = ITEM_DATA_ADDR + id * ITEM_ENTRY_SIZE;
  if (off + ITEM_ENTRY_SIZE > romData.length) return null;

  const raw = Array.from(romData.slice(off, off + ITEM_ENTRY_SIZE));
  const type = raw[0];
  const vals = raw.map(sb);

  const item = {
    id,
    name: ITEM_NAMES[id] || `Item#${id}`,
    type,
    typeName: ITEM_TYPE[type] || `类型0x${type.toString(16)}`,
    raw: Uint8Array.from(raw),
    vals,
  };

  // 按类型解释字段
  if (type === 0x00) {
    item.at  = vals[1];
    item.df  = raw[3] !== 0xFF ? vals[3] : 0;
    item.atc = raw[5] !== 0xFF ? vals[5] : 0;
    item.dfc = raw[7] !== 0xFF ? vals[7] : 0;
  } else if (type === 0x01) {
    item.df  = vals[1];
    item.atc = raw[5] !== 0xFF ? vals[5] : 0;
    item.dfc = raw[7] !== 0xFF ? vals[7] : 0;
  } else if (type === 0x06) {
    item.magicRange = vals[1];
    item.magicDamage = vals[3];
    item.magicResist = raw[5] !== 0xFF ? vals[5] : 0;
  } else {
    item.df  = raw[1] !== 0xFF ? vals[1] : 0;
    item.atc = raw[5] !== 0xFF ? vals[5] : 0;
    item.dfc = raw[7] !== 0xFF ? vals[7] : 0;
  }

  return item;
}

/**
 * 解析全部道具属性表
 * 从 ROM data 中读取 37 个条目
 */
export function parseAllItems(romData) {
  const items = [];
  for (let id = 1; id <= ITEM_COUNT; id++) {
    items.push(parseItemEntry(romData, id));
  }
  return items;
}

/**
 * 从单位运行时数据解析装备道具
 * RAM 偏移: 道具槽#1=0x09, #2=0x0A, #3=0x0B (各1字节, 道具ID)
 * 道具ID=0x00 表示空槽位, 0xFF 表示不可装备
 */
export function parseUnitItems(unitData, unitAddr) {
  const slots = [0x09, 0x0A, 0x0B];
  return slots.map((off, i) => {
    const id = unitData[unitAddr + off];
    return {
      slot: i + 1,
      id,
      name: ITEM_NAMES[id] || (id === 0 ? '-' : (id < 0xFF ? `道具#${id}` : '不可装备')),
      active: id !== 0 && id !== 0xFF,
    };
  });
}
