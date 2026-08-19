const fs = require('fs');
const p = 'src/game/service/bank02_scene.service.ts';
const s = fs.readFileSync(p, 'utf8').split('\n');
const re = /\$8895|\$8920|\$A82F|\$8976|\$9A35|\$9B28|\$9B5E|\$88FB|\$9FA8|\$8AF7|\$890C|\$9A0D|\$A8B7/g;
s.forEach((l, i) => {
  if (re.test(l)) console.log((i + 1) + ': ' + l.trim().slice(0, 110));
});
