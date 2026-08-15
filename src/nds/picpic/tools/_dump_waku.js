const fs = require('fs');
const d = 'roms/extracted/map/';
for (const f of ['map_wakuf.NCGR', 'map_wakuf.NSCR', 'map_wakuf2.NSCR', 'map_waku.NCLR', 'map_BG_ue.NSCR', 'bg_map_LZ.bin']) {
  const b = fs.readFileSync(d + f);
  console.log('====', f, 'len', b.length);
  console.log('head:', [...b.slice(0, Math.min(48, b.length))].map(x => x.toString(16).padStart(2, '0')).join(' '));
}
// LZ 解压看
const b = fs.readFileSync(d + 'bg_map_LZ.bin');
const outLen = b[1] | (b[2] << 8) | (b[3] << 16);
console.log('\nbg_map_LZ.bin 解压后长度:', outLen);
