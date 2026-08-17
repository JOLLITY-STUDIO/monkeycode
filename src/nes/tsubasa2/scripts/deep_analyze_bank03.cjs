const fs = require('fs');
const path = require('path');

function loadBankFromTS(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const match = content.match(/=\s*\[([\s\S]*?)\];/m);
  if (!match) throw new Error('Cannot parse: ' + filePath);
  const bytesMatch = match[1].match(/0x[0-9A-Fa-f]{2}/g);
  if (!bytesMatch) throw new Error('No hex bytes found');
  return bytesMatch.map(b => parseInt(b, 16));
}

const romDataDir = path.join(__dirname, '..', 'rom-data');
const bank03 = loadBankFromTS(path.join(romDataDir, 'prg-bank-03.ts'));

// ── 模拟 $A72C 真实迭代 ──
// 参数（来自 bank_02.asm 调用点 0x004722: JSR $A72C）
//   ram_00E9 = A  (mask=$03, X=0x1C=28, ED=$02, EC=$FF, A=$F6)
// 实际上有多次调用，我们模拟最典型的 mask=$03 那次

function simulateA72C(data, mask, stepLo, stepHi, xCount, recordType) {
  // 16-bit 指针 (ram_04E4 低, ram_04E7 高)
  let ptrLo = 0;
  let ptrHi = 0x20; // Bank 03 映射起始
  const records = [];
  let counter = 0;

  for (let i = 0; i < xCount; i++) {
    ptrLo += stepLo;
    ptrHi += stepHi;
    // 如果 stepHi=$FF, 每次 $2000→$1FFF→... 等效于page变化
    // 简化：ptrLo + ptrHi*256 作为实际 Byte 索引
    const maskCheck = ptrHi & mask;
    if (maskCheck !== 0) {
      // skip
      continue;
    }
    // 从 data 流中取字节
    const idx = counter; // 简化：每成功一次取 data[counter]
    if (idx >= data.length) break;
    const valLo = data[idx];
    records.push({
      type: recordType.toString(16).toUpperCase(),
      valLo: valLo,
      valLoHex: valLo.toString(16).padStart(2, '0').toUpperCase(),
      page: ptrHi,
      index: idx,
    });
    counter++;
  }
  return { records, total: xCount, written: records.length };
}

// ── 实际调用参数（从 bank_02.asm 提取） ──
console.log('═══════════════════════════════════════════════════════════');
console.log('  Bank 03 — 从 $A72C 迭代器的真实视角');
console.log('═══════════════════════════════════════════════════════════\n');

// 调用 1: mask=$03, X=$1C (28次), ED=$02, EC=$FF, A=$F6
//   这个在 0x004722
const r1 = simulateA72C(bank03, 0x03, 0x02, 0xFF, 28, 0xF6);
console.log('【调用1】mask=$03, X=$1C(28), 步进=$FF02, 类型=$F6');
console.log(`  写入 ${r1.written} 条 / 共 ${r1.total} 次迭代`);
console.log(`  前10条:`, r1.records.slice(0, 10).map(r => `$${r.valLoHex}`).join(' '));

// 如果 mask=$03, 每 4 次写 1 条，
// 用 data[counter] 方式就是 0,1,2,3... 连续取
// 实际上 Bank 03 被 $A72C 跨bank交织读

// 更精确的模拟：Bank 03 被当作连续字节流
// 每个 $A72C 调用读取 X 个位置，但大部分被 mask 跳过
// 
// 让我们看 Bank 03 的前 N 个字节作为 A72C 的输出

console.log('\n── Bank 03 作为 A72C 连续流（前 128 字节）──');
const hexLine = [];
for (let i = 0; i < 128; i++) {
  hexLine.push(bank03[i].toString(16).padStart(2, '0').toUpperCase());
  if ((i + 1) % 32 === 0) {
    console.log(`  ${hexLine.join(' ')}`);
    hexLine.length = 0;
  }
}

// ── 分析 Bank 03 + 04 的跨 bank 交织 ──
console.log('\n── Bank 03 开头字节模式分析 ──');

// 前 82 字节（$00-$51）非常密集，没有 $FC
console.log(`Bank 03 开头 82 字节:`);
for (let off = 0; off < 82; off += 16) {
  const slice = bank03.slice(off, off + 16);
  const hex = slice.map(b => b.toString(16).padStart(2, '0').toUpperCase()).join(' ');
  const ascii = slice.map(b => (b >= 32 && b <= 126) ? String.fromCharCode(b) : '.').join('');
  console.log(`  $${off.toString(16).padStart(4, '0')}: ${hex.padEnd(48)} ${ascii}`);
}

// ── 核心问题：$FC 在 Bank 03 的真实含义 ──
const fcPositions = [];
for (let i = 0; i < bank03.length; i++) {
  if (bank03[i] === 0xFC) fcPositions.push(i);
}
console.log(`\n── $FC 出现在 Bank 03 的 353 个位置 ──`);
console.log(`  前 30 个:`, fcPositions.slice(0, 30).map(p => '$' + p.toString(16).toUpperCase()).join(' '));
console.log(`  间隔分析:`);
const gaps = [];
for (let i = 1; i < fcPositions.length; i++) {
  gaps.push(fcPositions[i] - fcPositions[i - 1]);
}
const gapDist = {};
gaps.forEach(g => { gapDist[g] = (gapDist[g] || 0) + 1; });
const sortedGaps = Object.entries(gapDist).sort((a, b) => b[1] - a[1]).slice(0, 15);
console.log(`  间隔分布 (Top 15):`);
sortedGaps.forEach(([gap, cnt]) => console.log(`    ${gap}B 间隔: ${cnt} 次`));
