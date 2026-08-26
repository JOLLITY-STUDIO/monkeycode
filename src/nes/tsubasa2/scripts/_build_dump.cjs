const esbuild = require('esbuild');
const path = require('path');

esbuild.build({
  entryPoints: [path.join(__dirname, '_dump_h5_nt_entry.ts')],
  bundle: true,
  platform: 'node',
  format: 'cjs',
  outfile: path.join(__dirname, '_dump_h5_nt_bundle.cjs'),
  tsconfig: path.join(__dirname, '..', 'tsconfig.json'),
  external: [],
  logLevel: 'info'
}).catch(err => {
  console.error(err);
  process.exit(1);
});
