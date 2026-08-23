// 验证生成的 NSF 文件结构
const fs = require('fs');
const path = require('path');
const nsf = fs.readFileSync(path.join(__dirname, '..', 'docs', 'tsubasa2-bgm.nsf'));

console.log('NSF 文件大小:', nsf.length);
console.log('\n=== Header 解析 ===');
console.log('Magic:', nsf.slice(0, 5).toString('ascii'));
console.log('Version:', nsf[5]);
console.log('Total songs:', nsf[6]);
console.log('Starting song:', nsf[7]);
console.log('Load addr: $' + nsf.readUInt16LE(8).toString(16));
console.log('Init addr: $' + nsf.readUInt16LE(10).toString(16));
console.log('Play addr: $' + nsf.readUInt16LE(12).toString(16));
console.log('Song name:', nsf.slice(14, 46).toString('ascii').replace(/\0/g,''));
console.log('Artist:', nsf.slice(46, 78).toString('ascii').replace(/\0/g,''));
console.log('Copyright:', nsf.slice(78, 110).toString('ascii').replace(/\0/g,''));
console.log('NTSC speed: $' + nsf.readUInt16LE(110).toString(16));
console.log('Bankswitch:', Array.from(nsf.slice(112, 120)).map(b=>'0x'+b.toString(16)));
console.log('PAL speed: $' + nsf.readUInt16LE(120).toString(16));
console.log('PAL/NTSC bits:', nsf[122]);
console.log('Chip type:', nsf[123]);

// 验证 PRG 数据
console.log('\n=== PRG 数据验证 ===');
const prgData = nsf.slice(128);
console.log('PRG 数据大小:', prgData.length, '=', prgData.length/0x2000, '个 8KB bank');
console.log('bank0 (前8KB) 开头:', Array.from(prgData.slice(0, 8)).map(b=>'0x'+b.toString(16)));
console.log('bank1 (后8KB) 开头:', Array.from(prgData.slice(0x2000, 0x2008)).map(b=>'0x'+b.toString(16)));

// 检查包装代码（init 8 字节 + play 4 字节 = 12 字节）
const initOff = 0x1FF0; // bank25 偏移（$BFF0 - $A000）
console.log('\n=== 包装代码验证 ===');
console.log('init routine (8 字节, offset 0x' + (0x2000 + initOff).toString(16) + '):');
console.log(Array.from(prgData.slice(0x2000 + initOff, 0x2000 + initOff + 8)).map(b=>'0x'+b.toString(16)));
// 应该是: 38 E9 01 8D 00 07 20 00  (SEC; SBC #$01; STA $0700; JSR $80...)
// 注: JSR $8000 = 20 00 80，跨 8 字节边界
console.log('play routine (4 字节, offset 0x' + (0x2000 + initOff + 8).toString(16) + '):');
console.log(Array.from(prgData.slice(0x2000 + initOff + 8, 0x2000 + initOff + 12)).map(b=>'0x'+b.toString(16)));
// 应该是: 20 BA 80 60  (JSR $80BA; RTS)
