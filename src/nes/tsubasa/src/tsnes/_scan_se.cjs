const fs = require('fs');
const dir = 'd:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/tsubasa2-h5-src/src/data/audio/se';
for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.ts') && f.startsWith('SE'))) {
  const c = fs.readFileSync(dir + '/' + f, 'utf8');
  console.log(f, '::', c.split('\n').slice(0, 8).join(' | ').slice(0, 300));
}
