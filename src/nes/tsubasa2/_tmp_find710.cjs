const fs = require('fs');
const d = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/game/prg/data/scene/opening';
const files = fs.readdirSync(d).filter(f => f.startsWith('opening-') && f.endsWith('.ts'));
for (const f of files) {
  const s = fs.readFileSync(d + '/' + f, 'utf8');
  const lines = s.split('\n').filter(l => l.includes('f:710') || l.includes('f:760'));
  if (lines.length) {
    console.log('== ' + f);
    lines.forEach(l => console.log('  ' + l.trim()));
  }
}
// 读取 scroll-prerender.json 的 f710/f760
const sp = JSON.parse(fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/output/emu-full/scroll-prerender.json', 'utf8'));
const byF = {};
for (const e of sp) byF[e.f] = e;
for (const f of [710, 760]) {
  console.log('scroll-prerender f' + f + ':', JSON.stringify(byF[f]));
}
