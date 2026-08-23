const fs = require('fs');
const asmRoot = 'd:\\studio\\github\\monkeycode\\src\\nes\\tsubasa2\\src\\asm';
for (const f of ['bank00/code_main.s','bank00/code_sub.s','bank00/code_render.s','bank00/code_scene.s','bank00/code_util.s']) {
  const p = asmRoot + '/' + f;
  if (!fs.existsSync(p)) continue;
  const lines = fs.readFileSync(p,'utf8').split(/\r?\n/);
  for (let i=0;i<lines.length;i++) {
    if (lines[i].match(/;\s*\$953A/) || lines[i].match(/;\s*\$954C/) || lines[i].match(/;\s*\$9571/) || lines[i].match(/;\s*\$956B/)) {
      console.log(f+':'+(i+1)+': '+lines[i].trim());
      for (let j=1;j<=5 && i+j<lines.length;j++) console.log('  '+(i+j+1)+': '+lines[i+j].trim());
      console.log('');
    }
  }
}
