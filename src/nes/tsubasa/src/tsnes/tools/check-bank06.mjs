import { readFileSync } from 'fs';

const src = readFileSync(
  'tsubasa-hex2asm/prg_banks/prg_bank_06_palette_data.ts',
  'utf8'
);

// Find the data array
const startIdx = src.indexOf('const DATA_$8000_$9FFF');
const bracketStart = src.indexOf('[', startIdx);
const bracketEnd = src.indexOf('];', bracketStart);
const arrayStr = src.substring(bracketStart + 1, bracketEnd);

const bytes = arrayStr
  .split(',')
  .map(s => {
    const h = s.trim().replace(/\/\/.*$/, '').trim();
    if (h.startsWith('0x') || h.startsWith('0X'))
      return parseInt(h, 16);
    if (h.startsWith('$'))
      return parseInt(h.slice(1), 16);
    return parseInt(h, 16);
  })
  .filter(n => !isNaN(n));

console.log('Total bytes parsed:', bytes.length);

// Show bytes at trace addresses as instructions
function showAddr(addr, n) {
  const off = addr - 0x8000;
  const bs = [];
  for (let i = 0; i < n; i++) bs.push(bytes[off + i]);
  const hex = bs.map(b => '$' + b.toString(16).padStart(2,'0').toUpperCase()).join(' ');
  console.log(`  $${addr.toString(16).toUpperCase()}: ${hex}`);
}

console.log('\n--- Trace code locations ---');
console.log('Trace shows: $06:84A6: A6 F3  LDX $F3');
showAddr(0x84A6, 8);

console.log('\nTrace shows: $06:8179: 48  PHA');
showAddr(0x8179, 8);

console.log('\nTrace shows: $06:8157: 65 FD  ADC $FD');
showAddr(0x8157, 8);

console.log('\nTrace shows: $06:80E1 ...');
showAddr(0x80E1, 16);

// Count how many bytes look like valid 6502 opcodes
// Simple check: any byte 0x00-0xFF can be an opcode, so this test is meaningless.
// Instead, let's check if there are patterns that look like code vs data.

console.log('\n--- Checking $8157 area for code patterns ---');
// A common code pattern: LDA $xxxx (0xAD xx xx) or CMP #xx (0xC9 xx)
for (let addr = 0x8150; addr < 0x8180; addr++) {
  const off = addr - 0x8000;
  const b = bytes[off];
  if (b !== undefined) {
    const b2 = bytes[off + 1];
    const b3 = bytes[off + 2];
    let comment = '';
    if (b === 0xA6) comment = `LDX $${b2.toString(16).padStart(2,'0')}`;
    if (b === 0xA5) comment = `LDA $${b2.toString(16).padStart(2,'0')}`;
    if (b === 0x48) comment = 'PHA';
    if (b === 0x60) comment = 'RTS';
    if (b === 0x65) comment = `ADC $${b2.toString(16).padStart(2,'0')}`;
    if (b === 0x85) comment = `STA $${b2.toString(16).padStart(2,'0')}`;
    if (b === 0xC9) comment = `CMP #$${b2.toString(16).padStart(2,'0')}`;
    if (b === 0xD0) comment = `BNE +$${b2.toString(16)}`;
    if (b === 0xF0) comment = `BEQ +$${b2.toString(16)}`;
    if (b === 0x20) comment = `JSR $${b3.toString(16).padStart(2,'0')}${b2.toString(16).padStart(2,'0')}`;
    if (b === 0x4C) comment = `JMP $${b3.toString(16).padStart(2,'0')}${b2.toString(16).padStart(2,'0')}`;
    if (comment) console.log(`  $${addr.toString(16).toUpperCase()}: $${b.toString(16).padStart(2,'0')} ${comment}`);
  }
}

console.log('\n--- Checking $84A0-$84D0 for trace-matching code ---');
for (let addr = 0x84A0; addr < 0x84D0; addr++) {
  const off = addr - 0x8000;
  const b = bytes[off];
  if (b !== undefined) {
    const b2 = bytes[off + 1];
    const b3 = bytes[off + 2];
    let comment = '';
    if (b === 0xA6) comment = `LDX $${b2.toString(16).padStart(2,'0')}`;
    if (b === 0xA5) comment = `LDA $${b2.toString(16).padStart(2,'0')}`;
    if (b === 0x60) comment = 'RTS';
    if (b === 0xA9) comment = `LDA #$${b2.toString(16).padStart(2,'0')}`;
    if (b === 0x9D) comment = `STA $${b3.toString(16).padStart(2,'0')}${b2.toString(16).padStart(2,'0')},X`;
    if (b === 0xBD) comment = `LDA $${b3.toString(16).padStart(2,'0')}${b2.toString(16).padStart(2,'0')},X`;
    if (b === 0xD0) comment = `BNE +$${b2.toString(16)}`;
    if (b === 0xCA) comment = 'DEX';
    if (b === 0xA0) comment = `LDY #$${b2.toString(16).padStart(2,'0')}`;
    if (b === 0x91) comment = `STA ($${b2.toString(16).padStart(2,'0')})`;
    if (comment) console.log(`  $${addr.toString(16).toUpperCase()}: $${b.toString(16).padStart(2,'0')} ${comment}`);
  }
}
