const { spawnSync } = require('child_process');
const fs = require('fs');
const root = __dirname;
const r = spawnSync('cmd.exe', ['/c', 'npx tsc -p tsconfig.json --noEmit'], {
  cwd: root,
  encoding: 'utf8',
  timeout: 120000,
});
const out = [];
out.push('status=' + r.status);
out.push('--- stdout ---');
out.push(r.stdout || '');
out.push('--- stderr ---');
out.push(r.stderr || '');
fs.writeFileSync(root + '/_g37_tsc.txt', out.join('\n'), 'utf8');
