const fs = require('fs');

function zhangSuen(w, h, img) {
  const a = new Uint8Array(img);
  const b = new Uint8Array(img.length);
  const N = (x, y, ox, oy) => {
    const nx = x + ox, ny = y + oy;
    if (nx < 0 || ny < 0 || nx >= w || ny >= h) return 0;
    return a[ny * w + nx];
  };
  const P = (x, y) => [
    N(x,y,0,-1), N(x,y,1,-1), N(x,y,1,0), N(x,y,1,1),
    N(x,y,0,1), N(x,y,-1,1), N(x,y,-1,0), N(x,y,-1,-1),
  ];
  let changed = true, guard = 0;
  while (changed && guard++ < 100) {
    changed = false;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = y * w + x;
        b[i] = a[i];
        if (!a[i]) continue;
        const p = P(x, y);
        const B = p.reduce((s,v)=>s+v,0);
        if (B < 2 || B > 6) continue;
        let A = 0;
        for (let k = 0; k < 8; k++) if (p[k] === 0 && p[(k+1)%8] === 1) A++;
        if (A !== 1) continue;
        if (p[0]*p[2]*p[4] === 0 && p[2]*p[4]*p[6] === 0) { b[i] = 0; changed = true; }
      }
    }
    a.set(b);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = y * w + x;
        b[i] = a[i];
        if (!a[i]) continue;
        const p = P(x, y);
        const B = p.reduce((s,v)=>s+v,0);
        if (B < 2 || B > 6) continue;
        let A = 0;
        for (let k = 0; k < 8; k++) if (p[k] === 0 && p[(k+1)%8] === 1) A++;
        if (A !== 1) continue;
        if (p[0]*p[2]*p[6] === 0 && p[2]*p[4]*p[6] === 0) { b[i] = 0; changed = true; }
      }
    }
    a.set(b);
  }
  return a;
}

const f = 'roms/extracted/map_d/4000101_Cat & mouse.map';
const b = fs.readFileSync(f);
const h = b[0], w = b[1];
const body = b.slice(6);
const img = new Uint8Array(w * h);
for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    const i = y * w + x;
    const n = (i & 1) ? (body[i >> 1] >> 4) : (body[i >> 1] & 0x0F);
    img[i] = n !== 0 ? 1 : 0;
  }
}
const before = img.filter(v=>v).length;
const skel = zhangSuen(w, h, img);
const after = skel.filter(v => v).length;
console.log('before:', before, 'after:', after, 'ratio:', (after/before*100).toFixed(1) + '%');

let isolated = 0, endpoints = 0, junctions = 0, lines = 0;
for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    if (!skel[y*w+x]) continue;
    let neighbors = 0;
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue;
        const nx = x + dx, ny = y + dy;
        if (nx >= 0 && ny >= 0 && nx < w && ny < h && skel[ny*w+nx]) neighbors++;
      }
    }
    if (neighbors === 0) isolated++;
    else if (neighbors === 1) endpoints++;
    else if (neighbors >= 3) junctions++;
    else lines++;
  }
}
console.log('isolated:', isolated, 'endpoints:', endpoints, 'junctions:', junctions, 'lines:', lines);
