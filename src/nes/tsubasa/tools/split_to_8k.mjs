/**
 * 将 prg_banks/ 下 16 个 16KB bank 文件拆成 32 个 8KB MMC3 bank 文件
 * 
 * bank_0.ts → bank_00.ts (前半 8KB) + bank_01.ts (后半 8KB)
 * bank_1.ts → bank_02.ts + bank_03.ts
 * ...
 * bank_15.ts → bank_30.ts + bank_31.ts
 */

import { readFileSync, writeFileSync, unlinkSync, existsSync, readdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const bankDir = resolve(__dirname, '..', 'src', 'tsnes', 'tsubasa-code', 'prg_banks');

const BYTES_PER_LINE = 64;

function parseBankFile(filePath) {
  const text = readFileSync(filePath, 'utf-8');
  // 提取所有 0x?? 形式的十六进制数
  const matches = text.matchAll(/0x([0-9A-Fa-f]{2})/g);
  return Array.from(matches, m => parseInt(m[1], 16));
}

function formatBankFile(bankNum, bytes) {
  const lines = [];
  for (let i = 0; i < bytes.length; i += BYTES_PER_LINE) {
    const line = bytes.slice(i, i + BYTES_PER_LINE)
      .map(b => '0x' + b.toString(16).padStart(2, '0').toUpperCase())
      .join(',');
    lines.push(`  ${line}`);
  }

  const paddedNum = String(bankNum).padStart(2, '0');
  return `/**
 * PRG-ROM MMC3 bank ${paddedNum} (8KB) — auto-split from 16KB banks
 * Mapper: 4 (MMC3)
 */

const _PRG_BANK_${paddedNum}: readonly number[] = [
${lines.join(',\n')}
];

export default _PRG_BANK_${paddedNum};
`;
}

console.log(`Reading bank files from ${bankDir}...`);

const oldFiles = [];
const newFileEntries = [];

for (let n = 0; n < 16; n++) {
  const oldPath = resolve(bankDir, `bank_${n}.ts`);
  if (!existsSync(oldPath)) {
    console.warn(`  ⚠ bank_${n}.ts not found, skipping`);
    continue;
  }
  
  const allBytes = parseBankFile(oldPath);
  if (allBytes.length !== 16384) {
    console.error(`  ✗ bank_${n}.ts has ${allBytes.length} bytes, expected 16384`);
    process.exit(1);
  }

  const firstHalf = allBytes.slice(0, 8192);
  const secondHalf = allBytes.slice(8192);

  const loNum = n * 2;
  const hiNum = n * 2 + 1;

  newFileEntries.push({
    path: resolve(bankDir, `bank_${String(loNum).padStart(2, '0')}.ts`),
    content: formatBankFile(loNum, firstHalf),
  });
  newFileEntries.push({
    path: resolve(bankDir, `bank_${String(hiNum).padStart(2, '0')}.ts`),
    content: formatBankFile(hiNum, secondHalf),
  });

  oldFiles.push(oldPath);
  console.log(`  bank_${n}.ts (16384B) → bank_${String(loNum).padStart(2, '0')}.ts (8192B) + bank_${String(hiNum).padStart(2, '0')}.ts (8192B)`);
}

// 先删旧文件（避免和新文件名冲突），再写新文件
console.log(`\nDeleting ${oldFiles.length} old files first...`);
for (const oldPath of oldFiles) {
  if (existsSync(oldPath)) unlinkSync(oldPath);
}

console.log(`Writing ${newFileEntries.length} new files...`);
for (const entry of newFileEntries) {
  writeFileSync(entry.path, entry.content, 'utf-8');
}

// 删除可能的 test 文件（如果不是 0-15 之一）
const allEntries = readdirSync(bankDir);
for (const f of allEntries) {
  if (f === 'bank_test.ts') {
    const tp = resolve(bankDir, f);
    unlinkSync(tp);
    console.log(`  Deleted extra file: ${f}`);
  }
}

console.log('\nDone! 16 × 16KB → 32 × 8KB.');
console.log('Next: update prg_rom_data.ts, tsubasa_nes.ts, rom_header.ts, and export_prg_rom.mjs');
