/**
 * _emu_reference.cjs — esbuild 打包 _emu_reference.ts 后 node 执行
 * 输出：output/emu-reference/frame-NNN/{screen,pt-sheet,nt0,nt1,oam,palette}.{png,json}
 */
const path = require('path');
require('esbuild').buildSync({
  entryPoints: [path.join(__dirname, '_emu_reference.ts')],
  bundle: true, format: 'cjs', platform: 'node',
  outfile: path.join(__dirname, '_emu_reference_bundle.cjs'),
  logLevel: 'silent',
  external: ['fs', 'path', 'zlib'],
});
require(path.join(__dirname, '_emu_reference_bundle.cjs'));
