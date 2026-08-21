const { spawnSync } = require('child_process');
const fs = require('fs');
const r = spawnSync('npx.cmd', ['tsc', '-p', 'tsconfig.json', '--noEmit'], {
  cwd: process.cwd(),
  encoding: 'utf8',
  shell: true,
  maxBuffer: 128 * 1024 * 1024,
});
const stdout = (r.stdout || '');
const stderr = (r.stderr || '');
const all = stdout + stderr;
const errors = all.split(/\r?\n/).filter(l => /error TS/.test(l));
const report = [
  'status=' + r.status,
  'errors=' + errors.length,
  '--- first 60 error lines ---',
  errors.slice(0, 60).join('\n'),
  '--- tail (if truncated) ---',
  errors.slice(-5).join('\n'),
].join('\n');
fs.writeFileSync('_tsc_report.txt', report + '\n');
console.log('WROTE _tsc_report.txt');
