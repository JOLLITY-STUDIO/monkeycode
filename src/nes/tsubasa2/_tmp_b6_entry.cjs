// 查 bank6 入口指针表项数 (直到指针值不合理)
const fs = require('fs');
const path = require('path');
let bytes = [];
for (const f of ['data_tables.s','data_maps.s','data_tail.s']) {
  const p = path.join('asm/bank06', f);
  if (!fs.existsSync(p)) continue;
  const lines = fs.readFileSync(p, 'utf8').split(/\r?\n/);
  for (const l of lines) {
    const m = l.match(/\.byte\s+(.+)/);
    if (!m) continue;
    for (const v of m[1].split(',').map(s=>s.trim())) {
      const bm = v.match(/^\$?([0-9A-Fa-f]{2})$/);
      if (bm) bytes.push(parseInt(bm[1],16));
    }
  }
}
console.log(`bank6: ${bytes.length} 字节`);
// 入口表在 offset 0, 16位小端指针, 指向 $A000+ (即 bank6 内偏移)
// 合理范围: 偏移 0 ~ 8192
let count = 0;
for (let i = 0; i*2+1 < bytes.length; i++) {
  const ptr = (bytes[i*2+1] << 8) | bytes[i*2];
  const off = ptr - 0xA000;
  if (off < 0 || off >= bytes.length) {
    console.log(`入口表 ${count} 项, 第${count}项指针 $${ptr.toString(16)} (偏移 ${off}) 超出, 停止`);
    break;
  }
  if (count < 20 || count % 50 === 0) console.log(`  [${count}] ptr=$${ptr.toString(16)} off=${off}`);
  count++;
}
console.log(`bank6 入口表共 ${count} 项`);

// bank3/4/5 也确认下
for (const bn of ['03','04','05']) {
  let b = [];
  for (const f of ['data_tables.s','data_maps.s','data_tail.s']) {
    const p = path.join('asm/bank'+bn, f);
    if (!fs.existsSync(p)) continue;
    const lines = fs.readFileSync(p, 'utf8').split(/\r?\n/);
    for (const l of lines) {
      const m = l.match(/\.byte\s+(.+)/);
      if (!m) continue;
      for (const v of m[1].split(',').map(s=>s.trim())) {
        const bm = v.match(/^\$?([0-9A-Fa-f]{2})$/);
        if (bm) b.push(parseInt(bm[1],16));
      }
    }
  }
  let c = 0;
  for (let i = 0; i*2+1 < b.length; i++) {
    const ptr = (b[i*2+1] << 8) | b[i*2];
    const off = ptr - 0xA000;
    if (off < 0 || off >= b.length) break;
    c++;
  }
  console.log(`bank${bn}: 入口表 ${c} 项`);
}
