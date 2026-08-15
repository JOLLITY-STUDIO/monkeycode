const { execSync } = require('child_process');
const fs = require('fs');
try {
  const out = execSync('npx tsc --noEmit -p tsconfig.check.json', { stdio: ['ignore', 'pipe', 'pipe'], encoding: 'utf8' });
  fs.writeFileSync('_tsc_out.txt', 'TSC_OK\n' + out);
} catch (e) {
  const out = (e.stdout || '') + (e.stderr || '');
  fs.writeFileSync('_tsc_out.txt', 'TSC_ERROR exit=' + e.status + '\n' + out);
  console.log('done, wrote _tsc_out.txt len=' + out.length);
}
