const fs = require('fs');
const out = {};
for (const m of ['vite', 'rollup', 'webpack', 'esbuild', 'tsup', 'parcel', '@swc/core', 'typescript', 'ts-node']) {
  out[m] = fs.existsSync('node_modules/' + m);
}
console.log(JSON.stringify(out, null, 1));
