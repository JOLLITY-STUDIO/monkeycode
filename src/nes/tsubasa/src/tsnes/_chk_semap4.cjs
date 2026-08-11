// 完整 dump 修正后的 SE_MAP：SE#0x30-0x5B → (SE#-1) 索引 → $8BDA
// 同时解析 init list 头 + 判定空轨道
const fs = require('fs');
const path = require('path');
function ex(p) {
  const c = fs.readFileSync(p, 'utf8');
  const m = c.match(/=\s*\[([\s\S]*?)\];/);
  if (!m) return [];
  const v = [];
  const re = /0x([0-9A-Fa-f]{2})/g;
  let x;
  while ((x = re.exec(m[1])) !== null) v.push(parseInt(x[1], 16));
  return v;
}
const b12 = ex(path.join(__dirname, 'rom-data', 'prg-bank-12.ts'));
const b13 = ex(path.join(__dirname, 'rom-data', 'prg-bank-13.ts'));
const b14 = ex(path.join(__dirname, 'rom-data', 'prg-bank-14.ts'));
const b15 = ex(path.join(__dirname, 'rom-data', 'prg-bank-15.ts'));
const B = { 12: b12, 13: b13, 14: b14, 15: b15 };
const h2 = n => '0x' + n.toString(16).toUpperCase().padStart(2, '0');
const h4 = n => '0x' + n.toString(16).toUpperCase().padStart(4, '0');
function sidBank(sid) {
  if (sid < 0x32) return 12;
  if (sid < 0x44) return 13;
  if (sid < 0x51) return 14;
  if (sid < 0x5C) return 15;
  return 12;
}
function rb(sid, addr) {
  if (addr >= 0x8000 && addr < 0xA000) return b12[addr - 0x8000] || 0;
  if (addr >= 0xA000 && addr < 0xC000) return B[sidBank(sid)][addr - 0xA000] || 0;
  return 0;
}
function parseHeader(sid, ptr) {
  const entries = [];
  let p = ptr;
  for (let k = 0; k < 8; k++) {
    const ch = rb(sid, p);
    if (ch >= 0x80) return { entries, term: ch, termAddr: p };
    if (ch >= 8) return { entries, term: -1, termAddr: p }; // 非法
    const lo = rb(sid, p + 1), hi = rb(sid, p + 2);
    entries.push({ ch, tp: (hi << 8) | lo });
    p += 3;
  }
  return { entries, term: -2, termAddr: p };
}
console.log('SE# | bank | initPtr | header');
for (let se = 0x30; se <= 0x5B; se++) {
  const idx = se - 1;
  const off = 0x0BDA + idx * 2;
  const ptr = (b12[off + 1] << 8) | b12[off];
  const { entries, term } = parseHeader(se, ptr);
  const hdr = entries.map(e => `ch${e.ch}→${h4(e.tp)}`).join(' ') + (term >= 0x80 ? ' FF' : term === -1 ? ' [非法!]' : term === -2 ? ' [>8项!]' : '');
  let firstData = '';
  const fp = entries[0] ? entries[0].tp : ptr;
  for (let k = 0; k < 6; k++) firstData += h2(rb(se, fp + k)) + ' ';
  const flag = entries.length === 0 ? '  <== EMPTY' : '';
  console.log(`${h2(se)} | ${sidBank(se)} | ${h4(ptr)} | ${hdr}${flag}`);
}
