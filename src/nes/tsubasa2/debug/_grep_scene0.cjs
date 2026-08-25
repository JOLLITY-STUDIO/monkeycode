// _grep_scene0.cjs — 定位 code_sub.s 中 Scene0 序列与 $9FA8
const fs = require('fs');
const lines = fs.readFileSync('src/asm/bank02/code_sub.s', 'utf8').split('\n');
const targets = ['84C1', '8559', '9FA8', '9A0D', '9A35', '890C', '88FB', '8920', '9B7F', '98A0', '9AB8', '9ADA'];
for (let i = 0; i < lines.length; i++) {
  for (const t of targets) {
    if (lines[i].includes('$' + t) || lines[i].includes('$0' + t) || lines[i].toUpperCase().includes(t + ':')) {
      console.log(String(i + 1).padStart(4) + ': ' + lines[i]);
      break;
    }
  }
}
