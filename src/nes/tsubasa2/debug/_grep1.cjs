const fs = require('fs');
const c = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/src/game/prg/code/system/BootRouter.ts','utf8');
const lines = c.split('\n');
lines.forEach((l, i) => {
  if (l.indexOf('writeVramByte') >= 0) console.log((i+1) + ': ' + l.trim());
});
