const fs = require('fs');
const p = 'd:/studio/github/monkeycode/src/nes/tsubasa2/asm/bank00/code_scene.s';
const s = fs.readFileSync(p, 'utf8').split(/\r?\n/);
const out = [];
let started = false;
for (let i = 0; i < s.length; i++) {
  const m = s[i].match(/; \$([0-9A-F]{4})/);
  if (m) {
    const a = parseInt(m[1], 16);
    if (a >= 0x8CB9 && a <= 0x8E80) { out.push((i + 1) + ': ' + s[i]); started = true; continue; }
    if (started) break;
  }
}
console.log(out.length + ' lines');
console.log(out.join('\n'));
