const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

try {
  const result = execSync('npx tsx mini-audio/_chk_nmi.ts', {
    cwd: rootDir,
    encoding: 'utf8',
    stdio: 'pipe',
    maxBuffer: 10 * 1024 * 1024,
    timeout: 30000,
  });
  console.log('STDOUT:');
  console.log(result);
} catch (e) {
  console.error('EXIT CODE:', e.status);
  if (e.signal) console.error('SIGNAL:', e.signal);
  console.error('STDERR:');
  const stderr = e.stderr?.toString() || '';
  console.error(stderr.slice(0, 5000));
  console.error('STDOUT:');
  const stdout = e.stdout?.toString() || '';
  console.error(stdout.slice(0, 5000));
}
const outPath = path.join(rootDir, 'mini-audio', '_chk_nmi_out.txt');
if (fs.existsSync(outPath)) {
  console.log('\n--- OUTPUT FILE ---');
  console.log(fs.readFileSync(outPath, 'utf8'));
} else {
  console.log('\n[No output file generated]');
}
