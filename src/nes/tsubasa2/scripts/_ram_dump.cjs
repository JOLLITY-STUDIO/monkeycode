const path = require('path');
require('esbuild').buildSync({
  entryPoints: [path.join(__dirname, '_ram_dump.ts')],
  bundle: true, format: 'cjs', platform: 'node',
  outfile: path.join(__dirname, '_ram_dump_bundle.cjs'),
  logLevel: 'silent',
});
require(path.join(__dirname, '_ram_dump_bundle.cjs'));
