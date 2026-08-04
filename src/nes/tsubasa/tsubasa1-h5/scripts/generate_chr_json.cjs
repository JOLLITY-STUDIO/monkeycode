/**
 * 将 32 个 chr-bank-XX.ts 文件的 hex 数据合并为单个 JSON 文件
 * 原因: 微信小程序 TS 编译器无法处理 ~800KB 的 TS hex 数组导入
 *
 * 用法: node scripts/generate_chr_json.cjs
 */
const fs = require('fs');
const path = require('path');

const CHR_DIR = path.join(__dirname, '..', 'src', 'data', 'chr');
const OUTPUT = path.join(__dirname, '..', 'src', 'data', 'chr-data.json');

const files = fs.readdirSync(CHR_DIR)
  .filter(f => f.startsWith('chr-bank-') && f.endsWith('.ts'))
  .sort();

console.log(`Found ${files.length} chr-bank files`);

const allBanks = [];

for (const file of files) {
  const content = fs.readFileSync(path.join(CHR_DIR, file), 'utf-8');
  // 提取 export const CHR_BANK_XX: number[] = [ ... ];
  const match = content.match(/export const CHR_BANK_\w+\s*:\s*number\[\]\s*=\s*\[([\s\S]*?)\];/);
  if (!match) {
    console.error(`Failed to parse ${file}`);
    process.exit(1);
  }
  // 解析 hex 值 (0xNN 格式)
  const hexValues = match[1].match(/0x[0-9a-fA-F]{2}/g);
  if (!hexValues || hexValues.length !== 4096) {
    console.error(`${file}: expected 4096 values, got ${hexValues ? hexValues.length : 0}`);
    process.exit(1);
  }
  const bank = hexValues.map(h => parseInt(h, 16));
  allBanks.push(bank);
}

console.log(`Total banks: ${allBanks.length}`);
console.log(`Total bytes: ${allBanks.length * 4096}`);

// 写入 JSON (紧凑格式)
fs.writeFileSync(OUTPUT, JSON.stringify(allBanks));
const outSize = fs.statSync(OUTPUT).size;
console.log(`Written to ${OUTPUT} (${(outSize / 1024).toFixed(1)} KB)`);
