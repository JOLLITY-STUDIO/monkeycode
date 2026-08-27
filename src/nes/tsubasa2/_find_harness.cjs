const fs = require('fs');
const path = require('path');
function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p);
    else if (/\.(cjs|ts)$/.test(f)) {
      const c = fs.readFileSync(p, 'utf8');
      if (/new Tsubasa2|HeadlessRuntime|headless/i.test(c) && /startFrame|advanceDots|ppu\.buffer/i.test(c)) {
        console.log(p);
      }
    }
  }
}
walk('scripts');
walk('test');
walk('.');
