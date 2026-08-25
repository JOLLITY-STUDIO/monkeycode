const fs = require('fs');
const r = fs.readFileSync('src/game/prg/code/system/RenderingPrimitivesService.ts', 'utf8');
const lines = r.split('\n');
for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  if (/ntBuffer[A-Z]\w+/.test(l)) {
    console.log((i+1) + ': ' + l.substring(0, 220));
  }
}
