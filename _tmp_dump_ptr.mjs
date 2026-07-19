import { readFileSync, readdirSync } from 'fs';

const DIR = 'src/nes/tsubasa/romdata';
const files = readdirSync(DIR);
const rom = readFileSync(`${DIR}/${files.find(f=>f.endsWith('.nes'))}`);
const cdl = readFileSync(`${DIR}/${files.find(f=>f.includes('prg-not-logged-15.13')&&f.endsWith('.cdl'))}`);

const HEADER = 16, BANK = 16384;

// Bank 5 data at StatBlock 0xABDC -> ROM offset
const BANK5_ROM = HEADER + 5 * BANK;
const STATBLOCK_OFF = BANK5_ROM + 0x2BDC;

console.log('=== Bank 5 StatBlock at CPU 0xABDC ===');
for (let base = -0x20; base < 0x100; base += 16) {
  const off = STATBLOCK_OFF + base;
  if (off < HEADER || off >= rom.length) continue;
  const bytes = [...rom.slice(off, off + 16)];
  const hex = bytes.map(b=>b.toString(16).padStart(2,'0')).join(' ');
  const bankLocal = 0x2BDC + base;
  const cdlIdx = 5 * BANK + bankLocal;
  const accessed = (cdlIdx >= 0 && cdlIdx < cdl.length) ? ((cdl[cdlIdx] & 2) !== 0) : false;
  const marker = accessed ? '*' : ' ';
  console.log(`${marker} 0x${off.toString(16)} [+${(base<0?'-':'+')}${Math.abs(base).toString(16)}]: ${hex}`);
}

// Now let's look at the roster data. In the disasm, code at $01:8893 does LDA $AA47,X
// Bank 1, CPU 0xAA47 -> ROM offset
const BANK1_ROM = HEADER + 1 * BANK;
const ROSTER_OFF = BANK1_ROM + 0x2A47;
console.log('\n=== Bank 1 Roster at CPU 0xAA47 ===');
for (let base = 0; base < 0x100; base += 16) {
  const off = ROSTER_OFF + base;
  const bytes = [...rom.slice(off, off + 16)];
  const hex = bytes.map(b=>b.toString(16).padStart(2,'0')).join(' ');
  const dec = bytes.map(b=>b.toString().padStart(3)).join(' ');
  const asc = bytes.map(b=>b>=0x20&&b<0x7f?String.fromCharCode(b):'.').join('');
  // Check which bytes are accessed
  let markers = '';
  for (let j = 0; j < 16; j++) {
    const cdlIdx = 1 * BANK + 0x2A47 + base + j;
    markers += (cdl[cdlIdx] & 2) ? '*' : '.';
  }
  console.log(`${markers} 0x${off.toString(16)}: ${hex}  ${asc}`);
}

// Check what Tsubasa's player ID 243 (0xF3) maps to
// The roster data at ($5F)+Y should have a byte for player 243
// But we don't know $5F. Let me check the code that sets it up.
// Look at the LDA $AA47,X code usage at $01:8893

// Let me check Bank 1 code at 0x8893
const BANK1_CODE_ROM = BANK1_ROM;
const CODE_8893 = BANK1_CODE_ROM + 0x0893;
console.log('\n=== Bank 1 code around 0x8893 (LDA $AA47,X) ===');
for (let base = -16; base < 32; base += 16) {
  const off = CODE_8893 + base;
  const bytes = [...rom.slice(off, off + 16)].map(b=>b.toString(16).padStart(2,'0')).join(' ');
  console.log(`  0x${off.toString(16)}: ${bytes}`);
}
