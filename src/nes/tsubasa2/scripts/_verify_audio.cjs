// 临时：验证 BGM/SE 数据真实所在 bank + 格式
const fs = require('fs');
const path = require('path');

const rom = fs.readFileSync(path.join(__dirname, '..', 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes'));
const prg = rom.slice(16);
const bank = (n) => prg.slice(n * 0x2000, (n + 1) * 0x2000);

const b7 = bank(7), b12 = bank(12), b13 = bank(13), b14 = bank(14), b15 = bank(15);

// 参考 NSF（已知可播放）
const refNsf = fs.readFileSync(path.join(__dirname, '..', 'tools', 'tsubasa2-mod-nes', 'ct2.nsf'));
const refBank0 = refNsf.slice(128, 128 + 0x2000);        // bank12 lo @ $8000
const refBank1 = refNsf.slice(128 + 0x2000, 128 + 0x4000); // bank12 hi @ $A000

const hex = (arr, off, n) => Array.from(arr.slice(off, off + n)).map((v) => v.toString(16).padStart(2, '0')).join(' ');

console.log('=== 候选位置搜索 ===');
// BGM[0] = $8892 → 各解释：
console.log('BGM[0]=$8892:');
console.log('  bank12[0x892]:', hex(b12, 0x892, 16));
console.log('  bank7[0x892] :', hex(b7, 0x892, 16));
console.log('  bank13[0x892]:', hex(b13, 0x892, 16));
console.log('  bank12[0x892](refNSF bank0):', hex(refBank0, 0x892, 16));

console.log('\nSE[0]=$8E42:');
console.log('  bank12[0xE42]:', hex(b12, 0xe42, 16));
console.log('  bank13[0xE42]:', hex(b13, 0xe42, 16));
console.log('  bank14[0xE42]:', hex(b14, 0xe42, 16));
console.log('  bank15[0xE42]:', hex(b15, 0xe42, 16));
console.log('  bank12[0xE42](refNSF bank1):', hex(refBank1, 0xe42, 16));

console.log('\n=== bank12 结构总览（$8000-$9FFF 引擎区） ===');
// 引擎代码 $8000-$86F5；之后数据
for (const a of [0x870d, 0x8725, 0x874f, 0x8754, 0x8798, 0x87f0, 0x8bda, 0x8d00]) {
  console.log(`$${a.toString(16)}:`, hex(b12, a - 0x8000, 12));
}

console.log('\n=== bank13 结构（SE 数据 1 区） ===');
for (const a of [0x8e42, 0x8e5b, 0x8e68, 0x8e89, 0x8ecf, 0x8fad]) {
  console.log(`$${a.toString(16)}:`, hex(b13, a - 0x8000, 12));
}

console.log('\n=== bank7 结构（BGM 数据区） ===');
for (const a of [0x8892, 0x889c, 0x88a8, 0x88b4]) {
  console.log(`$${a.toString(16)}:`, hex(b7, a - 0x8000, 12));
}

// 找 $8BDA SE 表最后一条 → 验证 bank 边界
console.log('\n=== SE 表最后 8 条 ===');
for (let i = 92; i < 100; i++) {
  const p = b12[0x8bda - 0x8000 + i * 2] | (b12[0x8bda - 0x8000 + i * 2 + 1] << 8);
  console.log(`SE[${i}] = $${p.toString(16)}`);
}
