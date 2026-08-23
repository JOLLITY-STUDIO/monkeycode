const fs = require('fs');
const path = require('path');
const dirs = ['d:/studio/github/monkeycode/src/nes/tsubasa2/debug', 'd:/studio/github/monkeycode/src/nes/tsubasa2/scripts', 'd:/studio/github/monkeycode/src/nes/tsubasa2/tools'];
for (const d of dirs) {
  if (!fs.existsSync(d)) continue;
  for (const f of fs.readdirSync(d)) {
    if (!/\.cjs$/.test(f) && !/\.js$/.test(f)) continue;
    const p = path.join(d, f);
    try {
      const c = fs.readFileSync(p, 'utf8');
      if (/ram_00ED|00ED/.test(c) && /trace|opening/.test(p + c.slice(0, 2000))) {
        console.log(p);
      }
    } catch (e) {}
  }
}
