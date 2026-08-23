const fs = require('fs');
const files = [
  'src/asm/bank00/code_sub.s', 'src/asm/bank00/code_main.s',
  'src/asm/bank00/code_scene.s', 'src/asm/bank00/code_render.s', 'src/asm/bank00/code_util.s',
  'src/asm/bank02/code_sub.s', 'src/asm/bank02/code_data.s', 'src/asm/bank02/code_main.s', 'src/asm/bank02/data_tables.s',
];
const wants = ['8895', '8920', '8976', '88CA', '855A', '857C', '8582', '85A3', '85A9', '85B1', '85B9', '85C0', '85CE', '85DC', '85E9', '8603', '861D', '862A', '8651', '869D', '877B', '8783', '878E', '87BE', '87CF', '87D7', '87FB', '872C', '8767', '882F', '8C6D', '8C71', '8A97', '8A91', '8486'];
for (const f of files) {
  if (!fs.existsSync(f)) continue;
  const l = fs.readFileSync(f, 'utf8').split(/\r?\n/);
  const found = new Set();
  for (const x of l) {
    const m = x.match(/;\s*\$([0-9A-Fa-f]{4})/);
    if (m) found.add(m[1].toUpperCase());
  }
  const hit = wants.filter(w => found.has(w));
  if (hit.length) console.log(f + ': ' + hit.join(','));
}
