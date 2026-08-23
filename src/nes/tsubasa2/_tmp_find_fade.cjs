const fs = require('fs');
const path = require('path');
function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) {
      if (/node_modules|_tmp_out|_build|\.git|docs|asm/.test(p)) continue;
      walk(p);
    } else if (/\.ts$/.test(f)) {
      const t = fs.readFileSync(p, 'utf8');
      const lines = t.split('\n');
      lines.forEach((l, i) => {
        if (/0x004A|'004A'|004A/.test(l) && /fade|Fade|FADE|wr\(0x004A|ram_004A/.test(l)) {
          console.log(p + ':' + (i + 1) + ': ' + l.trim());
        }
      });
    }
  }
}
walk('src');
