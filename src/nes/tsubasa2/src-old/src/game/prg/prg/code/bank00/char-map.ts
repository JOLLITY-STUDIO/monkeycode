/**
 * Captain Tsubasa II — 剧情脚本字符映射表
 *
 * 基于 _tmp_bzk_out/bank_00.asm 中 $88CA 文本字符处理函数分析:
 *   - 字符 < $A0: 单 tile, 字符值直接作为 tile 索引
 *   - 字符 $A0-$D7: 双 tile, 高位 $94/$95 + 低位 tile (从 $8A14 表读取)
 *
 * $88E1: TAY (Y=字符值); $88E2: LDA $8A14,Y → 实际读地址 = $8A14 + 字符值
 *   - 字符 $A0 读 $8AB4 (ROM 偏移 0x0AC4)
 *   - 字符 $D7 读 $8AEB
 *
 * 字符分类:
 *   $00:      空白
 *   $01:      特殊符号
 *   $02-$0B:  数字 0-9 (ASCII 直接映射)
 *   $0C-$1F:  符号和片假名
 *   $20-$3F:  ASCII 符号
 *   $40-$5A:  英文大写字母 A-Z (ASCII 直接映射)
 *   $5B-$7F:  符号和片假名 (chr-bank-00 中非 ASCII)
 *   $80-$8F:  片假名浊音/半浊音 (单 tile)
 *   $90-$9F:  特殊图形 tile
 *   $A0-$D7:  双 tile 字符 (日文假名, 通过 $8A14 表映射)
 *   $D8-$DF:  等待帧指令 (非文本)
 *   $E0-$E7:  文本格式控制 (非文本)
 *   $E8-$FF:  长指令 (非文本)
 *
 * $8A14 表 (实际):
 *   高位 tile $94 (浊点): 字符 $A0-$C7 (40 个)
 *   高位 tile $95 (半浊点): 字符 $C8-$D7 (16 个)
 *
 * G24 状态 (2026-08):
 *   - hiTile/loTile 精确值已从 $8A14 表 + ROM 0x0AC4 提取 (43 个 unique loTile)
 *   - 每个 loTile 实际对应哪个假名, 已通过 password-sprites (7x6 假名表) +
 *     chr-bank-00.ts 8x8 渲染识别. 但完整的 46 基础音 ↔ CHR tile 映射
 *     尚未完全确定 (待后续 G24.1 用 tsnes trace 校验)
 *   - char 字段全部置为 '?' (G24 占位), 避免错误文本输出
 *   - decodeScriptText 在 char 缺失时回退到 [XX] 十六进制, 不影响编译/运行
 *   - LO_TILE_HINT 提供 loTile → 假名 候选映射 (用于人工校准)
 */

// ── 单 tile 字符 ($00-$9F) ──
// 基于 chr-bank-00 tile 渲染分析 (G24 之前的部分识别, 准确度待 G24.1 校验)
export const CHAR_MAP_SINGLE: Record<number, string> = {
  // 空白和特殊
  0x00: ' ',
  0x01: '?',

  // 数字 0-9 (ASCII 直接映射, 确认)
  0x02: '0', 0x03: '1', 0x04: '2', 0x05: '3', 0x06: '4',
  0x07: '5', 0x08: '6', 0x09: '7', 0x0A: '8', 0x0B: '9',

  // ASCII 符号 ($20-$3F) - 通用映射
  0x20: ' ',  0x21: '!',  0x22: '"',  0x23: '#',
  0x24: '$',  0x25: '%',  0x26: '&',  0x27: "'",
  0x28: '(',  0x29: ')',  0x2A: '*',  0x2B: '+',
  0x2C: ',',  0x2D: '-',  0x2E: '.',  0x2F: '/',
  0x30: '0',  0x31: '1',  0x32: '2',  0x33: '3',
  0x34: '4',  0x35: '5',  0x36: '6',  0x37: '7',
  0x38: '8',  0x39: '9',
  0x3A: ':',  0x3B: ';',  0x3C: '<',  0x3D: '=',
  0x3E: '>',  0x3F: '?',

  // 英文大写字母 A-Z ($41-$5A, ASCII 直接映射, 确认)
  0x41: 'A', 0x42: 'B', 0x43: 'C', 0x44: 'D',
  0x45: 'E', 0x46: 'F', 0x47: 'G', 0x48: 'H',
  0x49: 'I', 0x4A: 'J', 0x4B: 'K', 0x4C: 'L',
  0x4D: 'M', 0x4E: 'N', 0x4F: 'O', 0x50: 'P',
  0x51: 'Q', 0x52: 'R', 0x53: 'S', 0x54: 'T',
  0x55: 'U', 0x56: 'V', 0x57: 'W', 0x58: 'X',
  0x59: 'Y', 0x5A: 'Z',

  // $0C-$1F, $5B-$7F, $80-$9F: 待 G24.1 识别
};

// ── 双 tile 字符 ($A0-$D7) ──
// hiTile 精确值 (从反汇编 $88D6-$88DA 提取):
//   - 字符 < $C8: hiTile = $94 (浊点)
//   - 字符 ≥ $C8: hiTile = $95 (半浊点)
// loTile 精确值 (从 ROM 0x0AC4 提取的 $8A14 表):
//   字符 $A0-$A5: 06 07 08 09 0A 0B
//   字符 $A6-$AA: 0C 0D 0E 0F 10
//   字符 $AB-$AE: 11 12 13 14
//   字符 $AF-$B3: 1A 1B 1C 1D 1E
//   字符 $B4-$C2: 46 47 48 49 4A 4B 4C 4D 4E 4F 50 51 52 53 54
//   字符 $C3-$C7: 5A 5B 5C 5D 5E
//   字符 $C8-$CC: 1A 1B 1C 1D 1E
//   字符 $CD-$D1: 5A 5B 5C 5D 5E
//   字符 $D2-$D7: 01 0A 14 28 3C 50
//
// char 字段: 全部置 '?' (G24 占位), 等待后续用 tsnes trace 校验
export const CHAR_MAP_DOUBLE: Record<number, { hiTile: number; loTile: number; char: string }> = {
  // 高位 $94 = 浊点 (字符 $A0-$C7, 40 个)
  0xA0: { hiTile: 0x94, loTile: 0x06, char: '?' },
  0xA1: { hiTile: 0x94, loTile: 0x07, char: '?' },
  0xA2: { hiTile: 0x94, loTile: 0x08, char: '?' },
  0xA3: { hiTile: 0x94, loTile: 0x09, char: '?' },
  0xA4: { hiTile: 0x94, loTile: 0x0A, char: '?' },
  0xA5: { hiTile: 0x94, loTile: 0x0B, char: '?' },
  0xA6: { hiTile: 0x94, loTile: 0x0C, char: '?' },
  0xA7: { hiTile: 0x94, loTile: 0x0D, char: '?' },
  0xA8: { hiTile: 0x94, loTile: 0x0E, char: '?' },
  0xA9: { hiTile: 0x94, loTile: 0x0F, char: '?' },
  0xAA: { hiTile: 0x94, loTile: 0x10, char: '?' },
  0xAB: { hiTile: 0x94, loTile: 0x11, char: '?' },
  0xAC: { hiTile: 0x94, loTile: 0x12, char: '?' },
  0xAD: { hiTile: 0x94, loTile: 0x13, char: '?' },
  0xAE: { hiTile: 0x94, loTile: 0x14, char: '?' },
  0xAF: { hiTile: 0x94, loTile: 0x1A, char: '?' },
  0xB0: { hiTile: 0x94, loTile: 0x1B, char: '?' },
  0xB1: { hiTile: 0x94, loTile: 0x1C, char: '?' },
  0xB2: { hiTile: 0x94, loTile: 0x1D, char: '?' },
  0xB3: { hiTile: 0x94, loTile: 0x1E, char: '?' },
  0xB4: { hiTile: 0x94, loTile: 0x46, char: '?' },
  0xB5: { hiTile: 0x94, loTile: 0x47, char: '?' },
  0xB6: { hiTile: 0x94, loTile: 0x48, char: '?' },
  0xB7: { hiTile: 0x94, loTile: 0x49, char: '?' },
  0xB8: { hiTile: 0x94, loTile: 0x4A, char: '?' },
  0xB9: { hiTile: 0x94, loTile: 0x4B, char: '?' },
  0xBA: { hiTile: 0x94, loTile: 0x4C, char: '?' },
  0xBB: { hiTile: 0x94, loTile: 0x4D, char: '?' },
  0xBC: { hiTile: 0x94, loTile: 0x4E, char: '?' },
  0xBD: { hiTile: 0x94, loTile: 0x4F, char: '?' },
  0xBE: { hiTile: 0x94, loTile: 0x50, char: '?' },
  0xBF: { hiTile: 0x94, loTile: 0x51, char: '?' },
  0xC0: { hiTile: 0x94, loTile: 0x52, char: '?' },
  0xC1: { hiTile: 0x94, loTile: 0x53, char: '?' },
  0xC2: { hiTile: 0x94, loTile: 0x54, char: '?' },
  0xC3: { hiTile: 0x94, loTile: 0x5A, char: '?' },
  0xC4: { hiTile: 0x94, loTile: 0x5B, char: '?' },
  0xC5: { hiTile: 0x94, loTile: 0x5C, char: '?' },
  0xC6: { hiTile: 0x94, loTile: 0x5D, char: '?' },
  0xC7: { hiTile: 0x94, loTile: 0x5E, char: '?' },

  // 高位 $95 = 半浊点 (字符 $C8-$D1, 10 个)
  0xC8: { hiTile: 0x95, loTile: 0x1A, char: '?' },
  0xC9: { hiTile: 0x95, loTile: 0x1B, char: '?' },
  0xCA: { hiTile: 0x95, loTile: 0x1C, char: '?' },
  0xCB: { hiTile: 0x95, loTile: 0x1D, char: '?' },
  0xCC: { hiTile: 0x95, loTile: 0x1E, char: '?' },
  0xCD: { hiTile: 0x95, loTile: 0x5A, char: '?' },
  0xCE: { hiTile: 0x95, loTile: 0x5B, char: '?' },
  0xCF: { hiTile: 0x95, loTile: 0x5C, char: '?' },
  0xD0: { hiTile: 0x95, loTile: 0x5D, char: '?' },
  0xD1: { hiTile: 0x95, loTile: 0x5E, char: '?' },

  // 高位 $95 = 半浊点 (字符 $D2-$D7, 6 个, 可能不是半浊音而是其他字符)
  0xD2: { hiTile: 0x95, loTile: 0x01, char: '?' },
  0xD3: { hiTile: 0x95, loTile: 0x0A, char: '?' },
  0xD4: { hiTile: 0x95, loTile: 0x14, char: '?' },
  0xD5: { hiTile: 0x95, loTile: 0x28, char: '?' },
  0xD6: { hiTile: 0x95, loTile: 0x3C, char: '?' },
  0xD7: { hiTile: 0x95, loTile: 0x50, char: '?' },
};

// ── 文本格式控制 ($E0-$E7) ──
export const TEXT_CTRL_MAP: Record<number, string> = {
  0xE0: 'CTRL_E0',
  0xE1: 'CTRL_E1',
  0xE2: 'CTRL_E2',
  0xE3: 'CTRL_E3',
  0xE4: 'CTRL_E4',
  0xE5: 'CTRL_E5',
  0xE6: 'CTRL_E6',
  0xE7: 'CTRL_E7',
};

// ── G24 辅助映射: loTile → 候选假名 (待 G24.1 用 tsnes trace 校验) ──
// 从 password-sprites (7x6 假名表) + chr-bank-00 8x8 渲染形状分析推测
// 注: 此表为 G24 阶段产物, 准确度约 60-70%, 仅作调试参考
export const LO_TILE_HINT: Record<number, string> = {
  0x01: 'ン/ソ',
  0x06: 'キ/リ',
  0x07: 'シ/リ',
  0x08: 'ツ/ミ',
  0x09: 'ト/フ',
  0x0A: 'ニ/ー',
  0x0B: 'ル',
  0x0C: 'レ',
  0x0D: 'ロ',
  0x0E: 'ワ',
  0x0F: 'ヲ',
  0x10: 'ン/特殊',
  0x11: 'ク/ヤ',
  0x12: 'コ',
  0x13: 'カ/ー',
  0x14: 'エ/セ',
  0x1A: 'チ/ス',
  0x1B: 'ツ/セ',
  0x1C: 'シ/フ',
  0x1D: 'フ/ア',
  0x1E: 'ヘ/レ',
  0x28: '長音/ー',
  0x3C: 'ン/長音',
  0x46: 'サ',
  0x47: 'ヤ',
  0x48: 'マ',
  0x49: 'ケ/マ',
  0x4A: 'フ',
  0x4B: 'コ/ー',
  0x4C: 'ム',
  0x4D: 'ウ',
  0x4E: 'ラ',
  0x4F: 'リ',
  0x50: 'ン',
  0x51: 'ル',
  0x52: 'ヨ/ヤ',
  0x53: 'ユ/ヤ',
  0x54: 'ラ/レ',
  0x5A: 'ヒ',
  0x5B: 'ハ',
  0x5C: 'へ/フ',
  0x5D: 'ホ',
  0x5E: 'ナ/ニ',
};

/**
 * 将脚本文本字节序列解码为可读字符串
 * @param bytes 字节序列 (number[])
 * @returns 解码后的字符串
 */
export function decodeScriptText(bytes: number[]): string {
  let result = '';
  for (const b of bytes) {
    if (b < 0xA0) {
      // 单 tile 字符
      result += CHAR_MAP_SINGLE[b] ?? `[${b.toString(16).padStart(2, '0').toUpperCase()}]`;
    } else if (b <= 0xD7) {
      // 双 tile 字符 (日文假名)
      const entry = CHAR_MAP_DOUBLE[b];
      if (entry && entry.char !== '?') {
        result += entry.char;
      } else {
        // 不可识别, 输出十六进制 + LO_TILE_HINT 提示
        const hint = entry ? LO_TILE_HINT[entry.loTile] : '';
        result += hint ? `[${b.toString(16).padStart(2, '0').toUpperCase()}?${hint}]` : `[${b.toString(16).padStart(2, '0').toUpperCase()}]`;
      }
    } else {
      // 非文本字节 (指令)
      result += `[${b.toString(16).padStart(2, '0').toUpperCase()}]`;
    }
  }
  return result;
}
