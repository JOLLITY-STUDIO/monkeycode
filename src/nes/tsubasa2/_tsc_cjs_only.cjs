const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const tsc = path.join(process.cwd(), 'node_modules', 'typescript', 'bin', 'tsc');
fs.writeFileSync('_tsc_cjs_only.txt', 'running...\n');
const r = spawnSync(process.execPath, [tsc, '-p', 'tsconfig.cjs.json', '--noEmit'], { cwd: process.cwd(), encoding: 'utf8', timeout: 200000 });
fs.writeFileSync('_tsc_cjs_only.txt', 'status=' + r.status + '\n' + (r.stdout || '') + '\n' + (r.stderr || ''));
