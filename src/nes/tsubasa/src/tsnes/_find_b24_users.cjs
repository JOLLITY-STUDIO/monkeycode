const fs = require('fs');
const path = './tsubasa2-h5-src/src';
const files = [];
(function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = d + '/' + f;
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (f.endsWith('.ts')) files.push(p);
  }
})(path);
for (const f of files) {
  const c = fs.readFileSync(f, 'utf8');
  const lines = c.split(/\r?\n/);
  lines.forEach((l, i) => {
    if (/Bank24HudService|bank24Hud|hud\.dispatch|\.hud\.|spriteLoad|hud_spr_arg/i.test(l) && !/bank24_hud\.service/.test(f)) {
      console.log(f + ':' + (i + 1) + ': ' + l.trim());
    }
  });
}
