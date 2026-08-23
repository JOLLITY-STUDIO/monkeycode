// 扫描 asm 中写 $001E / $001B / $001C 的指令（vblank/帧标志写入源）
const fs = require('fs');
const path = require('path');
const asmDir = path.join(__dirname, '..', 'asm');
const files = [];
function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.s')) files.push(p);
  }
}
walk(asmDir);
const pats = [
  /STA\s+\$00(?:1[BCDE])/i,
  /STX\s+\$00(?:1[BCDE])/i,
  /STY\s+\$00(?:1[BCDE])/i,
  /LSR\s+\$00(?:1[BCDE])/i,
  /ASL\s+\$00(?:1[BCDE])/i,
  /INC\s+\$00(?:1[BCDE])/i,
  /DEC\s+\$00(?:1[BCDE])/i,
  /ROR\s+\$00(?:1[BCDE])/i,
  /ROL\s+\$00(?:1[BCDE])/i,
  /ORA\s+\$00(?:1[BCDE])/i,
  /AND\s+\$00(?:1[BCDE])/i,
];
const hits = [];
for (const f of files) {
  const lines = fs.readFileSync(f, 'utf8').split(/\r?\n/);
  lines.forEach((ln, i) => {
    const m = ln.match(/; \$([0-9A-F]{4})\s*$/);
    const addr = m ? m[1] : '????';
    for (const p of pats) {
      if (p.test(ln) && !ln.trim().startsWith(';')) {
        hits.push(`${path.relative(asmDir, f)}:${i + 1} [$${addr}] ${ln.trim()}`);
        break;
      }
    }
  });
}
console.log('=== WRITE $001B/$001C/$001D/$001E hits ===');
console.log(hits.join('\n'));
console.log('total:', hits.length);
