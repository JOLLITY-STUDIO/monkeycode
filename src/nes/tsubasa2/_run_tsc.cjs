// 跑 tsc --noEmit 并把 stdout/stderr 写入文件
const { execSync } = require('child_process');
const fs = require('fs');
try {
  const out = execSync('npx tsc -p tsconfig.json --noEmit', { stdio: ['ignore', 'pipe', 'pipe'], encoding: 'utf8' });
  fs.writeFileSync('_tsc_fix.log', 'OK (no output): ' + out.length + ' chars');
  console.log('TSC OK');
} catch (e) {
  const msg = 'EXIT ' + e.status + '\n' + (e.stdout || '') + (e.stderr || '');
  fs.writeFileSync('_tsc_fix.log', msg);
  console.log('TSC FAIL, see _tsc_fix.log');
}
