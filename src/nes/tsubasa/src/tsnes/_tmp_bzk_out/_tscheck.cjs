const { execSync } = require('child_process');
try {
  execSync('node_modules/.bin/tsc.cmd -p tsubasa2-h5-src/tsconfig.check.json', { stdio: 'pipe', encoding: 'utf8' });
  console.log('COMPILE OK');
} catch (e) {
  const out = (e.stdout || '').split(/\r?\n/).filter(l => l.includes('error TS'));
  console.log(out.slice(0, 60).join('\n') || 'NO TS ERRORS BUT FAILED');
}
