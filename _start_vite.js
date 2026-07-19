const { spawn } = require('child_process');
const fs = require('fs');
const out = fs.createWriteStream('_vite_server.log', { flags: 'a' });
const err = fs.createWriteStream('_vite_server_err.log', { flags: 'a' });

const v = spawn('npx', ['vite', '--host'], {
  cwd: 'd:/studio/github/monkeycode',
  shell: true,
  stdio: ['ignore', 'pipe', 'pipe'],
});

v.stdout.pipe(out);
v.stderr.pipe(err);
v.stdout.pipe(process.stdout);
v.stderr.pipe(process.stderr);

v.on('error', (e) => console.error('SPAWN ERR:', e));
v.on('exit', (code) => console.log('VITE EXITED with', code));

setTimeout(() => process.exit(0), 5000);
