const fs = require('fs');
const dir = 'd:/studio/github/monkeycode/src/nes/tsubasa2/asm/bank00';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.s'));
for (const f of files) {
  const s = fs.readFileSync(dir + '/' + f, 'utf8').split(/\r?\n/);
  const out = [];
  let started = false;
  for (let i = 0; i < s.length; i++) {
    const m = s[i].match(/; \$([0-9A-F]{4})/);
    if (m) {
      const a = parseInt(m[1], 16);
      if (a >= 0x8AF7 && a <= 0x8CB7) { out.push((i + 1) + ': ' + s[i]); started = true; continue; }
      if (started && out.length > 300) break;
    }
  }
  if (out.length) { console.log('=== ' + f + ' (' + out.length + ' lines) ==='); console.log(out.join('\n')); }
}
