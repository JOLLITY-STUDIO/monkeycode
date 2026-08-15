// 验证 bank24 $8629/$863C/$8364 翻译核心逻辑
// 1. $C524 假名→图案映射算法
// 2. $F329 文本流指针表读取
// 3. $83BF/$83DC/$8435/$8440/$8461/$84C7 命令偏移表
const fs = require('fs');
const rd = (P) => {
  const m = P.match(/const PRG_BANK_\d+: readonly number\[\] = (\[[\s\S]*?\]);/);
  return m ? eval(m[1]) : null;
};
const b24 = rd(fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/rom-data/prg-bank-24.ts', 'utf8'));
const b31 = rd(fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/rom-data/prg-bank-31.ts', 'utf8'));
const b30 = rd(fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/rom-data/prg-bank-30.ts', 'utf8'));
if (!b24 || !b31 || !b30) { console.error('数组解析失败'); process.exit(1); }
const r24 = (a) => (a >= 0x8000 && a - 0x8000 < b24.length ? b24[a - 0x8000] : 0);
const r31 = (a) => (a >= 0xe000 && a - 0xe000 < b31.length ? b31[a - 0xe000] : 0);
const r31u16 = (a) => r31(a) | (r31(a + 1) << 8);
const r24u16 = (a) => r24(a) | (r24(a + 1) << 8);

// ── 1. $C524 映射 (复刻 service _mapCharC524) ──
function mapC524(a) {
  if (a < 0xa0) return [a, 0];
  let attr = 0x94;
  let v = a;
  if (a >= 0xc8) {
    attr = 0x95;
    v = (a - 0xae) & 0xff;
    if (v < 0x1f) return [v, attr];
    v = (v - 0x05) & 0xff;
    return [(v + 0x40) & 0xff, attr];
  }
  const carryB4 = a >= 0xb4;
  if (a >= 0xb4) v = (v - 0x14) & 0xff;
  v = (v - 0x9a) & 0xff;
  if (v >= 0x15) v = (v + 0x05) & 0xff;
  if (!carryB4) return [v, attr];
  return [(v + 0x40) & 0xff, attr];
}
console.log('== $C524 映射抽查 ==');
for (const a of [0x21, 0x41, 0x9f, 0xa0, 0xa9, 0xb4, 0xbf, 0xc7, 0xc8, 0xd0, 0xe0, 0xee]) {
  console.log(`  A=$${a.toString(16).toUpperCase()} → [图案=$${mapC524(a)[0].toString(16).toUpperCase()}, 属性=$${mapC524(a)[1].toString(16).toUpperCase()}]`);
}

// ── 2. $F329 文本流指针表 (32 项以上) ──
console.log('\n== $F329 文本流指针表 (前 8 项 + $83BF 值) ==');
for (let i = 0; i < 8; i++) {
  const p = r31u16(0xf329 + i * 2);
  console.log(`  [${i}] → $${p.toString(16).toUpperCase()}${i === 0 ? ' (RAM $05EB 名字区)' : ''}`);
}

// ── 3. $863C 文本流数据格式: 遍历所有指针, 验证 <$E0 截止 ──
console.log('\n== $863C 文本流渲染路径验证 ==');
let maxIdx = 0;
for (let i = 1; i < 256; i++) {
  const p = r31u16(0xf329 + ((i << 1) & 0x1ff));
  if (p >= 0xe000) maxIdx = i; else break;
}
console.log(`  有效文本流索引: 1..${maxIdx}`);
// 抽查几个流的字节
for (const i of [1, 2, 0x9a, 0xcd]) {
  const p = r31u16(0xf329 + ((i << 1) & 0x1ff));
  if (p < 0xe000) continue;
  const bytes = [];
  for (let k = 0; k < 10; k++) {
    const b = r31(p + k);
    if (b >= 0xe0) { bytes.push(`$${b.toString(16).toUpperCase()}[END]`); break; }
    bytes.push(`$${b.toString(16).toUpperCase()}`);
  }
  console.log(`  索引 $${i.toString(16).toUpperCase()} → 前 10 字节: ${bytes.join(' ')}`);
}

// ── 4. 命令偏移表 $83BF/$83DC 值域 (应全部 < $100, 指向有效文本流) ──
console.log('\n== 命令偏移表 $83BF (cmd0 用) ==');
for (let x = 0; x < 11; x++) {
  const v = r24(0x83bf + x);
  const p = r31u16(0xf329 + ((v << 1) & 0x1ff));
  console.log(`  $83BF[$${x.toString(16)}]=$${v.toString(16).toUpperCase()} → 文本流 $${p.toString(16).toUpperCase()}${p < 0xe000 ? ' (RAM)' : ''}`);
}
console.log('\n== 命令偏移表 $83DC (cmd1 用) ==');
for (let x = 0; x < 6; x++) {
  const v = r24(0x83dc + x);
  console.log(`  $83DC[$${x.toString(16)}]=$${v.toString(16).toUpperCase()}`);
}
console.log('\n== $8435 / $8440 / $8461 / $84C7 表 ==');
console.log('  $8435[0..A]:', Array.from({ length: 11 }, (_, x) => `$${r24(0x8435 + x).toString(16).toUpperCase()}`).join(' '));
console.log('  $8440[0..2]:', Array.from({ length: 3 }, (_, x) => `$${r24(0x8440 + x).toString(16).toUpperCase()}`).join(' '));
console.log('  $8461[0..6]:', Array.from({ length: 7 }, (_, x) => `$${r24(0x8461 + x).toString(16).toUpperCase()}`).join(' '));
console.log('  $84C7[0..6]:', Array.from({ length: 7 }, (_, x) => `$${r24(0x84c7 + x).toString(16).toUpperCase()}`).join(' '));

// ── 5. $852C / $8579 / $8589 (cmd12/13) ──
console.log('\n== cmd12/13 辅助表 ==');
console.log('  $852C[0..7]:', Array.from({ length: 8 }, (_, x) => `$${r24(0x852c + x).toString(16).toUpperCase()}`).join(' '));
for (let x = 0; x < 8; x++) {
  const a = r24(0x8579 + x * 2);
  const b = r24(0x857a + x * 2);
  const blk = r24u16(0x8589 + x * 2);
  console.log(`  [${x}] 图案($${a.toString(16)}/$${b.toString(16)}) 数据块 $${blk.toString(16).toUpperCase()}`);
}

// ── 6. $86B8/$86E8 (组属性/源地址) ──
console.log('\n== $86B8 组属性表 / $86E8 源地址表 ==');
console.log('  $86B8[0..F]:', Array.from({ length: 16 }, (_, x) => `$${r24(0x86b8 + x).toString(16).toUpperCase()}`).join(' '));
console.log('  $86E8[0..7]:', Array.from({ length: 8 }, (_, x) => `$${r24u16(0x86e8 + x * 2).toString(16).toUpperCase()}`).join(' '));
console.log('\n验证完成');
