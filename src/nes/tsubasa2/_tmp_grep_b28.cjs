const fs = require('fs');
const files = ['code_main.s', 'code_sub.s', 'code_data.s'];
const ext = new Map();
for (const f of files) {
  const p = 'asm/bank28/' + f;
  const s = fs.readFileSync(p, 'utf8');
  s.split(/\r?\n/).forEach((l, i) => {
    const m = l.match(/JSR \$([0-9A-F]{4})/);
    if (m) {
      const a = parseInt(m[1], 16);
      // bank28 内部地址 $8000-$9FFF; 外部 $A000+ (bank30 $C000+ / bank31 $E000+)
      if (a >= 0xA000) {
        const key = m[1];
        if (!ext.has(key)) ext.set(key, []);
        ext.get(key).push(`${p}:${i + 1}`);
      }
    }
  });
}
for (const [k, v] of [...ext.entries()].sort()) {
  console.log(`JSR $${k} (${v.length}处): ${v.join(', ')}`);
}
