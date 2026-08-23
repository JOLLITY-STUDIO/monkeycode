const { execSync } = require('child_process');
const fs = require('fs');
try {
  const r = execSync('npx tsc -p tsconfig.json --noEmit', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  fs.writeFileSync(__dirname + '/../_tmp_final.txt', 'STEP1 TSC_OK exit=0 output=' + (r.length || '(empty)') + ' bytes\n');
} catch (e) {
  fs.writeFileSync(__dirname + '/../_tmp_final.txt', 'STEP1 TSC_FAIL\n' + ((e.stdout || '') + (e.stderr || '')).slice(0, 3000));
}
