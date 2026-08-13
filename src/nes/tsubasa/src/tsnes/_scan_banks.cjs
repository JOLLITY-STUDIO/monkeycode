const fs = require('fs');
const dir = 'd:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/tsubasa2-h5-src/src/data/audio/bgm';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts') && f.startsWith('BGM'));
const map = {};
for (const f of files) {
  const c = fs.readFileSync(dir + '/' + f, 'utf8');
  const m = c.match(/Bank (\d+)/);
  const b = m ? m[1] : '?';
  (map[b] = map[b] || []).push(f.replace('.ts', ''));
}
console.log(JSON.stringify(map, null, 1));
