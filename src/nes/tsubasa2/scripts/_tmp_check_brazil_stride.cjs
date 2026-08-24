const fs = require('fs');
const prg = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes').slice(16);

// doc 给 Corinthians "10,03BB1A" "09,03BB1C" 即 file offset 0x3BB1A/0x3BB1C -> PRG 0x3BB04/0x3BB06
// 所以 stride=2, 22 bytes total (11 ID x 2 bytes)
console.log('Corinthians doc claim: prg[0x3BB04] = 0x10, prg[0x3BB06] = 0x09');
console.log('  actual prg[0x3BB04] = 0x' + prg[0x3BB04].toString(16).padStart(2,'0').toUpperCase());
console.log('  actual prg[0x3BB06] = 0x' + prg[0x3BB06].toString(16).padStart(2,'0').toUpperCase());
console.log('');

// 11 ID stride 2 from PRG 0x3BB04
console.log('Corinthians 11 ID @ PRG 0x3BB04 stride 2:');
const cor = [];
for (let i = 0; i < 22; i += 2) cor.push(prg[0x3BB04 + i]);
console.log('  ' + cor.map(x => '0x' + x.toString(16).padStart(2,'0').toUpperCase()).join(' '));

// Brazil 6 队按剧情顺序 stride 2 (每队 22 bytes):
//   Flu 关1 base 0x3BAE2 ?
//   Cor 关2 base 0x3BB04 (verified doc)
//   Gre 关3 base 0x3BB04 + 22 = 0x3BB1A
//   Pal 关4 base 0x3BB1A + 22 = 0x3BB30
//   San 关5 base 0x3BB30 + 22 = 0x3BB46
//   Fla 关6 base 0x3BB46 + 22 = 0x3BB5C

console.log('\n=== Brazil 6 队 stride 2 (22 bytes/队, 顺序 = 剧情顺序) ===');
const bases = [
  { name: 'Fluminense(关1)', base: 0x3BAE2 },
  { name: 'Corinthians(关2)', base: 0x3BB04 },
  { name: 'Gremio(关3)',     base: 0x3BB1A },
  { name: 'Palmeiras(关4)',  base: 0x3BB30 },
  { name: 'Santos(关5)',     base: 0x3BB46 },
  { name: 'Flamengo(关6)',   base: 0x3BB5C },
];
for (const b of bases) {
  const arr = [];
  for (let i = 0; i < 22; i += 2) arr.push(prg[b.base + i]);
  console.log('  ' + b.name + ' @0x' + b.base.toString(16).toUpperCase() + ' = ' + arr.map(x => '0x'+x.toString(16).padStart(2,'0').toUpperCase()).join(' '));
}

// 也试 Flu 在 Cor 之前的可能 base
console.log('\n=== 验证 Fluminense 真实位置 (扫 0x3BADC-0x3BB04 各 base) ===');
for (let base = 0x3BADC; base <= 0x3BB04; base += 2) {
  const arr = [];
  for (let i = 0; i < 22; i += 2) arr.push(prg[base + i]);
  // 跳过全 0 / 含 player ID 0x01-0x15 太多的
  const hasGK = arr[0] === 0x10 || arr[0] === 0x0B || arr[0] === 0x07 || arr[0] === 0x08;
  if (!hasGK) continue;
  console.log('  base 0x' + base.toString(16).toUpperCase() + ': ' + arr.map(x => '0x'+x.toString(16).padStart(2,'0').toUpperCase()).join(' '));
}

// doc 给 Flamengo hints @ PRG 0x3BB42/0x3BB44/0x3BB46 (file 0x3BB52/3BB54/3BB56-16)
// 但 stride-2 base = 0x3BB5C 比 0x3BB46 大 22 字节, 错位
// 试再对齐: stride 2 起始 = doc 第一个 hint - 0
// Flamengo doc: 10,03BB52 -> PRG 0x3BB42 = 0x2B
// 那 Flamengo base @ PRG 0x3BB42 ? 但 Cor base 已 = 0x3BB04, 差 0x3E = 62 字节, 不是 22 整数倍
// 重新看, doc 给 spacing inconsistent, 让我列所有 doc Brazil 队 hints 算 stride
console.log('\n=== doc 所有 Brazil 队 hint offsets (file -16 -> PRG) ===');
const allHint = [
  ['Corinthians', [0x03BB1A, 0x03BB1C]],
  ['Gremio',      [0x03BB28, 0x03BB2A]],
  ['Palmeiras',   [0x03BB36, 0x03BB38]],
  ['Santos',      [0x03BB44, 0x03BB46]],
  ['Flamengo',    [0x03BB52, 0x03BB54, 0x03BB56]],
];
allHint.forEach(([n, hs]) => {
  console.log('  ' + n + ': first PRG @ 0x' + (hs[0]-16).toString(16).toUpperCase() + ', val=' + prg[hs[0]-16].toString(16).padStart(2,'0').toUpperCase());
});
