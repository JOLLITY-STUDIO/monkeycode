const fs = require('fs');
const files = [
  'src/game/boot.ts',
  'src/game/service/bank02_scene.service.ts',
  'src/game/index.ts',
];
const targets = ['820C', '820F', '8212', '8215', 'A855', 'A86E', 'A484', 'A8CE', 'Entry G', 'oamDataCopy', '_oamDataCopy', 'entryD', 'entryE', 'entryC'];
for (const p of files) {
  console.log('=== ' + p + ' ===');
  const s = fs.readFileSync(p, 'utf8').split('\n');
  s.forEach((l, i) => {
    for (const t of targets) {
      if (l.includes(t)) {
        console.log((i + 1) + ': ' + l.trim().slice(0, 120));
        break;
      }
    }
  });
}
