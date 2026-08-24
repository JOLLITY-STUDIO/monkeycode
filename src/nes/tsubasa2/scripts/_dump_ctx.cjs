const fs = require('fs');
const targets = [
  ['d:/studio/github/monkeycode/src/nes/tsubasa2/src/asm/bank00/code_main.s', '$804A', 8],
  ['d:/studio/github/monkeycode/src/nes/tsubasa2/src/asm/bank00/code_main.s', '$8107', 8],
  ['d:/studio/github/monkeycode/src/nes/tsubasa2/src/asm/bank00/code_main.s', '$812C', 8],
  ['d:/studio/github/monkeycode/src/nes/tsubasa2/src/asm/bank00/code_main.s', '$8245', 8],
  ['d:/studio/github/monkeycode/src/nes/tsubasa2/src/asm/bank00/code_main.s', '$8287', 8],
  ['d:/studio/github/monkeycode/src/nes/tsubasa2/src/asm/bank00/code_main.s', '$82DC', 8],
];
for (const [file, addr, n] of targets) {
  const c = fs.readFileSync(file, 'utf8');
  const ls = c.split(/\r?\n/);
  const idx = ls.findIndex((l) => l.includes('; ' + addr));
  console.log('=== ' + addr + ' ===');
  if (idx < 0) { console.log('not found'); continue; }
  for (let i = Math.max(0, idx - n); i <= idx + n && i < ls.length; i++) console.log(ls[i]);
  console.log('');
}
