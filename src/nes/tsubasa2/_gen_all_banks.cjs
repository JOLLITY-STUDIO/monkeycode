/**
 * 批量从 asm/bankN/_full.s 提取 .byte → 生成 src/game/prg/data/prg-bank-N.ts
 * 用于补全缺失的 prg-bank-19/20/21/31 (纯数据或含代码的都按字节提取)
 */
const fs = require('fs');
const path = require('path');

const asmDir = 'd:/studio/github/monkeycode/src/nes/tsubasa2/asm';
const outDir = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/game/prg/data';

const targets = [19, 20, 21, 31];

for (const n of targets) {
  const asmFile = path.join(asmDir, `bank${n}`, '_full.s');
  if (!fs.existsSync(asmFile)) {
    console.log(`bank${n}: asm not found, skip`);
    continue;
  }

  const content = fs.readFileSync(asmFile, 'utf8');
  const bytes = [];
  const re = /\.byte\s+([^\n]+)/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    const parts = m[1].split(',').map(s => s.trim()).filter(s => s && !s.startsWith(';'));
    for (const p of parts) {
      if (p.startsWith('$')) {
        bytes.push(parseInt(p.slice(1), 16));
      } else if (p.startsWith('%')) {
        bytes.push(parseInt(p.slice(1), 2));
      } else if (/^\d+$/.test(p)) {
        bytes.push(parseInt(p, 10));
      } else if (/^0x[0-9a-f]+$/i.test(p)) {
        bytes.push(parseInt(p, 16));
      }
      // 忽略其他 token (标签引用等)
    }
  }

  // 填充到 8KB
  while (bytes.length < 0x2000) bytes.push(0xFF);
  const trimmed = bytes.slice(0, 0x2000);

  const lines = [
    '/**',
    ` * prg-bank-${n} — PRG bank ${n} (8KB)`,
    ' *',
    ` * asm 来源: bank${n}/_full.s`,
    ' * 布局: CPU $8000-$9FFF 连续, gaps = $FF',
    ' * 翻译方式: asm .byte 逐字节提取 (含数据表+代码机器码, 供查表用)',
    ' */',
    `const PRG_BANK_${n}: number[] = [`,
  ];

  for (let i = 0; i < trimmed.length; i += 16) {
    const chunk = trimmed.slice(i, i + 16);
    const hex = chunk.map(b => '0x' + b.toString(16).padStart(2, '0').toUpperCase()).join(',');
    lines.push('  ' + hex + ',');
  }

  lines.push('];');
  lines.push(`export default PRG_BANK_${n};`);

  const outFile = path.join(outDir, `prg-bank-${n}.ts`);
  fs.writeFileSync(outFile, lines.join('\n'), 'utf8');
  console.log(`bank${n}: written ${trimmed.length} bytes to ${outFile}`);
}
