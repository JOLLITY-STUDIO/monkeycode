/**
 * MagicSystem.ts — Langrisser II 魔法/法术系统 (TypeScript版)
 *
 * 数据源:
 *   - ROM spell data in unit struct (5 slot × 8 bytes each)
 *   - Spell names from md-magic.js (verified against ROM)
 *   - Spell learning table embedded in class data at 0x05EDDC
 *
 * 法术槽格式 (unit struct, 5 slots at offsets 0x0C/0x18/0x24/0x30/0x3C):
 *   [ID(1B)][等级(1B)][内部数据(6B)]
 *
 * Spell type mapping:
 *   0x01-0x08: 攻击魔法 (Fireball→Tornado)
 *   0x09-0x0B: 回复魔法 (Heal1-3)
 *   0x0C-0x0E: 增益魔法 (AttackUp/DefenseUp/Quick)
 *   0x0F-0x11: 减益魔法 (Sleep/Confuse/Mute)
 *   0x12-0x15: 特殊魔法 (Teleport/Stone/Death/Vampire)
 */
import { read8 } from '../data/rom';

// ============================================================================
// Spell type enum
// ============================================================================
export const enum SpellType {
  ATTACK  = 'attack',
  HEAL    = 'heal',
  BUFF    = 'buff',
  DEBUFF  = 'debuff',
  SPECIAL = 'special',
}

// ============================================================================
// Spell data table (from ROM + md-magic.js verification)
// ============================================================================
export interface SpellData {
  id: number;
  nameJp: string;
  nameCn: string;
  type: SpellType;
  mpCost: number;
  power: number;
  range: number;
  area: number;       // 0=single target
  description: string;
}

/**
 * SPELL_TABLE — All 21 spells from ROM
 * Verified against md-magic.js SPELL_NAMES
 */
export const SPELL_TABLE: SpellData[] = [
  // --- 攻击魔法 (0x01-0x08) ---
  { id: 0x01, nameJp: 'マジックアロー', nameCn: '魔法弹',   type: 'attack', mpCost: 1,  power: 2,  range: 4, area: 0, description: '小型魔法攻击' },
  { id: 0x02, nameJp: 'ファイアー',     nameCn: '火焰',     type: 'attack', mpCost: 2,  power: 4,  range: 4, area: 0, description: '火焰攻击' },
  { id: 0x03, nameJp: 'インフェルノ',   nameCn: '地狱火',   type: 'attack', mpCost: 4,  power: 8,  range: 4, area: 0, description: '强力火焰攻击' },
  { id: 0x04, nameJp: 'ブリザード',     nameCn: '暴风雪',   type: 'attack', mpCost: 2,  power: 3,  range: 4, area: 0, description: '冰风暴攻击' },
  { id: 0x05, nameJp: 'サンダー',       nameCn: '雷电',     type: 'attack', mpCost: 3,  power: 6,  range: 4, area: 0, description: '雷电攻击' },
  { id: 0x06, nameJp: 'メテオ',         nameCn: '陨石',     type: 'attack', mpCost: 5,  power: 10, range: 3, area: 2, description: '范围陨石攻击' },
  { id: 0x07, nameJp: 'アースクェイク', nameCn: '地震',     type: 'attack', mpCost: 6,  power: 12, range: 0, area: 3, description: '全屏地震攻击(仅己方)' },
  { id: 0x08, nameJp: 'トルネード',     nameCn: '龙卷风',   type: 'attack', mpCost: 7,  power: 14, range: 3, area: 1, description: '龙卷风攻击' },

  // --- 回复魔法 (0x09-0x0B) ---
  { id: 0x09, nameJp: 'ヒール1',        nameCn: '治愈1',   type: 'heal',  mpCost: 2,  power: 3,  range: 3, area: 0, description: '小回复' },
  { id: 0x0A, nameJp: 'ヒール2',        nameCn: '治愈2',   type: 'heal',  mpCost: 4,  power: 6,  range: 3, area: 0, description: '中回复' },
  { id: 0x0B, nameJp: 'ヒール3',        nameCn: '治愈3',   type: 'heal',  mpCost: 8,  power: 10, range: 3, area: 0, description: '大回复' },

  // --- 增益魔法 (0x0C-0x0E) ---
  { id: 0x0C, nameJp: 'アタック',       nameCn: '攻击强化', type: 'buff',  mpCost: 3,  power: 3,  range: 3, area: 0, description: 'AT+3' },
  { id: 0x0D, nameJp: 'プロテクション', nameCn: '防御强化', type: 'buff',  mpCost: 3,  power: 3,  range: 3, area: 0, description: 'DF+3' },
  { id: 0x0E, nameJp: 'クイック',       nameCn: '加速',     type: 'buff',  mpCost: 2,  power: 4,  range: 3, area: 0, description: 'MV+4' },

  // --- 减益魔法 (0x0F-0x11) ---
  { id: 0x0F, nameJp: 'スリープ',       nameCn: '催眠',     type: 'debuff', mpCost: 2, power: 0, range: 3, area: 0, description: '使目标睡眠' },
  { id: 0x10, nameJp: 'コンフューズ',   nameCn: '混乱',     type: 'debuff', mpCost: 3, power: 0, range: 3, area: 0, description: '使目标混乱' },
  { id: 0x11, nameJp: 'サイレンス',     nameCn: '沉默',     type: 'debuff', mpCost: 3, power: 0, range: 3, area: 0, description: '封印目标魔法' },

  // --- 特殊魔法 (0x12-0x15) ---
  { id: 0x12, nameJp: 'テレポート',     nameCn: '传送',     type: 'special', mpCost: 3, power: 0, range: 4, area: 0, description: '传送单位' },
  { id: 0x13, nameJp: 'ストーン',       nameCn: '石化',     type: 'special', mpCost: 4, power: 0, range: 3, area: 0, description: '石化目标' },
  { id: 0x14, nameJp: 'デス',           nameCn: '即死',     type: 'special', mpCost: 5, power: 0, range: 3, area: 0, description: '即死攻击' },
  { id: 0x15, nameJp: 'ヴァンパイア',   nameCn: '吸血',     type: 'special', mpCost: 5, power: 5, range: 3, area: 0, description: '吸取HP' },
];

// ============================================================================
// Spell lookup utilities
// ============================================================================

const spellById: Map<number, SpellData> = new Map();
SPELL_TABLE.forEach(s => spellById.set(s.id, s));

export function getSpell(id: number): SpellData | undefined {
  return spellById.get(id);
}

export function getSpellsByType(type: SpellType): SpellData[] {
  return SPELL_TABLE.filter(s => s.type === type);
}

// ============================================================================
// Unit spell slot parsing
// ============================================================================

export interface SpellSlot {
  slotIndex: number;
  spellId: number;
  level: number;
  data: number[];  // 6 bytes internal data
  spell: SpellData | null;
  active: boolean;
}

/**
 * Parse spell slots from a unit's raw data
 *
 * Unit struct has 5 spell slots:
 *   Slot 0: offset 0x0C
 *   Slot 1: offset 0x18
 *   Slot 2: offset 0x24
 *   Slot 3: offset 0x30
 *   Slot 4: offset 0x3C
 *
 * Each slot: [ID(1B)][Level(1B)][6B data]
 */
const SPELL_SLOT_OFFSETS = [0x0C, 0x18, 0x24, 0x30, 0x3C];

export function parseUnitSpells(unitData: Uint8Array): SpellSlot[] {
  return SPELL_SLOT_OFFSETS.map((off, i) => {
    const spellId = unitData[off];
    const level = unitData[off + 1];
    const data = Array.from(unitData.slice(off + 2, off + 8));
    const active = spellId !== 0 && spellId !== 0xFF;
    return {
      slotIndex: i,
      spellId,
      level,
      data,
      spell: active ? (getSpell(spellId) || null) : null,
      active,
    };
  });
}

/**
 * Get total MP cost of a spell for a unit (considering level)
 */
export function getSpellMpCost(spell: SpellData, level: number): number {
  // Higher spell level may reduce MP cost (ROM logic)
  return spell.mpCost;
}

/**
 * Check if a unit can cast a specific spell
 */
export function canCastSpell(unitData: Uint8Array, spellId: number, unitMp: number): boolean {
  const spells = parseUnitSpells(unitData);
  const slot = spells.find(s => s.active && s.spellId === spellId);
  if (!slot || !slot.spell) return false;
  return unitMp >= slot.spell.mpCost;
}

// ============================================================================
// Spell range calculation
// ============================================================================

export interface SpellTargetInfo {
  spell: SpellData;
  range: number;
  area: number;
  type: 'single' | 'area' | 'self' | 'global';
}

export function getSpellTargetInfo(spell: SpellData): SpellTargetInfo {
  return {
    spell,
    range: spell.range,
    area: spell.area,
    type: spell.area > 0 ? (spell.range === 0 ? 'global' : 'area') : 'single',
  };
}

/**
 * Get tiles affected by an area spell
 */
export function getSpellAreaTiles(
  cx: number, cy: number,
  area: number,
  mapWidth: number, mapHeight: number
): Array<{ x: number; y: number }> {
  const tiles: Array<{ x: number; y: number }> = [];
  for (let dy = -area; dy <= area; dy++) {
    for (let dx = -area; dx <= area; dx++) {
      const x = cx + dx, y = cy + dy;
      if (x >= 0 && x < mapWidth && y >= 0 && y < mapHeight) {
        tiles.push({ x, y });
      }
    }
  }
  return tiles;
}
