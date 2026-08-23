const fs = require('fs');
const path = require('path');
const dir = 'd:/studio/github/monkeycode/src/nes/tsubasa2/asm/bank02';
if (!fs.existsSync(dir)) { console.log('no bank02'); process.exit(0); }
for (const f of fs.readdirSync(dir)) {
  const p = path.join(dir, f);
  const c = fs.readFileSync(p, 'utf8');
  const lines = c.split('\n');
  // Find the $FA opcode handler: look for context around "84E7" VM or CMP #$FA / .byte $FA
  lines.forEach((l, i) => {
    if (/FA\s*$|#\$FA|CMP.*FA|0xFA|fa/i.test(l) && /85|84|86|87|A0|A1|A2/i.test(l)) {
      // print small context
      if (i > 0) console.log(f + ':' + (i + 1) + ': ' + l.trim().slice(0, 110));
    }
  });
}
