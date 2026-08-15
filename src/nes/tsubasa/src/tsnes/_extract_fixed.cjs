// 提取 bank30 asm 中固定区跳转目标的实现代码
const fs = require('fs');
const asm = fs.readFileSync('_tmp_bzk_out/bank_30.asm', 'utf8').split(/\r?\n/);

// 目标: 从哪个地址开始, 提取多少行
const targets = [
  ['$CB99', '$CB99:', 60],  // $C509 dispatch
  ['$CAE7', '$CAE7:', 40],  // $C50F zero-page write
  ['$CB02', '$CB02:', 40],  // $C51B counter
  ['$CD7C', '$CD7C:', 45],  // $C50C name lookup
  ['$CDC9', '$CDC9:', 35],  // $C536
  ['$CE99', '$CE99:', 40],  // $C548 find free slot
  ['$CD77', '$CD77:', 30],  // $C551 team switch
];

function findLine(addr) {
  // 匹配如 "0F:CAE7:" 或 "$CAE7" 的地址标记
  const pat1 = new RegExp(addr.replace('$', '\\$') + ':');
  const pat2 = new RegExp(':' + addr.replace('$', '') + '\\s');
  for (let i = 0; i < asm.length; i++) {
    if (pat1.test(asm[i]) || pat2.test(asm[i])) return i;
  }
  return -1;
}

let out = '';
for (const [name, addr, lines] of targets) {
  const i = findLine(addr);
  out += `\n===== ${name} (line ${i}) =====\n`;
  if (i < 0) { out += 'NOT FOUND\n'; continue; }
  // 向前取 2 行上下文, 向后取 lines 行
  const start = Math.max(0, i - 2);
  out += asm.slice(start, Math.min(asm.length, i + lines)).join('\n') + '\n';
}
fs.writeFileSync('_b30_fixed_dump.txt', out);
console.log('written');
