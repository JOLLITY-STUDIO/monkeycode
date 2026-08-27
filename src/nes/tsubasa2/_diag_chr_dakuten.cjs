// 对比 emu pt.json 与 H5 CHR 的 tile 0x94/0x95 像素
const fs = require('fs');
const { Tsubasa2 } = require('./dist-cjs2/game/index');
const { HeadlessRuntime } = require('./dist-cjs2/game/runtime/HeadlessRuntime');

const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
const origLog = console.log;
console.log = () => {};
game.boot(runtime);
console.log = origLog;

// 跑到 nes 800 装载 CHR 配置
for (let h5 = 0; h5 <= 790; h5++) game.frame(runtime);

const out = [];
out.push('=== H5 CHR tile 0x94/0x95 像素 (ppu.ptTile / vram) ===');

// 找 H5 PPU 的 tile 数据结构
const ppu = runtime.ppu;
const keys = Object.keys(ppu).filter(k => /tile|chr|vram|pattern|pt/i.test(k));
out.push('ppu keys: ' + keys.join(', '));

// 尝试 ptTile
function tilePix(nt) {
  try {
    const pt = ppu.ptTile || ppu.patternTable || null;
    if (!pt) return null;
    const t = pt[nt];
    if (!t) return null;
    if (t.pix) return Array.from(t.pix);
    if (t.pixels) return Array.from(t.pixels);
    if (Array.isArray(t)) return Array.from(t);
    return null;
  } catch (e) { return null; }
}

for (const nt of [0x94, 0x95, 0x93, 0x96]) {
  const pix = tilePix(nt);
  if (pix) {
    out.push('H5 ptTile[' + nt.toString(16) + ']: ' + pix.join(','));
  } else {
    out.push('H5 ptTile[' + nt.toString(16) + ']: <no pix data>');
  }
}

// emu pt.json
out.push('');
out.push('=== emu pt.json tile 0x94/0x95 ===');
const pt = JSON.parse(fs.readFileSync('output/emu-full/frame-0800/pt.json', 'utf8'));
const ptArr = Array.isArray(pt) ? pt : (pt.tiles || pt.pt || []);
for (const nt of [0x94, 0x95, 0x93, 0x96]) {
  const t = ptArr[nt];
  if (t) {
    const pix = t.pix || t.pixels || t;
    out.push('emu pt[' + nt.toString(16) + ']: ' + JSON.stringify(pix).slice(0, 200));
  } else {
    out.push('emu pt[' + nt.toString(16) + ']: <none>');
  }
}

fs.writeFileSync('_diag_chr_dakuten_out.txt', out.join('\n'), 'utf8');
console.log('done');
