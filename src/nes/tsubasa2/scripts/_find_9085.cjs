const fs = require('fs');
const targets = ['9085', '90A5', '90B0', '8A91', '8A8B', '00E5', '8AD2'];
for (const f of ['code_main.s', 'code_sub.s', 'code_util.s', 'code_scene.s', 'data_tail.s']) {
  const lines = fs.readFileSync('src/asm/bank00/' + f, 'utf8').split(/\r?\n/);
  lines.forEach((l, i) => {
    for (const t of targets) {
      if (new RegExp('\\$' + t + '\\b').test(l)) console.log(f + ':' + (i + 1) + ': ' + l.trim());
    }
  });
}
