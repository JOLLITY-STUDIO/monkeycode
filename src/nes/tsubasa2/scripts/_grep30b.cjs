const fs = require('fs');
const p = 'src/game/service/bank30_init.service.ts';
const s = fs.readFileSync(p, 'utf8').split('\n');
let inMethod = false;
let depth = 0;
s.forEach((l, i) => {
  const t = l.trim();
  const m = t.match(/^\s*(private\s+|public\s+)?(\w+)\s*\(/);
  if (m) {
    // method signature line
    console.log('### ' + (i + 1) + ': ' + t.slice(0, 100));
  }
  if (/sceneCtrl557|C4BD|c4bd|spriteInit/.test(l)) {
    console.log((i + 1) + ': ' + l.trim().slice(0, 110));
  }
});
