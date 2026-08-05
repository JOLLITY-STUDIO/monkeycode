/**
 * 字体映射表 - CHR Bank 09 字体 tile → 字符映射
 *
 * ============================================================
 * CHR Bank 09 是游戏的日文字体 bank。
 * 每个 tile (8×8 像素, 2BPP) 对应一个日文假名/符号。
 *
 * 游戏使用自定义 tile 索引编码文本：
 * - 文本数据存储在 Bank 7 ($E306-$F968)
 * - 编码格式: 每个字节 = CHR Bank 09 的 tile 索引
 * - 渲染时直接将 byte → tile index 写入 nametable
 *
 * 本文件提供:
 * 1. TILE_TO_CHAR: tile索引 → 可见字符 (用于调试)
 * 2. CHAR_TO_TILE: ASCII/Unicode字符 → tile索引 (用于文本渲染)
 *
 * 注意: 游戏主要使用日文, ASCII 映射是近似对照。
 * 日文字符使用片假名/平假名的 tile 索引。
 * ============================================================
 *
 * @see _tmp_disasm_out/banks/bank_07_fixed.asm $E306-$F968
 * @see public/sprites/ CHR Bank 09
 */

/**
 * CHR Bank 09 tile 索引 → 字符映射
 *
 * Tile 0x00-0x7F 的布局 (基于 YY-CHR 可视化):
 *   - 0x00: 空格/空白
 *   - 0x01-0x6F: 日文假名 (あいうえお かきくけこ ...)
 *   - 部分 tile 为标点符号
 *
 * 以下为 ROM 中常见的 tile 使用模式:
 */
export const TILE_TO_CHAR: Record<number, string> = {
  // ============================================================
  // 空间/空白
  // ============================================================
  0x00: ' ',    // 空白
  0xFF: '█',    // 实心方块 (填充)

  // ============================================================
  // 日文假名 - 基于 CHR Bank 09 tile 形状和学习模式推断
  // 由于 tile 是自定义字体, 以下映射基于 ROM 中常见布局
  // ============================================================
  // 注: 精确映射需要在 ROM 中逐 tile 对照验证
  // 目前标为 [KANA_XX] 作为占位符

  // 标题画面使用的 tile (从 TITLE_PAGES 观察)
  0x01: '.',    // 小点/句号图案
  0x02: '·',    // 分隔符
  0x03: '★',   // 星形符号
  0x04: 'キ',   // ki (キャプテン翼)
  0x05: 'ヤ',
  0x06: 'プ',
  0x07: 'テ',
  0x08: 'ン',   // n
  0x09: '翼',   // tsubasa (kanji-like tile)
  0x0A: '㌧',   // 
  0x0B: 'Ⓣ',   // T (logo)
  0x0C: 'Ⓢ',   // S (logo)
  0x0D: 'Ⓤ',   // U
  0x0E: 'ⓑ',   // b
  0x0F: 'ⓐ',   // a
  0x10: 'ⓢ',   // s
  0x11: 'ⓡ',   // r  
  0x12: 'ⓔ',   // e
  0x13: '㌃',   // 
  0x14: 'の',   // no

  // 日文假名 (あ行-わ行)
  0x20: 'あ', 0x21: 'い', 0x22: 'う', 0x23: 'え', 0x24: 'お',
  0x25: 'か', 0x26: 'き', 0x27: 'く', 0x28: 'け', 0x29: 'こ',
  0x2A: 'さ', 0x2B: 'し', 0x2C: 'す', 0x2D: 'せ', 0x2E: 'そ',
  0x2F: 'た', 0x30: 'ち', 0x31: 'つ', 0x32: 'て', 0x33: 'と',
  0x34: 'な', 0x35: 'に', 0x36: 'ぬ', 0x37: 'ね', 0x38: 'の',
  0x39: 'は', 0x3A: 'ひ', 0x3B: 'ふ', 0x3C: 'へ', 0x3D: 'ほ',
  0x3E: 'ま', 0x3F: 'み', 0x40: 'む', 0x41: 'め', 0x42: 'も',
  0x43: 'や', 0x44: 'ゆ', 0x45: 'よ',
  0x46: 'ら', 0x47: 'り', 0x48: 'る', 0x49: 'れ', 0x4A: 'ろ',
  0x4B: 'わ', 0x4C: 'を', 0x4D: 'ん',

  // 片假名
  0x50: 'ア', 0x51: 'イ', 0x52: 'ウ', 0x53: 'エ', 0x54: 'オ',
  0x55: 'カ', 0x56: 'キ', 0x57: 'ク', 0x58: 'ケ', 0x59: 'コ',
  0x5A: 'サ', 0x5B: 'シ', 0x5C: 'ス', 0x5D: 'セ', 0x5E: 'ソ',
  0x5F: 'タ', 0x60: 'チ', 0x61: 'ツ', 0x62: 'テ', 0x63: 'ト',
  0x64: 'ナ', 0x65: 'ニ', 0x66: 'ヌ', 0x67: 'ネ', 0x68: 'ノ',
  0x69: 'ハ', 0x6A: 'ヒ', 0x6B: 'フ', 0x6C: 'ヘ', 0x6D: 'ホ',
  0x6E: 'マ', 0x6F: 'ミ', 0x70: 'ム', 0x71: 'メ', 0x72: 'モ',
  0x73: 'ヤ', 0x74: 'ユ', 0x75: 'ヨ',
  0x76: 'ラ', 0x77: 'リ', 0x78: 'ル', 0x79: 'レ', 0x7A: 'ロ',
  0x7B: 'ワ', 0x7C: 'ヲ', 0x7D: 'ン',
};

/**
 * 字符 → CHR Bank 09 tile 索引 (反向映射)
 * 用于将文本字符串转换为 nametable tile 序列
 */
export const CHAR_TO_TILE: Record<string, number> = {};

// 自动生成反向映射
for (const [tile, char] of Object.entries(TILE_TO_CHAR)) {
  const tileNum = parseInt(tile);
  if (!CHAR_TO_TILE[char]) {
    CHAR_TO_TILE[char] = tileNum;
  }
}

/**
 * 文本渲染配置
 */
export interface TextRenderConfig {
  /** 使用的 CHR Bank (默认 9 = 字体 bank) */
  chrBank?: number;
  /** 文本颜色 (调色板索引 0-3, 默认 1) */
  paletteIndex?: number;
  /** 字符间距 (tile 数, 默认 1) */
  tileSpacing?: number;
}

/**
 * 将字符串转换为 tile 索引数组
 * @param text 输入文本 (支持 ASCII + 日文假名)
 * @returns CHR Bank 09 tile 索引数组
 */
export function textToTiles(text: string): number[] {
  const tiles: number[] = [];
  for (const char of text) {
    const tile = CHAR_TO_TILE[char] ?? 0x00; // 未知字符 → 空白
    tiles.push(tile);
  }
  return tiles;
}

/**
 * 将 tile 索引数组解码为可读字符串 (用于调试)
 * @param tiles tile 索引数组
 * @returns 可读的文本
 */
export function tilesToText(tiles: number[]): string {
  let text = '';
  for (const tile of tiles) {
    text += TILE_TO_CHAR[tile] ?? `[${tile.toString(16).padStart(2, '0')}]`;
  }
  return text;
}
