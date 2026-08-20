// 从 git HEAD 的 prg-bank-06.ts 提取模式块和 tableLoad 数据表到 bank06-data.ts
'use strict';
const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, '_tmp_bank06.ts'), 'utf-8');
const m = src.match(/const PRG_BANK_06[\s\S]*?=\s*\[([\s\S]*?)\]/);
if (!m) throw new Error('无法解析 bank06');
const bank = m[1].split(',').map(s => s.trim()).filter(s => /^0x[0-9A-Fa-f]+$/.test(s)).map(s => parseInt(s, 16));
console.error(`bank06 总长度: ${bank.length}`);

// 模式块区域: 0x1B40 (指针表起点) - 0x1D00 (足够覆盖 mode 0-3 所有块)
const MODE_BLOCK_START = 0x1B40;
const MODE_BLOCK_END = 0x1D00;
const modeBlockBytes = bank.slice(MODE_BLOCK_START, MODE_BLOCK_END);

// tableLoad 数据表: 0x1F00 起, 每组 0x13=19 字节, param 0-255 最多 256*19=4864 字节
// 实际到 bank06 末尾 0x2000 = 4096 字节, 即 0x1F00-0x1FFF = 256 字节
const TABLE_LOAD_START = 0x1F00;
const TABLE_LOAD_END = 0x2000;
const tableLoadBytes = bank.slice(TABLE_LOAD_START, TABLE_LOAD_END);

// 输出统计
console.error(`模式块区域 [0x${MODE_BLOCK_START.toString(16)}-0x${MODE_BLOCK_END.toString(16)}): ${modeBlockBytes.length} 字节`);
console.error(`tableLoad 表 [0x${TABLE_LOAD_START.toString(16)}-0x${TABLE_LOAD_END.toString(16)}): ${tableLoadBytes.length} 字节`);

// 生成 TS 片段
function toHexArray(arr, perLine = 16) {
  const lines = [];
  for (let i = 0; i < arr.length; i += perLine) {
    const chunk = arr.slice(i, i + perLine);
    lines.push('  ' + chunk.map(b => '0x' + b.toString(16).padStart(2, '0').toUpperCase()).join(', ') + ',');
  }
  return lines.join('\n');
}

const output = `
// ═══════════════════════════════════════════════════════════════
// bank06 原始字节提取区 (替代已删除的 prg-bank-06.ts)
// ═══════════════════════════════════════════════════════════════

/** 模式块指针表起点 (bank06 偏移, 对应 CPU $BB40) */
export const BANK06_MODE_BLOCK_PTR_TABLE_OFFSET = 0x1B40;

/** 模式块数据区 (bank06 偏移 0x1B40-0x1D00, 4 个模式的所有写块) */
export const BANK06_MODE_BLOCK_DATA: readonly number[] = [
${toHexArray(modeBlockBytes)}
];

/** tableLoad 数据表起点 (bank06 偏移 0x1F00, 对应 CPU $BF00) */
export const BANK06_TABLE_LOAD_OFFSET = 0x1F00;

/** tableLoad 数据表 (bank06 偏移 0x1F00-0x1FFF, 每组 0x13=19 字节) */
export const BANK06_TABLE_LOAD_DATA: readonly number[] = [
${toHexArray(tableLoadBytes)}
];

/** 读取 bank06 模式块区域的字节 (替代 PRG_BANK_06[off]) */
export function readBank06ModeBlockByte(offset: number): number {
  const idx = offset - BANK06_MODE_BLOCK_PTR_TABLE_OFFSET;
  if (idx < 0 || idx >= BANK06_MODE_BLOCK_DATA.length) return 0xFF;
  return BANK06_MODE_BLOCK_DATA[idx];
}

/** 读取 bank06 tableLoad 区域的字节 (替代 PRG_BANK_06[off]) */
export function readBank06TableLoadByte(offset: number): number {
  const idx = offset - BANK06_TABLE_LOAD_OFFSET;
  if (idx < 0 || idx >= BANK06_TABLE_LOAD_DATA.length) return 0xFF;
  return BANK06_TABLE_LOAD_DATA[idx];
}
`;

fs.writeFileSync(path.join(__dirname, '_tmp_bank06_extract.ts'), output, 'utf-8');
console.error('已写入 _tmp_bank06_extract.ts');
