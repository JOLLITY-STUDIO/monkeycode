// 提取 bank24 $8851-$8D9D 精灵加载相关的所有数据表 + bank28 $8000 入口
const fs = require('fs');

function loadBank(file) {
  const txt = fs.readFileSync(file, 'utf8');
  const m = txt.match(/readonly number\[\] = \[([\s\S]*?)\];/);
  if (!m) throw new Error('NO MATCH ' + file);
  return m[1].split(',').map(s => parseInt(s.trim(), 16));
}

const b24 = loadBank('rom-data/prg-bank-24.ts');
const b28 = loadBank('rom-data/prg-bank-28.ts');

function r24(cpu) { return b24[cpu - 0x8000]; }
function r16_24(cpu) { return r24(cpu) | (r24(cpu + 1) << 8); }
function dump(label, cpu, len) {
  const arr = [];
  for (let i = 0; i < len; i++) arr.push('0x' + r24(cpu + i).toString(16).padStart(2, '0'));
  console.log(`${label} ($${cpu.toString(16)}, ${len}B):\n  ${arr.join(', ')}`);
}

console.log('===== bank28 $8000-$8002 =====');
console.log(b28.slice(0, 3).map(b => b.toString(16).padStart(2, '0')).join(' '));

dump('$89BA 精灵命令表 (32×2B)', 0x89ba, 64);
dump('$8A18 cmd4 子表', 0x8a18, 8);
dump('$8AAC cmd7 位置表', 0x8aac, 14);
dump('$8B0A cmd13 表', 0x8b0a, 40);
dump('$8B72 cmd15 表 (5×5)', 0x8b72, 25);
dump('$8BC9 cmd16 计时表', 0x8bc9, 12);
dump('$8D04 8CDC 名字表', 0x8d04, 24);
dump('$8D40 8D1A 名字表', 0x8d40, 48);
dump('$8D9E 精灵图案表', 0x8d9e, 96);
dump('$8DC2 精灵数据块指针表', 0x8dc2, 32);
dump('$86B8 组属性表', 0x86b8, 16);
dump('$86C8 下一块配置表', 0x86c8, 16);
dump('$86E8 源地址表', 0x86e8, 16);

// 命令表解析
console.log('\n===== 命令表条目 =====');
for (let i = 0; i < 32; i++) {
  const addr = r16_24(0x89ba + i * 2);
  console.log(`cmd${i} (E${(0xe0 + i).toString(16)}): $${addr.toString(16)}`);
}

// bank28 $8003 入口表
console.log('\n===== bank28 $8003 入口表 =====');
for (let i = 0; i < 13; i++) {
  const op = b28[i * 3];
  const lo = b28[i * 3 + 1];
  const hi = b28[i * 3 + 2];
  console.log(`$${(0x8003 + i * 3).toString(16)}: ${op.toString(16).padStart(2, '0')} $${(hi << 8 | lo).toString(16)}`);
}
