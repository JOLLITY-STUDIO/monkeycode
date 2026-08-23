const fs = require('fs');
const dir = 'src/asm/bank00';
const files = ['code_util.s', 'code_sub.s', 'code_main.s', 'code_scene.s', 'code_render.s'];
const wants = ['8400', '8464', '8297', '9FA8', '9FB0', '9F96', '9F89', '890C', '9B11', '9BA0', '8920', '8895', '8976', '8AF7', '9A35', '9A0D', '99F0', '9B28', '9B5E', '9B7F', '9B91', '98EA', '88FB', '88CA', '9E7C', 'A82F', '98A0', '9071', '9076'];
for (const f of files) {
  const t = fs.readFileSync(`${dir}/${f}`, 'utf8');
  const lines = t.split(/\r?\n/);
  lines.forEach((l, i) => {
    for (const w of wants) {
      // 行尾注释中的地址（如 ";" 后跟 $xxxx: 或 ; $xxxx）
      if (l.includes(`; $${w}`) || l.includes(`;$${w}`)) {
        console.log(`${f}:${i + 1}: ${l.trim()}`);
        break;
      }
    }
  });
}
