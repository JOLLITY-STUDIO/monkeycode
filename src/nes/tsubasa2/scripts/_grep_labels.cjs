// 在 bank00 asm 中按地址注释 "; $XXXX" 定位代码段
const fs = require('fs');
const dir = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/asm/bank00/';
const files = ['code_main.s', 'code_scene.s', 'code_render.s', 'code_util.s', 'data_tail.s'];
const targets = ['9A35', '997A', '99D1', '9A0D', '99F0', '8920', '8AF7', '8BD4', '9FA8', '9F69', '9EFB', '9B28', '9B5E', '9A71', '9AB8', '9ADA', '9AA2', '890C', '88FB', '9B7F', '98A0', '98EA', '9DEE', '8EF0', '8E15', '8CA7'];
const out = [];
for (const f of files) {
  const txt = fs.readFileSync(dir + f, 'latin1');
  const lines = txt.split(/\r?\n/);
  for (const t of targets) {
    const idx = lines.findIndex(l => {
      const m = l.match(/;\s*\$([0-9A-Fa-f]{4})/);
      return m && m[1].toLowerCase() === t.toLowerCase();
    });
    if (idx >= 0) {
      out.push(`===== ${f} @$${t} (line ${idx + 1}) =====`);
      for (let i = idx; i < Math.min(idx + 45, lines.length); i++) out.push(lines[i]);
      out.push('');
    }
  }
}
fs.writeFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/scripts/_grep_labels_out.txt', out.join('\n'), 'utf8');
console.log('done, sections:', targets.length);
