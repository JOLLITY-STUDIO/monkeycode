const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const tsc = path.join(process.cwd(), 'node_modules', 'typescript', 'bin', 'tsc');
const out = [];
for (const cfg of ['tsconfig.json', 'tsconfig.cjs.json']) {
  const r = spawnSync(process.execPath, [tsc, '-p', cfg, '--noEmit'], { cwd: process.cwd(), encoding: 'utf8', timeout: 240000 });
  out.push('=== ' + cfg + ' status=' + r.status + ' ===');
  out.push('stdout:');
  out.push((r.stdout || '').slice(0, 5000));
  out.push('stderr:');
  out.push((r.stderr || '').slice(0, 2000));
}
fs.writeFileSync('_tsc_both.txt', out.join('\n'));
