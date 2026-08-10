/**
 * 生成 mini-audio 专用 Bank30（精简版）
 * - 复制原始 Bank30
 * - 把 JSR $A000 调用改成 NOP（跳过 Bank0/2/3 代码）
 * - 保留 JSR $8000（Bank12 音频引擎调用）
 */

import b30 from './rom-data/prg-bank-30';

// 深拷贝
const mini30 = new Uint8Array(b30);

// === 需要 NOP 掉的 JSR $A000 位置 ===
// $C43A: JSR $A000 → 改为 NOP NOP NOP
// offset = 0xC43A - 0xC000 = 0x043A
mini30[0x043A] = 0xEA;
mini30[0x043B] = 0xEA;
mini30[0x043C] = 0xEA;

// 也检查 $C489-$C48E + JSR $A000
// $C48E: STA $8001 with $02 (切到Bank2)，但后面是 JSR $A061（不同的地址），不是 $A000
// 检查下有没有其他 JSR $A000
for (let i = 0; i < mini30.length - 2; i++) {
  if (mini30[i] === 0x20 && mini30[i + 1] === 0x00 && mini30[i + 2] === 0xA0) {
    // 还有没有其他 JSR $A000?
    if (i !== 0x043A) {
      const pc = (0xC000 + i).toString(16).toUpperCase();
      console.log(`WARN: 发现额外 JSR $A000 @ $${pc}, offset=${i.toString(16)} → 也NOP掉`);
      mini30[i] = 0xEA;
      mini30[i + 1] = 0xEA;
      mini30[i + 2] = 0xEA;
    }
  }
}

// === 检查并NOP掉 JSR $A060-$A100 范围（Bank2子程序区域）===
for (let i = 0; i < mini30.length - 2; i++) {
  if (mini30[i] === 0x20) { // JSR
    const lo = mini30[i + 1];
    const hi = mini30[i + 2];
    const addr = lo | (hi << 8);
    // JSR $A000-$AFFF 都是 Bank2区域
    if (addr >= 0xA000 && addr <= 0xAFFF && i !== 0x043A) {
      const pc = (0xC000 + i).toString(16).toUpperCase();
      console.log(`WARN: 额外 JSR $${addr.toString(16)} @ $${pc} → NOP掉`);
      mini30[i] = 0xEA;
      mini30[i + 1] = 0xEA;
      mini30[i + 2] = 0xEA;
    }
  }
}

// === 检查并修复 Bank31 调用（$E000-$FFFF区域在Bank31，Bank31-mini有实际代码）===
// 这些不需要改，因为 Bank31-mini-audio 有实际代码

console.log('=== 最终 Bank30 JSR 列表 ===');
let keptJsrs = 0, nopedJsrs = 0;
for (let i = 0; i < mini30.length - 2; i++) {
  if (mini30[i] === 0x20) {
    const lo = mini30[i + 1];
    const hi = mini30[i + 2];
    const addr = lo | (hi << 8);
    const pc = (0xC000 + i).toString(16).toUpperCase();
    const comment = (addr >= 0xA000 && addr <= 0xAFFF) ? ' ← 已NOP(Bank2)' :
                    (addr >= 0x8000 && addr <= 0x9FFF) ? ' ← Bank12 音频引擎 ✓' :
                    (addr >= 0xC000 && addr <= 0xDFFF) ? ' ← Bank30 自身 ✓' :
                    (addr >= 0xE000 && addr <= 0xFFFF) ? ' ← Bank31 ✓' : '';
    console.log(`  $${pc}: JSR $${addr.toString(16).toUpperCase()}${comment}`);
    if (addr >= 0xA000 && addr <= 0xAFFF) nopedJsrs++;
    else keptJsrs++;
  }
}
console.log(`保留: ${keptJsrs}, NOP掉: ${nopedJsrs}`);

// 验证：看看 RESET 入口
const resOff = 0x0503;
console.log(`\n=== RESET入口 $C503 前32字节 ===`);
for (let i = resOff; i < resOff + 32; i++) {
  const pc = (0xC000 + i).toString(16).toUpperCase();
  const op = mini30[i].toString(16).padStart(2, '0').toUpperCase();
  if (i === 0x043A || i === 0x043B || i === 0x043C) {
    console.log(`  $${pc}: ${op} ← NOP (原JSR $A000)`);
  } else {
    console.log(`  $${pc}: ${op}`);
  }
}

// 生成输出
const arr = Array.from(mini30);
const output = `/** PRG-ROM Bank 30 MINI (8KB) — 精简版 (仅依赖 Bank12/15/31)
 * 
 * 基于原始 Bank30，做了以下修改:
 *  - JSR $A000-$AFFF (Bank2/3代码调用) → NOP
 *  - 保留所有 JSR $8000 (Bank12 音频引擎) 和 JSR $C000-$FFFF (自身/Bank31)
 */
const PRG_BANK_30_MINI: readonly number[] = [
${arr.map((v, i) => {
  const h = '0x' + v.toString(16).toUpperCase().padStart(2, '0');
  const nl = (i % 16 === 0 && i > 0) ? '\n' : '';
  const pre = i % 16 === 0 ? '  ' : ' ';
  const post = i === arr.length - 1 ? '' : ',';
  return `${nl}${pre}${h}${post}`;
}).join('')}
];

export default PRG_BANK_30_MINI;
export { PRG_BANK_30_MINI };
`;

import * as fs from 'fs';
fs.writeFileSync('./mini-audio/rom-data/prg-bank-30-mini.ts', output);
console.log('\n✅ mini-audio/rom-data/prg-bank-30-mini.ts 已生成');
