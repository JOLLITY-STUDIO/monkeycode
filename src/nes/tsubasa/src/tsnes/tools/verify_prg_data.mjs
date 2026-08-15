/**
 * 验证 prg_banks/ 中的原始 bytes 与 rom.nes 的 PRG-ROM 一致
 */
import { readFileSync, readdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const romPath = resolve(ROOT, 'rom.nes');
const banksDir = resolve(ROOT, 'src', 'tsnes', 'tsubasa-code', 'prg_banks');

const raw = readFileSync(romPath);
const prgCount = raw[4];
const hasTrainer = (raw[6] & 4) !== 0;
const prgOffset = 16 + (hasTrainer ? 512 : 0);

// 从每个 bank 文件正则提取
const bankRegex = /_PRG_BANK_\d+:\s*readonly\s*number\[\]\s*=\s*\[([\s\S]*?)\];/;

let totalDiffs = 0;
let lengthMismatches = 0;

for (let i = 0; i < prgCount; i++) {
  const bankFile = resolve(banksDir, `bank_${i}.ts`);
  let tsSource;
  try {
    tsSource = readFileSync(bankFile, 'utf-8');
  } catch {
    console.error(`Bank ${i}: file not found (${bankFile})`);
    lengthMismatches++;
    continue;
  }

  const m = tsSource.match(bankRegex);
  if (!m) {
    console.error(`Bank ${i}: no data found in file`);
    lengthMismatches++;
    continue;
  }
  const numbers = m[1].split(/[,\n\r]+/).map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));

  const expected = [];
  const start = prgOffset + i * 16384;
  for (let j = 0; j < 16384; j++) {
    expected.push(raw[start + j]);
  }

  if (numbers.length !== expected.length) {
    console.error(`Bank ${i}: length mismatch ${numbers.length} vs ${expected.length}`);
    lengthMismatches++;
    continue;
  }
  let diffs = 0;
  for (let j = 0; j < expected.length; j++) {
    if (numbers[j] !== expected[j]) diffs++;
  }
  if (diffs > 0) {
    console.error(`Bank ${i}: ${diffs} differences`);
    totalDiffs += diffs;
  }
}

if (totalDiffs === 0 && lengthMismatches === 0) {
  console.log(`✅ PRG data matches ROM exactly (${prgCount} banks × 16KB = ${prgCount * 16}KB)`);
} else {
  console.error(`❌ Total byte differences: ${totalDiffs}, length mismatches: ${lengthMismatches}`);
  process.exit(1);
}
