const fs = require('fs');
const path = require('path');

// 1) emu f710 的 nt.json / scroll / state
const dir = 'output/emu-full/frame-0710';
const nt = JSON.parse(fs.readFileSync(path.join(dir, 'nt.json'), 'utf8'));
const st = JSON.parse(fs.readFileSync(path.join(dir, 'state.json'), 'utf8'));
console.log('=== emu f710 ===');
console.log('scroll:', JSON.stringify(st.scroll));
console.log('scrollEnd:', JSON.stringify(st.scrollEnd));
for (let ni = 0; ni < 4; ni++) {
  const t = nt[ni].tile;
  let nz = 0;
  for (let i = 0; i < 960; i++) if (t[i] !== 0) nz++;
  const att = nt[ni].attrib;
  let nza = 0;
  for (let i = 0; i < 64; i++) if (att[i] !== 0) nza++;
  // 首行/首列 tile 采样
  const row0 = t.slice(0, 32).map(v => v.toString(16).padStart(2, '0')).join(' ');
  const row15 = t.slice(15 * 32, 16 * 32).map(v => v.toString(16).padStart(2, '0')).join(' ');
  console.log(`nt[${ni}]: nz=${nz}/960 attrNZ=${nza}/64`);
  console.log(`  row0 : ${row0}`);
  console.log(`  row15: ${row15}`);
}

// 2) scroll-prerender.json f710
const sp = JSON.parse(fs.readFileSync('output/emu-full/scroll-prerender.json', 'utf8'));
const e = sp.find(x => x.f === 710);
console.log('scroll-prerender f710:', JSON.stringify(e));

// 3) H5 GT 数据 f710 (opening-title-1.ts 里 f=710)
const txt = fs.readFileSync('src/game/prg/data/scene/opening/opening-title-1.ts', 'utf8');
const lines = txt.split('\n');
const idx = lines.findIndex(l => l.includes('{f:710'));
if (idx >= 0) {
  console.log('=== H5 GT f710 (line ' + (idx + 1) + ') ===');
  console.log(lines[idx].slice(0, 2000));
}
