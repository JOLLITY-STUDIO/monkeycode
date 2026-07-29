import { readFileSync } from 'fs';

const d = readFileSync(
  'D:/studio/games/roms/fc=nes/Captain Tsubasa II - Super Striker (Japan)/Captain Tsubasa II - Super Striker (Japan)-openning2.log',
  'utf8'
);
const lines = d.split('\n');
console.log('Total lines:', lines.length);

// Bank groups (addr ranges) from bank-00
const bank00Set = new Set();
const bank12Set = new Set();

lines.forEach((l) => {
  const m = l.match(/\$([0-9A-Fa-f]+):([0-9A-Fa-f]{4})/);
  if (!m) return;
  const bank = parseInt(m[1], 16);
  const addr = parseInt(m[2], 16);
  if (bank === 0 && addr >= 0x8000 && addr < 0xA000) bank00Set.add(addr);
  if (bank === 6 && addr >= 0x8000 && addr < 0xA000) bank12Set.add(addr);
});

// Group into ranges (gap > 2 bytes = different function)
function group(addrs) {
  const sorted = [...addrs].sort((a, b) => a - b);
  const ranges = [];
  let start = sorted[0];
  let prev = sorted[0];
  for (let i = 1; i < sorted.length; i++) {
    const cur = sorted[i];
    if (cur - prev > 2) {
      ranges.push([start, prev, prev - start + 1]);
      start = cur;
    }
    prev = cur;
  }
  ranges.push([start, prev, prev - start + 1]);
  return ranges;
}

console.log('\n=== BANK-00 ($8000-$9FFF) executed ranges ===');
const b00r = group(bank00Set);
b00r.forEach(([s, e, len]) => {
  const hexS = s.toString(16).toUpperCase().padStart(4, '0');
  const hexE = e.toString(16).toUpperCase().padStart(4, '0');
  const kb = Math.round(len / 1024 * 10) / 10;
  console.log(`  $${hexS} – $${hexE}  (${len} bytes, ~${kb}KB)`);
});

console.log('\n=== BANK-12 ($8000-$9FFF) executed ranges ===');
const b12r = group(bank12Set);
b12r.forEach(([s, e, len]) => {
  const hexS = s.toString(16).toUpperCase().padStart(4, '0');
  const hexE = e.toString(16).toUpperCase().padStart(4, '0');
  const kb = Math.round(len / 1024 * 10) / 10;
  console.log(`  $${hexS} – $${hexE}  (${len} bytes, ~${kb}KB)`);
});

// PPU writes
const ppuCount = new Map();
lines.forEach((l) => {
  for (let r = 0; r <= 7; r++) {
    const reg = `$200${r}`;
    if (l.includes(reg)) {
      ppuCount.set(reg, (ppuCount.get(reg) || 0) + 1);
    }
  }
});
console.log('\n=== PPU register hits ===');
[...ppuCount.entries()].sort((a, b) => b[1] - a[1]).forEach(([reg, cnt]) => {
  console.log(`  ${reg}: ${cnt} writes`);
});

// Frame count
const frames = new Set();
lines.forEach(l => {
  const f = l.match(/^f(\d+)/);
  if (f) frames.add(parseInt(f[1]));
});
console.log(`\nTotal frames: ${frames.size} (f${Math.min(...frames)} – f${Math.max(...frames)})`);

// NMI entry points (usually $0F:xxxx jumps to $Cxxx or RTI)
console.log('\n=== First NMI entry and exit ===');
let inNMI = false;
let nmiStart = 0;
lines.forEach((l, i) => {
  // NMI starts when we see JMP $C4xx, typically from $0F bank
  if (!inNMI && l.includes('JMP $C') && l.includes('$0F:')) {
    inNMI = true;
    nmiStart = i;
    const f = l.match(/^f(\d+)/);
    if (f) console.log(`  NMI ENTRY: #${i} frame ${f[1]} | ${l.substring(0, 160)}`);
  }
  if (inNMI && l.includes('RTI')) {
    inNMI = false;
    const f = l.match(/^f(\d+)/);
    if (f) console.log(`  NMI EXIT:  #${i} frame ${f[1]} | ${l.substring(0, 160)}`);
  }
});

// Show lines at bank switch (f2690)
console.log('\n=== Lines around bank switch (f2690) ===');
const targetFrame = 2690;
let found = false;
lines.forEach((l, i) => {
  const f = l.match(/^f(\d+)/);
  if (f && parseInt(f[1]) === targetFrame) {
    console.log(`#${i}: ${l.substring(0, 200)}`);
    found = true;
  }
  if (f && found && parseInt(f[1]) > targetFrame) found = false;
});
