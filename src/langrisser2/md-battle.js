/**
 * Langrisser II 战斗伤害公式 (JS 实现)
 * 基于 FUN_00020518 (行 18417) + FUN_000204d0 (行 18379)
 */

/**
 * 比例查表函数 (FUN_000204d0 等效)
 * 
 * 输入: 士兵差值比例 = (士兵差 * 100) / (防御方HP - 攻击方剩余HP)
 * 输出: 0~90 的比例索引 (用于后续伤害计算)
 *
 * 表地址: ROM 0x96F02, 90 项阈值数组
 */
export function calcProportionIndex(attackerRemaining, defenderHP, soldierDiff, thresholdTable) {
  if (defenderHP <= attackerRemaining) return 0;
  const ratio = Math.floor((soldierDiff * 100) / (defenderHP - attackerRemaining));
  for (let i = 0; i < thresholdTable.length; i++) {
    if (ratio < thresholdTable[i]) return i;
  }
  return thresholdTable.length - 1;
}

/**
 * 主伤害计算 (FUN_00020518 等效)
 *
 * @param {number} attackerAT   - 攻击方 AT (基础 + 兵种奖励)
 * @param {number} attackerHP   - 攻击方剩余 HP
 * @param {number} attackerSoldiers - 攻击方存活士兵数
 * @param {number} defenderHP   - 防御方 HP
 * @param {number} defenderSoldiers - 防御方存活士兵数
 * @param {number} propIndex    - 比例索引 (来自 calcProportionIndex)
 * @param {Object} tables       - { soldierTable, terrainTable }
 * @returns {number} 最终伤害值
 */
export function calcDamage(attackerAT, attackerHP, attackerSoldiers, defenderHP, defenderSoldiers, propIndex, tables) {
  const soldierTable = tables.soldier || new Array(0x48).fill(0);
  const terrainTable = tables.terrain || new Array(0x48).fill(0);

  // 伤害 = ((AT - 比例值) * 士兵表[索引] + 士兵差 * 地形表[索引]) / 100
  const result = soldierTable[0x47 - propIndex] || 0;
  const terrainMod = terrainTable[propIndex] || 0;
  const soldierDiff = attackerSoldiers - defenderSoldiers;

  const damage = Math.floor(
    ((attackerAT - result) * soldierTable[0x47 - propIndex] + soldierDiff * terrainMod) / 100
  );

  return Math.max(0, damage);
}

/**
 * 完整战斗模拟
 *
 * @param {Object} attacker - { at, hp, soldiers, classId }
 * @param {Object} defender - { hp, df, soldiers, classId, terrain }
 * @param {Object} gameData - ROM 解析的游戏数据
 * @returns {Object} { attackerDamage, defenderDamage, attackerRemaining, defenderRemaining }
 */
export function simulateBattle(attacker, defender, gameData) {
  // 攻方对守方的伤害
  const attackerToDefender = calcDamage(
    attacker.at,
    attacker.hp,
    attacker.soldiers,
    defender.hp,
    defender.soldiers,
    50, // 中间比例索引
    { soldier: gameData.soldierTable || [], terrain: gameData.terrainTable || [] }
  );

  // 守方对攻方的反击伤害 (简化: 守方 DF 替代 AT 计算)
  const defenderToAttacker = attacker.soldiers > 0 ? calcDamage(
    defender.hp, // 简化用 HP 作为防守方"攻击力"
    defender.hp,
    defender.soldiers,
    attacker.hp,
    attacker.soldiers,
    50,
    { soldier: gameData.soldierTable || [], terrain: gameData.terrainTable || [] }
  ) : 0;

  return {
    attackerDamage: attackerToDefender,
    defenderDamage: defenderToAttacker,
    attackerRemaining: Math.max(0, attacker.soldiers - defenderToAttacker),
    defenderRemaining: Math.max(0, defender.soldiers - attackerToDefender),
  };
}

/**
 * 战斗公式文档
 */
export const BATTLE_FORMULA_DOC = `Langrisser II 伤害计算公式

源码: FUN_00020518 (ROM 0x20518) + FUN_000204d0 (ROM 0x204D0)

步骤:
1. 计算比例 = (士兵差 * 100) / (防御方HP - 攻击方剩余HP)
2. 查阈值表 (ROM 0x96F02, 90项) 得到比例索引 [0,90]
3. 查士兵表 (索引 0x47 - 比例索引) 得到士兵系数
4. 查地形表 (比例索引) 得到地形系数
5. 伤害 = ((攻击AT - 比例值) * 士兵系数 + 士兵差 * 地形系数) / 100

战斗动画序列:
- FUN_0002490c: 战斗动画状态机
- FUN_00024f30: 每帧动画更新
- PTR_LAB_000248ec: 战斗子程序跳转表
- PTR_LAB_00024f08: 战斗特效跳转表
- PTR_LAB_00024ce8: 战斗结果处理跳转表

关键变量:
- _DAT_ffffbe48 = 单位网格X坐标
- _DAT_ffffbe4a = 单位网格Y坐标  
- _DAT_ffffbe44 = 每帧随机偏移
- VRAM地址 = ((Y + offset) * 0x40 + X + random) * 2 - 0x4000
`;
