const esbuild = require('esbuild');
const path = require('path');
const fs = require('fs');
esbuild.buildSync({
  entryPoints: [path.resolve(__dirname, '_buf_dump_entry.ts')],
  bundle: true, format: 'cjs', platform: 'node', target: 'node18',
  outfile: path.resolve(__dirname, '_buf_dump_bundle.cjs'),
  logLevel: 'silent', external: ['fs', 'path'],
});
require(path.resolve(__dirname, '_buf_dump_bundle.cjs'));
