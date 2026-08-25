const fs = require('fs');
const path = require('path');
function walk(d, out, depth) {
  if (depth <= 0) return;
  let es;
  try { es = fs.readdirSync(d); } catch (e) { return; }
  for (const f of es) {
    if (f === 'node_modules' || f === 'dist' || f === '.git') continue;
    const p = path.join(d, f);
    let st;
    try { st = fs.statSync(p); } catch (e) { continue; }
    if (st.isDirectory()) walk(p, out, depth - 1);
    else if (/\.(nes|rom)$/i.test(f)) out.push(p);
  }
}
const out = [];
walk('.', out, 4);
console.log(JSON.stringify(out));
