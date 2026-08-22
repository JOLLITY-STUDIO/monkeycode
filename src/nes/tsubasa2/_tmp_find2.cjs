const fs = require('fs');
const p = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/game/prg/code/system/BootRouter.ts';
const src = fs.readFileSync(p, 'utf8');
const lines = src.split('\n');
let out = [];
for (let i = 0; i < lines.length; i++) {
  if (/(nmiRender|writeVramByte|05E8|05e8|0x05e8|ram_0628|writeScroll|0x0628)/.test(lines[i])) {
    out.push(`${i + 1}|${lines[i]}`);
  }
}
console.log(out.join('\n'));
