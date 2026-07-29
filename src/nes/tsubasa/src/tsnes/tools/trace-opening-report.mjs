import { readFileSync, writeFileSync } from 'fs';

const d = readFileSync(
  'D:/studio/games/roms/fc=nes/Captain Tsubasa II - Super Striker (Japan)/Captain Tsubasa II - Super Striker (Japan)-openning2.log',
  'utf8'
);
const lines = d.split('\n');

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

const out = [];
out.push('=== BANK-00 executed code ranges ($8000-$9FFF) ===');
group(bank00Set).forEach(([s, e, len]) => {
  out.push(`  $${s.toString(16).toUpperCase().padStart(4,'0')} - $${e.toString(16).toUpperCase().padStart(4,'0')}  (${len} bytes)`);
});

out.push('\n=== BANK-12 executed code ranges ($8000-$9FFF) ===');
group(bank12Set).forEach(([s, e, len]) => {
  out.push(`  $${s.toString(16).toUpperCase().padStart(4,'0')} - $${e.toString(16).toUpperCase().padStart(4,'0')}  (${len} bytes)`);
});

// PPU reg hits
const ppuCount = new Map();
lines.forEach((l) => {
  for (let r = 0; r <= 7; r++) {
    const reg = `$200${r}`;
    if (l.includes(reg)) {
      ppuCount.set(reg, (ppuCount.get(reg) || 0) + 1);
    }
  }
});
out.push('\n=== PPU register writes ===');
[...ppuCount.entries()].sort((a, b) => b[1] - a[1]).forEach(([reg, cnt]) => {
  out.push(`  ${reg}: ${cnt} writes`);
});

// Frames
const frames = new Set();
lines.forEach(l => {
  const f = l.match(/^f(\d+)/);
  if (f) frames.add(parseInt(f[1]));
});
out.push(`\nTotal frames: ${frames.size} (f${Math.min(...frames)} - f${Math.max(...frames)})`);

// First 200 lines that are in bank00 or bank12
out.push('\n=== First 80 lines of bank-00/12 code ===');
let cnt = 0;
lines.forEach((l, i) => {
  if (cnt >= 80) return;
  const m = l.match(/\$([0-9A-Fa-f]+):([0-9A-Fa-f]{4})/);
  if (!m) return;
  const bank = parseInt(m[1], 16);
  if ((bank === 0 || bank === 6) && parseInt(m[2], 16) >= 0x8000 && parseInt(m[2], 16) < 0xA000) {
    cnt++;
    out.push(`#${i}: ${l.substring(0, 200)}`);
  }
});

writeFileSync('D:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/tools/trace-opening-report.txt', out.join('\n'), 'utf8');
console.log('Report written. ' + out.length + ' lines');
console.log(out.join('\n'));
