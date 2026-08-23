// 扫描 bank 9/10（场景数据 $A000 起）统计 $80-$FF 命令字节分布
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..', 'src', 'game', 'prg', 'data', 'rom');
for (const bk of [9, 10]) {
  const fn = path.join(root, 'prg-bank-' + String(bk).padStart(2, '0') + '.ts');
  if (!fs.existsSync(fn)) { console.log('missing', fn); continue; }
  const src = fs.readFileSync(fn, 'utf8');
  const body = src.match(/\[([\s\S]*)\]/)[1];
  const bytes = body.match(/0x[0-9a-fA-F]+/g).map(s => parseInt(s, 16));
  const cnt = new Array(256).fill(0);
  for (const b of bytes) cnt[b]++;
  console.log('=== bank ' + bk + ' (len ' + bytes.length + ') ===');
  // 打印 $A0-$FF 段
  const out = [];
  for (let v = 0xa0; v <= 0xff; v++) {
    if (cnt[v] > 0) out.push('$' + v.toString(16) + ':' + cnt[v]);
  }
  console.log('A0-FF:', out.join(' '));
  // 特别打印 F0-FF 精确计数
  const f = [];
  for (let v = 0xf0; v <= 0xff; v++) f.push('$' + v.toString(16) + ':' + cnt[v]);
  console.log('F0-FF:', f.join(' '));
}
