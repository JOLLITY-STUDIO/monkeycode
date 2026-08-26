const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const tsc = path.join(process.cwd(), 'node_modules', 'typescript', 'bin', 'tsc');
const r = spawnSync(process.execPath, [tsc, '-p', 'tsconfig.cjs.json'], {
  cwd: process.cwd(),
  encoding: 'utf8',
  timeout: 180000,
});
fs.writeFileSync('_build_cjs.log', JSON.stringify({
  status: r.status,
  signal: r.signal,
  error: r.error ? String(r.error) : null,
  stdout: (r.stdout || '').slice(0, 3000),
  stderr: (r.stderr || '').slice(0, 3000),
}, null, 2));
