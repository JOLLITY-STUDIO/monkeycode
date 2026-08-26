const fs = require('fs');
const j = JSON.parse(fs.readFileSync('output/emu-full/frame-0020/oam.json', 'utf8'));
const sp = Array.isArray(j) ? j : j.sprites;
console.log('emu f20 active sprites');
for (let i = 0; i < 64; i++) {
  const s = sp[i];
  if (s.y < 240 && s.tile) console.log(i, `[${s.x},${s.y},${s.tile.toString(16)},a${s.attr.toString(16)}]`);
}
