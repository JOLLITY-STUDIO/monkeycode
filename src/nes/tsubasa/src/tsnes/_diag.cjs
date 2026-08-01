const { execSync } = require('child_process');
const { readFileSync, writeFileSync } = require('fs');
const { resolve } = require('path');

const cwd = resolve(__dirname);
console.log('[diag] Running...');

try {
  const out = execSync('npx tsx game-engine/test/ai-player/diag-v2.ts', {
    cwd,
    timeout: 30000,
    maxBuffer: 2 * 1024 * 1024,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  console.log(out);
} catch(e) {
  if (e.stdout) console.log(e.stdout.toString().slice(-5000));
  if (e.stderr) console.log('STDERR:', e.stderr.toString().slice(-2000));
  else console.log('ERR:', e.message);
}

// Also read the output file
try {
  const d = readFileSync(resolve(cwd, 'game-engine/test/ai-player/output/diag-v2.txt'), 'utf8');
  console.log('\n=== OUTPUT FILE (last 3000 chars) ===');
  console.log(d.slice(-3000));
} catch(e) {
  console.log('Cannot read output file');
}
