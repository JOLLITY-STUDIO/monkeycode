// 提取 bank_01.asm 中 block8/9 与 block9/10 间隙 -> 输出到 _gaps9110.txt
const fs = require('fs');
const lines = fs.readFileSync(__dirname + '/_tmp_bzk_out/bank_01.asm', 'utf8').split(/\r?\n/);
let out = [];
let started = false;
for (const line of lines) {
  const m = line.match(/00:([0-9A-F]{4}):/);
  if (!m) continue;
  const a = parseInt(m[1], 16);
  if (a === 0x9110) started = true;
  if (!started) continue;
  if (a > 0x919C) break;
  out.push(line);
}
fs.writeFileSync(__dirname + '/_gaps9110.txt', out.join('\n'));
console.log('lines:', out.length);
