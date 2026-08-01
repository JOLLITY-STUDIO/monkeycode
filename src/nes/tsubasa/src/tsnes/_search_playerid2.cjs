const fs = require('fs');
const path = require('path');

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory() && e.name !== 'node_modules' && e.name !== '.git') {
      walk(full);
    } else if (e.name.endsWith('.ts') || e.name.endsWith('.js')) {
      try {
        const c = fs.readFileSync(full, 'utf8');
        if (c.includes('playerId2')) {
          console.log('FOUND in:', full);
          const lns = c.split('\n');
          for (let i = 0; i < lns.length; i++) {
            if (lns[i].includes('playerId2')) {
              console.log('  line', i + 1, ':', lns[i].trim().substring(0, 150));
            }
          }
        }
      } catch (e) { /* ignore */ }
    }
  }
}

walk('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/game-engine');
walk('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/src');
