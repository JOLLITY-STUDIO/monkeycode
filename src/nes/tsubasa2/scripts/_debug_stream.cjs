const path = require('path');
require('esbuild').buildSync({
  entryPoints: [path.join(__dirname, '_debug_stream.ts')],
  bundle: true, format: 'cjs', platform: 'node',
  outfile: path.join(__dirname, '_debug_stream_bundle.cjs'),
});
require(path.join(__dirname, '_debug_stream_bundle.cjs'));
