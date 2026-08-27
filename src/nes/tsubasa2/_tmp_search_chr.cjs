// 临时：在整个 ROM CHR 中搜索 emu pt.json idx 40-63 的 plane 数据，定位 emu 实际用的 bank1k
const fs = require('fs');
const romPath = 'docs/roms/Captain Tsubasa II - Super Striker (Japan).nes';
const buf = fs.readFileSync(romPath);
const chrStart = 16 + buf[4] * 16384;
const emuPt = JSON.parse(fs.readFileSync('output/emu-full/frame-0010/pt.json', 'utf8'));
const emuMap = {};
for (const e of emuPt) emuMap[e.idx] = e;

// 对所有 bank1k (128 个) 检查 tile 40-63 的 p0/p1 是否等于 emu idx 40-63
function findTile(tileIdx, p0, p1) {
  const found = [];
  for (let bk = 0; bk < 128; bk++) {
    const off = chrStart + bk * 1024 + tileIdx * 16;
    let ok = true;
    for (let i = 0; i < 8; i++) if (buf[off + i] !== p0[i]) { ok = false; break; }
    if (ok) for (let i = 0; i < 8; i++) if (buf[off + 8 + i] !== p1[i]) { ok = false; break; }
    if (ok) found.push(bk);
  }
  return found;
}
for (const t of [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51]) {
  const e = emuMap[t];
  const f = findTile(t, e.plane0, e.plane1);
  console.log('emu idx', t, '匹配 bank1k =', JSON.stringify(f));
}
// 也检查 tile 0-39 是否连续匹配某个 bank
function checkRun(tileStart, bank1k) {
  let match = 0;
  for (let t = tileStart; t < tileStart + 64; t++) {
    const e = emuMap[t];
    if (!e) break;
    const off = chrStart + bank1k * 1024 + t * 16;
    let ok = true;
    for (let i = 0; i < 8; i++) if (buf[off + i] !== e.plane0[i]) { ok = false; break; }
    if (ok) for (let i = 0; i < 8; i++) if (buf[off + 8 + i] !== e.plane1[i]) { ok = false; break; }
    if (ok) match++;
  }
  return match;
}
for (const bk of [0, 1, 2, 3, 124, 125, 126, 127]) {
  console.log('bank1k', bk, 'tile0-63 与 emu idx0-63 匹配数 =', checkRun(0, bk));
}
