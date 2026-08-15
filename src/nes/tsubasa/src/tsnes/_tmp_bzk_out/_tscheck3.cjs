const { execSync } = require('child_process');
const path = require('path');
const root = path.join(__dirname, '..');
const tsc = path.join(root, 'node_modules', '.bin', 'tsc.cmd');
const cfg = path.join(root, 'tsubasa2-h5-src', 'tsconfig.check.json');
try {
  const out = execSync(`"${tsc}" -p "${cfg}"`, { stdio: 'pipe', encoding: 'utf8', cwd: root });
  console.log('COMPILE OK');
  if (out.trim()) console.log(out.slice(0, 2000));
} catch (e) {
  console.log('EXIT CODE:', e.status);
  console.log('STDOUT:', (e.stdout || '').slice(0, 6000));
  console.log('STDERR:', (e.stderr || '').slice(0, 2000));
}
