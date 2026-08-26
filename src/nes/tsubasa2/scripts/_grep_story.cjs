const fs = require('fs');
const path = require('path');
const root = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/game';
const hits = [];
const walk = (p, depth) => {
  if (depth > 5) return;
  let st;
  try { st = fs.statSync(p); } catch { return; }
  if (st.isDirectory()) {
    if (/node_modules|dist|\.git|asm|chr/.test(p)) return;
    for (const f of fs.readdirSync(p)) walk(path.join(p, f), depth + 1);
  } else if (/\.(ts)$/.test(p)) {
    try {
      const s = fs.readFileSync(p, 'utf8');
      if (/drawWindow|drawFrame|drawText|TextChar|ShowText|Message|对话框|文字框|枠|\u30C6\u30AD\u30B9\u30C8|border|window/.test(s)) {
        hits.push(p);
      }
    } catch { }
  }
};
walk(root, 0);
console.log(hits.join('\n'));
