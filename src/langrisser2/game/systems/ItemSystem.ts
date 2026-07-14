/**
 * ItemSystem.ts — Langrisser II 道具系统 (TypeScript版)
 *
 * 数据源: ROM 0x060530 (items data table, 37 entries × 8 bytes)
 *
 * ROM 条目格式 (8 bytes, 未用字段填 0xFF):
 *   [0] type          — 0=武器, 1=防具, 2=特殊/哑铃, 3=饰品, 4=饰品, 5=饰品, 6=魔杖, 7-0xA=召唤
 *   [1] primary       — 武器=AT加成, 防具=DF加成, 魔杖=魔法射程
 *   [2] field2        — 武器:DF修正(有符号), 其他:魔法伤害等
 *   [3] field3        — 武器:AT修正(有符号), 魔杖:魔法伤害加成
 *   [4] field4        — 特殊属性 (如装备限制标志)
 *   [5] field5        — 修正A (A+ bonus)
 *   [6] field6        — range/other
 *   [7] field7        — 修正D (D+ bonus)
 *
 * 验证: md-magic.js (ROM 0x060530, 0x0108D0 lea 指令)
 */
import { read8 } from '../data/rom';

function s8(b: number): number { return b >= 128 ? b - 256 : b; }

// ============================================================================
// ROM Addresses
// ============================================================================
export const ITEM_DATA_ADDR = 0x060530;
export const ITEM_ENTRY_SIZE = 8;
export const ITEM_COUNT = 37; // items indexed from 1-37 (ID 0 is empty)

// ============================================================================
// Item Type Enum
// ============================================================================
export const enum ItemType {
  WEAPON   = 0x00,  // 武器 (AT加成)
  ARMOR    = 0x01,  // 防具 (DF加成)
  SPECIAL  = 0x02,  // 特殊 (哑铃等)
  ACC_1    = 0x03,  // 饰品
  ACC_2    = 0x04,  // 饰品
  ACC_3    = 0x05,  // 饰品
  MAGE_ROD = 0x06,  // 魔杖 (魔法射程/伤害加成)
  SUMMON_A = 0x07,  // 召唤道具
  SUMMON_B = 0x08,  // 召唤道具
  SUMMON_C = 0x09,  // 召唤道具
  SUMMON_D = 0x0A,  // 召唤道具
}

export const ITEM_TYPE_NAMES: Record<number, string> = {
  0x00: '武器', 0x01: '防具', 0x02: '特殊',
  0x03: '饰品', 0x04: '饰品', 0x05: '饰品',
  0x06: '魔杖', 0x07: '召唤', 0x08: '召唤',
  0x09: '召唤', 0x0A: '召唤',
};

// ============================================================================
// Item name table (extracted from ROM, cross-verified with Japanese originals)
// ============================================================================
export const ITEM_NAMES: Record<number, { jp: string; cn: string }> = {
  // 武器 (ID 0x01-0x10)
  0x01: { jp: 'ナイフ',          cn: '小刀' },
  0x02: { jp: 'ウォーハンマー',   cn: '战锤' },
  0x03: { jp: 'グレートソード',   cn: '巨剑' },
  0x04: { jp: 'ワンド',          cn: '魔杖' },
  0x05: { jp: 'フレイムランス',   cn: '火焰枪' },
  0x06: { jp: 'デビルアックス',   cn: '恶魔斧' },
  0x07: { jp: 'D·スレイヤー',     cn: '屠龙剑' },
  0x08: { jp: 'ラングリッサー',   cn: '兰古瑞萨' },
  0x09: { jp: '真ラングリッサー', cn: '真兰古瑞萨' },
  0x0A: { jp: 'メサイセンソード', cn: '圣剑' },
  0x0B: { jp: '铁アレイ',         cn: '哑铃' },
  0x0C: { jp: 'ホーリーロッド',   cn: '圣杖' },
  0x0D: { jp: 'ダークロッド',     cn: '暗杖' },
  0x0E: { jp: 'アルハザード',     cn: '阿鲁哈萨特' },
  0x0F: { jp: 'ロングボウ',       cn: '长弓' },
  0x10: { jp: 'アーバレスト',     cn: '强弩' },

  // 防具 (ID 0x11-0x18)
  0x11: { jp: 'S·シールド',       cn: '小盾' },
  0x12: { jp: 'L·シールド',       cn: '大盾' },
  0x13: { jp: 'チェインメイル',   cn: '锁子甲' },
  0x14: { jp: 'プレートアーマー', cn: '板甲' },
  0x15: { jp: 'アサルトスーツ',   cn: '强袭装' },
  0x16: { jp: 'ローブ',           cn: '长袍' },
  0x17: { jp: 'ドラゴンスケイル', cn: '龙鳞' },
  0x18: { jp: 'ミラージュローブ', cn: '幻影长袍' },

  // 饰品/特殊 (ID 0x19-0x1F)
  0x19: { jp: 'ルーンストーン',   cn: '符文石' },
  0x1A: { jp: 'クロス',           cn: '十字架' },
  0x1B: { jp: 'ネックレス',       cn: '项链' },
  0x1C: { jp: 'オーブ',           cn: '宝珠' },
  0x1D: { jp: 'スピードブーツ',   cn: '速度靴' },
  0x1E: { jp: 'クラウン',         cn: '王冠' },
  0x1F: { jp: 'アミュレット',     cn: '护身符' },

  // 召唤道具 (ID 0x20-0x25)
  0x20: { jp: 'アウローラ',       cn: '极光' },
  0x21: { jp: 'カーバンクル',     cn: '红宝石兽' },
  0x22: { jp: 'ギャラルのホルン', cn: '加拉尔号角' },
  0x23: { jp: 'オーディンのたて', cn: '奥丁之盾' },
  0x24: { jp: '天使の羽',         cn: '天使之羽' },
  0x25: { jp: 'グレイプニール',   cn: '缚狼锁' },
};

// ============================================================================
// Parsed Item Data
// ============================================================================
export interface ParsedItem {
  id: number;
  nameJp: string;
  nameCn: string;
  type: number;
  typeName: string;
  /** 主属性: 武器=AT, 防具=DF, 魔杖=射程 */
  primary: number;
  /** 副属性 */
  secondary: number;
  /** AT修正 (A+) */
  atCorrection: number;
  /** DF修正 (D+) */
  dfCorrection: number;
  /** 特殊属性 (装备限制/其他标志) */
  specialAttr: number;
  /** 原始 ROM 字节 */
  raw: number[];
}

/**
 * Parse a single item entry from ROM
 */
function parseItem(rom: Uint8Array, id: number): ParsedItem | null {
  if (id < 1 || id > ITEM_COUNT) return null;
  const off = ITEM_DATA_ADDR + id * ITEM_ENTRY_SIZE;
  if (off + ITEM_ENTRY_SIZE > rom.length) return null;

  const raw: number[] = [];
  for (let i = 0; i < ITEM_ENTRY_SIZE; i++) raw.push(rom[off + i]);

  const type = raw[0];
  if (type === 0xFF) return null; // empty slot

  const nameInfo = ITEM_NAMES[id] || { jp: `item_${id}`, cn: `道具${id}` };

  let primary = 0, secondary = 0;
  const atc = raw[5] !== 0xFF ? s8(raw[5]) : 0;
  const dfc = raw[7] !== 0xFF ? s8(raw[7]) : 0;

  switch (type) {
    case ItemType.WEAPON:   // 武器
      primary = raw[1];         // AT bonus
      secondary = raw[2] !== 0xFF ? s8(raw[2]) : 0; // DF modifier
      break;
    case ItemType.ARMOR:    // 防具
      primary = raw[1];         // DF bonus
      secondary = 0;
      break;
    case ItemType.MAGE_ROD: // 魔杖
      primary = raw[1];         // Magic range bonus
      secondary = raw[3] !== 0xFF ? s8(raw[3]) : 0; // Magic damage
      break;
    default:                // 饰品/特殊/召唤
      primary = raw[1] !== 0xFF ? s8(raw[1]) : 0;
      secondary = raw[2] !== 0xFF ? s8(raw[2]) : 0;
      break;
  }

  return {
    id,
    nameJp: nameInfo.jp,
    nameCn: nameInfo.cn,
    type,
    typeName: ITEM_TYPE_NAMES[type] || `0x${type.toString(16)}`,
    primary,
    secondary,
    atCorrection: atc,
    dfCorrection: dfc,
    specialAttr: raw[4] !== 0xFF ? raw[4] : 0,
    raw,
  };
}

/**
 * Parse all items from ROM
 */
export function parseAllItems(rom: Uint8Array): ParsedItem[] {
  const items: ParsedItem[] = [];
  for (let id = 1; id <= ITEM_COUNT; id++) {
    const item = parseItem(rom, id);
    if (item) items.push(item);
  }
  return items;
}

/**
 * Category grouped items
 */
export interface ItemCategories {
  weapons: ParsedItem[];
  armors: ParsedItem[];
  accessories: ParsedItem[];
  mageRods: ParsedItem[];
  summons: ParsedItem[];
  specials: ParsedItem[];
}

export function categorizeItems(items: ParsedItem[]): ItemCategories {
  const result: ItemCategories = {
    weapons: [], armors: [], accessories: [], mageRods: [], summons: [], specials: [],
  };
  for (const item of items) {
    switch (item.type) {
      case ItemType.WEAPON:   result.weapons.push(item); break;
      case ItemType.ARMOR:    result.armors.push(item); break;
      case ItemType.MAGE_ROD: result.mageRods.push(item); break;
      case ItemType.ACC_1:
      case ItemType.ACC_2:
      case ItemType.ACC_3:    result.accessories.push(item); break;
      case ItemType.SUMMON_A:
      case ItemType.SUMMON_B:
      case ItemType.SUMMON_C:
      case ItemType.SUMMON_D: result.summons.push(item); break;
      default:                result.specials.push(item); break;
    }
  }
  return result;
}

/**
 * Get combat stats for a specific item
 * Returns the weapon AT/DF bonuses as applied by the game
 */
export interface ItemCombatBonus {
  atBonus: number;
  dfBonus: number;
  atCorrection: number;
  dfCorrection: number;
}

export function getItemCombatBonus(item: ParsedItem): ItemCombatBonus {
  const bonus: ItemCombatBonus = { atBonus: 0, dfBonus: 0, atCorrection: 0, dfCorrection: 0 };
  switch (item.type) {
    case ItemType.WEAPON:
      bonus.atBonus = item.primary;
      bonus.dfBonus = item.secondary;
      bonus.atCorrection = item.atCorrection;
      bonus.dfCorrection = item.dfCorrection;
      break;
    case ItemType.ARMOR:
      bonus.dfBonus = item.primary;
      bonus.atCorrection = item.atCorrection;
      bonus.dfCorrection = item.dfCorrection;
      break;
    default:
      bonus.atCorrection = item.atCorrection;
      bonus.dfCorrection = item.dfCorrection;
      break;
  }
  return bonus;
}

// ============================================================================
// Shop item pool definitions (ROM shopId → item IDs)
// ============================================================================

/**
 * Normal shop item pool (shopId=0)
 * Weapons/armors available in regular shops
 */
export const NORMAL_SHOP_ITEMS: number[] = [
  0x01, 0x02, 0x03, 0x0F, 0x11, 0x12, 0x13, 0x14, 0x16,
];

/**
 * Hidden shop 1 item pool (shopId=0x65)
 * Activated by: A B A B ↑ ↓ ← → START B
 */
export const HIDDEN_SHOP_1_ITEMS: number[] = [
  // Weapons
  0x05, 0x06, 0x07, 0x0C, 0x0D,
  // Armor
  0x15, 0x17, 0x18,
  // Accessories
  0x19, 0x1A, 0x1B, 0x1C, 0x1D, 0x1E, 0x1F,
];

/**
 * True hidden shop item pool (shopId=0x5C)
 * Activated by: B START → ← ↓ ↑ B A B A ↑ ↓ ← → START
 */
export const TRUE_HIDDEN_SHOP_ITEMS: number[] = [
  // Ultimate weapons
  0x08, 0x09, 0x0A, 0x0E,
  // Summon items
  0x20, 0x21, 0x22, 0x23, 0x24, 0x25,
  // Special
  0x0B,
];

/** Price lookup (based on ROM and fan docs) */
export const ITEM_PRICES: Record<number, number> = {
  0x01: 50,   0x02: 120,  0x03: 200,   0x04: 250,  0x05: 8500,
  0x06: 12000, 0x07: 3000, 0x08: 30000, 0x09: 0,    0x0A: 200,
  0x0B: 5000,  0x0C: 750,  0x0D: 1750,  0x0E: 10000, 0x0F: 500,
  0x10: 1500,  0x11: 60,   0x12: 400,   0x13: 200,  0x14: 800,
  0x15: 2000,  0x16: 30,   0x17: 1000,  0x18: 12000,
  0x19: 1500,  0x1A: 300,  0x1B: 900,   0x1C: 2000, 0x1D: 700,
  0x1E: 1000,  0x1F: 1000,
  0x20: 0,     0x21: 0,    0x22: 0,     0x23: 0,    0x24: 0,
  0x25: 0,
};
