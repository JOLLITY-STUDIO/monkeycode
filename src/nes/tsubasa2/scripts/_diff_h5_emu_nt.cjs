// 按行(r0-r31)精确对比 H5 dump nt-f3100.json 与 emu frame-3110 nt.json 的 tile/attrib
const fs = require('fs');
const h5 = JSON.parse(fs.readFileSync('output/h5-dump/nt-f3100.json', 'utf8'));
const emu = JSON.parse(fs.readFileSync('output/emu-full/frame-3110/nt.json', 'utf8'));
const h5nt = h5.nameTables[0];
const emunt = emu[0];

function rowDiff(label, a, b) {
  const diffs = [];
  for (let r = 0; r < 32; r++) {
    const base = r * 32;
    let diffCount = 0, samples = [];
    for (let c = 0; c < 32; c++) {
      if (a[base + c] !== b[base + c]) {
        diffCount++;
        if (samples.length < 3) samples.push(`c${c}:h5=${a[base + c]},emu=${b[base + c]}`);
      }
    }
    if (diffCount) diffs.push(`r${r}:${diffCount}diff ${samples.join(' ')}`);
  }
  console.log(`--- ${label} ---`);
  if (diffs.length === 0) console.log('  ALL MATCH');
  else console.log('  ' + diffs.join('\n  '));
}

rowDiff('tile', h5nt.tile, emunt.tile);
rowDiff('attrib', h5nt.attrib, emunt.attrib);

// 统计 h5 attrib 尾部 4 的个数
let fours = 0, eights = 0;
for (let i = 0; i < h5nt.attrib.length; i++) {
  if (h5nt.attrib[i] === 4) fours++;
  if (h5nt.attrib[i] === 8) eights++;
}
console.log('h5 attrib: eights=', eights, 'fours=', fours, 'len=', h5nt.attrib.length);
// 找 4 的起始索引
let fourStart = -1;
for (let i = 0; i < h5nt.attrib.length; i++) {
  if (h5nt.attrib[i] === 4) { fourStart = i; break; }
}
console.log('h5 first attrib=4 at index:', fourStart);
