/**
 * 将 chr-data.json (32 banks × 4096 bytes) 转换为 base64 字符串嵌入 TS 文件
 *
 * 原因: 微信小程序不支持 require() 加载 JSON 文件。
 * 方案: 将 128KB CHR 二进制 → base64 字符串 (~171KB TS 源码) 嵌入 .ts 文件。
 *
 * 用法: node scripts/generate_chr_base64.cjs
 * 输出: src/data/chrBinary.ts (base64 字符串常量)
 */
const fs = require('fs');
const path = require('path');

const JSON_PATH = path.join(__dirname, '..', 'src', 'data', 'chr-data.json');
const OUTPUT_PATH = path.join(__dirname, '..', 'src', 'data', 'chrBinary.ts');
const BANK_COUNT = 32;
const BANK_SIZE = 4096; // 4KB per bank

// 1. 读取 JSON
console.log('Reading chr-data.json...');
const chrBanks = JSON.parse(fs.readFileSync(JSON_PATH, 'utf-8'));

if (!Array.isArray(chrBanks) || chrBanks.length !== BANK_COUNT) {
  console.error(`Expected ${BANK_COUNT} banks, got ${chrBanks.length}`);
  process.exit(1);
}

// 2. 打包为连续 Uint8Array (128KB)
const totalSize = BANK_COUNT * BANK_SIZE;
const packed = Buffer.alloc(totalSize);
let offset = 0;
for (let bi = 0; bi < BANK_COUNT; bi++) {
  const bank = chrBanks[bi];
  if (bank.length !== BANK_SIZE) {
    console.error(`Bank ${bi} has ${bank.length} bytes, expected ${BANK_SIZE}`);
    process.exit(1);
  }
  for (let i = 0; i < BANK_SIZE; i++) {
    packed[offset + i] = bank[i] & 0xFF;
  }
  offset += BANK_SIZE;
}

// 3. Base64 编码
const base64 = packed.toString('base64');
console.log(`Packed: ${totalSize} bytes → ${base64.length} chars base64`);

// 4. 分块写入 TS 文件 (每行 80 字符，避免编辑器卡顿)
const CHUNK_SIZE = 80;
const chunks = [];
for (let i = 0; i < base64.length; i += CHUNK_SIZE) {
  chunks.push(base64.slice(i, i + CHUNK_SIZE));
}

const tsContent = `/**
 * CHR Binary Data - Base64 encoded
 *
 * 自动生成，请勿手动编辑。
 * 来源: chr-data.json (32 banks × 4096 bytes = 131072 bytes)
 * 生成脚本: scripts/generate_chr_base64.cjs
 *
 * 运行时解码: TileStore.init() 使用 atob → Uint8Array
 */
export const CHR_BASE64 = [
${chunks.map(c => `  '${c}'`).join(',\n')}
].join('');

/** CHR 总字节数 */
export const CHR_RAW_SIZE = ${totalSize};

/** CHR Bank 数量 */
export const CHR_BANK_COUNT = ${BANK_COUNT};

/** 每个 Bank 字节数 */
export const CHR_BANK_SIZE = ${BANK_SIZE};
`;

fs.writeFileSync(OUTPUT_PATH, tsContent, 'utf-8');
const outSize = fs.statSync(OUTPUT_PATH).size;
console.log(`Written to ${OUTPUT_PATH} (${(outSize / 1024).toFixed(1)} KB)`);
console.log('Done!');
