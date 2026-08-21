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
const targets = ['emitSprites', 'FrameCompositor', 'sprites', 'slice(0x0200', "0x0200, 0x100", 'oamHw', 'readHw'];
for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  if (!targets.some((t) => content.includes(t))) continue;
  const lines = content.split('\n');
  lines.forEach((ln, i) => {
    if (/emitSprites|FrameCompositor|readHw|sprites\.push|\.sprites\s*=|sprites\b.*slice|0x0200|\\$0200/i.test(ln) && !/ram_0200\]|ram_0200'\)|ram_0200\+/i.test(ln)) {
      console.log(f + ':' + (i + 1) + ': ' + ln.trim());
    }
  });
}
