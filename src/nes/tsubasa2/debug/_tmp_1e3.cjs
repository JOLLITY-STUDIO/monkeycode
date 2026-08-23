const fs = require('fs');
const dir = 'd:/studio/github/monkeycode/src/nes/tsubasa2/asm';
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.s'));
// sample: find how zero page 0x1E is referenced. Try patterns: 1E (with word boundary), $1E, $001e
let pats = [/\b\$1e\b/i, /\b001e\b/i, /\$001E/, /\b1E\b/];
files.forEach((f) => {
  const p = dir + '/' + f;
  const ls = fs.readFileSync(p, 'utf8').split('\n');
  ls.forEach((l, i) => {
    const t = l.trim();
    // Only check if line looks like instruction with operand
    if (/^\S+\s+\$[0-9A-Fa-f]{4}/.test(t) || /^\S+\s+\$[0-9A-Fa-f]{2}/.test(t)) {
      const m = t.match(/\$([0-9A-Fa-f]{2,4})/);
      if (m && parseInt(m[1], 16) === 0x1e) {
        console.log(f + ':' + (i + 1) + ': ' + t.slice(0, 120));
      }
    }
  });
});
console.log('--- sample of zero page refs ---');
let shown = 0;
for (const f of files) {
  const p = dir + '/' + f;
  const ls = fs.readFileSync(p, 'utf8').split('\n');
  for (const l of ls) {
    const m = l.match(/\$[0-9A-Fa-f]{2}\b/);
    if (m && shown < 30) {
      console.log(f + ': ' + l.trim().slice(0, 100));
      shown++;
    }
  }
  if (shown >= 30) break;
}
