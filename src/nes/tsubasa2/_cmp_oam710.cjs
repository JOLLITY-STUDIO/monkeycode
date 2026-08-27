// f710: emu OAM/palette vs H5 shadowOam/palette 比对
const fs = require('fs');
const emuOam = JSON.parse(fs.readFileSync('output/emu-full/frame-0710/oam.json', 'utf8'));
const emuPal = JSON.parse(fs.readFileSync('output/emu-full/frame-0710/palette.json', 'utf8'));
const { Tsubasa2 } = require('./dist-cjs2/game/index');
const { HeadlessRuntime } = require('./dist-cjs2/game/runtime/HeadlessRuntime');
const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
const origLog = console.log;
console.log = () => {};
game.boot(runtime);
console.log = origLog;
for (let h5 = 0; h5 <= 700; h5++) game.frame(runtime);

const out = [];
// ---- OAM ----
const emuSp = Array.isArray(emuOam) ? emuOam : (emuOam.sprites || emuOam.oam || []);
out.push(`emu oam.json 结构: ${Array.isArray(emuOam) ? 'array' : Object.keys(emuOam).join(',')}`);
let oamDump = [];
if (Array.isArray(emuSp)) {
  emuSp.forEach((s, i) => {
    if (s.y < 240) oamDump.push(`e${i} y=${s.y} tile=${s.tile ?? s.t} attr=${s.attr ?? s.a} x=${s.x}`);
  });
} else if (emuOam && typeof emuOam === 'object' && !Array.isArray(emuOam)) {
  // {0: {y,tile,attr,x}, ...} 结构
  for (const k of Object.keys(emuOam)) {
    const s = emuOam[k];
    if (s && s.y !== undefined && s.y < 240) oamDump.push(`e${k} y=${s.y} tile=${s.tile} attr=${s.attr} x=${s.x}`);
  }
}
out.push(`emu 可见 sprite: ${oamDump.length}`);
out.push('--- emu OAM ---');
out.push(...oamDump);

const shadow = game.store.oam.shadowOam;
const h5Dump = [];
for (let i = 0; i < 64; i++) {
  const y = shadow[i * 4 + 0], t = shadow[i * 4 + 1], a = shadow[i * 4 + 2], x = shadow[i * 4 + 3];
  if (y < 240) h5Dump.push(`h${i} y=${y} tile=${t} attr=${a} x=${x}`);
}
out.push(`H5 可见 sprite: ${h5Dump.length}`);
out.push('--- H5 OAM ---');
out.push(...h5Dump);

// ---- Palette ----
out.push('');
out.push(`emu palette bg: ${JSON.stringify(emuPal.bg || emuPal.palette?.bg)}`);
out.push(`emu palette sp: ${JSON.stringify(emuPal.sp || emuPal.palette?.sp)}`);
const h5Pal = runtime.ppu.palette;
out.push(`H5 palette bg: ${JSON.stringify(Array.from(h5Pal.bg))}`);
out.push(`H5 palette sp: ${JSON.stringify(Array.from(h5Pal.spr))}`);

fs.writeFileSync('_cmp_oam710_out.txt', out.join('\n'), 'utf8');
console.log('done');
