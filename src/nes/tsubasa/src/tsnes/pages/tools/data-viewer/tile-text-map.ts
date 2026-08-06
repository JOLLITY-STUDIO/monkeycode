/**
 * ═══════════════════════════════════════════════
 * CHR 字体 Tile → 字符映射表
 * ═══════════════════════════════════════════════
 *
 * ✅ 字体位置已确认 (2026-08-06):
 *   CHR Bank 0 是真正的字体字库（日文假名/英文字母/符号），已通过
 *   BMP 渲染验证（chr_bank_00_16col.bmp 顶部清晰可见假名和英文字母）。
 *   之前的「Bank 6 是字体」判断是错误的 — Bank 6 实际上是精灵/动画 tile。
 *
 * ✅ 项目内已全部 import 各 CHR Bank 数据，不依赖 MMC3 bank switch。
 *   当 Bank 27(PRG) 中存储的球员/队伍名称 tile 索引被直接写入 Name Table 时，
 *   PPU 指向的图案表页对应 Bank 0 的字体 tile。
 *
 *   Bank 27 → Name Table 无中间转码（tile 索引直接使用）。
 *
 *   当前状态:
 *   - 字体位置已确认：CHR Bank 0（512 tiles，包含假名/英文/符号）
 *   - 可直接对照 chr_bank_00_16col.bmp 逐 tile 建立 TILE_TO_CHAR 映射
 *
 * TODO:
 *   - 对照 chr_bank_00_16col.bmp 逐 tile 校对 0x50-0xE3 区域的真实字符
 *   - 补充 TILE_TO_CHAR 映射表
 */

/**
 * 已确认映射表（当前为空，等待 CHR 字体校对完成）。
 * 仅在 tile 存在可靠字符对应时才应加入。
 */
const TILE_TO_CHAR: Record<number, string> = {
  // 示例（占位，不可臆测）:
  // 0x7E: '゛',   // 需通过 CHR Bank 0 BMP 形状验证
};

/**
 * 名称 tile 通常出现的范围。
 * 此范围内任何 tile 都优先显示为 raw hex，直到建立可信映射。
 */
const FONT_TILE_RANGE = { min: 0x50, max: 0xE3 };

/** 把一段 tile 序列解码为可读字符串；未知/未校对 tile 保留 〈0xNN〉 */
export function decodeTileName(tiles: number[]): string {
  return tiles.map(t => {
    if (t === 0x00 || t === 0xFF) return '';
    const mapped = TILE_TO_CHAR[t];
    if (mapped) return mapped;
    if (t >= FONT_TILE_RANGE.min && t <= FONT_TILE_RANGE.max) {
      return `〈0x${t.toString(16).toUpperCase().padStart(2, '0')}〉`;
    }
    return `〈0x${t.toString(16).toUpperCase().padStart(2, '0')}〉`;
  }).join('');
}

/** 返回原始 hex（空格分隔） */
export function tilesToHex(tiles: number[]): string {
  return tiles.map(t => t.toString(16).toUpperCase().padStart(2, '0')).join(' ');
}

/** 返回原始 hex 数组，便于进一步处理 */
export function tilesToHexArray(tiles: number[]): string[] {
  return tiles.map(t => `0x${t.toString(16).toUpperCase().padStart(2, '0')}`);
}
