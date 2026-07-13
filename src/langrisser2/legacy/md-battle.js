/**
 * md-battle.js — Langrisser II 战斗系统
 * 基于 Ghidra 逆向分析 (FUN_000108c8, FUN_00010840, FUN_0000b074)
 *
 * 核心公式:
 *   baseAT = CLASS_DATA[classId * 0x1C] + unit bonuses
 *   baseDF = CLASS_DATA[classId * 0x1C] + unit bonuses
 *   damage = (AT * typeAdvantage) - (DF + terrainBonus)
 *   minDamage = 1
 *
 * 兵种克制矩阵: 0x060200 (FF分隔, 上三角8×8)
 *   ATK/DEF 类型: 歩兵=0, 騎兵=1, 槍兵=2, 飛兵=3, 水兵=4, 僧侶=5, 魔導=6, 弓兵=7
 */

const CLASS_DATA_ADDR = 0x05EDDC;
const CLASS_ENTRY_SIZE = 0x1C;
const TROOP_MATRIX_ADDR = 0x060200;

export const TROOP_TYPE_NAMES = [
  '歩兵', '騎兵', '槍兵', '飛兵',
  '水兵', '僧侶', '魔導', '弓兵'
];

/**
 * 兵种克制矩阵 (徒步兵/骑兵/枪兵/飞兵/水兵/僧侣/魔导/弓兵)
 * 代码: 01=普通 02=克制 03=强克 04=不利 05=极不利
 *
 * 来源: 从ROM 0x060200解析 + 游戏已知规则验证
 * 格式: advantage[attacker][defender] = 倍率代码
 */
export const TROOP_ADVANTAGE = [
  // 歩兵→各兵种
  [0x01, 0x01, 0x02, 0x01, 0x01, 0x01, 0x01, 0x01],
  // 騎兵→各兵种 (克歩兵)
  [0x02, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01],
  // 槍兵→各兵种 (克騎兵)
  [0x01, 0x02, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01],
  // 飛兵→各兵种 (克歩兵/水兵)
  [0x02, 0x01, 0x01, 0x01, 0x02, 0x01, 0x01, 0x01],
  // 水兵→各兵种
  [0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01],
  // 僧侶→各兵种 (克魔物)
  [0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01],
  // 魔導→各兵种
  [0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01],
  // 弓兵→各兵种 (克飛兵)
  [0x01, 0x01, 0x01, 0x02, 0x01, 0x01, 0x01, 0x01],
];

export const ADVANTAGE_MULTIPLIERS = {
  0x01: 1.00,  // 普通
  0x02: 1.25,  // 克制 (+25%)
  0x03: 1.50,  // 强克 (+50%)
  0x04: 0.75,  // 不利 (-25%)
  0x05: 0.50,  // 极不利 (-50%)
};

export const ADVANTAGE_LABELS = {
  0x01: '普通', 0x02: '克制', 0x03: '强克',
  0x04: '不利', 0x05: '极不',
};

/**
 * 从ROM职业数据表读取AT/DF基础值
 * byte[10]=defaultAT, byte[11]=defaultDF
 */
export function getClassBaseStats(romData, classId) {
  const offset = CLASS_DATA_ADDR + classId * CLASS_ENTRY_SIZE;
  return {
    at: romData[offset + 10],
    df: romData[offset + 11],
    moveType: romData[offset + 6],
  };
}

/**
 * 计算伤害
 * @param {number} attackerAT - 攻击方最终AT
 * @param {number} defenderDF - 防御方最终DF
 * @param {number} atkType - 攻击方兵种类型 (0-7)
 * @param {number} defType - 防御方兵种类型 (0-7)
 * @param {number} terrainBonus - 地形加成 (默认0)
 * @returns {{ damage: number, advantage: string, mult: number }}
 */
export function calculateDamage(attackerAT, defenderDF, atkType, defType, terrainBonus = 0) {
  const advCode = (atkType < 8 && defType < 8)
    ? TROOP_ADVANTAGE[atkType][defType]
    : 0x01;
  const mult = ADVANTAGE_MULTIPLIERS[advCode] || 1.0;
  const effectiveAT = Math.floor(attackerAT * mult);
  const effectiveDF = defenderDF + terrainBonus;
  const rawDamage = effectiveAT - effectiveDF;
  const damage = Math.max(1, rawDamage);

  return {
    damage,
    advantage: ADVANTAGE_LABELS[advCode] || '?',
    mult,
    effectiveAT,
    effectiveDF,
  };
}

/**
 * 计算士兵战伤害 (10 vs 10)
 * @param {{ at: number, df: number, hp: number, type: number }} attacker
 * @param {{ at: number, df: number, hp: number, type: number }} defender
 * @param {number} terrainBonus
 * @returns {{ attackerLoss: number, defenderLoss: number }}
 */
export function calculateSoldierBattle(attacker, defender, terrainBonus = 0) {
  const atkCount = Math.min(10, attacker.hp);
  const defCount = Math.min(10, defender.hp);

  const { damage: atkDmg } = calculateDamage(
    attacker.at, defender.df, attacker.type, defender.type, terrainBonus
  );
  const { damage: defDmg } = calculateDamage(
    defender.at, attacker.at, defender.type, attacker.type, 0
  );

  return {
    attackerLoss: Math.min(atkCount, defDmg * defCount),
    defenderLoss: Math.min(defCount, atkDmg * atkCount),
  };
}

/**
 * 获取兵种类型名称
 */
export function getTroopTypeName(typeId) {
  return TROOP_TYPE_NAMES[typeId] || `type${typeId}`;
}
