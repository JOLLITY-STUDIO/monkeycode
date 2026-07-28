/**
 * Extract data tables from PRG bank .ts files — fixed version
 */
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const bank01Path = resolve(__dirname, '../tsubasa-hex2asm/prg_banks/prg_bank_01_match_jump.ts');
const content = readFileSync(bank01Path, 'utf-8');

/**
 * Parse a hex byte array from TS source starting at a given position.
 * The array is in form: [\n  0xXX, 0xXX, ...\n]
 * We need to find the [ AFTER the = sign.
 */
function parseByteArray(text) {
  // Find the array opening bracket: look for '= [' or '= ['
  const eqBracket = text.search(/=\s*\[/);
  if (eqBracket < 0) {
    console.warn('  No "= [" found in snippet');
    return [];
  }
  const bracketIdx = text.indexOf('[', eqBracket);
  if (bracketIdx < 0) return [];

  // Count balanced brackets
  let depth = 1;
  let closeIdx = -1;
  for (let i = bracketIdx + 1; i < text.length; i++) {
    if (text[i] === '[') depth++;
    else if (text[i] === ']') { depth--; if (depth === 0) { closeIdx = i; break; } }
  }
  if (closeIdx < 0 || depth !== 0) {
    console.warn('  Brackets not balanced, depth=', depth);
    return [];
  }

  const inner = text.substring(bracketIdx + 1, closeIdx);

  // Extract all 0xXX hex values
  const hexMatches = inner.match(/0x[0-9A-Fa-f]{2}/g);
  if (!hexMatches) {
    console.warn('  No hex values found in array, inner first 100 chars:', inner.substring(0, 100));
    return [];
  }

  return hexMatches.map(h => parseInt(h, 16));
}

/**
 * Find segment definition and extract its byte data
 */
function getSegmentData(fileContent, segName) {
  const escaped = segName.replace(/\$/g, '\\$');

  if (segName.startsWith('DATA_')) {
    const regex = new RegExp(`const\\s+${escaped}\\s*:\\s*readonly\\s+number\\[\\]\\s*=\\s*\\[`);
    const match = regex.exec(fileContent);
    if (!match) { console.warn(`  NOT FOUND: ${segName}`); return []; }
    return parseByteArray(fileContent.substring(match.index));
  } else {
    const regex = new RegExp(`function\\s+${escaped}\\s*\\(\\s*\\)\\s*:\\s*readonly\\s+number\\[\\]\\s*\\{`);
    const match = regex.exec(fileContent);
    if (!match) { console.warn(`  NOT FOUND: ${segName}`); return []; }
    const afterFunc = fileContent.substring(match.index);
    // Find 'return' keyword
    const returnIdx = afterFunc.indexOf('return');
    if (returnIdx < 0) return [];
    return parseByteArray(afterFunc.substring(returnIdx));
  }
}

// Find all DATA/CODE segment names and their order from the assembled array
function getSegmentOrder(fileContent) {
  const order = [];

  // Find the assembled _PRG_BANK_01 array
  const bankIdx = fileContent.search(/const\s+_PRG_BANK_\d+\s*:\s*readonly\s+number\[\]\s*=\s*\[/);
  if (bankIdx < 0) return order;

  const fromBankDef = fileContent.substring(bankIdx);

  // Find the opening [ of the assembled array (after =)
  const eqBracket = fromBankDef.search(/=\s*\[/);
  if (eqBracket < 0) return order;

  const openIdx = fromBankDef.indexOf('[', eqBracket);

  // Find matching ]
  let depth = 1;
  let closeIdx = -1;
  for (let i = openIdx + 1; i < fromBankDef.length; i++) {
    if (fromBankDef[i] === '[') depth++;
    else if (fromBankDef[i] === ']') { depth--; if (depth === 0) { closeIdx = i; break; } }
  }

  const body = fromBankDef.substring(openIdx + 1, closeIdx);

  // Each segment reference: ...SEGMENT_NAME or ...SEGMENT_NAME()
  // Extract all matches
  const matches = body.matchAll(/\.\.\.(DATA_\$[0-9A-F]+_\$[0-9A-F]+|CODE_\$[0-9A-F]+_\$[0-9A-F]+)/g);
  for (const m of matches) {
    order.push(m[1]);
  }

  return order;
}

// ============ Main ============
console.log('Extracting bank 01...\n');

const segmentOrder = getSegmentOrder(content);
console.log(`Found ${segmentOrder.length} segments in assembled order`);
if (segmentOrder.length > 0) {
  console.log('First 5:', segmentOrder.slice(0, 5).join(', '));
  console.log('Last 5:', segmentOrder.slice(-5).join(', '));
}

// Assemble the full bank
const bank = new Uint8Array(0x2000);
let totalBytes = 0;

for (const segName of segmentOrder) {
  const addrMatch = segName.match(/[A-Z]+_\$([0-9A-F]+)_\$([0-9A-F]+)/);
  if (!addrMatch) continue;
  const startAddr = parseInt(addrMatch[1], 16);
  const expectedLen = parseInt(addrMatch[2], 16) - startAddr + 1;
  const offset = startAddr - 0x8000;

  const data = getSegmentData(content, segName);

  if (data.length === 0) {
    console.warn(`  EMPTY: ${segName}`);
    continue;
  }

  for (let i = 0; i < data.length && offset + i < 0x2000; i++) {
    bank[offset + i] = data[i];
  }
  totalBytes += data.length;
}

console.log(`\nTotal bytes placed: ${totalBytes}`);

// Verify
console.log('\nVerification samples:');
console.log('$83EE:', Array.from(bank.slice(0x03EE, 0x03EE + 8)).map(n => '0x' + n.toString(16).padStart(2, '0')).join(' '));
console.log('$B1E8:', Array.from(bank.slice(0x11E8, 0x11E8 + 16)).map(n => '0x' + n.toString(16).padStart(2, '0')).join(' '));
console.log('$B255:', Array.from(bank.slice(0x1255, 0x1255 + 16)).map(n => '0x' + n.toString(16).padStart(2, '0')).join(' '));
console.log('$BC6E:', Array.from(bank.slice(0x1C6E, 0x1C6E + 16)).map(n => '0x' + n.toString(16).padStart(2, '0')).join(' '));

// Extract and display all needed tables
console.log('\n\n// ======== BANK 01 DATA TABLES ========\n');

function fmtArr(arr, perLine = 16) {
  const lines = [];
  for (let i = 0; i < arr.length; i += perLine) {
    lines.push('  ' + arr.slice(i, i + perLine).map(n => '0x' + n.toString(16).toUpperCase().padStart(2, '0')).join(', ') + ',');
  }
  return '[\n' + lines.join('\n') + '\n]';
}

const tables = [
  { addr: 0x83EE, len: 20, name: 'TABLE_$83EE', comment: 'Bytecode jump ptr table (20B)' },
  { addr: 0xAD8A, len: 20, name: 'TABLE_$AD8A', comment: 'Player stat index (20B)' },
  { addr: 0xB1E8, len: 89, name: 'TABLE_$B1E8', comment: 'Player menu entries (89B)' },
  { addr: 0xB241, len: 20, name: 'TABLE_$B241', comment: 'Nametable row offsets (20B)' },
  { addr: 0xB255, len: 168, name: 'TABLE_$B255', comment: 'Title tile lookup (168B)' },
  { addr: 0xB2ED, len: 16, name: 'TABLE_$B2ED', comment: 'Direction delta (16B)' },
  { addr: 0xB229, len: 4, name: 'TABLE_$B229', comment: 'Palette indices (4B)' },
  { addr: 0xB205, len: 8, name: 'TABLE_$B205', comment: 'Sprite palette (8B)' },
  { addr: 0xB22D, len: 20, name: 'TABLE_$B22D', comment: 'Sprite attributes (20B)' },
  { addr: 0xB271, len: 52, name: 'TABLE_$B271', comment: 'Palette data (52B)' },
  { addr: 0xBCD1, len: 34, name: 'TABLE_$BCD1', comment: 'Scene info (34B)' },
  { addr: 0xBCF3, len: 32, name: 'TABLE_$BCF3', comment: 'Digit tiles (32B)' },
  { addr: 0xBD64, len: 32, name: 'TABLE_$BD64', comment: 'Char tiles (32B)' },
  { addr: 0xBC6E, len: 80, name: 'TABLE_$BC6E', comment: 'Title nametable (80B)' },
  { addr: 0xB3F9, len: 18, name: 'TABLE_$B3F9', comment: 'Scene BC table A (18B)' },
  { addr: 0xB3D7, len: 18, name: 'TABLE_$B3D7', comment: 'Scene BC table B (18B)' },
  { addr: 0xB3B5, len: 18, name: 'TABLE_$B3B5', comment: 'Scene BC table C (18B)' },
  { addr: 0xB371, len: 34, name: 'TABLE_$B371', comment: 'Scene BC table D (34B)' },
  { addr: 0xBDA8, len: 64, name: 'TABLE_$BDA8', comment: 'Score digits (64B)' },
  { addr: 0xACA2, len: 252, name: 'TABLE_$ACA2', comment: 'OAM data A (252B)' },
  { addr: 0xACB8, len: 252, name: 'TABLE_$ACB8', comment: 'OAM data B (252B)' },
  { addr: 0xBC48, len: 16, name: 'TABLE_$BC48', comment: 'PPU addr table (16B)' },
  { addr: 0xBC58, len: 16, name: 'TABLE_$BC58', comment: 'PPU addr B (16B)' },
];

for (const t of tables) {
  const off = t.addr & 0x1FFF;
  const data = Array.from(bank.slice(off, off + t.len));
  const hasData = data.some(b => b !== 0);
  console.log(`\n// ${t.comment}${hasData ? '' : ' ← EMPTY!'}`);
  console.log(`const ${t.name}: readonly number[] = ${fmtArr(data)};`);
}
