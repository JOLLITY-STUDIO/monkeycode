/**
 * 解析 prg-bank-19.ts（兼容 hex/decimal）并 dump 指定区域原始字节
 */
const fs = require('fs');
const path = require('path');

function parseBankFile(content) {
  const start = content.indexOf('[');
  const end = content.lastIndexOf(']');
  if (start < 0 || end < 0) return [];
  const body = content.slice(start + 1, end);
  const tokens = body.split(/[,\s\[\]\(\)]+/).filter(Boolean);
  const bytes = [];
  for (const t of tokens) {
    const m = /^0[xX]([0-9a-fA-F]{1,2})$/.exec(t);
    if (m) { bytes.push(parseInt(m[1], 16)); continue; }
    const d = /^(\d{1,3})$/.exec(t);
    if (d) { bytes.push(parseInt(d[1], 10)); continue; }
  }
  return bytes;
}

const arr = parseBankFile(fs.readFileSync(path.resolve(__dirname, '../src/game/data/prg-bank-19.ts'), 'utf8'));
console.log('bank19 array length:', arr.length);

const show = (off, n) => {
  const base = off - 0x8000; // 标注地址 → 数组索引
  const bytes = arr.slice(base, base + n);
  console.log('$' + off.toString(16).padStart(4, '0') + ': ' + bytes.map((x) => x.toString(16).padStart(2, '0')).join(' '));
};

// 控制表 $9166 起 (15 entries × 2B)
show(0x9160, 0x40);
// 延时入口 $91E0
show(0x91DE, 8);
// 控制码入口 3 $9218 (JMP $B349)
show(0x9216, 6);
// $92A8 调色板填充 (入口8)
show(0x92A0, 0xE);
// $B402 数据 (4B, 场景重置用)
show(0x9400, 8);
// 数据流起点 $9467
show(0x9460, 0x10);
// 名字区指针表 $CD89 (bank30) — 需要 bank30
