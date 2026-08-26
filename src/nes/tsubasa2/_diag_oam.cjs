const fs = require('fs');
const j = JSON.parse(fs.readFileSync('output/emu-full/frame-0020/oam.json', 'utf8'));
const sp = Array.isArray(j) ? j : j.sprites;
let active = 0;
for (let i = 0; i < 64; i++) if (sp[i].y < 240 && sp[i].tile) active++;
console.log('active sprites', active);
for (let i = 0; i < 64; i += 8) {
  const list = sp.slice(i, i + 8).filter((s) => s.y < 240 && s.tile).map((s) => `[${s.x},${s.y},${s.tile.toString(16)}]`);
  if (list.length) console.log(i, list.join(' '));
}
