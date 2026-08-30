const fs = require('fs');

// 1) 扫描 f343-f818 title 屏所有帧的 scroll-prerender 的 cntV/cntVT
const sp = JSON.parse(fs.readFileSync('output/emu-full/scroll-prerender.json', 'utf8'));
const map = new Map();
for (const e of sp) map.set(e.f, e);
console.log('=== title 阶段 cntV 变化 (f343-f824) ===');
for (let f = 343; f <= 824; f++) {
  const e = map.get(f);
  if (!e) continue;
  if (e.cntV !== 0) {
    console.log(`f${f}: cntV=${e.cntV} cntH=${e.cntH} cntVT=${e.cntVT} cntHT=${e.cntHT} cntFV=${e.cntFV} regV=${e.regV} regH=${e.regH}`);
  }
}

// 2) 找到 emu nt.json 中 nt[1] 第一个非零的帧
console.log('\n=== nt[1] 首个非零帧 ===');
for (let f = 343; f <= 824; f++) {
  const dir = 'output/emu-full/frame-' + String(f).padStart(4, '0');
  const p = dir + '/nt.json';
  if (!fs.existsSync(p)) continue;
  const nt = JSON.parse(fs.readFileSync(p, 'utf8'));
  const t = nt[1].tile;
  let nz = 0;
  for (let i = 0; i < 960; i++) if (t[i] !== 0) nz++;
  if (nz > 0) {
    console.log(`f${f}: nt[1] nz=${nz}  (first nonzero)`);
    break;
  }
}

// 3) 检查 emu f343(画面边界全屏重绘帧) 的 nt[0]/nt[1]
for (const f of [343, 344, 345, 350, 400]) {
  const dir = 'output/emu-full/frame-' + String(f).padStart(4, '0');
  const p = dir + '/nt.json';
  if (!fs.existsSync(p)) continue;
  const nt = JSON.parse(fs.readFileSync(p, 'utf8'));
  const cnt = [];
  for (let ni = 0; ni < 4; ni++) {
    const t = nt[ni].tile;
    let nz = 0;
    for (let i = 0; i < 960; i++) if (t[i] !== 0) nz++;
    cnt.push(nz);
  }
  const e = map.get(f);
  console.log(`f${f}: ntNZ=[${cnt}] scroll-pre: v=${e && e.regV} vt=${e && e.regVT} fv=${e && e.regFV} cntV=${e && e.cntV} cntVT=${e && e.cntVT}`);
}
