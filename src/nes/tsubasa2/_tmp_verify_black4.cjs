// 黑屏修复验证 v4: 修复 NT1 镜像覆盖后, 检查 NT0 是否保留 + bgbuffer 是否有内容
const NES = require('./_test_out/core/nes').default;
const { PRG, HEADER, NES_CHR_ROM } = require('./_test_out/game/rom');
const { Tsubasa2 } = require('./_test_out/game/index');

let lastBuf = null;
let frameCount = 0;
const nes = new NES({
  onFrame: (buf) => { lastBuf = buf; frameCount++; },
  onStatusUpdate: () => {},
  emulateSound: false,
});
nes.loadTsROM({ header: HEADER, prg: PRG, chr: NES_CHR_ROM });

const t = new Tsubasa2();
t.boot();
t.frame(nes);

const ppu = nes.ppu;
const p = (v) => '#' + (v >>> 0).toString(16).padStart(8, '0');

function countNz(buf) { let n = 0; for (let i = 0; i < buf.length; i++) if (buf[i]) n++; return n; }

console.log('=== NT 渲染数据 (修复后) ===');
const nt0 = ppu.nameTable[0];
let nz = 0;
for (let y = 0; y < 30; y++) for (let x = 0; x < 32; x++) if (nt0.getTileIndex(x, y)) nz++;
console.log(' nameTable[0] (NT0) non-zero tiles =', nz);
console.log(' NT0 row0 =', (() => { const r = []; for (let x = 0; x < 32; x++) r.push(nt0.getTileIndex(x, 0).toString(16).padStart(2, '0')); return r.join(' '); })());
const nt1 = ppu.nameTable[1];
let nz1 = 0;
for (let y = 0; y < 30; y++) for (let x = 0; x < 32; x++) if (nt1.getTileIndex(x, y)) nz1++;
console.log(' nameTable[1] (NT1) non-zero tiles =', nz1);

console.log('=== 渲染输出 ===');
console.log(' bgbuffer nonZero =', countNz(ppu.bgbuffer));
console.log(' buffer   nonZero =', countNz(ppu.buffer));
console.log(' lastBuf  nonZero =', lastBuf ? countNz(lastBuf) : -1, ' frameCount =', frameCount);
console.log(' imgPalette[0] =', p(ppu.imgPalette[0]), ' imgPalette[1..3] =', p(ppu.imgPalette[1]), p(ppu.imgPalette[2]), p(ppu.imgPalette[3]));
console.log(' scrollStore: h_tile =', ppu.scrollStore.get('h_tile'), ' h_fine =', ppu.scrollStore.get('h_fine'), ' v_fine =', ppu.scrollStore.get('v_fine'), ' h_nt =', ppu.scrollStore.get('h_nt'));
console.log(' ram_004A =', t.store.read('ram_004A'), ' ram_0538 =', t.store.read('ram_0538'), ' store.scrollX =', t.store.scrollX);
// bgbuffer 抽样: 若干行
for (let y = 0; y < 240; y += 40) {
  const samp = [];
  for (let x = 0; x < 256; x += 32) samp.push(p(ppu.bgbuffer[y * 256 + x]));
  console.log('  bgbuffer y' + y + ':', samp.join(' '));
}
