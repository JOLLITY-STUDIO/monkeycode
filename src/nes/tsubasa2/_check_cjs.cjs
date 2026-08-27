const fs = require('fs');
for (const base of ['dist-cjs', 'dist-cjs2']) {
  const p = base + '/game/prg/code/scene/OpeningSceneController.js';
  const t = fs.readFileSync(p, 'utf8');
  const i = t.indexOf('renderStartOverride');
  console.log('=== ' + base + ' ===');
  if (i >= 0) {
    console.log(t.slice(i - 120, i + 200).replace(/\n/g, ' | '));
  } else {
    console.log('NO renderStartOverride in ' + base);
  }
  console.log();
}
