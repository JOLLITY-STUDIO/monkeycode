// 调试 BGM 数据读取
require('esbuild').buildSync({
  entryPoints: ['scripts/_debug_bgm.ts'],
  bundle: true,
  format: 'cjs',
  platform: 'node',
  outfile: 'scripts/_debug_bgm_bundle.cjs',
  logLevel: 'silent',
});
require('./_debug_bgm_bundle.cjs');
