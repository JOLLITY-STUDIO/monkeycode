// 从 rom-data/prg-bank-27.ts 提取 bank27 表数据
const path = 'd:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/tsubasa2-h5-src/src/data/bank27-data.ts';
const fs = require('fs');
const src = fs.readFileSync(path, 'utf8');
const m = src.match(/B27_DATA[^=]*= \[([\s\S]*?)\];/);
if (!m) { console.log('NO DATA'); process.exit(1); }
const bytes = m[1]
  .split(',')
  .map(s => s.trim())
  .filter(s => /^0x[0-9A-Fa-f]+$/.test(s))
  .map(s => parseInt(s, 16));
console.log('len', bytes.length);

function hex(v) { return v.toString(16).toUpperCase().padStart(2, '0'); }
function w(off) { return (bytes[off] | (bytes[off + 1] << 8)) & 0xffff; }

// 物理偏移: $A000 窗口表 = cpuAddr - 0xA000
function show(off, len, label) {
  console.log('\n== ' + label + ' @ $' + (0xA000 + off).toString(16).toUpperCase() + ' (phys 0x' + off.toString(16) + ') ==');
  const row = [];
  for (let i = 0; i < len; i++) row.push(hex(bytes[off + i]));
  for (let i = 0; i < row.length; i += 16) console.log(row.slice(i, i + 16).join(' '));
}

// $A1DC 递减表 (16B)
show(0x1dc, 16, 'T_DECREMENT');

// $A292 动画脚本指针表 (21×2B)
show(0x292, 42, 'T_ANIM_SCRIPTS (21 ptrs)');
for (let i = 0; i < 21; i++) console.log('  [' + i + '] = $' + w(0x292 + i * 2).toString(16).toUpperCase());

// $A42A 精灵动画指针表 (30×2B)
show(0x42a, 60, 'T_ANIM_BLOCKS (30 ptrs)');
for (let i = 0; i < 30; i++) console.log('  [' + i + '] = $' + w(0x42a + i * 2).toString(16).toUpperCase());

// $A6AD 场景指针表
show(0x6ad, 16, 'T_SCENE_PTRS');
for (let i = 0; i < 8; i++) console.log('  [' + i + '] = $' + w(0x6ad + i * 2).toString(16).toUpperCase());

// $AB65 场景数据指针表
show(0xb65, 24, 'T_SCENE_DATA_PTRS');
for (let i = 0; i < 12; i++) console.log('  [' + i + '] = $' + w(0xb65 + i * 2).toString(16).toUpperCase());
