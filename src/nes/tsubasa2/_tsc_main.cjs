const { spawnSync } = require('child_process');
const path = require('path');
const tsc = path.join(process.cwd(), 'node_modules', 'typescript', 'bin', 'tsc');
const r = spawnSync(process.execPath, [tsc, '-p', 'tsconfig.json', '--noEmit'], { cwd: process.cwd(), encoding: 'utf8', timeout: 180000 });
console.log('status:', r.status);
console.log('stdout:', (r.stdout || '').slice(0, 3000));
console.log('stderr:', (r.stderr || '').slice(0, 3000));
