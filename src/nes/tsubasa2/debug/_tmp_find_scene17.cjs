const fs = require('fs');
const p = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/game/prg/data/tables/bank07-scenes-metatile.ts';
const s = fs.readFileSync(p, 'utf8').split(/\r?\n/);
const idx = [];
for (let i = 0; i < s.length; i++) {
  const m = s[i].match(/export const (SCENE_0x[0-9A-F]{2})/);
  if (m) idx.push({ line: i + 1, name: m[1] });
}
console.log(idx.map(x => x.line + ':' + x.name).join('\n'));
