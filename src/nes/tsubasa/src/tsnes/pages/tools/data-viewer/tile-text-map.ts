/**
 * ═══════════════════════════════════════════════
 * CHR 字体 Tile → 字符映射表
 * ═══════════════════════════════════════════════
 *
 * ⚠️ 已知问题 (2026-08-06):
 *   Bank 27 存储的球员/队伍名称是 raw tile 索引，这些索引会被直接写入 NES
 *   Name Table。真正承载字体的 CHR Bank 并非 Bank 0，而是随 MMC3 场景切换
 *   的 UI 字体 bank（Bank 6 或更细粒度的 VROM bank）。
 *
 *   当前状态:
 *   - 任何通用 NES 字体布局假设都会产成乱码，因为不同 bank 的 tile 排布不同。
 *   - 已确认 Bank 27 → Name Table 无中间转码。
 *   - 未确认具体哪个 1KB/4KB CHR page 在显示名字时被激活，因此无法可靠
 *     建立 tile → 字符映射。
 *
 *   安全策略:
 *   - 0x00 / 0xFF 视为终止符/填充。
 *   - 其余 tile 全部以 〈0xNN〉 原始 hex 形式输出，避免误导性乱码。
 *   - 当后续通过模拟器截图/CHR tile viewer 确定字体布局后，可在此补充
 *     TILE_TO_CHAR 映射，decodeTileName() 会自动使用。
 *
 * TODO:
 *   - 用模拟器/MMC3 trace 捕获名字显示场景的 CHR page 选择。
 *   - 对照 PNG `tsubasa-2asm/tsubasa-hex2asm/chr_banks/png/bank_6_8k.png`
 *     等逐 tile 校对 0x50-0xE3 区域的真实字符。
 */

/**
 * 已确认映射表（当前为空，等待 CHR 字体校对完成）。
 * 仅在 tile 存在可靠字符对应时才应加入。
 */
const TILE_TO_CHAR: Record<number, string> = {
  // 示例（占位，不可臆测）:
  // 0x7E: '゛',   // 需通过 Bank 6 tile 形状验证
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
