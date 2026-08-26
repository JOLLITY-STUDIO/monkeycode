const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const tsc = path.join(process.cwd(), 'node_modules', 'typescript', 'bin', 'tsc');
const r = spawnSync(process.execPath, [tsc, '-p', 'tsconfig.cjs.json', '--outDir', 'dist-cjs'], {
  cwd: process.cwd(),
  encoding: 'utf8',
  timeout: 600000,
});
fs.writeFileSync('_tsc_cjs_dist.log', JSON.stringify({
  status: r.status,
  signal: r.signal,
  error: r.error ? String(r.error) : null,
  stdout: (r.stdout || '').slice(0, 8000),
  stderr: (r.stderr || '').slice(0, 8000),
}, null, 2));
