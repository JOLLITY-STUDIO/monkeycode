const fs = require('fs');
const targets = ['$8AEC', '$8AEE', '$8AE6', '$8A14', '$8545', '$86C6', '$88D2', '$87B3', '$8398', '$83BA'];
for (const f of ['asm/bank00/code_main.s', 'asm/bank00/code_scene.s', 'asm/bank00/code_util.s', 'asm/bank00/code_sub.s', 'asm/bank00/data_tail.s']) {
  const s = fs.readFileSync(f, 'utf8');
  const lines = s.split('\n');
  for (let i = 0; i < lines.length; i++) {
    for (const t of targets) {
      if (lines[i].includes(t)) {
        console.log(f, 'L' + (i + 1), lines[i].trim());
        break;
      }
    }
  }
}
