const path = require('path');
require('esbuild').buildSync({
  entryPoints: [path.join(__dirname, '_scene_trace.ts')],
  bundle: true, format: 'cjs', platform: 'node',
  outfile: path.join(__dirname, '_scene_trace_bundle.cjs'),
  logLevel: 'silent',
  external: ['fs', 'path'],
});
require(path.join(__dirname, '_scene_trace_bundle.cjs'));
