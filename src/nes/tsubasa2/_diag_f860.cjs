const fs = require('fs');

// emu f860
const dir = 'output/emu-full/frame-0860';
const nt = JSON.parse(fs.readFileSync(dir + '/nt.json', 'utf8'));
const st = JSON.parse(fs.readFileSync(dir + '/state.json', 'utf8'));
console.log('=== emu f860 ===');
console.log('scroll:', JSON.stringify(st.scroll));
console.log('scrollEnd:', JSON.stringify(st.scrollEnd));
for (let ni = 0; ni < 4; ni++) {
  const t = nt[ni].tile;
  let nz = 0;
  for (let i = 0; i < 960; i++) if (t[i] !== 0) nz++;
  console.log(`nt[${ni}] nz=${nz}`);
}

// scroll-prerender f860
const sp = JSON.parse(fs.readFileSync('output/emu-full/scroll-prerender.json', 'utf8'));
const e = sp.find(x => x.f === 860);
console.log('scroll-pre f860:', JSON.stringify(e));

// H5 GT f860 在 opening-ending-scroll.ts
const txt = fs.readFileSync('src/game/prg/data/scene/opening/opening-ending-scroll.ts', 'utf8');
const lines = txt.split('\n');
const idx = lines.findIndex(l => l.includes('{f:860'));
if (idx >= 0) {
  console.log('=== H5 GT f860 ===');
  const ln = lines[idx];
  console.log(ln.slice(0, 2000));
  // 统计 ni
  const m = ln.match(/ni:(\d)/g);
  const counts = {};
  if (m) m.forEach(s => { counts[s] = (counts[s] || 0) + 1; });
  console.log('ni counts:', counts);
}

// 检查所有 f800-f900 帧 scroll-pre 的 cntV/cntH 变化
console.log('\n=== f800-f900 cntV/cntH ===');
for (let f = 800; f <= 900; f++) {
  const e = sp.find(x => x.f === f);
  if (!e) continue;
  if (e.cntV !== 0 || e.cntH !== 0) {
    console.log(`f${f}: cntV=${e.cntV} cntH=${e.cntH} cntVT=${e.cntVT} cntHT=${e.cntHT} cntFV=${e.cntFV}`);
  }
}
