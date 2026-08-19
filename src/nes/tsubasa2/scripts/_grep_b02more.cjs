const fs = require('fs');
const p = 'src/game/service/bank02_scene.service.ts';
const s = fs.readFileSync(p, 'utf8').split('\n');
const targets = ['A82F', '_fieldGenerationMain', '_fieldTileFill', 'sceneParamSet', '$85DC', '$877B', '$8783', '$87BE', '$87CF', '$87D7', 'oamCopy'];
s.forEach((l, i) => {
  for (const t of targets) {
    if (l.includes(t)) {
      console.log((i + 1) + ': ' + l.trim().slice(0, 120));
      break;
    }
  }
});
