/**
 * 将 CHR Bank 的平铺字节数组，拆成独立 tile 定义（含 ASCII 可视化 + TypeScript 强类型）
 * _RAW flat bytes 从 tiles 循环派生，放在文件末尾，export default 兼容 chr_rom_data.ts
 *
 * 用法：
 *   node tools/gen_tile_defs.mjs <bank_file.ts>
 *   node tools/gen_tile_defs.mjs --all
 */

import { writeFileSync, readdirSync } from 'fs';
import { resolve, basename, join } from 'path';
import { loadBank } from './tile_codec.mjs';

const CHR_BANKS_DIR = resolve('src/tsnes/tsubasa-code/chr_banks');
const CONSTANTS_PATH = '../constants';

const PIXEL_CHARS = ['  ', '░░', '▒▒', '██'];

function generateBank(filePath) {
  const { tiles } = loadBank(filePath);
  const totalTiles = tiles.length;

  const lines = [];
  lines.push(`/**`);
  lines.push(` * CHR Bank 独立 tile 定义（含 ASCII 可视化 + TypeScript 强类型）`);
  lines.push(` * 总 tile 数: ${totalTiles} (索引 0~${totalTiles - 1})`);
  lines.push(` *`);
  lines.push(` * ASCII 字符: '  '=透明 '░░'=色1 '▒▒'=色2 '██'=色3`);
  lines.push(` * 类型定义: ${CONSTANTS_PATH} → TileDef`);
  lines.push(` */`);
  lines.push('');
  lines.push(`import type { TileDef } from '${CONSTANTS_PATH}';`);
  lines.push('');

  lines.push(`// ═══════════════════ Tile definitions ═══════════════════`);
  lines.push('');

  const tileNames = [];

  for (const tile of tiles) {
    const idx = tile.index;

    if (idx % 16 === 0) {
      if (idx > 0) lines.push('');
      lines.push(`// ══ Tile ${idx}~${Math.min(idx + 15, totalTiles - 1)} ══`);
    }

    // ASCII 可视化
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

    const name = `TILE_${String(idx).padStart(3, '0')}`;
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

  writeFileSync(filePath, lines.join('\n'), 'utf-8');
  console.log(`  ✓ ${basename(filePath)}  (${totalTiles} tiles)`);
}

// ── 入口 ─────────────────────────────────────────────
const args = process.argv.slice(2);

if (args.includes('--all')) {
  const files = readdirSync(CHR_BANKS_DIR)
    .filter(f => /^bank_\d+_8k\.ts$/.test(f))
    .sort((a, b) => {
      const na = parseInt(a.match(/\d+/)[0], 10);
      const nb = parseInt(b.match(/\d+/)[0], 10);
      return na - nb;
    });

  console.log(`处理 ${files.length} 个 CHR bank 文件...\n`);
  for (const f of files) {
    generateBank(join(CHR_BANKS_DIR, f));
  }
  console.log(`\n✓ 全部完成！`);
} else if (args.length >= 1) {
  generateBank(resolve(args[0]));
} else {
  console.log('用法:');
  console.log('  node tools/gen_tile_defs.mjs <bank_file.ts>');
  console.log('  node tools/gen_tile_defs.mjs --all');
  process.exit(1);
}
