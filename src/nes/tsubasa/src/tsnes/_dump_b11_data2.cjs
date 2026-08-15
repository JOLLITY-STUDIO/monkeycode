// 提取 bank_11.asm 中 script 指针表 ($87F6) / fn_86D3 表 ($8B42) / unit 块 ($8B64) 数据
const fs = require('fs');
const src = fs.readFileSync('_tmp_bzk_out/bank_11.asm', 'utf8');
const lines = src.split(/\r?\n/);
const data = new Map(); // addr -> byte
for (const l of lines) {
  const m = l.match(/0x[0-9A-F]{6}\s+\d{2}:([0-9A-F]{4}):\s+([0-9A-F]{2})\s+\.byte/);
  if (!m) continue;
  data.set(parseInt(m[1], 16), parseInt(m[2], 16));
}
const dump = (s, e, label) => {
  const bytes = [];
  for (let a = s; a <= e; a++) bytes.push(data.has(a) ? data.get(a) : -1);
  console.log('== ' + label + ' $' + s.toString(16) + '-$' + e.toString(16) + ' ==');
  // 16/行 输出
  let out = '';
  for (let i = 0; i < bytes.length; i++) {
    if (i % 16 === 0) out += '\n' + (s + i).toString(16).toUpperCase() + ': ';
    out += (bytes[i] === -1 ? '??' : bytes[i].toString(16).padStart(2, '0')) + ' ';
  }
  console.log(out);
};
dump(0x87d0, 0x8b41, 'script ptr table $87F6 region');
dump(0x8b42, 0x8be0, 'fn_86D3 table $8B42 + unit blocks $8B64');
