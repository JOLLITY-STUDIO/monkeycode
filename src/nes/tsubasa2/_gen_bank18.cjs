/**
 * 从 asm/bank18/ 提取 .byte 字节 → 生成 src/game/prg/data/prg-bank-18.ts
 * bank18 是纯数据 bank (8KB), 三个 .s 文件按顺序拼接:
 *   data_tables.s + data_maps.s + data_tail.s
 * bank11 按 PRG_BANK_18[offset] 查表 (offset = CPU地址 - $8000)
 */
const fs = require('fs');
const path = require('path');

const asmDir = 'd:/studio/github/monkeycode/src/nes/tsubasa2/asm/bank18';
const outFile = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/game/prg/data/prg-bank-18.ts';

const files = ['data_tables.s', 'data_maps.s', 'data_tail.s'];
const bytes = [];

for (const f of files) {
  const content = fs.readFileSync(path.join(asmDir, f), 'utf8');
  const re = /\.byte\s+(.+)/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    const parts = m[1].split(',').map(s => s.trim()).filter(s => s);
    for (const p of parts) {
      if (p.startsWith('$')) {
        bytes.push(parseInt(p.slice(1), 16));
      } else if (/^\d+$/.test(p)) {
        bytes.push(parseInt(p, 10));
      } else {
        throw new Error('bad token: ' + p + ' in ' + f);
      }
    }
  }
}

console.log('total bytes:', bytes.length, '(expect 8192)');

// 不足 8192 用 0xFF 填充 (gaps = $FF, 见 bank18.s 注释)
while (bytes.length < 0x2000) bytes.push(0xFF);

const lines = [
  '/**',
  ' * prg-bank-18 — 纯数据 bank (8KB)',
  ' *',
  ' * asm 来源: bank18/data_tables.s + data_maps.s + data_tail.s',
  ' * 布局: CPU $8000-$9FFF 连续, gaps = $FF (见 bank18.s 注释)',
  ' * 内容: 数据表 (NT tile/attr/调色板/精灵属性等), 无代码指令',
  ' * 用途: bank11_match-turn 查表 (bank===0x12 ? PRG_BANK_18 : PRG_BANK_19)',
  ' *',
  ' * 翻译方式: asm .byte 逐字节提取, 按 data_tables→data_maps→data_tail 顺序拼接,',
  ' * 不足 8KB 用 $FF 填充 (与 asm gaps = $FF 一致)',
  ' */',
  'const PRG_BANK_18: number[] = [',
];

for (let i = 0; i < bytes.length; i += 16) {
  const chunk = bytes.slice(i, i + 16);
  const hex = chunk.map(b => '0x' + b.toString(16).padStart(2, '0').toUpperCase()).join(',');
  lines.push('  ' + hex + ',');
}

lines.push('];');
lines.push('export default PRG_BANK_18;');

fs.writeFileSync(outFile, lines.join('\n'), 'utf8');
console.log('written:', outFile, '(', bytes.length, 'bytes )');
