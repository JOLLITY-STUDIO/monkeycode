const { execSync } = require('child_process');
try {
  const out = execSync('npx tsc --noEmit -p tsconfig.check.json', { stdio: ['ignore', 'pipe', 'pipe'], encoding: 'utf8' });
  console.log('TSC_OK');
  if (out.trim()) console.log(out);
} catch (e) {
  console.log('TSC_ERROR exit=' + e.status);
  const out = (e.stdout || '') + (e.stderr || '');
  console.log(out.split('\n').slice(0, 80).join('\n'));
}
