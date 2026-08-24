const fs = require('fs');
const prg = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes').slice(16);

// doc 给的 Brazil League 5 队 hints (10=0x0A, 09, 11, 04, 06, 02 都是 player IDs)
// 也给 file offset (0x03BB1A 等)
// 在 PRG 0x3B500..0x3C000 范围搜这些 ID 序列, 看哪个 base 真的含这些

// doc 5 队每个 GK ID
const docGKs = [
  { name: 'Corinthians', gk: 0x0A, pos2: 0x09 },   // 0x10 在 doc 是 16dec = 0x10
  { name: 'Gremio',      gk: 0x09, pos2: 0x01 },
  { name: 'Palmeiras',   gk: 0x09, pos2: 0x0B },   // 11dec = 0x0B
  { name: 'Santos',      gk: 0x09, pos2: 0x04 },
  { name: 'Flamengo',    gk: 0x0A, pos2: 0x06, pos3: 0x02 },
];

// 也加 Fluminense (关1) 根据 doc 字符串 "弗卢米嫩塞" 在 Brazil 段 PRG 0x3B... 但 doc 没列
// 6 队 stride 22 bytes (stride 2 x 11), first Brazil 段 base 应该用 doc 标 Corinthians 算:
// doc Corinthians first ID = GK @ PRG offset X, 然后 11 ID stride 2
// 找 PRG 里含 (GK=0x0A, next=0x09) 的位置 (stride-2 11 ID)
console.log('=== 寻找 Brazil 球队 GK sequence (stride 2, 11 IDs) ===');
console.log('Corinthians pattern: GK 0x0A + pos2 0x09');

for (let base = 0x3B900; base < 0x3BC00; base += 2) {
  const arr = [];
  for (let i = 0; i < 22; i += 2) arr.push(prg[base + i]);
  // candidates: arr[0]==0x0A && arr[1]==0x09
  if (arr[0] === 0x0A && arr[1] === 0x09) {
    console.log('  Match at base 0x' + base.toString(16).toUpperCase() + ': ' + arr.map(x=>'0x'+x.toString(16).padStart(2,'0').toUpperCase()).join(' '));
  }
}

// 也找 doc Palmeiras pattern (gk=0x09, pos2=0x0B) etc
console.log('\n=== 其他候选 ===');
const patterns = [
  { name: 'Palmeiras',   pat: [0x09, 0x0B] },
  { name: 'Gremio',      pat: [0x09, 0x01] },
  { name: 'Santos',      pat: [0x09, 0x04] },
  { name: 'Flamengo',    pat: [0x0A, 0x06] },
];
for (const p of patterns) {
  console.log('\n' + p.name + ' pattern ' + p.pat.map(x=>'0x'+x.toString(16).padStart(2,'0').toUpperCase()).join(' '));
  for (let base = 0x3B900; base < 0x3BC00; base += 2) {
    let ok = true;
    for (let i = 0; i < p.pat.length; i++) if (prg[base + i*2] !== p.pat[i]) { ok = false; break; }
    if (!ok) continue;
    const arr = [];
    for (let i = 0; i < 22; i += 2) arr.push(prg[base + i]);
    console.log('  base 0x' + base.toString(16).toUpperCase() + ': ' + arr.map(x=>'0x'+x.toString(16).padStart(2,'0').toUpperCase()).join(' '));
  }
}
