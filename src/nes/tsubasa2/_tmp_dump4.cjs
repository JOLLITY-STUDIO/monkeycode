// 临时脚本: 按行尾注释地址提取 asm 关键段 (bank28/bank20/bank30)
const fs = require('fs');
const path = require('path');

function dumpRange(file, start, end) {
  const full = path.join(__dirname, file);
  if (!fs.existsSync(full)) { console.log(`[MISS] ${file}`); return; }
  const lines = fs.readFileSync(full, 'utf8').split(/\r?\n/);
  console.log(`\n===== ${file} $${start.toString(16)}-$${end.toString(16)} =====`);
  let started = false;
  for (const ln of lines) {
    const m = ln.match(/; \$([0-9A-F]{4})\b/i);
    if (!m) continue;
    const addr = parseInt(m[1], 16);
    if (!started && addr < start) continue;
    if (addr > end) break;
    started = true;
    console.log(ln);
  }
}

dumpRange('asm/bank28/code_data.s', 0x8C06, 0x8C84);
dumpRange('asm/bank28/code_data.s', 0x8C84, 0x8D58);
dumpRange('asm/bank28/code_data.s', 0x8D58, 0x8DA6);
dumpRange('asm/bank28/code_data.s', 0x8DA6, 0x8E25);
dumpRange('asm/bank28/code_sub.s', 0x8A20, 0x8ABE);
dumpRange('asm/bank28/code_sub.s', 0x8927, 0x897C);
dumpRange('asm/bank28/code_sub.s', 0x86AC, 0x8738);
dumpRange('asm/bank28/code_sub.s', 0x875D, 0x884A);
dumpRange('asm/bank20/code_sub.s', 0x8438, 0x84DC);
dumpRange('asm/bank20/code_sub.s', 0x857A, 0x85F2);
dumpRange('asm/bank20/code_data.s', 0x843B, 0x8450);
dumpRange('asm/bank20/code_data.s', 0x8580, 0x85A0);
