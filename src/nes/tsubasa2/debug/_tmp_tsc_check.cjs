const { execSync } = require('child_process');
const fs = require('fs');
try {
  const r = execSync('npx tsc -p tsconfig.json --noEmit', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  fs.writeFileSync(__dirname + '/../_tsc_check.txt', 'TSC_OK exit=0 output=' + (r.length || '(empty)') + ' bytes\n');
} catch (e) {
  fs.writeFileSync(__dirname + '/../_tsc_check.txt', 'TSC_FAIL\n' + ((e.stdout || '') + (e.stderr || '')));
}
