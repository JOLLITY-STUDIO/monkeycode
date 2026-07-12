/**
 * md-troops.js — Langrisser II 兵种克制矩阵解析
 * 地址: 0x060200-0x0603FF (FF分隔三角矩阵)
 * 11种兵种类型 × 11种兵种类型 非对称伤害倍率
 *
 * 伤害倍率:
 *   01 = 100% (普通)
 *   02 = 120% (克制)
 *   03 = 150% (强克制)
 *   04 = 80%  (不利)
 *   05 = 50%  (极不利)
 *   FF = 分隔符
 */

const TROOP_MATRIX_ADDR = 0x060200;
const TROOP_MATRIX_END  = 0x060400;

export const TROOP_TYPES = [
  '步兵', '骑兵', '枪兵', '飞兵', '水兵',
  '僧侣', '法师', '弓兵', '野伏', '魔物', '灵'
];

export const DAMAGE_MULT = {
  0x01: { label: '普通', mult: 1.00 },
  0x02: { label: '克制', mult: 1.20 },
  0x03: { label: '强克', mult: 1.50 },
  0x04: { label: '不利', mult: 0.80 },
  0x05: { label: '极不', mult: 0.50 },
};

/**
 * 解析兵种克制矩阵
 * 返回 11×11 二维数组: matrix[attacker][defender] = 伤害倍率
 */
export function parseTroopMatrix(romData) {
  const matrix = Array.from({ length: 11 }, () => Array(11).fill(0x01));

  let row = 0;
  for (let addr = TROOP_MATRIX_ADDR; addr < TROOP_MATRIX_END; addr++) {
    if (romData[addr] === 0xFF) {
      row++;
      continue;
    }
    if (row >= 11) break;
    if (romData[addr] === 0x00) continue;

    // Find the next 0xFF or end to determine column
    let end = addr;
    while (end < TROOP_MATRIX_END && romData[end] !== 0xFF && romData[end] !== 0x00) end++;
    const colCount = end - addr;

    // The row data length tells us which type comes first
    // First row (self-reference): col 0 = diagonal
    // Row 2 has 5 entries: cols 0-4
    // Row 3 has 1 entry: col 0

    // Fill the upper triangle (attacker < defender)
    // Since matrix is non-symmetric in some cases
    for (let c = 0; c < colCount && c < 11; c++) {
      const val = romData[addr + c];
      if (val >= 0x01 && val <= 0x05) {
        matrix[c + 1][row] = val;  // attacker=col+1, defender=row
      }
    }

    addr = end - 1; // loop increment will advance
  }

  return matrix;
}

/**
 * 获取攻击方对防御方的伤害倍率
 */
export function getDamageMultiplier(matrix, attackerType, defenderType) {
  if (attackerType < 0 || attackerType >= 11 || defenderType < 0 || defenderType >= 11) {
    return { label: '??', mult: 1.0 };
  }
  const code = matrix[attackerType][defenderType] || 0x01;
  return DAMAGE_MULT[code] || DAMAGE_MULT[0x01];
}

/**
 * 打印兵种克制矩阵
 */
export function formatTroopMatrix(matrix) {
  const lines = [];
  lines.push('攻击↓\\防御→ ' + TROOP_TYPES.map(t => t.padEnd(4)).join(' '));

  for (let a = 0; a < TROOP_TYPES.length; a++) {
    const row = [];
    for (let d = 0; d < TROOP_TYPES.length; d++) {
      const code = matrix[a][d] || 0x01;
      const label = (DAMAGE_MULT[code] || DAMAGE_MULT[0x01]).label;
      row.push(label.padEnd(4));
    }
    lines.push(TROOP_TYPES[a].padEnd(10) + ' ' + row.join(' '));
  }
  return lines.join('\n');
}
