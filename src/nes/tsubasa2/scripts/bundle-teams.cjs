// rebuild api-test-teams-bundle.cjs from api-test-teams.ts (esbuild IIFE)
// 用于 test/teams.html 直接 <script src=...> 加载
const esbuild = require('esbuild');
const path = require('path');

const srcEntry = path.resolve(__dirname, '../test/api-test-teams.ts');
const outFile  = path.resolve(__dirname, '../test/api-test-teams-bundle.cjs');

esbuild.build({
  entryPoints: [srcEntry],
  bundle: true,
  outfile: outFile,
  format: 'iife',
  platform: 'browser',
  target: 'es2018',
  loader: { '.ts': 'ts' },
  sourcemap: false,
  minify: false,
  logLevel: 'info',
}).then(() => {
  const size = require('fs').statSync(outFile).size;
  console.log('[bundle] OK', outFile, size, 'bytes (' + (size/1024).toFixed(1) + 'KB)');
}).catch((e) => {
  console.error('[bundle] FAIL', e);
  process.exit(1);
});
