const { execSync } = require('child_process');
const out = [];
try {
  execSync('npx tsc --noEmit -p tsconfig.check.json', { encoding: 'utf8', stdio: ['ignore','pipe','pipe'] });
  out.push('TSC OK');
} catch (e) {
  const txt = String(e.stdout || '') + String(e.stderr || '');
  const all = txt.split(/\r?\n/).filter(l => /error TS/.test(l));
  out.push('TSC total errors=' + all.length);
  const rel = all.filter(l => /bank19|prg-bank-19|bank18_story|Bank19Service/.test(l));
  out.push('bank19-related errors=' + rel.length);
  rel.slice(0, 20).forEach(l => out.push(l.slice(0, 170)));
}
require('fs').writeFileSync('_verify_b19_result.txt', out.join('\n'));
