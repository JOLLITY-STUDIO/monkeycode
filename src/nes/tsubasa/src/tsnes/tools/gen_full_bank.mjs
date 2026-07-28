// Generate inline bank data for bank-01.ts and bank-02.ts
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function extractFullBank(filePath) {
  const content = readFileSync(filePath, 'utf-8');

  function parseByteArray(text) {
    const eqBracket = text.search(/=\s*\[/);
    if (eqBracket < 0) return [];
    const bracketIdx = text.indexOf('[', eqBracket);
    if (bracketIdx < 0) return [];
    let depth = 1, closeIdx = -1;
    for (let i = bracketIdx + 1; i < text.length; i++) {
      if (text[i] === '[') depth++;
      else if (text[i] === ']') { depth--; if (depth === 0) { closeIdx = i; break; } }
    }
    if (closeIdx < 0 || depth !== 0) return [];
    const inner = text.substring(bracketIdx + 1, closeIdx);
    const hexMatches = inner.match(/0x[0-9A-Fa-f]{2}/g);
    return hexMatches ? hexMatches.map(h => parseInt(h, 16)) : [];
  }

  function getSegmentData(fileContent, segName) {
    const escaped = segName.replace(/\$/g, '\\$');
    if (segName.startsWith('DATA_')) {
      const regex = new RegExp(`const\\s+${escaped}\\s*:\\s*readonly\\s+number\\[\\]\\s*=\\s*\\[`);
      const match = regex.exec(fileContent);
      return match ? parseByteArray(fileContent.substring(match.index)) : [];
    } else {
      const regex = new RegExp(`function\\s+${escaped}\\s*\\(\\s*\\)\\s*:\\s*readonly\\s+number\\[\\]\\s*\\{`);
      const match = regex.exec(fileContent);
      if (!match) return [];
      const afterFunc = fileContent.substring(match.index);
      const returnIdx = afterFunc.indexOf('return');
      return returnIdx >= 0 ? parseByteArray(afterFunc.substring(returnIdx)) : [];
    }
  }

  const bankIdx = content.search(/const\s+_PRG_BANK_\d+\s*:\s*readonly\s+number\[\]\s*=\s*\[/);
  if (bankIdx < 0) return null;
  const fromBankDef = content.substring(bankIdx);
  const eqBracket = fromBankDef.search(/=\s*\[/);
  if (eqBracket < 0) return null;
  const openIdx = fromBankDef.indexOf('[', eqBracket);
  let depth = 1, closeIdx = -1;
  for (let i = openIdx + 1; i < fromBankDef.length; i++) {
    if (fromBankDef[i] === '[') depth++;
    else if (fromBankDef[i] === ']') { depth--; if (depth === 0) { closeIdx = i; break; } }
  }
  const body = fromBankDef.substring(openIdx + 1, closeIdx);
  const matches = body.matchAll(/\.\.\.(DATA_\$[0-9A-F]+_\$[0-9A-F]+|CODE_\$[0-9A-F]+_\$[0-9A-F]+)/g);
  const segmentOrder = [];
  for (const m of matches) segmentOrder.push(m[1]);

  const bank = new Uint8Array(0x2000);
  for (const segName of segmentOrder) {
    const addrMatch = segName.match(/[A-Z]+_\$([0-9A-F]+)_\$([0-9A-F]+)/);
    if (!addrMatch) continue;
    const startAddr = parseInt(addrMatch[1], 16);
    const offset = startAddr - 0x8000;
    const data = getSegmentData(content, segName);
    for (let i = 0; i < data.length && offset + i < 0x2000; i++) {
      bank[offset + i] = data[i];
    }
  }

  return Array.from(bank);
}

function fmtArr(arr, perLine = 16, indent = '  ') {
  const lines = [];
  for (let i = 0; i < arr.length; i += perLine) {
    lines.push(indent + arr.slice(i, i + perLine).map(n => '0x' + n.toString(16).toUpperCase().padStart(2, '0')).join(', ') + ',');
  }
  return '[\n' + lines.join('\n') + '\n]';
}

// Bank 01
console.log('Extracting bank 01...');
const bank01 = extractFullBank(resolve(__dirname, '../tsubasa-hex2asm/prg_banks/prg_bank_01_match_jump.ts'));
console.log(`Bank 01: ${bank01?.length || 0} bytes`);

// Bank 02
console.log('Extracting bank 02...');
const bank02 = extractFullBank(resolve(__dirname, '../tsubasa-hex2asm/prg_banks/prg_bank_02_nmi_renderer.ts'));
console.log(`Bank 02: ${bank02?.length || 0} bytes`);

// Write bank-01-data.ts
let out01 = `/**
 * Bank 01 完整 ROM 数据 — 内联常数
 * 8KB MMC3 PRG bank，$8000-$9FFF（可映射到 $A000-$BFFF）
 * 访问：PRG_BANK_01[addr & 0x1FFF]
 */
export const PRG_BANK_01: readonly number[] = ${fmtArr(bank01, 16, '  ')};
`;

writeFileSync(resolve(__dirname, '../game-engine/banks/bank-01-data.ts'), out01);
console.log('Generated bank-01-data.ts');

// Write bank-02-data.ts
let out02 = `/**
 * Bank 02 完整 ROM 数据 — 内联常数
 * 8KB MMC3 PRG bank
 * 访问：PRG_BANK_02[addr & 0x1FFF]
 */
export const PRG_BANK_02: readonly number[] = ${fmtArr(bank02, 16, '  ')};
`;

writeFileSync(resolve(__dirname, '../game-engine/banks/bank-02-data.ts'), out02);
console.log('Generated bank-02-data.ts');
