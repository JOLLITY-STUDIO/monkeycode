/** 提取 bank 19 code 指令行 ($9000-$9450) → _tmp_b19_code.txt */
const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, '../_tmp_bzk_out/bank_19');
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.asm')).sort();
const out = [];

for (const f of files) {
  const lines = fs.readFileSync(path.join(dir, f), 'utf8').split('\n');
  for (const ln of lines) {
    const m = /^([\-CDIW\s]+) 0x\w+ \w{2}:(\w{4}):\s+(.*)$/.exec(ln);
    if (!m) continue;
    if (!m[1].includes('C')) continue;
    const addr = parseInt(m[2], 16);
    if (addr >= 0x9000 && addr <= 0x9450) {
      out.push(ln);
    }
  }
}

out.sort((a, b) => {
  const ma = /:(\w{4}):/.exec(a), mb = /:(\w{4}):/.exec(b);
  return parseInt(ma[1], 16) - parseInt(mb[1], 16);
});

const target = path.resolve(__dirname, '../_tmp_b19_code.txt');
fs.writeFileSync(target, out.join('\n') + '\n');
console.log(`wrote ${out.length} lines → ${target}`);
