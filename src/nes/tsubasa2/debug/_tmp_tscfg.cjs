const fs = require('fs');
for (const f of ['tsconfig.json', 'tsconfig.check.json', 'tsconfig.play.json', 'tsconfig.test.json', 'tsconfig.verify19.json', 'tsconfig.verify-tmp.json']) {
  try {
    const j = JSON.parse(fs.readFileSync(__dirname + '/../' + f, 'utf8'));
    console.log('=== ' + f + ' ===');
    console.log('  include:', JSON.stringify(j.include));
    console.log('  exclude:', JSON.stringify(j.exclude));
    console.log('  outDir:', j.compilerOptions && j.compilerOptions.outDir);
  } catch (e) { console.log(f, 'ERR', e.message); }
}
