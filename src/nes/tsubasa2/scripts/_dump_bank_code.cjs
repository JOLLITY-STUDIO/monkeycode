/**
 * 提取 bank asm 中 CDL 标记为 Code 的行 (标注地址 $8000-$9FFF)
 * 用法: node scripts/_dump_bank_code.cjs 19 [start] [end]
 */
const fs = require('fs');
const path = require('path');

const bankId = process.argv[2] || '19';
const rangeStart = process.argv[3] ? parseInt(process.argv[3], 16) : 0x8000;
const rangeEnd = process.argv[4] ? parseInt(process.argv[4], 16) : 0x9fff;

const dir = path.resolve(__dirname, `../_tmp_bzk_out/bank_${bankId.padStart(2, '0')}`);
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.asm')).sort();

const code = [];
for (const f of files) {
  const lines = fs.readFileSync(path.join(dir, f), 'utf8').split('\n');
  for (const ln of lines) {
    const m = /^([\-CDIW\s]+) 0x\w+ \w{2}:(\w{4}):\s+(.*)$/.exec(ln);
    if (!m) continue;
    const flags = m[1];
    if (!flags.includes('C')) continue; // 非 code
    const addr = parseInt(m[2], 16);
    if (addr >= rangeStart && addr <= rangeEnd) {
      code.push({ addr, flags: flags.trim(), line: ln });
    }
  }
}

code.sort((a, b) => a.addr - b.addr);
console.log(`=== Bank ${bankId} code lines in $${rangeStart.toString(16)}-$${rangeEnd.toString(16)}: ${code.length} ===\n`);
let last = -1;
let ranges = [];
for (const c of code) {
  if (c.addr !== last + 1) ranges.push({ start: c.addr, end: c.addr });
  else ranges[ranges.length - 1].end = c.addr;
  last = c.addr;
}
console.log('contiguous ranges:');
for (const r of ranges) {
  console.log(`  $${r.start.toString(16)}-$${r.end.toString(16)} (${r.end - r.start + 1}B)`);
}

if (process.env.DUMP_LINES) {
  console.log('\n--- lines ---');
  for (const c of code) console.log(c.line);
}
