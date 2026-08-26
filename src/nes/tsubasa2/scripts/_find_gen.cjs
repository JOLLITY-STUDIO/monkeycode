const fs = require('fs');
const path = require('path');
// 在所有 .ts/.cjs/.py 里找 "emu-scene0-timeline" 或 "emu-full" 或 "4332"
const dirs = ['scripts', 'test', 'tools', 'src', 'debug'];
const hits = [];
function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) { if (!f.startsWith('node_modules') && !f.startsWith('.git')) walk(p); }
    else if (/\.(ts|cjs|js|py)$/.test(f)) {
      try {
        const s = fs.readFileSync(p, 'utf8');
        if (/emu-scene0-timeline|emu-full|4332/.test(s)) hits.push(p + ' :: ' + s.match(/emu-scene0-timeline|emu-full|4332/g).join(','));
      } catch (e) {}
    }
  }
}
for (const d of dirs) { if (fs.existsSync(d)) walk(d); }
console.log(hits.join('\n') || 'no hits');
