import { readFileSync, writeFileSync } from 'fs';

const d = readFileSync(
  'D:/studio/games/roms/fc=nes/Captain Tsubasa II - Super Striker (Japan)/Captain Tsubasa II - Super Striker (Japan)-openning2.log',
  'utf8'
);
const lines = d.split('\n');
console.log('Total trace lines:', lines.length);

// ===== 1. Bank hit counters per address range =====
const bank00 = new Map(); // addr -> hit count
const bank12 = new Map();
const ppuRegs = new Map(); // PPU reg (like 2006,2007) -> hit count
const nmis = []; // NMI entry points

let currentBank = null;

lines.forEach((l, i) => {
  const m = l.match(/\$([0-9A-Fa-f]+):([0-9A-Fa-f]{4})/);
  if (!m) return;
  const bank = parseInt(m[1], 16);
  const addr = parseInt(m[2], 16);

  // Check for NMI - jump to NMI vector at start of vblank
  // Usually triggered by RTI, or we see jump to $C000+ area
  if (bank === 0x0f && addr >= 0xC000) {
    const fn = l.match(/(\w+) +\$/);
    if (fn) nmis.push([i, fn[1], l.substring(0, 180)]);
  }

  if (bank === 0 && addr >= 0x8000 && addr < 0xA000) {
    bank00.set(addr, (bank00.get(addr) || 0) + 1);
  }
  if (bank === 6 && addr >= 0x8000 && addr < 0xA000) {
    bank12.set(addr, (bank12.get(addr) || 0) + 1);
  }

  // PPU register writes
  if (l.includes('$2006') || l.includes('$2007') || l.includes('$2005') || l.includes('$2000') || l.includes('$2001')) {
    const r = l.match(/\$200(\d)/);
    if (r) {
      const reg = '200' + r[1];
      ppuRegs.set(reg, (ppuRegs.get(reg) || 0) + 1);
    }
  }
});

// ===== 2. Sort bank-00 by address, group into ranges =====
const b00Sorted = [...bank00.keys()].sort((a, b) => a - b);
console.log('\n=== BANK-00 groups ===');
let prev = b00Sorted[0];
let start = b00Sorted[0];
b00Sorted.forEach(a => {
  if (a - prev > 0x10) {
    console.log(`  $${start.toString(16).toUpperCase().padStart(4,'0')} - $${prev.toString(16).toUpperCase().padStart(4,'0')} (gap=${(a-prev).toString(16)})`);
    start = a;
  }
  prev = a;
});
console.log(`  $${start.toString(16).toUpperCase().padStart(4,'0')} - $${prev.toString(16).toUpperCase().padStart(4,'0')}`);

// ===== 3. PPU stats =====
console.log('\n=== PPU register writes ===');
ppuRegs.forEach((cnt, reg) => console.log(`  $${reg}: ${cnt} writes`));

// ===== 4. Key frames (bank switches, NMI) =====
console.log('\n=== Bank switches and NMI ===');
let lastNMI = 0;
let nmiCount = 0;
lines.forEach((l, i) => {
  // Bank switch: STA $8000 or STA $8001
  if (l.includes('STA $8000') || l.includes('STA $8001')) {
    const f = l.match(/^f(\d+)/);
    if (f) {
      // Also capture A value
      const aMatch = l.match(/A:(\$?[0-9A-Fa-f]+)/);
      const reg = l.includes('$8000') ? '8000' : '8001';
      const aVal = aMatch ? aMatch[1] : '?';
      console.log(`  [f${f[1]}] STA $${reg} = ${aVal} | ${l.substring(0,160)}`);
    }
  }
  // NMI entry (typical pattern: jump to $C000+ from bank $0F)
  if ((l.includes('JMP $C') || l.includes('JSR $C')) && i - lastNMI > 500) {
    const f = l.match(/^f(\d+)/);
    if (f) {
      nmiCount++;
      lastNMI = i;
      // console.log(`  NMI #${nmiCount} f${f[1]}: ${l.substring(0,160)}`);
    }
  }
});

// ===== 5. Trace start (first 30 lines in game area) =====
console.log('\n=== Trace first 60 lines ===');
lines.slice(0, 60).forEach((l, i) => console.log(`#${i}: ${l.substring(0, 200)}`));

// ===== 6. Write bank-00 addr list =====
const b00Out = b00Sorted.map(a => '0x' + a.toString(16).toUpperCase().padStart(4,'0')).join(',\n  ');
console.log('\n=== BANK-00 full addr list (for grepping) ===');
console.log(b00Out);
