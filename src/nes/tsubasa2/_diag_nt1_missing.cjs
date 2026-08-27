// 临时诊断：H5 tecmo logo 阶段 (f0-f40) NT0/NT1/CHR/palette/scroll/buffer 全状态
const { HeadlessRuntime } = require('./dist-cjs/game/runtime/HeadlessRuntime');
const { Tsubasa2 } = require('./dist-cjs/game/index');

const rt = new HeadlessRuntime();
const g = new Tsubasa2();
g.boot(rt);
const ppu = rt.ppu;
const store = g.store;

function countNonZero(arr, len) {
  let c = 0;
  for (let i = 0; i < len; i++) if (arr[i]) c++;
  return c;
}

const FRAMES = parseInt(process.argv[2] || '41', 10);
const log = [];
for (let f = 0; f < FRAMES; f++) {
  rt.frame(g);
  const nt = ppu.nameTable;
  const nz = [];
  for (let i = 0; i < 4; i++) {
    const t = nt[i] && nt[i].tile ? countNonZero(nt[i].tile, 960) : -1;
    nz.push('nt' + i + '=' + t);
  }
  // buffer 非零像素
  const buf = ppu.buffer;
  let bufNz = 0;
  for (let i = 0; i < buf.length; i++) if (buf[i]) bufNz++;
  // CHR slots
  const slots = (rt.chrSlots || []).join(',');
  // NT0 非零行
  const nt0rows = [];
  for (let r = 0; r < 30; r++) {
    let n = 0;
    for (let c = 0; c < 32; c++) if (nt[0].tile[r * 32 + c]) n++;
    if (n) nt0rows.push('r' + r + ':' + n);
  }
  const nt1rows = [];
  for (let r = 0; r < 30; r++) {
    let n = 0;
    for (let c = 0; c < 32; c++) if (nt[1].tile[r * 32 + c]) n++;
    if (n) nt1rows.push('r' + r + ':' + n);
  }
  log.push(
    `f=${f} ` + nz.join(' ') +
    ` bufNz=${bufNz} slots=[${slots}]` +
    ` regV=${ppu.regV} regH=${ppu.regH} vt=${ppu.regVT} ht=${ppu.regHT} fv=${ppu.regFV} fh=${ppu.regFH}` +
    ` fadeBg=${store.fade.bg} bg0=${store.palette.bg[0].toString(16)} bg1=${store.palette.bg[1].toString(16)}` +
    `\n  NT0:${nt0rows.join(',')}` +
    `\n  NT1:${nt1rows.join(',')}`
  );
}
console.log(log.join('\n'));
