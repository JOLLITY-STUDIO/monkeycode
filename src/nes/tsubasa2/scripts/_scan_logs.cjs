const fs = require('fs');
const path = require('path');
const dirs = ['debug', 'test', 'scripts', 'output'];
const hits = [];
const walk = (p) => {
  let st;
  try { st = fs.statSync(p); } catch { return; }
  if (st.isDirectory()) {
    for (const f of fs.readdirSync(p)) walk(path.join(p, f));
  } else if (/\.(log|txt|json)$/.test(p) && fs.statSync(p).size < 5e6) {
    try {
      const s = fs.readFileSync(p, 'utf8');
      if (/tecmo/i.test(s)) hits.push(p);
    } catch { }
  }
};
for (const d of dirs) walk(d);
console.log(hits.slice(0, 60).join('\n'));
