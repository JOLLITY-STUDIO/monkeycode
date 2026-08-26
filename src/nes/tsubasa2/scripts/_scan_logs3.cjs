const fs = require('fs');
const path = require('path');
const root = 'd:/studio/github/monkeycode/src/nes/tsubasa2';
const hits = [];
const walk = (p, depth) => {
  if (depth > 4) return;
  let st;
  try { st = fs.statSync(p); } catch { return; }
  if (st.isDirectory()) {
    if (/node_modules|dist|\.git/.test(p)) return;
    for (const f of fs.readdirSync(p)) walk(path.join(p, f), depth + 1);
  } else if (/\.(log|txt|out|err|json)$/.test(p) && fs.statSync(p).size < 10e6) {
    try {
      const s = fs.readFileSync(p, 'utf8');
      if (/tecmo|temco/i.test(s)) hits.push(`${p} (${fs.statSync(p).size})`);
    } catch { }
  }
};
walk(root, 0);
console.log(hits.join('\n'));
