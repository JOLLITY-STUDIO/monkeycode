/**
 * SaveSystem.ts — Langrisser II 存档/读档系统
 *
 * ROM 参考: loc_00A89C (存档处理), 0x11F88 (SRAM 读取初始化)
 * SRAM 布局: $200001-$203FFF (16KB 备用电池), 每槽 0x1100 字节
 *
 * TS 使用 localStorage 代替 SRAM
 * 初始角色数据硬编码 (搬运 ROM 0x05E64A → 本文件 CHAR_INIT_DATA)
 */

import { PLAYABLE_CHARACTERS, CHAR_COUNT } from '../data/character.js';
import { CLASS_STATS, L2_CLASSES } from '../data/classes.js';
// parseCharInit/parseCharModifier 等保留在 character.ts 作为 ROM 文档参考

// ============================================================================
// 硬编码初始角色数据 (搬运自 ROM 0x05E64A 角色初始表)
// ROM 0x05E64A: 10 characters × 14B → RAM 0xFFFFA4CC (FUN_00010a94)
// ROM 0x082A59: AT/DF/MV modifier table (6B/char, FUN_00010bbe)
// ============================================================================
// [charIdx]: 1-10, 对应 艾尔文→拉娜
// classId: ROM 0x05E64A offset 0x10 (CLASS_ID, → RAM 角色槽 0x0B)
// mpStart: ROM offset 0x01 (baseMP, → RAM 角色槽 0x38)
const CHAR_INIT_DATA: { classId: number; mpStart: number }[] = [
  { classId: 0x00, mpStart: 3 },  // 1: 艾尔文 - 战士      (ROM 0x05E64A)
  { classId: 0x06, mpStart: 8 },  // 2: 海恩   - 魔法师    (ROM 0x05E64A+0x0E)
  { classId: 0x02, mpStart: 3 },  // 3: 雪莉   - 剑士统帅  (ROM 0x05E64A+0x1C)
  { classId: 0x09, mpStart: 5 },  // 4: 阿伦   - 僧侣      (ROM 0x05E64A+0x2A)
  { classId: 0x03, mpStart: 3 },  // 5: 基斯   - 骑士      (ROM 0x05E64A+0x38)
  { classId: 0x05, mpStart: 3 },  // 6: 利斯塔 - 圣骑士    (ROM 0x05E64A+0x46)
  { classId: 0x03, mpStart: 3 },  // 7: 斯科特 - 骑士      (ROM 0x05E64A+0x54)
  { classId: 0x06, mpStart: 6 },  // 8: 捷西卡 - 魔法师    (ROM 0x05E64A+0x62)
  { classId: 0x09, mpStart: 6 },  // 9: 莉亚娜 - 僧侣      (ROM 0x05E64A+0x70)
  { classId: 0x06, mpStart: 8 },  // 10: 拉娜  - 魔法师    (ROM 0x05E64A+0x7E)
];

// ============================================================================
// 存档格式
// ============================================================================
const SAVE_PREFIX = 'l2_save_';
const SAVE_VERSION = 2;
const MAX_SLOTS = 3;

/** 单个角色的存档数据 (精简, 只存必要状态) */
export interface CharSaveData {
  /** 角色ID: 1-10 → PLAYABLE_CHARACTERS[index-1] */
  id: number;
  /** 当前职业 ID */
  classId: number;
  /** 等级 */
  level: number;
  /** 经验值 */
  exp: number;
  /** 当前 HP */
  hp: number;
  /** 当前 MP */
  mp: number;
  /** 装备: 武器ID (0=无) */
  weaponId: number;
  /** 装备: 防具ID (0=无) */
  armorId: number;
  /** 装备: 饰品ID (0=无) */
  accessoryId: number;
  /** 已学会法术ID列表 */
  spellIds: number[];
  /** 士兵类型 */
  soldierType: number;
  /** 士兵数 */
  soldierCount: number;
  /** 是否已加入 */
  joined: boolean;
  /** 是否存活 */
  alive: boolean;
}

/** 存档数据结构 */
export interface SaveData {
  version: number;
  timestamp: number;
  slot: number;

  // 进度
  scenarioId: number;
  turn: number;
  gold: number;
  totalKills: number;

  // 商店状态 (对应 RAM $FFFFA6DC)
  shopMode: number;  // 0=正常, 1=隐藏商店($65), 2=真隐藏商店($5C)

  // 角色数据
  characters: CharSaveData[];

  // 背包
  inventory: number[];

  // 解锁
  unlockedScenarios: number[];
  defeatedClassIds: number[];
}

// ============================================================================
// 初始存档 (从 ROM 角色数据创建)
// ============================================================================

/**
 * 创建初始角色数据 (搬运自 ROM 0x05E64A 角色初始表 + 0x05EDDC 职业数据表)
 * 数据来源: 硬编码的 CHAR_INIT_DATA (ROM 0x05E64A → 搬运为 TS)
 * 职业参考: CLASS_STATS (ROM 0x05EDDC → classes.ts 硬编码)
 */
export function createDefaultCharacters(): CharSaveData[] {
  const chars: CharSaveData[] = [];
  for (let i = 1; i <= CHAR_COUNT; i++) {
    const init = CHAR_INIT_DATA[i - 1];
    if (!init) continue;

    const classInfo = CLASS_STATS[init.classId];
    const hp = 10; // ROM: 初始 HP 统一 10（FUN_00010aec 初始化）

    // 初始法术: 从 MP 推断 (ROM: 职业 0x06 魔法师 = 火球 0x01)
    const spellIds: number[] = [];
    if (init.mpStart >= 8) spellIds.push(0x01); // 火球术
    if (init.mpStart >= 5) spellIds.push(0x03); // 落雷

    chars.push({
      id: i,
      classId: init.classId,
      level: 1,
      exp: 0,
      hp,
      mp: init.mpStart,
      weaponId: 0,
      armorId: 0,
      accessoryId: 0,
      spellIds,
      soldierType: 0,
      soldierCount: classInfo ? 3 : 0,
      // ROM $FFFFA61C 场景 1 配置: 艾尔文+海恩 初始加入
      joined: i <= 2,
      alive: true,
    });
  }
  return chars;
}

/**
 * 创建初始存档 (第1关开场状态)
 * 角色数据来源: ROM 0x05E64A (角色初始表) + 0x05EDDC (职业数据表)
 * 搬运为 TS: data/character.ts + data/classes.ts
 */
export function createNewGameSave(slot: number): SaveData {
  return {
    version: SAVE_VERSION,
    timestamp: Date.now(),
    slot,
    scenarioId: 1,
    turn: 1,
    gold: 200,
    totalKills: 0,
    shopMode: 0,
    characters: createDefaultCharacters(),
    inventory: [],
    unlockedScenarios: [1],
    defeatedClassIds: [],
  };
}

// ============================================================================
// 角色战斗属性 (从 ROM 数据计算, 不做硬编码)
// ============================================================================

export interface CharBattleStats {
  nameCn: string;
  nameJp: string;
  at: number;
  df: number;
  mp: number;
  mv: number;
  range: number;
  atCorrection: number;
  dfCorrection: number;
  commandRange: number;
  classId: number;
  className: string;
}

/**
 * 获取存档中某个角色的完整战斗属性
 * 合并硬编码角色数据 + CLASS_STATS (ROM 0x05EDDC) + 存档状态
 * ROM 参考: FUN_00010bbe (应用 AT/DF 修正到角色槽)
 */
export function getCharBattleStats(
  char: CharSaveData,
): CharBattleStats | null {
  const playerInfo = PLAYABLE_CHARACTERS[char.id - 1];
  if (!playerInfo) return null;

  const init = CHAR_INIT_DATA[char.id - 1];
  if (!init) return null;

  // 从 ROM 硬编码表查 AT/DF/MV 修正 (搬运 ROM 0x082A59)
  const MODIFIER_DATA: Record<number, { at: number; df: number; mv: number }> = {
    1: { at: 0,  df: 1, mv: 0 },   // 艾尔文
    2: { at: 1,  df: 0, mv: 0 },   // 海恩
    3: { at: 1,  df: 0, mv: 0 },   // 雪莉
    4: { at: 0,  df: 2, mv: 0 },   // 阿伦
    5: { at: 0,  df: 1, mv: 1 },   // 基斯
    6: { at: 0,  df: 1, mv: 0 },   // 利斯塔
    7: { at: 1,  df: 0, mv: 0 },   // 斯科特
    8: { at: 0,  df: 1, mv: 0 },   // 捷西卡
    9: { at: 0,  df: 1, mv: 0 },   // 莉亚娜
    10:{ at: 1,  df: 0, mv: 0 },   // 拉娜
  };
  const modifier = MODIFIER_DATA[char.id] || { at: 0, df: 0, mv: 0 };

  const classInfo = CLASS_STATS[char.classId];
  const stats = classInfo;

  return {
    nameCn: playerInfo.cn,
    nameJp: playerInfo.jp,
    at: (stats ? stats.at : 0) + modifier.at,
    df: (stats ? stats.df : 0) + modifier.df,
    mp: char.mp,
    mv: (stats ? stats.mv : 5) + modifier.mv,
    range: stats ? stats.r : 1,
    atCorrection: modifier.at,
    dfCorrection: modifier.df,
    commandRange: 2,
    classId: char.classId,
    className: L2_CLASSES.find(c => c.id === char.classId)?.name || '?',
  };
}

// ============================================================================
// localStorage 读写
// ============================================================================

function storageKey(slot: number): string {
  return SAVE_PREFIX + slot;
}

function isAvailable(): boolean {
  try {
    const k = '__l2_test__';
    localStorage.setItem(k, '1');
    localStorage.removeItem(k);
    return true;
  } catch { return false; }
}

export interface SaveResult {
  success: boolean;
  error?: string;
}

export function saveData(data: SaveData): SaveResult {
  if (!isAvailable()) return { success: false, error: 'localStorage 不可用' };
  try {
    data.timestamp = Date.now();
    localStorage.setItem(storageKey(data.slot), JSON.stringify(data));
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

export function loadData(slot: number): SaveData | null {
  if (!isAvailable()) return null;
  try {
    const raw = localStorage.getItem(storageKey(slot));
    if (!raw) return null;
    const data = JSON.parse(raw) as SaveData;
    if (data.version !== SAVE_VERSION) {
      console.warn(`[Save] 版本不兼容: ${data.version} (需 ${SAVE_VERSION})`);
    }
    return data;
  } catch { return null; }
}

export function deleteData(slot: number): boolean {
  try { localStorage.removeItem(storageKey(slot)); return true; }
  catch { return false; }
}

export function hasSaveData(slot: number): boolean {
  return localStorage.getItem(storageKey(slot)) !== null;
}

// ============================================================================
// 道具操作
// ============================================================================

export function addItemToInventory(save: SaveData, itemId: number): void {
  save.inventory.push(itemId);
}

export function removeItemFromInventory(save: SaveData, itemId: number): boolean {
  const idx = save.inventory.indexOf(itemId);
  if (idx === -1) return false;
  save.inventory.splice(idx, 1);
  return true;
}

export function addGold(save: SaveData, amount: number): void {
  save.gold = Math.max(0, Math.min(999999, save.gold + amount));
}

/**
 * 将角色装备同步到存档
 * 游戏RAM: 武器存 weaponId, 防具存 armorId, 饰品存 accessoryId
 */
export function setEquip(
  char: CharSaveData,
  slot: 'weapon' | 'armor' | 'accessory',
  itemId: number,
): void {
  switch (slot) {
    case 'weapon': char.weaponId = itemId; break;
    case 'armor': char.armorId = itemId; break;
    case 'accessory': char.accessoryId = itemId; break;
  }
}

/** 获取角色当前装备的某道具ID */
export function getEquip(char: CharSaveData, slot: 'weapon' | 'armor' | 'accessory'): number {
  switch (slot) {
    case 'weapon': return char.weaponId;
    case 'armor': return char.armorId;
    case 'accessory': return char.accessoryId;
  }
}

/** 检查道具是否已被某人装备 */
export function isEquippedByAny(save: SaveData, itemId: number): boolean {
  return save.characters.some(c =>
    c.weaponId === itemId || c.armorId === itemId || c.accessoryId === itemId,
  );
}

/** 卸下道具 (按人物+槽位) */
export function unequipChar(
  char: CharSaveData,
  slot: 'weapon' | 'armor' | 'accessory',
): number {
  const old = getEquip(char, slot);
  setEquip(char, slot, 0);
  return old;
}
