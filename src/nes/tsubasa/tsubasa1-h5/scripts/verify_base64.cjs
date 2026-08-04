/**
 * 验证 base64 嵌入数据与原始 chr-data.json 的一致性
 *
 * 用法: node scripts/verify_base64.cjs
 */
const fs = require('fs');
const path = require('path');

const JSON_PATH = path.join(__dirname, '..', 'src', 'data', 'chr-data.json');
const TS_PATH = path.join(__dirname, '..', 'src', 'data', 'chrBinary.ts');

// 1. 从 JSON 加载原始数据
const chrBanks = JSON.parse(fs.readFileSync(JSON_PATH, 'utf-8'));
console.log(`JSON: ${chrBanks.length} banks`);

// 2. 从 TS 文件提取 base64 字符串
const tsContent = fs.readFileSync(TS_PATH, 'utf-8');
const base64Match = tsContent.match(/export const CHR_BASE64 = \[([\s\S]*?)\]\.join\(''\);/);
if (!base64Match) {
  console.error('Failed to extract CHR_BASE64 from chrBinary.ts');
  process.exit(1);
}
// 提取所有字符串片段并拼接
const chunks = base64Match[1].match(/'([^']*)'/g).map(s => s.slice(1, -1));
const base64 = chunks.join('');
console.log(`Base64: ${base64.length} chars`);

// 3. 解码 base64 → Buffer
const packed = Buffer.from(base64, 'base64');
console.log(`Packed: ${packed.length} bytes`);

// 4. 逐 bank 对比
let mismatches = 0;
let firstMismatch = null;
for (let bi = 0; bi < 32; bi++) {
  const bank = chrBanks[bi];
  const start = bi * 4096;
  for (let i = 0; i < 4096; i++) {
    const expected = bank[i];
    const actual = packed[start + i];
    if (expected !== actual) {
      mismatches++;
      if (!firstMismatch) {
        firstMismatch = { bank: bi, offset: i, expected, actual };
      }
    }
  }
}

if (mismatches === 0) {
  console.log('✅ VERIFIED: All 131072 bytes match!');
} else {
  console.error(`❌ MISMATCH: ${mismatches} bytes differ`);
  console.error(`  First: bank=${firstMismatch.bank} offset=${firstMismatch.offset} expected=${firstMismatch.expected} actual=${firstMismatch.actual}`);
  process.exit(1);
}
