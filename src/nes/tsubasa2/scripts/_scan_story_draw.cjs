const fs = require('fs');
const path = require('path');
const root = 'src/game/prg/code';
const walk = (p) => {
  let st;
  try { st = fs.statSync(p); } catch { return; }
  if (st.isDirectory()) {
    for (const f of fs.readdirSync(p)) walk(path.join(p, f));
  } else if (/\.ts$/.test(p)) {
    const s = fs.readFileSync(p, 'utf8');
    if (/ScriptEngine|ScriptLoader|textbox|Textbox|drawText|putText|drawChar|renderText|writeText|printText/i.test(s)) {
      console.log('=== ' + p + ' ===');
      const lines = s.split('\n');
      lines.forEach((l, i) => {
        if (/ScriptEngine|ScriptLoader|textbox|Textbox|drawText|putText|drawChar|renderText|writeText|printText|border|frame|panel|dialog/i.test(l)) {
          console.log((i + 1) + ': ' + l.trim().slice(0, 150));
        }
      });
    }
  }
};
walk(root);
