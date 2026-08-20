const fs = require('fs');
const path = require('path');
const ROOT = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src';
const PATS = ['04A8', '05E8', '0628', 'ppuBufPtr', 'ppuBuf_'];
function scan(fp) {
  if (!fs.existsSync(fp)) return;
  const src = fs.readFileSync(fp, 'utf8');
  const lines = src.split('\n');
  for (let i = 0; i < lines.length; i++) {
    for (const p of PATS) {
      if (lines[i].includes(p)) {
        console.log(path.relative(ROOT, fp) + ':' + (i + 1) + '  ' + lines[i].trim().slice(0, 105));
        break;
      }
    }
  }
}
function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const fp = path.join(dir, f);
    if (fs.statSync(fp).isDirectory()) {
      if (f !== 'node_modules') walk(fp);
    } else if (f.endsWith('.ts')) scan(fp);
  }
}
walk(ROOT);
