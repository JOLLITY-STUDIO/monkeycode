import fs from 'fs';
const asm = fs.readFileSync('src/langrisser2/20260713/asm/m68k/rom.asm', 'utf8');
const lines = asm.split('\n');

const targets = ['loc_0085EE', 'loc_00FB82', 'loc_00FB5A', 'loc_00FB6E', 'loc_00FB82', 'loc_00FB82'];
for (const lbl of targets) {
  const idx = lines.findIndex(l => l.includes(lbl + ':'));
  if (idx < 0) { console.log(lbl + ' NOT FOUND'); continue; }
  console.log(`\n=== ${lbl} at line ${idx+1} ===`);
  for (let i = idx; i < Math.min(idx + 80, lines.length); i++) {
    console.log(lines[i].trim().substring(0, 140));
  }
}
