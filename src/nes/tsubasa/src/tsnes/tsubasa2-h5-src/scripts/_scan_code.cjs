const fs = require('fs');
const path = require('path');
const dir = 'd:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out';

// 扫描指定 bank asm 的 code (C) 行分布
const bankFile = process.argv[2] || 'bank_01.asm';
const c = fs.readFileSync(path.join(dir, bankFile), 'utf8');
const lines = c.split(/\r?\n/);

let inCode = false;
let start = 0;
const segs = [];
const codeAddrs = [];
lines.forEach((l, i) => {
  // 格式: "C D 1 - - - 0x020010 01:A000: 4C 1E A0 JMP $A01E"
  if (l.startsWith('C ')) {
    const m = l.match(/0x[0-9A-F]+ \d\d:([0-9A-F]{4}):/);
    if (m) {
      codeAddrs.push({ line: i + 1, addr: parseInt(m[1], 16), text: l.trim().slice(0, 110) });
      if (!inCode) { inCode = true; start = i; }
    }
  } else {
    if (inCode) {
      segs.push({ startLine: start + 1, endLine: i, count: i - start });
      inCode = false;
    }
  }
});
if (inCode) segs.push({ startLine: start + 1, endLine: lines.length, count: lines.length - start });

console.log(`== ${bankFile} code 段分布 (共 ${segs.length} 段, ${codeAddrs.length} 条指令):`);
segs.forEach(s => {
  console.log(`  line ${s.startLine}-${s.endLine} (${s.count} 行)`);
});
console.log('\n== 前 60 条指令:');
codeAddrs.slice(0, 60).forEach(x => console.log(`  ${x.line} $${x.addr.toString(16).toUpperCase()} ${x.text}`));
