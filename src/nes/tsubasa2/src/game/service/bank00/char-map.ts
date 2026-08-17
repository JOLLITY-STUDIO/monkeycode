/**
 * Captain Tsubasa II — 剧情脚本字符映射表
 *
 * 基于 _tmp_bzk_out/bank_00.asm 中 $88CA 文本字符处理函数分析:
 *   - 字符 < $A0: 单 tile, 字符值直接作为 tile 索引
 *   - 字符 $A0-$D7: 双 tile, 高位 $94/$95 + 低位 tile (从 $8A14 表读取)
 *
 * 字符分类:
 *   $00:      空白
 *   $01:      特殊符号
 *   $02-$0B:  数字 0-9 (ASCII 直接映射)
 *   $0C-$1F:  片假名 (单 tile, chr-bank-00 tile $0C-$1F)
 *   $20-$3F:  符号和片假名
 *   $40-$5A:  英文大写字母 A-Z (ASCII 直接映射)
 *   $5B-$7F:  符号和片假名 (chr-bank-00 中非 ASCII)
 *   $80-$8F:  片假名浊音/半浊音 (单 tile)
 *   $90-$9F:  特殊图形 tile
 *   $A0-$D7:  双 tile 字符 (日文假名, 通过 $8A14 表映射)
 *   $D8-$DF:  等待帧指令 (非文本)
 *   $E0-$E7:  文本格式控制 (非文本)
 *   $E8-$FF:  长指令 (非文本)
 *
 * $8A14 表 (字符 $A0-$D7 → 低位 tile):
 *   高位 tile $94: 字符 $A0-$C7 (40 个)
 *   高位 tile $95: 字符 $C8-$D7 (16 个, 实际表只到 $D1)
 *
 * 注: 实际字符外观需通过 CHR tile 渲染确认, 此表为初步映射
 */

// ── 单 tile 字符 ($00-$9F) ──
// 基于 chr-bank-00 tile 渲染分析
export const CHAR_MAP_SINGLE: Record<number, string> = {
  // 空白和特殊
  0x00: ' ',       // 空白
  0x01: '·',       // 特殊符号 (箭头/标记)

  // 数字 0-9 (ASCII 直接映射)
  0x02: '0',
  0x03: '1',
  0x04: '2',
  0x05: '3',
  0x06: '4',
  0x07: '5',
  0x08: '6',
  0x09: '7',
  0x0A: '8',
  0x0B: '9',

  // 片假名 (单 tile, chr-bank-00 tile $0C-$1F)
  // 注: 具体假名需通过 CHR tile 渲染确认, 以下为推测
  0x0C: 'ア', 0x0D: 'イ', 0x0E: 'ウ', 0x0F: 'エ',
  0x10: 'オ', 0x11: 'カ', 0x12: 'キ', 0x13: 'ク',
  0x14: 'ケ', 0x15: 'コ', 0x16: 'サ', 0x17: 'シ',
  0x18: 'ス', 0x19: 'セ', 0x1A: 'ソ', 0x1B: 'タ',
  0x1C: 'チ', 0x1D: 'ツ', 0x1E: 'テ', 0x1F: 'ト',

  // ASCII 符号 ($20-$3F)
  0x20: ' ',  0x21: '!',  0x22: '"',  0x23: '#',
  0x24: '$',  0x25: '%',  0x26: '&',  0x27: "'",
  0x28: '(',  0x29: ')',  0x2A: '*',  0x2B: '+',
  0x2C: ',',  0x2D: '-',  0x2E: '.',  0x2F: '/',
  // $30-$3F: 0-9 和符号 (但 $30 可能不是 ASCII '0', 因为数字在 $02)
  // 注: $30-$3F 在 chr-bank-00 中可能是片假名或符号, 待确认

  // 英文大写字母 A-Z ($41-$5A, ASCII 直接映射)
  0x41: 'A', 0x42: 'B', 0x43: 'C', 0x44: 'D',
  0x45: 'E', 0x46: 'F', 0x47: 'G', 0x48: 'H',
  0x49: 'I', 0x4A: 'J', 0x4B: 'K', 0x4C: 'L',
  0x4D: 'M', 0x4E: 'N', 0x4F: 'O', 0x50: 'P',
  0x51: 'Q', 0x52: 'R', 0x53: 'S', 0x54: 'T',
  0x55: 'U', 0x56: 'V', 0x57: 'W', 0x58: 'X',
  0x59: 'Y', 0x5A: 'Z',

  // $5B-$7F: 在 chr-bank-00 中是片假名/符号, 非 ASCII
  // 英文小写字母可能在不同 CHR bank 中, 待确认

  // 片假名浊音/半浊音 ($80-$8F, 单 tile)
  0x81: 'ア', 0x82: 'カ', 0x83: 'サ', 0x84: 'タ',
  0x85: 'ナ', 0x86: 'ハ', 0x87: 'マ', 0x88: 'ヤ',
  0x89: 'ラ', 0x8A: 'ワ', 0x8B: 'ガ', 0x8C: 'ザ',
  0x8D: 'ダ', 0x8E: 'バ', 0x8F: 'パ',
};

// ── 双 tile 字符 ($A0-$D7) ──
// 从 $8A14 表提取 (bank_00.asm $8AB4 起, 已验证与 ROM 数据一致)
// 高位 tile $94: 字符 $A0-$C7 (40 个)
// 高位 tile $95: 字符 $C8-$D1 (10 个, 注: $D2+ 超出表范围)
// 注: 实际字符外观需通过双 tile 并排渲染 (16x8) 确认, 当前 char 字段为占位符
export const CHAR_MAP_DOUBLE: Record<number, { hiTile: number; loTile: number; char: string }> = {
  // 高位 $94 (字符 $A0-$C7, 40 个)
  0xA0: { hiTile: 0x94, loTile: 0x06, char: '?A0' },
  0xA1: { hiTile: 0x94, loTile: 0x07, char: '?A1' },
  0xA2: { hiTile: 0x94, loTile: 0x08, char: '?A2' },
  0xA3: { hiTile: 0x94, loTile: 0x09, char: '?A3' },
  0xA4: { hiTile: 0x94, loTile: 0x0A, char: '?A4' },
  0xA5: { hiTile: 0x94, loTile: 0x0B, char: '?A5' },
  0xA6: { hiTile: 0x94, loTile: 0x0C, char: '?A6' },
  0xA7: { hiTile: 0x94, loTile: 0x0D, char: '?A7' },
  0xA8: { hiTile: 0x94, loTile: 0x0E, char: '?A8' },
  0xA9: { hiTile: 0x94, loTile: 0x0F, char: '?A9' },
  0xAA: { hiTile: 0x94, loTile: 0x10, char: '?AA' },
  0xAB: { hiTile: 0x94, loTile: 0x11, char: '?AB' },
  0xAC: { hiTile: 0x94, loTile: 0x12, char: '?AC' },
  0xAD: { hiTile: 0x94, loTile: 0x13, char: '?AD' },
  0xAE: { hiTile: 0x94, loTile: 0x14, char: '?AE' },
  0xAF: { hiTile: 0x94, loTile: 0x1A, char: '?AF' },
  0xB0: { hiTile: 0x94, loTile: 0x1B, char: '?B0' },
  0xB1: { hiTile: 0x94, loTile: 0x1C, char: '?B1' },
  0xB2: { hiTile: 0x94, loTile: 0x1D, char: '?B2' },
  0xB3: { hiTile: 0x94, loTile: 0x1E, char: '?B3' },
  0xB4: { hiTile: 0x94, loTile: 0x46, char: '?B4' },
  0xB5: { hiTile: 0x94, loTile: 0x47, char: '?B5' },
  0xB6: { hiTile: 0x94, loTile: 0x48, char: '?B6' },
  0xB7: { hiTile: 0x94, loTile: 0x49, char: '?B7' },
  0xB8: { hiTile: 0x94, loTile: 0x4A, char: '?B8' },
  0xB9: { hiTile: 0x94, loTile: 0x4B, char: '?B9' },
  0xBA: { hiTile: 0x94, loTile: 0x4C, char: '?BA' },
  0xBB: { hiTile: 0x94, loTile: 0x4D, char: '?BB' },
  0xBC: { hiTile: 0x94, loTile: 0x4E, char: '?BC' },
  0xBD: { hiTile: 0x94, loTile: 0x4F, char: '?BD' },
  0xBE: { hiTile: 0x94, loTile: 0x50, char: '?BE' },
  0xBF: { hiTile: 0x94, loTile: 0x51, char: '?BF' },
  0xC0: { hiTile: 0x94, loTile: 0x52, char: '?C0' },
  0xC1: { hiTile: 0x94, loTile: 0x53, char: '?C1' },
  0xC2: { hiTile: 0x94, loTile: 0x54, char: '?C2' },
  0xC3: { hiTile: 0x94, loTile: 0x5A, char: '?C3' },
  0xC4: { hiTile: 0x94, loTile: 0x5B, char: '?C4' },
  0xC5: { hiTile: 0x94, loTile: 0x5C, char: '?C5' },
  0xC6: { hiTile: 0x94, loTile: 0x5D, char: '?C6' },
  0xC7: { hiTile: 0x94, loTile: 0x5E, char: '?C7' },

  // 高位 $95 (字符 $C8-$D1, 10 个)
  0xC8: { hiTile: 0x95, loTile: 0x1A, char: '?C8' },
  0xC9: { hiTile: 0x95, loTile: 0x1B, char: '?C9' },
  0xCA: { hiTile: 0x95, loTile: 0x1C, char: '?CA' },
  0xCB: { hiTile: 0x95, loTile: 0x1D, char: '?CB' },
  0xCC: { hiTile: 0x95, loTile: 0x1E, char: '?CC' },
  0xCD: { hiTile: 0x95, loTile: 0x5A, char: '?CD' },
  0xCE: { hiTile: 0x95, loTile: 0x5B, char: '?CE' },
  0xCF: { hiTile: 0x95, loTile: 0x5C, char: '?CF' },
  0xD0: { hiTile: 0x95, loTile: 0x5D, char: '?D0' },
  0xD1: { hiTile: 0x95, loTile: 0x5E, char: '?D1' },
};

// ── 文本格式控制 ($E0-$E7) ──
export const TEXT_CTRL_MAP: Record<number, string> = {
  0xE0: 'CTRL_E0',  // 可能是换行
  0xE1: 'CTRL_E1',  // 可能是缩进/新行
  0xE2: 'CTRL_E2',  // 可能是缩进/新行
  0xE3: 'CTRL_E3',
  0xE4: 'CTRL_E4',
  0xE5: 'CTRL_E5',
  0xE6: 'CTRL_E6',
  0xE7: 'CTRL_E7',
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
      result += entry?.char ?? `[${b.toString(16).padStart(2, '0').toUpperCase()}]`;
    } else {
      // 非文本字节 (指令)
      result += `[${b.toString(16).padStart(2, '0').toUpperCase()}]`;
    }
  }
  return result;
}
