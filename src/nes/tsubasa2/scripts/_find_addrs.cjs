const fs = require('fs');
const c = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/src/asm/bank00/code_scene.s', 'utf8');
const ls = c.split(/\r?\n/);
const pats = ['$8E15', '$8EF0', '$8D59', '$8D22', '$9BA9', '$8DFC', '$8E0A', '$8E1A', '$8E2A'];
ls.forEach((l, i) => {
  for (const p of pats) {
    if (l.includes(p)) { console.log((i + 1) + ': ' + l.trim()); break; }
  }
});
