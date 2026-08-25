const esbuild = require('esbuild');
const path = require('path');
esbuild.buildSync({
  entryPoints: [path.resolve(__dirname, '_render_dump_entry.ts')],
  bundle: true, format: 'cjs', platform: 'node', target: 'node18',
  outfile: path.resolve(__dirname, '_render_dump_bundle.cjs'),
  logLevel: 'silent', external: ['fs', 'path', 'zlib'],
});
require(path.resolve(__dirname, '_render_dump_bundle.cjs'));
