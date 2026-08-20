const fs = require('fs');
const { execSync } = require('child_process');
try {
  execSync('npx tsc -p tsconfig.json --noEmit', { encoding: 'utf8', stdio: 'pipe', timeout: 120000 });
  fs.writeFileSync('_tmp_tsc_result2.txt', '=== tsc: PASS ===');
} catch (e) {
  const out = (e.stdout || '') + (e.stderr || '');
  const errs = out.split('\n').filter(l => /error TS/.test(l));
  const b00 = errs.filter(l => /bank00|bank0[0-9]/i.test(l) && !/bankpage/.test(l));
  const src = errs.filter(l => /^src\//.test(l));
  const pages = errs.filter(l => /^pages\//.test(l));
  const other = errs.filter(l => !/^pages\//.test(l) && !/^src\//.test(l));
  let txt = '=== tsc: FAIL === count=' + errs.length + '\n';
  txt += '--- bank00 related (' + b00.length + ') ---\n' + b00.slice(0, 40).join('\n') + '\n';
  txt += '--- src/ errors (' + src.length + ') ---\n' + src.slice(0, 40).join('\n') + '\n';
  txt += '--- non-src non-pages (' + other.length + ') ---\n' + other.slice(0, 20).join('\n') + '\n';
  fs.writeFileSync('_tmp_tsc_result2.txt', txt);
}
console.log('done');
