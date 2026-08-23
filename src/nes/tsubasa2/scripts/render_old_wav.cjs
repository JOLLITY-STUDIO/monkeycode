const path = require('path');
require('esbuild').buildSync({
  entryPoints: [path.join(__dirname, 'render_old_wav.ts')],
  bundle: true,
  format: 'cjs',
  platform: 'node',
  outfile: path.join(__dirname, '_render_old_wav_bundle.cjs'),
});
require(path.join(__dirname, '_render_old_wav_bundle.cjs'));
