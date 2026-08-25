/**
 * _cmp_ref13.cjs — 对比模拟器(emu) vs H5 在 frame 1/5/9/13 的渲染状态
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

const emu = JSON.parse(fs.readFileSync(path.join(__dirname, '_emu_ref13.json'), 'utf8'));
const H5 = path.join(ROOT, 'output', 'ppu-trace');

function h5Frame(f) {
  const dir = path.join(H5, `frame-${String(f).padStart(3, '0')}`);
  const nt0 = JSON.parse(fs.readFileSync(path.join(dir, 'nt0.json'), 'utf8'));
  const nt1 = JSON.parse(fs.readFileSync(path.join(dir, 'nt1.json'), 'utf8'));
  const pal = JSON.parse(fs.readFileSync(path.join(dir, 'palette.json'), 'utf8'));
  const oam = JSON.parse(fs.readFileSync(path.join(dir, 'oam.json'), 'utf8'));
  const pt = JSON.parse(fs.readFileSync(path.join(dir, 'pt.json'), 'utf8'));
  const ptList = Array.isArray(pt) ? pt : (pt.tiles || []);
  const ptNonEmpty = ptList.filter((t) => {
    const p0 = Array.isArray(t) ? t.slice(0, 8) : (t.plane0 || []);
    const p1 = Array.isArray(t) ? t.slice(8, 16) : (t.plane1 || []);
    return p0.some((b) => b !== 0) || p1.some((b) => b !== 0);
  }).length;
  const nz = (tiles) => tiles.filter((t) => t !== 0).length;
  const oamVis = oam.filter((o) => o.y < 0xef);
  return {
    nt0nz: nz(nt0.tiles), nt0u: [...new Set(nt0.tiles)].slice(0, 16),
    nt1nz: nz(nt1.tiles), nt1u: [...new Set(nt1.tiles)].slice(0, 16),
    palBg: pal.bg, palSp: pal.spr,
    oamVis: oamVis.map((o) => `${o.y}/${o.tile.toString(16)}/${o.x}`).slice(0, 12),
    oamCount: oamVis.length,
    ptNonEmpty,
  };
}

function emuFrame(e) {
  return {
    nt0nz: e.nt0.nz, nt0u: e.nt0.unique,
    nt1nz: e.nt1.nz, nt1u: e.nt1.unique,
    nt2nz: e.nt2.nz, nt3nz: e.nt3.nz,
    palBg: e.paletteBg, palSp: e.paletteSp,
    oamVis: e.oamVisible.map((o) => `${o.y}/${o.tile.toString(16)}/${o.x}`).slice(0, 12),
    oamCount: e.oamVisible.length,
    ptNonEmpty: e.ptNonEmpty,
    bufNonZero: e.bufNonZero,
    chrBanks: e.chrBanks, prg: e.prgBankMap,
    reg2000: e.reg2000, reg2001: e.reg2001, pc: e.pc,
  };
}

for (const e of emu) {
  const f = e.frame;
  const h = h5Frame(f);
  console.log('══════════════════════════════════════════════════════');
  console.log(`frame ${f}`);
  console.log('─ emu:', JSON.stringify(emuFrame(e)));
  console.log('─ h5 :', JSON.stringify(h));
  console.log('─ NT0 nz  emu=' + e.nt0.nz + ' h5=' + h.nt0nz + (e.nt0.nz === h.nt0nz ? ' ✓' : ' ✗'));
  console.log('─ NT1 nz  emu=' + e.nt1.nz + ' h5=' + h.nt1nz + (e.nt1.nz === h.nt1nz ? ' ✓' : ' ✗'));
  console.log('─ OAM vis emu=' + e.oamVisible.length + ' h5=' + h.oamCount + (e.oamVisible.length === h.oamCount ? ' ✓' : ' ✗'));
  console.log('─ PT nz   emu=' + e.ptNonEmpty + ' h5=' + h.ptNonEmpty + (e.ptNonEmpty === h.ptNonEmpty ? ' ✓' : ' ✗'));
  const palEq = JSON.stringify(e.paletteBg) === JSON.stringify(h.palBg);
  console.log('─ PAL bg  ' + (palEq ? '✓' : '✗ emu=' + e.paletteBg.map((v) => v.toString(16)).join(',') + ' h5=' + (h.palBg || []).map((v) => v.toString(16)).join(',')));
}
