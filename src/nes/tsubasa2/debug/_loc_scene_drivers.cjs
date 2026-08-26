const fs = require('fs');
function walk(dir, out) {
  for (const f of fs.readdirSync(dir)) {
    const p = dir + '/' + f;
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      if (f === 'node_modules' || f === 'dist' || f === '.git') continue;
      walk(p, out);
    } else if (f.endsWith('.ts') || f.endsWith('.cjs') || f.endsWith('.js')) {
      out.push(p);
    }
  }
}
const files = [];
walk('src/game', files);
for (const f of files) {
  const lines = fs.readFileSync(f, 'utf8').split('\n');
  lines.forEach((l, i) => {
    if (/changeScene|currentSceneId\s*=|sceneId\s*=\s*\d|\.scene\s*=|dispatch\(/.test(l) && !l.trim().startsWith('//') && !l.trim().startsWith('*')) {
      console.log(f + ' L' + (i + 1) + ': ' + l.trim());
    }
  });
}
