const fs = require('fs');
const dir = 'd:/studio/github/monkeycode/src/nes/tsubasa2/asm/bank00';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.s'));
for (const f of files) {
  const s = fs.readFileSync(dir + '/' + f, 'utf8').split(/\r?\n/);
  const out = [];
  let started = false;
  for (let i = 0; i < s.length; i++) {
    if (s[i].includes('; $978B')) started = true;
    if (started) { out.push((i + 1) + ': ' + s[i]); if (out.length > 40) break; }
  }
  if (out.length) { console.log('=== ' + f + ' ==='); console.log(out.join('\n')); }
}
// 同时查 TS 模板
const p = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/game/prg/code/system/GameSystemService.ts';
const t = fs.readFileSync(p, 'utf8').split(/\r?\n/);
t.forEach((l, i) => { if (/978B|TEXT_BUFFER_TEMPLATE/.test(l)) console.log('TS ' + (i + 1) + ': ' + l.trim()); });
