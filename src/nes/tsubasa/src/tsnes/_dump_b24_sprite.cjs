// 临时脚本: 从 prg-bank-24.ts 提取精灵核心反汇编中缺失的字节区间
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'rom-data', 'prg-bank-24.ts');
const src = fs.readFileSync(file, 'utf8');

// 解析数组字面量 [0x.., ...] (从 "= [" 到 "];")
const m = src.match(/=\s*(\[[\s\S]*\]);\s*export default/s);
if (!m) {
  console.error('未找到数组');
  process.exit(1);
}
const bytes = m[1].split(',').map((s) => {
  const t = s.trim().replace(/0x/i, '');
  return parseInt(t, 16);
});

const CPU_BASE = 0x8000;
function dump(start, end, label) {
  console.log(`\n=== ${label} (CPU $${start.toString(16)}-$${end.toString(16)}) ===`);
  let line = '';
  for (let a = start; a <= end; a++) {
    line += bytes[a - CPU_BASE].toString(16).padStart(2, '0').toUpperCase() + ' ';
    if ((a - start + 1) % 16 === 0) {
      console.log(`$${a.toString(16)}: ${line}`);
      line = '';
    }
  }
  if (line) console.log(`$${end.toString(16)}: ${line}`);
}

dump(0x89b4, 0x89fa, 'SPR_DISPATCH_89B4 完整表 (到 $89F9)');
dump(0x8a18, 0x8a1f, 'cmd4 嵌套 C509 子表 ($8A18)');
dump(0x8caa, 0x8cb5, '$8CA5 附近 (验证 $8CAD)');
dump(0x8d9e, 0x8dc1, 'SPR_PATTERN_8D9E 模板');
dump(0x8dc2, 0x8ddf, 'SPR_BLOCK_PTR_8DC2');
