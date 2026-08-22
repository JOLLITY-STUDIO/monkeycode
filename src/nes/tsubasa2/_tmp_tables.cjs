const fs = require('fs');
const p = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/game/prg/data/tables/bank00-tables.ts';
const src = fs.readFileSync(p, 'utf8');
const lines = src.split('\n');
let out = [];
for (let i = 0; i < lines.length; i++) {
  if (/^export/.test(lines[i]) || /WAIT_FRAME_TABLE|PAL_HELPER_TABLE|FRAME_WAIT_TABLE|PALETTE_ANIM_87B3|TEXT_BUFFER_TEMPLATE_978B/.test(lines[i])) {
    out.push(`${i + 1}|${lines[i]}`);
  }
}
console.log(out.join('\n'));
