const fs = require('fs');
const p1 = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/game/prg/code/system/InterruptService.ts';
const p2 = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/game/prg/code/system/BootRouter.ts';
for (const p of [p1, p2]) {
  const src = fs.readFileSync(p, 'utf8');
  const lines = src.split('\n');
  let out = [];
  let capture = null;
  for (let i = 0; i < lines.length; i++) {
    if (/(_commitVramBuffer|writeVramByte|writePaletteIndex)\s*\(/.test(lines[i])) {
      capture = { start: i, count: 0 };
    }
    if (capture) {
      out.push(`${i + 1}|${lines[i]}`);
      capture.count++;
      if (capture.count > 40 || lines[i].includes('private') && capture.count > 3 && /^\s*}\s*$/.test(lines[i])) {
        capture = null;
      }
      if (capture && capture.count > 45) capture = null;
    }
  }
  console.log('==== ' + p + ' ====');
  console.log(out.join('\n'));
}
