// 临时: 确认无残留 subC509
const fs = require('fs');
function scanDir(dir) {
  const walk = (d) => {
    for (const n of fs.readdirSync(d)) {
      const p = d + '/' + n;
      const st = fs.statSync(p);
      if (st.isDirectory()) walk(p);
      else if (n.endsWith('.ts')) {
        const lines = fs.readFileSync(p, 'utf8').split('\n');
        lines.forEach((l, i) => {
          if (/subC509/.test(l)) console.log(`REMAIN ${p}:${i + 1}| ${l.trim()}`);
        });
      }
    }
  };
  walk(dir);
}
scanDir('src/game/prg');
console.log('scan done');
