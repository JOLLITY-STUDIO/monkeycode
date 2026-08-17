const fs = require('fs');
const file = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/game/service/bank00/bank00_core.service.ts';
const lines = fs.readFileSync(file, 'utf8').split('\n');
lines.forEach((l, i) => {
  const m = l.match(/^\s*(?:public |private |protected )?([a-zA-Z_$][\w$]*)\s*\(([^)]*)\)\s*:\s*([a-zA-Z_$<>\[\]\s|]+)/);
  if (m && /^\s*(public |private |protected )?[a-zA-Z_$]/.test(l) && l.includes('(')) {
    console.log(`${i + 1}: ${l.trim()}`);
  }
});
