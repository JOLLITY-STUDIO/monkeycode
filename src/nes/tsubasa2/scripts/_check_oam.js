const fs = require('fs');
const j = JSON.parse(fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/output/ppu-trace/frame-030/oam.json', 'utf8'));
for (let i = 0; i < 6; i++) {
  console.log('i=' + i, JSON.stringify(j[i]));
}
