/**
 * _chr_refetch.cjs — 从 ROM 重新抽取 16 个 8KB CHR bank 字节
 *
 * 用法：cd scripts && node _chr_refetch.cjs
 * 输入：docs/roms/Captain Tsubasa II - Super Striker (Japan).nes
 * 输出：src/game/chr/chr-bank-00.ts .. chr-bank-15.ts（覆盖现有文件）
 *
 * 修复 BUG：现有 chr-bank-*.ts 都少 1 字节（8191 vs 真实 8192），
 *         导致 HeadlessRuntime 用 ?? 0xff 补末尾 1 字节，tile 字节错位。
 */
const fs = require('fs');
const path = require('path');

const ROM = path.join(__dirname, '..', 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes');
const CHR_DIR = path.join(__dirname, '..', 'src', 'game', 'chr');

const rom = fs.readFileSync(ROM);
const header6 = rom[6];
const prgBanks = rom[4];
const chrBanks = rom[5];
const trainer = (header6 & 4) ? 512 : 0;
const chrOff = 16 + prgBanks * 16384 + trainer;
console.log(`ROM: PRG=${prgBanks}×16KB, CHR=${chrBanks}×8KB, trainer=${trainer}, chrOff=0x${chrOff.toString(16)}`);

if (rom.length - chrOff !== chrBanks * 8192) {
  console.error(`!! file size ${rom.length} - chrOff ${chrOff} = ${rom.length - chrOff}, expected ${chrBanks * 8192}`);
  process.exit(1);
}

for (let b = 0; b < 16; b++) {
  const start = chrOff + b * 8192;
  const end = start + 8192;
  const bytes = rom.slice(start, end);
  // 生成 16 字节一行的 hex 字符串
  const lines = [];
  lines.push(`/** CHR-ROM Bank ${String(b).padStart(2, '0')} (8KB) — 从 ROM 重抽（修复 8191→8192 字节缺失 BUG） */`);
  lines.push(`const CHR_BANK_${String(b).padStart(2, '0')}: readonly number[] = [`);
  for (let i = 0; i < 8192; i += 16) {
    const row = bytes.slice(i, i + 16);
    lines.push('  ' + Array.from(row).map(x => '0x' + x.toString(16).padStart(2, '0').toUpperCase()).join(', ') + ',');
  }
  lines.push('];');
  lines.push(`export default CHR_BANK_${String(b).padStart(2, '0')};`);
  lines.push('');
  const out = lines.join('\n');
  const outPath = path.join(CHR_DIR, `chr-bank-${String(b).padStart(2, '0')}.ts`);
  fs.writeFileSync(outPath, out, 'utf8');
  console.log(`wrote ${outPath} (8192 bytes)`);
}

console.log('done. all 16 chr-bank-*.ts rewritten from ROM.');
