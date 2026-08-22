const NES = require('./_test_out/core/nes').default;
const { PRG, HEADER, NES_CHR_ROM } = require('./_test_out/game/rom');
const { Tsubasa2 } = require('./_test_out/game/index');

const nes = new NES({
  onFrame: (buf) => { /* no-op */ },
  onStatusUpdate: (s) => {},
  emulateSound: false,
});
nes.loadTsROM({ header: HEADER, prg: PRG, chr: NES_CHR_ROM });

const t = new Tsubasa2();
t.boot();

function countNonZeroNT(store) {
  let n0 = 0, n1 = 0;
  const s = store.nt0;
  for (let y = 0; y < 30; y++) for (let x = 0; x < 32; x++) {
    const e = s[y] && s[y][x];
    if (e && e.tile !== 0) n0++;
  }
  const s1 = store.nt1;
  for (let y = 0; y < 30; y++) for (let x = 0; x < 32; x++) {
    const e = s1[y] && s1[y][x];
    if (e && e.tile !== 0) n1++;
  }
  return { n0, n1 };
}

function countPaletteNonBlack(store) {
  const bg = store.paletteTable.bgPalettes;
  const spr = store.paletteTable.sprPalettes;
  let b = 0, p = 0;
  for (let i = 0; i < 4; i++) {
    for (let c = 0; c < 4; c++) {
      const bc = bg[i].colors[c];
      if (bc.r || bc.g || bc.b) b++;
      const sc = spr[i].colors[c];
      if (sc.r || sc.g || sc.b) p++;
    }
  }
  return { b, p };
}

console.log('[BOOT] ram_00ED =', t.store.read('ram_00ED'));
console.log('[BOOT] NT non-zero tiles:', JSON.stringify(countNonZeroNT(t.store)));
console.log('[BOOT] palette non-black:', JSON.stringify(countPaletteNonBlack(t.store)));
console.log('[BOOT] scroll =', t.store.scrollX, t.store.scrollY);
console.log('[BOOT] ram_0020/21 =', t.store.read('ram_0020'), t.store.read('ram_0021'));

// 跑 5 帧
let lastBuf = null;
nes.opts.onFrame = (buf) => { lastBuf = buf; };
for (let f = 1; f <= 5; f++) {
  t.frame(nes);
  if (f === 1 || f === 5) {
    const ppu = nes.ppu;
    // 统计 ptTile 非空 tile 数
    let ptNonEmpty = 0;
    for (let i = 0; i < 512; i++) {
      const tile = ppu.ptTile[i];
      if (tile && tile.bmp) {
        let any = false;
        for (let r = 0; r < 8; r++) if (tile.bmp[r]) { any = true; break; }
        if (any) ptNonEmpty++;
      } else if (tile && tile.getBuffer) {
        ptNonEmpty++;
      }
    }
    // imgPalette 非零
    let imgNonBlack = 0;
    if (ppu.imgPalette) for (let i = 0; i < ppu.imgPalette.length; i++) if (ppu.imgPalette[i]) imgNonBlack++;
    console.log(`[FRAME ${f}] ptTile non-empty=${ptNonEmpty} imgPalette non-zero=${imgNonBlack} frameEnded=${ppu.frameEnded} f_bgVisibility=${ppu.f_bgVisibility} f_spVisibility=${ppu.f_spVisibility}`);
  }
}

// 帧缓冲统计
if (lastBuf) {
  let nonZero = 0;
  const min = [255,255,255], max = [0,0,0];
  const sample = [];
  for (let i = 0; i < lastBuf.length; i++) {
    const px = lastBuf[i];
    if (px) nonZero++;
    const r = px & 0xff, g = (px >> 8) & 0xff, b = (px >> 16) & 0xff;
    if (px) {
      min[0] = Math.min(min[0], r); max[0] = Math.max(max[0], r);
      min[1] = Math.min(min[1], g); max[1] = Math.max(max[1], g);
      min[2] = Math.min(min[2], b); max[2] = Math.max(max[2], b);
      if (sample.length < 5) sample.push(px.toString(16).padStart(8, '0'));
    }
  }
  console.log(`[FRAME5] buffer=${lastBuf.length}px nonZero=${nonZero} min=${min} max=${max} samples=${sample.join(',')}`);
  // 统计唯一颜色
  const colorSet = new Set();
  for (let i = 0; i < lastBuf.length; i++) colorSet.add(lastBuf[i]);
  console.log('[FRAME5] unique colors =', colorSet.size);
  const top = [...colorSet].sort((a,b)=>b-a).slice(0,8).map(v=>v.toString(16).padStart(8,'0'));
  console.log('[FRAME5] top colors =', top.join(','));
}

// OAM 数量
let oamActive = 0;
for (let i = 0; i < 0x100; i++) {
  const v = t.store.read(0x0200 + i);
  if (i % 4 === 0 && v < 0xf0) oamActive++;
}
console.log('[FRAME5] active OAM sprites =', oamActive);
