/**
 * 从 CHR bank tile 定义生成 VROM bank 文件
 * VROM bank = 独立 tile 定义（256 tiles，带 ASCII 可视化）
 * _RAW flat bytes 从 tiles 循环派生，放在文件末尾，export default 兼容 chr_rom_data.ts
 *
 * CHR bank (8KB) = 512 tiles
 * VROM bank (4KB) = 256 tiles
 * VROM bank N → CHR bank floor(N/2), 前半/后半
 *
 * 用法：node tools/gen_vrom_banks.mjs
 */

import { writeFileSync, readdirSync } from 'fs';
import { resolve, join } from 'path';
import { loadBank } from './tile_codec.mjs';

const CHR_DIR  = resolve('src/tsnes/tsubasa-code/chr_banks');
const VROM_DIR = resolve('src/tsnes/tsubasa-code/vrom_banks');
const CONSTANTS_PATH = '../constants';

const PIXEL_CHARS = ['  ', '░░', '▒▒', '██'];

const chrFiles = readdirSync(CHR_DIR)
  .filter(f => /^bank_\d+_8k\.ts$/.test(f))
  .sort((a, b) => {
    const na = parseInt(a.match(/\d+/)[0], 10);
    const nb = parseInt(b.match(/\d+/)[0], 10);
    return na - nb;
  });

console.log(`从 ${chrFiles.length} 个 CHR bank 生成 VROM bank...\n`);

let generated = 0;

for (let chrIdx = 0; chrIdx < chrFiles.length; chrIdx++) {
  const chrFile = chrFiles[chrIdx];
  const chrPath = join(CHR_DIR, chrFile);
  const { tiles } = loadBank(chrPath);

  if (tiles.length < 512) {
    console.warn(`  ⚠ ${chrFile}: 只有 ${tiles.length} tiles (期望 512)，跳过`);
    continue;
  }

  const vromBase = chrIdx * 2;

  for (let half = 0; half < 2; half++) {
    const vromIdx = vromBase + half;
    const vromFile = `bank_${vromIdx}_4k.ts`;
    const vromPath = join(VROM_DIR, vromFile);

    const start = half * 256;
    const slice = tiles.slice(start, start + 256);

    const lines = [];
    lines.push(`/**`);
    lines.push(` * VROM bank ${vromIdx} (4KB) — auto-generated from ${chrFile}`);
    lines.push(` * Mapper: 4 (MMC3)`);
    lines.push(` *`);
    lines.push(` * 256 个 8×8 tile × 16 bytes = 4096 bytes`);
    lines.push(` * ASCII 字符: '  '=透明 '░░'=色1 '▒▒'=色2 '██'=色3`);
    lines.push(` * 类型定义: ${CONSTANTS_PATH} → TileDef`);
    lines.push(` */`);
    lines.push('');
    lines.push(`import type { TileDef } from '${CONSTANTS_PATH}';`);
    lines.push('');
    lines.push(`// ═══════════════════ Tile definitions ═══════════════════`);
    lines.push('');

    const tileNames = [];

    for (const tile of slice) {
      const localIdx = tile.index - start;

      if (localIdx % 16 === 0) {
        if (localIdx > 0) lines.push('');
        lines.push(`// ══ Tile ${localIdx}~${Math.min(localIdx + 15, 255)} ══`);
      }

      const asciiRows = [];
      for (let y = 0; y < 8; y++) {
        let row = '';
        for (let x = 0; x < 8; x++) {
          row += PIXEL_CHARS[tile.pixels[y][x]];
        }
        asciiRows.push(row);
      }

      const bp0Str = tile.bp0.map(b => `0x${b.toString(16).padStart(2, '0')}`).join(', ');
      const bp1Str = tile.bp1.map(b => `0x${b.toString(16).padStart(2, '0')}`).join(', ');

      const name = `TILE_${String(localIdx).padStart(3, '0')}`;
      tileNames.push(name);
      lines.push(`export const ${name}: TileDef = {`);
      lines.push(`  // ┌──────────────┐`);
      for (const r of asciiRows) {
        lines.push(`  // │${r}│`);
      }
      lines.push(`  // └──────────────┘`);
      lines.push(`  ascii: [`);
      lines.push(`    ${asciiRows.map(r => JSON.stringify(r)).join(',\n    ')},`);
      lines.push(`  ],`);
      lines.push(`  bp0: [${bp0Str}],`);
      lines.push(`  bp1: [${bp1Str}],`);
      lines.push(`};`);
      lines.push('');
    }

    // ── 末尾: 从 tiles 拼出 flat bytes ──
    lines.push(`// ══ Derived flat bytes (for chr_rom_data.ts) ══`);
    lines.push(`const _ALL_TILES: TileDef[] = [`);
    for (let i = 0; i < tileNames.length; i += 8) {
      lines.push(`  ${tileNames.slice(i, i + 8).join(', ')},`);
    }
    lines.push(`];`);
    lines.push('');
    lines.push(`const _RAW: number[] = [];`);
    lines.push(`for (const t of _ALL_TILES) {`);
    lines.push(`  for (const b of t.bp0) _RAW.push(b);`);
    lines.push(`  for (const b of t.bp1) _RAW.push(b);`);
    lines.push(`}`);
    lines.push('');
    lines.push(`export default _RAW as readonly number[];`);

    writeFileSync(vromPath, lines.join('\n'), 'utf-8');
    generated++;
  }

  console.log(`  ✓ ${chrFile} → bank_${vromBase}_4k.ts, bank_${vromBase + 1}_4k.ts`);
}

console.log(`\n✓ 生成 ${generated} 个 VROM bank 文件`);
