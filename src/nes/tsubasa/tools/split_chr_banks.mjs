/**
 * 把 chr_rom_data.ts 拆成 chr_banks/ (8KB) 和 vrom_banks/ (4KB) 目录
 *
 * 用法: node tools/split_chr_banks.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcFile = resolve(__dirname, '..', 'src', 'tsnes', 'tsubasa-code', 'chr_rom_data.ts');
const chrOutDir = resolve(__dirname, '..', 'src', 'tsnes', 'tsubasa-code', 'chr_banks');
const vromOutDir = resolve(__dirname, '..', 'src', 'tsnes', 'tsubasa-code', 'vrom_banks');

for (const d of [chrOutDir, vromOutDir]) {
  if (!existsSync(d)) mkdirSync(d, { recursive: true });
}

const text = readFileSync(srcFile, 'utf8');
const lines = text.split('\n');

// 找每个 _CHR_BANK_N 起始行
const bankStarts = [];
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(/^const _CHR_BANK_(\d+): readonly number\[\] = \[/);
  if (m) bankStarts.push({ num: parseInt(m[1], 10), line: i });
}

console.log(`找到 ${bankStarts.length} 个 CHR bank 定义:`);
for (const b of bankStarts) console.log(`  _CHR_BANK_${b.num} → line ${b.line + 1}`);

// 找到 bank 数组结束行 ("];")
function findBankEnd(startLine) {
  let depth = 0;
  for (let i = startLine; i < lines.length; i++) {
    for (const ch of lines[i]) {
      if (ch === '[') depth++;
      else if (ch === ']') depth--;
    }
    if (depth === 0) return i;
  }
  return lines.length - 1;
}

// 生成 header comment 行
function chrHeader(num, sizeKB) {
  return `/**
 * CHR-ROM bank ${num} (${sizeKB}KB) — auto-split from chr_rom_data.ts
 * Mapper: 4 (MMC3)
 *
 * ${sizeKB === 8 ? '512 个 8×8 tile × 16 bytes (2 bitplane × 8 scanlines)' : '256 个 8×8 tile'}
 */`;
}

// ------ 1. 拆 8KB CHR bank 文件 ------
console.log('\n--- 8KB CHR banks ---');
for (const b of bankStarts) {
  const end = findBankEnd(b.line);
  const chunk = lines.slice(b.line, end + 1).join('\n');

  const content = chrHeader(b.num, 8) + '\n\n' +
    chunk + `\n\nexport default _CHR_BANK_${b.num};\n`;

  const outFile = resolve(chrOutDir, `bank_${b.num}_8k.ts`);
  writeFileSync(outFile, content, 'utf8');
  console.log(`  → bank_${b.num}_8k.ts  (${end - b.line + 1} 行, 8KB)`);
}

// ------ 2. 拆 4KB VROM bank 文件 (每个 8KB 拆两半) ------
console.log('\n--- 4KB VROM banks ---');
for (const b of bankStarts) {
  for (let half = 0; half < 2; half++) {
    const vIdx = b.num * 2 + half;
    const sliceExpr = `_CHR_BANK_${b.num}.slice(${half * 4096}, ${(half + 1) * 4096})`;

    const content = chrHeader(vIdx, 4) + '\n\n' +
      `import _CHR_BANK_${b.num} from '../chr_banks/bank_${b.num}_8k';\n\n` +
      `/** VROM bank ${vIdx} (4KB) — ${half === 0 ? 'first' : 'second'} half of _CHR_BANK_${b.num} */\n` +
      `const _VROM_BANK_${vIdx}: readonly number[] = ${sliceExpr};\n` +
      `\nexport default _VROM_BANK_${vIdx};\n`;

    const outFile = resolve(vromOutDir, `bank_${vIdx}_4k.ts`);
    writeFileSync(outFile, content, 'utf8');
    console.log(`  → bank_${vIdx}_4k.ts  (4KB, slice of _CHR_BANK_${b.num})`);
  }
}

// ------ 3. 更新 chr_rom_data.ts 为索引文件 ------
console.log('\n--- 更新 chr_rom_data.ts 为索引文件 ---');

const chrImports = bankStarts.map(b => `import _CHR_BANK_${b.num} from './chr_banks/bank_${b.num}_8k';`).join('\n');

const chrBankRefs = bankStarts.map(b => `  _CHR_BANK_${b.num}`).join(',\n');

// VROM bank 引用
const vromImports = [];
const vromBankRefs = [];
for (const b of bankStarts) {
  for (let half = 0; half < 2; half++) {
    const vIdx = b.num * 2 + half;
    vromImports.push(`import _VROM_BANK_${vIdx} from './vrom_banks/bank_${vIdx}_4k';`);
    vromBankRefs.push(`  _VROM_BANK_${vIdx}`);
  }
}

const indexContent = `/**
 * CHR-ROM 数据 (Pattern Tables) — 由 tools/export_rom_meta.mjs 自动生成
 * 手动拆分后变为索引文件，实际数据在 chr_banks/ 和 vrom_banks/ 中
 *
 * 原始文件: rom.nes
 * Mapper: 4 (MMC3)
 * CHR-ROM: ${bankStarts.length} 个 8KB bank → ${bankStarts.length * 512} 个 tile
 *
 * 每个 tile = 16 bytes (2 bitplane × 8 scanlines)
 * 每个 8KB bank = 512 个 8×8 tile
 *
 * CHR_ROM_BANKS: Uint8Array[] 共 ${bankStarts.length} 个 (8KB each)
 * CHR_VROM_BANKS: Uint8Array[] 共 ${bankStarts.length * 2} 个 (4KB each, 兼容 rom.ts 格式)
 */

${chrImports}

${vromImports.join('\n')}

// ---------- 预构建 Uint8Array[] ----------

/** 全部 CHR-ROM 8KB bank（预构建） */
export const CHR_ROM_BANKS: readonly Uint8Array[] = [
${chrBankRefs}
].map(arr => new Uint8Array(arr));

/** 全部 CHR-ROM 4KB bank（兼容 rom.ts vrom 格式，预构建） */
export const CHR_VROM_BANKS: readonly Uint8Array[] = [
${vromBankRefs.join(',\n')}
].map(slice => new Uint8Array(slice));

/** CHR-ROM 数据总大小 (bytes) */
export const CHR_ROM_SIZE = ${bankStarts.length * 8192};

/** CHR-ROM 8KB bank 数量 */
export const CHR_BANK_COUNT = ${bankStarts.length};

/** CHR-ROM 4KB vrom bank 数量 */
export const CHR_VROM_COUNT = ${bankStarts.length * 2};
`;

writeFileSync(srcFile, indexContent, 'utf8');
console.log(`  → chr_rom_data.ts 已更新为索引文件`);

console.log(`\n✓ 完成!`);
console.log(`  chr_banks/:  ${bankStarts.length} 个文件 (8KB each)`);
console.log(`  vrom_banks/: ${bankStarts.length * 2} 个文件 (4KB each)`);
