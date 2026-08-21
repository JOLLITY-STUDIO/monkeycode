const fs = require('fs');
const dir = __dirname + '/src/game/prg/code/system';
for (const f of fs.readdirSync(dir)) {
  const s = fs.readFileSync(dir + '/' + f, 'utf8');
  const lines = s.split('\n');
  lines.forEach((l, i) => {
    const m = l.match(/^\s{2}(?:public |protected )?(?:get |set )?([A-Za-z_]\w*)\s*\([^)]*\)\s*:\s*(\w[\w<>\[\]| ]*)\s*\{/);
    if (m) {
      const [_, name, ret] = m;
      if (/^(update|resetEntry|mainLoop|sceneLoad|start|init|boot|frame)$/.test(name)) {
        console.log(`${f}:${i + 1}: ${l.trim()}`);
      }
    }
  });
}
