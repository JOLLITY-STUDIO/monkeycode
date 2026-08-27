// _build_cmp.cjs — esbuild bundle TS 测试脚本为 CJS 并运行
const path = require('path');
const esbuild = require('esbuild');
const { execSync } = require('child_process');

const entry = process.argv[2];
const abs = path.resolve(entry);
const dir = path.dirname(abs);
const outfile = path.join(dir, path.basename(abs).replace(/\.[jt]s$/, '') + '.run.cjs');
esbuild.buildSync({
  entryPoints: [abs],
  bundle: true,
  platform: 'node',
  format: 'cjs',
  target: 'node18',
  outfile,
  logLevel: 'warning',
  define: { 'process.env.NODE_ENV': '"test"' },
});
console.log('[build] ' + outfile);
execSync('node ' + path.basename(outfile), { stdio: 'inherit', cwd: dir });
