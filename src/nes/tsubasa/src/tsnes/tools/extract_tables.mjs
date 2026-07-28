/**
 * Extract data tables from PRG bank .ts files
 * Usage: node tools/extract_tables.mjs
 */

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Parse a number[] array literal from TypeScript source
 * Handles: [0xHH, 0xHH, ...] or [123, 456, ...]
 */
function parseArrayLiteral(text) {
  // Find the opening bracket
  const start = text.indexOf('[');
  if (start < 0) return null;

  // Match balanced brackets
  let depth = 0;
  let i = start;
  while (i < text.length) {
    if (text[i] === '[') depth++;
    else if (text[i] === ']') depth--;
    if (depth === 0) break;
    i++;
  }
  if (depth !== 0) return null;

  // Extract the array content (between [ and ])
  const inner = text.substring(start + 1, i);

  // Parse comma-separated hex/dec numbers
  const nums = [];
  // Use regex to match tokens, covering hex (0xHH, $HH) and decimal
  const tokens = inner.split(',');
  for (const token of tokens) {
    const trimmed = token.trim();
    if (!trimmed) continue;
    let val;
    if (trimmed.startsWith('0x') || trimmed.startsWith('0X')) {
      val = parseInt(trimmed, 16);
    } else if (trimmed.startsWith('0o') || trimmed.startsWith('0O')) {
      val = parseInt(trimmed, 8);
    } else if (trimmed.startsWith('0b') || trimmed.startsWith('0B')) {
      val = parseInt(trimmed.substring(2), 2);
    } else {
      val = parseInt(trimmed, 10);
    }
    if (!isNaN(val)) {
      nums.push(val & 0xFF);
    }
  }
  return nums;
}

/**
 * Extract the full 8KB bank data from a PRG bank TypeScript file
 */
function extractBankData(filePath) {
  const content = readFileSync(filePath, 'utf-8');

  // Find the assembled _PRG_BANK_XX array
  // Pattern: const _PRG_BANK_XX: readonly number[] = [ ...DATA_$XXXX_$YYYY, ...CODE_$XXXX_$YYYY(), ... ];
  const assembledMatch = content.match(/const\s+_PRG_BANK_\d+\s*:\s*readonly\s+number\[\]\s*=\s*\[/);
  if (!assembledMatch) {
    console.error('Could not find assembled PRG bank array');
    return null;
  }

  // Extract each segment's array data
  // Find all DATA and CODE segments with their arrays
  const segments = [];

  // Pattern 1: const DATA_$XXXX_$YYYY: readonly number[] = [...];
  const dataRegex = /const\s+(DATA_\$[0-9A-Fa-f]+_\$[0-9A-Fa-f]+)\s*:\s*readonly\s+number\[\]\s*=\s*\[/g;
  let match;
  while ((match = dataRegex.exec(content)) !== null) {
    const name = match[1];
    // Extract address range from name: DATA_$XXXX_$YYYY
    const addrMatch = name.match(/DATA_\$([0-9A-Fa-f]+)_\$([0-9A-Fa-f]+)/);
    if (!addrMatch) continue;
    const startAddr = parseInt(addrMatch[1], 16);
    const endAddr = parseInt(addrMatch[2], 16);

    // Find the array for this segment
    const remaining = content.substring(match.index);
    const arr = parseArrayLiteral(remaining);
    if (arr) {
      segments.push({ name, startAddr, endAddr, data: arr, order: startAddr });
    }
  }

  // Pattern 2: function CODE_$XXXX_$YYYY(): readonly number[] { return [...]; }
  const codeRegex = /function\s+(CODE_\$[0-9A-Fa-f]+_\$[0-9A-Fa-f]+)\s*\(\)\s*:\s*readonly\s+number\[\]\s*\{[^}]*return\s*\[/g;
  while ((match = codeRegex.exec(content)) !== null) {
    const name = match[1];
    const addrMatch = name.match(/CODE_\$([0-9A-Fa-f]+)_\$([0-9A-Fa-f]+)/);
    if (!addrMatch) continue;
    const startAddr = parseInt(addrMatch[1], 16);
    const endAddr = parseInt(addrMatch[2], 16);

    const remaining = content.substring(match.index);
    const returnIdx = remaining.indexOf('return');
    const arr = parseArrayLiteral(remaining.substring(returnIdx));
    if (arr) {
      segments.push({ name, startAddr, endAddr, data: arr, order: startAddr });
    }
  }

  // Sort segments by start address
  segments.sort((a, b) => a.startAddr - b.startAddr);

  // Assemble full bank (all offsets relative to $8000)
  // _PRG_BANK_01 is assembled from $8000 to $9FFF segments in address order
  const bankData = new Uint8Array(0x2000); // 8KB

  for (const seg of segments) {
    const offset = seg.startAddr - 0x8000;
    for (let i = 0; i < seg.data.length; i++) {
      if (offset + i < bankData.length) {
        bankData[offset + i] = seg.data[i];
      }
    }
  }

  return bankData;
}

/**
 * Format a number[] as a compact TypeScript array literal
 */
function formatArray(arr, bytesPerLine = 16) {
  const lines = [];
  for (let i = 0; i < arr.length; i += bytesPerLine) {
    const slice = arr.slice(i, i + bytesPerLine);
    lines.push('    ' + slice.map(n => '0x' + n.toString(16).toUpperCase().padStart(2, '0')).join(', ') + ',');
  }
  return '[\n' + lines.join('\n') + '\n  ]';
}

// ============================================
// Main
// ============================================

const bank01Path = resolve(__dirname, '../tsubasa-hex2asm/prg_banks/prg_bank_01_match_jump.ts');
const bank02Path = resolve(__dirname, '../tsubasa-hex2asm/prg_banks/prg_bank_02_nmi_renderer.ts');

console.log('=== Extracting Bank 01 data tables ===');
console.log('Bank 01 path:', bank01Path);
const bank01 = extractBankData(bank01Path);

if (!bank01) {
  console.error('Failed to extract bank 01 data');
  process.exit(1);
}

console.log(`Bank 01: extracted ${bank01.length} bytes`);

// Define tables to extract: { disasmAddr, length, name, comment }
const bank01Tables = [
  // Player/slot tables referenced in match jump
  { addr: 0xB1E8, len: 0x40, name: 'TABLE_$B1E8', comment: 'Player menu table (64B)' },
  { addr: 0xB241, len: 0x14, name: 'TABLE_$B241', comment: 'Nametable row index table (20B)' },
  { addr: 0xB255, len: 0x40, name: 'TABLE_$B255', comment: 'Title tile search table (64B)' },
  { addr: 0xB2ED, len: 0x10, name: 'TABLE_$B2ED', comment: 'Direction offset table (16B)' },
  { addr: 0xB229, len: 0x04, name: 'TABLE_$B229', comment: 'Palette index table (4B)' },
  { addr: 0xB205, len: 0x08, name: 'TABLE_$B205', comment: 'Sprite palette (8B)' },
  { addr: 0xB22D, len: 0x14, name: 'TABLE_$B22D', comment: 'Sprite attribute table (20B)' },
  { addr: 0xB271, len: 0x34, name: 'TABLE_$B271', comment: 'Palette data (52B)' },
  { addr: 0xBCD1, len: 0x22, name: 'TABLE_$BCD1', comment: 'Scene info table (34B)' },
  { addr: 0xBCF3, len: 0x20, name: 'TABLE_$BCF3', comment: 'Digit tile table (32B)' },
  { addr: 0xBD64, len: 0x20, name: 'TABLE_$BD64', comment: 'Char tile table (32B)' },
  { addr: 0xBC6E, len: 0x50, name: 'TABLE_$BC6E', comment: 'Title nametable tiles (80B)' },
  { addr: 0xB3F9, len: 0x12, name: 'TABLE_$B3F9', comment: 'Scene bytecode table A (18B)' },
  { addr: 0xB3D7, len: 0x12, name: 'TABLE_$B3D7', comment: 'Scene bytecode table B (18B)' },
  { addr: 0xB3B5, len: 0x12, name: 'TABLE_$B3B5', comment: 'Scene bytecode table C (18B)' },
  { addr: 0xB371, len: 0x22, name: 'TABLE_$B371', comment: 'Scene bytecode table D (34B)' },
  { addr: 0xAD8A, len: 0x14, name: 'TABLE_$AD8A', comment: 'Player stat index table (20B)' },
  { addr: 0xACA2, len: 0xFC, name: 'TABLE_$ACA2', comment: 'OAM data A (252B)' },
  { addr: 0xACB8, len: 0xFC, name: 'TABLE_$ACB8', comment: 'OAM data B (252B)' },
  { addr: 0xB013, len: 0x03, name: 'TABLE_$B013', comment: 'Pointer helper table (3B)' },
  { addr: 0x83EE, len: 0x28, name: 'TABLE_$83EE', comment: 'Bytecode entry jump table (40B)' },
  { addr: 0xBDA8, len: 0x40, name: 'TABLE_$BDA8', comment: 'Score digit table (64B)' },
];

for (const table of bank01Tables) {
  // Bank 01 mapped to $A000-$BFFF window → offset = addr - 0xA000
  // Bank 01 mapped to $8000-$9FFF window → offset = addr - 0x8000
  // General: offset = addr & 0x1FFF (since MMC3 bank is 8KB aligned)
  const offset = table.addr & 0x1FFF;
  if (offset + table.len > 0x2000) {
    console.error(`  WARN: Table ${table.name} at $${table.addr.toString(16).toUpperCase()} exceeds bank boundary`);
    continue;
  }

  const data = Array.from(bank01.slice(offset, offset + table.len));

  console.log(`\n// ${table.comment}`);
  console.log(`// ROM addr: $${table.addr.toString(16).toUpperCase()} (offset: 0x${offset.toString(16).toUpperCase()})`);
  console.log(`const ${table.name}: readonly number[] = ${formatArray(data)};`);

  // Verify: print first few bytes
  console.log(`// First bytes: [${data.slice(0, 8).map(n => '0x' + n.toString(16).padStart(2, '0')).join(', ')}]`);
}

console.log('\n\n=== Extracting Bank 02 data tables ===');
const bank02 = extractBankData(bank02Path);

if (!bank02) {
  console.error('Failed to extract bank 02 data');
  process.exit(1);
}

console.log(`Bank 02: extracted ${bank02.length} bytes`);

// Bank 02 tables needed
const bank02Tables = [
  // Tables referenced in bank02 disasm
  { addr: 0xAA06, len: 8, name: 'TABLE_B02_$AA06', comment: 'Init data' },
  { addr: 0xAA47, len: 48, name: 'TABLE_B02_$AA47', comment: 'Scene config table (48B)' },
  { addr: 0xAADF, len: 32, name: 'TABLE_B02_$AADF', comment: 'Scroll delta table' },
  { addr: 0xAB1F, len: 16, name: 'TABLE_B02_$AB1F', comment: 'Sprite limit table' },
];

// Note: bank02 tables use different address window. Bank02 can be at $8000-$9FFF or $A000-$BFFF.
// The disasm reference uses actual CPU addresses. Let's check the window.
// For bank02: the disasm shows addresses in $8000-$8xxx and $Axxx-$Bxxx ranges
// When at $8000 window: offset = addr - 0x8000
// When at $A000 window: offset = addr & 0x1FFF
// Either way: offset = addr & 0x1FFF

for (const table of bank02Tables) {
  const offset = table.addr & 0x1FFF;
  if (offset + table.len > 0x2000) {
    console.error(`  WARN: Table ${table.name} exceeds bank boundary`);
    continue;
  }
  const data = Array.from(bank02.slice(offset, offset + table.len));
  console.log(`\n// ${table.comment}`);
  console.log(`const ${table.name}: readonly number[] = ${formatArray(data)};`);
}
