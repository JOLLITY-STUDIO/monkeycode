// 提取 bank_11.asm 中所有 code 标记行（含地址/指令），输出为 _b11_code_full.txt
const fs = require('fs');
const src = fs.readFileSync('_tmp_bzk_out/bank_11.asm', 'utf8');
const lines = src.split(/\r?\n/);
const out = [];
for (const line of lines) {
  // 格式:  flags(首字符=C)  0xPRG 05:ADDR:  bytes  INSTR [args]  ; comment
  const m = line.match(/^(\S)(\s\S)*?\s+0x[0-9A-F]{6}\s+\d{2}:([0-9A-F]{4}):\s+(.+)$/);
  if (!m) continue;
  if (m[1] !== 'C') continue; // 仅 code 主标记
  const addr = parseInt(m[3], 16);
  const body = m[4];
  // 跳过数据字节行（.byte / UNDEFINED）
  const t = body.trim();
  if (/^\.byte/.test(t) || /^UNDEFINED/.test(t)) continue;
  out.push(`05:${m[3]}: ${t}`);
}
fs.writeFileSync('_b11_code_full.txt', out.join('\n'), 'utf8');
console.log('code lines:', out.length);
const addrs = out.map(l => parseInt(l.slice(3, 7), 16));
console.log('range: $' + Math.min(...addrs).toString(16) + '-$' + Math.max(...addrs).toString(16));
// 按地址排序输出 code 段分布
const segs = [];
let start = -1, prev = -1;
for (const a of addrs.sort((x, y) => x - y)) {
  if (start === -1) { start = a; prev = a; continue; }
  if (a - prev > 8) { segs.push([start, prev]); start = a; }
  prev = a;
}
if (start !== -1) segs.push([start, prev]);
console.log('segments:', segs.map(s => `$${s[0].toString(16)}-$${s[1].toString(16)}`).join(' '));
