// 从 rom-data/prg-bank-01.ts 提取 Bank01 全部数据表
const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, 'rom-data', 'prg-bank-01.ts');
const text = fs.readFileSync(src, 'utf8');

// 提取所有 0xNN
const bytes = [];
const re = /0x([0-9A-Fa-f]{2})/g;
let m;
while ((m = re.exec(text)) !== null) {
  bytes.push(parseInt(m[1], 16));
}
console.log(`total bytes: ${bytes.length}`);

// CPU 地址 = 0xA000 + idx
function dumpTable(name, cpuStart, cpuEnd, desc) {
  const start = cpuStart - 0xA000;
  const end = cpuEnd - 0xA000;
  if (start < 0 || end > bytes.length) { console.log(`${name}: OUT OF RANGE`); return; }
  const vals = bytes.slice(start, end);
  const hex = vals.map(v => v.toString(16).padStart(2, '0').toUpperCase()).join(' ');
  console.log(`\n${name} \$${cpuStart.toString(16).toUpperCase()}-\$${cpuEnd.toString(16).toUpperCase()} (${vals.length}B) ${desc}`);
  console.log(hex);
}

dumpTable('跳转表', 0xA000, 0xA01E, 'JMP 跳板');
dumpTable('球员字段索引表', 0xAD8A, 0xAF78, 'A438/A474 使用');
dumpTable('球员索引表2(AD9C)', 0xAD9C, 0xAD9E, '');
dumpTable('屏幕块定义表', 0xB1E8, 0xB229, 'B1E8 (64 entries)');
dumpTable('类型→Y偏移表', 0xB229, 0xB22D, 'B229');
dumpTable('光标位置表', 0xB22D, 0xB241, 'B22D (18 entries)');
dumpTable('菜单Y屏幕位置表', 0xB241, 0xB255, 'B241 (18 entries)');
dumpTable('菜单选项标志表', 0xB255, 0xB271, 'B255');
dumpTable('图形数据传输表', 0xB271, 0xB2ED, 'B271 (124B)');
dumpTable('按键方向表', 0xB2ED, 0xB2FD, 'B2ED (16 entries)');
dumpTable('B371表', 0xB371, 0xB394, 'B371 (by 26)');
dumpTable('B393表', 0xB393, 0xB3B6, 'B393 (by 26)');
dumpTable('B3B5表', 0xB3B5, 0xB3D8, 'B3B5 (by 26)');
dumpTable('B3D7表', 0xB3D7, 0xB3FA, 'B3D7 (by 26)');
dumpTable('B3F9表', 0xB3F9, 0xB41C, 'B3F9 (by 26)');
dumpTable('B41B表', 0xB41B, 0xB43E, 'B41B (by 26)');
dumpTable('B981表', 0xB981, 0xB9C0, 'B981 (队伍名/比分)');
dumpTable('BB2E表', 0xBB2E, 0xBB6A, 'BB2E (名字匹配)');
dumpTable('BC48表', 0xBC48, 0xBC6E, 'BC48 (tile指针)');
dumpTable('BC58表', 0xBC58, 0xBC6E, 'BC58 (位置指针)');
dumpTable('菜单tile数据表', 0xBC6E, 0xBCD1, 'BC6E (99 entries)');
dumpTable('队伍属性表', 0xBCD1, 0xBCF3, 'BCD1 (34B by 26)');
dumpTable('图形数据指针表', 0xBCF3, 0xBD64, 'BCF3');
dumpTable('数据指针表', 0xBD64, 0xBDA8, 'BD64');
dumpTable('BDA8表', 0xBDA8, 0xBDE0, 'BDA8 (位置指针)');
dumpTable('初始化调色板数据', 0xB205, 0xB229, 'B205 (B0C0目标)');
dumpTable('ACA2数据', 0xACA2, 0xACB8, 'ACA2 (22B 复制到0468)');
dumpTable('ACB8数据', 0xACB8, 0xACCE, 'ACB8 (22B 复制到0468)');
dumpTable('A673跳转', 0xA673, 0xA67B, 'A673 (入口表)');
dumpTable('A781跳转', 0xA781, 0xA78B, 'A781 (入口表)');
dumpTable('A89D跳转', 0xA89D, 0xA8A7, 'A89D (入口表)');
dumpTable('B3D0附近', 0xB3D0, 0xB3E0, '');
dumpTable('BB6A后续', 0xBB6A, 0xBBF0, '');
