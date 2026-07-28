// Generate bank01_tables.txt and bank01_tables.ts files
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const bank01Path = resolve(__dirname, '../tsubasa-hex2asm/prg_banks/prg_bank_01_match_jump.ts');
const content = readFileSync(bank01Path, 'utf-8');

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

function getSegmentOrder(fileContent) {
  const order = [];
  const bankIdx = fileContent.search(/const\s+_PRG_BANK_\d+\s*:\s*readonly\s+number\[\]\s*=\s*\[/);
  if (bankIdx < 0) return order;
  const fromBankDef = fileContent.substring(bankIdx);
  const eqBracket = fromBankDef.search(/=\s*\[/);
  if (eqBracket < 0) return order;
  const openIdx = fromBankDef.indexOf('[', eqBracket);
  let depth = 1, closeIdx = -1;
  for (let i = openIdx + 1; i < fromBankDef.length; i++) {
    if (fromBankDef[i] === '[') depth++;
    else if (fromBankDef[i] === ']') { depth--; if (depth === 0) { closeIdx = i; break; } }
  }
  const body = fromBankDef.substring(openIdx + 1, closeIdx);
  const matches = body.matchAll(/\.\.\.(DATA_\$[0-9A-F]+_\$[0-9A-F]+|CODE_\$[0-9A-F]+_\$[0-9A-F]+)/g);
  for (const m of matches) order.push(m[1]);
  return order;
}

// Assemble full bank
const segmentOrder = getSegmentOrder(content);
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

// Generate the data tables
function fmtArr(arr, perLine = 16, indent = '  ') {
  const lines = [];
  for (let i = 0; i < arr.length; i += perLine) {
    lines.push(indent + arr.slice(i, i + perLine).map(n => '0x' + n.toString(16).toUpperCase().padStart(2, '0')).join(', ') + ',');
  }
  return '[\n' + lines.join('\n') + '\n' + indent + ']';
}

const tables = [
  { addr: 0xAD8A, len: 20, name: 'PLAYER_STAT_IDX', comment: 'Player stat index table (20B)' },
  { addr: 0xB1E8, len: 89, name: 'PLAYER_MENU_DATA', comment: 'Player menu entries (89B)' },
  { addr: 0xB241, len: 20, name: 'NT_ROW_OFFSETS', comment: 'Nametable row offsets (20B)' },
  { addr: 0xB255, len: 168, name: 'TITLE_TILE_LOOKUP', comment: 'Title tile lookup (168B)' },
  { addr: 0xB2ED, len: 16, name: 'DIRECTION_DELTA', comment: 'Direction delta (16B)' },
  { addr: 0xB229, len: 4, name: 'PALETTE_INDICES', comment: 'Palette indices (4B)' },
  { addr: 0xB205, len: 8, name: 'SPRITE_PALETTE', comment: 'Sprite palette (8B)' },
  { addr: 0xB22D, len: 20, name: 'SPRITE_ATTRS', comment: 'Sprite attributes (20B)' },
  { addr: 0xB271, len: 52, name: 'PALETTE_DATA', comment: 'Palette data (52B)' },
  { addr: 0xBCD1, len: 34, name: 'SCENE_INFO', comment: 'Scene info table (34B)' },
  { addr: 0xBCF3, len: 32, name: 'DIGIT_TILES', comment: 'Digit tile table (32B)' },
  { addr: 0xBD64, len: 32, name: 'CHAR_TILES', comment: 'Char tile table (32B)' },
  { addr: 0xBC6E, len: 80, name: 'TITLE_NT_DATA', comment: 'Title nametable tiles (80B)' },
  { addr: 0xB3F9, len: 18, name: 'SCENE_BC_A', comment: 'Scene bytecode table A (18B)' },
  { addr: 0xB3D7, len: 18, name: 'SCENE_BC_B', comment: 'Scene bytecode table B (18B)' },
  { addr: 0xB3B5, len: 18, name: 'SCENE_BC_C', comment: 'Scene bytecode table C (18B)' },
  { addr: 0xB371, len: 34, name: 'SCENE_BC_D', comment: 'Scene bytecode table D (34B)' },
  { addr: 0xBDA8, len: 64, name: 'SCORE_DIGITS', comment: 'Score digit table (64B)' },
  { addr: 0xACA2, len: 252, name: 'OAM_DATA_A', comment: 'OAM data A (252B)' },
  { addr: 0xACB8, len: 252, name: 'OAM_DATA_B', comment: 'OAM data B (252B)' },
  { addr: 0xBC48, len: 16, name: 'PPU_ADDR_TABLE', comment: 'PPU addr table (16B)' },
  { addr: 0xBC58, len: 16, name: 'PPU_ADDR_B', comment: 'PPU addr table B (16B)' },
];

let output = '// Auto-generated data tables for bank-01.ts\n// Extracted from prg_bank_01_match_jump.ts\n\n';

for (const t of tables) {
  const off = t.addr & 0x1FFF;
  const data = Array.from(bank.slice(off, off + t.len));
  output += `/** ${t.comment} */\n`;
  output += `export const ${t.name}: readonly number[] = ${fmtArr(data, 16, '  ')};\n\n`;
}

const outPath = resolve(__dirname, '../game-engine/banks/bank-01-tables.ts');
writeFileSync(outPath, output);
console.log(`Generated: ${outPath}`);
console.log(`Tables: ${tables.length}`);
