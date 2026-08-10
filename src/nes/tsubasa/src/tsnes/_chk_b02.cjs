const fs = require('fs');

// Load Bank 00 and 02
const bank00 = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/rom-data/prg-bank-00.ts', 'utf8');
const bank02 = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/rom-data/prg-bank-02.ts', 'utf8');
const b00 = bank00.match(/0x[0-9A-Fa-f]{2}/g).map(s => parseInt(s, 16));
const b02 = bank02.match(/0x[0-9A-Fa-f]{2}/g).map(s => parseInt(s, 16));

// PRG_BANK_02 array (8KB) maps to CPU $A000-$BFFF
// Array[0] = CPU $A000, Array[0x021B] = CPU $A21B
const off = 0x021B;
console.log('=== Bank 02 $A21B-$A280 (Boot Init Chain, 100 bytes) ===');
for (let i = 0; i < 100; i++) {
  const idx = off + i;
  const cpuAddr = 0xA000 + idx;
  const v = b02[idx] || 0;
  let note = '';
  if (v === 0x20) note = ' ← JSR';
  if (v === 0x4C) note = ' ← JMP';
  if (v === 0x60) note = ' ← RTS';
  if (v === 0xA9) note = ' ← LDA #';
  if (v === 0xA2) note = ' ← LDX #';
  if (v === 0xA0) note = ' ← LDY #';
  if (v === 0x85) note = ' ← STA zp';
  if (v === 0xA5) note = ' ← LDA zp';
  if (v === 0x86) note = ' ← STX zp';
  if (v === 0x8D) note = ' ← STA abs';
  console.log('$' + cpuAddr.toString(16).toUpperCase() + ': 0x' + v.toString(16).padStart(2,'0') + ' (' + v + ')' + note);
}
