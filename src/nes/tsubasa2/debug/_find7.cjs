const fs = require('fs');
const dir = 'src/asm/bank00';
const out = [];
const lines = fs.readFileSync(dir + '/code_main.s', 'utf8').split(/\r\n|\r|\n/);
lines.forEach((l, i) => {
  if (/8920|88CA|8895|8976|98E8|98EA|9A0D|9A35|9B28|9B5E|9B7F|9B91|9E7C|9F89|9F96|9FA8|88FB|890C/.test(l) && /;\s*\$/.test(l)) {
    out.push((i + 1) + ': ' + l.trim());
  }
});
console.log(out.join('\n'));
