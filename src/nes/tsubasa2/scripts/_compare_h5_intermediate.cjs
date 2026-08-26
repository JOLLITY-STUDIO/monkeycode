// 检查 H5 在 f360/f1063/f3040 的 NT0 attrib/tile 状态
const fs = require('fs');
for (const f of [360, 1063, 3040]) {
  const data = JSON.parse(fs.readFileSync(`output/h5-dump/nt-f${f}.json`, 'utf8'));
  const nt0 = data.nameTables[0];
  let eights = 0, fours = 0;
  for (const v of nt0.attrib) {
    if (v === 8) eights++;
    if (v === 4) fours++;
  }
  console.log(`\nf${f}: len=${nt0.attrib.length} eights=${eights} fours=${fours}`);
  // 属性表区 tile[0x3c0..0x3ff]
  console.log(`tile[0x3c0..0x3df]: [${nt0.tile.slice(0x3c0, 0x3e0).join(',')}]`);
  console.log(`tile[0x3e0..0x3ff]: [${nt0.tile.slice(0x3e0, 0x400).join(',')}]`);
  // tile 行 30-31
  console.log(`tile row30: [${nt0.tile.slice(960, 992).join(',')}]`);
  console.log(`tile row31: [${nt0.tile.slice(992, 1024).join(',')}]`);
}
