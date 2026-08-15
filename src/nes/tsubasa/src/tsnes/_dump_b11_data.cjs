// 提取 bank_11.asm 中指定地址区间的全部行（含 code+data）
const fs = require('fs');
const src = fs.readFileSync('_tmp_bzk_out/bank_11.asm', 'utf8');
const lines = src.split(/\r?\n/);
const want = (s, e, label) => {
  const out = [];
  for (const l of lines) {
    const m = l.match(/0x[0-9A-F]{6}\s+\d{2}:([0-9A-F]{4}):\s+(.*)$/);
    if (!m) continue;
    const a = parseInt(m[1], 16);
    if (a >= s && a <= e) {
      out.push(m[1] + ': ' + m[2].trim());
    }
  }
  console.log('== ' + label + ' $' + s.toString(16) + '-$' + e.toString(16) + ' (' + out.length + ' lines) ==');
  console.log(out.join('\n'));
};
want(0x81d3, 0x824c, 'entry_81CC table $81D5');
want(0x827c, 0x82f6, 'entry_8279 table $827F');
want(0x86ee, 0x8b6f, 'fn_8525 unit table $86EE + fn_86D3 table $8B42 + ptr base $8B64');
