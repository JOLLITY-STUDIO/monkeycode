// 临时探测: bank16 关键数据字节 (验证脚本编写用)
const B = require('./tsubasa2-h5-src/_test_out/tsubasa2-h5-src/src/game/data/bank16-data');

// 1. 解释器 trace 用例: 表 I idx0 (0x81F3) / 表 H idx58 (0xB47C) 参数区
let r1 = [];
for (const a of [0x81f3, 0x81f4, 0x81f5, 0x81f6, 0x81f7, 0x81f8, 0xb47c, 0xb47d, 0xb47e, 0xb47f, 0xb480, 0xb481]) {
  r1.push(a.toString(16) + '=' + B.readB16(a).toString(16));
}
console.log('TRACE:', r1.join(' '));

// 2. 谓词指针关键索引
let r2 = [];
for (const i of [0x00, 0x34, 0x73]) {
  r2.push('p' + i.toString(16) + '=' + B.readB16PredPtr(i).toString(16));
}
console.log('PREDPTR:', r2.join(' '));

// 3. 统计表 $8308 前 7 项
let r3 = [];
for (const x of [0, 5, 10, 15, 20, 25, 30]) r3.push('s' + x + '=' + B.readB16Stats8308(x).toString(16));
console.log('STATS8308:', r3.join(' '));

// 4. $86A6 对表前 16 字节
let r4 = [];
for (const y of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]) r4.push(B.readB16Pair86A6(y).toString(16));
console.log('PAIR86A6:', r4.join(' '));

// 5. $86C8 表
let r5 = [];
for (const x of [0, 1, 2, 3]) r5.push(B.readB16Lookup86C8(x).toString(16));
console.log('LOOKUP86C8:', r5.join(' '));

// 6. 动画表 $86F4 / $876A 前 8 项
let r6 = [];
for (const x of [0, 1, 2, 3, 4, 5, 6, 7]) r6.push('A' + x + '=' + B.readB16AnimAction(x).toString(16));
for (const x of [0, 1, 2, 3, 4, 5, 6, 7]) r6.push('H' + x + '=' + B.readB16AnimHigh(x).toString(16));
console.log('ANIM:', r6.join(' '));

// 7. 表 F/G/D 指针
let r7 = [];
for (const i of [0, 1, 2, 3, 4]) r7.push('F' + i + '=' + B.readB16ScriptBytePtr(i).toString(16));
for (const i of [0, 1, 2, 3]) r7.push('G' + i + '=' + B.readB16ScriptCmdPtr(i).toString(16));
for (const i of [0, 1, 2, 3, 4]) r7.push('D' + i + '=' + B.readB16XCountPtr(i).toString(16));
console.log('TABLES:', r7.join(' '));

// 8. 查找表
console.log('LOOKUP8291:', [0, 1, 2, 3, 4, 5].map(x => B.readB16Lookup8291(x).toString(16)).join(' '));
console.log('LOOKUP83AF:', [0, 1, 2, 3, 4, 5].map(x => B.readB16Lookup83AF(x).toString(16)).join(' '));
console.log('LOOKUP83BB:', [0, 1, 2, 3, 4, 5].map(x => B.readB16Lookup83BB(x).toString(16)).join(' '));
console.log('LOOKUP857A:', [0, 1, 2, 3, 4, 5].map(x => B.readB16Lookup857A(x).toString(16)).join(' '));
console.log('LOOKUP8635:', [0, 1, 2, 3, 4, 5].map(x => B.readB16Lookup8635(x).toString(16)).join(' '));
console.log('LOOKUP8645:', [0, 1, 2, 3, 4, 5].map(x => B.readB16Lookup8645(x).toString(16)).join(' '));
