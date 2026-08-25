const { execFileSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const tscBin = path.join('node_modules', '.bin', 'tsc.cmd');
const isWin = process.platform === 'win32';
let out = '';
let status = 0;
try {
  out = execFileSync(tscBin, ['-p', 'tsconfig.json', '--noEmit'], { encoding: 'utf8', stdio: ['pipe','pipe','pipe'], cwd: process.cwd(), shell: isWin });
  status = 0;
} catch (e) {
  status = e.status || 1;
  out = (e.stdout||'') + (e.stderr||'');
}
fs.writeFileSync('tsc.full.log', out);
fs.writeFileSync('tsc.status.txt', String(status));
const errs = out.split(/\r?\n/).filter(x => /error TS/.test(x));
fs.writeFileSync('tsc.errors.txt', errs.join('\n'));
process.exit(errs.length > 0 ? 2 : 0);
