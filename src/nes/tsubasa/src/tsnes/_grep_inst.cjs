// grep instantiations of Bank24HudService / Bank28MatchService
const fs = require('fs');
const path = require('path');
function walk(dir, out) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p, out);
    else if (/\.ts$/.test(f)) out.push(p);
  }
}
const files = [];
walk('tsubasa2-h5-src/src', files);
for (const p of files) {
  const src = fs.readFileSync(p, 'utf8').split(/\r?\n/);
  src.forEach((line, i) => {
    if (/new Bank24HudService|new Bank28MatchService|Bank24HudService\(|Bank28MatchService\(/.test(line)) {
      console.log(`${p}:${i + 1}: ${line.trim()}`);
    }
  });
}
