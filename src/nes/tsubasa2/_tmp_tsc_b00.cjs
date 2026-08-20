const fs = require('fs');
const { execSync } = require('child_process');
try {
  execSync('npx tsc -p _tsconfig.b00.json --noEmit', { encoding: 'utf8', stdio: 'pipe', timeout: 90000 });
  fs.writeFileSync('_tmp_tsc_b00_result.txt', '=== tsc b00: PASS ===');
} catch (e) {
  const out = (e.stdout || '') + (e.stderr || '');
  const errs = out.split('\n').filter(l => /error TS/.test(l));
  fs.writeFileSync('_tmp_tsc_b00_result.txt', '=== tsc b00: FAIL === count=' + errs.length + '\n' + errs.join('\n'));
}
console.log('done');
