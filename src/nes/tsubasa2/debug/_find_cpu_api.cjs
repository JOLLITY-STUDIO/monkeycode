const fs = require('fs');
const path = require('path');
const src = fs.readFileSync(path.resolve(__dirname, '../src/core/cpu.ts'), 'utf8');
// 找 load/write 方法定义
for (const pat of ['load(addr', 'load (addr', 'load =', 'load(ad', 'write(addr', 'write (addr', 'write =', '    load(', '    write(']) {
  let idx = 0;
  while (true) {
    const i = src.indexOf(pat, idx);
    if (i < 0) break;
    console.log('--- found "' + pat + '" @ ' + i);
    console.log(src.slice(Math.max(0, i - 80), i + 260).replace(/\n/g, '\n'));
    console.log();
    idx = i + 1;
    break;
  }
}
// 看 cpu 对外公共接口
console.log('=== public methods ===');
const meths = src.match(/^\s{2}(load|write|push|pull|emulate|reset|fromJSON|toJSON)[A-Za-z]*\s*=/gm);
console.log(meths ? meths.join('\n') : 'none found');
