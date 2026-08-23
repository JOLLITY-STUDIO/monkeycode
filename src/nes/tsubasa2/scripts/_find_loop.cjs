// 临时：查找场景分发主循环（$00ED 用法 / $A200 引用 / $C421 上下文）
const fs = require('fs');
const targets = {
  'bank02/code_main.s': ['$A200', '$A21B', '$A491', '00ED', '$A484', '$A3D8'],
  'bank00/code_main.s': ['00ED'],
  'bank30/code_main.s': ['$C421', '00ED'],
};
for (const [f, pats] of Object.entries(targets)) {
  const p = 'src/asm/' + f;
  if (!fs.existsSync(p)) continue;
  const lines = fs.readFileSync(p, 'utf8').split(/\r?\n/);
  console.log('######## ' + f);
  lines.forEach((l, i) => {
    const t = l.trim();
    if (!t.startsWith(';') && pats.some((pt) => t.includes(pt))) {
      console.log('L' + i + ': ' + t);
    }
  });
}
