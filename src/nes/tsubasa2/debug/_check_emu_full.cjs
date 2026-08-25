// 检查 emu-full 每帧数据完整性 + state.json 结构
const fs = require('fs');
const p = 'output/emu-full';
const dirs = fs.readdirSync(p).filter(d => d.startsWith('frame')).sort();
console.log('frames:', dirs.length, dirs[0], '..', dirs[dirs.length - 1]);

const REQUIRED = ['state.json', 'oam.json', 'palette.json', 'nt.json', 'chr-switches.json', 'pt.json', 'screen.png'];
const missing = {};
let complete = 0;
for (const d of dirs) {
  const files = fs.readdirSync(p + '/' + d);
  const miss = REQUIRED.filter(r => !files.includes(r));
  if (miss.length) {
    for (const m of miss) {
      if (!missing[m]) missing[m] = [];
      if (missing[m].length < 5) missing[m].push(d);
    }
  } else {
    complete++;
  }
}
console.log('complete frames:', complete, '/', dirs.length);
for (const [k, v] of Object.entries(missing)) console.log('missing ' + k + ':', v.join(','), '(first 5)');

const s = JSON.parse(fs.readFileSync(p + '/frame-0001/state.json', 'utf8'));
console.log('\nstate.json keys:', Object.keys(s));
console.log(JSON.stringify(s).slice(0, 600));
