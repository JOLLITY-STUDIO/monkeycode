const fs = require('fs');
const files = [
  'src/game/service/bank00/bank00_core.service.ts',
];
const targets = ['8895', '8920', 'A82F', '8976', '9A35', '9B28', '9B5E', '88FB', '8AF7', '890C', '9A0D', '9FA8'];
for (const p of files) {
  console.log('=== ' + p + ' ===');
  const s = fs.readFileSync(p, 'utf8').split('\n');
  s.forEach((l, i) => {
    for (const t of targets) {
      if (new RegExp('\\$' + t + '\\b|' + t + ':').test(l)) {
        console.log((i + 1) + ': ' + l.trim().slice(0, 120));
        break;
      }
    }
  });
}
