// 重新验证参考 NSF bank2/3/4 与原版 bank7/14/15 的关系
const fs = require('fs');
const path = require('path');
const refNsf = fs.readFileSync(path.join(__dirname, '..', 'tools', 'tsubasa2-mod-nes', 'ct2.nsf'));
const rom = fs.readFileSync(path.join(__dirname, '..', 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes'));
const prg = rom.slice(16);

// 参考 NSF bankswitch=[0,1,2,3,4,0,0,0]
// bank 0 = $8000-$9FFF（改写后的 bank12 前 8KB）
// bank 1 = $A000-$BFFF（bank12 后 8KB = bank13）
// bank 2 = $C000-$DFFF
// bank 3 = $E000-$FFFF
// bank 4 = ???（第5个区域）

// 但原版音频 bankswitch：
//   BGM → $8000-$9FFF = bank7
//   SE1 → $8000-$9FFF = bank13
//   SE2 → $8000-$9FFF = bank14
//   SE3 → $8000-$9FFF = bank15
// 
// 参考 NSF 把这些动态 bank 映射为静态 NSF bank
// bank 0 = 引擎代码（原 bank12 前 8KB，改写后）
// bank 1 = 引擎代码后 8KB（原 bank13）
// bank 2/3/4 = BGM/SE 数据 bank？

// 关键：原版 $8000-$9FFF 可以切到 bank7/13/14/15
// NSF 用 $5FFA/$5FFB 替代 $8000/$8001 做 bankswitch
// 但 NSF 的 bankswitch 是 8 个 8KB 区域
// 参考 NSF 的 bankswitch=[0,1,2,3,4]
// 区域 0 = $8000 → bank0（引擎代码）
// 区域 1 = $A000 → bank1（引擎代码后8KB）
// 区域 2 = $C000 → bank2（???）
// 区域 3 = $E000 → bank3（???）
// 区域 4 = ??? → bank4（???）

// 但原版引擎写 $5FFA/$5FFB 时切换 $8000-$9FFF
// 写 $5FFA = bank select，写 $5FFB = bank data
// 这与 MMC3 $8000/$8001 语义相同
// 所以 $5FFA/$5FFB 切换的就是 $8000-$9FFF 区域的 bank

// 当引擎写 STA $5FFB, bank_value 时
// bank_value = $07 → 切到 bank7（BGM 数据）
// 但 NSF 的 bank 索引从 0 开始
// bank_value $07 → NSF bank 7? 但只有 5 个 bank

// 重新看参考 NSF bank0 的改写代码
// 原 bank12: a0 07 8c 00 80 (LDY #$07; STY $8000)
// 参考 NSF: ac fc 07 8c fa 5f (LDY $07FC; STY $5FFA)
// 注意：原版 LDY #$07（立即数），参考改为 LDY $07FC（读 $07FC 变量）
// $07FC 存储的是当前 bank 号
// 写 $5FFA = 选择 bank register
// 然后写 $5FFB = bank data

// 但 NSF bankswitch 与 MMC3 不同
// NSF 用 $5FF0-$5FF7 选择 8 个区域
// $5FF8 = bank for $8000-$9FFF
// $5FF9 = bank for $A000-$BFFF
// 不对，NSF bankswitch 通常用 $5FF8-$5FFF

// 实际上 NSF 的 bankswitch 寄存器是 $5FF8-$5FFF（8 个字节）
// $5FF8 = bank for $8000-$9FFF
// $5FF9 = bank for $A000-$BFFF
// $5FFA = bank for $C000-$DFFF
// $5FFB = bank for $E000-$FFFF
// 等等，这取决于具体 NSF 实现

// 但参考 NSF 用 $5FFA/$5FFB，对应 $C000/$E000 区域？
// 不对，让我检查参考 NSF 的 bankswitch 写法
// 原版: STA $8000 (select register) + STA $8001 (bank data) → MMC3 R6/R7
// 参考: STA $5FFA + STA $5FFB
// 如果 $5FFA = bank for $C000-$DFFF, $5FFB = bank for $E000-$FFFF
// 那引擎把数据放到了 $C000-$FFFF 区域？

// 让我直接检查参考 NSF bank2 是否 = 原版 bank7
console.log('=== 参考 NSF bank2 vs 原版 bank7 ===');
const refBank2 = refNsf.slice(128 + 0x4000, 128 + 0x6000);
const origBank7 = prg.slice(7 * 0x2000, 7 * 0x2000 + 0x2000);
let m2_7 = 0;
for (let i = 0; i < 0x2000; i++) if (refBank2[i] === origBank7[i]) m2_7++;
console.log(`bank2 vs bank7: ${m2_7}/8192 (${(m2_7/0x2000*100).toFixed(1)}%)`);

// bank2 vs bank14
const origBank14 = prg.slice(14 * 0x2000, 14 * 0x2000 + 0x2000);
let m2_14 = 0;
for (let i = 0; i < 0x2000; i++) if (refBank2[i] === origBank14[i]) m2_14++;
console.log(`bank2 vs bank14: ${m2_14}/8192 (${(m2_14/0x2000*100).toFixed(1)}%)`);

// bank2 vs bank15
const origBank15 = prg.slice(15 * 0x2000, 15 * 0x2000 + 0x2000);
let m2_15 = 0;
for (let i = 0; i < 0x2000; i++) if (refBank2[i] === origBank15[i]) m2_15++;
console.log(`bank2 vs bank15: ${m2_15}/8192 (${(m2_15/0x2000*100).toFixed(1)}%)`);

// bank3 vs bank7/14/15
const refBank3 = refNsf.slice(128 + 0x6000, 128 + 0x8000);
let m3_7 = 0, m3_14 = 0, m3_15 = 0;
for (let i = 0; i < 0x2000; i++) {
  if (refBank3[i] === origBank7[i]) m3_7++;
  if (refBank3[i] === origBank14[i]) m3_14++;
  if (refBank3[i] === origBank15[i]) m3_15++;
}
console.log(`bank3 vs bank7: ${m3_7}/8192 (${(m3_7/0x2000*100).toFixed(1)}%)`);
console.log(`bank3 vs bank14: ${m3_14}/8192 (${(m3_14/0x2000*100).toFixed(1)}%)`);
console.log(`bank3 vs bank15: ${m3_15}/8192 (${(m3_15/0x2000*100).toFixed(1)}%)`);

// bank4 vs bank7/14/15
const refBank4 = refNsf.slice(128 + 0x8000);
console.log(`\nbank4 大小: ${refBank4.length}`);
if (refBank4.length >= 0x2000) {
  let m4_7 = 0, m4_14 = 0, m4_15 = 0;
  for (let i = 0; i < Math.min(0x2000, refBank4.length); i++) {
    if (refBank4[i] === origBank7[i]) m4_7++;
    if (refBank4[i] === origBank14[i]) m4_14++;
    if (refBank4[i] === origBank15[i]) m4_15++;
  }
  console.log(`bank4 vs bank7: ${m4_7}/${Math.min(0x2000, refBank4.length)}`);
  console.log(`bank4 vs bank14: ${m4_14}/${Math.min(0x2000, refBank4.length)}`);
  console.log(`bank4 vs bank15: ${m4_15}/${Math.min(0x2000, refBank4.length)}`);
}

// 也检查 bank2 是否包含 bank7 的部分数据（偏移对齐可能不同）
console.log('\n=== bank2 滑动窗口搜索 bank7 特征 ===');
// 取 bank7 前 16 字节作为特征
const sig7 = Array.from(origBank7.slice(0, 16));
console.log('bank7 特征:', sig7.map(b => '0x' + b.toString(16).padStart(2, '0')).join(' '));
for (let off = 0; off < 0x2000 - 16; off++) {
  let match = true;
  for (let i = 0; i < 16; i++) {
    if (refBank2[off + i] !== sig7[i]) { match = false; break; }
  }
  if (match) {
    console.log(`bank7 特征在 bank2 offset 0x${off.toString(16)} 找到！`);
    break;
  }
}

// 检查 bank2 的 init routine 位置
console.log('\n=== bank2 结构 ===');
console.log('bank2[0x000-0x010]:', Array.from(refBank2.slice(0, 16)).map(b => '0x' + b.toString(16).padStart(2, '0')).join(' '));
console.log('bank2[0x400-0x410]:', Array.from(refBank2.slice(0x400, 0x410)).map(b => '0x' + b.toString(16).padStart(2, '0')).join(' '));
console.log('bank2[0x420-0x430]:', Array.from(refBank2.slice(0x420, 0x430)).map(b => '0x' + b.toString(16).padStart(2, '0')).join(' '));
console.log('bank2[0x500-0x510]:', Array.from(refBank2.slice(0x500, 0x510)).map(b => '0x' + b.toString(16).padStart(2, '0')).join(' '));
console.log('bank2[0x1000-0x1010]:', Array.from(refBank2.slice(0x1000, 0x1010)).map(b => '0x' + b.toString(16).padStart(2, '0')).join(' '));
console.log('bank2[0x1FF0-0x2000]:', Array.from(refBank2.slice(0x1FF0, 0x2000)).map(b => '0x' + b.toString(16).padStart(2, '0')).join(' '));
