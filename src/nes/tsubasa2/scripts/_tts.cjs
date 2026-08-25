const { execFileSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const tscBin = path.join('node_modules', '.bin', 'tsc.cmd');
let out = '';
try {
  out = execFileSync(tscBin, ['-p', 'tsconfig.json'], { encoding: 'utf8', stdio: ['pipe','pipe','pipe'], cwd: process.cwd() });
  fs.writeFileSync('tsc.full.log', out);
  process.exit(0);
} catch (e) {
  out = (e.stdout||'') + (e.stderr||'');
  fs.writeFileSync('tsc.full.log', out);
  process.exit(1);
}
