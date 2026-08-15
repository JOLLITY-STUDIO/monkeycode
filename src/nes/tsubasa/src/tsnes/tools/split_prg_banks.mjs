/**
 * 把 prg_rom_data.ts 的单文件拆成 prg_banks/ 目录下 16 个独立文件
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcFile = resolve(__dirname, '..', 'src', 'tsnes', 'tsubasa-code', 'prg_rom_data.ts');
const outDir = resolve(__dirname, '..', 'src', 'tsnes', 'tsubasa-code', 'prg_banks');
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

const text = readFileSync(srcFile, 'utf8');
const lines = text.split('\n');

// 找出每个 _PRG_BANK_N 的起始行
const bankStarts = [];
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(/^const _PRG_BANK_(\d+): readonly number\[\] = \[/);
  if (m) bankStarts.push({ num: parseInt(m[1], 10), line: i });
}

console.log(`找到 ${bankStarts.length} 个 bank 定义:`);
for (const b of bankStarts) console.log(`  _PRG_BANK_${b.num} → line ${b.line + 1}`);

// 每个 bank 定义跨多行，从 "= [" 行到 "];" 行
function findBankEnd(startLine) {
  let depth = 0;
  for (let i = startLine; i < lines.length; i++) {
    for (const ch of lines[i]) {
      if (ch === '[') depth++;
      else if (ch === ']') depth--;
    }
    if (depth === 0) return i; // 找到了 ]; 这一行
  }
  return lines.length - 1;
}

for (const b of bankStarts) {
  const end = findBankEnd(b.line);
  const chunk = lines.slice(b.line, end + 1).join('\n');

  const header = `/**
 * PRG-ROM bank ${b.num} (16KB) — auto-split from prg_rom_data.ts
 * Mapper: 4 (MMC3)
 */\n\n`;

  const bankContent = chunk.replace(
    `const _PRG_BANK_${b.num}`,
    `const _PRG_BANK_${b.num}`
  ) + `\n\nexport default _PRG_BANK_${b.num};\n`;

  const outFile = resolve(outDir, `bank_${b.num}.ts`);
  writeFileSync(outFile, header + bankContent, 'utf8');
  console.log(`  → bank_${b.num}.ts  (${(end - b.line + 1)} 行)`);
}

console.log('\n完成！接下来手动更新 prg_rom_data.ts 为 index 文件');
