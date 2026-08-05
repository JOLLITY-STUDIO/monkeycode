/**
 * 深度扫描 bank 28 数据寻找球员记录
 * 运行: node _scan_b28.cjs
 */
const fs = require('fs');

// 读取 bank-28-player-attrs-data.ts 完整内容
const dataPath = 'd:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/game-engine/native-game/tsubasa/banks/prg/bank-28-player-attrs-data.ts';
const content = fs.readFileSync(dataPath, 'utf8');

// 提取所有 DATA_ 导出的数据段并拼接
function extractAllDataArrays(src) {
  const result = [];
  const regex = /export const (DATA_\$\w+_\$\w+): readonly number\[\] = \[([\s\S]*?)\];/g;
  let match;
  while ((match = regex.exec(src)) !== null) {
    const name = match[1];
    const body = match[2];
    // Parse numbers from body
    const numbers = [];
    const numRegex = /0x[0-9A-Fa-f]{2}/g;
    let nm;
    while ((nm = numRegex.exec(body)) !== null) {
      numbers.push(parseInt(nm[0], 16));
    }
    result.push({ name, numbers, size: numbers.length });
  }
  return result;
}

const segments = extractAllDataArrays(content);
console.log(`Found ${segments.length} data segments in bank 28`);
console.log('');

// 按 CPU 地址排序并重建 bank 28 8KB 视图
// Bank 28 的 CPU 地址范围: $8000-$9FFF (当 bank 28 在 $8000 窗口时)
const B28_SIZE = 0x2000; // 8192 bytes
const b28 = new Array(B28_SIZE).fill(0xFF);

for (const seg of segments) {
  // 从名称提取地址: DATA_$XXXX_$YYYY → 起始地址 XXXX
  const addrMatch = seg.name.match(/DATA_\$(\w+)_\$\w+/);
  if (!addrMatch) continue;
  const cpuAddr = parseInt(addrMatch[1], 16);
  const offset = cpuAddr - 0x8000; // bank-relative offset
  if (offset < 0 || offset >= B28_SIZE) continue;
  
  for (let i = 0; i < seg.numbers.length; i++) {
    const idx = offset + i;
    if (idx < B28_SIZE) b28[idx] = seg.numbers[i];
  }
}

console.log(`Bank 28 view built: ${b28.filter(b => b !== 0xFF).length} defined bytes`);

// ══════════════════════════════════════════
// 搜索球员记录 (16-byte pattern)
// ══════════════════════════════════════════

function isValidPlayer(arr, start) {
  if (start + 16 > arr.length) return false;
  const jersey = arr[start];
  const pos = arr[start + 5];
  return jersey >= 1 && jersey <= 99 && pos >= 0 && pos <= 3;
}

console.log('');
console.log('=== Scanning Bank 28 for 16-byte Player Records ===');

// 寻找连续有效球员记录的区域
const candidates = [];
for (let off = 0; off + 48 <= B28_SIZE; off++) {
  if (isValidPlayer(b28, off) && isValidPlayer(b28, off + 16) && isValidPlayer(b28, off + 32)) {
    candidates.push(off);
  }
}

console.log(`Found ${candidates.length} regions with 3+ consecutive valid records`);

if (candidates.length > 0) {
  const posNames = ['GK', 'DF', 'MF', 'FW'];
  // 取第一个候选区域
  const base = candidates[0];
  console.log(`\nFirst region at offset 0x${base.toString(16)} (CPU $${(0x8000 + base).toString(16)})`);
  
  for (let i = 0; i < Math.min(5, Math.floor((B28_SIZE - base) / 16)); i++) {
    const off = base + i * 16;
    if (!isValidPlayer(b28, off)) break;
    const jersey = b28[off];
    const name = b28.slice(off + 1, off + 5);
    const pos = b28[off + 5];
    const stats = b28.slice(off + 6, off + 14);
    const flags = (b28[off + 15] << 8) | b28[off + 14];
    console.log(`  Rec ${i}: #${jersey} name=[${name.map(b=>'0x'+b.toString(16)).join(',')}] pos=${posNames[pos]||pos} shot=${stats[0]} spd=${stats[1]} tec=${stats[2]} sta=${stats[3]} pass=${stats[4]} tkl=${stats[5]} hdr=${stats[6]} gk=${stats[7]} flags=0x${flags.toString(16)}`);
  }
} else {
  console.log('No valid 3-record sequences found in bank 28');
  
  // 尝试放宽条件
  console.log('\n--- Relaxed search (jersey 0-99) ---');
  const relaxed = [];
  for (let off = 0; off + 48 <= B28_SIZE; off++) {
    const j0 = b28[off], j1 = b28[off+16], j2 = b28[off+32];
    const p0 = b28[off+5], p1 = b28[off+21], p2 = b28[off+37];
    if (j0 >= 0 && j0 <= 99 && j1 >= 0 && j1 <= 99 && j2 >= 0 && j2 <= 99 &&
        p0 >= 0 && p0 <= 5 && p1 >= 0 && p1 <= 5 && p2 >= 0 && p2 <= 5) {
      relaxed.push(off);
    }
  }
  console.log(`  Relaxed candidates: ${relaxed.length}`);
  if (relaxed.length > 0) {
    console.log(`  First few at offsets: ${relaxed.slice(0,5).map(o => '0x'+o.toString(16)).join(', ')}`);
  }
}

// ══════════════════════════════════════════
// 分析 $842A 指针表的指向 (在 DATA_$842A_$8447 中, 这些数据也在 bank 28)
// ══════════════════════════════════════════
console.log('');
console.log('=== Analyzing $842A Pointer Table (in Bank 28 view) ===');

// DATA_$842A_$8447 (30 bytes) is at offset 0x042A in bank 27, 
// but we're looking at bank 28 at the same offset
const offset842A = 0x042A;
console.log(`Bank 28 at offset 0x042A: ${b28.slice(offset842A, offset842A + 30).map(b => '0x'+b.toString(16)).join(', ')}`);

// Now look at the $9448 area (pointer table from bank 27)
// In bank 28 at offset 0x0448:
const offset8448 = 0x0448;
console.log(`Bank 28 at offset 0x0448 first 40 bytes:`);
for (let r = 0; r < 3; r++) {
  const off = offset8448 + r * 16;
  console.log(`  +0x${(off).toString(16).padStart(4,'0')}: ${b28.slice(off, off+16).map(b => '0x'+b.toString(16).padStart(2,'0')).join(' ')}`);
}

// ══════════════════════════════════════════
// 分析 $9616 区域 (已知的球员属性表)
// ══════════════════════════════════════════
console.log('');
console.log('=== Known Attr Table at $9616 ===');
// First 10 records
for (let i = 0; i < 10; i++) {
  const off = 0x1616 + i * 16;
  if (off + 16 > B28_SIZE) break;
  const bytes = b28.slice(off, off + 16);
  const id = bytes[0];
  console.log(`  Attr ${i}: ID=0x${id.toString(16).padStart(2,'0')} (${id}) attrs=[${bytes.slice(1,12).map(b=>b.toString(16).padStart(2,'0')).join(',')}]`);
}

// ══════════════════════════════════════════
// 区域扫描汇总
// ══════════════════════════════════════════
console.log('');
console.log('=== Summary ===');
console.log(`Total player records (attr table): ~${Math.floor((2104) / 16)}`);
console.log(`Value curve entries: 129 + 45 + 18 = 192`);
console.log(`16-bit value pairs: 82 + 14 = 96`);
