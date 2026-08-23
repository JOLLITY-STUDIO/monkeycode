// 一次性生成 PRG bank 数据表（32×8KB）— 从真实 ROM 提取，用完删除
const fs = require('fs');
const path = require('path');

const ROM = path.join(__dirname, '..', 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes');
const OUT_DIR = path.join(__dirname, '..', 'src', 'game', 'prg', 'data', 'rom');

const buf = fs.readFileSync(ROM);
if (buf.length < 16 + 32 * 0x2000) {
  console.error('ROM 太小或格式不对');
  process.exit(1);
}

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

function hex(n) {
  return '0x' + n.toString(16).padStart(2, '0');
}

for (let bank = 0; bank < 32; bank++) {
  const start = 16 + bank * 0x2000;
  const lines = [];
  lines.push('/** PRG-ROM Bank ' + bank.toString().padStart(2, '0') + ' (8KB) — 自动生成，从真实 ROM 提取 */');
  lines.push('const PRG_BANK_' + bank.toString().padStart(2, '0') + ': readonly number[] = [');
  let line = '  ';
  for (let i = 0; i < 0x2000; i++) {
    line += hex(buf[start + i]) + ', ';
    if ((i + 1) % 16 === 0) {
      lines.push(line);
      line = '  ';
    }
  }
  if (line.trim() !== '  ') lines.push(line);
  lines.push('];');
  lines.push('');
  lines.push('export default PRG_BANK_' + bank.toString().padStart(2, '0') + ';');
  lines.push('');
  const file = path.join(OUT_DIR, 'prg-bank-' + bank.toString().padStart(2, '0') + '.ts');
  fs.writeFileSync(file, lines.join('\n'));
  console.log('written', file);
}

// 聚合 index
const idx = [];
idx.push('/** PRG-ROM 聚合 — 32 × 8KB = 256KB（真实 ROM 字节，供 $C8FB 队列流解析等） */');
for (let bank = 0; bank < 32; bank++) {
  idx.push("import PRG_BANK_" + bank.toString().padStart(2, '0') + " from './prg-bank-" + bank.toString().padStart(2, '0') + "';");
}
idx.push('');
idx.push('export const PRG_BANK_SIZE = 0x2000; // 8192');
idx.push('export const PRG_BANK_COUNT = 32;');
idx.push('');
idx.push('/** PRG bank 表（每个 8KB） */');
idx.push('export const PRG_BANKS: readonly (readonly number[])[] = [');
idx.push('  ' + Array.from({ length: 32 }, (_, i) => 'PRG_BANK_' + i.toString().padStart(2, '0')).join(', '));
idx.push('];');
idx.push('');
idx.push('/** 完整 PRG ROM (256KB Uint8Array) */');
idx.push('export const NES_PRG_ROM: Uint8Array = (() => {');
idx.push('  const rom = new Uint8Array(PRG_BANK_COUNT * PRG_BANK_SIZE);');
idx.push('  for (let b = 0; b < PRG_BANK_COUNT; b++) {');
idx.push('    const bank = PRG_BANKS[b];');
idx.push('    for (let i = 0; i < PRG_BANK_SIZE; i++) rom[b * PRG_BANK_SIZE + i] = bank[i] ?? 0xff;');
idx.push('  }');
idx.push('  return rom;');
idx.push('})();');
idx.push('');
fs.writeFileSync(path.join(OUT_DIR, 'index.ts'), idx.join('\n'));
console.log('written index.ts');
console.log('DONE');
