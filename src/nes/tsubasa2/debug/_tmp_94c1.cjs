const fs = require('fs');
const files = [
  'd:/studio/github/monkeycode/src/nes/tsubasa2/asm/bank00/code_main.s',
  'd:/studio/github/monkeycode/src/nes/tsubasa2/asm/bank00/code_render.s',
  'd:/studio/github/monkeycode/src/nes/tsubasa2/asm/bank00/code_scene.s',
];
files.forEach((p) => {
  if (!fs.existsSync(p)) { console.log('MISSING ' + p); return; }
  const ls = fs.readFileSync(p, 'utf8').split('\n');
  let s = -1;
  ls.forEach((l, i) => { if (s < 0 && /94C1/.test(l)) s = i; });
  if (s < 0) { console.log('no 94C1 in ' + p); return; }
  console.log('### 94C1 in ' + p + ' at line ' + (s + 1));
  for (let i = s; i < Math.min(s + 100, ls.length); i++) console.log((i + 1) + ': ' + ls[i]);
});
