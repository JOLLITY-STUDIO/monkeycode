// 临时：查找 $8486 分发器的调用点 + $8879 上下文 + $9FA8 全量
const fs = require('fs');
const files = {
  b00sub: 'src/asm/bank00/code_sub.s',
  b00main: 'src/asm/bank00/code_main.s',
  b00scene: 'src/asm/bank00/code_scene.s',
  b00util: 'src/asm/bank00/code_util.s',
  b00render: 'src/asm/bank00/code_render.s',
  b02sub: 'src/asm/bank02/code_sub.s',
  b02main: 'src/asm/bank02/code_main.s',
};
for (const [name, path] of Object.entries(files)) {
  const text = fs.readFileSync(path, 'utf8');
  const lines = text.split(/\r?\n/);
  lines.forEach((l, i) => {
    if (/\$8486/.test(l) || /\$8879/.test(l) || /\$A2F8/.test(l) || /\$A491/.test(l)) {
      console.log(name + ' L' + i + ': ' + l.trim());
    }
  });
}
// $9FA8 全量（从 $9F9E 到 $9FA8 之后 60 行）
const text = fs.readFileSync(files.b00sub, 'utf8');
const lines = text.split(/\r?\n/);
lines.forEach((l, i) => {
  if (/\$9F9E/.test(l)) console.log('--- 9F9E ctx ---\n' + lines.slice(i, i + 80).join('\n'));
});
