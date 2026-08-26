const fs = require('fs');
const h5 = JSON.parse(fs.readFileSync('output/h5-dump/nt-f3100.json', 'utf8'));
const borderTiles = [80,81,84,85,82,83,86,87,170,153,160,168,152];
for (let li = 0; li < 4; li++) {
  const tile = h5.nameTables[li].tile;
  console.log('=== idx', li, '===');
  for (let r = 0; r < 30; r++) {
    const row = tile.slice(r*32, r*32+32);
    const hasBorder = row.some(v => borderTiles.includes(v));
    if (hasBorder) {
      console.log('row', r, row.filter(v => v !== 0).join(','));
    }
  }
}
