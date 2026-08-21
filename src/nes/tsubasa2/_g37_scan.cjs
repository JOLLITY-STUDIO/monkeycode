// G37: 扫描 asm/bank02, 按行尾注释 ; $XXXX 定位 24 个分发入口代码段
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'asm', 'bank02');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.s'));
const targets = [
  0x84c0, 0x84c1, 0x8559, 0x855a, 0x857b, 0x857c, 0x8581, 0x8582,
  0x85a2, 0x85a3, 0x85a8, 0x85a9, 0x85b0, 0x85b1, 0x85b8, 0x85b9,
  0x85bf, 0x85c0, 0x85cd, 0x85ce, 0x85db, 0x85dc, 0x85e8, 0x85e9,
  0x8602, 0x8603, 0x861c, 0x861d, 0x8629, 0x862a, 0x8650, 0x8651,
  0x869c, 0x869d, 0x877a, 0x877b, 0x8782, 0x8783, 0x878d, 0x878e,
  0x87bd, 0x87be, 0x87ce, 0x87cf, 0x87d6, 0x87d7, 0x87f9, 0x87fa,
  0x8895, 0x8920, 0x9a0d, 0x890c, 0x9b7f, 0x9f96, 0x9f89, 0x9fa8,
  0x88fb, 0x9b91, 0x8976, 0x9a35, 0xa82f, 0x9b28, 0x9b5e, 0xa767,
  0xa72c, 0xaa97,
];
const lines = [];
for (const f of files) {
  const full = path.join(dir, f);
  const src = fs.readFileSync(full, 'utf8');
  const arr = src.split(/\r?\n/);
  arr.forEach((ln, i) => {
    const m = ln.match(/;\s*\$([0-9A-Fa-f]{4})\s*$/);
    if (m) {
      const addr = parseInt(m[1], 16);
      if (targets.includes(addr)) {
        const ctx = arr.slice(Math.max(0, i - 1), Math.min(arr.length, i + 8)).join('\n      ');
        lines.push(`\n=== ${f}:${i + 1} @$${m[1].toUpperCase()} ===\n      ${ctx}`);
      }
    }
  });
}
fs.writeFileSync(path.join(__dirname, '_g37_scan_log.txt'), lines.join('\n'));
console.log('total matches:', lines.length);
console.log(lines.join('\n').slice(0, 6000));
