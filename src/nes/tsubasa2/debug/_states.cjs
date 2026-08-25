const fs = require('fs');
const dir = 'output/emu-reference';
if (!fs.existsSync(dir)) { console.log('no dir'); process.exit(0); }
const frames = fs.readdirSync(dir).filter(d => /^frame-/.test(d)).sort((a, b) => parseInt(a.split('-')[1]) - parseInt(b.split('-')[1]));
for (const f of frames) {
  const sj = dir + '/' + f + '/state.json';
  if (!fs.existsSync(sj)) continue;
  const s = JSON.parse(fs.readFileSync(sj, 'utf8'));
  const keys = Object.keys(s);
  console.log(f, '->', keys.join(','));
}
