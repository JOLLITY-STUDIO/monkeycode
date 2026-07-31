/**
 * 从原始 .nes ROM 生成拆分的 rom-data bank 文件
 * 用法: node _convert_nes.cjs
 */
const fs = require('fs');
const path = require('path');

const NES_NAME = 'Captain Tsubasa II - Super Striker (Japan)';
const NES_PATH = path.resolve(__dirname, `roms/${NES_NAME}.nes`);
const OUT_DIR = path.resolve(__dirname, 'rom-data');

const BANK_SIZE = 8192; // 8KB per bank

const buf = fs.readFileSync(NES_PATH);
console.log(`Read ${buf.length} bytes from ${NES_PATH}`);

// 解析 iNES header (16 bytes)
const prg16k = buf[4];
const chr8k  = buf[5];
const mapper = ((buf[6] >> 4) & 0xF) | (buf[7] & 0xF0);
const prgSize = prg16k * 16384;
const chrSize = chr8k  * 8192;

const prgBankCount = prgSize / BANK_SIZE; // 32
const chrBankCount = chrSize / BANK_SIZE; // 16
const HEADER_SIZE = 16;

console.log(`Mapper: ${mapper}, PRG: ${prg16k}×16KB (${prgBankCount}×8KB), CHR: ${chr8k}×8KB (${chrBankCount}×8KB)`);

// 确保输出目录存在
fs.mkdirSync(OUT_DIR, { recursive: true });

// ----- 格式化 helper -----
function formatUint8Array(bytes) {
  const lines = [];
  for (let i = 0; i < bytes.length; i += 16) {
    const chunk = [];
    const end = Math.min(i + 16, bytes.length);
    for (let j = i; j < end; j++) {
      chunk.push('0x' + bytes[j].toString(16).padStart(2, '0').toUpperCase());
    }
    lines.push('  ' + chunk.join(', ') + ',');
  }
  return lines.join('\n');
}

// ----- 生成 PRG bank 文件 -----
console.log('\nGenerating PRG bank files...');
for (let i = 0; i < prgBankCount; i++) {
  const start = i * BANK_SIZE;
  const bankData = buf.slice(HEADER_SIZE + start, HEADER_SIZE + start + BANK_SIZE);
  const content = `/** PRG-ROM Bank ${String(i).padStart(2, '0')} (8KB) — 自动生成 */\n` +
    `const PRG_BANK_${String(i).padStart(2, '0')}: readonly number[] = [\n` +
    formatUint8Array(bankData) + '\n];\n' +
    `export default PRG_BANK_${String(i).padStart(2, '0')};\n`;
  const outPath = path.join(OUT_DIR, `prg-bank-${String(i).padStart(2, '0')}.ts`);
  fs.writeFileSync(outPath, content);
}
console.log(`  ${prgBankCount} PRG banks written`);

// ----- 生成 CHR bank 文件 -----
console.log('Generating CHR bank files...');
const chrOffset = HEADER_SIZE + prgSize;
for (let i = 0; i < chrBankCount; i++) {
  const start = i * BANK_SIZE;
  const bankData = buf.slice(chrOffset + start, chrOffset + start + BANK_SIZE);
  const content = `/** CHR-ROM Bank ${String(i).padStart(2, '0')} (8KB) — 自动生成 */\n` +
    `const CHR_BANK_${String(i).padStart(2, '0')}: readonly number[] = [\n` +
    formatUint8Array(bankData) + '\n];\n' +
    `export default CHR_BANK_${String(i).padStart(2, '0')};\n`;
  const outPath = path.join(OUT_DIR, `chr-bank-${String(i).padStart(2, '0')}.ts`);
  fs.writeFileSync(outPath, content);
}
console.log(`  ${chrBankCount} CHR banks written`);

// ----- 生成聚合 index.ts -----
console.log('Generating index.ts...');
let indexContent = `/**\n * ROM 数据聚合 — 从原始 .nes 文件自动生成\n * 来源: ${NES_NAME}\n * Mapper: ${mapper} (MMC3)\n * PRG: ${prgBankCount} × 8KB, CHR: ${chrBankCount} × 8KB\n * 自动生成，请勿手动编辑。\n */\n\n`;

// Import PRG banks
for (let i = 0; i < prgBankCount; i++) {
  const pad = String(i).padStart(2, '0');
  indexContent += `import _prg${pad} from './prg-bank-${pad}';\n`;
}
indexContent += '\n';

// Import CHR banks
for (let i = 0; i < chrBankCount; i++) {
  const pad = String(i).padStart(2, '0');
  indexContent += `import _chr${pad} from './chr-bank-${pad}';\n`;
}
indexContent += '\n';

// Build PRG
indexContent += `/** 完整 PRG-ROM (${prgBankCount} × 8KB = ${prgSize} bytes) */\n`;
indexContent += 'export const NES_PRG_ROM: readonly number[] = [\n';
for (let i = 0; i < prgBankCount; i++) {
  const pad = String(i).padStart(2, '0');
  indexContent += `  ..._prg${pad},\n`;
}
indexContent += '];\n\n';

// Build CHR
indexContent += `/** 完整 CHR-ROM (${chrBankCount} × 8KB = ${chrSize} bytes) */\n`;
indexContent += 'export const NES_CHR_ROM: readonly number[] = [\n';
for (let i = 0; i < chrBankCount; i++) {
  const pad = String(i).padStart(2, '0');
  indexContent += `  ..._chr${pad},\n`;
}
indexContent += '];\n\n';

// Constants
indexContent += `/** PRG-ROM 总大小 (bytes) */\n`;
indexContent += `export const PRG_ROM_SIZE = ${prgSize};\n\n`;
indexContent += `/** CHR-ROM 总大小 (bytes) */\n`;
indexContent += `export const CHR_ROM_SIZE = ${chrSize};\n\n`;
indexContent += `/** Mapper 编号 */\n`;
indexContent += `export const NES_MAPPER = ${mapper};\n`;

const indexPath = path.join(OUT_DIR, 'index.ts');
fs.writeFileSync(indexPath, indexContent);
console.log(`  index.ts written`);

console.log(`\nDone! All files in: ${OUT_DIR}`);
