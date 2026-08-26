const t = require('fs').readFileSync('src/core/ppu/index.ts', 'utf8');
const lines = t.split('\n');
const out = [];
const re = /this\.(cntV|cntH|cntVT|cntHT|regV|regH|regVT|regHT)\s*=/;
for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  if (re.test(l) && !/\+{2}|--/.test(l)) out.push((i + 1) + ': ' + l.trim());
}
console.log(out.join('\n'));
