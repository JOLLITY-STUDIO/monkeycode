/**
 * troops.ts — Langrisser II 兵种克制矩阵解析器
 *
 * Ported from legacy md-scenario.js parseTroopMatrix
 *
 * ROM 数据源: 0x060200, 8×8 三角矩阵 (上三角), FF 分隔
 *   格式: 上三角存储 attacker→defender 优势值 (1-4)
 *   下三角自动计算: matrix[defender][attacker] = 5 - matrix[attacker][defender]
 *
 * 优势值含义:
 *   1 = 克制 (attacker 有利)
 *   2 = 微有利
 *   3 = 微不利
 *   4 = 被克 (attacker 不利)
 *
 * 兵种类型 (参照 CombatSystem.ts UnitTypes):
 *   0: 步兵 (Soldier)
 *   1: 枪兵 (Lancer)
 *   2: 骑兵 (Cavalry)
 *   3: 飞兵 (Flier)
 *   4: 弓兵 (Archer)
 *   5: 僧侣 (Monk)
 *   6: 水兵 (Aquatic)
 *   7: 魔物 (Demon)
 */

// === 地址常量 ===
export const TROOP_TYPE_TABLE = 0x060200;
export const TROOP_MATRIX_SIZE = 8; // 8 种兵种

// === 兵种类型名称 ===
export const TROOP_TYPE_NAMES: Record<number, string> = {
  0: '步兵', 1: '枪兵', 2: '骑兵', 3: '飞兵',
  4: '弓兵', 5: '僧侣', 6: '水兵', 7: '魔物',
};

// === 优势值描述 ===
export const ADVANTAGE_LABELS: Record<number, string> = {
  1: '克制',   2: '微有利', 3: '微不利', 4: '被克',
};

// === 解析兵种克制矩阵 ===
export function parseTroopMatrix(rom: Uint8Array): number[][] | null {
  const PTR = TROOP_TYPE_TABLE;
  if (PTR >= rom.length) return null;

  // 初始化 8×8 矩阵
  const matrix: number[][] = Array.from({ length: TROOP_MATRIX_SIZE }, () =>
    Array.from({ length: TROOP_MATRIX_SIZE }, () => 0),
  );

  let off = 0;
  for (let attacker = 0; attacker < TROOP_MATRIX_SIZE; attacker++) {
    for (let defender = attacker + 1; defender < TROOP_MATRIX_SIZE; defender++) {
      if (PTR + off >= rom.length) break;
      const val = rom[PTR + off];
      if (val === 0xFF) {
        off++;
        continue;
      }
      // value: 1=attacker有利, 4=attacker不利
      matrix[attacker][defender] = val;
      // 对称计算: 5 - val (1→4, 2→3, 3→2, 4→1)
      matrix[defender][attacker] = 5 - val;
      off++;
    }
    // 跳过行间分隔符 (FF FF)
    if (PTR + off < rom.length && rom[PTR + off] === 0xFF) {
      off++;
      if (PTR + off < rom.length && rom[PTR + off] === 0xFF) {
        break; // 双 FF = 终止
      }
    }
  }

  return matrix;
}

// === 获取兵种克制描述 ===
export function getAdvantageLabel(value: number): string {
  return ADVANTAGE_LABELS[value] || `(${value})`;
}

// === 获取两个兵种间的克制关系 ===
export function getTroopAdvantage(
  matrix: number[][],
  attacker: number,
  defender: number,
): { value: number; label: string; attackerFavored: boolean } {
  const value = matrix[attacker]?.[defender] ?? 0;
  return {
    value,
    label: getAdvantageLabel(value),
    attackerFavored: value <= 2,
  };
}

// === 兵种类型名 ===
export function getTroopTypeName(typeId: number): string {
  return TROOP_TYPE_NAMES[typeId] || `未知(${typeId})`;
}
