const fs = require('fs');
const path = require('path');
const base = 'd:/studio/github/monkeycode/src/nes/tsubasa2/asm';
// search all banks for script VM: pattern SBC #$E8 or CMP #$E8 or jump table with $E8-$FF opcodes
const targets = ['CMP #$E8', 'SBC #$E8', 'CMP #$FF', 'STA $00ED', 'STA ram_00ED', '00ED'];
for (const t of targets) {
  let found = 0;
  for (const bank of fs.readdirSync(base)) {
    const bdir = path.join(base, bank);
    if (!fs.statSync(bdir).isDirectory()) continue;
    for (const f of fs.readdirSync(bdir)) {
      if (!/\.s$/.test(f)) continue;
      const p = path.join(bdir, f);
      const c = fs.readFileSync(p, 'utf8');
      if (c.includes(t)) {
        const lines = c.split('\n');
        lines.forEach((l, i) => {
          if (l.includes(t) && found < 30) {
            console.log(`${bank}/${f}:${i + 1}: ${l.trim().slice(0, 110)}`);
            found++;
          }
        });
      }
    }
  }
  console.log('--- end of', t, '---');
}
