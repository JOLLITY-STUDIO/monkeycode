const fs = require('fs');
const files = [
  'd:/studio/github/monkeycode/src/nes/tsubasa2/asm/bank00/code_main.s',
  'd:/studio/github/monkeycode/src/nes/tsubasa2/asm/bank00/code_render.s',
];
files.forEach((p) => {
  if (!fs.existsSync(p)) return;
  const ls = fs.readFileSync(p, 'utf8').split('\n');
  let s = -1;
  ls.forEach((l, i) => { if (s < 0 && /82ED/.test(l)) s = i; });
  if (s < 0) { console.log('no 82ED in ' + p); return; }
  console.log('### 82ED in ' + p + ' at line ' + (s + 1));
  for (let i = s; i < Math.min(s + 80, ls.length); i++) console.log((i + 1) + ': ' + ls[i]);
});
