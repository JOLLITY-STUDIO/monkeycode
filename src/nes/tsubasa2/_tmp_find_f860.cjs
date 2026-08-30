const fs = require('fs');
const files = [
  'src/game/prg/data/scene/opening/opening-tecmo-start.ts',
  'src/game/prg/data/scene/opening/opening-title-1.ts',
  'src/game/prg/data/scene/opening/opening-title-2.ts',
  'src/game/prg/data/scene/opening/opening-subtitle-1.ts',
  'src/game/prg/data/scene/opening/opening-subtitle-2.ts',
  'src/game/prg/data/scene/opening/opening-subtitle-3.ts',
  'src/game/prg/data/scene/opening/opening-subtitle-4.ts',
  'src/game/prg/data/scene/opening/opening-subtitle-5.ts',
  'src/game/prg/data/scene/opening/opening-subtitle-6.ts',
  'src/game/prg/data/scene/opening/opening-subtitle-7.ts',
  'src/game/prg/data/scene/opening/opening-ending-scroll.ts',
  'src/game/prg/data/scene/opening/opening-ending-end.ts',
];
for (const p of files) {
  const txt = fs.readFileSync(p, 'utf8');
  const m = txt.match(/\{f:860,[^\n]*\}/);
  if (m) console.log(p + '\n' + m[0].slice(0, 260));
}
