import fs from 'fs';
const t = fs.readFileSync('src/langrisser2/20260713/asm/m68k/rom.asm', 'utf8');
const lines = t.split('\n');

// Find VDP_CTRL writes and VDP_DATA writes
let cnt = 0;
for (let i = 0; i < lines.length && cnt < 25; i++) {
  const l = lines[i];
  if (l.includes('VDP_CTRL') || l.includes('VDP_DATA')) {
    console.log(`${(i+1).toString().padStart(7)}: ${l.trim().substring(0, 180)}`);
    cnt++;
  }
}
