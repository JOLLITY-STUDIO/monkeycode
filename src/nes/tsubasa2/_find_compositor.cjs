const fs = require('fs');
const path = require('path');
function walk(dir) {
  let out = [];
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (f === 'node_modules' || f === '.git') continue;
    const st = fs.statSync(p);
    if (st.isDirectory()) out = out.concat(walk(p));
    else if (p.endsWith('.ts')) out.push(p);
  }
  return out;
}
const files = walk(path.join(__dirname, 'src'));
for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  if (!/compositor|Compositor/i.test(content)) continue;
  const lines = content.split('\n');
  let shown = 0;
  lines.forEach((ln, i) => {
    if (/sprites|SpriteEntry|oam|OAM/i.test(ln) && shown < 30) {
      console.log(f + ':' + (i + 1) + ': ' + ln.trim());
      shown++;
    }
  });
}
