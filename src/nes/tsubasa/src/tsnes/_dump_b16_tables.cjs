// 临时: dump bank16 dispatch 表区域 + bank30 固定区 $C50F/$C51B/$C548/$C551
const fs = require('fs');
const path = require('path');

// 读取 prg-bank-16.ts 中的字节
const src = fs.readFileSync(path.join(__dirname, 'rom-data/prg-bank-16.ts'), 'utf8');
const m = src.match(/const PRG_BANK_16: readonly number\[\] = \[([\s\S]*?)\];/);
const nums = m[1].split(',').map(s => parseInt(s.trim().replace(/^0x/i, ''), 16));
const BANK16 = nums;
const b16 = (cpu) => BANK16[cpu - 0x8000];

// 读取 bank_30.asm
const asm30 = fs.readFileSync(path.join(__dirname, '_tmp_bzk_out/bank_30.asm'), 'utf8').split('\n');

const out = [];
out.push('===== BANK16 DISPATCH TABLES =====');
const regions = [
  ['A $80AF (fn_80A9)', 0x80af, 0x80ce],
  ['B $8171 (fn_816E)', 0x8171, 0x8206],
  ['D $8300 (fn_82FB)', 0x8300, 0x832c],
  ['E $838F (fn_838B)', 0x838f, 0x8396],
  ['F $886C (fn_886A)', 0x886c, 0x8876],
  ['G $88F3 (fn_88ED)', 0x88f3, 0x890c],
  ['H $8997 (fn_8991)', 0x8997, 0x8998],
  ['I $89A2 (fn_899C)', 0x89a2, 0x89a3],
  ['J $89AD (fn_89A7)', 0x89ad, 0x89ae],
];
for (const [name, lo, hi] of regions) {
  out.push(`\n--- ${name} ---`);
  const bytes = [];
  for (let a = lo; a <= hi; a++) bytes.push(b16(a));
  for (let i = 0; i < bytes.length; i += 2) {
    const loB = bytes[i] ?? 0, hiB = bytes[i + 1] ?? 0;
    const ptr = loB | (hiB << 8);
    out.push(`  [${i / 2}] 0x${(lo + i).toString(16).toUpperCase()} = ${loB.toString(16).padStart(2, '0')} ${hiB.toString(16).padStart(2, '0')} -> $${ptr.toString(16).toUpperCase()}`);
  }
}

// bank30 固定区: 找 $CAE7 / $CB02 / $CD89 附近代码
out.push('\n===== BANK30 FIXED AREA =====');
function findLine(addrHex, label) {
  const idx = asm30.findIndex(l => l.includes(addrHex));
  if (idx >= 0) {
    out.push(`\n--- ${label} (line ${idx}) ---`);
    out.push(asm30.slice(Math.max(0, idx - 8), idx + 40).join('\n'));
  } else {
    out.push(`\n--- ${label}: NOT FOUND ---`);
  }
}
findLine('CAE7', '$C50F->$CAE7 zero-page write');
findLine('CB02', '$C51B->$CB02 counter');
findLine('CD7C', '$C50C->$CD7C name lookup');
findLine('C548', '$C548->? find-free-slot');
findLine('C551', '$C551->$CD77 team switch');

fs.writeFileSync(path.join(__dirname, '_b16_tables_dump.txt'), out.join('\n'));
console.log('written');
