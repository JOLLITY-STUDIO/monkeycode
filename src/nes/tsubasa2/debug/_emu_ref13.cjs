const path = require('path');
require('esbuild').buildSync({
  entryPoints: [path.join(__dirname, '_emu_ref13.ts')],
  bundle: true, format: 'cjs', platform: 'node',
  outfile: path.join(__dirname, '_emu_ref13_bundle.cjs'),
  logLevel: 'silent',
  external: ['fs', 'path', 'zlib'],
});
require(path.join(__dirname, '_emu_ref13_bundle.cjs'));
