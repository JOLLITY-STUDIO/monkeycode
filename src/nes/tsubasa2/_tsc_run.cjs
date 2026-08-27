// 临时: 跑 tsc -p tsconfig.cjs.json --noEmit 完整输出落盘
const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const tsc = path.join(process.cwd(), 'node_modules', 'typescript', 'bin', 'tsc');
const cfg = process.argv[2] || 'tsconfig.cjs.json';
const r = spawnSync(process.execPath, [tsc, '-p', cfg, '--noEmit'], {
  cwd: process.cwd(),
  encoding: 'utf8',
  timeout: 300000,
});
const out = (r.stdout || '') + (r.stderr || '');
const tag = cfg.replace(/\W/g, '_');
fs.writeFileSync('_tsc_' + tag + '.log', out || '(no output)');
const errs = out.split('\n').filter((l) => l.includes('error TS'));
fs.writeFileSync('_tsc_' + tag + '_sum.log', `exit=${r.status} errors=${errs.length}\n${errs.join('\n')}`);
