const fs = require('fs');
const { execSync } = require('child_process');
try {
  execSync('npx tsc -p tsconfig.json --noEmit', { encoding: 'utf8', stdio: 'pipe', timeout: 120000 });
  fs.writeFileSync('_tmp_tsc_result.txt', '=== tsc: PASS ===');
} catch (e) {
  const out = (e.stdout || '') + (e.stderr || '');
  const errs = out.split('\n').filter(l => /error TS/.test(l));
  fs.writeFileSync('_tmp_tsc_result.txt', '=== tsc: FAIL === count=' + errs.length + '\n' + errs.slice(0, 30).join('\n'));
}
console.log('done');
