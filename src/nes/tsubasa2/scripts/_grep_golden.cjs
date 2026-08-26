const fs = require('fs');
const path = require('path');
const root = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src';
const hits = [];
const walk = (p, depth) => {
  if (depth > 5) return;
  let st;
  try { st = fs.statSync(p); } catch { return; }
  if (st.isDirectory()) {
    if (/node_modules|dist|\.git/.test(p)) return;
    for (const f of fs.readdirSync(p)) walk(path.join(p, f), depth + 1);
  } else if (/\.(ts|s|md)$/.test(p) && fs.statSync(p).size < 2e6) {
    try {
      const s = fs.readFileSync(p, 'utf8');
      if (/ゴールデン|でた|コールデン|テキスト|textScript|dialog/.test(s)) hits.push(p);
    } catch { }
  }
};
walk(root, 0);
console.log(hits.join('\n'));
