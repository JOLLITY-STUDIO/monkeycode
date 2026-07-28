/**
 * Extract data tables from PRG bank .ts files - robust version
 * Usage: node tools/extract_v2.mjs
 */
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const bank01Path = resolve(__dirname, '../tsubasa-hex2asm/prg_banks/prg_bank_01_match_jump.ts');

const content = readFileSync(bank01Path, 'utf-8');

/**
 * Extract all data from a TS file by finding the assembled _PRG_BANK_XX array
 * and recursively resolving all ...SEGMENT references
 */
function extractFullBank(fileContent) {
  // Find the assembled array definition
  const bankMatch = fileContent.match(/const\s+_PRG_BANK_\d+\s*:\s*readonly\s+number\[\]\s*=\s*\[/);
  if (!bankMatch) { console.error('No _PRG_BANK array found'); return null; }
  
  // Extract segment names from the assembled array body (between [...])
  const afterBank = fileContent.substring(bankMatch.index);
  // Find matching ] for the outer [
  let depth = 1;
  let pos = afterBank.indexOf('[') + 1;
  const endPos = (() => {
    for (let i = pos; i < afterBank.length; i++) {
      if (afterBank[i] === '[') depth++;
      else if (afterBank[i] === ']') { depth--; if (depth === 0) return i; }
    }
    return -1;
  })();
  if (endPos < 0) { console.error('Unmatched brackets'); return null; }
  
  const body = afterBank.substring(pos, endPos);
  
  // Each line in body looks like: ...SEGMENT_NAME or ...SEGMENT_NAME()
  // Collect all segment names in order
  const segmentNames = [];
  const lines = body.split('\n');
  for (const line of lines) {
    // Match: ...DATA_$XXXX_$YYYY or ...CODE_$XXXX_$YYYY()
    const m = line.match(/\.\.\.(DATA_\$[0-9A-F]+_\$[0-9A-F]+|CODE_\$[0-9A-F]+_\$[0-9A-F]+)/);
    if (m) {
      segmentNames.push(m[1]);
    }
  }
  
  console.log(`Found ${segmentNames.length} segments in assembled array`);
  
  // For each segment, extract its data bytes
  const bank = new Uint8Array(0x2000);
  
  for (const segName of segmentNames) {
    const addrMatch = segName.match(/[A-Z]+_\$([0-9A-F]+)_\$([0-9A-F]+)/);
    if (!addrMatch) continue;
    const startAddr = parseInt(addrMatch[1], 16);
    const endAddr = parseInt(addrMatch[2], 16);
    const offset = startAddr - 0x8000;
    const expectedLen = endAddr - startAddr + 1;
    
    let data;
    if (segName.startsWith('DATA_')) {
      data = findDataSegment(fileContent, segName);
    } else {
      data = findCodeSegment(fileContent, segName);
    }
    
    if (!data || data.length === 0) {
      console.warn(`  WARN: Empty data for ${segName} (expected ${expectedLen} bytes)`);
      continue;
    }
    
    if (data.length !== expectedLen) {
      console.warn(`  WARN: ${segName} size mismatch: expected ${expectedLen}, got ${data.length}`);
    }
    
    // Place data in bank at correct offset
    for (let i = 0; i < data.length && offset + i < 0x2000; i++) {
      bank[offset + i] = data[i];
    }
  }
  
  return bank;
}

function findDataSegment(fileContent, segName) {
  // Find: const SEG_NAME: readonly number[] = [\n  0xXX, 0xXX, ...\n];
  const escaped = segName.replace(/\$/g, '\\$');
  const regex = new RegExp(`const\\s+${escaped}\\s*:\\s*readonly\\s+number\\[\\]\\s*=\\s*\\[`);
  const match = regex.exec(fileContent);
  if (!match) {
    console.warn(`    Data segment ${segName} not found by regex`);
    return null;
  }
  return extractArrayByteValues(fileContent.substring(match.index));
}

function findCodeSegment(fileContent, segName) {
  // Find: function SEG_NAME(): readonly number[] { return [\n  0xXX, ...\n  ];\n}
  const escaped = segName.replace(/\$/g, '\\$');
  const regex = new RegExp(`function\\s+${escaped}\\s*\\(\\s*\\)\\s*:\\s*readonly\\s+number\\[\\]\\s*\\{`);
  const match = regex.exec(fileContent);
  if (!match) {
    console.warn(`    Code segment ${segName} not found by regex`);
    return null;
  }
  // Find 'return' after the function opening
  const afterFunc = fileContent.substring(match.index);
  const returnIdx = afterFunc.indexOf('return');
  if (returnIdx < 0) {
    // Try to find directly after regex match without 'return' keyword
    // Some segments might have inline arrays
    return extractArrayByteValues(afterFunc);
  }
  return extractArrayByteValues(afterFunc.substring(returnIdx));
}

function extractArrayByteValues(text) {
  // Find the first [ and extract all hex values between matching ]
  const openIdx = text.indexOf('[');
  if (openIdx < 0) return [];
  
  let depth = 1;
  let pos = openIdx;
  for (let i = openIdx + 1; i < text.length; i++) {
    if (text[i] === '[') depth++;
    else if (text[i] === ']') { depth--; if (depth === 0) { pos = i; break; } }
  }
  
  const inner = text.substring(openIdx + 1, pos);
  
  // Extract all hex values: 0xXX
  const hexMatches = inner.match(/0x[0-9A-Fa-f]{2}/g);
  if (!hexMatches) return [];
  
  return hexMatches.map(h => parseInt(h, 16));
}

// ============ Main ============
console.log('Extracting Bank 01...');
const bank01 = extractFullBank(content);

if (!bank01) {
  console.error('Failed!');
  process.exit(1);
}

console.log(`Bank size: ${bank01.length} bytes`);

// Verify some known values
console.log('\nVerification:');
console.log('$83EE (offset 0x3EE):', 
  Array.from(bank01.slice(0x3EE, 0x3EE + 16)).map(n => '0x' + n.toString(16).padStart(2, '0')).join(' '));
console.log('$B1E8 (offset 0x11E8):', 
  Array.from(bank01.slice(0x11E8, 0x11E8 + 16)).map(n => '0x' + n.toString(16).padStart(2, '0')).join(' '));
console.log('$B255 (offset 0x1255):', 
  Array.from(bank01.slice(0x1255, 0x1255 + 16)).map(n => '0x' + n.toString(16).padStart(2, '0')).join(' '));
console.log('$BC6E (offset 0x1C6E):', 
  Array.from(bank01.slice(0x1C6E, 0x1C6E + 16)).map(n => '0x' + n.toString(16).padStart(2, '0')).join(' '));

// Now extract all needed tables
console.log('\n\n// ======== BANK 01 DATA TABLES ========');
function fmtArr(arr, perLine = 16) {
  const lines = [];
  for (let i = 0; i < arr.length; i += perLine) {
    lines.push('  ' + arr.slice(i, i + perLine).map(n => '0x' + n.toString(16).toUpperCase().padStart(2, '0')).join(', ') + ',');
  }
  return '[\n' + lines.join('\n') + '\n]';
}

const tables = [
  { addr: 0x83EE, len: 0x14, name: 'TABLE_$83EE_JUMP', comment: 'Bytecode entry jump table (40B, offsets only)' },
  { addr: 0xAD8A, len: 0x14, name: 'TABLE_$AD8A_STAT_IDX', comment: 'Player stat index table (20B)' },
  { addr: 0xACA2, len: 0xFC, name: 'TABLE_$ACA2_OAM_A', comment: 'OAM data A (252B)' },
  { addr: 0xACB8, len: 0xFC, name: 'TABLE_$ACB8_OAM_B', comment: 'OAM data B (252B)' },
  { addr: 0xB1E8, len: 0x59, name: 'TABLE_$B1E8_PLAYER', comment: 'Player menu table (89B)' },
  { addr: 0xB241, len: 0x14, name: 'TABLE_$B241_NTROWS', comment: 'Nametable row index table (20B)' },
  { addr: 0xB255, len: 0xA8, name: 'TABLE_$B255_TILES', comment: 'Title tile search table (168B)' },
  { addr: 0xB2ED, len: 0x10, name: 'TABLE_$B2ED_DIR', comment: 'Direction offset table (16B)' },
  { addr: 0xB229, len: 0x04, name: 'TABLE_$B229_PAL', comment: 'Palette index table (4B)' },
  { addr: 0xB205, len: 0x08, name: 'TABLE_$B205_SPRPAL', comment: 'Sprite palette (8B)' },
  { addr: 0xB22D, len: 0x14, name: 'TABLE_$B22D_SPRATTR', comment: 'Sprite attribute table (20B)' },
  { addr: 0xB271, len: 0x34, name: 'TABLE_$B271_PALDATA', comment: 'Palette data (52B)' },
  { addr: 0xBCD1, len: 0x22, name: 'TABLE_$BCD1_SCENEINFO', comment: 'Scene info table (34B)' },
  { addr: 0xBCF3, len: 0x20, name: 'TABLE_$BCF3_DIGITS', comment: 'Digit tile table (32B)' },
  { addr: 0xBD64, len: 0x20, name: 'TABLE_$BD64_CHARS', comment: 'Char tile table (32B)' },
  { addr: 0xBC6E, len: 0x50, name: 'TABLE_$BC6E_NTDATA', comment: 'Title nametable tiles (80B)' },
  { addr: 0xB3F9, len: 0x12, name: 'TABLE_$B3F9_SCENE_A', comment: 'Scene bytecode table A (18B)' },
  { addr: 0xB3D7, len: 0x12, name: 'TABLE_$B3D7_SCENE_B', comment: 'Scene bytecode table B (18B)' },
  { addr: 0xB3B5, len: 0x12, name: 'TABLE_$B3B5_SCENE_C', comment: 'Scene bytecode table C (18B)' },
  { addr: 0xB371, len: 0x22, name: 'TABLE_$B371_SCENE_D', comment: 'Scene bytecode table D (34B)' },
  { addr: 0xBDA8, len: 0x40, name: 'TABLE_$BDA8_SCORE', comment: 'Score digit table (64B)' },
  { addr: 0xBC48, len: 0x10, name: 'TABLE_$BC48_PPUADDR', comment: 'PPU address table (16B)' },
];

for (const t of tables) {
  const off = t.addr & 0x1FFF;
  const data = Array.from(bank01.slice(off, off + t.len));
  console.log(`\n// ${t.comment}`);
  console.log(`const ${t.name}: readonly number[] = ${fmtArr(data)};`);
}
