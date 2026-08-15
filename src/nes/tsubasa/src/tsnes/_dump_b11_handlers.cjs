// 提取 bank_11.asm 中 handler 表与关键函数代码
const fs = require('fs');
const src = fs.readFileSync('_tmp_bzk_out/bank_11.asm', 'utf8');
const lines = src.split(/\r?\n/);
const want = (s, e, label) => {
  console.log('==== ' + label + ' $' + s.toString(16) + '-$' + e.toString(16) + ' ====');
  let n = 0;
  for (const l of lines) {
    const m = l.match(/0x[0-9A-F]{6}\s+\d{2}:([0-9A-F]{4}):\s+(.*)$/);
    if (!m) continue;
    const a = parseInt(m[1], 16);
    if (a >= s && a <= e) { console.log(m[1] + ': ' + m[2].trim()); n++; }
  }
  console.log('(' + n + ' lines)');
};
want(0x81A7, 0x81D3, 'handler table A + entry_81BC');
want(0x824D, 0x827C, 'handler table B + entry_8250/8279');
