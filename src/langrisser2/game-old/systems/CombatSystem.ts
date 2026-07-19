/**
 * CombatSystem.ts — Langrisser II 战斗/伤害计算系统 (TypeScript版)
 *
 * 数据源: ROM 战斗逻辑 + 佣兵相克表
 *
 * 核心公式 (从 ROM 逻辑推导):
 *   Damage = AT - DF (基础差值)
 *   AT = baseAT + weaponBonus + soldierCount*10 - terrainPenalty
 *   DF = baseDF + armorBonus + terrainBonus + supportBonus
 *
 * 兵种相克 (来自粉丝文档验证, ROM 内嵌于战斗函数):
 *   步兵 vs 枪兵:  步兵 AT+5, DF+3
 *   骑兵 vs 步兵:  骑兵 AT+3, DF+2
 *   枪兵 vs 骑兵:  枪兵 AT+8, DF+4
 *   弓兵 vs 飞兵:  弓兵 AT+6
 *   飞兵 vs 弓兵:  飞兵 AT+2
 *   僧侣 vs 不死:  僧侣 AT+10
 *
 * 地形加成:
 *   森林: DF+20%
 *   山:   DF+30%
 *   城堡: DF+30%
 *   墙:   DF+20%
 */
import { read8 } from '../data/rom';

// ============================================================================
// Unit type enums (for combat calculation)
// ============================================================================
export const enum CombatUnitType {
  SOLDIER   = 0, // 步兵
  CAVALRY   = 1, // 骑兵
  LANCER    = 2, // 枪兵
  ARCHER    = 3, // 弓兵
  FLYING    = 4, // 飞兵
  MAGE      = 5, // 法师/僧侣
  AQUATIC   = 6, // 水兵
  MONSTER   = 7, // 不死/怪物
}

export const COMBAT_TYPE_NAMES: Record<number, string> = {
  0: '步兵', 1: '骑兵', 2: '枪兵',
  3: '弓兵', 4: '飞兵', 5: '法师',
  6: '水兵', 7: '怪物/不死',
};

// ============================================================================
// Terrain defense modifiers (ROM data, percentage)
// ============================================================================
export const TERRAIN_DEFENSE: Record<string, number> = {
  'plain':    0,   // 平原 - no bonus
  'forest':   20,  // 森林 - DF+20%
  'mountain': 30,  // 山 - DF+30%
  'water':    0,   // 水
  'deepWater':0,   // 深水
  'desert':   0,   // 沙漠
  'swamp':    0,   // 沼泽
  'castle':   30,  // 城堡 - DF+30%
  'wall':     20,  // 墙 - DF+20%
  'bridge':   0,   // 桥
  'church':   20,  // 教堂 - DF+20%
  'ruins':    10,  // 废墟 - DF+10%
};

// ============================================================================
// Unit type advantages (AT bonus, DF bonus)
// ============================================================================
// Key: attackerType → defenderType → [AT_bonus, DF_bonus]
const UNIT_ADVANTAGES: Record<number, Record<number, [number, number]>> = {
  [CombatUnitType.SOLDIER]: {
    [CombatUnitType.LANCER]:  [5, 3],   // 步兵克枪兵
    [CombatUnitType.ARCHER]:  [3, 0],   // 步兵对弓兵稍优
    [CombatUnitType.MAGE]:    [3, 2],   // 步兵对魔法
  },
  [CombatUnitType.CAVALRY]: {
    [CombatUnitType.SOLDIER]: [3, 2],   // 骑克步
    [CombatUnitType.ARCHER]:  [4, 2],   // 骑对弓
    [CombatUnitType.MAGE]:    [3, 1],   // 骑对魔法
  },
  [CombatUnitType.LANCER]: {
    [CombatUnitType.CAVALRY]: [8, 4],   // 枪克骑
  },
  [CombatUnitType.ARCHER]: {
    [CombatUnitType.FLYING]:  [6, 0],   // 弓克飞 (AT+6!)
    [CombatUnitType.MAGE]:    [2, 1],
  },
  [CombatUnitType.FLYING]: {
    [CombatUnitType.ARCHER]:  [2, 0],   // 飞对弓微弱
    [CombatUnitType.SOLDIER]: [3, 1],
    [CombatUnitType.CAVALRY]: [2, 0],
  },
  [CombatUnitType.MAGE]: {
    [CombatUnitType.MONSTER]: [10, 0],  // 僧侣/法师克不死
  },
  [CombatUnitType.AQUATIC]: {
    [CombatUnitType.CAVALRY]: [3, 2],
    [CombatUnitType.SOLDIER]: [2, 1],
  },
  [CombatUnitType.MONSTER]: {
    [CombatUnitType.SOLDIER]: [2, 1],
    [CombatUnitType.MAGE]:    [-5, -3],  // 不死被法师克
  },
};

// ============================================================================
// Combat data structures
// ============================================================================
export interface CombatStats {
  baseAT: number;
  baseDF: number;
  maxHP: number;
  currentHP: number;
  unitType: CombatUnitType;
  soldiers: number;     // remaining soldier count
  terrainDefBonus: number; // percentage 0-30
  weaponAT: number;
  armorDF: number;
  atCorrection: number; // A+ bonus
  dfCorrection: number; // D+ bonus
}

export interface CombatResult {
  attackerDamage: number;
  defenderDamage: number;
  attackerSoldierLoss: number;
  defenderSoldierLoss: number;
  attackerHPAfter: number;
  defenderHPAfter: number;
  winner: 'attacker' | 'defender' | 'draw';
  messages: string[];
}

// ============================================================================
// Combat calculation
// ============================================================================

/**
 * Get unit type advantage bonuses
 */
export function getAdvantage(
  attackerType: CombatUnitType,
  defenderType: CombatUnitType,
): { atBonus: number; dfBonus: number } {
  const vs = UNIT_ADVANTAGES[attackerType];
  if (vs && vs[defenderType]) {
    return { atBonus: vs[defenderType][0], dfBonus: vs[defenderType][1] };
  }
  return { atBonus: 0, dfBonus: 0 };
}

/**
 * Calculate effective AT with all modifiers
 */
export function calcEffectiveAT(stats: CombatStats): number {
  let at = stats.baseAT + stats.weaponAT + stats.atCorrection;
  // +10 AT per soldier
  at += stats.soldiers * 10;
  return at;
}

/**
 * Calculate effective DF with terrain and other bonuses
 */
export function calcEffectiveDF(stats: CombatStats): number {
  let df = stats.baseDF + stats.armorDF + stats.dfCorrection;
  // Terrain defense bonus (percentage)
  df += Math.floor(df * stats.terrainDefBonus / 100);
  return df;
}

/**
 * Calculate a single round of combat
 *
 * ROM logic (simplified):
 * 1. Calculate ATK side effective AT (AT + weapons + soldier bonus + advantage)
 * 2. Calculate DEF side effective DF (DF + armor + terrain + advantage DF bonus)
 * 3. Damage = max(0, ATK_AT - DEF_DF)
 * 4. Each 10 HP lost = 1 soldier killed
 */
export function calcCombatRound(
  attacker: CombatStats,
  defender: CombatStats,
  attackerAdvantage: { atBonus: number; dfBonus: number },
): { damage: number; soldierLoss: number } {
  const atkAT = calcEffectiveAT(attacker) + attackerAdvantage.atBonus;
  const defDF = calcEffectiveDF(defender) + attackerAdvantage.dfBonus;

  const damage = Math.max(1, atkAT - defDF);
  const soldierLoss = Math.min(attacker.soldiers, Math.floor(damage / 10));

  return { damage, soldierLoss };
}

/**
 * Calculate full combat exchange (both sides attack)
 */
export function calcCombat(
  attacker: CombatStats,
  defender: CombatStats,
  isCounterAttack: boolean = false,
): CombatResult {
  const msgs: string[] = [];

  // Get type advantages
  const atkAdvantage = getAdvantage(attacker.unitType, defender.unitType);
  const defAdvantage = getAdvantage(defender.unitType, attacker.unitType);

  // Attacker's attack on defender
  const atkRound = calcCombatRound(attacker, defender, atkAdvantage);

  // Defender counter-attack (if not a ranged attack and defender can counter)
  let defRound = { damage: 0, soldierLoss: 0 };
  if (!isCounterAttack) {
    defRound = calcCombatRound(defender, attacker, defAdvantage);
  }

  // Apply damages
  const atkHPAfter = Math.max(0, attacker.currentHP - defRound.damage);
  const defHPAfter = Math.max(0, defender.currentHP - atkRound.damage);

  // Determine winner
  let winner: 'attacker' | 'defender' | 'draw' = 'draw';
  if (defHPAfter <= 0 && atkHPAfter > 0) winner = 'attacker';
  else if (atkHPAfter <= 0 && defHPAfter > 0) winner = 'defender';

  if (atkAdvantage.atBonus !== 0) {
    const atkName = COMBAT_TYPE_NAMES[attacker.unitType] || '?';
    const defName = COMBAT_TYPE_NAMES[defender.unitType] || '?';
    msgs.push(`${atkName} 对 ${defName} — AT+${atkAdvantage.atBonus}, DF+${atkAdvantage.dfBonus}`);
  }
  if (defAdvantage.atBonus !== 0) {
    const defName = COMBAT_TYPE_NAMES[defender.unitType] || '?';
    const atkName = COMBAT_TYPE_NAMES[attacker.unitType] || '?';
    msgs.push(`${defName} 对 ${atkName} — AT+${defAdvantage.atBonus}, DF+${defAdvantage.dfBonus}`);
  }
  if (defender.terrainDefBonus > 0) {
    msgs.push(`防御方地形加成 DF+${defender.terrainDefBonus}%`);
  }
  msgs.push(`攻击造成 ${atkRound.damage} 伤害, 损失 ${atkRound.soldierLoss} 兵`);
  if (defRound.damage > 0) {
    msgs.push(`反击造成 ${defRound.damage} 伤害, 损失 ${defRound.soldierLoss} 兵`);
  }

  return {
    attackerDamage: defRound.damage,
    defenderDamage: atkRound.damage,
    attackerSoldierLoss: defRound.soldierLoss,
    defenderSoldierLoss: atkRound.soldierLoss,
    attackerHPAfter: atkHPAfter,
    defenderHPAfter: defHPAfter,
    winner,
    messages: msgs,
  };
}

// ============================================================================
// Movement / terrain cost calculation
// ============================================================================

/**
 * Get movement cost for a tile type
 *
 * ROM terrain cost (0-15 scale):
 *   0=flying/ignored, F=impassable
 */
export const TERRAIN_MOVE_COST: Record<string, number> = {
  'plain':    1,
  'forest':   2,
  'mountain': 3,
  'water':    2,
  'deepWater':3,
  'desert':   2,
  'swamp':    3,
  'castle':   1,
  'wall':     15,  // impassable normally
  'bridge':   1,
  'church':   1,
  'ruins':    2,
};

/**
 * Get terrain defense bonus
 */
export function getTerrainDefBonus(terrainType: string): number {
  return TERRAIN_DEFENSE[terrainType] || 0;
}

/**
 * Get terrain movement cost
 */
export function getTerrainMoveCost(terrainType: string): number {
  return TERRAIN_MOVE_COST[terrainType] || 1;
}
