const { execSync } = require('child_process');
for (const s of ['node _verify_bank19.cjs', 'node _verify_bank20.cjs', 'node _verify_playthrough.cjs']) {
  try {
    const out = execSync(s, { encoding: 'utf8', maxBuffer: 200 * 1024 * 1024 });
    const lines = out.split('\n');
    const sums = lines.filter(l => /PASS=\d+ FAIL=\d+/.test(l));
    const ok = /ALL .* PASSED|OK|通过/.test(out);
    console.log(s + ' => ' + (sums.join(' | ') || (ok ? 'PASS(no sum line)' : '(no PASS line)')) + ' lines=' + lines.length);
  } catch (e) {
    const o = (e.stdout || '').toString();
    const lines = o.split('\n');
    const sums = lines.filter(l => /PASS=\d+ FAIL=\d+/.test(l));
    console.log(s + ' => FAIL ' + (sums.join(' | ') || '') + ' lines=' + lines.length);
    console.log('  first fails: ' + lines.filter(l => /FAIL|got=|error/i.test(l)).slice(0, 6).join(' / ').slice(0, 500));
  }
}
