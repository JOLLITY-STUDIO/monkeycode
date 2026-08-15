const fs = require('fs');
const lines = fs.readFileSync('_tmp_bzk_out/bank_01.asm', 'utf8').split(/\r?\n/);
// 提取所有代码段 (C 开头) + 跳板，按地址排序汇总
const code = [];
for (const l of lines) {
  const m = l.match(/^(.) - - - - - 0x([0-9A-F]{6}) (00:[0-9A-F]{4}): (.*)$/);
  if (!m) continue;
  if (m[1] !== 'C') continue; // 只要代码
  const addr = parseInt(m[2], 16);
  code.push({ addr, line: l });
}
code.sort((a, b) => a.addr - b.addr);
// 输出连续代码块 (间隔 > 3 字节切块)
let blocks = [];
let cur = [];
let prevAddr = -1;
for (const c of code) {
  if (prevAddr >= 0 && c.addr - prevAddr > 8 && cur.length) {
    blocks.push(cur); cur = [];
  }
  cur.push(c); prevAddr = c.addr;
}
if (cur.length) blocks.push(cur);
console.log(`共 ${code.length} 行代码，分 ${blocks.length} 个连续块：`);
for (let i = 0; i < blocks.length; i++) {
  const b = blocks[i];
  const startHex = b[0].addr.toString(16).padStart(6, '0');
  const endHex = b[b.length - 1].addr.toString(16).padStart(6, '0');
  console.log(`块${String(i).padStart(2, ' ')}: 0x${startHex}-0x${endHex} (${b.length} 行)`);
  fs.writeFileSync(`_tmp_bzk_out/_blk_${String(i).padStart(2, '0')}.txt`, b.map(x => x.line).join('\n'));
}
