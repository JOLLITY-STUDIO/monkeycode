// 临时脚本: 验证 $8C52 附近实际字节 (确认 fc 分隔符语义)
const fs = require('fs');
const path = require('path');
const src = fs.readFileSync(path.join(__dirname, 'rom-data', 'prg-bank-24.ts'), 'utf8');
const m = src.match(/=\s*(\[[\s\S]*\]);\s*export default/s);
const bytes = m[1].split(',').map((s) => parseInt(s.trim().replace(/0x/i, ''), 16));
const B24_BASE = 0x8000;
function b(cpu) { return bytes[cpu - B24_BASE]; }
function dump(start, end, label) {
  console.log(`\n=== ${label} (CPU $${start.toString(16)}-$${end.toString(16)}) ===`);
  let line = '';
  for (let a = start; a <= end; a++) {
    line += b(a).toString(16).padStart(2, '0').toUpperCase() + ' ';
    if ((a - start + 1) % 16 === 0) {
      console.log(`$${(a & 0xfff0).toString(16)}: ${line}`);
      line = '';
    }
  }
  if (line) console.log(`$${(end & 0xfff0).toString(16)}: ${line}`);
}
dump(0x8c50, 0x8c60, '验证 $8C52 (fc 分隔符语义)');
dump(0x8ca0, 0x8cd0, '验证 $8CA5-$8CC0');
