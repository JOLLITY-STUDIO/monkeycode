// 提取 bank_30.asm 中固定区辅助函数代码
const fs = require('fs');
const src = fs.readFileSync('_tmp_bzk_out/bank_30.asm', 'utf8');
const lines = src.split(/\r?\n/);
const re = /^(\S)(?:\s\S)*?\s+0x[0-9A-F]{6}\s+[0-9A-F]{2}:([0-9A-F]{4}):\s+(.+)$/;
const want = (s, e, label) => {
  const out = [];
  for (const l of lines) {
    const m = l.match(re);
    if (!m) continue;
    if (m[1] !== 'C') continue;
    const a = parseInt(m[2], 16);
    if (a >= s && a <= e) {
      const body = m[3].trim();
      if (/^\.byte/.test(body) || /^UNDEFINED/.test(body)) continue;
      out.push(m[2] + ': ' + body);
    }
  }
  console.log('== ' + label + ' $' + s.toString(16) + '-$' + e.toString(16) + ' ==');
  console.log(out.join('\n'));
};
want(0xcb99, 0xcc30, '$C509->$CB99 dispatcher');
want(0xcaf7, 0xcb0f, '$C512->$CAF7');
want(0xcd6c, 0xcdc9, '$C50C->$CD7C');
want(0xcdc9, 0xce30, '$C536/$C539/$C527');
