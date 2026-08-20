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
 *
 * TODO(双 tile 假名映射待完成):
 *   CHAR_MAP_DOUBLE 的 hiTile/loTile 已从 $8A14 表提取 (与 ROM 一致),
 *   但 char 字段仍是占位符 (?A0..?D1)。完整假名需通过 chr-bank-00/01
 *   的双 tile (16x8) 并排渲染识别确认; 后续可用已知日语台词反推校准。
 *   不影响编译与主流程 (script-data-loader 仍可用占位符文本)。
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
// 双 tile = 上下拼接: hiTile(上,浊点$94/半浊点$95) + loTile(下,基础假名)
// loTile 是 chr-bank-00 的物理 tile 索引, 对应基础假名如下:
//   $0C=ア $0D=イ $0E=ウ $0F=エ $10=オ $11=カ $12=キ $13=ク $14=ケ $15=コ
//   $16=サ $17=シ $18=ス $19=セ $1A=ソ $1B=タ $1C=チ $1D=ツ $1E=テ $1F=ト
//   $46-$5E 对应其他假名/符号 (部分待确认)
// 浊点($94)+基础假名 = 浊音; 半浊点($95)+は行 = 半浊音
export const CHAR_MAP_DOUBLE: Record<number, { hiTile: number; loTile: number; char: string }> = {
  // 高位 $94 = 浊点 (字符 $A0-$C7, 40 个)
  // loTile $06-$0B: chr-bank-00 tile $06-$0B 图案待精确识别, 暂标 TODO
  0xA0: { hiTile: 0x94, loTile: 0x06, char: '゛' }, // TODO loTile$06 渲染像ネ, 浊音待确认
  0xA1: { hiTile: 0x94, loTile: 0x07, char: '゛' }, // TODO loTile$07 渲染像フ/ホ
  0xA2: { hiTile: 0x94, loTile: 0x08, char: '゛' }, // TODO loTile$08 渲染像ノ(斜线)
  0xA3: { hiTile: 0x94, loTile: 0x09, char: '゛' }, // TODO loTile$09 渲染像ン
  0xA4: { hiTile: 0x94, loTile: 0x0A, char: '゛' }, // TODO loTile$0A 渲染像ー/ロ
  0xA5: { hiTile: 0x94, loTile: 0x0B, char: '゛' }, // TODO loTile$0B 渲染像ム
  // loTile $0C-$1E = ア-テ (char-map $0C-$1E), +浊点 = 浊音
  0xA6: { hiTile: 0x94, loTile: 0x0C, char: 'ガ' }, // ア+浊
  0xA7: { hiTile: 0x94, loTile: 0x0D, char: 'ギ' }, // イ+浊 (注: イ无浊音, 可能 loTile$0D≠イ)
  0xA8: { hiTile: 0x94, loTile: 0x0E, char: 'グ' }, // ウ+浊
  0xA9: { hiTile: 0x94, loTile: 0x0F, char: 'ゲ' }, // エ+浊 (注: エ无浊音, 待确认)
  0xAA: { hiTile: 0x94, loTile: 0x10, char: 'ゴ' }, // オ+浊
  0xAB: { hiTile: 0x94, loTile: 0x11, char: 'ガ' }, // カ+浊 → ガ
  0xAC: { hiTile: 0x94, loTile: 0x12, char: 'ギ' }, // キ+浊 → ギ
  0xAD: { hiTile: 0x94, loTile: 0x13, char: 'グ' }, // ク+浊 → グ
  0xAE: { hiTile: 0x94, loTile: 0x14, char: 'ゲ' }, // ケ+浊 → ゲ
  0xAF: { hiTile: 0x94, loTile: 0x1A, char: 'ザ' }, // サ+浊(loTile$1A=ソ?) → ザ/ザ
  0xB0: { hiTile: 0x94, loTile: 0x1B, char: 'ジ' }, // タ+浊(loTile$1B=タ?) → ダ/ジ
  0xB1: { hiTile: 0x94, loTile: 0x1C, char: 'ヂ' }, // チ+浊 → ヂ
  0xB2: { hiTile: 0x94, loTile: 0x1D, char: 'ヅ' }, // ツ+浊 → ヅ
  0xB3: { hiTile: 0x94, loTile: 0x1E, char: 'デ' }, // テ+浊 → デ
  // loTile $46-$5E: chr-bank-00 tile $46-$5E 对应英文区/符号区, 作为双 tile 下半可能是其他假名
  // 渲染待精确识别, 暂按常见浊音填候选并标 TODO
  0xB4: { hiTile: 0x94, loTile: 0x46, char: '゛' }, // TODO loTile$46 渲染像ナ
  0xB5: { hiTile: 0x94, loTile: 0x47, char: '゛' }, // TODO loTile$47 渲染像マ
  0xB6: { hiTile: 0x94, loTile: 0x48, char: '゛' }, // TODO loTile$48 渲染像ヤ
  0xB7: { hiTile: 0x94, loTile: 0x49, char: '゛' }, // TODO loTile$49 渲染像ラ
  0xB8: { hiTile: 0x94, loTile: 0x4A, char: '゛' }, // TODO loTile$4A 渲染像7?/ヲ
  0xB9: { hiTile: 0x94, loTile: 0x4B, char: '゛' }, // TODO loTile$4B 渲染像ケ
  0xBA: { hiTile: 0x94, loTile: 0x4C, char: '゛' }, // TODO loTile$4C 渲染像3?/レ
  0xBB: { hiTile: 0x94, loTile: 0x4D, char: '゛' }, // TODO loTile$4D 渲染像M
  0xBC: { hiTile: 0x94, loTile: 0x4E, char: '゛' }, // TODO loTile$4E 渲染像N
  0xBD: { hiTile: 0x94, loTile: 0x4F, char: '゛' }, // TODO loTile$4F 渲染像O
  0xBE: { hiTile: 0x94, loTile: 0x50, char: '゛' }, // TODO loTile$50 渲染像P
  0xBF: { hiTile: 0x94, loTile: 0x51, char: '゛' }, // TODO loTile$51 渲染像Q
  0xC0: { hiTile: 0x94, loTile: 0x52, char: '゛' }, // TODO loTile$52 渲染像R
  0xC1: { hiTile: 0x94, loTile: 0x53, char: '゛' }, // TODO loTile$53 渲染像S
  0xC2: { hiTile: 0x94, loTile: 0x54, char: '゛' }, // TODO loTile$54 渲染像T
  0xC3: { hiTile: 0x94, loTile: 0x5A, char: '゛' }, // TODO loTile$5A 渲染像Z
  0xC4: { hiTile: 0x94, loTile: 0x5B, char: '゛' }, // TODO loTile$5B 渲染像[
  0xC5: { hiTile: 0x94, loTile: 0x5C, char: '゛' }, // TODO loTile$5C 渲染像\
  0xC6: { hiTile: 0x94, loTile: 0x5D, char: '゛' }, // TODO loTile$5D 渲染像]
  0xC7: { hiTile: 0x94, loTile: 0x5E, char: '゛' }, // TODO loTile$5E 渲染像^

  // 高位 $95 = 半浊点 (字符 $C8-$D1, 10 个)
  // 半浊点+は行 = ぱぴぷぺぽ
  0xC8: { hiTile: 0x95, loTile: 0x1A, char: '゜' }, // TODO 半浊, loTile$1A 待确认
  0xC9: { hiTile: 0x95, loTile: 0x1B, char: '゜' }, // TODO
  0xCA: { hiTile: 0x95, loTile: 0x1C, char: '゜' }, // TODO
  0xCB: { hiTile: 0x95, loTile: 0x1D, char: '゜' }, // TODO
  0xCC: { hiTile: 0x95, loTile: 0x1E, char: '゜' }, // TODO
  0xCD: { hiTile: 0x95, loTile: 0x5A, char: '゜' }, // TODO
  0xCE: { hiTile: 0x95, loTile: 0x5B, char: '゜' }, // TODO
  0xCF: { hiTile: 0x95, loTile: 0x5C, char: '゜' }, // TODO
  0xD0: { hiTile: 0x95, loTile: 0x5D, char: '゜' }, // TODO
  0xD1: { hiTile: 0x95, loTile: 0x5E, char: '゜' }, // TODO
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
