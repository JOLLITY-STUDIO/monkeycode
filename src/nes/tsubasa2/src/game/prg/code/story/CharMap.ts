/**
 * CharMap — 字符编码映射 (双 tile 表)
 * @bank 00 ($88CA 字符处理, $8A14 双 tile 表)
 *
 * 职责: ROM 字符编码 → 双 tile 图案映射, 用于文本渲染。
 *
 * 原 $88CA 字符处理子程:
 *   - 分配 PPU buffer (A=$82)
 *   - 字符码 < 0xA0: 单 tile, 直接写
 *   - 字符码 >= 0xA0: 双 tile — 第一 tile = 0x94 (或 0x95 if >=0xC8),
 *     第二 tile 查 $8A14 双 tile 表。
 *
 * 命名规范: 旧名 char-map → 新名 CharMap。
 */
import { CHAR_MAP_DOUBLE, DOUBLE_TILE_THRESHOLD, DOUBLE_TILE_BASE, DOUBLE_TILE_COUNT } from '../../data/tables/char-map-table';

export class CharMap {
  /** 双 tile 表 */
  static readonly DOUBLE: Record<number, readonly number[]> = CHAR_MAP_DOUBLE;

  /**
   * 字符解码 (原 $88CA 字符处理)
   * @returns 双 tile 图案 [tile0, tile1], 或单 tile 图案 [code]
   */
  static decode(code: number): readonly number[] {
    const c = code & 0xff;
    if (c < DOUBLE_TILE_THRESHOLD) {
      // 单 tile
      return [c];
    }
    // 双 tile: 第一 tile 0x94 或 0x95, 第二 tile 查表
    const base = c < 0xc8 ? 0x94 : 0x95;
    const second = CHAR_MAP_DOUBLE[c]?.[0] ?? 0;
    return [base, second];
  }

  /** 双 tile 基址常量 */
  static readonly DOUBLE_TILE_BASE = DOUBLE_TILE_BASE;
  static readonly DOUBLE_TILE_COUNT = DOUBLE_TILE_COUNT;
  static readonly DOUBLE_TILE_THRESHOLD = DOUBLE_TILE_THRESHOLD;
}

export function decodeChar(code: number): readonly number[] {
  return CharMap.decode(code);
}

export default CharMap;
