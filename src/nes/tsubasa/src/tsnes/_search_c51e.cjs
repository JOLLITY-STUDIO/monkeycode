const fs = require('fs');
const p = 'd:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/tsubasa2-h5-src/src';
const r = [];
function w(d) {
  for (const f of fs.readdirSync(d)) {
    const fp = d + '/' + f;
    if (fs.statSync(fp).isDirectory()) {
      w(fp);
    } else if (/\.ts$/.test(f)) {
      const t = fs.readFileSync(fp, 'utf8').split(/\r?\n/);
      t.forEach((l, i) => {
        if (/C51E|C527|c51e|c527/.test(l) && !/bank24_hud/.test(fp)) {
          r.push(fp.replace(/\\/g, '/') + ':' + (i + 1) + ': ' + l.trim());
        }
      });
    }
  }
}
w(p);
console.log(r.join('\n'));
