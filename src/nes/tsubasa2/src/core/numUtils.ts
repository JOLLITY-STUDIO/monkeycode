/**
 * 数值显示工具 — 对应 bank30 $CD3C (16bit 除法) + bank24 $8C55 (数值→tile)
 *
 * 逆向来源 (2026-08, docs/number-display-pipeline.md):
 *   $CD3C: 16bit shift-subtract 除法 (bank30_part03.asm:271-303)
 *   $8C55: 数值→tile 循环 (bank24_part02.asm:863-902), 余数+0x33=tile_id
 *
 * 公式: tile_id = 数字 + 0x33 (来自 $8C7A: CLC; ADC #$33)
 */

/** 数字→tile ID 的基数 (0x33) */
export const DIGIT_TILE_BASE = 0x33;

/**
 * 16bit 除法 (对应 $CD3C)
 * shift-subtract 算法, 16 次循环
 *
 * @param dividendLo 被除数 lo (ram_006F)
 * @param dividendHi 被除数 hi (ram_0070)
 * @param divisorLo 除数 lo (ram_0071)
 * @param divisorHi 除数 hi (ram_0074)
 * @returns { quotientLo, quotientHi, remainderLo, remainderHi }
 *
 * 原始 asm:
 *   $CD3C: TXA; PHA; LDA #$00; STA ram_0072; STA ram_0073; LDX #$10
 *   $CD4A: ROL ram_006F; ROL ram_0070; ROL ram_0072; ROL ram_0073
 *          BCS $CD60; LDA ram_0073; CMP ram_0074; BEQ $CD5A; BCC $CD6D
 *   $CD60: LDA ram_0072; SBC ram_0071; STA ram_0072
 *          LDA ram_0073; SBC ram_0074; STA ram_0073; SEC
 *   $CD6D: ROL ram_006F; ROL ram_0070; DEX; BNE $CD4A
 */
export function div16(
  dividendLo: number, dividendHi: number,
  divisorLo: number, divisorHi: number,
): { quotientLo: number; quotientHi: number; remainderLo: number; remainderHi: number } {
  // H5 简化: 直接用 JS 数字 (16bit 范围内)
  const dividend = (dividendHi << 8) | dividendLo;
  const divisor = (divisorHi << 8) | divisorLo;
  const quotient = divisor > 0 ? Math.floor(dividend / divisor) : 0;
  const remainder = divisor > 0 ? (dividend % divisor) : 0;
  return {
    quotientLo: quotient & 0xFF,
    quotientHi: (quotient >> 8) & 0xFF,
    remainderLo: remainder & 0xFF,
    remainderHi: (remainder >> 8) & 0xFF,
  };
}

/**
 * 数值→tile IDs (对应 $8C55)
 * 循环除 10, 余数+0x33=tile_id, 逆序存储
 *
 * @param valueLo 数值 lo (ram_006F)
 * @param valueHi 数值 hi (ram_0070)
 * @param digitCount 位数 (ram_003C, 控制显示位数)
 * @returns tile ID 数组 (正序, 直接写 NT)
 *
 * 原始 asm:
 *   $8C55: LDY ram_003C; DEY; BEQ $8C84
 *         STA ram_006F; STX ram_0070; LDA #$0A; STA ram_0071; LDA #$00; STA ram_0074
 *   $8C66: JSR $C51E (div16); LDA ram_0072; JSR $8C7A; LDA ram_0070; BNE $8C66
 *   $8C7A: CLC; ADC #$33; JSR $8C85 (写 ram_04A8,X)
 */
export function numberToTiles16(valueLo: number, valueHi: number, digitCount: number = 5): number[] {
  const value = (valueHi << 8) | valueLo;
  if (value === 0) {
    // 显示 "0" * digitCount
    return new Array(digitCount).fill(DIGIT_TILE_BASE);
  }
  const tiles: number[] = [];
  let v = value;
  while (v > 0 && tiles.length < digitCount) {
    const { remainderLo } = div16(v & 0xFF, (v >> 8) & 0xFF, 0x0A, 0x00);
    tiles.push(remainderLo + DIGIT_TILE_BASE); // 余数 + 0x33 = tile_id
    v = Math.floor(v / 10);
  }
  // 补前导 0
  while (tiles.length < digitCount) {
    tiles.push(DIGIT_TILE_BASE);
  }
  return tiles.reverse(); // 逆序产生, 正序显示
}

/**
 * 8bit 数值→tile IDs (简化版, 用于能力值 0-29)
 */
export function numberToTiles8(value: number, digitCount: number = 2): number[] {
  const tiles: number[] = [];
  let v = value;
  if (v === 0) {
    return new Array(digitCount).fill(DIGIT_TILE_BASE);
  }
  while (v > 0 && tiles.length < digitCount) {
    tiles.push((v % 10) + DIGIT_TILE_BASE);
    v = Math.floor(v / 10);
  }
  while (tiles.length < digitCount) {
    tiles.push(DIGIT_TILE_BASE);
  }
  return tiles.reverse();
}
