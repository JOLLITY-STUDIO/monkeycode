// 探测场景数据表: $8920 使用指针 $BF00+A*0x13 (CPU $A000 窗口 → 文件偏移 bank*8192 + (addr-$A000))
// 同时探测 $8AF7 指针表: $A000 + scene*2
const fs = require('fs');

const banks = [];
for (let b = 0; b < 32; b++) {
  const p = `rom-data/prg-bank-${String(b).padStart(2, '0')}.ts`;
  const src = fs.readFileSync(p, 'utf8');
  const m = src.match(/= \[([\s\S]*?)\];\s*export default/);
  const vals = m[1].split(',').map(s => parseInt(s.trim(), 16));
  banks.push(vals);
}

console.log('=== Bank6 0x1F00 (CPU $BF00) 场景记录 ===');
for (let i = 0x1F00; i < 0x1F60; i++) {
  if (i % 16 === 0) process.stdout.write(`\n0x${i.toString(16)}: `);
  process.stdout.write(`${banks[6][i].toString(16).padStart(2, '0')} `);
}
console.log('\n');

// 按 19 字节步长解析 (A*0x13), A=0..8
console.log('=== Bank6 $BF00 按 19 字节记录解析 ===');
for (let a = 0; a < 6; a++) {
  const off = 0x1F00 + a * 0x13;
  const rec = banks[6].slice(off, off + 0x13);
  console.log(`A=${a} @${off.toString(16)}: ` + rec.map(x => x.toString(16).padStart(2, '0')).join(' '));
}

// $8AF7: 切 bank7, 读 $A000+scene*2 的指针
console.log('\n=== Bank7 $A000 指针表 (scene*2) ===');
for (let s = 0; s < 24; s++) {
  const lo = banks[7][s * 2];
  const hi = banks[7][s * 2 + 1];
  console.log(`scene=${s.toString(16).padStart(2, '0')}: ptr=$${hi.toString(16).padStart(2, '0')}${lo.toString(16).padStart(2, '0')}`);
}

// 找所有 bank 中 $BF00 区域包含 '00 40 00 00 00 00' 之类场景头的数据
console.log('\n=== 各 Bank 0x1F00 前 8 字节 ===');
for (let b = 0; b < 32; b++) {
  const head = banks[b].slice(0x1F00, 0x1F08).map(x => x.toString(16).padStart(2, '0')).join(' ');
  console.log(`bank${b}: ${head}`);
}
