const fs = require('fs');
const ROOT = 'd:/studio/github/monkeycode/src/nes/tsubasa2';
const f = ROOT + '/src/game/service/bank30_init.service.ts';
const src = fs.readFileSync(f, 'utf8').split('\n');
for (let i = 0; i < src.length; i++) {
  if (/ram_0023|bankSelect/.test(src[i])) {
    console.log((i + 1) + '  ' + src[i].trim().slice(0, 110));
  }
}
