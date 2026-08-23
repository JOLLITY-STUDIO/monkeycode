// CommonJS 测试脚本 — 用 esbuild 直接转译并运行
require('esbuild').buildSync({
  entryPoints: [require('path').join(__dirname, 'audio-test.ts')],
  bundle: true,
  format: 'cjs',
  platform: 'node',
  outfile: require('path').join(__dirname, '_audio-test-bundle.cjs'),
  logLevel: 'silent',
});
require('./_audio-test-bundle.cjs');
