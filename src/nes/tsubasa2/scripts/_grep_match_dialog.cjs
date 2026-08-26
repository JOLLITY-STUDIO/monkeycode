const fs = require('fs');
const path = require('path');
const root = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/game/prg';
const hits = [];
const walk = (p, depth) => {
  if (depth > 5) return;
  let st;
  try { st = fs.statSync(p); } catch { return; }
  if (st.isDirectory()) {
    if (/node_modules|dist|\.git/.test(p)) return;
    for (const f of fs.readdirSync(p)) walk(path.join(p, f), depth + 1);
  } else if (/\.(ts)$/.test(p)) {
    try {
      const s = fs.readFileSync(p, 'utf8');
      if (/message|dialog|textbox|window|边框|文字|テキスト|枠|\u30B4\u30FC\u30EB\u30C7\u30F3/.test(s)) hits.push(p);
    } catch { }
  }
};
walk(root, 0);
console.log(hits.join('\n'));
