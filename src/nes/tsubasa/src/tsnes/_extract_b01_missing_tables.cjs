// Extract missing Bank01 tables from rom-data/prg-bank-01.ts
// index = CPU addr - 0xA000
const fs = require('fs');
const path = require('path');
const romPath = path.join(__dirname, 'rom-data', 'prg-bank-01.ts');
const src = fs.readFileSync(romPath, 'utf8');
// parse array
const m = src.match(/\[([\s\S]*)\]/);
const bytes = m[1].split(',').map(s => parseInt(s.trim(), 16));
console.log('total bytes:', bytes.length);

function dump(label, addr, len) {
  const off = addr - 0xA000;
  const arr = bytes.slice(off, off + len);
  console.log(`\n/** ${label} — $${addr.toString(16).toUpperCase()} (${len} bytes) */`);
  let line = '';
  arr.forEach((b, i) => {
    line += '0x' + b.toString(16).toUpperCase().padStart(2, '0') + ', ';
    if (line.length > 100 || i === arr.length - 1) {
      console.log('  ' + line.trim());
      line = '';
    }
  });
}

dump('AD8A — 字段索引表 ($A438/$A474 用)', 0xAD8A, 0x14);
dump('BC6E — 菜单数据表', 0xBC6E, 0x40);
dump('BCD1 — 场景切换索引', 0xBCD1, 0x22);
dump('BCF3 — 指针表 (entry2)', 0xBCF3, 0x12);
dump('BD64 — 指针表 (entry2)', 0xBD64, 0x44);
dump('BDA8 — 指针表 ($A63C 用)', 0xBDA8, 0x14);
dump('B393 — 表 (entry3)', 0xB393, 0x22);
dump('B3B5 — 表 (entry4)', 0xB3B5, 0x22);
dump('B3D7 — 表 (entry3)', 0xB3D7, 0x22);
dump('B3F9 — 表 (entry2)', 0xB3F9, 0x22);
dump('B41B — 表 (entry3)', 0xB41B, 0x22);
dump('B0D7 — 脚本分发表', 0xB0D7, 0x24);
