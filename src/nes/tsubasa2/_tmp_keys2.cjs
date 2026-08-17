// temp: find files using ram_ keys and OAM buffer conventions
const fs = require('fs');
const path = require('path');
const root = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src';
function walk(d, out) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (/\.ts$/.test(f)) out.push(p);
  }
  return out;
}
const files = walk(root, []);
const pats = [/ram_0468/, /ram_0200/, /ram_04E4/, /ram_04e4/, /ram_03e8/, /ram_03E8/, /ram_0568/, /ram_0408/, /BASE_0368/, /BASE_0454/, /ram_00ec/, /ram_00EC/, /ram_00ed/, /ram_00ED/, /'ram_046/, /"ram_046/];
for (const f of files) {
  const c = fs.readFileSync(f, 'utf8');
  for (const p of pats) {
    const m = c.match(p);
    if (m) { console.log(f.split('tsubasa2')[1] + ' :: ' + p.source); break; }
  }
}
