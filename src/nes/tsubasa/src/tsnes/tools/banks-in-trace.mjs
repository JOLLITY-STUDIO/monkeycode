import { readFileSync } from 'fs';
const d = readFileSync(
  'D:/studio/games/roms/fc=nes/Captain Tsubasa II - Super Striker (Japan)/Captain Tsubasa II - Super Striker (Japan)-openning2.log',
  'utf8'
);
const lines = d.split('\n');

// Map of bank -> Set of addresses in $8000-$BFFF
const banks8000 = new Map(); // bank -> Set(addr)
const banksA000 = new Map;

lines.forEach((l) => {
  const m = l.match(/\$([0-9A-Fa-f]+):([0-9A-Fa-f]{4})/);
  if (m) {
    const bank = m[1].toUpperCase();
    const addr = m[2].toUpperCase();
    const addrNum = parseInt(addr, 16);
    if (addrNum >= 0x8000 && addrNum < 0xA000) {
      if (!banks8000.has(bank)) banks8000.set(bank, new Set());
      banks8000.get(bank).add(addr);
    } else if (addrNum >= 0xA000 && addrNum < 0xC000) {
      if (!banksA000.has(bank)) banksA000.set(bank, new Set());
      banksA000.get(bank).add(addr);
    }
  }
});

console.log('=== Banks in $8000-$9FFF (CODE window) ===');
const s8 = [...banks8000.entries()].sort((a,b) => parseInt(a[0],16) - parseInt(b[0],16));
s8.forEach(([b, addrs]) => {
  const samples = [...addrs].slice(0,10).sort().join(', ');
  console.log(`  $${b.padStart(2,'0')}  ${addrs.size} unique addrs  [${samples}]`);
});

console.log('\n=== Banks in $A000-$BFFF (DATA window) ===');
const sa = [...banksA000.entries()].sort((a,b) => parseInt(a[0],16) - parseInt(b[0],16));
sa.forEach(([b, addrs]) => {
  const samples = [...addrs].slice(0,10).sort().join(', ');
  console.log(`  $${b.padStart(2,'0')}  ${addrs.size} unique addrs  [${samples}]`);
});

// Also check: what hex2asm prg_bank file does each physical bank correspond to?
const BANK_NAMES = {
  '00': 'bank-00 (dispatch/scene)',
  '01': 'bank-01 (match jump/title)',
  '02': 'bank-02 (NMI renderer)',
  '03': 'bank-03 (data)',
  '04': 'bank-04 (data)',
  '05': 'bank-05 (data)',
  '06': 'bank-06 (palette DATA?)',
  '07': 'bank-07 (sprite data)',
  '08': 'bank-08 (data)',
  '09': 'bank-09 (data)',
  '0A': 'bank-10 (data) - note offset!',
  '0B': 'bank-11 (background CODE)',
  '0C': 'bank-12 (audio CODE)',
  '0D': 'bank-13 (data)',
  '0E': 'bank-14 (data)',
  '0F': 'bank-15 (data / fixed)',
  '10': 'bank-16 (scene logic CODE)',
  '11': 'bank-17 (data)',
  '12': 'bank-18 (data)',
  '13': 'bank-19 (lookup CODE?)',
  '14': 'bank-20 (team data CODE)',
  '15': 'bank-21 (data)',
  '16': 'bank-22 (sprite engine CODE)',
  '17': 'bank-23 (data)',
  '18': 'bank-24 (cutscene CODE)',
  '19': 'bank-25 (data)',
  '1A': 'bank-26 (match core CODE)',
  '1B': 'bank-27 (player data CODE?)',
  '1C': 'bank-28 (attributes CODE?)',
  '1D': 'bank-29 (data)',
  '1E': 'bank-30 (system lib CODE)',
  '1F': 'bank-31 (boot vectors CODE)',
};

console.log('\n=== Bank name mapping ===');
[...new Set([...banks8000.keys(), ...banksA000.keys()])].sort((a,b) => parseInt(a,16)-parseInt(b,16)).forEach(b => {
  console.log(`  $${b.padStart(2,'0')} → ${BANK_NAMES[b.padStart(2,'0')] || '???'}`);
});
