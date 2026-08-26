const fs = require('fs');
const path = require('path');
const root = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src';
const hits = [];
const walk = (p, depth) => {
  if (depth > 4) return;
  let st;
  try { st = fs.statSync(p); } catch { return; }
  if (st.isDirectory()) {
    if (/node_modules|dist|\.git|asm/.test(p)) return;
    for (const f of fs.readdirSync(p)) walk(path.join(p, f), depth + 1);
  } else if (/\.(ts)$/.test(p)) {
    try {
      const s = fs.readFileSync(p, 'utf8');
      if (/边框|textbox|message|文本|窗口|window|dialog|枠|\u30D5\u30EC\u30FC\u30E0|frame/.test(s)) {
        hits.push(p);
      }
    } catch { }
  }
};
walk(root, 0);
console.log(hits.join('\n'));
