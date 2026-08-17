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
const data = loadBankFromTS(path.join(romDataDir, 'prg-bank-03.ts'));

// ── 按 $FC 切分（模拟 Bank 24 的 SCAN 循环） ──
const records = [];
let start = 0x52; // 跳过前 82 字节的表头
let i = start;
let current = [];
while (i < data.length) {
  if (data[i] === 0xFC) {
    if (current.length > 0) {
      records.push({ offset: start, len: current.length, bytes: [...current] });
    }
    start = i + 1;
    current = [];
  } else {
    current.push(data[i]);
  }
  i++;
}
if (current.length > 0) {
  records.push({ offset: start, len: current.length, bytes: [...current] });
}

// ── 长度分布 ──
const dist = {};
records.forEach(r => { dist[r.len] = (dist[r.len] || 0) + 1; });
const sorted = Object.entries(dist).sort((a,b) => a[1]===b[1] ? a[0]-b[0] : b[1]-a[1]);

console.log('═══════════════════════════════════════════════════════');
console.log('  Bank 03 — $FC 终止记录结构（逆向自 Bank 24 SCAN 循环）');
console.log('═══════════════════════════════════════════════════════\n');

console.log(`表头区域: $0000-$0051 (82 字节) — 指针/索引表，不含 $FC`);
console.log(`记录区域: $0052-$1FFF (${data.length - 0x52} 字节) — ${records.length} 条 $FC 终止记录\n`);

console.log(`记录长度统计:`);
console.log(`  总记录数: ${records.length}`);
console.log(`  最短: ${Math.min(...records.map(r => r.len))}B`);
console.log(`  最长: ${Math.max(...records.map(r => r.len))}B`);
console.log(`  常用长度 (Top):`);
sorted.slice(0, 20).forEach(([len, cnt]) => console.log(`    ${len}B: ${cnt} 条`));

// ── 按第一字节分组（类型标记） ──
const typeGroups = {};
records.forEach(r => {
  const first = r.bytes[0];
  const key = '$' + first.toString(16).padStart(2, '0').toUpperCase();
  if (!typeGroups[key]) typeGroups[key] = { count: 0, lengths: [], samples: [] };
  typeGroups[key].count++;
  typeGroups[key].lengths.push(r.len);
  if (typeGroups[key].samples.length < 3) typeGroups[key].samples.push(r);
});
const sortedTypes = Object.entries(typeGroups).sort((a,b) => b[1].count - a[1].count);

console.log(`\n── 按首字节（记录类型）分组 ──`);
console.log('首字节\t条数\t长度范围\t典型样例');
sortedTypes.forEach(([key, grp]) => {
  const min = Math.min(...grp.lengths);
  const max = Math.max(...grp.lengths);
  const sampleHex = grp.samples[0].bytes.slice(0, 6).map(b => b.toString(16).padStart(2, '0').toUpperCase()).join(' ');
  console.log(`${key}\t${grp.count}\t${min}-${max}B\t${sampleHex}`);
});

// ── 表头分析（前 82 字节） ──
console.log(`\n── 表头区 $0000-0051 详细 ──`);
console.log('可能是 16-bit 指针表（小端序）:');
const header = data.slice(0, 82);
for (let off = 0; off < 82; off += 2) {
  const lo = header[off];
  const hi = header[off + 1] || 0;
  const val = lo | (hi << 8);
  const hex = off.toString(16).padStart(4, '0').toUpperCase();
  console.log(`  ${hex}: ${lo.toString(16).padStart(2,'0')} ${hi.toString(16).padStart(2,'0')} → $${val.toString(16).padStart(4,'0').toUpperCase()} (${val})`);
}
