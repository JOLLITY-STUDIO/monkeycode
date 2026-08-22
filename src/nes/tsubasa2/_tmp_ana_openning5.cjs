const fs = require('fs');
function walk(d, dep) {
  if (dep > 5) return;
  let it; try { it = fs.readdirSync(d, { withFileTypes: true }); } catch (e) { return; }
  for (const x of it) {
    const p = d + '/' + x.name;
    if (x.isDirectory()) walk(p, dep + 1);
    else if (/\.ts$/.test(x.name)) {
      try {
        const c = fs.readFileSync(p, 'utf8');
        const ls = c.split(/\r?\n/);
        ls.forEach((l, i) => {
          if (/nmiRender|ppuBufAlloc|ppuBufEnd/.test(l) && !/^\s*(\/\/|\*)/.test(l)) {
            console.log(p + ':' + (i + 1) + ': ' + l.trim().slice(0, 130));
          }
        });
      } catch (e) {}
    }
  }
}
walk('src/game', 0);
