const fs = require('fs');
const root = 'd:/studio/github/monkeycode/src/nes/tsubasa2';
// find the prerender generator
const cands = ['scripts/_gen_scroll_prerender.cjs', '_gen_scroll_prerender.cjs'];
for (const c of cands) {
  if (fs.existsSync(c)) {
    console.log('FOUND ' + c + ' lines=' + fs.readFileSync(c, 'utf8').split('\n').length);
  }
}
// read the header of the GT generator to learn IN_DIR
const c = fs.readFileSync('scripts/_gen_opening_frame_table.cjs', 'utf8');
const lines = c.split('\n');
lines.slice(0, 60).forEach((l, i) => console.log((i + 1) + ': ' + l));
