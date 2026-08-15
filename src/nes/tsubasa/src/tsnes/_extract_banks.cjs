// 提取 7 个目标 bank 的代码行(C 标记)到紧凑输出, 供翻译使用
const fs = require('fs');

const TARGETS = [
  { bank: 24, name: 'bank24' },
  { bank: 20, name: 'bank20' },
  { bank: 16, name: 'bank16' },
  { bank: 11, name: 'bank11' },
  { bank: 19, name: 'bank19' },
  { bank: 22, name: 'bank22' },
  { bank: 27, name: 'bank27' },
];

for (const t of TARGETS) {
  const file = `_tmp_bzk_out/bank_${String(t.bank).padStart(2, '0')}.asm`;
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  const out = [];
  let prevAddr = -1;
  let lastData = false;

  for (const l of lines) {
    const m = l.match(/^([CD\-]) .*?([0-9A-F]{2}):([0-9A-F]{4}):\s+(.*)$/);
    if (!m) continue;
    const addr = parseInt(m[3], 16);
    if (addr < 0x8000 || addr > 0x9FFF) continue;

    if (m[1] === 'C') {
      // 代码行
      const body = m[4].trim();
      // 跳过纯数据被误标的行(.byte)
      if (body.startsWith('.byte') || /^\$[0-9A-F]{2}\s+\.byte/.test(body) || /\.byte \$/.test(body)) {
        lastData = true;
        prevAddr = addr;
        continue;
      }
      const sep = (addr === prevAddr + 1 && !lastData) ? ' ' : '\n';
      out.push(`${sep}${m[3]}: ${body}`);
      lastData = false;
    } else {
      lastData = true;
    }
    prevAddr = addr;
  }

  const dest = `_b${String(t.bank).padStart(2, '0')}_code.txt`;
  fs.writeFileSync(dest, out.join(''));
  console.log(`${t.name} -> ${dest} (${out.length} lines)`);
}
