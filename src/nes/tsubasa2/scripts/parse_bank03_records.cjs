/**
 * 模拟 $A72C 迭代器读取 Bank 03 数据
 * 输出: 4字节记录、2字节记录、以及各种格式尝试
 * 用法: node scripts/parse_bank03_records.cjs
 */
const fs = require('fs');
const path = require('path');

const BANK_SIZE = 8192;

// 从 TS 文件加载字节数组
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

console.log('═'.repeat(70));
console.log('  Bank 03 — 数据记录解析');
console.log('═'.repeat(70));

// ============================================================
// 1. 按 4 字节记录切分（$A72C 输出格式）
// ============================================================
console.log('\n' + '─'.repeat(70));
console.log('  1. 4字节记录视图（前 40 条）');
console.log('─'.repeat(70));

for (let i = 0; i < Math.min(40, Math.floor(BANK_SIZE / 4)); i++) {
  const off = i * 4;
  const b0 = bank03[off];
  const b1 = bank03[off + 1];
  const b2 = bank03[off + 2];
  const b3 = bank03[off + 3];

  const val0 = b0 | (b1 << 8);  // LE 16-bit
  const val1 = b2 | (b3 << 8);  // LE 16-bit
  const hex = `${b0.toString(16).toUpperCase().padStart(2,'0')} ${b1.toString(16).toUpperCase().padStart(2,'0')} ${b2.toString(16).toUpperCase().padStart(2,'0')} ${b3.toString(16).toUpperCase().padStart(2,'0')}`;
  console.log(`  [${String(i).padStart(3)}] @$${(off).toString(16).toUpperCase().padStart(4,'0')}  ${hex}  →  16bit: [${String(val0).padStart(5)}, ${String(val1).padStart(5)}]  int8: [${String(b0).padStart(3)}, ${String(b1).padStart(3)}, ${String(b2).padStart(3)}, ${String(b3).padStart(3)}]`);
}

// ============================================================
// 2. 搜索可能的记录分隔符
// ============================================================
console.log('\n' + '─'.repeat(70));
console.log('  2. 特殊分隔字节搜索');
console.log('─'.repeat(70));

// NES 游戏常用分隔符
const markers = {
  '$00': 0x00, '$FC': 0xFC, '$FD': 0xFD, '$FE': 0xFE, '$FF': 0xFF
};

for (const [name, val] of Object.entries(markers)) {
  const positions = [];
  for (let i = 0; i < BANK_SIZE; i++) {
    if (bank03[i] === val) positions.push(i);
  }
  if (positions.length > 0) {
    // 检查间隔是否规律
    const gaps = [];
    for (let i = 1; i < positions.length; i++) gaps.push(positions[i] - positions[i-1]);
    const gapFreq = {};
    gaps.forEach(g => gapFreq[g] = (gapFreq[g] || 0) + 1);
    const topGaps = Object.entries(gapFreq).sort((a,b) => b[1]-a[1]).slice(0, 5);
    console.log(`  ${name}: 出现 ${positions.length} 次`);
    console.log(`    前10位置: [${positions.slice(0,10).map(p => '0x'+p.toString(16).toUpperCase().padStart(4,'0')).join(', ')}]`);
    console.log(`    常见间隔: ${topGaps.map(([g,c]) => `${g}(${c}次)`).join(', ')}`);
  }
}

// ============================================================
// 3. 按 $FC 分隔符切分（$FC 是最高频非零字节）
// ============================================================
console.log('\n' + '─'.repeat(70));
console.log('  3. 按 $FC 分隔符解析（$FC 前12个块）');
console.log('─'.repeat(70));

const fcPositions = [];
for (let i = 0; i < BANK_SIZE; i++) {
  if (bank03[i] === 0xFC) fcPositions.push(i);
}

for (let i = 0; i < Math.min(12, fcPositions.length); i++) {
  const start = fcPositions[i] + 1;
  const end = i + 1 < fcPositions.length ? fcPositions[i + 1] : start + 32;
  const chunk = bank03.slice(start, Math.min(end, BANK_SIZE));
  if (chunk.length > 1) {
    const hex = chunk.slice(0, Math.min(32, chunk.length))
      .map(b => b.toString(16).toUpperCase().padStart(2,'0')).join(' ');
    const ascii = chunk.slice(0, Math.min(32, chunk.length))
      .map(b => (b >= 0x20 && b <= 0x7E) ? String.fromCharCode(b) : '.').join('');
    const vals = [];
    for (let j = 0; j + 1 < chunk.length; j += 2) {
      vals.push(chunk[j] | (chunk[j + 1] << 8));
    }
    console.log(`  [$FC#${String(i).padStart(2)}] @$${start.toString(16).toUpperCase().padStart(4,'0')} len=${chunk.length}`);
    console.log(`    hex: ${hex}${chunk.length > 32 ? '...' : ''}`);
    if (ascii.trim().length > 0) console.log(`    ascii: "${ascii}"${chunk.length > 32 ? '...' : ''}`);
    if (vals.length > 0) console.log(`    16bit vals: [${vals.join(', ')}]${chunk.length > 32 ? '...' : ''}`);
  }
}

// ============================================================
// 4. 按 NES 文本字符串模式搜索
// ============================================================
console.log('\n' + '─'.repeat(70));
console.log('  4. NES 文本字符串搜索（0x20-0x5A ABC大写字幕范围, >=4字符）');
console.log('─'.repeat(70));

let strLen = 0, strStart = -1;
for (let i = 0; i < BANK_SIZE; i++) {
  const b = bank03[i];
  // NES 常见文本: 英文字母 A-Z (0x41-0x5A) 或 日文片假名映射
  if ((b >= 0x41 && b <= 0x5A) || (b >= 0x20 && b <= 0x3F) || b >= 0x80) {
    if (strLen === 0) strStart = i;
    strLen++;
  } else {
    if (strLen >= 4) {
      // 尝试解码
      const chunk = bank03.slice(strStart, strStart + strLen);
      const raw = chunk.map(b => {
        if (b >= 0x41 && b <= 0x5A) return String.fromCharCode(b);
        if (b >= 0x20 && b <= 0x3F) return String.fromCharCode(b);
        return `<${b.toString(16).toUpperCase().padStart(2,'0')}>`;
      }).join('');
      console.log(`  @$${strStart.toString(16).toUpperCase().padStart(4,'0')} (${strLen}B): "${raw}"`);
    }
    strLen = 0;
    strStart = -1;
  }
}

// ============================================================
// 5. 与前 8 字节对齐做 XOR 尝试看规律
// ============================================================
console.log('\n' + '─'.repeat(70));
console.log('  5. 统计特性');
console.log('─'.repeat(70));

// 按 4 字节对齐的 nibble 分布
const nibbleFreq = new Array(16).fill(0);
for (const b of bank03) {
  nibbleFreq[b >> 4]++;
  nibbleFreq[b & 0xF]++;
}
const totalNibbles = BANK_SIZE * 2;
for (let i = 0; i < 16; i++) {
  const pct = ((nibbleFreq[i] / totalNibbles) * 100).toFixed(1);
  const bar = '█'.repeat(Math.round(nibbleFreq[i] / totalNibbles * 100));
  console.log(`  0x${i.toString(16).toUpperCase()}: ${String(nibbleFreq[i]).padStart(5)} (${pct}%) ${bar}`);
}

// ============================================================
// 6. 按 8 字节对齐搜索第一个非零字节的模式
// ============================================================
console.log('\n' + '─'.repeat(70));
console.log('  6. 8字节块 前2字节分布（可能是记录类型/标签）');
console.log('─'.repeat(70));

const types8 = {};
for (let off = 0; off + 7 < BANK_SIZE; off += 8) {
  const key = `${bank03[off].toString(16).toUpperCase().padStart(2,'0')} ${bank03[off+1].toString(16).toUpperCase().padStart(2,'0')}`;
  types8[key] = (types8[key] || 0) + 1;
}
const sortedTypes = Object.entries(types8).sort((a,b) => b[1]-a[1]).slice(0, 20);
console.log('  最常出现的前2字节:');
sortedTypes.forEach(([k, c]) => {
  console.log(`    "${k}": ${c} 次`);
});

console.log('\n' + '═'.repeat(70));
console.log('  分析完成');
console.log('═'.repeat(70));
