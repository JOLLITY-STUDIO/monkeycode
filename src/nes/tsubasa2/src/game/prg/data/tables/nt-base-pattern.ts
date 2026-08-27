/**
 * PRG $9EA2 — 16-byte NT base pattern
 *
 * 已锚（2026-08-15 BANK00_ANALYSIS.md L1310）：
 *   $9EA2: $0F,$00,$00,$00, $00,$00,$00,$00, $00,$00,$00,$00, $00,$00,$00,$00
 *
 * 用途：NT cell writer (PRG $9AA2) 与 PPU base pattern (PRG $978B) 共享此数据，
 *       作为 fade bg/spr 时的 tile hi-nibble lookup 基础。
 *
 * Trace 锚点：
 *   $9AA2 cell writer: X = A; A = $9EA2,X (base pattern); STA $E6
 */
export const NT_BASE_PATTERN_TABLE: readonly number[] = [
  0x0F, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00,
];

/** lookup: index → pattern byte (mod 16 wrap) */
export function ntBasePattern(idx: number): number {
  return NT_BASE_PATTERN_TABLE[(idx & 0x0f)];
}
