import fs from 'fs';

const t = fs.readFileSync('src/langrisser2/20260713/asm/m68k/rom.asm', 'utf8');
const lines = t.split('\n');

// Search for title screen code area (around 0xC914 where the title scene task runs)
const patterns = [
  { re: /0000c914/, label: 'title_func_c914' },
  { re: /0000c7ae/, label: 'font_loader?' },
  { re: /VDP_data|VDP_ctrl|\$C00000|\$C00004/, label: 'VDP access' },
  { re: /0000c80c/, label: 'c80c title init' },
];

for (const p of patterns) {
  const matches = [];
  lines.forEach((l, i) => {
    if (p.re.test(l)) matches.push(i);
  });
  console.log(`\n=== ${p.label}: ${matches.length} matches ===`);
  if (matches.length > 0 && matches.length <= 10) {
    for (const mi of matches.slice(0, 5)) {
      console.log(`--- line ${mi + 1} ---`);
      for (let j = Math.max(0, mi - 3); j < Math.min(lines.length, mi + 25); j++) {
        console.log(`${(j + 1).toString().padStart(6)}: ${lines[j].substring(0, 140)}`);
      }
    }
  } else if (matches.length > 10) {
    // Just show count and first match location
    console.log(`  first at line ${matches[0] + 1}`);
  }
}

// Also search for text-rendering-like patterns: writing tile indices to VRAM nametable
// Nametable for Plane A starts at VRAM 0xC000
// Font tiles for "1994 NCS" would be around tile 0x080-0x0A0
// Looking for patterns: move.w #$0xxx, (aX)+  or similar VDP writes
console.log('\n=== Searching for text render patterns (move.w to VDP_data) ===');
let count = 0;
lines.forEach((l, i) => {
  if (count >= 15) return;
  // Look for writing tile values (0x080-0x0ff range) to VDP
  if (/\$C00000.*[,#]\$0[89a-fA-F][0-9a-fA-F]/.test(l) || 
      /move\.w.*\(\$C00000/.test(l)) {
    console.log(`${(i + 1).toString().padStart(7)}: ${l.substring(0, 140)}`);
    count++;
  }
});
