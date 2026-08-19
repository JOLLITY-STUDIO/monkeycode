/**
 * 从 NES ROM 提取全部 32 个 PRG bank → src/game/data/prg-bank-XX.ts
 * 与已有副本逐字节 diff 校验，缺失的 17 个 bank 全量生成。
 * 用法: node scripts/_extract_all_prg_banks.cjs
 */
const fs = require('fs');
const path = require('path');

const ROM_PATH = path.resolve(__dirname, '../docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const OUT_DIR = path.resolve(__dirname, '../src/game/data');

const rom = fs.readFileSync(ROM_PATH);
if (rom[0] !== 0x4e || rom[1] !== 0x45 || rom[2] !== 0x53) { // NES
  console.error('Not an iNES ROM:', rom[0].toString(16), rom[1].toString(16), rom[2].toString(16));
  process.exit(1);
}
const prgCount16k = rom[4];
const chrCount = rom[5];
const prgStart = 16;
const BANK = 0x2000;
// iNES 头 PRG 单位为 16KB，MMC3 按 8KB 半 bank 切换 → 2× 个 8KB bank
const bankCount = prgCount16k * 2;
console.log(`iNES ROM: PRG=${prgCount16k}x16KB=${bankCount} 8KB-banks, CHR=${chrCount} banks, file=${rom.length}B`);

function formatBank(bankId, bytes) {
  const lines = [];
  lines.push(`/** PRG-ROM Bank ${bankId.toString(16).toUpperCase().padStart(2, '0')} (8KB) — 自动生成 */`);
  lines.push(`const PRG_BANK_${bankId.toString(16).toUpperCase().padStart(2, '0')}: readonly number[] = [`);
  for (let i = 0; i < bytes.length; i += 16) {
    const chunk = bytes.slice(i, i + 16);
    const parts = chunk.map((b) => '0x' + b.toString(16).toUpperCase().padStart(2, '0'));
    lines.push('  ' + parts.join(', ') + ',');
  }
  lines.push('];');
  lines.push('');
  lines.push(`export default PRG_BANK_${bankId.toString(16).toUpperCase().padStart(2, '0')};`);
  lines.push('');
  return lines.join('\n');
}

const missing = [];
const ok = [];
const mismatch = [];

for (let b = 0; b < bankCount; b++) {
  const bytes = rom.subarray(prgStart + b * BANK, prgStart + (b + 1) * BANK);
  const id = b.toString(16).toUpperCase().padStart(2, '0');
  const outFile = path.join(OUT_DIR, `prg-bank-${id.toLowerCase()}.ts`);

  if (fs.existsSync(outFile)) {
    // 校验已有副本
    const existing = fs.readFileSync(outFile, 'utf8');
    const hexRe = /0x([0-9A-Fa-f]{2})/g;
    const got = [];
    let m;
    while ((m = hexRe.exec(existing)) !== null) got.push(parseInt(m[1], 16));
    const expect = Array.from(bytes);
    if (got.length !== expect.length || got.some((v, i) => v !== expect[i])) {
      mismatch.push(b);
      console.log(`Bank ${id}  MISMATCH (${got.length}B vs ${expect.length}B)`);
      fs.writeFileSync(outFile, formatBank(b, bytes));
    } else {
      ok.push(b);
      console.log(`Bank ${id}  OK (already exists, matches)`);
    }
  } else {
    fs.writeFileSync(outFile, formatBank(b, bytes));
    missing.push(b);
    console.log(`Bank ${id}  GENERATED (was missing)`);
  }
}

console.log('\n=== Summary ===');
console.log(`OK (already existed, verified): ${ok.length} → [${ok.map((b) => b.toString(16).toUpperCase()).join(', ')}]`);
console.log(`GENERATED (was missing): ${missing.length} → [${missing.map((b) => b.toString(16).toUpperCase()).join(', ')}]`);
console.log(`MISMATCH (regenerated): ${mismatch.length} → [${mismatch.map((b) => b.toString(16).toUpperCase()).join(', ')}]`);
