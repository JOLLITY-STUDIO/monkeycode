const fs = require('fs');
const files = [
  'src/asm/bank00/code_sub.s',
  'src/asm/bank00/code_util.s',
  'src/asm/bank00/code_scene.s',
  'src/asm/bank00/code_render.s',
  'src/asm/bank00/code_main.s',
  'src/asm/bank02/code_data.s',
  'src/asm/bank02/code_sub.s',
  'src/asm/bank02/code_main.s',
];
const targets = {
  '9a0d': 1, '9a35': 1, '98ea': 1, '98e8': 1, '9e7c': 1, '9f96': 1, '9f89': 1,
  '88ca': 1, '88fb': 1, '8976': 1, '9b91': 1, '9b7f': 1, '9fa8': 1, '9b28': 1,
  '9b5e': 1, '890c': 1, '99f0': 1, '98a0': 1, '8895': 1, '8920': 1, '8af7': 1,
  'a82f': 1, 'a767': 1, 'a72c': 1,
};
for (const f of files) {
  const lines = fs.readFileSync(f, 'utf8').split(/\r?\n/);
  lines.forEach((l, i) => {
    const m = l.match(/;\s*\$([0-9a-fA-F]{4})\b/);
    if (m && targets[m[1].toLowerCase()]) console.log(f + ':' + (i + 1) + ': ' + l);
  });
}
