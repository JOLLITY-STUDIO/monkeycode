// 临时: dump bank31 $F329 指针表 与 $F5xx 文本数据
const P = require('fs').readFileSync(
  'd:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/rom-data/prg-bank-31.ts',
  'utf8'
);
const m = P.match(/const PRG_BANK_31: readonly number\[\] = (\[[\s\S]*?\]);/);
if (!m) {
  console.error('no array match; head:', P.slice(0, 300));
  process.exit(1);
}
const arr = eval(m[1]);
console.log('len=', arr.length);
const CPU = 0xe000;
const rd = (a) => (a >= CPU && a - CPU < arr.length ? arr[a - CPU] : 0);
const rd16 = (a) => rd(a) | (rd(a + 1) << 8);
// $F329 指针表前 16 项
const out = [];
for (let i = 0; i < 16; i++) {
  const p = rd16(0xf329 + i * 2);
  out.push(`[${i}] $${p.toString(16).toUpperCase()}`);
}
console.log('F329 ptr:', out.join(' '));
// 指针指向的数据前 3 项
for (let i = 0; i < 4; i++) {
  const p = rd16(0xf329 + i * 2);
  const hex = Array.from({ length: 24 }, (_, k) => rd(p + k).toString(16).padStart(2, '0')).join(' ');
  console.log(`F329[${i}] -> $${p.toString(16)}: ${hex}`);
}
// 0x05EB (第一条指针) 在 bank24? $05EB 是 CPU 零页? 不对, 第一条 = $05EB 是 RAM! 检查
