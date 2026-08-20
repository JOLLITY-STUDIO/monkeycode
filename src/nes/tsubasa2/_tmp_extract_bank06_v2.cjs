// 从 bank06 asm 源码提取 tableLoad 数据表 ($1F00+) 和模式块数据 ($1B40+)
// asm 格式: - D 1 - I - 0x00C010 03:8000: 0C        .byte $0C   ;
// 偏移 = CPU地址 - 0x8000 (bank06 起始 $8000, 窗口 $A000 时偏移 = addr - $8000)
'use strict';
const fs = require('fs');
const path = require('path');

const asmDir = path.resolve(__dirname, '_tmp_bzk_out/bank_06');
const files = fs.readdirSync(asmDir).filter(f => f.endsWith('.asm')).sort();

// 解析全部 bank06 字节
const bytes = [];
for (const f of files) {
  const lines = fs.readFileSync(path.join(asmDir, f), 'utf-8').split('\n');
  for (const line of lines) {
    // 匹配: .byte $XX
    const m = line.match(/\.byte\s+\$([0-9A-Fa-f]{2})/);
    if (m) {
      bytes.push(parseInt(m[1], 16));
    }
  }
}
console.error(`bank06 总字节数: ${bytes.length}`);

// bank06 偏移 = CPU地址 - 0x8000
// tableLoad: CPU $BF00 = bank06 偏移 0x1F00
const TABLE_LOAD_OFF = 0x1F00;
// 模式块: CPU $BB40 = bank06 偏移 0x1B40
const MODE_BLOCK_OFF = 0x1B40;
const END = bytes.length; // 到 bank06 末尾

if (bytes.length < 0x2000) {
  console.error(`警告: 字节数 ${bytes.length} < 0x2000，数据不完整`);
}

// tableLoad 数据表 (0x1F00 - 末尾)
const tableLoadData = bytes.slice(TABLE_LOAD_OFF).map(b => b ?? 0xFF);
console.error(`tableLoad 数据 [0x${TABLE_LOAD_OFF.toString(16)}-end]: ${tableLoadData.length} 字节`);

// 模式块数据 (0x1B40 - 0x1D00, 覆盖 mode 0-3 所有块)
const MODE_BLOCK_END = 0x1D00;
const modeBlockData = bytes.slice(MODE_BLOCK_OFF, Math.min(MODE_BLOCK_END, bytes.length)).map(b => b ?? 0xFF);
console.error(`模式块数据 [0x${MODE_BLOCK_OFF.toString(16)}-0x${MODE_BLOCK_END.toString(16)}): ${modeBlockData.length} 字节`);

function toHexArray(arr, perLine = 16) {
  const lines = [];
  for (let i = 0; i < arr.length; i += perLine) {
    const chunk = arr.slice(i, i + perLine);
    lines.push('  ' + chunk.map(b => '0x' + b.toString(16).padStart(2, '0').toUpperCase()).join(', ') + ',');
  }
  return lines.join('\n');
}

// 输出 TS 片段
const ts = `// ═══════════════════════════════════════════════════════════════
// bank06 原始字节提取区 (替代已删除的 prg-bank-06.ts)
// 从 _tmp_bzk_out/bank_06/*.asm 提取
// ═══════════════════════════════════════════════════════════════

/** 模式块指针表起点 (bank06 偏移, 对应 CPU $BB40) */
export const BANK06_MODE_BLOCK_PTR_TABLE_OFFSET = 0x1B40;

/** 模式块数据区 (bank06 偏移 0x1B40-0x1D00, 4 个模式的所有写块) */
export const BANK06_MODE_BLOCK_DATA: readonly number[] = [
${toHexArray(modeBlockData)}
];

/** tableLoad 数据表起点 (bank06 偏移 0x1F00, 对应 CPU $BF00) */
export const BANK06_TABLE_LOAD_OFFSET = 0x1F00;

/** tableLoad 数据表 (bank06 偏移 0x1F00-末尾, 每组 0x13=19 字节) */
export const BANK06_TABLE_LOAD_DATA: readonly number[] = [
${toHexArray(tableLoadData)}
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

fs.writeFileSync(path.join(__dirname, '_tmp_bank06_extract.ts'), ts, 'utf-8');
console.error('已写入 _tmp_bank06_extract.ts');
