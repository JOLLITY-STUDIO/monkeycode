const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
// 尝试直接调 esbuild
let esbuild;
try {
  esbuild = require('esbuild');
} catch (e) {
  console.log('esbuild not found at root, trying local...');
}
if (!esbuild) {
  try {
    esbuild = require(require.resolve('esbuild', { paths: [process.cwd()] }));
  } catch (e) {
    console.log('esbuild unavailable');
    process.exit(1);
  }
}
esbuild.buildSync({
  entryPoints: ['_diag_compare800.ts'],
  bundle: true,
  platform: 'node',
  format: 'cjs',
  outfile: '_diag_compare800.cjs',
  target: 'es2020',
  logLevel: 'warning',
});
console.log('built _diag_compare800.cjs');
