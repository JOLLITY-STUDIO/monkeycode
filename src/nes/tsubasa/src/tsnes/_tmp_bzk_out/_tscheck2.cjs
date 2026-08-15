const { execSync } = require('child_process');
try {
  const out = execSync('node_modules/.bin/tsc.cmd -p tsubasa2-h5-src/tsconfig.check.json', { stdio: 'pipe', encoding: 'utf8' });
  console.log('COMPILE OK');
  console.log(out.slice(0, 2000));
} catch (e) {
  console.log('EXIT CODE:', e.status);
  console.log('STDOUT:', (e.stdout || '').slice(0, 3000));
  console.log('STDERR:', (e.stderr || '').slice(0, 3000));
}
