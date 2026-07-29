import { readFileSync } from 'fs';

const d = readFileSync(
  'D:/studio/games/roms/fc=nes/Captain Tsubasa II - Super Striker (Japan)/Captain Tsubasa II - Super Striker (Japan)-openning2.log',
  'utf8'
);
const lines = d.split('\n');

// Find cross-bank transitions: when bank changes between consecutive lines
// Especially bank 00 ↔ bank 06
console.log('=== Bank transitions in $8000-$9FFF ($00 ↔ $06) ===');
let lastBank = null;
let count = 0;
for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  const m = l.match(/\$([0-9A-Fa-f]+):([0-9A-Fa-f]{4})/);
  if (!m) continue;
  const bank = m[1].toUpperCase();
  const addr = m[2];
  const addrNum = parseInt(addr, 16);
  if (addrNum < 0x8000 || addrNum >= 0xA000) continue;

  if (lastBank !== null && bank !== lastBank) {
    // Bank transition!
    console.log(`\nLine ${i}: $${lastBank} → $${bank} at $${addr}`);
    // Show previous 3 lines and next 3 lines
    for (let j = Math.max(0, i - 3); j <= Math.min(lines.length - 1, i + 3); j++) {
      console.log(`  ${j}: ${lines[j].trim().substring(0, 130)}`);
    }
    count++;
    if (count >= 10) break;
  }
  lastBank = bank;
}
