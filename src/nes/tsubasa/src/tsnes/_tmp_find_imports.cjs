const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, 'tsubasa2-h5-src', 'src');
const out = [];
function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    const s = fs.statSync(p);
    if (s.isDirectory()) walk(p);
    else if (/\.(ts|js)$/.test(f)) {
      const c = fs.readFileSync(p, 'utf8');
      const lines = c.split(/\r?\n/);
      lines.forEach((l, i) => {
        if (/render\/Renderer/.test(l) || /WebAudioOutput/.test(l) || /engine\/InputManager/.test(l)) {
          out.push(p.replace(/\\/g, '/').replace(__dirname.replace(/\\/g, '/') + '/', '') + ':' + (i + 1) + ':' + l.trim());
        }
      });
    }
  }
}
walk(root);
console.log(out.join('\n') || '(no matches)');
