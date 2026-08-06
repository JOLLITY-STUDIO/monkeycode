/**
 * 分析 Bank 03 (球员属性数据) 的数据结构
 * 用法: node scripts/analyze_bank03.cjs
 */
const fs = require('fs');
const path = require('path');

const BANK_SIZE = 8192;

// 从 TypeScript 文件直接解析字节数组
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
const bank04 = loadBankFromTS(path.join(romDataDir, 'prg-bank-04.ts'));

console.log('═'.repeat(70));
console.log('  Bank 03 & 04 数据结构分析');
console.log('═'.repeat(70));

// ============================================================
// 1. 先看 Bank 03 开头 — 看起来像指针表
// ============================================================
console.log('\n' + '─'.repeat(70));
console.log('  1. Bank 03 指针表 (16-bit LE ptrs within bank)');
console.log('─'.repeat(70));

const ptrs = [];
for (let i = 0; i < 128; i++) {
  const addr = bank03[i * 2] | (bank03[i * 2 + 1] << 8);
  if (addr >= 0x8000 && addr <= 0xBFFF) {
    ptrs.push({ index: i, addr, offset: addr - 0x8000 });
  } else {
    ptrs.push({ index: i, addr, offset: addr - 0x8000 });
  }
}

// 显示前 40 个指针
for (let i = 0; i < Math.min(40, ptrs.length); i++) {
  const p = ptrs[i];
  const marker = p.offset >= 0 && p.offset < BANK_SIZE ? '' : ' ← OUT OF RANGE';
  console.log(`  [${String(i).padStart(3)}]  $${p.addr.toString(16).toUpperCase().padStart(4,'0')}  (offset: $${p.offset.toString(16).toUpperCase().padStart(4,'0')})${marker}`);
}

// 统计指针跳转的 gap 分布 (每个数据块的大小)
console.log('\n  --- 数据块大小分析 (指针间隔) ---');
const gaps = [];
for (let i = 1; i < ptrs.length; i++) {
  if (ptrs[i].offset > 0 && ptrs[i - 1].offset > 0 && ptrs[i].offset > ptrs[i - 1].offset) {
    gaps.push(ptrs[i].offset - ptrs[i - 1].offset);
  }
}
if (gaps.length > 0) {
  const minGap = Math.min(...gaps);
  const maxGap = Math.max(...gaps);
  const avgGap = Math.round(gaps.reduce((a, b) => a + b, 0) / gaps.length);
  const freq = {};
  gaps.forEach(g => freq[g] = (freq[g] || 0) + 1);
  const sortedFreq = Object.entries(freq).sort((a, b) => b[1] - a[1]);
  console.log(`  最小 gap: ${minGap}B, 最大: ${maxGap}B, 平均: ${avgGap}B`);
  console.log('  最常见 gap:');
  sortedFreq.slice(0, 10).forEach(([size, count]) => {
    const bar = '█'.repeat(Math.min(count, 40));
    console.log(`    ${String(size).padStart(3)}B: ${String(count).padStart(2)} ${bar}`);
  });
}

// ============================================================
// 2. 按最常见的数据块大小分块分析
// ============================================================
const mostCommonSize = parseInt(sortedFreq[0][0]);
console.log('\n' + '─'.repeat(70));
console.log(`  2. 按 ${mostCommonSize} 字节分块 — 前 20 个数据块`);
console.log('─'.repeat(70));

for (let b = 0; b < Math.min(20, ptrs.length); b++) {
  const offset = ptrs[b].offset;
  if (offset < 0 || offset >= BANK_SIZE) continue;

  const chunk = bank03.slice(offset, Math.min(offset + mostCommonSize, BANK_SIZE));
  const hex = chunk.map(b => b.toString(16).toUpperCase().padStart(2, '0')).join(' ');

  // 按不同解释显示
  let ascii = '';
  for (const byte of chunk) {
    ascii += (byte >= 0x20 && byte <= 0x7E) ? String.fromCharCode(byte) : '.';
  }

  // 解析为 16-bit values
  const vals16 = [];
  for (let i = 0; i + 1 < chunk.length; i += 2) {
    vals16.push(chunk[i] | (chunk[i + 1] << 8));
  }
  const vals16Str = vals16.map(v => v.toString(10).padStart(5)).join(' ');

  console.log(`  [${String(b).padStart(3)}] @$${offset.toString(16).toUpperCase().padStart(4,'0')}: ${hex}`);
  console.log(`      16bit: ${vals16Str}`);
  console.log(`      ASCII: ${ascii}`);
}

// ============================================================
// 3. 比较 Bank 03 和 Bank 04 的开头
// ============================================================
console.log('\n' + '─'.repeat(70));
console.log('  3. Bank 03 vs Bank 04 — 格式对比');
console.log('─'.repeat(70));
console.log('  Bank 03 开头 32B: ' + bank03.slice(0, 32).map(b => b.toString(16).toUpperCase().padStart(2, '0')).join(' '));
console.log('  Bank 04 开头 32B: ' + bank04.slice(0, 32).map(b => b.toString(16).toUpperCase().padStart(2, '0')).join(' '));

// 检查 Bank 04 是否也是指针表
console.log('\n  Bank 04 指针表 (前 32 项):');
for (let i = 0; i < 32; i++) {
  const addr = bank04[i * 2] | (bank04[i * 2 + 1] << 8);
  const offset = addr - 0x8000;
  const marker = offset >= 0 && offset < BANK_SIZE ? '' : ' ← OUT OF RANGE';
  console.log(`  [${String(i).padStart(2)}] $${addr.toString(16).toUpperCase().padStart(4,'0')} (offset:$${offset.toString(16).toUpperCase().padStart(4,'0')})${marker}`);
}

// ============================================================
// 4. 字节值分布统计
// ============================================================
console.log('\n' + '─'.repeat(70));
console.log('  4. Bank 03 字节值分布 (0x00-0xFF)');
console.log('─'.repeat(70));

const freq03 = new Array(256).fill(0);
for (const b of bank03) freq03[b]++;

// 显示非零频率
const nonZero = freq03.map((c, i) => ({ val: i, count: c })).filter(x => x.count > 0).sort((a, b) => b.count - a.count);
console.log('  Top 20 最常见字节:');
nonZero.slice(0, 20).forEach(x => {
  console.log(`    $${x.val.toString(16).toUpperCase().padStart(2,'0')} (${String(x.val).padStart(3)}): ${String(x.count).padStart(3)}`);
});

// 特别关注 0x00 字节
console.log(`  \n  0x00 出现次数: ${freq03[0]} (${((freq03[0]/BANK_SIZE)*100).toFixed(1)}%)`);
console.log(`  0xFF 出现次数: ${freq03[255]} (${((freq03[255]/BANK_SIZE)*100).toFixed(1)}%)`);

// ============================================================
// 5. 搜索特殊模式
// ============================================================
console.log('\n' + '─'.repeat(70));
console.log('  5. 特殊模式搜索');
console.log('─'.repeat(70));

// 搜索连续的 16-bit 小整数序列 (可能的能力值 0-99)
console.log('  搜索连续小数值 (< 100) 的区域:');
let seqLength = 0;
let seqStart = -1;
const sequences = [];
for (let i = 0; i + 1 < bank03.length; i += 2) {
  const val = bank03[i] | (bank03[i + 1] << 8);
  if (val < 100 && val > 0) {
    if (seqLength === 0) seqStart = i;
    seqLength++;
  } else {
    if (seqLength >= 3) sequences.push({ start: seqStart, len: seqLength, vals: [] });
    seqLength = 0;
    seqStart = -1;
  }
}
sequences.sort((a, b) => b.len - a.len);
sequences.slice(0, 5).forEach(seq => {
  const vals = [];
  for (let i = 0; i < Math.min(seq.len, 20); i++) {
    vals.push(bank03[seq.start + i * 2] | (bank03[seq.start + i * 2 + 1] << 8));
  }
  console.log(`  @$${seq.start.toString(16).toUpperCase().padStart(4,'0')}: ${seq.len} 连续小值: [${vals.join(', ')}]${seq.len > 20 ? '...' : ''}`);
});

// 搜索连续的字节序列(类似名字字符串的 ASCII 范围 0x20-0x5A)
console.log('\n  搜索可打印 ASCII 序列 (> 4 个连续可打印字符):');
let asciiLen = 0;
let asciiStart = -1;
for (let i = 0; i < bank03.length; i++) {
  const b = bank03[i];
  if (b >= 0x20 && b <= 0x7E) {
    if (asciiLen === 0) asciiStart = i;
    asciiLen++;
  } else {
    if (asciiLen >= 4) {
      const str = bank03.slice(asciiStart, asciiStart + asciiLen).map(b => String.fromCharCode(b)).join('');
      console.log(`  @$${asciiStart.toString(16).toUpperCase().padStart(4,'0')}: "${str}"`);
    }
    asciiLen = 0;
    asciiStart = -1;
  }
}

console.log('\n' + '═'.repeat(70));
console.log('  分析完成');
console.log('═'.repeat(70));
