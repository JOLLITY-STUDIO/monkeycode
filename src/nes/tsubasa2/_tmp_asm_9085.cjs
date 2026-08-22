const fs = require('fs');
const file = 'd:/studio/github/monkeycode/src/nes/tsubasa2/asm/bank00/code_render.s';
const s = fs.readFileSync(file, 'utf8').split('\n');
function dump(start, end) {
  let begin = -1, out = [];
  for (let i = 0; i < s.length; i++) {
    const m = s[i].match(/;\s*\$([0-9A-Fa-f]{4})\b/);
    if (!m) continue;
    const addr = parseInt(m[1], 16);
    if (addr === start) begin = i;
    if (begin >= 0) {
      out.push(s[i]);
      if (addr >= end) break;
    }
  }
  console.log('==== $' + start.toString(16) + '-$' + end.toString(16) + ' ====');
  console.log(out.join('\n'));
}
dump(0x978b, 0x97ab);
dump(0x9143, 0x9160);
