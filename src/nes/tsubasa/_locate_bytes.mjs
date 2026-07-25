import { readFileSync } from 'fs';

const f = readFileSync('src/tsnes/tsubasa-code/prg_banks/bank_00.ts', 'utf8');
const lines = f.split('\n');

// buildbytecodeHandlers starts at CPU $8840
// Find key patterns in the byte array:
// 1. Opcode handler $9241-$9255: C9 A0 B0 13 18 69 20 85 E7 A0 01 B1 92 85 E6 20 D8 94 A9 02 4C AE 94
// 2. $94D8 function: A0 00 B1 E6 09 80 85 9E C8 B1 E6 85 9F A0 02 B1 E6 85 A0 C8 B1 E6 85 A1

const OPCODE_HANDLER_BYTES = 'C9 A0 B0 13 18 69 20 85 E7 A0 01 B1 92 85 E6 20 D8 94 A9 02 4C AE 94';
const LOAD_CHR_BYTES = 'A0 00 B1 E6 09 80 85 9E C8 B1 E6 85 9F A0 02 B1 E6 85 A0 C8 B1 E6 85 A1';
const SCRIPT_ENTRY_BYTES = 'A0 00 B1 92 30 17';

console.log('=== Searching bank_00.ts for key patterns ===\n');

let arrayStartLine = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('buildbytecodeHandlers')) {
    arrayStartLine = i + 1; // return [ starts after function line
    break;
  }
}

console.log('buildbytecodeHandlers starts at line:', arrayStartLine);

// Read all bytes from the array and join
let allBytes = '';
for (let i = arrayStartLine; i < lines.length && !lines[i].includes(']'); i++) {
  allBytes += ' ' + lines[i].replace(/\/\/.*/, '').replace(/[,;]/g, ' ').trim();
}
allBytes = allBytes.replace(/\s+/g, ' ').trim();

console.log('Total bytes in array:', allBytes.split(' ').filter(Boolean).length);

// Find pattern positions
const findPattern = (pattern: string) => {
  const patternStr = pattern.replace(/\s+/g, ' ').trim().toUpperCase();
  const haystack = ' ' + allBytes.toUpperCase() + ' ';
  const idx = haystack.indexOf(' ' + patternStr + ' ');
  if (idx === -1) return -1;
  // Count bytes before this position
  const before = haystack.substring(0, idx).split(' ').filter(Boolean).length;
  return before; // byte offset in array
};

const opHandlerOff = findPattern(OPCODE_HANDLER_BYTES);
const loadChrOff = findPattern(LOAD_CHR_BYTES);
const scriptEntryOff = findPattern(SCRIPT_ENTRY_BYTES);

const cpuBase = 0x8840;

console.log('\n=== Pattern locations (CPU offsets) ===');
if (opHandlerOff >= 0) console.log(`Opcode handler $80-$9F: array[${opHandlerOff}] → CPU $${(cpuBase + opHandlerOff).toString(16).toUpperCase()}`);
if (loadChrOff >= 0) console.log(`$94D8 loadChrBanks:       array[${loadChrOff}] → CPU $${(cpuBase + loadChrOff).toString(16).toUpperCase()}`);
if (scriptEntryOff >= 0) console.log(`Script entry:             array[${scriptEntryOff}] → CPU $${(cpuBase + scriptEntryOff).toString(16).toUpperCase()}`);

// Print the bytes around each pattern
if (opHandlerOff >= 0) {
  const bytes = allBytes.split(' ').filter(Boolean);
  const ctx = bytes.slice(opHandlerOff - 10, opHandlerOff + 25);
  console.log('\n=== Opcode handler context ===');
  console.log(ctx.join(', '));
}

if (loadChrOff >= 0) {
  const bytes = allBytes.split(' ').filter(Boolean);
  const ctx = bytes.slice(loadChrOff - 5, loadChrOff + 25);
  console.log('\n=== loadChrBanks ($94D8) context ===');
  console.log(ctx.join(', '));
}
