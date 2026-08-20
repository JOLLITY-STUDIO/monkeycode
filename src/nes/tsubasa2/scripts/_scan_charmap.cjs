// 临时：扫描 asm 中 $A0-$D7 字节频率，用于反推 char-map
const fs = require('fs');
const dirs = ['bank03','bank04','bank05','bank06'];
const files = [];
for (const d of dirs) {
  for (const f of ['data_tables.s','data_maps.s','data_tail.s','_full.s']) {
    const p = `asm/${d}/${f}`;
    if (fs.existsSync(p)) files.push(p);
  }
}
const freq = new Map();
const byteCounts = new Array(256).fill(0);
for (const p of files) {
  const src = fs.readFileSync(p,'utf8');
  const re = /\.byte\s+(\$[0-9A-Fa-f]{2})(?:,(\$[0-9A-Fa-f]{2}))*/g;
  let m;
  while ((m = re.exec(src))) {
    for (let i=1;i<m.length;i++) {
      if (!m[i]) continue;
      const b = parseInt(m[i].slice(1),16);
      byteCounts[b]++;
      if (b>=0xA0 && b<=0xD7) freq.set(b,(freq.get(b)||0)+1);
    }
  }
}
console.log('=== $A0-$D7 frequency ===');
const sorted = [...freq.entries()].sort((a,b)=>b[1]-a[1]);
for (const [k,v] of sorted) console.log(`${k.toString(16).toUpperCase()}: ${v}`);
